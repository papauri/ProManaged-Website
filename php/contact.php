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

    $recipient = "info@promanaged-it.com";
    $subject = "Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message\n";

    if (sendSiteMail($recipient, $subject, $body, $email, $name)) {
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
