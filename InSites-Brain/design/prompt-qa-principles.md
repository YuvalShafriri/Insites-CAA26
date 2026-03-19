# Prompt QA Optimization — Principles & Method

**Purpose**: Reduce token count and improve clarity in large system prompts (1000+ lines) without losing output quality. Designed for AI bot prompts where every token is loaded per turn.

**Origin**: Developed during InSites-CAA-mono.md optimization (1683 → 1611 lines, ~4.3% reduction). Applicable to any large system prompt.

---

## Core Principle: LIM (Less Is More)

**Optimal, not minimal.** The goal is not the shortest possible prompt — it's the prompt with the highest signal-to-noise ratio. Every line should earn its place by producing a measurable effect on output quality. Remove only what has zero or negative effect.

---

## The 7 Optimization Categories

### 1. Cross-Reference Deduplication

**Pattern**: The same concept is defined in full at multiple locations.

**Method**: Find every instance of a key concept (e.g., search for "context effect", "evidence mandate"). For each instance, determine its **purpose**:
- Primary definition (operational rule)
- Stage-specific application (HOW to apply in this stage)
- Brief reference (1-line reminder)
- Theoretical explanation (for "explain the method" requests)
- Educational context (post-artifact clarification)

**Decision rule**: If two instances serve **different purposes** → keep both. If one is a plain restatement of the other → replace with a cross-reference ("See [section] for definition").

**Critical**: Do NOT blindly deduplicate. A concept appearing 7 times may serve 5 distinct purposes. Analyze each before cutting.

### 2. Standard LLM Behavior Removal

**Pattern**: Instructions that tell the LLM to do what it already does by default.

**Examples**:
- "You may explain your reasoning if asked" (LLMs do this naturally)
- "If the user asks about the method, explain it" (standard behavior)
- "Use your knowledge to answer questions" (default)

**Decision rule**: If removing the instruction would not change the LLM's behavior in testing → remove.

### 3. Platform-Default Rule Removal

**Pattern**: Rules enforcing behavior that the platform already guarantees.

**Examples**:
- "Output tables as Markdown with pipes" (Claude/GPT already do this)
- "Do not wrap tables in code blocks" (standard behavior when not asked)

**Decision rule**: Test without the rule. If output quality is identical → remove. If it was added for a specific edge case (e.g., RTL rendering), archive the rule externally with a note explaining when to re-insert.

### 4. Theory-Section Condensing

**Pattern**: Reference/appendix sections restate content already defined in operational sections.

**Method**: Compare the reference section against the stage specifications. Content that appears in both places:
- Keep in the stage spec (where the LLM uses it operationally)
- Replace in the reference section with a pointer: "See Stage N for [topic] structure and rules"
- Keep ONLY content in the reference section that is **unique** (not present in any stage spec)

**Example**: A Nara Grid reference section restated the table structure already in Stage 3. Kept only the "Two-State Principle" (unique archaeological content) and replaced the rest with a cross-reference.

### 5. Concise-Rewrite

**Pattern**: A principle is correct but verbose — 8 lines where 3 would produce the same effect.

**Method**: Rewrite to preserve the **test** (how the LLM decides what to do) and the **key constraint** (what must not happen). Cut rationale, background, and obvious implications.

**Example**:
- Before (8 lines): Full DQR framework with 5 bullet points + rationale paragraph
- After (3 lines): "Reflection questions must pass this test: would an archaeologist want to argue with it? Each question must be open-ended, anchored in this stage's evidence, and allow two reasonable expert positions."

### 6. Operational Additions

**Pattern**: Missing routing logic or disambiguation that causes the LLM to guess.

**Method**: When the prompt has multiple entry points (different workflows triggered by different inputs), add a tiebreaker rule so the LLM routes correctly.

**Example**: Added "Upload routing: If uploaded text contains CBSA stage outputs → suggest MA-RA. If multiple sites/records → suggest MA-RC. Otherwise → Stage 0."

### 7. Safe Archival

**Pattern**: Content that should be removed from the prompt but might be needed later.

**Method**: Move to an external persistence layer (Claude Code memory, a design doc, a comment file) with:
- The full original content
- Why it was removed
- When to re-insert it
- How to find it

**Never delete without archival** if the content was added to solve a specific problem.

---

## Audit Process

### Step 1: Inventory Key Concepts

List every concept that appears more than once. For each, log:
- Every location (line number + section)
- Purpose at that location
- Verdict: keep / condense / remove

### Step 2: Identify Removal Candidates

Scan for:
- Sections describing standard LLM behavior
- Rules enforcing platform defaults
- Reference sections that restate operational sections
- Verbose principles that can be compressed

### Step 3: Plan Edits (Before Touching Anything)

Write a numbered edit list with:
- Exact location (line numbers or unique string match)
- What changes
- Lines saved
- Risk assessment (could this change output quality?)

### Step 4: Apply in Order

Work through edits sequentially. After each edit, verify the surrounding context still reads coherently.

### Step 5: Verify

- Line count matches expectation
- Read the full stage flow — does it still make sense without the removed restatements?
- Search for key concepts — are they still defined somewhere?
- No orphaned cross-references

---

## Decision Framework: Keep vs. Cut

| Signal | Action |
|--------|--------|
| Same concept, same purpose, different location | Cut the secondary instance, add cross-reference |
| Same concept, different purpose (operational vs. educational) | Keep both |
| Rule that describes default LLM behavior | Remove |
| Rule added for a specific edge case | Archive externally, remove from prompt |
| Verbose principle with a clear core test | Rewrite concisely |
| Missing routing/disambiguation | Add (yes, optimization can mean adding lines) |
| Content you're unsure about | Keep — the cost of a false removal is higher than the cost of 3 extra lines |

---

## Anti-Patterns

1. **Blind deduplication**: Removing every repeated phrase without checking if each serves a different purpose. This is the #1 mistake.

2. **Externalization fallacy**: Moving content to a "knowledge file" or "reference doc" thinking it saves tokens. On platforms where all files are loaded every turn (e.g., Claude.ai Projects knowledge files), this saves nothing — only deduplication and on-demand loading (Skills) reduce per-turn cost.

3. **Over-cutting**: Removing "obvious" rules that turn out to be guardrails against specific failure modes you haven't seen yet. When in doubt, keep.

4. **Ignoring the domain**: A heritage assessment prompt has different redundancy tolerance than a coding assistant prompt. Domain experts reading the output need certain phrases repeated for professional credibility. Don't cut domain-specific repetition that serves the end user.

5. **Optimizing without committing first**: Always save the pre-optimization state. You need a rollback point.
