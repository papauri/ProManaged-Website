<?php
/* website_catalogue.php — the server's own copy of the Website Builder catalogue,
 * plus the pure functions that resolve a submission against it.
 *
 * WHY THIS IS SEPARATE FROM website.php
 * The endpoint runs on include: it inspects the request method and calls
 * pm_respond(), which exits. Nothing in it could be exercised by a test without
 * also sending mail. Everything here is pure — no request, no state, no I/O — so
 * tests/website_endpoint.test.php can import the REAL logic rather than a copy.
 *
 * WHY THE CATALOGUE IS DUPLICATED FROM js/website_builder.js
 * Deliberately. The browser submits catalogue IDs and never labels; every label a
 * human reads is resolved here, so a forged POST cannot invent a capability and
 * have it arrive in an inbox looking like something ProManaged offers. That
 * safety property depends on the server holding its own list rather than trusting
 * one. Drift is guarded by tests/website_builder.test.js, which compares both.
 *
 * Requires http.php for pm_clean_line().
 */

require_once __DIR__ . '/http.php';

/** What the site is mainly for. id => customer-facing label. */
function pm_wb_purposes() {
    return [
        'show'     => 'Show what we do',
        'bookings' => 'Take bookings or enquiries',
        'updates'  => 'Share updates and photos',
        'unsure'   => 'Not sure yet',
    ];
}

/** What they have today. */
function pm_wb_situations() {
    return [
        'nothing'  => 'Nothing yet',
        'outgrown' => 'A site they have outgrown',
        'rebuild'  => 'A site that needs rebuilding',
        'social'   => 'Social pages only',
    ];
}

/** The floor. Never read from a submission — every site we build has these. */
function pm_wb_core() {
    return [
        'pages'    => 'Pages & content',
        'mobile'   => 'Built for phones',
        'enquiry'  => 'A way to reach you',
        'hosting'  => 'Hosting, domain & SSL',
    ];
}

/**
 * Optional modules, as label => delivery status.
 *
 * The status is the honesty contract from .claude/WEBSITE_BUILDER.md §2. There is
 * no "proposed" tier in this catalogue on purpose: a long row of proposed chips
 * makes a configurator read as a business promising anything you click. Six of
 * these seven are delivered work.
 */
function pm_wb_optional() {
    return [
        'seo'       => ['Search-friendly setup', 'Built before'],
        'gallery'   => ['Photo gallery', 'Built before'],
        'updates'   => ['Updates & news', 'Built before'],
        'bookings'  => ['Bookings & enquiries', 'Built before'],
        'selfedit'  => ['Edit it yourself', 'Built before'],
        'multisite' => ['More than one business', 'Built before'],
        'custom'    => ['Something else', 'Custom development'],
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
function pm_wb_resolve($raw, array $allowed, $limit = 24) {
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
 */
function pm_wb_connections($raw, array $optional, array $core) {
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
 * Clamp the submitted page count.
 * Returns the number as a string, or 'Not stated' when it is unusable — the
 * builder clamps client-side too, but nothing here trusts that.
 */
function pm_wb_pages($raw) {
    $pages = (int) pm_clean_line($raw, 6);
    return ($pages >= 1 && $pages <= 200) ? (string) $pages : 'Not stated';
}
