# SYSTEM_MAP.md — ProManaged IT Frontend Audit (LEARN phase L1+L2)

> Read-only map of `_/public_html/` (8 HTML pages, 24 CSS, 20 JS). Reference for redesign specialists.
> Locked design: accent #2563EB, font Inter, single light theme, one radius, one–two shadows.

## Page → assets (CSS/JS loaded, inline dialogs)
1. **index.html** — CSS: global_styles, navbar, logo, hero_section, service_cards, about_section, contact_section, footer_promanaged, mission_vision, scroll_top, how_it_works. JS: main, mobile_phone_navbar, service_cards, contact__form, how_it_works. Inline contact dialog lines 325–381.
2. **get-started.html** — CSS: global_styles, footer_promanaged, get-started, scroll_top, book_appointment. JS: service_tab_switching, booking_form. Inline dialog 224–280. DEAD LINK `pages/hardware.html` line 76.
3. **learn_more.html** — CSS: global_styles, footer_promanaged, learn-more, scroll_top, get-started. Inline dialog 139–195. DEAD LINK `about.html` line 88.
4. **privacy_policy.html** — CSS: privacy_policy. JS: privacy_policy. No dialog.
5. **pages/custom_websites.html** — CSS: 7 files incl. ROGUE DARK custom_websites.css. JS: booking_form, custom_websites. Inline dialog 448–504. CONTENT BUG lines 8–9 say "Gaming Services".
6. **pages/gaming_services.html** — CSS: gaming_services, game_prices, game_reviews, game_search, ebay, gear_and_accessories (11 total). JS: gaming_services, booking_form, game_prices, game_reviews, game_search, ebay, service_tab_switching. Inline dialog 268–324.
7. **pages/it_equipment.html** — CSS: it_equipment (best :root, uses #2563eb) + 7 others. JS: contact_form, it_equipment, how_it_works. Inline dialog 708–764. Inline scroll script 60–70.
8. **pages/network_infrastructure.html** — CSS: networking + 5 others. JS: booking_form, networking. Inline dialog 277–333.

## CSS palettes in use (9 conflicting :root/hardcoded sets → replace with tokens)
- global_styles.css — #1D4ED8, #F97316, #10B981, bg #F3F4F6, text #111827
- navbar.css — #1d3557, #457b9d, #e63946 · font Raleway (NOT loaded)
- hero_section.css — gradient #243B55→#141E30, title #A4B2C5, button #FF6F61→#FFD564, #00C6FF · font Space Grotesk (NOT loaded)
- service_cards.css — #f4f7fa, #007BFF, #2c3e50 · font Raleway (NOT loaded)
- contact_section.css — gradient #243B55→#141E30, button #00C6FF→#0072FF · font Montserrat (NOT loaded)
- custom_websites.css — DARK #1a1f25/#2c3e50, #e67e22, #f1c40f (ROGUE)
- footer_promanaged.css — bg #F8F9FA, #556B8E, #6096BA, max-width:80% (line 16) · font Montserrat (NOT loaded)
- it_equipment.css — #2563eb (matches target), #1e40af, #3b82f6
- privacy_policy.css — #007bff, #f1f1f1 · font Roboto (NOT loaded)

## Fonts referenced but NOT loaded (only Poppins is imported)
Raleway (navbar, service_cards, book_appointment, logo) · Space Grotesk (hero) · Montserrat (footer, contact_section) · Roboto (privacy_policy). All silently fall back. Target: replace all with Inter.

## Decorative effects to remove (D4) / replace (D5)
- @keyframes `subtleSpin` — 20s hero rotating radial glow (hero_section.css ~lines 29–35); 25s variant in contact_section.
- @keyframes `pulsate` — 1.5s hamburger glow (navbar.css ~lines 181–193).
- 360° icon rotation on card hover (service_cards.css ~line 110).
- Colored/glowing box-shadows e.g. `0 6px 18px rgba(255,111,97,0.8)`.
- Gradient buttons to replace with solid #2563EB: hero `linear-gradient(to right,#FF6F61,#FFD564)`, contact `linear-gradient(to right,#00C6FF,#0072FF)`, booking `linear-gradient(135deg,#ff6b6b,#ff8c66)`.

## Shape chaos to normalize (D6)
- border-radius values in use: 3,4,5,6,8,10,12,15,16,20,24,30px,50% → normalize to one token (recommend 8px; keep 50% only for true circles/avatars).
- box-shadow: many depths + colored glows → collapse to one–two neutral shadow tokens.

## JS notes
- booking_form.js loaded on 4 pages; how_it_works.js on 2.
- Filename inconsistency: `contact__form.js` (index) vs `contact_form.js` (it_equipment) — likely duplicate logic.
- Unused server variants present: contact_us_through_server.js, booking_through_server.js, game_prices_through_server.js, ebay_through_server.js.

## Duplicated inline "Contact Us" dialog (7×) — dedupe target (D10)
index 325–381 · get-started 224–280 · learn_more 139–195 · custom_websites 448–504 · gaming_services 268–324 · it_equipment 708–764 · network_infrastructure 277–333. Each is an inline `<div id="contact-dialog" style="...">` + inline listener.

## Dead links (D13)
- `about.html` — in all 7 page footers.
- `pages/hardware.html` — get-started.html line 76.

## Content bug (D13)
custom_websites.html line 8 meta description + line 9 <title> both say "Gaming Services" (copy-paste from gaming_services.html) → should be "Custom Websites".

## Layout drift (D10)
footer_promanaged.css line 16 `max-width:80%` vs standard 1200px containers → standardize to 1200px.
