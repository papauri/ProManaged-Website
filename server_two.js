import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
const firestore = admin.firestore();

const EBAY_TOKEN_COLLECTION = "ebay_tokens"; // Firestore collection to store tokens

// Function to fetch a new token and store it in Firestore
async function fetchEbayToken() {
    const url = "https://api.ebay.com/identity/v1/oauth2/token";
    const headers = {
        Authorization: `Basic ${Buffer.from(
            `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const body = new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope", // Adjust scope as needed
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error fetching token: ${response.status} - ${errorText}`);
            throw new Error("Failed to fetch eBay token.");
        }

        const data = await response.json();
        const tokenData = {
            access_token: data.access_token,
            expires_at: Date.now() + data.expires_in * 1000, // Store the expiration timestamp
        };

        // Store token in Firestore
        await firestore.collection(EBAY_TOKEN_COLLECTION).doc("default").set(tokenData);
        console.log("Successfully refreshed eBay token and stored in Firestore.");
        return tokenData;
    } catch (error) {
        console.error("Error refreshing eBay token:", error);
        throw error;
    }
}

// Function to retrieve the token from Firestore or refresh it if expired
async function getEbayToken() {
    try {
        const doc = await firestore.collection(EBAY_TOKEN_COLLECTION).doc("default").get();
        if (doc.exists) {
            const tokenData = doc.data();
            // Check if token is expired
            if (Date.now() < tokenData.expires_at - 60000) {
                console.log("Using existing token from Firestore.");
                return tokenData.access_token;
            } else {
                console.log("Token expired. Refreshing...");
                const newTokenData = await fetchEbayToken();
                return newTokenData.access_token;
            }
        } else {
            console.log("No token found in Firestore. Fetching new token...");
            const newTokenData = await fetchEbayToken();
            return newTokenData.access_token;
        }
    } catch (error) {
        console.error("Error retrieving token from Firestore:", error);
        throw error;
    }
}

// API endpoint to fetch eBay items
app.get("/api/ebay/items", async (req, res) => {
    try {
        const EBAY_OAUTH_TOKEN = await getEbayToken(); // Get the token dynamically

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
            ps5: "PlayStation 5",
            ps4: "PlayStation 4",
            xbox: "Xbox Series",
            accessories: "Gaming Accessories",
        };

        const conditionMap = {
            NEW: "1000",
            USED: "3000",
            LIKE_NEW: "2000",
            NEW_OTHER: "1500",
            FOR_PARTS: "7000",
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

        const items = data.itemSummaries.map((item) => ({
            title: item.title || "No Title Available",
            price: item.price?.value || "N/A",
            currency: item.price?.currency || "N/A",
            image: item.image?.imageUrl || "https://via.placeholder.com/150",
            url: item.itemWebUrl || "#",
        }));

        res.json(items);
    } catch (error) {
        console.error("Error fetching eBay items:", error);
        res.status(500).json({
            error: "Failed to fetch eBay items",
            message: error.message,
        });
    }
});

// Use dynamic PORT provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
