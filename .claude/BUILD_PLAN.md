# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Deliver a premium global ProManaged redesign across all seven public pages. Preserve the completed logo-triggered bento navigation and building-block visual language. Next work: correct the founder visual treatment, widen desktop compositions, increase tasteful device-appropriate motion, and remove actual Render.com deployment dependencies.

## Wants vs Needs
- Want: a smaller, polished circular HD founder portrait and more life/motion across desktop, tablet and mobile.
- Need: visual impact without oversized photography, unreadable text, distraction, accessibility regressions, fragile layouts, or excessive motion.
- Success moment: the founder feels present but not overpowering, while blocks and images move with a premium sense of depth as the visitor loads and scrolls.

## Completion Criteria
- [ ] Founder image is displayed as a **circular portrait** across all relevant pages; it is not a large rectangular/cropped hero photograph.
- [ ] Founder image is rendered at a deliberate premium display size with a high-resolution source; do not upscale a low-resolution source. Preserve aspect ratio and use a crisp circular crop.
- [ ] If the existing `images/founder.png` is insufficiently sharp for the intended display size, Claude must use an existing higher-resolution repository asset if one exists; otherwise report the limitation instead of fabricating or downloading an unapproved image.
- [ ] Founder portrait has responsive sizing: clearly smaller on desktop than the current oversized treatment, proportionally smaller on tablet/mobile, and never dominates adjacent copy.
- [ ] Wide desktop compositions have no horizontal overflow, awkward empty margins, or squeezed visual blocks.
- [ ] Long-form text remains independently constrained to roughly 55–75 characters per line.
- [ ] Hero, bento navigation, capabilities, founder/story, contact and chapter grids share the wider composition system.
- [ ] Major hero/chapter/bento reveals use one restrained Weighted Block Settle motion language.
- [ ] Motion is visibly present on desktop, tablet and mobile, but adapts to device size/performance instead of using identical timings everywhere.
- [ ] Desktop gets the richest motion treatment; tablet uses shorter/smaller stagger; mobile uses the shortest, lightest motion while remaining visibly animated.
- [ ] Founder portrait may use a subtle one-time reveal/settle and restrained hover/focus treatment, but must not continuously pulse, float or spin.
- [ ] Reduced-motion users receive final visible states immediately, without translation, scaling, stagger, or delayed interaction.
- [ ] No animation causes layout shift, obscures content, traps interaction, or produces horizontal overflow.
- [ ] Real desktop, 1440px, 768px and 375px QA passes for founder sizing, motion, navigation, forms, links, console and overflow.
- [ ] No Render.com config, deploy hook, GitHub integration reference, Render environment variable, or deployment documentation remains in the repository.
- [ ] Owner separately confirms the linked Render service is disconnected/deleted and its auto-deploy and notifications are disabled.
- [ ] PHP endpoints, SMTP, PHPMailer, honeypot, forms, IDs, links and accessibility remain functional.

## Files to Change
- `css/tokens.css` — separate wide visual-rail/text-measure tokens plus responsive motion tokens and founder portrait sizing tokens.
- `css/global_styles.css` — shared wide composition rail, reveal states, reduced-motion fallback, responsive motion variables.
- `css/hero_section.css` — hero composition, founder/hero block motion only.
- `css/navbar.css` — desktop/tablet/mobile bento panel grid and bento-tile settle motion only.
- `css/about_section.css` — circular founder portrait sizing/crop and responsive motion treatment.
- `js/main.js` — existing `data-blocks` IntersectionObserver, capped reveal staggering, device-aware timing only.
- `css/service_cards.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css` — widen visual block wrappers and/or tune block motion only where required.
- `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md` — only if shared architecture or verified Render.com references change.
- Existing founder image asset only if a higher-resolution asset already exists in the repository and is proven appropriate.

## Exact Changes
### Founder portrait
- `css/about_section.css`: replace the oversized founder media treatment with a responsive circular portrait. Use `border-radius: 50%` and a square media box so the crop remains crisp and predictable.
- `css/tokens.css`: define explicit founder portrait sizes for desktop/tablet/mobile rather than relying on the general image width.
- Desktop target: portrait should read as a strong supporting visual, not the dominant page block; start from a moderate size and tune visually in Playwright.
- Tablet/mobile target: reduce proportionally so the portrait never pushes the story content below the fold unnecessarily.
- Use `object-fit: cover` and preserve a clear face crop. Do not distort the source.
- If a higher-resolution repository founder asset exists, use it; otherwise keep the existing source and do not invent a new image.

### Responsive motion system
- Build on the existing `data-blocks` and `IntersectionObserver` system in `js/main.js`; do not add an animation framework or a second reveal system.
- Use one shared motion vocabulary: initial load assembly, chapter settle, bento-nav tile entrance, subtle media reveal, and restrained hover/focus.
- Desktop: approximately 20–32px travel, 1–2% settle scale, 70–110ms capped group stagger, and roughly 450–600ms perceived duration.
- Tablet: reduce travel to roughly 14–24px and shorten duration/stagger so motion remains quick and clear.
- Mobile: reduce travel to roughly 8–16px, use the smallest stagger, and avoid any effect that makes scrolling feel slow.
- Detect coarse/mobile interaction or narrow viewport where useful and choose the lighter motion profile; do not create separate animation systems.
- Motion must run once per target section, not continuously and not on every scroll pass.
- One tiny landing overshoot is allowed; repeated bounce, elastic wobble, scroll replay, layout-property animation, and motion on every text element are prohibited.
- Hero block group, bento navigation tiles, chapter-level blocks, and the founder portrait may animate. Privacy copy, form controls, and utility text must not receive entrance animation.
- Preserve focus trap, Escape, focus restore, scroll lock, links and form behavior while navigation motion runs.
- `prefers-reduced-motion`: final visible state immediately; no transform, scale, stagger, or delayed interaction.

### Wide composition
- `css/tokens.css`: split visual rail from text measure; widen only large-screen visual rails and reduce excessive desktop outer gutters. Keep tablet/mobile-safe padding unless QA proves a defect.
- `css/global_styles.css`: `.rail` and `.container` use the wide visual rail; preserve a separate narrow text measure. Do not make paragraphs full width.
- `css/hero_section.css` and `css/navbar.css`: let hero and bento tile compositions occupy the wider rail; preserve headline/support-copy measures and all existing keyboard/focus behavior.
- Page CSS: widen primary grids/media columns only; retain heading/paragraph `max-width` unless readability QA proves a failure.

### Render.com decommission
- Audit only `render.yaml`, `render.com`, Render deploy hooks, Render GitHub actions, Render-specific environment variables and deployment documentation.
- Remove only verified Render.com hosting/deployment references. Do not remove ordinary UI/documentation uses of the word `render` or working mail/form logic.
- Owner action outside the repo: disable auto-deploy/notifications, then disconnect or delete the Render service.

## Constraints / Things NOT to Touch
- Do not edit HTML or shared JS outside the listed observer behavior unless the existing markup cannot support the change; then stop and report the blocker.
- Do not change PHP endpoints, field names, SMTP, PHPMailer, honeypot, IDs, working links, privacy/legal copy, navigation accessibility or mobile behavior.
- No framework, gradients, parallax, looping motion, dashboard styling, scope-expanding redesign, branches, PRs, force-pushes or YAML.
- Do not fabricate or artificially upscale founder imagery.
- `main` only.

## QA Gate
1. Run headed browser at the real desktop window; record `innerWidth`, `innerHeight`, `clientWidth` and `scrollWidth` for all seven pages.
2. Capture full-page screenshots; inspect rail use, hero balance, text measure, bento navigation, founder portrait scale/crop and motion.
3. Check 1440px, 768px and 375px.
4. Verify reveal-once behavior, reduced-motion final state, device-appropriate timings, navigation focus/Escape/focus restore, links, forms, console and overflow.
5. Verify founder image is circular at every breakpoint and does not visually dominate the page.
6. If Render dashboard access is unavailable, report that owner-only step as blocked; never mark it complete.

## Phases
### Phase 1: Founder + wide shared composition
- Goal: resize/circle the founder portrait, establish high-resolution handling, and update shared rails.
- Exit: founder is polished and subordinate to the editorial composition; homepage/navigation use wide space cleanly; text remains readable.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/about_section.css`, `css/hero_section.css`, `css/navbar.css`.

### Phase 1B: Responsive Weighted Block Settle Motion
- Goal: upgrade existing hero, chapter, founder and bento reveals into one restrained device-aware motion language.
- Exit: desktop/tablet/mobile all have visible but appropriate motion; reduced-motion is immediate; no layout shift or overflow.
- Files: `js/main.js`, `css/global_styles.css`, `css/hero_section.css`, `css/navbar.css`, and only existing page CSS containing reveal rules.

### Phase 2: Wide chapter rollout
- Goal: apply the wide visual rail to capabilities, mission/vision, contact and why-band sections.
- Exit: target chapters use consistent wide compositions without widening long-form copy.
- Files: `css/service_cards.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css`.

### Phase 3: Render audit and QA
- Goal: remove verified Render.com repository dependencies, obtain owner confirmation of external shutdown, then complete visual and functional QA.
- Exit: all criteria pass; owner-only Render work is explicitly confirmed or blocked.
- Files: proven Render.com references and relevant `.claude` docs only.