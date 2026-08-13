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
Before any substantial recommendation, review, or implementation, every agent must refresh its understanding from the current GitHub repository.

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

### Default execution model — IMPORTANT
Once the Build Plan is updated, Claude should **implement the entire active plan without waiting for a separate ChatGPT review between cycles**.

The normal loop is now:

**Read live repository → read Build Plan → implement complete active scope → self-check → inspect diff → commit → push → report.**

Do not stop after a superficial token/CSS pass.
Do not wait for ChatGPT to approve individual phases.
Do not split a single active objective into repeated approval gates unless the user explicitly asks for review.

The user is the primary visual acceptance gate. They will say what they dislike after seeing the implementation.

ChatGPT formal review is **optional**, performed only when the user explicitly requests `REVIEW` or asks for a technical/design audit.

### Shared acceptance standard
Before anything is considered finished, the implementing agent must confirm that:
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
- footer is complete and shared;
- there are no obvious overlaps or regressions;
- implementation matches the build plan;
- no unverified claims or fake project evidence were introduced.

This is a team, not a chain of command. Think together, challenge together, review together, improve together.

## 1. NON-NEGOTIABLE BASELINE

- Mobile-first is mandatory.
- Desktop visual rail: **1880px maximum**.
- Hero desktop composition: **7fr / 5fr**.
- Full-bleed surfaces are allowed; the content rail is not full-canvas.
- Text measures remain constrained independently from visual rail width.
- Do not return to the oversized 2200px/full-canvas experiment.
- No traditional horizontal navbar. Keep the logo-led bento navigation concept, but it MUST feel modern and premium.
- Plus Jakarta Sans remains the current type system unless a future deliberate typography change is made consistently everywhere.
- Existing `.btn`, `.primary`, `.secondary`, `.hero-buttons` are canonical and must not be renamed.
- Founder image remains the existing 800×800 asset, rendered as a restrained circular portrait.
- **One canonical footer system must be used across every required public HTML page.** Do not create page-specific footer designs.
- Work directly on `main`. Do not create a branch or PR.
- Never commit `.yml` / `.yaml` files.
- Do not modify privacy/legal content unless an objective broken-link/reference bug requires it.
- Every public page must also satisfy the Clarity Contract in Section 2B — plain-language pillar definitions, jargon-placement rules, the first-screen fold contract, and the pacing/motion intensity map.

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
- memorable loading and chapter transitions;
- **content-rich section choreography inspired by contemporary product sites, including the layered proof → detail → visual evidence rhythm seen on sites such as Markopolo.ai, without copying its branding, copy, assets, or exact layouts.**

### Specific inspiration to borrow at the pattern level
From contemporary product sites such as Markopolo.ai, take inspiration from:
- strong hero statement followed by a distinct visual proof layer;
- sections that alternate large editorial statements with supporting detail;
- repeated visual evidence blocks that change composition as the visitor scrolls;
- interface/product fragments used as storytelling, not decoration;
- horizontally or diagonally shifting content where appropriate;
- deliberate section pacing: statement → evidence → detail → proof → CTA;
- motion that makes the page feel like a living product rather than a stack of static cards.

Do NOT copy:
- Markopolo wording;
- exact layout;
- exact animation timings;
- images or illustrations;
- colours/branding;
- proprietary components;
- page structure one-for-one.

The result must remain distinctly ProManaged.

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

## 2B. SOPHISTICATED VISUALS + SIMPLE COMMERCIAL MESSAGE

The site must feel MORE advanced than its competitors while being EASIER for a customer to understand and buy. Both goals are mandatory; neither may be traded for the other. The sophistication is never simplified away, and comprehension is never deferred to a "read more".

### The psychological journey
A visitor must be able to conclude, within seconds of landing, and with zero prior familiarity:
1. what ProManaged does;
2. what problems it solves;
3. why it can be trusted;
4. what they can do next.

Homepage canonical order:

**INTRIGUE → UNDERSTANDING → RELEVANCE → PROOF → TRUST → DESIRE → ACTION**

- INTRIGUE — the hero. First charge of premium motion and composition. States the three capabilities in ≤12 words.
- UNDERSTANDING — one calm editorial statement of what ProManaged does, in plain language. Low density, no grid.
- RELEVANCE — capabilities mapped to problems. Bento allowed and encouraged here.
- PROOF — real delivered systems (Rosalyn's, Liwonde Sun Hotel). Evidence settles calmly; this chapter is gravity, not sparkle.
- TRUST — process and founder. A breathing, lower-density chapter.
- DESIRE — one outcome statement ("a system your team actually uses"), in plain words. No metrics.
- ACTION — contact/booking. The quietest chapter visually.

### Comprehension contract
- Canonical one-line definitions, used as the copy seed for every pillar mention:
  - Build — "We build the software your business runs on — booking systems, internal tools, customer-facing apps."
  - Source — "We find, buy and deliver the computers and equipment you need."
  - Support — "We keep it working — fixes, setups and a person on the phone when it breaks."
- Jargon placement rule: "SaaS", "multi-tenant", "integration", "dashboard", "infrastructure" may appear ONLY in supporting body copy — never in headings, tags, card titles, cues, eyebrows or first-screen copy.
- First-screen fold contract at 375×667: eyebrow + headline + one plain sentence + primary CTA all visible without scrolling.
- The so-what rule: every section answers one journey question (what we do / what problem it solves / why trust / what next). No decorative-only sections. Philosophy content condenses into supporting beats and never replaces explanation.

### Pacing: alternate wow and breathe
- Density map — bento/narrative density at: hero visual, capabilities, proof. Calm editorial statement sections at: understanding, founder/trust, contact.
- Dark-chapter rhythm: no two graphite chapters adjacent. A light breathing section always separates dark moments. Re-order or re-surface sections to achieve this without losing the graphite identity.
- No section may be as dense, or as animated, as its neighbour — contrast is the pacing mechanism.

### Motion intensity map
- Prominent: hero assembly, navigation panel open, the pinned stepper.
- Subtle: capability cards, founder reveal, evidence detail cards.
- Near-absent: the real-proof chapter (one quick group settle, no per-card sparkle), contact, footer.
- Absence of motion in calm chapters is deliberate contrast, not incompleteness. `prefers-reduced-motion` still resolves everything instantly.

### Real project proof ladder
- Homepage: one asymmetric proof chapter; the first beat is ONE image + one brand line; "Delivered work" tags separate real proof from illustrative UI.
- Build page: deepest proof. Public site captures lead; safe, cropped operational/admin interface views (rooms boards, menu management, dashboard stat tiles) may support them.
- get-started: one compact reminder strip before the form.
- learn-more: optional single line, never a second portfolio.
- Screenshot safety: captures must never show customer names, contact data, payment values, booking rows, login screens or internal identifiers. Never expose admin URLs. Crop intentionally; add explicit dimensions.
- Facts only: approved hotel names (Rosalyn's, Liwonde Sun Hotel) + "Malawian clients". No metrics, awards, testimonials or outcomes that are not verified. Bank Nkhonde must never appear publicly.

### CTA psychology
- Canonical class names (`.btn` / `.primary` / `.secondary`) never change. Exactly one primary per CTA row.
- Persistent nav-rail + hero primary: "Start a project".
- Capability CTAs/cues are problem questions:
  - Build → "Tell us what you're trying to automate."
  - Source → "Tell us what you need to source."
  - Support → "Tell us what keeps breaking."
- The contact section heading stays "Bring us the problem."

### Navigation comprehension
- The logo-led bento panel remains distinctive. The panel lead must state the three capabilities in one plain sentence; the first tile is always the primary action; the closed rail keeps a visible "Menu" label.
- Acceptance test: a first-time visitor reaches all three capabilities in at most two clicks, without instruction.

### Mobile translation
- 375/430 keep the same premium language: bento becomes a vertical asymmetric rhythm; hero/proof imagery may bleed to the viewport edges; hero microproof caps at two items on phones; the first-screen fold contract applies.

## 3. FULL-SITE UI/UX IMPLEMENTATION PRIORITIES

### A. SHARED FOOTER — CRITICAL / SITE-WIDE
The footer is not a component suggestion; it is a site-wide contract.

Every required public page must use the same canonical footer tree and class system:
- same semantic structure;
- same brand statement;
- same navigation groups;
- same contact area;
- same final CTA pattern;
- same privacy/legal access;
- same current-year treatment;
- same responsive behaviour.

Allowed difference:
- destination-relative links where necessary.

Not allowed:
- page-specific footer markup;
- old `.footer-promanaged` variants;
- miniature fallback footers;
- different CTA treatment per page.

Claude must audit every public HTML page and normalize the footer before declaring the site complete.

### B. BENTO COMPOSITION — CRITICAL / SITE-WIDE
The bento system is a core visual language, not something reserved for the homepage.

Every required public page must contain **at least two deliberately composed bento/editorial moments beyond the hero**, with visible variation in:
- spans;
- height;
- density;
- media ratio;
- alignment;
- whitespace;
- statement vs evidence.

Minimum page direction:
- homepage: multiple layered bento chapters;
- get-started: intake-board + proof/booking composition;
- learn-more: story/proof + capabilities composition;
- software: build process + interface/proof mosaic;
- hardware: sourcing journey + hardware/evidence mosaic;
- networking: infrastructure flow + topology/evidence composition.

Do not make all service cards equal height.
Do not make every section a 3-column grid.
Do not simply add rounded boxes and call it bento.

The visual rhythm should alternate between:
**large statement → supporting detail → evidence → whitespace → new composition → CTA.**

For every bento-dense chapter, an adjacent calm editorial chapter (single large statement + whitespace, no grid) must sit nearby, so bento reads as a peak rather than the page's default texture — see the pacing map in Section 2B.

### C. BUILDING BLOCKS MOTION — CRITICAL / SITE-WIDE
The motion language must visibly apply across the site.

Required on:
- homepage chapters;
- get-started chapters/forms;
- learn-more chapters;
- software sections;
- hardware sections;
- networking sections;
- founder/story sections;
- major contact sections;
- navigation panel open;
- footer where visually appropriate.

Use the existing vanilla JS/CSS architecture and `data-blocks` + `IntersectionObserver` unless a concrete technical reason requires a contained improvement.

Approved motion vocabulary:
- settle-up
- settle-side
- scale-in
- sequence-in

Motion should create a sense of **blocks resolving into a designed composition**.

Avoid simply adding `.fade-in` to everything.

Follow the motion intensity map in Section 2B: prominent at the hero assembly, navigation panel open and the pinned stepper; subtle around capability cards, the founder and evidence detail cards; near-absent at the real-proof chapter (one quick group settle, no per-card sparkle), contact and the footer. Absence in calm chapters is deliberate contrast, not incompleteness.

Required qualities:
- varied travel direction by chapter;
- meaningful stagger by group;
- slow premium easing;
- one entrance per group;
- no layout shift;
- no continuous animation;
- no parallax;
- no cartoon bounce.

Initial load:
- the first viewport should assemble in a designed sequence;
- all declared load-phase elements must actually participate;
- content must never remain hidden if JS fails or an animation is interrupted;
- mobile must resolve faster than desktop while retaining the same visual language.

### D. NAVIGATION — CRITICAL / REDESIGN
The current logo-led bento concept is correct, but the implementation must feel **contemporary, premium and distinctive**, not like an old full-screen menu with rectangles.

Keep the existing behaviour contracts:
- touch-friendly;
- keyboard support;
- Escape close;
- focus trap/restoration;
- scroll lock;
- accessible labels.

Redesign visually using:
- stronger editorial hierarchy;
- more sophisticated tile proportions;
- fewer but more intentional visual surfaces;
- subtle entrance choreography;
- clear active/hover states;
- stronger use of typography and whitespace;
- a visually distinctive close control;
- better service grouping.

The open panel should feel like a **navigation canvas / control surface**, not a conventional drawer or mega menu.

It must also stay comprehensible to a first-time visitor (Section 2B): the panel lead states the three capabilities in one plain sentence, the first tile is always the primary action, and the closed rail keeps a visible "Menu" label. A visitor reaches all three capabilities in at most two clicks without instruction.

### E. HERO — HIGH PRIORITY
Preserve:
- mobile-first composition;
- 7fr / 5fr desktop split;
- clear headline;
- two main CTAs;
- richer anonymous interface/project evidence;
- support facts.

The hero should tell a visual story immediately:
**statement → capability → interface evidence → support → action**.

No hero-support overlap at any target desktop width.

### F. MOBILE-FIRST FOUNDATION — HIGH PRIORITY
Start at 375px and 430px.

Mobile must have:
- deliberate bento rhythm;
- varied card proportions;
- strong first-screen hierarchy;
- touch-friendly navigation;
- intentional CTA stacking;
- complete footer;
- visible but efficient motion;
- comfortable forms.

Do not build desktop first and collapse it.

### G. FOUNDER / STORY — HIGH PRIORITY
Use the existing 800×800 founder asset:
- circular crop;
- sharp at rendered size;
- explicit dimensions;
- restrained size;
- personal editorial treatment;
- Build / Source / Support markers;
- motion consistent with the rest of the site.

### H. SERVICES / CAPABILITIES — HIGH PRIORITY
Build should lead visually, with Source and Support supporting. The canonical trio is **Build / Source / Support**; "Connect" is not a public capability name.

Use hierarchy, not three equal cards.
Every capability should contain enough information to understand the offer and a clear next action. Copy uses the plain-language definitions and problem-oriented CTAs from Section 2B; each description states the problem solved before the method.

### I. PROJECT / EVIDENCE CONTENT — HIGH PRIORITY
Follow the real-project proof ladder in Section 2B and `.claude/PROJECT_CREDIBILITY.md`:
- Anonymous CSS-drawn fragments remain the language for ILLUSTRATIVE UI, and stay labelled as illustrative.
- Real proof uses captures of the delivered public hotel sites plus safe, cropped operational/admin interface views (rooms boards, menu management, dashboard stat tiles). Captures must never show customer names, contact data, payment values, booking rows, login screens or internal identifiers.
- Do not expose admin URLs or login screens. Crop intentionally and add explicit dimensions.
- Never fabricate clients, project names, metrics, awards, testimonials, certifications, or outcomes. Bank Nkhonde must not appear publicly.

### J. CONTACT / BOOKING FORMS — HIGH PRIORITY
Forms must visually belong to the same design system:
- bento intake board;
- grouped fields;
- premium focus states;
- clear validation;
- polished loading/success/error states;
- mobile-first layout.

Preserve PHP endpoints, field names, IDs, actions, honeypot, SMTP, PHPMailer and validation logic exactly unless a verified bug requires a minimal fix.

### K. EMAIL TEMPLATES — MEDIUM/HIGH PRIORITY
Internal receiving emails and customer replies should be branded, curated and scannable while preserving transport, escaping and plain-text alternatives.

## 4. RESPONSIVE ART DIRECTION

Implementation order:
375 → 430 → 768 → 1024 → 1440 → 1600 → 1920 → 2560.

At every size check:
- overflow;
- clipped text;
- card collisions;
- dead space;
- image distortion;
- CTA wrapping;
- navigation usability;
- footer completeness;
- motion quality.

Large screens should gain richness from composition and evidence, not from stretching every element edge-to-edge.

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

Do not break:
- `js/main.js`;
- `js/mobile_phone_navbar.js`;
- `js/form_intake.js`;
- PHP endpoints;
- PHPMailer;
- SMTP;
- honeypots;
- form field names/IDs/actions;
- navigation contracts;
- existing links.

Do not rewrite application logic to solve CSS problems.

## 9. CLEANUP / SECURITY

Audit/remove verified references to:
- Render.com hosting/deployment;
- Render deploy hooks/config;
- eBay integrations;
- RAWG/game data integrations;
- obsolete pricing/review/search logic.

Keep ordinary English uses of the word `render`.

Never commit YAML/YML.

## 10. FULL IMPLEMENTATION CYCLE

### Phase 1 — Site-wide normalization
- canonical footer on every required public page;
- shared CTA system;
- shared spacing/type tokens;
- shared motion classes/hooks;
- eliminate page-specific visual drift.

### Phase 2 — Navigation redesign
- redesign the open panel visually;
- preserve interaction/accessibility contracts;
- introduce sophisticated tile hierarchy and entrance choreography.

### Phase 3 — Page-wide bento compositions
- implement at least two strong bento/editorial moments beyond the hero on every required public page;
- vary composition patterns across pages;
- use interface evidence and storytelling blocks rather than generic cards.

### Phase 4 — Motion rollout
- initial page-load assembly;
- chapter transitions on all pages;
- evidence choreography;
- founder reveal;
- form/contact transitions;
- navigation opening sequence.

### Phase 5 — Responsive/polish pass
- mobile-first refinements;
- tablet recomposition;
- desktop composition;
- CTA/focus states;
- image loading;
- final content rhythm.

## 11. DEFINITION OF DONE

- [ ] Every required public page uses the same canonical footer structure.
- [ ] No old/partial footer variant remains.
- [ ] Every required public page has at least two deliberate bento/editorial moments beyond the hero.
- [ ] Bento patterns are visibly varied; no page is just repeated equal cards.
- [ ] Building Blocks motion is visibly applied across the site, not only the homepage.
- [ ] Initial page-load choreography works and has safe fallback behaviour.
- [ ] Navigation visually feels contemporary and premium, not old-school.
- [ ] Hero remains balanced 7/5 at desktop and deliberately composed on mobile.
- [ ] Founder portrait is circular, sharp and restrained.
- [ ] CTA anchors feel intentional everywhere.
- [ ] Forms and email templates retain working backend contracts.
- [ ] 375/430/768/1024/1440/1600/1920/2560 layouts are usable.
- [ ] No overlap, horizontal overflow or giant dead zones.
- [ ] No unapproved project/client claims.
- [ ] No pricing on the software page.
- [ ] Every public page passes the Clarity Contract (Section 2B): plain pillar definitions, no jargon in headings/tags/cues, the 375×667 first-screen fold contract.
- [ ] Homepage journey follows INTRIGUE → UNDERSTANDING → RELEVANCE → PROOF → TRUST → DESIRE → ACTION; no two graphite chapters adjacent.
- [ ] Motion presence follows the intensity map; calm chapters are calm by design.
- [ ] Real project proof ladder in place (homepage beat, Build-page deep dive, get-started reminder, optional learn-more note); no sensitive data visible in any capture.
- [ ] Capability CTAs use problem-oriented language; exactly one primary per CTA row.
- [ ] Navigation lead states the three capabilities in one plain sentence; the rail's Menu label is visible; capabilities reachable in ≤2 clicks.
- [ ] SYSTEM_MAP reconciled with the live repository (canonical Build / Source / Support trio).
- [ ] No Render/eBay/RAWG legacy logic where not required.
- [ ] No YAML/YML committed.
- [ ] Full diff inspected before commit.

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

## 13. REQUIRED CLAUDE EXECUTION PROMPT

Use a fresh Claude session (`/clear`) and paste:

Read `.claude/BUILD_PLAN.md` completely before touching any code.

Refresh from the LIVE repository first:
- `.claude/BUILD_PLAN.md`
- `.claude/PROJECT_CONTEXT.md` if present
- `.claude/SYSTEM_MAP.md` if present
- current `main` files relevant to the task
- recent commits when history matters

The Build Plan is the implementation instruction.

Implement the entire active build plan in one continuous cycle. Do not wait for a ChatGPT review between steps. Do not stop after token changes, one page, one section, or one animation hook.

The user will judge the rendered result and request further changes after seeing it.

Priorities:
1. Shared footer across every required public page.
2. Modern navigation redesign while preserving existing behaviour/accessibility contracts.
3. Site-wide bento/editorial compositions on every required public page.
4. Site-wide Building Blocks load + scroll motion.
5. Mobile-first responsive art direction.
6. Final polish of founder, CTAs, forms and evidence.
7. Apply the Clarity Contract and pacing map (Section 2B) throughout: plain-language pillar definitions, jargon placement, the first-screen fold contract, the INTRIGUE → UNDERSTANDING → RELEVANCE → PROOF → TRUST → DESIRE → ACTION order, the motion intensity map, problem-oriented CTAs and the real-project proof ladder. Priorities 1–6 must not break this contract.

Use contemporary product-site inspiration at the pattern level where useful, including the visual rhythm and transition approach seen on Markopolo.ai: strong statement, visual proof, alternating detail/evidence blocks, layered interface fragments, and dynamic section pacing. Do NOT copy Markopolo's branding, wording, assets, colours or exact layout.

Do not widen the rail beyond 1880px.
Do not return to the oversized full-canvas experiment.
Preserve the balanced 7fr/5fr desktop hero.
Preserve working PHP, forms, SMTP/PHPMailer, navigation JS, field names/IDs/actions and accessibility behaviour.
Never commit YAML/YML.
Work directly on `main` and push to `origin/main`.
Do not create a branch or PR.

Before committing:
- inspect the entire diff;
- remove accidental/unrelated changes;
- confirm every page has the shared footer;
- confirm every required page has at least two strong bento/editorial moments beyond the hero, each balanced by a calm editorial neighbour per the pacing map;
- confirm Building Blocks motion is actually wired across those pages AND follows the Section 2B intensity map (calm chapters stay calm);
- confirm the navigation is visually modern and states the three capabilities in one plain sentence;
- confirm the 375×667 first-screen fold contract (eyebrow + headline + one plain sentence + primary CTA);
- confirm no two graphite chapters sit adjacent;
- confirm capability CTAs use the problem-oriented language from Section 2B;
- confirm the real project proof ladder is in place and no capture shows personal or operational data;
- confirm the canonical Build / Source / Support trio is used everywhere (no "Connect" as a public name);
- confirm mobile-first layouts;
- confirm no regressions.

Final response exactly:

Changed:
- ...

Blockers:
- None
OR
- ...

Ready for review:
- Yes

## 14. PERPLEXITY LIVE-CONTEXT PROMPT

Before any substantial recommendation or review, Perplexity must refresh against:
- `.claude/BUILD_PLAN.md`
- `.claude/PROJECT_CONTEXT.md` if present
- `.claude/SYSTEM_MAP.md` if present
- current `main`
- recent relevant commits

Repository:
`https://github.com/papauri/ProManaged-Website`

Perplexity has the same responsibility as ChatGPT and Claude for product quality. It is not limited to research. It should challenge design, UX, responsive behaviour, motion, navigation, forms, performance, accessibility, business positioning and technical integrity.

When useful, use fresh external research to benchmark contemporary premium web patterns. Translate references into original ProManaged work and never copy code, wording, branding, exact layouts, proprietary assets or project names.

The shared objective is a modern, premium, mobile-first ProManaged site that feels like a serious technology partner, with rich editorial composition and intelligent motion.