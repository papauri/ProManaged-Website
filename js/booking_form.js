document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector("#booking-form");
    if (!bookingForm) {
        return;
    }

    bookingForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(bookingForm);

        try {
            const response = await fetch(bookingForm.getAttribute("action"), {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Your appointment has been booked successfully!");
                bookingForm.reset(); // Clear the form
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
