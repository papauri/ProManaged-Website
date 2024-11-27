document.addEventListener("DOMContentLoaded", () => {
    const gameDealsContainer = document.getElementById("cheapshark-cards");

    const loadGameDeals = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/games"); // Replace with your backend URL
            const games = await response.json();

            // Filter out duplicates and games with a price of $0
            const uniqueGames = [];
            const seenTitles = new Set();

            games.forEach(game => {
                if (!seenTitles.has(game.title) && parseFloat(game.salePrice) > 0) {
                    uniqueGames.push(game);
                    seenTitles.add(game.title);
                }
            });

            // Render filtered and sorted games
            uniqueGames.forEach(game => {
                const salePriceMWK = (parseFloat(game.salePrice) * 2820).toLocaleString(); // MWK Conversion
                const normalPriceMWK = (parseFloat(game.normalPrice) * 2820).toLocaleString();
                const dealUrl = `https://www.cheapshark.com/api/1.0/deals`;
                const store = game.storeID ? getStoreName(game.storeID) : "Unknown"; // Map store ID to store name
                const platforms = getPlatformFromTitle(game.title); // Extract platform from the title if available

                const gameCard = document.createElement("div");
                gameCard.classList.add("game-card");

                gameCard.innerHTML = `
                    <img src="${game.thumb}" alt="${game.title}">
                    <div class="game-info">
                        <h3 class="game-title">${game.title}</h3>
                        <p class="game-prices">
                            <strong>Price (MWK):</strong> ${salePriceMWK} MWK<br>
                            <strong>Normal Price:</strong> $${game.normalPrice} (${normalPriceMWK} MWK)
                        </p>
                        <p class="game-store"><strong>Store:</strong> ${store}</p>
                        <a href="${dealUrl}" target="_blank" class="btn-buy">Buy Now</a>
                    </div>
                `;

                gameDealsContainer.appendChild(gameCard);
            });

            // Handle case when no games are available
            if (uniqueGames.length === 0) {
                gameDealsContainer.innerHTML = `<p>No game deals available to display.</p>`;
            }
        } catch (error) {
            console.error("Error fetching CheapShark game deals:", error);
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

    // Helper function to infer platform from game title (basic example)
    const getPlatformFromTitle = (title) => {
        const platforms = ["PC", "Xbox", "PlayStation", "Switch"];
        const lowerTitle = title.toLowerCase();
        return platforms.find(platform => lowerTitle.includes(platform.toLowerCase())) || "Various";
    };

    loadGameDeals();
});
