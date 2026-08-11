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
- Change: add `--font-display`; add `--text-display-lg: clamp(2.5rem, 6vw, 4.5rem)` and `--text-display-md: clamp(1.75rem, 3.5vw, 2.75rem)`; add `--tracking-tight: -0.02em`
- Section: `Layout`
- Change: add `--bento-gap: var(--space-5)`
- Reason: one source for the two things that must change everywhere.

### css/global_styles.css
- Change: `h1, h2 { font-family: var(--font-display); letter-spacing: var(--tracking-tight); }`
- Reason: display face applies once, not per file.

### css/privacy_policy.css
- Change: repeat the same `h1, h2` display-font rule here.
- Reason: `privacy_policy.html` loads **only** `tokens.css` + `privacy_policy.css` — it has no `global_styles.css` link, so the rule above can never reach it. Without this the "every H1/H2" criterion silently fails on that one page. Do **not** fix this by adding a stylesheet link; that is out of scope.

### All grid files — canonical system
- Every grid container: `grid-template-columns: repeat(12, 1fr)`, `gap: var(--bento-gap)`, `grid-auto-flow: dense`. Track stays 12 at all breakpoints; **only spans change**. @768px every tile `span 6`. @480px every tile `span 12`.
- Every tile: `padding: var(--space-8)`, `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-sm)`, border `1px solid var(--color-border)`, hover `translateY(-2px)` + `var(--shadow-md)`.
- **Spans are per-grid and must sum to a multiple of 12 — tile counts already verified, use exactly these:**

| File | Grid | Tiles | Spans |
|---|---|---|---|
| service_cards.css | `.services-grid` | 3 | featured `12`, other 2 `6` |
| why_band.css | `.why-grid` | 3 | `.why-tile-lead` `6`, other 2 `3` |
| hardware_sourcing.css | `.category-grid` | 6 (2 featured) | featured `6` each, standard `3` each |
| networking.css | `.network-grid` | 7 (1 `.primary`) | `.primary` `6`, next 2 `3`, remaining 4 `3` |
| custom_websites.css | `.steps-strip` | 4 | all `3` |
| custom_websites.css | `.projects-grid` | 4 (1 featured) | featured `12`, other 3 `4` |
| get-started.css | `.features-grid` | 4 | first `12`, other 3 `4` |
| get-started.css | `.services-grid` | 3 | `6` / `3` / `3` |
| get-started.css | `.testimonials-grid` | 3 (`.testimonial-item`) | all `4` |
| learn-more.css | `.features-grid` | 8 (first featured) | first `6`, 2nd `6`, remaining 6 `4` |
| footer_promanaged.css | `.footer-content` | — | leave as-is (not a bento grid) |

- Reason: four competing column systems is the actual reason it doesn't look designed. Spans must be computed per grid — a blanket `span 4` leaves 8-column holes on the 3-tile and 8-tile grids.
- Delete every hardcoded `gap: 2rem` / `1.5rem` / `1rem` found in `custom_websites.css` (`.projects-grid`, one more grid) and `networking.css` (3 occurrences incl. media queries).

### css/hero_section.css + css/mission_vision.css
- Change: `#hero-title` → `--text-display-lg`; delete the `text-transform: uppercase` + `letter-spacing: 0.04em` eyebrow rules; `.hero-facts` becomes a 2-col bento cluster instead of `flex-direction: column`
- **Also delete any `font-size` override on `#hero-title` inside the 768px/480px media queries** — a fixed override silently defeats `clamp()`. Same check for section `h2`.
- Add the missing `.hero-main` rule (referenced in HTML, has no CSS rule at all).
- Reason: uppercase eyebrows are the dated pattern D15 was supposed to remove; clamp + media override is a latent bug.

### All 7 HTML `<head>`
- Change: **one** combined Google Fonts request (not two `<link>`s) — Inter 400;500;600;700 + display face at **one weight only** — keeping `&display=swap` and both existing `preconnect` tags. Identical string on all 7 pages.
- Reason: pages currently drift; a second render-blocking font request costs LCP on slow mobile connections, which is a real segment of this audience.

## New Code Needed
None beyond CSS rules and one `<link>` swap per page. No new files, no JS.

## Constraints / Things NOT to Touch
- No commits, no pushes, no branch operations.
- **Never run a bulk line-ending/rewrite script.** `tokens.css`, `navbar.css`, `contact_section.css` are CRLF; the rest are LF; a prior script doubled every blank line in 4 files. Edit in place only.
- Do not touch `php/`, any form-submit JS, `js/booking_form.js`, `js/contact__form.js`, honeypot fields, or navbar/footer markup.
- No new colors. Accent stays `#2563eb`. Single light theme.
- Inter stays the body/UI font. Display face is headings only.
- No HTML restructuring — CSS + `<head>` font links only.
- **YAML safety rule: never commit `.yml` or `.yaml` files. If a YAML file is created temporarily for tooling or execution, delete it immediately after use and verify it is absent from the working tree before handoff/review.**
- **Git target rule: `origin/main` is the only permitted commit target. Never create, switch to, commit on, push to, or hand off work from a sub-branch.**

## Known Trade-offs (accepted, not blocking)
- **Serif display on an IT brand** [Medium]: an SMB buyer may read editorial serif as agency/law-firm rather than technical. Accepted because it is the single highest-visibility change available and reverts by editing one token.
- **Second webfont = second render-blocking request** [Medium]: mitigated to one weight + one combined request. Self-hosting stays on the backlog.
- **`--bento-gap` duplicates `--space-5`** [Low]: accepted — it is the enforcement point that stops per-file gap drift returning.
- **Tile spans are hardcoded per grid** [Low]: adding or removing a card later will break the row math until spans are recomputed. Documented in the table above rather than solved with `auto-fit`, because `auto-fit` is what produced the current inconsistency.

## Open Questions
- Display face: defaulting to **Instrument Serif** (headings only) for maximum visible delta against Inter body. Sans-only alternative: **Geist**. Reversible by editing one token — owner can flip after seeing it.
- Reading the 7 HTML files **read-only** is permitted (needed to confirm tile order for nth-child spans). Editing them is limited to the `<head>` font links.
- Live mobile-viewport screenshots have been blocked twice by a `resize_window` limitation. Phase 4 must use a real device-emulation viewport or state plainly that it could not verify.
- Observed but **out of scope** (do not fix in this task): `privacy_policy.html` has no navbar and no footer at all — it is the only page with no site chrome. Flagging for a later decision, not this pass.

## BLOCKED — owner decisions required before Phase 1
1. **No rollback point.** 34 files are modified with zero commits since `bfafb50` (SMTP forms, hardware_sourcing page, vendored PHPMailer, the whole Phase 5 redesign). A CSS-wide rewrite with no commit means a bad result cannot be reverted without destroying that unrelated work. The loop is forbidden from committing. Owner must commit or stash first.
2. **There is no visual content to put in the tiles.** The repo contains exactly one photograph (`images/founder.png`) plus `icon.png`. Every bento reference — Apple, Linear, Vercel — is carried by screenshots, product UI, or photography. A 12-column bento of text-and-FontAwesome-icon tiles is still a page of boxes of text, which is the same complaint the owner already raised. Owner must choose: (a) supply real screenshots/photography, (b) approve a type-and-colour-led tile design (large numerals, accent-filled tiles, oversized type as the visual), or (c) approve budget for stock/illustration.

## Phases
> Execute **one unchecked task at a time**, only after AGENT LEAD approval. Completion Criteria are acceptance tests, not coding tasks.

### Phase 1: Type system
- [ ] **P1. Implement modern type only.** Files: `css/tokens.css`, `css/global_styles.css`, `css/privacy_policy.css`, and font-link lines in the 7 listed HTML pages. Apply the exact typography changes above; do not touch grid CSS. Exit: `--font-display` and fluid sizes exist, every H1/H2 receives the display face, and all 7 font-link strings match.

### Phase 2: Homepage bento proof
- [ ] **P2. Implement the canonical bento system on the homepage only.** Files: `css/service_cards.css`, `css/why_band.css`, `css/hero_section.css`, `css/mission_vision.css`. Use the exact span table above; do not edit HTML. Exit: homepage grids use 12 columns, `--bento-gap`, dense packing, and responsive spans; visual result is browser-reviewed before rollout.

### Phase 3: Rollout
- [ ] **P3. Roll the approved homepage system across remaining grids.** Files: `css/hardware_sourcing.css`, `css/networking.css`, `css/custom_websites.css`, `css/get-started.css`, `css/learn-more.css`. Use the exact span table above. Exit: all listed grids use the canonical system and no listed hardcoded grid gaps remain.

### Phase 4: Verification
- [ ] **P4. Verify; do not redesign.** Browser-test all 7 pages at 375/768/1280px; report console errors, overflow, font loading, and criterion failures. Code changes require a separate fix plan. Exit: all Completion Criteria can be checked by AGENT LEAD.
