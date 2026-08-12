# ProManaged IT — EXECUTION BUILD PLAN

## Mission
Finish the website as a **mobile-first, modern premium editorial technology studio** with a distinctive bento language, sophisticated loading/transition choreography, strong visual evidence, excellent responsive behaviour, and zero regression of working forms, navigation, PHP, or email logic.

This is the handoff plan for Claude. Treat it as an implementation contract, not inspiration.

Target feeling: **calm confidence + intelligent motion + crafted detail**. On a phone, the site must already feel complete and premium; desktop expands the composition rather than simply scaling the mobile layout upward.

## 0. NON-NEGOTIABLE BASELINE

- **Mobile-first is mandatory.** Design and implement the core layout for 375–430px first, then progressively enhance tablet and desktop.
- Desktop visual rail: **1880px maximum**.
- Hero desktop composition: **7fr / 5fr**.
- Full-bleed surfaces are allowed; the content rail is not full-canvas.
- Text measures remain constrained independently from visual rail width.
- No return to the previous oversized 2200px/full-canvas experiment.
- No traditional horizontal navbar. The persistent logo tile opens the bento navigation.
- Plus Jakarta Sans remains the current type system.
- Existing `.btn`, `.primary`, `.secondary`, `.hero-buttons` are canonical and must not be renamed.
- Founder image remains the existing 800×800 asset, rendered as a restrained circular portrait.
- Footer must use the canonical `.footer` markup/classes, not placeholder compatibility markup.
- Work directly on `main`. Do not create a branch or PR.
- Never commit `.yml` / `.yaml` files.
- Do not modify privacy/legal content unless an objective broken-link/reference bug requires it.

## 1. DESIGN NORTH STAR

### Visual character
Combine:
- editorial typography;
- warm neutral Japandi-inspired surfaces;
- graphite dark chapters;
- controlled earthy accents with restrained blue interaction colour;
- unequal bento proportions;
- visible but subtle interface/project evidence;
- generous negative space without dead space;
- **slow, elegant building-block motion**;
- **a memorable loading sequence that feels like the interface is assembling itself**.

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
- continuous floating elements;
- flashy preloader percentages/spinners that feel disconnected from the design.

### Design principle
**Make the composition interesting through proportion, rhythm, sequencing, evidence and motion—not decoration for decoration's sake.**

## 2. UI/UX WORKSTREAMS

### A. MOBILE-FIRST FOUNDATION — highest priority
Start every responsive decision at **375px and 430px** before tuning larger layouts.

Required:
- no horizontal overflow;
- comfortable thumb reach and touch targets;
- obvious hierarchy without relying on hover;
- hero content readable without excessive vertical dead space;
- CTA buttons stack or wrap deliberately;
- bento cards recompose into varied mobile blocks instead of identical full-width rectangles;
- founder section remains visually intentional and circular;
- footer remains complete and easy to navigate;
- navigation panel is touch-friendly and visually rich;
- forms are comfortable to fill on a phone;
- motion is perceptible but not heavy or slow enough to frustrate a mobile visitor.

Do not build desktop first and merely add `@media` overrides. Treat mobile as the primary composition and progressively add complexity for tablet/desktop.

### B. HERO — highest priority
The hero is the most important visual area.

Required:
- mobile-first composition with clear statement + CTA + visual evidence;
- desktop preserves **7fr / 5fr**;
- retain the richer visual evidence mosaic;
- retain anonymous interface fragments for Build/Connect;
- retain capability/support facts;
- ensure every visual row has intrinsic height;
- `hero-support` must never overlap project/evidence cards at 1440, 1600, 1920 or 2560px widths;
- no negative margin/absolute positioning to fake overlap;
- no transform that pushes one visual card into another row;
- tablet/mobile must recompose deliberately rather than squash desktop geometry.

The hero should feel populated with useful evidence, but not overcrowded. On mobile, use fewer simultaneous cards but preserve the narrative: statement → proof → action.

### C. PREMIUM PAGE-LOAD EXPERIENCE — highest priority
The site needs a **modern loading choreography**, not a generic spinner.

Goal:
As the initial page enters view, the design should appear to **assemble from blocks** in a controlled editorial sequence. The visitor should feel that the interface is resolving into place.

Use existing vanilla JS/CSS architecture. Do not add an animation framework.

Required load sequence:
1. Base surface/typography becomes available immediately.
2. Logo/navigation control resolves first.
3. Hero statement settles in.
4. Hero visual/evidence blocks assemble in a staggered sequence.
5. Hero CTAs become fully visible after the main composition settles.
6. No content remains invisibly waiting if JavaScript fails.

Rules:
- use opacity + transform only;
- no layout-property animation;
- no spinner unless genuinely necessary for async data (there is no such requirement here);
- no fake progress percentage;
- no long blank screen;
- no blocking preloader that delays usable content unnecessarily;
- initial assembly should feel **fancy, slow and premium**, not slow for its own sake;
- target first-visual choreography around **800–1100ms** with controlled 90–130ms stagger;
- hero blocks should settle at slightly different depths/directions;
- a subtle final settle is acceptable; avoid repeated bouncing.

The load choreography must be visibly different on mobile vs desktop while remaining the same design language.

### D. SCROLL TRANSITIONS — highest priority
The signature interaction is **Building Blocks** continuing down the page.

Use the existing `data-blocks` + `IntersectionObserver` system.

Required motion moments:
- major chapter reveals;
- bento navigation opening;
- founder/story reveal;
- selected evidence cards;
- capability sections;
- contact/form sections.

Approved variants only:
- `settle-up`
- `settle-side`
- `scale-in`
- `sequence-in`

Motion rules:
- animate transform + opacity only;
- one entrance per target group;
- stagger by meaningful group, not every DOM child;
- no infinite motion;
- no parallax;
- no continuous floating;
- no repeated bouncing;
- no animation on every word/control;
- no layout shift.

Timing target:
- desktop hero: 800–1100ms;
- desktop chapter groups: 700–950ms;
- mobile hero: ~650–850ms;
- mobile chapter groups: ~550–750ms;
- stagger: roughly 80–130ms;
- mobile travel distance should be smaller than desktop so the motion feels refined.

A tiny physical settle is acceptable. It must never read as cartoon bounce.

`prefers-reduced-motion` must show final state immediately.

### E. BENTO COMPOSITION SYSTEM — highest priority
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

**Mobile-first requirement:**
- Start with 1-column and occasional 2-column compositions.
- Vary card height, media ratio, order and grouping so the page does not become a monotone stack.
- Only introduce more columns as viewport width allows.

Desktop, tablet and mobile must be **art-directed separately**.
Semantic order must remain logical for keyboard and assistive technology users.

### F. CTA / ANCHOR BUTTON SYSTEM — high priority
All anchor CTAs must share one intentional ProManaged interaction language.

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

The same family must work in hero, capability cards, service pages, contact sections, booking sections, footer and form actions.

No generic plain-blue-pill appearance and no competing button systems.

### G. NAVIGATION — high priority
Preserve the bento navigation concept.

Review:
- logo tile visibility;
- open/close affordance;
- tile hierarchy;
- varied tile spans;
- touch target size;
- keyboard focus;
- Escape close;
- focus restoration;
- scroll locking;
- mobile composition;
- open animation that feels like a related part of the page loading language.

On mobile, the navigation panel should be easy to scan with one-hand interaction and avoid tiny text or cramped tiles.

### H. FOUNDER / STORY — high priority
Founder area must feel premium and personal rather than a generic profile card.

Required:
- circular crop of existing 800×800 image;
- sharp image at rendered size;
- no artificial upscaling;
- restrained desktop size;
- strong mobile presentation first;
- clear founder identity;
- one strong thesis statement;
- Build / Source / Connect detail markers;
- editorial spacing and asymmetry;
- responsive re-composition;
- founder reveal participates in the Building Blocks motion language.

### I. SERVICES / CAPABILITIES — medium/high priority
Build should visually lead, with Source and Connect supporting.

Use bento hierarchy rather than three identical cards.

Required:
- immediate comprehension within a few seconds;
- clear destination/CTA;
- enough content to establish credibility;
- no pricing on software page;
- service cards do not rely on hover alone.

On mobile, Build can be the dominant lead block, followed by distinct Source and Connect treatments rather than three identical cards.

### J. PROJECT / EVIDENCE CONTENT — medium/high priority
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

### K. CONTACT / BOOKING FORMS — medium/high priority
Forms must feel like part of the same product.

Preserve backend contracts exactly:
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
- mobile-first grouping;
- clear section hierarchy;
- excellent focus states;
- clear validation errors;
- accessible submitting state;
- polished success/error states;
- no tiny or cramped controls;
- buttons use the common CTA language.

### L. EMAIL TEMPLATES — medium priority
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

### M. FOOTER — high priority
The footer is part of the identity system.

Required:
- canonical `.footer` structure;
- ProManaged brand statement;
- useful navigation links;
- strong but appropriate final CTA;
- privacy link;
- current-year treatment;
- mobile-first stacked composition;
- desktop expansion only after mobile structure is solid;
- same button language as the hero with dark-surface contrast.

Never leave placeholder footer markup in a public page.

## 3. RESPONSIVE ART DIRECTION

Implementation order must be:
1. 375px
2. 430px
3. 768px
4. 1024px
5. 1440px
6. 1600px
7. 1920px
8. 2560px equivalent desktop width

At every size check:
- no horizontal overflow;
- no clipped text;
- no overlapping cards;
- no giant dead zones;
- no unreadably wide paragraphs;
- no buttons colliding or wrapping awkwardly;
- no image distortion;
- navigation remains usable;
- footer remains complete.

Large screens should gain richness through composition, spacing and evidence—not by stretching every block to the viewport edge.

## 4. LOADING + MOTION QUALITY BAR

The loading experience must read as a **designed transition system**, not a collection of unrelated CSS animations.

Required:
- consistent easing family;
- consistent settle distance/scaling language;
- different choreography by component group;
- no flash of hidden content;
- content visible if JS fails;
- safe timeout/fallback so content can never remain hidden;
- no replay on every tiny scroll movement;
- no motion that blocks interaction.

On mobile:
- use shorter travel and smaller scale changes;
- reduce stagger count when there are many cards;
- prioritize first-screen content;
- do not delay the first usable interaction simply to complete the animation.

On desktop:
- use larger composition movement and slightly longer settle times;
- let evidence cards arrive in sequence so the page feels assembled rather than faded in.

## 5. ACCESSIBILITY + QUALITY

Maintain:
- semantic headings;
- visible keyboard focus;
- accessible labels;
- meaningful alt text;
- logical source order;
- sufficient contrast;
- reduced-motion support;
- touch-friendly controls;
- no information hidden behind hover/motion.

## 6. PERFORMANCE

Prefer:
- CSS transforms/opacity for motion;
- CSS-generated interface details over unnecessary image assets;
- existing local assets;
- lazy loading for below-fold imagery;
- eager loading for prominent above-fold imagery where appropriate;
- explicit image dimensions to prevent layout shift;
- no large visual dependency for a transition effect.

The initial viewport must become useful quickly on mobile.

## 7. LOGIC / BACKEND PROTECTION

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

## 8. CLEANUP / SECURITY

Audit and remove verified references to:
- Render.com hosting/deployment;
- Render deploy hooks/config;
- eBay integrations;
- RAWG/game data integrations;
- obsolete pricing/review/search logic.

Keep ordinary English uses of the word `render`.

Never commit YAML/YML.

## 9. IMPLEMENTATION ORDER

### Phase 1 — Mobile-first structural stability
Fix first at 375/430:
- hero geometry;
- button hierarchy;
- canonical footer;
- founder circle/crop;
- bento card composition;
- navigation panel;
- form ergonomics.
Then progressively enhance tablet/desktop.

### Phase 2 — Premium page-load and scroll motion
Fix:
- first-screen block assembly;
- hero evidence sequencing;
- chapter reveals;
- bento navigation reveal;
- founder reveal;
- device-aware timing;
- reduced-motion fallback;
- JS-failure visibility fallback.

### Phase 3 — Responsive bento art direction
Fix:
- mobile composition first;
- tablet recomposition;
- desktop hierarchy;
- evidence mosaic;
- capability hierarchy;
- intentional open space.

### Phase 4 — Forms/email consistency
Fix only UI/UX and presentation while preserving backend contracts.

### Phase 5 — Final polish
Typography, spacing, micro-interactions, image loading, focus states, CTA consistency, footer details and content rhythm.

## 10. DEFINITION OF DONE

All must be true:

- [ ] 375px is a polished primary composition, not a collapsed desktop site.
- [ ] 430px remains polished and comfortable.
- [ ] Hero is balanced 7/5 at desktop widths.
- [ ] Rail never exceeds 1880px.
- [ ] Hero visual rows never overlap at large desktop sizes.
- [ ] Hero contains purposeful interface/project evidence.
- [ ] Bento patterns are visibly varied across the site.
- [ ] Desktop/tablet/mobile are art-directed, not merely stacked.
- [ ] Page-load animation feels like a premium block-assembly transition.
- [ ] Scroll Building Blocks motion is clearly visible but slow and premium.
- [ ] Motion runs once and respects reduced motion.
- [ ] Founder portrait is circular, sharp and restrained.
- [ ] CTA anchors no longer look generic/boring.
- [ ] `.btn` class family is consistent everywhere.
- [ ] Navigation is premium and touch-friendly.
- [ ] Footer is complete and canonical.
- [ ] Forms remain functional and visually premium.
- [ ] Internal/customer email templates remain functional and branded.
- [ ] No broken links/assets/CSS/JS references.
- [ ] No unapproved client/project claims.
- [ ] No pricing on software page.
- [ ] No Render deployment logic.
- [ ] No YAML/YML introduced.
- [ ] No unrelated backend/legal changes.

## 11. CLAUDE EXECUTION RULES

Read this entire file before touching code.

Implement the complete plan in one continuous cycle. Do not stop after tokens, button CSS, a single page, or desktop-only styling.

**Mobile-first is mandatory.** Start at 375px/430px, then enhance upward.

Do not reinterpret the design direction.
Do not widen the rail.
Do not replace the bento navigation.
Do not invent project claims.
Do not create parallel animation systems.
Do not create a new button component.
Do not rewrite PHP/backend logic for visual changes.

Use the existing architecture and improve it surgically.

When finished, inspect the complete diff, remove accidental changes, commit directly to `main`, and push to `origin/main`.

Final response must be exactly:

Changed:
- <concise summary>

Blockers:
- None
OR
- <exact blocker>

Ready for review:
- Yes
