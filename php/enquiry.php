<?php
/* The persona request forms: gaming, property, software, equipment, support.
 *
 * One endpoint for every persona page's form; php/enquiry_catalogue.php is the
 * schema and the only source of any label a person reads. Same transport, same
 * templates, same honeypot and throttle as php/contact.php.
 */
require_once __DIR__ . '/http.php';
require_once __DIR__ . '/mailer.php';
require_once __DIR__ . '/enquiry_catalogue.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    pm_respond(405, false, 'This endpoint only accepts form submissions.');
}

// Honeypot: report success without sending, so the bot learns nothing.
if (!empty($_POST['website'])) {
    pm_respond(200, true, 'Thank you — your request has been received.');
}

$read = pm_enquiry_resolve($_POST['form_type'] ?? '', $_POST);
if (!$read['ok']) {
    pm_respond(400, false, $read['error']);
}

if (pm_throttle_exceeded()) {
    pm_respond(429, false, 'That is a few requests in a short time. Please try again shortly, or email us directly at info@promanaged-it.com.');
}

$form     = $read['form'];
$identity = $read['identity'];
$name     = $identity['Name'];
$email    = $identity['Email'];
$received = gmdate('j M Y, H:i') . ' UTC';
$recipient = 'info@promanaged-it.com';

$details = $read['details'];
$details['Visitor said'] = pm_audience_label($_POST['audience'] ?? '');
$details['Sent from'] = pm_page_label($_POST['page'] ?? '');
$details['Received'] = $received;

// --- Internal notification ---------------------------------------------------
$internal = pm_internal_email(
    $form['title'],
    'New request',
    $identity,
    $details,
    'In their own words',
    $read['message'],
    $form['next']
);

$sent = sendSiteMail($recipient, "{$form['title']} — {$name}", $internal, $email, $name);

// --- Customer confirmation ---------------------------------------------------
// Only once the internal copy is away, so nobody is told we have a request that
// never reached us. A failure here is logged, not surfaced: we do have it.
if ($sent) {
    $summary = [];
    foreach ($read['details'] as $label => $value) {
        if ($value !== '' && count($summary) < 5) {
            $summary[$label] = $value;
        }
    }
    $summary['We will reply to'] = $email;

    $customer = pm_customer_email(
        'Received',
        $form['confirm'],
        "Hi {$name}, thanks for sending this. A person will read it, not a filter.",
        $summary,
        $form['expect'],
        'If anything changes, or you would rather talk it through, just reply to this email or write to us at'
    );

    if (!sendSiteMail($email, $form['confirm'] . ' — ProManaged IT', $customer, $recipient, 'ProManaged IT')) {
        error_log('ProManaged mail: persona request received but customer confirmation failed to send.');
    }

    pm_respond(200, true, $form['success']);
}

pm_respond(500, false, 'Sorry, we could not send that just now. Please try again shortly, or email us directly at info@promanaged-it.com.');
