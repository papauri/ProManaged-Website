/* The persona request forms, HTML against the server schema.
 *
 *   node tests/persona_pages.test.js      (needs `php` on PATH)
 *
 * Every persona page's form posts option KEYS to php/enquiry.php, and the server
 * resolves the labels from php/enquiry_catalogue.php. If the two drift, a field
 * the visitor filled in silently never reaches the inbox, or an option they picked
 * is dropped as "unknown". Neither shows up in review, so it is checked here:
 *
 *   - every form names a form_type the server knows, posts to the endpoint and
 *     carries the honeypot;
 *   - every field the server reads is on the form, and nothing on the form is
 *     outside the schema;
 *   - every choice and checkbox value is a key the server declares, and every key
 *     is offered;
 *   - a field the server requires is `required` on the form, so the visitor is
 *     told before the request goes anywhere;
 *   - every schema form is used by some page.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

let failures = 0;
function check(ok, msg) {
    console.log((ok ? 'PASS  ' : 'FAIL  ') + msg);
    if (!ok) failures++;
}

const schema = JSON.parse(execFileSync('php', ['-r',
    'require "php/enquiry_catalogue.php"; echo json_encode(pm_enquiry_forms());'], { cwd: ROOT }).toString());

const PAGES = [
    'index.html', 'get-started.html', 'learn_more.html', 'privacy_policy.html',
    ...fs.readdirSync(path.join(ROOT, 'pages')).filter((f) => f.endsWith('.html')).sort().map((f) => 'pages/' + f),
];

const IDENTITY = ['name', 'email', 'phone', 'website', 'form_type'];
const used = new Set();

PAGES.forEach((page) => {
    const src = read(page);
    const forms = [...src.matchAll(/<form\b[^>]*id="enquiry-form"[^>]*>([\s\S]*?)<\/form>/g)];
    check(forms.length <= 1, `${page}: at most one persona form`);
    forms.forEach((m) => {
        const tag = m[0].slice(0, m[0].indexOf('>') + 1);
        const body = m[1];
        const type = (body.match(/name="form_type" value="([^"]+)"/) || [])[1];
        const spec = schema[type];
        check(!!spec, `${page}: form_type "${type}" is declared in php/enquiry_catalogue.php`);
        if (!spec) return;
        used.add(type);
        check(/action="(\.\.\/)?php\/enquiry\.php"/.test(tag) && /method="POST"/.test(tag), `${page}: posts to php/enquiry.php`);
        check(/name="website"[^>]*tabindex="-1"/.test(body), `${page}: carries the honeypot`);
        // Without the shared intake script the browser submits natively and the
        // visitor lands on a raw JSON response — exactly what QA caught once.
        check(/<script src="(\.\.\/)?js\/form_intake\.js"/.test(src), `${page}: loads js/form_intake.js`);
        check(/data-feedback="#[^"]+"/.test(tag) && new RegExp(`id="${(tag.match(/data-feedback="#([^"]+)"/) || [])[1]}"`).test(src),
            `${page}: its feedback region exists`);

        const names = new Set([...body.matchAll(/\sname="([^"]+)"/g)].map((x) => x[1].replace(/\[\]$/, '')));
        const fields = Object.keys(spec.fields);
        const missing = fields.filter((f) => !names.has(f));
        const extra = [...names].filter((n) => !fields.includes(n) && !IDENTITY.includes(n));
        check(missing.length === 0, `${page} (${type}): every field the server reads is on the form` + (missing.length ? ' -> ' + missing.join(', ') : ''));
        check(extra.length === 0, `${page} (${type}): nothing on the form is outside the schema` + (extra.length ? ' -> ' + extra.join(', ') : ''));
        check(/name="name"[^>]*required/.test(body) && /name="email"[^>]*required/.test(body), `${page} (${type}): name and email are required`);

        fields.forEach((f) => {
            const def = spec.fields[f];
            if (def.type === 'choice') {
                const sel = (body.match(new RegExp(`<select[^>]*name="${f}"[^>]*>([\\s\\S]*?)</select>`)) || []);
                const values = [...(sel[1] || '').matchAll(/<option value="([^"]*)"/g)].map((x) => x[1]).filter(Boolean);
                const keys = Object.keys(def.options);
                check(JSON.stringify([...values].sort()) === JSON.stringify([...keys].sort()),
                    `${page} (${type}.${f}): choice values match the server keys`);
                check(!!def.required === /\srequired/.test(sel[0] || ''), `${page} (${type}.${f}): required matches the server`);
            } else if (def.type === 'multi') {
                const values = [...body.matchAll(new RegExp(`name="${f}\\[\\]" value="([^"]+)"`, 'g'))].map((x) => x[1]);
                const keys = Object.keys(def.options);
                check(JSON.stringify([...values].sort()) === JSON.stringify([...keys].sort()),
                    `${page} (${type}.${f}): checkbox values match the server keys`);
            } else {
                const el = (body.match(new RegExp(`<(input|textarea)[^>]*name="${f}"[^>]*>`)) || [''])[0];
                check(!!def.required === /\srequired/.test(el), `${page} (${type}.${f}): required matches the server`);
                const max = (el.match(/maxlength="(\d+)"/) || [])[1];
                check(!max || Number(max) <= def.max, `${page} (${type}.${f}): the form never allows more than the server keeps`);
            }
        });
    });
});

Object.keys(schema).forEach((type) => check(used.has(type), `schema form "${type}" is used by a page`));

// The two persona pages exist and are reachable from the shared footer everywhere.
['pages/gaming.html', 'pages/property.html'].forEach((p) => {
    check(fs.existsSync(path.join(ROOT, p)), `${p} exists`);
    const route = require('./routes').ROUTE_OF[p];
    const missing = PAGES.filter((page) => !read(page).includes(`href="${route}"`));
    check(missing.length === 0, `${p} is linked from every page` + (missing.length ? ' -> missing on ' + missing.join(', ') : ''));
});

console.log(failures ? `\nFAILURES: ${failures}` : '\nALL PASS');
process.exit(failures ? 1 : 0);
