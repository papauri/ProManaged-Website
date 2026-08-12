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

    // The select only ever submits one of these three. Anything else means the POST
    // did not come from our form, so fall back rather than trust it.
    $allowedServices = ['Software & Web Apps', 'Network Infrastructure', 'Hardware Sourcing'];
    if (!in_array($service, $allowedServices, true)) {
        $service = 'General enquiry';
    }

    $name = mb_substr($name, 0, 120);

    // Present the requested slot readably without inventing information: if the
    // browser sent something unexpected, show exactly what was submitted.
    $slot = $date . ' at ' . $time;
    $stamp = strtotime($date . ' ' . $time);
    if ($stamp !== false) {
        $slot = date('l j F Y', $stamp) . ' at ' . date('H:i', $stamp);
    }

    $recipient = "info@promanaged-it.com";
    $received = gmdate('j M Y, H:i') . ' UTC';

    // --- Internal notification -------------------------------------------------
    $internal = pm_internal_email(
        'Booking request',
        'Action needed',
        [
            'Name'  => $name,
            'Email' => $email,
        ],
        [
            'Service'        => $service,
            'Requested slot' => $slot,
            'Submitted'      => $received,
        ],
        'Notes',
        '',
        'Confirm or propose the nearest alternative slot. This request is not yet a confirmed appointment.'
    );

    $internalSubject = "Booking request — {$service} — {$name}";
    $sent = sendSiteMail($recipient, $internalSubject, $internal, $email, $name);

    // --- Customer confirmation -------------------------------------------------
    // Wording is careful not to imply a confirmed appointment: nothing in this system
    // actually confirms one, a person does.
    if ($sent) {
        $customer = pm_customer_email(
            'Request received',
            'Your requested time is with us',
            "Hi {$name}, thanks for sending this over. We have your requested time and will come back to confirm it or offer the nearest slot that works.",
            [
                'Service'        => $service,
                'Requested slot' => $slot,
                'We will reply to' => $email,
            ],
            'Please treat this as a request rather than a confirmed appointment — it is confirmed once we reply. Nothing is charged, and there is no obligation after the call.',
            'If your availability changes, reply to this email or write to us at'
        );

        sendSiteMail($email, 'Your booking request — ProManaged IT', $customer, $recipient, 'ProManaged IT');
    }

    if ($sent) {
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
