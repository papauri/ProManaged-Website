# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Execute one complete site-wide redesign and copy rewrite. Make ProManaged feel like a premium, human-led technology studio and practical technology partner for software/web apps, hardware sourcing, and network infrastructure. Use original editorial inspiration only; never copy a reference site's words, art, code, branding, or exact layout.

## Creative North Star
**Signal & Systems** — an editorial technology journal + engineering workshop. Oversized typography, large content/visual blocks, full-width chapter backgrounds, asymmetric composition, warm ivory/stone/graphite surfaces, restrained blue accents, and modular interactions.

### Signature Motion — “Building Blocks”
- Initial load: 3–5 large hero blocks assemble vertically with short staggered settle-in motion.
- Scroll: major chapters reveal as block groups, not element-by-element fade spam.
- Use short CSS transform/opacity transitions; no bounce, parallax, loops, spinning or splash screen.
- Respect `prefers-reduced-motion`; content is immediately visible.

## Navigation Direction — “Bento Control Panel”
The traditional horizontal corporate navbar is **removed completely**. Do not preserve the current nav appearance.

Research-inspired direction: modern tile-based navigation patterns can make the logo itself the navigation trigger, with modular tile destinations replacing a conventional link bar. This is inspired by current bento/editorial navigation work and a documented award-winning tile navigation example; the ProManaged implementation must be original. citeturn542435search12turn542435search0turn542435search5

Implement an original ProManaged version:
- The hero owns the top of the page; there is **no fixed traditional navbar strip**.
- A floating/embedded **ProManaged logo tile** is always visible in the upper visual composition. This is the navigation trigger and brand anchor.
- Clicking/tapping the logo tile opens a **full-viewport bento navigation panel** made from large destination blocks, not a dropdown list.
- Navigation blocks: Home, Start a Project, Learn More, Software & Web Apps, Hardware Sourcing, Network Infrastructure, Contact.
- Each block has a clear label, concise descriptor or icon, and obvious hover/focus state.
- One block is visually primary (recommended: Start a Project / Contact); service blocks are differentiated by size.
- Open/close motion uses the same block assembly/disassembly language as page loading.
- Escape closes the panel; close control closes it; keyboard focus is trapped while open and restored to the logo trigger when closed.
- Mobile uses the same full-screen bento panel, not a conventional hamburger drawer.
- The visible logo remains clear when closed; do not hide the company identity behind a menu icon.
- Preserve all existing navigation destinations semantically; restructure markup/JS only as required for this interaction.

## Typography Direction
- **Primary family: Plus Jakarta Sans** across H1–H6, body, nav, buttons, forms, labels, captions and footer.
- Use variable weights deliberately; fluid `clamp()` display sizes; restrained tracking; no all-caps body copy.
- Remove stale Inter/other intended font usage and use one consistent font-loading strategy across all 7 pages.
- Verify computed font-family in Playwright on body, headings, nav blocks, buttons, form controls and footer.

## Wants vs Needs
- Want: award-calibre visual polish, bold typography, editorial/bento rhythm, complete copy rewrite, distinctive loading/scroll/nav experience.
- Need: visitors understand Build / Source / Connect quickly, trust the company, and know exactly how to start.
- Audience: global individuals, founders, families, teams and organisations. Do not introduce exact countries/regions in rewritten marketing copy; preserve international reach and local-friendly payment meaning.
- Success Moment: any page feels unmistakably ProManaged, with a clear next action.

## Reference Systems
- K46 — take: human opening, direct positioning, capability-led storytelling, contact-forward rhythm — avoid copying content/layout.
- Mockuuups Bento 07 — take: varied block proportions and broad visual compartments — avoid equal-card walls.
- Push/modern tile-navigation work — take: logo-triggered navigation and modular tile exploration — avoid exact layout/content. citeturn542435search12
- Premium editorial/technology sites — take: typography as navigation, strong pacing, large imagery, restrained motion — avoid spectacle without purpose.
- Linear — take: precision and polish — avoid abstract SaaS jargon.

## Completion Criteria (Definition of Done)
- [ ] All 7 public HTML pages have fully rewritten original marketing copy, except legal/privacy text which remains unchanged.
- [ ] All 7 pages share one visual system, typography, footer, colour tokens, spacing, radius, button language and editorial rhythm.
- [ ] Traditional horizontal navbar is removed; all pages use the same bento hero navigation interaction.
- [ ] Company logo is visibly displayed in the hero/top composition on every page and is the navigation trigger.
- [ ] Full-screen bento navigation panel works on desktop and mobile with keyboard/focus accessibility.
- [ ] `index.html` is structurally redesigned: Hero → What ProManaged Is → Build/Source/Connect → How We Work → Founder/Story → Mission/Vision → Contact → Footer.
- [ ] Every page has 3–5 substantial editorial chapters with varied block scale; no primary story is an equal-card grid.
- [ ] Hero is full-width within generous desktop gutters and uses an oversized statement + dominant visual/content block + supporting block.
- [ ] Service language is consistent: Build / Source / Connect; software is the lead capability.
- [ ] Founder image is substantial; no small circular avatar treatment.
- [ ] Global positioning is clear; rewritten marketing copy does not headline exact countries/regions.
- [ ] `pages/custom_websites.html` contains zero visible prices, pricing tables, package amounts, “starting at” amounts, or price-led CTA copy.
- [ ] No obsolete eBay/RAWG/game/shopping/render references remain in active code or `.claude` docs.
- [ ] No dead script/stylesheet references remain; delete only assets proven unused.
- [ ] Contact, booking, SMTP, PHPMailer, honeypot, JS hooks, PHP endpoints, links, IDs and accessibility remain functional.
- [ ] Building-block load animation and scroll reveals exist, are subtle, non-blocking, and reduced-motion safe.
- [ ] Playwright reviews every page in a headed browser at the real available window size first; records dimensions and captures full-page screenshots. Then checks 768px and 375px.
- [ ] Playwright verifies navigation open/close, focus trap, Escape, mobile navigation, initial block assembly and at least two scroll-triggered chapter transitions.
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

### JS
Use existing navbar/mobile scripts where possible. If current behavior cannot support the new logo-triggered panel, make the smallest shared JS change required. No animation framework.

### Cleanup / documentation
Current `js/*.js`, `css/*.css`, `php/*.php`, `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md`, `.claude/agents/*.md` only where obsolete references or unused assets are proven.

## Exact Changes
### All 7 HTML pages
- Replace old horizontal nav presentation with the shared logo-triggered bento navigation control.
- Use identical navigation destinations and semantics across pages.
- Display the ProManaged logo visibly in the hero/top composition.
- Apply the new page-wide copy voice and editorial chapter language.

### `index.html`
- Rebuild DOM around: Hero → What ProManaged Is → Build/Source/Connect → How We Work → Founder/Story → Mission/Vision → Contact → Footer.
- Hero: one primary promise, one primary CTA, dominant visual/content block, supporting block; no three-card SaaS hero.
- Capabilities: unequal editorial blocks; Build/software is visually dominant.
- Founder: `images/founder.png` as large visual anchor.
- Contact: strong closing invitation + existing contact form.

### Secondary pages
- `get-started.html`: guided intake around “bring us the problem”; preserve booking fields/actions/JS.
- `learn_more.html`: explain listening → planning → build/source/connect → support; preserve factual claims.
- `privacy_policy.html`: visual shell only; do not alter legal/privacy copy.
- `pages/custom_websites.html`: software/web apps/SaaS outcomes; remove all pricing UI/copy.
- `pages/hardware_sourcing.html`: guided sourcing, supplier coordination, delivery support, local-friendly payment options.
- `pages/network_infrastructure.html`: practical WiFi, internet, Starlink/fiber, cabling, security, monitoring and maintenance outcomes.

### Shared design system
- `css/tokens.css`: single palette/type/spacing/radius/shadow/layout source of truth. Palette = ivory/off-white, warm stone/sand/greige, charcoal, muted text, restrained earthy accent; blue only secondary interaction/identity. Use Plus Jakarta Sans for every text role. Wide rail target ~1440–1560px. Add motion tokens.
- `css/global_styles.css`: full-bleed sections + wide inner rails; shared block-reveal and reduced-motion states.
- `css/navbar.css`: **new logo-triggered bento navigation system**, no traditional horizontal nav strip. Define trigger tile, full-screen panel, destination blocks, open/close states, desktop/mobile layout, focus-visible states, accessibility-safe z-index and scroll locking.
- `css/logo.css`: canonical logo tile sizing and placement across desktop/tablet/mobile.
- `css/hero_section.css`: shared hero grammar + hero/nav composition + initial block-assembly choreography.
- `css/footer_promanaged.css`: canonical footer identical on every page.
- `css/contact_section.css`: editorial contact styling only; do not change form behavior.
- All page CSS: shared tokens/rhythm and shared block reveals; no independent page design systems.

### Navigation interaction requirements
- Closed state: logo tile visible; no conventional nav row.
- Open state: full-viewport overlay/panel with 6–7 bento destinations.
- Destination blocks use varied spans/sizes and a clear primary CTA block.
- Open/close uses the same block assembly language as page loading.
- `aria-expanded`, `aria-controls`, focus management, Escape handling and keyboard traversal are mandatory.
- Prevent background scroll while open.
- Restore focus to the logo trigger after closing.
- Mobile: same bento concept in one-column/two-column responsive composition; never revert to a tiny hamburger list.

### Legacy cleanup
- Audit every HTML script/style reference against current tree and actual usage.
- Search active code/docs for `ebay`, `rawg`, `game_price`, `game_reviews`, `game_search`, `shopping`, `render`, abandoned server variants.
- Delete only files proven unused by all current public pages/runtime paths.
- Do not remove working form/mail/honeypot paths.

## Playwright QA — MANDATORY ONE-CYCLE GATE
### Desktop truth
1. Run headed browser at the real available window size. Do not use `page.setViewportSize()` for primary desktop review.
2. Record `window.innerWidth`, `window.innerHeight`, `document.documentElement.clientWidth`, `document.documentElement.scrollWidth` for every page.
3. Capture full-page screenshots of every public page.
4. Review visual consistency, full-width composition, typography, logo visibility, nav affordance, bento panel, chapter transitions, footer, and obvious defects.
5. On full reload, confirm block loading completes without hiding content or causing layout jump.
6. Verify computed Plus Jakarta Sans on body, headings, nav blocks, buttons, form controls and footer text.

### Responsive verification
7. Only after desktop real-window review passes, run 768px and 375px emulation.
8. Verify the bento navigation remains usable, focused, and readable at both sizes; no overflow.
9. Verify `prefers-reduced-motion` removes movement while leaving all content and nav available immediately.

### Functional verification
10. Check nav open/close, Escape, focus trap, focus restore, mobile navigation, internal links, CTAs, contact form, booking form, fonts, missing assets and console errors.
11. Scroll index and at least one service page to confirm two or more block-level scroll reveals.
12. If any required browser check cannot be performed, report the exact limitation; never claim it passed.

## New Code Needed
```text
1. Establish shared tokens + Plus Jakarta Sans + canonical footer.
2. Replace traditional navbar with one shared logo-triggered bento navigation component.
3. Rebuild index.html into semantic editorial chapters.
4. Apply the same chapter/block language to all secondary pages.
5. Rewrite marketing copy from verified ProManaged facts.
6. Add one lightweight shared block-reveal system for load + scroll.
7. Remove software pricing and proven-unused legacy assets/references.
8. Execute Playwright real-window QA for all 7 pages, then 768/375 checks.
9. Fix all failures before completion and push one finished implementation to origin/main.
```

## Constraints / Things NOT to Touch
- Do not copy reference-site words, artwork, branding, people, biographies, source code, or exact layout.
- Do not invent business facts, clients, awards, metrics, projects, testimonials, or imagery.
- Do not add paid/external image dependencies; use existing repo assets and already-approved icon/CDN resources.
- Do not change PHP endpoints, form input `name` attributes, JS paths, accessibility attributes, or working behavior.
- Do not alter `privacy_policy.html` legal/privacy text.
- No hardcoded palette outside `css/tokens.css`.
- No gradients, parallax, looping backgrounds, gimmicky animation, excessive shadows or dashboard styling.
- Loading/nav motion must be short, block-level, and non-blocking; no artificial splash screen or fixed delay.
- No new animation framework/library.
- No modal reintroduction.
- No sub-branches, PRs, detached work or force-pushes. `main` → `origin/main` only.
- Never commit `.yml`/`.yaml`; delete temporary YAML immediately and verify it is absent.

## Open Questions
None. Make design, layout, navigation, motion and copy decisions autonomously within these explicit constraints.

## Known Trade-offs
- “Award-winning” is a quality target, not a claim that the site has won an award.
- Existing photography is limited; typography, composition, founder imagery, icons and restrained surfaces must carry the identity.
- Full-site consistency increases scope but is a hard requirement.
- Logo-triggered bento navigation is more distinctive than a standard navbar but must remain obvious and accessible; usability beats novelty.

## Phases
### Phase 1: Shared system + homepage
- Goal: build Signal & Systems tokens, Plus Jakarta Sans, canonical footer, logo-triggered bento navigation, homepage copy and structural redesign, and building-block motion.
- Exit: homepage visibly establishes the new identity; nav opens/closes correctly and content remains accessible.
- Files: `index.html` + shared CSS + smallest required shared JS change.

### Phase 2: Full-site rollout
- Goal: redesign all six remaining public pages to the same system; add shared nav and chapter reveals; remove software pricing.
- Exit: every page visually belongs to the same site and retains all functionality.
- Files: secondary HTML + page CSS.

### Phase 3: Cleanup + QA + delivery
- Goal: remove proven-unused legacy logic/docs and complete Playwright real-window + 768/375 verification for all 7 pages, including navigation and motion.
- Exit: all completion criteria pass; implementation committed to `main`, pushed to `origin/main`, and reported only as Changed / Blockers / Ready for review.
- Files: cleanup list + scoped fixes only.
