document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.btn, .service-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-8px)';
            element.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            element.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.2)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = 'var(--shadow)';
        });
    });
});
