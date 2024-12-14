import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Email endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Email transporter setup using secure SSL/TLS settings
    const transporter = nodemailer.createTransport({
        host: 'blue.webhostingireland.ie', // Outgoing server (SMTP)
        port: 465, // SMTP port for secure SSL/TLS
        secure: true, // Use SSL/TLS
        auth: {
            user: process.env.SMTP_USER, // Your email address
            pass: process.env.SMTP_PASS, // Your email account’s password
        },
    });

    // Email details
    const mailOptions = {
        from: process.env.SMTP_USER, // Sender's email (your email)
        to: process.env.RECEIVER_EMAIL, // Receiver's email
        replyTo: email, // Reply-to sender's email address
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
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Email server running on port ${PORT}`));
