import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Ensure node-fetch is installed
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// =========================
// Firebase Initialization
// =========================

// Parse the service account JSON from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

// =========================
// Express App Initialization
// =========================
const app = express();

// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'https://promanaged-it.com'], // Both local and production
}));
app.use(express.json());

// =========================
// Hardcoded Exchange Rate
// =========================
const USD_TO_MWK = 2820; // 1 USD = 2820 MWK (hardcoded)

// =========================
// Routes
// =========================

// Root route for health check
app.get('/', (req, res) => {
    res.send('Welcome to the Game Prices Backend!');
});

// Fetch game prices from CheapShark API and store them in Firestore
app.get('/api/games', async (req, res) => {
    try {
        console.log('Fetching game prices from CheapShark...');

        // Fetch data from CheapShark API
        const response = await fetch('https://www.cheapshark.com/api/1.0/deals');
        const data = await response.json();

        // Add MWK prices to the data
        const enrichedData = data.map(game => ({
            ...game,
            priceMWK: (parseFloat(game.salePrice) * USD_TO_MWK).toFixed(2), // Calculate MWK price
        }));

        // Get current timestamp
        const timestamp = new Date().toISOString();

        // Firestore collection reference
        const gamesCollection = db.collection('gamePrices');

        // Batch write to Firestore
        const batch = db.batch();
        enrichedData.forEach(game => {
            const docRef = gamesCollection.doc(game.dealID); // Use dealID as document ID
            batch.set(docRef, { ...game, lastUpdated: timestamp });
        });
        await batch.commit();

        console.log('Data written to Firestore successfully.');
        res.json(enrichedData); // Respond with the enriched data
    } catch (error) {
        console.error('Error fetching game prices:', error);
        res.status(500).json({ error: 'Failed to fetch game prices.' });
    }
});

// =========================
// Start the Server
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
