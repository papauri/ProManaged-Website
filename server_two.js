import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Use the environment variable for the OAuth token
const EBAY_OAUTH_TOKEN = process.env.EBAY_OAUTH_TOKEN; 

// API endpoint to fetch eBay items
app.get("/api/ebay/items", async (req, res) => {
    try {
        const baseURL = "https://api.ebay.com/buy/browse/v1/item_summary/search";

        const selectedMarketplace = req.query.marketplace || "";
        const condition = req.query.condition;

        const marketplaceConfig = {
            GB: { id: "EBAY_GB", country: "GB", zip: "SW1A1AA" },
            DE: { id: "EBAY_DE", country: "DE", zip: "10115" },
            FR: { id: "EBAY_FR", country: "FR", zip: "75001" },
            IE: { id: "EBAY_IE", country: "IE", zip: "D01" }
        };

        const config = selectedMarketplace 
            ? marketplaceConfig[selectedMarketplace] 
            : marketplaceConfig.GB;

        // Product types configuration
        const productTypes = {
            "ps5": "PlayStation 5",
            "ps4": "PlayStation 4",
            "xbox": "Xbox Series",
            "accessories": "Gaming Accessories"
        };

        // Condition mapping as per eBay API
        const conditionMap = {
            "NEW": "1000",
            "USED": "3000",
            "LIKE_NEW": "2000",
            "NEW_OTHER": "1500",
            "FOR_PARTS": "7000"
        };

        const query = req.query.q || productTypes[req.query.type] || "Gaming Console";
        const category = req.query.category_ids || "139971"; // Video Games & Consoles
        const limit = req.query.limit || "20";

        // Build filters array
        const filters = [
            "price:[..1000]",
            "feedbackPercentage:[95..100]",
            selectedMarketplace 
                ? `itemLocationCountry:${config.country}` 
                : "itemLocationCountry:{GB|DE|FR|IE}",
            condition && conditionMap[condition] 
                ? `conditionIds:{${conditionMap[condition]}}` 
                : null
        ].filter(Boolean).join(",");

        const params = new URLSearchParams({
            q: query,
            category_ids: category,
            limit: limit,
            filter: filters,
            marketplace_ids: selectedMarketplace 
                ? config.id 
                : "EBAY_GB,EBAY_FR,EBAY_DE,EBAY_IE"
        });

        const headers = {
            Authorization: `Bearer ${EBAY_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
            "X-EBAY-C-MARKETPLACE-ID": config.id,
            "X-EBAY-C-ENDUSERCTX": `contextualLocation=country=${config.country},zip=${config.zip}`
        };

        const ebayAPIUrl = `${baseURL}?${params.toString()}`;
        if (process.env.NODE_ENV === 'development') {
            console.log('Request URL:', ebayAPIUrl); // For debugging
        }

        const response = await fetch(ebayAPIUrl, { headers });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`eBay API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (!data.itemSummaries) {
            return res.json([]);
        }

        const items = data.itemSummaries
            .filter(item => {
                const feedback = parseFloat(item.seller?.feedbackPercentage);
                return feedback >= 95 && feedback <= 100;
            })
            .map(item => {
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

                // Get condition display name
                const getConditionName = (conditionId) => {
                    const conditionNames = {
                        "1000": "New",
                        "1500": "New - Other",
                        "2000": "Like New",
                        "3000": "Used",
                        "7000": "For Parts"
                    };
                    return conditionNames[conditionId] || item.condition || "Unknown Condition";
                };

                return {
                    title: item.title || "No Title Available",
                    originalPrice: `${originalPrice.toFixed(2)} ${currency}`,
                    priceMWK: `${priceMWK.toFixed(2)} MWK`,
                    image: item.image?.imageUrl || "https://via.placeholder.com/150",
                    feedbackPercentage: item.seller?.feedbackPercentage || "N/A",
                    marketplace: item.itemLocation?.country || "N/A",
                    condition: getConditionName(item.conditionId),
                    url: item.itemWebUrl || "#",
                    productType: getProductType(item.title)
                };
            });

        res.json(items);
    } catch (error) {
        console.error("Error fetching eBay items:", error);
        res.status(500).json({
            error: "Failed to fetch eBay items",
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Helper function to determine product type
function getProductType(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("playstation 5") || titleLower.includes("ps5")) return "ps5";
    if (titleLower.includes("playstation 4") || titleLower.includes("ps4")) return "ps4";
    if (titleLower.includes("xbox")) return "xbox";
    return "accessories";
}

// Use dynamic PORT provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
