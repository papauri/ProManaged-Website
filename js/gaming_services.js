function initializeGamingServices() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    function activateTab(button) {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        button.classList.add("active");
        const targetPanel = document.getElementById(button.dataset.target);
        if (targetPanel) {
            targetPanel.classList.add("active");
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => activateTab(button));
    });
}
