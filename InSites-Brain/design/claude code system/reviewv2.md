# 50 Claude Code Tips — Project-Specific Review (InSites CAA Workshop)

> **File**: `InSites-Brain/design/claude code system/reviewv2.md`
> **Source**: `InSites-Brain/design/claude code system/50 Claude Code Tips and Best Practice.md`
> **Previous review**: `InSites-Brain/design/claude code system/reviewv1.md` (generic, by Claude chrome extension)
>
> **reviewv2**: Enhanced from reviewv1 with project-specific context from Claude Code Opus 4.6 working inside the actual project.
>
> **Project profile**: AI-first heritage research, prompt engineering focus (~80% .md files), VS Code extension (not terminal CLI), active MCP (Playwright + Notion), heavy skills usage (3 Claude Code + 7 Claude.ai Project Skills), long sessions with frequent context overflow, one React codebase (workshop-site/).

---

## 🟢 HIGH VALUE — Adopt or Already Active

**#4 — Feedback loops (tests/linter)** — ✅ Already doing
- reviewv1: "THE most impactful habit" — **Agree.**
- Project note: Global CLAUDE.md says "Run existing tests after making changes." For workshop-site, `npm run build` is the verification loop. For bot prompts, the feedback loop is Playwright browser testing of generated HTML artifacts.

**#7 — "ultrathink" for complex reasoning** — 📌 Keep in mind
- reviewv1: "situational" — **Upgraded.** Very relevant for this project.
- Project note: CBSA methodology reasoning, KG architecture decisions, cross-platform sync analysis, and prompt QA optimization all benefit from deep reasoning. Use for design decisions, not for file edits.

**#8 — Skills for on-demand knowledge** — ✅ Already doing (core architecture)
- reviewv1: "redundant, just CLAUDE.md organization" — **WRONG for this project.**
- Project note: Skills are the project's core architecture, not a CLAUDE.md variant. 7 Claude.ai Project Skills (KG, Dashboard, MA-RA, MA-RC, etc.) reduce always-loaded tokens by ~43%. 3 Claude Code skills (/prompt-qa, /agent-builder, /cbsa-ux-review) provide specialized development workflows. Skills ≠ rules.

**#11 — Plan Mode for multi-step tasks** — ✅ Already doing (learned the hard way)
- reviewv1: "situational" — **Upgraded.** Essential for this project.
- Project note: User had to interrupt last session to force plan mode. Now codified in `feedback_plan_before_execute.md`: "If a task involves >3 files or a design choice, ask or enter plan mode first."

**#12 — /clear between unrelated tasks** — 📌 Keep in mind
- reviewv1: "critical discipline" — **Agree.**
- Project note: Last session hit 6 context overflows. Long CBSA-focused sessions are the norm. /clear or starting a new VS Code chat panel between distinct work areas (prompt editing vs. workshop-site code vs. dashboard testing) prevents context pollution.

**#19 — Subagents for investigation** — ✅ Already doing
- reviewv1: "keeps main context clean" — **Agree.**
- Project note: Used extensively for session analysis, codebase exploration, and parallel research. The Explore subagent type is particularly useful for mapping the repo's active/inactive structure.

**#21 — Guide compaction with instructions** — 🔧 Should configure
- reviewv1: "only matters in very long sessions" — **This project IS very long sessions.**
- Project note: 6 context overflows in one session. Adding compaction guidance to CLAUDE.md ("When compacting, preserve: current task, modified files list, which bot prompt version is being edited, active platform") would significantly help.

**#24 — After 2 corrections, start fresh** — 📌 Keep in mind
- reviewv1: "counterintuitive but proven" — **Agree.**
- Project note: Especially relevant when iterating on dashboard HTML generation — failed CSS/JS approaches poison the context. Better to /clear and describe what went wrong in the fresh prompt.

**#25 — @ file references** — 📌 Keep in mind
- reviewv1: "saves tokens" — **Agree.**
- Project note: Particularly useful because the repo has many similarly-named files (InSites-CAA.md vs InSites-CAA-mono-v2.0.md, multiple dashboard files). Pointing directly avoids Claude reading the wrong version.

**#28 + #29 — /init then trim CLAUDE.md ruthlessly** — ✅ Already doing
- reviewv1: "the key insight" — **Agree, and we go further.**
- Project note: The project has a dedicated /prompt-qa skill for optimizing bot prompts using the LIM (Less Is More) principle. The CLAUDE.md litmus test applies to bot prompts too — every line in InSites-CAA-mono should earn its place.

**#30 — Update CLAUDE.md after mistakes** — ✅ Already doing (via memory system)
- reviewv1: "elegant pattern" — **Already implemented, but better.**
- Project note: The auto-memory system with typed memories (feedback, project, reference, user) is a more structured version of this. Feedback memories include "Why" and "How to apply" — more useful than a raw CLAUDE.md line. Example: `feedback_match_existing_ux.md` captures the dashboard redesign lesson with full context.

**#36 — MCP servers (Playwright, Notion)** — ✅ Already active
- reviewv1: "situational" — **Upgraded.** Core to this project.
- Project note: Playwright MCP is used for dashboard HTML testing (serve → click all tabs → screenshot → fix bugs). Notion MCP is used for dev tracking (48-component DB with 5 views). Both are configured and working.

**#38 — CLAUDE.md for suggestions, hooks for requirements** — 📌 Keep in mind
- reviewv1: "important mental model" — **Agree.**
- Project note: Currently no hooks are configured. If auto-formatting or mandatory lint checks become needed for workshop-site, hooks are the right mechanism. For now, CLAUDE.md + memory is sufficient because most work is .md prompt engineering, not code.

**#41 — Compaction hooks to preserve context** — 🔧 Should configure
- reviewv1: "valuable for multi-hour sessions" — **Critical for this project.**
- Project note: Same rationale as #21. A Notification hook on compaction that re-injects "Current task: [X], Bot prompt version: [mono/split], Modified files: [list]" would prevent the disorientation that happens after context overflow.

**#44 — Let Claude interview you** — 📌 Keep in mind
- reviewv1: "better specs from vague ideas" — **Agree.**
- Project note: Useful when designing new CBSA features (e.g., a new mini-agent, a new dashboard tab type) where the user knows the domain deeply but hasn't specified the technical shape. The interview pattern with AskUserQuestion tool is already how plan mode works.

---

## 🟡 SITUATIONAL — Use When Needed

**#1 — `cc` alias** — 🔧 Should configure
- reviewv1: "huge time saver" — **Agree.**
- Project note: Primary workflow is VS Code extension (no remote control support). But VS Code's **integrated terminal** (Ctrl+`) can run `cc --remote-control` for long tasks monitored from phone. The alias removes friction for this secondary workflow. Pairs with #9 and #15. Add to `~/.bashrc`.

**#5 — LSP plugins** — Limited value
- reviewv1: "single highest-impact plugin" — **Only for workshop-site/.**
- Project note: ~80% of development is .md prompt engineering where LSP doesn't help. TypeScript LSP would only help when editing the workshop-site React code. Install if workshop-site development intensifies.

**#6 — gh CLI** — 📌 Keep in mind
- reviewv1: "great for PR/issue work" — **Agree when needed.**
- Project note: The repo is 26 commits ahead of origin. When it's time to push/PR, gh CLI is useful. Not daily workflow currently.

**#10 — 1M token context** — 📌 Keep in mind
- Project note: Long sessions are normal here. Worth trying if context overflows remain frequent even with compaction guidance (#21, #41).

**#13 — Paste raw errors** — ✅ Already doing
- Project note: User pastes Hebrew keyboard garble, raw build output, screenshots. Claude handles all of these well.

**#15 — --worktree for parallel branches** — 📌 Keep in mind
- reviewv1: "biggest productivity unlock" — **Relevant for integrated terminal sessions.**
- Project note: Primary workflow is VS Code extension (single main branch, tags for milestones). But via integrated terminal: `cc --worktree experiment-x` isolates risky work (prompt restructuring, KG schema changes) while VS Code extension continues on main. Add `--remote-control` to monitor from phone. The trio #1 + #9 + #15 forms a complete secondary workflow alongside the VS Code extension.

**#20 — Agent Teams** — 📌 Keep in mind
- Project note: Experimental. Could be useful for cross-platform sync (one agent per platform: Claude, GPT, Gemini). Not ready for production use yet.

**#22 — /loop for recurring checks** — 📌 Keep in mind
- Project note: Could be useful for monitoring `alephplace.com/CAA26` after deployment updates.

**#27 — Ctrl+G to edit plans** — 📌 Keep in mind
- Project note: Plan mode is already used. This is a nice shortcut for tweaking plans without re-explaining.

**#31 — .claude/rules/ with path matchers** — 🔧 Could configure
- Project note: Could be useful for path-specific rules: `InSites-Brain/**/*.md` gets prompt-engineering rules, `workshop-site/**/*.tsx` gets React/TypeScript rules. Not urgent — the current CLAUDE.md active/inactive map handles most of this.

**#34 — /sandbox for isolation** — Not applicable
- Project note: No destructive operations risk. The project is .md files and one static site. Sandbox adds friction without benefit.

**#35 — Custom subagents in .claude/agents/** — 🔧 Could configure
- Project note: A `dashboard-tester` agent (serve HTML → Playwright test → fix loop) was identified as a potential skill. Could also be an agent. Deferred for now.

**#39 — PostToolUse auto-format hook** — Limited value
- reviewv1: "huge QoL improvement" — **Only for workshop-site/.**
- Project note: .md files don't need auto-formatting. If Prettier is desired for workshop-site TSX files, configure with a path filter. Not a priority.

**#40 — PreToolUse hooks to block destructive commands** — 📌 Keep in mind
- Project note: Low risk profile (no database, no production server). Worth considering if deployment automation is added.

**#45 — One Claude writes, another reviews** — 📌 Keep in mind
- Project note: The /cbsa-ux-review skill already serves as a "second opinion" tool for bot prompts and dashboards. For major prompt rewrites, a fresh Claude session reviewing the output would add value.

**#46 — Conversational PR reviews** — 📌 Keep in mind
- Project note: Relevant when the 26 pending commits are pushed and PRs start flowing.

**#49 — claude -p fan-out for batch ops** — Not applicable
- Project note: No batch file operations needed. The project doesn't have repetitive per-file migrations.

---

## 🔵 SKIP — Built-in, Not Applicable, or Already Covered

**#2 — ! prefix for bash** — Built-in knowledge. VS Code extension handles this differently.

**#3 — Esc / Esc+Esc to rewind** — VS Code extension uses different controls. Built-in behavior.

**#9 — Remote control from phone** — 📌 Keep in mind
- reviewv1: "rarely practical" — **Disagree for this project.**
- Project note: Remote control is **CLI only** — the VS Code extension doesn't support it. But you can run `cc --remote-control` in VS Code's integrated terminal (Ctrl+`). This gives you: local files visible in VS Code + remote monitoring from phone. Ideal for long tasks (prompt QA, dashboard generation + Playwright testing) that run 20+ minutes. Pairs with #1 (cc alias) and #15 (worktree).

**#14 — /btw for side questions** — VS Code extension. Minor convenience.

**#16 — Ctrl+S to stash prompt** — VS Code extension. Rarely needed.

**#17 — Ctrl+B to background tasks** — VS Code extension handles this via the run_in_background parameter on tools.

**#18 — Status line** — VS Code already shows git branch, directory. The extension has its own status indicators.

**#23 — Voice dictation** — User types fast in both Hebrew and English. Not a workflow fit.

**#26 — Vague exploration prompts** — Not a tip, just normal usage. Already doing this.

**#32 — @imports in CLAUDE.md** — Mechanism detail covered by #28/#29. Already using InSites-Brain/CLAUDE.md as a cross-reference.

**#33 — /permissions to allowlist** — Redundant with VS Code extension permission settings.

**#37 — /config output style** — Default is fine. User prefers concise, direct communication (already captured in user memory).

**#42 — Manually review auth/payments** — Common sense, not a Claude Code tip. No auth/payment code in this project.

**#43 — /branch to fork conversations** — Rarely needed. Rewind or new chat panel covers this.

**#47 — Name and color-code sessions** — VS Code extension. Multiple panels serve this purpose.

**#48 — Play a sound on completion** — VS Code has its own notification system.

**#50 — Custom spinner verbs** — Terminal only. Zero productivity impact.

---

## Actionable Next Steps

Based on this review, ordered by impact:

1. **Configure compaction guidance** (#21) — Add to CLAUDE.md: "When compacting, preserve: current task description, which bot prompt version is being edited (mono vs split), list of modified files, active platform target."

2. **Set up compaction hook** (#41) — Add a Notification hook in `.claude/settings.json` that re-injects key context after compaction events.

3. **Use ultrathink for architecture decisions** (#7) — When making design choices (KG schema, new mini-agent spec, cross-platform sync), prefix with "ultrathink" or set /effort high.

4. **Consider path-specific rules** (#31) — If workshop-site development increases, add `.claude/rules/react.md` with `paths: ["workshop-site/**/*.tsx"]`.

5. **Consider TypeScript LSP** (#5) — Install `typescript-lsp` plugin if workshop-site development becomes a major focus area.
