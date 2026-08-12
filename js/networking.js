document.addEventListener("DOMContentLoaded", () => {
    const euroToMwkRate = 3200; // Example conversion rate, adjust as necessary

    // Function to update prices dynamically
    const updatePrices = (currency) => {
        document.querySelectorAll('.price-info').forEach(priceInfo => {
            const euroAmount = priceInfo.querySelector('.service-fee, .setup-fee');
            if (euroAmount) {
                const euroTextMatch = euroAmount.textContent.match(/€(\d+)/); // Extract euro value
                const textBeforeAmount = euroAmount.textContent.split('€')[0]; // Preserve the "starting from" or other text
                if (euroTextMatch) {
                    const euroValue = parseFloat(euroTextMatch[1]);
                    const mwkValue = euroValue * euroToMwkRate;

                    if (currency === 'MWK') {
                        euroAmount.textContent = `${textBeforeAmount}${Math.round(mwkValue).toLocaleString()} MWK`; // Show only MWK
                    } else if (currency === 'EUR') {
                        euroAmount.textContent = `${textBeforeAmount}€${euroValue}`; // Show only Euro
                    } else {
                        euroAmount.innerHTML = `${textBeforeAmount}€${euroValue} <span class="converted-price">(${Math.round(mwkValue).toLocaleString()} MWK)</span>`; // Show both
                    }
                }
            }
        });
    };

    // Check user location using Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;

                // Simulated Malawi coordinates
                const isMalawi = (
                    userLatitude >= -17 && userLatitude <= -9 && // Malawi's lat range
                    userLongitude >= 32 && userLongitude <= 36   // Malawi's lng range
                );

                // Simulated Europe bounds (broadly covers Europe)
                const isEurope = (
                    userLatitude >= 35 && userLatitude <= 70 && // Europe's lat range
                    userLongitude >= -10 && userLongitude <= 40  // Europe's lng range
                );

                if (isMalawi) {
                    updatePrices('MWK');
                } else if (isEurope) {
                    updatePrices('EUR');
                } else {
                    updatePrices();
                }
            },
            () => {
                // Declining the prompt (or an unavailable fix) is an expected outcome,
                // not a fault — fall back silently to showing both currencies.
                // Fallback: Show both Euro and MWK
                updatePrices();
            }
        );
    } else {
        // Fallback: Show both Euro and MWK
        updatePrices();
    }

    // Hover effect for active cards
    document.querySelectorAll('.network-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active'); // Add active class
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('active'); // Remove active class
        });
    });
});
