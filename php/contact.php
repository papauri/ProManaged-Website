<?php
require_once __DIR__ . '/http.php';
require_once __DIR__ . '/mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    pm_respond(405, false, 'This endpoint only accepts form submissions.');
}

// Honeypot: real visitors never fill this hidden field in. Bots do.
// Report success without sending so the bot does not learn it was caught.
if (!empty($_POST['website'])) {
    pm_respond(200, true, "Thank you for your message. We'll get back to you soon!");
}

$name    = pm_clean_line($_POST['name'] ?? '', 120);
$email   = pm_valid_email($_POST['email'] ?? '');
$phone   = pm_clean_line($_POST['phone'] ?? '', 60);
$message = pm_clean_text($_POST['message'] ?? '', 5000);

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    pm_respond(400, false, 'Please complete the form and provide a valid email address.');
}

// The form each page uses declares what kind of request it is, so the internal
// notification can be triaged without opening it. Unknown values are ignored
// rather than trusted — this string goes into the subject line.
$allowedTypes = [
    'Hardware sourcing'    => 'Hardware request',
    'Software & web apps'  => 'Software enquiry',
    'IT support'           => 'Support request',
    // get-started.html#describe — the general "here is what is going wrong" form.
    // It is not tied to one pillar, so it must not fall through to the default,
    // which would title a broken-laptop enquiry as a website one.
    'Get started'          => 'New project enquiry',
];
$submittedType = pm_clean_line($_POST['enquiry_type'] ?? '', 60);
$enquiryType = $allowedTypes[$submittedType] ?? 'Website enquiry';

// Protects the sending mailbox from being used as a relay by anything that
// skips the honeypot. Fails open if the throttle store is unavailable.
if (pm_throttle_exceeded()) {
    pm_respond(429, false, 'That is a few messages in a short time. Please try again shortly, or email us directly at info@promanaged-it.com.');
}

$recipient = 'info@promanaged-it.com';
$received  = gmdate('j M Y, H:i') . ' UTC';

// --- Internal notification ---------------------------------------------------
$internal = pm_internal_email(
    $enquiryType,
    'New enquiry',
    [
        'Name'  => $name,
        'Email' => $email,
        'Phone' => $phone,
    ],
    [
        'Request type' => $enquiryType,
        'Received'     => $received,
    ],
    'Their message',
    $message,
    'Reply to this enquiry directly — the reply address is already set to the sender.'
);

$sent = sendSiteMail($recipient, "{$enquiryType} — {$name}", $internal, $email, $name);

// --- Customer confirmation ---------------------------------------------------
// Sent only once the internal copy is safely away, so a visitor is never told we
// have their enquiry when it never reached us. A failure here is logged and
// deliberately does not fail the request: we do have the enquiry.
if ($sent) {
    $customer = pm_customer_email(
        'Received',
        'Thanks — we have your message',
        "Hi {$name}, your enquiry has reached us and a person will read it, not a filter.",
        [
            'Your message'     => (mb_strlen($message) > 220 ? mb_substr($message, 0, 220) . '…' : $message),
            'We will reply to' => $email,
            'Received'         => $received,
        ],
        'We will come back to you with honest next steps — including if we think someone else is a better fit. We do not send follow-up sales sequences.',
        'If anything changes in the meantime, or you would rather talk it through, just reply to this email or write to us at'
    );

    if (!sendSiteMail($email, 'We have your enquiry — ProManaged IT', $customer, $recipient, 'ProManaged IT')) {
        error_log('ProManaged mail: enquiry received but customer confirmation failed to send.');
    }

    pm_respond(200, true, "Thank you for your message. We'll get back to you soon!");
}

pm_respond(500, false, 'Sorry, we could not send that just now. Please try again shortly, or email us directly at info@promanaged-it.com.');
