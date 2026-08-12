# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Deliver a premium global ProManaged redesign across all seven public pages. Preserve the logo-triggered bento navigation and building-block visual language. Next work: correct the founder visual treatment, widen desktop compositions, make bento layouts deliberately surprising across desktop/tablet/mobile, increase tasteful device-aware motion, and remove actual Render.com deployment dependencies.

## Wants vs Needs
- Want: a smaller circular HD founder portrait, surprising bento compositions, varied transitions, and more life/motion across every device.
- Need: visual impact without unreadable text, distraction, accessibility regressions, fragile mobile layouts, repetitive card grids, or excessive motion.
- Success moment: the site feels architectural and alive—blocks change scale, position and rhythm as the visitor moves through the site, while content stays calm and easy to use.

## Completion Criteria
- [ ] Founder image is circular across all relevant pages, smaller than the current oversized treatment, crisp, and never stretched or artificially upscaled.
- [ ] Wide desktop compositions have no horizontal overflow, awkward empty margins, or squeezed visual blocks.
- [ ] Long-form text remains independently constrained to roughly 55–75 characters per line.
- [ ] Hero, bento navigation, capabilities, founder/story, contact and chapter grids share the wider composition system.
- [ ] **Bento layouts are intentionally varied on every device:** cards use different spans, aspect ratios, alignments and visual hierarchy rather than repeating the same grid pattern.
- [ ] **At least three distinct bento composition patterns** are used across the site, and the same section does not simply reuse one card geometry at every breakpoint.
- [ ] Desktop, tablet and mobile each have deliberately art-directed compositions; responsive changes are not merely stacked desktop cards.
- [ ] Bento transitions vary by section: blocks can enter from different directions, settle at different depths/scales, or reveal in different stagger groups while remaining part of one coherent motion system.
- [ ] Motion is visibly present on desktop, tablet and mobile, but adapts to device size/performance instead of using identical timings everywhere.
- [ ] Reduced-motion users receive final visible states immediately, without translation, scaling, stagger, or delayed interaction.
- [ ] No animation causes layout shift, obscures content, traps interaction, or produces horizontal overflow.
- [ ] Real desktop, 1440px, 768px and 375px QA passes for founder sizing, bento composition, motion, navigation, forms, links, console and overflow.
- [ ] No Render.com config, deploy hook, GitHub integration reference, Render environment variable, or deployment documentation remains in the repository.
- [ ] Owner separately confirms the linked Render service is disconnected/deleted and its auto-deploy and notifications are disabled.
- [ ] PHP endpoints, SMTP, PHPMailer, honeypot, forms, IDs, links and accessibility remain functional.

## Files to Change
- `css/tokens.css` — separate wide visual-rail/text-measure tokens, responsive bento geometry tokens, motion tokens and founder portrait sizing.
- `css/global_styles.css` — shared wide composition rail, bento geometry helpers, reveal states, reduced-motion fallback and responsive motion variables.
- `css/hero_section.css` — hero composition, varied hero bento layout and initial block-settle motion.
- `css/navbar.css` — responsive bento navigation panel with varied tile spans and tile-specific transitions.
- `css/about_section.css` — circular founder portrait sizing/crop and responsive motion treatment.
- `js/main.js` — existing `data-blocks` IntersectionObserver, capped reveal staggering and device-aware timing only.
- `css/service_cards.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css` — varied bento block geometry and motion only where required.
- `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md` — only if shared architecture or verified Render.com references change.
- Existing founder image asset only if a higher-resolution asset already exists in the repository and is proven appropriate.

## Exact Changes
### Founder portrait
- `css/about_section.css`: replace oversized founder media with a responsive circular portrait using a square media box, `border-radius: 50%`, `object-fit: cover`, and a deliberate face crop.
- `css/tokens.css`: define explicit founder portrait sizes for desktop/tablet/mobile.
- Do not upscale a low-resolution source. If a higher-resolution repository asset exists, use it; otherwise report the limitation.

### Surprising responsive bento system
- Establish a shared bento vocabulary rather than one universal grid: use unequal spans, portrait/square/landscape media ratios, offset blocks, full-width statement blocks, narrow supporting tiles and occasional edge-reaching visual blocks.
- Use at least three distinct patterns across major chapters, for example: **Dominant + satellites**, **Offset editorial split**, and **Mosaic/stepped sequence**. These are composition patterns, not named UI components that need visible labels.
- Do not make every section a bento grid. Alternate bento compositions with large editorial statements and open space so the site has rhythm.
- Desktop: allow 2–4 column compositions with varied row/column spans. One dominant block should normally anchor each bento group, with supporting blocks intentionally unequal.
- Tablet: recompose rather than simply collapse. Use 2-column mosaics, altered spans, portrait/landscape changes and deliberate offsets where they remain readable.
- Mobile: use a carefully art-directed single-column/occasional two-column composition. Cards may become full-width, but vary their heights, media ratios, ordering and reveal direction so the page does not become a repetitive stack of identical rectangles.
- Keep semantic DOM order logical and accessible even when visual ordering changes; avoid CSS ordering that makes keyboard/screen-reader flow confusing.
- Never create horizontal overflow to achieve an “edge” effect. Visual asymmetry must remain inside the viewport.
- Do not use random rotations, tilted cards, excessive overlaps, or decorative chaos. Surprise must come from proportion, spacing, sequencing and transitions—not gimmicks.

### Varied bento transitions
- Build on the existing `data-blocks` and `IntersectionObserver` system; do not add an animation framework or a second reveal system.
- Create a small set of approved transition variants, selected per major bento group rather than randomly: `settle-up`, `settle-side`, `scale-in`, and `sequence-in`.
- Each major bento group may use one dominant transition variant plus one supporting variant. Do not animate every card independently.
- Desktop: approximately 20–32px travel, 1–2% settle scale, 70–110ms capped group stagger, roughly 450–600ms perceived duration.
- Tablet: approximately 14–24px travel with shorter duration/stagger.
- Mobile: approximately 8–16px travel with the shortest stagger and duration.
- Use different transition directions across chapters so scrolling does not feel mechanically identical, but preserve one visual motion language.
- Motion runs once per target group. No scroll replay, bounce, elastic wobble, continuous floating, spinning, layout-property animation, or motion on individual text fragments.
- Hero block group, bento navigation tiles, chapter-level blocks and founder portrait may animate. Privacy copy, form controls and utility text must not receive entrance animation.
- `prefers-reduced-motion`: final visible state immediately; no transform, scale, stagger or delayed interaction.

### Wide composition
- `css/tokens.css`: split visual rail from text measure; widen large-screen visual rails and reduce excessive desktop outer gutters while retaining safe tablet/mobile padding.
- `css/global_styles.css`: `.rail` and `.container` use the wide visual rail; preserve a separate narrow text measure.
- `css/hero_section.css` and `css/navbar.css`: let hero and bento tile compositions occupy the wider rail without making text unreadably wide.
- Page CSS: widen primary visual grids/media columns only; retain heading/paragraph max-width.

### Render.com decommission
- Audit only `render.yaml`, `render.com`, Render deploy hooks, Render GitHub actions, Render-specific environment variables and deployment documentation.
- Remove only verified Render.com hosting/deployment references. Do not remove ordinary UI/documentation uses of the word `render` or working mail/form logic.
- Owner action outside the repo: disable auto-deploy/notifications, then disconnect or delete the Render service.

## Constraints / Things NOT to Touch
- Do not edit HTML or shared JS outside the listed observer behavior unless existing markup cannot support the bento/motion change; then stop and report the blocker.
- Do not change PHP endpoints, field names, SMTP, PHPMailer, honeypot, IDs, working links, privacy/legal copy, navigation accessibility or mobile behavior.
- No framework, gradients, parallax, looping motion, dashboard styling, scope-expanding redesign, branches, PRs, force-pushes or YAML.
- Do not fabricate or artificially upscale founder imagery.
- `main` only.

## QA Gate
1. Run headed browser at the real desktop window; record `innerWidth`, `innerHeight`, `clientWidth` and `scrollWidth` for all seven pages.
2. Capture full-page screenshots; inspect rail use, hero balance, text measure, bento navigation, founder portrait scale/crop and visual variety.
3. Check 1440px, 768px and 375px.
4. At each breakpoint, verify at least three distinct bento composition patterns are visibly distinguishable across the site and that no section becomes a repetitive identical-card stack.
5. Verify transition variants differ between at least three major bento groups while remaining coherent and non-jarring.
6. Verify reveal-once behavior, reduced-motion final state, device-appropriate timings, navigation focus/Escape/focus restore, links, forms, console and overflow.
7. Verify founder image is circular at every breakpoint and does not visually dominate the page.
8. If Render dashboard access is unavailable, report that owner-only step as blocked; never mark it complete.

## Phases
### Phase 1: Founder + wide shared composition
- Goal: resize/circle the founder portrait, establish high-resolution handling, and update shared rails.
- Exit: founder is polished and subordinate to the editorial composition; homepage/navigation use wide space cleanly; text remains readable.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/about_section.css`, `css/hero_section.css`, `css/navbar.css`.

### Phase 1B: Responsive bento + Weighted Block Settle Motion
- Goal: create the varied bento composition system and upgrade hero, chapter, founder and navigation reveals into device-aware transition variants.
- Exit: desktop/tablet/mobile each have deliberately different but coherent compositions; at least three patterns and three transition variants are visible; reduced-motion is immediate; no layout shift or overflow.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/hero_section.css`, `css/navbar.css`, `css/about_section.css`, `js/main.js`, and only existing page CSS containing relevant block rules.

### Phase 2: Wide chapter rollout
- Goal: apply varied bento compositions to capabilities, mission/vision, contact and why-band sections.
- Exit: target chapters use wide visual rails, varied proportions and distinct transition variants without widening long-form copy.
- Files: `css/service_cards.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css`.

### Phase 3: Render audit and QA
- Goal: remove verified Render.com repository dependencies, obtain owner confirmation of external shutdown, then complete visual and functional QA.
- Exit: all criteria pass; owner-only Render work is explicitly confirmed or blocked.
- Files: proven Render.com references and relevant `.claude` docs only.
