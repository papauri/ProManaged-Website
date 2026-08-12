# Build Plan: Bento Design System + Modern Type

> ACTIVE TASK. Everything below the ARCHIVE line is finished — do not redo it.
> **OWNER EXECUTION DIRECTIVE (2026-08-12):** execute the full active objective uninterrupted, including implementation and verification. Do not stop between fix cycles. Report once when the complete bundle is done or only if technically impossible to continue.
> **GIT TARGET DIRECTIVE:** all implementation commits for this active task must be committed to `origin/main`. Do not create, switch to, commit on, push to, or hand off work from any sub-branch. `main` is the only allowed branch for task commits.

## Goal
Complete the ProManaged IT visual redesign so the site is unmistakably modern and professionally designed: a coherent bento/editorial layout system, modern typography, restrained contemporary colour use, strong visual hierarchy, and responsive behaviour that is verified rather than assumed.

## Wants vs Needs
- **Want:** "update the design, bento inspo, modern fonts."
- **Need:** a visible redesign, not another micro-pass of spacing/shadows. Bento layouts must read as one system across pages, typography must visibly change the brand tone, and the colour system must feel contemporary, calm, and intentional.
- **End user:** prospective IT/SaaS and hardware clients who need quick trust, clear services, and an easy path to contact/book.
- **Friction:** repetitive equal-weight cards, dated heading treatment, inconsistent grid logic, and weak visual hierarchy make the site feel templated.

## Success Moment
Owner loads the homepage and immediately says "this is a different site" before reading the body copy; the same visual language should remain credible across every page.

## Reference Systems
- **Mockuuups Studio bento examples** — take: varied tile sizes, whitespace, modular composition, editorial storytelling. Avoid literal copying.
- **Apple product pages** — take: strong sequencing and varied modular blocks. Avoid imagery-heavy layouts the repo cannot support.
- **Linear** — take: restrained colour, tight display typography, confident whitespace. Avoid dark-theme styling.
- **Vercel** — take: disciplined grid rhythm and subtle borders. Avoid dashboard/data-density styling.

## Completion Criteria (Definition of Done)
- [ ] Every target content/card grid uses the canonical 12-column bento system, `gap: var(--bento-gap)`, and `grid-auto-flow: dense`
- [ ] No target grid uses `auto-fit`, `minmax(...)`, or hardcoded grid gaps
- [ ] Featured tiles visibly vary in span and hierarchy on desktop
- [ ] Hero uses the same bento/editorial language as the rest of the site
- [ ] `--font-display` exists and drives every H1/H2; Inter remains body/UI
- [ ] Heading sizes are fluid via `clamp()` and no breakpoint overrides defeat the fluid tokens
- [ ] All 7 target pages load the identical combined font link
- [ ] Font choice reads as modern/editorial, not default/system/legacy
- [ ] Colour system is contemporary and restrained: neutral/slate base + one blue accent; no new competing accent palettes, neon effects, or decorative gradients
- [ ] Existing token colours are used consistently instead of hardcoded page-specific colours in the changed design files
- [ ] Uppercase/letter-spacing eyebrow treatment is removed where identified as dated
- [ ] Verified in-browser at 375 / 768 / 1280px with zero console errors
- [ ] No horizontal overflow at 375px on any page
- [ ] No `.yml` or `.yaml` files remain in the working tree; temporary YAML is deleted immediately after use
- [ ] All task implementation commits land on `origin/main`; no sub-branch is created or used

## Files to Change
`css/tokens.css`, `css/global_styles.css`, `css/privacy_policy.css`, `css/service_cards.css`, `css/why_band.css`, `css/hero_section.css`, `css/mission_vision.css`, `css/hardware_sourcing.css`, `css/networking.css`, `css/custom_websites.css`, `css/get-started.css`, `css/learn-more.css`, and the `<head>` font links only in these 7 HTML pages: `index.html`, `get-started.html`, `learn_more.html`, `privacy_policy.html`, `pages/custom_websites.html`, `pages/hardware_sourcing.html`, `pages/network_infrastructure.html`.

## Exact Changes
### css/tokens.css
- Section: `Typography`
- Change: use one modern display face via `--font-display`; keep Inter as `--font-sans`; retain a restrained modular/Fluid display scale and tight tracking tokens.
- Section: `Colour`
- Change: preserve the neutral/slate foundation and `#2563eb` blue accent as the only brand accent; remove/avoid any new competing accent colours in changed design styles.
- Section: `Layout`
- Change: define `--bento-gap` and `--bento-cols: 12` as the single grid system source of truth.
- Reason: one token layer prevents visual drift.

### css/global_styles.css
- Change: apply `--font-display`, display tracking, fluid display sizing, and restrained heading weight to H1/H2 without page-specific fixed-size overrides.
- Reason: typography must feel intentionally different everywhere.

### css/privacy_policy.css
- Change: mirror the same H1/H2 display typography because this page does not load `global_styles.css`.
- Reason: avoid one visually inconsistent page.

### All target grid files
- Every target grid container: `grid-template-columns: repeat(var(--bento-cols), 1fr)`, `gap: var(--bento-gap)`, `grid-auto-flow: dense`.
- No `auto-fit`, `minmax(...)`, or hardcoded grid gaps in target grids.
- Every target tile receives an explicit desktop span from the approved table below and responsive span rules only; do not introduce a second grid system.
- Keep tile treatment coherent: token padding, `--radius-lg`, border, restrained shadow, and subtle hover only.

| File | Grid | Approved desktop spans |
|---|---|---|
| service_cards.css | `.services-grid` | featured `12`, other 2 `6` |
| why_band.css | `.why-grid` | `.why-tile-lead` `6`, other 2 `3` |
| hardware_sourcing.css | `.category-grid` | featured `6` each, standard `3` each |
| networking.css | `.network-grid` | `.primary` `6`, next 2 `3`, remaining 4 `3` |
| custom_websites.css | `.steps-strip` | all `3` |
| custom_websites.css | `.projects-grid` | featured `12`, other 3 `4` |
| get-started.css | `.features-grid` | first `12`, other 3 `4` |
| get-started.css | `.services-grid` | `6 / 3 / 3` |
| get-started.css | `.testimonials-grid` | all `4` |
| learn-more.css | `.features-grid` | first `6`, second `6`, remaining 6 `4` |
| footer_promanaged.css | `.footer-content` | leave as-is; not a bento grid |

### css/hero_section.css
- Section: `.hero`, `#hero-title`, `.hero-facts`
- Change: make the hero an unmistakable editorial/bento composition: strong display headline on one side and a real grid-based fact cluster on the other; remove dated uppercase eyebrow styling; use fluid heading size with no fixed breakpoint override.
- Reason: the hero is the first proof that the redesign actually happened.

### css/mission_vision.css
- Change: use the same bento tile language and typography hierarchy; do not reintroduce tabs/modals.
- Reason: storytelling should feel continuous rather than component-by-component.

### All 7 HTML heads
- Change: one identical combined Google Fonts request containing Inter 400/500/600/700 plus the chosen display face at the minimum required weight; keep `preconnect` and `display=swap`.
- Reason: consistent modern typography and consistent loading behaviour.

## New Code Needed
None beyond the scoped CSS changes and existing `<head>` font-link changes.

## Constraints / Things NOT to Touch
- Do not expand scope beyond the exact files above.
- Do not touch `php/`, form-submit JS, booking/contact JS, honeypot fields, or navbar/footer markup.
- No HTML restructuring beyond the listed `<head>` font-link lines.
- Keep the existing light theme.
- Do not introduce additional brand accent colours, neon treatments, heavy gradients, glow effects, or decorative animation.
- Do not revert working functional behaviour.
- Never use bulk line-ending/rewrite scripts.
- **YAML safety:** never commit `.yml` or `.yaml`; temporary YAML must be deleted immediately and verified absent.
- **Git target:** `origin/main` only. No sub-branches, no PR workflow, no force-push.

## Known Trade-offs
- A display serif such as Instrument Serif creates the strongest visible contrast against Inter; if rendering or readability proves poor, use a modern sans display alternative rather than reverting to a generic system font.
- Explicit bento spans are intentional; if content counts change later, spans must be recalculated.

## Open Questions
- None. Use the approved modern/editorial display direction and restrained slate + blue palette.

## Phases
### Final Implementation + Verification
- Goal: finish the design as one coherent pass, not another incremental tuning cycle.
- Exit condition: all Completion Criteria pass, including real browser verification at 375/768/1280px and confirmation that the visual hierarchy, font treatment, bento layout, and colour system are consistent.
- Files: exactly the listed CSS files and 7 HTML `<head>` font links.
