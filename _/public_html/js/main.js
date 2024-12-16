document.addEventListener("DOMContentLoaded", function () {

    // Handle navigation for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function () {
            const targetUrl = this.getAttribute('data-target');
            if (targetUrl) {
                window.location.href = targetUrl; // Navigate to the specified URL
            } else {
                console.warn("No target URL specified for this card.");
            }
        });
    });

    // Adjust scroll behavior for navbar links
    const navbarLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight; // Get the height of the fixed header

    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1); // Get the ID of the target section
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

    // Hover Effect for Buttons and Service Cards
    document.querySelectorAll('.btn, .service-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-8px)';
            element.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            element.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.2)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = 'var(--shadow)';
        });
    });

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

    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.querySelector(`#${button.dataset.target}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Contact Form Validation and Submission
    const initializeContactForm = () => {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const message = document.getElementById('message').value.trim();

                if (!name || !email || !phone || !message) {
                    alert("Please fill in all fields.");
                    return;
                }

                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                    alert("Please enter a valid email address.");
                    return;
                }

                if (!/^[0-9+()-\s]{10,15}$/.test(phone)) {
                    alert("Please enter a valid phone number.");
                    return;
                }

                // If all validation passes
                alert("Your message has been sent successfully!");
                this.reset(); // Reset the form
            });
            console.log("Contact form initialized.");
        } else {
            console.warn("Contact form not found in the DOM.");
        }
    };

    // Wait for the contact section to be loaded dynamically
    const contactObserver = new MutationObserver(() => {
        if (document.querySelector('.contact-form')) {
            initializeContactForm();
            contactObserver.disconnect(); // Stop observing once initialized
        }
    });

    contactObserver.observe(document.body, { childList: true, subtree: true });
});
