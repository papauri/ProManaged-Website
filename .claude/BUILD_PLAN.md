# Build Plan: ProManaged IT — Full-Width Bento Redesign + Legacy Logic Cleanup

> ACTIVE TASK. Previous bento/type attempts are superseded by this plan and must not be repeated.
> **OWNER DIRECTIVE:** Deliver the visual redesign and remove obsolete application logic/references in the same pass. Do not stop for cosmetic micro-reviews.
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Temporary YAML must be deleted immediately and verified absent.

## Goal
Replace the centered card-stack appearance with a visibly new, full-width editorial/bento composition inspired by the supplied Mockuuups examples, while removing stale render/widget logic and obsolete eBay/game-price/RAWG references that no longer belong to the product.

## Wants vs Needs
- **Want:** a site that looks like a modern bento/editorial product site, not centered boxes; no irrelevant eBay/game/render leftovers.
- **Need:** wide composition, stronger typography, restrained palette, and a lean runtime containing only features the current site actually uses.
- **Friction today:** stale agent/docs references make obsolete functionality look active; unnecessary JS/CSS/PHP increases confusion and maintenance cost.

## Success Moment
The homepage looks intentionally composed across the viewport, and a developer opening the project sees only current ProManaged functionality—no obsolete shopping/game/eBay/render pipeline references.

## Reference Systems
- **Mockuuups Bento examples** — take: mixed visual/text compartments, varied proportions, bold type, muted colour, whitespace, sequential storytelling; avoid literal copying.
- **Apple** — take: full-width storytelling and feature hierarchy; avoid image-heavy imitation.
- **Linear** — take: restrained typography/chrome; avoid dark-theme dependence.

## Completion Criteria (Definition of Done)
- [ ] Homepage is visually transformed: wide editorial hero, asymmetric service/content bands, deliberate full-width backgrounds.
- [ ] At least 3 homepage sections use varied tile sizes and the available desktop width.
- [ ] Modern display typography + Inter body/UI; restrained slate/blue palette only.
- [ ] No obsolete eBay, RAWG, game-price, game-review, shopping-widget, or abandoned render-pipeline references remain in active application code or `.claude` project docs.
- [ ] Every remaining JS/CSS/PHP asset is referenced by at least one current page or required by a current form/runtime path; unused assets are deleted.
- [ ] No dead `<script>`/stylesheet references remain.
- [ ] Existing contact/booking functionality still works; do not remove PHP mail/SMTP or honeypot behaviour.
- [ ] Verified at 375 / 768 / 1280px with no overflow and no console errors.
- [ ] No `.yml` or `.yaml` files remain.
- [ ] Final implementation committed to `main` and pushed to `origin/main`.

## Files to Change
### Design
- `css/tokens.css`
- `css/global_styles.css`
- `css/hero_section.css`
- `css/service_cards.css`
- `css/why_band.css`
- `css/about_section.css`
- `css/mission_vision.css`
- `css/footer_promanaged.css`
- `index.html`

### Logic/reference cleanup audit
- `index.html`
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`
- `js/booking_form.js`
- `js/contact__form.js`
- `js/custom_websites.js`
- `js/main.js`
- `js/mobile_phone_navbar.js`
- `js/networking.js`
- `js/privacy_policy.js`
- all current `css/*.css` files listed in the repository tree
- `php/booking.php`
- `php/contact.php`
- `php/env.php`
- `php/mailer.php`
- `.claude/PROJECT_CONTEXT.md`
- `.claude/SYSTEM_MAP.md`
- `.claude/agents/backend-specialist.md`
- `.claude/agents/codebase-scout.md`
- `.claude/agents/frontend-specialist.md`
- `.claude/agents/build-planner.md`

## Exact Changes
### Homepage design files
- Rebuild the homepage as a wide editorial/bento composition: large unequal hero zones, asymmetric service tiles, broad storytelling bands, and deliberate use of viewport width.
- Use a modern display face for H1/H2, Inter for body/UI, and only neutral/slate surfaces plus the existing blue accent.
- Remove narrow generic wrappers or fixed widths that cause the current boxed-in appearance.

### Logic cleanup audit
- Inspect every current HTML `<script>` and stylesheet reference against the current repository tree.
- Delete only files proven unused by current pages/runtime.
- Remove obsolete eBay/RAWG/game-price/game-review/shopping-widget/render-pipeline code and references if any remain in the listed active files or project docs.
- Remove dead event handlers, duplicate render code, unused selectors/classes, and abandoned server-variant references when their callers are absent.
- Do not remove `js/booking_form.js`, `js/contact__form.js`, `php/booking.php`, `php/contact.php`, `php/mailer.php`, or honeypot logic if still referenced by live forms.
- Update `.claude/PROJECT_CONTEXT.md` and `.claude/SYSTEM_MAP.md` so they describe the current tree and no longer advertise deleted game/eBay/render systems.
- Verify no HTML references deleted assets.

## FINAL FIX-ONLY DELTA AFTER REVIEW OF 785a7691
The previous homepage implementation was rejected. Do not redesign unrelated functionality and do not repeat the same centered-card interpretation. Fix only these four issues, then verify the whole homepage.

### `css/service_cards.css`
- Function/section: `.services-grid`, `.service-card`, `.service-card-featured`
- Change: remove the brittle fixed two-row placement model; keep a wide 12-column editorial grid with one dominant lead tile and two supporting tiles, using explicit column spans and normal grid flow so the composition remains stable without assuming exactly two rows.
- Reason: the current `grid-template-rows: repeat(2, ...)` is brittle and conflicts with the intended reusable bento system.

### `css/about_section.css`
- Function/section: `.about-content`, `.about-photo`, `.about-text`
- Change: make the About band use the full available desktop container with a stronger asymmetric split; remove the visual feeling of a fixed narrow 380px column plus a conventional card. Keep readable text measure and the existing founder image.
- Reason: the current layout is still a conventional centered two-column card arrangement rather than the requested editorial composition.

### `css/hero_section.css`
- Function/section: `.hero`, `.hero-content`, desktop container rules
- Change: allow the desktop hero composition to use the viewport width deliberately with consistent side gutters; keep only the text measure constrained, not the entire visual composition. Preserve the asymmetric fact cluster and responsive collapse.
- Reason: a fixed centered `max-width` is still producing the boxed-in feeling on large screens.

### `css/tokens.css`
- Function/section: colour and surface tokens
- Change: establish a visibly refreshed modern palette hierarchy using slate/near-black text, cool off-white background, elevated white surface, muted slate surface, and the existing blue accent; update dependent tokens so sections visibly alternate rather than appearing as one flat white page. Do not introduce random colours or gradients.
- Reason: the current palette treatment is too close to the previous design and does not satisfy the owner's explicit request for modern colour.

### Verification required for this fix
- Browser-test the homepage at 1280px first and confirm the page visually fills the viewport with asymmetric composition rather than a centered card stack.
- Then test 768px and 375px for collapse/overflow.
- Confirm no console errors, no dead asset references, and that contact/booking CTAs still work.
- Commit and push the fix directly to `origin/main`.

## New Code Needed
Pseudocode only:
1. Use wide page container + full-width section backgrounds.
2. Compose hero from unequal editorial zones.
3. Compose services as one lead tile plus supporting asymmetric tiles.
4. Remove dead runtime paths and stale documentation references.
5. Re-run reference checks and browser QA after cleanup.

## Constraints / Things NOT to Touch
- Do not invent new business features or data.
- Do not add stock assets, fake metrics, fake clients, or fabricated portfolio claims.
- Do not remove working contact/booking/SMTP/honeypot functionality.
- No dark theme or random accent colours.
- No modal reintroduction.
- No bulk line-ending/rewrite scripts.
- `origin/main` only.
- Never commit YAML files.
- Do not make another broad redesign outside the four fix-only areas above during this cycle.

## Known Trade-offs
- Secondary pages are not fully redesigned in this pass; homepage remains the canonical visual reference.
- Deleting truly unused JS/CSS/PHP is preferable to keeping speculative compatibility code.
- The homepage desktop composition intentionally uses more viewport width; readable text remains constrained independently.

## Open Questions
None.

## Phases
### Phase 1: Remove obsolete logic + stale references
- Goal: current runtime contains only used functionality; eBay/game/RAWG/render leftovers are gone from active code and project docs.
- Exit: reference audit shows no dead scripts/styles or obsolete feature names.
- Files: cleanup audit list above.

### Phase 2: Full-width homepage redesign
- Goal: visually transform the homepage using the approved editorial/bento direction.
- Exit: desktop clearly reads as a new site, not a centered card stack.
- Files: design list above.

### Phase 3: Final fix-only review cycle
- Goal: resolve only the four rejected issues from commit `785a7691`.
- Exit: desktop composition is genuinely wide/asymmetric, palette is visibly modern, service layout is not brittle, and About is not a narrow conventional split.
- Files: `css/service_cards.css`, `css/about_section.css`, `css/hero_section.css`, `css/tokens.css`.

### Phase 4: Verification
- Goal: browser-test 375 / 768 / 1280, console, overflow, links, forms, and font loading.
- Exit: all Completion Criteria pass and implementation is pushed to `origin/main`.
- Files: same lists, fixes only.
