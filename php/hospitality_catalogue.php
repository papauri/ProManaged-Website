<?php
/* hospitality_catalogue.php — the server's own copy of the Hospitality System
 * Builder catalogue, plus the pure functions that resolve a submission against it.
 *
 * WHY THIS IS SEPARATE FROM hospitality.php
 * The endpoint runs on include: it inspects the request method and calls
 * pm_respond(), which exits. Nothing in it could be exercised by a test without
 * also sending mail. Everything here is pure — no request, no state, no I/O — so
 * tests/hospitality_endpoint.test.php can import the REAL logic instead of a copy
 * of it that would need its own maintenance.
 *
 * WHY THE CATALOGUE IS DUPLICATED FROM js/hospitality_builder.js
 * Deliberately. The browser submits catalogue IDs and never labels; every label a
 * human reads is resolved here, so a forged POST cannot invent a capability and
 * have it arrive in an inbox looking like something ProManaged offers. That safety
 * property depends on the server holding its own list rather than trusting one.
 * The duplication is guarded against drift by tests/hospitality_builder.test.js,
 * which compares both files.
 *
 * Requires http.php for pm_clean_line().
 */

require_once __DIR__ . '/http.php';

/** Property types offered by the builder. id => customer-facing label. */
function pm_hb_property_types() {
    return [
        'lodge'          => 'Lodge',
        'guesthouse'     => 'Guesthouse',
        'boutique-hotel' => 'Boutique hotel',
        'hotel'          => 'Hotel',
        'resort'         => 'Resort',
        'multiple'       => 'Multiple properties',
        'other'          => 'Something else',
    ];
}

/** How bookings currently reach the property. */
function pm_hb_channels() {
    return [
        'website'   => 'Own website',
        'whatsapp'  => 'WhatsApp',
        'phone'     => 'Phone',
        'platforms' => 'Booking platforms',
        'walk-ins'  => 'Walk-ins',
        'other'     => 'Something else',
    ];
}

/** The fixed foundation. Never read from a submission — it is what it is. */
function pm_hb_core() {
    return [
        'bookings' => 'Bookings',
        'rooms'    => 'Rooms',
        'guests'   => 'Guests',
    ];
}

/**
 * Optional modules, as label => delivery status.
 *
 * The status is the honesty contract from .claude/HOSPITALITY_SYSTEM_BUILDER.md
 * §7: the brief must say plainly which of these ProManaged has actually built and
 * which are still proposed or bespoke, so nobody reads the enquiry as an order for
 * shipping product.
 */
function pm_hb_optional() {
    return [
        'website'        => ['Website + booking engine', 'Built before'],
        'housekeeping'   => ['Housekeeping', 'Proposed module'],
        'payments'       => ['Payments', 'Proposed module'],
        'guest-comms'    => ['Guest messages', 'Proposed module'],
        'reporting'      => ['Reporting', 'Proposed module'],
        'staff'          => ['Staff accounts', 'Proposed module'],
        'multi-property' => ['Multiple properties', 'Proposed module'],
        'restaurant'     => ['Restaurant / POS', 'Custom development'],
        'integrations'   => ['Custom integrations', 'Custom development'],
    ];
}

/**
 * Resolve a comma-separated list of submitted IDs against an allow-list.
 *
 * Unknown IDs are dropped, submission order is preserved and duplicates collapse.
 * The cap exists so a forged POST cannot make the endpoint build an enormous
 * string out of thousands of repeated VALID ids — the allow-list alone would not
 * stop that.
 */
function pm_hb_resolve($raw, array $allowed, $limit = 24) {
    $ids = array_filter(array_map('trim', explode(',', pm_clean_line($raw, 600))));
    $out = [];
    foreach ($ids as $id) {
        if (count($out) >= $limit) {
            break;
        }
        if (isset($allowed[$id]) && !isset($out[$id])) {
            $out[$id] = $allowed[$id];
        }
    }
    return $out;
}

/**
 * Render the relationships the visitor assembled, submitted as "module>dep+dep;…".
 *
 * Both sides of every relationship must be in the catalogue, so the brief can
 * never be made to describe a connection between things that do not exist. A
 * malformed segment is skipped without taking a well-formed one down with it.
 *
 * Returns a list of human-readable lines.
 */
function pm_hb_connections($raw, array $optional, array $core) {
    $lines = [];
    $raw = pm_clean_line($raw, 800);
    foreach (array_slice(array_filter(explode(';', $raw)), 0, 24) as $pair) {
        $parts = explode('>', $pair, 2);
        if (count($parts) !== 2) {
            continue;
        }
        $fromId = trim($parts[0]);
        if (!isset($optional[$fromId])) {
            continue;
        }
        $targets = [];
        foreach (array_slice(array_filter(explode('+', $parts[1])), 0, 8) as $toId) {
            $toId = trim($toId);
            if (isset($core[$toId])) {
                $targets[] = $core[$toId];
            } elseif (isset($optional[$toId])) {
                $targets[] = $optional[$toId][0];
            }
        }
        if ($targets) {
            $lines[] = $optional[$fromId][0] . ' → ' . implode(', ', $targets);
        }
    }
    return $lines;
}

/**
 * Clamp the submitted room count.
 * Returns the number as a string, or 'Not stated' when it is unusable — the
 * builder clamps client-side too, but nothing here trusts that.
 */
function pm_hb_rooms($raw) {
    $rooms = (int) pm_clean_line($raw, 6);
    return ($rooms >= 1 && $rooms <= 400) ? (string) $rooms : 'Not stated';
}
