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

    // In-page nav links: offset the smooth scroll by the fixed header height.
    // Cross-page links (e.g. ../index.html#about) are left to navigate normally —
    // those land correctly via the scroll-margin-top rule in global_styles.css.
    const header = document.querySelector('.header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#') || href === '#') {
                return;
            }
            const targetElement = document.getElementById(href.substring(1));
            if (!targetElement) {
                return;
            }
            e.preventDefault();
            const top = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // Subtle reveal on scroll — the only entrance motion on the site.
    // The .reveal class (which sets opacity:0) is applied HERE rather than in the
    // markup, so if this script never runs the content is simply visible instead of
    // permanently invisible.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const targets = document.querySelectorAll(
            '.chapter-head, .block, .process-step, .about-grid > *, .contact-grid > *, .expectation'
        );

        // Clearing both classes returns the element to its own (faster) hover/focus
        // transition timing, and makes the hidden state impossible to get stuck in.
        const settle = (el) => el.classList.remove('reveal', 'is-visible');
        const show = (el) => {
            el.classList.add('is-visible');
            window.setTimeout(() => settle(el), 600);
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                revealObserver.unobserve(entry.target);
                show(entry.target);
            });
        }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });

        targets.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });

        // Safety net: content must never stay invisible. If anything has not been
        // revealed by now — a viewport that jumped past it, a stalled observer, a
        // print or screenshot pass — drop the hidden state unconditionally.
        window.setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                revealObserver.unobserve(el);
                settle(el);
            });
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
