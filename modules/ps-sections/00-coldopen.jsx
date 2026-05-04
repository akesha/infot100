// Section 00 — Cold open · the gap (5 min)
// Frame Big Idea #1: making is iteration. The hook is one warm-up question
// that surfaces what students DON'T usually see — the un-polished side.

(function () {
  function PSSectionColdOpen() {
    const KEY = 'ps:00-coldopen:answer';
    const [answer, setAnswer] = React.useState('');

    React.useEffect(() => {
      try { const v = localStorage.getItem(KEY); if (v) setAnswer(v); } catch (e) {}
    }, []);

    const onChange = (e) => {
      const v = e.target.value;
      setAnswer(v);
      try { localStorage.setItem(KEY, v); } catch (e) {}
    };

    return (
      <div style={s.root}>
        <div style={s.kicker}>⓪ COLD OPEN · 5 MIN · LAPTOPS CLOSED</div>
        <h1 style={s.h1}>
          You've only seen the <em style={s.em}>polished</em> side.
        </h1>
        <p style={s.lede}>
          Most of you have never seen another student's first ugly draft. You see the demo, the
          repo, the polished version. That's the survivorship-biased side of CS work. Today, you
          ship the unpolished side of yours.
        </p>

        <div style={s.frame}>
          <div style={s.frameLbl}>WARM-UP</div>
          <p style={s.frameQ}>
            Name the last thing you saw shipped — by anyone, not just CS — that wasn't perfect, and
            that you respected anyway.
          </p>
          <p style={s.frameSub}>
            One sentence is enough. Saves to your browser. The point is: imperfect work doesn't
            equal bad work. Iteration is what makes good work, not initial perfection.
          </p>
          <textarea
            style={s.textarea}
            placeholder="The thing I respected even though it was rough…"
            value={answer}
            onChange={onChange}
            aria-label="Imperfect work you respected"
          />
        </div>

        <div style={s.punch}>
          <strong>By end of class</strong> you'll have shipped your own un-polished version. v0.1.
          The version we make today is not impressive. <strong>The fact that it exists is the lesson.</strong>
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
    textarea: { width: '100%', minHeight: 70, padding: '10px 12px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 4, resize: 'vertical', boxSizing: 'border-box' },

    punch: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
  };

  window.PSSectionColdOpen = PSSectionColdOpen;
})();
