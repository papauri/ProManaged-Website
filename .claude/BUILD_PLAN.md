# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Execute one complete site-wide redesign and copy rewrite. Make ProManaged feel like a premium, human-led technology studio and practical technology partner for software/web apps, hardware sourcing, and network infrastructure. Use original editorial inspiration only; never copy a reference site's words, art, code, branding, or exact layout.

## Wants vs Needs
- **Want:** award-calibre visual polish, bold typography, editorial/bento rhythm, full copy rewrite, and a distinctive loading/scroll experience built around modular blocks.
- **Need:** visitors understand the three services quickly, trust the company, and know exactly how to start.
- **Audience:** global individuals, founders, families, small teams, and organisations. Position globally; do not introduce exact countries/regions in rewritten marketing copy. Preserve the meaning of international reach and local-friendly payment options.
- **Success Moment:** the page arrives as a composed set of building blocks, then reveals more blocks as the visitor scrolls; the whole site feels intentional, premium and distinctly ProManaged.

## Creative North Star — Signal & Systems
Editorial technology journal + engineering workshop. Use oversized type, large image/content blocks, full-width chapter backgrounds, asymmetric composition, warm ivory/stone/graphite surfaces, and restrained blue interaction accents. Minimal cards; no dashboard aesthetic. Use `images/founder.png` as the main human visual anchor.

### Signature Motion Concept — “Building Blocks”
The site should visually communicate **systems being assembled**.
- During initial page load, the first visible page composition should reveal as a small sequence of large rectangular/rounded blocks settling into place vertically, like architectural/building blocks assembling into the page.
- During scrolling, major editorial chapters should reveal/settle into place with the same block language: a large block can enter first, then supporting blocks follow with short staggered offsets. The effect should feel like **construction, assembly and connection**, not a generic fade-up animation.
- Motion must be subtle and premium: short durations, low travel distance, no bouncing, no continuous animation, no parallax, no spinning, no floating UI, and no distracting movement while reading.
- Prefer CSS transforms/opacity with existing JS only where a scroll observer is already appropriate. Do not add a heavy animation library.
- Respect `prefers-reduced-motion: reduce`: disable stagger/reveal motion and show all content immediately.
- Do not animate every tiny element. Animate **chapter-level blocks** and the initial hero composition only.
- No loading screen that hides the site for an arbitrary delay. Content should remain accessible and usable while the assembly effect runs.

## Typography Direction — Premium Modern System
Typography is a core brand asset, not a finishing touch. Use one distinctive, modern family consistently across the site, with enough range to handle display, navigation, body copy, forms, captions and metadata without looking like a default web template.

- **Primary family: Plus Jakarta Sans** for H1–H6, body copy, navigation, buttons, forms, labels, cards, metadata and footer. Use its variable weights deliberately rather than mixing several unrelated sans families. Plus Jakarta Sans is a contemporary geometric/humanist sans with variable weight and enough personality to feel more branded than Inter while remaining highly usable for UI and long-form text. citeturn647712search2turn647712search6
- **Optional display treatment:** use the same family at extreme weight/size with tight tracking for hero statements instead of introducing a second decorative font. The site should feel like one coherent typographic identity.
- **Prohibited unless explicitly justified in the plan:** Inter, Raleway, Montserrat, Space Grotesk, Arial, system UI stacks, or a second display family. Do not fall back to a mixed-font template.
- Use fluid display sizes (`clamp()`), clear weight hierarchy, and restrained letter-spacing. Avoid all-caps body copy and excessive tracking.
- Define tokens for `font-family`, display sizes, body sizes, weights, line-heights and tracking in `css/tokens.css`; every public page must consume those shared tokens.
- Load only the weights actually used and prefer one variable-font request where supported. Keep `font-display: swap` and verify the final computed font in Playwright.
- If the chosen webfont cannot load, fail loudly in QA rather than silently falling back to an old font stack.
- Typography acceptance: headings must look noticeably more distinctive and contemporary than the current Inter-based design, while body/forms remain highly readable and trustworthy. The overall impression should be premium, calm and confident rather than playful or juvenile.

## Reference Systems
- K46 — take: human opening, direct positioning, capability-led storytelling, contact-forward rhythm — avoid copying content/layout.
- Mockuuups Bento 07 — take: varied block proportions and broad visual compartments — avoid a wall of equal cards.
- Premium editorial/technology sites — take: typography as navigation, strong pacing, large imagery, restrained motion — avoid spectacle without purpose.
- Linear — take: precision and polish — avoid abstract SaaS jargon.

## Completion Criteria (Definition of Done)
- [ ] All 7 public HTML pages have fully rewritten original marketing copy, except legal/privacy text which remains unchanged.
- [ ] All 7 pages share one navbar, footer, typography, colour tokens, button language, spacing, radius, and editorial rhythm.
- [ ] All 7 pages use **Plus Jakarta Sans consistently** for display, body, UI and supporting text; no page falls back to Inter as its intended font.
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
- [ ] **Building-block loading animation exists:** the initial visible composition assembles from a small number of large blocks; no arbitrary delay; accessible immediately; reduced-motion supported.
- [ ] **Building-block scroll reveals exist:** major editorial chapters reveal as block groups with short stagger, consistent with the loading language; no element-by-element animation spam.
- [ ] Playwright reviews every page in a headed browser at the real available window size first; records actual dimensions and captures full-page screenshots. Then checks 768px and 375px.
- [ ] Playwright verifies initial-load motion and at least two scroll-triggered chapter transitions on representative pages; visual QA confirms motion is subtle and does not obscure content.
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

### Motion / interaction
- Use the existing shared JS entry points where a scroll observer already exists; otherwise a small shared motion helper may be added only if necessary.
- Do not add a new animation framework/library.

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
- Add page-level motion hooks only to major chapter wrappers and the hero block group so the building-block reveal can be applied consistently.

### Secondary HTML pages
- `get-started.html`: guided intake around “bring us the problem”; preserve booking fields/actions/JS.
- `learn_more.html`: explain listening → planning → build/source/connect → support; preserve factual claims.
- `privacy_policy.html`: visual shell only; do not alter legal/privacy copy.
- `pages/custom_websites.html`: software/web apps/SaaS outcomes, process and CTA; remove all pricing UI/copy.
- `pages/hardware_sourcing.html`: guided sourcing, supplier coordination, delivery support, local-friendly payment options.
- `pages/network_infrastructure.html`: practical WiFi, internet, Starlink/fiber, cabling, security, monitoring and maintenance outcomes.
- Add the same chapter-level motion hooks where page structure contains major editorial sections; do not animate legal/privacy paragraphs individually.

### Shared design system
- `css/tokens.css`: define the single palette, type, spacing, radius, shadow and layout source of truth. Palette = ivory/off-white, warm stone/sand/greige, charcoal, muted text, restrained earthy accent; blue only secondary interaction/identity. Define Plus Jakarta Sans as the single type family, display/body/UI sizes, weights, line-heights and tracking. Wide rail target ~1440–1560px with generous desktop gutters. Add motion tokens for short duration and stagger gap.
- `css/global_styles.css`: support full-bleed section backgrounds and wide inner rails; remove generic narrow-shell rules; constrain text measure separately. Add shared block-reveal states/classes and `prefers-reduced-motion` fallback.
- `css/navbar.css` + `css/logo.css`: one canonical navbar/header, identical across all 7 pages and breakpoints. Same dimensions, spacing, states, fixed-header offsets, and mobile menu behavior.
- `css/footer_promanaged.css`: one canonical footer, identical across all 7 pages. Same columns, spacing, typography, surface, links and contact hierarchy.
- `css/hero_section.css`: shared editorial hero grammar and initial block-assembly choreography; page-specific content only.
- `css/contact_section.css`: editorial contact styling only; do not alter form behavior.
- All page CSS: migrate existing selectors onto shared tokens and shared rhythm; use the same chapter/block reveal classes; avoid independent page design systems.
- All 7 HTML `<head>` sections: use one consistent font-loading strategy for Plus Jakarta Sans; remove stale Inter/other font requests and verify identical font loading across pages.

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
4. Inspect every screenshot for: full-width use, typography, chapter transitions, block composition, card clutter, navbar/footer uniformity, imagery, spacing, and obvious visual defects.
5. On at least one full reload of `index.html`, visually confirm the initial building-block assembly completes without hiding content or causing layout jump.
6. Verify computed font-family on `body`, `h1`, `h2`, `.nav-link`, buttons, form controls and footer text is Plus Jakarta Sans (or its intended variable-font computed family) with no stale Inter rule winning.

### Responsive verification
7. Only after real-window desktop review passes, run 768px and 375px emulation.
8. Check intentional collapse, mobile navigation, text wrapping, tap targets, images, forms and footer.
9. Confirm `prefers-reduced-motion` removes the block movement while content remains immediately visible.

### Functional verification
10. Check internal links, CTAs, contact form, booking form, mobile menu, font loading, missing assets and console errors.
11. Scroll through `index.html` and at least one secondary service page to confirm two or more block-level scroll reveals occur without obscuring text or controls.
12. If any required browser check cannot be performed, report the exact limitation; never claim it passed.

## New Code Needed
```text
1. Establish shared tokens + canonical header/footer + Plus Jakarta Sans typography.
2. Rebuild index.html into semantic editorial chapters.
3. Apply the same chapter/block language to all secondary pages.
4. Rewrite all marketing copy from verified ProManaged facts.
5. Add one small shared block-reveal system for initial load and major chapter scroll reveals.
6. Respect reduced-motion and keep all content immediately accessible.
7. Remove software pricing and proven-unused legacy assets/references.
8. Execute Playwright real-window QA for all 7 pages, then 768/375 checks.
9. Fix all failures before completion and push one finished implementation to origin/main.
```

## Constraints / Things NOT to Touch
- Do not copy K46 or any reference site's words, artwork, branding, people, biographies, source code, or exact layout.
- Do not invent business facts, clients, awards, metrics, projects, testimonials, or imagery.
- Do not add paid/external image dependencies; use existing repo assets and already-approved icon/CDN resources.
- Do not change PHP endpoints, form input `name` attributes, JS paths, accessibility attributes, or working behavior.
- Do not alter `privacy_policy.html` legal/privacy text.
- No hardcoded palette outside `css/tokens.css`.
- No gradients, parallax, looping backgrounds, gimmicky animation, excessive shadows or dashboard styling.
- Loading/scroll motion must be short, block-level, and non-blocking; no artificial splash screen or fixed delay.
- No new animation framework/library.
- No modal reintroduction.
- No sub-branches, PRs, detached work or force-pushes. `main` → `origin/main` only.
- Never commit `.yml`/`.yaml`; delete temporary YAML immediately and verify it is absent.

## Open Questions
None. Make design, layout, motion and copy decisions autonomously within these explicit constraints.

## Known Trade-offs
- “Award-winning” is a quality target, not a claim that the site has won an award.
- Existing photography is limited; typography, composition, founder imagery, icons and restrained surfaces must carry the identity.
- Full-site consistency increases implementation scope, but it is a hard requirement.
- Building-block motion adds a small amount of JS/CSS complexity, but the effect is part of the brand signature and must remain lightweight.

## Phases
### Phase 1: Shared system + homepage
- Goal: build Signal & Systems tokens, typography, canonical header/footer, rewrite homepage copy, structurally redesign `index.html`, and add the shared building-block motion system.
- Exit: homepage visibly establishes the new identity, loads/reveals smoothly, and content remains accessible.
- Files: `index.html` + shared CSS + smallest required shared JS change.

### Phase 2: Full-site rollout
- Goal: rewrite and redesign all six remaining public pages to the same system; add major-chapter block reveal hooks; remove software pricing.
- Exit: every page visually belongs to the same site and retains all functionality.
- Files: secondary HTML + page CSS.

### Phase 3: Cleanup + QA + delivery
- Goal: remove proven-unused legacy logic/docs and complete Playwright real-window + 768/375 verification for all 7 pages, including loading/scroll motion and typography.
- Exit: all completion criteria pass; implementation committed to `main`, pushed to `origin/main`, and reported only as Changed / Blockers / Ready for review.
- Files: cleanup list + scoped fixes only.
