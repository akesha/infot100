// Section 00 — Trust Fall icebreaker (10 min)
// Three AI answers to the same CS-101 question. One is correct, one is subtly wrong,
// one is confidently completely wrong. Students vote BEFORE the reveal.
// Sets up the central tension of the module: AI sounds right whether it is or not.

function AISectionTrustFall() {
  const [picked, setPicked] = React.useState(null);
  const [revealed, setRevealed] = React.useState(false);

  const question = "What does this Python code print? — print([1,2,3] * 2)";

  const answers = [
    {
      bot: "GPT-Style",
      tone: "confident",
      color: "var(--signal-green)",
      reply: `It prints [2, 4, 6]. The * 2 multiplies each element by 2 — this is element-wise multiplication, the standard behavior for Python lists.`,
      verdict: "wrong",
      label: "❌ Confidently incorrect",
      truth: `Python lists DON'T do element-wise multiplication. * repeats the list. The actual output is [1, 2, 3, 1, 2, 3]. (You'd need numpy for element-wise.)`,
    },
    {
      bot: "Claude-Style",
      tone: "hedging",
      color: "var(--signal-amber)",
      reply: `Multiplying a list by an integer in Python repeats the list. So [1,2,3] * 2 evaluates to [1, 2, 3, 1, 2, 3]. (If you wanted element-wise, you'd use a numpy array.)`,
      verdict: "right",
      label: "✓ Correct & flagged the gotcha",
      truth: `This is actually right. Note how it pre-emptively addresses the wrong assumption — that's a sign of a more careful answer.`,
    },
    {
      bot: "Mixed-bag",
      tone: "wrong-but-plausible",
      color: "var(--signal-red)",
      reply: `It prints [1, 2, 3] twice on separate lines:\n[1, 2, 3]\n[1, 2, 3]\nbecause * 2 is shorthand for two prints.`,
      verdict: "wrong",
      label: "❌ Confidently incorrect (different way)",
      truth: `Wrong in a creative way. * 2 is NOT shorthand for two prints. The actual output is a single list: [1, 2, 3, 1, 2, 3].`,
    },
  ];

  return (
    <div style={tf.root}>
      <div style={tf.kicker}>00 · ICEBREAKER · TRUST FALL · 10 MIN</div>
      <h1 style={tf.h1}>
        Three AIs walk into <em style={tf.em}>your homework</em>.
      </h1>
      <p style={tf.lede}>
        You ask the same Python question to three chatbots. <strong>Two are wrong. One is right.</strong>
        All three sound equally confident. Pick the one you'd trust — then we'll see.
      </p>

      <div style={tf.question} role="figure" aria-label="The question being asked to all three AIs">
        <div style={tf.qLabel}>YOU TYPE:</div>
        <div style={tf.qBody}>
          <span style={tf.qPrompt}>{'>'}</span> {question}
        </div>
      </div>

      <div style={tf.grid}>
        {answers.map((a, i) => {
          const isPicked = picked === i;
          const isCorrect = a.verdict === "right";
          return (
            <div key={i} style={tf.card}>
              <div style={tf.cardHead}>
                <div style={{ ...tf.bot, background: a.color }}>{a.bot}</div>
                <div style={tf.tone}>tone: {a.tone}</div>
              </div>
              <div style={tf.reply}>{a.reply}</div>

              {revealed ? (
                <div style={{
                  ...tf.verdict,
                  borderColor: isCorrect ? 'var(--signal-green)' : 'var(--signal-red)',
                  background: isCorrect ? 'rgba(93,187,126,0.08)' : 'rgba(216,85,60,0.06)',
                }}>
                  <div style={{
                    ...tf.verdictLabel,
                    color: isCorrect ? 'var(--signal-green)' : 'var(--signal-red)',
                  }}>{a.label}</div>
                  <div style={tf.verdictBody}>{a.truth}</div>
                </div>
              ) : (
                <button
                  onClick={() => setPicked(i)}
                  aria-pressed={isPicked}
                  style={{
                    ...tf.voteBtn,
                    ...(isPicked ? { background: 'var(--ink-900)', color: 'var(--paper-50)', borderColor: 'var(--ink-900)' } : {}),
                  }}
                >
                  {isPicked ? '✓ My pick' : 'Trust this one'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          disabled={picked === null}
          style={{ ...tf.revealBtn, opacity: picked === null ? 0.4 : 1, cursor: picked === null ? 'not-allowed' : 'pointer' }}
        >
          {picked === null ? 'Pick one above first' : '↓ REVEAL THE ANSWERS'}
        </button>
      ) : (
        <div style={tf.aftermath}>
          <div style={tf.aftermathLabel}>◇ THE TAKEAWAY</div>
          <div style={tf.aftermathBody}>
            {picked === 1
              ? <span>You picked the right one. <strong>But</strong> — could you have spotted it without knowing the answer? The other two <em>sounded</em> just as plausible. That's the problem.</span>
              : <span>You got fooled. Don't feel bad — <strong>everyone gets fooled</strong>. The answer that sounded most confident was completely wrong. That's why this module exists.</span>
            }
          </div>
          <div style={tf.handoff}>
            "AI sounds right whether it <span className="marker">is right</span> or not.<br />
            Today we learn how to tell the difference."
          </div>
        </div>
      )}

    </div>
  );
}

const tf = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  question: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '18px 22px', borderRadius: 6, marginBottom: 32,
    border: '1px solid var(--terminal-500)',
  },
  qLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
  qBody: { fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--paper-50)' },
  qPrompt: { color: 'var(--signal-green)', marginRight: 6 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 },
  card: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '18px 18px 16px', display: 'flex', flexDirection: 'column',
  },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  bot: {
    color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
    padding: '4px 10px', borderRadius: 3, letterSpacing: '0.05em',
  },
  tone: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', fontStyle: 'italic' },
  reply: {
    fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-900)',
    lineHeight: 1.55, background: 'var(--paper-50)', padding: '12px 14px',
    border: '1px solid var(--paper-200)', borderRadius: 4, whiteSpace: 'pre-line',
    flex: 1, marginBottom: 14, minHeight: 120,
  },
  voteBtn: {
    background: 'var(--paper-50)', border: '1.5px solid var(--paper-300)',
    color: 'var(--ink-900)', fontFamily: 'var(--font-mono)', fontSize: 11.5,
    fontWeight: 700, padding: '9px 12px', borderRadius: 3, cursor: 'pointer',
    letterSpacing: '0.05em', transition: 'all .15s',
  },
  verdict: {
    border: '1.5px solid', borderRadius: 4, padding: '12px 14px',
    animation: 'fadeUp .3s ease-out',
  },
  verdictLabel: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' },
  verdictBody: { fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.5 },

  revealBtn: {
    width: '100%', background: 'var(--ink-900)', color: 'var(--paper-50)',
    border: 'none', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
    padding: '14px', borderRadius: 4, letterSpacing: '0.18em', marginTop: 8,
  },

  aftermath: {
    marginTop: 8, background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderLeft: '4px solid var(--crimson)', padding: '20px 24px', borderRadius: 4,
    animation: 'fadeUp .35s ease-out',
  },
  aftermathLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 10 },
  aftermathBody: { fontSize: 16, color: 'var(--ink-900)', lineHeight: 1.55, marginBottom: 18 },
  handoff: {
    fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic',
    color: 'var(--ink-700)', lineHeight: 1.4, paddingTop: 16, borderTop: '1px dashed var(--paper-300)',
  },

  notes: {
    marginTop: 32, background: 'var(--paper-50)', border: '1px dashed var(--paper-300)',
    borderRadius: 4, padding: '12px 16px',
  },
  notesSum: { cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-700)', letterSpacing: '0.05em' },
  notesList: { fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.7, paddingLeft: 20, marginTop: 10 },
};

window.AISectionTrustFall = AISectionTrustFall;
