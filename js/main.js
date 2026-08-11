document.addEventListener("DOMContentLoaded", function () {

    // Handle navigation for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        const navigate = () => {
            const targetUrl = card.getAttribute('data-target');
            if (targetUrl) {
                window.location.href = targetUrl; // Navigate to the specified URL
            } else {
                console.warn("No target URL specified for this card.");
            }
        };
        card.addEventListener('click', navigate);
        // Keyboard support: card carries role="link" + tabindex="0" in the HTML,
        // so Enter/Space must activate it the same as a click.
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate();
            }
        });
    });

    // Adjust scroll behavior for navbar links
    const navbarLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight; // Get the height of the fixed header

    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return; // Let cross-page links (e.g. ../index.html#about) navigate normally
            }
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = href.substring(1); // Get the ID of the target section
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop; // Top position of the target section
                const scrollPosition = targetPosition - headerHeight; // Adjust for the header height

                // Smooth scroll to the adjusted position
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ripple Effect for Buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
            circle.classList.add('ripple');

            const existingRipple = this.getElementsByClassName('ripple')[0];
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(circle);
        });
    });

    // Hover feedback for buttons and service cards is handled in CSS (:hover rules
    // using var(--shadow-md) and a restrained lift) — see service_cards.css and
    // the .btn hover rules in get-started.css / learn-more.css / hero_section.css.

    // Scroll Effect with Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Scroll-to-Top Button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.classList.add('scroll-top-btn');
    scrollTopButton.style.display = 'none';
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
