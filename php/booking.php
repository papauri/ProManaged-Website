<?php
require_once __DIR__ . '/mailer.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Honeypot: real visitors never fill this hidden field in. Bots do.
    // Pretend success without sending so the bot doesn't learn it was caught.
    if (!empty($_POST["website"])) {
        http_response_code(200);
        echo "Your appointment has been booked successfully!";
        exit;
    }

    $name = strip_tags(trim($_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $service = strip_tags(trim($_POST["service"] ?? ""));
    $date = strip_tags(trim($_POST["date"] ?? ""));
    $time = strip_tags(trim($_POST["time"] ?? ""));

    if (empty($name) || empty($email) || empty($service) || empty($date) || empty($time) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please complete the form with valid information.";
        http_response_code(400);
        exit;
    }

    $recipient = "info@promanaged-it.com";
    $subject = "New Appointment Booking from $name";
    $body = "Name: $name\nEmail: $email\nService: $service\nDate: $date\nTime: $time\n";

    if (sendSiteMail($recipient, $subject, $body, $email, $name)) {
        echo "Your appointment has been booked successfully!";
        http_response_code(200);
    } else {
        echo "Sorry, something went wrong. Please try again later.";
        http_response_code(500);
    }
} else {
    echo "Invalid request method.";
    http_response_code(403);
}
