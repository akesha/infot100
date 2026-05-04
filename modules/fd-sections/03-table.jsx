// Section 03 — Demo round 2 · table of 4 (20 min)
// Capture observations from up to 3 other table-mates (4 students, 3 of them
// are not you). Hard-stop signal mentioned.

(function () {
  function FDSectionTable() {
    const KEY = 'fd:03-table:peers';
    const [peers, setPeers] = React.useState([
      { name: '', note: '' },
      { name: '', note: '' },
      { name: '', note: '' },
    ]);

    React.useEffect(() => {
      try {
        const v = localStorage.getItem(KEY);
        if (v) {
          const parsed = JSON.parse(v);
          if (Array.isArray(parsed) && parsed.length === 3) setPeers(parsed);
        }
      } catch (e) {}
    }, []);

    const update = (i, field, value) => {
      setPeers(prev => {
        const next = prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
        return next;
      });
    };

    const ready = peers.filter(p => p.name && p.note).length;

    return (
      <div style={s.root}>
        <div style={s.kicker}>③ ROUND 2 · 20 MIN · TABLE OF 4 · 3 MIN EACH</div>
        <h1 style={s.h1}>
          Round 2 — <em style={s.em}>table</em>.
        </h1>
        <p style={s.lede}>
          Tables of 4. Each student gets 3 minutes: 2 min demo, 1 min Q&amp;A. Hard-stop signal at
          3 min — the bell, the music change, whatever your facilitator picked. Without the
          signal, every round leaks 6+ minutes per table and dies. Capture one observation from
          each of the other three.
        </p>

        <div style={s.progress}>
          <div style={s.progressLbl}>{ready} of 3 peers captured</div>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${(ready / 3) * 100}%` }} />
          </div>
        </div>

        <div style={s.list}>
          {peers.map((p, i) => (
            <div key={i} style={s.row}>
              <div style={s.rowHead}>
                <span style={s.rowN}>Peer {i + 1}</span>
                {p.name && p.note && <span style={s.rowDone}>✓</span>}
              </div>
              <div style={s.rowGrid}>
                <input
                  type="text"
                  style={s.input}
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => update(i, 'name', e.target.value)}
                  aria-label={`Peer ${i + 1} name`}
                />
                <input
                  type="text"
                  style={s.input}
                  placeholder="Their one observation about your v1"
                  value={p.note}
                  onChange={(e) => update(i, 'note', e.target.value)}
                  aria-label={`Peer ${i + 1} observation`}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>One person dominating the table.</strong> If that's you, ask the quietest peer for
          their observation directly. If it's someone else, the facilitator probably noticed and
          will redirect — but you can too. The 3-minute hard stop is the boundary that protects
          everyone.
        </div>
      </div>
    );
  }

  const s = {
    root: { paddingTop: 24 },
    kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
    h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
    em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
    lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

    progress: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: '1px dashed var(--paper-300)' },
    progressLbl: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', letterSpacing: '0.05em' },
    progressBar: { width: 120, height: 8, background: 'var(--paper-200)', borderRadius: 4, overflow: 'hidden' },
    progressFill: { height: '100%', background: 'var(--signal-green)', transition: 'width 200ms ease' },

    list: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 },
    row: { background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 4, padding: '12px 14px' },
    rowHead: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 },
    rowN: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, fontWeight: 600, color: 'var(--ink-900)' },
    rowDone: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--signal-green-text)' },
    rowGrid: { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10 },
    input: { padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.FDSectionTable = FDSectionTable;
})();
