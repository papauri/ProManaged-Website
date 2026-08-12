# Build Plan: ProManaged IT — Concrete Bento 07 Landing Page Redesign + Cleanup

> ACTIVE TASK. Previous bento/type attempts are superseded. Do not repeat them.
> **OWNER DIRECTIVE:** The landing page (`index.html`) is the product. Implement a real visual redesign, not token/grid tuning. Use the supplied Bento 07 image as the primary composition reference: https://assets.mockuuups.com/mo/image/upload/c_limit%2Cw_680/v1708508072/bento-07_wd3t7l
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Delete temporary YAML immediately and verify it is absent.

## Goal
Turn `index.html` into a premium editorial/bento landing page that visibly resembles the supplied Bento 07 design language: full-width chapters, large asymmetric blocks, strong type, warm-neutral/Japandi colour, minimal nested cards, and clear visual rhythm while scrolling. Remove obsolete application logic/references at the same time. Remove all pricing from the software/web-app page.

## Wants vs Needs
- **Want:** a landing page that looks designed like the reference, not a centered corporate template.
- **Need:** full-width composition, large block transitions, warm-neutral surfaces, strong typography, fewer small cards, and a decisive first-screen transformation.
- **Success Moment:** At 1280px, the hero fills the viewport width, the first 2–3 sections read as connected bento chapters, and the page no longer looks blue-on-white or boxed into the middle.

## Reference Systems
- **Mockuuups Bento 07** — take: asymmetric collage, dominant blocks, broad visual areas, varied heights, generous negative space, strong hierarchy. Do not copy artwork.
- **Apple editorial/product pages** — take: full-width storytelling and strong section hierarchy. Avoid imagery we do not own.
- **Japandi/editorial web layouts** — take: ivory, sand, warm stone, muted charcoal, restrained earthy accent, calm whitespace. Avoid beige overload or decorative clutter.

## Completion Criteria (Definition of Done)
- [ ] `index.html` is structurally changed where needed; CSS-only restyling is insufficient and not accepted.
- [ ] Hero is effectively full viewport width at desktop, with no single narrow centered shell controlling the whole composition.
- [ ] Hero uses one dominant text block, one dominant visual/content block, and at least one smaller supporting block; no stack of equal cards.
- [ ] At least 4 homepage chapters use different block proportions and background surfaces; scrolling feels like moving through bento chapters.
- [ ] Services section uses one dominant block + two differently weighted supporting blocks; no equal-card row.
- [ ] About uses the existing founder image as a large visual anchor, not a small circular portrait beside a centered card.
- [ ] Mission/Vision use unequal visual weight and warm-neutral surfaces; no blue card pair.
- [ ] Major section backgrounds change deliberately between chapters using ivory / warm stone / sand / muted charcoal as appropriate; transitions are static and subtle.
- [ ] Blue is an accent, not the dominant page background.
- [ ] No decorative gradients, looping background animation, parallax, or gimmicky motion.
- [ ] No excessive nested rounded cards; large blocks may use restrained radius, but the page must still read as a composition.
- [ ] Modern display font + Inter body/UI, with clearly visible scale/weight contrast.
- [ ] `pages/custom_websites.html` contains zero visible prices, price tables, package amounts, or pricing-led UI/copy.
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
### `index.html`
- Section: homepage DOM.
- Change: restructure hero + major content wrappers so each chapter can span the viewport width and contain asymmetric blocks. Preserve existing real copy, links, IDs, forms, accessibility hooks, and CTA targets. You may add semantic wrappers/classes required for the composition.
- Required chapter order: Hero → Services → Why/Proof → About → Mission/Vision → Contact → Footer.
- Required rule: do not keep a single `.container` wrapping the entire page story.
- Reason: the old DOM is preventing a true editorial composition.

### `css/tokens.css`
- Section: colour/layout/type.
- Change: use a wide canvas token around 1440–1560px, generous gutters, soft ivory/off-white base, warm stone and sand surfaces, muted charcoal text, one subdued earthy accent, and one blue identity token only for required brand/interactive states. Define display type + fluid heading scale.
- Required visual palette direction: ivory `#F6F1E8` family, warm stone `#DED6C8` family, sand `#C8B9A6` family, charcoal `#20201E` family; tune exact tokens to maintain WCAG AA. Do not introduce bright multicolour accents.
- Reason: the current blue-dominant system is explicitly rejected by the owner.

### `css/global_styles.css`
- Section: page canvas, containers, headings.
- Change: remove any global rule that forces every section into a narrow centered shell. Introduce full-bleed section backgrounds and allow an inner wide content rail only where needed for readability.
- Required: body/page should not visually stop at a small central rectangle on 1280px.

### `css/hero_section.css`
- Section: `.hero`, `.hero-content`, supporting hero blocks.
- Change: make hero effectively full-width with 32–64px desktop gutters. Use a 60/40-ish split: large left copy block, large right visual/content block. Add one smaller supporting block integrated into the right composition. No centered text.
- Required composition: one block may be tall; one block may be wide; supporting block must not match the dominant block size.
- Required background: warm neutral or charcoal chapter surface, not blue.
- Required motion: none beyond existing subtle hover/focus.

### `css/service_cards.css`
- Section: `.services-grid` and cards.
- Change: use a wide asymmetric 3-block composition: lead = 2/3-ish width, support A = 1/3-ish width, support B = 1/3-ish width with a different height/position. Avoid a fixed two-row-only template and avoid equal card heights.
- Required: large blocks should visually touch the chapter rhythm; do not float three isolated white cards inside a small middle box.

### `css/why_band.css`
- Section: why/proof chapter.
- Change: use a large statement block + smaller supporting proof block with contrasting warm-neutral surfaces. Let the chapter background itself carry visual weight.

### `css/about_section.css`
- Section: about chapter.
- Change: founder image occupies a large visual block, ideally 40–50% of the inner rail; story occupies the remaining area; add one small supporting accent statement if it improves composition. No circle portrait.

### `css/mission_vision.css`
- Section: mission/vision chapter.
- Change: Mission = dominant large block; Vision = smaller supporting block. Use charcoal/ivory/warm stone hierarchy rather than blue cards.

### `css/footer_promanaged.css`
- Section: footer.
- Change: wide inner rail with calm warm-neutral surface, generous spacing, clear columns. Avoid reverting to generic blue/grey footer styling.

### `pages/custom_websites.html`
- Section: all pricing-related content.
- Change: remove every visible price, currency amount, pricing table, package price, “starting at” price, and price-led CTA copy. Preserve service descriptions and enquiry CTA.
- Reason: software/web-app pricing should not be displayed.

### `css/custom_websites.css`
- Section: pricing styles.
- Change: remove selectors used only by deleted pricing UI. Keep styles still used by the page.

### Cleanup audit
- Audit every `<script src>` and `<link rel="stylesheet">` against the current tree.
- Search active code/docs for `ebay`, `rawg`, `game_price`, `game_reviews`, `game_search`, `shopping`, `render`, and abandoned server variants.
- Delete only files proven unused by current pages/runtime. Do not delete working form or mail paths.
- Update `.claude` maps/docs so they reflect the current repository, not the old application.

## New Code Needed
Pseudocode only:
1. Make page sections full-bleed with wide inner rails.
2. Build hero as dominant text + dominant visual + smaller support block.
3. Build services/why/about/mission as connected large chapters with unequal blocks.
4. Use warm-neutral surfaces to make scroll transitions feel like changing bento panels.
5. Remove unused legacy logic and pricing UI.
6. Test 1280 first, then 768/375.

## Constraints / Things NOT to Touch
- Do not invent business facts, metrics, clients, projects, or imagery.
- Do not add stock/reference artwork.
- Do not remove working contact/booking/SMTP/honeypot functionality.
- No dark theme; charcoal may be used as a chapter surface, but not as a full site dark mode.
- No decorative gradients, looping background animations, or parallax.
- No excessive shadows or floating-card effects.
- `origin/main` only.
- Never commit YAML.
- Do not redesign secondary pages except the explicit software pricing removal.

## Phases
### Phase 1: Landing-page structural redesign
- Goal: change `index.html` + homepage CSS so the landing page is visibly full-width, chaptered, and Bento 07-inspired.
- Exit: at 1280px the page no longer looks centered/blue/card-based.
- Files: landing-page list.

### Phase 2: Software pricing removal + legacy cleanup
- Goal: remove software pricing and obsolete runtime/doc references without breaking active features.
- Exit: no prices and no dead/legacy references.
- Files: pricing + cleanup lists.

### Phase 3: Verification
- Goal: browser-test 1280/768/375, console, overflow, font loading, links and forms.
- Exit: all Completion Criteria pass; commit pushed to `origin/main`.
- Files: fixes only from the scoped lists.
