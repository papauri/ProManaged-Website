# PROJECT_CONTEXT.md — ProManaged IT Website

> Updated 2026-08-13 after the balanced Signal & Systems reset.

## 1. What this project is
The marketing website for **ProManaged IT**, a small, human-led technology studio. Its three capabilities are presented consistently as **Build / Source / Connect**:

- **Build** — custom web apps, SaaS platforms and business websites.
- **Source** — hardware sourcing: supplier coordination, purchasing, shipping and delivery.
- **Connect** — network infrastructure: satellite/fibre, WiFi, cabling, security, monitoring.

Frontend is static HTML + CSS + vanilla JS. Backend is PHP + vendored PHPMailer + SMTP.

## 2. Current design contract
- Design direction: Signal & Systems — editorial technology studio / engineering workshop.
- Typography: Plus Jakarta Sans for every text role.
- Palette source of truth: `css/tokens.css`.
- Navigation: no traditional navbar; the visible ProManaged logo tile opens the bento panel.
- **Hero/layout baseline: balanced editorial 7/5 composition on the approved ~1880px visual rail.** Do not stretch the design into an oversized full-canvas island.
- Text width remains independently constrained from visual width.
- Bento layouts vary by breakpoint, but composition must remain calm and intentional.
- Founder portrait is a smaller circular crop from the existing 800×800 asset.

## 3. Content / evidence
The site may use verified, anonymous interface/project fragments as visual evidence: dashboards, booking flows, product UI, network diagrams, hardware details and controller/interface motifs.

Never invent clients, metrics, awards, testimonials or project results. Do not publicly name a client/project in new marketing copy unless explicitly approved.

## 4. Motion contract — Slow Building Blocks
- Hero assembles on initial load.
- Major chapters and bento navigation reveal on scroll/open.
- Approved variants: `settle-up`, `settle-side`, `scale-in`, `sequence-in`.
- Motion is deliberately slower and more noticeable than the earlier pass, but still premium: roughly 800–1000ms hero, 700–900ms chapter transitions, with controlled stagger.
- Only transform/opacity are animated. No parallax, looping animation, continuous floating or cartoon bounce.
- `prefers-reduced-motion` exposes final states immediately.

## 5. Forms / email
Contact, hardware request and booking forms use the shared bento intake design. Preserve field names, PHP endpoints, SMTP, PHPMailer and honeypot contracts.

Internal and customer emails use reusable branded HTML + plain-text templates in `php/mailer.php`; submitted values are escaped before HTML output.

## 6. Non-goals
No new framework, animation library, account system, modal flow, CAPTCHA or unrelated hosting redesign. Render cleanup only concerns actual Render.com deployment infrastructure. `privacy_policy.html` remains unchanged.
