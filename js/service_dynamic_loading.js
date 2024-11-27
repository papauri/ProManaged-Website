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
                    return;
                }
                targetElement.innerHTML = html;
                console.log(`Loaded component: ${filePath} into ${selector}`);
            })
            .catch(error => {
                console.error("Error loading component:", error);
            });
    };

    // Dynamically load service-specific reusable components
    Promise.all([
        loadComponent("#services_head", "../components/Services/services_styles.html"), // Load styles for services
        loadComponent("#hero-section", "../components/hero_section.html"), // Load the hero section into #hero-section
        loadComponent("#booking-form", "../components/booking_form.html"), // Load booking form
        loadComponent("#footer", "../components/footer.html") // Load the footer
    ])
    .then(() => {
        console.log("Service-specific components loaded successfully.");

        // Initialize the booking modal after it has been loaded
        initializeBookingModal();
    })
    .catch(error => {
        console.error("Error loading service-specific components:", error);
    });

    // Initialize gaming services immediately as it does not depend on dynamically loaded components
    initializeGamingServices();
});
