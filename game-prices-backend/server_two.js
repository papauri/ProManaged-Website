import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const EBAY_OAUTH_TOKEN = "v^1.1#i^1#r^0#f^0#p^1#I^3#t^H4sIAAAAAAAAAOVYf2wTVRxvt246xwCVyCTGlBuGRNLru7v22t5osWwwCutW1sJcI8Lr3bvtXHt3uR9sxQTLJEgkBMUgQUWnkmAEBTULYIxLUJA/iCQS/0CiCf6hhAQ04cccMc67axndJICsiUvsP9f3fd/3fZ/P532/7707kKusenLTkk1DNfb7yvpzIFdmtxPVoKqyYt7U8rJZFTZQ5GDvz83JOfrKz89XYSYtM21IlSVRRc7eTFpUGcsYxHRFZCSoCiojwgxSGY1l4uFoM0PigJEVSZNYKY05I41BzM/SLEXxXhYgjgYcNKzijZgJKYjRLMenAAKQ8tA87WGNflXVUURUNShqQYwEpMdFEC7SlwCAoSiGonGf15fEnCuRogqSaLjgAAtZcBlrrFKE9fZQoaoiRTOCYKFIeHG8NRxpXNSSmO8uihUq6BDXoKarY1sNEoecK2FaR7efRrW8mbjOskhVMXcoP8PYoEz4Bph7gG9JTdG8n0ApAAIpD+XhuJJIuVhSMlC7PQ7TInAu3nJlkKgJWvZOihpqpJ5DrFZotRghIo1O87Fch2mBF5ASxBYtDHeEYzEsFFOkKBRhp+vmn7ZGF/CwfhJ5Ee/yExwd8EO+MFE+WkHmcTM1SCInmKKpzhZJW4gM1Gi8NmSRNoZTq9iqhHnNRFTsR97Q0BNImouaX0Vd6xLNdUUZQwin1bzzCoyO1jRFSOkaGo0wvsOSKIhBWRY4bHynlYuF9OlVg1iXpsmM293T04P3ULikdLpJAAj309HmONuFMkYx9mbMWs/7C3ce4BIsKiwyRqoCo2VlA0uvkasGALETC3mBnyDogu5jYYXGW/9hKOLsHlsRpaoQREBEEn4W0cCLfIS/FBUSKiSp28SBUjDrykClG2lyGrLIxRp5pmeQInAM5eVJys8jl5GqvMsT4HlXysvRLoJHCCCUSrEB//+pUO421eOIVZBWklwvWZ5z7TEBLofRdYroCXcsbW9PR3rlTCDZEVfoRnEFn/B1Qphqiwa62eDdVsMtyTekBUOZhDF/KQQwa710IiyRVA1xE6IXZyUZxaS0wGYn1wJTCheDipaNo3TaMEyIZFiWI6XZq0tG719uE/fGu3Rn1H90Pt2SlWqm7ORiZY5XjQBQFnDzBMJZKeM2a12CxvXDNK+2UE+It2DcXCcVa4Nknq3A5a+cuEUXV9eyuIJUSVeM2zbeat7AElI3Eo3zTFOkdBopK4kJ13Mmo2swlUaTrbBLkOACnGSHLeGjSJr20RPkxVpH6erJtiWVYit2NN3jtdo99iU/ZLN+RJ/9KOizf1lmt4P54AmiDsyuLF/hKJ8ySxU0hAuQx1WhUzTeXRWEd6OsDAWl7GHbqanN3IYlzVdzKf1Q+5UFfltN0TeG/lWgdvQrQ1U5UV30yQE8drOngpg2s4b0EATpA4CiKDoJ6m72OohHHDMq1x8WNp57KlItffd5InT21LU5DXtBzaiT3V5hc/TZbZ9tqR2ZcuXDQPKEY8/mzs0umdvYOG94cO/wF6fnvX8Eeda8s+sl35/7X/j0zPDF7PB1kaVP1+8Y6R9E679/e9kPWiI6cGTrmxd373vm6+jWjqsH59pOxOrlR0+cnNHwwb5tCX3glequpdu2NNDs0NChHz+uWTTy21sfefbs2uh7171K0Q9/cnLk0nb824OOut3HHmyq8649f7G2+f79F9gD8ddWBQdmzjl2fcYfs2svXF5w/Ix+9ae5x4fqv5nVtoaurnzxLLV9uGonWf/Xr6ufr0y+Ov3AQ8Tln7PsioEL4dy1QfDLG+d3nlOmd/3u3LB/5lfB1/fEH5+2rCX+wLOXetd1HX2vKTn48o5+b01+Lf8GhX/Ctv0RAAA"; // Your OAuth token here

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

        const config = selectedMarketplace ? 
            marketplaceConfig[selectedMarketplace] : 
            marketplaceConfig.GB;

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
            selectedMarketplace ? 
                `itemLocationCountry:${config.country}` : 
                "itemLocationCountry:{GB|DE|FR|IE}",
            // Add condition filter if specified
            condition && conditionMap[condition] ? 
                `conditionIds:{${conditionMap[condition]}}` : 
                null
        ].filter(Boolean).join(",");

        const params = new URLSearchParams({
            q: query,
            category_ids: category,
            limit: limit,
            filter: filters,
            marketplace_ids: selectedMarketplace ? 
                config.id : 
                "EBAY_GB,EBAY_FR,EBAY_DE,EBAY_IE"
        });

        const headers = {
            Authorization: `Bearer ${EBAY_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
            "X-EBAY-C-MARKETPLACE-ID": config.id,
            "X-EBAY-C-ENDUSERCTX": `contextualLocation=country=${config.country},zip=${config.zip}`
        };

        const ebayAPIUrl = `${baseURL}?${params.toString()}`;
        console.log('Request URL:', ebayAPIUrl); // For debugging

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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));