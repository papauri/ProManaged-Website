/* website_builder.js — the Website Builder engine.

   The same guided experience as the Hospitality System Builder, for someone who
   wants a straightforward business website: describe what it is for, add only
   what it needs, see why each piece matters and what it connects to, and send the
   whole configuration to ProManaged as a structured discovery brief.

   RELATIONSHIP TO js/hospitality_builder.js
   A deliberate separate copy, not a shared engine — see .claude/WEBSITE_BUILDER.md
   §3. The mechanism below is the same one, proven on the hospitality page; the
   catalogue, the questions and the two prose generators are written fresh. The
   cost of the duplication is that a fix to the mechanism has to be made in both
   files, which is why every non-obvious behaviour below carries the reason for
   it rather than just the code.

   HONESTY CONTRACT (.claude/WEBSITE_BUILDER.md §2, §7)
   This catalogue is deliberately small, and almost everything in it is work
   ProManaged has actually delivered:
     'built'  — delivered and verifiable.
     'custom' — real work, scoped in a conversation rather than offered as a box.
   There is no 'proposed' tier here on purpose. A long row of "proposed" chips
   makes a configurator read as a business promising anything you click, which is
   the exact failure this builder has to avoid. Ten of the eleven capabilities
   below are delivered work; that ratio is the credibility argument and is
   asserted by tests/website_builder.test.js.

   LOAD ORDER
   Must execute BEFORE js/main.js. Both are deferred, so document order decides:
   main.js collects its motion units at DOMContentLoaded and skips a
   [data-blocks] group that has none, so the cards must exist by then. Rendering
   therefore happens at script-execution time, not on DOMContentLoaded. */
(function () {
    'use strict';

    /* ---------------------------------------------------------------------
       THE CATALOGUE
       ------------------------------------------------------------------ */

    /* Core is the floor: every site we build has these, so they are explained
       rather than offered. */
    const CORE = [
        {
            id: 'pages',
            category: 'core',
            status: 'built',
            name: 'Pages & content',
            title: 'Pages that actually say what you do.',
            shortDescription: 'The pages themselves, written to be read rather than skimmed past.',
            why: 'Most sites fail here first. Someone lands, cannot tell within a few seconds what you do or whether you do it for them, and leaves — long before any feature would have mattered.',
            dependsOn: [],
            worksWith: [],
            story: ['Someone lands on your site', 'They can tell what you do', 'They know whether it is for them'],
        },
        {
            id: 'mobile',
            category: 'core',
            status: 'built',
            name: 'Built for phones',
            title: 'Designed for a phone, not squeezed onto one.',
            shortDescription: 'Laid out for the small screen first, because that is where most people arrive.',
            why: 'A site designed on a desktop and shrunk afterwards is where text goes tiny and buttons get hard to hit. Starting from the phone means the small screen is the considered one, not the leftover.',
            dependsOn: [],
            worksWith: [],
            story: ['Most visitors arrive on a phone', 'The layout was designed for that screen', 'Nothing is too small to read or tap'],
        },
        {
            id: 'enquiry',
            category: 'core',
            status: 'built',
            name: 'A way to reach you',
            title: 'A form that reaches a real inbox.',
            shortDescription: 'Enquiries arrive as email you actually receive, with a copy back to the sender.',
            why: 'A contact form that quietly fails is worse than no form at all — you never learn about the work you lost. This is the part we test hardest.',
            dependsOn: [],
            worksWith: [],
            story: ['Someone fills in the form', 'It lands in your inbox', 'They get a confirmation so they know it sent'],
        },
        {
            id: 'hosting',
            category: 'core',
            status: 'built',
            name: 'Hosting, domain & SSL',
            title: 'Set up, secured, and handed over working.',
            shortDescription: 'The domain, the hosting and the padlock — arranged as part of the build.',
            why: 'This is the part people expect to be simple and find is not. We set it up so the site is live and secure without you having to become the person who understands DNS.',
            dependsOn: [],
            worksWith: [],
            story: ['Your domain points where it should', 'The site is served securely', 'You are handed something that works'],
        },
    ];

    /* Optional modules. `dependsOn` is a hard relationship; `worksWith` is a real
       improvement the visitor can choose to add, which is what makes the
       dependency prompt an action rather than a notice. */
    const OPTIONAL = [
        {
            id: 'seo',
            category: 'optional',
            status: 'built',
            name: 'Search-friendly setup',
            title: 'Findable by the people looking for you.',
            shortDescription: 'Page titles, descriptions and structure built the way search engines read them.',
            /* Deliberately modest. The claim is the setup, never rankings. */
            why: 'This is the groundwork, not a guarantee: pages structured and described properly so search engines can tell what each one is. Nobody honest can promise you a position.',
            dependsOn: ['pages'],
            worksWith: [],
            story: [
                'Each page says what it is, in the way search engines read',
                'Your pages can be indexed properly',
                'People searching for what you do can find the right page',
            ],
        },
        {
            id: 'gallery',
            category: 'optional',
            status: 'built',
            name: 'Photo gallery',
            title: 'Show it instead of describing it.',
            shortDescription: 'Proper galleries for your work, your space or your products.',
            why: 'For a lot of businesses the photographs do the selling. A gallery that loads quickly and looks right on a phone is worth more than another paragraph.',
            dependsOn: ['pages'],
            worksWith: ['selfedit'],
            story: ['Photographs are grouped where they belong', 'They load quickly on a phone', 'Someone sees the work rather than reading about it'],
        },
        {
            id: 'updates',
            category: 'optional',
            status: 'built',
            name: 'Updates & news',
            title: 'A site that does not look abandoned.',
            shortDescription: 'A simple updates section you post to yourself.',
            /* Scoped narrowly and on purpose: the evidence is a dated-items
               publisher, not a full blogging platform. */
            why: 'A site whose last update was two years ago says something you did not mean to say. This is a straightforward list of dated posts — not a blogging platform with categories and comments.',
            dependsOn: ['pages'],
            worksWith: ['selfedit'],
            story: ['You post an update', 'It appears on the site', 'Visitors can see you are still active'],
        },
        {
            id: 'bookings',
            category: 'optional',
            status: 'built',
            name: 'Bookings & enquiries',
            title: 'Let people book you, not just message you.',
            shortDescription: 'A real booking or appointment flow, not a form that says "get in touch".',
            why: 'Every enquiry that arrives as a loose message is one you have to answer by hand before anything can happen. A proper booking flow asks the right questions once and arrives complete.',
            dependsOn: ['enquiry'],
            worksWith: ['selfedit'],
            story: [
                'Someone chooses what they want and when',
                'They give the details you actually need',
                'The request arrives complete',
                'They get a confirmation',
            ],
        },
        {
            id: 'selfedit',
            category: 'optional',
            status: 'built',
            name: 'Edit it yourself',
            title: 'Change it without phoning us.',
            shortDescription: 'A private login where you edit your own content.',
            why: 'Paying someone to change a price or swap a photo is a bad arrangement for both of us. This is the admin area where you do it yourself, behind a proper login.',
            dependsOn: ['pages'],
            worksWith: [],
            story: ['You sign in to your own admin area', 'You change the content yourself', 'The site updates immediately'],
        },
        {
            id: 'multisite',
            category: 'optional',
            status: 'built',
            name: 'More than one business',
            title: 'One system, several businesses.',
            shortDescription: 'Separate sites and separate data, running on one build.',
            /* Verified: both delivered hotel systems run on one codebase with
               tenant-scoped data — identical structure, separate content, separate
               admin. The claim is exactly that and stops there. */
            why: 'We already run two hotels this way: one system, but each business has its own site, its own content and its own login, and neither can see the other. If you run more than one thing, that is cheaper to build and far cheaper to keep working than two separate sites.',
            dependsOn: ['selfedit'],
            worksWith: [],
            story: [
                'Each business keeps its own site and content',
                'Each has its own login, separate from the others',
                'One build underneath, so a fix reaches all of them',
            ],
        },
        {
            id: 'custom',
            category: 'optional',
            status: 'custom',
            name: 'Something else',
            title: 'The thing that is not on this list.',
            shortDescription: 'A shop, customer logins, connecting to software you already use.',
            /* The honest catch-all. It exists so a deliberately small catalogue
               does not read as "this is all they can do", while still promising
               nothing specific. */
            why: 'These are real things and they are real projects — what they take depends entirely on what you need. We would rather scope one properly in a conversation than offer it as a box to tick and work it out afterwards.',
            dependsOn: [],
            worksWith: [],
            story: ['You tell us what it needs to do', 'We work out what that actually takes', 'You get an honest answer before anyone commits'],
        },
    ];

    /* Seven modules is small enough to read, but grouping still gives the chapter
       landmarks instead of one run of cards. Order here is render order; the spans
       in the stylesheet are composed per group. */
    const GROUPS = [
        {
            id: 'found',
            title: 'Being found, and worth staying on',
            note: 'The difference between a site that exists and one that brings you work.',
            modules: ['seo', 'gallery', 'updates'],
        },
        {
            id: 'doing',
            title: 'Doing more than showing',
            note: 'When you want visitors to actually do something, and to run the site yourself.',
            modules: ['bookings', 'selfedit'],
        },
        {
            id: 'beyond',
            title: 'Beyond one simple site',
            note: 'Only relevant to some businesses. Skip this unless it describes you.',
            modules: ['multisite', 'custom'],
        },
    ];

    const ALL = CORE.concat(OPTIONAL);
    const BY_ID = ALL.reduce(function (map, mod) { map[mod.id] = mod; return map; }, {});
    const CORE_IDS = CORE.map(function (m) { return m.id; });

    const STATUS_LABEL = { built: 'Built before', custom: 'Custom development' };
    const STATUS_NOTE = {
        built: 'We have built this before and can show you it working.',
        custom: 'Scoped and priced for your project rather than assumed.',
    };

    /* ---------------------------------------------------------------------
       STATE
       ------------------------------------------------------------------ */

    const state = {
        purpose: '',
        purposeLabel: '',
        pages: 6,
        current: [],
        must: '',
        selected: [],
    };

    const PAGES_MIN = 1;
    const PAGES_MAX = 200;

    const isSelected = function (id) { return state.selected.indexOf(id) !== -1; };
    const isCoreId = function (id) { return CORE_IDS.indexOf(id) !== -1; };

    /* Every relationship of a module that is live in this configuration. A core
       capability always counts as present — it is the floor. Shared by the
       relation panel, the map and the submitted payload so all three describe the
       same site. */
    const activeLinks = function (mod) {
        return mod.dependsOn.concat(mod.worksWith.filter(function (id) {
            return isCoreId(id) || isSelected(id);
        }));
    };

    const selectModule = function (id) {
        if (!BY_ID[id] || BY_ID[id].category !== 'optional' || isSelected(id)) return false;
        state.selected.push(id);
        return true;
    };
    const deselectModule = function (id) {
        const at = state.selected.indexOf(id);
        if (at === -1) return false;
        state.selected.splice(at, 1);
        return true;
    };

    /* Local signals only: no analytics platform exists in this repository and the
       plan forbids adding one. Nothing is sent anywhere and no event carries a
       name, an address or free text. */
    const track = function (name, detail) {
        const payload = Object.assign({ event: name }, detail || {});
        try {
            if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
            document.dispatchEvent(new CustomEvent('pm:website-builder', { detail: payload }));
        } catch (err) { /* Analytics must never break the builder. */ }
    };

    /* ---------------------------------------------------------------------
       DOM HELPERS
       ------------------------------------------------------------------ */
    const el = function (tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = text;
        return node;
    };
    const clear = function (node) { while (node && node.firstChild) node.removeChild(node.firstChild); };
    const listNames = function (ids) {
        return ids.map(function (id) { return BY_ID[id] ? BY_ID[id].name : id; });
    };
    const sentenceJoin = function (parts) {
        if (!parts.length) return '';
        if (parts.length === 1) return parts[0];
        return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
    };
    const lower = function (name) { return name.charAt(0).toLowerCase() + name.slice(1); };

    const root = document.querySelector('[data-wb]');
    if (!root) return;
    const $ = function (sel) { return root.querySelector(sel); };

    const coreHost = $('[data-wb-core]');
    const optionalHost = $('[data-wb-optional]');
    const mapHost = $('[data-wb-map]');
    const mapCount = $('[data-wb-mapcount]');
    const storyHost = $('[data-wb-story]');
    const summaryProject = $('[data-wb-summary-project]');
    const summaryCore = $('[data-wb-summary-core]');
    const summaryOptional = $('[data-wb-summary-optional]');
    const summaryProse = $('[data-wb-summary-prose]');
    const purposeHost = $('[data-wb-purpose]');
    const currentHost = $('[data-wb-current]');
    const pagesOutput = $('[data-wb-pages-value]');
    const pagesInput = $('[data-wb-pages-input]');
    const mustInput = $('[data-wb-must]');

    const hidden = {
        purpose: $('[name="purpose"]'),
        pages: $('[name="pages"]'),
        current: $('[name="current_situation"]'),
        core: $('[name="core_features"]'),
        optional: $('[name="optional_features"]'),
        connections: $('[name="connections"]'),
        must: $('[name="must_do"]'),
    };

    /* ---------------------------------------------------------------------
       CHAPTER 01
       ------------------------------------------------------------------ */
    const PURPOSES = [
        { id: 'show', label: 'Show what we do' },
        { id: 'bookings', label: 'Take bookings or enquiries' },
        { id: 'updates', label: 'Share updates and photos' },
        { id: 'unsure', label: 'Not sure yet' },
    ];

    const SITUATIONS = [
        { id: 'nothing', label: 'Nothing yet' },
        { id: 'outgrown', label: 'A site we have outgrown' },
        { id: 'rebuild', label: 'A site that needs rebuilding' },
        { id: 'social', label: 'Social pages only' },
    ];

    function renderChoices(host, items, group) {
        if (!host) return;
        clear(host);
        items.forEach(function (item) {
            const button = el('button', 'wb-choice');
            button.type = 'button';
            button.setAttribute('aria-pressed', 'false');
            button.dataset.choice = item.id;
            button.dataset.group = group;
            button.appendChild(el('span', 'wb-choice-label', item.label));
            const mark = el('span', 'wb-choice-mark');
            mark.setAttribute('aria-hidden', 'true');
            button.appendChild(mark);
            host.appendChild(button);
        });
    }

    function setPurpose(id) {
        const match = PURPOSES.filter(function (p) { return p.id === id; })[0];
        if (!match) return;
        state.purpose = match.id;
        state.purposeLabel = match.label;
        purposeHost.querySelectorAll('[data-choice]').forEach(function (b) {
            b.setAttribute('aria-pressed', String(b.dataset.choice === id));
        });
        track('purpose_selected', { purpose: match.id });
        update();
    }

    function toggleSituation(id) {
        const at = state.current.indexOf(id);
        if (at === -1) state.current.push(id); else state.current.splice(at, 1);
        currentHost.querySelectorAll('[data-choice]').forEach(function (b) {
            b.setAttribute('aria-pressed', String(state.current.indexOf(b.dataset.choice) !== -1));
        });
        update();
    }

    /* A number field with real +/- controls. A slider is the hardest possible way
       to say "about eight" on a phone. */
    function setPages(value, announce) {
        let next = parseInt(value, 10);
        if (!Number.isFinite(next)) next = PAGES_MIN;
        next = Math.min(PAGES_MAX, Math.max(PAGES_MIN, next));
        state.pages = next;
        if (pagesInput && pagesInput.value !== String(next)) pagesInput.value = String(next);
        if (pagesOutput) pagesOutput.textContent = String(next);
        if (announce) update();
    }

    /* ---------------------------------------------------------------------
       CARDS
       ------------------------------------------------------------------ */
    function statusChip(mod) {
        const chip = el('span', 'wb-status wb-status--' + mod.status);
        chip.appendChild(el('span', 'wb-status-label', STATUS_LABEL[mod.status]));
        return chip;
    }

    function flowList(steps) {
        const list = el('ol', 'wb-flow');
        steps.forEach(function (step) {
            const item = el('li', 'wb-flow-step');
            item.appendChild(el('span', 'wb-flow-text', step));
            list.appendChild(item);
        });
        return list;
    }

    function renderCore() {
        if (!coreHost) return;
        clear(coreHost);
        CORE.forEach(function (mod) {
            const card = el('article', 'block wb-card wb-card--core');
            card.dataset.module = mod.id;

            const head = el('div', 'wb-card-head');
            head.appendChild(el('span', 'wb-card-name', mod.name));
            head.appendChild(statusChip(mod));
            card.appendChild(head);

            card.appendChild(el('h3', 'wb-card-title', mod.title));
            card.appendChild(el('p', 'wb-card-short', mod.shortDescription));
            card.appendChild(el('p', 'wb-card-why', mod.why));

            coreHost.appendChild(card);
        });
    }

    function renderOptional() {
        if (!optionalHost) return;
        clear(optionalHost);
        GROUPS.forEach(function (group) {
            const section = el('div', 'wb-group');
            section.dataset.group = group.id;

            const head = el('div', 'wb-group-head');
            head.appendChild(el('h3', 'wb-group-title', group.title));
            head.appendChild(el('p', 'wb-group-note', group.note));
            section.appendChild(head);

            const grid = el('div', 'grid wb-modules');
            group.modules.forEach(function (id) {
                const mod = BY_ID[id];
                if (mod) grid.appendChild(optionalCard(mod));
            });
            section.appendChild(grid);
            optionalHost.appendChild(section);
        });
    }

    function optionalCard(mod) {
        const card = el('article', 'block wb-card wb-card--optional');
        card.dataset.module = mod.id;

        const detailId = 'wb-detail-' + mod.id;

        const toggle = el('button', 'wb-card-toggle');
        toggle.type = 'button';
        toggle.setAttribute('aria-pressed', 'false');
        toggle.setAttribute('aria-controls', detailId);
        toggle.dataset.toggle = mod.id;

        const head = el('span', 'wb-card-head');
        head.appendChild(el('span', 'wb-card-name', mod.name));
        head.appendChild(statusChip(mod));
        toggle.appendChild(head);

        toggle.appendChild(el('span', 'wb-card-title', mod.title));
        toggle.appendChild(el('span', 'wb-card-short', mod.shortDescription));

        /* The action word carries the state in text as well as in colour and
           aria-pressed, so nothing about selection is colour-only. */
        const action = el('span', 'wb-card-action');
        const mark = el('span', 'wb-card-action-mark');
        mark.setAttribute('aria-hidden', 'true');
        action.appendChild(mark);
        action.appendChild(el('span', 'wb-card-action-label', 'Add to my site'));
        toggle.appendChild(action);

        /* The heading wraps the control: a <button> may not contain a heading
           (phrasing content only), and without one the module set would be
           invisible to heading navigation. h4, because the group title is the h3. */
        const heading = el('h4', 'wb-card-heading');
        heading.appendChild(toggle);
        card.appendChild(heading);

        const detail = el('div', 'wb-card-detail');
        detail.id = detailId;
        detail.hidden = true;

        detail.appendChild(el('p', 'wb-card-why', mod.why));
        detail.appendChild(el('p', 'wb-flow-head', 'How it works'));
        detail.appendChild(flowList(mod.story));

        const relations = el('div', 'wb-relations');
        relations.dataset.relations = mod.id;
        detail.appendChild(relations);

        detail.appendChild(el('p', 'wb-card-statusnote', STATUS_NOTE[mod.status]));

        card.appendChild(detail);
        return card;
    }

    /* Relations are re-rendered on every update, so a prompt that simply stays on
       screen would fire its event again on each unrelated change. */
    const promptsSeen = [];

    function renderRelations(mod) {
        const host = root.querySelector('[data-relations="' + mod.id + '"]');
        if (!host) return;
        clear(host);

        /* Split on WHERE a relationship points, not which list it came from. A
           relationship aimed at a core capability can never be "added" — offering
           it as an action would be a button that does nothing. */
        const related = mod.dependsOn.concat(mod.worksWith);
        const coreRelated = related.filter(isCoreId);
        const optionalRelated = related.filter(function (id) { return !isCoreId(id); });

        if (coreRelated.length) {
            const note = el('p', 'wb-relation wb-relation--met');
            note.appendChild(el('span', 'wb-relation-tag', 'Builds on'));
            note.appendChild(document.createTextNode(
                sentenceJoin(listNames(coreRelated)) + ' — already part of every site we build, so nothing to add.'
            ));
            host.appendChild(note);
        }

        optionalRelated.forEach(function (id) {
            const other = BY_ID[id];
            if (!other) return;
            if (isSelected(id)) {
                const met = el('p', 'wb-relation wb-relation--met');
                met.appendChild(el('span', 'wb-relation-tag', 'Connected to'));
                met.appendChild(document.createTextNode(
                    other.name + ' — the two work together on your site.'
                ));
                host.appendChild(met);
                return;
            }

            const prompt = el('div', 'wb-relation wb-relation--prompt');
            prompt.appendChild(el('span', 'wb-relation-tag', 'Works best with'));
            prompt.appendChild(el('p', 'wb-relation-text',
                mod.name + ' works better alongside ' + lower(other.name) + '. ' + other.shortDescription));
            const add = el('button', 'btn secondary wb-relation-add');
            add.type = 'button';
            add.dataset.add = other.id;
            add.textContent = 'Add ' + other.name;
            prompt.appendChild(add);
            host.appendChild(prompt);

            const key = mod.id + '>' + other.id;
            if (promptsSeen.indexOf(key) === -1) {
                promptsSeen.push(key);
                track('dependency_prompt_shown', { module: mod.id, suggested: other.id });
            }
        });
    }

    function paintOptional() {
        OPTIONAL.forEach(function (mod) {
            const card = root.querySelector('.wb-card[data-module="' + mod.id + '"]');
            if (!card) return;
            const on = isSelected(mod.id);
            const toggle = card.querySelector('[data-toggle]');
            const detail = card.querySelector('.wb-card-detail');
            const label = card.querySelector('.wb-card-action-label');

            card.classList.toggle('is-selected', on);
            if (toggle) toggle.setAttribute('aria-pressed', String(on));
            if (label) label.textContent = on ? 'On your site — remove' : 'Add to my site';

            if (detail) {
                const wasHidden = detail.hidden;
                detail.hidden = !on;
                /* display:none suppresses animation, so un-hiding is exactly when
                   the entrance can start. Only on the closed→open transition, so
                   an unrelated re-render never replays it. */
                if (on && wasHidden) {
                    detail.classList.remove('wb-assemble');
                    void detail.offsetWidth;
                    detail.classList.add('wb-assemble');
                    track('workflow_opened', { module: mod.id });
                }
            }
            if (on) renderRelations(mod);
        });
    }

    /* ---------------------------------------------------------------------
       THE SITE MAP
       ------------------------------------------------------------------ */
    let mapped = [];

    function renderMap() {
        if (!mapHost) return;
        clear(mapHost);

        const site = el('div', 'wb-node wb-node--site');
        site.appendChild(el('span', 'wb-node-kind', 'Your site'));
        site.appendChild(el('span', 'wb-node-name', state.purposeLabel || 'Not chosen yet'));
        site.appendChild(el('span', 'wb-node-meta',
            'About ' + state.pages + (state.pages === 1 ? ' page' : ' pages')));
        mapHost.appendChild(site);

        CORE.forEach(function (mod) {
            const node = el('div', 'wb-node wb-node--core');
            node.appendChild(el('span', 'wb-node-kind', 'Always included'));
            node.appendChild(el('span', 'wb-node-name', mod.name));
            mapHost.appendChild(node);
        });

        state.selected.forEach(function (id) {
            const mod = BY_ID[id];
            if (!mod) return;
            const isNew = mapped.indexOf(id) === -1;
            const node = el('div', 'wb-node wb-node--added' + (isNew ? ' wb-node--enter' : ''));
            node.appendChild(el('span', 'wb-node-kind', STATUS_LABEL[mod.status]));
            node.appendChild(el('span', 'wb-node-name', mod.name));
            const links = activeLinks(mod);
            if (links.length) {
                node.appendChild(el('span', 'wb-node-meta', 'Connects to ' + sentenceJoin(listNames(links))));
            }
            mapHost.appendChild(node);
        });

        mapped = state.selected.slice();

        if (mapCount) {
            const total = CORE.length + state.selected.length;
            mapCount.textContent = state.selected.length === 0
                ? 'Four things every site we build includes, nothing added yet.'
                : total + ' parts — four always included, ' + state.selected.length + ' added.';
        }
    }

    /* ---------------------------------------------------------------------
       THE STORY — assembled from what is actually selected
       ------------------------------------------------------------------ */
    function buildStory() {
        const steps = [];
        const on = isSelected;

        if (on('seo')) {
            steps.push('Someone searches for what you do, and your page is one that can be found.');
        } else {
            steps.push('Someone arrives at your site — from a card, a message, or word of mouth.');
        }

        steps.push('They land on a page that tells them what you do, and whether it is for them.');
        steps.push('It reads properly on the phone they are holding.');

        if (on('gallery')) steps.push('They look through your photographs rather than reading about the work.');
        if (on('updates')) steps.push('They see recent updates, so the business obviously still exists.');

        if (on('bookings')) {
            steps.push('They book what they want, when they want it, answering the questions you need answered.');
            steps.push('The request reaches you complete, and they get a confirmation.');
        } else {
            steps.push('They get in touch, and the message reaches your real inbox.');
            steps.push('They get a confirmation, so they know it actually sent.');
        }

        if (on('selfedit')) {
            steps.push('When something changes, you sign in and change it yourself.');
        }
        if (on('multisite')) {
            steps.push('And every business you run works this way, each with its own site and its own login.');
        }
        if (on('custom')) {
            steps.push('Anything beyond this, we scope with you properly before anyone commits.');
        }

        return steps;
    }

    function renderStory() {
        if (!storyHost) return;
        clear(storyHost);
        buildStory().forEach(function (step, index) {
            const item = el('li', 'wb-story-step');
            item.appendChild(el('span', 'wb-story-index', String(index + 1).padStart(2, '0')));
            item.appendChild(el('p', 'wb-story-text', step));
            storyHost.appendChild(item);
        });
    }

    /* ---------------------------------------------------------------------
       THE SUMMARY
       ------------------------------------------------------------------ */
    function situationLabel(id) {
        const m = SITUATIONS.filter(function (s) { return s.id === id; })[0];
        return m ? m.label : id;
    }

    function renderSummary() {
        if (summaryProject) {
            clear(summaryProject);
            const rows = [
                ['Mainly for', state.purposeLabel || 'Not chosen yet'],
                ['Roughly', state.pages + (state.pages === 1 ? ' page' : ' pages')],
                ['Right now', state.current.length ? sentenceJoin(state.current.map(situationLabel)) : 'Not chosen yet'],
            ];
            rows.forEach(function (row) {
                const line = el('p', 'wb-summary-line');
                line.appendChild(el('span', 'wb-summary-key', row[0]));
                line.appendChild(el('span', 'wb-summary-value', row[1]));
                summaryProject.appendChild(line);
            });
        }

        if (summaryCore) {
            clear(summaryCore);
            CORE.forEach(function (mod) {
                const item = el('li', 'wb-summary-item');
                item.appendChild(el('span', 'wb-summary-item-name', mod.name));
                item.appendChild(el('span', 'wb-summary-item-note', mod.shortDescription));
                summaryCore.appendChild(item);
            });
        }

        if (summaryOptional) {
            clear(summaryOptional);
            if (!state.selected.length) {
                const empty = el('li', 'wb-summary-item wb-summary-item--empty');
                empty.appendChild(el('span', 'wb-summary-item-name', 'Nothing added yet'));
                empty.appendChild(el('span', 'wb-summary-item-note',
                    'The four above are a complete, working website on their own. Add only what you actually need.'));
                summaryOptional.appendChild(empty);
            } else {
                state.selected.forEach(function (id) {
                    const mod = BY_ID[id];
                    if (!mod) return;
                    const item = el('li', 'wb-summary-item');
                    item.appendChild(el('span', 'wb-summary-item-name', mod.name));
                    item.appendChild(el('span', 'wb-summary-item-note', mod.shortDescription));
                    item.appendChild(el('span', 'wb-summary-item-status', STATUS_LABEL[mod.status]));
                    summaryOptional.appendChild(item);
                });
            }
        }

        if (summaryProse) summaryProse.textContent = proseFor();
    }

    /* One plain-language paragraph, generated only from what was actually chosen.
       Nothing here may describe a capability the visitor did not select. */
    function proseFor() {
        const on = isSelected;
        let text = 'You get a site that explains what you do, reads properly on a phone, '
            + 'and puts enquiries in an inbox you actually check — hosted, secured and handed over working.';

        if (on('seo')) text += ' It is structured so search engines can tell what each page is.';
        if (on('gallery')) text += ' Your photographs do the work a paragraph cannot.';
        if (on('updates')) text += ' You can post updates so it never looks abandoned.';
        if (on('bookings')) text += ' People book you directly, answering the questions you need answered up front.';
        if (on('selfedit')) text += ' When something changes, you sign in and change it yourself.';
        if (on('multisite')) text += ' And if you run more than one business, each gets its own site and login on the same build.';
        if (on('custom')) text += ' Anything beyond that, we scope properly before anyone commits.';
        return text;
    }

    /* ---------------------------------------------------------------------
       SUBMISSION PAYLOAD — ids only; php/website.php owns every label
       ------------------------------------------------------------------ */
    function syncHidden() {
        if (hidden.purpose) hidden.purpose.value = state.purpose;
        if (hidden.pages) hidden.pages.value = String(state.pages);
        if (hidden.current) hidden.current.value = state.current.join(',');
        if (hidden.core) hidden.core.value = CORE_IDS.join(',');
        if (hidden.optional) hidden.optional.value = state.selected.join(',');
        if (hidden.must) hidden.must.value = mustInput ? mustInput.value : '';

        const connections = [];
        state.selected.forEach(function (id) {
            const mod = BY_ID[id];
            if (!mod) return;
            const links = activeLinks(mod);
            if (links.length) connections.push(mod.id + '>' + links.join('+'));
        });
        if (hidden.connections) hidden.connections.value = connections.join(';');
    }

    function update() {
        paintOptional();
        renderMap();
        renderStory();
        renderSummary();
        syncHidden();
        maybeAdvance();
    }

    /* ---------------------------------------------------------------------
       GUIDED PROGRESSION
       Same contract as the hospitality builder: it may only act once the visitor
       has stopped acting for themselves. Completion-driven, fires once, forward
       only, abandoned on any interaction, and off entirely under reduced motion.
       ------------------------------------------------------------------ */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const FLOW = [
        {
            id: 'project',
            target: '#foundation',
            /* Page count has a default, so it cannot signal anything. Purpose plus
               where they are today is the point at which they have told us
               something. The activeElement check keeps the free-text box — which is
               last in the chapter — from being scrolled away mid-thought. */
            done: function () {
                return state.purpose !== ''
                    && state.current.length > 0
                    && document.activeElement !== mustInput;
            },
            settle: 1800,
        },
        {
            id: 'additions',
            target: '#site',
            done: function () { return state.selected.length > 0; },
            /* Longer: a selection opens a panel worth reading, and any scroll
               while reading cancels this anyway. */
            settle: 2600,
        },
    ];

    const advanced = [];
    let pendingAdvance = null;
    let flowArmed = false;

    function cancelAdvance() {
        if (!pendingAdvance) return;
        window.clearTimeout(pendingAdvance.timer);
        pendingAdvance.stop();
        pendingAdvance = null;
    }

    /* Each frame must be an INSTANT jump to the next eased position.
       css/global_styles.css sets scroll-behavior:smooth on html, and 'auto' means
       "use the CSS property" rather than "jump" — with 'auto' every frame starts a
       fresh smooth scroll chasing the last, and the travel stops short. */
    function slowScrollTo(target) {
        const cs = getComputedStyle(document.documentElement);
        const headerH = parseFloat(cs.getPropertyValue('--header-h')) || 76;
        const navFloat = parseFloat(cs.getPropertyValue('--nav-float')) || 0;
        const offset = headerH + navFloat + 16;

        const from = window.scrollY;
        const to = Math.max(0, from + target.getBoundingClientRect().top - offset);
        const distance = to - from;
        if (distance < 24) return null;

        const duration = Math.min(2400, Math.max(1200, Math.abs(distance) * 0.9));
        const started = performance.now();
        const ease = function (t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        const motion = { cancelled: false };
        const step = function (now) {
            if (motion.cancelled) return;
            const t = Math.min(1, (now - started) / duration);
            window.scrollTo({ top: from + distance * ease(t), behavior: 'instant' });
            if (t < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
        return motion;
    }

    function scheduleAdvance(entry) {
        cancelAdvance();
        const target = document.querySelector(entry.target);
        if (!target) return;

        const abandon = function () { cancelAdvance(); };
        /* `scroll` is deliberately absent: the animation scrolls the page itself
           and would cancel itself. `focusin` is present because focus moved
           without a pointer or key would otherwise leave an advance armed. */
        const EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'focusin'];
        EVENTS.forEach(function (n) { window.addEventListener(n, abandon, { passive: true }); });

        const stop = function () {
            EVENTS.forEach(function (n) { window.removeEventListener(n, abandon); });
            if (pendingAdvance && pendingAdvance.motion) pendingAdvance.motion.cancelled = true;
        };

        const timer = window.setTimeout(function () {
            const box = target.getBoundingClientRect();
            const alreadyThere = box.top >= 0 && box.top < window.innerHeight * 0.4;
            advanced.push(entry.id);
            track('step_advanced', { from: entry.id, to: entry.target.replace('#', '') });

            const motion = alreadyThere ? null : slowScrollTo(target);
            if (pendingAdvance) pendingAdvance.motion = motion;
            if (!motion) {
                stop();
                pendingAdvance = null;
            } else {
                window.setTimeout(function () { stop(); pendingAdvance = null; }, 2500);
            }
        }, entry.settle);

        pendingAdvance = { timer: timer, stop: stop, motion: null };
    }

    function maybeAdvance() {
        if (!flowArmed || prefersReducedMotion()) return;
        for (let i = 0; i < FLOW.length; i++) {
            const entry = FLOW[i];
            if (advanced.indexOf(entry.id) !== -1) continue;
            if (entry.done()) { scheduleAdvance(entry); return; }
        }
    }

    /* ---------------------------------------------------------------------
       EVENTS — delegated, so re-rendered cards never need rebinding
       ------------------------------------------------------------------ */
    root.addEventListener('click', function (event) {
        if (!(event.target instanceof Element)) return;

        const choice = event.target.closest('[data-choice]');
        if (choice && root.contains(choice)) {
            if (choice.dataset.group === 'purpose') setPurpose(choice.dataset.choice);
            else if (choice.dataset.group === 'current') toggleSituation(choice.dataset.choice);
            return;
        }

        const toggle = event.target.closest('[data-toggle]');
        if (toggle && root.contains(toggle)) {
            const id = toggle.dataset.toggle;
            if (isSelected(id)) {
                deselectModule(id);
            } else {
                selectModule(id);
                track('module_selected', { module: id });
            }
            update();
            return;
        }

        const add = event.target.closest('[data-add]');
        if (add && root.contains(add)) {
            const id = add.dataset.add;
            if (selectModule(id)) {
                track('module_selected', { module: id, via: 'dependency_prompt' });
                update();
                const card = root.querySelector('.wb-card[data-module="' + id + '"]');
                if (card) {
                    const focusTarget = card.querySelector('[data-toggle]');
                    if (focusTarget) focusTarget.focus({ preventScroll: true });
                    card.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
                }
            }
            return;
        }

        const step = event.target.closest('[data-wb-pages-step]');
        if (step && root.contains(step)) {
            setPages(state.pages + parseInt(step.dataset.wbPagesStep, 10), true);
            return;
        }

        /* The continue control. A real anchor, so it still navigates with
           JavaScript off; here it is upgraded to the same weighted scroll the
           automatic advances use. */
        const next = event.target.closest('.wb-next');
        if (next && root.contains(next)) {
            const sel = next.getAttribute('href');
            const target = sel && document.querySelector(sel);
            if (!target) return;
            event.preventDefault();
            cancelAdvance();
            const from = next.closest('section');
            if (from && from.id && advanced.indexOf(from.id) === -1) advanced.push(from.id);
            track('step_advanced', { from: from ? from.id : '', to: sel.replace('#', ''), via: 'control' });
            if (prefersReducedMotion()) target.scrollIntoView();
            else slowScrollTo(target);
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    });

    if (pagesInput) {
        pagesInput.addEventListener('input', function () { setPages(pagesInput.value, true); });
        pagesInput.addEventListener('blur', function () { setPages(pagesInput.value, true); });
    }
    if (mustInput) {
        mustInput.addEventListener('input', syncHidden);
        /* Finishing with the note is itself a completion signal — it is the last
           thing in the chapter. `change` fires on blur once the value has been
           edited; the blur handler covers leaving it empty, since it is optional. */
        mustInput.addEventListener('change', function () { syncHidden(); maybeAdvance(); });
        mustInput.addEventListener('blur', function () { maybeAdvance(); });
    }

    /* Escape closes the panel in focus, since it is a disclosure. */
    root.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape' || !(event.target instanceof Element)) return;
        const card = event.target.closest('.wb-card--optional.is-selected');
        if (!card) return;
        if (deselectModule(card.dataset.module)) {
            update();
            const toggle = card.querySelector('[data-toggle]');
            if (toggle) toggle.focus();
        }
    });

    const form = document.querySelector('#website-form');
    if (form) {
        form.addEventListener('submit', function () {
            syncHidden();
            track('website_enquiry_submitted', {
                purpose: state.purpose,
                optional_count: state.selected.length,
            });
        }, true);
    }

    /* ---------------------------------------------------------------------
       BOOT
       ------------------------------------------------------------------ */
    renderChoices(purposeHost, PURPOSES, 'purpose');
    renderChoices(currentHost, SITUATIONS, 'current');
    renderCore();
    renderOptional();
    setPages(state.pages, false);
    update();
    root.classList.add('wb-ready');
    track('builder_started', {});

    // Armed after the first render, so boot can never schedule an advance.
    flowArmed = true;

    const summarySection = $('[data-wb-summary]');
    if (summarySection && 'IntersectionObserver' in window) {
        const seen = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                seen.disconnect();
                track('configuration_completed', {
                    purpose: state.purpose,
                    optional_count: state.selected.length,
                    optional: state.selected.join(','),
                });
            });
        }, { threshold: 0.2 });
        seen.observe(summarySection);
    }
})();
