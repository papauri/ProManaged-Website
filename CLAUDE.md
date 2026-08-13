# ProManaged IT — Agent Build System

This repo uses an autonomous, token-efficient implementation workflow for the Signal & Systems redesign. Execution runs in self-contained cycles that always complete (implement → self-check → commit → push → report); review is view-only and happens only after delivery, never as an approval gate.

## Read first
- `.claude/PROJECT_CONTEXT.md` — current product, audience, design intent and non-goals.
- `.claude/BUILD_PLAN.md` — authoritative active scope and completion criteria.
- `.claude/SYSTEM_MAP.md` — current feature/file map.

## Current design contract
- Design direction: Signal & Systems — editorial technology studio / engineering workshop.
- Palette source of truth: `css/tokens.css` — warm paper/ivory/stone/sand/greige/graphite surfaces, earthy decorative accent, blue reserved for interaction/identity.
- Typography: **Plus Jakarta Sans only** for headings, body, navigation, buttons, forms, labels, metadata and footer.
- No traditional horizontal navbar. The visible ProManaged logo tile opens the full-viewport bento navigation.
- Bento layouts are intentionally varied by breakpoint; do not reduce them to identical card stacks.
- Signature motion: Building Blocks / Weighted Block Settle using lightweight CSS transform/opacity and the existing shared JS observer. No animation framework, parallax, looping motion or splash delay.
- Founder portrait is a smaller circular treatment using the existing high-resolution repository asset when available.
- Contact/booking forms use the same premium bento intake language as the site.
- Internal and customer emails use reusable branded HTML + plain-text templates from `php/mailer.php`.

## Implementation rules
- Preserve existing PHP endpoints, form `name` attributes, IDs, SMTP/PHPMailer, honeypot and accessibility contracts unless the active BUILD_PLAN explicitly requires a safe fix.
- Validate on the server; escape dynamic values before HTML email output.
- Never expose SMTP credentials, secrets or internal server details.
- Never commit `.yml` or `.yaml` files.
- Work only on `main` and push directly to `origin/main`; do not create branches or PRs.
- Do not remove normal UI uses of the word “render”; Render cleanup means actual Render.com hosting/deployment infrastructure only.

## Verification
For this run, the user explicitly waived Playwright/browser verification. Do not claim browser verification was performed. All code/repository checks that can be completed through GitHub should still be performed and reported honestly.

## Current architecture
- Frontend: static HTML + CSS + vanilla JS.
- Backend: PHP + vendored PHPMailer + SMTP.
- Shared form behavior: `js/form_intake.js`.
- Shared mail templates/transport: `php/mailer.php`.
