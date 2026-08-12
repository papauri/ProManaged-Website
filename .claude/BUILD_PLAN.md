# Build Plan: Bento Design System + Modern Type

> ACTIVE TASK. Everything below the ARCHIVE line is finished — do not redo it.
> **OWNER EXECUTION DIRECTIVE (2026-08-12):** execute the full active objective uninterrupted, including implementation and verification. Do not stop between former phases P0–P4. Report once when the complete bundle is done or only if technically impossible to continue.
> **GIT TARGET DIRECTIVE:** all implementation commits for this active task must be committed to `origin/main`. Do not create, switch to, commit on, push to, or hand off work from any sub-branch. `main` is the only allowed branch for task commits.

## Goal
Make the site *visibly* different: one real bento grid system (varied tile sizes, one gap, one radius) and a modern type system with a display face. Owner reference: mockuuups.studio bento examples.

## Wants vs Needs
- **Want:** "update the design, bento inspo, modern fonts."
- **Need:** the last pass already added bento-ish grids and the owner said *"nothing has changed design wise."* The gap: grids were added per-page with different column counts (2 / 3 / 4 / auto-fit) and gaps (`--space-5`, `--space-6`, hardcoded `2rem`), so nothing reads as a system. Need = **one canonical grid + a visible type change**, not more per-file tuning.
- Font is a *locked* decision (Inter). Owner's "modern fonts" instruction reopens it — treated as approved, see Open Questions.

## Success Moment
Owner loads the homepage and says "that's a different site" within 3 seconds — driven by headline typography and tile rhythm, before reading a word.

## Reference Systems
- **Apple product pages** — take: varied tile spans in a fixed column count, generous gap. Don't copy: full-bleed photography we don't have.
- **Linear** — take: tight display tracking, one accent tile per grid. Don't copy: dark theme.
- **Vercel dashboard** — take: 12-col grid + `grid-auto-flow: dense` so uneven tiles self-pack. Don't copy: dense data-viz chrome.

## Completion Criteria (Definition of Done)
- [ ] Every card grid uses a 12-column track, `gap: var(--bento-gap)`, `grid-auto-flow: dense`
- [ ] Zero hardcoded `gap: 2rem` / `1.5rem` / `1rem` in any grid
- [ ] A `--font-display` token exists and drives every H1/H2
- [ ] Hero + section headings use fluid `clamp()` sizing; no fixed `--text-6xl` on hero
- [ ] All 7 pages load identical font links
- [ ] Uppercase+letter-spacing eyebrows removed (hero_section.css, mission_vision.css)
- [ ] Verified in-browser at 375 / 768 / 1280px with zero console errors
- [ ] No horizontal overflow at 375px on any page
- [ ] No `.yml` or `.yaml` files remain in the working tree after the task; any temporary YAML used for tooling is deleted immediately after use
- [ ] All task implementation commits, if any, land on `origin/main`; no sub-branch is created or used for this task

## Files to Change
`css/tokens.css`, `css/global_styles.css`, `css/privacy_policy.css`, `css/service_cards.css`, `css/why_band.css`, `css/hero_section.css`, `css/mission_vision.css`, `css/hardware_sourcing.css`, `css/networking.css`, `css/custom_websites.css`, `css/get-started.css`, `css/learn-more.css`, and the `<head>` font links only in all 7 HTML pages. Nothing else.

## Exact Changes
### css/tokens.css
- Section: `Typography`
- Change: add/use one `--font-display`; fluid display size tokens; display tracking token.
- Section: `Layout`
- Change: define the canonical `--bento-gap` and `--bento-cols: 12`.
- Reason: one source of truth for typography and grid rhythm.

### css/global_styles.css
- Change: apply `--font-display`, display tracking, and fluid display sizing to H1/H2 without page-specific fixed-size overrides.
- Reason: the display treatment must be global.

### css/privacy_policy.css
- Change: apply the same H1/H2 display rule because this page does not load `global_styles.css`.
- Reason: every H1/H2 must visually match.

### All grid files — canonical system
- Every target grid container must use exactly `grid-template-columns: repeat(var(--bento-cols), 1fr)`, `gap: var(--bento-gap)`, and `grid-auto-flow: dense`.
- Every target grid tile must have an explicit span that matches the approved span table below at desktop; responsive rules may change spans but must not reintroduce alternate column systems.
- Do not use `auto-fit`, `minmax(...)`, or hardcoded grid gaps in these target grids.
- Verify the implemented span assignments against the actual tile count in each grid. If the current markup differs from the table assumptions, report the mismatch instead of inventing new spans.

| File | Grid | Approved desktop spans |
|---|---|---|
| service_cards.css | `.services-grid` | featured `12`, other 2 `6` |
| why_band.css | `.why-grid` | `.why-tile-lead` `6`, other 2 `3` |
| hardware_sourcing.css | `.category-grid` | featured `6` each, standard `3` each |
| networking.css | `.network-grid` | `.primary` `6`, next 2 `3`, remaining 4 `3` |
| custom_websites.css | `.steps-strip` | all `3` |
| custom_websites.css | `.projects-grid` | featured `12`, other 3 `4` |
| get-started.css | `.features-grid` | first `12`, other 3 `4` |
| get-started.css | `.services-grid` | `6` / `3` / `3` |
| get-started.css | `.testimonials-grid` | all `4` |
| learn-more.css | `.features-grid` | first `6`, second `6`, remaining 6 `4` |
| footer_promanaged.css | `.footer-content` | leave as-is; not a bento grid |

## REVIEW FIX-ONLY DELTA — MUST COMPLETE BEFORE ACCEPTANCE
### css/custom_websites.css
- Section: `.steps-strip`, `.projects-grid`
- Required fix: keep the 12-column canonical system and the approved `3`/`12+4+4+4` desktop spans; ensure responsive behavior changes only tile spans, not the grid definition.
- Required verification: confirm there is no remaining alternate grid definition (`auto-fit`, `minmax`, or hardcoded gap) in the target grids.

### css/hero_section.css
- Section: `.hero-facts`
- Required fix: implement the hero facts as an actual 2-column bento/grid cluster at desktop/tablet using the same canonical grid tokens; mobile may collapse to one column via child spans/media rules.
- Required verification: the desktop rule must be visibly grid-based, not merely flex with a column-direction override.

### css/service_cards.css, css/why_band.css, css/hardware_sourcing.css, css/networking.css, css/get-started.css, css/learn-more.css
- Required verification only: confirm each target grid uses the canonical 12-column definition and approved spans from the table above. Do not redesign or alter unrelated styles.

### General review gate
- Re-run the YAML safety check: no `.yml`/`.yaml` files remain.
- Re-run branch safety check: implementation is on `main` only; no sub-branch.
- Re-run browser verification at 375/768/1280px and record any failures instead of masking them.

## New Code Needed
None beyond the scoped CSS changes and the existing `<head>` font-link changes.

## Constraints / Things NOT to Touch
- No scope expansion beyond the files and selectors listed above.
- Do not touch `php/`, form-submit JS, booking/contact JS, honeypot fields, or navbar/footer markup.
- No new colors. Accent stays `#2563eb`. Single light theme.
- Inter remains the body/UI font; display face is headings only.
- No HTML restructuring.
- **YAML safety rule:** never commit `.yml` or `.yaml` files. Temporary YAML must be deleted immediately after use and verified absent.
- **Git target rule:** `origin/main` only. No sub-branches, no PR workflow, no force-push.

## Known Trade-offs
- A display serif creates a larger visual shift but changes brand tone; reversible through one token.
- Tile spans are intentionally explicit; future card-count changes require span recalculation.

## Open Questions
- None for the fix cycle. Preserve the approved Instrument Serif direction unless a concrete implementation conflict makes it impossible.

## Phases
### Current: Fix cycle
- Goal: resolve only the review findings above.
- Exit condition: all fix-only verification checks pass and the complete active design task can be re-reviewed.
- Files this phase: `css/custom_websites.css`, `css/hero_section.css`, plus verification-only checks on the other listed grid files.

### Phase 2 onward
- Return to the existing active phases only after this fix cycle is accepted.
