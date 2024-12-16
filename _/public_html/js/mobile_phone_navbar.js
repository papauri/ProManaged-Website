document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavMenu = document.querySelector('.nav-menu.mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-menu.mobile .nav-link');

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        hamburgerMenu.classList.toggle('active');
        mobileNavMenu.classList.toggle('open');
        navOverlay.classList.toggle('visible');
    };

    // Event listener for the hamburger menu
    hamburgerMenu.addEventListener('click', toggleMenu);

    // Event listener for closing the menu when clicking outside
    navOverlay.addEventListener('click', toggleMenu);

    // Event listeners for closing the menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
});