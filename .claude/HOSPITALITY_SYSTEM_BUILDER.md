# ProManaged IT — HOSPITALITY SYSTEM BUILDER

## Purpose

Build a new interactive hospitality-system discovery experience for ProManaged IT. This is a **separate execution plan** from `.claude/BUILD_PLAN.md` and must be read together with it. It does not replace or rewrite the main site design system.

The product idea is simple:

> **Let a lodge or small hospitality business design the system it actually needs, while ProManaged learns how that business operates.**

This is not a conventional contact form, pricing calculator, or generic SaaS feature checklist. It is a guided **product configurator + discovery journey + qualified enquiry**.

---

## CURRENT STATUS

- **Completed:** The builder is finished and verified end to end — property intake → foundation → optional modules with dependency explanation → live system map → generated workflow story → configuration summary → structured enquiry with its own endpoint and branded emails. Verified in a real browser at all seven required widths, and by two live submissions that delivered real mail through the production SMTP transport.
- **In progress:** None.
- **Next:** Nothing outstanding on this plan. See "Standing rules" below for what governs future changes.
- **Blocked:** None.
- **Source-system research (§19): done.** Both delivered systems were inspected read-only on 14 Aug 2026. The catalogue was corrected as a result — `restaurant` and `staff` reclassified, `conference` and `events` added — so eight of fourteen capabilities now rest on verified delivered work rather than four. Full findings in §19.

### Verification performed

Recorded so a later session does not repeat it or wrongly assume it never happened.

- **Responsive.** Measured in Chromium at 375, 430, 768, 1024, 1440, 1600 and 1920px, in the worst case (every module selected, every detail panel open, longest property-type label, 250 rooms, a long free-text problem). `documentElement.scrollWidth` equalled the viewport at every width, and a per-element sweep found zero elements crossing either edge. The 1880px rail ceiling holds exactly at 1920. The tablet stage resolves to one lead card plus four clean pairs; the desktop stage to 7+5, 5+7, 4+4+4, 5+7.
- **Touch targets.** Every builder control measures ≥44px at 375px. Two sub-44px elements exist on the page and are both out of scope: the shared `.nav-cta` in the site-wide navigation rail (42px, pre-existing chrome on every page) and the clipped honeypot input.
- **Email.** Two real submissions through `php/hospitality.php` returned 200 with no PHP notice, warning or mail error. Both messages were addressed to `info@promanaged-it.com` so nothing reached a third party. The rendered brief was inspected directly, and escaping was proven against `<script>`, `<img onerror>` and `<b>` payloads — all neutralise to entities.
- **Console.** Zero errors and zero warnings.

### Bugs found by that verification and fixed in the same cycle

1. **A dead-end dependency action.** `guest-comms` lists `bookings` — a *core* capability — in `worksWith`, which rendered an "Add Bookings" button. Core cannot be added, so the button did nothing: exactly the dead-end selection §8 forbids. The relation panel now splits on *where* a relationship points rather than which list it came from, so a core target is always explained and never offered as an action.
2. **The same flaw in two more places.** The system map and the submitted payload both computed links as `dependsOn + worksWith.filter(isSelected)`, which silently dropped every link to the foundation — the discovery brief was under-reporting the system. All three now share one `activeLinks()` helper, so the panel, the map and the brief describe the same system.
3. **An expanded card stretching its neighbour.** The shared `.grid` stretches its children, so opening one module's detail dragged the card beside it to the same height and left a tall empty box. `.hb-modules` now aligns to `start`, so only the expanded card grows.

### Guided progression

Completing a step carries the visitor to the next one in a slow, weighted scroll
(~1.2–2.4s, eased, landing the chapter just under the fixed rail).

It may only ever act when the visitor has stopped acting for themselves. Every
advance is driven by a real completion condition, fires at most once, only moves
forward, and is abandoned the instant the visitor scrolls, taps, or presses a
key. Abandoning is not permanent — the next completed action reschedules it — so
it can never strand someone who scrolled at the wrong moment. It is disabled
entirely under `prefers-reduced-motion`, since moving the page on someone's
behalf is exactly what that setting rules out.

| From | Advances when | To |
| --- | --- | --- |
| 01 Your property | A property type **and** at least one booking channel are chosen. Room count has a usable default and the problem note is optional, so neither can signal completion. | 02 The foundation |
| 03 Your additions | At least one module is selected, then a 2.6s pause. Longer than step 01's because a selection opens a detail panel worth reading — and any scroll while reading cancels it. | 04 Your system |

**Every chapter also ends with a continue control** (`.hb-next`), which runs the
same weighted scroll. This is how the read-only chapters move the visitor on:
there is nothing to complete in 02, 04, 05 or 06, so the only automatic trigger
available would be a timer on how fast someone reads, which would pull the page
out from under a slow reader. An explicit invitation engages without hijacking,
and it completes the chain end to end:

`01 → 02 → 03 → 04 → 05 → 06 → 07`

Each control is a real `<a href="#…">`, so it still navigates with JavaScript
off; the script upgrades it to the weighted scroll and marks that step spent, so
an automatic advance cannot fire a second jump straight after.

**The free-text note is a completion signal too.** It is the last thing in
chapter 01, so `done()` also requires that it does not currently have focus —
otherwise "pick a type, pick a channel, start writing" would scroll the page away
from the box the visitor was about to type in. Blurring it re-tests the step and
advances. `focusin` is in the abandon list for the same reason: focus moved
without a pointer or key (assistive technology, or a script) would otherwise
leave a pending advance armed.

**Implementation note.** Each animation frame scrolls with `behavior: 'instant'`.
`'auto'` means "use the CSS `scroll-behavior` property", and `css/global_styles.css`
sets `smooth` on `html` — so with `'auto'` every frame kicked off a fresh smooth
scroll chasing the last one, and the travel measurably stopped ~600px short.

### Density — how the chapter avoids being a wall

Eleven modules shown flat asked the visitor to weigh eleven things at once, which
is the "dense checklist" §11 rules out. They are rendered as **three labelled
groups** — what your guests see (5), how your team runs the day (4), when you
outgrow one property (2) — so the chapter is three small questions with three
landmarks rather than one long list. `GROUPS` in `js/hospitality_builder.js` owns
membership and order; the ≥900px spans are composed per group so layout and
membership stay together, and both are asserted by the test suite.

The core cards also dropped a per-card footer that repeated the same sentence
three times directly under a chapter lede already making the point.

### Contrast

Two real defects were found by measuring, not by eye, and both are fixed:

1. **The core card footer rendered in `--color-text-muted`** — a *light-surface*
   token — giving dark grey on a dark card at about **1.9:1**. `.block p` is
   (0,1,1) and beat the bare `.hb-card-foundation` at (0,1,0). That line is now
   gone entirely (see above), and the rule that remains is prefixed with
   `.hb-card--core` so specificity cannot lose again.
2. **The foundation cards barely separated from their own chapter.**
   `--color-graphite-soft` on `--color-graphite` measured **1.19:1** — not a card
   on a background but one dark mass. Lifted to 16% ivory, now **1.6:1**.

Three further marginal failures were cleared: the system map's property tile
(4.12 and 3.77 against earth) and the summary keys (4.46).

**When auditing contrast here, measure elements that own a text node directly,
not just leaf elements.** The first audit missed defect 1 entirely because that
paragraph also contains a `<span>`, so a leaf-only walk skipped it.

### Cursor in the builder

`[data-hb]` carries `data-cursor-calm`, honoured by `js/interface_motion.js`.

The site's four-mode instrument cursor is right for editorial chapters, where a
change of mode is an occasional event. Across the builder's steps — wall-to-wall
cards, controls and copy — the same behaviour fires constantly: the frame snaps
around a whole card, collapses to a caret over its paragraph, expands to a link
ring over its button, and back, every few pixels of travel. Inside a marked
region the cursor keeps two states only (control, or not), so it stops competing
with the task. Everywhere else on the site is untouched.

### Standing rules

These replace the one-off gates this plan originally carried, and are enforced automatically rather than by remembering.

- **`tests/hospitality_builder.test.js`** — catalogue integrity, the honesty contract, and browser/endpoint catalogue sync. Run with `node tests/hospitality_builder.test.js`.
- **`tests/hospitality_endpoint.test.php`** — the endpoint's trust boundary against hostile input. Run with `php tests/hospitality_endpoint.test.php`.

Run both before any change to the catalogue, the endpoint or the builder script.

### Decisions taken during implementation

Recorded here because they resolve ambiguities in the plan and will shape future cycles.

1. **Core is fixed, not selectable.** §6 calls Core "the stable foundation, not arbitrary checkboxes", so bookings/rooms/guests are explained and always present rather than pre-ticked. The endpoint ignores the submitted `core_features` value entirely — the foundation is what it is regardless of what a POST claims.
2. **No navigation tile was added.** §3 permits one "if the existing bento navigation can accommodate it without becoming crowded". It cannot: `css/navbar.css` composes the panel for exactly seven tiles (per-tile stagger delays 1–7, minor tiles at `span 4`), and an eighth would break the row and arrive with no stagger. The entry point is the Build-page CTA instead.
3. **A dedicated endpoint, `php/hospitality.php`.** §16 allows one where justified. The payload is a structured configuration rather than a message, and `contact.php` has no shape for it. Everything underneath is unchanged — the same `http.php` sanitisers, the same `pm_internal_email` / `pm_customer_email` templates, the same PHPMailer transport.
4. **The browser submits catalogue IDs, never labels.** Every label a human reads is resolved server-side from an allow-list, so a forged POST cannot invent a capability and have it arrive in an inbox looking like something ProManaged offers.
5. **Analytics are local only.** §21 forbids adding a platform and none exists in the repository, so events dispatch a DOM `CustomEvent` and push to `window.dataLayer` only if something else already created it. Nothing is sent anywhere and no event carries a name, address or free text. `core_feature_selected` is not emitted — core is not selectable (see 1).

The customer should feel:

> "I'm designing my own hospitality system with ProManaged."

ProManaged should receive a structured, useful discovery brief at the end.

The experience should also become the foundation for a future ProManaged hospitality SaaS product. It must therefore be designed around a clear **Core → Optional Modules → Dependencies → Workflows → Proposed System** model rather than hard-coded one-off marketing copy.

---

## 1. READ FIRST — SOURCE OF TRUTH

Before implementing anything, Claude MUST read the current live repository and these files:

1. `.claude/BUILD_PLAN.md`
2. `.claude/PROJECT_CONTEXT.md`
3. `.claude/PROJECT_CREDIBILITY.md`
4. this file: `.claude/HOSPITALITY_SYSTEM_BUILDER.md`
5. the current `index.html`
6. the current software/build page: `pages/custom_websites.html`
7. the current form/backend implementation and its PHP/PHPMailer contract
8. existing motion/navigation/bento CSS and JS relevant to the new experience

The current repository is authoritative. Do not rely on stale screenshots or conversation memory when implementation differs from the live tree.

---

## 2. NON-NEGOTIABLE DESIGN PROTECTION

**THIS IS AN ADDITION TO THE EXISTING PROMANAGED WEBSITE, NOT A REDESIGN.**

The current website's luxury/editorial **Signal & Systems** language must remain intact.

Preserve and reuse:

- current typography system;
- current tokens and colour system;
- current 1880px visual rail;
- current 7fr / 5fr hero philosophy where applicable;
- current `nav-rail`;
- current bento navigation;
- current `.btn`, `.primary`, `.secondary`, `.hero-buttons` contracts;
- current Building Blocks motion system;
- current dark graphite and warm light chapter rhythm;
- current asymmetric bento language;
- current shared footer;
- current accessibility conventions;
- current form/backend contracts.

Do NOT:

- redesign the homepage;
- replace the nav-rail;
- introduce a new design system;
- introduce a frontend framework;
- introduce a generic SaaS dashboard aesthetic;
- use generic blue SaaS cards;
- turn the experience into a conventional multi-column form;
- use loud gradients or excessive glassmorphism;
- use cartoon animations;
- introduce a new animation library;
- change existing site logic unnecessarily.

The new experience should look like a **premium ProManaged product journey**, not a separate microsite from another company.

---

## 3. PRODUCT EXPERIENCE

Recommended public route:

`pages/hospitality_builder.html`

Recommended stylesheet:

`css/hospitality_builder.css`

Recommended behaviour script:

`js/hospitality_builder.js`

These names are implementation guidance. Before creating them, inspect the repository and use the nearest existing conventions if a safer equivalent already exists.

The experience should be reachable from the existing Build/software story, not presented as a disconnected top-level business pillar.

Recommended entry points:

### Software / Build page
A premium editorial CTA:

**Build a hospitality system**

> Tell us how your property works. We'll show you what your system could become.

### Homepage
Use a smaller proof/entry moment only if it fits naturally into the existing Build/credibility narrative. Do not make the homepage about hospitality.

### Navigation
Hospitality Builder may appear as a secondary Build destination if the existing bento navigation can accommodate it without becoming crowded. Do not add another major navigation category.

---

## 4. COMMERCIAL OBJECTIVE

The experience has five simultaneous jobs:

1. Help a prospective lodge/hotel owner understand what a hospitality system can actually do.
2. Let them select only what is relevant to their operation.
3. Explain how selected capabilities work together.
4. Generate useful discovery information for ProManaged.
5. Validate demand and feature priorities for a future hospitality SaaS product.

The user is NOT buying a fixed product during this first version.

The final configuration is a **proposed system / discovery brief**, not a guaranteed price or fixed scope.

The final messaging must make this clear:

> "Your configuration is a starting point. We'll review how your property operates and recommend the right implementation."

Do not promise automatic implementation, fixed pricing, delivery dates, or SaaS availability unless those are actually supported by the product.

---

## 5. PSYCHOLOGICAL JOURNEY

The experience should feel like a guided story, not a questionnaire.

Canonical journey:

**ORIENT → UNDERSTAND → BUILD → CONNECT → VISUALISE → SUMMARISE → START**

### Chapter 01 — Your property

Headline direction:

**Start with how your property works.**

Explain that every property operates differently.

Collect only useful first-level context:

- property type;
- approximate room count;
- current booking channels;
- optional current pain point.

Property types should be simple and non-technical:

- Lodge
- Guesthouse
- Boutique hotel
- Hotel
- Resort
- Multiple properties
- Other

Room count should use an accessible number control, not a difficult slider.

Booking channels may include:

- Website
- WhatsApp
- Phone
- Booking platforms
- Walk-ins
- Other

Do not ask for a full contact form yet.

---

## 6. CHAPTER 02 — THE FOUNDATION

Introduce the idea of a hospitality system.

Suggested copy direction:

> **Every property starts with a foundation. Add only what your operation actually needs.**

Core capabilities should be visually and semantically distinct from optional modules.

Initial Core candidates:

### Bookings
Manage reservations from one place.

### Rooms
Know what is available, occupied, reserved or being prepared.

### Guests
Keep guest information connected to every stay.

The exact final Core list MUST be determined by inspecting the actual Rosalyn's and Liwonde Sun systems and identifying common functionality.

Do not assume the above is complete or technically accurate until the source systems are inspected.

Core capabilities should be presented as the stable foundation, not as arbitrary checkboxes.

---

## 7. CHAPTER 03 — OPTIONAL CAPABILITIES

After the foundation is understood, introduce optional modules progressively.

Potential modules to investigate from the real systems and business requirements include:

- Website + booking engine
- Housekeeping
- Payments
- Guest communications / WhatsApp
- Reporting
- Staff accounts / permissions
- Multiple properties
- Restaurant / POS
- Additional operational workflows
- Custom integrations

These are **candidate modules**, not a promise that every one exists or will ship in the MVP.

The implementation must distinguish:

**Available now / proposed module / custom development**

rather than implying that all future features are already productised.

---

## 8. FEATURE DEPENDENCIES — THE IMPORTANT PART

The differentiating feature of this experience is not selection. It is **relationship explanation**.

When a user selects a feature, explain how it connects to what they already selected.

Example:

### Housekeeping

Instead of only showing:

`✓ Housekeeping`

show:

> **Keep rooms moving.**
>
> When a guest checks out, the room can become a housekeeping task instead of another message your team has to remember.

Then visually show:

**Checkout → Needs cleaning → Housekeeping task → Ready → Available**

If Housekeeping depends on Rooms, the UI should explain the dependency:

> **Housekeeping works best with Rooms. Add Rooms so your team can see which spaces need attention.**

Provide an obvious action to add the dependency.

Do not silently select features without explaining why.

Do not create dead-end selections.

---

## 9. FEATURE STORY ENGINE

Every module should have structured metadata rather than hard-coded prose scattered throughout JavaScript.

Recommended data model:

```js
{
  id: 'housekeeping',
  category: 'optional',
  title: 'Keep rooms moving',
  name: 'Housekeeping',
  shortDescription: 'Turn room changes into clear tasks for your team.',
  why: 'When a guest checks out, the room can become a housekeeping task instead of another message to remember.',
  dependsOn: ['rooms'],
  unlocks: [],
  story: [
    'Guest checks out',
    'Room needs cleaning',
    'Housekeeping sees the task',
    'Room becomes ready',
    'Availability updates'
  ]
}
```

The exact schema may be adapted to repository conventions, but the following concepts must exist:

- unique ID;
- category;
- customer-facing title;
- short explanation;
- why it matters;
- dependencies;
- connected capabilities;
- workflow/story steps;
- selection state.

This makes the experience maintainable and allows future SaaS extraction.

---

## 10. THE SYSTEM SHOULD PHYSICALLY GROW

The user's selections should visibly change the composition.

This is the central visual metaphor:

> **The customer is assembling their system.**

Start simple:

`YOUR PROPERTY`

Then:

`BOOKINGS + ROOMS + GUESTS`

Then, as optional modules are added, the bento composition grows or rearranges:

`WEBSITE + BOOKINGS + ROOMS + GUESTS`

Then:

`HOUSEKEEPING` connects to Rooms/Bookings.

Then:

`PAYMENTS` connects to Booking.

The visual result should be an evolving system map, not a technical architecture diagram.

Do not make it look like developer tooling.

It should be understandable to a lodge owner.

---

## 11. UI / UX DIRECTION

The UI must feel like a premium interactive editorial product.

### Use

- large, confident headings;
- concise explanations;
- asymmetric bento blocks;
- varied tile sizes;
- clear active states;
- restrained borders;
- subtle depth;
- warm neutral surfaces;
- graphite chapters for emphasis;
- existing ProManaged typography;
- generous whitespace;
- high-quality interface snippets where useful;
- progressive disclosure;
- one clear action per step.

### Avoid

- long forms;
- dense checklists;
- tiny text;
- excessive pill controls;
- equal-card grids everywhere;
- progress bars that make it feel like a survey;
- unnecessary technical diagrams;
- pricing before the user understands the system;
- fake dashboard metrics;
- excessive modal windows.

The interface should feel calm and confident.

---

## 12. RESPONSIVE / MOBILE-FIRST COMPOSITION

The builder MUST be designed mobile-first.

Verify at:

- 375px
- 430px
- 768px
- 1024px
- 1440px
- 1600px
- 1920px

At 375/430:

- one dominant story at a time;
- cards become a vertical asymmetric sequence;
- selections remain thumb-friendly;
- feature explanation appears directly with the selected module;
- system map remains legible without horizontal scrolling;
- sticky controls must not cover content;
- final CTA remains obvious;
- no tiny desktop-style bento grid compressed into a column.

Desktop may use wider asymmetric compositions but must remain inside the existing 1880px visual rail.

Do not recreate the previous oversized full-canvas desktop problem.

---

## 13. MOTION — BUILDING BLOCKS LANGUAGE

Reuse the existing ProManaged Building Blocks motion system.

Do NOT add another animation framework.

Use existing variants where appropriate:

- `settle-up`
- `settle-side`
- `scale-in`
- `sequence-in`

Suggested choreography:

### Entering a chapter
statement settles → first feature resolves → supporting detail follows.

### Selecting a feature
selected block settles into emphasis → dependency/relationship appears → story steps assemble.

### Adding a dependency
existing block shifts subtly → dependency block enters → relationship cue resolves.

### System summary
selected blocks assemble into the final proposed system.

Motion must be:

- slow;
- weighted;
- precise;
- restrained;
- transform/opacity based;
- one entrance per meaningful group.

No:

- infinite animation;
- parallax;
- random rotation;
- cartoon bounce;
- layout-jank animation;
- animation libraries.

`prefers-reduced-motion` must resolve immediately to the final state.

If JavaScript fails, all essential information and controls must remain available.

---

## 14. WORKFLOW STORIES

The builder should include expandable or inline **See how it works** moments.

Example:

### A guest makes a booking

Guest finds the property online

→ Website shows availability

→ Guest books

→ Booking appears in the management system

→ Room availability updates

→ Confirmation is sent

The exact story must reflect the selected features.

If the user selects:

**Bookings + Rooms + Housekeeping**

show the relevant story.

If they add Payments, extend the story.

If they add Website, begin the story at the public site.

The customer should understand the value of integration without needing technical vocabulary.

---

## 15. FINAL CONFIGURATION SUMMARY

At the end, show:

# **Here's what you've designed**

### Your property

Property type + approximate rooms.

### Your foundation

Selected Core capabilities.

### Your additions

Selected Optional modules.

### How it works together

One short, plain-language paragraph generated from the selected features.

Example direction:

> Your website, bookings and room availability work together, while housekeeping turns each checkout into a clear next task for your team.

Do not claim capabilities that were not selected.

Do not show fabricated pricing.

Do not show a fake implementation date.

---

## 16. CONVERSION — THE FINAL STEP

Only after the customer understands the proposed system should we ask for contact details.

Heading direction:

**Let's talk about your setup.**

Supporting copy:

> You've designed the starting point. Tell us where to send your tailored plan.

Collect the minimum useful contact information:

- name;
- business/property name;
- email;
- phone/WhatsApp if appropriate;
- optional notes.

The form must preserve existing production form conventions and backend contracts unless a dedicated safe endpoint is required and verified.

Do not break existing PHP/PHPMailer logic.

The submitted enquiry must include the full configuration in a structured format.

Example internal payload:

```text
Hospitality System Builder

Property type: Lodge
Rooms: 18

Core:
- Bookings
- Rooms
- Guests

Optional:
- Website + Booking Engine
- Housekeeping
- Payments

Current booking channels:
- WhatsApp
- Phone

Notes:
...
```

This is the commercial value of the builder: ProManaged receives a pre-qualified discovery brief rather than an empty "please contact me" message.

---

## 17. EMAIL / RECEIVING-END DESIGN

If the existing form system supports branded HTML email templates, add a dedicated Hospitality Builder presentation while preserving the backend architecture.

Internal email should clearly show:

- enquiry type;
- property context;
- room count;
- core features;
- optional features;
- dependencies/relationships;
- booking channels;
- customer notes;
- contact details.

Customer confirmation should be concise and branded:

> **We have your hospitality system outline.**
>
> We'll review the way your property works and use your selected configuration as the starting point for the conversation.

Do not promise that all selected features are standard SaaS modules.

Do not expose internal system IDs or implementation notes to customers.

---

## 18. REAL PROJECT CREDIBILITY

Read `.claude/PROJECT_CREDIBILITY.md`.

Use genuine evidence from:

- **Rosalyn's — Hotel Management System**
- **Liwonde Sun Hotel — Hotel Management System**

Both are real ProManaged deliverables for Malawian clients.

The builder may include a small credibility moment such as:

> **Built from real hospitality work.**
>
> We've already delivered hotel-management systems for businesses in Malawi. This builder is shaped by that experience.

Then use carefully selected HD interface snippets.

The real projects should support trust, not dominate the configurator.

Do NOT:

- expose admin URLs;
- expose login screens;
- expose customer data;
- expose credentials;
- invent outcomes;
- invent metrics;
- invent testimonials;
- mention Bank Nkhonde anywhere publicly.

The builder must never imply that the exact configurable product already exists as a finished commercial SaaS if it has not yet been launched.

---

## 19. SOURCE-SYSTEM RESEARCH — DONE — AND THE DELIVERY-STATUS CONTRACT

### The inspection (14 Aug 2026)

Both delivered systems were inspected read-only at the URLs the owner supplied:
`promanaged-it.com/rosalyns-hotel` and `promanaged-it.com/liwondesunhotel`.
Nothing was created, edited or deleted, no booking was submitted, and the admin
portal was observed at its login screen only — no authentication was attempted.
Findings were taken from page structure (navigation, form fields, module
sections) rather than screenshots, so no guest data or private content was
captured at any point.

**They are one product with two tenants, not two builds.** Identical navigation
(Home, Rooms, Restaurant, Gym, Conference, Events, Book Now), an identical
booking-search contract (`check_in`, `check_out`, `guests`, `children`,
`room_type`), and identical section structure. The differences are tenant data —
room names, rates, facilities — not features. The booking form carries a
`client_uuid`, so the system is already built along tenant lines. That is a real
input to §20: the multi-tenant model is not hypothetical.

**Verified present in both systems:**

| Capability | Evidence |
| --- | --- |
| Bookings | Multi-step engine: dates → room → guest information → guest details → booking type → add-ons. CSRF-protected. |
| Rooms | Room types with per-night rates and live availability counts; unavailable and over-capacity states are handled. |
| Guests | Full record: name, email, phone, country, address, number of guests, children, special requests. |
| Website + booking engine | The public site and the engine above. |
| Staff accounts | An authenticated Admin Portal with CSRF and password reset. |
| Restaurant menu | A categorised digital menu — Local Corner, Mains, Pasta, Quick & Easy, **Room Service** — with per-item pricing. |
| Conference & meetings | A meeting-space enquiry module: company, contact, date, start/end time, attendees, event type, AV equipment, catering, requirements. |
| Events | A published upcoming-events module. |

**Also seen, folded into Bookings rather than made separate modules:** standard
versus tentative booking types, add-on packages, and group-too-large-for-one-room
handling.

**Deliberately NOT promoted.** Payments (the booking page mentions card and bank
transfer as *policy* text, which is not an integrated module), housekeeping,
reporting and guest messages were not evidenced. Multi-property was not promoted
either: multi-*tenant* hosting is a different feature from one operator running
several properties from one system, and conflating the two would be exactly the
kind of over-claim this section exists to prevent.

**Catalogue changes made as a result:** `restaurant` reclassified from Custom
development to Built before and rescoped to the digital menu (charging to a room
was not evidenced); `staff` promoted to Built before and rewritten to claim the
admin portal rather than per-role permissions, which were not verified;
`conference` and `events` added as new Built-before modules. Eight of fourteen
capabilities now rest on delivered work rather than four.

### The contract

The gate this section used to impose — inspect before finalising — has done its
job and is replaced by a standing rule, so the guarantee survives future edits
instead of depending on someone repeating the inspection.

The catalogue classifies every capability three ways, and the classification is printed on the card the visitor reads:

**Built before** — ProManaged has genuinely delivered this in real hotel-management work.

**Proposed module** — designed for this product, not yet shipped as standard.

**Custom development** — valuable but property-specific; scoped and built per property.

### The promotion rule

A capability may be promoted to **Built before** only when its presence in delivered work has actually been verified. Until then it is Proposed or Custom. This is not a judgement call at review time: the permitted set is asserted in `tests/hospitality_builder.test.js` and `tests/hospitality_endpoint.test.php`, so promoting a capability without also widening that allow-list fails the suite.

Currently permitted: `bookings`, `rooms`, `guests`, `website`, `staff`, `restaurant`, `conference`, `events` — each verified against both delivered systems in the inspection above.

### Adding to that list later

Anything else requires the same standard: evidence from the real systems, not a plausible assumption. When something is confirmed, widen the allow-list in **both** test files and update the catalogue `status` in **both** `js/hospitality_builder.js` and `php/hospitality_catalogue.php`. The suites fail if any of those four fall out of step.

The obvious next candidates, none of which are currently evidenced, are payments, housekeeping, reporting and guest messages. If the admin portal is inspected under authentication later, that is where they would be confirmed or ruled out.

Rules for any further inspection: never expose credentials; never modify admin data; never create, delete or edit bookings, users or settings; capture structure rather than screenshots so no guest data is collected; and do not force client-specific functionality into the generic product model.

---

## 20. FUTURE-PRODUCT ARCHITECTURE

This first release does not need to become the full hospitality SaaS backend.

However, the frontend data model should be designed so it can later feed a real multi-tenant product.

The conceptual model is:

```text
Property
  ↓
Core capabilities
  ↓
Optional modules
  ↓
Dependencies
  ↓
Workflows
  ↓
Proposed system
  ↓
Qualified enquiry
```

Do not build a multi-tenant backend as part of this task unless the repository already contains one and a safe reuse is obvious.

The immediate goal is **discovery + product validation + qualified sales**.

---

## 21. ANALYTICS / PRODUCT LEARNING

Where the existing site analytics architecture allows it, capture useful non-sensitive events:

- builder_started;
- property_type_selected;
- core_feature_selected;
- optional_feature_selected;
- dependency_prompt_shown;
- workflow_story_opened;
- configuration_completed;
- hospitality_enquiry_submitted.

Do not collect sensitive customer data through analytics events.

Do not add a new analytics platform just for this task.

Use the existing project conventions if available.

The purpose is to learn which features hospitality businesses actually want.

---

## 22. ACCESSIBILITY

The builder is a production sales interface.

Requirements:

- semantic headings;
- labels for all controls;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- no colour-only selection state;
- `aria-pressed` / appropriate state semantics for selectable controls;
- screen-reader-readable dependency explanations;
- Escape closes transient panels if used;
- reduced-motion support;
- no interaction that requires hover;
- mobile controls large enough for touch.

The system must remain understandable if motion is disabled.

---

## 23. PERFORMANCE

Do not make the builder heavy just because it is interactive.

Prefer:

- vanilla JS;
- existing CSS;
- lazy-loaded project imagery where appropriate;
- no large JS framework;
- no animation library;
- no unnecessary third-party services.

Avoid shipping every project screenshot on first load.

Load visual evidence when it enters the relevant part of the story.

---

## 24. FILE/SCOPE GUIDANCE

Expected new/modified files should be limited to what is genuinely necessary.

Likely additions:

- `pages/hospitality_builder.html`
- `css/hospitality_builder.css`
- `js/hospitality_builder.js`

Likely small integrations:

- `pages/custom_websites.html` — entry CTA
- `index.html` — optional small entry/proof moment only if clearly justified
- existing form PHP/template — only if needed to safely receive the structured builder enquiry
- existing email template — only if needed for the dedicated enquiry presentation

Do not broadly rewrite shared CSS/JS for this feature.

Reuse existing tokens and component patterns.

---

## 25. DEFINITION OF DONE

The Hospitality System Builder is complete only when:

### Product experience
- [x] A visitor can identify their property type and approximate room count. — seven property types plus a `+`/`−` number control with a typed value; a slider was rejected as the hardest way to say "eighteen" on a phone.
- [x] A visitor can identify current booking channels. — multi-select, six channels.
- [x] Core features are clearly explained. — each foundation card carries title, plain description and why-it-matters.
- [x] Optional features are clearly explained. — nine modules, each with a customer-facing title and short description on the card face.
- [x] Selecting a feature shows why it matters. — the detail panel opens on selection with `why`, the workflow steps and the relationships.
- [x] Dependencies are explained rather than silently applied. — a dependency already met by the foundation is *explained* ("Builds on Rooms — already part of your foundation"); a genuine improvement that is not yet selected becomes a real "Add …" action, so no relationship dead-ends.
- [x] Connected features tell a useful workflow story. — the "How it runs" chapter is generated from the actual selection and never describes a capability that was not chosen.
- [x] The system visual evolves as the customer selects capabilities. — the map rebuilds on every change; only genuinely new tiles play the settle, so the composition does not flicker.
- [x] A final configuration summary is generated. — property, foundation, additions and a generated plain-language paragraph.
- [x] The visitor can submit the configuration to ProManaged.

### Sales
- [x] ProManaged receives the complete structured configuration. — property type, rooms, channels, foundation, added modules with their delivery status, assembled connections, the visitor's stated problem and their notes. Confirmed by two live submissions delivered through the production SMTP transport, and the rendered brief was read directly.
- [x] Internal email is readable and branded. — reuses `pm_internal_email` unchanged, with the configuration as the priority triage block.
- [x] Customer confirmation is clear and reassuring. — reuses `pm_customer_email`; wording states plainly that some selections are built, some proposed and some bespoke.
- [x] The final step feels like starting a conversation, not submitting a generic form. — asks only for name, property, email and an optional phone/notes, after the visitor can already see what they designed.

### Design
- [x] It looks native to the existing ProManaged luxury/editorial design. — no new tokens, typefaces, colours or components; `css/hospitality_builder.css` composes only from `tokens.css` and the shared block/btn/field/intake families.
- [x] It does not introduce a generic SaaS aesthetic. — softened rectangles rather than pills, warm neutral surfaces, graphite chapters, no gradients or glassmorphism.
- [x] Bento composition is asymmetric and deliberate. — 5/4/3 for the foundation and 7/5, 5/7, 4/4/4, 5/7 for the module set, with its own tablet stage rather than a compressed desktop grid.
- [x] Mobile feels designed, not compressed. — verified visually at 375px: the module set is a vertical asymmetric sequence with real hierarchy, the workflow ladder and both relationship treatments read clearly, and the system map stays legible with no horizontal scroll. Every builder control is ≥44px.
- [x] Motion uses the existing Building Blocks language. — the chapters use `settle-up` / `settle-side` / `scale-in` / `sequence-in` through the existing shared observer; no framework was added.
- [x] Motion is premium and restrained. — transform/opacity only, one entrance per meaningful group, no looping, parallax or bounce.
- [x] The experience remains clear with reduced motion. — the `prefers-reduced-motion` block forces every builder animation to its final state, and no information or control depends on an animation having run.

### Credibility
- [x] Rosalyn's can be used as real project evidence where appropriate. — one proof strip, using an existing repository capture.
- [x] Liwonde Sun Hotel can be used as real project evidence where appropriate. — named in the same strip.
- [x] Both are correctly described as Malawian-client work.
- [x] No fabricated claims exist. — no metrics, outcomes, testimonials or dates. Every module states whether it is Built before / Proposed module / Custom development, and only bookings, rooms, guests and the booking engine may claim "built" (asserted by an automated catalogue check).
- [x] Bank Nkhonde is absent from public content. — verified by repository grep; the name appears only in the `.claude/*.md` files that state the restriction.
- [x] No private admin information is exposed. — no admin URLs, logins, credentials or customer data; the only imagery is an existing public-site capture.

### Technical
- [x] Existing navigation is intact. — the rail and bento panel are copied verbatim; no tile added (see Decisions).
- [x] Existing footer is intact.
- [x] Existing forms remain functional. — the only change to shared JS is one additional `init()` call in `js/form_intake.js`, which is a no-op on pages without the form. `contact.php` and `booking.php` are untouched.
- [x] Existing PHP/PHPMailer contracts are preserved. — new endpoint only; no shared PHP was modified.
- [x] No `.env` or credentials are committed. — verified against `git status`.
- [x] No YAML/YML files are added. — verified against `git status`.
- [x] No unnecessary external dependencies are introduced. — vanilla JS, no libraries, no third-party services.
- [x] No horizontal overflow at 375px, 430px, 768px, 1024px, 1440px, 1600px or 1920px. — measured in Chromium at all seven widths in the fully-expanded worst case; `scrollWidth` equalled the viewport at every one and a per-element sweep found zero elements crossing either edge.
- [x] Full diff has been inspected.

---

## 26. IMPLEMENTATION RULE FOR CLAUDE

When Claude is instructed to implement this plan:

1. Read `.claude/BUILD_PLAN.md`, `.claude/PROJECT_CONTEXT.md`, `.claude/PROJECT_CREDIBILITY.md` and this file.
2. Inspect the actual Rosalyn's and Liwonde Sun systems using authorised MCP/browser access before finalising the feature catalogue.
3. Inspect the current form/email contracts before wiring submission.
4. Implement the complete active scope in one cycle.
5. Do not stop at a static mockup.
6. Do not redesign unrelated ProManaged pages.
7. Preserve the existing luxury design and motion language.
8. Self-check mobile and desktop behaviour.
9. Inspect the complete diff.
10. Fix obvious regressions discovered during the same cycle.
11. Commit directly to `main`.
12. Push to `origin/main`.

Final report must contain only:

**Changed:**
- concise implementation summary

**Blockers:**
- None, or exact blocker(s)

**Ready for review:**
- Yes

The user is the final visual acceptance gate. Do not wait for an additional ChatGPT review between implementation phases unless the user explicitly requests review.
