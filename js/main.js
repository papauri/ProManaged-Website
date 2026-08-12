document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.service-card').forEach(card => {
        const navigate = () => {
            const targetUrl = card.getAttribute('data-target');
            if (targetUrl) window.location.href = targetUrl;
        };
        card.addEventListener('click', navigate);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate();
            }
        });
    });

    const headerOffset = (() => {
        const raw = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10);
        return Number.isFinite(raw) ? raw : 92;
    })();

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
            history.pushState(null, '', url.hash);
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canAnimate = !prefersReducedMotion && 'IntersectionObserver' in window;
    // Phones get fewer stagger steps and a tighter clock: the same design language,
    // but the first screen has to resolve quickly on a small viewport.
    const isCompact = () => window.matchMedia('(max-width: 767px)').matches;
    // What counts as one animated "block". Groups are marked with [data-blocks];
    // these are the units inside them that actually settle. A chapter whose content
    // matches none of these gets no visible motion, so every public page's chapters
    // are represented here — including the footer and the legal page.
    const UNIT_SELECTOR = [
        '.chapter-head',
        '.grid > .block',
        '.process-steps > .process-step',
        '.about-grid > *',
        '.contact-grid > *',
        '.booking-grid > *',
        '.faq-container',
        '.privacy-section',
        '.evidence-rail > div',
        '.footer-content > *'
    ].join(', ');
    const cssMs = (name, fallback) => {
        const raw = parseInt(getComputedStyle(document.documentElement).getPropertyValue(name), 10);
        return Number.isFinite(raw) ? raw : fallback;
    };
    const motion = () => ({
        stagger: cssMs('--block-stagger', 90),
        duration: cssMs('--block-duration', 620),
        maxSteps: isCompact() ? 4 : 6,
    });
    const VARIANTS = {
        'settle-up': { cls: 'block-reveal--up', mult: 1 },
        'settle-side': { cls: 'block-reveal--side', mult: 1.05 },
        'scale-in': { cls: 'block-reveal--scale', mult: 0.75 },
        'sequence-in': { cls: 'block-reveal--seq', mult: 1.25 },
    };
    const variantOf = (name) => VARIANTS[name] || VARIANTS['settle-up'];
    const staggerMs = (index, step, maxSteps) => Math.min(index, maxSteps) * step;

    const clearMotion = (el) => {
        el.classList.remove('block-reveal', 'is-settled', 'block-reveal--up', 'block-reveal--side', 'block-reveal--scale', 'block-reveal--seq');
        el.style.removeProperty('--block-delay');
        el.style.removeProperty('--dir');
    };

    /* settle-side hinges each card on the screen edge it is already nearest, so a
       card on the left swings in from the left and one on the right from the right.
       Measured once, at the moment the group is staged — reading it later would mean
       reading a position the card has already started animating away from. */
    const applyHinge = (el) => {
        const rect = el.getBoundingClientRect();
        if (!rect.width) return;
        const fromLeft = rect.left + rect.width / 2 < window.innerWidth / 2;
        el.style.setProperty('--dir', fromLeft ? '-1' : '1');
    };

    const settleGroup = (units, onDone, variantName) => {
        if (!units.length) {
            if (onDone) onDone();
            return;
        }
        const { stagger, duration, maxSteps } = motion();
        const step = Math.round(stagger * variantOf(variantName).mult);
        units.forEach((el, i) => {
            el.style.setProperty('--block-delay', staggerMs(i, step, maxSteps) + 'ms');
            el.classList.add('is-settled');
        });
        const total = staggerMs(units.length - 1, step, maxSteps) + duration + 180;
        window.setTimeout(() => {
            units.forEach(clearMotion);
            if (onDone) onDone();
        }, total);
    };

    /* ---------- First-paint block assembly ----------
       The hero does not fade in as one plane. It assembles in named phases so the
       interface reads as resolving into place:

         the navigation control  (pure CSS, in global_styles.css — it must never
                                  depend on this script)
         the statement           settles first
         the capability block    lands behind it
         the evidence cards      arrive in a stagger
         the support facts       close the visual column
         the CTAs                resolve last, into their final state

       `gap` is a multiple of --load-stagger measured from the previous phase's
       start. Phones collapse the gaps and drop the per-card stagger entirely, so the
       phone hero finishes noticeably sooner without losing the sequence. */
    const LOAD_PHASES = [
        { sel: '.hero-statement',    gap: 0,   stagger: false },
        { sel: '.hero-feature',      gap: 1.7, stagger: false },
        { sel: '.hero-project-card', gap: 1.0, stagger: true },
        { sel: '.hero-support',      gap: 1.0, stagger: false },
        { sel: '.hero-buttons',      gap: 1.3, stagger: false },
        { sel: '.hero-microproof',   gap: 0.6, stagger: false },
    ];

    const assembleRoot = document.querySelector('[data-assemble]');
    if (assembleRoot) {
        const staged = [];

        // Visibility is MONOTONIC: every path below leads to "visible", and nothing
        // here can ever hide something that is already on screen. Dropping
        // [data-assemble] retires the whole pre-load stylesheet in one go, so no
        // element is left carrying will-change or a stale delay.
        const release = () => {
            if (window.pmHeroFailsafe) {
                window.clearTimeout(window.pmHeroFailsafe);
                window.pmHeroFailsafe = 0;
            }
            assembleRoot.removeAttribute('data-assemble');
            staged.forEach((el) => {
                el.classList.remove('is-settled');
                el.style.removeProperty('--block-delay');
            });
        };

        // The inline failsafe has already resolved the hero, which means this script
        // arrived too late to choreograph it (slow network, slow device, blocked
        // request that recovered). Take the final state and stop — re-hiding a hero
        // the visitor can already read, just to animate it, is a flash, not a
        // premium load. .load-failsafe is never removed by design.
        const failsafeWon = document.documentElement.classList.contains('load-failsafe');

        if (!canAnimate || failsafeWon) {
            // Reduced motion / no IntersectionObserver / late script: final state,
            // immediately. For reduced motion the stylesheet forces this anyway,
            // independently of this script running at all.
            release();
        } else {
            try {
                const step = cssMs('--load-stagger', 90);
                const duration = cssMs('--load-duration', 860);
                const compact = isCompact();
                let cursor = 0;
                let lastDelay = 0;

                LOAD_PHASES.forEach((phase) => {
                    const found = [...assembleRoot.querySelectorAll(phase.sel)];
                    if (!found.length) return;
                    cursor += Math.round(step * phase.gap * (compact ? 0.7 : 1));
                    const perCard = phase.stagger && !compact ? step : 0;
                    found.forEach((el, i) => {
                        const delay = cursor + i * perCard;
                        el.style.setProperty('--block-delay', delay + 'ms');
                        staged.push(el);
                        if (delay > lastDelay) lastDelay = delay;
                    });
                    cursor += (found.length - 1) * perCard;
                });

                if (!staged.length) {
                    release();
                } else {
                    // Arm the bounded release BEFORE starting, so the hero resolves
                    // even if the frame callbacks below never run.
                    window.setTimeout(release, lastDelay + duration + 240);

                    // Then stand the inline failsafe down. It exists only to cover
                    // "main.js never took control"; we now have control and a bounded
                    // release of our own, so leaving it armed would cut the tail of
                    // the choreography short — the full sequence outlasts its 1200ms
                    // on desktop, and the last blocks would snap instead of settling.
                    // Only the pending TIMER is cancelled; the class is never removed,
                    // so this cannot re-hide anything. If the class was already set we
                    // never reach here — the failsafeWon branch above took over.
                    if (window.pmHeroFailsafe) {
                        window.clearTimeout(window.pmHeroFailsafe);
                        window.pmHeroFailsafe = 0;
                    }

                    // Two frames: the first paints the pre-load state, the second
                    // flips it. Without this the browser coalesces both and skips
                    // the motion entirely.
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        staged.forEach((el) => el.classList.add('is-settled'));
                    }));
                }
            } catch (err) {
                // Anything unexpected while staging: show the hero rather than leave
                // a viewport of hidden content behind a thrown exception.
                release();
            }
        }
    }

    if (canAnimate) {
        const groups = document.querySelectorAll('[data-blocks]');

        // Registered FIRST, before a single .block-reveal is applied. If anything
        // below throws mid-setup, this still runs and strips the hidden state off
        // every chapter unit, so a partial failure can never leave a section of the
        // page permanently invisible.
        window.setTimeout(() => {
            document.querySelectorAll('.block-reveal').forEach(clearMotion);
        }, 7000);

        const settleVisibleGroups = () => {
            groups.forEach(group => {
                const units = [...group.querySelectorAll(UNIT_SELECTOR)];
                if (!units.length) return;
                const variant = group.dataset.blocks || 'settle-up';
                const nearViewport = group.getBoundingClientRect().top < window.innerHeight * 1.08;
                if (nearViewport && !group.dataset.motionReady) {
                    group.dataset.motionReady = 'true';
                    units.forEach(el => {
                        if (variant === 'settle-side') applyHinge(el);
                        el.classList.add('block-reveal', variantOf(variant).cls);
                    });
                    requestAnimationFrame(() => settleGroup(units, null, variant));
                }
            });
        };

        const groupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                groupObserver.unobserve(entry.target);
                const variant = entry.target.dataset.blocks || 'settle-up';
                const units = [...entry.target.querySelectorAll(UNIT_SELECTOR)];
                if (!units.length) return;
                entry.target.dataset.motionReady = 'true';
                units.forEach(el => {
                    if (variant === 'settle-side') applyHinge(el);
                    el.classList.add('block-reveal', variantOf(variant).cls);
                });
                requestAnimationFrame(() => settleGroup(units, null, variant));
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

        groups.forEach(group => {
            const units = group.querySelectorAll(UNIT_SELECTOR);
            if (!units.length) return;
            if (group.getBoundingClientRect().top < window.innerHeight * 1.05) {
                settleVisibleGroups();
            } else {
                groupObserver.observe(group);
            }
        });
    }

    /* ---------- Navigation control: blend with the hero ----------
       The control is fixed over a dark graphite hero at the top of every page and
       over paper surfaces once you scroll. This flags which one is behind it so
       css/navbar.css can switch the control between its glass and solid treatments.

       Geometry rather than a fixed scroll offset, because the hero's height varies
       per page and per breakpoint: the flag is on while the hero still covers the
       bottom edge of the control. Reads are rAF-throttled so a scroll never does
       layout work more than once a frame, and the listener is passive. */
    const heroForNav = document.querySelector('#hero-section') || document.querySelector('.hero');
    const navControl = document.querySelector('#nav-trigger');
    if (heroForNav && navControl) {
        let queued = false;
        const syncNavSurface = () => {
            queued = false;
            const overHero = heroForNav.getBoundingClientRect().bottom
                > navControl.getBoundingClientRect().bottom;
            document.documentElement.classList.toggle('nav-over-hero', overHero);
        };
        const requestNavSync = () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(syncNavSurface);
        };
        syncNavSurface();
        window.addEventListener('scroll', requestNavSync, { passive: true });
        window.addEventListener('resize', requestNavSync);
    }

    // The footer year is written into the markup so it is correct without JS, and
    // refreshed here so it stays correct after the calendar rolls over.
    document.querySelectorAll('[data-current-year]').forEach((el) => {
        el.textContent = String(new Date().getFullYear());
    });

    const scrollTopButton = document.createElement('button');
    scrollTopButton.type = 'button';
    scrollTopButton.innerHTML = '&uarr;';
    scrollTopButton.setAttribute('aria-label', 'Scroll back to top');
    scrollTopButton.classList.add('scroll-top-btn');
    scrollTopButton.hidden = true;
    document.body.appendChild(scrollTopButton);
    window.addEventListener('scroll', () => { scrollTopButton.hidden = window.scrollY <= 400; }, { passive: true });
    scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
