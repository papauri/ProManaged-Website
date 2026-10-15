/* The clean-URL route table, read from .htaccess so the tests check the same rules
 * the server runs. Links in the markup are root-absolute (/gaming#request); this
 * turns one back into the file and fragment it lands on.
 *
 *   const { resolve, ROUTES, ALIASES } = require('./routes');
 *   resolve('/gaming#request')   // { file: 'pages/gaming.html', frag: 'request' }
 *   resolve('/nowhere')          // null
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const htaccess = fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8');

// "RewriteRule ^gaming$ pages/gaming.html [L]" — the clean address serves a file.
const ROUTES = { '/': 'index.html' };
for (const m of htaccess.matchAll(/^\s*RewriteRule \^([a-z-]+)\$ ([\w/.-]+\.html) \[L\]$/gm)) {
    ROUTES['/' + m[1]] = m[2];
}

// "RewriteRule ^gaming/request$ /gaming#request [R=301,NE,L]" — a form's own address.
const ALIASES = {};
for (const m of htaccess.matchAll(/^\s*RewriteRule \^([a-z/-]+)\$ (\/[a-z-]*#[\w-]+) \[R=301,NE,L\]$/gm)) {
    ALIASES['/' + m[1]] = m[2];
}

// The clean address each file is served at — the inverse of ROUTES.
const ROUTE_OF = {};
Object.keys(ROUTES).forEach((r) => { ROUTE_OF[ROUTES[r]] = r; });

function resolve(href) {
    const [p, frag] = href.split('#');
    if (ALIASES[p] && frag === undefined) return resolve(ALIASES[p]);
    const file = ROUTES[p];
    return file ? { file, frag: frag || '' } : null;
}

module.exports = { ROUTES, ALIASES, ROUTE_OF, resolve };
