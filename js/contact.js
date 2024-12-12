document.querySelector('.contact-form').addEventListener('submit', function (e) {
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
