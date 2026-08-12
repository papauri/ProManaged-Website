# SYSTEM_MAP.md — ProManaged IT current tree

> Rewritten 2026-08-12 — the previous version described the pre-restructure `_/public_html/` tree
> (gaming_services.html, it_equipment.html, ebay/game_prices/game_reviews/game_search CSS+JS, a rogue
> dark theme, 5+ conflicting palettes, unloaded fonts). None of that exists anymore; do not rely on it.

## Pages (7)
1. **index.html** — landing page, primary design reference. Sections: hero (`#home`), why-band, services
   (`#services`), about (`#about`), mission/vision (`#mission-vision`), contact (`#contact`), footer.
2. **get-started.html** — hero + "why get started" features + services teaser + testimonials + inline
   booking form (`#booking`).
3. **learn_more.html** — hero + feature grid.
4. **privacy_policy.html** — standalone page, does not load `global_styles.css` (its own heading rules
   mirror the shared display-type treatment).
5. **pages/custom_websites.html** — software/web-app/SaaS service page + "What We've Built" projects.
6. **pages/hardware_sourcing.html** — hardware sourcing service page (replaces the old
   gaming_services.html + it_equipment.html — both were curated third-party shop links and were merged
   into this one real "how we source and deliver" page; the eBay/RAWG/game-price endpoints and CSS/JS
   those two pages used were deleted entirely, not just unlinked).
7. **pages/network_infrastructure.html** — network setup service page.

## Design system
`css/tokens.css` is the single source of truth: accent `#2563eb`, neutral/slate scale, Inter (body/UI) +
Instrument Serif (`--font-display`, H1/H2 only), fluid `clamp()` display sizes, one radius/shadow scale,
`--container-max: 1440px` wide editorial container, `--bento-gap`/`--bento-cols` for grid sections.

## CSS (19 files, all under `css/`)
Shared across most/all pages: `tokens.css`, `global_styles.css`, `navbar.css`, `logo.css`,
`hero_section.css`, `footer_promanaged.css`, `scroll_top.css`.
Landing-page only: `service_cards.css`, `why_band.css`, `about_section.css`, `mission_vision.css`,
`contact_section.css`.
Page-specific: `get-started.css`, `learn-more.css`, `privacy_policy.css`, `custom_websites.css`,
`hardware_sourcing.css`, `networking.css`, `book_appointment.css` (booking form, used on get-started/
custom_websites/network_infrastructure).

## JS (7 files, all under `js/`)
`main.js` (service-card nav, ripple, scroll-to-top), `mobile_phone_navbar.js` (shared hamburger toggle),
`contact__form.js` (index contact form fetch, honeypot), `booking_form.js` (booking form fetch,
honeypot), `custom_websites.js`, `networking.js`, `privacy_policy.js`.

## PHP (4 files, all under `php/`)
`contact.php`, `booking.php` — both send via SMTP through vendored PHPMailer (`php/vendor/PHPMailer/`)
using `mailer.php` + `env.php` and an untracked root `.env`. No Node backend, no other integrations.

## Known non-blocking backlog
- Inter/Instrument Serif/FontAwesome served via CDN (consider self-hosting).
- Secondary pages (`get-started.html`, `learn_more.html`, `pages/*.html`) still use the pre-Bento-07
  hero/section CSS classes (`.hero-content`/`.hero-facts`) rather than the landing page's newer
  `.hero-grid`/`.hero-tile` mosaic — intentional per the current build plan ("landing page first");
  not yet rolled out site-wide.
