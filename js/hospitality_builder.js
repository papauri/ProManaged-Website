/* hospitality_builder.js — the Hospitality System Builder engine.

   A guided product configurator, not a form. The visitor describes how their
   property works, adds only the capabilities they need, sees WHY each one matters
   and what it connects to, watches the system compose itself, and finally sends
   the whole configuration to ProManaged as a structured discovery brief.

   ARCHITECTURE
   Everything the experience says about a capability lives in CATALOGUE below —
   one record per module, with its own copy, dependencies and workflow steps. No
   module prose is written into the rendering code, so the catalogue can later be
   lifted straight out and fed to a real multi-tenant product without rewriting
   the UI.

   HONESTY CONTRACT (.claude/HOSPITALITY_SYSTEM_BUILDER.md §7, §18)
   Every module carries a `status`:
     'built'    — ProManaged has delivered this in real hotel-management work.
     'proposed' — designed for this product, not yet a standard shipped module.
     'custom'   — genuinely bespoke work, priced and built per property.
   The UI prints that status on the card. Nothing here may imply that the whole
   configurable product already exists as a finished commercial SaaS.

   LOAD ORDER
   This script must execute BEFORE js/main.js. Both are deferred, so document
   order decides: main.js collects its motion units at DOMContentLoaded and skips
   a [data-blocks] group that has none yet, so the cards below have to be in the
   DOM by then. Rendering therefore happens at script-execution time, not on
   DOMContentLoaded.

   NO-JS / FAILURE PATH
   The page's static markup carries the headline explanation of every chapter and
   a direct route to the normal booking form, so a visitor who never runs this
   script still understands the offer and can still reach ProManaged. */
(function () {
    'use strict';

    /* ---------------------------------------------------------------------
       THE CATALOGUE
       ------------------------------------------------------------------ */

    /* Core is the foundation: always part of the system, never a checkbox. These
       three are what every delivered ProManaged hotel system has actually had —
       reservations, room state and guest records — so they are the honest floor
       of the product rather than an upsell tier. */
    const CORE = [
        {
            id: 'bookings',
            category: 'core',
            status: 'built',
            name: 'Bookings',
            title: 'Every reservation in one place.',
            shortDescription: 'One record of what is booked, by whom, and for when.',
            why: 'A reservation that lives in a diary, a phone and someone\'s memory is three reservations. One record means the same answer no matter who is asked.',
            dependsOn: [],
            worksWith: [],
            story: ['A booking is made', 'It lands in one system', 'Everyone sees the same answer'],
        },
        {
            id: 'rooms',
            category: 'core',
            status: 'built',
            name: 'Rooms',
            title: 'Know the state of every room.',
            shortDescription: 'Available, occupied, reserved or being prepared — at a glance.',
            why: 'Room state is the question your team asks most often. Answering it from a screen instead of by walking the property is most of what a system is for.',
            dependsOn: [],
            worksWith: [],
            story: ['A room changes state', 'Availability updates', 'The next booking sees the truth'],
        },
        {
            id: 'guests',
            category: 'core',
            status: 'built',
            name: 'Guests',
            title: 'Guest details, attached to the stay.',
            shortDescription: 'Who is arriving, what they asked for, and what happened last time.',
            why: 'Guest information kept beside the booking rather than in a separate list is what lets your team recognise a returning guest without hunting for them.',
            dependsOn: [],
            worksWith: [],
            story: ['A guest is recorded once', 'Their details follow the stay', 'A returning guest is recognised'],
        },
    ];

    /* Optional modules. `dependsOn` is a hard relationship — the module has no
       meaning without it. `worksWith` is a genuine improvement the visitor can
       choose to add, and is what makes the dependency prompt an action rather
       than a notice. */
    const OPTIONAL = [
        {
            id: 'website',
            category: 'optional',
            status: 'built',
            name: 'Website + booking engine',
            title: 'Let guests book you directly.',
            shortDescription: 'A public site that shows live availability and takes the booking itself.',
            why: 'Without it, every enquiry becomes a message someone has to answer by hand. With it, the booking starts where the guest already is and arrives in your system complete.',
            dependsOn: ['bookings', 'rooms'],
            worksWith: ['payments'],
            story: [
                'A guest finds your property online',
                'The site shows what is genuinely free',
                'The guest books themselves',
                'The booking arrives already filled in',
            ],
        },
        {
            id: 'housekeeping',
            category: 'optional',
            status: 'proposed',
            name: 'Housekeeping',
            title: 'Keep rooms moving.',
            shortDescription: 'Turn each room change into a clear task instead of another message.',
            why: 'When a guest checks out, the room can become a housekeeping task instead of something your team has to remember to mention to each other.',
            dependsOn: ['rooms'],
            worksWith: ['staff'],
            story: [
                'A guest checks out',
                'The room needs cleaning',
                'Housekeeping sees the task',
                'The room is marked ready',
                'Availability updates on its own',
            ],
        },
        {
            id: 'payments',
            category: 'optional',
            status: 'proposed',
            name: 'Payments',
            title: 'Money against the booking, not beside it.',
            shortDescription: 'Record deposits and balances on the reservation they belong to.',
            why: 'A deposit tracked separately from the booking is a reconciliation job at the end of every month. Recorded against the reservation, it is simply part of the record.',
            dependsOn: ['bookings'],
            worksWith: ['website'],
            story: [
                'A booking is confirmed',
                'A deposit or balance is recorded',
                'The reservation shows what is outstanding',
            ],
        },
        {
            id: 'guest-comms',
            category: 'optional',
            status: 'proposed',
            name: 'Guest messages',
            title: 'Confirmations that send themselves.',
            shortDescription: 'Booking confirmations and arrival details, sent from the system.',
            why: 'Most guest messages are the same three messages. Sending them from the booking removes the typing and removes the chance of sending the wrong details.',
            dependsOn: ['guests'],
            worksWith: ['bookings'],
            story: [
                'A booking is confirmed',
                'A confirmation goes out with the right details',
                'Arrival information follows before the stay',
            ],
        },
        {
            id: 'reporting',
            category: 'optional',
            status: 'proposed',
            name: 'Reporting',
            title: 'See the month, not just today.',
            shortDescription: 'Occupancy and booking patterns across a period you choose.',
            why: 'The questions owners actually ask — how full were we, where did the bookings come from — are answerable only when every stay has been recorded in one place.',
            dependsOn: ['bookings'],
            worksWith: ['payments'],
            story: [
                'Every stay is recorded',
                'A period is chosen',
                'Occupancy and booking sources are shown',
            ],
        },
        {
            id: 'staff',
            category: 'optional',
            /* Verified: both delivered systems sit behind an authenticated admin
               portal with CSRF protection and password reset. Per-role scoping was
               NOT verified, so the copy below deliberately does not claim it. */
            status: 'built',
            name: 'Staff accounts',
            title: 'A private side your team signs into.',
            shortDescription: 'The management area behind your public site, protected by a real login.',
            why: 'Everything your team changes — rooms, rates, availability — happens somewhere the public cannot reach. That side of the system is where the actual work gets done.',
            dependsOn: [],
            worksWith: ['housekeeping'],
            story: [
                'Your team signs in',
                'They manage rooms, rates and reservations',
                'Guests only ever see the public site',
            ],
        },
        {
            id: 'multi-property',
            category: 'optional',
            status: 'proposed',
            name: 'Multiple properties',
            title: 'More than one property, one system.',
            shortDescription: 'Separate properties, separate rooms, one place to look.',
            why: 'Running a second property on a second system doubles the admin. Keeping them separate inside one system keeps the overview without mixing the operations up.',
            dependsOn: ['rooms'],
            worksWith: ['staff'],
            story: [
                'Each property keeps its own rooms',
                'Bookings stay with their property',
                'The overview covers all of them',
            ],
        },
        {
            id: 'restaurant',
            category: 'optional',
            /* Verified: both delivered systems carry a categorised digital menu
               (Local Corner, Mains, Pasta, Quick & Easy, Room Service) with per-item
               pricing. Charging to a room was NOT evidenced and is a separate
               module below, so this claims the menu and nothing more. */
            status: 'built',
            name: 'Restaurant menu',
            title: 'Your menu, without reprinting it.',
            shortDescription: 'A categorised digital menu on your site — including room service.',
            why: 'A menu in a PDF is out of date the day a price changes. Kept in the system, it is edited once and correct everywhere a guest looks.',
            dependsOn: [],
            worksWith: ['website'],
            story: [
                'Dishes are grouped into your own categories',
                'Prices are edited in one place',
                'Guests see the current menu before they arrive',
            ],
        },
        {
            id: 'conference',
            category: 'optional',
            /* Verified: a conference-room enquiry module on both systems, capturing
               company, contact, date, times, attendees, event type, AV and catering. */
            status: 'built',
            name: 'Conference & meetings',
            title: 'The other thing your rooms get booked for.',
            shortDescription: 'Meeting-space enquiries with dates, attendees, AV and catering.',
            why: 'Conference business arrives with completely different questions to a room booking — how many people, what times, what equipment. Asking them properly up front turns a vague enquiry into something you can actually quote.',
            dependsOn: [],
            worksWith: ['website'],
            story: [
                'A company asks about your meeting space',
                'They give dates, times and numbers',
                'AV and catering needs come with the enquiry',
                'You reply with a real quote',
            ],
        },
        {
            id: 'events',
            category: 'optional',
            /* Verified: an events module publishing upcoming events on both systems. */
            status: 'built',
            name: 'Events',
            title: 'What is on, kept current.',
            shortDescription: 'Publish upcoming events to your site without touching the code.',
            why: 'Events are the reason a lot of people look at your site at all. Being able to put one up yourself is the difference between the page being current and being a year out of date.',
            dependsOn: [],
            worksWith: ['website'],
            story: [
                'You add an upcoming event',
                'It appears on your site',
                'It comes down on its own once it has passed',
            ],
        },
        {
            id: 'integrations',
            category: 'optional',
            status: 'custom',
            name: 'Custom integrations',
            title: 'Connect what you already use.',
            shortDescription: 'Booking platforms, accounting or anything else you already depend on.',
            why: 'Every property already relies on something. Whether it can be connected — and how cleanly — depends entirely on what that something is, so this is scoped after a proper look.',
            dependsOn: [],
            worksWith: [],
            story: [
                'We look at what you already use',
                'We check what it will let us connect to',
                'We scope the connection honestly',
            ],
        },
    ];

    const ALL = CORE.concat(OPTIONAL);
    const BY_ID = ALL.reduce(function (map, mod) { map[mod.id] = mod; return map; }, {});
    const CORE_IDS = CORE.map(function (m) { return m.id; });

    const STATUS_LABEL = {
        built: 'Built before',
        proposed: 'Proposed module',
        custom: 'Custom development',
    };
    const STATUS_NOTE = {
        built: 'We have delivered this in real hotel-management work.',
        proposed: 'Designed for this product — not yet a standard module.',
        custom: 'Built specifically for your property rather than assumed.',
    };

    /* ---------------------------------------------------------------------
       STATE
       ------------------------------------------------------------------ */

    const state = {
        propertyType: '',
        propertyTypeLabel: '',
        rooms: 12,
        channels: [],
        pain: '',
        selected: [],
    };

    const ROOMS_MIN = 1;
    const ROOMS_MAX = 400;

    const isSelected = function (id) { return state.selected.indexOf(id) !== -1; };
    const isCoreId = function (id) { return CORE_IDS.indexOf(id) !== -1; };

    /* Every relationship of a module that is actually live in this system: its
       hard dependencies, plus the improvements whose other half is present. A core
       capability always counts as present — it is the foundation. Shared by the
       relation panel, the system map and the submitted payload so all three
       describe the same system; when this lived in three places they disagreed,
       and the map and the discovery brief silently dropped links to the
       foundation. */
    const activeLinks = function (mod) {
        return mod.dependsOn.concat(mod.worksWith.filter(function (id) {
            return isCoreId(id) || isSelected(id);
        }));
    };

    /* Selection order is the order the visitor built the system in, and the system
       map reads better when it reflects that. Sorting by catalogue order instead
       would make added modules jump around the map as they arrive. */
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

    /* ---------------------------------------------------------------------
       ANALYTICS
       The repository has no analytics platform, and the plan explicitly forbids
       adding one for this feature. So these are local signals only: a DOM event
       plus a push to window.dataLayer IF something else has already created it.
       Nothing is sent anywhere, and nothing carries a name, an address or free
       text — only the non-sensitive shape of the configuration.
       ------------------------------------------------------------------ */
    const track = function (name, detail) {
        const payload = Object.assign({ event: name }, detail || {});
        try {
            if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
            document.dispatchEvent(new CustomEvent('pm:builder', { detail: payload }));
        } catch (err) {
            /* Analytics must never be able to break the builder. */
        }
    };

    /* ---------------------------------------------------------------------
       SMALL DOM HELPERS
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
    /* "A, B and C" — the plain-language join the summary copy needs. */
    const sentenceJoin = function (parts) {
        if (!parts.length) return '';
        if (parts.length === 1) return parts[0];
        return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
    };
    const lower = function (name) {
        /* Module names are sentence-case already; only the first letter needs to
           come down when a name is dropped mid-sentence. Acronyms stay intact. */
        return name.charAt(0).toLowerCase() + name.slice(1);
    };

    /* ---------------------------------------------------------------------
       ROOT
       ------------------------------------------------------------------ */
    const root = document.querySelector('[data-hb]');
    if (!root) return;

    const $ = function (sel) { return root.querySelector(sel); };

    const coreHost = $('[data-hb-core]');
    const optionalHost = $('[data-hb-optional]');
    const mapHost = $('[data-hb-map]');
    const mapCount = $('[data-hb-mapcount]');
    const storyHost = $('[data-hb-story]');
    const summaryProperty = $('[data-hb-summary-property]');
    const summaryCore = $('[data-hb-summary-core]');
    const summaryOptional = $('[data-hb-summary-optional]');
    const summaryProse = $('[data-hb-summary-prose]');
    const typeHost = $('[data-hb-types]');
    const channelHost = $('[data-hb-channels]');
    const roomsOutput = $('[data-hb-rooms-value]');
    const roomsInput = $('[data-hb-rooms-input]');
    const painInput = $('[data-hb-pain]');

    /* Hidden fields the endpoint reads. Names are the submission contract. */
    const hidden = {
        propertyType: $('[name="property_type"]'),
        rooms: $('[name="rooms"]'),
        channels: $('[name="channels"]'),
        core: $('[name="core_features"]'),
        optional: $('[name="optional_features"]'),
        connections: $('[name="connections"]'),
        pain: $('[name="current_problem"]'),
    };

    /* ---------------------------------------------------------------------
       CHAPTER 01 — PROPERTY
       ------------------------------------------------------------------ */
    const PROPERTY_TYPES = [
        { id: 'lodge', label: 'Lodge' },
        { id: 'guesthouse', label: 'Guesthouse' },
        { id: 'boutique-hotel', label: 'Boutique hotel' },
        { id: 'hotel', label: 'Hotel' },
        { id: 'resort', label: 'Resort' },
        { id: 'multiple', label: 'Multiple properties' },
        { id: 'other', label: 'Something else' },
    ];

    const CHANNELS = [
        { id: 'website', label: 'Our website' },
        { id: 'whatsapp', label: 'WhatsApp' },
        { id: 'phone', label: 'Phone' },
        { id: 'platforms', label: 'Booking platforms' },
        { id: 'walk-ins', label: 'Walk-ins' },
        { id: 'other', label: 'Something else' },
    ];

    function renderChoices(host, items, group) {
        if (!host) return;
        clear(host);
        items.forEach(function (item) {
            const button = el('button', 'hb-choice');
            button.type = 'button';
            button.setAttribute('aria-pressed', 'false');
            button.dataset.choice = item.id;
            button.dataset.group = group;
            button.appendChild(el('span', 'hb-choice-label', item.label));
            /* A tick that is present for every choice, so selection is carried by
               a shape as well as by colour. */
            const mark = el('span', 'hb-choice-mark');
            mark.setAttribute('aria-hidden', 'true');
            button.appendChild(mark);
            host.appendChild(button);
        });
    }

    function setPropertyType(id) {
        const match = PROPERTY_TYPES.filter(function (t) { return t.id === id; })[0];
        if (!match) return;
        state.propertyType = match.id;
        state.propertyTypeLabel = match.label;
        typeHost.querySelectorAll('[data-choice]').forEach(function (button) {
            button.setAttribute('aria-pressed', String(button.dataset.choice === id));
        });
        track('property_type_selected', { property_type: match.id });
        update();
    }

    function toggleChannel(id) {
        const at = state.channels.indexOf(id);
        if (at === -1) state.channels.push(id); else state.channels.splice(at, 1);
        channelHost.querySelectorAll('[data-choice]').forEach(function (button) {
            button.setAttribute('aria-pressed', String(state.channels.indexOf(button.dataset.choice) !== -1));
        });
        update();
    }

    /* A number field with real +/- controls rather than a slider: on a phone a
       slider is the hardest possible way to say "eighteen". */
    function setRooms(value, announce) {
        let next = parseInt(value, 10);
        if (!Number.isFinite(next)) next = ROOMS_MIN;
        next = Math.min(ROOMS_MAX, Math.max(ROOMS_MIN, next));
        state.rooms = next;
        if (roomsInput && roomsInput.value !== String(next)) roomsInput.value = String(next);
        if (roomsOutput) roomsOutput.textContent = String(next);
        if (announce) update();
    }

    /* ---------------------------------------------------------------------
       MODULE CARDS
       ------------------------------------------------------------------ */

    function statusChip(mod) {
        const chip = el('span', 'hb-status hb-status--' + mod.status);
        chip.appendChild(el('span', 'hb-status-label', STATUS_LABEL[mod.status]));
        return chip;
    }

    function flowList(steps) {
        const list = el('ol', 'hb-flow');
        steps.forEach(function (step) {
            const item = el('li', 'hb-flow-step');
            item.appendChild(el('span', 'hb-flow-text', step));
            list.appendChild(item);
        });
        return list;
    }

    /* Core: explained, not offered. Presented as the foundation the whole system
       stands on, so it reads as a stable base rather than three pre-ticked boxes
       the visitor has to wonder about. */
    function renderCore() {
        if (!coreHost) return;
        clear(coreHost);
        CORE.forEach(function (mod) {
            const card = el('article', 'block hb-card hb-card--core');
            card.dataset.module = mod.id;

            const head = el('div', 'hb-card-head');
            head.appendChild(el('span', 'hb-card-name', mod.name));
            head.appendChild(statusChip(mod));
            card.appendChild(head);

            card.appendChild(el('h3', 'hb-card-title', mod.title));
            card.appendChild(el('p', 'hb-card-short', mod.shortDescription));
            card.appendChild(el('p', 'hb-card-why', mod.why));

            const foot = el('p', 'hb-card-foundation');
            foot.appendChild(el('span', 'hb-card-foundation-mark', '—'));
            foot.appendChild(document.createTextNode(' Part of every system we build. Not something to switch on.'));
            card.appendChild(foot);

            coreHost.appendChild(card);
        });
    }

    function renderOptional() {
        if (!optionalHost) return;
        clear(optionalHost);
        OPTIONAL.forEach(function (mod) {
            const card = el('article', 'block hb-card hb-card--optional');
            card.dataset.module = mod.id;

            const detailId = 'hb-detail-' + mod.id;

            const toggle = el('button', 'hb-card-toggle');
            toggle.type = 'button';
            toggle.setAttribute('aria-pressed', 'false');
            toggle.setAttribute('aria-controls', detailId);
            toggle.dataset.toggle = mod.id;

            const head = el('span', 'hb-card-head');
            head.appendChild(el('span', 'hb-card-name', mod.name));
            head.appendChild(statusChip(mod));
            toggle.appendChild(head);

            toggle.appendChild(el('span', 'hb-card-title', mod.title));
            toggle.appendChild(el('span', 'hb-card-short', mod.shortDescription));

            /* The action word carries the state in text as well as in colour and
               aria-pressed, so nothing about selection is colour-only. */
            const action = el('span', 'hb-card-action');
            const mark = el('span', 'hb-card-action-mark');
            mark.setAttribute('aria-hidden', 'true');
            action.appendChild(mark);
            action.appendChild(el('span', 'hb-card-action-label', 'Add to my system'));
            toggle.appendChild(action);

            /* The heading wraps the control rather than sitting beside it — the
               documented disclosure pattern. A <button> may not contain an <h3>
               (phrasing content only), and without a heading the whole module set
               would be invisible to heading navigation, so the nesting goes this
               way round. It changes nothing visually: .hb-card-heading is reset to
               inherit. */
            const heading = el('h3', 'hb-card-heading');
            heading.appendChild(toggle);
            card.appendChild(heading);

            const detail = el('div', 'hb-card-detail');
            detail.id = detailId;
            detail.hidden = true;

            detail.appendChild(el('p', 'hb-card-why', mod.why));

            const flowHead = el('p', 'hb-flow-head', 'How it runs');
            detail.appendChild(flowHead);
            detail.appendChild(flowList(mod.story));

            const relations = el('div', 'hb-relations');
            relations.dataset.relations = mod.id;
            detail.appendChild(relations);

            detail.appendChild(el('p', 'hb-card-statusnote', STATUS_NOTE[mod.status]));

            card.appendChild(detail);
            optionalHost.appendChild(card);
        });
    }

    /* The relationship explanation. Two different jobs in one place:
         - a hard dependency that is ALREADY met by the foundation is explained,
           not silently applied, so the visitor learns why the module belongs
           where it does;
         - a genuine improvement that is not yet selected becomes a real action,
           so a relationship never dead-ends in a sentence the visitor cannot act
           on. */
    /* Relations are re-rendered on every update, so a prompt that simply stays on
       screen would fire its event again on each unrelated change. The signal we
       want is "this suggestion was shown to someone", once. */
    const promptsSeen = [];

    function renderRelations(mod) {
        const host = root.querySelector('[data-relations="' + mod.id + '"]');
        if (!host) return;
        clear(host);

        /* Split on WHERE a relationship points, not on which list it came from.
           A `worksWith` entry aimed at a core capability is still part of the
           foundation and can never be "added" — offering it as an action would be
           a button that does nothing, which is exactly the dead-end selection the
           plan rules out. So core targets are always explained, and only optional
           ones can become a prompt. */
        const related = mod.dependsOn.concat(mod.worksWith);
        const coreRelated = related.filter(isCoreId);
        const optionalRelated = related.filter(function (id) { return !isCoreId(id); });

        if (coreRelated.length) {
            const note = el('p', 'hb-relation hb-relation--met');
            note.appendChild(el('span', 'hb-relation-tag', 'Builds on'));
            note.appendChild(document.createTextNode(
                sentenceJoin(listNames(coreRelated)) + ' — already part of your foundation, so nothing to add.'
            ));
            host.appendChild(note);
        }

        optionalRelated.forEach(function (id) {
            const other = BY_ID[id];
            if (!other) return;
            if (isSelected(id)) {
                const met = el('p', 'hb-relation hb-relation--met');
                met.appendChild(el('span', 'hb-relation-tag', 'Connected to'));
                met.appendChild(document.createTextNode(
                    other.name + ' — the two work together in your system.'
                ));
                host.appendChild(met);
                return;
            }

            const prompt = el('div', 'hb-relation hb-relation--prompt');
            prompt.appendChild(el('span', 'hb-relation-tag', 'Works best with'));
            prompt.appendChild(el('p', 'hb-relation-text',
                mod.name + ' works better alongside ' + lower(other.name) + '. ' + other.shortDescription));
            const add = el('button', 'btn secondary hb-relation-add');
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
            const card = root.querySelector('.hb-card[data-module="' + mod.id + '"]');
            if (!card) return;
            const on = isSelected(mod.id);
            const toggle = card.querySelector('[data-toggle]');
            const detail = card.querySelector('.hb-card-detail');
            const label = card.querySelector('.hb-card-action-label');

            card.classList.toggle('is-selected', on);
            if (toggle) toggle.setAttribute('aria-pressed', String(on));
            if (label) label.textContent = on ? 'In your system — remove' : 'Add to my system';

            if (detail) {
                const wasHidden = detail.hidden;
                detail.hidden = !on;
                /* The entrance runs only on the transition from closed to open, so
                   re-rendering relations after an unrelated change never replays it.
                   display:none suppresses animation, so toggling `hidden` off is
                   exactly the moment the keyframes can start. */
                if (on && wasHidden) {
                    detail.classList.remove('hb-assemble');
                    /* Force a reflow so the class re-add restarts the animation. */
                    void detail.offsetWidth;
                    detail.classList.add('hb-assemble');
                    track('workflow_story_opened', { module: mod.id });
                }
            }
            if (on) renderRelations(mod);
        });
    }

    /* ---------------------------------------------------------------------
       THE SYSTEM MAP — the composition grows as capabilities are added
       ------------------------------------------------------------------ */
    /* Which capabilities were on the map the last time it was drawn. The map is
       rebuilt from scratch on every change, so without this every tile would
       replay its entrance whenever one capability was toggled — the whole
       composition flickering for a single change. Only genuinely new tiles get
       the settle. */
    let mapped = [];

    function renderMap() {
        if (!mapHost) return;
        clear(mapHost);

        const property = el('div', 'hb-node hb-node--property');
        property.appendChild(el('span', 'hb-node-kind', 'Your property'));
        property.appendChild(el('span', 'hb-node-name',
            state.propertyTypeLabel || 'Not chosen yet'));
        property.appendChild(el('span', 'hb-node-meta',
            state.rooms + (state.rooms === 1 ? ' room' : ' rooms')));
        mapHost.appendChild(property);

        CORE.forEach(function (mod) {
            const node = el('div', 'hb-node hb-node--core');
            node.appendChild(el('span', 'hb-node-kind', 'Foundation'));
            node.appendChild(el('span', 'hb-node-name', mod.name));
            mapHost.appendChild(node);
        });

        state.selected.forEach(function (id) {
            const mod = BY_ID[id];
            if (!mod) return;
            const isNew = mapped.indexOf(id) === -1;
            const node = el('div', 'hb-node hb-node--added' + (isNew ? ' hb-node--enter' : ''));
            node.appendChild(el('span', 'hb-node-kind', STATUS_LABEL[mod.status]));
            node.appendChild(el('span', 'hb-node-name', mod.name));

            /* What this block is wired to, in the visitor's words. */
            const links = activeLinks(mod);
            if (links.length) {
                node.appendChild(el('span', 'hb-node-meta',
                    'Connects to ' + sentenceJoin(listNames(links))));
            }
            mapHost.appendChild(node);
        });

        mapped = state.selected.slice();

        if (mapCount) {
            const total = CORE.length + state.selected.length;
            mapCount.textContent = state.selected.length === 0
                ? 'Three foundation capabilities, nothing added yet.'
                : total + ' capabilities — three in the foundation, '
                    + state.selected.length + ' added.';
        }
    }

    /* ---------------------------------------------------------------------
       THE WORKFLOW STORY — assembled from what is actually selected
       ------------------------------------------------------------------ */
    function buildStory() {
        const steps = [];
        const on = isSelected;

        if (on('website')) {
            steps.push('A guest finds your property online and sees what is genuinely free.');
            steps.push('They book themselves, and the booking arrives already filled in.');
        } else {
            steps.push('A booking comes in — however your guests reach you today.');
            steps.push('It is entered once, into one system, instead of into a diary and a phone.');
        }

        if (on('payments')) {
            steps.push('A deposit or balance is recorded against that reservation, not beside it.');
        }

        steps.push('Room availability updates, so the next enquiry gets a true answer.');

        if (on('guest-comms')) {
            steps.push('A confirmation goes out to the guest with the right details on it.');
        }

        steps.push('The guest\'s details stay attached to the stay, ready for their arrival.');

        if (on('restaurant')) {
            steps.push('During the stay they order from a menu that is always the current one, room service included.');
        }

        if (on('housekeeping')) {
            steps.push('At checkout the room becomes a housekeeping task instead of a message someone has to remember.');
            steps.push('Once it is marked ready, the room goes back into availability on its own.');
        }

        if (on('staff')) {
            steps.push('Each person on your team does this signed in as themselves, seeing what their role needs.');
        }

        if (on('multi-property')) {
            steps.push('And the same is true at every property you run, without mixing them together.');
        }

        if (on('reporting')) {
            steps.push('Every completed stay adds to what you can see across the month.');
        }

        /* Conference and events are not part of one guest's stay, so they close the
           story as the other things the same system carries rather than being
           forced into the middle of it. */
        if (on('conference')) {
            steps.push('Separately, meeting-space enquiries arrive with the dates, numbers and equipment already asked for.');
        }
        if (on('events')) {
            steps.push('And what is on at the property stays current without anyone touching the code.');
        }

        return steps;
    }

    function renderStory() {
        if (!storyHost) return;
        clear(storyHost);
        buildStory().forEach(function (step, index) {
            const item = el('li', 'hb-story-step');
            item.appendChild(el('span', 'hb-story-index', String(index + 1).padStart(2, '0')));
            item.appendChild(el('p', 'hb-story-text', step));
            storyHost.appendChild(item);
        });
    }

    /* ---------------------------------------------------------------------
       THE SUMMARY
       ------------------------------------------------------------------ */
    function renderSummary() {
        if (summaryProperty) {
            clear(summaryProperty);
            const type = el('p', 'hb-summary-line');
            type.appendChild(el('span', 'hb-summary-key', 'Property'));
            type.appendChild(el('span', 'hb-summary-value',
                state.propertyTypeLabel || 'Not chosen yet'));
            summaryProperty.appendChild(type);

            const rooms = el('p', 'hb-summary-line');
            rooms.appendChild(el('span', 'hb-summary-key', 'Rooms'));
            rooms.appendChild(el('span', 'hb-summary-value',
                'About ' + state.rooms));
            summaryProperty.appendChild(rooms);

            const channels = el('p', 'hb-summary-line');
            channels.appendChild(el('span', 'hb-summary-key', 'Bookings arrive by'));
            channels.appendChild(el('span', 'hb-summary-value',
                state.channels.length
                    ? sentenceJoin(state.channels.map(channelLabel))
                    : 'Not chosen yet'));
            summaryProperty.appendChild(channels);
        }

        if (summaryCore) {
            clear(summaryCore);
            CORE.forEach(function (mod) {
                const item = el('li', 'hb-summary-item');
                item.appendChild(el('span', 'hb-summary-item-name', mod.name));
                item.appendChild(el('span', 'hb-summary-item-note', mod.shortDescription));
                summaryCore.appendChild(item);
            });
        }

        if (summaryOptional) {
            clear(summaryOptional);
            if (!state.selected.length) {
                const empty = el('li', 'hb-summary-item hb-summary-item--empty');
                empty.appendChild(el('span', 'hb-summary-item-name', 'Nothing added yet'));
                empty.appendChild(el('span', 'hb-summary-item-note',
                    'The foundation on its own is a complete, working system. Add only what your operation actually needs.'));
                summaryOptional.appendChild(empty);
            } else {
                state.selected.forEach(function (id) {
                    const mod = BY_ID[id];
                    if (!mod) return;
                    const item = el('li', 'hb-summary-item');
                    item.appendChild(el('span', 'hb-summary-item-name', mod.name));
                    item.appendChild(el('span', 'hb-summary-item-note', mod.shortDescription));
                    item.appendChild(el('span', 'hb-summary-item-status', STATUS_LABEL[mod.status]));
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
        let text = 'Your bookings, rooms and guest details sit in one system, so the answer to '
            + '"is that room free" is the same wherever it is asked.';

        if (on('website')) {
            text += ' Your website shows that same availability and takes the booking itself, '
                + 'so a reservation arrives complete instead of as a message to type up.';
        }
        if (on('payments')) {
            text += ' Deposits and balances are recorded against the reservation they belong to.';
        }
        if (on('guest-comms')) {
            text += ' Confirmations go out from the booking, with the details already correct.';
        }
        if (on('housekeeping')) {
            text += ' Housekeeping turns each checkout into a clear next task for your team, '
                + 'and the room returns to availability once it is ready.';
        }
        if (on('restaurant')) {
            text += ' Your restaurant menu, room service included, stays current on the same site.';
        }
        if (on('conference')) {
            text += ' Meeting-space enquiries come in with the dates, numbers and equipment already asked for.';
        }
        if (on('events')) {
            text += ' You can put an event up yourself and take it down when it has passed.';
        }
        if (on('staff')) {
            text += ' Your team works in a private management area behind a real login.';
        }
        if (on('multi-property')) {
            text += ' Every property you run works this way without being mixed together.';
        }
        if (on('reporting')) {
            text += ' And every completed stay adds to what you can see across the month.';
        }
        return text;
    }

    function channelLabel(id) {
        const match = CHANNELS.filter(function (c) { return c.id === id; })[0];
        return match ? match.label : id;
    }

    /* ---------------------------------------------------------------------
       SUBMISSION PAYLOAD
       IDs only. The endpoint owns the labels and rejects anything it does not
       recognise, so nothing a forged POST invents can reach an inbox as though
       ProManaged offered it.
       ------------------------------------------------------------------ */
    function syncHidden() {
        if (hidden.propertyType) hidden.propertyType.value = state.propertyType;
        if (hidden.rooms) hidden.rooms.value = String(state.rooms);
        if (hidden.channels) hidden.channels.value = state.channels.join(',');
        if (hidden.core) hidden.core.value = CORE_IDS.join(',');
        if (hidden.optional) hidden.optional.value = state.selected.join(',');
        if (hidden.pain) hidden.pain.value = painInput ? painInput.value : '';

        /* The relationships the visitor actually assembled, so the discovery brief
           shows the shape of the system and not just a list of names. */
        const connections = [];
        state.selected.forEach(function (id) {
            const mod = BY_ID[id];
            if (!mod) return;
            const links = activeLinks(mod);
            if (links.length) connections.push(mod.id + '>' + links.join('+'));
        });
        if (hidden.connections) hidden.connections.value = connections.join(';');
    }

    /* ---------------------------------------------------------------------
       GUIDED PROGRESSION
       Finishing a step carries the visitor to the next one, slowly.

       The rule this follows: it may only ever act on the visitor's behalf when
       they have stopped acting for themselves. Every step below is driven by a
       real completion condition rather than a timer on reading speed, fires at
       most once, only ever moves forward, and is abandoned the moment the
       visitor touches the page. If it is cancelled it is not cancelled for good
       — the next completed action schedules it again — so it can never strand
       someone who simply scrolled at the wrong moment.

       The read-only chapters between these two deliberately do NOT auto-advance.
       There is nothing to complete in them, so the only possible trigger would be
       a timer on how fast someone reads, which would scroll the page out from
       under a slow reader. See §"Guided progression" in the plan.
       ------------------------------------------------------------------ */

    const FLOW = [
        {
            id: 'property',
            target: '#foundation',
            /* Room count has a usable default and the problem note is optional, so
               those two cannot signal completion. Type plus at least one channel is
               the point at which the visitor has actually told us how they work. */
            done: function () { return state.propertyType !== '' && state.channels.length > 0; },
            settle: 1100,
        },
        {
            id: 'additions',
            target: '#system',
            done: function () { return state.selected.length > 0; },
            /* Longer, because a selection opens a detail panel worth reading. Any
               scroll while reading cancels this anyway; the pause is for the visitor
               who reads a short panel without needing to scroll at all. */
            settle: 2600,
        },
    ];

    const advanced = [];
    let pendingAdvance = null;
    let flowArmed = false;

    function cancelAdvance() {
        if (!pendingAdvance) return;
        window.clearTimeout(pendingAdvance.timer);
        // stop() drops the listeners and flags any running scroll to halt on its
        // next frame, which is what actually ends the animation.
        pendingAdvance.stop();
        pendingAdvance = null;
    }

    /* A deliberately slow scroll. The browser's own smooth behaviour is tuned for
       "get me there", which is the wrong register for a guided step — this is
       closer to the weighted pacing the rest of the site's motion uses.

       Each frame must be an INSTANT jump to the next eased position. css/global_styles.css
       sets scroll-behavior:smooth on html, and `behavior:'auto'` means "use the CSS
       property" rather than "jump" — so with 'auto' every frame started a fresh
       smooth scroll of its own, each one chasing the last. Measured: the travel
       lagged and stopped ~600px short of the target. 'instant' is the value that
       actually overrides the stylesheet. */
    function slowScrollTo(el) {
        const cs = getComputedStyle(document.documentElement);
        const headerH = parseFloat(cs.getPropertyValue('--header-h')) || 76;
        const navFloat = parseFloat(cs.getPropertyValue('--nav-float')) || 0;
        const offset = headerH + navFloat + 16;

        const from = window.scrollY;
        const to = Math.max(0, from + el.getBoundingClientRect().top - offset);
        const distance = to - from;

        // Never drag anyone backwards, and never animate a move nobody would see.
        if (distance < 24) return null;

        // Long enough to read as deliberate, capped so a big jump is not a journey.
        const duration = Math.min(2400, Math.max(1200, Math.abs(distance) * 0.9));
        const started = performance.now();
        // easeInOutCubic: leaves and arrives slowly, travels in the middle.
        const ease = function (t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const state_ = { raf: 0, cancelled: false };
        const step = function (now) {
            if (state_.cancelled) return;
            const t = Math.min(1, (now - started) / duration);
            window.scrollTo({ top: from + distance * ease(t), behavior: 'instant' });
            if (t < 1) state_.raf = window.requestAnimationFrame(step);
        };
        state_.raf = window.requestAnimationFrame(step);
        return state_;
    }

    function scheduleAdvance(entry) {
        cancelAdvance();

        const target = root.querySelector(entry.target) || document.querySelector(entry.target);
        if (!target) return;

        /* Anything that shows the visitor is driving abandons the attempt. `scroll`
           is deliberately NOT in this list: the animation below scrolls the page
           itself and would instantly cancel itself. */
        const abandon = function () { cancelAdvance(); };
        const EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
        EVENTS.forEach(function (name) {
            window.addEventListener(name, abandon, { passive: true });
        });

        const stop = function () {
            EVENTS.forEach(function (name) { window.removeEventListener(name, abandon); });
            if (pendingAdvance && pendingAdvance.motion) pendingAdvance.motion.cancelled = true;
        };

        const timer = window.setTimeout(function () {
            // Already where we were going: nothing to do, but the step is spent.
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
                // Release the listeners once the travel is over.
                window.setTimeout(function () {
                    stop();
                    pendingAdvance = null;
                }, 2500);
            }
        }, entry.settle);

        pendingAdvance = { timer: timer, stop: stop, motion: null };
    }

    function maybeAdvance() {
        // Not during boot, and never when the visitor has asked for less motion:
        // moving the page for someone is precisely what that setting rules out.
        if (!flowArmed || prefersReducedMotion()) return;
        for (let i = 0; i < FLOW.length; i++) {
            const entry = FLOW[i];
            if (advanced.indexOf(entry.id) !== -1) continue;
            if (entry.done()) {
                scheduleAdvance(entry);
                return;
            }
        }
    }

    /* ---------------------------------------------------------------------
       THE ONE UPDATE PATH
       ------------------------------------------------------------------ */
    function update() {
        paintOptional();
        renderMap();
        renderStory();
        renderSummary();
        syncHidden();
        maybeAdvance();
    }

    /* ---------------------------------------------------------------------
       EVENTS — delegated, so re-rendered cards never need rebinding
       ------------------------------------------------------------------ */
    root.addEventListener('click', function (event) {
        if (!(event.target instanceof Element)) return;

        const choice = event.target.closest('[data-choice]');
        if (choice && root.contains(choice)) {
            if (choice.dataset.group === 'type') setPropertyType(choice.dataset.choice);
            else if (choice.dataset.group === 'channel') toggleChannel(choice.dataset.choice);
            return;
        }

        const toggle = event.target.closest('[data-toggle]');
        if (toggle && root.contains(toggle)) {
            const id = toggle.dataset.toggle;
            if (isSelected(id)) {
                deselectModule(id);
            } else {
                selectModule(id);
                track('optional_feature_selected', { module: id });
            }
            update();
            return;
        }

        const add = event.target.closest('[data-add]');
        if (add && root.contains(add)) {
            const id = add.dataset.add;
            if (selectModule(id)) {
                track('optional_feature_selected', { module: id, via: 'dependency_prompt' });
                update();
                /* Move the visitor to the block they just created rather than
                   leaving them looking at the prompt for something now added. */
                const card = root.querySelector('.hb-card[data-module="' + id + '"]');
                if (card) {
                    const focusTarget = card.querySelector('[data-toggle]');
                    if (focusTarget) focusTarget.focus({ preventScroll: true });
                    card.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
                }
            }
            return;
        }

        const step = event.target.closest('[data-hb-rooms-step]');
        if (step && root.contains(step)) {
            setRooms(state.rooms + parseInt(step.dataset.hbRoomsStep, 10), true);
        }
    });

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    if (roomsInput) {
        roomsInput.addEventListener('input', function () { setRooms(roomsInput.value, true); });
        /* Re-clamp on blur: `input` leaves a half-typed value alone so the field is
           usable, but an out-of-range one must not survive being left. */
        roomsInput.addEventListener('blur', function () { setRooms(roomsInput.value, true); });
    }
    if (painInput) {
        painInput.addEventListener('input', syncHidden);
    }

    /* Story panels are a disclosure, so Escape should close the one in focus. */
    root.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape' || !(event.target instanceof Element)) return;
        const card = event.target.closest('.hb-card--optional.is-selected');
        if (!card) return;
        const id = card.dataset.module;
        if (deselectModule(id)) {
            update();
            const toggle = card.querySelector('[data-toggle]');
            if (toggle) toggle.focus();
        }
    });

    const form = document.querySelector('#hospitality-form');
    if (form) {
        /* form_intake.js owns validation and transport. This only guarantees the
           payload is current at the moment of submit — a visitor who types a note
           and hits Enter must not send the previous value. */
        form.addEventListener('submit', function () {
            syncHidden();
            track('hospitality_enquiry_submitted', {
                property_type: state.propertyType,
                optional_count: state.selected.length,
            });
        }, true);
    }

    /* ---------------------------------------------------------------------
       BOOT
       ------------------------------------------------------------------ */
    renderChoices(typeHost, PROPERTY_TYPES, 'type');
    renderChoices(channelHost, CHANNELS, 'channel');
    renderCore();
    renderOptional();
    setRooms(state.rooms, false);
    update();
    root.classList.add('hb-ready');
    track('builder_started', {});

    /* Armed only after the first render, so the boot pass can never schedule an
       advance before the visitor has done anything. */
    flowArmed = true;

    /* "Completed" means the visitor actually reached the proposed system with a
       property described — not that they submitted. It is the product-learning
       signal for how far people get, so it fires once and only once. */
    const summarySection = $('[data-hb-summary]');
    if (summarySection && 'IntersectionObserver' in window) {
        const seen = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                seen.disconnect();
                track('configuration_completed', {
                    property_type: state.propertyType,
                    optional_count: state.selected.length,
                    optional: state.selected.join(','),
                });
            });
        }, { threshold: 0.2 });
        seen.observe(summarySection);
    }
})();
