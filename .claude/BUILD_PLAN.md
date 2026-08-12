# ProManaged IT — EXECUTION BUILD PLAN

> This file is the implementation contract. Follow it literally. Do not reinterpret the visual direction.

## 0. NON-NEGOTIABLE BASELINE

The site is a premium, human-led technology studio website built around **Build / Source / Connect**.

The correct visual baseline is the balanced editorial composition that existed before the wide-desktop experiment.

**Do not return to the oversized full-canvas layout.**

### Hard layout rules
- Desktop composition rail: **1880px maximum**.
- The rail is centred with responsive side padding.
- The hero desktop split is **7fr / 5fr**.
- Text measures remain independently capped; never let a 4K/ultrawide monitor create enormous paragraphs.
- Full-bleed section backgrounds are allowed; the content rail is not full-canvas.
- Bento cards may have unequal spans and offsets, but the overall composition must remain balanced.
- Do not introduce another max-width system without first checking these rules.

### Hard visual rules
- No traditional horizontal navbar.
- The persistent ProManaged logo tile opens the bento navigation panel.
- Plus Jakarta Sans remains the sole site typeface unless an explicit future design decision changes it everywhere.
- Existing `.btn`, `.primary`, `.secondary`, `.hero-buttons` classes are canonical. Do not rename them.
- Founder portrait is circular and based on the existing 800×800 asset.
- Do not enlarge the founder portrait merely to fill desktop space.
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
- Do not put component-specific styling here.

### Global design
`css/global_styles.css`
- Owns reset, typography, rail, grid, blocks, buttons, shared motion primitives and accessibility utilities.
- Do not break `.btn`, `.primary`, `.secondary`, `.hero-buttons`.
- Do not use global CSS to force individual sections into a new geometry.

### Hero
`css/hero_section.css`
- Desktop: **7fr / 5fr**.
- Tablet/mobile: stack/recompose cleanly.
- Preserve the existing hero statement, visual evidence and CTA hierarchy.
- No giant empty desktop columns.

### Founder
`css/about_section.css`
- Use the existing founder image.
- Circular crop: `border-radius: 50%`, square aspect ratio, `object-fit: cover`.
- Keep the portrait visually important but restrained.
- Preserve founder name, story and Build/Source/Connect details.

### Motion
`js/main.js` + `css/global_styles.css` + `css/tokens.css`
- Use IntersectionObserver and the existing `data-blocks` system.
- Motion is one-time per chapter, not looping.
- Approved variants only: `settle-up`, `settle-side`, `scale-in`, `sequence-in`.
- Animate only opacity and transform.
- No parallax, no perpetual floating, no animation libraries.

### Navigation
`css/navbar.css` + `js/mobile_phone_navbar.js`
- Keep the bento navigation concept.
- Preserve keyboard/focus behaviour, Escape close, scroll lock and `aria-expanded`.

### Forms
`css/contact_section.css`, `css/book_appointment.css`, `js/form_intake.js`, PHP endpoints
- Preserve field names, IDs, actions, honeypot, validation and submission contracts.
- Do not redesign the backend while making visual fixes.

### Email
`php/mailer.php`
- Preserve internal/customer email generation, escaping and SMTP behaviour.
- Branded HTML email templates may be visually refined only if the backend contract remains unchanged.

### Footer
`css/footer_promanaged.css`
- Canonical selector is `.footer`.
- Homepage must not use an obsolete `.footer-promanaged` replacement.
- Keep the footer visible and structurally compatible with its stylesheet.

## 3. REQUIRED IMPLEMENTATION ORDER

### Phase A — Stabilise geometry
1. Set `--rail-visual: 1880px`.
2. Set hero desktop grid to `7fr 5fr`.
3. Verify `.rail`, `.container`, `.grid`, `.block` and `.btn` are not overridden later by page CSS.
4. Verify founder portrait is circular and restrained.
5. Verify homepage footer uses the canonical footer markup/classes.

**Exit condition:** desktop looks like a balanced editorial website, not a stretched landing page.

### Phase B — Restore signature motion
1. Hero assembles on initial load.
2. Each major section reveals when approaching the viewport.
3. Bento navigation reveals when opened.
4. Founder section participates in the reveal.
5. Use slow timing:
   - desktop hero: 800–1000ms;
   - desktop chapters: 700–900ms;
   - stagger: approximately 90–120ms;
   - tablet/mobile: shorter travel and duration, still clearly visible.
6. Reduced motion must expose final state immediately.

**Exit condition:** motion is unmistakable but calm; no content flashes, disappears permanently or loops.

### Phase C — Evidence without clutter
Use small visual fragments in selected bento areas:
- dashboard/interface crops;
- booking/product UI fragments;
- network topology/interface diagrams;
- hardware/controller details.

Rules:
- never name an unapproved client/project;
- never use a hotel/project name in marketing copy;
- never fabricate an image;
- do not turn evidence into giant hero photography;
- evidence supports the story rather than replacing it.

### Phase D — Forms and email
Confirm:
- contact form submits;
- booking form submits;
- validation works;
- honeypot remains intact;
- success/error states remain accessible;
- internal email is structured and branded;
- customer reply is structured and branded;
- plain-text alternatives remain available.

### Phase E — Final audit
Search the entire repository for:
- `render.com`
- `render.yaml`
- Render deploy hooks/integrations
- `.yml` / `.yaml` files introduced by this work
- pricing on the software page
- client/project names that were not explicitly approved
- stale `.footer-promanaged` markup
- accidental `.hero-buttons` removal
- `console.log` / debug leftovers
- broken image paths
- broken CSS/JS references

Do not alter normal English uses of the word “render”.

## 4. ABSOLUTE DO-NOT-DO LIST

- Do not widen the rail beyond 1880px.
- Do not create a new “ultra-wide” visual system.
- Do not replace the balanced hero with equal 50/50 columns.
- Do not rewrite application logic for a visual task.
- Do not rename existing form fields.
- Do not replace PHP mail handling.
- Do not add a framework.
- Do not add GSAP, Framer Motion or another animation library.
- Do not add parallax or infinite motion.
- Do not create a branch.
- Do not create a PR.
- Work directly on `main`.
- Do not commit YAML/YML files.
- Do not modify `privacy_policy.html`.

## 5. DEFINITION OF DONE

The task is complete only when all are true:

- [ ] Hero is balanced 7/5 on desktop.
- [ ] Rail is capped at 1880px.
- [ ] Reading measures remain comfortable.
- [ ] Buttons work and retain canonical classes/styles.
- [ ] Founder portrait is circular, sharp and restrained.
- [ ] Bento cards vary without creating visual chaos.
- [ ] Building Blocks motion is visible on load and scroll.
- [ ] Motion is slow, deliberate and one-time.
- [ ] Reduced-motion mode is safe.
- [ ] Navigation remains bento and accessible.
- [ ] Contact/booking forms still submit with original contracts.
- [ ] Branded internal/customer emails remain functional.
- [ ] Footer is present and styled by the canonical footer CSS.
- [ ] No unapproved client/project names or fabricated claims.
- [ ] No Render deployment logic remains.
- [ ] No new YAML/YML files.
- [ ] No unrelated backend or legal changes.
