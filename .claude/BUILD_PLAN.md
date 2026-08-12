# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Create an original, award-calibre ProManaged website concept: **Signal & Systems** — a human-led technology partner that turns unclear technology problems into practical software, dependable infrastructure, and sourced hardware. The site should feel like a digital design studio and engineering partner, not a generic IT support template.

Use inspiration from strong editorial/agency work: oversized typography, image-led storytelling, horizontal rhythm, confident negative space, bold transitions and restrained micro-interactions. Award-oriented references show that typography, storytelling, transitions and large visual composition are recurring strengths in high-quality agency work. citeturn260629search1turn260629search2turn260629search24

## Wants vs Needs
- **Want:** an award-winning visual concept with completely rewritten copy and a coherent identity across every page.
- **Need:** one recognizable ProManaged system, immediate understanding of the three capabilities, trust without exaggerated claims, and a clear CTA.
- **Audience:** global clients who need software/web apps, hardware sourcing or network infrastructure, with practical reach into markets where access, fulfilment and local payment options matter.
- **Do not lead with exact countries/regions.** Position ProManaged as global and remote-first; mention regional accessibility only where useful in supporting copy.
- **Success Moment:** any page feels unmistakably ProManaged, explains its purpose in seconds, and gives the visitor an obvious next action.

## Core Concept — “Signal & Systems”
Visual language: **editorial technology journal + engineering workshop**.
- Large type introduces ideas, not service-card titles.
- Sections behave like designed chapters: full-width colour fields, image blocks, oversized statements, offset grids and controlled overlaps.
- Warm ivory/stone/graphite base with one electric blue interaction accent; blue never dominates the canvas.
- Use the existing founder image as the human anchor; use icons as small functional marks, not decorative card art.
- Motion is subtle: reveal, hover, underline/shift, and section transitions only. No looping backgrounds, parallax or gimmicks.

## Reference Systems
- K46 — take: human opening, direct positioning, capability-led storytelling, contact-forward rhythm — avoid copying content/layout.
- Editorial/award sites — take: typography as navigation, strong visual pacing, large image blocks and restrained transitions — avoid spectacle without purpose.
- Linear — take: precision, clarity and product-like polish — avoid abstract SaaS jargon.

## Completion Criteria (Definition of Done)
- [ ] All 7 public pages have rewritten, original copy and one visual system.
- [ ] Header and footer are identical in structure and visual treatment across every page.
- [ ] Homepage opens with a full-width statement-led hero and a distinctive visual composition.
- [ ] Every page has 3–5 major editorial chapters with varied block scale; no repetitive equal-card grid as the primary story.
- [ ] Software, hardware and networking are immediately understandable without reading large paragraphs.
- [ ] Founder/story section is substantial and human; factual only.
- [ ] Global positioning is used; exact location is secondary, not the headline identity.
- [ ] `pages/custom_websites.html` contains no prices or pricing tables.
- [ ] No obsolete eBay/RAWG/game/shopping/render references remain in active code/docs.
- [ ] Forms, PHP, SMTP, JS hooks, links and accessibility remain functional.
- [ ] Modern display font + Inter body/UI; strong responsive type scale.
- [ ] Warm-neutral visual system with blue used only as accent/interaction.
- [ ] Playwright reviews every page in the real available headed browser first, full-page screenshots included; then 768px/375px emulation.
- [ ] Zero console errors, overflow, broken links or broken forms.
- [ ] No `.yml`/`.yaml` files remain.
- [ ] Implementation committed directly to `main` and pushed to `origin/main`.

## Files to Change
- `index.html`, `get-started.html`, `learn_more.html`, `privacy_policy.html`
- `pages/custom_websites.html`, `pages/hardware_sourcing.html`, `pages/network_infrastructure.html`
- Shared: `css/tokens.css`, `css/global_styles.css`, `css/navbar.css`, `css/logo.css`, `css/footer_promanaged.css`, `css/hero_section.css`, `css/contact_section.css`
- Page CSS: `css/service_cards.css`, `css/about_section.css`, `css/mission_vision.css`, `css/why_band.css`, `css/get-started.css`, `css/learn-more.css`, `css/custom_websites.css`, `css/hardware_sourcing.css`, `css/networking.css`
- Cleanup audit: current HTML/JS/CSS/PHP plus `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md`, `.claude/agents/*` maps

## Exact Changes
### Copy system — all HTML pages
- Rewrite every marketing sentence in original ProManaged language; do not merely paraphrase the existing headings.
- Voice: direct, calm, confident, technical without jargon, human without hype.
- Positioning: “We make technology work in the real world” conceptually; emphasize outcomes, practical delivery and proximity.
- Global framing: say **global**, **remote**, **cross-border**, **wherever the work needs to happen**; avoid making a country the identity.
- Preserve verified business facts only; no invented case studies, metrics or clients.

### `index.html` — lead experience
- Build chapters: Statement → What we solve → Capabilities → How we work → Founder/Trust → Mission/Vision → Contact.
- Replace card catalogue with unequal editorial blocks and large statements.
- First screen must explain what ProManaged does and offer one primary CTA.

### Shared shell
- `navbar.css` / `logo.css`: one canonical responsive header.
- `footer_promanaged.css`: one canonical editorial footer across all pages.
- `tokens.css` / `global_styles.css`: one palette, type system, spacing, radius, shadow and wide-layout source of truth.
- `hero_section.css`: shared hero grammar with page-specific composition.

### Service pages
- `custom_websites`: software/web apps/SaaS outcomes, process, examples/types, CTA; remove all pricing.
- `hardware_sourcing`: sourcing, fulfilment, verification, delivery and local-payment practicality.
- `network_infrastructure`: connectivity, WiFi, Starlink/fiber, security and maintenance framed around reliability.
- `get-started`: guided “bring us the problem” journey.
- `learn_more`: company philosophy, capability story and how engagement works.
- `privacy_policy`: preserve legal copy; apply canonical shell only.

### Cleanup
- Audit every script/style reference.
- Remove proven-unused eBay/RAWG/game/shopping/render/server-variant code and stale docs.
- Never remove working form/mail/honeypot paths without proof they are unused.

## Playwright QA — MANDATORY
1. Launch headed browser at the real available window size; do not set an artificial primary desktop viewport.
2. Record `window.innerWidth`, `window.innerHeight`, `document.documentElement.clientWidth`, `document.documentElement.scrollWidth` for every page.
3. Capture full-page screenshots of all 7 pages and review consistency.
4. Then use 768px and 375px emulation for secondary responsive checks.
5. Test navigation, mobile menu, CTAs, contact/booking forms, fonts, internal links and console.
6. Do not claim visual QA unless it was actually performed.

## Constraints / Things NOT to Touch
- Do not copy K46 or any reference site's text, artwork, branding or exact layout.
- Do not invent facts, clients, awards, metrics or imagery.
- Preserve PHP endpoints, form field names, JS paths, SMTP and honeypot behaviour.
- No site-wide dark mode, decorative gradients, parallax or looping animation.
- No hardcoded colours outside `tokens.css`.
- No new external image dependency unless explicitly approved.
- No sub-branches, PRs, detached work or force-pushes; `main` → `origin/main` only.
- Never commit YAML.

## Known Trade-offs
- The concept prioritizes brand clarity and editorial quality over maximal UI density.
- Existing assets limit photography variety; typography, composition, founder imagery and controlled colour blocks must carry the visual identity.

## Open Questions
None. Make autonomous design and copy decisions within these constraints.

## Phases
### Phase 1: Concept + shared system
- Goal: establish Signal & Systems direction, global copy voice, typography, palette, header, footer and layout primitives.
- Exit: homepage visibly establishes the new identity.
- Files: shared shell + `index.html`.

### Phase 2: Full-site rollout
- Goal: rewrite and redesign all remaining public pages to the same standard; remove software pricing.
- Exit: no page looks like a leftover template.
- Files: secondary pages + page CSS.

### Phase 3: Cleanup + verification
- Goal: remove proven-unused legacy logic/docs and complete Playwright visual/functional QA.
- Exit: all criteria pass and commit is pushed to `origin/main`.
- Files: cleanup audit + fixes only.
