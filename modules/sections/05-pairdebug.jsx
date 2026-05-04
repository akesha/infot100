// Section 5 — Pair-debug
// Rules for the in-class pair exercise. A "do" / "don't" sheet plus
// an interactive question-picker that models good debugging questions.

function SectionPairDebug() {
  const [picked, setPicked] = React.useState(null);

  const questions = [
    { q: "What happens between when it's assigned and when you start?", good: true,
      why: "Asks them to retrace steps. Helps reproduce the bug." },
    { q: "Have you tried just sitting down and doing it?", good: false,
      why: "This is advice in a question costume. They've tried." },
    { q: "When you imagine starting it, what's the first thing you avoid?", good: true,
      why: "Surfaces the specific blocker — the actual line where things break." },
    { q: "Is it really that hard for you?", good: false,
      why: "Skeptical, not curious. Shuts the conversation down." },
    { q: "If you could shrink the first step to something tiny, what would it be?", good: true,
      why: "Helps them write the patch. Smallest fix wins." },
    { q: "Why don't you just turn off your phone?", good: false,
      why: "'Just' = they already thought of it. Patronizing." },
  ];

  return (
    <div style={pd.root}>
      <div style={pd.kicker}>⑤ PAIR-DEBUG · 20 MIN</div>
      <h1 style={pd.h1}>
        Now find a partner.<br />
        Trade <em style={pd.em}>laptops.</em>
      </h1>
      <p style={pd.lede}>
        Read each other's bug report. Ask <strong>one</strong> question that helps narrow the
        bug. <span className="marker-pink">No advice unless asked.</span> The whole skill is
        helping someone see their own bug, not solving it for them.
      </p>

      {/* Do / don't sheet */}
      <div style={pd.rules}>
        <div style={{ ...pd.ruleCol, background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)' }}>
          <div style={{ ...pd.ruleHead, color: 'var(--signal-green)' }}>✓ DO</div>
          <ul style={pd.ruleList}>
            <li>Ask <strong>one</strong> open-ended question.</li>
            <li>Reflect what you heard back to them.</li>
            <li>Help them get more specific.</li>
            <li>Treat their habit like a system, not a flaw.</li>
            <li>Stay curious. The bug is interesting.</li>
          </ul>
        </div>
        <div style={{ ...pd.ruleCol, background: 'rgba(216, 85, 60, 0.06)', borderColor: 'var(--signal-red)' }}>
          <div style={{ ...pd.ruleHead, color: 'var(--signal-red)' }}>✗ DON'T</div>
          <ul style={pd.ruleList}>
            <li>Give advice they didn't ask for.</li>
            <li>Compare to your own habits.</li>
            <li>Say "you should just..."</li>
            <li>Diagnose ("sounds like ADHD…")</li>
            <li>Try to fix it before it's reproduced.</li>
          </ul>
        </div>
      </div>

      {/* Question picker */}
      <h2 style={pd.h2}>Quick check: pick the better question.</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-500)', margin: '0 0 18px' }}>
        Click any question. We'll tell you why it lands or doesn't.
      </p>
      <div style={pd.qGrid}>
        {questions.map((qq, i) => (
          <button
            key={i}
            onClick={() => setPicked(i)}
            style={{
              ...pd.qBtn,
              borderColor: picked === i ? (qq.good ? 'var(--signal-green)' : 'var(--signal-red)') : 'var(--paper-200)',
              background: picked === i ? (qq.good ? 'rgba(93,187,126,0.10)' : 'rgba(216,85,60,0.08)') : 'var(--paper-50)',
            }}
          >
            <div style={pd.qNum}>Q{i + 1}</div>
            <div style={pd.qText}>"{qq.q}"</div>
            {picked === i && (
              <div style={{
                marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--paper-300)',
                animation: 'fadeUp .25s ease-out',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                  color: qq.good ? 'var(--signal-green)' : 'var(--signal-red)',
                }}>
                  {qq.good ? '✓ GOOD QUESTION' : '✗ NOT QUITE'}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-700)', marginTop: 6, lineHeight: 1.4 }}>
                  {qq.why}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Sample dialogue */}
      <div style={pd.dialogueWrap}>
        <div style={pd.dialogueLabel}>WHAT IT SOUNDS LIKE WHEN IT WORKS</div>
        <div style={pd.dialogue}>
          <Bubble who="A" text="I always start CS homework on the day it's due." />
          <Bubble who="B" right text="What happens between when it's assigned and the day before?" />
          <Bubble who="A" text="...I keep deciding I'll do it 'tomorrow' because I'm tired tonight." />
          <Bubble who="B" right text="So 'tomorrow you' is doing the work. What if 'tonight you' just opens the file?" />
          <Bubble who="A" text="Oh. Yeah. That's actually doable." />
        </div>
        <div style={pd.dialogueOut}>
          ↑ B never gave advice. They asked questions until A saw their own fix.
        </div>
      </div>
    </div>
  );
}

function Bubble({ who, text, right }) {
  return (
    <div style={{ alignSelf: right ? 'flex-end' : 'flex-start', maxWidth: '72%' }}>
      <div style={{ ...pd.bWho, textAlign: right ? 'right' : 'left' }}>{who}</div>
      <div style={{
        ...pd.bubble,
        background: right ? 'var(--ink-900)' : 'var(--paper-100)',
        color: right ? 'var(--paper-50)' : 'var(--ink-900)',
        borderRadius: right ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
      }}>
        {text}
      </div>
    </div>
  );
}

const pd = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },
  rules: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 },
  ruleCol: { padding: '20px 22px', border: '1px solid', borderRadius: 6 },
  ruleHead: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 12 },
  ruleList: { margin: 0, paddingLeft: 20, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.7 },

  h2: { fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 6px' },
  qGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 36 },
  qBtn: {
    background: 'var(--paper-50)', border: '2px solid var(--paper-200)',
    padding: '14px 16px', borderRadius: 4, cursor: 'pointer', textAlign: 'left',
    fontFamily: 'inherit', transition: 'all .15s',
  },
  qNum: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', letterSpacing: '0.1em', marginBottom: 6 },
  qText: { fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.4 },

  dialogueWrap: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    padding: '24px 28px', borderRadius: 6,
  },
  dialogueLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', letterSpacing: '0.18em', marginBottom: 16 },
  dialogue: { display: 'flex', flexDirection: 'column', gap: 12 },
  bWho: { fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 4 },
  bubble: { padding: '10px 14px', fontSize: 14, lineHeight: 1.5 },
  dialogueOut: {
    marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--paper-300)',
    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'var(--ink-500)',
  },
};

window.SectionPairDebug = SectionPairDebug;
