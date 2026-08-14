<?php
/* hospitality.php — the Hospitality System Builder enquiry endpoint.
 *
 * A dedicated endpoint rather than a reuse of contact.php: the payload is a
 * structured configuration, not a message, and the internal notification has to
 * present it as a discovery brief. Everything underneath is unchanged — the same
 * http.php sanitisers, the same pm_internal_email/pm_customer_email templates and
 * the same PHPMailer transport as the other two forms.
 *
 * TRUST MODEL
 * The browser submits catalogue IDs only. Every label a human ever reads is
 * resolved from the tables below, so a forged POST cannot invent a capability and
 * have it arrive in an inbox looking like something ProManaged offers. Anything
 * outside the catalogue is discarded silently rather than echoed.
 */

require_once __DIR__ . '/http.php';
require_once __DIR__ . '/mailer.php';
// The catalogue and the pure resolution helpers. Separate so they can be tested
// without this file running — see tests/hospitality_endpoint.test.php.
require_once __DIR__ . '/hospitality_catalogue.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    pm_respond(405, false, 'This endpoint only accepts form submissions.');
}

// Honeypot: real visitors never fill this hidden field in. Bots do.
// Report success without sending so the bot does not learn it was caught.
if (!empty($_POST['website'])) {
    pm_respond(200, true, 'Thank you — we have your hospitality system outline.');
}

$propertyTypeCatalogue = pm_hb_property_types();
$channelCatalogue      = pm_hb_channels();
$coreCatalogue         = pm_hb_core();
$optionalCatalogue     = pm_hb_optional();

/* ---------------------------------------------------------------------------
 * Contact details.
 * ------------------------------------------------------------------------ */

$name     = pm_clean_line($_POST['name'] ?? '', 120);
$email    = pm_valid_email($_POST['email'] ?? '');
$business = pm_clean_line($_POST['business'] ?? '', 160);
$phone    = pm_clean_line($_POST['phone'] ?? '', 60);
$notes    = pm_clean_text($_POST['notes'] ?? '', 3000);

if ($name === '' || $email === '' || $business === '') {
    pm_respond(400, false, 'Please give us your name, your property name and a valid email address.');
}

/* ---------------------------------------------------------------------------
 * The configuration.
 * ------------------------------------------------------------------------ */

$propertyTypeId = pm_clean_line($_POST['property_type'] ?? '', 40);
$propertyType   = isset($propertyTypeCatalogue[$propertyTypeId]) ? $propertyTypeCatalogue[$propertyTypeId] : '';

// The builder clamps client-side; the server clamps again rather than trusting
// it, and treats an unusable value as "not stated".
$roomsText = pm_hb_rooms($_POST['rooms'] ?? '');

$channels = pm_hb_resolve($_POST['channels'] ?? '', $channelCatalogue, 8);

// Core is fixed in the product, so it is NOT read from the submission — the
// foundation is what it is regardless of what a POST claims.
$core = $coreCatalogue;

$optionalRaw = pm_hb_resolve(
    $_POST['optional_features'] ?? '',
    $optionalCatalogue,
    count($optionalCatalogue)
);

$optionalLines = [];
foreach ($optionalRaw as $id => $entry) {
    $optionalLines[] = $entry[0] . ' (' . $entry[1] . ')';
}

/* The relationships the visitor assembled. Rendered only from IDs both sides of
   which are in the catalogue, so the brief cannot be made to describe a
   connection between things that do not exist. */
$connectionLines = pm_hb_connections(
    $_POST['connections'] ?? '',
    $optionalCatalogue,
    $coreCatalogue
);

$problem = pm_clean_text($_POST['current_problem'] ?? '', 1200);

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
 * The whole commercial point of the builder: this arrives as a qualified brief
 * rather than "please contact me". Everything below goes through pm_esc() inside
 * the template helpers, so submitted text can never become live HTML in a
 * mailbox.
 * ------------------------------------------------------------------------ */

$details = [
    'Property type'    => $propertyType !== '' ? $propertyType : 'Not stated',
    'Approx. rooms'    => $roomsText,
    'Bookings arrive by' => $channels ? implode(', ', $channels) : 'Not stated',
    'Foundation'       => implode(', ', $core),
    // pm_row() renders a single escaped cell, so these are joined with a separator
    // rather than newlines — a "\n" would simply collapse to a space in the HTML
    // mail and run the entries together.
    'Added modules'    => $optionalLines ? implode(' · ', $optionalLines) : 'None — foundation only',
    'Connections'      => $connectionLines ? implode(' · ', $connectionLines) : 'None beyond the foundation',
    'Submitted'        => $received,
];

/* The visitor's own words come last and are kept whole — they are the most
   useful part of the brief and must not be summarised away. */
$messageBody = '';
if ($problem !== '') {
    $messageBody .= "What keeps going wrong (their words):\n" . $problem . "\n\n";
}
if ($notes !== '') {
    $messageBody .= "Notes:\n" . $notes;
}
$messageBody = trim($messageBody);

$internal = pm_internal_email(
    'Hospitality system outline',
    'Qualified enquiry',
    [
        'Name'     => $name,
        'Email'    => $email,
        'Property' => $business,
        'Phone'    => $phone,
    ],
    $details,
    'In their own words',
    $messageBody,
    'This is a configuration the visitor built, not a scope we have agreed. Review how the property actually operates before proposing an implementation.'
);

$sent = sendSiteMail($recipient, "Hospitality outline — {$business} — {$name}", $internal, $email, $name);

/* ---------------------------------------------------------------------------
 * Customer confirmation.
 *
 * Careful wording: their configuration is a starting point, and nothing here may
 * imply the selected modules are standard SaaS features they can switch on. The
 * summary deliberately carries no internal IDs and no implementation notes.
 * ------------------------------------------------------------------------ */
if ($sent) {
    $summary = [
        'Property'        => $business . ($propertyType !== '' ? ' — ' . $propertyType : ''),
        'Approx. rooms'   => $roomsText,
        'Your foundation' => implode(', ', $core),
        'Your additions'  => $optionalRaw
            ? implode(', ', array_map(function ($entry) { return $entry[0]; }, $optionalRaw))
            : 'Foundation only',
        'Received'        => $received,
    ];

    $customer = pm_customer_email(
        'Outline received',
        'We have your hospitality system outline',
        "Hi {$name}, thanks for taking the time to design this. We will review the way {$business} actually operates and use your configuration as the starting point for the conversation.",
        $summary,
        'Treat this as a starting point rather than a quote or a fixed scope. Some of what you selected we have built before; some is proposed or would be built specifically for your property — we will be straight with you about which is which, and about anything we think is not worth building.',
        'If anything changes, or you would rather talk it through, just reply to this email or write to us at'
    );

    if (!sendSiteMail($email, 'Your hospitality system outline — ProManaged IT', $customer, $recipient, 'ProManaged IT')) {
        error_log('ProManaged mail: hospitality outline received but customer confirmation failed to send.');
    }

    pm_respond(200, true, 'Thank you — your hospitality system outline is with us. We will come back to you with what we would build.');
}

pm_respond(500, false, 'Sorry, we could not send that just now. Please try again shortly, or email us directly at info@promanaged-it.com.');
