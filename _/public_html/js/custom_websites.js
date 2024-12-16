document.addEventListener('DOMContentLoaded', () => {
    // Currency conversion functionality
    const currencySelectors = document.querySelectorAll('.currency-selector');
    const exchangeRates = {
        eur: 1,
        mwk: 2000 // Example rate: 1 EUR = 2000 MWK
    };

    currencySelectors.forEach(selector => {
        selector.addEventListener('change', function () {
            const card = this.closest('.website-card');
            if (!card) return; // Ensure the card exists
            const priceSpan = card.querySelector('.price');
            if (!priceSpan) return; // Ensure the price span exists
            const selectedCurrency = this.value;

            // Get the price range from data attributes
            const eurRange = card.dataset.eur.split(' - ').map(num => parseFloat(num.replace(/[^0-9.-]+/g, '')));

            if (selectedCurrency === 'eur') {
                priceSpan.textContent = `€${eurRange[0]} - €${eurRange[1]}`;
            } else {
                const mwkMin = Math.round(eurRange[0] * exchangeRates.mwk);
                const mwkMax = Math.round(eurRange[1] * exchangeRates.mwk);
                priceSpan.textContent = `MK${mwkMin.toLocaleString()} - MK${mwkMax.toLocaleString()}`;
            }
        });

        // Initialize to default currency (EUR)
        const defaultCurrency = 'eur';
        selector.value = defaultCurrency;
        const event = new Event('change');
        selector.dispatchEvent(event);
    });

    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Animation for step cards
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stepCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });
    }

    // FAQ section interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const answer = item.querySelector('p');
            if (answer) {
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            }
        });
    });

    // Website card hover effects
    const websiteCards = document.querySelectorAll('.website-card');
    if (websiteCards.length > 0) {
        websiteCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 25px 35px -15px rgba(0, 0, 0, 0.5)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 15px -5px rgba(0, 0, 0, 0.3)';
            });
        });
    }
});
