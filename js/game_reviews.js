document.addEventListener("DOMContentLoaded", () => {
    const gameReviewsContainer = document.getElementById("rawg-cards");
    const platformDropdown = document.getElementById("platform-filter");
    const applyFilterButton = document.getElementById("apply-platform-filter");

    // Load platforms dynamically
    const loadPlatforms = async () => {
        try {
            const response = await fetch(
                "https://promanaged-it.com/php/rawg_reviews.php?endpoint=platforms"
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const platforms = await response.json();

            platformDropdown.innerHTML = '<option value="">All Platforms</option>';

            platforms.results.forEach((platform) => {
                const option = document.createElement("option");
                option.value = platform.id; // Use platform ID for filtering
                option.textContent = platform.name; // Display the platform name
                platformDropdown.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching RAWG platforms:", error);
        }
    };

    // Load game reviews dynamically
    const loadGameReviews = async (platformId = "") => {
        try {
            const endpoint = platformId
                ? `https://promanaged-it.com/php/rawg_reviews.php?endpoint=games&platforms=${platformId}`
                : "https://promanaged-it.com/php/rawg_reviews.php?endpoint=games";
    
            const response = await fetch(endpoint);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            // console.log("RAWG Response Data:", data); // Debugging line
    
            const games = data.results || []; // Ensure games is an array
    
            gameReviewsContainer.innerHTML = "";
    
            if (games.length === 0) {
                gameReviewsContainer.innerHTML = `<p>No game reviews available to display.</p>`;
                return;
            }
    
            games.forEach((game) => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("latest-game-card");
    
                gameCard.innerHTML = `
                    <div class="latest-game-card-image">
                        <img src="${game.background_image || 'https://via.placeholder.com/150'}" alt="${game.name}" />
                    </div>
                    <div class="latest-game-card-content">
                        <h3 class="latest-game-title">${game.name}</h3>
                        <p class="latest-game-release"><strong>Release Date:</strong> ${game.released || "N/A"}</p>
                        <p class="latest-game-rating"><strong>Rating:</strong> ${game.rating || "N/A"} / 5</p>
                        <p class="latest-game-platforms"><strong>Platforms:</strong> ${
                            game.platforms ? game.platforms.map((p) => p.platform.name).join(", ") : "N/A"
                        }</p>
                        <p class="latest-game-genres"><strong>Genres:</strong> ${
                            game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"
                        }</p>
                    </div>
                `;
    
                gameReviewsContainer.appendChild(gameCard);
            });
        } catch (error) {
            console.error("Error fetching RAWG game reviews:", error);
            gameReviewsContainer.innerHTML =
                `<p>Failed to load game reviews. Please try again later.</p>`;
        }
    };
    

    // Event listener for applying the platform filter
    applyFilterButton.addEventListener("click", () => {
        const selectedPlatform = platformDropdown.value;
        loadGameReviews(selectedPlatform);
    });

    // Initial load
    loadPlatforms();
    loadGameReviews(); // Load all games by default
});
