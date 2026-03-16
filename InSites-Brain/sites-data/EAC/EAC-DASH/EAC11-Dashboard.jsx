import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// ── DATA ──────────────────────────────────────────────────────
const VALUE_TYPES = [
  { id: "historical", label: "Historical", color: "#1e3a5f" },
  { id: "scientific", label: "Scientific", color: "#2d8659" },
  { id: "landscape", label: "Landscape", color: "#8B6914" },
  { id: "community", label: "Community", color: "#d4740e" },
  { id: "intangible", label: "Intangible", color: "#7b3fa0" },
  { id: "architectural", label: "Architectural", color: "#6b7280" },
  { id: "nature", label: "Nature", color: "#1a6b3c" },
  { id: "educational", label: "Educational", color: "#c4a820" },
];

const SITES = [
  { id:"7.1", name:"Carnuntum", country:"Austria", lat:48.112, lng:16.857, type:"Roman landscape", typeCategory:"landscape", period:"1st–5th c. CE", periodCat:"ancient",
    desc:"Over 10 km² Roman frontier: fortress, canabae, civil town, amphitheatres. 90%+ unexcavated.",
    sig:"Largest archaeological landscape in Austria; only non-overbuilt Roman legionary complex. UNESCO Danube Limes.",
    highlight:"Largest site; only UNESCO WH component",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"absent",intangible:"absent",architectural:"absent",nature:"absent",educational:"implied"},
    integrity:"high", threats:["development","agriculture"], protection:"protected", method:"Austrian law + UNESCO OUV", methodType:"qualitative_legal",
    premises:["uniqueness","archive","completeness"], claimScope:"international", compBasis:"Completeness + non-overbuilt; all comparable sites overbuilt" },
  { id:"7.2", name:"Pitschenbergalm", country:"Austria", lat:47.416, lng:13.218, type:"Alpine landscape", typeCategory:"landscape", period:"Neolithic–Modern", periodCat:"multiperiod",
    desc:"High-altitude pasture (1730–1930 m) with 19 structures spanning ~4,000 years. Still used for sheep.",
    sig:"'Archive in the ground' for alpine pastoralism. Among highest-ranking Austrian monuments.",
    highlight:"Highest altitude; longest continuous use (~4,000 yrs)",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"implied",intangible:"absent",architectural:"absent",nature:"absent",educational:"implied"},
    integrity:"high", threats:["natural"], protection:"protected", method:"Austrian law: quality, diversity", methodType:"qualitative_legal",
    premises:["archive","completeness","cultural_landscape"], claimScope:"national", compBasis:"Multi-period diversity + compactness among alpine sites" },
  { id:"7.3", name:"Kurese", country:"Estonia", lat:58.45, lng:23.88, type:"Abandoned village", typeCategory:"landscape", period:"Bronze Age–medieval", periodCat:"multiperiod",
    desc:"26 monuments: graves, cairns, ramparts, fields. Abandoned by Soviet deportation. 900 ha buffer.",
    sig:"Entire village structure preserved by accidental Soviet-era emptying. 'Invaluable resource' for Bronze–Iron Age.",
    highlight:"Preservation by historical tragedy (Soviet deportation)",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"absent",intangible:"absent",architectural:"absent",nature:"absent",educational:"implied"},
    integrity:"high", threats:["detecting","development","natural"], protection:"protected", method:"NHB criteria: age, uniqueness, prominence", methodType:"criteria_list",
    premises:["uniqueness","completeness","cultural_landscape"], claimScope:"national", compBasis:"Completeness of preserved landscape structure" },
  { id:"7.5", name:"Raseborg Castle", country:"Finland", lat:60.02, lng:23.50, type:"Medieval castle", typeCategory:"single_monument", period:"1370s–1550s", periodCat:"medieval",
    desc:"Castle ruin on rocky hill (former island). Ring wall, towers, outer yards with medieval trading area.",
    sig:"Only Finnish medieval castle with preserved outer yard. 16/17 in national assessment.",
    highlight:"Highest score (16/17); quantified detecting damage",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"absent",intangible:"absent",architectural:"explicit",nature:"absent",educational:"implied"},
    integrity:"good", threats:["detecting"], protection:"protected", method:"VARK: 6 criteria, 0–3. Total 16/17", methodType:"quantitative_scoring",
    premises:["uniqueness","completeness"], claimScope:"national", compBasis:"Only 1 of 8 Finnish castles with preserved surroundings" },
  { id:"7.6", name:"Vrouw Maria", country:"Finland", lat:59.87, lng:21.45, type:"Shipwreck", typeCategory:"single_monument", period:"Sank 1771", periodCat:"modern",
    desc:"Dutch merchant vessel at 41 m depth. 90% hull preserved. Catherine the Great art cargo.",
    sig:"Exceptionally preserved 18th-c. merchant ship; concrete manifestation of Baltic trade. Only one comparable vessel worldwide.",
    highlight:"Only underwater site; most internationally connected",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"absent",intangible:"absent",architectural:"absent",nature:"implied",educational:"implied"},
    integrity:"high", threats:["salvage","natural"], protection:"protected", method:"VARK reassessment: 15/18", methodType:"quantitative_scoring",
    premises:["uniqueness","completeness"], claimScope:"international", compBasis:"Only comparable snow-rigged ship: Sjöhästen (Sweden)" },
  { id:"7.7", name:"Tumuli Hungary", country:"Hungary", lat:47.10, lng:21.22, type:"Burial mounds", typeCategory:"ensemble", period:"Copper Age–medieval", periodCat:"multiperiod",
    desc:"Thousands of kurgans across Hungary. Bárdos-halom: 2.7 m high, multi-period surroundings.",
    sig:"Complex phenomena: landmarks, folk tradition sites, nature reserves — not just graves. Most lack protection.",
    highlight:"Only site with nature conservation value; most features",
    values:{historical:"explicit",scientific:"implied",landscape:"explicit",community:"explicit",intangible:"explicit",architectural:"absent",nature:"explicit",educational:"absent"},
    integrity:"variable", threats:["agriculture","development","neglect"], protection:"partial", method:"4-category ranking", methodType:"categorical_ranking",
    premises:["cultural_landscape","community_connection"], claimScope:"national", compBasis:"Internal ranking: landscape prominence + vegetation" },
  { id:"7.8", name:"Pilis Mountains", country:"Hungary", lat:47.72, lng:18.95, type:"Regional programme", typeCategory:"landscape", period:"Prehistoric–Ottoman", periodCat:"multiperiod",
    desc:"21 sites surveyed: hilltops, Roman Limes, medieval seats. Community archaeology with CEU + museum.",
    sig:"Assessment integrating academic + social + community values. Most detailed scoring in collection (71 pts).",
    highlight:"Most comprehensive methodology; only community archaeology",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"explicit",intangible:"explicit",architectural:"absent",nature:"explicit",educational:"explicit"},
    integrity:"variable", threats:["development","agriculture","detecting","natural"], protection:"partial", method:"5 groups, 0–3 scoring. Total 71", methodType:"quantitative_scoring",
    premises:["community_connection","cultural_landscape"], claimScope:"regional", compBasis:"Standardized scoring enables within-region ranking" },
  { id:"7.9", name:"Hveravellir", country:"Iceland", lat:64.87, lng:-19.56, type:"Geothermal / outlaw", typeCategory:"landscape", period:"Viking Age–modern", periodCat:"multiperiod",
    desc:"Geothermal area on Kjölur route. Outlaw huts, cairns, shelter houses. Hot springs, lava fields.",
    sig:"Nature-culture inseparable. Outlaw remains 9/10. 'Every child in Iceland knows' Mountain-Eyvind.",
    highlight:"Strongest intangible heritage; nature-culture fusion",
    values:{historical:"explicit",scientific:"implied",landscape:"explicit",community:"absent",intangible:"explicit",architectural:"absent",nature:"implied",educational:"implied"},
    integrity:"high", threats:["development","tourism","natural"], protection:"partial", method:"10 ranges (adapted SAVE), +/0. 9/10", methodType:"quantitative_scoring",
    premises:["uniqueness","cultural_landscape","community_connection"], claimScope:"national", compBasis:"Nothing comparable nationally; saga connections" },
  { id:"7.10", name:"Þjórsárdalur", country:"Iceland", lat:64.12, lng:-19.85, type:"Abandoned valley", typeCategory:"landscape", period:"Viking Age–12th c.", periodCat:"medieval",
    desc:"~20 farmsteads in eroded valley beneath Mt. Hekla. Stöng longhouse. 140 km² protected.",
    sig:"'Frozen' in 12th century by eruption. Birthplace of Icelandic archaeology. First whole-valley protection (140 km²).",
    highlight:"Largest protected area (140 km²); volcanic time capsule",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"absent",intangible:"implied",architectural:"absent",nature:"absent",educational:"explicit"},
    integrity:"high", threats:["tourism","natural","development"], protection:"protected", method:"Landscape protection; no scoring", methodType:"qualitative_consensus",
    premises:["uniqueness","archive","cultural_landscape"], claimScope:"national", compBasis:"First whole-valley protection in Iceland" },
  { id:"7.11", name:"Waterford", country:"Ireland", lat:52.26, lng:-7.11, type:"Urban archaeology", typeCategory:"urban", period:"Viking–medieval", periodCat:"medieval",
    desc:"13th-c. town wall within Viking city. Wall now displayed in retail premises.",
    sig:"Assessment drove preservation: town wall = national monument → in-situ in retail space. Policy-driven outcome.",
    highlight:"Clearest policy-driven preservation; heritage in commercial space",
    values:{historical:"explicit",scientific:"implied",landscape:"absent",community:"absent",intangible:"absent",architectural:"explicit",nature:"absent",educational:"explicit"},
    integrity:"variable", threats:["development"], protection:"protected", method:"Irish planning: referral → consent", methodType:"legal_planning",
    premises:["assessment_impact"], claimScope:"national", compBasis:"Town defences as single national monument (2008)" },
  { id:"7.12", name:"Tuba-Zangariyye", country:"Israel", lat:32.95, lng:35.55, type:"Megalithic field", typeCategory:"ensemble", period:"~2500–2000 BCE", periodCat:"prehistoric",
    desc:"65+ dolmens, 20+ tumuli on basalt hill. Part of Korazim field (~500 dolmens). Stones up to 15 tons.",
    sig:"Largest dolmen field west of Jordan. 'Rare and almost last remnant.' Assessment reversed destruction. Only CBSA.",
    highlight:"Only CBSA case; assessment reversed destruction; oldest remains",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"absent",intangible:"explicit",architectural:"absent",nature:"absent",educational:"implied"},
    integrity:"good", threats:["development","salvage"], protection:"gap", method:"CBSA (Alef, 2021): 5-step", methodType:"cbsa",
    premises:["uniqueness","assessment_impact","cultural_landscape"], claimScope:"international", compBasis:"Largest west of Jordan; densest globally; last remnant" },
  { id:"7.13", name:"Leithon", country:"Netherlands", lat:52.17, lng:4.53, type:"Medieval settlement", typeCategory:"urban", period:"6th–9th c. CE", periodCat:"medieval",
    desc:"Rhine estuary settlement. ~200,000 finds. Frisian Trade network. 40 cm below surface.",
    sig:"Last preserved early medieval settlement in urbanized W. Netherlands. Compromise: excavation + in-situ scheduling.",
    highlight:"Most finds (200,000); shallowest (40 cm); compromise model",
    values:{historical:"explicit",scientific:"explicit",landscape:"absent",community:"absent",intangible:"absent",architectural:"absent",nature:"absent",educational:"implied"},
    integrity:"high", threats:["development"], protection:"protected", method:"Valletta principle; negotiation", methodType:"legal_planning",
    premises:["uniqueness","archive"], claimScope:"national", compBasis:"Last surviving; compared to Dorestad" },
  { id:"7.15", name:"Zamczysko", country:"Poland", lat:52.30, lng:20.47, type:"Medieval hillfort", typeCategory:"single_monument", period:"12th–14th c.", periodCat:"medieval",
    desc:"Ringfort: double ramparts, two moats. 102×78 m. In Kampinos National Park strict protection. WWII partisan base.",
    sig:"'Time capsule' in national park strict protection. Nature-heritage collaboration model. WWII symbolic value.",
    highlight:"Best nature-heritage integration; WWII dimension",
    values:{historical:"explicit",scientific:"explicit",landscape:"explicit",community:"implied",intangible:"explicit",architectural:"absent",nature:"implied",educational:"explicit"},
    integrity:"high", threats:["development","natural"], protection:"protected", method:"Polish law + NICH evaluation", methodType:"criteria_list",
    premises:["archive","completeness","cultural_landscape"], claimScope:"national", compBasis:"Archaeological + nature strict protection + capital proximity" },
  { id:"7.16", name:"Gdańsk", country:"Poland", lat:54.35, lng:18.65, type:"Romanesque remains", typeCategory:"urban", period:"12th–15th c.", periodCat:"medieval",
    desc:"Romanesque church foundations (~1190) beneath Market Hall. Cellar: only brick late-Romanesque building in Gdańsk.",
    sig:"Oldest architecture in Gdańsk. Community protest saved cellar from destruction. Heritage coexists with commerce.",
    highlight:"Saved by community protest; heritage in commercial space",
    values:{historical:"explicit",scientific:"implied",landscape:"absent",community:"explicit",intangible:"explicit",architectural:"explicit",nature:"absent",educational:"explicit"},
    integrity:"good", threats:["development"], protection:"protected", method:"Letter to GMPO: uniqueness, community", methodType:"criteria_list",
    premises:["uniqueness","assessment_impact","community_connection"], claimScope:"national", compBasis:"Only surviving brick late-Romanesque in Gdańsk" },
  { id:"7.17", name:"Dumbarton Rock", country:"Scotland", lat:55.94, lng:-4.56, type:"Fortress / climbing", typeCategory:"single_monument", period:"Iron Age–present", periodCat:"multiperiod",
    desc:"Volcanic plug, 73 m. Alt Clut / Strathclyde capital. SAM + SSSI. 'Dumby' to climbers.",
    sig:"First community-contributed Statement of Significance (rock climbers). Formal + living heritage converge.",
    highlight:"Only living heritage; first community co-produced statement",
    values:{historical:"explicit",scientific:"implied",landscape:"explicit",community:"explicit",intangible:"explicit",architectural:"absent",nature:"explicit",educational:"implied"},
    integrity:"variable", threats:["natural"], protection:"protected", method:"HES Statement + ACCORD co-production", methodType:"qualitative_legal",
    premises:["community_connection","cultural_landscape"], claimScope:"national", compBasis:"Unique community heritage dimension" },
];

const PREMISE_LABELS = {
  uniqueness:"Uniqueness / Rarity", archive:"Archive for future", completeness:"Completeness / Integrity",
  community_connection:"Community connection", assessment_impact:"Assessment changed outcomes", cultural_landscape:"Cultural landscape as whole"
};
const THREAT_LABELS = { development:"Development", agriculture:"Agriculture", detecting:"Metal detecting", tourism:"Tourism", natural:"Natural forces", neglect:"Neglect", salvage:"Unauthorized access" };
const TYPE_CATS = { landscape:"Landscape", single_monument:"Single monument", urban:"Urban", ensemble:"Ensemble" };
const PERIOD_CATS = { prehistoric:"Prehistoric", ancient:"Ancient", medieval:"Medieval", modern:"Modern", multiperiod:"Multi-period" };
const INTEGRITY_MAP = { high:3, good:2, variable:1 };
const CLUSTERS = [
  { id:"preserved_accident", label:"Preserved by accident", color:"#4a7c59",
    desc:"Sites where disruption of human activity created exceptional preservation. Management priority: protect the conditions, not just the site.",
    sites:["7.3","7.10","7.13","7.2"] },
  { id:"abandoned_power", label:"Abandoned power centers", color:"#8b4513",
    desc:"Former seats of authority, now ruins. High public/tourist value. Management: visitor interpretation + structural conservation.",
    sites:["7.1","7.5","7.11"] },
  { id:"subsurface", label:"Discovered beneath the surface", color:"#5c5c8a",
    desc:"Heritage found during development or renovation. Management: pre-development assessment protocols.",
    sites:["7.16","7.13","7.11"] },
  { id:"nature_culture", label:"Nature-culture inseparable", color:"#2d6a4f",
    desc:"Physical environment IS the cultural significance. Management: joint nature-heritage strategies.",
    sites:["7.9","7.17","7.15","7.7"] },
  { id:"monumental_burial", label:"Monumental burial traditions", color:"#6b2737",
    desc:"Structures built for the dead that outlast the living. Management: landscape-scale protection.",
    sites:["7.12","7.7"] },
  { id:"living_heritage", label:"Living / active heritage", color:"#c45d1e",
    desc:"Significance is not past but ongoing. Management: community partnership models.",
    sites:["7.17","7.8","7.9"] },
];

// ── HELPERS ──────────────────────────────────────────────────
const countValues = (site) => VALUE_TYPES.filter(v => site.values[v.id] === "explicit").length;
const mapToSvg = (lat, lng) => {
  const x = ((lng + 25) / 65) * 780 + 10;
  const y = ((68 - lat) / 40) * 480 + 10;
  return { x: Math.max(10, Math.min(790, x)), y: Math.max(10, Math.min(490, y)) };
};

// ── COMPONENTS ──────────────────────────────────────────────
const Badge = ({ color, children }) => (
  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white mr-1 mb-1" style={{ backgroundColor: color }}>{children}</span>
);

const StatusDot = ({ status }) => {
  const colors = { explicit: "#16a34a", implied: "#eab308", absent: "#dc2626" };
  const labels = { explicit: "●", implied: "◐", absent: "○" };
  return <span style={{ color: colors[status] }} title={status}>{labels[status]}</span>;
};

// ── MAP TAB ──────────────────────────────────────────────────
const MapTab = () => {
  const [selected, setSelected] = useState(null);
  const [activeValue, setActiveValue] = useState(null);
  const site = selected ? SITES.find(s => s.id === selected) : null;

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1">
        <div className="flex flex-wrap gap-1 mb-3">
          <button onClick={() => setActiveValue(null)} className={`px-2 py-1 rounded text-xs border ${!activeValue ? "bg-stone-800 text-white" : "bg-white text-stone-600 border-stone-300"}`}>All values</button>
          {VALUE_TYPES.map(v => (
            <button key={v.id} onClick={() => setActiveValue(activeValue === v.id ? null : v.id)}
              className={`px-2 py-1 rounded text-xs border transition-all ${activeValue === v.id ? "text-white" : "bg-white text-stone-600 border-stone-300"}`}
              style={activeValue === v.id ? { backgroundColor: v.color, borderColor: v.color } : {}}>
              {v.label}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 800 500" className="w-full border border-stone-200 rounded-lg bg-stone-50">
          <defs>
            <pattern id="water" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#e8eff5"/><circle cx="2" cy="2" r="0.5" fill="#d0dce8"/></pattern>
          </defs>
          <rect width="800" height="500" fill="url(#water)" rx="8"/>
          {/* Simplified Europe outline */}
          <path d="M200,100 L250,80 L320,70 L380,65 L420,75 L460,60 L500,70 L540,65 L560,80 L580,75 L600,90 L590,110 L570,120 L580,140 L560,160 L540,150 L520,165 L500,155 L480,170 L460,160 L440,175 L430,190 L440,210 L420,230 L400,225 L380,240 L370,260 L350,255 L340,270 L320,260 L310,280 L290,275 L280,290 L260,280 L240,295 L220,285 L200,300 L180,280 L170,260 L185,240 L175,220 L195,200 L180,180 L200,160 L190,140 L210,120 Z" fill="#e8e0d4" stroke="#c4b9a8" strokeWidth="1" opacity="0.7"/>
          {/* Scandinavia */}
          <path d="M340,30 L360,20 L390,25 L400,40 L380,55 L360,50 L340,60 L330,45 Z" fill="#e8e0d4" stroke="#c4b9a8" strokeWidth="1" opacity="0.7"/>
          {/* Iceland */}
          <path d="M100,30 L130,25 L145,35 L135,50 L110,48 L95,40 Z" fill="#e8e0d4" stroke="#c4b9a8" strokeWidth="1" opacity="0.7"/>
          {/* Middle East extension */}
          <path d="M600,200 L650,190 L680,220 L670,260 L640,300 L610,280 L600,250 L610,230 Z" fill="#e8e0d4" stroke="#c4b9a8" strokeWidth="1" opacity="0.7"/>

          {SITES.map(s => {
            const { x, y } = mapToSvg(s.lat, s.lng);
            const isActive = !activeValue || s.values[activeValue] === "explicit" || s.values[activeValue] === "implied";
            const isSelected = selected === s.id;
            const explicitVals = VALUE_TYPES.filter(v => s.values[v.id] === "explicit");
            const r = isSelected ? 14 : 10;
            const angleStep = (2 * Math.PI) / Math.max(explicitVals.length, 1);

            return (
              <g key={s.id} onClick={() => setSelected(s.id)} className="cursor-pointer" opacity={isActive ? 1 : 0.15}>
                {isSelected && <circle cx={x} cy={y} r={r + 4} fill="none" stroke="#92400e" strokeWidth="2" strokeDasharray="3,2"/>}
                {explicitVals.length > 0 ? explicitVals.map((v, i) => (
                  <path key={v.id} d={`M${x},${y} L${x + r * Math.cos(angleStep * i - Math.PI/2)},${y + r * Math.sin(angleStep * i - Math.PI/2)} A${r},${r} 0 0,1 ${x + r * Math.cos(angleStep * (i+1) - Math.PI/2)},${y + r * Math.sin(angleStep * (i+1) - Math.PI/2)} Z`}
                    fill={v.color} stroke="white" strokeWidth="0.5"/>
                )) : <circle cx={x} cy={y} r={r} fill="#9ca3af" stroke="white" strokeWidth="1"/>}
                <text x={x} y={y + r + 12} textAnchor="middle" className="text-xs" fill="#44403c" style={{fontSize:"9px",fontWeight:500}}>{s.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {site && (
        <div className="w-80 bg-white border border-stone-200 rounded-lg p-4 overflow-y-auto" style={{maxHeight:"560px"}}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-base text-stone-900">{site.name}</h3>
              <p className="text-xs text-stone-500">{site.country} · {site.period}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-600 text-lg">×</button>
          </div>
          <p className="text-xs text-stone-700 mb-3 leading-relaxed">{site.sig}</p>
          <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-3">
            <p className="text-xs font-medium text-amber-900">↗ {site.highlight}</p>
          </div>
          <div className="mb-3">
            <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Values</p>
            <div className="flex flex-wrap">
              {VALUE_TYPES.filter(v => site.values[v.id] === "explicit").map(v => <Badge key={v.id} color={v.color}>{v.label}</Badge>)}
              {VALUE_TYPES.filter(v => site.values[v.id] === "implied").map(v => <Badge key={v.id} color={v.color + "88"}>{v.label} (implied)</Badge>)}
            </div>
          </div>
          <div className="space-y-2 text-xs text-stone-600">
            <div><span className="font-semibold text-stone-500">Integrity:</span> {site.integrity}</div>
            <div><span className="font-semibold text-stone-500">Comparison:</span> {site.compBasis}</div>
            <div><span className="font-semibold text-stone-500">Threats:</span> {site.threats.map(t => THREAT_LABELS[t]).join(", ")}</div>
            <div><span className="font-semibold text-stone-500">Protection:</span> {site.protection}</div>
            <div><span className="font-semibold text-stone-500">Method:</span> {site.method}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── VALUE MAPPING TAB ────────────────────────────────────────
const ValueMappingTab = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-stone-100">
          <th className="text-left p-2 font-semibold text-stone-700 sticky left-0 bg-stone-100 min-w-32">Site</th>
          {VALUE_TYPES.map(v => <th key={v.id} className="p-2 text-center font-semibold min-w-16" style={{color: v.color}}>{v.label}</th>)}
          <th className="p-2 text-center font-semibold text-stone-500">Total ●</th>
        </tr>
      </thead>
      <tbody>
        {SITES.map(s => (
          <tr key={s.id} className="border-t border-stone-100 hover:bg-stone-50">
            <td className="p-2 font-medium text-stone-800 sticky left-0 bg-white">{s.name} <span className="text-stone-400">({s.country})</span></td>
            {VALUE_TYPES.map(v => <td key={v.id} className="p-2 text-center text-base"><StatusDot status={s.values[v.id]}/></td>)}
            <td className="p-2 text-center font-bold text-stone-600">{countValues(s)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-t-2 border-stone-300 bg-stone-50">
          <td className="p-2 font-semibold text-stone-600 sticky left-0 bg-stone-50">Explicit count</td>
          {VALUE_TYPES.map(v => {
            const c = SITES.filter(s => s.values[v.id] === "explicit").length;
            return <td key={v.id} className="p-2 text-center font-bold" style={{color: v.color}}>{c}</td>;
          })}
          <td></td>
        </tr>
        <tr className="bg-stone-50">
          <td className="p-2 font-semibold text-stone-600 sticky left-0 bg-stone-50">Implied count</td>
          {VALUE_TYPES.map(v => {
            const c = SITES.filter(s => s.values[v.id] === "implied").length;
            return <td key={v.id} className="p-2 text-center text-stone-400">{c}</td>;
          })}
          <td></td>
        </tr>
      </tfoot>
    </table>
    <div className="mt-4 flex gap-4 text-xs text-stone-500">
      <span><span className="text-green-600">●</span> Explicit</span>
      <span><span className="text-yellow-500">◐</span> Implied</span>
      <span><span className="text-red-500">○</span> Absent</span>
    </div>
  </div>
);

// ── SIGNIFICANCE ARGUMENTS TAB ───────────────────────────────
const SignificanceTab = () => {
  const premiseData = Object.entries(PREMISE_LABELS).map(([id, label]) => ({
    name: label, count: SITES.filter(s => s.premises.includes(id)).length, id
  })).sort((a, b) => b.count - a.count);

  const scopeData = [
    { name: "International", count: SITES.filter(s => s.claimScope === "international").length },
    { name: "National", count: SITES.filter(s => s.claimScope === "national").length },
    { name: "Regional", count: SITES.filter(s => s.claimScope === "regional").length },
    { name: "Local", count: SITES.filter(s => s.claimScope === "local").length },
  ].filter(d => d.count > 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-stone-800 mb-3">What do significance arguments rest on?</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={premiseData} layout="vertical" margin={{ left: 160, right: 20 }}>
            <XAxis type="number" domain={[0, 15]} tick={{fontSize:11}} />
            <YAxis type="category" dataKey="name" tick={{fontSize:11}} width={155} />
            <Tooltip contentStyle={{fontSize:12}} />
            <Bar dataKey="count" fill="#92400e" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-stone-800 mb-3">Claim scope</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={scopeData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,count}) => `${name}: ${count}`} labelLine={false}>
                {scopeData.map((d, i) => <Cell key={i} fill={["#1e3a5f","#4a7c59","#8B6914","#d4740e"][i]}/>)}
              </Pie>
              <Tooltip contentStyle={{fontSize:12}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-800 mb-3">Premise × Site</h3>
          <div className="overflow-y-auto text-xs" style={{maxHeight: 200}}>
            <table className="w-full border-collapse">
              <thead><tr className="bg-stone-100"><th className="p-1 text-left">Site</th><th className="p-1 text-left">Key premises</th></tr></thead>
              <tbody>
                {SITES.map(s => (
                  <tr key={s.id} className="border-t border-stone-100">
                    <td className="p-1 font-medium">{s.name}</td>
                    <td className="p-1 text-stone-600">{s.premises.map(p => PREMISE_LABELS[p]).join("; ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── GAP MATRIX TAB ──────────────────────────────────────────
const GapTab = () => {
  const fields = [
    { key: "desc", label: "Description" },
    { key: "sig", label: "Significance" },
    { key: "values_explicit", label: "Values (explicit)" },
    { key: "integrity", label: "Integrity" },
    { key: "compBasis", label: "Comparative" },
    { key: "threats", label: "Threats" },
  ];
  const getStatus = (s, key) => {
    if (key === "values_explicit") return countValues(s) >= 3 ? "present" : countValues(s) >= 1 ? "partial" : "absent";
    if (key === "integrity") return s.integrity === "high" ? "present" : s.integrity === "good" ? "present" : s.integrity === "variable" ? "partial" : "absent";
    if (key === "threats") return s.threats.length > 0 ? "present" : "absent";
    if (key === "compBasis") return s.compBasis && s.compBasis.length > 10 ? "present" : "absent";
    const val = s[key];
    return val && val.length > 20 ? "present" : val && val.length > 0 ? "partial" : "absent";
  };
  const cellColors = { present: "#dcfce7", partial: "#fef9c3", absent: "#fee2e2" };
  const cellText = { present: "✓", partial: "◐", absent: "—" };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-stone-100">
            <th className="p-2 text-left font-semibold text-stone-700 sticky left-0 bg-stone-100">Site</th>
            {fields.map(f => <th key={f.key} className="p-2 text-center font-semibold text-stone-700 min-w-20">{f.label}</th>)}
            <th className="p-2 text-center font-semibold text-stone-500">Score</th>
          </tr>
        </thead>
        <tbody>
          {SITES.map(s => {
            const score = fields.reduce((acc, f) => acc + (getStatus(s, f.key) === "present" ? 2 : getStatus(s, f.key) === "partial" ? 1 : 0), 0);
            return (
              <tr key={s.id} className="border-t border-stone-100">
                <td className="p-2 font-medium text-stone-800 sticky left-0 bg-white">{s.name}</td>
                {fields.map(f => {
                  const st = getStatus(s, f.key);
                  return <td key={f.key} className="p-2 text-center font-medium" style={{backgroundColor: cellColors[st]}}>{cellText[st]}</td>;
                })}
                <td className="p-2 text-center font-bold text-stone-600">{score}/{fields.length * 2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1"><span className="w-4 h-3 rounded" style={{backgroundColor:"#dcfce7"}}></span> Present</span>
        <span className="flex items-center gap-1"><span className="w-4 h-3 rounded" style={{backgroundColor:"#fef9c3"}}></span> Partial</span>
        <span className="flex items-center gap-1"><span className="w-4 h-3 rounded" style={{backgroundColor:"#fee2e2"}}></span> Absent</span>
      </div>
    </div>
  );
};

// ── CROSS-TABS TAB ───────────────────────────────────────────
const CrossTabsTab = () => {
  const [view, setView] = useState("type_values");

  const typeValuesData = Object.entries(TYPE_CATS).map(([cat, label]) => {
    const sites = SITES.filter(s => s.typeCategory === cat);
    if (!sites.length) return null;
    const row = { name: `${label} (${sites.length})` };
    VALUE_TYPES.forEach(v => { row[v.id] = sites.filter(s => s.values[v.id] === "explicit").length; });
    return row;
  }).filter(Boolean);

  const threatTypeData = Object.entries(TYPE_CATS).map(([cat, label]) => {
    const sites = SITES.filter(s => s.typeCategory === cat);
    if (!sites.length) return null;
    const row = { name: `${label} (${sites.length})` };
    Object.keys(THREAT_LABELS).forEach(t => { row[t] = sites.filter(s => s.threats.includes(t)).length; });
    return row;
  }).filter(Boolean);

  const methodCovData = useMemo(() => {
    const methods = [...new Set(SITES.map(s => s.methodType))];
    return methods.map(m => {
      const sites = SITES.filter(s => s.methodType === m);
      const labels = { quantitative_scoring:"Quantitative scoring", qualitative_legal:"Qualitative legal", criteria_list:"Criteria list", categorical_ranking:"Categorical ranking", cbsa:"CBSA", legal_planning:"Legal/Planning", qualitative_consensus:"Qualitative consensus" };
      return {
        name: `${labels[m] || m} (${sites.length})`,
        avgValues: +(sites.reduce((a, s) => a + countValues(s), 0) / sites.length).toFixed(1),
        avgIntegrity: +(sites.reduce((a, s) => a + (INTEGRITY_MAP[s.integrity] || 0), 0) / sites.length).toFixed(1),
      };
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["type_values","Type × Values"],["threats_type","Threats × Type"],["method_cov","Method × Coverage"]].map(([id,label]) => (
          <button key={id} onClick={() => setView(id)} className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${view===id ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>{label}</button>
        ))}
      </div>
      {view === "type_values" && (
        <div>
          <p className="text-xs text-stone-500 mb-3">Number of sites per type category with each value explicitly documented</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={typeValuesData} margin={{ left: 10, right: 10 }}>
              <XAxis dataKey="name" tick={{fontSize:10}} />
              <YAxis tick={{fontSize:10}} />
              <Tooltip contentStyle={{fontSize:11}} />
              <Legend wrapperStyle={{fontSize:10}} />
              {VALUE_TYPES.slice(0, 5).map(v => <Bar key={v.id} dataKey={v.id} fill={v.color} name={v.label} stackId="a" />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {view === "threats_type" && (
        <div>
          <p className="text-xs text-stone-500 mb-3">Threat distribution by site type category</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={threatTypeData} margin={{ left: 10, right: 10 }}>
              <XAxis dataKey="name" tick={{fontSize:10}} />
              <YAxis tick={{fontSize:10}} />
              <Tooltip contentStyle={{fontSize:11}} />
              <Legend wrapperStyle={{fontSize:10}} />
              {Object.entries(THREAT_LABELS).slice(0, 5).map(([id, label], i) => <Bar key={id} dataKey={id} fill={["#dc2626","#ea580c","#ca8a04","#2563eb","#6b7280"][i]} name={label} stackId="a" />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {view === "method_cov" && (
        <div>
          <p className="text-xs text-stone-500 mb-3">Do different assessment methods produce different coverage depth?</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={methodCovData} layout="vertical" margin={{ left: 170, right: 20 }}>
              <XAxis type="number" tick={{fontSize:10}} />
              <YAxis type="category" dataKey="name" tick={{fontSize:10}} width={165} />
              <Tooltip contentStyle={{fontSize:11}} />
              <Legend wrapperStyle={{fontSize:10}} />
              <Bar dataKey="avgValues" fill="#2d8659" name="Avg explicit values" />
              <Bar dataKey="avgIntegrity" fill="#1e3a5f" name="Avg integrity (3=high)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

// ── MANAGEMENT CLUSTERS TAB ─────────────────────────────────
const ClustersTab = () => {
  const [activeCl, setActiveCl] = useState(null);
  return (
    <div className="space-y-4">
      <p className="text-xs text-stone-600">Sites grouped by management implication — not by type or period, but by what kind of action they need. Sites may appear in multiple clusters.</p>
      <div className="grid grid-cols-2 gap-3">
        {CLUSTERS.map(cl => (
          <div key={cl.id} onClick={() => setActiveCl(activeCl === cl.id ? null : cl.id)}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${activeCl === cl.id ? "border-stone-800 shadow-md" : "border-stone-200 hover:border-stone-400"}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: cl.color}}></div>
              <h4 className="text-sm font-bold text-stone-800">{cl.label}</h4>
              <span className="text-xs text-stone-400 ml-auto">{cl.sites.length} sites</span>
            </div>
            <p className="text-xs text-stone-600 mb-2">{cl.desc}</p>
            <div className="flex flex-wrap gap-1">
              {cl.sites.map(id => {
                const s = SITES.find(s => s.id === id);
                return <span key={id} className="px-1.5 py-0.5 bg-stone-100 rounded text-xs text-stone-700">{s?.name}</span>;
              })}
            </div>
          </div>
        ))}
      </div>
      {activeCl && (
        <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
          <h4 className="text-sm font-bold text-stone-800 mb-2">Sites in "{CLUSTERS.find(c=>c.id===activeCl)?.label}"</h4>
          <div className="space-y-2">
            {CLUSTERS.find(c=>c.id===activeCl)?.sites.map(id => {
              const s = SITES.find(s => s.id === id);
              return s ? (
                <div key={id} className="flex gap-3 text-xs">
                  <span className="font-semibold text-stone-700 w-28 shrink-0">{s.name}</span>
                  <span className="text-stone-500">{s.sig}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ── OVERVIEW TAB ─────────────────────────────────────────────
const OverviewTab = () => {
  const countryData = useMemo(() => {
    const map = {};
    SITES.forEach(s => { map[s.country] = (map[s.country] || 0) + 1; });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, []);
  const typeData = Object.entries(TYPE_CATS).map(([cat, label]) => ({ name: label, count: SITES.filter(s => s.typeCategory === cat).length })).filter(d => d.count);
  const periodData = Object.entries(PERIOD_CATS).map(([cat, label]) => ({ name: label, count: SITES.filter(s => s.periodCat === cat).length })).filter(d => d.count);
  const protData = [
    { name: "Protected", count: SITES.filter(s => s.protection === "protected").length },
    { name: "Partial", count: SITES.filter(s => s.protection === "partial").length },
    { name: "Gap", count: SITES.filter(s => s.protection === "gap").length },
  ];
  const COLORS = ["#1e3a5f","#2d8659","#8B6914","#d4740e","#7b3fa0","#6b7280","#1a6b3c","#c4a820","#92400e","#be123c"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-stone-800 text-white rounded-lg p-4 text-center"><div className="text-3xl font-bold">15</div><div className="text-xs text-stone-300">Sites</div></div>
        <div className="bg-stone-700 text-white rounded-lg p-4 text-center"><div className="text-3xl font-bold">10</div><div className="text-xs text-stone-300">Countries</div></div>
        <div className="bg-stone-600 text-white rounded-lg p-4 text-center"><div className="text-3xl font-bold">7+</div><div className="text-xs text-stone-300">Methods</div></div>
        <div className="bg-amber-800 text-white rounded-lg p-4 text-center"><div className="text-3xl font-bold">4,500</div><div className="text-xs text-amber-200">Year span</div></div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-stone-800 mb-2">By country</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={countryData} margin={{ left: 5, right: 5 }}>
              <XAxis dataKey="name" tick={{fontSize:9, angle:-25}} height={50} />
              <YAxis tick={{fontSize:10}} allowDecimals={false} />
              <Tooltip contentStyle={{fontSize:11}} />
              <Bar dataKey="count" radius={[4,4,0,0]}>{countryData.map((d, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-800 mb-2">By type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={typeData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,count}) => `${name}: ${count}`} labelLine={true}>
                {typeData.map((d, i) => <Cell key={i} fill={COLORS[i + 3]}/>)}
              </Pie>
              <Tooltip contentStyle={{fontSize:11}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-800 mb-2">By period</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={periodData}>
              <XAxis dataKey="name" tick={{fontSize:10}} />
              <YAxis tick={{fontSize:10}} allowDecimals={false} />
              <Tooltip contentStyle={{fontSize:11}} />
              <Bar dataKey="count" fill="#4a7c59" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-800 mb-2">Protection status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={protData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,count}) => `${name}: ${count}`}>
                {protData.map((d, i) => <Cell key={i} fill={["#16a34a","#eab308","#dc2626"][i]}/>)}
              </Pie>
              <Tooltip contentStyle={{fontSize:11}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ── MAIN DASHBOARD ──────────────────────────────────────────
const TABS = [
  { id: "map", label: "🗺 Map", comp: MapTab },
  { id: "values", label: "◉ Values", comp: ValueMappingTab },
  { id: "sig", label: "📝 Arguments", comp: SignificanceTab },
  { id: "gaps", label: "⬚ Gaps", comp: GapTab },
  { id: "cross", label: "⊞ Cross-Tabs", comp: CrossTabsTab },
  { id: "clusters", label: "◎ Clusters", comp: ClustersTab },
  { id: "overview", label: "▤ Overview", comp: OverviewTab },
];

export default function Dashboard() {
  const [tab, setTab] = useState("map");
  const ActiveTab = TABS.find(t => t.id === tab)?.comp || MapTab;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f6f1", fontFamily: "'Georgia', 'Cambria', serif" }}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-stone-900 tracking-tight" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>
            Read-Collection · EAC11 Heritage Analysis
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">15 archaeological sites · 10 countries · Qualitative content analysis on significance assessments</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-4 border-b border-stone-300 pb-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-t text-xs font-medium whitespace-nowrap transition-all ${tab === t.id ? "bg-white text-stone-900 border border-b-0 border-stone-300 -mb-px" : "text-stone-500 hover:text-stone-700 hover:bg-stone-100"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-sm" style={{ minHeight: "500px" }}>
          <ActiveTab />
        </div>

        {/* Footer */}
        <div className="mt-3 text-center text-xs text-stone-400">
          InSites Knowledge Lab · Data: EAC Guidelines 11 (2026) · MA-RC Read-Collection Analysis
        </div>
      </div>
    </div>
  );
}
