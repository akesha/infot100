// Section 03 — Start Bad on Purpose (12 min)
// Live exercise. Students pick a real assignment they're avoiding,
// then write the worst-possible first paragraph in 90 seconds.
// Builds the muscle: bad start beats no start, every time.

function ProcSectionStartBad() {
  const [stage, setStage] = React.useState('setup'); // setup | timer | done
  const [task, setTask] = React.useState('');
  const [draft, setDraft] = React.useState('');
  const [seconds, setSeconds] = React.useState(90);
  const taRef = React.useRef(null);

  React.useEffect(() => {
    if (stage !== 'timer') return;
    if (seconds <= 0) { setStage('done'); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, seconds]);

  React.useEffect(() => {
    if (stage === 'timer' && taRef.current) taRef.current.focus();
  }, [stage]);

  const start = () => {
    if (!task.trim()) return;
    setSeconds(90); setDraft(''); setStage('timer');
  };
  const reset = () => { setStage('setup'); setSeconds(90); setDraft(''); };

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  return (
    <div style={sb.root}>
      <div style={sb.kicker}>③ START BAD ON PURPOSE · 12 MIN</div>
      <h1 style={sb.h1}>
        Motivation comes <em style={sb.em}>after</em> the first sentence.
      </h1>
      <p style={sb.lede}>
        You've been told it's the other way around. It isn't. The blank page is the boss fight —
        and the only known cheat code is a <strong>deliberately bad first attempt</strong>.
      </p>

      <div style={sb.rules}>
        <div style={sb.rulesHead}>THE RULES</div>
        <ol style={sb.rulesList}>
          <li>Pick a real thing you're avoiding (paper, email, application, lab write-up).</li>
          <li>You have <strong>90 seconds</strong>. Write the worst-possible first paragraph.</li>
          <li>Misspellings welcome. Cliché welcome. "I don't know what to say but" is a perfect opener.</li>
          <li>You will not show this to anyone. The only goal is <em>to have started</em>.</li>
        </ol>
      </div>

      {stage === 'setup' && (
        <div style={sb.panel}>
          <label style={sb.lbl} htmlFor="proc-task">WHAT ARE YOU GOING TO START BADLY?</label>
          <input
            id="proc-task"
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="e.g. my Y395 reflection paper"
            style={sb.input}
          />
          <button
            onClick={start}
            disabled={!task.trim()}
            style={{ ...sb.go, opacity: task.trim() ? 1 : 0.4, cursor: task.trim() ? 'pointer' : 'not-allowed' }}
          >
            ▶ BEGIN · 90 SECONDS
          </button>
        </div>
      )}

      {stage === 'timer' && (
        <div style={sb.panel}>
          <div style={sb.timerRow}>
            <div>
              <div style={sb.taskLine}>writing badly: <strong>{task}</strong></div>
              <div style={sb.wcLine}>{wordCount} words · keep going · don't backspace</div>
            </div>
            <div style={{
              ...sb.clock,
              color: seconds <= 15 ? 'var(--signal-red-text)' : 'var(--ink-900)',
              animation: seconds <= 5 ? 'shake .3s infinite' : 'none',
            }}>
              {String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}
            </div>
          </div>
          <textarea
            ref={taRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Just type. Anything. The worse the better."
            style={sb.textarea}
            aria-label="Bad first draft"
          />
        </div>
      )}

      {stage === 'done' && (
        <div style={sb.done}>
          <div style={sb.doneLbl}>◇ TIME · YOU STARTED</div>
          <div style={sb.doneStat}>
            <span style={sb.doneN}>{wordCount}</span>
            <span style={sb.doneNLbl}>words you didn't have 90 seconds ago</span>
          </div>
          <div style={sb.donePoint}>
            That's not <em>nothing</em>. That's the hardest part of the whole assignment, already done.
            The next 90 seconds will be easier. The 90 after that, easier still.
          </div>
          <div style={sb.doneActions}>
            <button onClick={reset} style={sb.again}>↺ Run another</button>
          </div>
        </div>
      )}
    </div>
  );
}

const sb = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  rules: { background: 'var(--paper-50)', border: '1px dashed var(--paper-300)', borderRadius: 4, padding: '14px 20px', marginBottom: 22 },
  rulesHead: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.18em', marginBottom: 10 },
  rulesList: { margin: 0, paddingLeft: 22, fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.7 },

  panel: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 6, padding: 22 },
  lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em', marginBottom: 8 },
  input: { width: '100%', boxSizing: 'border-box', padding: '12px 14px', fontFamily: 'var(--font-body)', fontSize: 15, border: '1.5px solid var(--paper-300)', borderRadius: 3, marginBottom: 14, background: 'var(--paper-50)' },
  go: { width: '100%', background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, padding: '14px', borderRadius: 4, letterSpacing: '0.18em' },

  timerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, paddingBottom: 12, borderBottom: '1px dashed var(--paper-300)' },
  taskLine: { fontSize: 14, color: 'var(--ink-900)', marginBottom: 4 },
  wcLine: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' },
  clock: { fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1 },
  textarea: {
    width: '100%', boxSizing: 'border-box', minHeight: 220,
    padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6,
    border: '1.5px solid var(--paper-300)', borderRadius: 3, background: 'var(--paper-50)',
    color: 'var(--ink-900)', resize: 'vertical',
  },

  done: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderLeft: '4px solid var(--signal-green-text)', borderRadius: 4, padding: '22px 26px', animation: 'fadeUp .3s ease-out' },
  doneLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', letterSpacing: '0.18em', marginBottom: 14 },
  doneStat: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 },
  doneN: { fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1, fontStyle: 'italic' },
  doneNLbl: { fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--ink-700)' },
  donePoint: { fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 16 },
  doneActions: { display: 'flex', gap: 8 },
  again: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-300)', color: 'var(--ink-900)', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700, padding: '9px 14px', borderRadius: 3, cursor: 'pointer', letterSpacing: '0.05em' },
};

window.ProcSectionStartBad = ProcSectionStartBad;
