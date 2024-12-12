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

    // Dynamically load common reusable components
    Promise.all([
        loadComponent("#services_head", "../components/Services/services_styles.html"),
        loadComponent("#hero-section", "../components/hero_section.html"),
        loadComponent("#booking-form", "../components/booking_form.html"),
        loadComponent("#footer", "../components/footer.html")
    ])
    .then(() => {
        console.log("Common components loaded successfully.");
        initializeBookingModal(); // Ensure this is only called if modal logic exists
    })
    .catch(error => {
        console.error("Error loading common components:", error);
    });

    // Lazy load gaming services only when accessed
    document.querySelectorAll('a[data-load="gaming_services.html"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-load');

            // Load the gaming services component
            loadComponent("#content-container", page)
                .then(() => {
                    console.log(`Gaming services loaded from ${page}`);
                    initializeGamingServices(); // Call this after the component is loaded
                })
                .catch(error => {
                    console.error("Error loading gaming services:", error);
                });
        });
    });
});
