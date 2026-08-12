# Build Plan: K46-Inspired ProManaged Site Refresh

## Goal
Refresh the ProManaged IT website to use the **spirit** of `k46team.webflow.io`: bold collective-style landing page, strong editorial blocks/cards, playful visual rhythm, direct contact prompts, and a consistent visual system across every public page. Use only ProManaged IT business information and fully reworded original copy. Do **not** copy K46 text, images, code, exact layout, or branding.

## Wants vs Needs
- Wants: “Clone” the visual feel across every page, reword copy, add pictures if useful, and make the implementation agent autonomous within this plan.
- Needs: Original ProManaged-branded implementation that avoids copyright/trademark copying, improves consistency across all pages, and works with the existing static HTML/CSS/JS/PHP site.
- End user: Individuals and small businesses in Ireland, Malawi, and worldwide who need software, hardware sourcing, or networking help.
- Friction: Visitors may not immediately understand ProManaged’s three service lines or how to start.
- Success Moment: A visitor lands on any public page and quickly thinks, “This is a modern, trustworthy IT partner, and I know exactly what to click next.”

## Reference Systems
- K46 Medienkollektiv — take: bold human-first intro, overlapping/varied editorial blocks, direct positioning, strong contact prompts — avoid: copied German text, names, images, exact composition.
- Linear — take: crisp spacing, confident section rhythm, restrained modern UI — avoid: overly abstract SaaS language.
- Stripe-style landing pages — take: clear information hierarchy, trust-building explanatory sections and decisive CTAs — avoid: dense corporate copy.

## Completion Criteria (Definition of Done)
- [ ] Every public HTML page has refreshed, original ProManaged copy and visual rhythm aligned with the new site direction.
- [ ] Homepage hero, service sections, about, mission/vision, contact, and footer feel cohesive and K46-inspired without copying protected assets or wording.
- [ ] Service pages keep their existing purpose but get stronger page intros, editorial/card-based sections, and clearer CTAs.
- [ ] **Navbar/header is visually identical across every public page**: same logo sizing, spacing, typography, link states, fixed-header behavior, and mobile menu treatment.
- [ ] **Footer is visually identical across every public page**: same structure, columns, spacing, typography, surface treatment, links and contact hierarchy.
- [ ] Typography, colours, spacing, radii, buttons and section rhythm are shared across all public pages.
- [ ] Existing forms, links, scripts, and PHP endpoints remain wired exactly as before unless text-only labels change.
- [ ] Existing business facts remain: ProManaged IT, John-Paul Chirwa, Ireland/Malawi/worldwide reach, software/web apps/SaaS, hardware sourcing, network infrastructure, local-currency support, listed emails.
- [ ] No pricing is shown anywhere on `pages/custom_websites.html`.
- [ ] No broken relative asset paths or navigation links.
- [ ] Responsive behavior remains usable on mobile and desktop.
- [ ] **Playwright performs real-window/headed desktop review first for every public page.** No custom fixed viewport is used for the primary desktop review.
- [ ] **Playwright records actual browser dimensions** using `window.innerWidth`, `window.innerHeight`, `document.documentElement.clientWidth`, and `document.documentElement.scrollWidth` for every public page.
- [ ] Full-page screenshots are captured at the real available browser size for every public page.
- [ ] After real-window desktop review, Playwright checks **768px and 375px** as secondary responsive emulation only.
- [ ] Playwright reports zero console errors, zero horizontal overflow, no broken internal links, and no broken CTA/form interactions.
- [ ] No `.yml`/`.yaml` files remain.
- [ ] All implementation work is committed directly to `main` and pushed to `origin/main`.
- [ ] Claude/Codex reports only: **Changed / Blockers / Ready for review**.

## Public Pages
- `index.html`
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`

## Files to Change
### Shared shell/design
- `css/tokens.css`
- `css/global_styles.css`
- `css/navbar.css`
- `css/logo.css`
- `css/footer_promanaged.css`
- `css/hero_section.css`
- `css/contact_section.css`

### Homepage
- `index.html`
- `css/service_cards.css`
- `css/about_section.css`
- `css/mission_vision.css`
- `css/why_band.css`

### Secondary pages
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html` — visual shell/header/footer consistency only; do not rewrite legal/privacy copy
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`
- page-specific CSS files already linked by those pages: `css/get-started.css`, `css/learn-more.css`, `css/custom_websites.css`, `css/hardware_sourcing.css`, `css/networking.css`

### Cleanup audit
- current `*.html`
- current `js/*.js`
- current `css/*.css`
- current `php/*.php`
- `.claude/PROJECT_CONTEXT.md`
- `.claude/SYSTEM_MAP.md`
- `.claude/agents/backend-specialist.md`
- `.claude/agents/codebase-scout.md`
- `.claude/agents/frontend-specialist.md`
- `.claude/agents/build-planner.md`

## Exact Changes
### `index.html`
- Section: `head metadata`
- Change: Reword description/keywords for modern IT collective/partner positioning.
- Reason: Align search snippet and brand promise.
- Section: `#header-section`
- Change: Keep existing nav destinations, logo path, mobile-menu hooks and behavior; visual treatment must match the canonical shared navbar.
- Reason: Avoid breaking mobile JS while making the shell uniform.
- Section: Hero
- Change: Rework into a bold ProManaged statement, not a conventional SaaS headline. Keep existing CTAs and use factual Ireland/Malawi/worldwide/local-payment facts. Use large editorial blocks rather than a small card cluster.
- Reason: Capture K46’s confident intro without copying it.
- Section: Services
- Change: Keep the three service destinations; rewrite each as a concise problem/solution editorial block with different visual weight.
- Reason: Make services immediately understandable.
- Section: Why/About/Mission-Vision/Contact/Footer
- Change: Reword and restyle into connected editorial chapters, founder/trust story, direct contact prompt, and the canonical footer.
- Reason: Cohesive whole-page narrative.

### `get-started.html`
- Sections: hero, why, services, testimonials, booking
- Change: Rewrite as a guided “tell us what you need” page; keep booking form fields, actions and JS hooks unchanged. Use the same header/footer and visual language as `index.html`.

### `learn_more.html`
- Sections: hero, company/service sections, footer
- Change: Reword to explain who ProManaged helps, how cross-border support works, and what clients can expect. Match the shared shell and editorial rhythm.

### `privacy_policy.html`
- Sections: page shell only
- Change: Apply the canonical navbar/footer, typography, spacing, colours and page-width system without rewriting legal/privacy content.
- Reason: Privacy page must still feel like the same site.

### `pages/custom_websites.html`
- Sections: hero, process, build types, projects, FAQ, CTA
- Change: Rewrite around software/web apps/SaaS outcomes; keep existing page purpose and booking/enquiry flow; **remove all visible prices, pricing tables, package amounts, “starting at” amounts and price-led UI/copy**.
- Reason: Pricing is no longer wanted on the software page.

### `pages/hardware_sourcing.html`
- Sections: hero, sourcing intro, categories, request form, footer
- Change: Rewrite around stress-free sourcing, delivery, local-currency payment; keep request/contact form behavior unchanged and match the shared visual system.

### `pages/network_infrastructure.html`
- Sections: hero, service sections/cards, CTA, footer
- Change: Rewrite around reliable internet, WiFi, Starlink/fiber, security and maintenance; keep scripts unchanged and match the shared visual system.

### Shared CSS
- `css/tokens.css`: adjust only the shared design tokens needed for the refreshed system.
- `css/global_styles.css`: add shared wide-layout, section rhythm and editorial helpers only if needed.
- `css/navbar.css`: one canonical navbar style for all pages.
- `css/logo.css`: one canonical logo sizing rule across all breakpoints.
- `css/footer_promanaged.css`: one canonical footer structure/style across all pages.
- `css/hero_section.css`: shared bold editorial hero language with page-specific content.
- `css/contact_section.css`: shared contact styling only; do not alter form behavior.
- Page CSS files: align existing selectors to the shared system; do not create one-off page-specific visual languages unless required by genuinely different content.

## New Code Needed
```text
For each listed HTML page:
  preserve existing navigation, forms, scripts, IDs and functional hooks
  replace generic copy with original ProManaged copy based on verified repo facts
  organize content into bold intro + editorial blocks + clear CTA
  apply the same canonical header/footer and visual system

For CSS:
  reuse shared tokens and shared shell styles
  create small helpers only where necessary
  avoid duplicated page-specific design systems
  keep mobile-safe wrapping and existing functional breakpoints

For QA:
  use Playwright headed browser at the real available window size first
  capture full-page screenshots for every public page
  record actual tab/window dimensions and document width values
  inspect visual consistency page-to-page
  then run secondary checks at 768px and 375px
```

## Constraints / Things NOT to Touch
- Do not copy K46 wording, images, source code, names, biographies, legal pages, or exact design.
- Do not add paid/external image dependencies unless the plan explicitly requires them; prefer existing repo assets and existing icon CDN already in use.
- Do not change PHP form endpoints, input `name` attributes, or JavaScript file paths.
- Do not alter `privacy_policy.html` legal/privacy copy; only bring its visual shell into consistency.
- Do not introduce hardcoded colour palettes outside `css/tokens.css`.
- Do not remove accessibility attributes or form labels.
- Do not remove working contact/booking/SMTP/honeypot behavior.
- Do not remove a script/CSS/PHP file unless its usage has been verified absent from all current public pages/runtime paths.
- Do not create or use sub-branches. All commits go directly to `main` and are pushed to `origin/main`.
- Never commit `.yml` or `.yaml` files; delete temporary YAML after use.

## Open Questions
None. Use existing ProManaged business information in the repo and make the implementation decisions autonomously within this scope.

## Known Trade-offs
- Medium: A literal clone is not allowed; the implementation should be inspired, not copied.
- Medium: “Add pics if you have to” is limited to existing assets and already-approved icon/CDN sources unless a new dependency is explicitly approved.
- Low: Updating every page increases review scope, but uniformity across every public page is a hard requirement.
- Low: Visual polish is constrained by the existing static HTML/CSS architecture; structural HTML changes are allowed where necessary to achieve the approved visual direction.

## Phases
### Phase 1: Shared shell + homepage foundation
- Goal: Refresh `index.html` plus shared/core CSS so the new ProManaged visual direction is established, including the canonical navbar and footer.
- Exit condition: Homepage has original copy, bold editorial blocks, working nav/CTAs/contact, canonical header/footer, and responsive layout.
- Files: `index.html`, shared CSS list, homepage CSS list.

### Phase 2: Secondary top-level pages
- Goal: Refresh `get-started.html`, `learn_more.html`, and `privacy_policy.html` to match the homepage style and voice without changing legal content.
- Exit condition: All three pages keep existing forms/scripts/links and use the same header/footer/type/colour/spacing language.
- Files: listed secondary pages + page CSS.

### Phase 3: Service pages
- Goal: Refresh all three service pages with clearer copy, editorial blocks, stronger CTAs, and the same global design system. Remove all software pricing.
- Exit condition: Software, hardware and networking pages are visually consistent and retain working relative paths and forms.
- Files: listed service pages + page CSS.

### Phase 4: Legacy cleanup + browser QA
- Goal: Remove obsolete references/assets only where proven unused, then perform full Playwright review using the real available desktop window followed by 768/375 checks.
- Exit condition: All Completion Criteria pass and the final implementation is pushed to `origin/main`.
- Files: cleanup audit list + fixes only from prior phases.
