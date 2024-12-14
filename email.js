const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Email endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Email transporter setup
    const transporter = nodemailer.createTransport({
        host: 'smtp.blue.webhostingireland.ie.com', // Replace with your SMTP server
        port: 465, // or 465 for secure
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'johnpaulchirwa@promanaged-it.com', // Your email address
        },
    });

    // Email details
    const mailOptions = {
        from: email,
        to: 'johnpaulchirwa@promanaged-it.com', // Your email address to receive form submissions
        subject: `Contact Form Submission from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message:
            ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start the email service server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Email server running on port ${PORT}`));
