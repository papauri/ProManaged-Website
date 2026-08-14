<?php
/* Guards for the Website Builder endpoint's trust boundary.
 *
 *   php tests/website_endpoint.test.php
 *
 * The builder submits catalogue IDs and the server resolves every label a human
 * reads. That is the whole defence against a forged POST putting an invented
 * capability into ProManaged's inbox dressed as something we offer, so it is
 * tested against hostile input rather than only happy paths.
 *
 * These call the REAL functions from php/website_catalogue.php. Nothing here
 * touches the request, the mail layer or the network.
 */

require_once __DIR__ . '/../php/website_catalogue.php';

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

$optional   = pm_wb_optional();
$core       = pm_wb_core();
$situations = pm_wb_situations();
$purposes   = pm_wb_purposes();

/* ---------- Allow-listing ---------- */

check('a valid selection resolves to its labels',
    array_keys(pm_wb_resolve('gallery,bookings', $optional, 7)),
    ['gallery', 'bookings']);

check('submission order is preserved',
    array_keys(pm_wb_resolve('bookings,gallery', $optional, 7)),
    ['bookings', 'gallery']);

check('an invented capability is discarded',
    array_keys(pm_wb_resolve('gallery,FREE_UNLIMITED_EVERYTHING,bookings', $optional, 7)),
    ['gallery', 'bookings']);

check('a markup payload cannot become a label',
    pm_wb_resolve('<script>alert(1)</script>', $optional, 7), []);

check('a near-miss id is not accepted',
    pm_wb_resolve('Gallery', $optional, 7), []);

check('duplicates collapse instead of repeating in the brief',
    array_keys(pm_wb_resolve('seo,seo,seo', $optional, 7)), ['seo']);

// The allow-list alone would not stop this: every id here is valid.
check('the cap holds against a flood of VALID ids',
    count(pm_wb_resolve(str_repeat('seo,gallery,updates,bookings,selfedit,', 400), $optional, 3)), 3);

check('situations resolve and drop the unknown',
    array_values(pm_wb_resolve('nothing,social,bogus', $situations, 6)),
    ['Nothing yet', 'Social pages only']);

check('an empty submission yields nothing', pm_wb_resolve('', $optional, 7), []);
check('a separator-only submission yields nothing', pm_wb_resolve(',,,', $optional, 7), []);

/* ---------- Relationship rendering ---------- */

check('a real relationship renders both sides',
    pm_wb_connections('gallery>pages+selfedit', $optional, $core),
    ['Photo gallery → Pages & content, Edit it yourself']);

check('a relationship from an unknown module is dropped',
    pm_wb_connections('mainframe>pages', $optional, $core), []);

check('an unknown target is dropped but the rest survives',
    pm_wb_connections('gallery>pages+nonsense', $optional, $core),
    ['Photo gallery → Pages & content']);

check('a relationship with no valid target produces no line',
    pm_wb_connections('gallery>nonsense', $optional, $core), []);

check('malformed segments produce nothing',
    pm_wb_connections('gallery;>pages;;', $optional, $core), []);

check('a malformed segment does not take a valid one down with it',
    pm_wb_connections('garbage;bookings>enquiry', $optional, $core),
    ['Bookings & enquiries → A way to reach you']);

/* ---------- Page clamping ---------- */

foreach ([
    ['6', '6'], ['1', '1'], ['200', '200'],
    ['0', 'Not stated'], ['-5', 'Not stated'], ['201', 'Not stated'],
    ['abc', 'Not stated'], ['', 'Not stated'], ['8.7', '8'],
] as $case) {
    check('pages "' . $case[0] . '" clamps to ' . $case[1], pm_wb_pages($case[0]), $case[1]);
}

/* ---------- The honesty contract ----------
   This catalogue has no "proposed" tier by design, and only capabilities verified
   against delivered work may be described as built. See .claude/WEBSITE_BUILDER.md §7. */

$mayClaimBuilt = ['seo', 'gallery', 'updates', 'bookings', 'selfedit', 'multisite'];
foreach ($optional as $id => $entry) {
    check('"' . $id . '" carries a permitted delivery status',
        in_array($entry[1], ['Built before', 'Custom development'], true), true);
    if ($entry[1] === 'Built before') {
        check('"' . $id . '" is allowed to claim delivered work',
            in_array($id, $mayClaimBuilt, true), true);
    }
}

check('the always-included set is exactly the four basics',
    array_keys($core), ['pages', 'mobile', 'enquiry', 'hosting']);

check('every purpose has a label',
    count(array_filter($purposes, function ($l) { return trim($l) !== ''; })), count($purposes));

echo $failures === 0 ? "\nALL PASS\n" : "\n{$failures} FAILURE(S)\n";
exit($failures === 0 ? 0 : 1);
