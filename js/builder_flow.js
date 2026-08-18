/* builder_flow.js — the step gate shared by the two guided builders.

   The problem it solves: both builders used to present every interactive chapter
   at once, to everybody. A visitor who had not yet decided they wanted a website
   (or a hospitality system) scrolled into a long instrument with no idea what it
   was for, and the closing form could be reached with the first chapter left
   blank — so the enquiry arrived without the one answer that shapes everything
   after it.

   What this file does instead:
     1. Nothing interactive is shown until the visitor says they want it. The
        builder opens on a plain gate that says what the form is, how long it
        takes and what it is not, with one button.
     2. After that, exactly one chapter is open at a time. The next chapter is
        revealed by the chapter's own continue control, and that control refuses
        to advance while the current chapter's requirements are unmet.

   Two rules keep this file generic:
     - It knows nothing about either builder's internal state. A chapter declares
       what "complete" means in its own markup, as a list of CSS selectors that
       must each match something (`data-step-require`, split on `|`). That is why
       the same file drives the website builder and the hospitality builder
       without a line of per-builder branching.
     - Everything it does is additive and JavaScript-only. Without this script no
       section is ever hidden, the continue controls stay plain anchors and the
       page reads top to bottom exactly as it did before.

   THE CLICK LISTENER IS REGISTERED IN THE CAPTURE PHASE, and that is not a
   detail. Three other things want the same click on a continue control:

     - js/main.js binds its smooth-scroll handler to every `a[href]` DIRECTLY, so
       it runs in the target phase — before any bubble listener on an ancestor;
     - the builder's own delegated handler runs on this same root, in the bubble
       phase, and drives the weighted scroll;
     - the anchor's own default action changes the hash.

   Capturing on the root is the only position that runs before all three. A bubble
   listener here was measurably too late: main.js had already pushed #foundation
   into the URL and started scrolling toward a chapter that was still closed.

   LOAD ORDER IS ALSO CONTRACTUAL: this file must be included BEFORE the builder's
   own script, so window.pmBuilderFlow exists by the time the builder's first
   render calls refresh(). */
(function (window, document) {
    'use strict';

    /* The two builders name their continue control differently. Nothing else in
       this file is builder-specific. */
    const NEXT_SELECTOR = '.wb-next, .hb-next';

    function stepOf(section) {
        return parseInt(section.getAttribute('data-builder-step'), 10) || 0;
    }

    function reducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* The navigation rail is fixed, so a raw scrollIntoView() puts the chapter
       heading underneath it. Same offset arithmetic the builders' own weighted
       scroll uses. */
    function scrollToSection(section) {
        const cs = getComputedStyle(document.documentElement);
        const headerH = parseFloat(cs.getPropertyValue('--header-h')) || 76;
        const navFloat = parseFloat(cs.getPropertyValue('--nav-float')) || 0;
        const top = Math.max(
            0,
            window.scrollY + section.getBoundingClientRect().top - (headerH + navFloat + 16)
        );
        window.scrollTo({ top: top, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }

    function create(root) {
        const sections = Array.prototype.slice.call(root.querySelectorAll('[data-builder-step]'));
        const starter = root.querySelector('[data-builder-start]');
        if (!sections.length || !starter) return null;

        const outlineItems = Array.prototype.slice.call(root.querySelectorAll('[data-outline-for]'));

        /* Sections may share a step number — that is how a read-only companion
           chapter (the credibility strip between "always included" and "your
           additions") opens and closes with the chapter it belongs to. Only one
           section in a group may carry a continue control. */
        const numbers = [];
        sections.forEach(function (section) {
            const n = stepOf(section);
            if (n && numbers.indexOf(n) === -1) numbers.push(n);
        });
        numbers.sort(function (a, b) { return a - b; });
        if (!numbers.length) return null;

        const firstStep = numbers[0];
        let started = false;
        let open = 0; // highest step number currently revealed; 0 = none

        function inStep(n) {
            return sections.filter(function (section) { return stepOf(section) === n; });
        }

        /* Returns the sentence explaining why this step cannot be left yet, or ''
           when it can. The requirement lives in the markup precisely so this file
           never has to read builder state. */
        function unmet(n) {
            let reason = '';
            inStep(n).forEach(function (section) {
                if (reason) return;
                const raw = section.getAttribute('data-step-require');
                if (!raw) return;
                const satisfied = raw.split('|').every(function (selector) {
                    const sel = selector.trim();
                    return !sel || !!document.querySelector(sel);
                });
                if (!satisfied) {
                    reason = section.getAttribute('data-step-missing')
                        || 'Answer this step before moving on.';
                }
            });
            return reason;
        }

        /* Created lazily and left in the DOM afterwards, so the live region exists
           before its text changes — announcing a region that was only just inserted
           is unreliable. Empty is its hidden state (see the :empty rule in
           css/builder_flow.css). */
        function hintFor(section) {
            let hint = section.querySelector('[data-step-hint]');
            if (hint) return hint;
            const next = section.querySelector(NEXT_SELECTOR);
            if (!next || !next.parentNode) return null;
            hint = document.createElement('p');
            hint.className = 'builder-hint';
            hint.setAttribute('data-step-hint', '');
            hint.setAttribute('role', 'status');
            next.parentNode.insertBefore(hint, next.nextSibling);
            return hint;
        }

        function paintOutline() {
            outlineItems.forEach(function (item) {
                const n = parseInt(item.getAttribute('data-outline-for'), 10) || 0;
                const locked = !started || n > open;
                const current = started && n === open;
                item.classList.toggle('is-locked', locked);
                item.classList.toggle('is-current', current);
                item.classList.toggle('is-done', started && n < open);
                const label = item.querySelector('[data-outline-state]');
                if (!label) return;
                label.textContent = locked ? 'Locked' : (current ? 'You are here' : 'Done');
            });
        }

        function paint() {
            numbers.forEach(function (n) {
                const locked = !started || n > open;
                inStep(n).forEach(function (section) {
                    // Only touch the attribute on an actual change, so the reveal
                    // animation cannot be restarted by an unrelated repaint.
                    if (locked === section.hasAttribute('hidden')) return;
                    if (locked) {
                        section.setAttribute('hidden', '');
                        section.classList.remove('is-revealed');
                    } else {
                        section.removeAttribute('hidden');
                        section.classList.add('is-revealed');
                    }
                });
            });

            sections.forEach(function (section) {
                const next = section.querySelector(NEXT_SELECTOR);
                if (!next) return;
                const reason = unmet(stepOf(section));
                next.classList.toggle('is-blocked', !!reason);
                // aria-disabled rather than a disabled control: it stays reachable,
                // so a keyboard visitor can land on it and be told what is missing.
                next.setAttribute('aria-disabled', reason ? 'true' : 'false');
                if (reason) return;
                const hint = section.querySelector('[data-step-hint]');
                if (hint) hint.textContent = '';
            });

            paintOutline();
        }

        function reveal(n) {
            if (!started || !n || n <= open) return false;
            open = n;
            paint();
            return true;
        }

        function begin() {
            if (started) return;
            started = true;
            open = firstStep;
            root.classList.add('builder-flow-started');
            paint();
            const target = inStep(firstStep)[0];
            if (!target) return;
            scrollToSection(target);
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }

        function refuse(section, reason) {
            const hint = hintFor(section);
            if (hint) hint.textContent = reason;
            const selector = section.getAttribute('data-step-focus');
            const target = selector && section.querySelector(selector);
            if (!target) return;
            scrollToSection(section);
            target.focus({ preventScroll: true });
        }

        root.addEventListener('click', function (event) {
            if (!(event.target instanceof Element)) return;

            const start = event.target.closest('[data-builder-start]');
            if (start && root.contains(start)) {
                event.preventDefault();
                begin();
                return;
            }

            const next = event.target.closest(NEXT_SELECTOR);
            if (!next || !root.contains(next)) return;
            const section = next.closest('[data-builder-step]');
            if (!section) return;

            const reason = unmet(stepOf(section));
            if (reason) {
                event.preventDefault();
                /* Stops the click before it reaches the anchor itself, which is
                   where js/main.js binds its smooth-scroll-and-push-the-hash
                   handler, and before the builder's own delegated handler on the
                   bubble pass. Without this the URL would advance to a chapter the
                   visitor cannot see. See the capture-phase note at the top. */
                event.stopImmediatePropagation();
                refuse(section, reason);
                return;
            }

            // Open the destination BEFORE the builder's own handler measures it: a
            // section still carrying [hidden] has no position to scroll to.
            const href = next.getAttribute('href') || '';
            const destination = href.charAt(0) === '#' && href.length > 1
                ? document.querySelector(href)
                : null;
            if (destination && destination.hasAttribute('data-builder-step')) {
                reveal(stepOf(destination));
            }
            // Not stopped: the chapter is open now, so main.js and the builder are
            // both free to do their usual scrolling from here.
        }, true);

        return {
            isStarted: function () { return started; },
            start: begin,
            refresh: paint,

            /* Used by the builders' own guided auto-advance, which scrolls to a
               chapter after the visitor has been still for a moment. It has to open
               the chapter first, for the same reason the click handler does. */
            revealTarget: function (selector) {
                const node = selector && selector.charAt(0) === '#'
                    ? document.querySelector(selector)
                    : null;
                if (!node || !node.hasAttribute('data-builder-step')) return false;
                return reveal(stepOf(node));
            },

            /* The first step whose requirements are still unmet, or null. The
               builders use this to refuse a submission whose configuration is
               incomplete, and to send the visitor back to the step that is
               missing. */
            firstIncomplete: function () {
                for (let i = 0; i < numbers.length; i++) {
                    const reason = unmet(numbers[i]);
                    if (reason) {
                        return { step: numbers[i], reason: reason, section: inStep(numbers[i])[0] };
                    }
                }
                return null;
            },

            returnTo: function (n) {
                const section = inStep(n)[0];
                if (!section) return;
                reveal(n);
                refuse(section, unmet(n) || '');
            },
        };
    }

    const root = document.querySelector('[data-builder-flow]');
    if (!root) return;

    const flow = create(root);
    if (!flow) return;

    window.pmBuilderFlow = flow;
    // The styling hook for every gated state. Set from script on purpose: without
    // JavaScript the class never lands and nothing on the page is hidden.
    root.classList.add('builder-flow-on');
    flow.refresh();
})(window, document);
