# ProManaged IT — PROJECT CONTEXT

> Authoritative implementation context for coding agents.

## Product

ProManaged IT is a small, human-led technology studio offering three connected capabilities:

- **Build** — custom web apps, SaaS platforms and business websites.
- **Source** — hardware sourcing, supplier coordination, purchasing, shipping and delivery.
- **Connect** — network infrastructure, connectivity, WiFi, cabling, security and monitoring.

The audience is global. Do not frame the company as belonging to one city or country.

## Stack

- Static HTML
- CSS
- Vanilla JavaScript
- PHP
- PHPMailer
- SMTP

No frontend framework is required or desired.

## Visual identity

The design language is **Signal & Systems**: editorial, engineered, warm, precise and human.

### Layout contract

This is the most important rule:

**Use the balanced composition, not the previous wide-screen experiment.**

- `--rail-visual: 1880px`.
- Desktop hero: `7fr 5fr`.
- Full-bleed backgrounds are fine; content remains inside the centred rail.
- Headings and body copy retain independent readable measures.
- Bento cards use unequal spans, but the page should never feel stretched merely because the monitor is wide.

### Navigation

There is no traditional horizontal navbar.

The visible ProManaged logo/menu tile opens the bento navigation panel. The navigation must remain accessible and preserve its existing focus, Escape, scroll-lock and `aria-expanded` behaviour.

### Typography

Plus Jakarta Sans is currently the single type family. Do not introduce another font casually or create a mixed typography system.

### Founder

`images/founder.png` is the existing 800×800 founder source.

It must be presented as a **circle**, using a true square box and `object-fit: cover`. The portrait is intentionally restrained; it should not dominate the page just to fill desktop whitespace.

## Motion: Building Blocks

Motion is a signature part of the experience.

- Hero assembles on initial load.
- Major sections reveal as the visitor scrolls.
- Bento navigation can assemble when opened.
- Founder reveal participates in the chapter choreography.
- Approved variants: `settle-up`, `settle-side`, `scale-in`, `sequence-in`.
- Animate opacity and transform only.
- Motion should feel slow and weighted, not like a generic fade-in.
- Desktop target: approximately 800–1000ms hero and 700–900ms chapter transitions.
- Stagger approximately 90–120ms.
- Shorten travel/duration on smaller screens without making motion imperceptible.
- `prefers-reduced-motion` must show the final state immediately.
- Never add parallax, looping movement or animation libraries.

## Content evidence

Visual evidence can include anonymous fragments of real interface work or clearly illustrative technology motifs: dashboards, booking screens, network diagrams, product UI, hardware details and controller/interface elements.

Do not invent:

- client names;
- project names;
- hotel names;
- awards;
- testimonials;
- metrics;
- certifications;
- project outcomes.

If a project is shown visually, the marketing copy should remain anonymous unless explicit approval is given to name it.

## Forms and email

The forms are production functionality, not decorative mockups.

Preserve:

- form field names;
- IDs;
- PHP actions;
- validation;
- honeypot;
- SMTP;
- PHPMailer;
- internal email delivery;
- customer confirmation delivery;
- HTML and plain-text email alternatives.

The email templates should feel designed and branded, but their backend contracts must not change during visual work.

## Footer

The canonical footer stylesheet is `css/footer_promanaged.css` and its root component is `.footer`.

The homepage must use the canonical footer structure. Do not resurrect the obsolete `.footer-promanaged` placeholder.

## Render cleanup

Render cleanup means actual Render.com hosting/deployment configuration only.

Do not remove ordinary UI/English uses of the word “render”.

## Agent operating rules

- Work directly on `main`.
- Never create a branch or PR for this project unless the user explicitly changes that rule.
- Do not add YAML/YML files.
- Do not modify legal copy in `privacy_policy.html` for visual tasks.
- Do not rewrite backend logic when a CSS/HTML fix is sufficient.
- Prefer small, auditable changes over broad rewrites.
- Before changing a component, inspect its existing selectors and dependent JavaScript.
- After changing a shared class, search the repository for every usage.
