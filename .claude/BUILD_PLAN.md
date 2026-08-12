# Build Plan: ProManaged IT — Signal & Systems Global Redesign

## Goal
Deliver a premium global ProManaged redesign across all seven public pages. Preserve the logo-triggered bento navigation and building-block visual language. Next work: correct the founder visual treatment, make desktop compositions genuinely expansive, make bento layouts deliberately surprising across desktop/tablet/mobile, increase tasteful device-aware motion, redesign the contact/booking forms as premium bento experiences, and upgrade all customer/internal email templates to the same ProManaged design language while removing actual Render.com deployment dependencies.

## Wants vs Needs
- Want: a smaller circular HD founder portrait, surprising bento compositions, varied transitions, more life/motion on every device, and forms/emails that feel as polished as the website.
- Need: visual impact without unreadable text, distraction, accessibility regressions, fragile mobile layouts, repetitive card grids, excessive motion, broken forms, or email-client compatibility problems.
- Success moment: the site feels architectural and alive; the desktop canvas feels intentionally occupied instead of presenting a narrow centered island; the form feels like a guided premium intake rather than a generic contact box; the internal notification is scannable and useful; the customer confirmation feels like a thoughtful ProManaged response rather than an auto-generated receipt.

## Completion Criteria
- [ ] Founder image is circular across all relevant pages, smaller than the current oversized treatment, crisp, and never stretched or artificially upscaled.
- [ ] **Large desktop screens use the available visual canvas aggressively:** hero and major chapter compositions visibly stretch toward the viewport edges with controlled gutters; they must not appear as a narrow centered ~1000–1300px island on a 1600px+ screen.
- [ ] **Wide visual rail and readable text measure remain separate:** grids, hero visual blocks and bento surfaces may expand while headings and paragraphs retain independent readable max-widths.
- [ ] Wide desktop compositions have no horizontal overflow, awkward empty margins, or squeezed visual blocks.
- [ ] Long-form text remains independently constrained to roughly 55–75 characters per line.
- [ ] Hero, bento navigation, capabilities, founder/story, contact and chapter grids share the wider composition system.
- [ ] **Bento layouts are intentionally varied on every device:** cards use different spans, aspect ratios, alignments and visual hierarchy rather than repeating the same grid pattern.
- [ ] **At least three distinct bento composition patterns** are used across the site, and the same section does not simply reuse one card geometry at every breakpoint.
- [ ] Desktop, tablet and mobile each have deliberately art-directed compositions; responsive changes are not merely stacked desktop cards.
- [ ] Bento transitions vary by section: blocks can enter from different directions, settle at different depths/scales, or reveal in different stagger groups while remaining part of one coherent motion system.
- [ ] Motion is visibly present on desktop, tablet and mobile, but adapts to device size/performance instead of using identical timings everywhere.
- [ ] Reduced-motion users receive final visible states immediately, without translation, scaling, stagger, or delayed interaction.
- [ ] No animation causes layout shift, obscures content, traps interaction, or produces horizontal overflow.
- [ ] **Contact and booking forms use the same premium bento design language as the site**: grouped fields, clear hierarchy, responsive composition, polished focus/error/success states, and no generic long white form box.
- [ ] **Existing form field names, endpoints, SMTP, PHPMailer, honeypot and JS hooks remain compatible.** Visual redesign must not break submission contracts.
- [ ] **Internal receiving emails are redesigned as branded, highly scannable HTML email templates** with a strong ProManaged header, structured bento-like information groups, clear priority/metadata, and a useful next-action area.
- [ ] **Customer reply emails are redesigned as branded responsive HTML templates** with a calm confirmation, a concise summary of what was received, next-step expectations, contact path, and consistent ProManaged visual identity.
- [ ] Both internal and customer emails include a plain-text alternative and remain understandable when external images are blocked.
- [ ] Email template data is safely escaped; untrusted form input is never injected as raw HTML.
- [ ] Email templates use broadly supported HTML/email CSS patterns; do not depend on JavaScript, complex client-side CSS, or animation.
- [ ] Contact and booking email subjects are consistent, useful and distinguishable for internal triage.
- [ ] Real desktop, 1440px, 768px and 375px QA passes for founder sizing, bento composition, form UX, email-preview output where available, motion, navigation, links, console and overflow.
- [ ] No Render.com config, deploy hook, GitHub integration reference, Render environment variable, or deployment documentation remains in the repository.
- [ ] Owner separately confirms the linked Render service is disconnected/deleted and its auto-deploy and notifications are disabled.
- [ ] PHP endpoints, SMTP, PHPMailer, honeypot, forms, IDs, links and accessibility remain functional.

## Files to Change
- `css/tokens.css` — separate wide visual-rail/text-measure tokens, responsive bento geometry tokens, motion tokens, founder portrait sizing and form/email design tokens.
- `css/global_styles.css` — shared wide composition rail, bento geometry helpers, reveal states, reduced-motion fallback, responsive motion variables and shared form states.
- `css/hero_section.css` — hero composition, varied hero bento layout and initial block-settle motion.
- `css/navbar.css` — responsive bento navigation panel with varied tile spans and tile-specific transitions.
- `css/about_section.css` — circular founder portrait sizing/crop and responsive motion treatment.
- `css/contact_section.css` — premium bento form composition and field states without changing backend behavior.
- `css/book_appointment.css` — align booking form visuals with the same bento/form system where the existing page uses this stylesheet.
- `js/main.js` — existing `data-blocks` IntersectionObserver, capped reveal staggering and device-aware timing only.
- `css/service_cards.css`, `css/mission_vision.css`, `css/why_band.css` — varied bento block geometry and motion only where required.
- `php/contact.php` — preserve endpoint/field contracts while upgrading internal/customer email payload handling and templates.
- `php/booking.php` — preserve endpoint/field contracts while upgrading internal/customer booking email payload handling and templates.
- `php/mailer.php` — shared branded HTML/plain-text email template helpers, escaping, subject conventions and reusable sections; do not duplicate templates across endpoints.
- `.claude/PROJECT_CONTEXT.md`, `.claude/SYSTEM_MAP.md` — only if shared architecture or verified Render.com/email architecture references change.
- Existing founder image asset only if a higher-resolution asset already exists in the repository and is proven appropriate.

## Exact Changes
### Founder portrait
- `css/about_section.css`: replace oversized founder media with a responsive circular portrait using a square media box, `border-radius: 50%`, `object-fit: cover`, and a deliberate face crop.
- `css/tokens.css`: define explicit founder portrait sizes for desktop/tablet/mobile.
- Do not upscale a low-resolution source. If a higher-resolution repository asset exists, use it; otherwise report the limitation.

### Surprising responsive bento system
- Establish a shared bento vocabulary rather than one universal grid: use unequal spans, portrait/square/landscape media ratios, offset blocks, full-width statement blocks, narrow supporting tiles and occasional edge-reaching visual blocks.
- Use at least three distinct patterns across major chapters, for example: **Dominant + satellites**, **Offset editorial split**, and **Mosaic/stepped sequence**.
- Do not make every section a bento grid. Alternate bento compositions with large editorial statements and open space so the site has rhythm.
- **Large desktop:** visual composition rails should use the available viewport width. Treat the rail as the stage, not a centered card container. At 1600px+ the hero, capability grids, why/mission/contact compositions and bento navigation should visibly reach toward both sides of the viewport with controlled outer gutters.
- Desktop: allow 2–4 column compositions with varied row/column spans. One dominant block should normally anchor each bento group, with supporting blocks intentionally unequal.
- Tablet: recompose rather than simply collapse. Use 2-column mosaics, altered spans, portrait/landscape changes and deliberate offsets where they remain readable.
- Mobile: use a carefully art-directed single-column/occasional two-column composition. Cards may become full-width, but vary their heights, media ratios, ordering and reveal direction so the page does not become a repetitive stack of identical rectangles.
- Keep semantic DOM order logical and accessible even when visual ordering changes; avoid CSS ordering that makes keyboard/screen-reader flow confusing.
- Never create horizontal overflow to achieve an “edge” effect. Visual asymmetry must remain inside the viewport.
- Do not use random rotations, tilted cards, excessive overlaps, or decorative chaos. Surprise must come from proportion, spacing, sequencing and transitions—not gimmicks.

### Contact / booking form experience
- `css/contact_section.css` and `css/book_appointment.css`: redesign form presentation as a **bento intake board**, not one flat form container.
- Group the existing fields into visually distinct sections such as **You**, **What you need**, **Context**, and **How to reach you**, using the existing field names and semantics.
- Use varied field widths where safe: full-width message areas, paired short fields, and emphasis around the primary CTA.
- Use modern labels, helper text, clear required/optional indication, strong focus-visible states, inline validation/error states, disabled/submitting states, and a polished success state.
- Keep all existing backend names/actions and accessibility labels unchanged unless a real bug requires a minimal correction.
- The form should visually belong to the same bento system as the hero/navigation: unequal surfaces, subtle borders, restrained shadow, editorial spacing, and one obvious primary action.
- Do not add unnecessary steps, account creation, CAPTCHA, modal flows, or new business questions simply for visual effect.
- On mobile the form should become a deliberate stacked composition, not a squeezed desktop grid.

### Receiving/internal email template
- `php/mailer.php` + endpoint callers: create one shared ProManaged internal-notification email template for contact/booking messages.
- Structure the email as a compact email-safe “information board”: branded header, request type/status chip, sender/contact identity, main request/message, relevant structured fields, source/page context when already available, and a clear **Next action** block.
- Use the same ProManaged palette/typography hierarchy as the website where email-client support permits; use inline styles for critical presentation.
- Prefer a table-based outer email structure for broad client compatibility; use nested visually distinct blocks for the bento feel.
- Keep the email highly scannable on mobile and desktop. Important fields should not require opening an attachment or loading remote imagery.
- Never put secrets, SMTP credentials, internal configuration, or raw request headers into the email body.
- Escape all dynamic content before inserting into HTML; create a plain-text version from the same safe data.

### Customer reply / confirmation email
- `php/mailer.php` + endpoint callers: create reusable customer-facing confirmation templates for contact and booking submissions.
- Tone: human, concise, confident, reassuring; never promise a response time that is not an existing verified business commitment.
- Include: greeting, confirmation that the request was received, a concise request summary, expected next-step language that remains factual, a direct contact route, and ProManaged branding.
- Do not expose internal notes, routing addresses, SMTP details, honeypot fields, or internal metadata.
- Use responsive, email-safe HTML with inline styles plus plain-text fallback. Core meaning must remain visible if images are blocked.
- Customer email should feel like a designed brand touchpoint, not an automated system receipt.

### Email subject conventions
- `php/contact.php`: use a concise internal subject that identifies a new website enquiry and sender name/email where safe; customer reply subject should clearly confirm receipt.
- `php/booking.php`: use a concise internal subject that identifies a new booking request and the relevant booking/contact identity; customer reply subject should clearly confirm the booking/request was received without implying a confirmed appointment unless the existing system actually confirms one.
- Preserve any existing deliverability-safe From/Reply-To behaviour; do not expose customer email as an unauthenticated From address if that would weaken deliverability or security.

### Email template QA
- Preview internal and customer templates in a local/browser-capable HTML rendering path where the existing environment permits.
- Verify both templates at a wide email-like width and a narrow mobile width.
- Confirm long messages, special characters, apostrophes, angle brackets, ampersands, missing optional fields and empty values are rendered safely.
- Confirm plain-text fallback contains the same essential information.
- Confirm email output does not include raw HTML from the submitter.

### Varied bento transitions
- Build on the existing `data-blocks` and `IntersectionObserver` system; do not add an animation framework or a second reveal system.
- Create a small set of approved transition variants, selected per major bento group rather than randomly: `settle-up`, `settle-side`, `scale-in`, and `sequence-in`.
- Each major bento group may use one dominant transition variant plus one supporting variant. Do not animate every card independently.
- Desktop: approximately 20–32px travel, 1–2% settle scale, 70–110ms capped group stagger, roughly 450–600ms perceived duration.
- Tablet: approximately 14–24px travel with shorter duration/stagger.
- Mobile: approximately 8–16px travel with the shortest stagger and duration.
- Use different transition directions across chapters so scrolling does not feel mechanically identical, but preserve one visual motion language.
- Motion runs once per target group. No scroll replay, bounce, elastic wobble, continuous floating, spinning, layout-property animation, or motion on individual text fragments.
- Hero block group, bento navigation tiles, chapter-level blocks and founder portrait may animate. Privacy copy, form controls and utility text must not receive entrance animation.
- `prefers-reduced-motion`: final visible state immediately; no transform, scale, stagger or delayed interaction.

### Wide composition
- `css/tokens.css`: split visual rail from text measure; widen large-screen visual rails and reduce excessive desktop outer gutters while retaining safe tablet/mobile padding.
- `css/global_styles.css`: `.rail` and `.container` use the wide visual rail; preserve a separate narrow text measure. **Do not reintroduce a hard desktop max-width smaller than the token rail.**
- `css/hero_section.css` and `css/navbar.css`: let hero and bento tile compositions occupy the wider rail without making text unreadably wide.
- Page CSS: widen primary visual grids/media columns only; retain heading/paragraph max-width.
- On 1600px+ screens, the visual rail should be large enough that the screenshot reads as a deliberate full-canvas composition, not as a 1000–1300px content island floating inside a huge background.

### Render.com decommission
- Audit only `render.yaml`, `render.com`, Render deploy hooks, Render GitHub actions, Render-specific environment variables and deployment documentation.
- Remove only verified Render.com hosting/deployment references. Do not remove ordinary UI/documentation uses of the word `render` or working mail/form logic.
- Owner action outside the repo: disable auto-deploy/notifications, then disconnect or delete the Render service.

## Constraints / Things NOT to Touch
- Do not edit HTML or shared JS outside the listed observer behavior unless existing markup cannot support the bento/motion/form change; then stop and report the blocker.
- Do not change PHP endpoints, field names, SMTP, PHPMailer, honeypot, IDs, working links, privacy/legal copy, navigation accessibility or mobile behavior.
- Preserve existing mail deliverability configuration and Reply-To/From intent unless the current implementation is demonstrably unsafe or broken.
- No framework, gradients, parallax, looping motion, dashboard styling, scope-expanding redesign, branches, PRs, force-pushes or YAML.
- Do not fabricate or artificially upscale founder imagery.
- Email templates must not contain secrets, raw unescaped user HTML, JavaScript, or unsupported external dependencies.
- `main` only.

## QA Gate
1. Run headed browser at the real desktop window; record `innerWidth`, `innerHeight`, `clientWidth` and `scrollWidth` for all seven pages.
2. Capture full-page screenshots; inspect rail use, hero balance, text measure, bento navigation, founder portrait scale/crop and visual variety.
3. Check 1440px, 768px and 375px.
4. At each breakpoint, verify at least three distinct bento composition patterns are visibly distinguishable across the site and that no section becomes a repetitive identical-card stack.
5. Verify transition variants differ between at least three major bento groups while remaining coherent and non-jarring.
6. Verify the contact and booking forms at desktop/tablet/mobile: field grouping, focus states, validation, submit/loading/success states, keyboard navigation, labels and overflow.
7. Exercise both form endpoints with representative safe test payloads where the environment permits, confirming successful internal email generation and customer reply generation without breaking the existing SMTP flow.
8. Verify internal and customer email HTML plus plain-text fallback using safe sample values containing special characters, long text and empty optional fields. No raw HTML injection.
9. Verify reveal-once behavior, reduced-motion final state, device-appropriate timings, navigation focus/Escape/focus restore, links, forms, console and overflow.
10. Verify founder image is circular at every breakpoint and does not visually dominate the page.
11. If Render dashboard access is unavailable, report that owner-only step as blocked; never mark it complete.
12. **Large-screen composition check:** at a real 1600px+ viewport, the hero and first two homepage chapters must visually use most of the available width with intentional outer gutters; reject any result that reads as a narrow centered island even when text measures are correct.

## Phases
### Phase 1: Founder + wide shared composition
- Goal: resize/circle the founder portrait, establish high-resolution handling, and update shared rails so large desktop screens use the canvas instead of a narrow centered island.
- Exit: founder is polished and subordinate to the editorial composition; homepage/navigation use wide space cleanly; text remains readable; 1600px+ hero and chapter compositions visibly occupy the available width.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/about_section.css`, `css/hero_section.css`, `css/navbar.css`.

### Phase 1B: Responsive bento + Weighted Block Settle Motion
- Goal: create the varied bento composition system and upgrade hero, chapter, founder and navigation reveals into device-aware transition variants.
- Exit: desktop/tablet/mobile each have deliberately different but coherent compositions; at least three patterns and three transition variants are visible; reduced-motion is immediate; no layout shift or overflow.
- Files: `css/tokens.css`, `css/global_styles.css`, `css/hero_section.css`, `css/navbar.css`, `css/about_section.css`, `js/main.js`, and only existing page CSS containing relevant block rules.

### Phase 2: Wide chapter + form rollout
- Goal: apply varied bento compositions to capabilities, mission/vision, contact and why-band sections, and redesign contact/booking forms as premium bento intake experiences.
- Exit: forms look like part of the site’s design system and remain fully functional across devices.
- Files: `css/service_cards.css`, `css/mission_vision.css`, `css/contact_section.css`, `css/why_band.css`, `css/book_appointment.css`, `php/contact.php`, `php/booking.php`, `php/mailer.php`.

### Phase 3: Email template system
- Goal: replace generic internal/customer mail bodies with reusable ProManaged-branded HTML/plain-text templates that are secure and broadly email-client compatible.
- Exit: contact and booking receiving emails are scannable branded information boards; customer replies are polished confirmations; dynamic data is safely escaped; From/Reply-To and SMTP behavior remains correct.
- Files: `php/mailer.php`, `php/contact.php`, `php/booking.php`.

### Phase 4: Render audit and final QA
- Goal: remove verified Render.com repository dependencies, obtain owner confirmation of external shutdown, then complete visual, form and email QA.
- Exit: all criteria pass; owner-only Render work is explicitly confirmed or blocked.
- Files: proven Render.com references, relevant `.claude` docs and scoped fixes only.
