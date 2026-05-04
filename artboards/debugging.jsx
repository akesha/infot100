// Artboard 3: "The Debugging Mindset" — interactive module sample
// What a single week could look like if reframed CS-natively.
// Shows: a lecture-doc that has working interactive elements,
// instead of a static Canvas page + 4 separate quizzes.

function DebuggingArtboard() {
  const [stage, setStage] = React.useState(0); // 0=intro, 1=bug-input, 2=stack-trace, 3=fix
  const [bugReport, setBugReport] = React.useState({
    symptom: "I keep telling myself I'll start the assignment 'after dinner,' then it's 11pm.",
    expected: "",
    actual: "",
    repro: [],
  });

  const reproOptions = [
    "I open the assignment in a tab",
    "I look at the prompt and feel overwhelmed",
    "I switch to a 'quick' Discord check",
    "I tell myself I'll start in 15 minutes",
    "Two hours pass",
  ];
  const toggleRepro = (s) => {
    setBugReport(b => ({
      ...b,
      repro: b.repro.includes(s) ? b.repro.filter(x => x !== s) : [...b.repro, s]
    }));
  };

  return (
    <div style={dbg.root}>
      {/* Module header — looks like a Canvas page header but better */}
      <div style={dbg.modBar}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={dbg.crumb}>INFO-T 100 / WEEK 06 /</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-900)', fontWeight: 700, letterSpacing: '0.05em' }}>
            THE DEBUGGING MINDSET
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={dbg.timeChip}>⏱ 75 min</span>
          <span style={{ ...dbg.timeChip, background: 'var(--signal-green)', color: '#fff', borderColor: 'var(--signal-green)' }}>1 deliverable</span>
          <a href="modules/debugging-mindset.html" target="_blank" rel="noopener" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
            background: 'var(--crimson)', color: '#fff', padding: '5px 10px', borderRadius: 3,
            textDecoration: 'none', border: '1px solid var(--crimson)',
          }}>
            OPEN FULL MODULE ↗
          </a>
        </div>
      </div>

      <div style={dbg.body}>
        {/* TOP — concept */}
        <div style={dbg.intro}>
          <div style={dbg.weekTag}>WEEK 06 · IN-CLASS</div>
          <h1 style={dbg.h1}>
            What if you debugged
            <br />
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' }}>yourself</em> like code?
          </h1>
          <p style={dbg.lede}>
            When code breaks, you don't shame the code — you reproduce the bug, read the
            stack trace, form a hypothesis, and fix the smallest thing first. Today we're
            going to do that to a <span className="marker">study habit</span> that's been
            costing you.
          </p>

          <div style={dbg.calloutGrid}>
            <div style={{ ...dbg.callout, background: 'rgba(216, 85, 60, 0.08)', borderColor: 'var(--signal-red)' }}>
              <div style={{ ...dbg.calloutHead, color: 'var(--signal-red)' }}>OLD MINDSET</div>
              <div style={dbg.calloutBody}>
                "I'm just lazy."<br />
                "I'm bad at school."<br />
                "Other people don't have this problem."
              </div>
            </div>
            <div style={{ ...dbg.callout, background: 'rgba(93, 187, 126, 0.10)', borderColor: 'var(--signal-green)' }}>
              <div style={{ ...dbg.calloutHead, color: 'var(--signal-green)' }}>DEBUG MINDSET</div>
              <div style={dbg.calloutBody}>
                "There's a reproducible failure."<br />
                "Let me read the stack trace."<br />
                "I'll fix the smallest thing first."
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE — bug report builder */}
        <div style={dbg.exerciseCard}>
          <div style={dbg.exerciseHead}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={dbg.stepNum}>01</span>
              <h2 style={dbg.h2}>Open an issue against yourself.</h2>
            </div>
            <div style={dbg.exTag}>FILL IN AS WE GO</div>
          </div>

          {/* Tab indicator */}
          <div style={dbg.tabs}>
            {['Symptom', 'Repro Steps', 'Hypothesis & Fix'].map((t, i) => (
              <button
                key={t}
                onClick={() => setStage(i + 1)}
                style={{
                  ...dbg.tab,
                  ...(stage === i + 1 ? dbg.tabActive : {}),
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: stage === i + 1 ? 'var(--signal-amber)' : 'var(--ink-300)', display: 'block', marginBottom: 2 }}>
                  STEP {i + 1}
                </span>
                {t}
              </button>
            ))}
          </div>

          {/* Issue form — looks like a real GitHub issue */}
          <div style={dbg.issue}>
            <div style={dbg.issueHead}>
              <span style={{ ...dbg.issueLabel, background: 'var(--signal-red)' }}>● open</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' }}>
                #001 · Bug in my study habits · opened by you, just now
              </span>
            </div>

            <div style={dbg.issueBody}>
              {/* Symptom */}
              <div style={{ ...dbg.field, ...(stage === 1 ? dbg.fieldActive : {}) }}>
                <label style={dbg.label}># Symptom</label>
                <textarea
                  value={bugReport.symptom}
                  onChange={(e) => setBugReport(b => ({ ...b, symptom: e.target.value }))}
                  placeholder="What keeps happening? Be specific. (e.g. 'I open Canvas and immediately switch to YouTube.')"
                  style={dbg.textarea}
                />
                <div style={dbg.hint}>↳ Be specific. "I procrastinate" is too vague to debug.</div>
              </div>

              {/* Repro steps — checklist */}
              <div style={{ ...dbg.field, ...(stage === 2 ? dbg.fieldActive : {}) }}>
                <label style={dbg.label}># Steps to reproduce</label>
                <div style={dbg.reproList}>
                  {reproOptions.map((s, i) => (
                    <label key={i} style={{
                      ...dbg.reproRow,
                      background: bugReport.repro.includes(s) ? 'rgba(232, 169, 59, 0.12)' : 'transparent',
                      borderColor: bugReport.repro.includes(s) ? 'var(--signal-amber)' : 'var(--paper-200)',
                    }}>
                      <input
                        type="checkbox"
                        checked={bugReport.repro.includes(s)}
                        onChange={() => toggleRepro(s)}
                        style={{ accentColor: 'var(--signal-amber)' }}
                      />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)', width: 18 }}>
                        {(i + 1).toString().padStart(2, '0')}.
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-900)' }}>{s}</span>
                    </label>
                  ))}
                </div>
                <div style={dbg.hint}>↳ Check every step you actually do. The pattern is the bug.</div>
              </div>

              {/* Hypothesis */}
              <div style={{ ...dbg.field, ...(stage === 3 ? dbg.fieldActive : {}) }}>
                <label style={dbg.label}># Hypothesis</label>
                <textarea
                  value={bugReport.expected}
                  onChange={(e) => setBugReport(b => ({ ...b, expected: e.target.value }))}
                  placeholder="What do you THINK is causing it? (e.g. 'The prompt is too vague — I don't know where to start.')"
                  style={dbg.textarea}
                />

                <label style={{ ...dbg.label, marginTop: 18 }}># Smallest fix to try this week</label>
                <textarea
                  value={bugReport.actual}
                  onChange={(e) => setBugReport(b => ({ ...b, actual: e.target.value }))}
                  placeholder="One change. Small. Testable. (e.g. 'When I open the assignment, I write 1 sentence about what it's asking — even if I don't start.')"
                  style={dbg.textarea}
                />
                <div style={dbg.hint}>↳ Like fixing code: change <strong>one thing</strong>, see what happens.</div>
              </div>
            </div>

            {/* Issue actions */}
            <div style={dbg.issueFoot}>
              <button style={dbg.btnGhost} onClick={() => setStage(Math.max(0, stage - 1))}>
                ← Back
              </button>
              <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
                {stage === 0 && "Click a tab to start →"}
                {stage > 0 && stage < 3 && `Step ${stage} of 3`}
                {stage === 3 && "🔬 Now: ship the fix. Test for 1 week. Reopen if needed."}
              </div>
              <button
                style={stage === 3 ? dbg.btnPrimary : dbg.btnGhost}
                onClick={() => stage < 3 ? setStage(stage + 1) : null}
              >
                {stage === 3 ? "Submit fix →" : "Next →"}
              </button>
            </div>
          </div>
        </div>

        {/* Pair check — peer review */}
        <div style={dbg.pairCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={dbg.stepNum}>02</span>
            <h2 style={dbg.h2}>Pair-debug.</h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 18px', maxWidth: 720 }}>
            Find a partner. Trade laptops. Read each other's bug report and ask{' '}
            <strong>one</strong> question that helps narrow the bug. That's it. No advice
            unless asked.
          </p>
          <div style={dbg.dialogue}>
            <div style={dbg.bubble}>
              <div style={dbg.bubbleName}>YOU</div>
              <div style={{ fontSize: 14, color: 'var(--ink-900)' }}>
                "I always start CS homework on the day it's due."
              </div>
            </div>
            <div style={{ ...dbg.bubble, background: 'var(--paper-100)', alignSelf: 'flex-end' }}>
              <div style={dbg.bubbleName}>PARTNER</div>
              <div style={{ fontSize: 14, color: 'var(--ink-900)' }}>
                "What happens between when it's assigned and the day before?"
              </div>
            </div>
            <div style={dbg.bubble}>
              <div style={dbg.bubbleName}>YOU</div>
              <div style={{ fontSize: 14, color: 'var(--ink-900)' }}>
                "...I keep deciding I'll do it 'tomorrow' because I'm tired tonight."
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 22, color: 'var(--crimson)', textAlign: 'center', marginTop: 8, transform: 'rotate(-1deg)' }}>
              ↑ THAT'S the bug. Now go fix it.
            </div>
          </div>
        </div>

        {/* Deliverable strip */}
        <div style={dbg.delivStrip}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="stamp" style={{ color: 'var(--signal-green)' }}>1 DELIVERABLE</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', letterSpacing: '0.05em' }}>
              FOR THIS WEEK ·  no quiz, no busywork
            </span>
          </div>
          <div style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink-900)', fontWeight: 600 }}>
            Submit your bug report (the issue you just wrote, finished).
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-500)' }}>
            Next week: re-open the issue and report whether the fix held.
          </div>
        </div>
      </div>

      {/* Right rail — what changed */}
      <aside style={dbg.rail}>
        <div style={dbg.railHead}>WHAT CHANGED</div>
        <div style={dbg.railItem}>
          <div style={dbg.railOld}>BEFORE</div>
          <div style={dbg.railOldText}>
            Lecture on procrastination<br />
            + 25-pt assignment<br />
            + 40-pt participation<br />
            + makeup activity
          </div>
        </div>
        <div style={dbg.railItem}>
          <div style={dbg.railNew}>NOW</div>
          <div style={dbg.railNewText}>
            One in-class exercise.<br />
            One submitted artifact.<br />
            One peer interaction.<br />
            One thing to try this week.
          </div>
        </div>
        <div style={dbg.railTip}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-amber)', letterSpacing: '0.15em', marginBottom: 6 }}>
            ◇ DESIGN NOTE
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.5 }}>
            The metaphor (debugging) is something they'll <em>use</em> in CS 200.
            Reusing it here means the study skill and the CS skill reinforce each other.
          </div>
        </div>
      </aside>
    </div>
  );
}

const dbg = {
  root: {
    width: 1280,
    minHeight: 1750,
    background: 'var(--paper-50)',
    fontFamily: 'var(--font-body)',
    color: 'var(--ink-900)',
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gridTemplateRows: 'auto 1fr',
  },
  modBar: {
    gridColumn: '1 / 3',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 40px',
    background: 'var(--ink-900)',
    color: 'var(--paper-100)',
  },
  crumb: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--paper-300)',
    letterSpacing: '0.1em',
  },
  timeChip: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    border: '1px solid var(--paper-300)',
    color: 'var(--paper-100)',
    padding: '4px 8px',
    borderRadius: 3,
    letterSpacing: '0.05em',
  },
  body: {
    padding: '52px 56px 80px',
  },
  intro: {
    marginBottom: 56,
  },
  weekTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--crimson)',
    letterSpacing: '0.18em',
    marginBottom: 20,
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 60,
    fontWeight: 600,
    letterSpacing: '-0.025em',
    margin: '0 0 24px',
    lineHeight: 1.0,
  },
  lede: {
    fontSize: 17,
    lineHeight: 1.55,
    color: 'var(--ink-700)',
    maxWidth: 680,
    margin: '0 0 40px',
  },
  calloutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    maxWidth: 720,
  },
  callout: {
    padding: '20px 22px',
    border: '1px solid',
    borderRadius: 6,
  },
  calloutHead: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.15em',
    marginBottom: 10,
  },
  calloutBody: {
    fontFamily: 'var(--font-body)',
    fontSize: 14.5,
    lineHeight: 1.7,
    color: 'var(--ink-900)',
  },

  exerciseCard: {
    background: 'var(--paper-100)',
    border: '1px solid var(--paper-200)',
    borderRadius: 8,
    padding: '32px 32px 28px',
    marginBottom: 32,
    boxShadow: 'var(--shadow-paper)',
  },
  exerciseHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepNum: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: 600,
    color: 'var(--crimson)',
    lineHeight: 1,
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    margin: 0,
  },
  exTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--ink-500)',
    letterSpacing: '0.18em',
    border: '1px dashed var(--paper-300)',
    padding: '6px 10px',
    borderRadius: 999,
  },
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    background: 'var(--paper-50)',
    border: '1px solid var(--paper-200)',
    borderRadius: 4,
    padding: '12px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--ink-500)',
    cursor: 'pointer',
    textAlign: 'left',
  },
  tabActive: {
    background: 'var(--ink-900)',
    color: 'var(--paper-50)',
    borderColor: 'var(--ink-900)',
  },

  issue: {
    background: 'var(--paper-50)',
    border: '1px solid var(--paper-200)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  issueHead: {
    padding: '12px 18px',
    background: 'var(--paper-100)',
    borderBottom: '1px solid var(--paper-200)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  issueLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    padding: '3px 8px',
    borderRadius: 999,
    letterSpacing: '0.05em',
  },
  issueBody: {
    padding: '20px 22px 22px',
  },
  field: {
    padding: '14px 16px',
    borderRadius: 4,
    transition: 'background .15s',
    marginBottom: 10,
  },
  fieldActive: {
    background: 'rgba(232, 169, 59, 0.06)',
  },
  label: {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--ink-900)',
    marginBottom: 8,
    letterSpacing: '0.02em',
  },
  textarea: {
    width: '100%',
    minHeight: 64,
    padding: '12px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    color: 'var(--ink-900)',
    background: 'var(--paper-50)',
    border: '1px solid var(--paper-200)',
    borderRadius: 4,
    resize: 'vertical',
    lineHeight: 1.5,
    outline: 'none',
  },
  hint: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--ink-500)',
    marginTop: 8,
    fontStyle: 'italic',
  },
  reproList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  reproRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    border: '1px solid',
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'all .15s',
  },
  issueFoot: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    background: 'var(--paper-100)',
    borderTop: '1px solid var(--paper-200)',
  },
  btnGhost: {
    background: 'transparent',
    border: '1px solid var(--ink-900)',
    color: 'var(--ink-900)',
    padding: '8px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.05em',
    borderRadius: 3,
    cursor: 'pointer',
  },
  btnPrimary: {
    background: 'var(--signal-green)',
    border: '1px solid var(--signal-green)',
    color: '#fff',
    padding: '8px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.05em',
    borderRadius: 3,
    cursor: 'pointer',
  },

  pairCard: {
    background: 'var(--paper-50)',
    border: '1px solid var(--paper-200)',
    borderRadius: 8,
    padding: '28px 30px',
    marginBottom: 32,
  },
  dialogue: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: 600,
  },
  bubble: {
    background: 'rgba(77, 124, 199, 0.08)',
    border: '1px solid var(--paper-200)',
    borderRadius: 12,
    padding: '12px 16px',
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  bubbleName: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    color: 'var(--ink-500)',
    letterSpacing: '0.15em',
    marginBottom: 4,
  },

  delivStrip: {
    background: 'var(--ink-900)',
    color: 'var(--paper-50)',
    padding: '24px 28px',
    borderRadius: 8,
    boxShadow: 'var(--shadow-paper)',
  },

  rail: {
    background: 'var(--paper-100)',
    borderLeft: '1px solid var(--paper-200)',
    padding: '52px 24px',
  },
  railHead: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--ink-900)',
    letterSpacing: '0.18em',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '2px solid var(--ink-900)',
  },
  railItem: {
    marginBottom: 22,
  },
  railOld: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--signal-red)',
    letterSpacing: '0.15em',
    marginBottom: 8,
    fontWeight: 700,
  },
  railOldText: {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    color: 'var(--ink-500)',
    textDecoration: 'line-through',
    lineHeight: 1.55,
  },
  railNew: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--signal-green)',
    letterSpacing: '0.15em',
    marginBottom: 8,
    fontWeight: 700,
  },
  railNewText: {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: 'var(--ink-900)',
    fontWeight: 500,
    lineHeight: 1.55,
  },
  railTip: {
    marginTop: 32,
    padding: '16px 14px',
    background: 'var(--paper-50)',
    border: '1px solid var(--paper-200)',
    borderRadius: 4,
  },
};

window.DebuggingArtboard = DebuggingArtboard;
