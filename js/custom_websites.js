document.addEventListener('DOMContentLoaded', () => {
    // FAQ accordion. The open/closed height is a CSS concern
    // (.faq-item.active .faq-answer in custom_websites.css); this only flips the class.
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});
