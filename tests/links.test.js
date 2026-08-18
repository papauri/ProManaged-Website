/* Link integrity across every public page.
 *
 *   node tests/links.test.js
 *
 * Two classes of defect this catches, both of which had shipped:
 *
 *   1. A LINK THAT RESOLVES TO NOTHING. `#foo` where the target page has no
 *      element with that id fails silently in a browser — you land at the top of
 *      the page and never know you were meant to be somewhere else. Renaming a
 *      section is the usual cause, and nothing else in the repo notices.
 *
 *   2. A LINK THAT PROMISES A FORM AND DELIVERS A PAGE. Every "describe the
 *      problem in plain words" / "send a message" control on the site used to
 *      point at either get-started.html (a booking form: name, email, service,
 *      date, time — nowhere to describe anything) or index.html#contact (a CTA
 *      block with no form at all). The site's only free-text enquiry form was on
 *      the hardware sourcing page. So the copy invited you to describe the
 *      problem and then gave you a date picker.
 *
 * The homepage card contract at the bottom is the one worth reading: a route
 * lands on the SUBSTANCE of what it names, a capability card lands on the
 * INVITATION its cue promises, and neither may land on a bare page.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

let failures = 0;
function check(ok, msg) {
    console.log((ok ? 'PASS  ' : 'FAIL  ') + msg);
    if (!ok) failures++;
}

const PAGES = [
    'index.html',
    'get-started.html',
    'learn_more.html',
    'privacy_policy.html',
    ...fs.readdirSync(path.join(ROOT, 'pages'))
        .filter((f) => f.endsWith('.html'))
        .sort()
        .map((f) => 'pages/' + f),
];

const idsOf = (src) => new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const cache = {};
function pageIds(rel) {
    if (!(rel in cache)) cache[rel] = idsOf(read(rel));
    return cache[rel];
}

/* ------------------------------------------------- ids are unique per page */

PAGES.forEach((page) => {
    const all = [...read(page).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dupes = [...new Set(all.filter((id) => all.filter((x) => x === id).length > 1))];
    check(dupes.length === 0, page + ': every id is unique' + (dupes.length ? ' -> ' + dupes.join(', ') : ''));
});

/* --------------------------------------- every local link resolves, fragment
   included. Anchors, stylesheets, scripts and images all go through the same
   check, because a 404 stylesheet is as invisible in review as a dead anchor. */

PAGES.forEach((page) => {
    const src = read(page);
    const dir = path.dirname(page);
    const broken = [];
    const deadFragments = [];

    for (const m of src.matchAll(/(?:href|src|data-target)="([^"]+)"/g)) {
        const raw = m[1];
        if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;

        const [rawPath, fragment] = raw.split('#');

        if (rawPath === '') {
            // Same-page anchor.
            if (fragment && !pageIds(page).has(decodeURIComponent(fragment))) deadFragments.push(raw);
            continue;
        }

        const target = path.posix.normalize(path.posix.join(dir.replace(/\\/g, '/'), rawPath));
        if (!fs.existsSync(path.join(ROOT, target))) {
            broken.push(raw);
            continue;
        }
        if (fragment && target.endsWith('.html')) {
            if (!pageIds(target).has(decodeURIComponent(fragment))) deadFragments.push(raw);
        }
    }

    check(broken.length === 0,
        page + ': every local href/src/data-target exists'
        + (broken.length ? ' -> ' + [...new Set(broken)].join(', ') : ''));
    check(deadFragments.length === 0,
        page + ': every #fragment resolves to a real id'
        + (deadFragments.length ? ' -> ' + [...new Set(deadFragments)].join(', ') : ''));
});

/* --------------------------------------------- an invitation reaches a form */

const FORM_PAGES = {};
PAGES.forEach((p) => { FORM_PAGES[p] = /<textarea/.test(read(p)); });

// Anything whose visible text invites the visitor to write something must land
// somewhere they can actually write. Matched on the link text, so new copy in the
// same spirit is covered without anyone remembering to add it here.
const INVITE = /(describe the problem|send a message|tell us what|ask a question|write to us)/i;

PAGES.forEach((page) => {
    const src = read(page);
    const dir = path.dirname(page).replace(/\\/g, '/');
    const bad = [];

    for (const m of src.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
        const [raw, textRaw] = [m[1], m[2]];
        const text = textRaw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
        if (!INVITE.test(text)) continue;
        if (/^(mailto:|tel:)/.test(raw)) continue;

        const [rawPath, fragment] = raw.split('#');
        const target = rawPath === ''
            ? page
            : path.posix.normalize(path.posix.join(dir, rawPath));
        if (!(target in FORM_PAGES)) continue;

        // The destination must have a free-text box, and the link must aim at the
        // section holding it rather than at the page in general.
        if (!FORM_PAGES[target] || !fragment) bad.push('"' + text + '" -> ' + raw);
    }

    check(bad.length === 0,
        page + ': every "write us something" link lands on a form section'
        + (bad.length ? ' -> ' + bad.join(' | ') : ''));
});

// The general enquiry form must exist where the copy sends people.
const gs = read('get-started.html');
check(/<section id="describe"/.test(gs), 'get-started.html: #describe exists');
check(/<textarea[^>]*name="message"/.test(gs), 'get-started.html: #describe carries a free-text box');
check(/action="php\/contact\.php"/.test(gs), 'get-started.html: it posts to the existing shared endpoint');
check(/name="website"/.test(gs.split('id="describe"')[1].split('</section>')[0]),
    'get-started.html: the honeypot is present on the new form');
check(read('php/contact.php').includes("'Get started'"),
    'php/contact.php: the new form\'s enquiry_type is allow-listed, not defaulted');

/* -------------------------------------------- the homepage card contract */

const home = read('index.html');
const sectionBody = (src, id) => {
    const open = src.indexOf('<section id="' + id + '"');
    if (open === -1) return '';
    return src.slice(open, src.indexOf('</section>', open));
};

// A route names a thing the visitor came for, so it lands on the substance.
const routes = sectionBody(home, 'what-we-do');
const routeHrefs = [...routes.matchAll(/<a class="route[^"]*" href="([^"]+)"/g)].map((m) => m[1]);
check(routeHrefs.length >= 5, 'homepage: every route is still present');
routeHrefs.forEach((href) => {
    check(href.includes('#'), 'homepage route lands on a section, not a page top -> ' + href);
});

// A capability card carries a "Tell us…" cue, so it lands on the invitation.
const cards = [...home.matchAll(/data-target="([^"]+)" data-cursor-label="([^"]+)"/g)];
check(cards.length === 3, 'homepage: all three capability cards are still present');
cards.forEach(([, target, cue]) => {
    check(target.includes('#'),
        'homepage capability card lands on a section -> "' + cue + '" -> ' + target);
});

console.log('');
if (failures) {
    console.log('FAILURES: ' + failures);
    process.exit(1);
}
console.log('ALL PASS');
