<?php
/* website.php — the Website Builder enquiry endpoint.
 *
 * A dedicated endpoint rather than a reuse of contact.php: the payload is a
 * structured configuration, not a message, and the internal notification has to
 * present it as a discovery brief. Everything underneath is unchanged — the same
 * http.php sanitisers, the same pm_internal_email/pm_customer_email templates and
 * the same PHPMailer transport as the site's other forms.
 *
 * TRUST MODEL
 * The browser submits catalogue IDs only. Every label a human ever reads is
 * resolved from php/website_catalogue.php, so a forged POST cannot invent a
 * capability and have it arrive in an inbox looking like something ProManaged
 * offers. Anything outside the catalogue is discarded silently rather than echoed.
 */

require_once __DIR__ . '/http.php';
require_once __DIR__ . '/mailer.php';
// The catalogue and the pure resolution helpers. Separate so they can be tested
// without this file running — see tests/website_endpoint.test.php.
require_once __DIR__ . '/website_catalogue.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    pm_respond(405, false, 'This endpoint only accepts form submissions.');
}

// Honeypot: real visitors never fill this hidden field in. Bots do.
// Report success without sending so the bot does not learn it was caught.
// The field is named "website" like every other form here — js/form_intake.js
// excludes that exact name from validation, so it must not be renamed even
// though this page is itself about websites.
if (!empty($_POST['website'])) {
    pm_respond(200, true, 'Thank you — we have your website outline.');
}

$purposeCatalogue   = pm_wb_purposes();
$situationCatalogue = pm_wb_situations();
$coreCatalogue      = pm_wb_core();
$optionalCatalogue  = pm_wb_optional();

/* ---------------------------------------------------------------------------
 * Contact details.
 * ------------------------------------------------------------------------ */

$name     = pm_clean_line($_POST['name'] ?? '', 120);
$email    = pm_valid_email($_POST['email'] ?? '');
$business = pm_clean_line($_POST['business'] ?? '', 160);
$phone    = pm_clean_line($_POST['phone'] ?? '', 60);
$notes    = pm_clean_text($_POST['notes'] ?? '', 3000);

if ($name === '' || $email === '' || $business === '') {
    pm_respond(400, false, 'Please give us your name, your business name and a valid email address.');
}

/* ---------------------------------------------------------------------------
 * The configuration.
 * ------------------------------------------------------------------------ */

$purposeId = pm_clean_line($_POST['purpose'] ?? '', 40);
$purpose   = isset($purposeCatalogue[$purposeId]) ? $purposeCatalogue[$purposeId] : '';

$pagesText = pm_wb_pages($_POST['pages'] ?? '');

$situations = pm_wb_resolve($_POST['current_situation'] ?? '', $situationCatalogue, 6);

// Core is fixed in the product, so it is NOT read from the submission — every
// site we build includes it regardless of what a POST claims.
$core = $coreCatalogue;

$optionalRaw = pm_wb_resolve(
    $_POST['optional_features'] ?? '',
    $optionalCatalogue,
    count($optionalCatalogue)
);

$optionalLines = [];
foreach ($optionalRaw as $id => $entry) {
    $optionalLines[] = $entry[0] . ' (' . $entry[1] . ')';
}

/* The relationships the visitor assembled. Rendered only from IDs both sides of
   which are in the catalogue. */
$connectionLines = pm_wb_connections(
    $_POST['connections'] ?? '',
    $optionalCatalogue,
    $coreCatalogue
);

$must = pm_clean_text($_POST['must_do'] ?? '', 1200);

// Protects the sending mailbox from being used as a relay by anything that
// skips the honeypot. Fails open if the throttle store is unavailable.
if (pm_throttle_exceeded()) {
    pm_respond(429, false, 'That is a few submissions in a short time. Please try again shortly, or email us directly at info@promanaged-it.com.');
}

$recipient = 'info@promanaged-it.com';
$received  = gmdate('j M Y, H:i') . ' UTC';

/* ---------------------------------------------------------------------------
 * Internal notification — the discovery brief.
 *
 * Everything below passes through pm_esc() inside the template helpers, so
 * submitted text can never become live HTML in a mailbox.
 * ------------------------------------------------------------------------ */

$details = [
    'Mainly for'     => $purpose !== '' ? $purpose : 'Not stated',
    'Approx. pages'  => $pagesText,
    'Right now'      => $situations ? implode(', ', $situations) : 'Not stated',
    'Always included' => implode(', ', $core),
    // pm_row() renders a single escaped cell, so these join with a separator
    // rather than newlines — a "\n" would collapse to a space in the HTML mail.
    'Added'          => $optionalLines ? implode(' · ', $optionalLines) : 'None — the basics only',
    'Connections'    => $connectionLines ? implode(' · ', $connectionLines) : 'None beyond the basics',
    'Submitted'      => $received,
];

/* The visitor's own words come last and are kept whole — the most useful part of
   the brief. */
$messageBody = '';
if ($must !== '') {
    $messageBody .= "What it must do (their words):\n" . $must . "\n\n";
}
if ($notes !== '') {
    $messageBody .= "Notes:\n" . $notes;
}
$messageBody = trim($messageBody);

$internal = pm_internal_email(
    'Website outline',
    'Qualified enquiry',
    [
        'Name'     => $name,
        'Email'    => $email,
        'Business' => $business,
        'Phone'    => $phone,
    ],
    $details,
    'In their own words',
    $messageBody,
    'This is a configuration the visitor built, not a scope we have agreed. Confirm what the site actually needs to do before proposing anything.'
);

$sent = sendSiteMail($recipient, "Website outline — {$business} — {$name}", $internal, $email, $name);

/* ---------------------------------------------------------------------------
 * Customer confirmation.
 *
 * Careful wording: their configuration is a starting point, and nothing here may
 * imply a fixed price or scope. No internal IDs, no implementation notes.
 * ------------------------------------------------------------------------ */
if ($sent) {
    $summary = [
        'Business'        => $business . ($purpose !== '' ? ' — ' . $purpose : ''),
        'Approx. pages'   => $pagesText,
        'Always included' => implode(', ', $core),
        'You added'       => $optionalRaw
            ? implode(', ', array_map(function ($entry) { return $entry[0]; }, $optionalRaw))
            : 'The basics only',
        'Received'        => $received,
    ];

    $customer = pm_customer_email(
        'Outline received',
        'We have your website outline',
        "Hi {$name}, thanks for taking the time to put this together. We will read it properly and come back with what we would actually build for {$business}, and what it would take.",
        $summary,
        'Treat this as a starting point rather than a quote. Most of what you selected is work we have done before; anything marked as custom we would scope with you first. We will be straight with you about which is which, and about anything we think is not worth building.',
        'If anything changes, or you would rather talk it through, just reply to this email or write to us at'
    );

    if (!sendSiteMail($email, 'Your website outline — ProManaged IT', $customer, $recipient, 'ProManaged IT')) {
        error_log('ProManaged mail: website outline received but customer confirmation failed to send.');
    }

    pm_respond(200, true, 'Thank you — your website outline is with us. We will come back to you with what we would build.');
}

pm_respond(500, false, 'Sorry, we could not send that just now. Please try again shortly, or email us directly at info@promanaged-it.com.');
