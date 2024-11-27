// Wait until the DOM is fully loaded before executing the script
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
                console.log(`Checking existence of selector: ${selector}`);
                const targetElement = document.querySelector(selector);
                if (!targetElement) {
                    console.warn(`Element not found for selector: ${selector}`);
                    return; // Prevent further execution
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
        
        if (serviceCards.length === 0) {
            console.warn("No service cards found to initialize.");
            return;
        }

        serviceCards.forEach(card => {
            card.addEventListener("click", function () {
                const targetUrl = this.getAttribute("data-target");
                if (targetUrl) {
                    console.log("Redirecting to:", targetUrl); // Debug log
                    window.location.href = targetUrl;
                } else {
                    console.error("No target URL specified for this service card.");
                }
            });
        });
        console.log("Service cards initialized.");
    };

    // Dynamically load reusable components into the specified placeholders on the page
    Promise.all([
        loadComponent("#main-head", "../components/styles.html"), // Dynamically load styles into <head>
        loadComponent("#main-body", "../components/index_body.html"), // Dynamically load styles into <body>
        loadComponent("#header-section", "../components/header.html"), // Load the header into #header
        loadComponent("#hero-section", "../components/hero_section.html"), // Load the hero section into #hero-section
        loadComponent("#services-section", "../components/services_section.html"), // Load the services section into #services-section
        loadComponent("#about-section", "../components/about.html"), // Load the about section into #about
        loadComponent("#mission-vision-section", "../components/mission_vision.html"), // Load the mission & vision section into #mission-vision
        loadComponent("#contact-section", "../components/contact.html"), // Load the contact section into #contact
        loadComponent("#footer-section", "../components/footer.html"), // Load the footer into #footer
    ])
    .then(() => {
        // After all components are loaded, initialize service cards
        initializeServiceCards();
    })
    .catch(error => {
        console.error("Error initializing the page:", error);
    });
});
