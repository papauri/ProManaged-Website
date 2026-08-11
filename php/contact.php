<?php
// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form fields
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    // Check for required fields
    if (empty($name) || empty($email) || empty($phone) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please complete the form and provide a valid email address.";
        http_response_code(400);
        exit;
    }

    // Your email address
    $recipient = "johnpaulchirwa@promanaged-it.com"; // Replace with your email address

    // Email subject
    $subject = "Contact Form Submission from $name";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
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
?>
