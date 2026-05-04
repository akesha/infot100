// Section 04 — First public test (10 min)
// Two pair-observation forms. The structure is yellow=observation, pink=question.
// Both go into the student's vault Bugs/ folder.

(function () {
  function PSSectionTest() {
    const KEY = 'ps:04-test:pairs';
    const [pairs, setPairs] = React.useState([
      { name: '', observation: '', question: '' },
      { name: '', observation: '', question: '' },
    ]);

    React.useEffect(() => {
      try {
        const v = localStorage.getItem(KEY);
        if (v) {
          const parsed = JSON.parse(v);
          if (Array.isArray(parsed) && parsed.length === 2) setPairs(parsed);
        }
      } catch (e) {}
    }, []);

    const update = (i, field, value) => {
      setPairs(prev => {
        const next = prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
        return next;
      });
    };

    const ready = pairs.filter(p => p.name && p.observation && p.question).length;

    return (
      <div style={s.root}>
        <div style={s.kicker}>④ FIRST PUBLIC TEST · 10 MIN · TWO PARTNERS</div>
        <h1 style={s.h1}>
          First <em style={s.em}>public</em> test.
        </h1>
        <p style={s.lede}>
          Pair up. Show your v0.1 to one classmate. They give one observation (yellow sticky) and
          one question (pink sticky). Capture both here. Then switch — repeat with a different
          partner. Two yellow + two pink in your vault by end of section.
        </p>

        <div style={s.progress}>
          <div style={s.progressLbl}>{ready} of 2 partners captured</div>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${(ready / 2) * 100}%` }} />
          </div>
        </div>

        <div style={s.grid}>
          {pairs.map((p, i) => (
            <div key={i} style={s.card}>
              <div style={s.cardHead}>
                <span style={s.cardN}>Partner 0{i + 1}</span>
                {p.name && p.observation && p.question && <span style={s.cardDone}>✓</span>}
              </div>

              <label style={s.lbl} htmlFor={`ps-test-name-${i}`}>NAME</label>
              <input
                id={`ps-test-name-${i}`}
                type="text"
                style={s.input}
                placeholder="Classmate's first name"
                value={p.name}
                onChange={(e) => update(i, 'name', e.target.value)}
              />

              <label style={{ ...s.lbl, marginTop: 12 }} htmlFor={`ps-test-obs-${i}`}>
                <span style={s.dot} aria-hidden="true">●</span>
                <span style={s.dotLblY}>YELLOW STICKY · ONE OBSERVATION</span>
              </label>
              <textarea
                id={`ps-test-obs-${i}`}
                style={s.textarea}
                placeholder="What they noticed about your v0.1, in their words."
                value={p.observation}
                onChange={(e) => update(i, 'observation', e.target.value)}
              />

              <label style={{ ...s.lbl, marginTop: 12 }} htmlFor={`ps-test-q-${i}`}>
                <span style={{ ...s.dot, color: 'var(--signal-pink)' }} aria-hidden="true">●</span>
                <span style={s.dotLblP}>PINK STICKY · ONE QUESTION</span>
              </label>
              <textarea
                id={`ps-test-q-${i}`}
                style={s.textarea}
                placeholder="A question they have, in their words."
                value={p.question}
                onChange={(e) => update(i, 'question', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>"Looks good!"</strong> — that's not feedback. If your partner only gives you that,
          ask back: "What's the first thing you'd change if you owned this?" Specific feedback
          requires specific asks.
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

    progress: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center', marginBottom: 16, paddingBottom: 10, borderBottom: '1px dashed var(--paper-300)' },
    progressLbl: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', letterSpacing: '0.05em' },
    progressBar: { width: 120, height: 8, background: 'var(--paper-200)', borderRadius: 4, overflow: 'hidden' },
    progressFill: { height: '100%', background: 'var(--signal-green)', transition: 'width 200ms ease' },

    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginBottom: 18 },
    card: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 6, padding: '16px 18px' },
    cardHead: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 },
    cardN: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: 'var(--ink-900)' },
    cardDone: { fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--signal-green-text)' },

    lbl: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 4 },
    dot: { fontSize: 18, lineHeight: 1, color: 'var(--signal-amber)' },
    dotLblY: { color: 'var(--signal-amber-text)' },
    dotLblP: { color: 'var(--signal-pink)' },
    input: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
    textarea: { width: '100%', minHeight: 60, padding: '8px 10px', font: 'inherit', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.PSSectionTest = PSSectionTest;
})();
