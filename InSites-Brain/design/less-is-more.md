# Less-Is-More (LIM) — Design Principle & Reference

## The Principle

**LIM means optimal, not minimal.** The goal is the right weight for the job — not the least text possible, not the most complete structure imaginable.

Every element in the CBSA output must earn its place by doing one of three things:
1. **Generating insight** — the user learns something they didn't know before
2. **Creating orientation** — the user knows where they are, what just happened, and what's next
3. **Enabling dialogue** — the user has enough to form an opinion, challenge, correct, or extend

If an element does any of these — it stays, regardless of length. If it doesn't — it goes, regardless of how "standard" or "complete" it makes the output feel.

### When to cut

- **Ceremony without function**: process headings that repeat what the user already knows, multi-step closing sequences that train users to click "continue" without thinking, formulaic prompts that could be woven into the analysis instead
- **Structural scaffolding visible to the user**: the bot's internal checklist should not become the user's reading list. Templates serve the bot; the user sees flowing analysis.
- **Redundant choice prompts**: if the bot can make a professional judgment (e.g., whether a regional framework is relevant), don't ask the user to choose — just do it

### When NOT to cut

- **Reflection questions that provoke genuine thought** — these are the HITL heartbeat. Never reduce them.
- **Discoverable features** — if a participant would benefit from knowing an option exists (semiotic reading, alternative framings), mention it. Don't hide valuable capabilities behind "on request" when the user doesn't know they can request it.
- **Evidence and citations** — the evidence mandate is non-negotiable. Notation that supports traceability (source citations, certainty markers) stays even if it adds visual weight.
- **Context-effect analysis** — the intellectual core of CBSA. Dense context-effect analysis that generates real insight is not "verbose" — it's the product.

### The test

For any proposed reduction, ask: **"Does removing this make the user's next decision easier, or does it just make the output shorter?"** If the former — cut. If the latter — keep.

---

## Applied Changes

These changes implement the LIM principle for the CBSA bot prompt. Each change explains *why* it qualifies as optimization, not just reduction.

### A. CSR Brief → One Paragraph

**Before** (two labeled sections per stage opening):
```
💡 Why is this stage critical? (1-2 sentences)
⚙️ How is the analysis structured? (1-2 points)
```

**After** (one paragraph):
```
💡 Brief: [what we're doing and why, based on previous findings — 2-3 sentences max]
```

Drop the two-heading structure. One concise paragraph combining purpose + approach.

**Why this is optimal**: The *content* (anchoring each stage in the previous one's findings) is valuable — it creates orientation. The *format* (two labeled headings) is ceremony. The paragraph preserves the insight while removing the scaffolding.

---

### B. Merge Reflection + Before Moving On → Single Prompt

**Before** (three elements at end of every stage):
```
💡 For Reflection — 1-2 questions
✋ Before Moving On — Anything to add, correct, or change?
Continue to Stage N?
```

**After** (one combined prompt):
```
💡 [reflection question(s)] ... Continue to Stage N, or add/correct anything first?
```

Removes one prompt per stage. Over 7 stages = 7 fewer interruptions.

**Why this is optimal**: The reflection question is the HITL heartbeat — it stays and must be sharp. The "Before Moving On" and "Continue?" are ceremony that trains participants to click through. Merging them into one moment keeps the dialogue alive while removing the fatigue.

---

### C. Remove Regional Note Prompt (Stage 3)

**Before** (Stage 3.2, explicit 3-option prompt):
```
"🌐 Regional Note: Would you like to explore how [region] approaches authenticity? (yes / no / tell me more)"
```

**After**: Remove the prompt entirely. If a regional framework is relevant, weave it into the analysis. Don't ask the user to choose.

**Why this is optimal**: The bot can make this professional judgment. A formulaic 3-option prompt ("yes / no / tell me more") is a decision the user shouldn't need to make — the analysis should just reflect the relevant framework when it matters.

---

### D. Simplify Optional Tracks (Stage 5)

**Before** (mandatory to list all 5):
```
5.2 Optional Tracks (mandatory to present all options; execute only if requested)
- Knowledge Graph
- Semiotic Reading
- Educational/Community/Tourism Ideas
- Alternative Narrative Framings
- Social Media Sentiment Analysis
```

**After**:
```
5.2 What's Next?
- **Knowledge Graph** — interactive map of entities and relationships (see [CA-KG])
- **Assessment Dashboard** — visual summary of the full CBSA process (see [CA-DB])
- Also available: semiotic reading, alternative narrative framings, educational/community ideas — ask for any of these.
```

**Why this is optimal, not the original "mention on request" version**: The original LIM draft collapsed this to "offer KG, mention others on request." But the LIM principle says: don't hide discoverable features. A participant who would love a semiotic reading won't know it exists unless they see it. The optimized version keeps a compact list (3 lines vs. 6) while preserving discoverability. Dashboard is now included (it's a standard post-Stage-6 product). The 5-item mandatory enumeration becomes a lightweight mention.

---

### E. Self-Critique → Remove from Triggers

Remove the self-critique row from the triggers table. It's a developer/debug tool, not for workshop participants.

**Why this is optimal**: Self-critique generates no insight for the participant. It's an internal diagnostic. Removing it reduces trigger table noise without hiding anything valuable.

---

## Impact Summary

| Change | What's reduced | What's preserved |
|--------|---------------|-----------------|
| A. CSR Brief | Two-heading ceremony | Stage-to-stage anchoring content |
| B. Merge closing | 3 prompts → 1 per stage (-7 total) | Reflection questions (sharpened) |
| C. Regional Note | Formulaic 3-option prompt | Regional analysis (woven in when relevant) |
| D. Optional Tracks | 6-line enumeration → 3-line compact list | Discoverability of all options |
| E. Self-critique | Developer trigger | Nothing (not user-facing) |

**Net effect**: Fewer interruptions, same insight density, same feature discoverability. The output feels lighter because ceremony is removed — not because content is cut.
