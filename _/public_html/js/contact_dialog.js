document.addEventListener("DOMContentLoaded", function () {
    // Guard against double-injection
    if (document.getElementById("contact-dialog")) {
        return;
    }

    // Inject styles once
    var style = document.createElement("style");
    style.setAttribute("data-injected-by", "contact_dialog.js");
    style.textContent =
        ".contact-dialog {" +
        "  display: none;" +
        "  position: fixed;" +
        "  top: 0;" +
        "  left: 0;" +
        "  width: 100%;" +
        "  height: 100%;" +
        "  background: rgba(15, 23, 42, 0.7);" +
        "  z-index: 10000;" +
        "  justify-content: center;" +
        "  align-items: center;" +
        "}" +
        ".contact-dialog .contact-dialog__panel {" +
        "  background: var(--color-bg);" +
        "  color: var(--color-text);" +
        "  padding: var(--space-6);" +
        "  border-radius: var(--radius);" +
        "  box-shadow: var(--shadow-md);" +
        "  border: 1px solid var(--color-border);" +
        "  width: 90%;" +
        "  max-width: 400px;" +
        "  text-align: center;" +
        "}" +
        ".contact-dialog .contact-dialog__panel h3 {" +
        "  color: var(--color-text);" +
        "  margin-top: 0;" +
        "}" +
        ".contact-dialog .contact-dialog__panel p {" +
        "  color: var(--color-text-muted);" +
        "}" +
        ".contact-dialog .contact-dialog__panel a {" +
        "  color: var(--color-accent);" +
        "}" +
        ".contact-dialog .contact-dialog__panel a:hover {" +
        "  color: var(--color-accent-hover);" +
        "}" +
        "#close-dialog {" +
        "  background: var(--color-accent);" +
        "  color: var(--color-accent-contrast);" +
        "  padding: var(--space-3) var(--space-5);" +
        "  border: none;" +
        "  border-radius: var(--radius-sm);" +
        "  cursor: pointer;" +
        "  font-family: var(--font-sans);" +
        "  transition: background var(--transition);" +
        "}" +
        "#close-dialog:hover {" +
        "  background: var(--color-accent-hover);" +
        "}";
    document.head.appendChild(style);

    // Inject markup once
    var dialog = document.createElement("div");
    dialog.id = "contact-dialog";
    dialog.className = "contact-dialog";
    dialog.innerHTML =
        '<div class="contact-dialog__panel">' +
        "<h3>Contact Us</h3>" +
        "<p>You can reach us via the following:</p>" +
        "<p><strong>Email:</strong></p>" +
        "<p>" +
        '<a href="mailto:info@promanaged-it.com">info@promanaged-it.com</a><br>' +
        '<a href="mailto:support@promanaged-it.com">support@promanaged-it.com</a>' +
        "</p>" +
        "<p><strong>WhatsApp:</strong> +353-8-6008-1635</p>" +
        '<button id="close-dialog">Close</button>' +
        "</div>";
    document.body.appendChild(dialog);

    var contactDialog = document.getElementById("contact-dialog");

    function openDialog(e) {
        if (e) {
            e.preventDefault(); // Prevent default scrolling behavior
        }
        contactDialog.style.display = "flex"; // Show the dialog
    }

    function closeDialog() {
        contactDialog.style.display = "none"; // Hide the dialog
    }

    // Open the dialog when the "Get in Touch" link is clicked (event delegation
    // so this works regardless of injection order / duplicate trigger elements)
    document.addEventListener("click", function (e) {
        var trigger = e.target.closest("#get-in-touch-link");
        if (trigger) {
            openDialog(e);
        }
    });

    // Close the dialog when the "Close" button is clicked
    contactDialog.addEventListener("click", function (e) {
        if (e.target && e.target.id === "close-dialog") {
            closeDialog();
        }
        // Close the dialog when clicking the overlay/backdrop
        if (e.target === contactDialog) {
            closeDialog();
        }
    });

    // Close the dialog on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && contactDialog.style.display === "flex") {
            closeDialog();
        }
    });
});
