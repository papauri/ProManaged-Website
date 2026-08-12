# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Deliver one complete award-calibre, global ProManaged redesign: premium editorial technology studio, original copy, distinctive building-block motion, logo-triggered bento navigation, and one coherent visual system across all 7 public pages.

## Core Rules
- Global positioning; do not introduce exact countries/regions in new marketing headlines.
- Build / Source / Connect are the three service routes.
- Plus Jakarta Sans across all text roles; modern fluid scale.
- Warm ivory/stone/graphite base; blue is secondary accent only.
- No gradients, parallax, looping animation, dashboard styling, or excessive cards.
- `main` → `origin/main` only; never commit YAML.

## Render Decommission — Hosting Only
- “Render” means **Render.com hosting/deployment logic only**. Do not remove normal UI uses of the word render.
- Audit and remove any actual Render.com config, deploy hook, GitHub integration reference, Render environment variable, or Render documentation.
- Verify no `render.yaml`, Render workflow/action, deploy hook, or active Render reference remains in the repo.
- External prerequisite: in the Render dashboard, disconnect/delete the Render service, disable auto-deploy, and disable Render notifications. Do not claim this external step is complete unless verified by the owner.

## Wide Bento Composition
- Expand visual desktop rails for hero, bento navigation, capabilities, founder/story, contact and major chapter grids.
- Use full-bleed section surfaces with a wider inner visual grid; **do not** stretch paragraphs/headings edge-to-edge.
- Constrain reading measures independently (target ~55–75 characters/line).
- Reduce excessive desktop outer gutters while preserving safe tablet/mobile padding.
- Review at the real desktop window plus explicit 1440px, 768px and 375px checks.
- Acceptance: no horizontal overflow, awkward empty margins, squeezed visual blocks, or unreadably wide text.

## Required Site Features
- All 7 pages share identical header/footer, typography, spacing, buttons and visual language.
- Traditional navbar is removed. Use the existing logo visibly in the hero as a trigger for a full-viewport bento navigation panel; accessible focus trap/Escape/focus restore required.
- `index.html`: Hero → What ProManaged Is → Build/Source/Connect → How We Work → Founder/Story → Mission/Vision → Contact → Footer.
- Software page: zero visible prices/pricing tables.
- Building-block load animation plus chapter-level scroll reveals; non-blocking and reduced-motion safe.
- Legacy eBay/RAWG/game/shopping/render-pipeline references removed only when proven obsolete; working forms/PHP/SMTP/honeypot preserved.

## Files
`index.html`, `get-started.html`, `learn_more.html`, `privacy_policy.html`, `pages/custom_websites.html`, `pages/hardware_sourcing.html`, `pages/network_infrastructure.html`; shared/page CSS listed in the repository plan; smallest required shared JS; `.claude` maps/docs only where obsolete references are proven.

## Playwright QA — Mandatory
1. Headed browser at real available window size first; no custom primary desktop viewport.
2. Record `window.innerWidth`, `window.innerHeight`, `clientWidth`, `scrollWidth` on every page.
3. Full-page screenshots for all 7 pages.
4. Review width usage, typography, bento navigation, block transitions, logo visibility, header/footer consistency, and text measure.
5. Then test 1440px, 768px, 375px; verify nav, forms, links, fonts, console and overflow.
6. Verify reduced-motion and at least two scroll-triggered block reveals.

## Completion Criteria
- [ ] Full-site redesign visibly differs from the old site and feels premium/confident.
- [ ] Wide bento composition uses desktop space without unreadable text.
- [ ] Logo-triggered bento navigation works on desktop/mobile and is accessible.
- [ ] Render.com hosting/deploy logic is removed from repo; external dashboard shutdown is separately confirmed.
- [ ] No pricing on software page.
- [ ] No dead/legacy references or broken assets.
- [ ] All functional forms/endpoints remain intact.
- [ ] Playwright QA passes all 7 pages at required sizes.
- [ ] Changes committed to `main` and pushed to `origin/main`.

## Phases
### Phase 1: Shared system + homepage
- Goal: typography, wide visual grid, bento nav, motion, homepage redesign.
- Exit: homepage establishes the complete visual system.

### Phase 2: Full-site rollout + pricing removal
- Goal: apply the system to all pages and remove software pricing.
- Exit: no page looks like a legacy template.

### Phase 3: Render/legacy cleanup + QA
- Goal: remove obsolete hosting/code references, verify external Render shutdown with owner, then complete Playwright checks.
- Exit: all criteria pass and final work is pushed to `origin/main`.