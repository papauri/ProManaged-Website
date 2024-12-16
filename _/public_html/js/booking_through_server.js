document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById('open-booking-modal');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalButton = document.getElementById('close-booking-modal');
    const bookingForm = document.getElementById('booking-form');
    

    // Open the modal
    openModalButton.addEventListener('click', function () {
        bookingModal.classList.add('active'); // Add 'active' class to show and center the modal
    });

    // Close the modal
    closeModalButton.addEventListener('click', function () {
        bookingModal.classList.remove('active'); // Remove 'active' class to hide the modal
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === bookingModal) {
            bookingModal.classList.remove('active'); // Remove 'active' class to hide the modal
        }
    });

    // Handle form submission
    bookingForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(bookingForm);
        const bookingDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            date: formData.get('date'),
            time: formData.get('time'),
        };

        try {
            const response = await fetch('https://promanaged-website-appointments.onrender.com/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetails),
            });

            if (response.ok) {
                alert('Your appointment has been booked successfully!');
                bookingModal.classList.remove('active'); // Close the modal after successful submission
                bookingForm.reset(); // Clear the form
            } else {
                alert('Failed to book your appointment. Please try again later.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('An error occurred while booking your appointment. Please try again.');
        }
        
    });
});
