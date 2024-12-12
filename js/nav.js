document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavMenu = document.querySelector('.nav-menu.mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const contentContainer = document.getElementById('content-container');

    // Log warnings if critical elements are missing
    if (!hamburgerMenu) {
        return; // Exit if the hamburger menu is missing
    }
    if (!mobileNavMenu) console.warn("Mobile navigation menu element not found.");
    if (!navOverlay) console.warn("Navigation overlay element not found.");

    /**
     * Toggle Menu Visibility
     */
    function toggleMenu() {
        hamburgerMenu.classList.toggle('open');
        if (mobileNavMenu) mobileNavMenu.classList.toggle('open');
        if (navOverlay) navOverlay.classList.toggle('open');
    }

    /**
     * Close Mobile Menu on Resize to Desktop
     */
    function closeMenuOnResize() {
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('open');
            if (mobileNavMenu) mobileNavMenu.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('open');
        }
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile menu after navigation (if open)
        if (window.innerWidth <= 768 && mobileNavMenu?.classList.contains('open')) {
            toggleMenu();
        }
    }

    /**
     * Dynamic Page Loading
     */
    function loadDynamicPage(event) {
        event.preventDefault();
        const page = this.getAttribute('data-load');

        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${page}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                if (contentContainer) {
                    contentContainer.innerHTML = html;

                    // Optional: Reinitialize logic for loaded pages
                    if (page === 'gaming_services.html') {
                        initializeGamingServices();
                    }
                }
            })
            .catch(err => console.error('Error loading page:', err));
    }

    // Event Listeners
    hamburgerMenu.addEventListener('click', toggleMenu);

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    window.addEventListener('resize', closeMenuOnResize);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    document.querySelectorAll('a[data-load]').forEach(link => {
        link.addEventListener('click', loadDynamicPage);
    });
});
