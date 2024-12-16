document.addEventListener("DOMContentLoaded", () => {
    const ebayCardsContainer = document.getElementById("ebay-cards");
    const conditionFilter = document.getElementById("condition-filter");
    const marketplaceFilter = document.getElementById("marketplace-filter");
    const productTypeFilter = document.getElementById("product-type-filter");
    const sortOrder = document.getElementById("sort-order");
    const applyFiltersButton = document.getElementById("apply-filters");
    const loadingSpinner = document.createElement("div");

    // Currency conversion rates
    const currencyRates = {
        GBP: 3600, // 1 GBP to MWK
        EUR: 3200, // 1 EUR to MWK
        USD: 2820, // 1 USD to MWK
    };

    // Product type configurations
    const productTypes = {
        ps5: { name: "PlayStation 5", icon: "🎮" },
        ps4: { name: "PlayStation 4", icon: "🎮" },
        xbox: { name: "Xbox Series", icon: "🎮" },
        accessories: { name: "Gaming Accessories", icon: "🎯" },
    };

    // Marketplace configurations
    const marketplaceConfig = {
        GB: { name: "United Kingdom", flag: "🇬🇧" },
        DE: { name: "Germany", flag: "🇩🇪" },
        FR: { name: "France", flag: "🇫🇷" },
        IE: { name: "Ireland", flag: "🇮🇪" },
    };

    // Condition configurations
    const conditionTypes = {
        NEW: { name: "New", id: "1000" },
        LIKE_NEW: { name: "Like New", id: "2000" },
        NEW_OTHER: { name: "New Other", id: "1500" },
        USED: { name: "Used", id: "3000" },
        FOR_PARTS: { name: "For Parts", id: "7000" },
    };

    // Helper functions
    const convertToMWK = (priceString) => {
        if (!priceString) return "N/A";
        const [value, currency] = priceString.split(" ");
        const conversionRate = currencyRates[currency] || 1;
        const priceMWK = parseFloat(value) * conversionRate;
        return `${priceMWK.toLocaleString()} MWK`;
    };

    const getProductTypeName = () => {
        const selectedType = productTypeFilter.value;
        return selectedType ? productTypes[selectedType].name : "all gaming products";
    };

    const getMarketplaceName = () => {
        const selectedMarketplace = marketplaceFilter.value;
        return selectedMarketplace
            ? marketplaceConfig[selectedMarketplace].name
            : "all marketplaces";
    };

    const getRatingColor = (rating) => {
        if (rating >= 98) return "#2ecc71";
        if (rating >= 96) return "#f1c40f";
        return "#e67e22";
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerHTML = `
        <div class="spinner-content">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Searching ${getProductTypeName()} in ${getMarketplaceName()}...</p>
        </div>
    `;

    const showNoResults = () => {
        ebayCardsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search-minus"></i>
                <p>No ${getProductTypeName()} listings found in ${getMarketplaceName()}</p>
                <p>Try adjusting your filters</p>
            </div>`;
    };

    const showError = (error) => {
        ebayCardsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load eBay listings</p>
                <p>Error: ${error.message}</p>
            </div>`;
    };

    const createMarketplaceSummary = (items) => {
        const summary = items.reduce((acc, item) => {
            acc[item.marketplace] = (acc[item.marketplace] || 0) + 1;
            return acc;
        }, {});

        const element = document.createElement("div");
        element.classList.add("marketplace-summary");

        const summaryText = Object.entries(summary)
            .map(([market, count]) => {
                const config = marketplaceConfig[market];
                return `${config?.flag || "🌍"} ${config?.name || "Other"}: ${count.toLocaleString()}`;
            })
            .join(" | ");

        element.innerHTML = `
            <div class="summary-content">
                <h3>${productTypes[productTypeFilter.value]?.icon || "🎮"} Found ${
            items.length.toLocaleString()
        } ${getProductTypeName()} Listings</h3>
                <p>${summaryText}</p>
            </div>`;

        return element;
    };

    const createProductCard = (item) => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        const config = marketplaceConfig[item.marketplace];
        const marketplaceFlag = config?.flag || "🌍";
        const sellerRating = parseFloat(item.feedbackPercentage || 0);
        const ratingColor = getRatingColor(sellerRating);

        card.innerHTML = `
            <div class="game-card-image">
                <img src="${item.image}" alt="${item.title}" class="product-image" 
                    onerror="this.src='https://via.placeholder.com/150'">
                <span class="marketplace-flag">${marketplaceFlag}</span>
                ${item.productType ? `<span class="product-type-badge">${productTypes[item.productType]?.icon || "🎮"}</span>` : ""}
                <span class="condition-badge">${item.condition}</span>
            </div>
            <div class="game-card-content">
                <h3 class="game-title">${truncateText(item.title, 50)}</h3>
                <div class="game-price">
                    <strong>Price:</strong> ${item.originalPrice || "N/A"}
                </div>
                <div class="game-price-mwk">
                    <strong>Price (MWK):</strong> ${convertToMWK(item.originalPrice)}
                </div>
                <div class="game-condition">
                    <strong>Condition:</strong> ${item.condition}
                </div>
                <div class="seller-info">
                    <strong>Seller Rating:</strong> 
                    <span style="color: ${ratingColor};">${item.feedbackPercentage || "N/A"}%</span>
                </div>
                <div class="marketplace-summary">
                    <strong>Marketplace:</strong> ${marketplaceFlag} ${config?.name || "Other"}
                </div>
                <a href="${item.url}" target="_blank" class="buy-button">
                    View on eBay ${marketplaceFlag}
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        return card;
    };

    const loadEbayListings = async () => {
        try {
            ebayCardsContainer.innerHTML = "";
            ebayCardsContainer.appendChild(loadingSpinner);

            const params = new URLSearchParams({
                marketplace: marketplaceFilter.value,
                type: productTypeFilter.value,
                condition: conditionFilter.value,
                sort: sortOrder.value,
            });

            const response = await fetch(
                `https://promanaged-website-1.onrender.com/api/ebay/items?${params.toString()}`
            );
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const items = await response.json();
            ebayCardsContainer.innerHTML = "";

            if (!Array.isArray(items) || items.length === 0) {
                showNoResults();
                return;
            }

            const sortedItems = sortItems(items, sortOrder.value);
            const marketplaceSummary = createMarketplaceSummary(sortedItems);
            ebayCardsContainer.appendChild(marketplaceSummary);

            sortedItems.forEach((item) => {
                const card = createProductCard(item);
                ebayCardsContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error loading eBay listings:", error);
            showError(error);
        }
    };

    const sortItems = (items, sortOrder) => {
        return [...items].sort((a, b) => {
            const priceA = parseFloat(a.originalPrice.split(" ")[0] || 0);
            const priceB = parseFloat(b.originalPrice.split(" ")[0] || 0);
            return sortOrder === "-price" ? priceB - priceA : priceA - priceB;
        });
    };

    let timeout;
    const handleFilterChange = () => {
        clearTimeout(timeout);
        timeout = setTimeout(loadEbayListings, 300);
    };

    applyFiltersButton.addEventListener("click", loadEbayListings);
    marketplaceFilter.addEventListener("change", handleFilterChange);
    productTypeFilter.addEventListener("change", handleFilterChange);
    sortOrder.addEventListener("change", handleFilterChange);
    conditionFilter.addEventListener("change", handleFilterChange);

    loadEbayListings();
});
