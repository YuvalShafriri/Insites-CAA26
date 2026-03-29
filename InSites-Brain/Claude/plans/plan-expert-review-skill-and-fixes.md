# Plan: Expert Review Skill Update + Cross-Platform Fixes

**Date:** 2026-03-28 (updated 2026-03-29)
**Branch:** `dev/InSites-CAA/v5.4`
**Status:** Item 13 DONE — Items 14a–14f pending

## Context

Expert team review (Heritage Specialist, UX & Visual Communication, AI Systems Architect) reviewed `InSites-CAA-mono-GEM v5.3.md` and surfaced both Gemini-specific issues and project-wide improvements. This plan covers:

1. **Item 13** — ✅ DONE — Rewrote `/expert-review` skill with 4 InSites team experts, 4 target types, all-parallel launch
2. **Items 14a–14f** — Pending — Cross-platform fixes surfaced by the expert panel

The Claude mono v5.3 optimization edits (items 1–12) are in a separate plan: `plan-enhance-bot-v3.md`.

---

## 13. ✅ DONE — Expert Review Skill Rewrite

Applied to `.claude/skills/expert-review/SKILL.md`:
- 4 experts (Heritage Assessment Specialist, Learning Designer, UX & Visual Communication, AI Systems Architect)
- 4 target types (bot prompts, workshop site, workshop program, GitHub repo)
- All 4 agents launch in parallel (not 3-of-4 selection)
- Cross-platform drift detection built into bot prompt reviews
- Project file paths per target type
- GitHub repo target for workshop effectiveness + post-workshop value

---

## 14. Pending — Cross-Platform Fixes

**14a. API key injection in Gemini Canvas (Gemini-only)**
- `const apiKey = ""` pattern won't work in Gemini Canvas
- Fix: postMessage proxy or disable AI Query with chat fallback

**14b. Upload routing consolidation (all platforms)**
- Duplicate routing at lines 55 and 147
- Fix: Single decision tree, delete duplicate

**14c. Trigger disambiguation (all platforms)**
- "review assessment" fires MA-RA during Stage 3 discussion
- Fix: Trigger only on upload context, not mid-CBSA

**14d. Stage-jump / rollback (all platforms)**
- No "go back to Stage 1" mechanism
- Fix: Add to Governance section

**14e. Dashboard tab consolidation + map (all platforms) — MAJOR**
- 11 tabs → ~8-9: Contexts+Values merge, Process→Overview, Vulnerability→Integrity
- Map MANDATORY for single assessments (site location + mentioned locations from Stages 1/4/5)
- First-time orientation before generation

**14f. Vulnerability matrix legend (all platforms)**
- Move callout ABOVE matrix, add inline legend
