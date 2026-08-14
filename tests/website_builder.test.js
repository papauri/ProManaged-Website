/* Catalogue guards for the Website Builder.
 *
 *   node tests/website_builder.test.js
 *
 * This builder makes CLAIMS about what ProManaged has delivered, and its whole
 * persuasive force comes from almost every capability being real work. One
 * unverifiable claim sitting among them damages the ones that are true, so the
 * honesty contract is asserted here rather than left to review.
 *
 * The catalogue is also duplicated between the browser and the endpoint on
 * purpose (the server must never take a label from the client). That duplication
 * is only safe if it cannot drift, which is the other thing this file checks.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const jsSrc = fs.readFileSync(path.join(ROOT, 'js', 'website_builder.js'), 'utf8');
const phpSrc = fs.readFileSync(path.join(ROOT, 'php', 'website_catalogue.php'), 'utf8');
const endpointSrc = fs.readFileSync(path.join(ROOT, 'php', 'website.php'), 'utf8');

/* Pull an array literal out of the source by brace matching, so the test reads
   the real catalogue rather than a copy that would need maintaining. */
function literal(name) {
    const start = jsSrc.indexOf('const ' + name + ' = [');
    if (start === -1) throw new Error('could not find ' + name + ' in js/website_builder.js');
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

/* The ≥900px spans in css/website_builder.css are hand-composed against these
   counts. Adding or removing a capability without revisiting them leaves a
   half-empty row. */
check('4 always-included capabilities — the CSS composition assumes this',
    CORE.length === 4, 'got ' + CORE.length);
check('7 optional modules — the CSS composition assumes this',
    OPTIONAL.length === 7, 'got ' + OPTIONAL.length);

ALL.forEach((m) => {
    const missing = REQUIRED.filter((k) => !Object.prototype.hasOwnProperty.call(m, k));
    check('"' + m.id + '" has every required field', missing.length === 0, 'missing: ' + missing.join(', '));
    check('"' + m.id + '" has a workflow story', Array.isArray(m.story) && m.story.length > 0);
    /* There is deliberately no "proposed" tier in this catalogue — see
       .claude/WEBSITE_BUILDER.md §2. A row of proposed chips is what makes a
       configurator read as a business promising anything you click. */
    check('"' + m.id + '" has a known status',
        ['built', 'custom'].indexOf(m.status) !== -1,
        'got: ' + m.status + ' — this catalogue allows only built or custom');
});

CORE.forEach((m) => {
    check('core "' + m.id + '" is category core', m.category === 'core');
    /* The floor is always present, so a dependency on anything else would be a
       relationship that can never be satisfied. */
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
    const rel = m.dependsOn.concat(m.worksWith);
    check('"' + m.id + '" has no duplicated relationship', new Set(rel).size === rel.length);
});

/* A relationship pointing at a core capability must be EXPLAINED, never offered
   as an "Add" action — core cannot be added, so the button would do nothing. The
   renderer splits on where a relationship points rather than which list it came
   from; this asserts the case still exists, so that branch cannot be quietly
   deleted as dead code. */
const coreTargets = OPTIONAL.filter((m) =>
    m.dependsOn.concat(m.worksWith).some((t) => coreIds.has(t)));
check('the core-target relationship case is still exercised by the catalogue',
    coreTargets.length > 0,
    'nothing points at core — the dead-end guard in renderRelations is untested');

/* ---------- The honesty contract ----------
   Every entry was verified against the two delivered hotel systems (read-only,
   14 Aug 2026) or against this repository. Nothing rests on marketing copy.
   Adding to this set requires the same standard. See .claude/WEBSITE_BUILDER.md §7. */
const MAY_CLAIM_BUILT = new Set([
    'pages',     // both delivered hotel sites are full multi-page public sites
    'mobile',    // this repository is mobile-first throughout
    'enquiry',   // contact.php / booking.php over PHPMailer, in production
    'hosting',   // both client systems hosted and served under TLS
    'seo',       // deliberate SEO titles and meta descriptions on delivered sites
    'gallery',   // "Explore Our Hotel" gallery on both
    'updates',   // the events module: owner-published dated items
    'bookings',  // a full multi-step booking engine with live availability
    'selfedit',  // owner-editable menu and events behind an authenticated portal
    'multisite', // two hotels on one build, tenant-scoped, separate admin each
]);
ALL.filter((m) => m.status === 'built').forEach((m) => {
    check('"' + m.id + '" is permitted to claim "Built before"', MAY_CLAIM_BUILT.has(m.id),
        'unverified capability claiming delivered work — see .claude/WEBSITE_BUILDER.md §7');
});

/* The ratio IS the credibility argument, and it is the thing to protect if this
   catalogue is ever revisited. */
const builtCount = ALL.filter((m) => m.status === 'built').length;
check('at least 10 of the ' + ALL.length + ' capabilities are delivered work',
    builtCount >= 10, 'only ' + builtCount + ' are marked built');

check('no restricted client name in the builder script', !/bank\s*nkhonde/i.test(jsSrc));
check('no restricted client name in the catalogue', !/bank\s*nkhonde/i.test(phpSrc));
check('no restricted client name in the endpoint', !/bank\s*nkhonde/i.test(endpointSrc));

/* Nothing here may claim search rankings — the SEO claim is the setup only. */
check('no ranking or traffic promise in the builder copy',
    !/(rank(ing)?s? (on|in) google|top of google|guarantee.{0,20}traffic|first page)/i.test(jsSrc));

/* ---------- Grouping ---------- */
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
    check('grouped id "' + id + '" is a real optional module', OPTIONAL.some((m) => m.id === id));
});

const EXPECTED_SIZES = { found: 3, doing: 2, beyond: 2 };
GROUPS.forEach((g) => {
    check('group "' + g.id + '" still has ' + EXPECTED_SIZES[g.id] + ' modules — its CSS spans assume this',
        g.modules.length === EXPECTED_SIZES[g.id], 'got ' + g.modules.length);
});

/* ---------- Browser / endpoint catalogue sync ---------- */
function phpKeys(fnName) {
    const start = phpSrc.indexOf('function ' + fnName + '(');
    if (start === -1) throw new Error('could not find ' + fnName + '() in php/website_catalogue.php');
    const open = phpSrc.indexOf('[', start);
    let depth = 0, end = -1;
    for (let i = open; i < phpSrc.length; i++) {
        if (phpSrc[i] === '[') depth++;
        else if (phpSrc[i] === ']' && --depth === 0) { end = i; break; }
    }
    return (phpSrc.slice(open, end).match(/'([a-z-]+)'\s*=>/g) || [])
        .map((s) => s.replace(/'([a-z-]+)'\s*=>/, '$1'));
}

const phpOptional = phpKeys('pm_wb_optional').sort();
const jsOptional = OPTIONAL.map((m) => m.id).sort();
check('endpoint and browser agree on the optional catalogue',
    JSON.stringify(phpOptional) === JSON.stringify(jsOptional),
    'php: ' + phpOptional.join(',') + '\n        js:  ' + jsOptional.join(','));

const phpCore = phpKeys('pm_wb_core').sort();
const jsCore = CORE.map((m) => m.id).sort();
check('endpoint and browser agree on the always-included set',
    JSON.stringify(phpCore) === JSON.stringify(jsCore),
    'php: ' + phpCore.join(',') + '\n        js:  ' + jsCore.join(','));

/* The fixed floor is the reason a forged POST cannot rewrite what we offer. */
check('the endpoint does not trust submitted core_features',
    !/\$_POST\['core_features'\]/.test(endpointSrc),
    'php/website.php reads core_features from the request');

console.log(failures === 0
    ? '\nALL PASS (' + ALL.length + ' capabilities, ' + builtCount + ' delivered)'
    : '\n' + failures + ' FAILURE(S)');
process.exit(failures === 0 ? 0 : 1);
