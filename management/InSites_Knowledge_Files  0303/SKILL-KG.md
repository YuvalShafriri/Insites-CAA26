---
name: cbsa-knowledge-graph
description: יוצר גרפי ידע אינטראקטיביים להערכת מורשת תרבותית (CBSA). להפעיל כאשר משתמש מבקש "גרף ידע", "kg", "knowledge graph", או ויזואליזציה של קשרים בין ישויות מורשת. הגרף כולל צמתים צבעוניים לפי סוג, חלון מידע RTL, אנליזה מובנית, וממשק שאילתות AI.
---

# CBSA Knowledge Graph Skill

## מתי להפעיל
- בקשה מפורשת: "גרף ידע", "kg", "knowledge graph"
- בקשה לויזואליזציה של קשרי מורשת
- בסוף שלב 5 של תהליך CBSA כשמשתמש מבקש

## תהליך יצירת גרף

### שלב 1: חילוץ נתונים מהשיחה

סרוק את כל פלטי CBSA שהיו בשיחה (הקשרים, ציר זמן, ערכים, השוואות, הצהרת משמעות) וזהה:

**צמתים (10-15, מקסימום 18)** לפי סדר עדיפות:
1. נכס המורשת המרכזי (asset) — תמיד אחד בלבד
2. ישויות נושאות-ערך מרכזיות (מבנים, מקומות)
3. אירועים ותקופות מרכזיים
4. עוגני הקשר (גאוגרפי, חברתי, פוליטי, היסטורי)
5. שחקנים חברתיים (קבוצות, דמויות)
6. עד 3 צמתי ערך תרבותי (cultural_value)

**קשרים (עד 24)** — פעלים שמראים לוגיקת CBSA:
- `located_in` — מיקום פיזי
- `expresses_value` — ביטוי ערך תרבותי
- `part_of` — חלק מכלל
- `commemorates` — הנצחה
- `influenced_by` — השפעה
- `supports` — תמיכה
- `built_by` — בנייה/יצירה
- `used_by` — שימוש
- `transformed_into` — שינוי/הפיכה
- `connected_to` — קשר כללי

### שלב 2: בניית DATA JSON

```json
{
  "metadata": {
    "title": "שם הנכס - גרף ידע",
    "created": "YYYY-MM-DD",
    "source": "CBSA Assessment"
  },
  "nodes": [
    {
      "id": "unique_id",
      "name": "שם בעברית",
      "type": "entity_type",
      "meaning": "5-12 מילים המתארות תפקיד במורשת"
    }
  ],
  "edges": [
    { "from": "source_id", "to": "target_id", "label": "relationship_verb" }
  ]
}
```

**כללי שדות קריטיים:**
- `name`, `meaning`: **עברית בלבד**
- `type`: **אנגלית** מרשימת הסוגים (ראה למטה)
- `label` בקשרים: **אנגלית**, lowercase
- **אין צמתים יתומים** — כל צומת מחובר לפחות פעם אחת

## סוגי ישויות וצבעים

### סוגי ליבה

| type | צבע | תרגום | מתי להשתמש |
|------|-----|--------|-------------|
| asset | #E53935 | נכס | נכס המורשת המרכזי שנבחן (תמיד אחד) |
| cultural_value | #FFD700 | ערך תרבותי | ערכים מופשטים — היסטורי, אסתטי, חברתי (עד 3) |
| structure | #D81B60 | מבנה | מבנים פיזיים, בניינים |
| place | #9C27B0 | מקום | מיקומים גאוגרפיים |
| event | #FB8C00 | אירוע | אירועים היסטוריים ספציפיים |
| period | #6D4C41 | תקופה | תקופות היסטוריות |
| person | #00ACC1 | דמות | אנשים ספציפיים |
| group | #7CB342 | קבוצה | קהילות, ארגונים, קבוצות חברתיות |

### סוגי הקשר

| type | צבע | תרגום | מתי להשתמש |
|------|-----|--------|-------------|
| historical_context | #1E88E5 | הקשר היסטורי | רקע היסטורי |
| social_context | #43A047 | הקשר חברתי | רקע חברתי/קהילתי |
| political_context | #3949AB | הקשר פוליטי | רקע פוליטי/שלטוני |
| technological_context | #F4511E | הקשר טכנולוגי | רקע טכני/בנייה |
| environmental_context | #00897B | הקשר סביבתי | רקע אקולוגי/נופי |
| context | #78909C | הקשר | הקשר כללי אחר |

## שלב 3: יצירת React Artifact

**חובה:** ליצור artifact מסוג React (.jsx) עם התבנית המלאה הבאה.

**החלפות נדרשות:**
1. החלף `__GRAPH_DATA__` ב-JSON שנבנה (כאובייקט JavaScript)
2. החלף `__GRAPH_TITLE__` בשם הנכס בעברית

### תבנית React מלאה

```jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const GRAPH_DATA = __GRAPH_DATA__;

const TYPE_COLORS = {
  asset: '#E53935',
  cultural_value: '#FFD700',
  structure: '#D81B60',
  place: '#9C27B0',
  event: '#FB8C00',
  period: '#6D4C41',
  person: '#00ACC1',
  group: '#7CB342',
  historical_context: '#1E88E5',
  social_context: '#43A047',
  political_context: '#3949AB',
  technological_context: '#F4511E',
  environmental_context: '#00897B',
  context: '#78909C'
};

const TYPE_HEBREW = {
  asset: 'נכס',
  cultural_value: 'ערך תרבותי',
  structure: 'מבנה',
  place: 'מקום',
  event: 'אירוע',
  period: 'תקופה',
  person: 'דמות',
  group: 'קבוצה',
  historical_context: 'הקשר היסטורי',
  social_context: 'הקשר חברתי',
  political_context: 'הקשר פוליטי',
  technological_context: 'הקשר טכנולוגי',
  environmental_context: 'הקשר סביבתי',
  context: 'הקשר'
};

export default function KnowledgeGraph() {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(new Set(Object.keys(TYPE_COLORS)));
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'שלום! אני יכול לעזור לך להבין את גרף הידע. שאל אותי על הצמתים, הקשרים, או המשמעות התרבותית.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const typeCounts = GRAPH_DATA.nodes.reduce((acc, n) => {
    acc[n.type] = (acc[n.type] || 0) + 1;
    return acc;
  }, {});

  const getConnections = useCallback((nodeId) => {
    return GRAPH_DATA.edges.filter(e => e.from === nodeId || e.to === nodeId).map(e => {
      const isSource = e.from === nodeId;
      const otherId = isSource ? e.to : e.from;
      const otherNode = GRAPH_DATA.nodes.find(n => n.id === otherId);
      return { label: e.label, node: otherNode, direction: isSource ? '→' : '←' };
    });
  }, []);

  const filteredNodes = GRAPH_DATA.nodes.filter(n => {
    const matchesFilter = activeFilters.has(n.type);
    const matchesSearch = !searchQuery || 
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.meaning && n.meaning.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filteredEdges = GRAPH_DATA.edges.filter(e => {
    const sourceVisible = filteredNodes.some(n => n.id === e.from);
    const targetVisible = filteredNodes.some(n => n.id === e.to);
    return sourceVisible && targetVisible;
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const container = svgRef.current.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    // Arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', '#666');

    // Create copies for simulation
    const nodesData = filteredNodes.map(n => ({ ...n }));
    const edgesData = filteredEdges.map(e => ({ ...e, source: e.from, target: e.to }));

    // Simulation
    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(edgesData).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(45));

    simulationRef.current = simulation;

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(edgesData)
      .join('line')
      .attr('stroke', '#555')
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrowhead)');

    // Link labels
    const linkLabel = g.append('g')
      .selectAll('text')
      .data(edgesData)
      .join('text')
      .attr('font-size', 9)
      .attr('fill', '#888')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .text(d => d.label);

    // Nodes group
    const node = g.append('g')
      .selectAll('g')
      .data(nodesData)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        }));

    // Node circles
    node.append('circle')
      .attr('r', d => d.type === 'asset' ? 24 : (d.type === 'cultural_value' ? 18 : 14))
      .attr('fill', d => TYPE_COLORS[d.type] || '#999')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Asset special shape (star overlay)
    node.filter(d => d.type === 'asset')
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', 16)
      .attr('fill', '#fff')
      .text('★');

    // Node labels
    node.append('text')
      .attr('dy', d => d.type === 'asset' ? 40 : 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('fill', '#eee')
      .attr('font-weight', d => d.type === 'asset' ? 'bold' : 'normal')
      .text(d => d.name.length > 14 ? d.name.substring(0, 14) + '…' : d.name);

    // Click handler
    node.on('click', (event, d) => {
      setSelectedNode(GRAPH_DATA.nodes.find(n => n.id === d.id));
      event.stopPropagation();
    });

    svg.on('click', () => setSelectedNode(null));

    // Tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      linkLabel
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [filteredNodes, filteredEdges, searchQuery, activeFilters]);

  const toggleFilter = (type) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const resetView = () => {
    if (simulationRef.current) {
      simulationRef.current.alpha(0.5).restart();
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(GRAPH_DATA, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'knowledge-graph.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendAIQuery = async (question) => {
    const q = question || aiInput.trim();
    if (!q) return;

    setAiMessages(prev => [...prev, { role: 'user', content: q }]);
    setAiInput('');
    setIsLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `אתה מנתח גרפי ידע של מורשת תרבותית. הנה הגרף:

צמתים:
${GRAPH_DATA.nodes.map(n => `- ${n.name} (${TYPE_HEBREW[n.type] || n.type}): ${n.meaning || ''}`).join('\n')}

קשרים:
${GRAPH_DATA.edges.map(e => {
  const fromNode = GRAPH_DATA.nodes.find(n => n.id === e.from);
  const toNode = GRAPH_DATA.nodes.find(n => n.id === e.to);
  return `- ${fromNode?.name || e.from} --[${e.label}]--> ${toNode?.name || e.to}`;
}).join('\n')}

שאלת המשתמש: ${q}

ענה בעברית, בקצרה (עד 150 מילים), והתמקד בתובנות מהגרף.`
          }]
        })
      });

      const data = await response.json();
      const answer = data.content?.[0]?.text || 'לא התקבלה תשובה';
      setAiMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (error) {
      setAiMessages(prev => [...prev, { role: 'error', content: `שגיאה: ${error.message}` }]);
    }
    setIsLoading(false);
  };

  const nodeCount = GRAPH_DATA.nodes.length;
  const edgeCount = GRAPH_DATA.edges.length;
  const density = (2 * edgeCount / (nodeCount * (nodeCount - 1))).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#1a1a2e', color: '#eee', fontFamily: 'Segoe UI, Tahoma, sans-serif', direction: 'rtl' }}>
      {/* Header */}
      <header style={{ background: '#16213e', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #0f3460' }}>
        <h1 style={{ fontSize: '1.3rem', color: '#e94560', margin: 0 }}>__GRAPH_TITLE__</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={resetView} style={{ background: '#0f3460', color: '#eee', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>איפוס</button>
          <button onClick={exportData} style={{ background: '#0f3460', color: '#eee', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>ייצוא JSON</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Graph Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg ref={svgRef} style={{ width: '100%', height: '100%', background: '#1a1a2e' }} />
          
          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(22,33,62,0.95)', padding: 12, borderRadius: 8, fontSize: '0.8rem' }}>
            {Object.entries(typeCounts).map(([type]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: TYPE_COLORS[type], marginLeft: 8 }}></span>
                <span>{TYPE_HEBREW[type]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <aside style={{ width: 320, background: '#16213e', borderRight: '1px solid #0f3460', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#0f3460' }}>
            {['info', 'analytics', 'ai'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: 12, border: 'none', cursor: 'pointer',
                  background: activeTab === tab ? '#16213e' : 'transparent',
                  color: activeTab === tab ? '#e94560' : '#aaa',
                  fontSize: '0.85rem'
                }}
              >
                {tab === 'info' ? 'מידע' : tab === 'analytics' ? 'אנליזה' : 'AI שאילתות'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 15 }}>
            {/* Info Tab */}
            {activeTab === 'info' && (
              selectedNode ? (
                <div>
                  <h2 style={{ color: '#e94560', marginBottom: 10, fontSize: '1.2rem' }}>{selectedNode.name}</h2>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', marginBottom: 15, background: TYPE_COLORS[selectedNode.type], color: '#fff' }}>
                    {TYPE_HEBREW[selectedNode.type]}
                  </span>
                  <p style={{ lineHeight: 1.6, color: '#ccc', marginBottom: 15 }}>{selectedNode.meaning}</p>
                  <div style={{ borderTop: '1px solid #0f3460', paddingTop: 15 }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: 10 }}>קשרים ({getConnections(selectedNode.id).length})</h3>
                    {getConnections(selectedNode.id).map((conn, i) => (
                      <div key={i} style={{ padding: 8, background: '#0f3460', borderRadius: 6, marginBottom: 6, fontSize: '0.85rem' }}>
                        {conn.direction} {conn.label} → {conn.node?.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#666', padding: '40px 20px' }}>
                  לחץ על צומת בגרף לצפייה במידע
                </div>
              )
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {[
                    { value: nodeCount, label: 'צמתים' },
                    { value: edgeCount, label: 'קשרים' },
                    { value: density, label: 'צפיפות' },
                    { value: Object.keys(typeCounts).length, label: 'סוגים' }
                  ].map(stat => (
                    <div key={stat.label} style={{ background: '#0f3460', padding: 15, borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', color: '#e94560' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="חיפוש צומת..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: 10, border: '1px solid #0f3460', borderRadius: 6, background: '#1a1a2e', color: '#eee', marginBottom: 15 }}
                />

                <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: 10 }}>סינון לפי סוג</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {Object.keys(typeCounts).map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter(type)}
                      style={{
                        padding: '5px 12px', borderRadius: 20, fontSize: '0.75rem', cursor: 'pointer',
                        background: TYPE_COLORS[type], color: '#fff',
                        border: activeFilters.has(type) ? '2px solid #fff' : '2px solid transparent',
                        opacity: activeFilters.has(type) ? 1 : 0.4
                      }}
                    >
                      {TYPE_HEBREW[type]}
                    </button>
                  ))}
                </div>

                <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: 10 }}>התפלגות סוגים</h3>
                {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: '0.85rem' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: TYPE_COLORS[type], marginLeft: 8 }}></span>
                    <span style={{ flex: 1 }}>{TYPE_HEBREW[type]}</span>
                    <span style={{ color: '#888' }}>{count}</span>
                  </div>
                ))}
              </div>
            )}

            {/* AI Tab */}
            {activeTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 15 }}>
                  {['מה הצומת המרכזי?', 'קשרים חשובים', 'סכם את המשמעות', 'מה חסר?'].map(q => (
                    <button
                      key={q}
                      onClick={() => sendAIQuery(q)}
                      style={{ background: '#0f3460', border: 'none', color: '#aaa', padding: '6px 12px', borderRadius: 20, fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: 15 }}>
                  {aiMessages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 12, borderRadius: 8, marginBottom: 10, fontSize: '0.9rem', lineHeight: 1.5,
                        background: msg.role === 'user' ? '#0f3460' : msg.role === 'error' ? '#4a1a1a' : '#1a1a2e',
                        border: msg.role !== 'user' ? '1px solid #0f3460' : 'none',
                        marginLeft: msg.role === 'user' ? 20 : 0,
                        marginRight: msg.role === 'user' ? 0 : 20
                      }}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{ padding: 12, background: '#1a1a2e', border: '1px solid #0f3460', borderRadius: 8, marginRight: 20 }}>
                      <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #e94560', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                      <span style={{ marginRight: 8 }}>מעבד...</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <textarea
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIQuery(); } }}
                    placeholder="שאל שאלה על הגרף..."
                    style={{ flex: 1, padding: 10, border: '1px solid #0f3460', borderRadius: 6, background: '#1a1a2e', color: '#eee', resize: 'none', height: 50, fontFamily: 'inherit' }}
                  />
                  <button
                    onClick={() => sendAIQuery()}
                    style={{ background: '#0f3460', color: '#eee', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', alignSelf: 'flex-end' }}
                  >
                    שלח
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover { background: #e94560 !important; }
      `}</style>
    </div>
  );
}
```

## בדיקה לפני פלט (רשימת בקרה)

לפני יצירת ה-Artifact, לוודא:

- [ ] 10-15 צמתים (לא יותר מ-18)
- [ ] עד 24 קשתות
- [ ] עד 3 צמתי cultural_value
- [ ] כל צומת מחובר (אין יתומים)
- [ ] `name` ו-`meaning` בעברית
- [ ] `type` מהרשימה המוגדרת (באנגלית)
- [ ] `label` בקשתות באנגלית lowercase
- [ ] החלפת `__GRAPH_DATA__` ב-JSON אמיתי
- [ ] החלפת `__GRAPH_TITLE__` בשם הנכס

## דוגמה מלאה

כשמשתמש אומר "kg" אחרי הערכת CBSA של "בית הבד של כפר תבור":

**JSON שנבנה:**
```json
{
  "metadata": {
    "title": "בית הבד של כפר תבור - גרף ידע",
    "created": "2026-01-25",
    "source": "CBSA Assessment"
  },
  "nodes": [
    {"id": "asset_1", "name": "בית הבד", "type": "asset", "meaning": "נכס המורשת המרכזי — בית בד היסטורי לייצור שמן זית"},
    {"id": "place_1", "name": "כפר תבור", "type": "place", "meaning": "הכפר הגלילי שבו ממוקם בית הבד"},
    {"id": "group_1", "name": "משפחת אל-עומרי", "type": "group", "meaning": "המשפחה שהקימה והפעילה את בית הבד"},
    {"id": "period_1", "name": "התקופה העות'מאנית", "type": "period", "meaning": "תקופת הבנייה והפעילות העיקרית 1870-1917"},
    {"id": "event_1", "name": "הנטישה ב-1948", "type": "event", "meaning": "סגירת בית הבד בעקבות מלחמת העצמאות"},
    {"id": "value_1", "name": "ערך היסטורי", "type": "cultural_value", "meaning": "עדות לכלכלה חקלאית מסורתית בגליל"},
    {"id": "value_2", "name": "ערך טכנולוגי", "type": "cultural_value", "meaning": "שימור טכניקות עתיקות של הפקת שמן"}
  ],
  "edges": [
    {"from": "asset_1", "to": "place_1", "label": "located_in"},
    {"from": "asset_1", "to": "group_1", "label": "built_by"},
    {"from": "asset_1", "to": "period_1", "label": "part_of"},
    {"from": "asset_1", "to": "event_1", "label": "transformed_into"},
    {"from": "asset_1", "to": "value_1", "label": "expresses_value"},
    {"from": "asset_1", "to": "value_2", "label": "expresses_value"},
    {"from": "group_1", "to": "place_1", "label": "located_in"}
  ]
}
```

**פלט:** Artifact React (.jsx) אינטראקטיבי עם הגרף המלא.

## פונקציות כלולות בתבנית

| פונקציה | תיאור |
|---------|--------|
| גרירת צמתים | D3 drag behavior |
| זום ופאן | D3 zoom behavior |
| לחיצה על צומת | מציג מידע בפאנל צד |
| חיפוש צמתים | סינון לפי טקסט |
| סינון לפי סוג | כפתורי צ'יפס צבעוניים |
| אנליטיקה | סטטיסטיקות ותפלגות |
| AI שאילתות | שליחה ל-Claude API |
| ייצוא JSON | הורדת הנתונים |
| מקרא | לפי סוגי הצמתים הפעילים |
