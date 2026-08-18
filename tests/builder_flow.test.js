/* Structural guards for the builder step gate and the homepage section flow.
 *
 *   node tests/builder_flow.test.js
 *
 * js/builder_flow.js is deliberately ignorant of both builders: a chapter says in
 * its own markup what "complete" means and where it continues to. That keeps one
 * file driving two instruments, but it moves the contract into HTML attributes,
 * where nothing would otherwise notice it breaking. A renamed section id, a
 * continue control pointed at the wrong chapter, a step number skipped while
 * inserting a section — each of those silently strands a visitor in a builder
 * they cannot leave, and none of them is a syntax error.
 *
 * So the contract is asserted here instead:
 *   - step numbers run 1..N with no gaps;
 *   - every chapter continues to exactly the next step;
 *   - a step group carries at most one continue control;
 *   - step 1 declares a requirement, a message and somewhere to send the focus,
 *     and the selectors it names actually exist on the page;
 *   - the visible outline lists every step once, in order;
 *   - nothing ships pre-hidden, so a visitor without JavaScript still reads the
 *     whole page;
 *   - builder_flow.js loads before the builder that depends on binding second.
 *
 * The homepage block guards the section rhythm BUILD_PLAN §2B requires — no two
 * adjacent chapters on the same surface, and no two adjacent graphite ones.
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

/* ------------------------------------------------------------------ builders */

const BUILDERS = [
    { page: 'pages/website_builder.html', next: 'wb-next', script: 'js/website_builder.js' },
    { page: 'pages/hospitality_builder.html', next: 'hb-next', script: 'js/hospitality_builder.js' },
];

/* Sections are flat in these pages, so "everything to the next </section>" is a
   sound way to read one chapter without a parser. */
function sectionBody(src, id) {
    const open = src.indexOf('<section id="' + id + '"');
    if (open === -1) return '';
    const close = src.indexOf('</section>', open);
    return src.slice(open, close === -1 ? src.length : close);
}

BUILDERS.forEach(({ page, next, script }) => {
    const name = path.basename(page);
    const src = read(page);

    const gated = [...src.matchAll(/<section id="([^"]+)"[^>]*?data-builder-step="(\d+)"/gs)]
        .map((m) => ({ id: m[1], step: Number(m[2]) }));

    check(gated.length > 0, name + ': the builder chapters are gated');

    const numbers = [...new Set(gated.map((s) => s.step))].sort((a, b) => a - b);
    const contiguous = numbers.every((n, i) => n === i + 1);
    check(contiguous, name + ': step numbers run 1..' + numbers.length + ' with no gaps');

    const stepOf = {};
    gated.forEach((s) => { stepOf[s.id] = s.step; });

    const controlRe = new RegExp('<a class="' + next + '[^"]*" href="#([^"]+)"', 'g');
    const allControls = [...src.matchAll(controlRe)].length;

    let owned = 0;
    gated.forEach(({ id, step }) => {
        const body = sectionBody(src, id);
        const found = [...body.matchAll(new RegExp('<a class="' + next + '[^"]*" href="#([^"]+)"', 'g'))];
        check(found.length <= 1, name + ': #' + id + ' carries at most one continue control');
        if (!found.length) return;
        owned += found.length;
        const target = found[0][1];
        check(target in stepOf, name + ': #' + id + ' continues to a gated chapter (#' + target + ')');
        if (target in stepOf) {
            check(stepOf[target] === step + 1,
                name + ': #' + id + ' (step ' + step + ') continues to step ' + (step + 1));
        }
    });
    check(owned === allControls, name + ': every continue control sits inside a gated chapter');

    // Step 1 is the only chapter with a hard requirement, and it must be complete.
    const first = gated.filter((s) => s.step === 1);
    check(first.length === 1, name + ': exactly one chapter is step 1');
    if (first.length === 1) {
        const tag = src.slice(src.indexOf('<section id="' + first[0].id + '"'));
        const open = tag.slice(0, tag.indexOf('>') + 1);
        const require = /data-step-require='([^']+)'/.exec(open);
        check(!!require, name + ': step 1 declares data-step-require');
        check(/data-step-missing="[^"]{40,}"/.test(open),
            name + ': step 1 declares a data-step-missing sentence worth reading');
        const focus = /data-step-focus="([^"]+)"/.exec(open);
        check(!!focus, name + ': step 1 declares data-step-focus');
        if (require) {
            require[1].split('|').forEach((selector) => {
                const sel = selector.trim();
                const host = /^\[([a-z0-9-]+)\]/.exec(sel);
                check(!!host, name + ': requirement starts at a data hook -> ' + sel);
                if (host) {
                    check(src.includes(host[1]),
                        name + ': requirement host [' + host[1] + '] exists in the markup');
                }
                // The builders mark a chosen option with aria-pressed, and nothing
                // else on these pages does. If that ever changes the gate silently
                // stops recognising a completed chapter.
                check(sel.includes('aria-pressed="true"'),
                    name + ': requirement reads the selection state -> ' + sel);
            });
        }
        if (focus) {
            const hook = /^\[([a-z0-9-]+)\]/.exec(focus[1]);
            check(!!hook && src.includes(hook[1]),
                name + ': the focus target host exists in the markup');
        }
    }

    // The outline is the visitor's answer to "what am I filling in".
    const outline = [...src.matchAll(/data-outline-for="(\d+)"/g)].map((m) => Number(m[1]));
    check(JSON.stringify(outline) === JSON.stringify(numbers),
        name + ': the outline lists every step once, in order');
    const states = [...src.matchAll(/data-outline-state/g)].length;
    check(states === outline.length, name + ': every outline entry carries a state label');

    // Hiding is a JavaScript-only behaviour: without it the page reads in full.
    const preHidden = [...src.matchAll(/<section[^>]*data-builder-step[^>]*>/gs)]
        .filter((m) => /\shidden(\s|>|=)/.test(m[0]));
    check(preHidden.length === 0, name + ': no chapter ships with a hidden attribute');

    // Registration order is what lets a blocked control stop the builder's handler.
    // Match the tag, not the filename: both files are named in prose comments too.
    const tagOf = (file) => src.indexOf('<script src="../' + file + '"');
    const flowAt = tagOf('js/builder_flow.js');
    const builderAt = tagOf(script);
    check(flowAt !== -1 && builderAt !== -1 && flowAt < builderAt,
        name + ': builder_flow.js is loaded before ' + path.basename(script));

    check(src.includes('css/builder_flow.css'), name + ': builder_flow.css is linked');
    check(src.includes('data-builder-flow'), name + ': the flow root is marked');
    check(src.includes('data-builder-start'), name + ': the gate carries a start control');

    // The gate is the whole point: no interactive chapter may precede it.
    const gateAt = src.indexOf('data-builder-start');
    const firstChapterAt = src.indexOf('data-builder-step');
    check(gateAt !== -1 && gateAt < firstChapterAt,
        name + ': the gate comes before the first interactive chapter');

    // The builder scripts must keep the gate repainted and must not auto-scroll a
    // page that is still gated.
    const js = read(script);
    check(js.includes('window.pmBuilderFlow.refresh()'),
        path.basename(script) + ': repaints the gate on every state change');
    check(js.includes('window.pmBuilderFlow.revealTarget'),
        path.basename(script) + ': opens a chapter before auto-scrolling to it');
    check(js.includes('!window.pmBuilderFlow.isStarted()'),
        path.basename(script) + ': does not auto-advance a builder still behind its gate');
    check(js.includes('firstIncomplete()') && js.includes('stopImmediatePropagation'),
        path.basename(script) + ': refuses a submission with an incomplete configuration');
});

/* ----------------------------------------------------------------- homepage */

const home = read('index.html');
const sections = [...home.matchAll(/<section id="([a-z-]+)" class="([^"]*)"/g)]
    .map((m) => ({ id: m[1], classes: m[2] }));

console.log('\nhomepage sections: ' + sections.map((s) => s.id).join(' → ') + '\n');

const surfaceOf = (classes) =>
    ['section--graphite', 'section--stone', 'section--ivory'].find((t) => classes.includes(t))
    || 'paper';

const surfaces = sections.map((s) => ({ id: s.id, surface: surfaceOf(s.classes) }));
const repeats = surfaces
    .slice(1)
    .map((s, i) => [surfaces[i], s])
    .filter(([a, b]) => a.surface === b.surface);

check(repeats.length === 0,
    'homepage: no two adjacent chapters share a surface'
    + (repeats.length ? ' -> ' + repeats.map(([a, b]) => a.id + '/' + b.id).join(', ') : ''));

check(!repeats.some(([a]) => a.surface === 'section--graphite'),
    'homepage: no two adjacent graphite chapters (BUILD_PLAN §2B)');

check(!home.includes('id="what-we-are"'),
    'homepage: the retired standalone understanding section is gone');

check(!/why-(grid|lead|note)/.test(home),
    'homepage: no markup still uses the retired why-band statement classes');

// The route band is now the page's plain-language explanation as well as its
// signpost list, so it has to carry both a statement and the links.
const routes = sectionBody(home, 'what-we-do');
check(/<h2 id="routes-title">/.test(routes), 'homepage: the route band still names itself');
check(/<p class="lede">/.test(routes), 'homepage: the route band carries the plain-language statement');
check((routes.match(/class="route[ "]/g) || []).length >= 5,
    'homepage: the route band still offers every route');
check(routes.includes('routes-note'), 'homepage: the route band offers a way out for "none of these"');

const rules = read('css/why_band.css').replace(/\/\*[\s\S]*?\*\//g, '');
check(!['.why-grid', '.why-lead', '.why-note'].some((dead) => rules.includes(dead)),
    'css: the retired why-band statement rules are gone');
check(rules.includes('.why-fact'), 'css: the why-band fact cards are intact');

// The hero's second action has to point somewhere that exists on this page.
check(/id="hero-learn-more"[^>]*href="#what-we-do"|href="#what-we-do"[^>]*id="hero-learn-more"/.test(home),
    'homepage: the hero’s second action opens the route band');

console.log('');
if (failures) {
    console.log('FAILURES: ' + failures);
    process.exit(1);
}
console.log('ALL PASS');
