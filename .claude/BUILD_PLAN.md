# ProManaged IT — EXECUTION BUILD PLAN

## 0. NON-NEGOTIABLE BASELINE

The site is a premium, human-led technology studio website built around **Build / Source / Connect**.

The correct visual baseline is the balanced editorial composition that existed before the wide-desktop experiment.

**Do not return to the oversized full-canvas layout.**

### Hard layout rules
- Desktop composition rail: **1880px maximum**.
- The rail is centred with responsive side padding.
- The hero desktop split is **7fr / 5fr**.
- Hero visual cards must live in a real stacked/grid flow; no child may overlap another at any desktop width.
- Text measures remain independently capped; never let a 4K/ultrawide monitor create enormous paragraphs.
- Full-bleed section backgrounds are allowed; the content rail is not full-canvas.
- Bento cards may have unequal spans and offsets, but the overall composition must remain balanced.

### Hard visual rules
- No traditional horizontal navbar.
- The persistent ProManaged logo tile opens the bento navigation panel.
- Plus Jakarta Sans remains the sole site typeface unless an explicit future design decision changes it everywhere.
- Existing `.btn`, `.primary`, `.secondary`, `.hero-buttons` classes are canonical. Do not rename them.
- All CTA anchor buttons must share one intentional ProManaged interaction language: structured padding, strong contrast, clear hover/focus/active states, subtle directional cue, and no generic “plain blue pill” appearance.
- Footer CTA buttons must use the same button system but adapt contrast to the graphite footer.
- Founder portrait is circular and based on the existing 800×800 asset.
- Footer must remain present and use the canonical `.footer` structure/classes.

## 1. CURRENT PRODUCT CONTRACT

### Public capabilities
1. **Build** — custom web apps, SaaS platforms and business websites.
2. **Source** — hardware sourcing, purchasing, shipping and delivery.
3. **Connect** — network infrastructure, connectivity, WiFi, cabling, security and monitoring.

### Audience
Global individuals, founders, families, small teams and organisations. Avoid implying a single geographic market. Local delivery/payment realities can be described without making the company appear geographically restricted.

### Trust standard
Every visual and sentence must increase confidence. Never fabricate:
- clients;
- project names;
- metrics;
- awards;
- testimonials;
- logos;
- certifications;
- project outcomes.

Anonymous interface fragments are allowed when they are genuinely present in repository assets or clearly labelled as illustrative UI.

## 2. FILE OWNERSHIP

### Design tokens
`css/tokens.css`
- Owns colours, type, spacing, radii, shadows, rail width and motion timings.
- `--rail-visual` MUST remain `1880px`.

### Global design
`css/global_styles.css`
- Owns reset, typography, rail, grid, blocks, buttons, shared motion primitives and accessibility utilities.
- Do not break `.btn`, `.primary`, `.secondary`, `.hero-buttons`.
- Button styling must remain globally consistent across hero, cards, footer and forms.

### Hero
`css/hero_section.css`
- Desktop: **7fr / 5fr**.
- Hero visual uses explicit safe rows: feature → evidence mosaic → support. The evidence mosaic may become two columns, but support must always occupy its own row.
- No negative margin, absolute positioning or transform may be used to make `hero-support` visually overlap the evidence row.
- Tablet/mobile: stack/recompose cleanly.

### Founder
`css/about_section.css`
- Use the existing founder image.
- Circular crop: `border-radius: 50%`, square aspect ratio, `object-fit: cover`.
- Keep the portrait visually important but restrained.

### Motion
`js/main.js` + `css/global_styles.css` + `css/tokens.css`
- Use IntersectionObserver and the existing `data-blocks` system.
- Motion is one-time per chapter, not looping.
- Approved variants only: `settle-up`, `settle-side`, `scale-in`, `sequence-in`.
- Animate only opacity and transform.
- No parallax, no perpetual floating, no animation libraries.

### Footer
`css/footer_promanaged.css`
- Canonical selector is `.footer`.
- Homepage must use the canonical `.footer` tree; do not rely on `.footer-promanaged` compatibility markup.
- Footer CTA uses the canonical button language with dark-surface contrast.

## 3. CURRENT FIX PHASE — HERO + CTA SYSTEM

### Phase F — Remove overlap and replace generic CTA styling
Goal: make the hero structurally safe at large sizes and make every CTA anchor look deliberate and premium.

#### Hero geometry
- `css/hero_section.css`
- Preserve 7fr/5fr.
- Give `.hero-visual` explicit non-overlapping rows using content-driven sizing (`auto`/`minmax`) rather than a fixed stack that can overflow its parent.
- `.hero-feature`, `.hero-project-grid`, and `.hero-support` must each occupy their own grid area/row.
- Remove any visual transform that can collide with adjacent rows on large screens; if a card needs asymmetry, use padding/row alignment inside its row instead.
- At 1440px, 1600px, 1920px and 2560px equivalent widths, `hero-support` must remain completely below the evidence row with visible separation.
- Mobile may stack to one column.

#### CTA/button language
- `css/global_styles.css`
- Preserve the existing class names and semantics.
- Upgrade all `.btn` anchors to a premium editorial control: confident height, slightly rounded geometry, subtle border/shadow, visible directional cue via pseudo-element, restrained lift on hover, clear active press, and strong focus ring.
- Primary remains blue but no longer reads as a generic web button.
- Secondary uses warm-neutral outline treatment and becomes filled subtly on hover.
- `.section--graphite`, `.block--graphite`, `.block--earth`, `.hero`, and `.footer` each get appropriate contrast without creating a second button system.
- Do not break form submit buttons that also use `.btn`.

#### Footer CTA
- `css/footer_promanaged.css`
- Ensure the footer CTA is visually intentional and aligned with the site button system.
- It must remain readable against graphite and should not appear as the same raw blue rectangle used by the hero.

## 4. DEFINITION OF DONE FOR THIS PHASE

- [ ] `hero-support` never overlaps the evidence cards at large desktop sizes.
- [ ] Hero remains balanced 7/5 and rail remains capped at 1880px.
- [ ] Hero has visible interface/project evidence without collisions.
- [ ] `.hero-buttons` still works.
- [ ] All CTA anchor buttons across the site use the upgraded common button language.
- [ ] Footer CTA matches the same family with correct dark-surface contrast.
- [ ] No button classes were renamed.
- [ ] No PHP, JS form logic, navigation logic, or legal content changed.
- [ ] No YAML/YML files introduced.
