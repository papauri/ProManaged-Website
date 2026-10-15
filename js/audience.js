/* audience.js — "What brings you here?"

   The site shows each visitor only what they came for. On the first visit a plain,
   full-viewport chooser asks one question — gamer, hotel owner, property owner,
   business software, a website, hardware, IT support, or everything — and every
   page then hides what that visitor did not ask about. A switch in the corner is
   always on screen, so the choice can be changed at any time.

   HOW CONTENT DECLARES WHO IT IS FOR. Nothing about any page lives in this file
   except copy. Markup opts in with attributes:

     data-aud="software website"   shown when the visitor's choice includes ANY of
                                   these tokens; shown to everyone in "everything"
                                   mode and with no JavaScript at all.
     data-aud-only="gaming"        the same match, but hidden in "everything" mode
                                   too — an extra that only makes sense once a
                                   visitor has said who they are (css/audience.css
                                   hides these when there is no choice).
     data-aud-copy="key"           text (and, for links, the href) replaced with the
                                   chosen persona's copy for that key, and restored
                                   when the choice changes back.
     <body data-aud-page="...">    which tokens a whole page serves; a visitor whose
                                   choice misses all of them gets a quiet notice
                                   rather than a page that silently ignores them.

   Tokens: software, website, hospitality, hardware, gaming, support, plus each
   persona's own id. The special token "all" matches no persona, so data-aud="all"
   means "only when the visitor has not narrowed the site".

   WHY IT IS IN <head>. Hiding is pure CSS keyed off html[data-pm-aud], and the rules
   are generated here from PERSONAS and injected before the body is parsed, so a
   returning visitor never sees the full page flash and then collapse. Everything
   that needs the DOM (copy, grids, forms, the chooser) runs at DOMContentLoaded —
   registered here, so it runs BEFORE js/main.js measures its motion groups and
   before the hero assembles.

   FAILURE IS VISIBLE, NEVER HIDDEN. Without JavaScript nothing is filtered. If
   storage is blocked the choice simply lasts for the page. If this file throws after
   the attribute is set, the attribute is removed again so a half-applied filter can
   never strand the visitor on a page with its content missing.

   PERSONAS is the only place the persona copy lives, and tests/audience.test.js
   checks every href in it resolves to a real page and fragment, and that the ids
   match the allow-list in php/http.php (the forms send the choice with an enquiry). */
(function (d, w) {
    'use strict';

    var KEY = 'pm-audience';
    var root = d.documentElement;

    // Resolve the site root from this script's own URL, so the same copy works from
    // index.html and from pages/*.html. Same technique as js/boot.js. Only assets
    // use it: page links are root-absolute clean URLs (/gaming#request), served by
    // the route table in .htaccess.
    var here = d.currentScript && d.currentScript.src;
    var BASE = here ? here.replace(/js\/audience\.js(?:[?#].*)?$/, '') : '';

    var CHECK = '<i class="fas fa-circle-check" aria-hidden="true"></i> ';

    /* ---------- The personas ----------
       label   — what the visitor reads on the chooser, in their own words.
       short   — what the always-visible switch says.
       tokens  — what this visitor is shown (their own id is added automatically).
       pillar  — which of Build / Source / Support answers them.
       cta     — the one action that matters most to them. Becomes the rail button,
                 the navigation panel's primary tile and the homepage's main CTAs.
       copy    — page copy keyed by data-aud-copy. Every claim here is one the site
                 already makes somewhere and PROJECT_CREDIBILITY allows: no metrics,
                 no invented outcomes. */
    var PERSONAS = [
        {
            id: 'gamer',
            label: 'I’m a gamer',
            short: 'Gamer',
            desc: 'Gaming PCs, consoles and gear that will not ship to you.',
            icon: 'fa-gamepad',
            tokens: ['gaming'],
            pillar: 'Source',
            home: '/gaming',
            formNote: 'Gaming gear? The gaming request asks for your platform and where you are, so we can come back with one total straight away.',
            lead: 'Gaming gear, found and bought for you. Everything else is tucked away.',
            cta: {
                text: 'Request gaming gear', short: 'Request gear',
                href: '/gaming#request',
                desc: 'Name the gear and your budget. We come back with options and one total, ready to collect or brought to you.',
                cue: 'Send a request'
            },
            proof: ['Gaming PCs &amp; consoles', 'Monitors, headsets &amp; controllers', 'One total price, before you pay'],
            copy: {
                'home-hero-eyebrow': 'Gaming gear',
                'home-hero-title': 'Gaming gear, sourced for you.',
                'home-hero-sub': 'Gaming PCs, consoles, monitors and headsets — found and bought for you, ready to collect locally or brought to your doorstep.',
                'home-hero-figure': 'One',
                'home-hero-figure-label': 'person who finds it, orders it and brings it in — and answers when you ask where it is.',
                'home-routes-title': 'Straight to the gear.',
                'home-routes-lede': 'Gaming PCs, consoles and the kit around them, bought from trusted suppliers and brought in — including the things that sell out everywhere first.',
                'route-equipment-link': { href: '/gaming#gear' },
                'route-ask-link': { href: '/gaming#request' },
                'home-card-source': { target: '/gaming#request' },
                'nav-source-tile': {
                    href: '/gaming',
                    html: '<span class="nav-tile-index">Your page</span>'
                        + '<span class="nav-tile-label">Gaming gear</span>'
                        + '<span class="nav-tile-desc">PCs, consoles, monitors and headsets \u2014 one total, ready to collect or brought to you.</span>'
                },
                'route-equipment-label': 'Gaming gear',
                'route-equipment-desc': 'PCs, consoles, controllers and headsets.',
                'home-desire-eyebrow': 'The day it arrives',
                'home-desire-title': 'The box arrives, and it is the right one.',
                'home-desire-lede': 'The spec was checked against what you actually play. The total was agreed before you paid. Nobody had to argue with a courier — and if anything looks wrong, you message the person who placed the order.',
                'source-hero-title': 'You pick the rig. We handle everything after that.',
                'source-hero-sub': 'Gaming PCs, consoles, monitors and headsets — found and bought for you, including the things nobody stocks locally.',
                'source-cat-title': 'Everything a setup needs.',
                'source-cat-lede': 'Rigs, consoles, screens and the gear around them — consumer and enthusiast kit from trusted suppliers. If what you want is not listed, ask anyway; the answer is usually yes.'
            }
        },
        {
            id: 'hotel',
            label: 'I run a hotel or lodge',
            short: 'Hotel or lodge',
            desc: 'A booking and room system, built from real hotel work.',
            icon: 'fa-hotel',
            tokens: ['hospitality', 'website'],
            pillar: 'Build',
            home: '/hospitality',
            formNote: 'Running a hotel or lodge? The hotel system builder asks how your property works and sends us your outline \u2014 seven short steps.',
            lead: 'Hotel and lodge systems, and the website guests book from. Everything else is tucked away.',
            cta: {
                text: 'Design your hotel system', short: 'Design your system',
                href: '/hospitality#begin',
                desc: 'Seven short steps, about four minutes. What comes back is an outline of your system, not a price.',
                cue: 'Start the builder'
            },
            proof: ['Running at two hotels in Malawi', 'Guests book direct from your site', 'Rooms and rates from one screen'],
            copy: {
                'home-hero-eyebrow': 'Hotels &amp; lodges',
                'home-hero-title': 'Hotel software, built from real hotels.',
                'home-hero-sub': 'Bookings, rooms and guests in one system — plus the website guests book from.',
                'home-hero-figure': 'Two',
                'home-hero-figure-label': 'hotels already run on a system we built — the same build, delivered twice.',
                'home-routes-title': 'Where to start.',
                'home-routes-lede': 'Shape the system your property needs, see the hotels already running on one, or start with the website guests will book from.',
                'home-desire-eyebrow': 'The working day, after',
                'home-desire-title': 'Every booking lands in one place.',
                'home-desire-lede': 'No paper diary, and no room promised twice. The desk sees room status without walking the property, and guests book straight from your site against live availability.'
            }
        },
        {
            id: 'property',
            label: 'I own property',
            short: 'Property owner',
            desc: 'A website for your property, and the system behind it.',
            icon: 'fa-building',
            tokens: ['software', 'website', 'hospitality'],
            pillar: 'Build',
            home: '/property',
            formNote: 'A property owner? The property form asks what kind of property it is and what you want it to do, so the first reply is already useful.',
            lead: 'Websites and booking systems for the property you own. Everything else is tucked away.',
            cta: {
                text: 'Tell us about your property', short: 'Your property',
                href: '/property#request',
                desc: 'Describe the property and what you want it to do. We come back with what it actually needs.',
                cue: 'Describe it'
            },
            proof: ['A website for your property', 'Bookings and availability online', 'Built from real hotel systems'],
            copy: {
                'home-card-build': { target: '/property#request' },
                'nav-build-tile': {
                    href: '/property',
                    html: '<span class="nav-tile-index">Your page</span>'
                        + '<span class="nav-tile-label">Your property</span>'
                        + '<span class="nav-tile-desc">A website, online bookings and a system for your records.</span>'
                },
                'home-hero-eyebrow': 'Property owners',
                'home-hero-title': 'Your property, online and organised.',
                'home-hero-sub': 'A website for your property and a system for bookings and records — built around how you actually run it.',
                'home-hero-figure': 'One',
                'home-hero-figure-label': 'system for your listings, bookings and records — scoped to the property you actually have.',
                'home-routes-title': 'Pick your starting point.',
                'home-routes-lede': 'A website for your property, a booking system like the ones running at two hotels, or software for the records you keep by hand today.',
                'home-desire-eyebrow': 'The working day, after',
                'home-desire-title': 'The enquiry becomes a booking without a phone call.',
                'home-desire-lede': 'Guests see what is free and book it themselves. Your records live in one system instead of a notebook and three chats. When something does look wrong, one person already knows about it.'
            }
        },
        {
            id: 'business',
            label: 'I need software for my business',
            short: 'Business software',
            desc: 'Booking systems, internal tools, the thing the spreadsheet became.',
            icon: 'fa-laptop-code',
            tokens: ['software', 'website'],
            pillar: 'Build',
            home: '/software',
            formNote: 'Software for your business? The software brief asks what you use today and what keeps going wrong \u2014 the start of a real scope.',
            lead: 'Software and websites for your business. Everything else is tucked away.',
            cta: {
                text: 'Tell us what to build', short: 'Start a project',
                href: '/software#brief',
                desc: 'Bring us the problem. We come back with a scope, a timeline and an honest answer.',
                cue: 'Describe the problem'
            },
            proof: ['Booking systems &amp; internal tools', 'Customer-facing web apps', 'Websites when that is the right answer'],
            copy: {
                'home-hero-eyebrow': 'Software for your business',
                'home-hero-title': 'Software your business runs on.',
                'home-hero-sub': 'Booking systems, internal tools and customer-facing apps — the thing the spreadsheet became.',
                'home-hero-figure': 'Four',
                'home-hero-figure-label': 'steps from first conversation to launch, with working previews at every one.',
                'home-routes-title': 'Software, scoped to the problem.',
                'home-routes-lede': 'Start from what you are trying to fix, see systems we have already delivered, or design a website first.'
            }
        },
        {
            id: 'website',
            label: 'I need a website',
            short: 'Website',
            desc: 'Design it in a few minutes and see what it would take.',
            icon: 'fa-window-maximize',
            tokens: ['website'],
            pillar: 'Build',
            home: '/websites',
            formNote: 'Need a website? The website builder shows you the shape of it in about three minutes, and sends us your outline at the end.',
            lead: 'Websites, designed with you and built by us. Everything else is tucked away.',
            cta: {
                text: 'Design your website', short: 'Design your site',
                href: '/websites#begin',
                desc: 'Seven short steps, about three minutes. Nothing asks for your contact details until the end.',
                cue: 'Start the builder'
            },
            proof: ['About three minutes to design', 'No contact details until the end', 'Built on work we have delivered'],
            copy: {
                'home-hero-eyebrow': 'Websites',
                'home-hero-title': 'A website that does the job.',
                'home-hero-sub': 'Tell us what it has to do and see the shape of it — before anyone quotes you.',
                'home-hero-figure': 'Seven',
                'home-hero-figure-label': 'short steps to an outline of your site — nothing asks for your contact details until the last one.',
                'home-routes-title': 'Start with the shape of it.',
                'home-routes-lede': 'Design the site yourself in a few minutes, or look at sites we have already delivered first.',
                'home-desire-eyebrow': 'The working day, after',
                'home-desire-title': 'The site answers what you used to answer by phone.',
                'home-desire-lede': 'Opening hours, prices and directions answered before anyone calls. Enquiries and bookings arrive in one place. And when something needs changing, you change it yourself — or message the person who built it.'
            }
        },
        {
            id: 'hardware',
            label: 'I’m looking for hardware',
            short: 'Hardware',
            desc: 'Laptops, desktops, monitors and accessories, sourced for you.',
            icon: 'fa-boxes-stacked',
            tokens: ['hardware'],
            pillar: 'Source',
            home: '/hardware',
            formNote: 'Looking for hardware? The equipment request asks for quantity, budget and destination, so we can quote a total straight away.',
            lead: 'Computers and equipment, found and bought for you. Everything else is tucked away.',
            cta: {
                text: 'Request equipment', short: 'Request equipment',
                href: '/hardware#contact',
                desc: 'Include your budget and where it needs to go. We come back with options and a total price.',
                cue: 'Send a request'
            },
            proof: ['Laptops, desktops &amp; monitors', 'One total price, before you pay', 'Pay in the currency you hold'],
            copy: {
                'home-hero-eyebrow': 'Computers &amp; equipment',
                'home-hero-title': 'The right equipment, sourced for you.',
                'home-hero-sub': 'Laptops, desktops, monitors and accessories — including the things nobody stocks locally.',
                'home-hero-figure': 'One',
                'home-hero-figure-label': 'total for hardware, freight and handling — agreed before you commit, not discovered afterwards.',
                'home-routes-title': 'Straight to the equipment.',
                'home-routes-lede': 'See what we source, or name the thing you need and let us come back with a total.',
                'home-desire-eyebrow': 'The day it arrives',
                'home-desire-title': 'It arrives ready for the job it was bought for.',
                'home-desire-lede': 'Specified against what you actually do, ordered from trusted suppliers, priced as one number before you paid. If a courier goes quiet, chasing it is our problem, not yours.'
            }
        },
        {
            id: 'support',
            label: 'Something keeps breaking',
            short: 'IT support',
            desc: 'IT support from a person who knows your setup.',
            icon: 'fa-life-ring',
            tokens: ['support'],
            pillar: 'Support',
            home: '/support',
            formNote: 'Something broken? The support form asks which device and how urgent it is, so we can usually come back with a time for a call.',
            lead: 'Everyday IT support from a person who stays with the problem. Everything else is tucked away.',
            cta: {
                text: 'Describe the problem', short: 'Get help',
                href: '/support#get-help',
                desc: 'Say what it is doing in whatever words you have. Working out what is wrong is the job.',
                cue: 'Describe it'
            },
            proof: ['Device setup &amp; fixes', 'Passwords, email &amp; files', 'Backups &amp; everyday security'],
            copy: {
                'home-hero-eyebrow': 'IT support',
                'home-hero-title': 'Someone to call when it breaks.',
                'home-hero-sub': 'Fixes, setups and a person on the phone when it breaks — mostly sorted over one call.',
                'home-hero-figure': 'Seven',
                'home-hero-figure-label': 'kinds of everyday problem we take on — and one person who stays with yours until it is closed.',
                'home-routes-title': 'Tell us what is broken.',
                'home-routes-lede': 'See the problems we take on every week, or book a call and talk it through with the person who will fix it.',
                'home-desire-eyebrow': 'The working day, after',
                'home-desire-title': 'It just works on Monday.',
                'home-desire-lede': 'The laptop signs in, the email syncs, the backup runs on its own. And when something does break, you call someone who already knows your setup — and get a note of what changed.'
            }
        }
    ];

    var EVERYTHING = {
        id: 'all',
        label: 'Show me everything',
        short: 'Everything',
        desc: 'The whole studio — build, source and support.',
        icon: 'fa-border-all',
        tokens: [],
        copy: {}
    };

    var byId = { all: EVERYTHING };
    PERSONAS.forEach(function (p) {
        p.tokens = [p.id].concat(p.tokens);
        byId[p.id] = p;

        // Copy every persona shares the SHAPE of, derived rather than hand-written
        // seven times: the one action that matters to them, and the capability
        // chapter now carrying a single pillar instead of three.
        var c = p.copy;
        var cta = { html: p.cta.text, href: p.cta.href };
        c['rail-cta'] = { html: p.cta.short, href: p.cta.href };
        c['home-hero-primary'] = cta;
        c['home-desire-cta'] = cta;
        c['home-contact-cta'] = cta;
        if (p.pillar === 'Source') c['source-hero-primary'] = cta;
        c['home-hero-proof'] = p.proof.map(function (t) { return '<span>' + CHECK + t + '</span>'; }).join('');
        c['home-services-title'] = p.pillar + ', in detail.';
        c['home-services-lede'] = 'What it covers, and the problem it is usually bought to solve. Ask about anything else &mdash; it is the same team either way.';
        c['gs-direct'] = '<span class="persona-direct-kicker">Your request form</span>'
            + '<p>' + p.formNote + '</p>'
            + '<a class="btn secondary" href="' + p.cta.href + '">' + p.cta.text + '</a>';
        c['nav-lead-eyebrow'] = 'Showing: ' + p.short;
        c['nav-lead-text'] = p.lead;
        c['nav-primary'] = {
            href: p.cta.href,
            html: '<span class="nav-tile-index">For you</span>'
                + '<span class="nav-tile-label">' + p.cta.text + '</span>'
                + '<span class="nav-tile-desc">' + p.cta.desc + '</span>'
                + '<span class="nav-tile-cue" aria-hidden="true">' + p.cta.cue + '</span>'
        };
    });

    /* ---------- State ---------- */
    var readStored = function () {
        try { return w.localStorage.getItem(KEY); } catch (e) { return null; }
    };
    var store = function (id) {
        try { w.localStorage.setItem(KEY, id); } catch (e) { /* private mode: lasts for the page */ }
    };

    // ?for=gamer — a shareable link straight into one view. Stored, so the rest of
    // the visit stays tailored.
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(w.location.search).get('for'); } catch (e) { fromUrl = null; }
    var stored = readStored();
    // The visitor's own page: /gaming IS the gamer's page. Landing on one without
    // having chosen yet (a shared link, a search result, the Facebook page) counts
    // as the choice, so the chooser does not ask a question the URL already answered.
    var herePath = (w.location.pathname || '/').replace(/\/+$/, '') || '/';
    var fromPath = null;
    PERSONAS.forEach(function (p) { if (p.home === herePath) fromPath = p.id; });
    var current = byId[fromUrl] ? fromUrl : (byId[stored] ? stored : (fromPath || null));
    if (byId[fromUrl] && fromUrl !== stored) store(fromUrl);
    else if (current === fromPath && fromPath && !byId[stored]) store(fromPath);
    var firstVisit = current === null;

    var setRoot = function (id) {
        if (id && id !== 'all') root.setAttribute('data-pm-aud', id);
        else root.removeAttribute('data-pm-aud');
    };

    /* ---------- The hiding rules, generated before first paint ----------
       One rule per persona and attribute. :not() chains express "matches none of
       my tokens", which is the only way CSS can intersect two token lists. */
    try {
        var rules = [];
        PERSONAS.forEach(function (p) {
            var misses = p.tokens.map(function (t) { return ':not([data-aud~="' + t + '"])'; }).join('');
            var missesOnly = p.tokens.map(function (t) { return ':not([data-aud-only~="' + t + '"])'; }).join('');
            rules.push('html[data-pm-aud="' + p.id + '"] [data-aud]' + misses + '{display:none!important}');
            rules.push('html[data-pm-aud="' + p.id + '"] [data-aud-only]' + missesOnly + '{display:none!important}');
        });
        var style = d.createElement('style');
        style.id = 'pm-aud-rules';
        style.textContent = rules.join('\n');
        (d.head || root).appendChild(style);
        setRoot(current);
    } catch (err) {
        root.removeAttribute('data-pm-aud');
        return;
    }

    /* ---------- Matching ---------- */
    var tokensOf = function (el, attr) {
        return (el.getAttribute(attr) || '').split(/\s+/).filter(Boolean);
    };
    var meets = function (list, p) {
        for (var i = 0; i < list.length; i++) {
            if (p.tokens.indexOf(list[i]) !== -1) return true;
        }
        return false;
    };
    // Mirrors the CSS above exactly, for the work CSS cannot do.
    var shows = function (el, p) {
        if (el.hasAttribute('data-aud') && p.id !== 'all' && !meets(tokensOf(el, 'data-aud'), p)) return false;
        if (el.hasAttribute('data-aud-only') && (p.id === 'all' || !meets(tokensOf(el, 'data-aud-only'), p))) return false;
        return true;
    };
    var showsWithAncestors = function (el, p) {
        for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
            if (!shows(n, p)) return false;
        }
        return true;
    };
    var personaOf = function (id) { return byId[id] || EVERYTHING; };
    var esc = function (s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    };

    /* ---------- Copy ----------
       The original markup is stashed on first touch and restored whenever the active
       persona has nothing for that key, so switching back to "everything" returns the
       page to exactly what shipped. Copy is static strings from this file, never input. */
    var swapCopy = function (p) {
        d.querySelectorAll('[data-aud-copy]').forEach(function (el) {
            if (!el._pmAud) {
                el._pmAud = { html: el.innerHTML, href: el.getAttribute('href'), target: el.getAttribute('data-target') };
            }
            var orig = el._pmAud;
            var v = p.copy[el.getAttribute('data-aud-copy')];
            var html = null;
            var href = orig.href;
            var target = orig.target;
            if (typeof v === 'string') {
                html = v;
            } else if (v) {
                if (typeof v.html === 'string') html = v.html;
                if (v.href) href = v.href;
                if (v.target) target = v.target;
            }
            // Markup is only ever written when this key owns it: replaced when the
            // persona supplies html, restored once if it was replaced before. A key
            // that only retargets a link (a route, a card) never touches its inner
            // markup, because that markup holds other keys' elements.
            if (html !== null) {
                if (el.innerHTML !== html) el.innerHTML = html;
                orig.swapped = true;
            } else if (orig.swapped) {
                el.innerHTML = orig.html;
                orig.swapped = false;
            }
            if (href !== null && el.getAttribute('href') !== href) el.setAttribute('href', href);
            if (target !== null && el.getAttribute('data-target') !== target) el.setAttribute('data-target', target);
        });
    };

    /* ---------- Select options ----------
       A hidden <option> is still offered by iOS Safari, so options are detached and
       re-attached rather than styled away. The default (what form.reset() returns
       to) follows the visible set, so a successful submit cannot reset the select
       onto an option this visitor cannot see. */
    var filterOptions = function (p) {
        d.querySelectorAll('select').forEach(function (sel) {
            if (!sel._pmAud) {
                if (!sel.querySelector('option[data-aud], option[data-aud-only]')) return;
                var all = [].slice.call(sel.options);
                var def = sel.querySelector('option[selected]') || all[0];
                sel._pmAud = { all: all, def: def };
            }
            var state = sel._pmAud;
            var keep = state.all.filter(function (o) { return shows(o, p); });
            if (!keep.length) keep = state.all;
            var value = sel.value;
            while (sel.options.length) sel.remove(0);
            keep.forEach(function (o) { sel.add(o); });
            var def = keep.indexOf(state.def) !== -1 ? state.def : keep[0];
            keep.forEach(function (o) { o.defaultSelected = (o === def); });
            var still = keep.filter(function (o) { return o.value === value; })[0];
            sel.value = (still || def).value;
        });
    };

    /* ---------- Bento recomposition ----------
       A bento row is composed for the cards it was designed with. Remove two and the
       rest sit in the wrong spans with holes beside them. When any card in a grid is
       filtered out, the visible ones are re-dealt into rows that still sum to twelve
       — wide/narrow, narrow/wide — while a full-width card keeps its full row. When
       nothing is filtered the attributes come off and the designed layout returns. */
    var dealSpans = function (n) {
        var cycle = [7, 5, 5, 7];
        var out = [];
        for (var i = 0; i < n; i++) out.push(cycle[i % 4]);
        if (n % 2 === 1) out[n - 1] = 12;
        return out;
    };
    var recompose = function (p) {
        d.querySelectorAll('.grid').forEach(function (grid) {
            var kids = [].filter.call(grid.children, function (el) { return el.classList.contains('block'); });
            var tagged = kids.some(function (el) { return el.hasAttribute('data-aud') || el.hasAttribute('data-aud-only'); });
            if (!tagged) return;
            kids.forEach(function (el) { el.removeAttribute('data-aud-span'); });
            var vis = kids.filter(function (el) { return shows(el, p); });
            if (vis.length === kids.length) {
                grid.removeAttribute('data-aud-recomposed');
                return;
            }
            grid.setAttribute('data-aud-recomposed', '');
            var run = [];
            var flush = function () {
                var spans = dealSpans(run.length);
                run.forEach(function (el, i) { el.setAttribute('data-aud-span', String(spans[i])); });
                run = [];
            };
            vis.forEach(function (el) {
                if (el.classList.contains('block--12')) {
                    flush();
                    el.setAttribute('data-aud-span', '12');
                } else {
                    run.push(el);
                }
            });
            flush();
        });

        // The homepage route band is not a .block grid and carries persona-only
        // routes, so it is always dealt: its own CSS counts siblings with
        // :nth-child, which counts hidden routes too.
        d.querySelectorAll('.routes-grid').forEach(function (grid) {
            var vis = [].filter.call(grid.children, function (el) { return shows(el, p); });
            var n = vis.length;
            vis.forEach(function (el, i) {
                var wide = n === 1 ? 12 : n === 2 || n === 4 ? 6 : n === 3 ? 4 : (i < 2 ? 6 : 4);
                var mid = (n % 2 === 1 && i === n - 1) ? 12 : 6;
                el.setAttribute('data-aud-span', String(wide));
                el.setAttribute('data-aud-span-md', String(mid));
            });
        });
    };

    // Small containers whose layout depends on how many children survive (the hero
    // fragment pair, for instance) read this rather than counting with :nth-child.
    var countChildren = function (p) {
        var parents = [];
        d.querySelectorAll('[data-aud], [data-aud-only]').forEach(function (el) {
            var parent = el.parentElement;
            if (parent && parents.indexOf(parent) === -1) parents.push(parent);
        });
        parents.forEach(function (parent) {
            var n = [].filter.call(parent.children, function (el) { return shows(el, p); }).length;
            parent.setAttribute('data-aud-count', String(n));
        });
    };

    /* ---------- Surface rhythm ----------
       BUILD_PLAN §2B: no two adjacent chapters on the same surface. Every page is
       composed to alternate, but hiding a chapter can butt two ivory (or two stone)
       chapters together. The later one is re-surfaced to a light surface neither
       neighbour uses. Graphite is never introduced or removed here — its text is
       inked for dark — and tagging is kept such that no persona ever stacks two
       graphite chapters (asserted by tests/audience.test.js). */
    var SURFACE_CLASSES = ['aud-surface--paper', 'aud-surface--ivory', 'aud-surface--stone'];
    var naturalSurface = function (el) {
        if (el.classList.contains('section--graphite') || el.classList.contains('hero')) return 'graphite';
        if (el.classList.contains('section--stone')) return 'stone';
        if (el.classList.contains('section--ivory')) return 'ivory';
        return 'paper';
    };
    var rhythm = function (p) {
        var chapters = [].filter.call(d.querySelectorAll('section.section, section.hero'), function (el) {
            return !el.parentElement.closest('section');
        });
        chapters.forEach(function (el) { el.classList.remove.apply(el.classList, SURFACE_CLASSES); });
        var vis = chapters.filter(function (el) { return showsWithAncestors(el, p); });
        var prev = null;
        vis.forEach(function (el, i) {
            var s = naturalSurface(el);
            if (prev && s === prev && s !== 'graphite') {
                var next = vis[i + 1] ? naturalSurface(vis[i + 1]) : null;
                var options = ['ivory', 'stone', 'paper'].filter(function (c) { return c !== prev; });
                var pick = options.filter(function (c) { return c !== next; })[0] || options[0];
                el.classList.add('aud-surface--' + pick);
                s = pick;
            }
            prev = s;
        });
    };

    /* ---------- Forms ----------
       The choice travels with an enquiry so the internal notification says who is
       writing. Optional and allow-listed server-side (pm_audience_label() in
       php/http.php); "everything" sends nothing. */
    var tagForms = function (p) {
        d.querySelectorAll('#contact-form, #booking-form, #enquiry-form').forEach(function (form) {
            var input = form.querySelector('input[name="audience"]');
            if (p.id === 'all') {
                if (input) input.parentNode.removeChild(input);
                return;
            }
            if (!input) {
                input = d.createElement('input');
                input.type = 'hidden';
                input.name = 'audience';
                form.appendChild(input);
            }
            input.value = p.id;
        });
        // And which page it was sent from — the clean URL, so the notification
        // reads "/gaming" and links straight back. Allow-listed server-side too
        // (pm_page_label() in php/http.php).
        d.querySelectorAll('form.intake').forEach(function (form) {
            var page = form.querySelector('input[name="page"]');
            if (!page) {
                page = d.createElement('input');
                page.type = 'hidden';
                page.name = 'page';
                form.appendChild(page);
            }
            page.value = herePath;
        });
    };

    /* ---------- The always-visible switch ---------- */
    var pill = null;
    var buildPill = function () {
        pill = d.createElement('button');
        pill.type = 'button';
        pill.className = 'aud-pill';
        pill.setAttribute('aria-haspopup', 'dialog');
        pill.addEventListener('click', function () { openChooser(pill); });
        d.body.appendChild(pill);
    };
    var updatePill = function (p) {
        if (!pill) return;
        pill.innerHTML =
            '<span class="aud-pill-mark" aria-hidden="true"><i class="fas ' + p.icon + '"></i></span>' +
            '<span class="aud-pill-text"><span class="aud-pill-kicker">Showing</span>' +
            '<span class="aud-pill-label">' + esc(p.short) + '</span></span>' +
            '<span class="aud-pill-cue">Change</span>';
        pill.setAttribute('aria-label', 'Showing content for: ' + p.short + '. Change what you see');
        pill.setAttribute('data-cursor-label', 'Change what you see');
    };

    // The same switch inside the navigation panel, beside the lead, so the panel —
    // which now lists only this visitor's capability — says why.
    var navSwitch = null;
    var buildNavSwitch = function () {
        var lead = d.querySelector('.nav-panel-lead');
        if (!lead) return;
        navSwitch = d.createElement('button');
        navSwitch.type = 'button';
        navSwitch.className = 'aud-nav-switch';
        navSwitch.setAttribute('aria-haspopup', 'dialog');
        navSwitch.addEventListener('click', function () {
            // Close the panel through its own control so its scroll lock, aria state
            // and focus restoration all run, then open the chooser on top.
            var close = d.getElementById('nav-close');
            if (close) close.click();
            w.setTimeout(function () { openChooser(d.getElementById('nav-trigger')); }, 0);
        });
        lead.parentNode.insertBefore(navSwitch, lead.nextSibling);
    };
    var updateNavSwitch = function (p) {
        if (!navSwitch) return;
        navSwitch.innerHTML = p.id === 'all'
            ? '<i class="fas fa-sliders" aria-hidden="true"></i> Show only what I need'
            : '<i class="fas fa-sliders" aria-hidden="true"></i> Not a ' + esc(p.short.toLowerCase()) + '? Change what you see';
    };

    /* ---------- Off-topic page notice ----------
       A visitor can still reach a page outside their choice — a shared link, a search
       result. The page is shown in full (never blocked), with a quiet way back. */
    var notice = null;
    var updateNotice = function (p) {
        var page = d.body && d.body.getAttribute('data-aud-page');
        var off = page && p.id !== 'all' && !meets(page.split(/\s+/), p);
        if (!off) {
            if (notice) { notice.parentNode.removeChild(notice); notice = null; }
            return;
        }
        if (!notice) {
            notice = d.createElement('aside');
            notice.className = 'aud-notice';
            notice.setAttribute('aria-label', 'This page is outside what you chose');
            // In the flow of the hero, above the eyebrow, where it is read first and
            // covers nothing. A page without a hero statement gets the floating
            // version above the switch instead.
            var statement = d.querySelector('.hero-statement');
            if (statement) {
                notice.classList.add('aud-notice--inline');
                statement.insertBefore(notice, statement.firstChild);
            } else {
                d.body.appendChild(notice);
            }
        }
        notice.innerHTML =
            '<p class="aud-notice-text">This page is outside <b>' + esc(p.short) + '</b>, so nothing on it is filtered.</p>' +
            '<div class="aud-notice-actions">' +
            '<a class="aud-notice-link" href="' + (p.home || '/') + '">Go to your page</a>' +
            '<button type="button" class="aud-notice-link" data-aud-act="all">Show everything</button>' +
            '<button type="button" class="aud-notice-close" data-aud-act="dismiss" aria-label="Dismiss">&times;</button>' +
            '</div>';
        notice.querySelector('[data-aud-act="all"]').addEventListener('click', function () { choose('all'); });
        notice.querySelector('[data-aud-act="dismiss"]').addEventListener('click', function () {
            notice.parentNode.removeChild(notice);
            notice = null;
        });
    };

    var status = null;
    var announce = function (text) {
        if (!status) {
            status = d.createElement('p');
            status.className = 'visually-hidden';
            status.setAttribute('role', 'status');
            status.setAttribute('aria-live', 'polite');
            d.body.appendChild(status);
        }
        status.textContent = '';
        w.setTimeout(function () { status.textContent = text; }, 60);
    };

    /* ---------- Apply ----------
       Every step reads the same `shows()`, so the copy, the grids, the forms and the
       CSS can never disagree about what is on the page. */
    var apply = function (id) {
        current = id;
        var p = personaOf(id);
        setRoot(id);
        swapCopy(p);
        filterOptions(p);
        recompose(p);
        countChildren(p);
        rhythm(p);
        tagForms(p);
        updatePill(p);
        updateNavSwitch(p);
        updateNotice(p);
    };

    var choose = function (id) {
        if (!byId[id]) id = 'all';
        var changed = id !== current;
        store(id);
        apply(id);
        if (changed) {
            // The page above the fold may have just changed shape. Start the visitor
            // at the top of the re-arranged page rather than mid-way down a chapter
            // that is no longer the one they were reading.
            var docEl = d.documentElement;
            docEl.style.scrollBehavior = 'auto';
            w.scrollTo(0, 0);
            docEl.style.removeProperty('scroll-behavior');
            // Pinned stepper, nav surface flag and the rest re-measure on resize.
            try { w.dispatchEvent(new Event('resize')); } catch (e) { /* very old engines */ }
        }
        var p = personaOf(id);
        announce(id === 'all'
            ? 'Showing everything.'
            : 'Showing only what is relevant to: ' + p.short + '.');
    };

    /* ---------- The chooser ---------- */
    var chooser = null;
    var opener = null;
    var inerted = [];
    var closing = 0;

    var optionHtml = function (p, i, isAll) {
        return '<li class="aud-opt-wrap' + (isAll ? ' aud-opt-wrap--all' : '') + '" style="--i:' + i + '">' +
            '<button type="button" class="aud-opt' + (isAll ? ' aud-opt--all' : '') + '" data-aud-pick="' + p.id + '">' +
            '<span class="aud-opt-mark" aria-hidden="true"><i class="fas ' + p.icon + '"></i></span>' +
            '<span class="aud-opt-body">' +
            '<span class="aud-opt-label">' + esc(p.label) + '</span>' +
            '<span class="aud-opt-desc">' + esc(p.desc) + '</span>' +
            '</span>' +
            '<span class="aud-opt-current">Current</span>' +
            '<span class="aud-opt-cue" aria-hidden="true"></span>' +
            '</button></li>';
    };

    var buildChooser = function () {
        chooser = d.createElement('div');
        chooser.className = 'aud';
        chooser.id = 'pm-aud';
        chooser.setAttribute('role', 'dialog');
        chooser.setAttribute('aria-modal', 'true');
        chooser.setAttribute('aria-labelledby', 'pm-aud-title');
        chooser.setAttribute('aria-describedby', 'pm-aud-lede');
        var opts = PERSONAS.map(function (p, i) { return optionHtml(p, i, false); }).join('')
            + optionHtml(EVERYTHING, PERSONAS.length, true);
        chooser.innerHTML =
            '<div class="aud-scroll"><div class="aud-rail">' +
            '<div class="aud-top">' +
            '<span class="aud-brand"><img src="' + BASE + 'images/icon.png" alt="" width="28" height="28">ProManaged IT</span>' +
            '<button type="button" class="aud-close" aria-label="Close and keep the current view"><span></span><span></span></button>' +
            '</div>' +
            '<div class="aud-head">' +
            '<span class="aud-eyebrow">Before you scroll</span>' +
            '<h2 class="aud-title" id="pm-aud-title" tabindex="-1">What brings you here?</h2>' +
            '<p class="aud-lede" id="pm-aud-lede">Pick the one closest to you and the site shows only what is relevant. You can change it any time from the switch in the corner.</p>' +
            '</div>' +
            '<ul class="aud-grid" role="list">' + opts + '</ul>' +
            '<p class="aud-foot"><i class="fas fa-lock" aria-hidden="true"></i> Remembered on this device only. Nothing is sent anywhere.</p>' +
            '</div></div>';

        chooser.addEventListener('click', function (e) {
            var pick = e.target.closest('[data-aud-pick]');
            if (pick) {
                var id = pick.getAttribute('data-aud-pick');
                choose(id);
                // A pick is a destination: "I'm a gamer" goes to /gaming. Picking
                // "everything", or the page already being theirs, stays put.
                var home = byId[id] && byId[id].home;
                if (home && home !== herePath) {
                    w.location.assign(home);
                    return;
                }
                closeChooser();
                return;
            }
            if (e.target.closest('.aud-close')) closeChooser();
        });

        chooser.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                // Dismissing the very first ask is an answer too: "everything".
                // Stored, so the question is not asked again on every page.
                if (current === null) choose('all');
                closeChooser();
                return;
            }
            if (e.key !== 'Tab') return;
            var items = [].filter.call(chooser.querySelectorAll('button'), function (b) {
                return b.offsetParent !== null;
            });
            if (!items.length) return;
            var first = items[0];
            var last = items[items.length - 1];
            if (e.shiftKey && d.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && d.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });

        d.body.appendChild(chooser);
    };

    var lockPage = function (on) {
        if (on) {
            var bar = w.innerWidth - root.clientWidth;
            if (bar > 0) d.body.style.paddingRight = bar + 'px';
            root.classList.add('pm-aud-lock');
            [].forEach.call(d.body.children, function (el) {
                if (el === chooser || el === status || el.hasAttribute('inert')) return;
                el.setAttribute('inert', '');
                inerted.push(el);
            });
        } else {
            root.classList.remove('pm-aud-lock');
            d.body.style.paddingRight = '';
            inerted.forEach(function (el) { el.removeAttribute('inert'); });
            inerted = [];
        }
    };

    // The first ask waits for the load overture (js/boot.js) to lift, so the options
    // settle in as the curtain clears rather than animating unseen beneath it.
    var whenBootDone = function (cb) {
        var fired = false;
        var go = function () { if (!fired) { fired = true; cb(); } };
        if (!root.classList.contains('pm-booting') || !('MutationObserver' in w)) { go(); return; }
        var mo = new MutationObserver(function () {
            if (!root.classList.contains('pm-booting')) { mo.disconnect(); go(); }
        });
        mo.observe(root, { attributes: true, attributeFilter: ['class'] });
        w.setTimeout(function () { mo.disconnect(); go(); }, 9000);
    };

    var openChooser = function (from) {
        if (!chooser) buildChooser();
        w.clearTimeout(closing);
        opener = from || null;
        chooser.classList.remove('is-closing');
        chooser.classList.toggle('is-first', current === null);
        chooser.hidden = false;
        chooser.querySelectorAll('[data-aud-pick]').forEach(function (b) {
            var on = b.getAttribute('data-aud-pick') === current;
            b.classList.toggle('is-current', on);
            if (on) b.setAttribute('aria-current', 'true');
            else b.removeAttribute('aria-current');
        });
        lockPage(true);
        whenBootDone(function () {
            w.requestAnimationFrame(function () {
                w.requestAnimationFrame(function () { chooser.classList.add('is-open'); });
            });
            // Reopened: focus the view in force. First ask: focus the question itself,
            // so no option looks pre-selected and a screen reader starts at the top.
            var target = chooser.querySelector('.aud-opt.is-current') || chooser.querySelector('.aud-title');
            if (target) {
                try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
            }
        });
    };

    var closeChooser = function () {
        if (!chooser || chooser.hidden) return;
        chooser.classList.remove('is-open');
        chooser.classList.add('is-closing');
        lockPage(false);
        var back = opener;
        opener = null;
        closing = w.setTimeout(function () {
            chooser.hidden = true;
            chooser.classList.remove('is-closing');
        }, 320);
        // getClientRects rather than offsetParent: the switch is position:fixed, and
        // a fixed element's offsetParent is always null.
        if (back && d.contains(back) && back.getClientRects().length) {
            try { back.focus({ preventScroll: true }); } catch (e) { back.focus(); }
        }
    };

    /* ---------- Start ----------
       Registered now, from <head>, so it runs before js/main.js's own
       DOMContentLoaded handler — main.js measures which chapters are near the
       viewport and stages the hero, and both must see the filtered page. */
    var start = function () {
        try {
            // Shared chrome is the same on every page, so it is tagged here rather
            // than by hand in nine copies of the markup.
            var tag = function (sel, key) {
                d.querySelectorAll(sel).forEach(function (el) {
                    if (!el.hasAttribute('data-aud-copy')) el.setAttribute('data-aud-copy', key);
                });
            };
            tag('.nav-cta', 'rail-cta');
            tag('.nav-tile--primary', 'nav-primary');
            tag('.nav-panel-lead-eyebrow', 'nav-lead-eyebrow');
            tag('.nav-panel-lead-text', 'nav-lead-text');
            tag('.nav-tile--lead', 'nav-build-tile');
            tag('.nav-tile--service[data-aud~="hardware"]', 'nav-source-tile');

            buildPill();
            buildNavSwitch();

            // While a form field has focus the switch steps aside on phones, where it
            // would otherwise sit over the field being typed into (and over the
            // on-screen keyboard's neighbour). css/audience.css does the hiding.
            // Reappearing is deferred: a tap on a form's own submit button moves focus
            // out of the field first, and the switch must not slide back under that
            // finger mid-tap.
            var typingTimer = 0;
            d.addEventListener('focusin', function (e) {
                w.clearTimeout(typingTimer);
                if (e.target.closest && e.target.closest('form')) {
                    root.classList.add('pm-aud-typing');
                }
            });
            d.addEventListener('focusout', function () {
                w.clearTimeout(typingTimer);
                typingTimer = w.setTimeout(function () {
                    var a = d.activeElement;
                    if (!(a && a.closest && a.closest('form'))) root.classList.remove('pm-aud-typing');
                }, 600);
            });
            apply(current === null ? 'all' : current);
            current = firstVisit ? null : current;
            if (firstVisit) openChooser(null);
        } catch (err) {
            // A half-applied filter is worse than none: show the whole page.
            root.removeAttribute('data-pm-aud');
        }
    };

    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    // For tests and for anything else on the page that needs to ask.
    w.pmAudience = {
        personas: PERSONAS,
        current: function () { return current; },
        choose: function (id) { choose(id); },
        open: function () { openChooser(d.activeElement); }
    };
}(document, window));
