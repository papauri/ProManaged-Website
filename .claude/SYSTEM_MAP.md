# SYSTEM_MAP.md — ProManaged IT current tree

> Updated 2026-08-13 after the Signal & Systems visual, responsive bento, form, email and wide-desktop composition work.

## Pages (7)
All seven share one visual system: bento navigation, canonical footer, Plus Jakarta Sans, warm-neutral palette, editorial chapter rhythm, responsive block compositions and shared motion.

1. `index.html` — landing page: Hero → What ProManaged Is → Build/Source/Connect → How We Work → Founder/Story → Mission/Vision → Contact → Footer.
2. `get-started.html` — guided intake + booking form.
3. `learn_more.html` — how we work and what to expect.
4. `privacy_policy.html` — shared shell with unchanged legal copy.
5. `pages/custom_websites.html` — Build: software/web apps/SaaS; no visible pricing.
6. `pages/hardware_sourcing.html` — Source: sourcing + equipment request form.
7. `pages/network_infrastructure.html` — Connect: networking/connectivity.

## Design system
`css/tokens.css` is the only raw-colour source.

- Surfaces: paper / ivory / stone / sand / greige / graphite.
- Earthy accent carries decorative weight.
- Blue is reserved for interaction/identity.
- Plus Jakarta Sans is the sole intended type family for every text role.
- `--rail-visual` controls composition width independently from `--measure*` text widths.
- `--rail-visual` is now 2200px for large displays, with responsive gutters. At 1600px+ the rail is intended to visually occupy most of the available canvas rather than read as a narrow centered island.
- Bento geometry uses unequal spans, varied aspect ratios, offsets and open editorial space.

## Navigation — Bento Control Panel
There is no horizontal navbar strip.

- `#nav-trigger` is a persistent ProManaged logo tile and navigation trigger.
- `#nav-panel` is a full-viewport bento of destination tiles.
- Desktop, tablet and mobile use the same concept but recompose tile spans/layout.
- `js/mobile_phone_navbar.js` owns focus trap, Escape, scroll lock, focus restore and `aria-expanded`.

## Signature motion
`js/main.js` + shared CSS implement Building Blocks / Weighted Block Settle.

Approved variants:
- `settle-up`
- `settle-side`
- `scale-in`
- `sequence-in`

Motion applies to hero blocks, major chapter blocks, bento navigation tiles and the founder portrait — not individual text controls or legal copy. Desktop/tablet/mobile use different travel/stagger/duration values from `css/tokens.css`. `prefers-reduced-motion` immediately exposes final states.

## Founder
`images/founder.png` is an 800x800 source and is rendered as a smaller responsive circular portrait with `object-fit: cover`; it must not be artificially upscaled.

## Forms
`js/form_intake.js` is the shared client-side behavior for contact, hardware request and booking forms.

- Inline validation and focus management.
- Submitting state.
- Success/error feedback.
- Existing form actions, IDs, names and honeypot are preserved.
- `css/contact_section.css` owns the shared bento intake-board presentation.
- `css/book_appointment.css` layers booking-specific layout on the same system.

## Email architecture
`php/contact.php` and `php/booking.php` call shared helpers in `php/mailer.php`.

- `pm_internal_email()` creates the internal triage/information-board email.
- `pm_customer_email()` creates the customer confirmation.
- Both return HTML + plain-text alternatives.
- `pm_esc()` / `pm_esc_multiline()` escape submitted values before HTML output.
- SMTP uses the authenticated account as From and the visitor only as Reply-To.
- No secrets or server internals are included in messages.

## PHP
- `php/contact.php` — validates contact input and sends internal + customer mail.
- `php/booking.php` — validates booking identity/service/date/time and sends internal + customer mail.
- `php/mailer.php` — shared mail transport/templates.
- `php/env.php` — environment loader; SMTP credentials remain outside committed source.
- `php/vendor/PHPMailer/` — vendored PHPMailer.

## Cleanup / current state
- Old `js/contact__form.js` and `js/booking_form.js` were replaced by shared `js/form_intake.js`.
- Render.com repository audit found no actual Render deployment dependency; normal UI uses of the word “render” remain valid.
- No pricing is present on the software page.
