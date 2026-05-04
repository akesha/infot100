// Section 02 — Demo round 1 · pairs (15 min)
// Capture partner name + their one observation + their one question.

(function () {
  function FDSectionPairs() {
    const KEY = 'fd:02-pairs:partner';
    const [partner, setPartner] = React.useState({ name: '', observation: '', question: '' });

    React.useEffect(() => {
      try {
        const v = localStorage.getItem(KEY);
        if (v) setPartner(JSON.parse(v));
      } catch (e) {}
    }, []);

    const update = (field, value) => {
      setPartner(prev => {
        const next = { ...prev, [field]: value };
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
        return next;
      });
    };

    const ready = partner.name && partner.observation && partner.question;

    return (
      <div style={s.root}>
        <div style={s.kicker}>② ROUND 1 · 15 MIN · PAIRS · LOWEST STAKES</div>
        <h1 style={s.h1}>
          Round 1 — <em style={s.em}>pairs</em>.
        </h1>
        <p style={s.lede}>
          Stand up. Pair up. 5 min each direction. Each demo narrates the trajectory in three
          sentences: seed (W1) → v0.1 (W4) → v1 (today). Show the actual artifact, not slides.
        </p>

        <div style={s.constraint}>
          <strong>The artifact rule:</strong> open the actual code, the actual prototype, the
          actual document. Even broken-state. Slides are not the artifact. If your v1 is broken,
          show it broken — that's still real.
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>
            <span style={s.cardN}>Capture · your partner's feedback</span>
            {ready && <span style={s.cardDone}>✓ ready</span>}
          </div>

          <label htmlFor="fd-pair-name" style={s.lbl}>PARTNER NAME</label>
          <input
            id="fd-pair-name"
            type="text"
            style={s.input}
            placeholder="Their first name"
            value={partner.name}
            onChange={(e) => update('name', e.target.value)}
          />

          <label htmlFor="fd-pair-obs" style={{ ...s.lbl, marginTop: 12 }}>
            <span style={s.dotY} aria-hidden="true">●</span>
            <span>ONE OBSERVATION</span>
          </label>
          <textarea
            id="fd-pair-obs"
            style={s.textarea}
            placeholder="What they noticed about your v1, in their words."
            value={partner.observation}
            onChange={(e) => update('observation', e.target.value)}
          />

          <label htmlFor="fd-pair-q" style={{ ...s.lbl, marginTop: 12 }}>
            <span style={s.dotP} aria-hidden="true">●</span>
            <span>ONE QUESTION</span>
          </label>
          <textarea
            id="fd-pair-q"
            style={s.textarea}
            placeholder="A question they have, in their words."
            value={partner.question}
            onChange={(e) => update('question', e.target.value)}
          />
        </div>

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>Demo lives entirely on slides.</strong> The constraint is "show the artifact." If
          your demo is a slide deck, you're hiding from the actual thing. Open the code.
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

    constraint: { background: 'var(--paper-100)', borderLeft: '3px solid var(--signal-blue)', padding: '12px 16px', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-700)', borderRadius: 3, marginBottom: 18 },

    card: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 6, padding: '16px 20px', marginBottom: 18 },
    cardHead: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
    cardN: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: 'var(--ink-900)' },
    cardDone: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#fff', background: 'var(--signal-green)', padding: '3px 9px', borderRadius: 3, letterSpacing: '0.12em', textTransform: 'uppercase' },

    lbl: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 4 },
    dotY: { fontSize: 18, lineHeight: 1, color: 'var(--signal-amber)' },
    dotP: { fontSize: 18, lineHeight: 1, color: 'var(--signal-pink)' },
    input: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
    textarea: { width: '100%', minHeight: 60, padding: '8px 10px', font: 'inherit', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.FDSectionPairs = FDSectionPairs;
})();
