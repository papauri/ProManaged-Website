import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

// Enable CORS with specific allowed origin
const allowedOrigins = ['http://promanaged-it.com', 'http://127.0.0.1:5500']; // Include both production and development origins
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Appointment booking endpoint
app.post('/book-appointment', async (req, res) => {
    const { name, email, phone, date, time, message } = req.body;

    // Email transporter setup using environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // SMTP server
        port: parseInt(process.env.SMTP_PORT, 10), // SMTP port (ensure it's a number)
        secure: true, // Use SSL/TLS for secure connection
        auth: {
            user: process.env.SMTP_USER, // Email address
            pass: process.env.SMTP_PASS, // Email password
        },
    });

    // Email details for appointment
    const mailOptions = {
        from: process.env.SMTP_USER, // Sender's email
        to: 'appointments@promanaged-it.com', // Receiver's email for appointments
        subject: `New Appointment Booking from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Appointment Date: ${date}
            Appointment Time: ${time}
            Additional Message:
            ${message || 'No additional message provided.'}
        `,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Appointment booked successfully!');
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).send('Failed to book appointment.');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Appointment server running on port ${PORT}`));
