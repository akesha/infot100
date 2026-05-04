// Section 00 — Cold open · Why a second brain (8 min)
// Frame Big Idea #4: knowledge worth keeping must be externalized. The
// in-class hook is one specific question that surfaces what students
// already can't recall without looking.

function SQSectionColdOpen() {
  const KEY = 'sq:00-coldopen:answer';
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
    <div style={co.root}>
      <div style={co.kicker}>⓪ COLD OPEN · 8 MIN · LAPTOPS CLOSED</div>
      <h1 style={co.h1}>
        Knowledge worth keeping must be <em style={co.em}>externalized</em>.
      </h1>
      <p style={co.lede}>
        Three weeks ago we found the toolbox. Two weeks ago we found the time. Today we make the
        third move that 80% of CS students never make on purpose — we externalize.
      </p>

      <div style={co.frame}>
        <div style={co.frameLbl}>BEFORE WE START</div>
        <p style={co.frameQ}>
          What did you learn in <strong>W2 Compute Time</strong> that you couldn't recall right now,
          without looking, in 60 seconds?
        </p>
        <p style={co.frameSub}>
          Type it here. Saves to your browser. The point isn't the answer — it's the moment of
          realizing that "I learned something" and "I can recall it" are not the same thing.
        </p>
        <textarea
          style={co.textarea}
          placeholder="The thing I'd have to look up…"
          value={answer}
          onChange={onChange}
          aria-label="What did you learn in W2 that you can't recall now"
        />
      </div>

      <div style={co.punch}>
        <strong>By end of class</strong> your laptop will know how to run code, and your second brain
        will know how to keep what you learned. Both matter. Skipping the second one is how juniors
        look up at Week 12 and realize they have no idea what they did in Week 4.
      </div>
    </div>
  );
}

const co = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

  frame: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '18px 22px', marginBottom: 18 },
  frameLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.18em', marginBottom: 8 },
  frameQ: { fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', fontWeight: 600, lineHeight: 1.3, color: 'var(--ink-900)', margin: '0 0 8px' },
  frameSub: { fontSize: 13, lineHeight: 1.55, color: 'var(--ink-500)', margin: '0 0 12px' },
  textarea: { width: '100%', minHeight: 80, padding: '10px 12px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 4, resize: 'vertical', boxSizing: 'border-box' },

  punch: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
};

window.SQSectionColdOpen = SQSectionColdOpen;
