/* The "What brings you here?" layer — js/audience.js + css/audience.css.
 *
 *   node tests/audience.test.js
 *
 * The persona copy lives in a script and the tagging lives in nine pages, so
 * nothing but this file notices when the two drift. What it guards:
 *
 *   - every page loads the layer, in the order the no-flash design depends on;
 *   - every href a persona can be sent to resolves to a real page AND fragment,
 *     and a CTA that invites the visitor to write lands on a free-text box
 *     (the landing contract from tests/links.test.js, applied to copy that
 *     links.test.js cannot see because it only exists at runtime);
 *   - every data-aud-copy key a persona fills exists in the markup — copy for a
 *     key nobody uses is dead copy, and dead copy is how wrong claims survive;
 *   - every token in the markup is one the personas understand;
 *   - each persona is left with something to do on every page it can reach
 *     (routes, a capability, a booking option, exactly one navigation tile);
 *   - BUILD_PLAN §2B rhythm holds for every persona on every page: hiding a
 *     chapter must never stack two graphite chapters, and light collisions are
 *     exactly the ones the runtime repairs;
 *   - the persona ids match the PHP allow-list the forms are checked against;
 *   - the copy keeps the clarity and credibility rules (no jargon in the copy a
 *     visitor reads first, no unapproved names, no prices).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const ROUTE_TABLE = require('./routes');
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

/* ------------------------------------------------ load the persona catalogue
   Run the real script against a stub document whose DOMContentLoaded never
   fires, so only the top-level code runs: the catalogue, the derived copy and
   the generated hiding rules. */
const injected = [];
const stubEl = () => ({
    setAttribute() {}, removeAttribute() {}, getAttribute() { return null; },
    classList: { add() {}, remove() {}, contains() { return false; } },
    appendChild(el) { injected.push(el); },
});
const sandbox = {
    document: {
        currentScript: null,
        readyState: 'loading',
        documentElement: stubEl(),
        head: stubEl(),
        createElement: () => ({ textContent: '' }),
        addEventListener() {},
    },
    window: { location: { search: '' }, localStorage: { getItem: () => null, setItem() {} } },
    URLSearchParams,
};
sandbox.window.document = sandbox.document;
vm.createContext(sandbox);
vm.runInContext(read('js/audience.js'), sandbox, { filename: 'js/audience.js' });
const api = sandbox.window.pmAudience;
check(!!api && Array.isArray(api.personas), 'js/audience.js exposes its persona catalogue');
const PERSONAS = api.personas;
const rules = (injected[0] && injected[0].textContent) || '';
check(PERSONAS.every((p) => rules.includes(`html[data-pm-aud="${p.id}"] [data-aud]`)),
    'a hiding rule is generated for every persona');

/* ------------------------------------------------------------ catalogue shape */
const ids = PERSONAS.map((p) => p.id);
check(new Set(ids).size === ids.length, 'persona ids are unique');
check(!ids.includes('all'), '"all" is reserved for the show-everything answer');
PERSONAS.forEach((p) => {
    const ok = p.label && p.short && p.desc && /^fa-/.test(p.icon) && p.tokens[0] === p.id
        && ['Build', 'Source', 'Support'].includes(p.pillar) && p.lead
        && p.cta && p.cta.text && p.cta.short && p.cta.href && p.cta.desc && p.cta.cue
        && Array.isArray(p.proof) && p.proof.length === 3;
    check(!!ok, `${p.id}: complete record (label, switch label, icon, tokens, pillar, CTA, three proof lines)`);
});

const TOKENS = ['software', 'website', 'hospitality', 'hardware', 'gaming', 'support'];
PERSONAS.forEach((p) => {
    const bad = p.tokens.slice(1).filter((t) => !TOKENS.includes(t));
    check(bad.length === 0, `${p.id}: every token is in the vocabulary` + (bad.length ? ' -> ' + bad.join(', ') : ''));
});

/* ---------------------------------------------- PHP allow-list stays in sync */
const http = read('php/http.php');
const phpBlock = (http.match(/function pm_audience_label[\s\S]*?\];/) || [''])[0];
const phpIds = [...phpBlock.matchAll(/'([a-z]+)'\s*=>/g)].map((m) => m[1]);
check(phpIds.length > 0, 'php/http.php declares pm_audience_label()');
check(JSON.stringify([...phpIds].sort()) === JSON.stringify([...ids].sort()),
    'php allow-list ids match js/audience.js personas'
    + ` (php: ${phpIds.join(', ')} | js: ${ids.join(', ')})`);
['php/contact.php', 'php/booking.php'].forEach((f) => {
    check(/pm_audience_label\(\$_POST\['audience'\]/.test(read(f)), `${f} reads the optional audience field through the allow-list`);
});

/* -------------------------------------------- every page loads the layer, in
   the order the no-flash design needs: the script straight after boot.js in
   <head> (before any body content, and before main.js registers its own
   DOMContentLoaded handler), the stylesheet last so its repairs win ties. */
PAGES.forEach((page) => {
    const src = read(page);
    const head = src.split('</head>')[0];
    const boot = head.indexOf('js/boot.js');
    const aud = head.indexOf('js/audience.js');
    check(boot !== -1 && aud > boot, `${page}: js/audience.js loads in <head>, after js/boot.js`);
    const sheets = [...head.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]);
    check(/css\/audience\.css$/.test(sheets[sheets.length - 1] || ''), `${page}: css/audience.css is the last stylesheet`);
});

/* ------------------------------------------- markup tokens are all understood */
const KNOWN = new Set([...TOKENS, ...ids, 'all']);
PAGES.forEach((page) => {
    const src = read(page);
    const used = [...src.matchAll(/data-aud(?:-only|-page)?="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/)).filter(Boolean);
    const bad = [...new Set(used.filter((t) => !KNOWN.has(t)))];
    check(bad.length === 0, `${page}: every data-aud token is known` + (bad.length ? ' -> ' + bad.join(', ') : ''));
});

/* ----------------------------------------------- copy keys exist in the markup
   Keys tagged by the script itself at start-up (shared chrome) are listed. */
const SCRIPT_TAGGED = ['rail-cta', 'nav-primary', 'nav-lead-eyebrow', 'nav-lead-text', 'nav-build-tile', 'nav-source-tile'];
const markupKeys = new Set(PAGES.flatMap((page) =>
    [...read(page).matchAll(/data-aud-copy="([^"]+)"/g)].map((m) => m[1])));
PERSONAS.forEach((p) => {
    const dead = Object.keys(p.copy).filter((k) => !markupKeys.has(k) && !SCRIPT_TAGGED.includes(k));
    check(dead.length === 0, `${p.id}: every copy key is used by some page` + (dead.length ? ' -> ' + dead.join(', ') : ''));
});

/* -------------------------------------------- every persona link resolves, and
   an invitation to write lands on a free-text box. */
const idsOf = (rel) => new Set([...read(rel).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
function sectionHasTextarea(rel, id) {
    const src = read(rel);
    const at = src.indexOf(`id="${id}"`);
    if (at === -1) return false;
    const open = src.lastIndexOf('<section', at);
    const close = src.indexOf('</section>', at);
    return open !== -1 && close !== -1 && /<textarea/.test(src.slice(open, close));
}
// Judged on the words of the control itself — the CTA text and the switch's short
// label — which is what every copy href is derived from.
const WRITE = /\b(describe|tell us|send|request|ask|message)\b/i;
PERSONAS.forEach((p) => {
    const links = [['cta', p.cta.href]];
    Object.entries(p.copy).forEach(([k, v]) => {
        if (v && typeof v === 'object' && v.href) links.push([k, v.href]);
        if (v && typeof v === 'object' && v.target) links.push([k + ' (card)', v.target]);
    });
    links.push(['home page', p.home]);
    links.forEach(([where, href]) => {
        const r = ROUTE_TABLE.resolve(href);
        const [file, frag] = r ? [r.file, r.frag] : [href, ''];
        const exists = !!r && fs.existsSync(path.join(ROOT, file));
        const fragOk = exists && (!frag || idsOf(file).has(frag));
        check(exists && fragOk, `${p.id}: ${where} -> ${href} resolves`);
    });
    [p.cta.text, p.cta.short].forEach((text) => {
        const r = ROUTE_TABLE.resolve(p.cta.href) || { file: '', frag: '' };
        const [file, frag] = [r.file, r.frag];
        if (WRITE.test(text)) {
            check(!!frag && sectionHasTextarea(file, frag), `${p.id}: "${text}" invites writing and lands on a free-text box (${p.cta.href})`);
        }
    });
});

/* -------------------------------------------- clarity + credibility of the copy */
const JARGON = /\b(saas|multi-tenant|integration|dashboard|infrastructure)\b/i;
PERSONAS.forEach((p) => {
    const first = [p.label, p.short, p.desc, p.cta.text, p.cta.short,
        p.copy['home-hero-eyebrow'], p.copy['home-hero-title'], p.copy['home-hero-sub'], ...p.proof].join(' | ');
    check(!JARGON.test(first), `${p.id}: no jargon in the chooser, switch, CTA or first-screen copy`);
    const all = JSON.stringify(p);
    check(!/nkhonde/i.test(all), `${p.id}: no unapproved client names`);
    check(!/[$€£]\s?\d|\bMK\s?\d|\bkwacha\b|\bper month\b|\bfrom \d/i.test(all), `${p.id}: no prices`);
});

/* -------------------------------------------- simulate each persona on each page */
const shows = (attrs, p) => {
    const aud = (attrs.match(/\sdata-aud="([^"]*)"/) || [])[1];
    const only = (attrs.match(/\sdata-aud-only="([^"]*)"/) || [])[1];
    if (aud !== undefined && !aud.split(/\s+/).some((t) => p.tokens.includes(t))) return false;
    if (only !== undefined && !only.split(/\s+/).some((t) => p.tokens.includes(t))) return false;
    return true;
};

function chapters(src) {
    return [...src.matchAll(/<section\b([^>]*)>/g)].map((m) => {
        const attrs = m[1];
        const cls = (attrs.match(/\sclass="([^"]*)"/) || ['', ''])[1].split(/\s+/);
        const surface = cls.includes('section--graphite') || cls.includes('hero') ? 'graphite'
            : cls.includes('section--stone') ? 'stone'
            : cls.includes('section--ivory') ? 'ivory' : 'paper';
        return { id: (attrs.match(/\sid="([^"]*)"/) || ['', '?'])[1], attrs, surface };
    }).filter((c) => /\bclass="[^"]*\b(section|hero)\b/.test(c.attrs));
}

// The runtime repair in js/audience.js, mirrored: re-surface a light chapter that
// repeats its predecessor; never touch graphite.
function repaired(vis) {
    const out = [];
    vis.forEach((c, i) => {
        let s = c.surface;
        const prev = out[i - 1];
        if (prev && s === prev && s !== 'graphite') {
            const next = vis[i + 1] ? vis[i + 1].surface : null;
            const opts = ['ivory', 'stone', 'paper'].filter((x) => x !== prev);
            s = opts.filter((x) => x !== next)[0] || opts[0];
        }
        out.push(s);
    });
    return out;
}

PAGES.forEach((page) => {
    const src = read(page);
    const pageScope = (src.match(/<body[^>]*\sdata-aud-page="([^"]*)"/) || [])[1];
    PERSONAS.forEach((p) => {
        if (pageScope && !pageScope.split(/\s+/).some((t) => p.tokens.includes(t))) return; // off-topic page: unfiltered
        const vis = chapters(src).filter((c) => shows(c.attrs, p));
        const stacked = vis.some((c, i) => i > 0 && c.surface === 'graphite' && vis[i - 1].surface === 'graphite');
        check(!stacked, `${page} as ${p.id}: no two adjacent graphite chapters`);
        const fixed = repaired(vis);
        const repeat = fixed.some((s, i) => i > 0 && s === fixed[i - 1]);
        check(!repeat, `${page} as ${p.id}: no two adjacent chapters share a surface after repair`);

        const tiles = [...src.matchAll(/<a class="nav-tile nav-tile--(?:lead|service)"([^>]*)>/g)];
        check(tiles.filter((m) => shows(m[1], p)).length === 1, `${page} as ${p.id}: exactly one capability tile in the navigation`);
    });
});

const index = read('index.html');
PERSONAS.forEach((p) => {
    const routes = [...index.matchAll(/<a class="route[^"]*"([^>]*)>/g)].filter((m) => shows(m[1], p));
    check(routes.length >= 2, `index.html as ${p.id}: at least two routes to act on (${routes.length})`);
    const cards = [...index.matchAll(/<div class="block[^"]*service-card capability[^"]*"([^>]*)>/g)].filter((m) => shows(m[1], p));
    check(cards.length >= 1, `index.html as ${p.id}: at least one capability card`);
});
const everything = { id: 'all', tokens: ['software', 'website', 'hospitality', 'hardware', 'gaming', 'support'] };
const allRoutes = [...index.matchAll(/<a class="route[^"]*"([^>]*)>/g)].filter((m) => !/data-aud-only/.test(m[1]));
check(allRoutes.length === 5, 'index.html with no choice: the original five routes, persona-only routes hidden');
check([...index.matchAll(/<div class="block[^"]*service-card capability[^"]*"([^>]*)>/g)].filter((m) => shows(m[1], everything)).length === 3,
    'index.html with no choice: all three capability cards');

const gs = read('get-started.html');
const options = [...gs.matchAll(/<option\b([^>]*)>/g)];
PERSONAS.forEach((p) => {
    check(options.filter((m) => shows(m[1], p)).length >= 1, `get-started.html as ${p.id}: the booking form still offers a service`);
});
const booking = read('php/booking.php');
options.forEach((m) => {
    const value = (m[1].match(/value="([^"]*)"/) || [])[1].replace(/&amp;/g, '&');
    check(booking.includes(`'${value}'`), `booking option "${value}" is still on the server allow-list`);
});

console.log(failures ? `\n${failures} failure(s)` : '\nAll audience checks passed.');
process.exit(failures ? 1 : 0);
