// Section 2 — The Loop
// Animated 5-step debugging loop diagram. Click steps to see code-version
// vs. study-version of the same prompt. The conceptual core of the lesson.

function SectionLoop() {
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      n: '01',
      title: 'Reproduce',
      hint: 'Make it happen on demand.',
      code: 'Run the failing test 3 times.\nDoes it always break? Or only sometimes?',
      study: 'When EXACTLY do I get stuck?\nMonday at 8pm? Right after I open Discord?',
      color: 'var(--signal-amber)',
    },
    {
      n: '02',
      title: 'Read',
      hint: 'Stack traces over feelings.',
      code: 'Read the error message.\nRead the line numbers. Read the docs.',
      study: 'What are the actual signals?\nMissed deadline. 4 tabs open. 0 lines written.',
      color: 'var(--signal-blue)',
    },
    {
      n: '03',
      title: 'Hypothesize',
      hint: 'Form a guess. Be specific.',
      code: '"I think the off-by-one is in the for loop —\n the index starts at 0, not 1."',
      study: '"I think I freeze because the prompt\n is too vague to start."',
      color: 'var(--signal-purple)',
    },
    {
      n: '04',
      title: 'Fix',
      hint: 'Smallest change that could work.',
      code: 'Change ONE thing. Run again.\nDon\'t rewrite the whole function.',
      study: 'Try ONE habit change for 1 week.\nNot 5 changes. One.',
      color: 'var(--signal-green)',
    },
    {
      n: '05',
      title: 'Verify',
      hint: 'Did the fix actually fix it?',
      code: 'Re-run the test.\nRun ALL the tests, not just one.',
      study: 'How did this week feel vs. last?\nDid the fix hold?',
      color: 'var(--signal-pink)',
    },
  ];

  const s = steps[step];

  return (
    <div style={lp.root}>
      <div style={lp.kicker}>② THE LOOP · 8 MIN</div>
      <h1 style={lp.h1}>
        The same loop devs use,<br />
        applied to <em style={lp.em}>you</em>.
      </h1>
      <p style={lp.lede}>
        Every senior dev runs this loop in their head when something breaks. We're going to
        run it on a study habit instead. Click each step.
      </p>

      {/* Loop diagram */}
      <ol style={lp.diagram} aria-label="Five debugging steps">
        {steps.map((st, i) => (
          <li key={i} style={{ display: 'contents' }}>
            <button
              onClick={() => setStep(i)}
              aria-current={step === i ? 'step' : undefined}
              aria-label={`Step ${st.n}: ${st.title}`}
              style={{
                ...lp.node,
                background: step === i ? st.color : 'var(--paper-50)',
                color: step === i ? '#fff' : 'var(--ink-700)',
                borderColor: step === i ? st.color : 'var(--paper-300)',
                animation: step === i ? 'pulse 1.5s ease-out infinite' : 'none',
              }}
            >
              <div style={lp.nodeNum}>{st.n}</div>
              <div style={lp.nodeTitle}>{st.title}</div>
            </button>
            {i < steps.length - 1 && <div style={lp.arrow} aria-hidden="true">→</div>}
          </li>
        ))}
        {/* loop-back hint */}
        <div style={lp.loopBack} aria-hidden="true">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-300)', letterSpacing: '0.1em' }}>
            ↩ loop back if needed
          </span>
        </div>
      </ol>

      {/* Detail panel */}
      <div style={{ ...lp.detail, borderTop: `4px solid ${s.color}` }} key={step}>
        <div style={lp.detailHead}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s.color, letterSpacing: '0.15em', fontWeight: 700 }}>
              STEP {s.n}
            </div>
            <h3 style={lp.detailTitle}>{s.title}</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-500)' }}>
              {s.hint}
            </div>
          </div>
        </div>

        <div style={lp.split}>
          {/* CODE side */}
          <div style={lp.codeSide}>
            <div style={lp.sideLabel}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green)', letterSpacing: '0.15em' }}>$ DEBUGGING CODE</span>
            </div>
            <pre style={lp.codeBlock}>{s.code}</pre>
          </div>

          {/* STUDY side */}
          <div style={lp.studySide}>
            <div style={lp.sideLabel}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--crimson)', letterSpacing: '0.15em' }}>◇ DEBUGGING YOURSELF</span>
            </div>
            <div style={lp.studyBlock}>{s.study}</div>
          </div>
        </div>

        <div style={lp.nav}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={lp.navBtn}>← Prev step</button>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
            {step + 1} / {steps.length}
          </span>
          <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} style={lp.navBtn}>Next step →</button>
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
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 40px' },
  diagram: { display: 'flex', alignItems: 'stretch', gap: 6, marginBottom: 28, flexWrap: 'wrap', position: 'relative' },
  node: {
    flex: '1 1 130px', minWidth: 120,
    background: 'var(--paper-50)', border: '2px solid var(--paper-300)',
    padding: '14px 12px', borderRadius: 6, cursor: 'pointer',
    fontFamily: 'inherit', textAlign: 'center',
    transition: 'all .2s',
  },
  nodeNum: { fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.7, marginBottom: 4 },
  nodeTitle: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' },
  arrow: { display: 'flex', alignItems: 'center', color: 'var(--ink-300)', fontSize: 18, padding: '0 2px' },
  loopBack: { width: '100%', textAlign: 'center', marginTop: 6 },
  detail: {
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)',
    padding: '24px 28px', borderRadius: 4,
    animation: 'fadeUp .25s ease-out',
  },
  detailHead: { marginBottom: 22 },
  detailTitle: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', margin: '4px 0 4px' },
  split: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 },
  sideLabel: { marginBottom: 10 },
  codeSide: {
    background: 'var(--terminal-900)', borderRadius: 4,
    padding: '16px 18px',
  },
  codeBlock: {
    fontFamily: 'var(--font-mono)', fontSize: 13, color: '#9ED9B0',
    whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.6,
  },
  studySide: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 4, padding: '16px 18px',
  },
  studyBlock: {
    fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic',
    color: 'var(--ink-900)', whiteSpace: 'pre-wrap', lineHeight: 1.5,
  },
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 16, borderTop: '1px dashed var(--paper-200)',
  },
  navBtn: {
    background: 'transparent', border: '1px solid var(--ink-900)',
    color: 'var(--ink-900)', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
    padding: '8px 14px', borderRadius: 3, cursor: 'pointer',
  },
};

window.SectionLoop = SectionLoop;
