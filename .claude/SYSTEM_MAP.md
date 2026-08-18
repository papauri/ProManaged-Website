# ProManaged IT — SYSTEM MAP

> Keep this map factual. It describes the implementation that coding agents must preserve.

## Pages

1. `index.html` — Hero → What ProManaged Is → Build / Source / Support → Real work → How We Work → Founder / Story → Why us → The working day after → Contact → Footer.
2. `get-started.html` — guided intake and booking.
3. `learn_more.html` — process / expectations.
4. `privacy_policy.html` — legal page; legal copy is not a design playground.
5. `pages/custom_websites.html` — Build.
6. `pages/hardware_sourcing.html` — Source.
7. `pages/it_support.html` — Support.
8. `pages/hospitality_builder.html` — the Hospitality System Builder. A guided product configurator, reached from the Build page's `#hospitality` CTA. Deliberately **not** a navigation category: the bento panel is composed for exactly seven tiles.
9. `pages/website_builder.html` — the Website Builder. The same experience for a straightforward business website, reached from the Build page's `#website-builder` CTA. Also not a navigation category, for the same reason.

The canonical public trio is **Build / Source / Support**. `pages/network_infrastructure.html`
and the "Connect" capability name no longer exist; do not reintroduce either.

The homepage section order follows the journey in `.claude/BUILD_PLAN.md` §2B —
INTRIGUE → UNDERSTANDING → RELEVANCE → PROOF → TRUST → DESIRE → ACTION — and its
surfaces alternate so that no two graphite chapters ever sit next to each other.

## Shared CSS

### `css/tokens.css`
Single source of truth for:
- colours;
- typography tokens;
- spacing;
- radii;
- shadows;
- composition width;
- motion timing.

**Required composition rail:** `--rail-visual: 1880px`.

### `css/global_styles.css`
Shared reset and design primitives:
- `.rail` / `.container`;
- `.grid`;
- `.block`, span modifiers, and `.block--tall` (the second bento axis: a block that claims two grid rows, so blocks beside it stack in the columns it leaves free);
- typography;
- `.btn`, `.primary`, `.secondary`;
- focus states;
- Building Blocks reveal states.

Do not remove or rename canonical button classes.

### `css/hero_section.css`
Hero geometry and supporting visual cards.

**Desktop composition:** 7fr / 5fr.

### `css/about_section.css`
Founder / Story composition. The portrait uses the existing 800×800 asset and must remain circular and restrained.

### `css/navbar.css`
Persistent logo/menu control and bento navigation panel. There is no traditional horizontal navbar.

Closed state, from 768px up, is a **floating capsule**: detached from the viewport edge by `--nav-float`, aligned to the content rail, with a reading-progress hairline along its lower edge. It condenses on scroll (`.nav-condensed`) and tucks away on downward scroll (`.nav-tucked`). Both flags are written by `js/interface_motion.js`. The phone keeps a flush bar.

Anything that offsets content for the fixed rail must add `--nav-float` to `--header-h`.

### `css/interaction.css`
The pointer layer: the instrument cursor and the card field (pointer-tracked light, lean and traced edge on every surfaced block). Entirely gated behind `.pm-pointer`, which `js/interface_motion.js` adds only for a fine hovering pointer at ≥1024px with no reduced-motion preference. Pure enhancement — nothing here is required for the site to work.

### `css/footer_promanaged.css`
Canonical footer component. Root class is `.footer`. Every public page carries the
same tree; only destination-relative hrefs differ.

### Chapter stylesheets
- `css/why_band.css` — the "What ProManaged IT is" statement and the three trust claims (`.why-facts`, now in `#why-us` beside the founder).
- `css/service_cards.css` — the Build / Source / Support capability bento.
- `css/project_proof.css` — real delivered-work evidence: shot wells, the "Delivered work" tag, the compact proof strip.
- `css/evidence.css` — illustrative, CSS-drawn interface fragments and the evidence rail.
- `css/pinned_chapter.css` — the sticky "How we work" stepper (index only).
- `css/mission_vision.css` — the closing outcome statement and its mission/vision beats.
- `css/hospitality_builder.css` — the Hospitality System Builder's own components: choice chips, the room stepper, the module card and its detail panel, the system map and the story ladder. Adds nothing to the design system; every value comes from `tokens.css` and the shared families.
- `css/website_builder.css` — the Website Builder's equivalent, under a `wb-` prefix. A deliberate separate copy rather than a shared sheet (see `.claude/WEBSITE_BUILDER.md` §3), so a fix to one must be considered for the other.
- `css/builder_flow.css` — the gate, the step outline and the locked/blocked states
  shared by BOTH builders. Everything in it is either a new class or scoped behind
  `.builder-flow-on`, which only `js/builder_flow.js` adds, so with JavaScript off it
  changes nothing.
- `css/contact_section.css`, `css/book_appointment.css`, `css/get-started.css`, `css/learn-more.css`, `css/custom_websites.css`, `css/hardware_sourcing.css`, `css/it_support.css`, `css/privacy_policy.css`, `css/scroll_top.css`, `css/logo.css` — page and component scoped.

## JavaScript

### `js/main.js`
Owns:
- service-card navigation;
- same-page smooth anchors;
- Building Blocks load/scroll choreography;
- scroll-to-top control.

Motion variants are fixed:
- `settle-up`;
- `settle-side`;
- `scale-in`;
- `sequence-in`.

**Pacing.** `data-blocks-pace="calm"` on a `[data-blocks]` group collapses the
per-card stagger to zero so the chapter settles once, as one weight. It is the motion
intensity map in `.claude/BUILD_PLAN.md` §2B expressed in markup, and it belongs on
the near-absent chapters: the real-proof chapter, contact/booking and the footer. The
matching travel/duration tokens live on the same attribute in `css/global_styles.css`.

Use IntersectionObserver where supported and expose final states for reduced motion/failure cases.

### `js/boot.js`
The load overture. Loaded synchronously in `<head>` on every page. Not a splash
screen and has no minimum duration — only a bounded maximum — and its removal is
armed before the overlay is inserted, so the curtain always lifts.

### `js/interface_motion.js`
Three independent, additive modules:
- scroll state — `--pm-progress`, `.nav-condensed`, `.nav-tucked` (all devices);
- the card field — writes `--mx`/`--my`/`--fx`/`--fy` on the hovered card only;
- the instrument cursor — tracking dot, spring ring, and a ring that snaps to the geometry of what it is over.

The last two share one rAF loop that parks itself when nothing is moving. No element is ever hidden by this file, so a failure here cannot strand content.

Cards opt in automatically: the script tags `.grid > .block:not(.block--bare)` and `.nav-tile` with `data-field`. A card can name itself to the cursor with `data-cursor-label`.

**`data-cursor-calm`** on any container drops the cursor to two states inside it — control, or not — instead of four. It exists for dense interactive regions where constant frame/caret/link switching competes with the task; the hospitality builder's steps use it. Everywhere without the attribute is unchanged.

### `js/mobile_phone_navbar.js`
Owns mobile/bento navigation interaction, focus management, Escape handling, scroll lock and restoration.

### `js/form_intake.js`
Shared form validation/submission UX. Do not change PHP contracts when adjusting the visual design.

Initialises `#contact-form`, `#booking-form`, `#hospitality-form` and `#website-form`; each call is a no-op on a page without that form.

### `js/builder_flow.js`

The step gate shared by both builders, and the only file either page loads before
its own builder script. It owns two things:

- **the gate** — no interactive chapter is shown until the visitor presses the one
  control on `#begin`;
- **the step lock** — one chapter open at a time; the next is revealed by the
  current chapter's continue control, which refuses to advance while that chapter's
  requirements are unmet.

It knows nothing about either builder's internal state. A chapter declares itself
in markup: `data-builder-step="N"` (sections sharing N open together),
`data-step-require` (selectors, `|`-separated, that must each match),
`data-step-missing` (the sentence shown when they do not) and `data-step-focus`
(where to send the focus). That is what lets one file drive two instruments.

Two things about it are contractual and easy to break:

- **its click listener runs in the capture phase.** `js/main.js` binds its
  smooth-scroll handler directly to every `a[href]`, so a bubble listener on the
  builder root is too late — it fires after main.js has already pushed the
  destination hash and started scrolling toward a chapter that is still closed.
- **it must load before the builder script**, so `window.pmBuilderFlow` exists by
  the time the builder's first render calls `refresh()`.

The builders call into it at three points: `refresh()` from their own `update()`,
`revealTarget()` before an automatic advance measures its target, and
`firstIncomplete()` on submit, to refuse an incomplete configuration.

### `js/hospitality_builder.js`
The Hospitality System Builder engine, and the only place its product copy lives.
`CORE` and `OPTIONAL` are the catalogue: one record per capability carrying its id,
category, delivery status, customer-facing copy, `dependsOn`, `worksWith` and its
workflow steps. Rendering derives everything from those records, so the catalogue
can later feed a real product without rewriting the UI.

**Delivery status is an honesty contract.** `built` may only be claimed for work
ProManaged has actually delivered (bookings, rooms, guests, booking engine);
everything else is `proposed` or `custom`, and the UI prints the word on the card.

**Load order matters.** It must be included BEFORE `js/main.js`. Both are deferred,
so document order decides: `main.js` collects its motion units at `DOMContentLoaded`
and skips a `[data-blocks]` group with none, so the cards must exist by then. The
script therefore renders at execution time, not on `DOMContentLoaded`.

### `js/website_builder.js`
The Website Builder engine — a deliberate separate copy of the above under a `wb-`
prefix, not a shared module. Same mechanism, own catalogue and own prose. The same
load-order rule applies. Because the two are duplicates, **a fix to one must be
considered for the other**; that is the accepted cost of the decision recorded in
`.claude/WEBSITE_BUILDER.md` §3.

## Forms / PHP

- `php/contact.php` — contact submission.
- `php/booking.php` — appointment submission.
- `php/hospitality.php` — Hospitality System Builder enquiry. Its own endpoint because the payload is a structured configuration rather than a message. Reuses `http.php` and the `mailer.php` templates unchanged. The browser submits catalogue IDs only; every label a human reads is resolved server-side from an allow-list, and the fixed foundation is never read from the submission.
- `php/hospitality_catalogue.php` — the server's catalogue and the pure functions that resolve a submission against it. Separate from the endpoint because the endpoint runs on include (it calls `pm_respond()`, which exits), so nothing in it could be tested without also sending mail.
- `php/website.php` — Website Builder enquiry. Same shape and same trust model as the hospitality endpoint.
- `php/website_catalogue.php` — the same separation, for the same reason.

## Tests

Plain scripts, no framework and no dependencies. Run them before any change to the areas they cover.

- `node tests/hospitality_builder.test.js` — catalogue integrity, the delivery-status honesty contract, and browser/endpoint catalogue sync. The catalogue is duplicated between `js/hospitality_builder.js` and `php/hospitality_catalogue.php` on purpose (the server must never take a label from the client); this is what stops the two drifting.
- `php tests/hospitality_endpoint.test.php` — the endpoint's trust boundary, exercised against hostile input: invented capabilities, markup payloads, duplicate and repetition floods, malformed relationship pairs and out-of-range room counts.
- `node tests/website_builder.test.js` — the same for the Website Builder, plus an assertion that at least 10 of its 11 capabilities are delivered work, and that no ranking or traffic promise appears in the copy.
- `php tests/website_endpoint.test.php` — the same trust-boundary coverage for `php/website.php`.
- `node tests/builder_flow.test.js` — the step-gate attribute contract on both builder
  pages (contiguous step numbers, every continue control advancing by exactly one, step 1
  declaring a requirement whose selectors exist, the outline mirroring the steps, nothing
  shipping pre-hidden, load order), plus the homepage section rhythm: no two adjacent
  chapters on the same surface and no two adjacent graphite ones.

**The honesty contract is enforced here, not by review.** A capability may claim "Built before" only if it is in the permitted set the tests assert. Promoting one without widening that set fails the suite — see `.claude/HOSPITALITY_SYSTEM_BUILDER.md` §19 and `.claude/WEBSITE_BUILDER.md` §7.

**Audit contrast in the SELECTED state.** Both builders have elements that only render once a module is chosen; a page-load audit misses them entirely, which is how one sub-AA value shipped.

**Audit the builders in the OPENED state.** Since the step gate, simply loading a
builder page renders the gate and nothing else. Any sweep — overflow, stranded
content, contrast, touch targets — must press the start control and walk the
chapters open first, or it will report a clean bill of health for content it never
rendered.
- `php/mailer.php` — shared internal/customer HTML + plain-text mail templates.
- `php/env.php` — environment configuration.
- `php/vendor/PHPMailer/` — mail dependency.

Preserve names, IDs, actions, SMTP behaviour, escaping and honeypot logic.

## Assets / evidence

Verified repository assets may be used for anonymous interface/project evidence. Do not fabricate project screenshots or public claims.

`images/founder.png` is the founder portrait source and is 800×800.

## Deployment cleanup

Actual Render.com deployment configuration is out of the application architecture. Audit/remove only real Render hosting/deploy configuration; ordinary UI uses of “render” are unrelated.

## Agent rules

- Direct commits to `main`.
- No branches or PRs for this workflow.
- No YAML/YML files introduced.
- No framework or animation library.
- No backend contract changes for visual work.
- No unapproved client/project names.
- No pricing added to the software page.
