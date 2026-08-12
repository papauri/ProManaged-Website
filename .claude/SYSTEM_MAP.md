# SYSTEM_MAP.md — ProManaged IT current tree

> Rewritten 2026-08-12 after the "Signal & Systems" full-site redesign.
> This describes the repository as it actually is now.

## Pages (7)
All seven share one shell: canonical navbar, canonical footer, the shared editorial hero,
one type scale and one chapter rhythm. Page files add content only.

1. **index.html** — landing page and primary design reference. Chapter order is fixed:
   Hero (`#home`) → What ProManaged Is (`#what-we-are`) → Build/Source/Connect (`#services`)
   → How We Work (`#how-we-work`) → Founder/Story (`#about`) → Mission/Vision (`#mission-vision`)
   → Contact (`#contact`) → Footer.
2. **get-started.html** — guided intake ("bring us the problem") + the site's single real
   booking form (`#booking`).
3. **learn_more.html** — how we work: who we help, the four-step method, what we take on,
   what to expect.
4. **privacy_policy.html** — same shell as every other page; legal copy is unchanged and
   must stay that way.
5. **pages/custom_websites.html** — Build. Software / web apps / SaaS. **Contains no prices.**
6. **pages/hardware_sourcing.html** — Source. Sourcing, supplier coordination, delivery,
   local-friendly payment. Carries the equipment-request form.
7. **pages/network_infrastructure.html** — Connect. Satellite/fibre, WiFi, cabling, security,
   monitoring, maintenance.

## Design system
`css/tokens.css` is the single source of truth and the only file allowed to hold a raw colour.
Palette: warm neutrals (paper/ivory/stone/sand/greige) + graphite, a restrained earthy accent
(`--color-accent-earth`) carrying the decorative weight, and blue reserved for interaction and
identity (buttons, links, focus). Instrument Serif is the display face (H1/H2 only); Inter
carries body and UI. Fluid display scale, one radius set, two shadows, `--rail-max: 1560px`
with generous `--rail-pad` gutters, and `--section-y` as the one chapter rhythm.

## CSS (19 files, all under `css/`, all referenced)
Shared shell, loaded by every page: `tokens.css`, `global_styles.css`, `navbar.css`, `logo.css`,
`hero_section.css`, `footer_promanaged.css`, `scroll_top.css`.

`global_styles.css` owns the shared vocabulary: rails, `.section` chapters and surfaces,
`.chapter-head`/`.eyebrow`/`.lede`, the `.grid` + `.block` editorial system (span and fill
modifiers), `.mark`, `.step-num`, `.list`, `.process-steps`, `.btn`, `.cta-band` and the single
responsive collapse. **Note:** the dark-surface text-colour overrides sit deliberately at the
end of that file so they win the cascade at equal specificity — do not move them earlier.

Homepage chapters: `why_band.css`, `service_cards.css`, `about_section.css`, `mission_vision.css`.
Shared form chapters: `contact_section.css` (index + hardware_sourcing), `book_appointment.css`
(get-started).
Page-specific: `get-started.css`, `learn-more.css`, `privacy_policy.css`, `custom_websites.css`,
`hardware_sourcing.css`, `networking.css`.

## Signature motion — "building blocks"
Large blocks settle into place: the hero composition assembles on load, then each major
chapter assembles as it is scrolled to. Only chapter-level blocks move — never text, icons
or list items. Tokens live in `tokens.css` (`--block-duration`, `--block-stagger`,
`--block-travel`, `--block-scale`, `--ease-settle`); states live in `global_styles.css`.

Two deliberately different mechanisms:

- **Initial load** — `[data-assemble]` on the hero rail. Hidden by CSS via *element*
  selectors (`.js-on [data-assemble] .hero-statement`…), gated on a `.js-on` class set by a
  tiny inline `<head>` script so the rule is live **before first paint**. This is the whole
  point: a JS-added class could only apply after paint, letting the hero render and then
  blink out. `main.js` staggers `.is-settled` onto the three hero blocks, then removes the
  `data-assemble` attribute, which makes every hiding rule stop matching at once.
- **Scroll** — `data-blocks` on each major chapter `<section>`. `main.js` applies
  `.block-reveal` to that chapter's blocks and an IntersectionObserver settles them with a
  capped stagger. These start below the fold, so a JS-applied class cannot flash.

Guarantees, all covered by `qa-motion`: no JS → nothing is ever hidden; reduced motion →
nothing is scheduled and CSS forces everything visible; a 4s safety net clears any stuck
state; chapters already on screen at load are skipped; and the animation is transform +
opacity only, so the layout box never changes (verified via `offsetLeft`/`offsetWidth`,
not `getBoundingClientRect`, which would include the transform).

## JS (6 files, all under `js/`, all referenced)
- `main.js` — loaded on all 7 pages. Capability-block navigation (`.service-card[data-target]`,
  keyboard-activatable), header-offset smooth scroll for in-page nav links, the building-block
  motion system described above, and the back-to-top control.
- `mobile_phone_navbar.js` — shared hamburger/overlay toggle, all 7 pages.
- `contact__form.js` — contact + equipment-request form submit (index, hardware_sourcing).
- `booking_form.js` — booking form submit (get-started).
- `custom_websites.js` — FAQ accordion class toggle (custom_websites).
- `networking.js` — geolocation-based currency display over `.price-info` / `.service-fee`
  (network_infrastructure). The price plates in that page's markup are its contract.

## PHP (4 files, all under `php/`)
`contact.php` and `booking.php` send via SMTP through vendored PHPMailer
(`php/vendor/PHPMailer/`) using `mailer.php` + `env.php` and an untracked root `.env`.
Both forms use a `website` honeypot field. There is no Node backend and no third-party
API integrations.

## Assets
`images/icon.png` (logo + favicon), `images/founder.png` (founder portrait, used as the large
visual anchor in the homepage About chapter).

## Known non-blocking backlog
- Inter, Instrument Serif and Font Awesome are served from CDNs; self-hosting would remove the
  external dependency.
- `networking.js` requests browser geolocation on page load, which prompts the visitor. Worth
  revisiting in favour of an explicit currency toggle.
