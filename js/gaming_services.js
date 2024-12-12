function initializeGamingServices() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    if (tabButtons.length === 0 || tabPanels.length === 0) {
        console.warn("Gaming services: Tabs or panels not found.");
        return;
    }

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

    console.log("Gaming services initialized successfully.");
}
