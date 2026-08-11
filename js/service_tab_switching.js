document.addEventListener("DOMContentLoaded", () => {
    // Get all tab buttons and tab panels
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    // Function to activate a tab
    const activateTab = (targetId) => {
        // Remove "active" class from all buttons and panels
        tabButtons.forEach(button => button.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        // Add "active" class to the clicked button and corresponding panel
        const targetPanel = document.getElementById(targetId);
        const clickedButton = [...tabButtons].find(button => button.dataset.target === targetId);

        if (targetPanel && clickedButton) {
            targetPanel.classList.add("active");
            clickedButton.classList.add("active");
        }
    };

    // Add click event listener to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            activateTab(targetId);
        });
    });
});
