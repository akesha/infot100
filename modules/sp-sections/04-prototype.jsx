// Section 04 — Cardboard Prototype Sprint (30 min · DELIVERABLE 2)
// 30-min build. Real cardboard. One constraint: solve a real problem you had this week.
// In-page scaffold: pick a problem → sketch → build → photograph → reflect.

function SPSectionPrototype() {
  const STORAGE = 'sp-prototype-v1';

  const [data, setData] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); }
    catch (e) { return {}; }
  });
  const [phase, setPhase] = React.useState(data.phase || 'pick');
  const [secs, setSecs] = React.useState(data.secs || 0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ ...data, phase, secs }));
  }, [data, phase, secs]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const phases = {
    pick: { label: '① PICK A PROBLEM', limit: 3 * 60 },
    sketch: { label: '② SKETCH', limit: 5 * 60 },
    build: { label: '③ BUILD WITH CARDBOARD', limit: 18 * 60 },
    photo: { label: '④ PHOTO + REFLECT', limit: 4 * 60 },
  };

  const advance = () => {
    const order = ['pick', 'sketch', 'build', 'photo', 'done'];
    const next = order[order.indexOf(phase) + 1];
    if (next) {
      setPhase(next);
      setSecs(0);
      setRunning(next !== 'done');
    }
  };

  const remaining = phases[phase] ? Math.max(0, phases[phase].limit - secs) : 0;
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;

  const seedProblems = [
    'My phone falls off the desk when it vibrates',
    'My headphones are always tangled in my backpack',
    'I can\'t find my keys when leaving the dorm',
    'My laptop overheats on my bed',
    'My roommate eats my snacks',
    'My textbook won\'t stay open at the right page',
    'I have nowhere to put my coffee in the lab',
    'My charger cable falls behind the desk',
  ];

  return (
    <div style={pr.root}>
      <div style={pr.kicker}>④ PROTOTYPE SPRINT · 30 MIN · DELIVERABLE 2 of 3</div>
      <h1 style={pr.h1}>
        Build something <em style={pr.em}>today</em>. With cardboard. Right now.
      </h1>
      <p style={pr.lede}>
        Solve one real problem you had this week. <strong>Cardboard, tape, hot glue, scissors.</strong>{' '}
        Optionally: a Tinkercad sketch first if it'll help. The point isn't to be precious — it's
        to make a thing your hands have touched, so the rest of the semester isn't your first time.
      </p>

      {/* Timer */}
      {phase !== 'done' && phases[phase] && (
        <div style={pr.timerBar}>
          <div style={pr.timerLbl}>{phases[phase].label}</div>
          <div style={{ ...pr.timer, color: remaining < 30 ? 'var(--signal-red)' : 'var(--ink-900)' }}>
            {m}:{s.toString().padStart(2, '0')}
          </div>
          <button onClick={() => setRunning(r => !r)} style={pr.btnGhost}>{running ? '⏸ PAUSE' : '▶ START / RESUME'}</button>
          <button onClick={advance} style={pr.btnPrimary}>NEXT PHASE →</button>
        </div>
      )}

      {phase === 'pick' && (
        <div style={pr.stage}>
          <p style={pr.stageMsg}>
            <strong>Pick ONE problem you actually had this week.</strong> Tiny is fine. Specific is better.
            Don't pick a problem you'd brag about solving — pick one that's been mildly annoying you.
          </p>
          <textarea
            style={pr.bigInput}
            rows={3}
            placeholder="My problem this week was…"
            value={data.problem || ''}
            onChange={(e) => set('problem', e.target.value)}
          />
          <div style={pr.seedHead}>STUCK? PICK ONE OF THESE:</div>
          <div style={pr.seedRow}>
            {seedProblems.map((sp, i) => (
              <button key={i} style={pr.seedBtn} onClick={() => set('problem', sp)}>
                {sp}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'sketch' && (
        <div style={pr.stage}>
          <p style={pr.stageMsg}>
            Draw it. On paper. Or in Tinkercad if it'll help you visualize 3D. Don't perfect it — just
            commit a shape to the page so your hands know what to cut.
          </p>
          <div style={pr.factRow}>
            <div style={pr.fact}>
              <div style={pr.factLbl}>YOUR PROBLEM</div>
              <div style={pr.factVal}>{data.problem || '—'}</div>
            </div>
          </div>
          <label style={pr.qLabel}>
            <span style={pr.qLbl}>What's the rough shape of your solution?</span>
            <textarea
              style={pr.textarea}
              rows={3}
              placeholder="Describe it: a box that holds X, a wedge that lifts Y, a hook that catches Z…"
              value={data.shape || ''}
              onChange={(e) => set('shape', e.target.value)}
            />
          </label>
        </div>
      )}

      {phase === 'build' && (
        <div style={pr.stage}>
          <div style={pr.bigBuild}>🔨</div>
          <p style={pr.stageMsg}>
            <strong>Get up.</strong> Walk to the materials table. Cardboard. Scissors. Tape. Build it.
          </p>
          <p style={pr.stageMsg}>
            Stuck? Use the <strong>ChompSaw</strong> for curves cardboard scissors can't handle. Use the{' '}
            <strong>Cameo 5</strong> if your shape needs precision (cuts cardboard up to ~2mm).
          </p>
          <div style={pr.checklistBox}>
            <div style={pr.checkLbl}>WHILE YOU BUILD</div>
            <ul style={pr.checkList}>
              <li>It's OK if it doesn't work the first time. That's data.</li>
              <li>Photograph the BEFORE and AFTER — phone is fine.</li>
              <li>Don't sand. Don't paint. Don't make it pretty. Make it WORK.</li>
            </ul>
          </div>
        </div>
      )}

      {phase === 'photo' && (
        <div style={pr.stage}>
          <p style={pr.stageMsg}>
            Photograph what you made. Then write 3 lines.
          </p>
          <label style={pr.qLabel}>
            <span style={pr.qLbl}>1. What worked?</span>
            <textarea style={pr.textarea} rows={2} placeholder="Even one thing." value={data.worked || ''} onChange={(e) => set('worked', e.target.value)} />
          </label>
          <label style={pr.qLabel}>
            <span style={pr.qLbl}>2. What broke / what's wrong with it?</span>
            <textarea style={pr.textarea} rows={2} placeholder="Be specific. Hot glue fails are fine." value={data.broke || ''} onChange={(e) => set('broke', e.target.value)} />
          </label>
          <label style={pr.qLabel}>
            <span style={pr.qLbl}>3. If you had 30 more minutes — what would you change?</span>
            <textarea style={pr.textarea} rows={2} placeholder="The seed of the next iteration." value={data.next || ''} onChange={(e) => set('next', e.target.value)} />
          </label>
        </div>
      )}

      {phase === 'done' && (
        <div style={pr.donePanel}>
          <div style={pr.doneTitle}>✓ FIRST PROTOTYPE SHIPPED</div>
          <div style={pr.summary}>
            <div style={pr.summaryRow}>
              <div style={pr.summaryLbl}>PROBLEM</div>
              <div style={pr.summaryVal}>{data.problem || '—'}</div>
            </div>
            <div style={pr.summaryRow}>
              <div style={pr.summaryLbl}>SHAPE</div>
              <div style={pr.summaryVal}>{data.shape || '—'}</div>
            </div>
            <div style={pr.summaryRow}>
              <div style={pr.summaryLbl}>WORKED</div>
              <div style={pr.summaryVal}>{data.worked || '—'}</div>
            </div>
            <div style={pr.summaryRow}>
              <div style={pr.summaryLbl}>BROKE</div>
              <div style={pr.summaryVal}>{data.broke || '—'}</div>
            </div>
            <div style={pr.summaryRow}>
              <div style={pr.summaryLbl}>NEXT</div>
              <div style={pr.summaryVal}>{data.next || '—'}</div>
            </div>
          </div>
          <p style={pr.doneNote}>
            That arc — <em>problem → shape → make → notice → iterate</em> — is the entire course in
            miniature. You just did it in 30 minutes. In 14 weeks, you'll do it for real.
          </p>
          <button onClick={() => { setPhase('pick'); setSecs(0); setRunning(false); }} style={pr.btnGhost}>↻ Run again with a new problem</button>
        </div>
      )}

      <div style={pr.callout}>
        <strong>Why cardboard:</strong> it's the world's fastest, cheapest 3D-printer.
        It teaches your hands the shapes BEFORE you commit 6 hours to a Bambu Lab print. Senior
        designers prototype in cardboard their entire careers.
      </div>
    </div>
  );
}

const pr = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 22px' },

  timerBar: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--paper-50)', border: '1.5px solid var(--ink-900)', borderRadius: 4, marginBottom: 14 },
  timerLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
  timer: { fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, marginLeft: 'auto', lineHeight: 1, fontVariantNumeric: 'tabular-nums' },
  btnGhost: { background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, borderRadius: 3, cursor: 'pointer' },
  btnPrimary: { background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none', padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', borderRadius: 3, cursor: 'pointer' },

  stage: { background: 'var(--paper-50)', border: '2px solid var(--ink-900)', borderRadius: 4, padding: '20px 24px', marginBottom: 14 },
  bigBuild: { fontSize: 56, lineHeight: 1, marginBottom: 8 },
  stageMsg: { fontSize: 15, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 12px' },

  bigInput: { width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', padding: '14px 16px', border: '2px solid var(--paper-300)', borderRadius: 4, background: '#fff', resize: 'vertical', lineHeight: 1.4, marginBottom: 14 },
  seedHead: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
  seedRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  seedBtn: { background: 'var(--paper-100)', color: 'var(--ink-900)', border: '1px solid var(--paper-300)', padding: '6px 10px', fontFamily: 'var(--font-body)', fontSize: 12.5, fontStyle: 'italic', borderRadius: 3, cursor: 'pointer' },

  factRow: { display: 'flex', gap: 14, marginBottom: 12, paddingBottom: 10, borderBottom: '1px dashed var(--paper-300)' },
  fact: {},
  factLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', marginBottom: 4 },
  factVal: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-900)' },

  qLabel: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
  qLbl: { fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', fontWeight: 600, color: 'var(--ink-900)' },
  textarea: { fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 12px', border: '1.5px solid var(--paper-300)', borderRadius: 3, background: '#fff', resize: 'vertical', lineHeight: 1.5 },

  checklistBox: { background: 'var(--paper-100)', borderRadius: 3, padding: '12px 16px', marginTop: 8 },
  checkLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
  checkList: { fontSize: 13, lineHeight: 1.6, color: 'var(--ink-900)', paddingLeft: 22, margin: 0 },

  donePanel: { background: 'var(--paper-50)', border: '2px solid var(--signal-green)', borderRadius: 6, padding: '20px 24px', marginBottom: 16 },
  doneTitle: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--signal-green-text)', letterSpacing: '0.18em', marginBottom: 14 },
  summary: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  summaryRow: { display: 'grid', gridTemplateColumns: '90px 1fr', gap: 12, paddingBottom: 6, borderBottom: '1px dashed var(--paper-300)' },
  summaryLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em' },
  summaryVal: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'var(--ink-900)', lineHeight: 1.4 },
  doneNote: { fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--ink-700)', lineHeight: 1.55, margin: '0 0 12px' },

  callout: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
};

window.SPSectionPrototype = SPSectionPrototype;
