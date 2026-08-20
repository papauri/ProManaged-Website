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

### Execution completion contract — no approval gates

- Execution NEVER requires review to proceed. Review is **view-only**: it looks at already-delivered work after delivery. It can never gate, block, delay or interrupt execution.
- Every execution cycle MUST complete: the full active scope is implemented, self-checked, committed, pushed and reported within the same cycle. No partial delivery parked mid-cycle awaiting approval; no continuation deferred to a review cycle.
- Self-check replaces external approval. The implementing agent verifies its own work against the Build Plan and the Definition of Done before committing; the full diff inspection is the quality gate.
- If something genuinely cannot be completed (missing asset, conflicting requirement, external dependency), it is listed under `Blockers` in the final report. `Blockers` is never used as a reason to defer active work that can be done.
- When the user explicitly requests `REVIEW`, that is an after-the-fact audit of delivered work, not a permission step for upcoming work.

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

- INTRIGUE — the hero. First charge of premium motion and composition. States the three capabilities in ≤12 words, in plain nouns. The headline names the work; a headline that only sets a mood ("Technology that behaves itself.") does not satisfy this beat, because a first-time visitor still cannot say what is for sale.
- UNDERSTANDING — one calm editorial statement of what ProManaged does, in plain language. **This beat is delivered by the head of the `#what-we-do` route band, not by a section of its own.** It used to be a standalone chapter sitting between the route band and the capabilities bento, which made the top of the homepage answer "what do you do" three times running — hero, routes, statement — before anything new was said. The statement now leads the route band and the routes follow it immediately, so understanding and the way to act on it are the same beat. Its density budget still applies to the head itself: an eyebrow, one heading, one paragraph, no cards. The studio-positioning copy it also carried ("a small studio for people who were quoted enterprise prices…", the registration and where-we-work note) moved into TRUST, beside the founder, which is where a visitor actually asks it.
- RELEVANCE — capabilities mapped to problems. Bento allowed and encouraged here.
- PROOF — real delivered systems (Rosalyn's, Liwonde Sun Hotel). Evidence settles calmly; this chapter is gravity, not sparkle.
- TRUST — process and founder. A breathing, lower-density chapter.
- DESIRE — a vivid after-state statement in plain words ("a system your team actually uses"). This chapter is the emotional peak of the journey: picture the working day once the problem is solved — quiet systems, no workarounds, a person who answers. Aspiration through a concrete after-state, never fabricated metrics. It must not read as the weakest chapter.
- ACTION — contact/booking. The quietest chapter visually.

### Comprehension contract
- Canonical one-line definitions, used as the copy seed for every pillar mention:
  - Build — "We build the software your business runs on — booking systems, internal tools, customer-facing apps."
  - Source — "We find, buy and deliver the computers and equipment you need."
  - Support — "We keep it working — fixes, setups and a person on the phone when it breaks."
- Jargon placement rule: "SaaS", "multi-tenant", "integration", "dashboard", "infrastructure" may appear ONLY in supporting body copy — never in headings, tags, card titles, cues, eyebrows or first-screen copy.
- First-screen fold contract at 375×667: eyebrow + headline + one plain sentence + primary CTA all visible without scrolling.
- The so-what rule: every section answers one journey question (what we do / what problem it solves / why trust / what next). No decorative-only sections. Philosophy content condenses into supporting beats and never replaces explanation. A section that answers a question an earlier section has already answered is a duplicate, not a reinforcement, and must be merged into the beat that answers it best.
- Route-band contract: the homepage's second chapter (`#what-we-do`) must carry, in this order, the plain-language statement of the whole company, a direct link for every thing a visitor can buy, named in the visitor's words rather than in the pillar taxonomy, and one line for the visitor who cannot place themselves in the list. It is the page's "how do I get to the thing I came for", and it may not be pushed below any other chapter.
- **Landing contract — a link arrives where its own words promised.** No card, route, capability tile or CTA may drop the visitor at the top of a page and leave them to find the part it named. Two kinds, and the difference is what stops the route band and the capabilities chapter becoming the same band:
  - a **route** names a thing the visitor came for, so it lands on the section that IS that thing (`#what-we-build`, `#categories`, `#support-services`, a builder's `#begin`);
  - a **capability card** carries a "Tell us…" cue, so it lands on the section where they can do exactly that (`#tell-us`, `#contact`).
  And a link whose text invites the visitor to WRITE something — "describe the problem", "send a message", "ask a question" — must land on a section containing a free-text box. Enforced by `node tests/links.test.js`, which also fails any `#fragment` that resolves to nothing.

### Guided configurators: the step gate

Both `pages/website_builder.html` and `pages/hospitality_builder.html` are long
interactive instruments. Two rules govern how they are shown, and they apply to any
future configurator as well.

1. **Opt-in before instrument.** No interactive chapter may be on screen for a
   visitor who has not said they want the thing being configured. Each builder
   opens on a plain gate (`#begin`) that states what the form is, what it is *not*
   (never a quote), roughly how long it takes, and that no contact details are
   asked for until the end. One control opens the instrument.
2. **One chapter at a time, with real validation.** A chapter is revealed by the
   previous chapter's continue control, and that control refuses to advance while
   the current chapter's requirements are unmet — with a sentence naming what is
   missing and the focus moved to the first gap. The closing form additionally
   refuses to submit an incomplete configuration. Server-side validation in the
   PHP endpoint is unchanged and remains the real gate; the client message exists
   so the visitor knows what to fix.

The gate also has to answer "what am I filling in" at every point, which is what
the numbered outline on the gate panel is for — it is static markup, so it reads
before the script runs and with the script absent.

Implementation notes that are contractual:

- `js/builder_flow.js` is shared by both builders and knows nothing about either
  one's internal state: a chapter declares completeness in its own markup
  (`data-builder-step`, `data-step-require`, `data-step-missing`,
  `data-step-focus`). Adding a chapter means adding those attributes and an
  outline entry, not editing the shared file.
- Its click listener runs in the **capture phase**. `js/main.js` binds its
  smooth-scroll handler directly to every `a[href]`, so a bubble listener is too
  late to stop a blocked control from pushing the destination into the URL.
- Nothing is hidden without JavaScript. The whole page still reads top to bottom
  with the script absent, and the continue controls stay ordinary anchors.
- `node tests/builder_flow.test.js` asserts the whole attribute contract, plus the
  homepage surface rhythm below.

### Pacing: alternate wow and breathe
- Density map — bento/narrative density at: hero visual, capabilities, proof. Calm editorial statement sections at: understanding, founder/trust, contact.
- Dark-chapter rhythm: no two graphite chapters adjacent. A light breathing section always separates dark moments. Re-order or re-surface sections to achieve this without losing the graphite identity.
- No section may be as dense, or as animated, as its neighbour — contrast is the pacing mechanism.

### Motion intensity map
- Prominent: hero assembly, navigation panel open, the pinned stepper.
- Subtle: capability cards, founder reveal, evidence detail cards.
- Near-absent: the real-proof chapter (one quick group settle, no per-card sparkle), contact, footer.
- Absence of motion in calm chapters is deliberate contrast, not incompleteness. `prefers-reduced-motion` still resolves everything instantly.

### Interest generation without cheapening the brand

Luxury here means craft, evidence and calm — not exclusivity or mystery. Clarity is the bridge between premium and broad appeal; the two are never traded against each other. Broad appeal comes from being easy to understand and easy to start, while every surface keeps Signal & Systems restraint. Four mandatory mechanisms:

1. **Aspiration beat (DESIRE)** — the DESIRE chapter is the emotional peak of the homepage journey. It must picture the after-state concretely (the working day once the system works) without inventing metrics. Aspiration comes from a recognisable outcome, not from numbers, awards or hype language.
2. **Graduated CTA ladder** — commitment levels must be graduated, not binary:
   - High commitment: "Start a project" (hero, persistent rail, contact).
   - Middle step: learn-more positioned as a designed conversion on-ramp, not an information dump — it must end in a clear, inviting next action.
   - Low commitment: the problem-question cues on capability tiles ("Tell us what keeps breaking.").
   A first-time visitor who is interested but not ready must always have a welcoming next step.
3. **Depth over breadth in proof** — only two real projects are approved (Rosalyn's, Liwonde Sun Hotel); proof therefore wins by depth, not volume. One rich narrative beat (problem → build → result-in-words) converts better than several shallow cards. Illustrative UI fragments must never sit at the same visual weight as real proof.
4. **Pain-first RELEVANCE copy** — the RELEVANCE chapter leads with the visitor's pain, not with ProManaged's taxonomy. Copy must make a first-time visitor recognise their own situation ("that's exactly us") before naming the capability. Capability names follow the pain, never precede it.

These mechanisms are copy and sequencing work. None of them may introduce decoration, urgency pressure, countdown/discount language, stock persuasion patterns, or anything that breaks the Signal & Systems restraint.

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

> Status legend: `[x]` verified against the live repository this cycle (evidence noted); `[ ]` genuinely unverified or requires rendered/browser QA not yet performed. Do not flip an item to `[x]` without re-checking the live files.

- [x] Every required public page uses the same canonical footer structure. — `class="footer"` present exactly once on all 9 public pages (index, get-started, learn_more, privacy_policy, custom_websites, hardware_sourcing, it_support, hospitality_builder, website_builder).
- [x] No old/partial footer variant remains. — no `.footer-promanaged` markup left; only a code-comment in `css/footer_promanaged.css` noting its removal.
- [x] Every required public page has at least two deliberate bento/editorial moments beyond the hero. — rendered QA (Chromium/Playwright, full-page captures at 375 and 1440) confirms every page carries ≥2 composed bento/editorial chapters past the hero: homepage (asymmetric capabilities block + proof + pinned stepper + why-band + mission), custom_websites ("Three shapes" + deep "What we have built" narrative), hardware_sourcing (category mosaic + "behind one order" evidence), it_support ("seven things" mosaic + illustrative cards), learn_more ("work in more detail" mosaic + promises), get-started (intake board + booking board).
- [x] Bento patterns are visibly varied; no page is just repeated equal cards. — rendered captures show unequal spans/heights on every page (e.g. custom_websites: full-height "Web applications" card beside two shorter cards; hardware_sourcing: large "Laptops & desktops" + wide dark "Upgrades" card; it_support: two lead cards over a five-card grid). No page is a uniform equal-card grid.
- [x] Building Blocks motion is visibly applied across the site, not only the homepage. — `data-blocks`/`data-blocks-pace` attributes present on chapter sections across all 9 pages. Note for future chapters: the attribute alone is not enough — a chapter whose content matches nothing in `UNIT_SELECTOR` in `js/main.js` gets no motion at all. New chapter types must be registered there (the homepage route band is `.routes-grid > .route`).
- [x] Initial page-load choreography works and has safe fallback behaviour. — `js/boot.js` has a bounded `MAX` ceiling independent of the authorized `MIN_HOLD` brand beat (see PROJECT_CONTEXT "Boot overture exception"); `prefers-reduced-motion` drops to a plain held plate.
- [x] Navigation visually feels contemporary and premium, not old-school. — rendered capture of the open panel (`#nav-trigger` → `nav_open_1440.png`) shows a full-viewport control-surface, not a drawer: a large warm "Start a project / START HERE" primary tile beside numbered 01·Build / 02·Source / 03·Support capability tiles, a secondary Home/Process/Contact row, footer links and a distinctive circular close control. Behaviour re-verified in-browser: opens with `aria-expanded=true` + body scroll-lock, Escape closes and restores focus to the trigger.
- [x] Hero remains balanced 7/5 at desktop and deliberately composed on mobile. — `css/hero_section.css` implements the 7fr/5fr desktop split per `--rail-visual: 1880px`.
- [x] Founder portrait is circular, sharp and restrained. — `.about-media--portrait` and `.about-media--portrait img` both set `border-radius: 50%` in `css/about_section.css`; `images/founder.png` rendered at explicit 800×800.
- [x] CTA anchors feel intentional everywhere. — every `.btn.primary` occurrence sits alone in its CTA row across all 9 pages (verified by grep of every group, and re-verified in the browser on the two builder pages: no `.btn-row`, `.hero-buttons`, `.intake-action` or `.nav-rail-actions` group holds more than one primary).
- [x] Forms and email templates retain working backend contracts. — `booking.php`/`contact.php` expected field names match the live form markup exactly (`get-started.html`, `pages/hardware_sourcing.html`); `php/env.php`/`php/mailer.php` pull credentials from env vars only. Re-verified this cycle after `php/` was deleted and restored (see Current Status) — the restored files are byte-identical to the last verified commit, so this line's original evidence still holds.
- [x] 375/430/768/1024/1440/1600/1920/2560 layouts are usable. — rendered QA (Chromium/Playwright) loaded the original 7 public pages at every one of the 8 breakpoints (56 combos). Every combo returned `scrollWidth == clientWidth` (max horizontal overflow across all 56 = 0px) and no JS/page console errors (the only console noise is this sandbox aborting the Google Fonts + Font Awesome CDNs, which load normally in production). The two builder pages added later were verified to the same standard in their own cycles, **in their fully-expanded state** (every choice made, every module selected, every detail panel open) — which is the widest the layout ever gets and the state a page-load sweep never reaches.
- [x] No overlap, horizontal overflow or giant dead zones. — 0px horizontal overflow at all 56 page/breakpoint combos; full-page captures show continuous composition with no dead canvas. A full-scroll pass on every page confirmed 0 content units left stranded at opacity:0 after their observer fired (the only intentional opacity:0 is the 3 dimmed pinned-stepper steps above 1024px, which is the designed focus behaviour in `js/main.js`).
- [x] No unapproved project/client claims. — "Bank Nkhonde" absent from all public HTML/CSS/JS (doc-only reference in `.claude/PROJECT_EVIDENCE.md` corrected).
- [x] No pricing on the software page. — no currency/pricing language in `pages/custom_websites.html`; FAQ explicitly defers ("It depends entirely on scope").
- [x] Every public page passes the Clarity Contract (Section 2B): plain pillar definitions, no jargon in headings/tags/cues. — grepped "SaaS/multi-tenant/integration/dashboard/infrastructure" sitewide; all hits are in body `<p>`/`<li>` copy, none in headings/tags/cues/eyebrows.
- [x] Homepage journey follows INTRIGUE → UNDERSTANDING → RELEVANCE → PROOF → TRUST → DESIRE → ACTION; no two graphite chapters adjacent. — verified section order/classes in `index.html`: hero → what-we-are(ivory) → services → proof(stone) → how-we-work(graphite) → about → why-us(ivory) → mission-vision(stone) → contact(ivory).
- [x] Motion presence follows the intensity map; calm chapters are calm by design. — `data-blocks-pace="calm"` present on the proof, why-band and contact/mission chapters (the near-absent list); prominent chapters (hero, how-we-work) omit it.
- [x] DESIRE chapter reads as the emotional peak of the journey: concrete after-state, no fabricated metrics, not the weakest chapter. — `#mission-vision` ("Nobody is chasing a workaround by Tuesday") states a concrete after-state with no invented numbers.
- [x] Graduated CTA ladder in place. — hero/rail/contact carry "Start a project"; capability tiles carry problem-question cues ("Tell us what keeps breaking," etc.); learn-more is linked as a secondary CTA throughout.
- [x] Proof uses depth over breadth. — homepage proof chapter is one asymmetric evidence block with a single narrative beat; only Rosalyn's and Liwonde Sun Hotel are used.
- [x] RELEVANCE copy is pain-first. — each capability card opens with a pain statement ("The booking spreadsheet has quietly become a second job.") before naming the capability.
- [x] Real project proof ladder in place; no sensitive data visible in any capture. — homepage first beat is one image + brand line + "Delivered work" tag; get-started carries one compact strip; learn-more carries one line; alt text/comments explicitly scope captures to public-facing views only.
- [x] Capability CTAs use problem-oriented language; exactly one primary per CTA row. — confirmed in `#services` capability cards and verified across all `.btn.primary` groups sitewide.
- [x] Navigation lead states the three capabilities in one plain sentence; the rail's Menu label is visible; capabilities reachable in ≤2 clicks. — `.nav-panel-lead-text` states "We build your software, source your equipment and keep both working."; all three capability tiles sit directly in the panel (1 click from any page).
- [x] SYSTEM_MAP reconciled with the live repository (canonical Build / Source / Support trio). — `.claude/SYSTEM_MAP.md` reflects the current page list, canonical trio and current CSS/JS architecture; no "Connect" or `network_infrastructure.html` references remain anywhere in the repo.
- [x] No Render/eBay/RAWG legacy logic where not required. — no matches anywhere in the repo (excluding ordinary English "render").
- [x] No YAML/YML committed. — none present in the repository tree.
- [ ] Full diff inspected before commit. — a per-cycle process step, not a standing repository state; confirm at each implementation cycle rather than checking off permanently.

## Current Status

- **Completed (latest cycle):** Upgraded the pointer and scroll motion — the two pieces of the site that were still speaking a different language from the Building Blocks choreography.

  **The cursor.** The corner-bracket reticle became a single hairline outline (commit `64e94bb`), and this cycle gave it real physics. The spring is now **frame-rate independent** — `EASE` is expressed per 60Hz frame and re-derived from measured elapsed time, so the weight is identical on a 60Hz and a 120Hz display; previously a high-refresh monitor converged twice as fast, which is why the cursor felt different on different machines. Corner radius is eased alongside position and size, so a circle becoming a card outline is one continuous morph rather than a box that springs while its radius jumps on frame one. **Solid controls are now acquired**: a `.btn`, `button`, `[role="button"]` or `.route` is traced at its own edge with its own radius (capped to half the traced height, so a pill stays a pill) instead of getting a generic floating circle — an inline link inside a paragraph deliberately still does not, because tracing a few words mid-sentence reads as a highlight and running copy already has the caret mode. A **lag stretch** elongates the free ring along its direction of travel, driven by how far it is currently behind the pointer, so it grows on a flick and resolves itself as the ring catches up — suppressed entirely whenever the outline is traced to something, since geometry that stretches is just wrong, and zeroed under `prefers-reduced-motion`. A press now tightens the free ring hard (0.86) but barely moves a traced outline (0.985), because shrinking a whole card's outline reads as the card recoiling.

  **Page travel.** Native `behavior: smooth` moves at a near-constant rate and stops dead. `window.pmScrollTo` in `js/main.js` replaces it with the same weighted in-out the reveal uses — measured in-browser: `0 → 6 → 59 → 187 → 603 → 989 → 1558 → 1834 → 1985 → 2000`, a clear lean-in, decisive middle and long settle. Three things in it are load-bearing rather than decoration: it suppresses the global `html{scroll-behavior:smooth}` for the duration (left on, the browser animates toward every intermediate position the loop writes and the two fight to a standstill); **any** visitor input — wheel, touch, pointer, key — cancels it instantly, which is the single omission that makes most hand-rolled smooth scrolling feel broken; and it lands instantly when `prefers-reduced-motion` is set or the tab is hidden, since `requestAnimationFrame` is suspended in a background tab and an animated jump started there would never run a frame and would strand the override. `js/builder_flow.js` delegates to it when present (with its previous behaviour intact as a fallback), so builder chapters travel with the same weight instead of keeping a second curve. The back-to-top control moved from `[hidden]` to a class — `display:none` cannot transition, so it used to appear and vanish on a single scroll pixel; it now lifts and fades, and stays out of the tab order via `visibility` while away. The anchor offset is also now read per jump rather than cached at load, because `--nav-float` is breakpoint dependent and a value measured at 1440px is wrong after the window is dragged narrow.

  **Verified in Chromium against a local PHP server.** The scroll curve, exact landing, `scroll-behavior` suppression and cleanup, and the hidden-tab instant path were all measured directly. The traced card outline, its label chip and the back-to-top control's visible state were confirmed in a rendered capture. Cursor mode selection (`link` / `frame` / `text`), solid-control acquisition and the per-card label were asserted functionally, and the ring was observed converging toward the correct acquired geometry. Not captured fully-settled in-browser: the lag stretch and the solid-control outline at rest — Chrome's intensive background throttling stalled `requestAnimationFrame` in the occluded automation tab, so those remain verified by measurement rather than by screenshot. All six test suites pass (`links`, `builder_flow`, `website_builder`, `hospitality_builder`, and both PHP endpoint suites).

- **Completed (previous cycle):** Restored a deleted production backend, then re-verified anchoring/navigation integrity sitewide.

  **Regression found and reverted.** Commit `6778bdc` ("gemini AI") — pushed directly to `main` by another agent between build-plan cycles — deleted the entire working PHP backend (`php/mailer.php`, `contact.php`, `booking.php`, `hospitality.php`, `website.php`, both catalogue endpoints, `env.php`, the vendored PHPMailer library) and `images/founder.png`, replacing the backend with a Node/Express `server.js` that only mocked the endpoints: it logged to console and always returned a fake success message without sending any email. Every contact/booking/enquiry form on the live site was telling visitors their message was received while silently dropping it, and the founder portrait was a broken image. This also resurrected a Node/`package.json` scaffold that an earlier cycle (`49897d3`) had explicitly removed as an "abandoned backend" — the site is deployed on shared PHP/cPanel hosting (`.htaccess`, `php/env.php`'s own comments confirm this), so the Node server was never wired into the actual deployment target. Commit `a49fdf1` restores `php/`, `php/vendor/PHPMailer` and `images/founder.png` from the last known-good commit and removes `server.js`/`package.json`/`package-lock.json`/`.env.example`. No HTML/CSS/JS was touched by the deletion, so the frontend was never affected. `tests/links.test.js` and `tests/builder_flow.test.js` pass against the restored tree; pushed to `origin/main`.

  **Anchoring audit (this cycle's requested scope).** Re-verified every button/card/route destination sitewide against `tests/links.test.js`'s existing contract (unique ids per page, every local `href`/`src`/`data-target` resolves, every `#fragment` resolves to a real id, every "describe/tell us/send a message" invitation lands on a section with an actual `<textarea>`, the homepage route band lands on substance and capability cards land on their named invitation) — all pass across all 9 pages. Confirmed the fixed nav rail is compensated everywhere an anchor can land: `css/global_styles.css` sets `scroll-margin-top` on every `[id]` sitewide (covers plain cross-page `href="page.html#id"` navigation on load), `js/main.js`'s same-page anchor handler and `js/builder_flow.js`'s chapter `scrollToSection` both independently compute `--header-h + --nav-float` before scrolling. No stray single-quoted `href`/`src`, no `<button>`-driven navigation outside the already-covered `.service-card` `data-target` pattern, no CSS `url()` or `srcset` references to check. Spot-checked the nav panel's relative paths on a nested `/pages/` page (`it_support.html`) against the homepage version — both resolve correctly per page depth.

- **Completed (previous cycle):** The landing contract — every card, route and CTA now arrives where its own words promised, and the form the copy has been promising for months now exists.

  **The missing form.** `get-started.html` carried only the BOOKING form (name, email, service, date, time). Every "describe the problem in plain words" / "send a message" / "ask a question" link on the site pointed either there or at `index.html#contact`, which has no form on it at all — so the site invited you to describe the problem and handed you a date picker. The only free-text enquiry form on the whole site was on the hardware sourcing page. `get-started.html#describe` is the fix: same `.intake` language, same `php/contact.php` endpoint, same honeypot, field ids prefixed `gs-` because the booking form on the same page already owns `#name`/`#email`/`#website`. One additive change to the endpoint — `'Get started' => 'New project enquiry'` in the allow-list, so this mail is not mislabelled as a website enquiry — and one backwards-compatible change to `js/form_intake.js` (`data-feedback`, so a page with two boards can give each its own live region). Six invitation links across four pages now reach it.

  **Deep links everywhere.** All 19 outbound destinations on the homepage now carry a fragment, split by intent: routes land on the substance (`#what-we-build`, `#categories`, `#support-services`, `#begin`), capability cards land on the invitation their "Tell us…" cue promises (`#tell-us`, `#contact`). The two closing CTA bands on the Build and Support pages gained `#tell-us` ids to land on. `node tests/links.test.js` is new and enforces all of it, plus unique ids, real files and live fragments across all nine pages.

  **Verified in Chromium against a local PHP server.** All 10 deep-link destinations land on the named section clear of the fixed rail, with the expected heading; a real capability-card click navigates and lands correctly. The new form: empty submit → zero POSTs, four inline field errors, message in its **own** live region with the booking form's untouched; valid submit → one POST to `php/contact.php` carrying `enquiry_type=Get started`; the booking form still resolves to its own region. Endpoint exercised only on paths that send no mail — honeypot → 200 without sending, missing message → 400, GET → 405 — so no real email was sent. 0px overflow and zero stranded content on `get-started.html` at 375/768/1440, surface rhythm intact with the new chapter. No console errors.

- **Completed (previous cycle):** Two pieces of work, both driven by the homepage and the builders being unclear about what is on offer.

  **Homepage clarity and flow.** The hero headline now names the work ("We build it, source it, and keep it working.") instead of setting a mood, the subtitle states all three capabilities in ten words, the microproof strip states what is sold rather than making three soft trust claims, and the second hero action goes to the route band instead of to a second document. The route band `#what-we-do` absorbed the standalone `#what-we-are` statement and is now the UNDERSTANDING beat as well as the signpost list; the studio positioning and the registration/where-we-work note moved into the founder chapter, which is where a visitor asks them. The homepage is **9 chapters, down from 10**, and the top of the page answers "what do you do" once rather than three times. The retired `.why-grid` / `.why-lead` / `.why-note` rules were removed from `css/why_band.css`; `#why-us` and its fact cards are untouched.

  **The builder step gate.** Both configurators now open on a plain gate and reveal one chapter at a time — see the Guided configurators section above for the full contract. New: `js/builder_flow.js`, `css/builder_flow.css`, `tests/builder_flow.test.js`. A real bug was found and fixed during browser verification: the gate's click listener had to move to the capture phase, because `js/main.js` binds its smooth-scroll-and-push-the-hash handler directly to every anchor and was pushing `#foundation` into the URL on a *blocked* control.

  **Verified in Chromium against a local server, not waived.** Both builders: gated on load (every chapter carries `hidden`, page height 3291px instead of the full instrument); start opens step 1 only and scrolls to it; a blocked continue control leaves the URL alone, leaves the next chapter closed, shows its hint and moves focus to the first gap; a half-answered chapter stays blocked; completing it unblocks; the full seven-step walk opens each chapter in turn with the outline tracking Done / You are here / Locked. Submitting with chapter 01 broken makes **zero** network requests and shows the reason; fixing it submits and the payload carries the configuration. Zero stranded (`opacity:0`) content and 0px horizontal overflow on the homepage and both builders at 375/768/1440, and on `custom_websites.html` at 375. The 375×667 first-screen fold contract still holds with the new headline (eyebrow 116–135, headline 155–291, sentence 315–373, primary CTA 405–459 of 666) and the microproof still caps at two items on a phone. No console errors.

- **Previously completed:** Performed the rendered/browser QA that earlier cycles had to waive — Chromium + Playwright across the public pages × 8 breakpoints (375/430/768/1024/1440/1600/1920/2560). Verified: 0px horizontal overflow; no stranded (opacity:0) content after a full-scroll reveal pass; bento variety and ≥2 editorial moments beyond the hero on every page; the navigation open-panel control-surface plus its open/scroll-lock/Escape/focus-restore contract.

  **The site is now 9 public pages, not 7.** Two guided configurators were added (`pages/hospitality_builder.html`, `pages/website_builder.html` — see their own plans), and the homepage gained a "What do you need?" route band directly under the hero. The three pages new or changed since the original sweep have been re-verified to the same standard, including 2560px and a full-scroll reveal pass, with the builders driven into their **fully-expanded state** first: 0px overflow, zero stranded content, the 1880px rail ceiling holding exactly, and the complete navigation contract (aria-expanded, scroll lock, focus into panel, Escape, focus restored to the trigger) passing on a builder page.
- **In progress:** None.
- **Next:** Site is verified complete against the current Definition of Done, including the two contracts added this cycle (the route-band contract in §2B and the guided-configurator step gate). Optional future hardening (not currently required by the plan): self-host or locally fall back the two external CDNs (Google Fonts "Plus Jakarta Sans" / Font Awesome) so the typeface and icons survive a blocked-CDN network — an observation from QA, not a defect in the composition.
- **Blocked:** None.
- **Last implementation commit:** _(latest — the landing contract and the missing describe-the-problem form)_

### Standing note: this plan's page count is load-bearing

Several Definition-of-Done items assert a property "across all N pages". Adding a
public page silently invalidates every one of them. **A new page is not finished
until those items are re-verified and the count here is updated** — otherwise the
plan certifies a site that no longer exists, which is worse than an unchecked box.

The page count is still **9**. What changed this cycle is inside three of them:
the homepage lost a chapter (10 → 9) and both builders are now gated, so their
"fully-expanded state" QA has to drive the gate open first — a sweep that only
loads a builder page now measures the gate, not the instrument, and will report a
clean bill of health for content it never rendered.

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

Completion is mandatory: every cycle ends with the full active scope delivered and pushed — never parked mid-cycle for approval. Review is view-only; it happens after delivery and never gates execution (see the Execution completion contract in Section 0).

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

Complete the full scope before reporting. Review is view-only and happens after delivery, so never pause mid-cycle to ask for approval. If something genuinely cannot be completed, list it under Blockers; never use review as a reason to defer active work.

The user will judge the rendered result and request further changes after seeing it.

Priorities:
1. Shared footer across every required public page.
2. Modern navigation redesign while preserving existing behaviour/accessibility contracts.
3. Site-wide bento/editorial compositions on every required public page.
4. Site-wide Building Blocks load + scroll motion.
5. Mobile-first responsive art direction.
6. Final polish of founder, CTAs, forms and evidence.
7. Apply the Clarity Contract and pacing map (Section 2B) throughout: plain-language pillar definitions, jargon placement, the first-screen fold contract, the INTRIGUE → UNDERSTANDING → RELEVANCE → PROOF → TRUST → DESIRE → ACTION order, the motion intensity map, problem-oriented CTAs and the real-project proof ladder. Priorities 1–6 must not break this contract.
8. Apply the interest-generation mechanisms (Section 2B, "Interest generation without cheapening the brand"): the DESIRE aspiration beat, the graduated CTA ladder with learn-more as a designed on-ramp, depth-over-breadth proof narrative, and pain-first RELEVANCE copy. All four are copy/sequencing work and must not introduce urgency pressure, discount language or stock persuasion patterns.

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
- confirm the four interest-generation mechanisms are applied (DESIRE aspiration beat, graduated CTA ladder, depth-over-breadth proof, pain-first RELEVANCE copy) and none introduce urgency/discount/stock persuasion patterns;
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