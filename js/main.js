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
    const UNIT_SELECTOR = [
        '.chapter-head',
        '.grid > .block',
        '.process-steps > .process-step',
        '.about-grid > *',
        '.contact-grid > *',
        '.booking-grid > *',
        '.faq-container'
    ].join(', ');
    const MAX_STAGGER_STEPS = 6;
    const cssMs = (name, fallback) => {
        const raw = parseInt(getComputedStyle(document.documentElement).getPropertyValue(name), 10);
        return Number.isFinite(raw) ? raw : fallback;
    };
    const motion = () => ({
        stagger: cssMs('--block-stagger', 90),
        duration: cssMs('--block-duration', 620),
    });
    const VARIANTS = {
        'settle-up': { cls: 'block-reveal--up', mult: 1 },
        'settle-side': { cls: 'block-reveal--side', mult: 1.05 },
        'scale-in': { cls: 'block-reveal--scale', mult: 0.75 },
        'sequence-in': { cls: 'block-reveal--seq', mult: 1.25 },
    };
    const variantOf = (name) => VARIANTS[name] || VARIANTS['settle-up'];
    const staggerMs = (index, step) => Math.min(index, MAX_STAGGER_STEPS) * step;

    const clearMotion = (el) => {
        el.classList.remove('block-reveal', 'is-settled', 'block-reveal--up', 'block-reveal--side', 'block-reveal--scale', 'block-reveal--seq');
        el.style.removeProperty('--block-delay');
        el.style.removeProperty('--block-index');
    };

    const settleGroup = (units, onDone, variantName) => {
        if (!units.length) {
            if (onDone) onDone();
            return;
        }
        const { stagger, duration } = motion();
        const step = Math.round(stagger * variantOf(variantName).mult);
        units.forEach((el, i) => {
            el.style.setProperty('--block-delay', staggerMs(i, step) + 'ms');
            el.style.setProperty('--block-index', i);
            el.classList.add('is-settled');
        });
        const total = staggerMs(units.length - 1, step) + duration + 180;
        window.setTimeout(() => {
            units.forEach(clearMotion);
            if (onDone) onDone();
        }, total);
    };

    const assembleRoot = document.querySelector('[data-assemble]');
    if (assembleRoot) {
        const heroUnits = [...assembleRoot.querySelectorAll('.hero-statement, .hero-feature, .hero-support')];
        const release = () => assembleRoot.removeAttribute('data-assemble');
        if (!canAnimate) {
            release();
        } else {
            requestAnimationFrame(() => requestAnimationFrame(() => settleGroup(heroUnits, release, 'sequence-in')));
            window.setTimeout(release, 2800);
        }
    }

    if (canAnimate) {
        const groups = document.querySelectorAll('[data-blocks]');
        const settleVisibleGroups = () => {
            groups.forEach(group => {
                const units = [...group.querySelectorAll(UNIT_SELECTOR)];
                if (!units.length) return;
                const variant = group.dataset.blocks || 'settle-up';
                const nearViewport = group.getBoundingClientRect().top < window.innerHeight * 1.08;
                if (nearViewport && !group.dataset.motionReady) {
                    group.dataset.motionReady = 'true';
                    units.forEach(el => {
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
                units.forEach(el => el.classList.add('block-reveal', variantOf(variant).cls));
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

        window.setTimeout(() => {
            document.querySelectorAll('.block-reveal').forEach(clearMotion);
        }, 7000);
    }

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
