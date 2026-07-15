# BUILD_PLAN.md — ProManaged IT Modern-Minimalist Redesign

> Scope approved by owner 2026-07-13. Locked decisions: accent #2563EB, font Inter, single light theme, one radius, one–two shadows, tokens in `_/public_html/css/tokens.css`.
> This plan is bounded by the PROJECT COMPLETE WHEN list. build-planner may NOT add deliverables beyond it — new ideas go to FUTURE IDEAS and are flagged for approval.

## How to read this
- `[ ]` = not started, `[~]` = in progress, `[x]` = complete (only after qa-auditor PASS).
- Phase order is strict: Learn → Stabilise → Complete → Polish.
- Each task names the executing specialist and its exact file scope.

---

## Phase 1 — LEARN (map before touching)
- [x] L1. codebase-scout maps `_/public_html/css/` and `_/public_html/js/` → `.claude/SYSTEM_MAP.md`: which CSS/JS each page loads, duplicated code, dead links, all palettes/fonts/effects in use. (enables D1–D6)
- [x] L2. codebase-scout maps the 8 HTML pages → per-page component/section inventory. (enables D7–D13)

## Phase 2 — STABILISE (build the foundation)
- [x] D1. Create `_/public_html/css/tokens.css` — single :root token set: neutral palette + accent #2563EB, type scale, spacing scale, one --radius, one–two --shadow. Import it first in every page. — frontend-specialist
- [x] D2. Load Inter (single font); remove references to Raleway/Montserrat/Space Grotesk/Arial; wire font tokens. — frontend-specialist  (also fix pre-existing broken ../../css/ stylesheet paths -> ../css/ on pages/custom_websites, it_equipment, network_infrastructure so their CSS loads)
- [x] D3. Remove the dark theme from `css/custom_websites.css`; unify all 8 pages to the one light theme. — frontend-specialist
- [x] D6. Normalize radii, shadows, and gradients across all 24 CSS files to token values (remove multi-stop decorative gradients). — frontend-specialist + ui-designer

## Phase 3 — COMPLETE (rebuild components minimally)
- [x] D4. Remove decorative animations (hero rotating glow, pulsating hamburger, 360° icon spins); keep subtle hover/focus only. — frontend-specialist
- [ ] D5. Replace glowing gradient buttons with restrained solid CTAs using the accent token. — frontend-specialist + ui-designer
- [ ] D7. Redesign nav/header + minimal mobile menu (`css/navbar.css`, `js/mobile_phone_navbar.js`). — frontend-specialist + ui-designer
- [ ] D8. Redesign hero (`css/hero_section.css`) — whitespace-driven, no rotating glow. — frontend-specialist + ui-designer
- [ ] D9. Redesign service cards + feature/testimonial sections (`css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`). — frontend-specialist + ui-designer
- [ ] D10. Redesign footer (`css/footer_promanaged.css`): fix max-width:80% drift; dedupe the inline "Contact Us" dialog across page footers. — frontend-specialist
- [ ] D11. Redesign contact + booking forms (`css/contact_section.css`, `css/book_appointment.css`) to minimal style. — frontend-specialist + ui-designer

## Phase 4 — POLISH (consistency & correctness)
- [ ] D12. Apply the design system consistently across all 8 pages; audit for stray old styles. — frontend-specialist + ui-designer
- [ ] D13. Fix content bugs: `custom_websites.html` title/meta ("Gaming Services" → correct); dead footer links (`about.html`, `pages/hardware.html`). — frontend-specialist
- [ ] D14. Verify responsive breakpoints (768px / 480px) and accessibility (contrast, focus states, alt text, tap targets) on all pages. — ui-designer + qa-auditor

---

## PROJECT COMPLETE WHEN (approved deliverables — fixed ceiling)
- [x] D1. tokens.css design-system source of truth (accent #2563EB, type + spacing scale, one radius, one–two shadows)
- [x] D2. Single font (Inter); 4 unloaded fonts removed
- [x] D3. Rogue dark theme removed; all 8 pages unified to one light theme
- [x] D4. Decorative animations removed; only subtle hover/focus feedback remains
- [ ] D5. Glowing gradient buttons replaced with restrained solid CTAs
- [x] D6. Radii, shadows, gradients normalized to token values
- [ ] D7. Nav/header + minimal mobile menu redesigned
- [ ] D8. Hero redesigned (no rotating glow)
- [ ] D9. Service cards + feature/testimonial sections redesigned
- [ ] D10. Footer redesigned (max-width drift + duplicated inline dialog fixed)
- [ ] D11. Contact + booking forms redesigned minimally
- [ ] D12. Design system applied consistently across all 8 pages
- [ ] D13. Content bugs fixed (wrong title, dead footer links)
- [ ] D14. Responsive breakpoints + basic accessibility verified

When every box above is [x], the project is DONE — print "PROJECT COMPLETE" and halt.

---

## FUTURE IDEAS (not in scope — needs owner approval)
- Remove committed secrets (.env, firebase-service-account.json, ebay_token.json) and the full cPanel dump from version control.
- Consolidate the duplicate Node vs PHP backends into one.
- Add automated tests / CI, a Lighthouse budget, or a static-site build step.
- Dark-mode toggle built on the token system.

---

## STATUS
- Just finished: D4 — decorative animations removed (rotating glows, pulsate hamburger, 360 icon spin, logo bounce/glow); functional motion kept (qa PASS).
- In progress: D5 — replace gradient buttons with solid accent CTAs.
- Next 3 queued: D5, D7, D8.
- Blocked: none.
