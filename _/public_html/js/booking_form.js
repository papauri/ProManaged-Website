document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById('open-booking-modal');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalButton = document.getElementById('close-booking-modal');
    const bookingForm = document.querySelector("#booking-form");

    // Open the modal
    openModalButton.addEventListener('click', function () {
        bookingModal.classList.add('active'); // Show and center the modal
    });

    // Close the modal
    closeModalButton.addEventListener('click', function () {
        bookingModal.classList.remove('active'); // Hide the modal
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === bookingModal) {
            bookingModal.classList.remove('active'); // Hide the modal
        }
    });

    // Handle Booking Form Submission
    bookingForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(bookingForm);

        try {
            const response = await fetch("../php/booking.php", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Your appointment has been booked successfully!");
                bookingForm.reset(); // Clear the form
                bookingModal.classList.remove('active'); // Close the modal
            } else {
                const errorMessage = await response.text();
                alert(errorMessage || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error during booking form submission:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});

