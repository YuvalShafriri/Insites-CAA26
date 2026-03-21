# Patch Plan: Documentation Tier — InSites-CAA-mono-v2.0.md

## Overview
Four insertions to add documentation tier tracking across Stages 0, 3, 5, and 6.
No deletions. No restructuring beyond renumbering Stage 0 items.

---

## Instructions for Claude Code

**Target file**: `InSites-CAA-mono-v2.0.md`  
**Method**: `str_replace` for each patch — locate the anchor string, insert after it.  
**Order**: Apply patches 1 → 2 → 3 → 4 sequentially.

---

## Patch 1 — Stage 0: Documentation Profile block

**Anchor** (find this exact string):
```
3. **Gaps List**
```

**Action**: Before this line, insert the new block AND change all subsequent
item numbers: 3→4, 4→5, 5→6, 6→7 throughout Stage 0.

**Insert before anchor**:
```markdown
3. **Documentation Profile**

| Source | Tier | Type | Limitations |
| --- | --- | --- | --- |

**Tiers**: 1 = primary field records · 2 = research synthesis ·
3 = heritage/management doc · 4 = survey/inventory · 5 = secondary

**Site record**: One sentence — do Tier 1–2 archives likely exist beyond
what was uploaded? Accessible? Mark unknown as 💭.
Feeds into Stage 3 (documentary integrity) and Stage 6 (reliability).

```

**Then renumber** in Stage 0 only:
- `3. **Gaps List**` → `4. **Gaps List**`
- `4. **Suggestions` → `5. **Suggestions`
- `5. **Timeline Rule` → `6. **Timeline Rule`
- `6. **Certainty Notations` → `7. **Certainty Notations`

---

## Patch 2 — Stage 3: Documentary integrity row

**Anchor** (find this exact string):
```
### 3.2 Integrity Condition Description
```

**Action**: Insert block immediately before this line.

**Insert**:
```markdown
**Documentary Integrity (mandatory row)**: Always include an Aspect row
for Documentary/Archival. Rate the site's documentation record — not the
uploaded source tier. A site with rich Tier 1 archives rates high even if
this assessment received only a Tier 3 document.

```

---

## Patch 3 — Stage 5: Conditional sentence

**Anchor** (find this exact string):
```
Show how these elements **converge** into a unified interpretation.
```

**Action**: Insert one sentence immediately after this line.

**Insert**:
```markdown
If Stage 3 rated documentary integrity as consequential, address it in the
significance statement — either as value (the record itself is heritage) or
as loss (uncompensated by documentation). Omit if unremarkable.
```

---

## Patch 4 — Stage 6: Reliability constraint

**Anchor** (find this exact string):
```
2. **Quick Boosts Table**
```

**Action**: Insert block before this line AND renumber: 2→3, 3→4, 4→5
throughout section 6.1.

**Insert before anchor**:
```markdown
2. **Reliability Constraint (conditional)** — If Stage 0 source tier was
Tier 3–5 and Tier 1–2 archives likely exist but were unavailable, note:
"Assessment built on [tier]; revisit when primary records are accessible."
Omit if source tier adequately supports the assessment.

```

**Then renumber** in section 6.1 only:
- `2. **Quick Boosts Table**` → `3. **Quick Boosts Table**`
- `3. **Next Steps**` → `4. **Next Steps**`
- `4. **Context-Effect` → `5. **Context-Effect`
- `5. **Note for Professional` → `6. **Note for Professional`

---

## Validation

After applying all patches, verify:
- [ ] Stage 0 has 7 numbered items (was 6)
- [ ] Stage 0 item 3 is Documentation Profile
- [ ] Stage 3 has Documentary Integrity rule before 3.2
- [ ] Stage 5.1 opening paragraph ends with the conditional sentence
- [ ] Stage 6.1 has 6 numbered items (was 5), item 2 is Reliability Constraint
