document.addEventListener("DOMContentLoaded", () => {
    const gameReviewsContainer = document.getElementById("rawg-cards");

    const loadGameReviews = async () => {
        try {
            // Fetch games ordered by release date
            const response = await fetch("https://api.rawg.io/api/games?key=6d92d33bea12401ea6cb1fbe787c9e23");
            const data = await response.json();

            const games = data.results; // Get the games from the API response

            // Render games
            games.forEach((game) => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("game-card");

                gameCard.innerHTML = `
                    <img src="${game.background_image}" alt="${game.name}">
                    <div class="game-info">
                        <h3 class="game-title">${game.name}</h3>
                        <p class="game-release"><strong>Release Date:</strong> ${game.released || "N/A"}</p>
                        <p class="game-rating"><strong>Rating:</strong> ${game.rating} / 5</p>
                        <p class="game-platforms"><strong>Platforms:</strong> ${
                            game.platforms ? game.platforms.map(platform => platform.platform.name).join(", ") : "N/A"
                        }</p>
                        <p class="game-genres"><strong>Genres:</strong> ${
                            game.genres ? game.genres.map(genre => genre.name).join(", ") : "N/A"
                        }</p>
                    </div>
                `;

                gameReviewsContainer.appendChild(gameCard);
            });

            // If no games are returned
            if (games.length === 0) {
                gameReviewsContainer.innerHTML = `<p>No game reviews available to display.</p>`;
            }
        } catch (error) {
            console.error("Error fetching RAWG game reviews:", error);
            gameReviewsContainer.innerHTML = `<p>Failed to load game reviews. Please try again later.</p>`;
        }
    };

    loadGameReviews();
});
