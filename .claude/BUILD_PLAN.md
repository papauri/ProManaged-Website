# Build Plan: ProManaged IT — Refined Signal & Systems

## Goal
Return the site to the balanced editorial hero/composition that was working before the over-wide pass, then modernise it through richer evidence, stronger bento variety and **slow, deliberate building-block motion**. The site should feel premium, calm and confident—not stretched or over-animated.

## Wants vs Needs
- Want: modern bento layouts, subtle project/interface evidence, richer sections, slow transitions and a strong founder presentation.
- Need: preserve the working ProManaged visual system, forms, emails, navigation, accessibility and business facts.
- End user: global individuals, founders, families, teams and organisations that need software, hardware sourcing or connectivity without enterprise overhead.
- Success moment: the visitor sees a distinctive technology studio with real evidence of capability and feels confident about starting a conversation.

## Completion Criteria
- [ ] Hero uses the established balanced 7/5 editorial composition; no forced full-width visual stretching beyond the approved 1880px rail.
- [ ] Buttons use the existing `.btn` system and remain visually stable across hover/focus/active states.
- [ ] Sections retain intentional bento variety without becoming oversized empty canvases.
- [ ] Project evidence is anonymous and visual: interface fragments, dashboards, booking/product screens, network diagrams or controller/interface motifs where assets are verified; never name a client/project unless explicitly approved.
- [ ] No fabricated metrics, clients, testimonials, awards or project claims.
- [ ] Founder section remains a strong editorial composition with a genuinely circular 800×800 portrait, deliberate crop and responsive sizing.
- [ ] Build / Source / Connect remain the three clear capabilities, with Build visually dominant.
- [ ] Motion is visible but slow and premium: hero assembly on load, chapter reveals while scrolling, bento navigation assembly and founder reveal.
- [ ] Motion uses transform/opacity only, has varied direction/scale, and settles once without cartoon bounce, parallax or looping movement.
- [ ] Motion is slower on larger screens and appropriately shortened on tablet/mobile; reduced-motion shows final states immediately.
- [ ] Contact/booking forms and branded internal/customer emails remain functional and unchanged in their backend contracts.
- [ ] No software-page pricing, Render.com deployment logic, YAML commits, branches or PRs.

## Files to Change
- `css/tokens.css` — balanced 1880px visual rail and slow responsive motion tokens.
- `css/hero_section.css` — balanced hero composition and motion-ready geometry.
- `css/about_section.css` — circular founder portrait, crop and editorial layout.
- `css/global_styles.css` — only shared styling required for approved motion/bento behaviour; preserve the current button system.
- `css/why_band.css` — preserve evidence mosaic without oversized desktop stretching.
- `js/main.js` — slow, one-time load/scroll block choreography using the existing observer.
- `index.html` — anonymous visual/project evidence only where verified; do not add client names.
- `.claude/PROJECT_CONTEXT.md` — record the balanced composition and slow-motion design contract.
- `.claude/SYSTEM_MAP.md` — update only if architecture changes.

## Exact Changes
### Hero
- `css/hero_section.css`
- Keep the established 7fr/5fr desktop split and the existing 1600px+ refinement.
- Keep text measures constrained while allowing the visual column to breathe naturally.
- Do not create a new oversized desktop rail or a new hard max-width smaller than `--rail-visual`.

### Evidence / content richness
- `index.html` + `css/why_band.css`
- Retain or add small, anonymous interface/project snapshots only when backed by repository assets or clearly presented as illustrative UI fragments.
- Prefer subtle evidence: dashboard fragments, booking flow panels, product UI, network topology, hardware detail and controller/interface motifs.
- Use crops and small metadata labels as supporting content—not giant stock-photo sections.
- Do not expose a hotel/client/project name in public marketing copy.

### Founder
- `css/about_section.css` + `index.html`
- Preserve the 800×800 portrait as a true circular crop using `width`, `height`, `aspect-ratio`, `border-radius:50%`, `overflow:hidden`, `object-fit:cover` and deliberate `object-position`.
- Keep the portrait important but not oversized; support it with founder identity, Build/Source/Connect markers and one strong statement.

### Slow Building Blocks
- `css/tokens.css` + `js/main.js`
- Initial hero assembly: roughly 800–1000ms with ~100–130ms stagger.
- Scroll chapter reveals: roughly 700–900ms with ~90–120ms stagger.
- Tablet/mobile: reduce travel and total duration while keeping the motion perceptible.
- Approved variants: `settle-up`, `settle-side`, `scale-in`, `sequence-in`.
- Choose variants per chapter; do not randomise.
- One tiny landing overshoot is acceptable; no second bounce.
- Trigger slightly before the chapter enters the viewport so the visitor sees the composition arrive.
- Clear classes only after the complete transition, with a safety timeout that can never leave content hidden.
- `prefers-reduced-motion`: final state immediately with no transform/stagger/delay.

### Controls / buttons
- `css/global_styles.css`
- Do not redesign the button component while changing motion/layout.
- Preserve `.btn`, `.primary`, `.secondary`, focus-visible, hover and active behaviour.

## Constraints / NOT TO TOUCH
- Keep PHP endpoints, form field names, SMTP, PHPMailer, honeypot, accessibility labels, working links and email contracts intact.
- Do not introduce frameworks, animation libraries, gradients, parallax, infinite animations, dashboard styling or modal flows.
- Do not fabricate or download unverified project imagery.
- Do not name clients/projects in marketing copy; show interface evidence anonymously.
- `privacy_policy.html` legal copy remains unchanged.
- Work only on `main`. Never create a branch or PR.
- Never commit `.yml` or `.yaml` files.

## Phases
### Phase 1: Restore balanced baseline
- Goal: return hero/section geometry and buttons to the known balanced state and keep the founder circular.
- Exit: no over-wide visual island, buttons stable, founder portrait correct.
- Files: `css/tokens.css`, `css/hero_section.css`, `css/global_styles.css`, `css/about_section.css`, `css/why_band.css`.

### Phase 2: Modern evidence + slow motion
- Goal: make the site richer without stretching it—anonymous project/interface evidence plus deliberate slow Building Blocks transitions.
- Exit: evidence feels native to the design and motion is visible on initial load and during scroll without becoming distracting.
- Files: `index.html`, `css/why_band.css`, `css/hero_section.css`, `css/about_section.css`, `js/main.js`, `css/tokens.css`.

### Phase 3: Final consistency
- Goal: ensure the refined baseline is consistent across pages, forms, navigation and email touchpoints.
- Exit: no button regressions, no pricing, no Render deployment references and no new unverified claims.
- Files: only scoped fixes discovered in Phases 1–2 plus `.claude/PROJECT_CONTEXT.md` / `.claude/SYSTEM_MAP.md` if required.
