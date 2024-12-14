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
// eBay API Configuration
// =========================
const EBAY_API_URL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';
const EBAY_AUTH_URL = 'https://api.ebay.com/identity/v1/oauth2/token';
const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID;
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;
const EBAY_REFRESH_TOKEN = process.env.EBAY_REFRESH_TOKEN;

// =========================
// Helper Functions
// =========================

// Fetch a fresh eBay OAuth token and store it in Firestore
async function fetchAndStoreEbayToken() {
    try {
        const response = await fetch(EBAY_AUTH_URL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`
                ).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: EBAY_REFRESH_TOKEN,
                scope: 'https://api.ebay.com/oauth/api_scope',
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch eBay token: ${response.statusText}`);
        }

        const data = await response.json();
        const token = data.access_token;

        // Store the token in Firestore
        const docRef = db.collection('ebayAuth').doc('authToken');
        await docRef.set({
            token,
            lastUpdated: new Date().toISOString(),
        });

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
        const tokenAge = Date.now() - new Date(data.lastUpdated).getTime();

        // Check if token is older than 1 hour (eBay tokens are valid for 2 hours)
        if (tokenAge < 3600 * 1000) {
            return data.token;
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

        const selectedMarketplace = req.query.marketplace || '';
        const condition = req.query.condition;

        const marketplaceConfig = {
            GB: { id: 'EBAY_GB', country: 'GB', zip: 'SW1A1AA' },
            DE: { id: 'EBAY_DE', country: 'DE', zip: '10115' },
            FR: { id: 'EBAY_FR', country: 'FR', zip: '75001' },
            IE: { id: 'EBAY_IE', country: 'IE', zip: 'D01' },
        };

        const config = selectedMarketplace
            ? marketplaceConfig[selectedMarketplace]
            : marketplaceConfig.GB;

        const query = req.query.q || 'Gaming Console';
        const limit = req.query.limit || '20';

        const params = new URLSearchParams({
            q: query,
            limit: limit,
            marketplace_ids: selectedMarketplace ? config.id : 'EBAY_GB,EBAY_FR,EBAY_DE,EBAY_IE',
        });

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-EBAY-C-MARKETPLACE-ID': config.id,
            'X-EBAY-C-ENDUSERCTX': `contextualLocation=country=${config.country},zip=${config.zip}`,
        };

        const ebayAPIUrl = `${EBAY_API_URL}?${params.toString()}`;
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
