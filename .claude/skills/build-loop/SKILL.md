---
name: build-loop
description: Autonomous, token-efficient implementation/review loop for the ProManaged IT Signal & Systems site. Follow BUILD_PLAN.md exactly and stop only for a genuine blocker or completion.
---

# /build-loop

Drive the ProManaged IT implementation against `.claude/BUILD_PLAN.md`.

## Preconditions
Read `.claude/PROJECT_CONTEXT.md`, `.claude/BUILD_PLAN.md`, and `.claude/SYSTEM_MAP.md` before the first cycle.

## The cycle
1. **Plan** — identify the next unchecked plan requirement and its exact file scope.
2. **Build** — make the smallest implementation that satisfies the requirement.
3. **Polish** — for UI work, keep the shared Signal & Systems tokens, responsive bento system, accessibility and motion language coherent.
4. **Verify** — test the actual rendered behavior where browser tooling is available; also inspect the diff and relevant edge cases.
5. **Advance** — continue through the active phase without stopping for a separate approval unless the plan requires human input.

## Current architecture rails
- Frontend: static HTML + CSS + vanilla JS.
- Backend: PHP + vendored PHPMailer + SMTP.
- Shared form behavior: `js/form_intake.js`.
- Shared mail templates: `php/mailer.php`.
- Typography: Plus Jakarta Sans only.
- Navigation: logo-triggered full-screen bento panel; no traditional horizontal navbar.
- Motion: Building Blocks / Weighted Block Settle; no animation framework.

## Git
- Work only on `main`.
- Commit completed implementation directly to `main` and push to `origin/main`.
- Never create a branch or PR as a workaround.
- Never force-push.
- Never commit `.yml` or `.yaml` files.

## Cost & safety rails
- Prefer the minimum files and smallest safe diff needed to satisfy the plan.
- Preserve PHP endpoints, form field names, SMTP/PHPMailer, honeypot, IDs, accessibility, links and legal/privacy copy.
- Never print or commit secrets.
- Never introduce a framework or unrelated infrastructure.
- Never remove ordinary UI uses of the word “render”; Render cleanup only targets actual Render.com deployment infrastructure.

## Verification
For visual work, Playwright is the preferred QA path: headed real-window desktop first, full-page screenshots, then 1440px/768px/375px checks. Verify bento variety, founder portrait, navigation, motion, forms, console errors, links, fonts and overflow. If an environment cannot perform a required check, report the limitation honestly.

## Completion
Use BUILD_PLAN.md as the fixed scope ceiling. Do not invent extra deliverables. When all completion criteria are satisfied, report completion and stop.
