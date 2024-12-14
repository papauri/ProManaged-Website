import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import admin from "firebase-admin";

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// eBay App credentials (from environment variables)
const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID;
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;

// Firestore collection for storing tokens
const tokenCollection = db.collection("ebay_tokens");

// Function to get or refresh the eBay OAuth token
async function getEbayToken() {
    const tokenDoc = await tokenCollection.doc("current_token").get();

    // If token exists and is valid
    if (tokenDoc.exists) {
        const tokenData = tokenDoc.data();
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if the token has expired
        if (currentTime < tokenData.expiration) {
            return tokenData.token;
        }
    }

    // Refresh the token if it doesn't exist or has expired
    const newToken = await fetchEbayToken();
    return newToken;
}

// Function to fetch a new token from eBay
async function fetchEbayToken() {
    const authHeader = Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString("base64");

    const response = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            scope: "https://api.ebay.com/oauth/api_scope",
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch eBay token: ${response.statusText}`);
    }

    const data = await response.json();

    // Store the new token and its expiration in Firestore
    const expirationTime = Math.floor(Date.now() / 1000) + data.expires_in;
    await tokenCollection.doc("current_token").set({
        token: data.access_token,
        expiration: expirationTime,
    });

    return data.access_token;
}

// API endpoint to fetch eBay items
app.get("/api/ebay/items", async (req, res) => {
    try {
        const EBAY_OAUTH_TOKEN = await getEbayToken(); // Use the refreshed token

        const baseURL = "https://api.ebay.com/buy/browse/v1/item_summary/search";

        const selectedMarketplace = req.query.marketplace || "";
        const condition = req.query.condition;

        const marketplaceConfig = {
            GB: { id: "EBAY_GB", country: "GB", zip: "SW1A1AA" },
            DE: { id: "EBAY_DE", country: "DE", zip: "10115" },
            FR: { id: "EBAY_FR", country: "FR", zip: "75001" },
            IE: { id: "EBAY_IE", country: "IE", zip: "D01" },
        };

        const config = selectedMarketplace
            ? marketplaceConfig[selectedMarketplace]
            : marketplaceConfig.GB;

        const productTypes = {
            "ps5": "PlayStation 5",
            "ps4": "PlayStation 4",
            "xbox": "Xbox Series",
            "accessories": "Gaming Accessories",
        };

        const conditionMap = {
            "NEW": "1000",
            "USED": "3000",
            "LIKE_NEW": "2000",
            "NEW_OTHER": "1500",
            "FOR_PARTS": "7000",
        };

        const query = req.query.q || productTypes[req.query.type] || "Gaming Console";
        const category = req.query.category_ids || "139971";
        const limit = req.query.limit || "20";

        const filters = [
            "price:[..1000]",
            "feedbackPercentage:[95..100]",
            selectedMarketplace
                ? `itemLocationCountry:${config.country}`
                : "itemLocationCountry:{GB|DE|FR|IE}",
            condition && conditionMap[condition]
                ? `conditionIds:{${conditionMap[condition]}}`
                : null,
        ]
            .filter(Boolean)
            .join(",");

        const params = new URLSearchParams({
            q: query,
            category_ids: category,
            limit: limit,
            filter: filters,
            marketplace_ids: selectedMarketplace
                ? config.id
                : "EBAY_GB,EBAY_FR,EBAY_DE,EBAY_IE",
        });

        const headers = {
            Authorization: `Bearer ${EBAY_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
            "X-EBAY-C-MARKETPLACE-ID": config.id,
            "X-EBAY-C-ENDUSERCTX": `contextualLocation=country=${config.country},zip=${config.zip}`,
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

        const items = data.itemSummaries.map(item => {
            const currency = item.price?.currency || "EUR";
            const originalPrice = parseFloat(item.price?.value || 0);
            let priceMWK = 0;

            switch (currency) {
                case "GBP":
                    priceMWK = originalPrice * 3600;
                    break;
                case "EUR":
                    priceMWK = originalPrice * 3200;
                    break;
                default:
                    priceMWK = originalPrice * 3200;
            }

            return {
                title: item.title || "No Title Available",
                originalPrice: `${originalPrice.toFixed(2)} ${currency}`,
                priceMWK: `${priceMWK.toFixed(2)} MWK`,
                image: item.image?.imageUrl || "https://via.placeholder.com/150",
                feedbackPercentage: item.seller?.feedbackPercentage || "N/A",
                marketplace: item.itemLocation?.country || "N/A",
                condition: item.condition || "Unknown Condition",
                url: item.itemWebUrl || "#",
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

// Dynamic PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
