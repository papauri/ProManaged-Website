# Build Plan: ProManaged IT — K46-Inspired Editorial Landing Page + Cleanup

> ACTIVE TASK. Previous bento/type attempts are superseded. Do not repeat them.
> **OWNER DIRECTIVE:** Rebuild the landing page around the visual language of the supplied K46 Medienkollektiv reference: https://k46team.webflow.io/ . Do not literally copy its text, artwork, branding, or proprietary assets. Recreate its composition principles using ProManaged IT content and assets.
> **PRIMARY TARGET:** `index.html` landing page. Secondary pages are not redesign targets in this pass.
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Delete temporary YAML immediately and verify it is absent.

## Goal
Replace the current corporate/card-stack homepage with a bold editorial landing page inspired by K46: a personal/direct opening statement, oversized typography, large image-led blocks, asymmetrical composition, capability-led storytelling, and a strong contact section. Adapt that structure to ProManaged IT: software/web apps, hardware sourcing, network infrastructure, and founder-led trust. Remove stale legacy logic and remove software pricing.

## Wants vs Needs
- **Want:** a homepage that feels like a modern creative/technology studio rather than a conventional IT services template.
- **Need:** strong composition and storytelling, not another grid-token exercise.
- **End user:** prospective clients who should understand what ProManaged does, see the person/company behind it, and reach contact quickly.
- **Friction today:** centered wrappers, repetitive cards, blue-heavy UI, and too much “service catalogue” presentation.

## Success Moment
At 1280px the landing page opens with a huge direct headline, a strong visual composition, then moves through large editorial chapters with images/blocks and a clear contact invitation. It should feel closer to the supplied K46 reference than to the current ProManaged homepage.

## Reference Systems
- **K46 Medienkollektiv** — take: direct human opening, oversized typography, “not a traditional agency” positioning, capability list, image-led team/people story, repeated contact invitation, and a collage-like visual rhythm. Avoid copying German copy, member names, logos, artwork, or exact layouts. citeturn530581view0
- **Mockuuups Bento 07** — take: unequal visual blocks and broad compartments. Avoid turning the page into a wall of cards.
- **Apple/editorial studio sites** — take: strong typography and generous negative space. Avoid product-marketing mimicry.

## Completion Criteria (Definition of Done)
- [ ] `index.html` is structurally redesigned, not merely restyled.
- [ ] The hero is effectively full-width and starts with an oversized direct statement, not a centered marketing headline + three small cards.
- [ ] Hero has one major visual area using the existing founder image and/or existing iconography, with supporting content integrated into the composition.
- [ ] The landing page uses an editorial story order: Hero → What ProManaged Is → Capabilities → Founder/Story → Mission/Vision → Contact → Footer.
- [ ] At least 4 chapters use visibly different block proportions, spacing, and surface treatments; scrolling feels like moving through large designed panels.
- [ ] Capabilities are presented as typography-led editorial blocks, not equal service cards.
- [ ] Founder section is image-led and substantial; no small circular portrait beside a centered card.
- [ ] Contact is visually prominent and repeated as a deliberate editorial CTA, matching the direct/contact-forward feel of the reference.
- [ ] Typography is modern and oversized for major headings; Inter remains body/UI.
- [ ] Palette is modern warm-neutral/Japandi: ivory/off-white, warm stone, sand/greige, muted charcoal, and one restrained earthy accent. Blue is secondary identity/interaction only, never the dominant page background.
- [ ] Backgrounds are mostly static; no looping background animation, parallax, or gimmicky motion.
- [ ] No excessive nested cards, shadows, or “dashboard” UI.
- [ ] `pages/custom_websites.html` contains no visible prices, pricing tables, package amounts, or pricing-led CTA copy.
- [ ] No obsolete eBay/RAWG/game-price/game-review/shopping/render references remain in active code or `.claude` docs.
- [ ] No dead script/stylesheet references remain; unused assets proven unnecessary are deleted.
- [ ] Contact, booking, SMTP, and honeypot functionality remains intact.
- [ ] Browser verified at 1280px first, then 768px and 375px; zero console errors and zero horizontal overflow.
- [ ] No `.yml`/`.yaml` files remain.
- [ ] Final implementation is committed to `main` and pushed to `origin/main`.

## Files to Change
### Landing page
- `index.html`
- `css/tokens.css`
- `css/global_styles.css`
- `css/hero_section.css`
- `css/service_cards.css`
- `css/why_band.css`
- `css/about_section.css`
- `css/mission_vision.css`
- `css/contact_section.css`
- `css/footer_promanaged.css`

### Software pricing removal
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
- Change: remove the current repeated section/card composition and rebuild the page around large editorial chapters. Add semantic wrappers/classes as needed.
- Required chapter order:
  1. **Hero / personal opening** — large statement and visual.
  2. **What ProManaged Is** — concise company statement and positioning.
  3. **Capabilities** — software/web apps, hardware sourcing, network infrastructure presented as large editorial blocks with varied type sizes, not equal cards.
  4. **Founder / Story** — John-Paul Chirwa + existing founder image as a primary visual anchor.
  5. **Mission / Vision** — combined editorial block with unequal weights.
  6. **Contact / CTA** — direct, prominent enquiry invitation and existing contact form.
  7. **Footer**.
- Required content direction: rewrite existing copy into direct, confident, human language for ProManaged; preserve factual claims already present in the repo; do not fabricate clients, metrics, projects, or awards.
- Required hero direction: use a statement-style headline inspired by K46's direct introduction format, adapted to ProManaged. Example meaning, not mandatory copy: “ProManaged IT builds practical software, sources the technology you need, and connects people to better infrastructure.”
- Required interaction: contact CTA should be obvious from the first screen and should scroll to the real contact section/form; do not reintroduce modal contact flows.
- Reason: the existing DOM is the main reason previous CSS-only redesigns looked unchanged.

### `css/tokens.css`
- Section: colour/layout/type.
- Change: establish the new warm-neutral visual system and wide editorial canvas. Use tokens for ivory/off-white background, warm stone, sand/greige, charcoal, muted text, white surfaces, and one restrained earthy accent. Keep blue only as a secondary brand/interactive token.
- Typography: modern display face for H1/H2; Inter for body/UI; large fluid display sizes.
- Layout: wide inner rail around 1440–1560px with 32–64px desktop gutters; avoid a single narrow max-width wrapper for the entire story.

### `css/global_styles.css`
- Section: page canvas, containers, headings.
- Change: create full-bleed section support and wide inner rails. Global heading defaults should support oversized editorial type without forcing every section into a centered block.

### `css/hero_section.css`
- Section: hero.
- Change: use an immersive, full-width opening with a huge headline, short supporting statement, CTA, and a large visual panel. Use the founder image and/or brand mark intentionally. The hero should feel like an editorial cover, not a two-column SaaS template.
- Responsive: retain the visual hierarchy at 768/375px; do not shrink everything into tiny cards.

### `css/service_cards.css`
- Section: services/capabilities.
- Change: replace equal card grid with three editorial capability blocks of different visual weights. Lead software/web-app block should dominate; hardware sourcing and networking support at different scales. Use typography, spacing, icon/image anchors, and block background differences instead of card chrome.

### `css/why_band.css`
- Section: positioning/proof.
- Change: convert to a wide statement-led chapter with a large phrase and one supporting content area. Do not make another card row.

### `css/about_section.css`
- Section: founder/story.
- Change: make founder image large and visually dominant; pair with editorial copy and a concise founder statement. No circle crop, no small avatar card.

### `css/mission_vision.css`
- Section: mission/vision.
- Change: use unequal text blocks or one large statement + smaller counterpart, with warm-neutral surfaces and typography carrying the hierarchy.

### `css/contact_section.css`
- Section: contact.
- Change: make contact feel like a major closing chapter: oversized invitation, supporting text, and the existing form. Keep form functionality exactly intact.

### `css/footer_promanaged.css`
- Section: footer.
- Change: use a wide calm footer with strong spacing and editorial hierarchy, not a generic boxed light-grey footer.

### `pages/custom_websites.html` + `css/custom_websites.css`
- Section: software/web-app service/pricing.
- Change: remove every visible price, currency amount, pricing table, package price, “starting at” amount, and price-led CTA copy. Preserve the service story, capabilities, proof/context that is factual, and enquiry CTA.

### Cleanup audit
- Audit every current `<script src>` and stylesheet link against the current tree.
- Search active code/docs for `ebay`, `rawg`, `game_price`, `game_reviews`, `game_search`, `shopping`, `render`, and abandoned server variants.
- Delete only files proven unused by current pages/runtime. Do not delete working form or mail paths.
- Update `.claude` maps/docs after cleanup so they describe the current repository.

## New Code Needed
Pseudocode only:
1. Replace the existing homepage section DOM with large semantic editorial chapters.
2. Use one wide visual rail plus full-bleed backgrounds; no single narrow wrapper around the entire page.
3. Use founder image + typography + icons as visual anchors instead of equal cards.
4. Make capability sections unequal and type-led.
5. Make contact a major closing chapter.
6. Remove obsolete runtime paths and software pricing.
7. Verify at 1280 first, then 768/375.

## Constraints / Things NOT to Touch
- Do not literally copy K46 text, images, names, branding, or proprietary artwork.
- Do not invent business facts, clients, metrics, projects, awards, or imagery.
- Do not remove working contact/booking/SMTP/honeypot functionality.
- No dark theme. Warm charcoal may be used as a chapter surface but not as a site-wide dark mode.
- No decorative gradients, looping background animations, parallax, or gimmicky motion.
- No excessive shadows or floating-card effects.
- No modal reintroduction.
- `origin/main` only.
- Never commit YAML.
- Secondary pages are not redesign targets except `pages/custom_websites.html` pricing removal.

## Known Trade-offs
- Secondary pages may remain visually behind the landing page until a later rollout.
- Limited imagery means typography, layout, founder photography and iconography must carry the design.

## Open Questions
None. Implement decisively from the K46 composition principles adapted to ProManaged IT.

## Phases
### Phase 1: Landing-page redesign
- Goal: rebuild `index.html` and its homepage CSS around K46-inspired editorial storytelling.
- Exit: at 1280px the homepage feels like a new creative/technology studio site, not the current IT card stack.
- Files: landing page list.

### Phase 2: Software pricing removal + legacy cleanup
- Goal: remove pricing and obsolete runtime/docs without breaking active functionality.
- Exit: no prices and no dead/legacy references.
- Files: pricing + cleanup lists.

### Phase 3: Verification
- Goal: browser-test 1280/768/375, console, overflow, font loading, links and forms.
- Exit: all Completion Criteria pass; commit pushed to `origin/main`.
- Files: fixes only from scoped lists.
