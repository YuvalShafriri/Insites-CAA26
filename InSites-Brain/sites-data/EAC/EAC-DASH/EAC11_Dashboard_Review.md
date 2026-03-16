# Dashboard UX & Visualization Review
## EAC11 Read-Collection Heritage Analysis Dashboard

**Reviewed:** March 11, 2026  
**Files:** `index.html` (736 lines, React/Recharts/Babel), `eac11-dashboard-data.json` (594 lines)  
**Context:** Workshop tool for CAA 2026 — computational archaeology audience (~20 participants)

---

## Quick Summary

The dashboard presents a 15-site, 10-country cross-collection analysis of heritage significance assessments from EAC Guidelines 11. The warm stone/amber palette with serif typography establishes a scholarly tone appropriate for the domain. The 7-tab structure covers a genuine analytical arc — spatial, values, arguments, gaps, cross-analysis, clusters, overview — and two tabs (Value Mapping matrix and Clusters) are genuinely strong. The single biggest opportunity: **site names appear across 6 tabs as dead text, never linked to each other or to the map** — turning these into live cross-references would transform disconnected views into a coherent analytical experience.

---

## Findings

### High Impact

#### Site names are disconnected across all views
**What's happening:** Site names appear in the Map detail panel, Values matrix, Gaps matrix, Arguments table, Clusters cards, and Overview charts — but clicking a name in any non-Map tab does nothing. The only way to see a site on the map is to find and click its marker directly.  
**Why it matters:** The archaeological audience thinks spatially. When reading that Tuba-Zangariyye is the only CBSA site in the Arguments table, the immediate question is "where is it?" — and there's no path from that insight to the map. Each tab is analytically isolated, forcing users to hold context in their heads across tab switches.  
**Recommendation:** Lift `selected` state to the Dashboard level. Make every site name clickable: clicking navigates to the Map tab with that site selected and detail panel open. Add a secondary interaction (e.g., hover highlight) within non-map tabs to show which rows share a property.  
**Implementation hint:** `useState` at `Dashboard` level, pass `setSelected` + `setTab` as props. Wrap site names in a `<SiteLink>` component that handles both actions.

#### Cross-Tabs silently drops data dimensions
**What's happening:** The Type×Values chart uses `VALUE_TYPES.slice(0, 5)`, excluding Architectural, Nature, and Educational values. Threats×Type uses `Object.entries(THREAT_LABELS).slice(0, 5)`, dropping Neglect and Unauthorized Access. No indication to the user that dimensions are missing.  
**Why it matters:** In an analytical dashboard whose purpose is to surface what's underrepresented, silently omitting categories is the worst possible data integrity failure. A user examining which values are least documented will never see that Architectural and Nature are excluded from the cross-tabulation — and may draw incorrect conclusions about the collection.  
**Recommendation:** Remove both `.slice()` calls. Show all 8 value types and all 7 threat types. If the chart gets crowded, use small multiples or a matrix heatmap instead of stacked bars.  
**Implementation hint:** Delete `slice(0, 5)` on lines 516 and 530. If bar stacking becomes unreadable with 8 categories, switch to `<BarChart layout="vertical">` with grouped bars, or a cell-based heatmap using styled `<div>` elements.

#### Overview tab is last — user has no orientation
**What's happening:** The tab order is Map → Values → Arguments → Gaps → Cross-Tabs → Clusters → Overview. Overview contains the 4 summary cards (15 sites, 10 countries, 7+ methods, 4,500 year span) and distribution charts that orient the user to the collection.  
**Why it matters:** A participant opening the dashboard for the first time sees a schematic map with colored dots and no context about what they're looking at — how many sites, from which countries, spanning what time range. The Overview tab answers these questions but is the *last* thing they'd find.  
**Recommendation:** Either move Overview to position 1 (before Map), or merge its summary cards into the Map tab as a compact header row. The analytical flow should be: orient → explore spatially → analyze systematically.  
**Implementation hint:** Reorder the `TABS` array. If merging, extract the 4 stat cards into a `<SummaryBar>` component and render it above the Map SVG.

#### JSON data file is unused — richer fields invisible
**What's happening:** The dashboard hardcodes all 15 sites in a `SITES` array inside the HTML. The companion `eac11-dashboard-data.json` contains richer fields: `fullName`, `integrityNote`, `protectionNote`, `argumentStructure`, plus the `collection` metadata (including excluded sites 7.4 and 7.14). None of this is loaded or displayed.  
**Why it matters:** The JSON's `integrityNote` field explains *why* a site has high integrity (e.g., "Soviet abandonment + unsuitable for agriculture" for Kurese), which is analytically more valuable than the single-word "high" currently shown in the Map detail panel. The `fullName` fields provide proper names (e.g., "Archaeological Cultural Landscape of Carnuntum" vs. "Carnuntum"). The excluded-sites note explains gaps in the numbering (7.4, 7.14) that an observant participant would notice.  
**Recommendation:** Load the JSON as the single source of truth via `fetch()`. Use richer fields in the detail panel and add a small "About this collection" note mentioning the excluded sites and their reason for exclusion.  
**Implementation hint:** `fetch('eac11-dashboard-data.json').then(...)` in a `useEffect`, with a loading state. Map JSON field names to the current internal structure, or refactor components to use the JSON schema directly.

---

### Medium Impact

#### Map markers encode values but are too small to read
**What's happening:** Each map marker is a pie-chart glyph (radius 10px) divided into colored wedges by explicit value type. Sites with 5–7 explicit values produce micro-segments that blur into a generic multicolor circle.  
**Why it matters:** The encoding concept is right — showing value diversity per site at a glance — but at this scale, the information is perceptual noise rather than signal. The value-filter buttons above the map dim irrelevant sites, but don't highlight *which* segment corresponds to the selected value.  
**Recommendation:** Two options: (a) increase marker size to 16–18px base radius with clearer segment separation, or (b) replace pie glyphs with a simpler primary-value color + ring showing value count (e.g., a dot colored by dominant value, with a number badge). Keep the pie encoding for the selected/expanded state. Either way, connect the value-filter buttons to the legend by highlighting the matching segment color in the button bar.  
**Implementation hint:** Option (b): use the most-frequent value's color as the fill, add a `<text>` showing explicit-value count. On selection, expand to current pie view.

#### Absent values colored red implies deficiency
**What's happening:** The Values matrix uses green ● for explicit, yellow ◐ for implied, red ○ for absent — a traffic-light metaphor suggesting present=good, absent=bad.  
**Why it matters:** A shipwreck (Vrouw Maria) legitimately has no Community value. A medieval castle (Raseborg) legitimately has no Nature value. Red framing turns a neutral characteristic into an apparent gap, which may mislead participants into thinking every site *should* have every value — the opposite of what CBSA teaches.  
**Recommendation:** Use gray for absent (neutral), green for explicit, amber for implied. Reserve red only for the Gaps tab where absence *does* represent a documentation problem.  
**Implementation hint:** Change `absent: "#dc2626"` to `absent: "#9ca3af"` in the `StatusDot` colors map.

#### No table sorting
**What's happening:** The Values matrix (15 rows × 8 columns) and Gaps matrix (15 rows × 6 columns) are static. Users cannot sort by total explicit values, by a specific value type, or by gap score.  
**Why it matters:** The first question a researcher asks of a value matrix is "which sites have the most/fewest values?" — which requires scanning all 15 rows and comparing counts mentally. Sorting makes this instant and enables pattern discovery (e.g., all landscape sites cluster at the top when sorted by total values).  
**Recommendation:** Add click-to-sort on column headers for both matrices. Default sort: by site name. Click a value column → sort by that column's status (explicit first, then implied, then absent).  
**Implementation hint:** `useState` for sort column + direction. `[...SITES].sort((a,b) => ...)` before mapping rows. Add a small ▲/▼ indicator on the active header.

#### Arguments tab "Premise × Site" table is cramped
**What's happening:** The Premise × Site table is in a 200px scrollbox inside a 2-column grid alongside the Claim Scope pie chart. 15 sites in 200px means the user sees ~5 rows at a time.  
**Why it matters:** This is the only place where each site's full premise set is readable, and it's the most squeezed element in the dashboard. The premise data is the analytical core of the Arguments tab — it shouldn't be the afterthought.  
**Recommendation:** Expand the table to full width below the charts, or increase the scrollbox to at least 350px. Better: make it the primary view with the bar chart and pie as supporting context above.  
**Implementation hint:** Move the table outside the 2-column grid. `maxHeight: 350` or remove the grid entirely and stack: bar chart → pie + table side by side at full width.

---

### Low Impact / Polish

#### Label overlap on geographically close sites
**What's happening:** Both Polish sites (Zamczysko, Gdańsk), both Finnish sites (Raseborg, Vrouw Maria), and the two Icelandic sites render labels that overlap at normal zoom.  
**Recommendation:** Add a simple vertical offset for sites within 30px of each other. Not worth a full collision detection system for 15 points.  
**Implementation hint:** Pre-compute label positions; if two `y` values are within threshold, nudge one down by 15px.

#### Summary stat "7+" is vague
**What's happening:** The Overview card shows "7+ Methods" — a hardcoded approximation.  
**Recommendation:** Compute from data: `new Set(SITES.map(s => s.methodType)).size` = 7. Show "7 Methods" (exact). If loading from JSON in future, this auto-updates.  
**Implementation hint:** Replace hardcoded "7+" with computed value.

#### No responsive behavior
**What's happening:** Fixed 72rem max-width, 2×2 grids, 20rem side panel, and multi-column tables assume ≥1024px viewport.  
**Recommendation:** For the workshop, this is low-risk if participants use laptops. But a `flex-wrap` on the tab bar and a stack-on-narrow for the Map's side panel would prevent breakage on smaller screens at minimal cost.  
**Implementation hint:** CSS media query or `flex-wrap: wrap` on the tab container; `flex-direction: column` for the Map layout below 768px.

---

## What Works Well

**Value Mapping matrix.** The ●/◐/○ encoding is immediately legible, the sticky first column prevents horizontal-scroll disorientation, and the footer counts (explicit + implied per value type) add real analytical summary that tables usually lack. This is the best-designed view in the dashboard.

**Clusters tab — management-oriented grouping.** Grouping sites by management implication (preserved-by-accident, nature-culture-inseparable, living-heritage) rather than the expected type/period categories is a genuinely CBSA-aligned analytical move. The card layout communicates the concept well, and allowing sites in multiple clusters reflects reality.

**Visual design language.** The stone/amber/serif palette avoids both corporate-dashboard and flashy-startup aesthetics. For a research audience at a computational archaeology conference, this tone reads as "serious but not sterile" — appropriate for the InSites brand position.

**Gaps matrix traffic-light encoding.** Green/yellow/red works correctly *here* (unlike the Values tab) because documentation gaps genuinely are a quality concern. The per-site completeness score gives an instant read on which sites need more work.

**Value-filter buttons on the Map.** The ability to dim sites that lack a specific value transforms the map from a pin-map to an analytical tool. This is the kind of interaction that makes a map earn its place.

---

## Data Opportunities

**Significance argument comparison.** *Question:* How do different sites argue for the same type of value? *Data:* `significanceSummary` + `comparativeBasis` + `significancePremises` fields (in JSON). *Approach:* A side-by-side panel where the user selects 2–3 sites and reads their significance statements next to each other, with shared premises highlighted. This directly supports the workshop's comparative analysis exercise.

**Documentation depth as a dimension.** *Question:* Which sites are richly documented vs. thinly described? *Data:* Text length of `description`, `significanceSummary`, `integrityNote`, `comparativeBasis`, `protectionNote` (JSON fields). *Approach:* A small-multiples bar chart or sparkline per site showing relative text length across fields — not as a quality judgment, but as a proxy for how much the EAC authors had to work with. Could reveal whether some assessment methods produce richer documentation than others.

**Temporal-spatial pattern map.** *Question:* Do geographic clusters emerge when sites are filtered by period? *Data:* `periodCategory` + coordinates. *Approach:* Extend the existing map's value-filter with a period-filter toggle. Medieval sites cluster in northern Europe; multiperiod sites spread across the full range. This is a one-feature addition to the existing Map tab, not a new tab.

**Method effectiveness matrix.** *Question:* Do quantitative scoring methods actually produce more complete assessments than qualitative ones? *Data:* `methodType` × explicit-value count × integrity level × number of premises cited. *Approach:* Scatter plot with method type as color, value count on x-axis, integrity on y-axis, premise count as dot size. The Cross-Tabs "Method × Coverage" view starts here but could go further with the full JSON fields.
