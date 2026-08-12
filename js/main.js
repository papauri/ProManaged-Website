document.addEventListener("DOMContentLoaded", function () {

    // Capability blocks navigate to their data-target. They carry role="link" and
    // tabindex="0" in the HTML, so Enter/Space must activate them like a click.
    document.querySelectorAll('.service-card').forEach(card => {
        const navigate = () => {
            const targetUrl = card.getAttribute('data-target');
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        };
        card.addEventListener('click', navigate);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate();
            }
        });
    });

    // In-page anchors: smooth-scroll with the floating logo tile's height as the
    // offset. There is no header element to measure any more, so the offset comes
    // from the same --header-h token the CSS uses for scroll-margin-top.
    const headerOffset = (() => {
        const raw = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
            10
        );
        return Number.isFinite(raw) ? raw : 92;
    })();

    // Matches both "#about" and "index.html#about" pointing at the current page, so
    // the navigation panel's homepage links scroll instead of reloading when you are
    // already on the homepage. Genuine cross-page links are left alone.
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function (e) {
            const url = new URL(this.href, window.location.href);
            if (!url.hash || url.hash === '#') return;
            if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) return;

            const targetElement = document.getElementById(decodeURIComponent(url.hash.slice(1)));
            if (!targetElement) return;

            e.preventDefault();
            const top = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
            // Keep the address bar in step without triggering a second jump.
            history.pushState(null, '', url.hash);
        });
    });

    /* ---------------------------------------------------------------------------
       "Building blocks" motion — the site's signature entrance.

       Whole blocks settle into place: the hero composition assembles on load, then
       each major chapter assembles as it is scrolled to. Only chapter-level blocks
       move; text, icons and list items never animate individually.

       Two rules govern the whole system:
       - Content is never withheld. Nothing waits on a timer, the hidden state is
         only ever a transform/opacity, and a safety net clears it unconditionally.
       - Under prefers-reduced-motion nothing is scheduled at all.
       --------------------------------------------------------------------------- */

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canAnimate = !prefersReducedMotion && 'IntersectionObserver' in window;

    // Which elements count as a "block" inside a chapter. These are the large
    // rectangles of the layout — grid blocks, process steps, the chapter heading, the
    // founder portrait/story pair, whole form columns. Nothing smaller: never a
    // heading, paragraph, icon, list item or individual form control on its own.
    //
    // Legal/privacy copy is deliberately absent. privacy_policy.html still carries a
    // data-blocks attribute, but nothing inside it matches, so the group is skipped
    // and the policy text is simply present from the first paint.
    const UNIT_SELECTOR = [
        '.chapter-head',
        '.grid > .block',
        '.process-steps > .process-step',
        '.about-grid > *',
        '.contact-grid > *',
        '.booking-grid > *',
        '.faq-container'
    ].join(', ');

    // Cap the stagger so a chapter with many blocks still finishes promptly —
    // without this an 8-block chapter would take over half a second just to start
    // its last block.
    const MAX_STAGGER_STEPS = 5;
    // Read the tokens once. CSS stays the single source of truth for the motion's
    // shape; JS only needs the numbers to know when a group has finished settling.
    const cssMs = (name, fallback) => {
        const raw = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(name),
            10
        );
        return Number.isFinite(raw) ? raw : fallback;
    };
    const STAGGER_MS = cssMs('--block-stagger', 80);
    const DURATION_MS = cssMs('--block-duration', 560);
    const staggerMs = (index) => Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;

    // Remove every trace of the entrance once it has played, so no element keeps a
    // stale will-change, transition-delay or hidden state for the rest of the session.
    const clearMotion = (el) => {
        el.classList.remove('block-reveal', 'is-settled');
        el.style.removeProperty('--block-delay');
    };

    const settleGroup = (units, onDone) => {
        units.forEach((el, i) => {
            el.style.setProperty('--block-delay', staggerMs(i) + 'ms');
            el.classList.add('is-settled');
        });
        // Longest delay + the transition itself (plus a small margin for the
        // overshoot to come to rest), then tidy up. Derived from the tokens so it
        // cannot silently go stale if the motion is retuned.
        const total = staggerMs(units.length - 1) + DURATION_MS + 140;
        window.setTimeout(() => {
            units.forEach(clearMotion);
            if (onDone) onDone();
        }, total);
    };

    // --- 1. Initial load: the hero composition assembles ---------------------------
    // The hero is hidden by CSS via `.js-on [data-assemble] .hero-*` — an element
    // selector, live before first paint, so nothing flashes in and back out. This
    // script only releases it.
    const assembleRoot = document.querySelector('[data-assemble]');

    if (assembleRoot) {
        // The three large rounded blocks the hero is actually built from. Targeting
        // these rather than .hero-rail's two children gives a real three-step
        // assembly and avoids nesting a transform inside another transform.
        const heroUnits = [...assembleRoot.querySelectorAll(
            '.hero-statement, .hero-feature, .hero-support'
        )];

        // Dropping the attribute makes every hiding rule stop matching at once —
        // the single, complete way to hand the hero back to normal styling.
        const release = () => assembleRoot.removeAttribute('data-assemble');

        if (!canAnimate) {
            release();
        } else {
            // Two frames: the first lets the browser paint the hidden state, the
            // second flips it — without this the transition is skipped entirely.
            requestAnimationFrame(() => requestAnimationFrame(() => settleGroup(heroUnits, release)));
            // Independent safety net: if anything above throws or a frame never
            // arrives (background tab), the hero must still become visible.
            window.setTimeout(release, 2500);
        }
    }

    // --- 2. Scroll: each major chapter assembles ----------------------------------
    if (canAnimate) {
        const groups = document.querySelectorAll('[data-blocks]');

        const groupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                groupObserver.unobserve(entry.target);
                settleGroup([...entry.target.querySelectorAll(UNIT_SELECTOR)]);
            });
        }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

        groups.forEach(group => {
            const units = group.querySelectorAll(UNIT_SELECTOR);
            if (!units.length) return;
            // A chapter already on screen at load has nothing to reveal on scroll;
            // leaving it hidden would make above-the-fold content invisible.
            if (group.getBoundingClientRect().top < window.innerHeight * 0.9) return;
            units.forEach(el => el.classList.add('block-reveal'));
            groupObserver.observe(group);
        });

        // Safety net: content must never stay invisible. If anything has not settled
        // by now — a viewport that jumped past it, a stalled observer, a print or
        // screenshot pass — drop the hidden state unconditionally.
        window.setTimeout(() => {
            document.querySelectorAll('.block-reveal').forEach(clearMotion);
        }, 4000);
    }

    // Back-to-top control.
    const scrollTopButton = document.createElement('button');
    scrollTopButton.type = 'button';
    scrollTopButton.innerHTML = '&uarr;';
    scrollTopButton.setAttribute('aria-label', 'Scroll back to top');
    scrollTopButton.classList.add('scroll-top-btn');
    scrollTopButton.hidden = true;
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        scrollTopButton.hidden = window.scrollY <= 400;
    }, { passive: true });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
