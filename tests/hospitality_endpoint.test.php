<?php
/* Guards for the Hospitality System Builder endpoint's trust boundary.
 *
 *   php tests/hospitality_endpoint.test.php
 *
 * The builder submits catalogue IDs and the server resolves every label a human
 * reads. That is the whole defence against a forged POST putting an invented
 * capability into ProManaged's inbox dressed as something we offer, so it is
 * tested against hostile input rather than only happy paths.
 *
 * These call the REAL functions from php/hospitality_catalogue.php. Nothing here
 * touches the request, the mail layer or the network.
 */

require_once __DIR__ . '/../php/hospitality_catalogue.php';

$failures = 0;

function check($label, $got, $want) {
    global $failures;
    $ok = $got === $want;
    if (!$ok) {
        $failures++;
    }
    echo ($ok ? 'PASS  ' : 'FAIL  ') . $label . "\n";
    if (!$ok) {
        echo "        got:  " . str_replace("\n", ' ', var_export($got, true)) . "\n";
        echo "        want: " . str_replace("\n", ' ', var_export($want, true)) . "\n";
    }
}

$optional = pm_hb_optional();
$core     = pm_hb_core();
$channels = pm_hb_channels();
$types    = pm_hb_property_types();

/* ---------- Allow-listing ---------- */

check('a valid selection resolves to its labels',
    array_keys(pm_hb_resolve('housekeeping,payments', $optional, 9)),
    ['housekeeping', 'payments']);

check('submission order is preserved',
    array_keys(pm_hb_resolve('payments,housekeeping', $optional, 9)),
    ['payments', 'housekeeping']);

check('an invented capability is discarded',
    array_keys(pm_hb_resolve('housekeeping,FREE_LIFETIME_SAAS,payments', $optional, 9)),
    ['housekeeping', 'payments']);

check('a markup payload cannot become a label',
    pm_hb_resolve('<script>alert(1)</script>', $optional, 9), []);

check('a near-miss id is not accepted',
    pm_hb_resolve('Housekeeping', $optional, 9), []);

check('duplicates collapse instead of repeating in the brief',
    array_keys(pm_hb_resolve('payments,payments,payments', $optional, 9)), ['payments']);

// The allow-list alone would not stop this: every id here is valid.
check('the cap holds against a flood of VALID ids',
    count(pm_hb_resolve(str_repeat('website,housekeeping,payments,staff,restaurant,', 400), $optional, 3)), 3);

check('channels resolve and drop the unknown',
    array_values(pm_hb_resolve('whatsapp,phone,bogus', $channels, 8)), ['WhatsApp', 'Phone']);

check('an empty submission yields nothing', pm_hb_resolve('', $optional, 9), []);
check('a separator-only submission yields nothing', pm_hb_resolve(',,,', $optional, 9), []);

/* ---------- Relationship rendering ---------- */

check('a real relationship renders both sides',
    pm_hb_connections('housekeeping>rooms+staff', $optional, $core),
    ['Housekeeping → Rooms, Staff accounts']);

check('a relationship from an unknown module is dropped',
    pm_hb_connections('mainframe>rooms', $optional, $core), []);

check('an unknown target is dropped but the rest survives',
    pm_hb_connections('housekeeping>rooms+nonsense', $optional, $core),
    ['Housekeeping → Rooms']);

check('a relationship with no valid target produces no line',
    pm_hb_connections('housekeeping>nonsense', $optional, $core), []);

check('malformed segments produce nothing',
    pm_hb_connections('housekeeping;>rooms;;', $optional, $core), []);

check('a malformed segment does not take a valid one down with it',
    pm_hb_connections('garbage;payments>bookings', $optional, $core),
    ['Payments → Bookings']);

check('a core capability can be the target of a relationship',
    pm_hb_connections('guest-comms>guests+bookings', $optional, $core),
    ['Guest messages → Guests, Bookings']);

/* ---------- Room clamping ---------- */

foreach ([
    ['18', '18'], ['1', '1'], ['400', '400'],
    ['0', 'Not stated'], ['-5', 'Not stated'], ['401', 'Not stated'],
    ['abc', 'Not stated'], ['', 'Not stated'], ['12.9', '12'],
] as $case) {
    check('rooms "' . $case[0] . '" clamps to ' . $case[1], pm_hb_rooms($case[0]), $case[1]);
}

/* ---------- The honesty contract ----------
   Only capabilities ProManaged has genuinely delivered may be described to a
   reader as built. See .claude/PROJECT_CREDIBILITY.md. */

$mayClaimBuilt = ['website'];
foreach ($optional as $id => $entry) {
    check('"' . $id . '" carries a permitted delivery status',
        in_array($entry[1], ['Built before', 'Proposed module', 'Custom development'], true), true);
    if ($entry[1] === 'Built before') {
        check('"' . $id . '" is allowed to claim delivered work',
            in_array($id, $mayClaimBuilt, true), true);
    }
}

check('the foundation is exactly the three delivered capabilities',
    array_keys($core), ['bookings', 'rooms', 'guests']);

check('every property type has a label',
    count(array_filter($types, function ($l) { return trim($l) !== ''; })), count($types));

echo $failures === 0
    ? "\nALL PASS\n"
    : "\n{$failures} FAILURE(S)\n";
exit($failures === 0 ? 0 : 1);
