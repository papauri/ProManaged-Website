document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavMenu = document.querySelector('.nav-menu.mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const contentContainer = document.getElementById('content-container'); // Container for dynamic content

    function toggleMenu() {
        if (hamburgerMenu && mobileNavMenu && navOverlay) {
            hamburgerMenu.classList.toggle('open');
            mobileNavMenu.classList.toggle('open');
            navOverlay.classList.toggle('open');
        }
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('open');
            mobileNavMenu.classList.remove('open');
            navOverlay.classList.remove('open');
        }
    });

    // Smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            if (window.innerWidth <= 768 && mobileNavMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Dynamic loading of pages
    document.querySelectorAll('a[data-load]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-load');

            // Load content dynamically
            fetch(page)
                .then(response => response.text())
                .then(html => {
                    if (contentContainer) {
                        contentContainer.innerHTML = html;

                        // Reinitialize the loaded page's logic
                        if (page === 'gaming_services.html') {
                            initializeGamingServices();
                        }
                    }
                })
                .catch(err => console.error('Error loading page:', err));
        });
    });
});
