# ProManaged IT — Agent Build System

This repo uses an autonomous, token-efficient agent build system for the modern-minimalist redesign. Future sessions should default to `/build-loop` with these constraints active.

## Read first
- `.claude/PROJECT_CONTEXT.md` — project goals, audit, benchmarks, gaps.
- `.claude/BUILD_PLAN.md` — the checklist and the fixed "PROJECT COMPLETE WHEN" scope ceiling.
- `.claude/SYSTEM_MAP.md` — feature-to-file map (produced by codebase-scout).

## Default workflow
Run `/build-loop` (continuous by default). It cycles: build-planner -> specialist -> ui-designer (if UI) -> qa-auditor -> mark done or retry once -> auto-advance. Stops only on a blocking decision, a twice-failed retry, a safety-rail violation, or when every PROJECT COMPLETE WHEN box is [x].

## Locked design decisions
- Accent color: #2563EB. Font: Inter. Single light theme.
- One border-radius, one–two shadows, a defined spacing + type scale.
- Token source of truth: `css/tokens.css` — reference via var(--...); never reintroduce per-file :root palettes or hardcoded colors.

## Agents (.claude/agents/)
- codebase-scout (haiku) — read-only feature/file mapper, one directory per call.
- build-planner (opus) — owns BUILD_PLAN.md, one objective per cycle, cannot exceed approved scope.
- backend-specialist (sonnet) — Node/Express + PHP, exact paths only.
- frontend-specialist (sonnet) — HTML/CSS/vanilla JS, exact paths only.
- ui-designer (sonnet) — visual polish, scoped to files frontend just touched.
- qa-auditor (sonnet) — read-only quality gate, diff only.

## Rails (always on)
- Models: Haiku read-only/lint · Sonnet build · Opus/Fable setup+planning only.
- Max 2 concurrent specialists. /compact every 3 tasks, /clear on phase switch.
- NEVER commit or push from the loop. NEVER run destructive SQL. Never print committed secrets.
- Scope is fixed by PROJECT COMPLETE WHEN; new ideas go to FUTURE IDEAS, flagged for approval.
