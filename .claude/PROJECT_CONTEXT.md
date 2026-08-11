# PROJECT_CONTEXT.md — ProManaged IT Website

> Setup phase authored with Opus 4.8 (Fable 5 unavailable this session). Execution agents use Sonnet/Haiku.

## 1. What this project is
The marketing website for **ProManaged IT — "Sleek IT Solutions"** (domain: promanaged-it.com), a small IT-services business. It advertises core IT services (custom websites, network infrastructure, IT equipment) and runs a secondary **gaming vertical** (game price tracking, reviews/search, and used-console listings from eBay).

- **Frontend:** static HTML + CSS + vanilla JS. No framework or bundler. Poppins font + Font Awesome via CDN. 24 per-component CSS files.
- **Backends (two parallel copies of the same features):** Node/Express (repo root: `server.js`, `server_two.js`, `email.js`, `appointment.js`) and PHP (`_/public_html/php/`, the version that runs on the cPanel host).
- **Integrations:** Firebase/Firestore (game prices, cached eBay OAuth tokens), eBay Browse API, CheapShark API (USD→MWK), RAWG API (reviews/search), SMTP email (contact + booking).
- **Hosting:** cPanel/Apache shared hosting; site served from `_/public_html/`.

## 2. End users & core problem
- **Primary users:** prospective/existing IT clients in Malawi evaluating ProManaged for websites, networking, and equipment — they need to quickly trust the company and make contact (contact form + appointment booking).
- **Secondary users:** gamers browsing prices, reviews, and used consoles.
- **Core job of the site:** convert a visitor into a lead (form submit / booking) by looking credible, modern, and easy to navigate.

## 3. Current state (design audit — light theme, deeply inconsistent)
- **5+ conflicting color palettes.** Each CSS file redefines `:root` or hardcodes colors: blues span `#1D4ED8 / #1d3557 / #2563eb / #007BFF / #004AAD`; accents jump between orange, red, green, gold, and cyan by page. One service page (`custom_websites.css`) is unexpectedly DARK while everything else is light.
- **5 font families, 4 never loaded.** Only Poppins is imported; CSS also references Raleway, Montserrat, Space Grotesk, and Arial, which silently fall back.
- **No spacing/type scale.** Sizes are ad-hoc per component (hero H1 `4.5rem`, services title `2.8rem`, section H2 `2rem`, etc.).
- **Inconsistent shape language.** Border-radius from `5px` to `24px`; half a dozen shadow depths; multi-stop gradients on nearly every element.
- **Effect overload.** Spinning hero radial glow (20s), pulsating circular hamburger, 360° icon spins, scale-and-lift hovers, glowing colored button shadows.
- **Container drift.** Mostly `max-width: 1200px`, but footer uses `max-width: 80%`.
- **Content bugs to fix during redesign:** `custom_websites.html` `<title>`/meta say "Gaming Services" (copy-paste error); footer links to non-existent pages (`about.html`, `pages/hardware.html`); the "Contact Us" dialog + script are duplicated inline in every page footer.

**8 HTML pages:** `index.html`, `get-started.html`, `learn_more.html`, `privacy_policy.html`, and `pages/{custom_websites, gaming_services, it_equipment, network_infrastructure}.html`.

## 4. What "excellent" looks like (benchmarks)
Modern-minimalist IT/agency and SaaS marketing sites that solve the same "build trust + convert" job well:
- **Linear (linear.app)** — restrained neutral palette + single accent, tight type scale, generous whitespace, near-zero decorative animation, crisp single-radius/single-shadow system.
- **Stripe (stripe.com)** — disciplined design tokens, clear visual hierarchy, calm sectioning, strong but simple CTAs.
- **Vercel / Geist** — monochrome-first neutral system with one accent, consistent spacing scale, subtle borders instead of loud shadows.

**What they do that this codebase doesn't yet:** one token source of truth (color, type, spacing, radius, shadow); one type family with a modular scale; whitespace as the primary design tool; solid restrained CTAs instead of glowing gradients; motion only for meaningful feedback.

## 5. Gaps ranked by impact
1. **No design system / token source of truth** — the root cause of the "dated, busy" feel. (highest impact)
2. **Palette & theme inconsistency** — 5+ palettes and a rogue dark page break coherence and trust.
3. **Effect/animation overload** — reads as amateur; minimalism means removing most of it.
4. **Typography chaos** — unloaded fonts, no scale.
5. **Shape inconsistency** — radii/shadows/gradients need consolidation to 1–2 values each.
6. **Content/link bugs** — wrong titles, dead footer links, duplicated inline dialogs.

## 6. Non-goals for this redesign (unless approved)
Backend/API behavior, data integrations, hosting config, and secret management are OUT of visual-redesign scope (secret exposure is noted separately as a security concern, not a design task).
