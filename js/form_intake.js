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

    function init(form) {
        if (!form) return;

        const feedback = document.querySelector('#form-feedback');
        // The honeypot must never be validated or focused — it is meant to stay empty.
        const inputs = [...form.elements].filter(
            (el) => el.name && el.name !== 'website' && typeof el.checkValidity === 'function'
        );

        // Take over validation now that we can render it inline.
        form.noValidate = true;

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

                if (response.ok) {
                    form.classList.add('is-sent');
                    setFeedback(form.dataset.successMessage
                        || 'Thank you — your message is with us and we will come back to you.', 'is-success');
                    form.reset();
                    if (feedback) feedback.setAttribute('tabindex', '-1');
                    if (feedback) feedback.focus();
                } else {
                    const text = await response.text();
                    setFeedback(text || 'Something went wrong. Please try again.', 'is-error');
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
    });
})();
