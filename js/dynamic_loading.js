document.addEventListener("DOMContentLoaded", function () {
    /**
     * Load and apply styles from styles.html.
     * Ensures that styles are available before rendering content.
     */
    const loadStyles = () => {
        return fetch("../components/styles.html")
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
     * Load a reusable HTML component into a specified element.
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
     * Initialize interactive components such as service cards and the contact form.
     */
    const initializeInteractivity = () => {
        initializeServiceCards();
        initializeContactForm();
    };

    /**
     * Add click event listeners to all service cards for navigation.
     */
    const initializeServiceCards = () => {
        console.log("Initializing service cards...");
        const serviceCards = document.querySelectorAll(".service-card[data-target]");
        serviceCards.forEach(card => {
            card.addEventListener("click", function () {
                const targetUrl = this.getAttribute("data-target");
                if (targetUrl) {
                    console.log(`Redirecting to: ${targetUrl}`);
                    window.location.href = targetUrl;
                } else {
                    console.error("No target URL specified for this service card.");
                }
            });
        });
    };

    /**
     * Initialize the contact form functionality and validation.
     */
    const initializeContactForm = () => {
        console.log("Initializing contact form...");
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) {
            console.warn("Contact form not found in the DOM.");
            return;
        }

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

            alert("Your message has been sent successfully!");
            this.reset(); // Reset the form
        });
    };

    /**
     * Load all sections dynamically and initialize the page.
     * Ensures styles are loaded first.
     */
    const loadIndexContent = () => {
        console.log("Loading index page components...");
        return Promise.all([
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
                initializeInteractivity();
            })
            .catch(error => {
                console.error("Error loading index components:", error);
            });
    };

    /**
     * Main entry point to initialize styles and page content.
     */
    const initializePage = () => {
        loadStyles()
            .then(() => loadIndexContent())
            .catch(error => console.error("Initialization failed:", error));

        // Handle browser navigation events
        window.addEventListener("popstate", () => {
            if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
                console.log("Navigating back to index.html. Reloading components...");
                loadStyles();
                loadIndexContent();
            }
        });
    };

    // Start the initialization process
    initializePage();
});
