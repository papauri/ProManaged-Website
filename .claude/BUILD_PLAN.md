# Build Plan: ProManaged IT — Full-Width Bento Redesign

> ACTIVE TASK. Previous bento/type attempts are superseded by this plan and must not be repeated.
> **OWNER DIRECTIVE:** The current site still looks centered, boxed-in, and visually unchanged. This task is a real redesign, not another token/grid cleanup.
> **GIT:** Work only on `main`; commit and push directly to `origin/main`. No branches, PRs, force-pushes, or detached work.
> **YAML:** Never commit `.yml` or `.yaml`. Temporary YAML must be deleted immediately and verified absent.

## Goal
Replace the current centered card-stack appearance with a visibly new, full-width editorial/bento composition inspired by the supplied Mockuuups examples. The design must use the page width deliberately, varied tile sizes, strong typography, restrained colour, and clear visual storytelling. Mockuuups describes effective bento examples as structured compartments, bold typography, muted colour, generous whitespace, mixed media/text, and storytelling through sequential blocks. citeturn697555view0

## Wants vs Needs
- **Want:** a site that actually looks like the modern bento examples, not a collection of centered cards.
- **Need:** remove the narrow-middle feeling, use full-width section containers, create deliberate asymmetric compositions, and make the hero itself visually distinctive.
- **End user:** prospective ProManaged clients who need immediate trust, clarity, and an obvious path to enquire/book.
- **Friction today:** content is trapped in repeated centered boxes; typography and layout do not create a strong story.

## Success Moment
At desktop width, the homepage immediately reads as a premium modern IT/SaaS site: a wide editorial hero, one dominant visual/text tile, asymmetric bento sections spanning most of the viewport, and typography that looks intentional before the visitor scrolls.

## Reference Systems
- **Mockuuups Bento examples** — take: mixed media/text compartments, varied proportions, bold type, muted palette, generous whitespace, storytelling. Avoid copying a specific composition or artwork. citeturn697555view0
- **Apple** — take: full-width storytelling and strong feature hierarchy. Avoid product-ad imagery we do not own.
- **Linear** — take: restrained typography and minimal visual chrome. Avoid dark-theme dependency.

## Completion Criteria (Definition of Done)
- [ ] Homepage no longer reads as a narrow centered stack; primary content sections use a wide container with deliberate full-width backgrounds and asymmetric internal composition.
- [ ] Hero is a real editorial/bento composition: large headline block + adjacent visual/fact block(s), not a centered text column.
- [ ] At least 3 homepage sections use clearly different tile sizes/spans and fill the available content width.
- [ ] Service section has one dominant feature tile and supporting tiles with visible asymmetry.
- [ ] At least one section uses a large visual/text tile rather than four equal card boxes.
- [ ] Typography uses a modern display face + Inter body/UI, with clear display hierarchy and fluid sizing.
- [ ] Palette is modern and restrained: neutral/slate base, one blue accent, no random legacy accent colours or decorative gradients.
- [ ] The layout remains coherent at 375 / 768 / 1280px with no horizontal overflow and no console errors.
- [ ] Desktop content visibly uses the available width; no arbitrary narrow `max-width` wrappers causing the boxed-in appearance.
- [ ] No `.yml` or `.yaml` files remain.
- [ ] Final implementation is committed to `main` and pushed to `origin/main`.

## Files to Change
- `css/tokens.css`
- `css/global_styles.css`
- `css/hero_section.css`
- `css/service_cards.css`
- `css/why_band.css`
- `css/about_section.css`
- `css/mission_vision.css`
- `css/footer_promanaged.css`
- `index.html` — layout markup may be changed only where required to create the new editorial/bento composition; preserve content and functionality.

Do not expand scope to the other pages until the homepage is approved as the visual reference implementation.

## Exact Changes
### css/tokens.css
- Section: layout/typography/colour tokens.
- Change: establish a wide container token (target ~1440px), generous horizontal page padding, display type scale, one radius family, one shadow family, neutral/slate surfaces, and the existing blue accent.
- Reason: the current centered composition is partly caused by overly narrow layout constraints.

### css/global_styles.css
- Section: containers, headings, page rhythm.
- Change: remove narrow generic wrappers that force every section into the same centered width; establish wide-section defaults and strong heading hierarchy.
- Reason: the site needs width and rhythm before individual bento tiles can work.

### css/hero_section.css
- Section: hero.
- Change: rebuild as a wide two-zone editorial composition using the available viewport: dominant headline/CTA area plus a large asymmetric bento/fact/visual area. Use large type, whitespace, and one accent surface; avoid centered hero copy.
- Reason: hero is the first proof that the redesign is real.

### css/service_cards.css
- Section: services grid.
- Change: redesign to a clearly asymmetric bento composition with one lead tile spanning most of a row and supporting tiles at different sizes. Use the full content width. Avoid equal-height/equal-width card rows.
- Reason: services are the main commercial content and need the strongest bento signal.

### css/why_band.css
- Section: why/proof band.
- Change: make the section a broad storytelling band with one large statement tile and smaller supporting tiles rather than centered cards.
- Reason: reinforces editorial storytelling.

### css/about_section.css
- Section: About.
- Change: use a split editorial layout: larger founder visual area + text block + optional supporting accent block. Do not center the whole section into a narrow column.
- Reason: introduces human/brand storytelling instead of another card grid.

### css/mission_vision.css
- Section: mission/vision.
- Change: use a broad two-part bento composition with distinct visual weights for Mission and Vision; no tabbed/boxed equal treatment.
- Reason: preserves hierarchy and storytelling.

### css/footer_promanaged.css
- Section: footer.
- Change: allow the footer content to use the wide container consistently; simplify into clear columns with strong spacing and no cramped centered block.
- Reason: completes the full-width visual system.

### index.html
- Section: homepage section wrappers only.
- Change: permit the new wide/asymmetric CSS composition and add only the minimal semantic wrappers/classes needed for the new hero/service/about/mission structures. Preserve all existing copy, links, forms, IDs, and functional hooks.
- Reason: CSS alone cannot create the required composition if the current DOM prevents it.

## New Code Needed
Pseudocode only:
1. Set page container to wide desktop width with generous side padding.
2. Build hero as two unequal columns with a nested bento cluster.
3. Build services as lead tile + smaller support tiles using explicit spans.
4. Build why/about/mission as wide editorial bands with varied tile weights.
5. Collapse to one-column storytelling at mobile widths.

## Constraints / Things NOT to Touch
- Do not modify PHP, form handlers, booking/contact JS, API behaviour, authentication, or business logic.
- Do not redesign other pages in this task; homepage is the canonical reference first.
- Do not add stock assets, fake metrics, fake clients, or invented portfolio claims.
- Keep Inter for body/UI and use one modern display face for headings.
- No dark theme. No decorative multi-stop gradients. No random accent colours.
- Do not reintroduce modal UI.
- No bulk line-ending/rewrite scripts.
- `origin/main` only.
- Never commit YAML files.

## Known Trade-offs
- Homepage will diverge visually from secondary pages until a later rollout; this is intentional so the visual direction can be judged once instead of repeating weak site-wide tweaks.
- A wider container increases whitespace responsibility; tiles must be composed deliberately rather than simply stretched.

## Open Questions
None. Implement the homepage direction decisively using the reference principles above.

## Phases
### Phase 1: Homepage redesign
- Goal: implement the full-width editorial/bento system across hero, services, why, about, mission/vision, and footer.
- Exit condition: desktop screenshot/visual review clearly shows a transformed site, not a centered card stack.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/hero_section.css`, `css/service_cards.css`, `css/why_band.css`, `css/about_section.css`, `css/mission_vision.css`, `css/footer_promanaged.css`, `index.html`.

### Phase 2: Verification
- Goal: test 375 / 768 / 1280px, console, overflow, typography loading, and all existing homepage interactions/links.
- Exit condition: all Completion Criteria pass.
- Files: same as Phase 1, fixes only.
