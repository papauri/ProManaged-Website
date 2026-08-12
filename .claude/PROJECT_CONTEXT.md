# PROJECT_CONTEXT.md — ProManaged IT Website

> Updated 2026-08-12 to reflect the current tree after the repo restructure, security cleanup, and
> the full-width editorial/bento redesign. Supersedes the original LEARN-phase audit below it in spirit —
> the "current state" section here is authoritative; treat any older references to a gaming vertical,
> Node backend, or `_/public_html/` as historical only.

## 1. What this project is
The marketing website for **ProManaged IT** (domain: promanaged-it.com), a small IT-services business
based in Ireland/Malawi. It offers three services: custom software/web apps & SaaS, IT/gaming hardware
sourcing, and network infrastructure setup.

- **Frontend:** static HTML + CSS + vanilla JS at the repo root. No framework or bundler.
- **Backend:** PHP only, under `php/` (`contact.php`, `booking.php`), sending via SMTP through vendored
  PHPMailer (`php/vendor/PHPMailer/`) using `php/mailer.php` + `php/env.php` and an untracked root `.env`.
  There is no Node backend and no Firebase/eBay/CheapShark/RAWG integration — that gaming-shop vertical
  (game price tracking, reviews/search, used-console listings) was removed; its content was folded into
  a real "Hardware Sourcing" page instead.
- **Design system:** `css/tokens.css` is the single source of truth — accent `#2563eb`, Inter (body/UI)
  + Instrument Serif (H1/H2 display type), one radius/shadow scale, a wide ~1440px editorial container.

## 2. End users & core problem
- **Primary users:** prospective IT/SaaS and hardware clients in Ireland/Malawi/worldwide evaluating
  ProManaged for software, hardware sourcing, or networking — they need to quickly trust the company and
  make contact (contact form on `index.html`, appointment booking on `get-started.html`).
- **Core job of the site:** convert a visitor into a lead (form submit / booking) by looking credible,
  modern, and easy to navigate.

## 3. Current pages (7)
`index.html` (landing page — primary design reference), `get-started.html`, `learn_more.html`,
`privacy_policy.html`, `pages/custom_websites.html`, `pages/hardware_sourcing.html`,
`pages/network_infrastructure.html`.

## 4. What "excellent" looks like (benchmarks)
- **Mockuuups Bento examples** — asymmetric collage composition, large dominant blocks, mixed text/visual
  compartments, generous whitespace, minimal nested-card chrome.
- **Apple editorial/product pages** — wide storytelling, clear feature hierarchy.
- **Linear** — restrained neutral palette + single accent, tight type scale, near-zero decorative motion.

## 5. Non-goals
Backend/API behavior beyond the existing contact/booking SMTP flow, new integrations, and hosting config
are out of scope for visual-redesign work unless separately approved.
