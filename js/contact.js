document.addEventListener('DOMContentLoaded', () => {
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
    const observer = new MutationObserver(() => {
        if (document.querySelector('.contact-form')) {
            initializeContactForm();
            observer.disconnect(); // Stop observing once initialized
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
});
