import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Ensure node-fetch is installed
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// =========================
// Firebase Initialization
// =========================
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

// =========================
// eBay API Configuration
// =========================
const EBAY_AUTH_URL = 'https://api.ebay.com/identity/v1/oauth2/token';
const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID;
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;

// =========================
// Express App Initialization
// =========================
const app = express();

// Middleware
app.use(
    cors({
        origin: ['http://127.0.0.1:5500', 'http://promanaged-it.com'], // Both local and production
    })
);
app.use(express.json());

// =========================
// Helper Functions
// =========================

// Fetch a fresh eBay OAuth token and store it in Firestore
async function fetchAndStoreEbayToken() {
    try {
        console.log('Fetching new eBay OAuth token...');

        const response = await fetch(EBAY_AUTH_URL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`
                ).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                scope: 'https://api.ebay.com/oauth/api_scope',
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch eBay token: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const token = data.access_token;
        const expiresIn = data.expires_in; // Token expiry time in seconds

        // Store the token in Firestore
        const docRef = db.collection('ebayAuth').doc('authToken');
        await docRef.set({
            token,
            expiresAt: Date.now() + expiresIn * 1000, // Store expiry time in milliseconds
            lastUpdated: new Date().toISOString(),
        });

        console.log('eBay OAuth token successfully fetched and stored.');
        return token;
    } catch (error) {
        console.error('Error fetching eBay token:', error);
        throw error;
    }
}

// Get a valid eBay OAuth token (fetch a new one if expired)
async function getEbayToken() {
    const docRef = db.collection('ebayAuth').doc('authToken');
    const doc = await docRef.get();

    if (doc.exists) {
        const data = doc.data();
        const currentTime = Date.now();

        // Check if token is expired
        if (data.expiresAt && currentTime < data.expiresAt) {
            console.log('Using cached eBay OAuth token.');
            return data.token; // Return existing token
        }
    }

    // Fetch a new token if not available or expired
    return fetchAndStoreEbayToken();
}

// =========================
// Routes
// =========================

// Fetch eBay items
app.get('/api/ebay/items', async (req, res) => {
    try {
        const token = await getEbayToken(); // Get a valid token

        const query = req.query.q || 'Gaming Console';
        const limit = req.query.limit || '20';

        const params = new URLSearchParams({
            q: query,
            limit: limit,
        });

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const ebayAPIUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`;
        const response = await fetch(ebayAPIUrl, { headers });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`eBay API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (!data.itemSummaries) {
            return res.json([]);
        }

        const items = data.itemSummaries.map((item) => ({
            title: item.title || 'No Title Available',
            price: `${item.price?.value || '0'} ${item.price?.currency || 'USD'}`,
            image: item.image?.imageUrl || 'https://via.placeholder.com/150',
            condition: item.condition || 'Unknown',
            url: item.itemWebUrl || '#',
        }));

        res.json(items);
    } catch (error) {
        console.error('Error fetching eBay items:', error);
        res.status(500).json({ error: 'Failed to fetch eBay items.' });
    }
});

// =========================
// Start the Server
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
