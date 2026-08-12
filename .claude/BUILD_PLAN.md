# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Deliver a premium, global ProManaged redesign with one coherent visual system across all seven public pages. Preserve the completed logo-triggered bento navigation and building-block design language; the next implementation focus is a deliberately wider desktop composition and removal of actual Render.com deployment dependencies.

## Wants vs Needs
- Want: the bento hero and large sections feel expansive, modern and high-end on wide screens.
- Need: use desktop space for visual composition without making copy hard to read, navigation unclear, or smaller screens fragile.
- Success moment: at desktop width, the hero and chapter blocks feel architectural and confidently wide, while text remains calm and easy to scan.

## Completion Criteria
- [ ] Visual compositions use more of wide desktop viewports without horizontal overflow.
- [ ] Paragraphs and long-form copy retain an independent readable measure of roughly 55–75 characters per line.
- [ ] Hero, navigation panel, capabilities, founder/story, contact and chapter grids share the same wider composition rules.
- [ ] Desktop real-window and explicit 1440px, 768px and 375px checks show no awkward empty margins, squeezed blocks, broken navigation or unreadably wide text.
- [ ] No Render.com configuration, deploy hook, GitHub integration reference, service environment variable or deployment documentation remains in the repository.
- [ ] The owner separately confirms that the linked Render.com service is disconnected/deleted, auto-deploy is off and Render notifications are off.
- [ ] Forms, booking, PHP endpoints, SMTP, honeypot, links, IDs and accessibility remain functional.

## Files to Change
- `css/tokens.css` — widen shared desktop visual-rail tokens without changing mobile-safe defaults.
- `css/global_styles.css` — separate wide visual rails from narrower readable-copy measures.
- `css/hero_section.css` — widen the hero block composition while retaining headline and supporting-copy measures.
- `css/navbar.css` — widen the logo-triggered bento panel/grid and its desktop tile composition only.
- `css/service_cards.css` — widen Build/Source/Connect visual composition only.
- `css/about_section.css` — widen founder/story composition only.
- `css/mission_vision.css` — widen editorial chapter grid only.
- `css/contact_section.css` — widen contact composition only.
- `css/why_band.css` — widen the visual chapter layout only.
- `.claude/PROJECT_CONTEXT.md` and `.claude/SYSTEM_MAP.md` — update only if a real Render.com deployment reference is found or the shared rail architecture changes.

## Exact Changes
### `css/tokens.css`
- Section: layout tokens `--rail-max`, `--rail-pad`, `--grid-gap`, `--grid-cols`.
- Change: create separate wide visual-rail and text-measure tokens; increase only the large-screen visual rail and reduce excessive large-screen gutters. Keep current tablet/mobile padding unless QA proves a defect.
- Reason: a single rail currently constrains both large visual blocks and readable copy.

### `css/global_styles.css`
- Section: `.rail`, `.container`, paragraph/text measure rules.
- Change: retain `.rail`/`.container` as shared composition wrappers using the wider visual rail; add/use a narrow text wrapper or text measure so prose does not inherit visual-grid width. Do not make all text full width.
- Reason: modern full-bleed composition needs independent typography constraints.

### `css/hero_section.css`
- Section: hero outer rail, visual/content grid, heading and supporting-copy rules.
- Change: allow the block grid and supporting visual unit to occupy the widened rail; preserve headline at about 16ch and supporting copy near 50ch.
- Reason: grow the composition, not line length.

### `css/navbar.css`
- Section: logo trigger, full-viewport navigation panel and destination-tile grid.
- Change: use the wider visual rail for desktop tile spans and reduce unused side margins; preserve keyboard focus styles, focus trap behavior, Escape, scroll lock and mobile panel layout.
- Reason: the navigation should feel like a deliberate bento composition at wide widths.

### Page composition CSS
- Files: `css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css`.
- Change: widen only primary grid/block wrappers and visual media columns; keep existing heading/paragraph `max-width` values unless QA identifies a readability failure.
- Reason: chapter-level blocks should use the screen without turning into stretched text rows.

### Render.com decommission
- Repository audit: search for `render.yaml`, `render.com`, Render deploy hooks, Render GitHub actions, Render-specific environment variables and Render service documentation.
- Change: remove only verified Render.com hosting/deployment references. Do not remove ordinary browser/UI uses of the word `render`, or working mail/form logic.
- External owner task: disable auto-deploy and notifications, then disconnect/delete the linked Render.com service in the Render dashboard.
- Reason: GitHub cleanup cannot stop emails from an externally active Render service.

## Constraints / Things NOT to Touch
- Do not edit HTML or shared JS unless the existing layout markup cannot support the wider grid; if so, stop and report the exact blocker.
- Do not alter PHP endpoints, form field names, SMTP, PHPMailer, honeypot, IDs, working links, legal/privacy copy, navigation accessibility or mobile behavior.
- Do not remove normal UI/documentation uses of the word `render`.
- No new framework, animation library, gradients, parallax, loops, dashboard styling or scope-expanding redesign.
- `main` only; no branches, PRs, force-pushes or YAML files.

## QA Gate
1. Run headed browser at the real available desktop window; record `innerWidth`, `innerHeight`, `clientWidth` and `scrollWidth` for all seven pages.
2. Capture full-page screenshots and inspect rail use, hero balance, section composition, text measure, logo visibility and bento navigation.
3. Repeat explicit checks at 1440px, 768px and 375px.
4. Verify bento open/close, keyboard focus trap, Escape, focus restore, links, contact/booking forms, console errors and horizontal overflow.
5. Verify reduced motion still exposes content immediately.
6. If Render.com account access is unavailable, report the dashboard shutdown as owner-blocked; never claim it passed.

## Phases
### Phase 1: Wide shared composition
- Goal: update tokens, global rail behavior, hero and bento navigation desktop composition.
- Exit condition: the homepage and navigation use wide desktop space cleanly, while text stays readable and mobile behavior is unchanged.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/hero_section.css`, `css/navbar.css`.

### Phase 2: Wide chapter rollout
- Goal: apply the same visual rail to capabilities, founder/story, mission/vision, contact and why-band sections.
- Exit condition: all target chapters use consistent wide composition without changing long-form reading measures.
- Files: `css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css`.

### Phase 3: Render audit and QA
- Goal: remove verified Render.com repository dependencies, obtain owner confirmation of dashboard shutdown, then complete full visual and functional QA.
- Exit condition: all completion criteria pass; owner-only Render dashboard actions are explicitly confirmed or marked blocked.
- Files: only proven Render.com references and relevant `.claude` documentation.