# EAC11 Read-Collection Demo Dataset

## Purpose

This dataset extracts 17 case studies from **EAC Guidelines 11: Articulating the Significance of Archaeological Sites** (2026) for use as:

1. **MA-RC workflow testing** — validate that the Read-Collection workflow in Bot-Brain handles a real, diverse collection
2. **Workshop demo material** — demonstrate collection-level analysis during the CAA 2026 Read session (30 min)
3. **Preparation for participants** — show what collection analysis looks like before they try it with their own outputs

## Source

**EAC Guidelines 11** (February 2026), published by the European Archaeological Council.  
DOI: `doi.org/10.5281/zenodo.14975018`

Yael Alef is a contributing author (Section 3.1 philosophical introduction, Section 3.2 commentary, Section 7.12 Tuba-Zangariyye case study). This gives the demo authentic provenance for the CAA audience.

## Files

| File | Format | Purpose |
|------|--------|---------|
| `EAC11_Collection_FreeText.md` | Markdown | Upload to bot for Read-Collection analysis. Each site as assessment summary. |
| `EAC11_Collection_Structured.json` | JSON | Structured data for artifact-based analysis (KG, dashboards, comparisons). |
| `EAC11_Collection_Structured.csv` | CSV | Quick reference and filtering. Boolean flags for value types. |

## Collection Profile

- **17 sites** across **10 countries** (Austria, Estonia, Finland, Hungary, Iceland, Ireland, Israel, Netherlands, Poland, Scotland)
- **Period range:** Neolithic → Modern
- **Site types:** Landscapes, castles, shipwreck, tumuli, dolmens, urban areas, hillforts, churches, geothermal sites
- **Assessment methods represented:** Austrian criteria, Finnish scoring, Dutch rating system, Irish national monuments, Israeli CBSA, Polish protection, Scottish Statements of Significance, Icelandic scoring, Estonian/Hungarian criteria
- **Average:** 4.1 values per site, 3.5 threats per site

## Value Distribution

| Value Type | Present in |
|------------|-----------|
| Historical | 16/17 (94%) |
| Scientific/Research | 15/17 (88%) |
| Landscape | 12/17 (71%) |
| Intangible/Symbolic | 7/17 (41%) |
| Social/Community | 2/17 (12%) |

## Workshop Usage Scenarios

### Scenario A: Demo during Theory & Demo session (40 min)
Upload the free-text MD to a bot with Read-Collection trigger. Show:
1. Snapshot table generation
2. Pattern identification ("What values recur?")
3. Gap analysis ("Which sites lack social value documentation?")
4. Cross-cutting question ("How do assessment methods differ by country?")

### Scenario B: Read session with participants (30 min)
After participants complete their own Write sessions:
1. Collect participant outputs (copy-paste or export)
2. Combine into a single collection document
3. Run Read-Collection: "What emerges from the group?"
4. Compare to EAC11 patterns as reference

### Scenario C: MA-RC Workflow validation
Test the Bot-Brain MA-RC flow against this dataset:
- Does the Snapshot Table work with 17 entries?
- Do stop prompts fire correctly?
- Can it handle "analyze by country" / "compare assessment methods" / "find common threats"?
- Does Discovery-Based Analysis produce meaningful cross-cutting insights?

## Key Observations for Demo Narrative

1. **Assessment method diversity** — 9+ different national approaches to the same fundamental question: "Why is this significant?"
2. **The social value gap** — Only 2/17 sites explicitly identify social/community values, despite Faro Convention emphasis
3. **Landscape dominance** — 12/17 sites identify landscape value, reflecting European archaeological trend toward landscape-scale thinking
4. **CBSA in context** — Case 7.12 (Tuba-Zangariyye) uses CBSA explicitly. Workshop can ask: "What would CBSA add to the other 16?"
5. **Collection as argument** — The collection itself demonstrates that significance assessment is not a technical procedure but a context-dependent reflective process (echoing Section 3.1)

## Connection to InSites Research

This dataset serves the "Assessment is the Dataset" principle: the structured extraction creates research data that persists beyond the demo. Future uses:
- Training data for CBSA bot refinement
- Benchmark for testing Read-Collection on diverse inputs
- Case material for comparative methodology papers
