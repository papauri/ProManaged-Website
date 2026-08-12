# PROJECT_CONTEXT.md — ProManaged IT Website

> Updated 2026-08-13 after the Signal & Systems visual, form and email work.

## 1. What this project is
The marketing website for **ProManaged IT** (promanaged-it.com), a small, human-led technology studio. Its three capabilities are presented consistently as **Build / Source / Connect**:

- **Build** — custom web apps, SaaS platforms and business websites.
- **Source** — hardware sourcing: supplier coordination, purchasing, shipping and delivery.
- **Connect** — network infrastructure: satellite/fibre, WiFi, cabling, security, monitoring.

**Frontend:** static HTML + CSS + vanilla JS at the repo root. No framework or bundler.
**Backend:** PHP under `php/`, sending through vendored PHPMailer via SMTP.
**Design:** `css/tokens.css` is the single source of truth. Warm neutral surfaces, restrained earthy accent, blue reserved for interaction/identity, and Plus Jakarta Sans for every text role.
**Navigation:** no traditional navbar. A visible ProManaged logo tile opens a full-viewport bento navigation panel.
**Forms:** shared bento intake presentation with `js/form_intake.js`; endpoint contracts remain unchanged.
**Email:** reusable branded HTML/plain-text templates and SMTP transport live in `php/mailer.php`.

## 2. End users & core problem
Individuals, families, founders, small teams and organisations who need software built, equipment sourced, or connectivity set up without an enterprise IT department.

The site must convert a visitor into a lead by feeling credible, calm, human and easy to act on.

## 3. Positioning rules
- Position globally. Do not introduce exact countries/cities/regions into new marketing headlines or hero copy.
- Preserve the meaning of international reach and local-friendly payment options.
- Registration details are factual footer credentials, not marketing claims.
- Never invent clients, metrics, awards, partnerships or testimonials.
- `pages/custom_websites.html` contains no visible pricing.

## 4. Design direction
Signal & Systems: an editorial technology studio / engineering workshop.

- Oversized modern typography.
- Wide visual composition rails with independently constrained text measures.
- Asymmetric bento compositions with varied spans, ratios, ordering and whitespace.
- Desktop, tablet and mobile are deliberately recomposed; mobile is not a simple desktop card stack.
- Smaller circular founder portrait.
- No dashboard aesthetic, gradients, parallax, looping backgrounds or decorative chaos.

## 5. Signature interaction
**Building Blocks / Weighted Block Settle**: the hero assembles on load; major chapters and bento navigation tiles reveal on scroll/open. Approved motion variants are `settle-up`, `settle-side`, `scale-in`, and `sequence-in`. Motion is device-aware and reduced-motion safe.

## 6. Forms & email touchpoints
- Contact, hardware request and booking forms use grouped bento intake boards with modern focus, validation, loading and success states.
- `php/contact.php` and `php/booking.php` validate server-side and send through `php/mailer.php`.
- Internal emails are designed as compact information boards for triage.
- Customer replies are designed as branded confirmations with concise summaries and factual next steps.
- Both HTML and plain-text alternatives are required.
- Submitted values are escaped before entering HTML email.

## 7. Non-goals
No new framework, bundler, third-party backend, account system, modal flow, CAPTCHA, or unrelated hosting redesign. Render.com cleanup concerns only actual deployment/hosting dependencies; ordinary uses of the word “render” remain untouched.
