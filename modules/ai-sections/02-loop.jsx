// Section 02 — The Co-pilot Loop (8 min)
// Anchor concept: 4 verbs. Frame, Probe, Verify, Own.
// Mirrors the "Debugging Loop" structure from week 6 v1 — visual continuity.

function AISectionLoop() {
  const [hover, setHover] = React.useState(null);

  const steps = [
    {
      n: 1, verb: "FRAME",
      color: "var(--signal-blue)",
      one: "Set the context AI doesn't have.",
      detail: "What class. What level. What you've tried. What 'good' looks like. AI has zero context unless you give it. The vague prompt is the bug.",
      bad: "Help me with my code.",
      good: "I'm in CS-200. I'm trying to write a recursive function in Python that counts list depth. Here's what I have. It returns 1 instead of 2 for a nested list. What am I missing?",
    },
    {
      n: 2, verb: "PROBE",
      color: "var(--signal-amber)",
      one: "Ask follow-ups. Don't accept the first answer.",
      detail: "Treat the first reply as a draft. 'Why?' 'What if X?' 'Is there a simpler way?' AI gets better the more you push. Most students stop too early.",
      bad: "Thanks!",
      good: "Why does len() not work here? Could a generator expression do it? Show me the simplest version, then the one I should actually use.",
    },
    {
      n: 3, verb: "VERIFY",
      color: "var(--signal-green)",
      one: "Run it. Read it. Don't trust it.",
      detail: "Type the code yourself, don't paste it. Check sources. AI hallucinates functions, libraries, and entire APIs. Especially in Python. Especially when confident.",
      bad: "Looks right, ship it.",
      good: "Run on my own input. Check the docs page for that function. Ask AI to explain its OWN line 4 — see if the explanation matches what the code does.",
    },
    {
      n: 4, verb: "OWN",
      color: "var(--crimson)",
      one: "Could you write this from scratch tomorrow?",
      detail: "If the answer is no, you didn't learn it — you rented it. Re-write the solution in your own words. If you can't, loop back to FRAME with a smaller question.",
      bad: "I got the right answer, moving on.",
      good: "I closed the AI tab and re-wrote it. I can name every line's job. I could teach it to a friend.",
    },
  ];

  return (
    <div style={lp.root}>
      <div style={lp.kicker}>② THE CO-PILOT LOOP · 8 MIN</div>
      <h1 style={lp.h1}>
        Four moves. <em style={lp.em}>Every time.</em>
      </h1>
      <p style={lp.lede}>
        Robin doesn't have a magic prompt. They run the same four-move loop on every AI conversation.
        Hover any step to see the difference between using AI and being used by AI.
      </p>

      <div style={lp.loop} role="list" aria-label="The Co-pilot Loop, four steps">
        {steps.map((s, i) => (
          <div
            key={s.n}
            role="listitem"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            tabIndex={0}
            style={{
              ...lp.step,
              borderColor: hover === i ? s.color : 'var(--paper-200)',
              transform: hover === i ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            <div style={{ ...lp.stepNum, color: s.color }}>0{s.n}</div>
            <div style={{ ...lp.stepVerb, color: s.color }}>{s.verb}</div>
            <div style={lp.stepOne}>{s.one}</div>
            <div style={lp.stepDetail}>{s.detail}</div>

            <div style={lp.compare}>
              <div style={lp.cmpRow}>
                <span style={{ ...lp.cmpLabel, background: 'var(--signal-red)' }}>×&nbsp;BAD</span>
                <span style={lp.cmpText}>"{s.bad}"</span>
              </div>
              <div style={lp.cmpRow}>
                <span style={{ ...lp.cmpLabel, background: s.color }}>✓&nbsp;CO-PILOT</span>
                <span style={lp.cmpText}>"{s.good}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={lp.tape}>
        <div style={lp.tapeArrow} aria-hidden="true">↻</div>
        <div style={lp.tapeBody}>
          The loop is a circle. <strong>OWN</strong> usually opens a smaller, sharper question
          that sends you back to <strong>FRAME</strong>. That's the work.
        </div>
      </div>
    </div>
  );
}

const lp = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  loop: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
  step: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    borderRadius: 6, padding: '20px 22px', transition: 'all .2s',
    cursor: 'default',
  },
  stepNum: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 },
  stepVerb: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1 },
  stepOne: { fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--ink-900)', marginBottom: 10, lineHeight: 1.3 },
  stepDetail: { fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 14 },
  compare: { display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 12, borderTop: '1px dashed var(--paper-300)' },
  cmpRow: { display: 'grid', gridTemplateColumns: '78px 1fr', gap: 10, alignItems: 'start' },
  cmpLabel: {
    color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700,
    padding: '3px 6px', borderRadius: 2, letterSpacing: '0.05em',
    textAlign: 'center', alignSelf: 'start',
  },
  cmpText: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.5, fontStyle: 'italic' },

  tape: {
    marginTop: 28, background: 'var(--paper-50)', border: '1px dashed var(--ink-300)',
    borderRadius: 4, padding: '14px 20px',
    display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14, alignItems: 'center',
  },
  tapeArrow: { fontSize: 28, color: 'var(--crimson)', textAlign: 'center', lineHeight: 1 },
  tapeBody: { fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.45, fontStyle: 'italic' },
};

window.AISectionLoop = AISectionLoop;
