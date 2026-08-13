<?php
require_once __DIR__ . '/http.php';
require_once __DIR__ . '/mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    pm_respond(405, false, 'This endpoint only accepts form submissions.');
}

// Honeypot: real visitors never fill this hidden field in. Bots do.
// Report success without sending so the bot does not learn it was caught.
if (!empty($_POST['website'])) {
    pm_respond(200, true, 'Thank you — your request has been received.');
}

$name    = pm_clean_line($_POST['name'] ?? '', 120);
$email   = pm_valid_email($_POST['email'] ?? '');
$service = pm_clean_line($_POST['service'] ?? '', 80);
$date    = pm_clean_line($_POST['date'] ?? '', 10);
$time    = pm_clean_line($_POST['time'] ?? '', 5);

if ($name === '' || $email === '' || $service === '' || $date === '' || $time === '') {
    pm_respond(400, false, 'Please complete the form with valid information.');
}

// The service field is a controlled select. Reject anything outside the values
// the public form actually offers instead of silently rewriting attacker input.
$allowedServices = ['Software & Web Apps', 'Network Infrastructure', 'Hardware Sourcing'];
if (!in_array($service, $allowedServices, true)) {
    pm_respond(400, false, 'Please choose a valid service.');
}

// HTML date/time inputs submit ISO date + 24-hour time values. Validate both
// format and calendar validity server-side; do not rely on strtotime() accepting
// whatever string a forged POST happens to contain.
//
// Everything is interpreted in the business's own timezone. Left to the server
// default this would drift with the host's configuration, and "is this slot in
// the past" would be wrong by an hour twice a year.
$zone = new DateTimeZone('Europe/Dublin');

$dateObject = DateTimeImmutable::createFromFormat('!Y-m-d', $date, $zone);
$dateErrors = DateTimeImmutable::getLastErrors();
$dateValid = $dateObject !== false
    && ($dateErrors === false || ($dateErrors['warning_count'] === 0 && $dateErrors['error_count'] === 0))
    && $dateObject->format('Y-m-d') === $date;

$timeObject = DateTimeImmutable::createFromFormat('!H:i', $time, $zone);
$timeErrors = DateTimeImmutable::getLastErrors();
$timeValid = $timeObject !== false
    && ($timeErrors === false || ($timeErrors['warning_count'] === 0 && $timeErrors['error_count'] === 0))
    && $timeObject->format('H:i') === $time;

if (!$dateValid || !$timeValid) {
    pm_respond(400, false, 'Please choose a valid date and time.');
}

// A slot that has already been and gone is not a request anyone can action, and
// nothing previously stopped one being submitted.
$today = new DateTimeImmutable('today', $zone);
if ($dateObject < $today) {
    pm_respond(400, false, 'Please choose a date that has not already passed.');
}
if ($dateObject > $today->modify('+1 year')) {
    pm_respond(400, false, 'Please choose a date within the next year.');
}

// Protects the sending mailbox from being used as a relay by anything that
// skips the honeypot. Fails open if the throttle store is unavailable.
if (pm_throttle_exceeded()) {
    pm_respond(429, false, 'That is a few requests in a short time. Please try again shortly, or email us directly at info@promanaged-it.com.');
}

$slot      = $dateObject->format('l j F Y') . ' at ' . $timeObject->format('H:i');
$recipient = 'info@promanaged-it.com';
$received  = gmdate('j M Y, H:i') . ' UTC';

// --- Internal notification ---------------------------------------------------
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

$sent = sendSiteMail($recipient, "Booking request — {$service} — {$name}", $internal, $email, $name);

// --- Customer confirmation ---------------------------------------------------
// Wording is careful not to imply a confirmed appointment: nothing in this system
// actually confirms one, a person does.
if ($sent) {
    $customer = pm_customer_email(
        'Request received',
        'Your requested time is with us',
        "Hi {$name}, thanks for sending this over. We have your requested time and will come back to confirm it or offer the nearest slot that works.",
        [
            'Service'          => $service,
            'Requested slot'   => $slot,
            'We will reply to' => $email,
        ],
        'Please treat this as a request rather than a confirmed appointment — it is confirmed once we reply. Nothing is charged, and there is no obligation after the call.',
        'If your availability changes, reply to this email or write to us at'
    );

    if (!sendSiteMail($email, 'Your booking request — ProManaged IT', $customer, $recipient, 'ProManaged IT')) {
        error_log('ProManaged mail: booking received but customer confirmation failed to send.');
    }

    pm_respond(200, true, 'Your request has been received. We will confirm the time by email.');
}

pm_respond(500, false, 'Sorry, we could not send that just now. Please try again shortly, or email us directly at info@promanaged-it.com.');
