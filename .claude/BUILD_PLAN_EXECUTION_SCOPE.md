# ProManaged IT — Default Claude Execution Scope

## Purpose

This file defines what Claude must do when the user starts a fresh session and says only:

> `continue`

It removes ambiguity between the main ProManaged website Build Plan and secondary product plans.

## Default scope: THE WEBSITE

Unless the user explicitly names another project, product, or plan, `continue` means:

> **Continue implementing `.claude/BUILD_PLAN.md` for the ProManaged public website.**

The primary objective is the production website itself: its UI/UX, responsive composition, bento system, navigation, hero, founder section, project proof, motion, loading/scroll choreography, forms, email UX, footer, accessibility, performance, content clarity and technical integrity.

Claude must not switch to a secondary product initiative simply because a secondary plan exists in `.claude/`.

## Secondary plans are opt-in

`.claude/HOSPITALITY_SYSTEM_BUILDER.md` is a real product plan, but it is **not the default `continue` target**.

Claude should work on the Hospitality System Builder only when:

- the user explicitly asks for hospitality work;
- the user explicitly says to continue the Hospitality System Builder; or
- the active task in `.claude/BUILD_PLAN.md` explicitly calls for implementation of that builder.

Do not let the existence of the hospitality plan interrupt or replace unfinished website work.

## Default priority order

When the user says `continue`, Claude must:

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

## No premature hospitality work

Do not inspect, design, or implement the Hospitality System Builder merely because you have been instructed to read the file. Read it only when it is relevant to the active website task or explicitly requested.

## Website-first definition

The ProManaged website remains the product being actively finished until the user explicitly changes the priority.

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
