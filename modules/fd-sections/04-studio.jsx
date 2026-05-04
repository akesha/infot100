// Section 04 — Demo round 3 · open studio (15 min)
// Visitors come and go. Capture who came + one thing they said.
// Free-form list — students add as many as they get.

(function () {
  function FDSectionStudio() {
    const KEY = 'fd:04-studio:visitors';
    const [visitors, setVisitors] = React.useState([]);
    const [draftName, setDraftName] = React.useState('');
    const [draftNote, setDraftNote] = React.useState('');

    React.useEffect(() => {
      try {
        const v = localStorage.getItem(KEY);
        if (v) {
          const parsed = JSON.parse(v);
          if (Array.isArray(parsed)) setVisitors(parsed);
        }
      } catch (e) {}
    }, []);

    const persist = (next) => {
      setVisitors(next);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
    };

    const add = () => {
      if (!draftName.trim()) return;
      persist([...visitors, { name: draftName.trim(), note: draftNote.trim() }]);
      setDraftName('');
      setDraftNote('');
    };

    const remove = (i) => {
      persist(visitors.filter((_, idx) => idx !== i));
    };

    return (
      <div style={s.root}>
        <div style={s.kicker}>④ ROUND 3 · 15 MIN · OPEN STUDIO</div>
        <h1 style={s.h1}>
          Round 3 — <em style={s.em}>open studio</em>.
        </h1>
        <p style={s.lede}>
          Music on. You stand or sit at your station. Anyone in the room can visit anyone. The
          strongest projects pull crowds. The quietest get focused TA attention. Both are correct
          outcomes. Capture who came by — names + one thing they said.
        </p>

        <div style={s.addCard}>
          <div style={s.addLbl}>ADD A VISITOR</div>
          <div style={s.addGrid}>
            <input
              type="text"
              style={s.input}
              placeholder="Name"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
              aria-label="Visitor name"
            />
            <input
              type="text"
              style={s.input}
              placeholder="One thing they said"
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
              aria-label="One thing they said"
            />
            <button type="button" style={s.btn} onClick={add}>+ Add</button>
          </div>
        </div>

        {visitors.length === 0 ? (
          <div style={s.empty}>
            <p style={s.emptyTxt}>No visitors yet. The first one is usually the hardest — once one stops by, more follow.</p>
          </div>
        ) : (
          <ul style={s.list}>
            {visitors.map((v, i) => (
              <li key={i} style={s.item}>
                <div style={s.itemBody}>
                  <div style={s.itemName}>{v.name}</div>
                  {v.note && <div style={s.itemNote}>{v.note}</div>}
                </div>
                <button type="button" style={s.itemX} onClick={() => remove(i)} aria-label={`Remove visitor ${v.name}`}>×</button>
              </li>
            ))}
          </ul>
        )}

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>You're standing alone after 5 minutes.</strong> A TA will notice and bring two
          students over. That's normal. The conversation that starts then is often more useful than
          a crowd of polite spectators — you get focused, real questions.
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

    addCard: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '12px 16px', marginBottom: 14 },
    addLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 8 },
    addGrid: { display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 8 },
    input: { padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
    btn: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 14px', background: 'var(--ink-900)', color: 'var(--paper-50)', border: 0, borderRadius: 3, cursor: 'pointer' },

    empty: { background: 'var(--paper-50)', border: '1px dashed var(--paper-300)', borderRadius: 4, padding: '16px 18px', marginBottom: 18 },
    emptyTxt: { fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-500)', fontStyle: 'italic', margin: 0 },

    list: { listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 },
    item: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, padding: '10px 14px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 4, alignItems: 'center' },
    itemBody: { minWidth: 0 },
    itemName: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.2 },
    itemNote: { fontSize: 13, color: 'var(--ink-700)', marginTop: 2, lineHeight: 1.5 },
    itemX: { background: 'transparent', border: 0, fontSize: 18, color: 'var(--ink-300)', cursor: 'pointer', padding: '0 8px', lineHeight: 1 },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.FDSectionStudio = FDSectionStudio;
})();
