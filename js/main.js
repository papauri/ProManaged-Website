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

    // The fixed rail is the capsule's own height PLUS the gap it floats above the
    // viewport edge, so both tokens have to be read here — otherwise an anchor lands
    // --nav-float too high and the target's first line sits under the bar.
    const headerOffset = (() => {
        const styles = getComputedStyle(document.documentElement);
        const read = (name, fallback) => {
            const raw = parseInt(styles.getPropertyValue(name), 10);
            return Number.isFinite(raw) ? raw : fallback;
        };
        return read('--header-h', 92) + read('--nav-float', 0);
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
        // The pinned chapter's steps live in a different container. Above 1024px they
        // arrive lit and then three of them dim once the step controller below marks
        // the chapter ready — it assembles, then focus narrows onto one step. Below
        // 1024px there is no dim state, so they settle like any other chapter.
        '.pinned-steps > .process-step',
        '.about-grid > *',
        '.contact-grid > *',
        '.booking-grid > *',
        '.proof-strip > *',
        // The homepage's "what do you need?" route band. A chapter whose content
        // matches nothing in this list gets no motion at all and sits static while
        // every chapter around it settles, so a new chapter type has to be
        // registered here.
        '.routes-grid > .route',
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

    /* ---------- Motion intensity ----------
       BUILD_PLAN §2B maps how loud each chapter is allowed to be. Most groups are
       "subtle" and settle card by card. A group marked [data-blocks-pace="calm"] is
       one of the near-absent chapters — the real-proof chapter, contact, the footer —
       where the plan asks for ONE quick group settle and no per-card sparkle. The
       stagger collapses to zero so the whole group arrives as a single weight; the
       shorter travel and duration are set in CSS on the same attribute.

       This is a pacing dial, not a second motion system: the variant, the easing and
       the release path are all unchanged, so a calm chapter still clears its classes
       through exactly the same code as every other one. */
    const paceOf = (group) => (group && group.dataset.blocksPace) || 'normal';

    const settleGroup = (units, onDone, variantName, pace) => {
        if (!units.length) {
            if (onDone) onDone();
            return;
        }
        const { stagger, duration, maxSteps } = motion();
        const step = pace === 'calm' ? 0 : Math.round(stagger * variantOf(variantName).mult);
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
         the eyebrow             leads, lightest and quickest
         the headline            settles with the most weight of any beat in the
                                  hero — the moment that should read as deliberate
         the subheadline         catches up a step behind it
         the capability block    lands behind the statement
         the evidence cards      arrive in a stagger
         the support facts       close the visual column
         the CTAs                resolve last, into their final state

       `gap` is a multiple of --load-stagger measured from the previous phase's
       start. Phones collapse the gaps and drop the per-card stagger entirely, so the
       phone hero finishes noticeably sooner without losing the sequence. */
    const LOAD_PHASES = [
        { sel: '.hero-eyebrow',      gap: 0,   stagger: false },
        { sel: '#hero-title',        gap: 0.5, stagger: false },
        { sel: '#hero-subtitle',     gap: 0.5, stagger: false },
        { sel: '.hero-feature',      gap: 1.0, stagger: false },
        { sel: '.hero-project-card', gap: 0.9, stagger: true },
        { sel: '.hero-support',      gap: 0.9, stagger: false },
        { sel: '.hero-buttons',      gap: 1.0, stagger: false },
        { sel: '.hero-microproof',   gap: 0.5, stagger: false },
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
                    requestAnimationFrame(() => settleGroup(units, null, variant, paceOf(group)));
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
                requestAnimationFrame(() => settleGroup(units, null, variant, paceOf(entry.target)));
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

    /* ---------- Pinned stepper chapter ----------
       The stage is pinned by CSS (position: sticky). All this does is decide which
       step is the current one and mirror that onto the matching visual — it never
       touches the scroll position, never writes a transform, and never animates
       anything itself. Every visual consequence belongs to the stylesheet.

       "Which step is current" is a question about POSITION, so it is answered by
       measuring position, not by watching transitions. An IntersectionObserver
       band was tried first and is the wrong tool: it reports edge crossings, and
       crossings get coalesced when the viewport jumps. Measured, scrolling in 90px
       increments, step 03 was never activated once — the observer went straight from
       02 to 04 — and an anchor jump into the middle of the chapter left it stuck on
       whichever step happened to be current beforehand. Nearest-to-the-line cannot
       skip a step or get stranded, because it re-derives the answer from scratch
       every time it runs.

       Cost is four getBoundingClientRect calls, rAF-throttled, on a passive listener,
       and only while the chapter is actually near the viewport — the same pattern the
       nav-surface sync below already uses.

       Additive throughout: step 1 and its visual carry .is-current in the markup, so
       if none of this runs the chapter is still a legible list with its first fragment
       showing. Below 1024px the stage is display:none and this never starts. */
    const pinnedRoot = document.querySelector('[data-pinned]');
    if (pinnedRoot && window.matchMedia('(min-width: 1024px)').matches) {
        const steps = [...pinnedRoot.querySelectorAll('[data-pinned-step]')];
        const panels = [...pinnedRoot.querySelectorAll('[data-pinned-panel]')];

        if (steps.length && panels.length) {
            let current = null;
            let queued = false;
            let near = true;

            const setCurrent = (key) => {
                if (!key || key === current) return;
                current = key;
                steps.forEach(el => el.classList.toggle('is-current', el.dataset.pinnedStep === key));
                panels.forEach(el => el.classList.toggle('is-current', el.dataset.pinnedPanel === key));
            };

            // The step whose extent is nearest the middle of the viewport wins.
            // Distance is zero for a step that spans the line — and since the steps
            // are contiguous and never overlap, at most one ever does. Past the last
            // step (the trailing padding that holds the pin) the nearest is still
            // step 04, which is what keeps the final fragment on screen.
            const pick = () => {
                queued = false;
                const line = window.innerHeight / 2;
                let best = null;
                let bestDistance = Infinity;
                steps.forEach((el) => {
                    const box = el.getBoundingClientRect();
                    const distance = box.top > line ? box.top - line
                        : box.bottom < line ? line - box.bottom
                        : 0;
                    if (distance < bestDistance) {
                        bestDistance = distance;
                        best = el;
                    }
                });
                if (best) setCurrent(best.dataset.pinnedStep);
            };

            const requestPick = () => {
                if (queued || !near) return;
                queued = true;
                requestAnimationFrame(pick);
            };

            // Gate the listener on the chapter being roughly on screen, so scrolling
            // the rest of the page costs nothing at all.
            if ('IntersectionObserver' in window) {
                new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        near = entry.isIntersecting;
                        if (near) requestPick();
                    });
                }, { rootMargin: '250px 0px 250px 0px' }).observe(pinnedRoot);
            }

            window.addEventListener('scroll', requestPick, { passive: true });
            window.addEventListener('resize', requestPick);
            pick();

            // Only now does the stylesheet get permission to dim the inactive steps.
            // Set last, after the listeners are attached and a first step has been
            // chosen, so the dim can never outlive the thing that resolves it.
            pinnedRoot.dataset.pinnedReady = 'true';
        }
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
