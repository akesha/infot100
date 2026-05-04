// Section 01 — Re-read your seed (10 min)
// Pull the W1 seed from localStorage if available; let the student note what
// changed since W1. The seed is allowed to have moved — that's the point.

(function () {
  function PSSectionSeed() {
    const REVISION_KEY = 'ps:01-seed:revision';
    const [revision, setRevision] = React.useState('');
    const [w1Seed, setW1Seed] = React.useState(null);

    React.useEffect(() => {
      try {
        setRevision(localStorage.getItem(REVISION_KEY) || '');
        // Try to read W1 seed from the spawn-point reflection journal as a hint.
        const sp = localStorage.getItem('reflection:spawn-point');
        if (sp) {
          try {
            const arr = JSON.parse(sp);
            if (Array.isArray(arr) && arr.some(x => x && x.trim())) {
              setW1Seed(arr.filter(x => x && x.trim()).join('\n\n'));
            }
          } catch (e) {}
        }
      } catch (e) {}
    }, []);

    const onChange = (e) => {
      const v = e.target.value;
      setRevision(v);
      try { localStorage.setItem(REVISION_KEY, v); } catch (e) {}
    };

    return (
      <div style={s.root}>
        <div style={s.kicker}>① RE-READ · 10 MIN · OBSIDIAN OPEN</div>
        <h1 style={s.h1}>
          Re-read <em style={s.em}>your seed</em>.
        </h1>
        <p style={s.lede}>
          Open Obsidian → Project/seed.md (your W1 note). Read your own words from three weeks ago.
          Slowly. Then write what changed in your head since W1 — you've done W2 Compute Time and
          W3 Setup Quest since then. The seed is allowed to have moved.
        </p>

        {w1Seed && (
          <div style={s.recall}>
            <div style={s.recallLbl}>YOUR W1 REFLECTION (read-only · for context)</div>
            <pre style={s.recallBody}>{w1Seed}</pre>
            <div style={s.recallFoot}>This is what's in your browser from W1 Spawn Point. Your full seed lives in your vault.</div>
          </div>
        )}

        <div style={s.box}>
          <label htmlFor="ps-seed-revision" style={s.lbl}>WHAT CHANGED SINCE W1</label>
          <p style={s.sub}>One paragraph. Saves to Project/seed-v04-revision.md when you copy it across.</p>
          <textarea
            id="ps-seed-revision"
            style={s.textarea}
            placeholder="Three weeks ago I thought my project was about ___. After W2 + W3 I think it's actually about ___ because…"
            value={revision}
            onChange={onChange}
          />
        </div>

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>"My seed is missing" or "I changed my mind so much it doesn't matter."</strong>
          {' '}Same fix for both: spend 90 seconds with a TA, get a new seed on a sticky note. The
          seed is allowed to be rough. The seed is not allowed to be missing.
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

    recall: { background: 'var(--terminal-900)', color: 'var(--paper-200)', padding: '14px 18px', borderRadius: 4, marginBottom: 18 },
    recallLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
    recallBody: { font: 'inherit', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--paper-100)', margin: 0, whiteSpace: 'pre-wrap', maxHeight: 200, overflowY: 'auto' },
    recallFoot: { fontSize: 11.5, color: 'var(--paper-300)', marginTop: 8, fontStyle: 'italic' },

    box: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '16px 20px', marginBottom: 18 },
    lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
    sub: { fontSize: 13, color: 'var(--ink-500)', margin: '0 0 10px', lineHeight: 1.5 },
    textarea: { width: '100%', minHeight: 110, padding: '10px 12px', font: 'inherit', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 4, resize: 'vertical', boxSizing: 'border-box' },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.PSSectionSeed = PSSectionSeed;
})();
