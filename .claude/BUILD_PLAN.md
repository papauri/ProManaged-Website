# ProManaged IT — EXECUTION BUILD PLAN

## Mission
Finish the website as a **mobile-first, modern premium editorial technology studio** with a distinctive bento language, sophisticated loading/transition choreography, strong visual evidence, excellent responsive behaviour, and zero regression of working forms, navigation, PHP, or email logic.

This is the shared implementation contract for **ChatGPT, Claude, and Perplexity**. All three agents have the same responsibility for product quality. No agent has an isolated responsibility.

Target feeling: **calm confidence + intelligent motion + crafted detail**. On a phone, the site must already feel complete and premium; desktop expands the composition rather than simply scaling the mobile layout upward.

## 0. SHARED MULTI-AGENT OPERATING MODEL

This project is being developed collaboratively by:
- ChatGPT
- Claude
- Perplexity

### Shared responsibility
ALL THREE AGENTS HAVE THE SAME RESPONSIBILITY FOR THE QUALITY OF THE WHOLE PRODUCT.

Every agent is expected to think about and challenge:
- UI design;
- UX;
- responsive behaviour;
- mobile-first composition;
- desktop composition;
- bento layout;
- typography;
- motion;
- page-load choreography;
- navigation;
- forms;
- email UX;
- accessibility;
- performance;
- visual hierarchy;
- content clarity;
- business positioning;
- trust;
- technical integrity;
- security;
- regressions;
- maintainability.

Never defer an obvious issue by saying it belongs to another agent. Any agent may identify, challenge, recommend, review, or implement improvements when repository access permits.

### Live repository requirement — NON-NEGOTIABLE
Before **any substantial recommendation, review, or implementation**, every agent must refresh its understanding from the current GitHub repository.

Repository:
`https://github.com/papauri/ProManaged-Website`

Required current-context reading:
1. `.claude/BUILD_PLAN.md`
2. `.claude/PROJECT_CONTEXT.md` if present
3. `.claude/SYSTEM_MAP.md` if present
4. the current `main` implementation relevant to the task;
5. recent commits on `main` when change history matters.

The live repository is the implementation source of truth. Do not rely on stale conversation context, cached assumptions, previous screenshots, or an earlier version of the build plan.

If repository state conflicts with an older conversation or remembered instruction, use the current repository/build plan unless the user explicitly overrides it.

Before recommending a change, establish what currently exists, what is actually broken, what has already been implemented, and whether the proposed change could regress an approved system.

### Shared quality bar
The target is not merely technically complete. The target is a:
- modern;
- premium;
- mobile-first;
- editorial;
- distinctive;
- trustworthy;
- responsive;
- motion-rich;
- carefully composed;
- production-ready
ProManaged IT website.

A requirement is NOT complete merely because:
- a CSS class exists;
- an animation technically runs;
- a grid technically spans multiple columns;
- an image technically loads;
- a button technically links somewhere.

The rendered experience must visibly satisfy the intended result.

### Shared review questions
Every agent should actively ask:
1. What is broken?
2. What is visually weak?
3. What is inconsistent?
4. What is misleading?
5. What could regress on another device?
6. What could become inaccessible?
7. What is technically fragile?
8. What feels generic?
9. What does not match the build plan?
10. What would prevent this from feeling award-level?

Do not approve work merely because another agent produced it.

### Shared response to defects
When any agent identifies a defect:
- verify it;
- explain the root cause;
- propose a concrete correction;
- implement it when repository access allows;
- verify the result;
- report what changed.

Do not apply a superficial patch when the underlying architecture is wrong.

### Shared research standard
External research is welcome and should be refreshed when current design/UX patterns matter. Research must be translated into original ProManaged work. Never copy source code, wording, exact layouts, branding, logos, proprietary assets, or project names.

### Shared mobile-first standard
Every major decision starts at:
1. 375px
2. 430px
3. 768px
4. 1024px
5. 1440px
6. 1600px
7. 1920px
8. 2560px equivalent desktop width

Mobile is not a compressed desktop version.

### Shared acceptance standard
Before anything is considered finished, all agents should be able to agree that:
- mobile-first composition is strong;
- hero is balanced;
- evidence supports the story;
- bento layouts are varied;
- motion is visible and premium;
- load choreography is polished;
- CTA buttons feel designed;
- founder section feels personal;
- navigation feels intentional;
- forms feel native to the product;
- footer is complete;
- there are no obvious overlaps or regressions;
- implementation matches the build plan;
- no unverified claims or fake project evidence were introduced.

This is a team, not a chain of command. Think together, challenge together, review together, improve together.

## 1. NON-NEGOTIABLE BASELINE

- **Mobile-first is mandatory.** Design and implement the core layout for 375–430px first, then progressively enhance tablet and desktop.
- Desktop visual rail: **1880px maximum**.
- Hero desktop composition: **7fr / 5fr**.
- Full-bleed surfaces are allowed; the content rail is not full-canvas.
- Text measures remain constrained independently from visual rail width.
- No return to the previous oversized 2200px/full-canvas experiment.
- No traditional horizontal navbar. The persistent ProManaged logo tile opens the bento navigation.
- Plus Jakarta Sans remains the current type system.
- Existing `.btn`, `.primary`, `.secondary`, `.hero-buttons` are canonical and must not be renamed.
- Founder image remains the existing 800×800 asset, rendered as a restrained circular portrait.
- **Every required public page must use the same canonical footer structure and `.footer` root.** Do not maintain page-specific footer variants or compatibility footer markup.
- Work directly on `main`. Do not create a branch or PR.
- Never commit `.yml` / `.yaml` files.
- Do not modify privacy/legal content unless an objective broken-link/reference bug requires it.

## 2. DESIGN NORTH STAR

### Visual character
Combine:
- editorial typography;
- warm neutral/Japandi-inspired surfaces;
- graphite dark chapters;
- controlled earthy accents with restrained blue interaction colour;
- unequal bento proportions;
- visible but subtle interface/project evidence;
- generous negative space without dead space;
- slow, elegant building-block motion;
- a memorable loading sequence that feels like the interface is assembling itself.

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

## 3. UI/UX WORKSTREAMS

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

Do not build desktop first and merely add media overrides. Treat mobile as the primary composition and progressively add complexity for tablet/desktop.

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
The site needs a modern loading choreography, not a generic spinner.

Goal: as the initial page enters view, the design should appear to **assemble from blocks** in a controlled editorial sequence. The visitor should feel that the interface is resolving into place.

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
- no spinner unless genuinely necessary for async data;
- no fake progress percentage;
- no long blank screen;
- no blocking preloader that delays usable content unnecessarily;
- initial assembly should feel fancy, slow and premium, not slow for its own sake;
- target first-visual choreography around 800–1100ms with controlled 90–130ms stagger;
- hero blocks should settle at slightly different depths/directions;
- a subtle final settle is acceptable; avoid repeated bouncing.

Every load-phase element must participate in the actual hidden → settled sequence. Essential content must never depend on a successful cleanup callback to become visible. If JavaScript fails, reduced motion is enabled, or an animation is interrupted, the final content state must remain visible and usable.

The load choreography must be visibly different on mobile vs desktop while remaining the same design language.

### D. SCROLL TRANSITIONS — highest priority
The signature interaction is **Building Blocks** continuing down the page and it must be applied **throughout the public site**, not only on the homepage.

Every major page should visibly use the same motion language on its chapter/hero/content blocks.

Use the existing `data-blocks` + `IntersectionObserver` system.

Required motion moments:
- major chapter reveals;
- bento navigation opening;
- founder/story reveal;
- selected evidence cards;
- capability sections;
- service-page sections;
- contact/form sections;
- footer reveal where it is visually appropriate.

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
The bento language must be a **site-wide design system**, not primarily a homepage treatment.

Do not make every section the same grid, and do not ship service pages that visually collapse into ordinary stacked cards.

Use at least three composition patterns across the public site:
1. Dominant block + satellites.
2. Offset editorial split.
3. Stepped/mosaic sequence.

Also use selected combinations such as:
- large statement + two evidence satellites;
- image/interface + text block + narrow fact rail;
- split hero + stacked proof blocks;
- asymmetric process timeline;
- alternating dark/light chapter blocks;
- visual index cards between narrative sections.

Vary:
- column spans;
- block heights;
- aspect ratios;
- media placement;
- whitespace;
- statement vs card sections;
- background chapter surfaces.

**Every public page must contain at least two visibly distinct bento/composition moments beyond a simple hero.**

Mobile-first requirement:
- Start with 1-column and occasional 2-column compositions.
- Vary card height, media ratio, order and grouping so the page does not become a monotone stack.
- Only introduce more columns as viewport width allows.

Desktop, tablet and mobile must be art-directed separately.
Semantic order must remain logical for keyboard and assistive technology users.

### F. CTA / ANCHOR BUTTON SYSTEM — high priority
All anchor CTAs must share one intentional ProManaged interaction language.

Keep:
- `.btn`
- `.btn.primary`
- `.btn.secondary`
- `.hero-buttons`

Upgrade/refine the visual language:
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

### G. NAVIGATION — highest priority
The current navigation must be treated as a major redesign target, not simply polished.

Preserve the bento navigation concept and existing accessibility/JS contracts, but make the visual experience feel unmistakably contemporary.

Required:
- modern persistent logo/control tile;
- stronger bento hierarchy;
- a visually rich opening state rather than a plain full-screen list;
- more distinctive tile proportions and composition;
- clearer primary CTA destination;
- deliberate typography hierarchy;
- strong open/close choreography linked to the page Building Blocks language;
- better use of negative space and surface contrast;
- touch target size;
- keyboard focus;
- Escape close;
- focus restoration;
- scroll locking;
- mobile composition;
- no old-fashioned hamburger/drawer appearance.

Do not change the existing navigation behaviour contracts unless there is a concrete bug.

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

### I. SERVICES / CAPABILITIES — high priority
Build should visually lead, with Source and Connect supporting.

Use bento hierarchy rather than three identical cards.

Required:
- immediate comprehension within a few seconds;
- clear destination/CTA;
- enough content to establish credibility;
- no pricing on software page;
- service cards do not rely on hover alone;
- every service page inherits the same visual system rather than reverting to a generic article layout.

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

### M. FOOTER — highest priority
The footer is part of the identity system and must be a **shared component in markup and visual design**.

Required:
- canonical `.footer` structure on every public page;
- same section ordering/semantics across pages;
- same ProManaged brand statement;
- same useful navigation links;
- same contact destinations;
- same final CTA concept;
- privacy link;
- current-year treatment;
- mobile-first stacked composition;
- desktop expansion only after mobile structure is solid;
- same button language as the hero with dark-surface contrast.

Do not duplicate or redesign the footer separately on individual pages. Normalize the HTML so every page uses the canonical footer tree.

## 4. RESPONSIVE ART DIRECTION

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

## 5. LOADING + MOTION QUALITY BAR

The loading experience must read as a designed transition system, not a collection of unrelated CSS animations.

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

## 6. ACCESSIBILITY + QUALITY

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

## 7. PERFORMANCE

Prefer:
- CSS transforms/opacity for motion;
- CSS-generated interface details over unnecessary image assets;
- existing local assets;
- lazy loading for below-fold imagery;
- eager loading for prominent above-fold imagery where appropriate;
- explicit image dimensions to prevent layout shift;
- no large visual dependency for a transition effect.

The initial viewport must become useful quickly on mobile.

## 8. LOGIC / BACKEND PROTECTION

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

## 9. CLEANUP / SECURITY

Audit and remove verified references to:
- Render.com hosting/deployment;
- Render deploy hooks/config;
- eBay integrations;
- RAWG/game data integrations;
- obsolete pricing/review/search logic.

Keep ordinary English uses of the word `render`.

Never commit YAML/YML.

## 10. IMPLEMENTATION ORDER — FULL IMPLEMENTATION CYCLE

### Phase 1 — Shared structural normalization
- Normalize the canonical footer HTML on every public page.
- Remove page-specific/legacy footer structures.
- Confirm all pages load the same shared footer CSS.
- Normalize site-wide `data-blocks` coverage so motion exists on every intended public chapter.
- Normalize navigation markup/classes where necessary while preserving JS contracts.

### Phase 2 — Mobile-first art direction
Fix first at 375/430:
- hero geometry;
- bento composition;
- button hierarchy;
- canonical footer;
- founder circle/crop;
- navigation panel;
- form ergonomics;
- service-page composition.
Then progressively enhance tablet/desktop.

### Phase 3 — Premium page-load + scroll motion
Fix:
- first-screen block assembly;
- hero evidence sequencing;
- chapter reveals across **all public pages**;
- bento navigation reveal;
- founder reveal;
- service-page reveals;
- footer reveal where appropriate;
- device-aware timing;
- reduced-motion fallback;
- JS-failure visibility fallback;
- ensure every declared load-phase element actually participates in the sequence.

### Phase 4 — Bento redesign across the whole site
Do not stop at the homepage.

Implement visibly varied bento compositions across:
- `index.html`
- `get-started.html`
- `learn_more.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`

Each page should have its own chapter rhythm while sharing the same design language.

### Phase 5 — Navigation redesign
Treat the navigation as a premium bento control surface.

Keep its existing JS/accessibility behaviour but improve:
- visual hierarchy;
- composition;
- tile variation;
- typography;
- open/close transition;
- CTA emphasis;
- mobile ergonomics.

### Phase 6 — Forms/email consistency
Fix only UI/UX and presentation while preserving backend contracts.

### Phase 7 — Final polish
Typography, spacing, micro-interactions, image loading, focus states, CTA consistency, footer details and content rhythm.

## 11. DEFINITION OF DONE

All must be true:

- [ ] 375px is a polished primary composition, not a collapsed desktop site.
- [ ] 430px remains polished and comfortable.
- [ ] Hero is balanced 7/5 at desktop widths.
- [ ] Rail never exceeds 1880px.
- [ ] Hero visual rows never overlap at large desktop sizes.
- [ ] Hero contains purposeful interface/project evidence.
- [ ] Bento patterns are visibly varied across the site, not just on the homepage.
- [ ] Every required public page has at least two deliberate bento/composition moments beyond a simple hero.
- [ ] Desktop/tablet/mobile are art-directed, not merely stacked.
- [ ] Page-load animation feels like a premium block-assembly transition.
- [ ] Every intended load-phase element actually participates in the choreography.
- [ ] No essential content can remain hidden because JavaScript failed or cleanup did not run.
- [ ] Scroll Building Blocks motion is clearly visible on every required public page.
- [ ] Motion runs once and respects reduced motion.
- [ ] Founder portrait is circular, sharp and restrained.
- [ ] CTA anchors no longer look generic/boring.
- [ ] Navigation feels modern and premium rather than like an old-school drawer/hamburger.
- [ ] Navigation is usable by touch and keyboard.
- [ ] Forms remain wired to their existing backend contracts.
- [ ] Email templates remain safe and branded.
- [ ] Canonical footer markup and CSS are shared across every required public page.
- [ ] No legacy/page-specific footer variant remains.
- [ ] No pricing appears on the software page.
- [ ] No unapproved client/project names or fabricated evidence are present.
- [ ] No Render/eBay/RAWG legacy integration remains where it is not required.
- [ ] No YAML/YML files are committed.
- [ ] No horizontal overflow exists at required viewport sizes.
- [ ] No obvious accessibility regression exists.
- [ ] Full diff has been inspected before declaring completion.

## 12. DEFAULT EXECUTION MODE

**The Build Plan is the implementation instruction.**

Do not wait for a separate review prompt after every implementation cycle.

When the user says to implement the build plan, Claude must:
1. Read the complete plan and live repository.
2. Implement all currently active requirements in one continuous cycle.
3. Inspect the entire diff.
4. Fix incomplete or obviously weak implementation it finds itself.
5. Commit directly to `main`.
6. Push directly to `origin/main`.
7. Report completion.

The user will provide subjective feedback after seeing the result. Do not stop implementation waiting for ChatGPT review unless the user explicitly requests a review.

## 13. REQUIRED HANDOFF PROMPT FOR CLAUDE

Use a fresh Claude session (`/clear`) and paste:

Read `.claude/BUILD_PLAN.md` completely before touching any code.

You are working as part of a shared three-agent team with ChatGPT and Perplexity. There are NO isolated responsibilities. All three agents share responsibility for the quality of the entire product.

The Build Plan is the implementation instruction. Do not wait for a separate review prompt after each cycle.

Before substantial work, refresh your understanding from the live GitHub repository:
- `.claude/BUILD_PLAN.md`
- `.claude/PROJECT_CONTEXT.md` if present
- `.claude/SYSTEM_MAP.md` if present
- relevant current files on `main`
- recent commits when history matters

The live repository is the source of truth. Do not rely on stale conversation context.

Implement the entire active build plan in one continuous cycle. Think about design, UX, responsive behaviour, bento composition, typography, motion, loading, navigation, forms, email UX, accessibility, performance, business positioning, technical integrity and regressions—not just the files you edit.

Do not stop after a token change, one CSS file, the homepage, or a superficial motion pass. Complete the entire site-wide active scope.

If something is technically correct but visually weak, improve it. If something is broken, fix the root cause. If a change risks regression, investigate before applying it. Do not wait for another agent to catch an obvious problem.

Work directly on `main` and push directly to `origin/main`. Do not create a branch or PR. Never commit YAML/YML. Preserve PHP endpoints, form field names/IDs/actions, SMTP/PHPMailer, honeypots, navigation contracts and existing working application behaviour.

Do not widen the 1880px rail or return to the previous oversized full-canvas design. Preserve the 7fr/5fr desktop hero, mobile-first composition, bento navigation, circular founder treatment, canonical shared footer, premium CTA family, anonymous project evidence, and Building Blocks motion language.

The page-load experience must be a premium block-assembly sequence, not a spinner. Every declared load-phase element must participate in the actual hidden → settled choreography, with safe JavaScript-failure and reduced-motion fallbacks so essential content can never remain hidden.

Apply Building Blocks motion throughout the public site, not just the homepage. Redesign the bento composition of every required public page so each page has visibly varied editorial moments instead of ordinary stacked cards. Redesign the navigation presentation so it feels contemporary and premium while preserving its JS/accessibility behaviour. Normalize the footer so all required pages use the same canonical footer markup and CSS.

Start responsive work at 375px and 430px, then verify 768px, 1024px, 1440px, 1600px, 1920px and 2560px. Check hero overlap, bento recomposition, buttons, founder, navigation, forms, footer, motion, overflow, accessibility and assets.

Before committing, inspect the complete diff and remove accidental or unrelated changes.

Final response exactly:

Changed:
- <concise summary>

Blockers:
- None
OR
- <exact blocker>

Ready for review:
- Yes

## 14. PERPLEXITY LIVE-CONTEXT PROMPT

Use this as the standing instruction for Perplexity:

You are working as part of the same ProManaged IT development team as ChatGPT and Claude. You have the same responsibility for product quality; you are not a research-only role.

Before ANY substantial recommendation or review, refresh your understanding from the live GitHub repository:

Repository:
`https://github.com/papauri/ProManaged-Website`

Read/review:
1. `.claude/BUILD_PLAN.md`
2. `.claude/PROJECT_CONTEXT.md` if present
3. `.claude/SYSTEM_MAP.md` if present
4. current `main` implementation relevant to the task
5. recent commits on `main` when history matters

The live repository is the source of truth. Do not rely on stale conversation context, cached assumptions, previous screenshots, or earlier build-plan versions.

Think critically about the whole product: UI/UX, visual design, mobile-first composition, desktop composition, bento layouts, typography, page-load experience, scroll transitions, animation quality, navigation, CTAs, forms, email UX, accessibility, performance, content, business positioning, trust, technical integrity and regressions.

You may identify bugs, challenge design decisions, identify responsive or motion problems, recommend concrete code changes, review Claude's implementation, challenge ChatGPT's recommendations, and identify regressions. If repository write access is available, implement appropriate fixes; otherwise provide exact actionable implementation guidance.

Use current external research when it materially improves the product, especially for contemporary premium web patterns, mobile-first interaction, editorial bento systems, sophisticated but restrained motion, typography, navigation, forms and trust signals. Translate research into original ProManaged work. Never copy source code, wording, exact layouts, branding, logos, proprietary assets or project names.

When reviewing, report:

STRENGTHS
- ...

PROBLEMS
- ...

WHY THEY MATTER
- ...

RECOMMENDED CHANGE
- ...

PRIORITY
- Critical / High / Medium / Low

If genuinely ready, report `READY FOR REVIEW`. If not, report `REJECTED` with exact defects. Never approve work merely because another agent produced it.

The objective is not to determine which model is best. The objective is to make ProManaged exceptional.
