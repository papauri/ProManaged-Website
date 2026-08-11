document.addEventListener("DOMContentLoaded", () => {
    const gameSearchInput = document.getElementById("game-search-input");
    const gameSearchButton = document.getElementById("game-search-button");
    const gameSearchResults = document.getElementById("game-search-results");

    // Conversion rate from USD to MWK
    const USD_TO_MWK = 2820;

    const searchGames = async () => {
        const searchTerm = gameSearchInput.value.trim();

        if (!searchTerm) {
            gameSearchResults.innerHTML = `<p>Please enter a game title to search.</p>`;
            return;
        }

        try {
            gameSearchResults.innerHTML = `<p>Searching for games...</p>`;

            const response = await fetch(
                `https://promanaged-it.com/php/game_search.php?title=${encodeURIComponent(searchTerm)}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch search results: ${response.statusText}`);
            }

            const games = await response.json();

            if (games.length > 0) {
                gameSearchResults.innerHTML = games
                    .map((game) => {
                        const dealUrl = `https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`;
                        const salePriceMWK = (parseFloat(game.cheapest) * USD_TO_MWK).toLocaleString();
                        return `
                            <div class="game-card">
                                <img src="${game.thumb}" alt="${game.external}" class="game-thumbnail">
                                <div class="game-info">
                                    <h3 class="game-title">${game.external}</h3>
                                    <p class="game-prices">
                                        <strong>Cheapest Price (MWK):</strong> ${salePriceMWK} MWK<br>
                                        <strong>Cheapest Price (USD):</strong> $${game.cheapest}
                                    </p>
                                    <a href="${dealUrl}" target="_blank" class="btn-buy">View Deal</a>
                                </div>
                            </div>
                        `;
                    })
                    .join("");
            } else {
                gameSearchResults.innerHTML = `<p>No games found for "${searchTerm}".</p>`;
            }
        } catch (error) {
            console.error("Error fetching game search results:", error);
            gameSearchResults.innerHTML = `<p>Failed to search for games. Please try again later.</p>`;
        }
    };

    // Event listener for the search button
    gameSearchButton.addEventListener("click", searchGames);
});
