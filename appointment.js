import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

// Enable CORS with specific allowed origin
const allowedOrigins = ['https://promanaged-it.com', 'http://127.0.0.1:5500']; // Include both production and development origins
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Appointment booking endpoint
// Endpoint for booking appointments
app.post('/book-appointment', async (req, res) => {
    const { name, email, service, date, time } = req.body;

    // Validate the required fields
    if (!name || !email || !service || !date || !time) {
        return res.status(400).send('All fields are required.');
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: true, // Use SSL
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.RECEIVER_EMAIL, // appointments@promanaged-it.com
        subject: `New Appointment Request`,
        text: `
            You have a new appointment request:
            - Name: ${name}
            - Email: ${email}
            - Service: ${service}
            - Date: ${date}
            - Time: ${time}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Appointment request sent successfully.');
    } catch (error) {
        console.error('Error sending appointment email:', error);
        res.status(500).send('Failed to send appointment request.');
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Appointment server running on port ${PORT}`));
