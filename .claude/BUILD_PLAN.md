# Build Plan: ProManaged IT — Full-Site K46-Inspired Editorial Redesign + Cleanup

> ACTIVE TASK. Previous bento/type attempts are superseded. Do not repeat them.
> **OWNER DIRECTIVE:** Rebuild the entire website as one coherent visual system inspired by the supplied K46 Medienkollektiv reference: https://k46team.webflow.io/ . Adapt the composition principles to ProManaged IT. Do not literally copy K46 text, branding, names, artwork, layout, or proprietary assets.
> **PRIMARY RULE:** `index.html` is the lead visual reference, but EVERY current public page must use the same design language, same header, same footer, same typography, same colour system, same spacing/radius language, and the same editorial quality bar.
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Delete temporary YAML immediately and verify it is absent.

## Goal
Replace the current corporate/card-stack website with a cohesive editorial technology-studio site: full-width chapters, oversized typography, large image/content blocks, varied composition, warm-neutral/Japandi colour, consistent navigation/footer, and deliberate storytelling across every page. Remove obsolete eBay/RAWG/game/render leftovers and remove all pricing from the software page.

## Wants vs Needs
- **Want:** a website that feels like one professionally designed company rather than a collection of templates.
- **Need:** shared visual system across all pages; the landing page leads, but secondary pages must not look like the old site beside it.
- **End user:** prospective ProManaged clients who need trust, clarity, capabilities, and a direct path to enquiry/book.
- **Friction today:** centered wrappers, repetitive cards, blue-heavy UI, inconsistent page structures, and stale legacy logic.

## Success Moment
A visitor can move from `index.html` to any service/about/support page and immediately knows it is the same ProManaged site because the header, footer, type, palette, spacing, section composition, and editorial rhythm are unmistakably consistent.

## Reference Systems
- **K46 Medienkollektiv** — take: direct human opening, oversized typography, capability-led storytelling, large image-led sections, repeated contact invitations, and collage/editorial rhythm. Avoid copying protected content/assets.
- **Mockuuups Bento 07** — take: varied block proportions and broad visual compartments. Avoid a wall of equal cards.
- **Editorial/Japandi layouts** — take: ivory, sand, warm stone, muted charcoal, calm whitespace. Avoid beige overload.

## Completion Criteria (Definition of Done)
- [ ] `index.html` is structurally redesigned and establishes the canonical visual language.
- [ ] EVERY public page uses the same visual system and shared header/footer treatment: `index.html`, `get-started.html`, `learn_more.html`, `privacy_policy.html`, `pages/custom_websites.html`, `pages/hardware_sourcing.html`, `pages/network_infrastructure.html`.
- [ ] Navbar/header is visually uniform across every public page, including logo sizing, spacing, typography, links, and mobile treatment.
- [ ] Footer is visually uniform across every public page; no page keeps an old/template footer style.
- [ ] Hero treatment is consistent across pages while allowing page-specific composition/content.
- [ ] Page sections use large editorial blocks and varied proportions; no page falls back to repetitive equal-card rows as its main story.
- [ ] `index.html` hero is effectively full-width and uses an oversized direct statement plus major visual/content blocks.
- [ ] At least 4 landing-page chapters use distinct proportions/surfaces so scrolling feels like moving through designed panels.
- [ ] Service pages use typography-led editorial blocks rather than generic card catalogues.
- [ ] Founder/story content uses the existing founder image as a substantial visual anchor where appropriate.
- [ ] Contact is a strong closing chapter and remains functional.
- [ ] Typography uses a modern display face for major headings and Inter for body/UI.
- [ ] Palette is warm-neutral/Japandi: ivory/off-white, warm stone, sand/greige, muted charcoal, restrained earthy accent; blue is secondary identity/interaction only.
- [ ] No decorative gradients, looping background animation, parallax, or gimmicky motion.
- [ ] No excessive nested cards, shadows, or dashboard-style UI.
- [ ] `pages/custom_websites.html` contains zero visible prices, pricing tables, package amounts, or pricing-led CTA copy.
- [ ] No obsolete eBay/RAWG/game-price/game-review/shopping/render references remain in active code or `.claude` docs.
- [ ] No dead script/stylesheet references remain; unused assets proven unnecessary are deleted.
- [ ] Contact, booking, SMTP, and honeypot functionality remains intact.
- [ ] Playwright verifies the site using the REAL available browser window/tab size first; no fixed custom viewport is used for the primary desktop review.
- [ ] After the real-window review, Playwright explicitly checks the tab's actual `window.innerWidth`/`window.innerHeight` and records them.
- [ ] Only after desktop real-window review, Playwright checks mobile/tablet breakpoints with emulation at 375px and 768px as secondary responsive verification.
- [ ] Zero console errors, zero horizontal overflow, no broken internal links, and no broken CTA/form interactions.
- [ ] No `.yml`/`.yaml` files remain.
- [ ] Final implementation is committed to `main` and pushed to `origin/main`.

## Public Pages / Required Uniformity
1. `index.html` — landing page and visual benchmark.
2. `get-started.html` — same shell, editorial service/onboarding story.
3. `learn_more.html` — same shell, editorial information story.
4. `privacy_policy.html` — same header/footer and typography; content layout may remain document-like but must visually belong to the same system.
5. `pages/custom_websites.html` — software/web-app story, no pricing.
6. `pages/hardware_sourcing.html` — hardware sourcing story.
7. `pages/network_infrastructure.html` — networking story.

## Files to Change
### Shared site system
- `css/tokens.css`
- `css/global_styles.css`
- `css/navbar.css`
- `css/logo.css`
- `css/footer_promanaged.css`
- `css/contact_section.css`
- `css/hero_section.css`

### Landing + sections
- `index.html`
- `css/service_cards.css`
- `css/why_band.css`
- `css/about_section.css`
- `css/mission_vision.css`

### Secondary pages
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`
- their currently linked page-specific CSS files only where required to adopt the shared system.

### Pricing removal
- `pages/custom_websites.html`
- `css/custom_websites.css`

### Cleanup audit
- current `*.html` pages
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
### `index.html` — PRIMARY IMPLEMENTATION
- Section: entire homepage DOM.
- Change: rebuild around large editorial chapters rather than repeated card sections. Required order: Hero → What ProManaged Is → Capabilities → Founder/Story → Mission/Vision → Contact → Footer.
- Preserve factual content, IDs, links, forms, accessibility hooks and CTA targets. Add semantic wrappers/classes where needed.
- Hero: large direct statement + dominant visual/content block + smaller supporting block. No centered three-card SaaS hero.

### Shared header — `css/navbar.css`, `css/logo.css`
- Change: establish one canonical header used identically across all seven public pages. Same logo dimensions, nav spacing, typography, active/hover treatment, fixed-header offset, and mobile menu treatment.
- Requirement: no page-specific navbar variants.

### Shared footer — `css/footer_promanaged.css`
- Change: establish one canonical footer layout used identically across all seven pages. Wide inner rail, strong editorial hierarchy, warm-neutral surface, consistent links/contact/brand treatment.
- Requirement: no page-specific footer variants or legacy footer styling.

### Shared design system — `css/tokens.css`, `css/global_styles.css`
- Change: create one warm-neutral/Japandi design language: ivory/off-white base, warm stone, sand/greige, charcoal text, restrained earthy accent. Blue only for secondary identity/interactive states.
- Typography: modern display face for H1/H2; Inter for body/UI; fluid heading sizes.
- Layout: wide inner rail around 1440–1560px on desktop, generous gutters, full-bleed chapter backgrounds.

### Shared hero system — `css/hero_section.css`
- Change: define a consistent editorial hero language for every page: oversized type, broad composition, one dominant visual/content zone, and clear CTA. Each page may vary content but not the underlying design language.
- No narrow centered shell controlling the whole hero.

### Secondary page layouts
- `get-started.html`, `learn_more.html`, `privacy_policy.html`, and all three `pages/*.html` pages must be brought into the shared header/footer/type/colour/layout system.
- Keep page-specific content and forms; rewrite layout wrappers/classes where necessary to avoid old centered card stacks.
- `privacy_policy.html` may remain text/document focused but must visually use the canonical shell.

### `pages/custom_websites.html` + `css/custom_websites.css`
- Remove every visible price, currency amount, pricing table, package amount, “starting at” amount, and price-led CTA copy.
- Preserve service capabilities, factual proof/context, and enquiry CTA.

### Cleanup audit
- Audit every `<script src>` and stylesheet link against the current tree.
- Search active code/docs for `ebay`, `rawg`, `game_price`, `game_reviews`, `game_search`, `shopping`, `render`, and abandoned server variants.
- Delete only files proven unused by current pages/runtime.
- Do not remove working form/mail/honeypot paths.
- Update `.claude` maps/docs so they describe the current tree.

## Playwright QA — MANDATORY
### Primary desktop review
- Run the site in Playwright using the normal headed browser/window size available to the environment.
- Do NOT call `page.setViewportSize()` for the primary desktop review.
- Do NOT invent a custom “desktop viewport” such as 1280x720 as the primary visual truth.
- Use the actual browser/tab dimensions available to Playwright. Maximize/full-screen the browser when the environment permits it.
- Record `window.innerWidth`, `window.innerHeight`, `document.documentElement.clientWidth`, and `document.documentElement.scrollWidth` for every page.
- Capture full-page screenshots of every public page at that real window size.
- Review every screenshot for composition, width usage, typography, header/footer uniformity, block transitions, overflow and obvious visual defects.

### Secondary responsive review
- Only after the real-window desktop review passes, use Playwright device/viewport emulation for 768px and 375px checks.
- Confirm the layout collapses intentionally rather than simply shrinking desktop blocks.
- Confirm no horizontal overflow and that nav/footer remain coherent.

### Interaction review
- Check nav links, mobile menu, contact CTA, contact form, booking CTA/form, footer links, page transitions, and any remaining page-specific interactions.
- Console must be clean of errors.

## New Code Needed
Pseudocode only:
1. Establish shared page shell and canonical header/footer.
2. Build full-width editorial chapters with wide inner rails.
3. Compose homepage and secondary pages from unequal blocks using the same design language.
4. Remove obsolete runtime paths and pricing UI.
5. Run Playwright real-window visual QA, then mobile/tablet emulation.

## Constraints / Things NOT to Touch
- Do not literally copy K46 content, branding, names or artwork.
- Do not invent business facts, metrics, clients, projects, awards, or imagery.
- Do not remove working contact/booking/SMTP/honeypot functionality.
- No site-wide dark mode. Warm charcoal may be a chapter surface.
- No decorative gradients, looping background animation, parallax, or gimmicky motion.
- No excessive floating-card/shadow effects.
- No modal reintroduction.
- `origin/main` only.
- Never commit YAML.
- All seven public pages must be visually uniform; do not leave footer/header/design variants behind.

## Phases
### Phase 1: Shared design system + shell
- Goal: canonical tokens, typography, header, footer, wide page rails, and hero language applied to all seven pages.
- Exit: every page visually belongs to the same design system.
- Files: shared system list + page heads/wrappers as needed.

### Phase 2: Editorial page redesign
- Goal: rebuild index and all six secondary public pages with large editorial chapters and consistent storytelling language.
- Exit: no page reads as the old centered card-stack site.
- Files: landing + secondary page lists.

### Phase 3: Pricing + legacy cleanup
- Goal: remove software pricing and obsolete runtime/doc references without breaking current functionality.
- Exit: no prices, dead references or unused assets proven necessary.
- Files: pricing + cleanup lists.

### Phase 4: Playwright verification
- Goal: real-window desktop visual review first, then 768/375 emulation, interactions and console/overflow checks.
- Exit: every public page passes visual/functional QA and the final implementation is pushed to `origin/main`.
- Files: fixes only from the scoped lists.
