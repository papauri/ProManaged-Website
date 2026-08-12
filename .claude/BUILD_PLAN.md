# Build Plan: Award-Winning Global ProManaged Website Concept

## Creative North Star
Create an original, award-worthy website concept for **ProManaged IT**: a calm, premium technology concierge that makes complex digital, device, and connectivity decisions feel simple, human, and reachable from anywhere. The site should feel less like a generic IT brochure and more like a refined editorial experience — part digital studio, part procurement partner, part infrastructure guide.

### Concept Name: **The Connected Desk**
The core design metaphor is a desk where every piece of modern work comes together: the software people use, the devices they depend on, and the networks that keep everything moving. Each page should feel like opening a carefully arranged workspace: spacious, confident, useful, and quietly impressive.

### Inspiration Direction
Use these inspirations as directional references only; do not copy layouts, text, assets, animation, or code.
- **Premium editorial portfolios:** oversized statements, unexpected pacing, rich white space, and page sections that feel intentionally composed rather than templated.
- **Modern product-system sites:** crisp typography, clear hierarchy, polished cards, precise CTAs, and persuasive explanation without jargon.
- **Human service brands:** warm founder story, helpful guidance, and approachable language that reassures non-technical clients.
- **Global logistics/fintech cues:** trust, reach, local payment confidence, and support that feels accessible even in underserved or remote markets.

## Goal
Redesign the plan and implementation direction so ProManaged IT becomes a global, high-trust, award-level digital presence. Reword all marketing copy from first principles. Explain the business clearly: ProManaged designs practical software and web platforms, sources reliable IT/gaming hardware, and plans dependable network infrastructure for homes, teams, and small organisations. Avoid naming exact service locations in public-facing positioning; the brand should feel globally reachable, including places with limited access to international technology suppliers and payment routes.

## Wants vs Needs
- Wants: A distinctive, memorable, premium website concept with complete rewording, stronger storytelling, more ambitious visual rhythm, and an autonomous implementation path.
- Needs: Original ProManaged-branded copy and design that preserves existing forms, links, scripts, PHP endpoints, accessibility, responsive behavior, and the static HTML/CSS/JS architecture.
- End user: Individuals, families, founders, small teams, and growing organisations who need dependable software, hardware, or connectivity help without technical overwhelm.
- Friction: Visitors may know they need help but not whether they need a website, a custom system, a device, a managed purchase, WiFi/network work, or simply advice.
- Success Moment: A visitor quickly thinks, “They understand practical technology problems, they can handle the messy details, and I know exactly how to start.”

## Brand Voice Rules
- Sound confident, clear, and elegant — never vague, inflated, or buzzword-heavy.
- Replace generic phrases like “cutting-edge solutions” with concrete benefits: easier ordering, clearer systems, fewer dead zones, better client workflows, reliable devices, support that stays involved.
- Write for non-technical decision-makers first, while still sounding credible to technical readers.
- Use global language: “wherever you work,” “hard-to-reach markets,” “across borders,” “local payment options,” “international sourcing,” and “remote-friendly support.”
- Avoid exact public location naming in new marketing copy. Do not lead with country names or city names. Company/legal facts may remain where required, but the brand narrative should be global.
- Keep all copy original. Do not borrow sentences, slogans, bios, or section structures from reference sites.

## Core Messaging Architecture
1. **Hero Promise:** Practical technology, assembled beautifully — software, devices, and networks brought together by one accountable partner.
2. **Service Clarity:** Three routes into the business:
   - **Build:** custom websites, web apps, internal tools, SaaS ideas, booking flows, portals, and automation.
   - **Source:** laptops, desktops, gaming setups, accessories, and business equipment sourced with guidance, delivery coordination, and local-friendly payment options.
   - **Connect:** home and business WiFi, internet handoff, Starlink/fiber readiness, cabling guidance, security basics, and ongoing maintenance.
3. **Trust Story:** Founder-led, practical, responsive, and built around making technology reachable for people who cannot always rely on standard supplier channels.
4. **CTA System:** “Start with a short brief,” “Tell us what you need,” “Book a practical consult,” and “Ask us to source it” — direct, low-pressure, and action-oriented.

## Completion Criteria (Definition of Done)
- [ ] Every public HTML page has refreshed, original ProManaged copy aligned to **The Connected Desk** concept.
- [ ] Public-facing wording avoids exact service-location naming and presents the brand as globally reachable, including underserved and hard-to-reach markets.
- [ ] Homepage hero, service sections, about, mission/vision, contact, and footer feel like one premium editorial system rather than separate legacy blocks.
- [ ] Service pages keep their existing purpose but receive stronger page intros, editorial/card-based sections, clearer CTAs, and fully reworked copy.
- [ ] **Navbar/header is visually identical across every public page**: same logo sizing, spacing, typography, link states, fixed-header behavior, and mobile menu treatment.
- [ ] **Footer is visually identical across every public page**: same structure, columns, spacing, typography, surface treatment, links, and contact hierarchy.
- [ ] Typography, colours, spacing, radii, buttons, and section rhythm are shared across all public pages via the token system.
- [ ] Existing forms, links, scripts, and PHP endpoints remain wired exactly as before unless text-only labels change.
- [ ] Existing business facts remain: ProManaged IT, John-Paul Chirwa, software/web apps/SaaS, hardware sourcing, network infrastructure, international reach, local-currency support, and listed emails.
- [ ] No pricing is shown anywhere on `pages/custom_websites.html`.
- [ ] No broken relative asset paths or navigation links.
- [ ] Responsive behavior remains usable on mobile and desktop.
- [ ] **Playwright performs real-window/headed desktop review first for every public page.** No custom fixed viewport is used for the primary desktop review.
- [ ] **Playwright records actual browser dimensions** using `window.innerWidth`, `window.innerHeight`, `document.documentElement.clientWidth`, and `document.documentElement.scrollWidth` for every public page.
- [ ] Full-page screenshots are captured at the real available browser size for every public page.
- [ ] After real-window desktop review, Playwright checks **768px and 375px** as secondary responsive emulation only.
- [ ] Playwright reports zero console errors, zero horizontal overflow, no broken internal links, and no broken CTA/form interactions.
- [ ] No `.yml`/`.yaml` files remain.
- [ ] Claude/Codex reports only: **Changed / Blockers / Ready for review**.

## Public Pages
- `index.html`
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html`
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`

## Files to Change
### Shared shell/design
- `css/tokens.css`
- `css/global_styles.css`
- `css/navbar.css`
- `css/logo.css`
- `css/footer_promanaged.css`
- `css/hero_section.css`
- `css/contact_section.css`

### Homepage
- `index.html`
- `css/service_cards.css`
- `css/about_section.css`
- `css/mission_vision.css`
- `css/why_band.css`

### Secondary pages
- `get-started.html`
- `learn_more.html`
- `privacy_policy.html` — visual shell/header/footer consistency only; do not rewrite legal/privacy copy
- `pages/custom_websites.html`
- `pages/hardware_sourcing.html`
- `pages/network_infrastructure.html`
- page-specific CSS files already linked by those pages: `css/get-started.css`, `css/learn-more.css`, `css/custom_websites.css`, `css/hardware_sourcing.css`, `css/networking.css`

### Cleanup audit
- current `*.html`
- current `js/*.js`
- current `css/*.css`
- current `php/*.php`
- `.claude/PROJECT_CONTEXT.md`
- `.claude/SYSTEM_MAP.md`
- `.claude/agents/backend-specialist.md`
- `.claude/agents/codebase-scout.md`
- `.claude/agents/frontend-specialist.md`
- `.claude/agents/build-planner.md`

## Exact Changes
### `index.html`
- Section: `head metadata`
- Change: Reword description/keywords around practical global technology support, software builds, hardware sourcing, and dependable networks.
- Reason: Align search snippets with the new premium, global positioning.
- Section: `#header-section`
- Change: Keep existing nav destinations, logo path, mobile-menu hooks, and behavior; visual treatment must match the canonical shared navbar.
- Reason: Avoid breaking mobile JS while making the shell uniform.
- Section: Hero
- Change: Replace current location-led headline/support copy with a confident global promise: ProManaged brings software, hardware, and networks together for people who need technology to simply work.
- Reason: Lead with value and avoid exact location naming.
- Section: Services
- Change: Reframe cards as **Build / Source / Connect** with short problem-solution copy and varied editorial weight.
- Reason: Make the three service lines instantly memorable.
- Section: Why/About/Mission-Vision/Contact/Footer
- Change: Reword into connected editorial chapters: practical access, founder-led care, global reach, direct contact, and canonical footer.
- Reason: Build trust without sounding generic.

### `get-started.html`
- Sections: hero, why, services, testimonials, booking
- Change: Rewrite as a guided intake page for unclear technology needs: “Start with what you’re trying to achieve.” Keep booking form fields, actions, and JS hooks unchanged. Use the same header/footer and visual language as `index.html`.

### `learn_more.html`
- Sections: hero, company/service sections, footer
- Change: Reword as an explainer for how ProManaged works: listen, map the need, build/source/connect, then support after delivery. Avoid exact location naming and emphasize globally reachable service.

### `privacy_policy.html`
- Sections: page shell only
- Change: Apply the canonical navbar/footer, typography, spacing, colours, and page-width system without rewriting legal/privacy content.
- Reason: Privacy content must remain stable while the page feels like the same website.

### `pages/custom_websites.html`
- Sections: hero, process, build types, projects, FAQ, CTA
- Change: Rewrite around outcomes: public websites, client portals, booking flows, dashboards, SaaS MVPs, automations, and internal tools. Keep the booking/enquiry flow and **remove all visible prices, pricing tables, package amounts, “starting at” amounts, and price-led UI/copy**.
- Reason: Sell capability and trust, not menu pricing.

### `pages/hardware_sourcing.html`
- Sections: hero, sourcing intro, categories, request form, footer
- Change: Rewrite around guided sourcing for business and personal technology: right-fit recommendations, supplier coordination, international delivery support, and local-friendly payment options.
- Reason: Make sourcing feel premium, safe, and reachable even where direct supplier access is difficult.

### `pages/network_infrastructure.html`
- Sections: hero, service sections/cards, CTA, footer
- Change: Rewrite around dependable connection design: home WiFi, business coverage, Starlink/fiber readiness, cabling planning, security basics, monitoring, and maintenance.
- Reason: Make networking tangible and outcome-based.

### Shared CSS
- `css/tokens.css`: adjust only shared design tokens needed for the refreshed award-level system.
- `css/global_styles.css`: add shared wide-layout, section rhythm, editorial helpers, and reusable premium surfaces only if needed.
- `css/navbar.css`: one canonical navbar style for all pages.
- `css/logo.css`: one canonical logo sizing rule across all breakpoints.
- `css/footer_promanaged.css`: one canonical footer structure/style across all pages.
- `css/hero_section.css`: shared bold editorial hero language with page-specific content.
- `css/contact_section.css`: shared contact styling only; do not alter form behavior.
- Page CSS files: align existing selectors to the shared system; avoid isolated one-off visual languages unless content genuinely requires it.

## New Code Needed
```text
For each listed HTML page:
  preserve existing navigation, forms, scripts, IDs and functional hooks
  rewrite public marketing copy from scratch using The Connected Desk concept
  avoid exact public location naming while keeping global reach and local-friendly payment meaning clear
  organize content into bold intro + editorial chapters + clear CTA
  apply the same canonical header/footer and visual system

For CSS:
  reuse shared tokens and shared shell styles
  create small helpers only where necessary
  avoid duplicated page-specific design systems
  keep mobile-safe wrapping and existing functional breakpoints

For QA:
  use Playwright headed browser at the real available window size first
  capture full-page screenshots for every public page
  record actual tab/window dimensions and document width values
  inspect visual consistency page-to-page
  then run secondary checks at 768px and 375px
```

## Constraints / Things NOT to Touch
- Do not copy wording, images, source code, names, biographies, legal pages, or exact design from inspiration sites.
- Do not add paid/external image dependencies unless the plan explicitly requires them; prefer existing repo assets and existing icon CDN already in use.
- Do not change PHP form endpoints, input `name` attributes, or JavaScript file paths.
- Do not alter `privacy_policy.html` legal/privacy copy; only bring its visual shell into consistency.
- Do not introduce hardcoded colour palettes outside `css/tokens.css`.
- Do not remove accessibility attributes or form labels.
- Do not remove working contact/booking/SMTP/honeypot behavior.
- Do not remove a script/CSS/PHP file unless its usage has been verified absent from all current public pages/runtime paths.
- Do not create or use sub-branches.
- Never commit `.yml` or `.yaml` files; delete temporary YAML after use.

## Open Questions
None. Use existing ProManaged business information in the repo and make implementation decisions autonomously within this scope.

## Known Trade-offs
- Medium: “Award-winning” cannot be guaranteed, but the plan should aim for distinctive concept, strong craft, original copy, and polished execution.
- Medium: Avoiding exact location naming may require rewriting older public copy that previously relied on specific places for trust.
- Medium: “Add pics if you have to” is limited to existing assets and already-approved icon/CDN sources unless a new dependency is explicitly approved.
- Low: Updating every page increases review scope, but uniformity across every public page is a hard requirement.
- Low: Visual polish is constrained by the existing static HTML/CSS architecture; structural HTML changes are allowed where necessary to achieve the approved visual direction.

## Phases
### Phase 1: Shared shell + homepage foundation
- Goal: Establish **The Connected Desk** visual and copy direction on `index.html`, including canonical navbar and footer.
- Exit condition: Homepage has original global copy, bold editorial blocks, working nav/CTAs/contact, canonical header/footer, and responsive layout.
- Files: `index.html`, shared CSS list, homepage CSS list.

### Phase 2: Secondary top-level pages
- Goal: Refresh `get-started.html`, `learn_more.html`, and `privacy_policy.html` to match the homepage style and voice without changing legal content.
- Exit condition: All three pages keep existing forms/scripts/links and use the same header/footer/type/colour/spacing language.
- Files: listed secondary pages + page CSS.

### Phase 3: Service pages
- Goal: Refresh all three service pages with clearer global copy, editorial blocks, stronger CTAs, and the same design system. Remove all software pricing.
- Exit condition: Software, hardware, and networking pages are visually consistent and retain working relative paths and forms.
- Files: listed service pages + page CSS.

### Phase 4: Legacy cleanup + browser QA
- Goal: Remove obsolete references/assets only where proven unused, then perform full Playwright review using the real available desktop window followed by 768/375 checks.
- Exit condition: All Completion Criteria pass and the final implementation is ready for review.
- Files: cleanup audit list + fixes only from prior phases.
