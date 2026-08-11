document.addEventListener("DOMContentLoaded", () => {
    const gameDealsContainer = document.getElementById("cheapshark-cards");

    const loadGameDeals = async () => {
        try {
            const response = await fetch("https://promanaged-it.com/php/game_prices.php");

            if (!response.ok) {
                throw new Error(`Failed to fetch games: ${response.statusText}`);
            }

            const games = await response.json();

            // Display the games
            if (games.length > 0) {
                gameDealsContainer.innerHTML = games
                    .map((game) => {
                        const salePriceMWK = game.priceMWK;
                        const normalPriceMWK = game.normalPriceMWK;
                        const dealUrl = `https://www.cheapshark.com/redirect?dealID=${game.dealID}`;
                        const store = getStoreName(game.storeID);
                        const platforms = getPlatformFromTitle(game.title);

                        return `
                            <div class="game-card">
                                <img src="${game.thumb}" alt="${game.title}" class="game-thumbnail">
                                <div class="game-info">
                                    <h3 class="game-title">${game.title}</h3>
                                    <p class="game-prices">
                                        <strong>Price (MWK):</strong> ${salePriceMWK} MWK<br>
                                        <strong>Normal Price:</strong> $${game.normalPrice} (${normalPriceMWK} MWK)
                                    </p>
                                    <p class="game-platform"><strong>Platform:</strong> ${platforms}</p>
                                    <p class="game-store"><strong>Store:</strong> ${store}</p>
                                    <a href="${dealUrl}" target="_blank" class="btn-buy">Buy Now</a>
                                </div>
                            </div>
                        `;
                    })
                    .join("");
            } else {
                gameDealsContainer.innerHTML = `<p>No game deals available at the moment. Please check back later.</p>`;
            }
        } catch (error) {
            console.error("Error fetching game deals:", error);
            gameDealsContainer.innerHTML = `<p>Failed to load game deals. Please try again later.</p>`;
        }
    };

    // Helper function to map store IDs to store names
    const getStoreName = (storeID) => {
        const storeMapping = {
            "1": "Steam",
            "2": "GamersGate",
            "3": "GreenManGaming",
            "4": "Amazon",
            "5": "GameStop",
            "6": "Direct2Drive",
            "7": "GOG",
            "8": "Origin",
            "9": "Get Games",
            "10": "ShinyLoot",
            "11": "Humble Store",
            "12": "Desura",
            "13": "Uplay",
            "14": "IndieGameStand",
            "15": "Fanatical",
            "16": "Gamesrocket",
            "17": "Games Republic",
            "18": "SilaGames",
            "19": "Playfield",
            "20": "Imperial Games",
            "21": "WinGameStore",
            "22": "FunStockDigital",
            "23": "GameBillet",
            "24": "Voidu",
            "25": "Epic Games Store",
        };
        return storeMapping[storeID] || "Unknown";
    };

    // Helper function to infer platform from game title
    const getPlatformFromTitle = (title) => {
        const platformKeywords = {
            PC: ["pc", "steam", "windows"],
            Xbox: ["xbox", "xbox one", "xbox series"],
            PlayStation: ["ps4", "ps5", "playstation"],
            Switch: ["switch", "nintendo"],
        };

        const lowerTitle = title.toLowerCase();
        for (const [platform, keywords] of Object.entries(platformKeywords)) {
            if (keywords.some((keyword) => lowerTitle.includes(keyword))) {
                return platform;
            }
        }
        return "Various";
    };

    loadGameDeals();
});
