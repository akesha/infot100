// Section 00 — Roll call · what's in your vault (10 min)
// The vault IS the warm-up. Students enter counts manually + see a live total.

(function () {
  function FDSectionRollCall() {
    const KEY = 'fd:00-rollcall:counts';
    const FOLDERS = [
      { id: 'weeks', label: 'Weeks/' },
      { id: 'project', label: 'Project/' },
      { id: 'bugs', label: 'Bugs/' },
      { id: 'reflections', label: 'Reflections/' },
      { id: 'sources', label: 'Sources/' },
    ];

    const [counts, setCounts] = React.useState({});

    React.useEffect(() => {
      try { const v = localStorage.getItem(KEY); if (v) setCounts(JSON.parse(v)); } catch (e) {}
    }, []);

    const update = (id, value) => {
      const n = parseInt(value, 10);
      const safe = isNaN(n) ? '' : Math.max(0, n);
      setCounts(prev => {
        const next = { ...prev, [id]: safe };
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
        return next;
      });
    };

    const total = FOLDERS.reduce((sum, f) => sum + (typeof counts[f.id] === 'number' ? counts[f.id] : 0), 0);

    return (
      <div style={s.root}>
        <div style={s.kicker}>⓪ ROLL CALL · 10 MIN · OBSIDIAN OPEN</div>
        <h1 style={s.h1}>
          Open <em style={s.em}>Obsidian</em>. Count.
        </h1>
        <p style={s.lede}>
          Eight weeks ago you didn't have a vault. Today you do. Open the file pane. Count the
          notes in each folder. The numbers themselves are the warm-up — externalization made
          visible.
        </p>

        <div style={s.totalCard}>
          <div style={s.totalLbl}>VAULT NOTES TOTAL</div>
          <div style={s.totalN}>{total}</div>
          <div style={s.totalSub}>{total === 0 ? 'Empty? Spend the next 5 minutes capturing what you remember.' : total < 8 ? 'A start. The capture habit grows from here.' : total < 20 ? 'Solid. Most students land here by W8.' : 'You externalized. The next 14 weeks are easier because of it.'}</div>
        </div>

        <div style={s.grid}>
          {FOLDERS.map(f => (
            <div key={f.id} style={s.row}>
              <span style={s.rowLbl}>{f.label}</span>
              <input
                type="number"
                min="0"
                style={s.input}
                value={typeof counts[f.id] === 'number' ? counts[f.id] : ''}
                onChange={(e) => update(f.id, e.target.value)}
                aria-label={`Number of notes in ${f.label}`}
              />
              <span style={s.rowUnit}>notes</span>
            </div>
          ))}
        </div>

        <div style={s.punch}>
          <strong>The point is not who has the most.</strong> The point is the numbers exist at all.
          A student with 6 notes who can name them all has done more than a student with 60 they
          can't find again.
        </div>
      </div>
    );
  }

  const s = {
    root: { paddingTop: 24 },
    kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
    h1: { fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
    em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
    lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

    totalCard: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '20px 24px', borderRadius: 6, marginBottom: 20, display: 'grid', gridTemplateColumns: 'auto 1fr', gridTemplateRows: 'auto auto', gridTemplateAreas: '"lbl n" "lbl sub"', columnGap: 28, rowGap: 4, alignItems: 'center' },
    totalLbl: { gridArea: 'lbl', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em' },
    totalN: { gridArea: 'n', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 64, fontWeight: 700, color: 'var(--paper-50)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' },
    totalSub: { gridArea: 'sub', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'var(--paper-200)', lineHeight: 1.4 },

    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, marginBottom: 18 },
    row: { display: 'grid', gridTemplateColumns: '1fr 80px auto', gap: 12, alignItems: 'center', padding: '10px 14px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 4 },
    rowLbl: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.05em' },
    input: { width: '100%', padding: '6px 8px', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, textAlign: 'center', boxSizing: 'border-box' },
    rowUnit: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' },

    punch: { background: 'var(--paper-100)', borderLeft: '4px solid var(--signal-amber)', padding: '12px 16px', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-700)' },
  };

  window.FDSectionRollCall = FDSectionRollCall;
})();
