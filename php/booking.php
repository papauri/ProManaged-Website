<?php
// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form fields
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $service = strip_tags(trim($_POST["service"]));
    $date = strip_tags(trim($_POST["date"]));
    $time = strip_tags(trim($_POST["time"]));

    // Check for required fields
    if (empty($name) || empty($email) || empty($service) || empty($date) || empty($time) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please complete the form with valid information.";
        http_response_code(400);
        exit;
    }

    // Your email address
    $recipient = "johnpaulchirwa@promanaged-it.com"; // Replace with your email address

    // Email subject
    $subject = "New Appointment Booking from $name";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Service: $service\n";
    $email_content .= "Date: $date\n";
    $email_content .= "Time: $time\n";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
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
?>
