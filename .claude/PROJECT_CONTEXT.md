# PROJECT_CONTEXT.md — ProManaged IT Website

> Updated 2026-08-12 after the "Signal & Systems" full-site redesign.
> This section is authoritative for the current state of the project.

## 1. What this project is
The marketing website for **ProManaged IT** (promanaged-it.com), a small, human-led technology
studio. It offers three capabilities, presented site-wide as **Build / Source / Connect**:

- **Build** — custom web apps, SaaS platforms and business websites. The lead capability.
- **Source** — hardware sourcing: supplier coordination, purchasing, shipping and delivery.
- **Connect** — network infrastructure: satellite/fibre, WiFi, cabling, security, monitoring.

**Frontend:** static HTML + CSS + vanilla JS at the repo root. No framework, no bundler.
**Backend:** PHP only, under `php/` (`contact.php`, `booking.php`), sending via SMTP through
vendored PHPMailer using `php/mailer.php` + `php/env.php` and an untracked root `.env`.
**Design system:** `css/tokens.css` is the single source of truth — warm neutral surfaces,
a restrained earthy accent, blue reserved for interaction, Instrument Serif display + Inter UI,
and a wide ~1560px editorial rail.

## 2. End users & core problem
- **Primary users:** individuals, families, founders, small teams and organisations who need
  software built, equipment sourced, or connectivity set up — and who do not have an IT
  department, a procurement process, or a technical vocabulary.
- **Core job of the site:** convert a visitor into a lead (contact form on `index.html`,
  equipment request on `pages/hardware_sourcing.html`, booking on `get-started.html`) by
  reading as credible, calm and easy to act on.

## 3. Positioning rules (important for future copy work)
- Position **globally**. Marketing headlines and hero copy must not name specific countries,
  cities or regions. Use "wherever you work", "across borders", "international sourcing",
  "local-friendly payment options".
- The company's registration details are a **factual footer credential**, not marketing copy,
  and stay as they are.
- Never invent clients, metrics, awards, partnerships or testimonials. Only verified facts:
  ProManaged IT, founder John-Paul Chirwa, the three capabilities, registration number 749512,
  and the listed contact addresses.
- No pricing anywhere on `pages/custom_websites.html`.

## 4. What "excellent" looks like (benchmarks)
- **Editorial technology journals** — typography as navigation, strong chapter pacing, large
  content blocks, restrained motion.
- **Bento-style composition** — varied block proportions and broad compartments, never a wall
  of equal cards.
- **Linear** — precision, polish, a tight type scale and near-zero decorative motion.

## 5. Non-goals
Backend/API behaviour beyond the existing contact/booking SMTP flow, new third-party
integrations, and hosting configuration are out of scope for visual work unless separately
approved. No modals, no gradients, no parallax, no dashboard styling.
