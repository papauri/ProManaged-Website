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

## Known Trade-offs
- Secondary pages are not fully redesigned in this pass; homepage remains the canonical visual reference.
- Deleting truly unused JS/CSS/PHP is preferable to keeping speculative compatibility code.

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

### Phase 3: Verification
- Goal: browser-test 375 / 768 / 1280, console, overflow, links, forms, and font loading.
- Exit: all Completion Criteria pass and implementation is pushed to `origin/main`.
- Files: same lists, fixes only.
