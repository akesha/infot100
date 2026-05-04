// Section 06 — RE-BUDGET · ABC task list (12 min)
// Algonquin College method: write tasks, label A/B/C by urgency-importance, number within each.
// Live re-sorts to A1, A2, ... B1, B2, ... C1, C2, ...

function CTSectionRebudget() {
  const STORAGE = 'ct-abc-list-v1';
  const [tasks, setTasks] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
      { id: 1, text: 'CSCI lab 03 due 11:59pm', est: 90, label: 'A' },
      { id: 2, text: 'Read Chapter 4 (Calc)', est: 60, label: 'B' },
      { id: 3, text: 'Reply to TA email', est: 5, label: 'A' },
      { id: 4, text: 'Schedule advising meeting', est: 10, label: 'C' },
      { id: 5, text: '', est: 30, label: 'B' },
    ];
  });
  const [nextId, setNextId] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw).reduce((m, t) => Math.max(m, t.id), 0) + 1;
    } catch (e) {}
    return 6;
  });

  React.useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(tasks)); } catch (e) {}
  }, [tasks]);

  const update = (id, patch) => setTasks(ts => ts.map(t => t.id === id ? { ...t, ...patch } : t));
  const remove = (id) => setTasks(ts => ts.filter(t => t.id !== id));
  const add = () => {
    setTasks(ts => [...ts, { id: nextId, text: '', est: 30, label: 'B' }]);
    setNextId(n => n + 1);
  };
  const promote = (id) => update(id, { label: 'A' });
  const move = (id, dir) => {
    setTasks(ts => {
      const idx = ts.findIndex(t => t.id === id);
      if (idx < 0) return ts;
      const next = [...ts];
      const target = idx + dir;
      if (target < 0 || target >= ts.length) return ts;
      // only reorder within same label
      if (next[idx].label !== next[target].label) return ts;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  // ABC ordering for display: A first, then B, then C; within each label, preserve user order
  const ordered = ['A', 'B', 'C'].flatMap(L => tasks.filter(t => t.label === L).map((t, i) => ({ ...t, code: `${L}${i+1}` })));
  const totalMin = tasks.reduce((s, t) => s + (Number(t.est) || 0), 0);
  const aMin = tasks.filter(t => t.label === 'A').reduce((s, t) => s + (Number(t.est) || 0), 0);
  const fmtMin = (m) => m >= 60 ? `${(m/60).toFixed(m%60===0?0:1)} hr` : `${m} min`;

  return (
    <div style={rb.root}>
      <div style={rb.kicker}>⑥ RE-BUDGET · 12 MIN</div>
      <h1 style={rb.h1}>
        Build <em style={rb.em}>tomorrow's</em> list. In order.
      </h1>
      <p style={rb.lede}>
        The ABC method (from Algonquin College's task-list guide): every task gets a letter and
        a number. <strong>A1, A2, B1, B2, C1, C2...</strong> You don't pick what to do — your list does.
        That's the whole game.
      </p>

      <div style={rb.legend}>
        <div style={rb.legendCol}><span style={{ ...rb.legendBadge, background: '#C73E2C' }}>A</span> <span><strong>MUST</strong> be done today (deadlines, high stakes)</span></div>
        <div style={rb.legendCol}><span style={{ ...rb.legendBadge, background: '#E8A93B', color: '#16140F' }}>B</span> <span><strong>SHOULD</strong> be done today (real progress, not on fire)</span></div>
        <div style={rb.legendCol}><span style={{ ...rb.legendBadge, background: '#7E776A' }}>C</span> <span><strong>COULD</strong> wait 'til tomorrow (nice but not now)</span></div>
      </div>

      <div style={rb.list}>
        <div style={rb.listHead}>
          <div style={rb.colCode}>CODE</div>
          <div style={rb.colTask}>TASK</div>
          <div style={rb.colEst}>EST.</div>
          <div style={rb.colLbl}>LABEL</div>
          <div style={rb.colAct}></div>
        </div>
        {ordered.map((t, idx) => {
          const labelColor = { A: '#C73E2C', B: '#E8A93B', C: '#7E776A' }[t.label];
          const labelText = t.label === 'B' ? '#16140F' : '#fff';
          return (
            <div key={t.id} style={rb.row}>
              <div style={{ ...rb.code, background: labelColor, color: labelText }}>{t.code}</div>
              <input
                value={t.text}
                onChange={(e) => update(t.id, { text: e.target.value })}
                placeholder="(empty task — type or remove)"
                aria-label={`Task ${t.code}`}
                style={rb.taskInput}
              />
              <div style={rb.estWrap}>
                <input
                  type="number"
                  min="0" step="5"
                  value={t.est}
                  onChange={(e) => update(t.id, { est: parseInt(e.target.value) || 0 })}
                  aria-label="Estimate in minutes"
                  style={rb.estInput}
                />
                <span style={rb.estUnit}>min</span>
              </div>
              <div style={rb.labelGroup} role="radiogroup" aria-label="Priority label">
                {['A','B','C'].map(L => (
                  <button
                    key={L}
                    role="radio"
                    aria-checked={t.label === L}
                    onClick={() => update(t.id, { label: L })}
                    style={{
                      ...rb.lblBtn,
                      background: t.label === L ? { A:'#C73E2C', B:'#E8A93B', C:'#7E776A' }[L] : 'var(--paper-50)',
                      color: t.label === L ? (L==='B' ? '#16140F' : '#fff') : 'var(--ink-500)',
                      borderColor: t.label === L ? 'transparent' : 'var(--paper-300)',
                    }}
                  >{L}</button>
                ))}
              </div>
              <div style={rb.actions}>
                <button onClick={() => move(t.id, -1)} aria-label="Move up" style={rb.iconBtn}>↑</button>
                <button onClick={() => move(t.id, 1)} aria-label="Move down" style={rb.iconBtn}>↓</button>
                <button onClick={() => remove(t.id)} aria-label="Remove" style={{ ...rb.iconBtn, color: 'var(--signal-red)' }}>×</button>
              </div>
            </div>
          );
        })}
        <button onClick={add} style={rb.addBtn}>+ Add task</button>
      </div>

      <div style={rb.summary}>
        <div style={rb.summaryItem}>
          <div style={rb.sumLbl}>TOTAL</div>
          <div style={rb.sumVal}>{fmtMin(totalMin)}</div>
        </div>
        <div style={rb.summaryItem}>
          <div style={rb.sumLbl}>A-LIST (must today)</div>
          <div style={{ ...rb.sumVal, color: '#C73E2C' }}>{fmtMin(aMin)}</div>
        </div>
        <div style={rb.summaryItem}>
          <div style={rb.sumLbl}>BUDGET CHECK</div>
          <div style={{ ...rb.sumVal, fontSize: 18, color: aMin > 360 ? 'var(--signal-red)' : 'var(--signal-green-text)' }}>
            {aMin > 360 ? '⚠ A-list > 6 hr' : aMin > 240 ? '○ tight but doable' : '● fits the day'}
          </div>
        </div>
      </div>

      <div style={rb.callout}>
        <strong>If your A-list is more than 6 hours,</strong> something is mislabeled — or
        something has to move (cut a class? talk to an instructor? say no to the org meeting?).
        The list isn't lying. The week isn't bigger.
      </div>
    </div>
  );
}

const rb = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 760, margin: '0 0 22px' },

  legend: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 },
  legendCol: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--paper-100)', borderRadius: 4, fontSize: 12.5, color: 'var(--ink-700)' },
  legendBadge: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 3, color: '#fff', minWidth: 18, textAlign: 'center' },

  list: { background: 'var(--paper-100)', border: '2px solid var(--ink-900)', borderRadius: 4, padding: 8, marginBottom: 16 },
  listHead: { display: 'grid', gridTemplateColumns: '52px 1fr 92px 110px 80px', gap: 8, padding: '6px 8px', borderBottom: '2px solid var(--ink-900)', marginBottom: 6 },
  colCode: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  colTask: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  colEst: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  colLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  colAct: {},

  row: { display: 'grid', gridTemplateColumns: '52px 1fr 92px 110px 80px', gap: 8, alignItems: 'center', padding: '6px 8px', borderRadius: 3, marginBottom: 2 },
  code: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, padding: '6px 0', textAlign: 'center', borderRadius: 2 },
  taskInput: { width: '100%', padding: '7px 10px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3 },
  estWrap: { display: 'flex', alignItems: 'center', gap: 4 },
  estInput: { width: 50, padding: '6px 6px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3, textAlign: 'right' },
  estUnit: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)' },
  labelGroup: { display: 'flex', gap: 3 },
  lblBtn: { width: 30, height: 28, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, border: '1px solid var(--paper-300)', borderRadius: 3, cursor: 'pointer' },
  actions: { display: 'flex', gap: 2 },
  iconBtn: { width: 24, height: 24, padding: 0, background: 'transparent', border: '1px solid var(--paper-300)', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', cursor: 'pointer' },
  addBtn: { width: '100%', padding: '8px', marginTop: 6, background: 'transparent', color: 'var(--ink-500)', border: '1px dashed var(--paper-300)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' },

  summary: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 },
  summaryItem: { padding: '12px 14px', background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 4 },
  sumLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', marginBottom: 4 },
  sumVal: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--ink-900)' },

  callout: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
};

window.CTSectionRebudget = CTSectionRebudget;
