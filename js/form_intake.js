/* form_intake.js — shared behaviour for the bento intake boards.

   Owns validation, submitting and success states for both the contact form and the
   booking form. The submission contract is unchanged: same endpoint from the form's
   own action attribute, same POST, same FormData field names, same honeypot.

   Native validation is disabled only once this script is running, so a visitor
   without JS still gets the browser's own required-field enforcement, and the PHP
   endpoints validate everything again server-side regardless. */
(function () {
    'use strict';

    const MESSAGES = {
        valueMissing: 'This one is required.',
        typeMismatch: 'Check the format of this.',
        default: 'Please check this field.',
    };

    function messageFor(input) {
        const v = input.validity;
        if (v.valueMissing) return MESSAGES.valueMissing;
        if (v.typeMismatch) {
            return input.type === 'email'
                ? 'That does not look like an email address.'
                : MESSAGES.typeMismatch;
        }
        return MESSAGES.default;
    }

    function fieldOf(input) {
        return input.closest('.field');
    }

    function clearError(input) {
        const field = fieldOf(input);
        if (!field) return;
        field.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        const msg = field.querySelector('.field-msg');
        if (msg) msg.textContent = '';
    }

    function showError(input) {
        const field = fieldOf(input);
        if (!field) return;
        field.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        const msg = field.querySelector('.field-msg');
        if (msg) msg.textContent = messageFor(input);
    }

    /* Read the endpoint's reply. The PHP endpoints answer with
       {ok, message}; the plain-text fallback keeps an older cached endpoint (or
       a server error page) from being shown to the visitor as raw JSON. */
    async function readMessage(response) {
        const raw = await response.text();
        try {
            const data = JSON.parse(raw);
            if (data && typeof data.message === 'string') return data.message;
        } catch (err) {
            /* Not JSON — fall through to the raw body. */
        }
        // Never surface a server error page; those carry markup, not a sentence.
        return /<[a-z!/]/i.test(raw) ? '' : raw.trim();
    }

    function init(form) {
        if (!form) return;

        // Scoped to the form's own section first so a page with more than one
        // intake board cannot write every result into the same live region.
        const feedback = (form.closest('section, [id$="-section"]') || document)
            .querySelector('#form-feedback') || document.querySelector('#form-feedback');
        // The honeypot must never be validated or focused — it is meant to stay empty.
        const inputs = [...form.elements].filter(
            (el) => el.name && el.name !== 'website' && typeof el.checkValidity === 'function'
        );

        // Take over validation now that we can render it inline.
        form.noValidate = true;

        // Stop a date in the past being picked at all. The server rejects one
        // regardless; this keeps the picker from offering it in the first place.
        form.querySelectorAll('input[type="date"]:not([min])').forEach((input) => {
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            input.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
        });

        inputs.forEach((input) => {
            // Validate on blur, but only re-validate live once a field has already
            // been marked wrong — otherwise the form nags while you are still typing.
            input.addEventListener('blur', () => {
                if (input.value.trim() === '' && !input.required) return;
                input.checkValidity() ? clearError(input) : showError(input);
            });
            input.addEventListener('input', () => {
                const field = fieldOf(input);
                if (field && field.classList.contains('is-invalid') && input.checkValidity()) {
                    clearError(input);
                }
            });
        });

        function setFeedback(text, kind) {
            if (!feedback) return;
            feedback.textContent = text;
            feedback.classList.remove('is-success', 'is-error');
            if (kind) feedback.classList.add(kind);
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (form.classList.contains('is-sending')) return;

            // Validate everything, then focus the first problem.
            let firstBad = null;
            inputs.forEach((input) => {
                if (input.checkValidity()) {
                    clearError(input);
                } else {
                    showError(input);
                    if (!firstBad) firstBad = input;
                }
            });

            if (firstBad) {
                setFeedback('Some details still need attention — see the highlighted fields.', 'is-error');
                firstBad.focus();
                return;
            }

            setFeedback('', null);
            form.classList.add('is-sending');

            try {
                const response = await fetch(form.getAttribute('action'), {
                    method: 'POST',
                    body: new FormData(form),
                });

                const message = await readMessage(response);

                if (response.ok) {
                    form.classList.add('is-sent');
                    setFeedback(form.dataset.successMessage
                        || message
                        || 'Thank you — your message is with us and we will come back to you.', 'is-success');
                    form.reset();
                    if (feedback) {
                        feedback.setAttribute('tabindex', '-1');
                        feedback.focus();
                    }
                } else {
                    setFeedback(message || 'Something went wrong. Please try again.', 'is-error');
                }
            } catch (err) {
                setFeedback('We could not reach the server. Please try again, or email us directly.', 'is-error');
            } finally {
                form.classList.remove('is-sending');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        init(document.querySelector('#contact-form'));
        init(document.querySelector('#booking-form'));
        // The Hospitality System Builder's closing form. Same board, same field
        // markup, same honeypot — the only difference is the hidden configuration
        // fields js/hospitality_builder.js keeps in sync, which FormData picks up
        // with everything else. init() is a no-op on a page without the form.
        init(document.querySelector('#hospitality-form'));
    });
})();
