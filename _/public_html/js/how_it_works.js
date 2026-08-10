// Show the modal on page load
document.addEventListener("DOMContentLoaded", () => {
    const howItWorksModal = document.getElementById('how-it-works-modal');
    const closeModalButton = document.getElementById('close-how-it-works-modal');
    const startShoppingButton = document.getElementById('start-shopping-btn');

    // Show modal
    howItWorksModal.style.display = 'block';
    howItWorksModal.setAttribute('aria-hidden', 'false');

    // Function to close the modal
    const closeModal = () => {
        howItWorksModal.style.display = 'none';
        howItWorksModal.setAttribute('aria-hidden', 'true');
    };

    // Close modal on click of close button
    closeModalButton.addEventListener('click', closeModal);

    // Close modal on click of "Start Shopping"
    if (startShoppingButton) {
        startShoppingButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === howItWorksModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && howItWorksModal.style.display === 'block') {
            closeModal();
        }
    });
});
