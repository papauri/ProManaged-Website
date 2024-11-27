function initializeBookingModal() {
    // Check if the modal and its associated buttons exist before adding event listeners
    const openModalButton = document.getElementById("open-booking-modal");
    const closeModalButton = document.getElementById("close-booking-modal");
    const bookingModal = document.getElementById("booking-modal");

    if (!openModalButton || !closeModalButton || !bookingModal) {
        console.warn("Booking modal elements not found. Skipping initialization.");
        return; // Exit early if any of the elements are missing
    }

    // Open the modal
    openModalButton.addEventListener("click", () => {
        bookingModal.classList.add("active");
    });

    // Close the modal
    closeModalButton.addEventListener("click", () => {
        bookingModal.classList.remove("active");
    });

    // Close the modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === bookingModal) {
            bookingModal.classList.remove("active");
        }
    });
}
