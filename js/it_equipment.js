// it-equipment.js

class ITEquipmentSearch {
    constructor() {
        this.initializeElements();
        this.initializeData();
        this.bindEvents();
    }

    initializeElements() {
        this.searchInput = document.getElementById('shop-search');
        this.categoryFilter = document.getElementById('category-filter');
        this.priceFilter = document.getElementById('price-filter');
        this.searchButton = document.getElementById('search-btn');
        this.equipmentGrid = document.getElementById('equipment-grid');
        this.activeFiltersContainer = document.getElementById('active-filters');
        this.resultsCount = document.createElement('div');
        this.resultsCount.className = 'results-count';
        this.activeFiltersContainer.parentNode.insertBefore(this.resultsCount, this.activeFiltersContainer.nextSibling);
    }

    initializeData() {
        this.shopData = new Map();
        this.activeFilters = new Set();
        this.lastSearchTerm = '';
        this.searchDelay = null;

        // Extract shop metadata from the DOM
        document.querySelectorAll('.equipment-card').forEach(card => {
            const category = card.dataset.category;
            const shops = card.querySelectorAll('.shop-list a');

            shops.forEach(shop => {
                const shopName = shop.dataset.shop;
                if (!this.shopData.has(shopName)) {
                    this.shopData.set(shopName, {
                        name: shop.textContent,
                        categories: new Set([category]),
                        priceRange: this.getPriceRange(shop),
                        rating: this.getRandomRating(), // Simulated rating, replace with API data
                        url: shop.href
                    });
                } else {
                    this.shopData.get(shopName).categories.add(category);
                }
            });
        });
    }

    bindEvents() {
        // Search on input with debounce
        this.searchInput.addEventListener('input', () => {
            clearTimeout(this.searchDelay);
            this.searchDelay = setTimeout(() => this.performSearch(), 300);
        });

        // Filter and search on dropdown change or button click
        this.searchButton.addEventListener('click', () => this.performSearch());
        this.categoryFilter.addEventListener('change', () => this.performSearch());
        this.priceFilter.addEventListener('change', () => this.performSearch());

        // Remove active filters when clicking on filter tags
        this.activeFiltersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                this.removeFilter(e.target.dataset.filter);
            }
        });

        // Add sorting functionality
        document.querySelectorAll('.sort-option').forEach(option => {
            option.addEventListener('click', () => this.sortResults(option.dataset.sort));
        });
    }

    performSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const categoryFilter = this.categoryFilter.value;
        const priceFilter = this.priceFilter.value;

        let visibleCount = 0;
        const cards = this.equipmentGrid.getElementsByClassName('equipment-card');

        Array.from(cards).forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category;
            const shops = Array.from(card.querySelectorAll('.shop-list a'));

            const matchesSearch = this.matchesSearchCriteria(cardText, shops, searchTerm);
            const matchesCategory = this.matchesCategory(cardCategory, categoryFilter);
            const matchesPrice = this.matchesPrice(shops, priceFilter);

            const isVisible = matchesSearch && matchesCategory && matchesPrice;
            card.style.display = isVisible ? '' : 'none';

            if (isVisible) {
                visibleCount++;
                this.updatePriceVisibility(card, priceFilter);
            }
        });

        this.updateActiveFilters(searchTerm, categoryFilter, priceFilter);
        this.updateResultsCount(visibleCount);
    }

    matchesSearchCriteria(cardText, shops, searchTerm) {
        if (!searchTerm) return true;

        // Check card text
        if (cardText.includes(searchTerm)) return true;

        // Check shop names and categories
        return shops.some(shop => {
            const shopData = this.shopData.get(shop.dataset.shop);
            return shopData && (
                shopData.name.toLowerCase().includes(searchTerm) ||
                Array.from(shopData.categories).some(cat => cat.toLowerCase().includes(searchTerm))
            );
        });
    }

    matchesCategory(cardCategory, filterCategory) {
        return filterCategory === 'all' || cardCategory === filterCategory;
    }

    matchesPrice(shops, priceFilter) {
        if (priceFilter === 'all') return true;
        return shops.some(shop => {
            const shopData = this.shopData.get(shop.dataset.shop);
            return shopData && shopData.priceRange === priceFilter;
        });
    }

    updatePriceVisibility(card, priceFilter) {
        const priceCategories = card.querySelectorAll('.shop-category');

        priceCategories.forEach(category => {
            if (priceFilter === 'all') {
                category.style.display = '';
            } else if (category.classList.contains(priceFilter)) {
                category.style.display = '';
            } else {
                category.style.display = 'none';
            }
        });
    }

    updateActiveFilters(searchTerm, categoryFilter, priceFilter) {
        this.activeFiltersContainer.innerHTML = '';

        if (searchTerm) {
            this.addFilterTag('Search: ' + searchTerm, searchTerm);
        }
        if (categoryFilter !== 'all') {
            this.addFilterTag('Category: ' + categoryFilter, categoryFilter);
        }
        if (priceFilter !== 'all') {
            this.addFilterTag('Price: ' + priceFilter, priceFilter);
        }
    }

    addFilterTag(label, value) {
        const tag = document.createElement('span');
        tag.className = 'filter-tag';
        tag.dataset.filter = value;
        tag.textContent = label;
        this.activeFiltersContainer.appendChild(tag);
    }

    removeFilter(filter) {
        if (filter === this.searchInput.value.toLowerCase()) {
            this.searchInput.value = '';
        } else if (filter === this.categoryFilter.value) {
            this.categoryFilter.value = 'all';
        } else if (filter === this.priceFilter.value) {
            this.priceFilter.value = 'all';
        }
        this.performSearch();
    }

    updateResultsCount(count) {
        this.resultsCount.textContent = `Found ${count} result${count !== 1 ? 's' : ''}`;
    }

    getPriceRange(shopElement) {
        const parentCategory = shopElement.closest('.shop-category');
        return parentCategory.classList.contains('budget') ? 'budget' :
            parentCategory.classList.contains('mid-range') ? 'mid' : 'premium';
    }

    getRandomRating() {
        return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
    }

    sortResults(sortBy) {
        const cards = Array.from(this.equipmentGrid.children);
        const sortedCards = this.sortCards(cards, sortBy);

        sortedCards.forEach(card => this.equipmentGrid.appendChild(card));
    }

    sortCards(cards, sortBy) {
        return cards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                case 'price':
                    return this.getAveragePrice(a) - this.getAveragePrice(b);
                case 'rating':
                    return this.getAverageRating(b) - this.getAverageRating(a);
                default:
                    return 0;
            }
        });
    }

    getAveragePrice(card) {
        const shops = Array.from(card.querySelectorAll('.shop-list a'));
        return shops.reduce((acc, shop) => {
            const shopData = this.shopData.get(shop.dataset.shop);
            return acc + (shopData.priceRange === 'budget' ? 1 :
                shopData.priceRange === 'mid' ? 2 : 3);
        }, 0) / shops.length;
    }

    getAverageRating(card) {
        const shops = Array.from(card.querySelectorAll('.shop-list a'));
        return shops.reduce((acc, shop) => {
            const shopData = this.shopData.get(shop.dataset.shop);
            return acc + parseFloat(shopData.rating);
        }, 0) / shops.length;
    }
}

// Initialize the search system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ITEquipmentSearch();
});
