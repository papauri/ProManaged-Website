<?php
/* Guards for the persona request forms' trust boundary (php/enquiry.php).
 *
 *   php tests/enquiry_endpoint.test.php
 *
 * The forms send option KEYS and the server resolves every label a person reads,
 * so a forged POST must not be able to put invented words into the inbox. These
 * call the real functions in php/enquiry_catalogue.php; nothing here touches the
 * request, the mail layer or the network.
 */

require_once __DIR__ . '/../php/enquiry_catalogue.php';

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

$base = ['name' => 'Ada Gamer', 'email' => 'ada@example.com', 'phone' => '+1 555 0100'];
$gaming = $base + [
    'platform' => 'pc', 'gear' => ['pc', 'monitor'], 'budget' => 'around 1500',
    'destination' => 'Lilongwe, Malawi', 'needed_by' => 'month', 'setup' => 'yes',
    'message' => 'A 1440p rig for competitive shooters.',
];

/* ---------- Every form in the schema is well formed ---------- */
foreach (pm_enquiry_forms() as $type => $form) {
    $ok = isset($form['title'], $form['confirm'], $form['next'], $form['expect'], $form['success'], $form['fields']['message'])
        && $form['fields']['message']['type'] === 'text' && !empty($form['fields']['message']['required']);
    check("$type: complete schema with a required free-text message", $ok, true);
    foreach ($form['fields'] as $key => $field) {
        $valid = in_array($field['type'], ['line', 'text', 'choice', 'multi'], true)
            && (in_array($field['type'], ['choice', 'multi'], true) ? !empty($field['options']) : isset($field['max']));
        check("$type.$key: valid field definition", $valid, true);
    }
}

/* ---------- Happy path ---------- */
$r = pm_enquiry_resolve('gaming', $gaming);
check('a complete gaming request resolves', $r['ok'], true);
check('choice keys resolve to server labels', $r['details']['Platform'], 'Gaming PC');
check('multi keys resolve to labels in catalogue order', $r['details']['Looking for'], 'A gaming PC (prebuilt or custom), A monitor');
check('free text is kept as the message', $r['message'], 'A 1440p rig for competitive shooters.');
check('identity is cleaned and kept', $r['identity']['Email'], 'ada@example.com');

/* ---------- Hostile input ---------- */
check('an unknown form type is refused', pm_enquiry_resolve('admin', $gaming)['ok'], false);
check('an array form type is refused', pm_enquiry_resolve(['gaming'], $gaming)['ok'], false);

$forged = $gaming;
$forged['platform'] = 'Free PS5 for everyone';
$r = pm_enquiry_resolve('gaming', $forged);
check('an invented choice is not echoed (required choice -> refused)', $r['ok'], false);

$forged = $gaming;
$forged['needed_by'] = '<script>alert(1)</script>';
$r = pm_enquiry_resolve('gaming', $forged);
check('an invented optional choice resolves to nothing', $r['details']['Needed by'], '');

$forged = $gaming;
$forged['gear'] = ['pc', 'pc', 'pc', 'a yacht', ['nested'], 'monitor'];
$r = pm_enquiry_resolve('gaming', $forged);
check('multi drops duplicates, unknown keys and nested values', $r['details']['Looking for'], 'A gaming PC (prebuilt or custom), A monitor');

$forged = $gaming;
$forged['gear'] = array_fill(0, 5000, 'pc');
$r = pm_enquiry_resolve('gaming', $forged);
check('a repetition flood still resolves to one label', $r['details']['Looking for'], 'A gaming PC (prebuilt or custom)');

$forged = $gaming;
$forged['gear'] = 'pc,console';
$r = pm_enquiry_resolve('gaming', $forged);
check('a comma list is accepted for multi', $r['details']['Looking for'], 'A gaming PC (prebuilt or custom), A console');

$forged = $gaming;
$forged['destination'] = ['Lilongwe'];
check('an array where text belongs counts as missing', pm_enquiry_resolve('gaming', $forged)['ok'], false);

$forged = $gaming;
$forged['email'] = "ada@example.com\r\nBcc: victim@example.com";
check('a header-injection email is refused', pm_enquiry_resolve('gaming', $forged)['ok'], false);

$forged = $gaming;
$forged['budget'] = str_repeat('9', 500);
check('a line field is capped', mb_strlen(pm_enquiry_resolve('gaming', $forged)['details']['Rough budget']), 80);

$forged = $gaming;
$forged['message'] = "line one\x00\x07\n\n\n\n\nline two";
check('control characters and blank-line floods are cleaned', pm_enquiry_resolve('gaming', $forged)['message'], "line one \n\nline two");

$forged = $gaming;
$forged['Platform'] = 'pc';
$forged['injected_label'] = 'Approved by ProManaged';
$r = pm_enquiry_resolve('gaming', $forged);
check('fields outside the schema never reach the notification', array_key_exists('injected_label', $r['details']) || in_array('Approved by ProManaged', $r['details'], true), false);

/* ---------- Required fields per form ---------- */
foreach (pm_enquiry_forms() as $type => $form) {
    $r = pm_enquiry_resolve($type, $base);
    check("$type: an empty request is refused with a reason", $r['ok'] === false && strpos($r['error'], 'Please add') === 0, true);
}
check('missing fields are named in the reason',
    pm_enquiry_resolve('support', $base + ['message' => 'x'])['error'],
    'Please add device, closest to.');

echo "\n" . ($failures ? "FAILURES: $failures\n" : "ALL PASS\n");
exit($failures ? 1 : 0);
