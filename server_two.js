import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
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
app.use(cors());
app.use(express.json());

// =========================
// Environment Variables
// =========================
const EBAY_OAUTH_TOKEN = process.env.EBAY_OAUTH_TOKEN;
const COLLECTION_NAME = 'ebayListings'; // Firestore collection name

// =========================
// Helper Functions
// =========================

// Determine product type from title
function getProductType(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('playstation 5') || titleLower.includes('ps5')) return 'ps5';
    if (titleLower.includes('playstation 4') || titleLower.includes('ps4')) return 'ps4';
    if (titleLower.includes('xbox')) return 'xbox';
    return 'accessories';
}

// Map condition ID to a user-friendly name
function getConditionName(conditionId) {
    const conditionNames = {
        '1000': 'New',
        '1500': 'New - Other',
        '2000': 'Like New',
        '3000': 'Used',
        '7000': 'For Parts',
    };
    return conditionNames[conditionId] || 'Unknown Condition';
}

// Convert currency to MWK
function convertCurrencyToMWK(currency, value) {
    const exchangeRates = {
        GBP: 3600,
        EUR: 3200,
        USD: 2820,
    };
    const rate = exchangeRates[currency] || 3200;
    return value * rate;
}

// =========================
// API Routes
// =========================

// Fetch eBay items and store them in Firestore
app.get('/api/ebay/items', async (req, res) => {
    try {
        const baseURL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';

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
            limit,
            marketplace_ids: selectedMarketplace
                ? config.id
                : 'EBAY_GB,EBAY_FR,EBAY_DE,EBAY_IE',
        });

        const headers = {
            Authorization: `Bearer ${EBAY_OAUTH_TOKEN}`,
            'Content-Type': 'application/json',
            'X-EBAY-C-MARKETPLACE-ID': config.id,
            'X-EBAY-C-ENDUSERCTX': `contextualLocation=country=${config.country},zip=${config.zip}`,
        };

        const ebayAPIUrl = `${baseURL}?${params.toString()}`;
        const response = await fetch(ebayAPIUrl, { headers });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`eBay API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (!data.itemSummaries) {
            return res.json([]);
        }

        const items = data.itemSummaries.map((item) => {
            const currency = item.price?.currency || 'EUR';
            const originalPrice = parseFloat(item.price?.value || 0);
            const priceMWK = convertCurrencyToMWK(currency, originalPrice);

            return {
                id: item.itemId, // Unique identifier
                title: item.title || 'No Title Available',
                originalPrice: `${originalPrice.toFixed(2)} ${currency}`,
                priceMWK: `${priceMWK.toFixed(2)} MWK`,
                image: item.image?.imageUrl || 'https://via.placeholder.com/150',
                feedbackPercentage: item.seller?.feedbackPercentage || 'N/A',
                marketplace: item.itemLocation?.country || 'N/A',
                condition: getConditionName(item.conditionId),
                url: item.itemWebUrl || '#',
                productType: getProductType(item.title),
            };
        });

        // Write items to Firestore
        const batch = db.batch();
        const collectionRef = db.collection(COLLECTION_NAME);

        items.forEach((item) => {
            const docRef = collectionRef.doc(item.id); // Use eBay item ID as document ID
            batch.set(docRef, item);
        });

        await batch.commit();
        console.log(`Successfully stored ${items.length} items in Firestore.`);

        res.json(items);
    } catch (error) {
        console.error('Error fetching eBay items:', error);
        res.status(500).json({
            error: 'Failed to fetch eBay items',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
});

// =========================
// Start the Server
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
