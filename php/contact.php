<?php
require_once __DIR__ . '/mailer.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Honeypot: real visitors never fill this hidden field in. Bots do.
    // Pretend success without sending so the bot doesn't learn it was caught.
    if (!empty($_POST["website"])) {
        http_response_code(200);
        echo "Thank you for your message. We'll get back to you soon!";
        exit;
    }

    $name = strip_tags(trim($_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"] ?? ""));
    $message = trim($_POST["message"] ?? "");

    if (empty($name) || empty($email) || empty($phone) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please complete the form and provide a valid email address.";
        http_response_code(400);
        exit;
    }

    // Bound each field so an abusive payload cannot produce a giant email. The values
    // are still escaped at render time; this only caps size.
    $name = mb_substr($name, 0, 120);
    $phone = mb_substr($phone, 0, 60);
    $message = mb_substr($message, 0, 5000);

    $recipient = "info@promanaged-it.com";
    $received = gmdate('j M Y, H:i') . ' UTC';

    // --- Internal notification -------------------------------------------------
    $internal = pm_internal_email(
        'Website enquiry',
        'New enquiry',
        [
            'Name'  => $name,
            'Email' => $email,
            'Phone' => $phone,
        ],
        [
            'Received' => $received,
        ],
        'Their message',
        $message,
        'Reply to this enquiry directly — the reply address is already set to the sender.'
    );

    $internalSubject = "New enquiry — {$name}";
    $sent = sendSiteMail($recipient, $internalSubject, $internal, $email, $name);

    // --- Customer confirmation -------------------------------------------------
    // Sent only once the internal copy is safely away, so a visitor is never told we
    // have their enquiry when it never reached us. A failure here is logged and
    // deliberately does not fail the request: we do have the enquiry.
    if ($sent) {
        $customer = pm_customer_email(
            'Received',
            'Thanks — we have your message',
            "Hi {$name}, your enquiry has reached us and a person will read it, not a filter.",
            [
                'Your message' => (mb_strlen($message) > 220 ? mb_substr($message, 0, 220) . '…' : $message),
                'We will reply to' => $email,
                'Received' => $received,
            ],
            'We will come back to you with honest next steps — including if we think someone else is a better fit. We do not send follow-up sales sequences.',
            'If anything changes in the meantime, or you would rather talk it through, just reply to this email or write to us at'
        );

        sendSiteMail($email, 'We have your enquiry — ProManaged IT', $customer, $recipient, 'ProManaged IT');
    }

    if ($sent) {
        echo "Thank you for your message. We'll get back to you soon!";
        http_response_code(200);
    } else {
        echo "Sorry, something went wrong. Please try again later.";
        http_response_code(500);
    }
} else {
    echo "Invalid request method.";
    http_response_code(403);
}
