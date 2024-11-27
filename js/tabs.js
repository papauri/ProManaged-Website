document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.querySelector(`#${button.dataset.target}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
