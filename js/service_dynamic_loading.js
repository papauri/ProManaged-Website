document.addEventListener("DOMContentLoaded", function () {
    /**
     * Load and apply styles from a styles HTML file.
     * Ensures that styles are available before rendering content.
     * @returns {Promise<void>} A promise that resolves when the styles are applied.
     */
    const loadStyles = () => {
        return fetch("../components/Services/services_styles.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load styles.html");
                return response.text();
            })
            .then(html => {
                const head = document.querySelector("head");
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;

                // Append styles to <head>
                Array.from(tempDiv.children).forEach(child => {
                    if (child.tagName === "LINK" || child.tagName === "STYLE") {
                        head.appendChild(child);
                    }
                });
                console.log("Styles loaded and applied.");
            })
            .catch(error => {
                console.error("Error loading styles:", error);
            });
    };

    /**
     * Load a reusable HTML component into a specified element on the page.
     * @param {string} selector - The CSS selector of the target element.
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
                console.error(`Error loading component ${filePath}:`, error);
            });
    };

    /**
     * Load all sections dynamically and initialize the page.
     * Ensures styles are loaded first.
     */
    const loadPageContent = () => {
        console.log("Loading page components...");
        return Promise.all([
            loadComponent("#services_head", "../components/Services/services_styles.html"),
            loadComponent("#hero-section", "../components/hero_section.html"),
            loadComponent("#booking-form", "../components/booking_form.html"),
            loadComponent("#footer", "../components/footer.html"),
        ])
            .then(() => {
                console.log("All page components loaded successfully.");
            })
            .catch(error => {
                console.error("Error loading page components:", error);
            });
    };

    /**
     * Main entry point to initialize styles and page content.
     */
    const initializePage = () => {
        loadStyles()
            .then(() => loadPageContent())
            .catch(error => console.error("Initialization failed:", error));

        // Handle browser navigation events
        window.addEventListener("popstate", () => {
            if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
                console.log("Navigating back to index.html. Reloading components...");
                loadStyles();
                loadPageContent();
            }
        });
    };

    // Start the initialization process
    initializePage();
});
