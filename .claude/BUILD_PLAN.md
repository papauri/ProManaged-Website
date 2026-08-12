# Build Plan: ProManaged IT — Bento 07 Landing Page Redesign + Legacy Logic Cleanup

> ACTIVE TASK. Previous bento/type attempts are superseded by this plan and must not be repeated.
> **OWNER DIRECTIVE:** The landing page (`index.html`) is the primary product. This is a real visual redesign, not a grid/token cleanup. Use the supplied Mockuuups Bento 07 image as the primary visual composition reference: https://assets.mockuuups.com/mo/image/upload/c_limit%2Cw_680/v1708508072/bento-07_wd3t7l
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Temporary YAML must be deleted immediately and verified absent.

## Goal
Transform `index.html` into a premium, editorial, full-width bento landing page inspired specifically by Mockuuups Bento 07. Recreate the design language, not the artwork: edge-to-edge/as-wide-as-appropriate compartments, unequal tile proportions, dominant visual/text blocks, strong typography, restrained colour, generous whitespace, and storytelling through composition. At the same time remove obsolete eBay/RAWG/game-price/shopping/render leftovers from active code and project documentation.

## Wants vs Needs
- **Want:** the landing page should feel like the supplied Bento 07 reference, not like a conventional website made from centered cards.
- **Need:** the composition must use the available viewport deliberately, reduce nested cards, vary visual weight, and make the page read as a designed composition before it reads as a set of UI components.
- **End user:** prospective ProManaged clients who need immediate trust, clarity, and a clear path to enquire/book.
- **Friction today:** the page still feels boxed-in and centered; previous bento attempts changed CSS mechanics without producing a strong visual transformation.

## Success Moment
At 1280px, the first screen and first 2–3 sections visibly resemble the supplied Bento 07 design language: wide asymmetric blocks, one or two dominant areas, smaller supporting compartments, strong display type, and no repetitive equal-card rows.

## Reference Systems
- **Mockuuups Bento 07** — take: asymmetric collage-like composition, large dominant blocks, mixed text/visual compartments, generous negative space, restrained palette, visual hierarchy. Avoid literal copying of artwork or proprietary assets.
- **Apple editorial/product pages** — take: wide storytelling and clear feature hierarchy. Avoid image-heavy imitation.
- **Linear** — take: restrained chrome and typography. Avoid dark-theme dependency.

## Completion Criteria (Definition of Done)
- [ ] `index.html` is the primary acceptance target and is visibly transformed at 1280px.
- [ ] Hero is a wide editorial composition, not a centered text column plus a stack of equal cards.
- [ ] Hero and major sections visually extend across the available viewport; do not wrap the entire story inside one narrow centered shell.
- [ ] Sections transition as large bento-like blocks while scrolling: backgrounds, imagery, typography and block heights should create a clear rhythm rather than repeated isolated cards.
- [ ] At least 4 landing-page sections use varied block proportions; no repetitive equal-card rows in the primary story.
- [ ] At least one dominant visual/text block spans most of a desktop row; supporting blocks occupy the remaining space.
- [ ] Existing founder image and existing Font Awesome icons are used intentionally; no fake imagery, metrics, clients, or fabricated work.
- [ ] Modern display type + Inter body/UI; display hierarchy is clearly visible.
- [ ] Colour system is visibly modern and warm-neutral/Japandi-inspired rather than blue-on-white: use a soft off-white/ivory base, warm stone/sand/greige surfaces, muted charcoal text, and a restrained earthy accent. Blue may remain only where required for existing identity/accessibility, not as the dominant page colour. No decorative gradients.
- [ ] Backgrounds are deliberately varied and may use subtle static texture/noise or very restrained CSS ambience; no looping animation, parallax gimmicks, or distracting motion.
- [ ] Desktop content deliberately uses the available width; readable text measure is constrained independently of the visual composition.
- [ ] No obsolete eBay/RAWG/game-price/game-review/shopping-widget/render-pipeline references remain in active code or `.claude` project docs.
- [ ] No dead `<script>` or stylesheet references remain.
- [ ] Existing contact/booking/SMTP/honeypot functionality remains intact.
- [ ] `pages/custom_websites.html` software/web-app page contains **no prices or pricing tables**; remove price-led UI/copy only, preserving service descriptions and CTAs.
- [ ] Verified at 1280px first, then 768px and 375px; no overflow and no console errors.
- [ ] No `.yml` or `.yaml` files remain.
- [ ] Final implementation committed to `main` and pushed to `origin/main`.

## Files to Change
### Landing-page redesign
- `index.html`
- `css/tokens.css`
- `css/global_styles.css`
- `css/hero_section.css`
- `css/service_cards.css`
- `css/why_band.css`
- `css/about_section.css`
- `css/mission_vision.css`
- `css/footer_promanaged.css`

### Software page pricing removal
- `pages/custom_websites.html`
- `css/custom_websites.css`

### Logic/reference cleanup
- `index.html`
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`
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
### `index.html` — primary design file
- Section: hero, services, why/proof, about, mission/vision, contact, footer wrappers.
- Change: restructure where necessary to support the Bento 07 composition. Preserve all real copy, links, IDs, forms, CTA targets, accessibility hooks, and existing functionality. Create deliberate visual groupings instead of one repeated-card pattern.
- Reason: CSS-only tweaks have not produced the requested visual transformation.

### `css/tokens.css`
- Section: layout, typography, colour.
- Change: define a wide visual container (~1440–1560px), generous horizontal gutters, modern display type, soft ivory/off-white background, warm stone/greige surfaces, muted charcoal text, subdued earthy accent tokens, and only a restrained blue identity token for cases where the existing brand element requires it. Keep consistent radius/shadow hierarchy.
- Reason: the previous blue-and-white treatment is not achieving the requested modern/Japandi direction.

### `css/global_styles.css`
- Section: container and heading defaults.
- Change: stop forcing every section into the same narrow centered block; allow full-width section backgrounds and wide visual compositions while keeping readable text measure constrained.
- Reason: eliminate the boxed-in feel at the layout root.

### `css/hero_section.css`
- Section: landing hero.
- Change: make the hero effectively full-width within viewport gutters. Build a Bento 07-inspired composition with one dominant copy block and one dominant adjacent visual/content block, plus smaller supporting compartments. Avoid a centered `max-width` that shrinks the entire hero. Use layered block backgrounds and editorial spacing rather than a stack of floating cards.
- Reason: the hero is the strongest proof of the redesign and must feel immersive immediately.

### `css/service_cards.css`
- Section: services.
- Change: replace equal-card treatment with a wide asymmetrical composition: one dominant service block, one medium support block, one smaller support block, with enough block height/width to create a scrolling story. Do not hard-code a two-row-only model.
- Reason: services should look like editorial content tiles, not a card catalogue.

### `css/why_band.css`
- Section: why/proof.
- Change: create one large statement/proof block plus a smaller supporting compartment with a distinct background surface; use generous vertical rhythm so it reads as the next visual chapter.
- Reason: extend the storytelling rhythm beyond the hero.

### `css/about_section.css`
- Section: about.
- Change: use the founder image as a large visual anchor and pair it with a broad text/story block plus a small accent statement. Avoid a conventional 50/50 card split and avoid constraining the whole band to a narrow central module.
- Reason: human storytelling needs stronger visual hierarchy.

### `css/mission_vision.css`
- Section: mission/vision.
- Change: make Mission and Vision deliberately unequal in visual weight; use one dominant statement block and one supporting block, with contrasting warm-neutral surfaces rather than blue cards.
- Reason: create editorial rhythm and reinforce the new palette.

### `css/footer_promanaged.css`
- Section: footer.
- Change: use the same wide container language and strong spacing; keep footer functional and readable; continue the neutral/Japandi visual language instead of reverting to a generic light-grey footer.
- Reason: finish the visual system without a cramped centre column.

### `pages/custom_websites.html` + `css/custom_websites.css`
- Section: software/web-app service/pricing content.
- Change: remove all visible prices, pricing amounts, price tables, and price-led UI/copy. Keep the service positioning, capability descriptions, proof/context that is not fabricated, and CTA flow intact. Do not remove the page itself.
- Reason: owner does not want prices on the software page.

### Logic/reference cleanup
- Audit every current HTML script/stylesheet reference against the current tree.
- Delete only assets proven unused by the current application.
- Remove any remaining eBay/RAWG/game-price/game-review/shopping-widget/render-pipeline references from active code and `.claude` docs.
- Remove dead event handlers, duplicate rendering code, and abandoned server-variant references only when their callers are absent.
- Do not remove live contact/booking/SMTP/honeypot logic.
- Update stale `.claude` maps/docs after cleanup.

## New Code Needed
Pseudocode only:
1. Give the page a wide visual canvas with full-width section backgrounds.
2. Compose hero as one dominant block + adjacent dominant visual block + small support compartment(s).
3. Compose services/why/about/mission as unequal editorial blocks with large vertical rhythm and chapter-like background changes.
4. Use founder image/icons as intentional visual anchors.
5. Remove obsolete runtime paths and stale references.
6. Remove all software-page pricing UI/copy.
7. Browser-test at 1280px first, then 768px/375px.

## Constraints / Things NOT to Touch
- Do not invent business features, metrics, clients, projects, or imagery.
- Do not add stock assets or copy the reference artwork.
- Do not remove working contact/booking/SMTP/honeypot functionality.
- No dark theme. No decorative multi-stop gradients.
- No random bright colours; avoid making blue the dominant background colour.
- No looping background animations, parallax, or distracting motion. Any ambience must be static and subtle.
- No modal reintroduction.
- No bulk line-ending/rewrite scripts.
- `origin/main` only.
- Never commit YAML files.
- Secondary pages are not the visual acceptance target in this pass, except `pages/custom_websites.html`, where price removal is explicitly required.

## Known Trade-offs
- Secondary pages may remain visually behind the landing page until a later rollout; this is intentional.
- Because the repo has limited imagery, typography, warm-neutral colour blocking, founder photography, and iconography must carry more of the visual composition.

## Open Questions
None. Implement decisively from the Bento 07 composition reference and the warm-neutral/Japandi direction above.

## Phases
### Phase 1: Logic cleanup + reference cleanup
- Goal: remove obsolete eBay/RAWG/render leftovers and stale documentation while preserving current functionality.
- Exit: no dead references or obsolete feature names remain.
- Files: cleanup list above.

### Phase 2: Landing-page redesign
- Goal: transform `index.html` decisively using the Bento 07 composition language, full-width section transitions, and the warm-neutral/Japandi colour direction.
- Exit: at 1280px the landing page clearly reads as an immersive asymmetric editorial composition, not a centered card stack.
- Files: landing-page design list above.

### Phase 3: Software page pricing removal
- Goal: remove all pricing from the software/web-app page while preserving its service story and CTAs.
- Exit: no visible prices or pricing UI remain.
- Files: `pages/custom_websites.html`, `css/custom_websites.css`.

### Phase 4: Final verification
- Goal: browser-test 1280/768/375, console, overflow, font loading, links, forms, software-page pricing absence, and asset references.
- Exit: all Completion Criteria pass and Claude has committed/pushed to `origin/main`.
- Files: same lists, fixes only.
