# ProManaged IT — Default Claude Execution Scope

## Purpose

This file defines what Claude must do when the user starts a fresh session and gives a short continuation instruction. It removes ambiguity between the main ProManaged website Build Plan and the separate Hospitality System Builder plan.

## Default scope: THE WEBSITE

Unless the user explicitly names another project, product, or plan, `continue` means:

> **Continue implementing `.claude/BUILD_PLAN.md` for the ProManaged public website.**

The primary objective is the production website itself: its UI/UX, responsive composition, bento system, navigation, hero, founder section, project proof, motion, loading/scroll choreography, forms, email UX, footer, accessibility, performance, content clarity and technical integrity.

Claude must not switch to a secondary product initiative simply because a secondary plan exists in `.claude/`.

## Hospitality override — explicit and deterministic

`.claude/HOSPITALITY_SYSTEM_BUILDER.md` is a separate active product build plan. It is not the default target for an unqualified `continue`, but the following phrases are explicit overrides:

- `continue hospitality`
- `continue the hospitality builder`
- `continue the Hospitality System Builder`
- `work on the hospitality builder`
- `implement the hospitality builder`
- `CODE NOW — hospitality`

When any of those instructions is used, Claude MUST switch the active execution scope to:

> **`.claude/HOSPITALITY_SYSTEM_BUILDER.md`**

For that session, the Hospitality System Builder becomes the primary implementation objective. Claude must not return to unrelated website tasks until the requested hospitality scope is complete or genuinely blocked.

The hospitality plan must be read together with the website's shared design/context documents because it is an extension of the ProManaged website, not a separate visual identity.

## Hospitality execution order

When the Hospitality System Builder is explicitly activated, Claude must:

1. Read `CLAUDE.md`.
2. Read `.claude/AGENT_OPERATING_INSTRUCTIONS.md`.
3. Read this file.
4. Read `.claude/HOSPITALITY_SYSTEM_BUILDER.md` in full.
5. Read `.claude/PROJECT_CONTEXT.md`.
6. Read `.claude/PROJECT_CREDIBILITY.md`.
7. Read `.claude/SYSTEM_MAP.md` when relevant.
8. Inspect the current `main` implementation and recent relevant commits.
9. Inspect the existing ProManaged Build/software page and form/backend conventions.
10. Inspect the real Rosalyn's and Liwonde Sun project evidence/code/assets that are accessible through the repository or configured project access before finalising feature assumptions.
11. Find the highest-priority unchecked hospitality task in `.claude/HOSPITALITY_SYSTEM_BUILDER.md`.
12. Implement the complete coherent active hospitality scope and its necessary dependencies.
13. Self-check against the hospitality plan's acceptance criteria, including mobile-first UI/UX, responsive behaviour, motion, accessibility, form submission and regression safety.
14. Mark only genuinely completed hospitality tasks `[x]`.
15. Update the hospitality plan's progress/status record.
16. Commit the implementation and hospitality-plan progress update together.
17. Push directly to `main`.
18. Report the implementation, completed plan items, checks, commit SHA, push status and genuine blockers.

## Hospitality plan integrity

The hospitality plan is a live task register, not passive documentation.

- `[ ]` means unfinished.
- `[x]` means implemented and self-checked against the documented acceptance criteria.
- `PARTIAL` means work has started but remains unchecked.
- `BLOCKED` means a genuine technical/external blocker prevents completion.

Do not mark the overall Hospitality System Builder complete while required child tasks remain unfinished.

Do not invent feature capabilities from Rosalyn's or Liwonde Sun. Verify what is actually available before using it as product evidence or defining it as a reusable module.

## Secondary plans are opt-in

Plans other than `.claude/BUILD_PLAN.md` and `.claude/HOSPITALITY_SYSTEM_BUILDER.md` remain opt-in unless the user explicitly activates them or the active plan requires them.

## Default priority order

When the user says unqualified `continue`, Claude must:

1. Read `CLAUDE.md`.
2. Read `.claude/AGENT_OPERATING_INSTRUCTIONS.md`.
3. Read `.claude/BUILD_PLAN_EXECUTION_SCOPE.md`.
4. Read `.claude/BUILD_PLAN.md`.
5. Inspect the current `main` implementation.
6. Find the highest-priority unchecked website task in `.claude/BUILD_PLAN.md`.
7. Implement that task and its coherent dependencies.
8. Self-check against the Build Plan acceptance criteria.
9. Mark completed tasks `[x]` only after verification.
10. Update the Build Plan's current status/progress record.
11. Commit code + plan-state changes together.
12. Push to `main`.

## No prompt recycling

Do not ask the user to repeat requirements already documented in the repository.

A new Claude session must be able to resume from the repository state alone.

## Website-first definition

The ProManaged website remains the product being actively finished when no other scope is explicitly activated.

The default goal is to make the existing website feel:

- premium;
- modern;
- editorial;
- mobile-first;
- distinctive;
- commercially clear;
- trustworthy;
- responsive;
- motion-rich but restrained;
- production-ready.

Never interpret `continue` as permission to redesign the project from scratch.
