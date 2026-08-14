/* Catalogue guards for the Hospitality System Builder.
 *
 *   node tests/hospitality_builder.test.js
 *
 * These exist because the builder makes CLAIMS about what ProManaged has built,
 * and the catalogue is duplicated between the browser and the endpoint. Both are
 * the kind of thing that drifts silently. This turns the honesty contract and the
 * duplication into things that fail loudly instead.
 *
 * No DOM and no network: the catalogue is pure data by design, which is what makes
 * it testable at all.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const jsSrc = fs.readFileSync(path.join(ROOT, 'js', 'hospitality_builder.js'), 'utf8');
const phpSrc = fs.readFileSync(path.join(ROOT, 'php', 'hospitality_catalogue.php'), 'utf8');
const endpointSrc = fs.readFileSync(path.join(ROOT, 'php', 'hospitality.php'), 'utf8');

/* Pull an array literal out of the source by brace matching, so the test reads the
   real catalogue rather than a copy that would itself need maintaining. */
function literal(name) {
    const start = jsSrc.indexOf('const ' + name + ' = [');
    if (start === -1) throw new Error('could not find ' + name + ' in js/hospitality_builder.js');
    const open = jsSrc.indexOf('[', start);
    let depth = 0;
    for (let i = open; i < jsSrc.length; i++) {
        if (jsSrc[i] === '[') depth++;
        else if (jsSrc[i] === ']' && --depth === 0) return jsSrc.slice(open, i + 1);
    }
    throw new Error('unbalanced brackets in ' + name);
}

const ctx = vm.createContext({});
const CORE = vm.runInContext('(' + literal('CORE') + ')', ctx);
const OPTIONAL = vm.runInContext('(' + literal('OPTIONAL') + ')', ctx);
const GROUPS = vm.runInContext('(' + literal('GROUPS') + ')', ctx);
const ALL = CORE.concat(OPTIONAL);
const ids = new Set(ALL.map((m) => m.id));
const coreIds = new Set(CORE.map((m) => m.id));

let failures = 0;
function check(label, ok, detail) {
    if (!ok) failures++;
    console.log((ok ? 'PASS  ' : 'FAIL  ') + label + (ok || !detail ? '' : '\n        ' + detail));
}

/* ---------- Shape ---------- */
const REQUIRED = ['id', 'category', 'status', 'name', 'title', 'shortDescription',
    'why', 'dependsOn', 'worksWith', 'story'];

check('no duplicate ids', ids.size === ALL.length);

/* The ≥900px spans in css/hospitality_builder.css are hand-composed against these
   counts (5+4+3 for the foundation, and per-group patterns below). Adding or
   removing a capability without revisiting them leaves a half-empty row. */
check('3 foundation capabilities — the CSS composition assumes this',
    CORE.length === 3, 'got ' + CORE.length);
check('11 optional modules — the CSS composition assumes this',
    OPTIONAL.length === 11, 'got ' + OPTIONAL.length);

/* ---------- Grouping ----------
   Eleven modules are shown as three labelled sets so the chapter is not a wall of
   choices. A module missing from every group would simply never render, and one
   in two groups would render twice — neither is visible from the catalogue alone. */
const grouped = [];
GROUPS.forEach((g) => {
    check('group "' + g.id + '" has a title and a note', !!g.title && !!g.note);
    g.modules.forEach((id) => grouped.push(id));
});

OPTIONAL.forEach((m) => {
    const times = grouped.filter((id) => id === m.id).length;
    check('"' + m.id + '" appears in exactly one group', times === 1, 'appears ' + times + ' times');
});
grouped.forEach((id) => {
    check('grouped id "' + id + '" is a real optional module',
        OPTIONAL.some((m) => m.id === id));
});

/* Each group's span pattern is written for its exact size. */
const EXPECTED_SIZES = { 'guest-facing': 5, operations: 4, later: 2 };
GROUPS.forEach((g) => {
    check('group "' + g.id + '" still has ' + EXPECTED_SIZES[g.id] + ' modules — its CSS spans assume this',
        g.modules.length === EXPECTED_SIZES[g.id], 'got ' + g.modules.length);
});
ALL.forEach((m) => {
    const missing = REQUIRED.filter((k) => !Object.prototype.hasOwnProperty.call(m, k));
    check('"' + m.id + '" has every required field', missing.length === 0, 'missing: ' + missing.join(', '));
    check('"' + m.id + '" has a workflow story', Array.isArray(m.story) && m.story.length > 0);
    check('"' + m.id + '" has a known status',
        ['built', 'proposed', 'custom'].indexOf(m.status) !== -1, 'got: ' + m.status);
});

CORE.forEach((m) => {
    check('core "' + m.id + '" is category core', m.category === 'core');
    /* The foundation is always present, so a dependency on anything else would be
       a relationship that can never be satisfied. */
    check('core "' + m.id + '" depends on nothing',
        m.dependsOn.length === 0 && m.worksWith.length === 0);
});
OPTIONAL.forEach((m) => check('optional "' + m.id + '" is category optional', m.category === 'optional'));

/* ---------- Relationships ---------- */
ALL.forEach((m) => {
    m.dependsOn.concat(m.worksWith).forEach((target) => {
        check('"' + m.id + '" → "' + target + '" resolves to a real capability', ids.has(target));
        check('"' + m.id + '" does not relate to itself', target !== m.id);
    });
    /* A module may not list the same capability twice; the relation panel would
       print the relationship twice. */
    const rel = m.dependsOn.concat(m.worksWith);
    check('"' + m.id + '" has no duplicated relationship', new Set(rel).size === rel.length);
});

/* A `worksWith` pointing at a core capability must be EXPLAINED, never offered as
   an "Add" action — core cannot be added, so the button would do nothing. The
   renderer handles this by splitting on where a relationship points rather than
   which list it came from; this asserts the case still exists to be handled, so
   the branch cannot be quietly deleted as dead code. */
const coreWorksWith = OPTIONAL.filter((m) => m.worksWith.some((t) => coreIds.has(t)));
check('the core-target relationship case is still exercised by the catalogue',
    coreWorksWith.length > 0,
    'no module points worksWith at core — the dead-end guard in renderRelations is untested');

/* ---------- The honesty contract ----------
   .claude/PROJECT_CREDIBILITY.md approves only the delivered hotel work. A
   capability may claim "Built before" only if ProManaged has genuinely shipped it.
   Anything else must read Proposed module or Custom development. */
/* Each entry was confirmed present in BOTH delivered systems during the §19
   inspection on 14 Aug 2026. Adding to this set requires the same standard —
   evidence from the real systems, not a plausible assumption.
     bookings/rooms/guests  multi-step booking engine, room types with live
                            availability and rates, full guest record
     website                the public site and its booking engine
     staff                  an authenticated admin portal (CSRF + password reset)
     restaurant             a categorised digital menu, room service included
     conference             a meeting-space enquiry module
     events                 a published upcoming-events module
   Deliberately NOT included: payments, housekeeping, reporting, guest-comms and
   multi-property — none were evidenced, and multi-TENANT hosting is not the same
   feature as one operator running several properties from one system. */
const MAY_CLAIM_BUILT = new Set([
    'bookings', 'rooms', 'guests', 'website',
    'staff', 'restaurant', 'conference', 'events',
]);
ALL.filter((m) => m.status === 'built').forEach((m) => {
    check('"' + m.id + '" is permitted to claim "Built before"', MAY_CLAIM_BUILT.has(m.id),
        'unverified capability claiming delivered work — see PROJECT_CREDIBILITY.md');
});

check('no restricted client name in the builder script', !/bank\s*nkhonde/i.test(jsSrc));
check('no restricted client name in the catalogue', !/bank\s*nkhonde/i.test(phpSrc));
check('no restricted client name in the endpoint', !/bank\s*nkhonde/i.test(endpointSrc));

/* ---------- Browser / endpoint catalogue sync ----------
   The endpoint deliberately keeps its own copy so the server never takes a label
   from the client. That duplication is only safe if it cannot drift. */
function phpKeys(fnName) {
    const start = phpSrc.indexOf('function ' + fnName + '(');
    if (start === -1) throw new Error('could not find ' + fnName + '() in php/hospitality_catalogue.php');
    const open = phpSrc.indexOf('[', start);
    let depth = 0, end = -1;
    for (let i = open; i < phpSrc.length; i++) {
        if (phpSrc[i] === '[') depth++;
        else if (phpSrc[i] === ']' && --depth === 0) { end = i; break; }
    }
    const body = phpSrc.slice(open, end);
    return (body.match(/'([a-z-]+)'\s*=>/g) || []).map((s) => s.replace(/'([a-z-]+)'\s*=>/, '$1'));
}

const phpOptional = phpKeys('pm_hb_optional').sort();
const jsOptional = OPTIONAL.map((m) => m.id).sort();
check('endpoint and browser agree on the optional catalogue',
    JSON.stringify(phpOptional) === JSON.stringify(jsOptional),
    'php: ' + phpOptional.join(',') + '\n        js:  ' + jsOptional.join(','));

const phpCore = phpKeys('pm_hb_core').sort();
const jsCore = CORE.map((m) => m.id).sort();
check('endpoint and browser agree on the foundation',
    JSON.stringify(phpCore) === JSON.stringify(jsCore),
    'php: ' + phpCore.join(',') + '\n        js:  ' + jsCore.join(','));

/* The endpoint must never read the foundation from the submission — the fixed
   foundation is the reason a forged POST cannot rewrite what ProManaged offers. */
check('the endpoint does not trust submitted core_features',
    !/\$_POST\['core_features'\]/.test(endpointSrc),
    'php/hospitality.php reads core_features from the request');

console.log(failures === 0
    ? '\nALL PASS (' + ALL.length + ' capabilities)'
    : '\n' + failures + ' FAILURE(S)');
process.exit(failures === 0 ? 0 : 1);
