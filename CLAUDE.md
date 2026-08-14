# ProManaged IT — Claude Session Entry Point

This repo uses an autonomous, token-efficient implementation workflow. Every Claude session must treat the repository documentation as the persistent shared context rather than relying on previous chat history.

## Read first — every session

Read:

1. `.claude/AGENT_OPERATING_INSTRUCTIONS.md`
2. `.claude/PROJECT_CONTEXT.md`
3. `.claude/BUILD_PLAN.md`
4. `.claude/PROJECT_CREDIBILITY.md`
5. `.claude/SYSTEM_MAP.md` when relevant
6. `.claude/HOSPITALITY_SYSTEM_BUILDER.md` whenever hospitality-builder work is active

Then inspect the current implementation on `main`.

## Simple-session rule

If the user says only `continue`, `keep going`, `next`, `implement`, or `CODE NOW`, do not ask them to repeat requirements already documented in the repository.

Read the current plans, identify the highest-priority unfinished implementation work, and execute it.

Do not merely describe what should be done when an implementation objective is active.

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

- Preserve existing PHP endpoints, form `name` attributes, IDs, SMTP/PHPMailer, honeypot and accessibility contracts unless an active plan explicitly requires a safe fix.
- Validate on the server; escape dynamic values before HTML email output.
- Never expose SMTP credentials, secrets or internal server details.
- Never commit `.yml` or `.yaml` files.
- Work only on `main` and push directly to `origin/main`; do not create branches or PRs.
- Do not remove normal UI uses of the word “render”; Render cleanup means actual Render.com hosting/deployment infrastructure only.

## Verification

The current workflow may waive Playwright/browser verification when explicitly stated by the user. Never claim browser verification was performed unless it actually was. Complete all repository/code checks available in the current environment and report honestly.

## Current architecture

- Frontend: static HTML + CSS + vanilla JS.
- Backend: PHP + vendored PHPMailer + SMTP.
- Shared form behavior: `js/form_intake.js`.
- Shared mail templates/transport: `php/mailer.php`.

## Execution philosophy

The user is the final visual acceptance gate. Do not create an unnecessary review/approval loop between coherent implementation cycles.

The implementation agent should:

**READ → THINK → IMPLEMENT → SELF-CHECK → COMMIT → PUSH → REPORT**

If implementation reveals that a plan is incomplete or technically inaccurate, update the relevant plan so the repository remains the shared source of truth. Do not silently drift away from the documented product intent.
