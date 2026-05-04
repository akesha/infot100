// Section 00 — The Avoidance Wall (10 min)
// Anonymous live tally: students click what they're avoiding right now.
// The room sees in real time that the wall isn't theirs alone — it's everyone's.

function ProcSectionAvoidance() {
  const items = [
    { id: 'paper',  label: 'A paper / essay',           seed: 14 },
    { id: 'pset',   label: 'A problem set',             seed: 11 },
    { id: 'email',  label: 'An email I should send',    seed: 18 },
    { id: 'study',  label: 'Studying for an exam',      seed: 9  },
    { id: 'reading',label: 'A reading I haven\u2019t opened', seed: 12 },
    { id: 'lab',    label: 'A lab / project deadline',  seed: 7  },
    { id: 'apply',  label: 'An application',            seed: 6  },
    { id: 'talk',   label: 'A hard conversation',       seed: 10 },
    { id: 'admin',  label: 'Admin (forms, FAFSA, advisor)', seed: 13 },
    { id: 'self',   label: 'Sleep / exercise / meals',  seed: 8  },
  ];

  const [counts, setCounts] = React.useState(() => Object.fromEntries(items.map(i => [i.id, i.seed])));
  const [picked, setPicked] = React.useState(null);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const max = Math.max(...Object.values(counts));

  const pick = (id) => {
    if (picked === id) return;
    setCounts(c => ({
      ...c,
      [id]: c[id] + 1,
      ...(picked ? { [picked]: c[picked] - 1 } : {}),
    }));
    setPicked(id);
  };

  return (
    <div style={aw.root}>
      <div style={aw.kicker}>00 · ICEBREAKER · THE AVOIDANCE WALL · 10 MIN</div>
      <h1 style={aw.h1}>
        What are you <em style={aw.em}>avoiding</em> right now?
      </h1>
      <p style={aw.lede}>
        Anonymous. One click. The whole room sees the same wall fill in real time.
        You are not the only one staring at <em>that thing</em> on your to-do list.
      </p>

      <div style={aw.tallyMeta} aria-live="polite">
        <span style={aw.tallyLabel}>LIVE TALLY</span>
        <span style={aw.tallyCount}>{total} responses · {Object.values(counts).filter(v => v > 0).length}/{items.length} categories</span>
      </div>

      <div style={aw.grid} role="radiogroup" aria-label="What are you avoiding right now? Pick one.">
        {items.map(it => {
          const c = counts[it.id];
          const pct = max > 0 ? (c / max) * 100 : 0;
          const isMine = picked === it.id;
          return (
            <button
              key={it.id}
              role="radio"
              aria-checked={isMine}
              onClick={() => pick(it.id)}
              style={{
                ...aw.row,
                ...(isMine ? aw.rowMine : {}),
              }}
            >
              <span style={aw.rowLbl}>{it.label}</span>
              <span style={aw.barWrap} aria-hidden="true">
                <span style={{ ...aw.bar, width: `${pct}%`, background: isMine ? 'var(--crimson)' : 'var(--ink-700)' }} />
              </span>
              <span style={{ ...aw.rowN, color: isMine ? 'var(--crimson)' : 'var(--ink-700)' }}>{c}</span>
            </button>
          );
        })}
      </div>

      {picked && (
        <div style={aw.aftermath}>
          <div style={aw.aftermathLabel}>◇ NOTICE</div>
          <div style={aw.aftermathBody}>
            You're not weird. You're not lazy. <strong>You're avoiding something specific, for a specific reason.</strong>
            Today we name the reason — because the reason tells you the fix.
          </div>
        </div>
      )}
    </div>
  );
}

const aw = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  tallyMeta: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    marginBottom: 10, paddingBottom: 8, borderBottom: '2px solid var(--ink-900)',
  },
  tallyLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.18em' },
  tallyCount: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' },

  grid: { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 },
  row: {
    display: 'grid', gridTemplateColumns: '220px 1fr 40px', alignItems: 'center', gap: 14,
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    padding: '11px 16px', borderRadius: 4, cursor: 'pointer', textAlign: 'left',
    transition: 'all .15s',
  },
  rowMine: { borderColor: 'var(--crimson)', background: 'rgba(153, 0, 0, 0.04)' },
  rowLbl: { fontSize: 14, color: 'var(--ink-900)', fontWeight: 500 },
  barWrap: { height: 18, background: 'var(--paper-50)', borderRadius: 2, position: 'relative', overflow: 'hidden' },
  bar: { position: 'absolute', left: 0, top: 0, bottom: 0, transition: 'width .3s ease-out, background .15s' },
  rowN: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textAlign: 'right' },

  aftermath: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderLeft: '4px solid var(--crimson)', padding: '20px 24px', borderRadius: 4,
    animation: 'fadeUp .3s ease-out',
  },
  aftermathLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 10 },
  aftermathBody: { fontSize: 16, color: 'var(--ink-900)', lineHeight: 1.55 },
};

window.ProcSectionAvoidance = ProcSectionAvoidance;
