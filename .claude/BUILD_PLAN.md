# Build Plan: Bento Design System + Modern Type

> ACTIVE TASK. Everything below the ARCHIVE line is finished — do not redo it.
> **OWNER EXECUTION DIRECTIVE (2026-08-12):** execute the active objective in order, one unchecked task at a time. Stop only on a blocker or after the final verification task passes.
> **GIT TARGET DIRECTIVE:** all implementation commits for this task must land on `origin/main`. Never create, switch to, commit on, push to, or hand off work from a sub-branch.
> **YAML DIRECTIVE:** never commit `.yml` or `.yaml`. Any temporary YAML used for tooling must be deleted immediately after use and verified absent.

## Goal
Give ProManaged IT a visibly new, modern visual language: a canonical bento layout system, stronger editorial hierarchy, and modern typography. The intended direction is inspired by the supplied Mockuuups Studio bento examples, which emphasize structured compartments, varied tile sizes, bold typography, whitespace, visual storytelling, and responsive layouts. citeturn719084view0

## Wants vs Needs
- **Want:** "update the design, bento inspo, modern fonts."
- **Need:** make the redesign visibly different rather than another round of small spacing/shadow adjustments. Existing grids already vary by page, so the task is to establish one coherent system that users can recognize immediately.
- **End user:** prospective IT/SaaS and hardware clients who need fast trust, clarity, and an easy path to contact or book.
- **Friction:** uneven layouts, weak hierarchy, and generic typography can make the site feel templated.

## Success Moment
A first-time visitor lands on the homepage and immediately sees a deliberate editorial/bento composition, modern typography, clear service hierarchy, and a credible technology brand.

## Reference Systems
- **Mockuuups Studio bento examples** — take: varied tile sizes, bold type, whitespace, mixed visual/text content, responsive storytelling. Avoid: copying any single example literally. citeturn719084view0
- **Apple** — take: product-story sequencing through modular blocks. Avoid: imagery-heavy layouts the repo cannot support.
- **Vercel** — take: disciplined grid rhythm and restrained visual system. Avoid: dashboard/data-density styling.

## Completion Criteria (Definition of Done)
- [ ] One canonical bento grid system is used by every target card/content grid.
- [ ] Grid rhythm is consistent: one canonical gap, radius, border and shadow treatment.
- [ ] Featured tiles visibly vary in span/size rather than every tile being equal.
- [ ] Hero uses the same bento language and has clear editorial hierarchy.
- [ ] A modern display font is introduced for headings while Inter remains the body/UI font.
- [ ] H1/H2 typography uses fluid sizing and consistent tracking.
- [ ] All 7 target HTML pages load identical font links.
- [ ] No hardcoded legacy grid gaps remain in the target grid files.
- [ ] Uppercase/letter-spacing eyebrow styling is removed where identified as dated.
- [ ] Verified at 375 / 768 / 1280px with no horizontal overflow or console errors.
- [ ] No `.yml` or `.yaml` files remain after execution.
- [ ] All implementation commits, if any, are on `origin/main`; no sub-branch is used.

## Files to Change
- `css/tokens.css` — typography and bento tokens.
- `css/global_styles.css` — global display typography.
- `css/privacy_policy.css` — display typography for the page without global styles.
- `css/service_cards.css` — homepage service bento.
- `css/why_band.css` — homepage explanatory bento.
- `css/hero_section.css` — shared editorial/bento hero.
- `css/mission_vision.css` — mission/vision bento treatment.
- `css/hardware_sourcing.css` — hardware category bento.
- `css/networking.css` — networking bento.
- `css/custom_websites.css` — steps/projects bento.
- `css/get-started.css` — feature/service/testimonial bento.
- `css/learn-more.css` — feature bento.
- `index.html`, `get-started.html`, `learn_more.html`, `privacy_policy.html`, `pages/custom_websites.html`, `pages/hardware_sourcing.html`, `pages/network_infrastructure.html` — `<head>` font links only.

## Exact Changes
### `css/tokens.css`
- Section: `Typography`
- Change: add `--font-display`; add fluid display sizes with `clamp()` and tight tracking tokens.
- Section: `Layout`
- Change: add `--bento-gap` as the single grid gap token; add/retain one canonical radius and shadow hierarchy.
- Reason: one source of truth prevents per-page drift.

### `css/global_styles.css`
- Section: heading defaults
- Change: make all H1/H2 use `var(--font-display)` and the shared tracking token; use fluid token sizes where the existing scale is currently fixed.
- Reason: typography must change globally without duplicating rules.

### `css/privacy_policy.css`
- Section: heading styles
- Change: apply the same H1/H2 display typography because this page does not load `global_styles.css`.
- Reason: prevent one page from silently diverging.

### Target grid files
- Sections: existing grid containers listed in the file table below.
- Change: standardize each grid to `repeat(12, 1fr)`, `gap: var(--bento-gap)`, and `grid-auto-flow: dense`; use intentional featured spans exactly as documented below; normalize tile padding/border/radius/shadow.
- Reason: create one recognizable bento system instead of independent page-specific grids.

| File | Grid | Span pattern |
|---|---|---|
| `css/service_cards.css` | `.services-grid` | featured `12`, others `6` |
| `css/why_band.css` | `.why-grid` | lead `6`, others `3` |
| `css/hardware_sourcing.css` | `.category-grid` | featured `6` each, others `3` |
| `css/networking.css` | `.network-grid` | primary `6`, remaining `3` |
| `css/custom_websites.css` | `.steps-strip` | all `3` |
| `css/custom_websites.css` | `.projects-grid` | featured `12`, others `4` |
| `css/get-started.css` | `.features-grid` | first `12`, others `4` |
| `css/get-started.css` | `.services-grid` | `6 / 3 / 3` |
| `css/get-started.css` | `.testimonials-grid` | all `4` |
| `css/learn-more.css` | `.features-grid` | first `6`, second `6`, remaining `4` |

### `css/hero_section.css`
- Section: shared hero
- Change: create a two-column editorial hero with a responsive bento fact cluster; use fluid display sizing; remove dated uppercase eyebrow treatment; preserve existing semantic markup.
- Reason: the hero is the first visible proof that the site has changed.

### `css/mission_vision.css`
- Section: mission/vision
- Change: use the same bento tile language and remove dated uppercase/letter-spacing treatment; do not reintroduce modal/tab behavior.
- Reason: keep storytelling consistent.

### All 7 HTML heads
- Section: `<head>` font links
- Change: use one identical combined Google Fonts request containing Inter 400/500/600/700 plus one modern display face weight; keep `preconnect` and `display=swap`.
- Reason: consistent typography and fewer request variations.

## New Code Needed
```text
TOKEN
  define one display font + fluid heading sizes + one bento gap
GRID
  use 12 columns + dense flow + fixed responsive span rules
HERO
  place editorial copy beside a compact bento fact cluster
TYPE
  apply display font to H1/H2; keep Inter for body/UI
QA
  verify layout, overflow, font loading, console state, and YAML absence
```

## Constraints / Things NOT to Touch
- No implementation in `php/`, form-submit JS, booking JS, or contact JS.
- No navbar/footer markup changes.
- No HTML restructuring beyond `<head>` font-link changes.
- No new colors; preserve the existing light theme and accent token.
- Do not add new imagery/assets unless separately approved.
- No bulk line-ending or file-rewrite scripts.
- Do not reintroduce modals or modal-trigger scripts.
- **Git:** `origin/main` only. No sub-branches, no PR-based handoff, no branch creation/switching.
- **YAML:** never commit `.yml`/`.yaml`; temporary files must be deleted immediately and verified absent.
- Keep all changes scoped to the exact files listed above.

## Known Trade-offs
- **Display font choice [Medium]:** a serif/editorial face creates a larger visible change but may feel less technical; keep it tokenized so it is reversible.
- **Text-led bento [Medium]:** the repo has limited imagery, so the design must get visual distinction from type, scale, whitespace and tile composition rather than invented visuals.
- **Hardcoded tile spans [Low]:** future card-count changes require span review; this is preferred over auto-fit because the goal is a deliberate editorial composition.

## Open Questions
- Default display face: **Instrument Serif** for maximum visible change against Inter; keep the token reversible.
- No further human decision is required for this phase; use the above decision unless the implementation becomes technically impossible.

## Phases
### Phase 1: Typography foundation
- Goal: modern display type + fluid heading scale live across all 7 pages.
- Exit condition: every H1/H2 gets display typography and all font-link strings match.
- Files this phase: `css/tokens.css`, `css/global_styles.css`, `css/privacy_policy.css`, the 7 HTML `<head>` blocks.

### Phase 2: Homepage design proof
- Goal: make the homepage visibly bento/editorial using the canonical grid, hero, services and why-band.
- Exit condition: homepage visibly changes in-browser and follows one bento system.
- Files this phase: `css/hero_section.css`, `css/service_cards.css`, `css/why_band.css`, `css/mission_vision.css`.

### Phase 3: Site-wide rollout
- Goal: apply the approved bento system to the remaining pages without changing functionality.
- Exit condition: all target grids use the canonical system and legacy grid gaps are gone.
- Files this phase: `css/hardware_sourcing.css`, `css/networking.css`, `css/custom_websites.css`, `css/get-started.css`, `css/learn-more.css`.

### Phase 4: Verification
- Goal: verify the design, responsiveness and safety constraints.
- Exit condition: 375/768/1280 checks pass, no overflow/console errors, font consistency is confirmed, and no YAML files remain.
- Files this phase: no new implementation files; verification only.

---

# ARCHIVE — Previous Phases (COMPLETE — do not redo)

All prior D1–D21 work and the prior completed redesign passes remain archived below in the existing plan history. Do not repeat them unless a regression is directly discovered during this task.
