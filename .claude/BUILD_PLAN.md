# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Deliver a premium global ProManaged redesign across all seven public pages. Preserve the completed logo-triggered bento navigation and building-block visual language. Next work: wider desktop compositions, restrained physics-inspired motion, and removal of actual Render.com deployment dependencies.

## Wants vs Needs
- Want: wide modern bento hero/sections and scroll motion with spring-like character.
- Need: visual impact without unreadable text, distraction, accessibility regressions, fragile mobile layouts, or wasted implementation scope.
- Success moment: the site feels architectural and alive—wide blocks settle confidently as they enter view while content stays calm and easy to use.

## Completion Criteria
- [ ] Wide desktop compositions have no horizontal overflow, awkward empty margins, or squeezed visual blocks.
- [ ] Long-form text remains independently constrained to roughly 55–75 characters per line.
- [ ] Hero, bento navigation, capabilities, founder/story, contact and chapter grids share the wider composition system.
- [ ] Major hero/chapter/bento reveals use one restrained Weighted Block Settle motion language.
- [ ] Reduced-motion users receive final visible states immediately, without translation, scaling, or stagger.
- [ ] Real desktop, 1440px, 768px and 375px QA passes for motion, navigation, forms, links, console and overflow.
- [ ] No Render.com config, deploy hook, GitHub integration reference, Render environment variable, or deployment documentation remains in the repository.
- [ ] Owner separately confirms the linked Render service is disconnected/deleted and its auto-deploy and notifications are disabled.
- [ ] PHP endpoints, SMTP, PHPMailer, honeypot, forms, IDs, links and accessibility remain functional.

## Files to Change
- `css/tokens.css` — separate wide visual-rail and text-measure tokens.
- `css/global_styles.css` — shared wide composition rail and transform/opacity reveal states.
- `css/hero_section.css` — hero composition and initial block-settle motion only.
- `css/navbar.css` — desktop bento panel grid and bento-tile settle motion only.
- `js/main.js` — existing `data-blocks` IntersectionObserver and capped reveal staggering only.
- `css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css` — widen visual block wrappers only where required.
- `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md` — only if shared architecture or verified Render.com references change.

## Exact Changes
### Wide composition
- `css/tokens.css`: split visual rail from text measure; widen only large-screen visual rails and reduce excessive desktop outer gutters. Keep tablet/mobile-safe padding unless QA proves a defect.
- `css/global_styles.css`: `.rail` and `.container` use the wide visual rail; preserve a separate narrow text measure. Do not make paragraphs full width.
- `css/hero_section.css` and `css/navbar.css`: let hero and bento tile compositions occupy the wider rail; preserve headline/support-copy measures and all existing keyboard/focus behavior.
- Page CSS: widen primary grids/media columns only; retain heading/paragraph `max-width` unless readability QA proves a failure.

### Weighted Block Settle Motion
- Build on the existing `data-blocks` and `IntersectionObserver` system in `js/main.js`; do not add an animation framework or a second reveal system.
- Major block groups enter once with transform/opacity only: approximately 20–32px rise, subtle 1–2% scale settle, 70–110ms capped group stagger, and roughly 450–600ms perceived duration.
- One tiny landing overshoot is allowed; repeated bounce, elastic wobble, scroll replay, layout-property animation, and motion on every text element are prohibited.
- Apply to hero block groups, chapter-level visual blocks and bento navigation tiles only—not privacy copy, individual form controls, or unrelated components.
- Preserve focus trap, Escape, focus restore, scroll lock, links and form behavior while navigation motion runs.
- `prefers-reduced-motion`: all target content uses final visible state immediately; no transform, scale, stagger, or delayed interaction.

### Render.com decommission
- Audit only `render.yaml`, `render.com`, Render deploy hooks, Render GitHub actions, Render-specific environment variables and deployment documentation.
- Remove only verified Render.com hosting/deployment references. Do not remove ordinary UI/documentation uses of the word `render` or working mail/form logic.
- Owner action outside the repo: disable auto-deploy/notifications, then disconnect or delete the Render service.

## Constraints / Things NOT to Touch
- Do not edit HTML or shared JS outside the listed observer behavior unless the existing markup cannot support the change; then stop and report the blocker.
- Do not change PHP endpoints, field names, SMTP, PHPMailer, honeypot, IDs, working links, privacy/legal copy, navigation accessibility or mobile behavior.
- No framework, gradients, parallax, looping motion, dashboard styling, scope-expanding redesign, branches, PRs, force-pushes or YAML.
- `main` only.

## QA Gate
1. Run headed browser at the real desktop window; record `innerWidth`, `innerHeight`, `clientWidth` and `scrollWidth` for all seven pages.
2. Capture full-page screenshots; inspect rail use, hero balance, text measure, bento navigation and motion.
3. Check 1440px, 768px and 375px.
4. Verify reveal-once behavior, reduced-motion final state, navigation focus/Escape/focus restore, links, forms, console and overflow.
5. If Render dashboard access is unavailable, report that owner-only step as blocked; never mark it complete.

## Phases
### Phase 1: Wide shared composition
- Goal: update shared rails, hero and desktop bento composition.
- Exit: homepage/navigation use wide space cleanly; text remains readable; mobile is unchanged.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/hero_section.css`, `css/navbar.css`.

### Phase 1B: Weighted Block Settle Motion
- Goal: upgrade existing hero, chapter and bento reveals into one restrained spring-settle motion language.
- Exit: target motion is premium, accessible, reduced-motion safe, non-repeating and free of layout shift or overflow.
- Files: `js/main.js`, `css/global_styles.css`, `css/hero_section.css`, `css/navbar.css`, and only existing page CSS containing reveal rules.

### Phase 2: Wide chapter rollout
- Goal: apply the wide visual rail to capabilities, founder/story, mission/vision, contact and why-band sections.
- Exit: target chapters use consistent wide compositions without widening long-form copy.
- Files: `css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css`.

### Phase 3: Render audit and QA
- Goal: remove verified Render.com repository dependencies, obtain owner confirmation of external shutdown, then complete visual and functional QA.
- Exit: all criteria pass; owner-only Render work is explicitly confirmed or blocked.
- Files: proven Render.com references and relevant `.claude` docs only.