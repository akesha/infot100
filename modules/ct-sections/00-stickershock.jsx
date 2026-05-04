// Section 00 — Sticker Shock (5 min)
// Cold-water opener: ask students to estimate their weekly hours across 6 buckets,
// then reveal the totals — they almost never add up to 168.

function CTSectionShock() {
  const [estimates, setEstimates] = React.useState({
    sleep: '',
    class: '',
    homework: '',
    work: '',
    phone: '',
    other: '',
  });
  const [revealed, setRevealed] = React.useState(false);

  const buckets = [
    { id: 'sleep',    lbl: 'Sleeping',          typical: 56,  hint: 'class avg ~7 hr/night = 49' },
    { id: 'class',    lbl: 'In class',          typical: 15,  hint: '5 courses × ~3 hr' },
    { id: 'homework', lbl: 'Homework / studying', typical: 25, hint: 'CS rule of thumb: 2× class hours' },
    { id: 'work',     lbl: 'Job / work',        typical: 12,  hint: 'if you work; 0 if not' },
    { id: 'phone',    lbl: 'Phone / scrolling', typical: 28,  hint: 'check Screen Time. Be honest.' },
    { id: 'other',    lbl: 'Eating, hygiene, transit', typical: 18, hint: 'meals + showers + walking to class' },
  ];

  const total = buckets.reduce((sum, b) => {
    const v = parseFloat(estimates[b.id]);
    return sum + (isNaN(v) ? 0 : v);
  }, 0);

  const remaining = 168 - total;
  const filled = buckets.every(b => estimates[b.id] !== '');

  const update = (id, v) => {
    // numeric only, allow empty
    if (v === '' || /^\d{0,3}(\.\d{0,1})?$/.test(v)) {
      setEstimates(s => ({ ...s, [id]: v }));
    }
  };

  return (
    <div style={st.root}>
      <div style={st.kicker}>⓪ STICKER SHOCK · 5 MIN</div>
      <h1 style={st.h1}>
        You have <em style={st.em}>168</em> hours this week.
      </h1>
      <p style={st.lede}>
        That's it. Same as everyone else. Estimate where yours go — be honest, no one sees this — then
        we'll do the math.
      </p>

      <div style={st.budgetBar} aria-hidden="true">
        <div style={{ ...st.budgetFill, width: `${Math.min(100, (total / 168) * 100)}%`, background: total > 168 ? 'var(--signal-red)' : 'var(--signal-green)' }} />
        <div style={st.budgetLbl}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>
            {total.toFixed(1)}<span style={{ color: 'var(--ink-300)' }}> / 168 hr</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: remaining < 0 ? 'var(--signal-red)' : 'var(--ink-500)' }}>
            {remaining >= 0 ? `${remaining.toFixed(1)} hr unaccounted` : `${Math.abs(remaining).toFixed(1)} hr OVER`}
          </span>
        </div>
      </div>

      <div style={st.grid} role="group" aria-label="Hour estimates by category">
        {buckets.map(b => {
          const v = parseFloat(estimates[b.id]);
          const isNum = !isNaN(v);
          return (
            <div key={b.id} style={st.row}>
              <label htmlFor={`est-${b.id}`} style={st.rowLbl}>{b.lbl}</label>
              <div style={st.rowMeta}>
                <input
                  id={`est-${b.id}`}
                  type="text"
                  inputMode="decimal"
                  value={estimates[b.id]}
                  onChange={(e) => update(b.id, e.target.value)}
                  placeholder="—"
                  aria-label={`hours per week ${b.lbl}`}
                  style={st.input}
                />
                <span style={st.unit}>hr</span>
              </div>
              <div style={st.hint}>{b.hint}</div>
              {revealed && (
                <div style={st.diff}>
                  {isNum ? (
                    <span style={{ color: Math.abs(v - b.typical) < 4 ? 'var(--signal-green-text)' : 'var(--signal-red-text)' }}>
                      typical: {b.typical}{isNum && Math.abs(v - b.typical) >= 4 ? ` · off by ${(v - b.typical).toFixed(0)}` : ''}
                    </span>
                  ) : <span style={{ color: 'var(--ink-300)' }}>typical: {b.typical}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={st.actions}>
        <button onClick={() => setRevealed(true)} disabled={!filled || revealed} style={{ ...st.btn, opacity: (!filled || revealed) ? 0.4 : 1 }}>
          {revealed ? 'Compare done ↓' : 'Compare to typical →'}
        </button>
        {!filled && !revealed && <span style={st.actionHint}>fill all six to compare</span>}
      </div>

      {revealed && (
        <div style={st.reveal}>
          <div style={st.revealKick}>THE PUNCHLINE</div>
          <div style={st.revealBody}>
            Most students undercount one of three things:{' '}
            <strong>phone time</strong> (avg ~28 hr/wk),{' '}
            <strong>homework</strong> (the unwritten "2× class hours" rule), or{' '}
            <strong>"other"</strong> (commute, meals, errands eat ~18 hr).
            <br/><br/>
            If your total isn't <em>exactly 168</em>, your model of your week is wrong — and that's
            why "I don't have time" feels true even when the math says otherwise. Today fixes that.
          </div>
        </div>
      )}
    </div>
  );
}

const st = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)', fontSize: 88 },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  budgetBar: {
    position: 'relative', height: 32, background: 'var(--paper-200)', borderRadius: 4, marginBottom: 28,
    border: '1px solid var(--paper-300)', overflow: 'hidden',
  },
  budgetFill: { position: 'absolute', top: 0, left: 0, bottom: 0, transition: 'width .35s ease' },
  budgetLbl: { position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 },
  row: {
    display: 'grid', gridTemplateColumns: '1fr auto', gridTemplateRows: 'auto auto auto', gap: '4px 12px',
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '12px 14px',
  },
  rowLbl: { fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink-900)', alignSelf: 'center' },
  rowMeta: { display: 'flex', gap: 4, alignItems: 'center' },
  input: {
    width: 56, padding: '4px 6px', fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700,
    background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3, textAlign: 'right',
    color: 'var(--ink-900)',
  },
  unit: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' },
  hint: { gridColumn: '1 / -1', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', fontStyle: 'italic' },
  diff: { gridColumn: '1 / -1', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, paddingTop: 4, borderTop: '1px dashed var(--paper-300)' },

  actions: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 },
  btn: {
    background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none',
    padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer',
  },
  actionHint: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)' },

  reveal: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '20px 24px', borderRadius: 6,
    borderLeft: '4px solid var(--signal-green)',
    marginTop: 8,
  },
  revealKick: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green)', letterSpacing: '0.18em', marginBottom: 8, fontWeight: 700 },
  revealBody: { fontSize: 14.5, lineHeight: 1.65, color: 'var(--paper-100)' },
};

window.CTSectionShock = CTSectionShock;
