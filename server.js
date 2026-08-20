import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const upload = multer();

// Middleware to parse urlencoded and json if needed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes to replace PHP endpoints
// All endpoints return a JSON with { message: "..." } on success or failure,
// as readMessage in form_intake.js expects.

app.post('/php/contact.php', upload.none(), (req, res) => {
    console.log('[Mock Contact] Received data:', req.body);
    // basic honeypot check
    if (req.body.website) {
        return res.status(400).json({ message: "Invalid request." });
    }
    return res.json({ message: "Thank you — your message is with us and we will come back to you." });
});

app.post('/php/booking.php', upload.none(), (req, res) => {
    console.log('[Mock Booking] Received data:', req.body);
    if (req.body.website) {
        return res.status(400).json({ message: "Invalid request." });
    }
    return res.json({ message: "Thanks — your requested time is with us. We will confirm by email, or offer the nearest slot that works." });
});

app.post('/php/hospitality.php', upload.none(), (req, res) => {
    console.log('[Mock Hospitality] Received data:', req.body);
    if (req.body.website) {
        return res.status(400).json({ message: "Invalid request." });
    }
    return res.json({ message: "Thank you — your hospitality system request is with us." });
});

app.post('/php/website.php', upload.none(), (req, res) => {
    console.log('[Mock Website] Received data:', req.body);
    if (req.body.website) {
        return res.status(400).json({ message: "Invalid request." });
    }
    return res.json({ message: "Thank you — your website project request is with us." });
});

// Serve static files from root, excluding certain directories if we wanted, 
// but express.static works fine.
app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
