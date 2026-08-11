const form = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    try {
        const response = await fetch(form.getAttribute("action"), {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            feedback.textContent = "Thank you for your message. We'll get back to you soon!";
            feedback.style.color = "green";
            form.reset(); // Clear the form
        } else {
            const errorMessage = await response.text();
            feedback.textContent = errorMessage || "Something went wrong. Please try again.";
            feedback.style.color = "red";
        }
    } catch (error) {
        feedback.textContent = "An error occurred. Please try again later.";
        feedback.style.color = "red";
    }
});
