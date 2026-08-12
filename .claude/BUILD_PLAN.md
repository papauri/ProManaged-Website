# ProManaged IT — EXECUTION BUILD PLAN

## Mission
Finish the website as a **modern, premium, editorial technology studio** with a distinctive bento language, smooth building-block transitions, strong visual evidence, excellent responsive behaviour, and zero regression of working forms, navigation, PHP, or email logic.

This is the handoff plan for Claude. Treat it as an implementation contract, not inspiration.

The target feeling is: **calm confidence + intelligent motion + crafted detail**.
It should feel like a serious technology partner with taste, not a generic agency template or SaaS dashboard.

## 0. NON-NEGOTIABLE BASELINE

- Desktop visual rail: **1880px maximum**.
- Hero desktop composition: **7fr / 5fr**.
- Full-bleed surfaces are allowed; the content rail is not full-canvas.
- Text measures remain constrained independently from visual rail width.
- No return to the previous oversized 2200px/full-canvas experiment.
- No traditional horizontal navbar. The persistent logo tile opens the bento navigation.
- Plus Jakarta Sans remains the type system currently implemented.
- Existing `.btn`, `.primary`, `.secondary`, `.hero-buttons` are canonical and must not be renamed.
- Founder image remains the existing 800×800 asset, rendered as a restrained circular portrait.
- Footer must use the canonical `.footer` markup/classes, not placeholder compatibility markup.
- Work directly on `main`. Do not create a branch or PR.
- Never commit `.yml` / `.yaml` files.
- Do not modify privacy/legal content unless an objective broken-link/reference bug requires it.

## 1. DESIGN NORTH STAR

### Visual character
The site should combine:
- editorial typography;
- warm neutral Japandi-inspired surfaces;
- graphite dark chapters;
- controlled earthy accents with restrained blue interaction colour;
- unequal bento proportions;
- visible but subtle interface/project evidence;
- generous negative space without dead space;
- slow physical-feeling block transitions.

Avoid:
- generic blue SaaS cards;
- repetitive equal-card grids;
- oversized empty desktop canvases;
- stock-photo-heavy sections;
- dashboard clutter;
- excessive glassmorphism;
- loud gradients;
- cartoon bounce;
- random rotations;
- parallax;
- continuous floating elements.

### Design principle
**Make the composition interesting through proportion, rhythm, sequencing and evidence—not through decoration for decoration's sake.**

## 2. UI/UX WORKSTREAMS

### A. HERO — high priority
The hero is the most important remaining visual area.

Required:
- preserve 7/5 desktop split;
- keep headline and body readable;
- retain the two main CTAs;
- retain the richer visual evidence mosaic;
- retain anonymous interface fragments for Build/Connect;
- retain the capability/support facts;
- ensure every visual row has enough intrinsic height;
- `hero-support` must never overlap project/evidence cards at 1440, 1600, 1920 or 2560px widths;
- no negative margin/absolute positioning to fake overlap;
- no desktop transform that pushes one visual card into another row;
- tablet/mobile must recompose deliberately rather than simply squashing desktop geometry.

Hero evidence should feel like **real work evidence**, even when illustrative UI fragments are used. Label clearly enough that no fabricated client claim is implied.

### B. BENTO COMPOSITION SYSTEM — high priority
Do not make every section the same grid.

Use at least three composition patterns across the public site:
1. Dominant block + satellites.
2. Offset editorial split.
3. Stepped/mosaic sequence.

Vary:
- column spans;
- block heights;
- aspect ratios;
- media placement;
- whitespace;
- statement vs card sections.

Desktop, tablet and mobile must be **art-directed separately**.
Mobile must not be a monotonous stack of identical rectangles.

Semantic order must remain logical for keyboard and assistive technology users.

### C. SCROLL + LOAD MOTION — high priority
The signature interaction is **Building Blocks**.

Use the existing `data-blocks` + `IntersectionObserver` system. Do not introduce an animation library.

Required motion moments:
- hero initial assembly;
- major chapter reveals;
- bento navigation opening;
- founder/story reveal;
- selected evidence cards.

Approved variants only:
- `settle-up`
- `settle-side`
- `scale-in`
- `sequence-in`

Motion rules:
- animate transform + opacity only;
- one entrance per target group;
- no infinite motion;
- no parallax;
- no continuous floating;
- no repeated bouncing;
- no animation on every word/control;
- no layout shift.

Timing target:
- desktop hero: 800–1000ms;
- desktop chapter groups: 700–900ms;
- stagger: roughly 90–120ms;
- tablet/mobile: shorter travel and duration, but still clearly perceivable.

A tiny physical settle is acceptable. It must never read as cartoon bounce.

`prefers-reduced-motion` must show final state immediately.

### D. CTA / ANCHOR BUTTON SYSTEM — high priority
All anchor CTAs currently look too generic. Fix them globally, not page by page.

Keep:
- `.btn`
- `.btn.primary`
- `.btn.secondary`
- `.hero-buttons`

Upgrade the visual language:
- confident but not oversized height;
- refined radius;
- subtle depth/border;
- clear typography;
- restrained directional cue such as arrow/chevron via pseudo-element;
- controlled hover lift;
- clear active press;
- strong keyboard focus ring;
- premium dark-surface treatment where required.

Primary:
- blue remains the action colour;
- should feel branded and architectural rather than a stock Bootstrap button.

Secondary:
- warm-neutral/transparent outline;
- subtle surface fill on hover;
- excellent contrast on both light and dark surfaces.

The same family must work in:
- hero;
- capability cards;
- service pages;
- contact sections;
- booking sections;
- footer;
- form actions.

Do not create multiple competing button systems.

### E. NAVIGATION — medium/high priority
Preserve the bento navigation concept.

Review:
- logo tile visibility;
- open/close affordance;
- tile hierarchy;
- tile spans;
- touch target size;
- keyboard focus;
- Escape close;
- focus restoration;
- scroll locking;
- mobile composition.

Navigation should feel like an intentional bento control panel, not a disguised hamburger menu.

### F. FOUNDER / STORY — high priority
Founder area must feel premium and personal rather than like a generic profile card.

Required:
- circular crop of existing 800×800 image;
- sharp image at rendered size;
- no artificial upscaling;
- restrained desktop size;
- clear founder identity;
- one strong thesis statement;
- Build / Source / Connect detail markers;
- editorial spacing and asymmetry;
- responsive re-composition.

Do not make the portrait huge just to fill whitespace.

### G. SERVICES / CAPABILITIES — medium priority
Build should visually lead, with Source and Connect supporting.

Use bento hierarchy rather than three identical cards.

Required:
- immediate comprehension within a few seconds;
- clear destination/CTA;
- enough content to establish credibility;
- no pricing on software page;
- service cards should not rely on hover alone to communicate information.

### H. PROJECT / EVIDENCE CONTENT — medium/high priority
Use small anonymous interface evidence where useful:
- booking/availability UI;
- business workflow panels;
- SaaS/dashboard fragments;
- network status/topology visuals;
- hardware/controller details;
- infrastructure diagrams.

Rules:
- do not name a client/project unless explicitly approved;
- do not fabricate metrics/results;
- do not fabricate screenshots of work as if they were client deliverables;
- illustrative UI must be visually framed as illustrative when ambiguity exists;
- do not replace the site with giant stock photography.

### I. CONTACT / BOOKING FORMS — medium/high priority
Forms must feel like part of the same product, not a separate old website.

Keep backend contracts exactly intact:
- PHP endpoints;
- field names;
- IDs;
- actions;
- honeypot;
- SMTP;
- PHPMailer;
- validation logic.

UI requirements:
- bento intake-board layout;
- grouped fields;
- clear section hierarchy;
- excellent focus states;
- clear validation errors;
- accessible submitting state;
- polished success/error states;
- mobile-first recomposition;
- no tiny or cramped controls.

### J. EMAIL TEMPLATES — medium priority
Internal receiving emails and customer replies should feel curated and branded.

Preserve backend transport and escaping.

Required:
- branded HTML;
- plain-text alternative;
- clear enquiry type;
- scannable information hierarchy;
- customer identity/request sections;
- booking details separated when applicable;
- no internal secrets;
- safe escaping of submitted values;
- no client-side JS in email.

### K. FOOTER — high priority
The footer is part of the identity system.

Required:
- canonical `.footer` structure;
- ProManaged brand statement;
- contact details already supported by the repository;
- useful navigation links;
- strong but appropriate final CTA;
- privacy link;
- copyright/current year treatment;
- responsive layout;
- same button language as the hero but with dark-surface contrast.

Never leave placeholder footer markup in a public page.

## 3. RESPONSIVE ART DIRECTION

Required verification targets:
- 375px
- 430px
- 768px
- 1024px
- 1440px
- 1600px
- 1920px
- 2560px equivalent desktop width

At each size check:
- no horizontal overflow;
- no clipped text;
- no overlapping cards;
- no giant dead zones;
- no unreadably wide paragraphs;
- no buttons colliding or wrapping awkwardly;
- no image distortion;
- navigation remains usable;
- footer remains complete.

Large screens should use more visual room through **composition**, not by stretching every block to the viewport edge.

## 4. ACCESSIBILITY + QUALITY

Maintain:
- semantic headings;
- visible keyboard focus;
- accessible labels;
- meaningful alt text;
- logical source order;
- sufficient contrast;
- reduced-motion support;
- touch-friendly controls.

Do not hide important content behind hover or motion.

## 5. PERFORMANCE

Prefer:
- CSS transforms/opacity for motion;
- CSS-generated interface details over unnecessary image assets;
- existing local assets;
- lazy loading for below-fold imagery;
- eager loading for prominent above-fold imagery where appropriate;
- explicit image dimensions to prevent layout shift.

Do not add large dependencies for visual effects.

## 6. LOGIC / BACKEND PROTECTION

Visual work must not break:
- `js/main.js` navigation/scroll behaviour;
- `js/mobile_phone_navbar.js` focus/escape/scroll lock;
- `js/form_intake.js` form UX;
- PHP endpoints;
- PHPMailer;
- SMTP configuration;
- honeypots;
- existing form field names/IDs/actions;
- existing links.

Do not rewrite application logic to solve a CSS problem.

## 7. CLEANUP / SECURITY

Audit and remove verified references to:
- Render.com hosting/deployment;
- Render deploy hooks/config;
- eBay integrations;
- RAWG/game data integrations;
- obsolete pricing/review/search logic.

Keep ordinary UI wording containing the word `render`.

Never commit YAML/YML.

## 8. IMPLEMENTATION ORDER

### Phase 1 — Structural visual stability
Fix:
- hero row sizing/overlap;
- canonical footer structure;
- CTA/button system;
- founder circle/crop;
- rail/grid consistency.

### Phase 2 — Premium motion
Fix:
- hero assembly;
- chapter reveals;
- bento navigation reveal;
- founder reveal;
- device-aware timing;
- reduced-motion fallback.

### Phase 3 — Responsive bento art direction
Fix:
- desktop hierarchy;
- tablet recomposition;
- mobile composition;
- evidence mosaic;
- capability hierarchy.

### Phase 4 — Forms/email consistency
Fix only UI/UX and presentation while preserving backend contracts.

### Phase 5 — Final polish
Typography, spacing, micro-interactions, image loading, focus states, CTA consistency, footer details and content rhythm.

## 9. DEFINITION OF DONE

All must be true:

- [ ] Hero is balanced 7/5.
- [ ] Rail never exceeds 1880px.
- [ ] Hero visual rows never overlap at large desktop sizes.
- [ ] Hero contains purposeful interface/project evidence.
- [ ] Bento patterns are visibly varied across the site.
- [ ] Desktop/tablet/mobile are art-directed, not merely stacked.
- [ ] Building Blocks motion is clearly visible but slow and premium.
- [ ] Motion runs once and respects reduced motion.
- [ ] Founder portrait is circular, sharp and restrained.
- [ ] CTA anchors no longer look generic/boring.
- [ ] `.btn` class family is consistent everywhere.
- [ ] Footer is complete and canonical.
- [ ] Forms remain functional and visually premium.
- [ ] Internal/customer email templates remain functional and branded.
- [ ] No broken links/assets/CSS/JS references.
- [ ] No unapproved client/project claims.
- [ ] No pricing on software page.
- [ ] No Render deployment logic.
- [ ] No YAML/YML introduced.
- [ ] No unrelated backend/legal changes.

## 10. CLAUDE EXECUTION RULES

Read this entire file before touching code.

Implement the complete plan in one continuous cycle. Do not stop after tokens, button CSS, or a single page.

Do not reinterpret the design direction.
Do not widen the rail.
Do not replace the bento navigation.
Do not invent project claims.
Do not create parallel animation systems.
Do not create a new button component.
Do not rewrite PHP/backend logic for visual changes.

Use the existing architecture and improve it surgically.

When finished, commit directly to `main` and push to `origin/main`.

Before committing, inspect the complete diff and remove accidental changes.

Final response must be exactly:

Changed:
- <concise summary>

Blockers:
- None
OR
- <exact blocker>

Ready for review:
- Yes