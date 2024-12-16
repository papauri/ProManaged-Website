const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    };

    try {
        const response = await fetch('https://promanaged-website-emails.onrender.com/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email. Please try again later.');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred. Please try again later.');
    }
});