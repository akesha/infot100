// Section 01 — Cold open · the loop closes (5 min)
// One textarea: what would you tell the W1 you?

(function () {
  function FDSectionColdOpen() {
    const KEY = 'fd:01-coldopen:advice';
    const [advice, setAdvice] = React.useState('');

    React.useEffect(() => {
      try { setAdvice(localStorage.getItem(KEY) || ''); } catch (e) {}
    }, []);

    const onChange = (e) => {
      const v = e.target.value;
      setAdvice(v);
      try { localStorage.setItem(KEY, v); } catch (e) {}
    };

    return (
      <div style={s.root}>
        <div style={s.kicker}>① COLD OPEN · 5 MIN · CLOSE THE LOOP</div>
        <h1 style={s.h1}>
          The Week-1 student is now <em style={s.em}>you</em>.
        </h1>
        <p style={s.lede}>
          In W1 Spawn Point, the cold open framed a Week-14 student looking back. Today you're that
          student. The loop closes itself.
        </p>

        <div style={s.frame}>
          <div style={s.frameLbl}>WRITE</div>
          <p style={s.frameQ}>
            What would you tell the Week-1 you, sitting in this room eight weeks ago?
          </p>
          <p style={s.frameSub}>
            One sentence. The strongest answer here might become next year's W1 cold open with your
            permission.
          </p>
          <textarea
            style={s.textarea}
            placeholder={`e.g. "Start the build before you feel ready. Ready isn't coming."`}
            value={advice}
            onChange={onChange}
            aria-label="What would you tell the Week-1 you"
          />
        </div>

        <div style={s.punch}>
          <strong>What you write here</strong> is your trajectory in compressed form. The Week-1
          student doesn't exist yet — but the next cohort of Week-1 students does. With your
          permission, the strongest of these become the W1 cold-open clips next year.
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

    frame: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '18px 22px', marginBottom: 18 },
    frameLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.18em', marginBottom: 8 },
    frameQ: { fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', fontWeight: 600, lineHeight: 1.3, color: 'var(--ink-900)', margin: '0 0 8px' },
    frameSub: { fontSize: 13, lineHeight: 1.55, color: 'var(--ink-500)', margin: '0 0 12px' },
    textarea: { width: '100%', minHeight: 70, padding: '10px 12px', font: 'inherit', fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 4, resize: 'vertical', boxSizing: 'border-box' },

    punch: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
  };

  window.FDSectionColdOpen = FDSectionColdOpen;
})();
