# ProManaged IT — SYSTEM MAP

> Keep this map factual. It describes the implementation that coding agents must preserve.

## Pages

1. `index.html` — Hero → What ProManaged Is → Build / Source / Connect → How We Work → Founder / Story → Mission / Vision → Contact → Footer.
2. `get-started.html` — guided intake and booking.
3. `learn_more.html` — process / expectations.
4. `privacy_policy.html` — legal page; legal copy is not a design playground.
5. `pages/custom_websites.html` — Build.
6. `pages/hardware_sourcing.html` — Source.
7. `pages/network_infrastructure.html` — Connect.

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
- `.block` and span modifiers;
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
Persistent logo/menu tile and bento navigation panel. There is no traditional horizontal navbar.

### `css/footer_promanaged.css`
Canonical footer component. Root class is `.footer`.

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

Use IntersectionObserver where supported and expose final states for reduced motion/failure cases.

### `js/mobile_phone_navbar.js`
Owns mobile/bento navigation interaction, focus management, Escape handling, scroll lock and restoration.

### `js/form_intake.js`
Shared form validation/submission UX. Do not change PHP contracts when adjusting the visual design.

## Forms / PHP

- `php/contact.php` — contact submission.
- `php/booking.php` — appointment submission.
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
