# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Execute one complete site-wide redesign and copy rewrite. Make ProManaged feel like a premium, human-led technology studio and practical technology partner for software/web apps, hardware sourcing, and network infrastructure. Use original editorial inspiration only; never copy a reference site's words, art, code, branding, or exact layout.

## Wants vs Needs
- **Want:** award-calibre visual polish, bold typography, editorial/bento rhythm, full copy rewrite, and one coherent identity across every page.
- **Need:** visitors understand the three services quickly, trust the company, and know exactly how to start.
- **Audience:** global individuals, founders, families, small teams, and organisations. Position globally; do not introduce exact countries/regions in rewritten marketing copy. Preserve the meaning of international reach and local-friendly payment options.
- **Success Moment:** any page immediately feels like the same premium ProManaged brand and offers one obvious next action.

## Creative North Star — Signal & Systems
Editorial technology journal + engineering workshop. Use oversized type, large image/content blocks, full-width chapter backgrounds, asymmetric composition, warm ivory/stone/graphite surfaces, and restrained blue interaction accents. Minimal cards; no dashboard aesthetic. Use `images/founder.png` as the main human visual anchor. Motion is limited to subtle reveal/hover/focus; no parallax, looping backgrounds, or gimmicks.

## Reference Systems
- K46 — take: human opening, direct positioning, capability-led storytelling, contact-forward rhythm — avoid copying content/layout.
- Mockuuups Bento 07 — take: varied block proportions and broad visual compartments — avoid a wall of equal cards.
- Premium editorial/technology sites — take: typography as navigation, strong pacing, large imagery, restrained motion — avoid spectacle without purpose.
- Linear — take: precision and polish — avoid abstract SaaS jargon.

## Completion Criteria (Definition of Done)
- [ ] All 7 public HTML pages have fully rewritten original marketing copy, except legal/privacy text which remains unchanged.
- [ ] All 7 pages share one navbar, footer, typography, colour tokens, button language, spacing, radius, and editorial rhythm.
- [ ] `index.html` is structurally redesigned: Hero → What ProManaged Is → Build/Source/Connect → How We Work → Founder/Story → Mission/Vision → Contact → Footer.
- [ ] Every page has 3–5 substantial editorial chapters with varied block scale; no page's primary story is an equal-card grid.
- [ ] Hero uses an oversized statement, dominant visual/content block, and supporting block; it is full-width within generous desktop gutters.
- [ ] Service language is consistent: **Build / Source / Connect**; software is the lead capability.
- [ ] Founder image is substantial; no small circular avatar treatment.
- [ ] Global positioning is clear; rewritten marketing copy does not headline exact countries/regions.
- [ ] `pages/custom_websites.html` contains zero visible prices, pricing tables, package amounts, “starting at” amounts, or price-led CTA copy.
- [ ] No obsolete eBay/RAWG/game/shopping/render references remain in active code or `.claude` docs.
- [ ] No dead script/stylesheet references remain; delete only assets proven unused.
- [ ] Contact, booking, SMTP, PHPMailer, honeypot, JS hooks, PHP endpoints, links, IDs and accessibility remain functional.
- [ ] Playwright reviews every page in a headed browser at the real available window size first; records actual dimensions and captures full-page screenshots. Then checks 768px and 375px.
- [ ] Zero console errors, horizontal overflow, broken internal links, broken CTAs, or broken forms.
- [ ] No `.yml`/`.yaml` files remain.
- [ ] Implementation is committed directly to `main` and pushed to `origin/main`.

## Public Pages
- `index.html`
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`

## Files to Change
### HTML
All 7 public pages above.

### Shared CSS
`css/tokens.css`, `css/global_styles.css`, `css/navbar.css`, `css/logo.css`, `css/footer_promanaged.css`, `css/hero_section.css`, `css/contact_section.css`.

### Page CSS
`css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`, `css/why_band.css`, `css/get-started.css`, `css/learn-more.css`, `css/custom_websites.css`, `css/hardware_sourcing.css`, `css/networking.css`.

### Cleanup / documentation
Current `js/*.js`, `css/*.css`, `php/*.php`, `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md`, and `.claude/agents/*.md` only where obsolete references or unused assets are proven.

## Exact Changes
### Copy system — all public pages
- Rewrite all marketing copy from first principles; do not merely swap synonyms.
- Voice: direct, calm, confident, human, technically credible, no hype.
- Lead with outcomes: clearer workflows, dependable delivery, better connectivity, practical technology decisions.
- Use global terms such as “wherever you work”, “across borders”, “remote”, “international sourcing”, and “local-friendly payment options”.
- Do not add country/city names to new marketing headlines or hero copy.
- Preserve only verified business facts; no invented clients, metrics, awards, projects, testimonials, or partnerships.

### `index.html`
- Rebuild the DOM around the exact chapter order: Hero → What ProManaged Is → Build/Source/Connect → How We Work → Founder/Story → Mission/Vision → Contact → Footer.
- Hero: one primary promise, one primary CTA, one dominant visual/content block, one supporting block; no three-card SaaS hero.
- Capabilities: use unequal editorial blocks for Build, Source, Connect; Build/software is visually dominant.
- How We Work: show a simple 3–4 step process using typography/numbering, not equal cards.
- Founder: `images/founder.png` as a large visual anchor with factual founder copy.
- Mission/Vision: unequal editorial blocks.
- Contact: strong closing invitation + existing contact form; preserve behavior.

### Secondary HTML pages
- `get-started.html`: guided intake around “bring us the problem”; preserve booking fields/actions/JS.
- `learn_more.html`: explain listening → planning → build/source/connect → support; preserve factual claims.
- `privacy_policy.html`: visual shell only; do not alter legal/privacy copy.
- `pages/custom_websites.html`: software/web apps/SaaS outcomes, process and CTA; remove all pricing UI/copy.
- `pages/hardware_sourcing.html`: guided sourcing, supplier coordination, delivery support, local-friendly payment options.
- `pages/network_infrastructure.html`: practical WiFi, internet, Starlink/fiber, cabling, security, monitoring and maintenance outcomes.

### Shared design system
- `css/tokens.css`: define the single palette, type, spacing, radius, shadow and layout source of truth. Palette = ivory/off-white, warm stone/sand/greige, charcoal, muted text, restrained earthy accent; blue only secondary interaction/identity. Define modern display face + Inter UI/body and fluid heading scale. Wide rail target ~1440–1560px with generous desktop gutters.
- `css/global_styles.css`: support full-bleed section backgrounds and wide inner rails; remove generic narrow-shell rules; constrain text measure separately.
- `css/navbar.css` + `css/logo.css`: one canonical navbar/header, identical across all 7 pages and breakpoints. Same dimensions, spacing, states, fixed-header offsets, and mobile menu behavior.
- `css/footer_promanaged.css`: one canonical footer, identical across all 7 pages. Same columns, spacing, typography, surface, links and contact hierarchy.
- `css/hero_section.css`: shared editorial hero grammar; page-specific content only. No narrow centered SaaS composition.
- `css/contact_section.css`: editorial contact styling only; do not alter form behavior.
- All page CSS: migrate existing selectors onto shared tokens and shared rhythm; avoid independent page design systems.

### Legacy cleanup
- Audit every HTML `<script src>` and stylesheet `<link>` against current tree and actual page usage.
- Search active code/docs for `ebay`, `rawg`, `game_price`, `game_reviews`, `game_search`, `shopping`, `render`, and abandoned server variants.
- Delete only files proven unused by all current public pages/runtime paths.
- Update `.claude` maps/docs to describe the actual current repository.
- Do not remove working form/mail/honeypot paths.

## Playwright QA — MANDATORY ONE-CYCLE GATE
### Desktop truth
1. Run a headed browser at the real available browser/window size. Do not use `page.setViewportSize()` for primary desktop review.
2. For each of the 7 public pages record: `window.innerWidth`, `window.innerHeight`, `document.documentElement.clientWidth`, `document.documentElement.scrollWidth`.
3. Capture full-page screenshots of every public page.
4. Inspect every screenshot for: full-width use, typography, chapter transitions, card clutter, navbar/footer uniformity, imagery, spacing, and obvious visual defects.

### Responsive verification
5. Only after real-window desktop review passes, run 768px and 375px emulation.
6. Check intentional collapse, mobile navigation, text wrapping, tap targets, images, forms and footer.

### Functional verification
7. Check internal links, CTAs, contact form, booking form, mobile menu, font loading, missing assets and console errors.
8. If any required browser check cannot be performed, report the exact limitation; never claim it passed.

## New Code Needed
```text
1. Establish shared tokens + canonical header/footer.
2. Rebuild index.html into semantic editorial chapters.
3. Apply the same chapter/block language to all secondary pages.
4. Rewrite all marketing copy from verified ProManaged facts.
5. Remove software pricing and proven-unused legacy assets/references.
6. Execute Playwright real-window QA for all 7 pages, then 768/375 checks.
7. Fix all failures before completion and push one finished implementation to origin/main.
```

## Constraints / Things NOT to Touch
- Do not copy K46 or any reference site's words, artwork, branding, people, biographies, source code, or exact layout.
- Do not invent business facts, clients, awards, metrics, projects, testimonials, or imagery.
- Do not add paid/external image dependencies; use existing repo assets and already-approved icon/CDN resources.
- Do not change PHP endpoints, form input `name` attributes, JS paths, accessibility attributes, or working behavior.
- Do not alter `privacy_policy.html` legal/privacy text.
- No hardcoded palette outside `css/tokens.css`.
- No gradients, parallax, looping backgrounds, gimmicky animation, excessive shadows or dashboard styling.
- No modal reintroduction.
- No sub-branches, PRs, detached work or force-pushes. `main` → `origin/main` only.
- Never commit `.yml`/`.yaml`; delete temporary YAML immediately and verify it is absent.

## Open Questions
None. Make design, layout and copy decisions autonomously within these explicit constraints.

## Known Trade-offs
- “Award-winning” is a quality target, not a claim that the site has won an award.
- Existing photography is limited; typography, composition, founder imagery, icons and restrained surfaces must carry the identity.
- Full-site consistency increases implementation scope, but it is a hard requirement.

## Phases
### Phase 1: Shared system + homepage
- Goal: build Signal & Systems tokens, typography, canonical header/footer, rewrite homepage copy, and structurally redesign `index.html`.
- Exit: homepage visibly establishes the new identity and shared shell.
- Files: `index.html` + shared CSS.

### Phase 2: Full-site rollout
- Goal: rewrite and redesign all six remaining public pages to the same system; remove software pricing.
- Exit: every page visually belongs to the same site and retains all functionality.
- Files: secondary HTML + page CSS.

### Phase 3: Cleanup + QA + delivery
- Goal: remove proven-unused legacy logic/docs and complete Playwright real-window + 768/375 verification for all 7 pages.
- Exit: all completion criteria pass; implementation committed to `main`, pushed to `origin/main`, and reported only as Changed / Blockers / Ready for review.
- Files: cleanup list + scoped fixes only.
