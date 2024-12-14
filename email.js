import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Email endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Email transporter setup
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // SMTP host from .env
        port: process.env.SMTP_PORT || 465, // SMTP port from .env
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // Email from .env
            pass: process.env.SMTP_PASS, // Password from .env
        },
    });

    // Email details
    const mailOptions = {
        from: process.env.SMTP_USER, // Email sender
        to: process.env.RECEIVER_EMAIL, // Your email address to receive form submissions
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
