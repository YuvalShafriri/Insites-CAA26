Ready for review
Select text to add comments on the plan
Plan: ARM/Archaeology Enhancements to InSites-CAA-mono.md
Context
The CAA 2026 workshop targets archaeologists and ARM (Archaeological Resource Management) professionals. The current InSites-CAA-mono.md is written for generic built cultural heritage. We need to enhance it so the CBSA methodology speaks the language of archaeology without losing its universal applicability.

Four enhancement areas, all modifying InSites-Brain/Claude/InSites-CAA-mono.md:

Stage 0 checklist — ARM-aware data categories
Values taxonomy [CA-V] — Scientific value expansion + Documentary/Archival value
Evidence Type classification [CA-EV] — new appendix: nature of evidence (stratigraphic, typological, etc.), complementing existing certainty notation (°/💭)
Archaeological Integrity [SM-3] + Change Types [CA-T] — two-state integrity (at-exposure vs post-excavation) and Methodological Changes as a change type
Change 1: Stage 0 Checklist (~line 268-276)
Current 6-row table:

| Location and setting | | |
| Original function and dates | | |
| Development / phases | | |
| Contexts (social, historical, etc.) | | |
| Physical description (form / materials / technology / condition) | | |
| Finds / artefacts | | |
Replace with 7-row table:

| Location and setting | | GIS coordinates, landscape position (tell, cave, terrace, etc.) |
| Original function and dates | | Dating method when identifiable (typological, C14, documentary, etc.) |
| Stratigraphy / development phases | | Phases mapped to strata when available; excavation methodology |
| Contexts (social, historical, etc.) | | |
| Physical description (form / materials / technology / condition) | | Note: excavation methodology, % excavated if available |
| Finds and diagnostic material culture | | Diagnostic finds carrying dating/interpretation weight |
| Research history | | Previous excavations, surveys, publications, archive location |
Also add after the Checklist section (~line 280, before Gaps List):

Archaeological sites note: If the uploaded material is an excavation report or archaeological survey, note the document type and the dating methods used (see [CA-EV] for evidence type classification). This helps calibrate certainty throughout subsequent stages.

Change 2: Values Taxonomy [CA-V] (~line 667-684)
Expand Scientific Value from one line to:

- **Scientific Value**: Potential for research, archaeological or archival study.
  - *Research potential*: unexcavated deposits, intact stratigraphy, sealed contexts
  - *Typological value*: representative or diagnostic of a type, period, or regional tradition
  - *Methodological value*: site demonstrates or advanced a research technique or conservation method
Add new value after Scientific Value:

- **Documentary / Archival Value**: Quality of recording, publication history, accessibility of research archive. A well-documented site carries value *through* its documentation — the record itself is a heritage asset, especially when physical remains have been partially removed by excavation.
Enhance existing values with ARM sub-notes (add indented notes, not change definitions):

Technological Value — add:
  - *In archaeology*: construction techniques, material sourcing (quarry origin, trade routes), craft specialization evidence

Landscape Value — add:
  - *In archaeology*: settlement patterns, inter-site relationships, viewshed, route networks
Change 3: Context Types [CA-C] (~line 687-701)
Add one new context type:

- **Archaeological Context** — Excavation history, research campaigns, methodological approaches, site formation processes. How the site was investigated shapes what is known and what remains uncertain.
Change 4: New Appendix [CA-EV] Evidence Types
Insert after [CA-CS] (~line 793) and before [CA-IMG].

This is about the nature of the evidence (how we know), not the certainty level (how sure we are). Complements the existing notation (°/💭).

## [CA-EV] Evidence Types: Archaeological Epistemology

In archaeological and heritage assessment, the **type of evidence** supporting a claim affects how it should be weighted and interpreted. This classification complements the certainty notation (° / 💭) — a claim can be explicit in source but based on weak evidence type, or inferred but from strong evidence.

### Evidence Type Classification

| Code | Evidence Type | Description | Typical Strength |
|------|--------------|-------------|------------------|
| **str** | Stratigraphic | In-situ archaeological layers, sealed contexts, locus relationships | High |
| **mat** | Material-diagnostic | Pottery, coins, inscriptions — typologically dated | High (when in context) |
| **sci** | Scientific dating | C14, TL, OSL, dendrochronology, archaeomagnetism | High |
| **arc** | Architectural-structural | Building phases readable from standing fabric | Medium-High |
| **doc** | Documentary | Historical texts, maps, archives, traveler accounts | Medium (source-dependent) |
| **srv** | Survey / remote sensing | Surface finds, geophysical survey, aerial photography | Medium-Low |
| **ana** | Analogical | Parallels from other sites, regional typological patterns | Low-Medium |
| **eth** | Oral / ethnographic | Local traditions, community memory, living practice | Variable |

### Usage in CBSA Stages

**Stage 0**: Note which evidence types are present in the uploaded material. This sets expectations for the entire assessment.

**Stage 1 (Timeline)**: When recording dated events, note the evidence type when it strengthens or qualifies the dating:
> "4th century CE synagogue [str+mat: sealed coin hoard, A:23]"
> "Possibly Hellenistic origin [ana°: regional parallels, B:7]"

**Stage 2 (Values)**: Evidence type affects how confidently a value can be asserted. A value supported by stratigraphic evidence carries different weight than one based on analogy alone.

**Stage 3 (Integrity)**: Evidence type is critical for assessing what is known about condition — direct observation vs. inference from records.

### Integration with Existing Notation

Evidence types **combine** with certainty notation — they don't replace it:
- `[str: A:23]` — stratigraphic evidence, explicit in source
- `[ana°: B:7]` — analogical evidence, inferred
- `[doc 💭: C:12]` — documentary evidence, uncertain interpretation

**Rule**: Evidence type tagging is **optional but encouraged** for archaeological sites. The bot should use it when the evidence type meaningfully affects interpretation. Do not force-tag every claim — use it where it matters.
Change 5: Change Types [CA-T] (~line 704-737)
Add new change type after "Interpretation Changes":

**Methodological Changes** (archaeological excavation, professional intervention)
 - Primarily affects: scientific, historical, documentary values
 - Implication: Material is intentionally removed through professional practice — the excavation record compensates for physical loss when documentation is thorough
 - Example: "Upper Byzantine stratum excavated and removed to expose earlier Roman phase" → material integrity reduced, but if well-documented, documentary/archival value preserved
 - **Key distinction**: Methodological removal is professional practice, not damage. Distinguish from uncontrolled loss (erosion, looting, construction).
Change 6: Integrity Theory [SM-3] (~line 741-768)
Add after the "Critical CBSA Principle" paragraph (~line 764):

### Archaeological Integrity: Two-State Principle

For archaeological sites, integrity must be assessed across **two temporal states**:

1. **Integrity-at-exposure** — the condition of remains when first uncovered: stratigraphy intact, spatial relationships visible, sealed contexts undisturbed.
2. **Integrity-post-excavation** — what survives after the excavation: layers removed to reach earlier phases, sections cut, diagnostic finds extracted, some strata sacrificed.

**Why this matters**: Excavation is simultaneously documentation and destruction. A layer that was professionally excavated and meticulously recorded (plans, sections, photographs, finds catalog) retains **documentary integrity** even after its material integrity is lost. This connects directly to Documentary/Archival Value [CA-V].

**Application in the Nara Grid**: For archaeological sites, the "Attribute Description" column should note both states where relevant:
- "(at-exposure) Intact mosaic floor with geometric pattern, sealed by collapse layer"
- "(post-excavation) Mosaic conserved in situ; collapse layer removed and documented"

**Assessment question**: When the excavation removed material, was the documentation thorough enough that the knowledge survives the loss of fabric? Rate documentation quality alongside material condition.
Change 7: Stage 3 Template (~line 504-506)
Add ARM-specific instruction after "Integrity Condition Description" section:

**Archaeological sites**: If the site has been excavated, assess documentation quality of removed layers. Ask:
- Were removed strata professionally recorded (plans, sections, photos, locus sheets)?
- Does the excavation archive exist and is it accessible?
- Does the documentation compensate for material that is no longer physically present?

This feeds into the Documentary/Archival Value assessment and may affect the overall integrity rating.
Change 8: Appendix Reference Table (~line 1514-1531)
Add row for new appendix:

| [CA-EV] | Evidence types & archaeological epistemology | Stages 0-3 (evidence type tagging) |
Example Outputs — What the User Sees
These examples use a hypothetical archaeological site: Horvat Gamla — a fortified Jewish settlement from the Hellenistic-Early Roman period, excavated in multiple campaigns.

Stage 0 — Enhanced Checklist (user sees this table)
## 0.0 Preliminary Review: Horvat Gamla

**Summary (120 words)**
The uploaded material is a final excavation report (2018) covering three seasons
at Horvat Gamla, a fortified settlement on the eastern Golan Heights. The site
spans the Hellenistic through Early Roman periods (2nd c. BCE – 1st c. CE),
with primary focus on a public building identified as a synagogue and adjacent
domestic quarter. The report includes stratigraphic analysis, pottery and coin
catalogs, architectural plans, and a reconstruction proposal.

| Category | Status | Notes |
| --- | --- | --- |
| Location and setting | ✔ | 32.896°N 35.742°E; basalt ridge above Daliyyot stream; landscape position: spur |
| Original function and dates | ✔ | Settlement; 2nd c. BCE – 67 CE. Dating: typological (pottery) + numismatic + documentary (Josephus) |
| Stratigraphy / development phases | ✔ | 3 main strata (III–I), mapped to architectural phases. Open-area excavation, ~15% of tell |
| Contexts (social, historical, etc.) | ◐ | Historical context strong (Hasmonean expansion, Great Revolt). Social context thin |
| Physical description | ✔ | Basalt ashlar construction, mikveh, oil press installations. Condition: partially restored |
| Finds and diagnostic material culture | ✔ | Hasmonean coins (diagnostic), Kefar Hananya pottery, stone vessels, ballista stones |
| Research history | ✔ | Gutman 1976-82; Syon & Yavor 2001-2018. Archive: IAA + University of Haifa |

**Evidence types present** [CA-EV]: str (stratified deposits), mat (coins, pottery),
doc (Josephus BJ 4.1), arc (standing walls), srv (surface survey 1968).

**Gaps:**
- Community/social context: no ethnographic or community engagement data
- Comparative analysis: report mentions parallels (Masada, Jodafat) but no structured comparison
- Environmental/ecological context not addressed
- Only 15% excavated — significant unexcavated deposits remain (research potential)

**Suggestions for Data Completion:**
1. Add structured comparison with contemporary fortified settlements (Jodafat, Masada, Yodfat)
2. Landscape/viewshed analysis would strengthen geographic context
3. Consider community perspectives on the site's contemporary significance
✋ Before Moving On Anything to add, correct, or change?

Continue to Stage 1?
───── 0️⃣ Preliminary Review

LIM note: The checklist is compact — 7 rows. The ARM enhancements (GIS, dating method, strata, evidence types, research history) appear naturally in the Notes column and in the evidence types line. For a non-archaeological building, those cells would simply contain different content or "—". No extra sections, no bloat.

HITL note: The pause works exactly as before. The evidence type summary gives the user a clear picture of what kinds of knowledge this assessment will build on — they can flag if something is missing before Stage 1 starts.

Stage 1 — Timeline with Evidence Types (user sees this in the timeline table)
🕰 1.2 Timeline: Gamla from Settlement to Destruction

| Date / Period / Layer | Change in Use | Change in Structure | Notes |
| --- | --- | --- | --- |
| 2nd c. BCE (Stratum III) | Founded as Hasmonean settlement | Fortification wall, residential quarter | [mat+str: Hasmonean coins in foundation fill, A:45] |
| 1st c. BCE (Stratum II) | Public assembly function added | Synagogue building constructed | [arc+mat: architectural parallels + coin sequence, A:67] |
| 63 BCE | Roman conquest of region | — | [doc: Josephus Ant. 14.4, A:12] |
| 67 CE (Stratum I) | Last stand / siege | Breach in eastern wall, destruction layer | [doc+str: Josephus BJ 4.1 + destruction debris with ballista stones, A:89] |
| 1968 | — | Site identified by surface survey | [srv: Gutman surface collection, A:3] |
| 1976–1982 | Research (first excavation) | Synagogue and wall exposed | [methodological: open-area excavation, A:5] |
| 2001–2018 | Research (renewed excavation) | Domestic quarter, oil press | [methodological: IAA/UHaifa campaigns, A:8] |
LIM note: Evidence type codes appear only when they add interpretive value — the siege date is supported by both documentary and stratigraphic evidence (strong convergence). The Hasmonean founding relies on material-diagnostic evidence from sealed contexts. The user immediately sees how we know alongside what we know. Excavation campaigns appear as "methodological" change type — not damage.

HITL note: At the pause, the user (an archaeologist) can immediately spot if a dating is over-claimed or if an evidence type is wrongly attributed. They know this language.

Stage 2 — Values with Documentary/Archival Value (excerpt)
2.0 Values: Fortification, Resistance, and Research Legacy

**Scientific — "Stratigraphic Laboratory"**
Evidence: Three cleanly stratified occupation phases with sealed destruction layer
  providing terminus ante quem for the entire sequence. [str+mat: A:45-67]
Broader Significance: One of few Galilean/Golan sites with secure stratification
  from Hasmonean through Early Roman — a reference sequence for regional pottery chronology.

**Documentary / Archival — "Four Decades of Record"**
Evidence: Continuous excavation record 1976–2018 across two major campaigns;
  published final reports, digital archive at IAA. [A:3-8]
Broader Significance: The excavation archive itself is a heritage asset —
  upper strata removed during early campaigns survive only through Gutman's field records.
  The quality of documentation compensates for material no longer physically present.

[... other values: Historical, Social, Technological, Landscape ...]
LIM note: Documentary/Archival Value appears only when the evidence warrants it — a well-documented multi-campaign site. For a site with no excavation history, this value simply wouldn't be identified. No forced categories.

Stage 3 — Nara Grid with Two-State Integrity (excerpt)
3.1 Nara Grid: Gamla

| Aspect | Attribute Description | Value Expression | Integrity |
| --- | --- | --- | --- |
| Form and Design | (at-exposure) Synagogue plan fully legible: basilica form, columns, stepped benches. (post-excavation) Partially restored; original plan readable but some walls consolidated with modern mortar. | Historical, Aesthetic | Medium-High |
| Material and Fabric | (at-exposure) Basalt ashlar in primary courses, field stones in secondary walls. (post-excavation) Upper courses of domestic quarter removed during 1976-82 excavation to reach earlier phases [methodological]. Gutman's records document removed material. | Historical, Scientific, Documentary | Medium — material reduced by excavation; documented |
| Use and Function | Assembly/synagogue use ceased 67 CE (destruction). No subsequent use. Current: archaeological park + tourism. | Social, Spiritual | Low (original use) / Medium (adapted use) |
| Location and Setting | Spur position above gorge intact. Landscape setting largely unchanged. Modern access road and visitor facilities added. | Landscape, Symbolic | High |

3.2 Integrity Condition: Between Excavation and Preservation

The integrity picture at Gamla is shaped by the excavation paradox: some material
was professionally removed to reveal earlier phases. The 1976-82 campaign removed
upper strata of the domestic quarter — these survive only in Gutman's field records
and photographs. The renewed campaigns (2001-18) adopted more conservative methods,
preserving sections for future investigation.

**Documentation quality of removed layers:**
- Gutman campaigns: adequate recording for the period, but pre-digital — plans hand-drawn, limited photography [doc: A:5-6]
- Syon/Yavor campaigns: full digital recording, locus sheets, photogrammetry [doc: A:8-10]

The documentary integrity partially compensates for material loss, though the
earlier campaign's less thorough documentation means some knowledge was irreversibly lost.
💡 For Reflection The 1976 excavation used methods standard for its time but removed material that today's techniques could have extracted more data from. How should we weigh "best practice of its era" against permanent information loss? Does the site's ongoing research value depend more on what remains unexcavated (~85%) or on what has been documented so far?

✋ Before Moving On

Is the integrity assessment accurate?
Is there conservation information to add before Stage 4?
Continue to Stage 4?
───── 3️⃣ Authenticity and Integrity

LIM note: The two-state notation (at-exposure) / (post-excavation) appears in the Attribute Description column — inside the existing Nara Grid structure. No extra table, no parallel grid. The [methodological] tag distinguishes professional removal from damage. Documentation quality assessment is 4 lines — not a separate section, just integrated into the integrity condition narrative.

HITL note: The reflection question is sharp for an archaeologist — it touches on methodological ethics and the value of unexcavated deposits. The pause lets them add conservation information they know from fieldwork that may not be in the report.

Non-Archaeological Site — Graceful Degradation
For a 19th-century market hall (non-archaeological), the same enhanced prompt produces:

| Location and setting | ✔ | Central square, pedestrian zone |
| Original function and dates | ✔ | Market hall, 1878 |
| Stratigraphy / development phases | — | No archaeological phases; 3 renovation campaigns documented |
| Contexts | ✔ | Strong commercial, social, urban context |
| Physical description | ✔ | Cast-iron structure, glass roof |
| Finds and diagnostic material culture | — | Not applicable |
| Research history | ◐ | Listed building file exists; no archaeological investigation |
The ARM-specific rows gracefully show "—" or "Not applicable". No archaeological jargon leaks into a non-archaeological assessment. The evidence type line is simply omitted (the instruction says "optional but encouraged for archaeological sites").

Files Modified
File	Changes
InSites-Brain/Claude/InSites-CAA-mono.md	All 8 changes above
Verification
Read modified file end-to-end — check all [CA-*] cross-references resolve
Verify Stage 0 checklist still works for non-archaeological sites (generic heritage) — ARM notes should be additive, not restrictive
Verify [CA-EV] codes don't conflict with existing notation (°/💭)
Verify [CA-T] new change type integrates with Nara Grid application section
Verify [SM-3] two-state principle is referenced in Stage 3 template
Check appendix reference table is complete
Mental test: run through a hypothetical archaeological site assessment — does the enhanced prompt guide the bot to ask about evidence types, excavation history, documentation quality?
Mental test: run through a non-archaeological heritage building — do the ARM additions get gracefully skipped or remain useful?