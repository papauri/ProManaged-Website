document.addEventListener("DOMContentLoaded", function () {
    /**
     * Function to load a reusable HTML component into a specified element on the page.
     * @param {string} selector - The CSS selector of the target element where the content will be inserted.
     * @param {string} filePath - The relative path to the HTML file containing the reusable component.
     * @returns {Promise<void>} A promise that resolves when the component is loaded.
     */
    const loadComponent = (selector, filePath) => {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                return response.text();
            })
            .then(html => {
                const targetElement = document.querySelector(selector);
                if (!targetElement) {
                    console.warn(`Element not found for selector: ${selector}`);
                    return;
                }
                targetElement.innerHTML = html;
                console.log(`Loaded component: ${filePath} into ${selector}`);
            })
            .catch(error => {
                console.error("Error loading component:", error);
            });
    };

    /**
     * Add click event listeners to all service cards to enable redirection to their target pages.
     */
    const initializeServiceCards = () => {
        console.log("Initializing service cards...");
        const serviceCards = document.querySelectorAll(".service-card[data-target]");
        serviceCards.forEach(card => {
            card.addEventListener("click", function () {
                const targetUrl = this.getAttribute("data-target");
                if (targetUrl) {
                    console.log("Redirecting to:", targetUrl);
                    window.location.href = targetUrl;
                } else {
                    console.error("No target URL specified for this service card.");
                }
            });
        });
    };

    /**
     * Reinitialize the main page content dynamically when needed.
     */
    const loadIndexContent = () => {
        console.log("Loading index page components...");
        Promise.all([
            loadComponent("#main-head", "../components/styles.html"),
            loadComponent("#main-body", "../components/index_body.html"),
            loadComponent("#header-section", "../components/header.html"),
            loadComponent("#hero-section", "../components/hero_section.html"),
            loadComponent("#services-section", "../components/services_section.html"),
            loadComponent("#about-section", "../components/about.html"),
            loadComponent("#mission-vision-section", "../components/mission_vision.html"),
            loadComponent("#contact-section", "../components/contact.html"),
            loadComponent("#footer-section", "../components/footer.html"),
        ])
        .then(() => {
            console.log("All index page components loaded successfully.");
            initializeServiceCards();
        })
        .catch(error => {
            console.error("Error loading index components:", error);
        });
    };

    // Load the initial page content
    loadIndexContent();

    // Listen for browser navigation (back/forward) events to reload index.html components
    window.addEventListener("popstate", (event) => {
        if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
            console.log("Navigating back to index.html. Reinitializing components...");
            loadIndexContent();
        }
    });
});
