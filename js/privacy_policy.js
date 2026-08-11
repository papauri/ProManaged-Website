document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for back to home link
    const backToHomeLink = document.querySelector("footer a");

    if (backToHomeLink) {
        backToHomeLink.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            // Scroll smoothly to the top (or navigate to the home page)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            // Optional: Redirect to home after scrolling
            setTimeout(() => {
                window.location.href = backToHomeLink.getAttribute("href");
            }, 1000); // Adjust delay as needed
        });
    }
});
