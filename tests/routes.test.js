/* Clean URLs: every page has its own address, every form has one, nothing is left
 * on an old .html address, and the server-side allow-list agrees with the routes.
 *
 *   node tests/routes.test.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { ROUTES, ALIASES, ROUTE_OF, resolve } = require('./routes');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

let failures = 0;
function check(ok, msg) {
    console.log((ok ? 'PASS  ' : 'FAIL  ') + msg);
    if (!ok) failures++;
}

const PAGES = [
    'index.html', 'get-started.html', 'learn_more.html', 'privacy_policy.html',
    ...fs.readdirSync(path.join(ROOT, 'pages')).filter((f) => f.endsWith('.html')).map((f) => 'pages/' + f),
];
const htaccess = read('.htaccess');

PAGES.forEach((page) => {
    check(!!ROUTE_OF[page], `${page} has a clean URL (${ROUTE_OF[page] || 'none'})`);
    if (page === 'index.html') return;
    const escaped = page.split('.').join('\\.');
    check(htaccess.includes(`\\s/+${escaped}[\\s?#]`), `${page}: the old .html address redirects to ${ROUTE_OF[page]}`);
});

Object.keys(ROUTES).forEach((r) => {
    check(fs.existsSync(path.join(ROOT, ROUTES[r])), `${r} serves a file that exists (${ROUTES[r]})`);
});

// Each form's own address lands on the section holding that form — or, on the two
// builders, on the gate that starts them: their form is the last step of a flow
// and is not reachable before it.
Object.keys(ALIASES).forEach((alias) => {
    const r = resolve(alias);
    const src = r && read(r.file);
    const at = src ? src.indexOf(`id="${r.frag}"`) : -1;
    const section = at === -1 ? '' : src.slice(src.lastIndexOf('<section', at), src.indexOf('</section>', at));
    check(/<form\b/.test(section) || /class="[^"]*builder-gate/.test(section),
        `${alias} -> ${ALIASES[alias]} lands on a form`);
});

// Every page carrying a request form has a short address for it.
PAGES.forEach((page) => {
    if (!/<form\b/.test(read(page))) return;
    const route = ROUTE_OF[page];
    check(Object.values(ALIASES).some((t) => t.split('#')[0] === route), `${route}: its form has a short address`);
});

// php/http.php only accepts a page it knows; that list is the route table.
const php = read('php/http.php');
const listed = (php.match(/function pm_page_label[\s\S]*?\$routes = \[([\s\S]*?)\];/) || [, ''])[1]
    .match(/'[^']*'/g).map((s) => s.slice(1, -1)).sort();
check(JSON.stringify(listed) === JSON.stringify(Object.keys(ROUTES).sort()),
    'pm_page_label() allow-list matches the route table');

// The gaming and hardware pages point at the Facebook page where the products we have are posted and updated regularly.
['pages/gaming.html', 'pages/hardware_sourcing.html'].forEach((page) => {
    const src = read(page);
    check(/class="fb-btn" href="https:\/\/www\.facebook\.com\/promanageditservices" target="_blank" rel="noopener noreferrer"/.test(src),
        `${page}: links to the Facebook page in a new tab`);
    check(/updated? regularly/i.test(src) && !/sale/i.test(src.replace(/wholesale|resale/gi, '')), `${page}: says our products are posted and updated there, not "sale"`);
});

console.log('');
if (failures) {
    console.log('FAILURES: ' + failures);
    process.exit(1);
}
console.log('ALL PASS');
