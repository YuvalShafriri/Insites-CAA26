Here's my analysis of all 50 tips. I've split them into three tiers:



---



\## 🟢 HIGH VALUE — Adopt These



These will genuinely change how you work:



\*\*#1 — `cc` alias with `--dangerously-skip-permissions`\*\* — Huge time saver if you trust your workflow. The permission prompts are the #1 friction point. Just understand the risk.



\*\*#4 — Give Claude a feedback loop (tests/linter)\*\* — This is THE most impactful habit. Telling Claude "run tests after, fix failures" turns it from a one-shot code generator into a self-correcting agent. Boris Cherny (the creator) highlights this for good reason.



\*\*#5 — Install LSP plugins\*\* — Automatic diagnostics after every edit is a real quality multiplier. Claude fixes type errors before you even see them. Install the one for your language.



\*\*#12 — `/clear` between unrelated tasks\*\* — Critical discipline. Long sessions degrade noticeably. Most people don't do this enough.



\*\*#15 — `--worktree` for parallel branches\*\* — If you're not doing parallel work yet, this is the unlock. 2-3 worktrees running simultaneously is a different level of throughput.



\*\*#19 — Subagents for investigation\*\* — Keeps your main context clean. Deep dives into "how does X work" can eat half your window. Offload that.



\*\*#24 — After 2 corrections, start fresh\*\* — Counterintuitive but proven. The failed-attempt context actively poisons subsequent attempts. Hard-earned wisdom.



\*\*#25 — `@` file references\*\* — Pointing Claude directly at files saves tokens and eliminates wrong-file mistakes. Use it every time you know where the relevant code is.



\*\*#28 + #29 — `/init` then trim CLAUDE.md ruthlessly\*\* — The litmus test ("would Claude make a mistake without this line?") is the key insight. Most CLAUDE.md files are 3x too long.



\*\*#38 — CLAUDE.md for suggestions, hooks for requirements\*\* — Important mental model. CLAUDE.md is ~80% compliance. Hooks are 100%. If something \*must\* happen, it's a hook.



\*\*#39 — Auto-format with PostToolUse hook\*\* — Set it once, never think about formatting again. Huge quality-of-life improvement.



\*\*#44 — Let Claude interview you\*\* — When you have a vague idea, this produces dramatically better specs than trying to write the full prompt yourself. Excellent pattern.



---



\## 🟡 SITUATIONALLY USEFUL — Know They Exist



Worth knowing about, use when the situation fits:



\*\*#6 — `gh` CLI and teaching Claude CLI tools\*\* — Great if you do PR/issue work from terminal. The "read --help and figure it out" pattern is surprisingly reliable.



\*\*#7 — "ultrathink"\*\* — Useful for architecture decisions. Overkill for simple tasks. `/effort` is the more practical version.



\*\*#10 — 1M token context\*\* — Matters for huge codebases. Most sessions don't need it, and quality can degrade at high context.



\*\*#11 — Plan Mode (Shift+Tab)\*\* — Good for multi-file changes where you're unsure of the approach. Skip for anything you can describe in one sentence.



\*\*#13 — Paste raw errors, don't interpret\*\* — Good habit but most experienced devs already do this instinctively.



\*\*#20 — Agent Teams\*\* — Experimental. Powerful for parallel refactors, but fragile if teammates touch the same files. Try it for research/review tasks first.



\*\*#21 — Guide compaction with instructions\*\* — Only matters in very long sessions. Worth knowing when you hit that wall.



\*\*#22 — `/loop` for recurring checks\*\* — Niche but great for deploy monitoring or CI watching.



\*\*#27 — Ctrl+G to edit plans\*\* — Nice when Claude's plan is 80% right and you want to tweak it without re-explaining.



\*\*#30 — "Update your CLAUDE.md" after mistakes\*\* — Elegant pattern for evolving your rules organically. Just watch that the file doesn't bloat.



\*\*#31 — `.claude/rules/` with path matchers\*\* — Good for multi-language repos. Unnecessary if you only work in one language.



\*\*#34 — `/sandbox` for isolation\*\* — Great for unsupervised or risky work. Docker is better for overnight runs.



\*\*#35 — Custom subagents in `.claude/agents/`\*\* — Worth it if you have recurring specialized tasks (security review, etc.).



\*\*#36 — MCP servers (Playwright, DB, Slack, Figma)\*\* — Pick the one that fits your stack. Playwright for UI work is the most universally useful.



\*\*#40 — PreToolUse hooks to block destructive commands\*\* — Peace of mind. Set it once and forget.



\*\*#41 — Compaction hooks to preserve context\*\* — Valuable for multi-hour sessions. Set up once if you do long sessions regularly.



\*\*#45 — One Claude writes, another reviews\*\* — Genuinely catches things. The reviewer with fresh context has no implementation bias.



\*\*#46 — Conversational PR reviews\*\* — More effective than one-shot reviews. "What's the riskiest change?" is a great starter prompt.



\*\*#49 — `claude -p` fan-out for batch ops\*\* — Powerful for repetitive migrations across many files. Niche but extremely efficient when you need it.



---



\## 🔵 ALREADY BUILT-IN / LOW VALUE — Skip These



These are either things Claude Code already does, obvious, or minor quality-of-life that don't move the needle:



\*\*#2 — `!` prefix for bash commands\*\* — Nice to know but trivial. You'll discover this in 5 minutes of use.



\*\*#3 — Esc / Esc+Esc to rewind\*\* — Built-in behavior. You'd find this naturally. The rewind menu is useful but not something you need to study.



\*\*#8 — Skills (`.claude/skills/`)\*\* — Just a flavor of CLAUDE.md organization. If you have rules + @imports working, skills are redundant.



\*\*#9 — Remote control from phone\*\* — Cool demo, rarely practical in real workflows.



\*\*#14 — `/btw` for side questions\*\* — Minor convenience. Most people just ask inline.



\*\*#16 — Ctrl+S to stash prompt\*\* — Nice micro-feature, but how often do you actually need this?



\*\*#17 — Ctrl+B to background tasks\*\* — Good to know but you'll discover it naturally when waiting for a long build.



\*\*#18 — Status line\*\* — Cosmetic. Your terminal prompt probably already shows git branch/directory.



\*\*#23 — Voice dictation\*\* — Novelty for most people. If you type fast, this is slower.



\*\*#26 — Vague exploration prompts\*\* — This isn't a "tip" — it's just using Claude normally. Everyone does this.



\*\*#32 — `@imports` in CLAUDE.md\*\* — Covered by #28/#29. It's just the mechanism, not a separate tip.



\*\*#33 — `/permissions` to allowlist commands\*\* — Redundant if you use the `cc` alias (#1).



\*\*#37 — `/config` output style\*\* — Marginal. Default is fine for most people.



\*\*#42 — Manually review auth/payments/data\*\* — This is common sense, not a Claude Code tip.



\*\*#43 — `/branch` to fork conversations\*\* — Esc+Esc rewind (#3) covers most of this need. Rarely do you need both paths alive simultaneously.



\*\*#47 — Name and color-code sessions\*\* — Minor convenience. Only matters if you run 3+ parallel sessions.



\*\*#48 — Play a sound on completion\*\* — Fun, barely functional.



\*\*#50 — Custom spinner verbs\*\* — Pure entertainment. Zero productivity impact.



---



\## TL;DR — The 10 tips that actually matter:



1\. \*\*`cc` alias\*\* (#1) — skip permission prompts

2\. \*\*Feedback loops\*\* (#4) — always include "run tests, fix failures"

3\. \*\*LSP plugins\*\* (#5) — auto-diagnostics per language

4\. \*\*`/clear` often\*\* (#12) — fresh context > stale context

5\. \*\*`--worktree`\*\* (#15) — parallel branches

6\. \*\*Subagents\*\* (#19) — offload investigation

7\. \*\*`@` file refs\*\* (#25) — point, don't search

8\. \*\*Trim CLAUDE.md\*\* (#28-29) — less is more

9\. \*\*Hooks > CLAUDE.md for requirements\*\* (#38-39) — deterministic > advisory

10\. \*\*Let Claude interview you\*\* (#44) — better specs from vague ideas

