// Section 3 — Side-by-side live demo
// Animated comparison: a code bug session next to a study-habit "bug" session,
// stepping through the same 5-stage loop. Auto-plays; can pause/scrub.

function SectionDemo() {
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const max = 5;

  // Pause auto-play if user prefers reduced motion or focuses the section.
  React.useEffect(() => {
    if (!playing) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setPlaying(false); return; }
    const t = setInterval(() => {
      setStep(s => (s + 1) % (max + 1));
    }, 2400);
    return () => clearInterval(t);
  }, [playing]);

  // Code side — terminal session
  const codeFrames = [
    { type: 'cmd', text: '$ python solution.py' },
    { type: 'err', text: 'IndexError: list index out of range\n  at line 14, in count_doubles' },
    { type: 'note', text: '# Hypothesis: loop goes one past end?' },
    { type: 'patch', text: '- for i in range(len(arr)):\n+ for i in range(len(arr) - 1):' },
    { type: 'cmd', text: '$ python solution.py' },
    { type: 'ok', text: '✓ All 12 tests pass.' },
  ];

  // Study side — bug-report session
  const studyFrames = [
    { type: 'cmd', text: '> Open a fresh issue' },
    { type: 'err', text: 'BUG: I always start CS HW the night before.\n  Symptom appears every Wed at ~10pm.' },
    { type: 'note', text: '# Hypothesis: prompt feels too vague\n  to start, so I keep punting.' },
    { type: 'patch', text: '- Plan: "do CS homework Sunday"\n+ Plan: "Sunday 6pm — write 1 sentence\n  about what the problem is asking"' },
    { type: 'cmd', text: '> Run the experiment for 1 week' },
    { type: 'ok', text: '✓ Started Sunday at 6:04pm. Done by Tue.' },
  ];

  // Slice based on current step
  const codeShown = codeFrames.slice(0, step + 1);
  const studyShown = studyFrames.slice(0, step + 1);

  const stepLabels = ['Reproduce', 'Read', 'Hypothesize', 'Fix', 'Verify', 'Done ✓'];

  return (
    <div style={dm.root}>
      <div style={dm.kicker}>③ SIDE-BY-SIDE · 12 MIN</div>
      <h1 style={dm.h1}>
        Watch the <em style={dm.em}>same loop</em><br />
        run on two bugs.
      </h1>
      <p style={dm.lede}>
        On the left: someone debugs a Python error. On the right: someone debugs their study
        habits. <strong>Same five steps. Same shape.</strong> One feels like CS work; the other
        feels personal — but the moves are identical.
      </p>

      {/* Step indicator */}
      <div style={dm.indicator} role="status" aria-live="polite" aria-atomic="true">
        <span className="sr-only">Currently on step {step + 1} of {max + 1}: {stepLabels[step]}</span>
        {stepLabels.map((lbl, i) => (
          <div key={i} style={{
            ...dm.stepPill,
            background: i <= step ? 'var(--ink-900)' : 'var(--paper-200)',
            color: i <= step ? 'var(--paper-50)' : 'var(--ink-300)',
          }}>
            <span style={dm.stepN}>{i.toString().padStart(2, '0')}</span>
            {lbl}
          </div>
        ))}
      </div>

      {/* Two terminals */}
      <div style={dm.split}>
        {/* Code terminal */}
        <div style={{ ...dm.term, background: '#0E1410' }}>
          <div style={dm.termBar}>
            <span style={{ ...dm.dot, background: '#E8553C' }} />
            <span style={{ ...dm.dot, background: '#E8A93B' }} />
            <span style={{ ...dm.dot, background: '#5DBB7E' }} />
            <span style={dm.termTitle}>~/cs200/hw3 — code bug</span>
          </div>
          <div style={dm.termBody}>
            {codeShown.map((f, i) => (
              <div key={i} style={{ ...dm.line, animation: 'fadeUp .25s ease-out' }}>
                {renderFrame(f)}
              </div>
            ))}
            {step < max && playing && <span style={dm.cursor}>▎</span>}
          </div>
        </div>

        {/* Study "terminal" — paper-themed but parallel structure */}
        <div style={{ ...dm.term, background: 'var(--paper-100)', border: '1px solid var(--paper-200)' }}>
          <div style={{ ...dm.termBar, background: 'var(--paper-200)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', letterSpacing: '0.1em' }}>◇</span>
            <span style={{ ...dm.termTitle, color: 'var(--ink-700)' }}>~/me/habits — study bug</span>
          </div>
          <div style={dm.termBody}>
            {studyShown.map((f, i) => (
              <div key={i} style={{ ...dm.line, animation: 'fadeUp .25s ease-out' }}>
                {renderFrame(f, true)}
              </div>
            ))}
            {step < max && playing && <span style={{ ...dm.cursor, color: 'var(--crimson)' }}>▎</span>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={dm.controls}>
        <button onClick={() => { setStep(0); setPlaying(true); }} style={dm.ctrlBtn} aria-label="Replay from start">↻ Replay</button>
        <button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause animation' : 'Play animation'} style={{ ...dm.ctrlBtn, background: playing ? 'var(--paper-100)' : 'var(--ink-900)', color: playing ? 'var(--ink-900)' : 'var(--paper-50)' }}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <input
          type="range"
          min="0" max={max} value={step}
          onChange={(e) => { setPlaying(false); setStep(parseInt(e.target.value)); }}
          aria-label="Scrub through demo frames"
          style={dm.scrub}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', minWidth: 80, textAlign: 'right' }}>
          frame {step + 1} / {max + 1}
        </span>
      </div>

      <div style={dm.kicker2}>
        <span className="marker-pink">Notice: the moves are the same.</span> The only difference
        is what you're looking at. CS already trained you for this — we just have to point the
        skill at yourself.
      </div>
    </div>
  );
}

function renderFrame(f, study) {
  const colors = study ? {
    cmd: 'var(--ink-900)',
    err: 'var(--signal-red)',
    note: 'var(--ink-500)',
    patch: 'var(--ink-900)',
    ok: 'var(--signal-green)',
  } : {
    cmd: '#9ED9B0',
    err: '#E8553C',
    note: '#C9B998',
    patch: '#E8A93B',
    ok: '#5DBB7E',
  };
  const prefix = {
    cmd: '$ ', err: '⚠ ', note: '', patch: '', ok: ''
  };
  const prefixVisible = !f.text.startsWith('$') && !f.text.startsWith('>') && !f.text.startsWith('#');
  return (
    <pre style={{
      margin: 0,
      fontFamily: study && f.type === 'note' ? 'var(--font-display)' : 'var(--font-mono)',
      fontSize: 12.5,
      color: colors[f.type],
      whiteSpace: 'pre-wrap',
      fontStyle: study && f.type === 'note' ? 'italic' : 'normal',
      lineHeight: 1.55,
    }}>
      {prefixVisible ? prefix[f.type] : ''}{f.text}
    </pre>
  );
}

const dm = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 32px' },
  indicator: { display: 'flex', gap: 4, marginBottom: 18, flexWrap: 'wrap' },
  stepPill: {
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
    padding: '6px 10px', borderRadius: 3, transition: 'all .2s',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  },
  stepN: { opacity: 0.6, fontSize: 9 },
  split: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 },
  term: { borderRadius: 6, overflow: 'hidden', boxShadow: '0 12px 28px -16px rgba(0,0,0,0.3)', minHeight: 360 },
  termBar: {
    background: '#1A2520', padding: '10px 12px',
    display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(0,0,0,0.2)',
  },
  dot: { width: 10, height: 10, borderRadius: '50%' },
  termTitle: { flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#7A8A82', marginRight: 30 },
  termBody: { padding: '16px 18px', minHeight: 280 },
  line: { marginBottom: 8 },
  cursor: { color: '#5DBB7E', animation: 'blink 1s steps(2) infinite', display: 'inline-block', marginTop: 4 },

  controls: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 14px', background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 4, marginBottom: 22,
  },
  ctrlBtn: {
    background: 'var(--paper-50)', border: '1px solid var(--ink-900)',
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
    color: 'var(--ink-900)', padding: '6px 12px', borderRadius: 3, cursor: 'pointer',
  },
  scrub: { flex: 1, accentColor: 'var(--crimson)' },

  kicker2: {
    fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic',
    color: 'var(--ink-700)', lineHeight: 1.4, maxWidth: 800,
    paddingLeft: 20, borderLeft: '4px solid var(--crimson)',
  },
};

window.SectionDemo = SectionDemo;
