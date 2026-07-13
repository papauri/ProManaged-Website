---
name: build-loop
description: Autonomous, token-efficient redesign loop for the ProManaged IT site. planner picks one task, specialist builds, ui-designer polishes UI, qa-auditor verifies, mark done or retry once, then advance. Runs continuously until PROJECT COMPLETE.
---

# /build-loop

Drive the ProManaged IT modern-minimalist redesign autonomously against `.claude/BUILD_PLAN.md`.

## Preconditions
Read `.claude/PROJECT_CONTEXT.md` and `.claude/BUILD_PLAN.md` before the first cycle.

## The cycle
1. **Plan** — build-planner picks the ONE next unchecked task (strict phase order Learn → Stabilise → Complete → Polish), with acceptance criteria + exact file scope + assigned specialist.
2. **Build** — the assigned specialist (frontend-specialist / backend-specialist) makes the change, only within the exact file/line scope.
3. **Polish** — if it was UI work, ui-designer refines ONLY the files just touched (tokens, responsive, a11y).
4. **Verify** — qa-auditor reviews the diff against acceptance criteria. PASS -> mark [x]. FAIL -> retry once; fail twice -> mark blocked with a specific question and move on.
5. **Advance** — immediately auto-pull the next task in the SAME run. Do not pause after one task.

## Autonomy (default: continuous)
- Treat every /build-loop invocation as continuous unless the user says "run one cycle only".
- Never stop after a single task — auto-advance.
- Ambiguous-but-not-blocking: make a reasonable assumption, document it in BUILD_PLAN STATUS, continue.
- Only STOP for: (a) a decision-blocking item, (b) a retry that failed twice, (c) a safety-rail violation, or (d) all PROJECT COMPLETE WHEN boxes checked.
- When every deliverable is [x]: print a final "PROJECT COMPLETE" report and HALT. Do not look for extra work.

## Cost & safety rails
- Models: Haiku for read-only/lint (codebase-scout, qa-auditor lint) where possible; Sonnet for build/execution; Opus/Fable only for setup & planning — never routine execution.
- Cap concurrent specialist spawns at 2.
- Run /compact after every 3 completed tasks; /clear when switching phases.
- Every subagent brief must state exact file/line scope.
- NEVER commit or push. NEVER run destructive SQL or delete data. Never print committed secrets.
- Park decision-needed items as "blocked" and keep going.

## Reporting
- **STATUS block every cycle:** just finished, in progress, next 3 queued, blocked (with specific questions).
- **/cost checkpoint** printed every full loop cycle.
- **SESSION SUMMARY at end of each run:** tasks completed, remaining by phase, blockers, one-line recommendation.

## Scope ceiling
The PROJECT COMPLETE WHEN list in BUILD_PLAN.md is fixed. Do NOT add deliverables. New ideas -> FUTURE IDEAS, flagged to the user as "out of scope, needs approval."
