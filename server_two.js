import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
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
app.use(cors());
app.use(express.json());

// Environment Variables
let EBAY_OAUTH_TOKEN = process.env.EBAY_OAUTH_TOKEN; // First token set as an env variable
const COLLECTION_NAME = 'ebayListings'; // Firestore collection name

// =========================
// Helper Functions
// =========================

// Refresh eBay OAuth token and update in Firestore and local variable
async function refreshEbayAuthToken() {
    const ebayClientId = process.env.EBAY_CLIENT_ID;
    const ebayClientSecret = process.env.EBAY_CLIENT_SECRET;

    const authResponse = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${ebayClientId}:${ebayClientSecret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            scope: "https://api.ebay.com/oauth/api_scope",
        }),
    });

    if (!authResponse.ok) {
        const errorText = await authResponse.text();
        throw new Error(`Failed to refresh eBay OAuth token: ${errorText}`);
    }

    const authData = await authResponse.json();
    const expiry = Date.now() + authData.expires_in * 1000;

    EBAY_OAUTH_TOKEN = authData.access_token;

    // Store the new token in Firestore
    const tokenDocRef = db.collection("ebayTokens").doc("auth");
    await tokenDocRef.set({
        accessToken: authData.access_token,
        expiry,
    });

    console.log("eBay OAuth token refreshed and updated in Firestore.");
}

// Check and refresh token if necessary
async function ensureValidToken() {
    const tokenDocRef = db.collection("ebayTokens").doc("auth");
    const tokenDoc = await tokenDocRef.get();

    if (tokenDoc.exists) {
        const tokenData = tokenDoc.data();
        const now = Date.now();

        // Use Firestore token if it's valid
        if (now < tokenData.expiry) {
            EBAY_OAUTH_TOKEN = tokenData.accessToken;
        } else {
            console.log("Token expired. Refreshing...");
            await refreshEbayAuthToken();
        }
    } else {
        console.log("No token found in Firestore. Refreshing...");
        await refreshEbayAuthToken();
    }
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
// Routes
// =========================

app.get('/api/ebay/items', async (req, res) => {
    try {
        await ensureValidToken(); // Ensure token is valid before making the request

        const baseURL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';

        const selectedMarketplace = req.query.marketplace || '';
        const condition = req.query.condition;
        const query = req.query.q || "Gaming Console";
        const limit = req.query.limit || "20";

        const marketplaceConfig = {
            GB: { id: 'EBAY_GB', country: 'GB', zip: 'SW1A1AA' },
            DE: { id: 'EBAY_DE', country: 'DE', zip: '10115' },
            FR: { id: 'EBAY_FR', country: 'FR', zip: '75001' },
            IE: { id: 'EBAY_IE', country: 'IE', zip: 'D01' },
        };

        const config = selectedMarketplace
            ? marketplaceConfig[selectedMarketplace]
            : marketplaceConfig.GB;

        const params = new URLSearchParams({
            q: query,
            limit,
            marketplace_ids: selectedMarketplace
                ? config.id
                : "EBAY_GB,EBAY_FR,EBAY_DE,EBAY_IE",
        });

        if (condition) {
            params.append("filter", `conditionIds:{${condition}}`);
        }

        const headers = {
            Authorization: `Bearer ${EBAY_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
            "X-EBAY-C-MARKETPLACE-ID": config.id,
            "X-EBAY-C-ENDUSERCTX": `contextualLocation=country=${config.country},zip=${config.zip}`,
        };

        const ebayAPIUrl = `${baseURL}?${params.toString()}`;
        console.log(`Fetching from eBay: ${ebayAPIUrl}`);

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
            const currency = item.price?.currency || "EUR";
            const originalPrice = parseFloat(item.price?.value || 0);
            const priceMWK = convertCurrencyToMWK(currency, originalPrice);

            return {
                id: item.itemId,
                title: item.title || "No Title Available",
                originalPrice: `${originalPrice.toFixed(2)} ${currency}`,
                priceMWK: `${priceMWK.toFixed(2)} MWK`,
                image: item.image?.imageUrl || "https://via.placeholder.com/150",
                feedbackPercentage: item.seller?.feedbackPercentage || "N/A",
                marketplace: item.itemLocation?.country || "N/A",
                condition: getConditionName(item.conditionId),
                url: item.itemWebUrl || "#",
                productType: item.title.toLowerCase().includes('ps5') ? 'ps5' : 'other',
            };
        });

        res.json(items);
    } catch (error) {
        console.error("Error fetching eBay items:", error);
        res.status(500).json({
            error: "Failed to fetch eBay items",
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
