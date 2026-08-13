# ProManaged IT — HOSPITALITY SYSTEM BUILDER

## Purpose

Build a new interactive hospitality-system discovery experience for ProManaged IT. This is a **separate execution plan** from `.claude/BUILD_PLAN.md` and must be read together with it. It does not replace or rewrite the main site design system.

The product idea is simple:

> **Let a lodge or small hospitality business design the system it actually needs, while ProManaged learns how that business operates.**

This is not a conventional contact form, pricing calculator, or generic SaaS feature checklist. It is a guided **product configurator + discovery journey + qualified enquiry**.

The customer should feel:

> "I'm designing my own hospitality system with ProManaged."

ProManaged should receive a structured, useful discovery brief at the end.

The experience should also become the foundation for a future ProManaged hospitality SaaS product. It must therefore be designed around a clear **Core → Optional Modules → Dependencies → Workflows → Proposed System** model rather than hard-coded one-off marketing copy.

---

## 1. READ FIRST — SOURCE OF TRUTH

Before implementing anything, Claude MUST read the current live repository and these files:

1. `.claude/BUILD_PLAN.md`
2. `.claude/PROJECT_CONTEXT.md`
3. `.claude/PROJECT_CREDIBILITY.md`
4. this file: `.claude/HOSPITALITY_SYSTEM_BUILDER.md`
5. the current `index.html`
6. the current software/build page: `pages/custom_websites.html`
7. the current form/backend implementation and its PHP/PHPMailer contract
8. existing motion/navigation/bento CSS and JS relevant to the new experience

The current repository is authoritative. Do not rely on stale screenshots or conversation memory when implementation differs from the live tree.

---

## 2. NON-NEGOTIABLE DESIGN PROTECTION

**THIS IS AN ADDITION TO THE EXISTING PROMANAGED WEBSITE, NOT A REDESIGN.**

The current website's luxury/editorial **Signal & Systems** language must remain intact.

Preserve and reuse:

- current typography system;
- current tokens and colour system;
- current 1880px visual rail;
- current 7fr / 5fr hero philosophy where applicable;
- current `nav-rail`;
- current bento navigation;
- current `.btn`, `.primary`, `.secondary`, `.hero-buttons` contracts;
- current Building Blocks motion system;
- current dark graphite and warm light chapter rhythm;
- current asymmetric bento language;
- current shared footer;
- current accessibility conventions;
- current form/backend contracts.

Do NOT:

- redesign the homepage;
- replace the nav-rail;
- introduce a new design system;
- introduce a frontend framework;
- introduce a generic SaaS dashboard aesthetic;
- use generic blue SaaS cards;
- turn the experience into a conventional multi-column form;
- use loud gradients or excessive glassmorphism;
- use cartoon animations;
- introduce a new animation library;
- change existing site logic unnecessarily.

The new experience should look like a **premium ProManaged product journey**, not a separate microsite from another company.

---

## 3. PRODUCT EXPERIENCE

Recommended public route:

`pages/hospitality_builder.html`

Recommended stylesheet:

`css/hospitality_builder.css`

Recommended behaviour script:

`js/hospitality_builder.js`

These names are implementation guidance. Before creating them, inspect the repository and use the nearest existing conventions if a safer equivalent already exists.

The experience should be reachable from the existing Build/software story, not presented as a disconnected top-level business pillar.

Recommended entry points:

### Software / Build page
A premium editorial CTA:

**Build a hospitality system**

> Tell us how your property works. We'll show you what your system could become.

### Homepage
Use a smaller proof/entry moment only if it fits naturally into the existing Build/credibility narrative. Do not make the homepage about hospitality.

### Navigation
Hospitality Builder may appear as a secondary Build destination if the existing bento navigation can accommodate it without becoming crowded. Do not add another major navigation category.

---

## 4. COMMERCIAL OBJECTIVE

The experience has five simultaneous jobs:

1. Help a prospective lodge/hotel owner understand what a hospitality system can actually do.
2. Let them select only what is relevant to their operation.
3. Explain how selected capabilities work together.
4. Generate useful discovery information for ProManaged.
5. Validate demand and feature priorities for a future hospitality SaaS product.

The user is NOT buying a fixed product during this first version.

The final configuration is a **proposed system / discovery brief**, not a guaranteed price or fixed scope.

The final messaging must make this clear:

> "Your configuration is a starting point. We'll review how your property operates and recommend the right implementation."

Do not promise automatic implementation, fixed pricing, delivery dates, or SaaS availability unless those are actually supported by the product.

---

## 5. PSYCHOLOGICAL JOURNEY

The experience should feel like a guided story, not a questionnaire.

Canonical journey:

**ORIENT → UNDERSTAND → BUILD → CONNECT → VISUALISE → SUMMARISE → START**

### Chapter 01 — Your property

Headline direction:

**Start with how your property works.**

Explain that every property operates differently.

Collect only useful first-level context:

- property type;
- approximate room count;
- current booking channels;
- optional current pain point.

Property types should be simple and non-technical:

- Lodge
- Guesthouse
- Boutique hotel
- Hotel
- Resort
- Multiple properties
- Other

Room count should use an accessible number control, not a difficult slider.

Booking channels may include:

- Website
- WhatsApp
- Phone
- Booking platforms
- Walk-ins
- Other

Do not ask for a full contact form yet.

---

## 6. CHAPTER 02 — THE FOUNDATION

Introduce the idea of a hospitality system.

Suggested copy direction:

> **Every property starts with a foundation. Add only what your operation actually needs.**

Core capabilities should be visually and semantically distinct from optional modules.

Initial Core candidates:

### Bookings
Manage reservations from one place.

### Rooms
Know what is available, occupied, reserved or being prepared.

### Guests
Keep guest information connected to every stay.

The exact final Core list MUST be determined by inspecting the actual Rosalyn's and Liwonde Sun systems and identifying common functionality.

Do not assume the above is complete or technically accurate until the source systems are inspected.

Core capabilities should be presented as the stable foundation, not as arbitrary checkboxes.

---

## 7. CHAPTER 03 — OPTIONAL CAPABILITIES

After the foundation is understood, introduce optional modules progressively.

Potential modules to investigate from the real systems and business requirements include:

- Website + booking engine
- Housekeeping
- Payments
- Guest communications / WhatsApp
- Reporting
- Staff accounts / permissions
- Multiple properties
- Restaurant / POS
- Additional operational workflows
- Custom integrations

These are **candidate modules**, not a promise that every one exists or will ship in the MVP.

The implementation must distinguish:

**Available now / proposed module / custom development**

rather than implying that all future features are already productised.

---

## 8. FEATURE DEPENDENCIES — THE IMPORTANT PART

The differentiating feature of this experience is not selection. It is **relationship explanation**.

When a user selects a feature, explain how it connects to what they already selected.

Example:

### Housekeeping

Instead of only showing:

`✓ Housekeeping`

show:

> **Keep rooms moving.**
>
> When a guest checks out, the room can become a housekeeping task instead of another message your team has to remember.

Then visually show:

**Checkout → Needs cleaning → Housekeeping task → Ready → Available**

If Housekeeping depends on Rooms, the UI should explain the dependency:

> **Housekeeping works best with Rooms. Add Rooms so your team can see which spaces need attention.**

Provide an obvious action to add the dependency.

Do not silently select features without explaining why.

Do not create dead-end selections.

---

## 9. FEATURE STORY ENGINE

Every module should have structured metadata rather than hard-coded prose scattered throughout JavaScript.

Recommended data model:

```js
{
  id: 'housekeeping',
  category: 'optional',
  title: 'Keep rooms moving',
  name: 'Housekeeping',
  shortDescription: 'Turn room changes into clear tasks for your team.',
  why: 'When a guest checks out, the room can become a housekeeping task instead of another message to remember.',
  dependsOn: ['rooms'],
  unlocks: [],
  story: [
    'Guest checks out',
    'Room needs cleaning',
    'Housekeeping sees the task',
    'Room becomes ready',
    'Availability updates'
  ]
}
```

The exact schema may be adapted to repository conventions, but the following concepts must exist:

- unique ID;
- category;
- customer-facing title;
- short explanation;
- why it matters;
- dependencies;
- connected capabilities;
- workflow/story steps;
- selection state.

This makes the experience maintainable and allows future SaaS extraction.

---

## 10. THE SYSTEM SHOULD PHYSICALLY GROW

The user's selections should visibly change the composition.

This is the central visual metaphor:

> **The customer is assembling their system.**

Start simple:

`YOUR PROPERTY`

Then:

`BOOKINGS + ROOMS + GUESTS`

Then, as optional modules are added, the bento composition grows or rearranges:

`WEBSITE + BOOKINGS + ROOMS + GUESTS`

Then:

`HOUSEKEEPING` connects to Rooms/Bookings.

Then:

`PAYMENTS` connects to Booking.

The visual result should be an evolving system map, not a technical architecture diagram.

Do not make it look like developer tooling.

It should be understandable to a lodge owner.

---

## 11. UI / UX DIRECTION

The UI must feel like a premium interactive editorial product.

### Use

- large, confident headings;
- concise explanations;
- asymmetric bento blocks;
- varied tile sizes;
- clear active states;
- restrained borders;
- subtle depth;
- warm neutral surfaces;
- graphite chapters for emphasis;
- existing ProManaged typography;
- generous whitespace;
- high-quality interface snippets where useful;
- progressive disclosure;
- one clear action per step.

### Avoid

- long forms;
- dense checklists;
- tiny text;
- excessive pill controls;
- equal-card grids everywhere;
- progress bars that make it feel like a survey;
- unnecessary technical diagrams;
- pricing before the user understands the system;
- fake dashboard metrics;
- excessive modal windows.

The interface should feel calm and confident.

---

## 12. RESPONSIVE / MOBILE-FIRST COMPOSITION

The builder MUST be designed mobile-first.

Verify at:

- 375px
- 430px
- 768px
- 1024px
- 1440px
- 1600px
- 1920px

At 375/430:

- one dominant story at a time;
- cards become a vertical asymmetric sequence;
- selections remain thumb-friendly;
- feature explanation appears directly with the selected module;
- system map remains legible without horizontal scrolling;
- sticky controls must not cover content;
- final CTA remains obvious;
- no tiny desktop-style bento grid compressed into a column.

Desktop may use wider asymmetric compositions but must remain inside the existing 1880px visual rail.

Do not recreate the previous oversized full-canvas desktop problem.

---

## 13. MOTION — BUILDING BLOCKS LANGUAGE

Reuse the existing ProManaged Building Blocks motion system.

Do NOT add another animation framework.

Use existing variants where appropriate:

- `settle-up`
- `settle-side`
- `scale-in`
- `sequence-in`

Suggested choreography:

### Entering a chapter
statement settles → first feature resolves → supporting detail follows.

### Selecting a feature
selected block settles into emphasis → dependency/relationship appears → story steps assemble.

### Adding a dependency
existing block shifts subtly → dependency block enters → relationship cue resolves.

### System summary
selected blocks assemble into the final proposed system.

Motion must be:

- slow;
- weighted;
- precise;
- restrained;
- transform/opacity based;
- one entrance per meaningful group.

No:

- infinite animation;
- parallax;
- random rotation;
- cartoon bounce;
- layout-jank animation;
- animation libraries.

`prefers-reduced-motion` must resolve immediately to the final state.

If JavaScript fails, all essential information and controls must remain available.

---

## 14. WORKFLOW STORIES

The builder should include expandable or inline **See how it works** moments.

Example:

### A guest makes a booking

Guest finds the property online

→ Website shows availability

→ Guest books

→ Booking appears in the management system

→ Room availability updates

→ Confirmation is sent

The exact story must reflect the selected features.

If the user selects:

**Bookings + Rooms + Housekeeping**

show the relevant story.

If they add Payments, extend the story.

If they add Website, begin the story at the public site.

The customer should understand the value of integration without needing technical vocabulary.

---

## 15. FINAL CONFIGURATION SUMMARY

At the end, show:

# **Here's what you've designed**

### Your property

Property type + approximate rooms.

### Your foundation

Selected Core capabilities.

### Your additions

Selected Optional modules.

### How it works together

One short, plain-language paragraph generated from the selected features.

Example direction:

> Your website, bookings and room availability work together, while housekeeping turns each checkout into a clear next task for your team.

Do not claim capabilities that were not selected.

Do not show fabricated pricing.

Do not show a fake implementation date.

---

## 16. CONVERSION — THE FINAL STEP

Only after the customer understands the proposed system should we ask for contact details.

Heading direction:

**Let's talk about your setup.**

Supporting copy:

> You've designed the starting point. Tell us where to send your tailored plan.

Collect the minimum useful contact information:

- name;
- business/property name;
- email;
- phone/WhatsApp if appropriate;
- optional notes.

The form must preserve existing production form conventions and backend contracts unless a dedicated safe endpoint is required and verified.

Do not break existing PHP/PHPMailer logic.

The submitted enquiry must include the full configuration in a structured format.

Example internal payload:

```text
Hospitality System Builder

Property type: Lodge
Rooms: 18

Core:
- Bookings
- Rooms
- Guests

Optional:
- Website + Booking Engine
- Housekeeping
- Payments

Current booking channels:
- WhatsApp
- Phone

Notes:
...
```

This is the commercial value of the builder: ProManaged receives a pre-qualified discovery brief rather than an empty "please contact me" message.

---

## 17. EMAIL / RECEIVING-END DESIGN

If the existing form system supports branded HTML email templates, add a dedicated Hospitality Builder presentation while preserving the backend architecture.

Internal email should clearly show:

- enquiry type;
- property context;
- room count;
- core features;
- optional features;
- dependencies/relationships;
- booking channels;
- customer notes;
- contact details.

Customer confirmation should be concise and branded:

> **We have your hospitality system outline.**
>
> We'll review the way your property works and use your selected configuration as the starting point for the conversation.

Do not promise that all selected features are standard SaaS modules.

Do not expose internal system IDs or implementation notes to customers.

---

## 18. REAL PROJECT CREDIBILITY

Read `.claude/PROJECT_CREDIBILITY.md`.

Use genuine evidence from:

- **Rosalyn's — Hotel Management System**
- **Liwonde Sun Hotel — Hotel Management System**

Both are real ProManaged deliverables for Malawian clients.

The builder may include a small credibility moment such as:

> **Built from real hospitality work.**
>
> We've already delivered hotel-management systems for businesses in Malawi. This builder is shaped by that experience.

Then use carefully selected HD interface snippets.

The real projects should support trust, not dominate the configurator.

Do NOT:

- expose admin URLs;
- expose login screens;
- expose customer data;
- expose credentials;
- invent outcomes;
- invent metrics;
- invent testimonials;
- mention Bank Nkhonde anywhere publicly.

The builder must never imply that the exact configurable product already exists as a finished commercial SaaS if it has not yet been launched.

---

## 19. SOURCE-SYSTEM RESEARCH BEFORE IMPLEMENTATION

Before finalising the Core and Optional catalogue, inspect the actual Rosalyn's and Liwonde Sun systems using the authorised MCP/browser access available in the coding environment.

Use the existing `.env` credentials only for authenticated inspection where required.

Never expose credentials.

Never modify admin data.

Never create, delete or edit bookings/users/settings.

Inspect only enough to establish:

- common workflows;
- common entities;
- reusable features;
- client-specific features;
- features that are genuinely suitable for a smaller-lodge product;
- features that should remain custom development.

Create a clear internal feature matrix in the implementation if useful, but do not expose client-private details.

Recommended classification:

**CORE** — common, broadly useful, foundational.

**OPTIONAL** — useful for many but not all smaller properties.

**CUSTOM** — valuable but property-specific or requiring bespoke work.

Do not force client-specific functionality into the generic SaaS model.

---

## 20. FUTURE-PRODUCT ARCHITECTURE

This first release does not need to become the full hospitality SaaS backend.

However, the frontend data model should be designed so it can later feed a real multi-tenant product.

The conceptual model is:

```text
Property
  ↓
Core capabilities
  ↓
Optional modules
  ↓
Dependencies
  ↓
Workflows
  ↓
Proposed system
  ↓
Qualified enquiry
```

Do not build a multi-tenant backend as part of this task unless the repository already contains one and a safe reuse is obvious.

The immediate goal is **discovery + product validation + qualified sales**.

---

## 21. ANALYTICS / PRODUCT LEARNING

Where the existing site analytics architecture allows it, capture useful non-sensitive events:

- builder_started;
- property_type_selected;
- core_feature_selected;
- optional_feature_selected;
- dependency_prompt_shown;
- workflow_story_opened;
- configuration_completed;
- hospitality_enquiry_submitted.

Do not collect sensitive customer data through analytics events.

Do not add a new analytics platform just for this task.

Use the existing project conventions if available.

The purpose is to learn which features hospitality businesses actually want.

---

## 22. ACCESSIBILITY

The builder is a production sales interface.

Requirements:

- semantic headings;
- labels for all controls;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- no colour-only selection state;
- `aria-pressed` / appropriate state semantics for selectable controls;
- screen-reader-readable dependency explanations;
- Escape closes transient panels if used;
- reduced-motion support;
- no interaction that requires hover;
- mobile controls large enough for touch.

The system must remain understandable if motion is disabled.

---

## 23. PERFORMANCE

Do not make the builder heavy just because it is interactive.

Prefer:

- vanilla JS;
- existing CSS;
- lazy-loaded project imagery where appropriate;
- no large JS framework;
- no animation library;
- no unnecessary third-party services.

Avoid shipping every project screenshot on first load.

Load visual evidence when it enters the relevant part of the story.

---

## 24. FILE/SCOPE GUIDANCE

Expected new/modified files should be limited to what is genuinely necessary.

Likely additions:

- `pages/hospitality_builder.html`
- `css/hospitality_builder.css`
- `js/hospitality_builder.js`

Likely small integrations:

- `pages/custom_websites.html` — entry CTA
- `index.html` — optional small entry/proof moment only if clearly justified
- existing form PHP/template — only if needed to safely receive the structured builder enquiry
- existing email template — only if needed for the dedicated enquiry presentation

Do not broadly rewrite shared CSS/JS for this feature.

Reuse existing tokens and component patterns.

---

## 25. DEFINITION OF DONE

The Hospitality System Builder is complete only when:

### Product experience
- [ ] A visitor can identify their property type and approximate room count.
- [ ] A visitor can identify current booking channels.
- [ ] Core features are clearly explained.
- [ ] Optional features are clearly explained.
- [ ] Selecting a feature shows why it matters.
- [ ] Dependencies are explained rather than silently applied.
- [ ] Connected features tell a useful workflow story.
- [ ] The system visual evolves as the customer selects capabilities.
- [ ] A final configuration summary is generated.
- [ ] The visitor can submit the configuration to ProManaged.

### Sales
- [ ] ProManaged receives the complete structured configuration.
- [ ] Internal email is readable and branded.
- [ ] Customer confirmation is clear and reassuring.
- [ ] The final step feels like starting a conversation, not submitting a generic form.

### Design
- [ ] It looks native to the existing ProManaged luxury/editorial design.
- [ ] It does not introduce a generic SaaS aesthetic.
- [ ] Bento composition is asymmetric and deliberate.
- [ ] Mobile feels designed, not compressed.
- [ ] Motion uses the existing Building Blocks language.
- [ ] Motion is premium and restrained.
- [ ] The experience remains clear with reduced motion.

### Credibility
- [ ] Rosalyn's can be used as real project evidence where appropriate.
- [ ] Liwonde Sun Hotel can be used as real project evidence where appropriate.
- [ ] Both are correctly described as Malawian-client work.
- [ ] No fabricated claims exist.
- [ ] Bank Nkhonde is absent from public content.
- [ ] No private admin information is exposed.

### Technical
- [ ] Existing navigation is intact.
- [ ] Existing footer is intact.
- [ ] Existing forms remain functional.
- [ ] Existing PHP/PHPMailer contracts are preserved.
- [ ] No `.env` or credentials are committed.
- [ ] No YAML/YML files are added.
- [ ] No unnecessary external dependencies are introduced.
- [ ] No horizontal overflow at 375px, 430px, 768px, 1024px, 1440px, 1600px or 1920px.
- [ ] Full diff has been inspected.

---

## 26. IMPLEMENTATION RULE FOR CLAUDE

When Claude is instructed to implement this plan:

1. Read `.claude/BUILD_PLAN.md`, `.claude/PROJECT_CONTEXT.md`, `.claude/PROJECT_CREDIBILITY.md` and this file.
2. Inspect the actual Rosalyn's and Liwonde Sun systems using authorised MCP/browser access before finalising the feature catalogue.
3. Inspect the current form/email contracts before wiring submission.
4. Implement the complete active scope in one cycle.
5. Do not stop at a static mockup.
6. Do not redesign unrelated ProManaged pages.
7. Preserve the existing luxury design and motion language.
8. Self-check mobile and desktop behaviour.
9. Inspect the complete diff.
10. Fix obvious regressions discovered during the same cycle.
11. Commit directly to `main`.
12. Push to `origin/main`.

Final report must contain only:

**Changed:**
- concise implementation summary

**Blockers:**
- None, or exact blocker(s)

**Ready for review:**
- Yes

The user is the final visual acceptance gate. Do not wait for an additional ChatGPT review between implementation phases unless the user explicitly requests review.
