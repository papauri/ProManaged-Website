# Build Plan: ProManaged IT — Full-Width Bento Redesign + Legacy Logic Cleanup

> ACTIVE TASK. Previous bento/type attempts are superseded by this plan and must not be repeated.
> **OWNER DIRECTIVE:** Deliver the visual redesign and remove obsolete application logic/references in the same pass. The landing page (`index.html`) is the primary product surface and acceptance target. Do not stop for cosmetic micro-reviews.
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Temporary YAML must be deleted immediately and verified absent.

## Goal
Replace the centered card-stack appearance with a visibly new, full-width editorial/bento composition inspired by the supplied Mockuuups examples, with the **landing page (`index.html`) leading the design direction**, while removing stale render/widget logic and obsolete eBay/game-price/RAWG references that no longer belong to the product.

## Wants vs Needs
- **Want:** a site that looks like a modern bento/editorial product site, not centered boxes; no irrelevant eBay/game/render leftovers.
- **Need:** the landing page must immediately feel transformed at desktop width: wide composition, strong typography, modern colour hierarchy, asymmetric sections, and deliberate storytelling using most of the viewport.
- **Friction today:** the prior implementation still felt like centered cards with modest styling changes; secondary sections/pages must not dictate the landing-page composition.

## Success Moment
At 1280px desktop, a first-time visitor lands on `index.html` and immediately sees a premium, wide, editorial/bento IT/SaaS site: the hero stretches across the viewport, service tiles have deliberate unequal weights, section backgrounds create rhythm, and typography/colour establish a clearly new identity before the visitor scrolls.

## Reference Systems
- **Mockuuups Bento examples** — take: mixed visual/text compartments, varied proportions, bold type, muted colour, whitespace, sequential storytelling; avoid literal copying.
- **Apple** — take: full-width storytelling and feature hierarchy; avoid image-heavy imitation.
- **Linear** — take: restrained typography/chrome; avoid dark-theme dependence.

## Completion Criteria (Definition of Done)
- [ ] **Landing page first:** `index.html` is visually transformed and is the canonical reference for the rest of the site.
- [ ] Landing page no longer reads as a narrow centered stack; primary sections deliberately use most of the available desktop width.
- [ ] Hero is a true wide editorial/bento composition with unequal zones, not a centered text column with small cards.
- [ ] At least 3 landing-page sections use visibly different tile sizes/weights and strong full-width section rhythm.
- [ ] Services section has one dominant feature tile and supporting tiles with clearly unequal visual weight.
- [ ] About section is a wide editorial story, not a conventional narrow two-column card layout.
- [ ] Mission/Vision section uses asymmetric visual hierarchy rather than equal boxed cards.
- [ ] Modern display typography + Inter body/UI; restrained slate/off-white/white palette with blue accent.
- [ ] No obsolete eBay, RAWG, game-price, game-review, shopping-widget, or abandoned render-pipeline references remain in active application code or `.claude` project docs.
- [ ] Every remaining JS/CSS/PHP asset is referenced by at least one current page or required by a current form/runtime path; unused assets are deleted.
- [ ] No dead `<script>`/stylesheet references remain.
- [ ] Existing contact/booking functionality still works; do not remove PHP mail/SMTP or honeypot behaviour.
- [ ] Verified at 375 / 768 / 1280px with no overflow and no console errors.
- [ ] No `.yml` or `.yaml` files remain.
- [ ] Final implementation committed to `main` and pushed to `origin/main`.

## Files to Change
### Landing-page design
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
### Landing-page design — primary acceptance scope
- Rebuild `index.html` as a **wide editorial landing page**: large unequal hero zones, asymmetric service tiles, broad storytelling bands, deliberate use of viewport width, and clear vertical rhythm between sections.
- Use `index.html` as the visual source of truth. Secondary pages must not constrain or define the landing-page layout in this phase.
- Use a modern display face for H1/H2, Inter for body/UI, and a visibly refreshed neutral/slate/off-white/white palette with the existing blue accent.
- Remove narrow generic wrappers or fixed widths that cause the landing page's boxed-in appearance.
- Preserve all existing copy, links, section IDs, forms, CTA destinations, accessibility hooks, and functional behaviour unless a minimal HTML wrapper/class is required to achieve the new composition.

### Logic cleanup audit
- Inspect every current HTML `<script>` and stylesheet reference against the current repository tree.
- Delete only files proven unused by current pages/runtime.
- Remove obsolete eBay/RAWG/game-price/game-review/shopping-widget/render-pipeline code and references if any remain in the listed active files or project docs.
- Remove dead event handlers, duplicate render code, unused selectors/classes, and abandoned server-variant references when their callers are absent.
- Do not remove `js/booking_form.js`, `js/contact__form.js`, `php/booking.php`, `php/contact.php`, `php/mailer.php`, or honeypot logic if still referenced by live forms.
- Update `.claude/PROJECT_CONTEXT.md` and `.claude/SYSTEM_MAP.md` so they describe the current tree and no longer advertise deleted game/eBay/render systems.
- Verify no HTML references deleted assets.

## FINAL FIX-ONLY DELTA — LANDING PAGE FIRST
The previous homepage implementation was rejected. The **landing page is now the explicit primary target**. Do not treat the four fixes as isolated CSS cleanup; use them to make `index.html` visibly transformed and then verify the entire landing page.

### `css/service_cards.css`
- Function/section: `.services-grid`, `.service-card`, `.service-card-featured`
- Change: remove the brittle fixed two-row placement model; keep a wide 12-column editorial grid with one dominant lead tile and two supporting tiles, using explicit column spans and normal grid flow so the composition remains stable without assuming exactly two rows.
- Reason: the landing page's main commercial section must feel editorial/bento, not like a fixed 3-card template.

### `css/about_section.css`
- Function/section: `.about-content`, `.about-photo`, `.about-text`
- Change: make the About band use the full available desktop container with a stronger asymmetric split and larger visual presence; remove the visual feeling of a fixed narrow 380px column plus a conventional card. Keep readable text measure and the existing founder image.
- Reason: the landing page must tell the company story using wide editorial composition rather than another centered card arrangement.

### `css/hero_section.css`
- Function/section: `.hero`, `.hero-content`, desktop container rules
- Change: allow the landing-page desktop hero to deliberately use the viewport width with consistent side gutters; constrain only text measure, not the whole visual composition. Preserve the asymmetric fact cluster and responsive collapse.
- Reason: the hero is the first acceptance test for the “use the available width” requirement.

### `css/tokens.css`
- Function/section: colour and surface tokens
- Change: establish a visibly refreshed modern palette hierarchy using slate/near-black text, cool off-white page background, elevated white surface, muted slate surface, and the existing blue accent; update dependent surface/border/text tokens so landing-page sections visibly alternate rather than appearing as one flat white page.
- Reason: the owner explicitly asked for a modern colour system; this must be perceptible on `index.html`.

### Landing-page acceptance gate
- Browser-test `index.html` at **1280px first**.
- The landing page must visibly fill the viewport width with strong asymmetric composition; a centered card stack is an automatic failure.
- Confirm hero, services, why, about, mission/vision, contact, and footer read as one coherent story with deliberate section rhythm.
- Then test 768px and 375px for collapse/overflow.
- Confirm no console errors, no dead asset references, contact/booking CTAs still work, and fonts actually load.
- Only after the landing page passes may the implementation be considered ready for final review.

## New Code Needed
Pseudocode only:
1. Use wide landing-page container + full-width section backgrounds.
2. Compose hero from unequal editorial zones.
3. Compose services as one lead tile plus supporting asymmetric tiles.
4. Shape About/Mission/Vision into broad storytelling bands with different visual weights.
5. Remove dead runtime paths and stale documentation references.
6. Re-run reference checks and browser QA after cleanup.

## Constraints / Things NOT to Touch
- Do not invent new business features or data.
- Do not add stock assets, fake metrics, fake clients, or fabricated portfolio claims.
- Do not remove working contact/booking/SMTP/honeypot functionality.
- No dark theme or random accent colours.
- No modal reintroduction.
- No bulk line-ending/rewrite scripts.
- `origin/main` only.
- Never commit YAML files.
- Do not let secondary pages dictate the landing-page design in this phase.

## Known Trade-offs
- Secondary pages may remain visually different until a later rollout; this is intentional. `index.html` is the canonical reference implementation.
- The landing page intentionally uses more viewport width; readable text remains independently constrained for legibility.
- Deleting truly unused JS/CSS/PHP is preferable to keeping speculative compatibility code.

## Open Questions
None.

## Phases
### Phase 1: Remove obsolete logic + stale references
- Goal: current runtime contains only used functionality; eBay/game/RAWG/render leftovers are gone from active code and project docs.
- Exit: reference audit shows no dead scripts/styles or obsolete feature names.
- Files: cleanup audit list above.

### Phase 2: Landing page redesign
- Goal: make `index.html` the canonical, visibly transformed full-width editorial/bento experience.
- Exit: 1280px landing-page review clearly reads as a new site, not a centered card stack.
- Files: landing-page design list above.

### Phase 3: Final landing-page fix cycle
- Goal: resolve the four rejected issues while prioritising the landing page.
- Exit: hero, services, about, mission/vision, and section rhythm all use the available width with modern typography/colour and no brittle grid assumptions.
- Files: `css/service_cards.css`, `css/about_section.css`, `css/hero_section.css`, `css/tokens.css`, `index.html` only where minimal wrappers/classes are required.

### Phase 4: Verification
- Goal: browser-test `index.html` at 1280/768/375, then verify links, forms, font loading, console state, overflow, and deleted-asset references.
- Exit: all Completion Criteria pass and implementation is pushed to `origin/main`.
- Files: same lists, fixes only.
