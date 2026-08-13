# ProManaged IT — Agent Operating Instructions

## Purpose

This file is persistent operating context for Claude and any other coding agent working on this repository.

The goal is to prevent repeated prompts across separate Claude sessions. The repository plans are the shared memory. A short instruction such as `continue` should be enough to resume implementation.

## Session startup

At the beginning of every session:

1. Read `CLAUDE.md`.
2. Read `.claude/PROJECT_CONTEXT.md`.
3. Read `.claude/BUILD_PLAN.md`.
4. Read `.claude/PROJECT_CREDIBILITY.md`.
5. Read `.claude/SYSTEM_MAP.md` when the task touches architecture or shared components.
6. Read `.claude/HOSPITALITY_SYSTEM_BUILDER.md` whenever hospitality-builder work is active.
7. Inspect the current repository state on `main` before making assumptions.

The repository is authoritative. Do not depend on previous conversation history for requirements that are already documented here.

## Autonomous execution

When the user says `continue`, `keep going`, `next`, `implement`, or `CODE NOW`:

- do not ask the user to repeat documented requirements;
- identify the highest-priority unfinished work from the active plans;
- inspect the existing implementation and dependencies;
- implement the work;
- self-check the result;
- commit the coherent completed scope;
- push directly to `main`;
- report briefly what changed, what was checked, and the commit SHA.

Do not merely produce another plan when an implementation objective is already active.

Do not create an approval loop between every small implementation step. The user is the final visual acceptance gate and will say when something needs changing.

## Team model

ChatGPT, Claude, Perplexity and other agents are working on the same product. Do not artificially divide the product into isolated responsibilities.

The Build Plans are the shared source of truth.

- Strategic/product direction may be refined by the team.
- External research may inform decisions.
- Claude is authorised to implement the documented objectives without waiting for another prompt.
- If implementation exposes an ambiguity, resolve it using the existing project context and safest interpretation, then update the relevant plan if the decision materially changes future implementation.

## Main branch policy

Work directly on `main`.

Do not create branches or pull requests unless the repository instructions are explicitly changed.

After a coherent implementation scope:

1. inspect the diff;
2. search for accidental selector/ID/file-contract changes;
3. verify internal links and asset paths;
4. run available code/repository validation;
5. verify that existing backend contracts remain intact;
6. commit with a meaningful message;
7. push to `main`.

Never claim a test, browser check or deployment verification that was not actually performed.

## Design protection

ProManaged uses the **Signal & Systems** design language: editorial, engineered, warm, precise and human.

Preserve the existing design system rather than replacing it with a generic SaaS aesthetic.

Protect:

- `nav-rail` and bento navigation behaviour;
- existing button contracts including `.btn`, `.primary`, `.secondary` and `.hero-buttons`;
- Plus Jakarta Sans typography;
- existing tokens and surfaces;
- current visual rail and balanced desktop composition;
- asymmetric bento language;
- shared footer;
- founder portrait treatment;
- Building Blocks motion system;
- responsive and accessibility behaviour;
- existing production form/backend contracts.

Before changing a shared selector, ID or JavaScript hook, search the repository for all usages.

Do not introduce an animation library, frontend framework, parallax, looping motion, gratuitous gradients, generic glassmorphism or a new design system unless an active plan explicitly requires it.

## Backend protection

Existing PHP/PHPMailer/SMTP functionality is production functionality.

Do not rewrite backend logic merely to change appearance.

Preserve:

- PHP endpoints;
- form `name` attributes;
- IDs used by JavaScript;
- validation;
- honeypot protection;
- SMTP transport;
- PHPMailer integration;
- internal email delivery;
- customer confirmation delivery;
- HTML and plain-text email alternatives.

Never expose secrets or credentials in source, commits, public UI, logs or email templates.

## Hospitality System Builder

`.claude/HOSPITALITY_SYSTEM_BUILDER.md` is an active implementation plan, not optional documentation.

When it is the current scope:

- inspect the actual Rosalyn's and Liwonde Sun systems/code/assets where available before finalising feature assumptions;
- distinguish genuine reusable hospitality functionality from client-specific functionality;
- do not invent project capabilities, outcomes or metrics;
- treat the builder as a guided product configurator + discovery journey + qualified enquiry;
- preserve the existing ProManaged visual language;
- make Core, Optional, Dependencies, Workflow Stories and Proposed System understandable to non-technical hospitality owners;
- ensure the final submission produces a structured discovery brief;
- do not imply that every selected capability is already a standard SaaS module;
- keep the architecture maintainable so the experience can later inform a real multi-tenant hospitality product.

## Content credibility

Read `.claude/PROJECT_CREDIBILITY.md` whenever project proof is involved.

Approved named project proof:

- Rosalyn's — Hotel Management System
- Liwonde Sun Hotel — Hotel Management System

Bank Nkhonde must never be mentioned publicly.

Do not invent:

- testimonials;
- awards;
- certifications;
- metrics;
- outcomes;
- client claims;
- project functionality that has not been verified.

## Responsive quality

Treat mobile as a first-class composition, not a collapsed desktop.

At minimum consider:

- 375px;
- 430px;
- 768px;
- 1024px;
- 1440px;
- 1600px+.

Large screens may use a wider visual composition but must preserve readable text measures and avoid the previous oversized/full-canvas failure.

Mobile must avoid horizontal overflow, tiny controls, compressed bento grids and overlapping fixed elements.

## Motion quality

Building Blocks is a signature interaction language.

Use the existing motion system and approved variants where appropriate:

- `settle-up`;
- `settle-side`;
- `scale-in`;
- `sequence-in`.

Motion should feel slow, weighted and intentional. Prefer opacity and transform. Respect `prefers-reduced-motion`.

Do not animate everything merely because it can be animated. Use contrast between motion-rich moments and calm editorial moments to create premium pacing.

## Self-correction

If a change causes a regression:

1. identify the smallest safe rollback/fix;
2. restore the existing contract;
3. continue with the intended work using a safer implementation.

Do not compound a broken design with unrelated rewrites.

If a requirement in an active plan proves incomplete, update the plan rather than silently diverging from it.

## Definition of done

A task is not complete simply because files were changed.

It is complete when:

- the documented objective is implemented;
- existing contracts are preserved;
- the implementation is responsive;
- accessibility is considered;
- motion has an appropriate reduced-motion path;
- no obvious dead links/assets/selectors were introduced;
- available validation has been run;
- the coherent scope is committed and pushed to `main`.

## Final report format

After an implementation cycle, report only what is useful:

- **Implemented:** concise summary
- **Checked:** concise validation summary
- **Commit:** SHA
- **Pushed:** yes/no
- **Blockers:** only genuine blockers

Then wait for the user's next instruction. A future `continue` means resume from the repository plans without requiring the user to restate context.
