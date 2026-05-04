// Section 05 — Pair audit (20 min)
// Pairs trade prompts and rate each other on 4 axes.
// 4-axis rubric: SPECIFIC, SCOPED, VERIFIABLE, ETHICAL.

function AISectionPair() {
  const [scores, setScores] = React.useState({ specific: 0, scoped: 0, verifiable: 0, ethical: 0 });

  const axes = [
    {
      key: "specific",
      label: "SPECIFIC",
      color: "var(--signal-blue)",
      ask: "Could AI guess what class & assignment without hints?",
      lo: "Generic. Any class.",
      hi: "Pinpointed: course, level, specific task.",
    },
    {
      key: "scoped",
      label: "SCOPED",
      color: "var(--signal-amber)",
      ask: "Is the ask small enough to verify? Or did they ask AI to do everything?",
      lo: "Wholesale: 'write my paper'.",
      hi: "Surgical: 'critique my thesis'.",
    },
    {
      key: "verifiable",
      label: "VERIFIABLE",
      color: "var(--signal-green)",
      ask: "Can your partner check whether AI is right? Or are they trusting it blindly?",
      lo: "No way to check. Take it on faith.",
      hi: "Has a plan to verify (run it / check the source).",
    },
    {
      key: "ethical",
      label: "ETHICAL",
      color: "var(--crimson)",
      ask: "Would they be comfortable showing this prompt to the professor?",
      lo: "Asking AI to do graded work.",
      hi: "Asking AI to coach, not produce.",
    },
  ];

  const total = scores.specific + scores.scoped + scores.verifiable + scores.ethical;
  const grade = total >= 14 ? { l: 'CO-PILOT', c: 'var(--signal-green)' }
              : total >= 9  ? { l: 'GETTING THERE', c: 'var(--signal-amber)' }
              : total >= 5  ? { l: 'AUTOPILOT', c: 'var(--signal-red)' }
              : { l: '— rate the prompt —', c: 'var(--ink-300)' };

  return (
    <div style={pa.root}>
      <div style={pa.kicker}>⑤ PAIR AUDIT · 20 MIN</div>
      <h1 style={pa.h1}>
        Trade prompts. <em style={pa.em}>Rate each other.</em>
      </h1>
      <p style={pa.lede}>
        Find a partner from a <strong>different major than yours</strong> if you can. Swap your V3
        prompts. Read theirs slowly — out loud is fine. Score on the four axes below. Then talk
        about the lowest score, not the highest.
      </p>

      <div style={pa.flow}>
        <div style={pa.flowStep}><span style={pa.flowN}>1</span><span>Swap V3 prompts (5 min)</span></div>
        <div style={pa.flowArrow} aria-hidden="true">→</div>
        <div style={pa.flowStep}><span style={pa.flowN}>2</span><span>Score on the rubric (5 min)</span></div>
        <div style={pa.flowArrow} aria-hidden="true">→</div>
        <div style={pa.flowStep}><span style={pa.flowN}>3</span><span>Discuss the lowest axis (10 min)</span></div>
      </div>

      <div style={pa.rubric}>
        <div style={pa.rubricHead}>TRY IT — RATE A PROMPT (1–5)</div>
        {axes.map((a) => (
          <div key={a.key} style={pa.axis}>
            <div style={pa.axisHead}>
              <div style={{ ...pa.axisDot, background: a.color }} aria-hidden="true" />
              <div style={pa.axisLabel}>{a.label}</div>
              <div style={pa.axisAsk}>{a.ask}</div>
            </div>
            <div style={pa.axisRow}>
              <span style={pa.axisLo}>{a.lo}</span>
              <div style={pa.scale} role="radiogroup" aria-label={a.label}>
                {[1,2,3,4,5].map(n => {
                  const on = scores[a.key] === n;
                  return (
                    <button
                      key={n}
                      role="radio"
                      aria-checked={on}
                      onClick={() => setScores(s => ({ ...s, [a.key]: n }))}
                      style={{
                        ...pa.scaleBtn,
                        ...(on ? { background: a.color, color: '#fff', borderColor: a.color, transform: 'scale(1.1)' } : {}),
                      }}
                    >{n}</button>
                  );
                })}
              </div>
              <span style={pa.axisHi}>{a.hi}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...pa.score, borderColor: grade.c }}>
        <div style={pa.scoreHead}>
          <div style={pa.scoreTotal}>
            <span style={pa.scoreNum}>{total}</span>
            <span style={pa.scoreOver}>/ 20</span>
          </div>
          <div style={{ ...pa.scoreGrade, color: grade.c }}>{grade.l}</div>
        </div>
        <div style={pa.scoreBody}>
          {total === 0 && <span>Score the prompt above to see the verdict.</span>}
          {total > 0 && total < 5 && <span>The prompt is doing AI's job <em>for</em> AI. Run it back through the FRAME step.</span>}
          {total >= 5 && total < 9 && <span>It's a real prompt, but AI is steering. Add scope and a verification plan.</span>}
          {total >= 9 && total < 14 && <span>Co-pilot territory. One axis is dragging — fix that one.</span>}
          {total >= 14 && <span>You're flying the plane. AI's just on the radio. <strong>Tell your partner what they did right.</strong></span>}
        </div>
      </div>

    </div>
  );
}

const pa = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  flow: {
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '12px 18px', flexWrap: 'wrap',
  },
  flowStep: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-900)' },
  flowN: {
    width: 22, height: 22, background: 'var(--ink-900)', color: 'var(--paper-50)',
    borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
  },
  flowArrow: { color: 'var(--ink-300)', fontSize: 18, fontFamily: 'var(--font-mono)' },

  rubric: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '20px 24px', marginBottom: 22,
  },
  rubricHead: {
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.18em', color: 'var(--ink-900)',
    paddingBottom: 12, borderBottom: '2px solid var(--ink-900)', marginBottom: 18,
  },
  axis: { padding: '12px 0', borderBottom: '1px dashed var(--paper-200)' },
  axisHead: { display: 'grid', gridTemplateColumns: '12px 110px 1fr', gap: 12, alignItems: 'center', marginBottom: 10 },
  axisDot: { width: 10, height: 10, borderRadius: '50%' },
  axisLabel: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-900)' },
  axisAsk: { fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--ink-700)' },
  axisRow: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' },
  axisLo: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', textAlign: 'right' },
  axisHi: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)' },
  scale: { display: 'flex', gap: 4 },
  scaleBtn: {
    width: 32, height: 32, background: 'var(--paper-50)',
    border: '1.5px solid var(--paper-300)', color: 'var(--ink-700)',
    borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', transition: 'all .12s',
  },

  score: {
    background: 'var(--ink-900)', color: 'var(--paper-100)',
    border: '3px solid', borderRadius: 6, padding: '20px 24px', marginBottom: 24,
  },
  scoreHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  scoreTotal: { fontFamily: 'var(--font-display)', },
  scoreNum: { fontSize: 48, fontWeight: 700, color: 'var(--paper-50)', fontStyle: 'italic' },
  scoreOver: { fontSize: 18, color: 'var(--paper-300)', marginLeft: 6 },
  scoreGrade: { fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, letterSpacing: '0.15em' },
  scoreBody: { fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--paper-100)', lineHeight: 1.5, paddingTop: 12, borderTop: '1px dashed var(--paper-300)' },

  notes: {
    background: 'var(--paper-50)', border: '1px dashed var(--paper-300)',
    borderRadius: 4, padding: '12px 16px',
  },
  notesSum: { cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-700)', letterSpacing: '0.05em' },
  notesList: { fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.7, paddingLeft: 20, marginTop: 10 },
};

window.AISectionPair = AISectionPair;
