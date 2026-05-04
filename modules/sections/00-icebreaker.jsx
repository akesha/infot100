// Section 0 — Icebreaker (15 min)
// "Stack Trace Yourself" — students pick the error that hit them hardest
// this week, then trade patches with a partner. Sets up the central reframe
// (your habits are debuggable) before the cold open lands.
//
// Format: 3 phases × 5 min, instructor-led but mostly student-driven.
//   1. SOLO  — pick your error + location + fix
//   2. PAIR  — find someone with a different error, trade patch notes
//   3. CLASS — instructor reads top errors, class votes on patches

function SectionIcebreaker() {
  const errors = [
    { code: 'ERR_404', name: 'Motivation not found', tag: 'classic', emoji: '🫥' },
    { code: 'ERR_429', name: 'Too many tabs open',   tag: 'classic', emoji: '📑' },
    { code: 'ERR_500', name: 'Brain server error',   tag: 'classic', emoji: '🧠' },
    { code: 'TIMEOUT', name: 'Started homework at 11pm', tag: 'self-inflicted', emoji: '🌙' },
    { code: 'STACK_OVERFLOW', name: 'Too many things due same day', tag: 'system', emoji: '📚' },
    { code: 'SEGFAULT', name: 'Got stuck on one problem for 4hrs', tag: 'self-inflicted', emoji: '🪨' },
    { code: 'NULL_REF', name: "Couldn't find the right person to ask", tag: 'system', emoji: '🤷' },
    { code: 'CTRL_Z', name: 'Distracted by phone the whole time', tag: 'self-inflicted', emoji: '📱' },
    { code: 'PERMISSION_DENIED', name: "Didn't think I could ask for help", tag: 'mindset', emoji: '🚪' },
  ];

  const locations = [
    "the library 3rd floor",
    "my dorm bed (mistake)",
    "Wells lobby at 2am",
    "the Union food court",
    "my parent's house over break",
    "an Uber ride",
    "between two classes",
  ];

  const patches = [
    "Walked away for 10 min",
    "Asked the friend I was scared to ask",
    "Wrote it down and slept on it",
    "Phone in another room",
    "Switched to a different problem",
    "Just… started, badly",
  ];

  const tagColors = {
    'classic': 'var(--signal-blue)',
    'self-inflicted': 'var(--signal-amber)',
    'system': 'var(--signal-purple)',
    'mindset': 'var(--signal-pink)',
  };

  const [pickedError, setPickedError] = React.useState(null);
  const [pickedLoc, setPickedLoc] = React.useState(null);
  const [pickedPatch, setPickedPatch] = React.useState(null);
  const [phase, setPhase] = React.useState(1);

  const ready = pickedError !== null && pickedLoc !== null && pickedPatch !== null;

  return (
    <div style={ib.root}>
      <div style={ib.kicker}>① ICEBREAKER · 15 MIN · STACK TRACE YOURSELF</div>
      <h1 style={ib.h1}>
        Before we start: <em style={ib.em}>what broke this week?</em>
      </h1>
      <p style={ib.lede}>
        Today's about debugging your habits. Warm-up: let's debug your
        <em> last seven days</em> instead. Pick a card from each row, then we'll
        trade error logs.
      </p>

      {/* PHASE TICKER */}
      <ol style={ib.phaseRow} aria-label="Icebreaker phases">
        {[
          { n: 1, label: 'SOLO',  time: '3 min', sub: 'Pick your error' },
          { n: 2, label: 'PAIR',  time: '5 min', sub: 'Trade with a stranger' },
          { n: 3, label: 'CLASS', time: '7 min', sub: 'Top errors + vote on patches' },
        ].map((p) => (
          <li key={p.n}>
            <button
              type="button"
              onClick={() => setPhase(p.n)}
              aria-current={phase === p.n ? 'step' : undefined}
              style={{
                ...ib.phaseChip,
                ...(phase === p.n ? ib.phaseChipActive : {}),
              }}
            >
              <span style={ib.phaseN}>{p.n.toString().padStart(2, '0')}</span>
              <span style={ib.phaseLabel}>{p.label}</span>
              <span style={ib.phaseTime}>{p.time}</span>
              <span style={ib.phaseSub}>{p.sub}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* PHASE 1 — SOLO PICK */}
      {phase === 1 && (
        <div style={ib.phaseBody}>
          <div style={ib.phaseIntro}>
            <span style={ib.phaseIntroLabel}>SOLO · 3 MIN</span>
            <span style={ib.phaseIntroText}>
              Be honest. There are no wrong answers. You're picking, not writing.
            </span>
          </div>

          {/* Error picker */}
          <fieldset style={ib.fieldset}>
            <legend style={ib.legend}>① Your error this week</legend>
            <ul style={ib.errorGrid} aria-label="Possible errors">
              {errors.map((e, i) => (
                <li key={i} style={{ listStyle: 'none' }}>
                  <button
                    type="button"
                    onClick={() => setPickedError(i)}
                    aria-pressed={pickedError === i}
                    style={{
                      ...ib.errorCard,
                      ...(pickedError === i ? {
                        ...ib.errorCardActive,
                        borderColor: tagColors[e.tag],
                      } : {}),
                    }}
                  >
                    <div style={ib.errorTop}>
                      <span style={ib.errorEmoji} aria-hidden="true">{e.emoji}</span>
                      <span style={{ ...ib.errorTag, color: tagColors[e.tag], borderColor: tagColors[e.tag] }}>
                        {e.tag}
                      </span>
                    </div>
                    <div style={ib.errorCode}>{e.code}</div>
                    <div style={ib.errorName}>{e.name}</div>
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Location picker */}
          <fieldset style={ib.fieldset}>
            <legend style={ib.legend}>② Where it happened</legend>
            <ul style={ib.chipRow} aria-label="Locations">
              {locations.map((loc, i) => (
                <li key={i} style={{ listStyle: 'none' }}>
                  <button
                    type="button"
                    onClick={() => setPickedLoc(i)}
                    aria-pressed={pickedLoc === i}
                    style={{
                      ...ib.chip,
                      ...(pickedLoc === i ? ib.chipActive : {}),
                    }}
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Patch picker */}
          <fieldset style={ib.fieldset}>
            <legend style={ib.legend}>③ One thing that worked, even partially</legend>
            <ul style={ib.chipRow} aria-label="Patches">
              {patches.map((p, i) => (
                <li key={i} style={{ listStyle: 'none' }}>
                  <button
                    type="button"
                    onClick={() => setPickedPatch(i)}
                    aria-pressed={pickedPatch === i}
                    style={{
                      ...ib.chip,
                      ...(pickedPatch === i ? { ...ib.chipActive, background: 'var(--signal-green)', borderColor: 'var(--signal-green)' } : {}),
                    }}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Card preview */}
          <div style={{ marginTop: 32 }}>
            <div style={ib.cardLabel}>YOUR ERROR LOG (this is what you'll show your partner)</div>
            <StackTraceCard
              error={pickedError !== null ? errors[pickedError] : null}
              loc={pickedLoc !== null ? locations[pickedLoc] : null}
              patch={pickedPatch !== null ? patches[pickedPatch] : null}
              tagColor={pickedError !== null ? tagColors[errors[pickedError].tag] : 'var(--ink-300)'}
            />
          </div>

          <div style={ib.next}>
            <button
              type="button"
              disabled={!ready}
              onClick={() => setPhase(2)}
              style={{
                ...ib.nextBtn,
                ...(ready ? {} : ib.nextBtnDisabled),
              }}
            >
              {ready ? 'I\'ve got my log → find a partner' : 'Pick one from each row'}
              <span aria-hidden="true">  →</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2 — PAIR */}
      {phase === 2 && (
        <div style={ib.phaseBody}>
          <div style={ib.phaseIntro}>
            <span style={ib.phaseIntroLabel}>PAIR · 5 MIN</span>
            <span style={ib.phaseIntroText}>
              Find someone with a <em>different</em> color tag than you. Read each
              other's logs out loud.
            </span>
          </div>

          <ol style={ib.steps}>
            <li style={ib.step}>
              <span style={ib.stepN}>1</span>
              <div>
                <div style={ib.stepHead}>Stand up &amp; find a partner</div>
                <div style={ib.stepBody}>
                  Different tag color than yours. Don't sit next to your friend —
                  this works better with a stranger. <em>(60 sec)</em>
                </div>
              </div>
            </li>
            <li style={ib.step}>
              <span style={ib.stepN}>2</span>
              <div>
                <div style={ib.stepHead}>Read your error log out loud</div>
                <div style={ib.stepBody}>
                  Just the three things you picked. No need to elaborate.
                  Your partner does the same. <em>(2 min)</em>
                </div>
              </div>
            </li>
            <li style={ib.step}>
              <span style={ib.stepN}>3</span>
              <div>
                <div style={ib.stepHead}>Trade one patch note</div>
                <div style={ib.stepBody}>
                  Tell your partner: <em>one</em> thing you'd try if you had their bug.
                  Not advice. A guess. <em>(2 min)</em>
                </div>
              </div>
            </li>
          </ol>

          <div style={ib.scriptBox}>
            <div style={ib.scriptLabel}>STUCK? TRY THIS OPENER</div>
            <div style={ib.scriptBody}>
              <span style={ib.scriptYou}>You:</span> "Hi — what's your error code?"<br />
              <span style={ib.scriptThem}>Them:</span> "ERR_429. Too many tabs."<br />
              <span style={ib.scriptYou}>You:</span> "Mine's TIMEOUT. Started homework at 11pm."<br />
              <em style={{ color: 'var(--ink-500)' }}>(commiseration ensues)</em>
            </div>
          </div>

          <div style={ib.next}>
            <button type="button" onClick={() => setPhase(1)} style={ib.backBtn}>
              <span aria-hidden="true">←  </span>back to my log
            </button>
            <button type="button" onClick={() => setPhase(3)} style={ib.nextBtn}>
              done trading <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3 — CLASS */}
      {phase === 3 && (
        <div style={ib.phaseBody}>
          <div style={ib.phaseIntro}>
            <span style={ib.phaseIntroLabel}>CLASS · 7 MIN</span>
            <span style={ib.phaseIntroText}>
              Instructor-led. Bring it back together.
            </span>
          </div>

          <ol style={ib.steps}>
            <li style={ib.step}>
              <span style={ib.stepN}>1</span>
              <div>
                <div style={ib.stepHead}>Show of hands</div>
                <div style={ib.stepBody}>
                  Instructor reads each error code. Hands up if it was yours.
                  Note the most common 2 — call out that this isn't a personal
                  failing, it's a <span className="marker">class-wide bug.</span>
                  <em> (2 min)</em>
                </div>
              </div>
            </li>
            <li style={ib.step}>
              <span style={ib.stepN}>2</span>
              <div>
                <div style={ib.stepHead}>Share the wildest patch</div>
                <div style={ib.stepBody}>
                  Ask 3 volunteers: what's the strangest patch your partner
                  suggested? Class votes 👍 / 👎 on whether they'd try it.
                  <em> (3 min)</em>
                </div>
              </div>
            </li>
            <li style={ib.step}>
              <span style={ib.stepN}>3</span>
              <div>
                <div style={ib.stepHead}>The setup</div>
                <div style={ib.stepBody}>
                  "You just did the whole module. You named a problem, isolated
                  where it happened, and tried a patch. The rest of class is just
                  doing this on purpose — with one habit you actually want to
                  fix." Move into the cold open.
                  <em> (2 min)</em>
                </div>
              </div>
            </li>
          </ol>

          <div style={ib.handoff}>
            <div style={ib.handoffLabel}>↓ HANDOFF TO COLD OPEN</div>
            <div style={ib.handoffBody}>
              "Three students are about to show up. Same homework. Same bug.
              Watch what they tell themselves about it."
            </div>
          </div>

          <div style={ib.next}>
            <button type="button" onClick={() => setPhase(2)} style={ib.backBtn}>
              <span aria-hidden="true">←  </span>back to pairs
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// The student's "error log" card — assembled live as they pick.
function StackTraceCard({ error, loc, patch, tagColor }) {
  return (
    <div style={ib.trace} aria-live="polite">
      <div style={ib.traceBar}>
        <span style={{ ...ib.traceBarDot, background: '#E8553C' }} aria-hidden="true"></span>
        <span style={{ ...ib.traceBarDot, background: '#E8A93B' }} aria-hidden="true"></span>
        <span style={{ ...ib.traceBarDot, background: '#5DBB7E' }} aria-hidden="true"></span>
        <span style={ib.traceTitle}>~/me/last-week.log</span>
      </div>
      <div style={ib.traceBody}>
        <div style={ib.traceLine}>
          <span style={ib.tracePrompt}>$</span>
          <span style={{ color: '#9ED9B0' }}>cat last-week.log</span>
        </div>
        <div style={{ ...ib.traceErr, borderColor: tagColor, color: tagColor }}>
          {error
            ? <>
                <strong>{error.code}</strong>: {error.name}
                <span style={ib.traceEmoji} aria-hidden="true"> {error.emoji}</span>
              </>
            : <span style={{ color: '#7A8A82', fontStyle: 'italic' }}>// pick an error above</span>
          }
        </div>
        <div style={ib.traceMeta}>
          <span style={ib.traceMetaLbl}>at</span>{' '}
          {loc
            ? <span style={{ color: '#C9B998' }}>{loc}</span>
            : <span style={{ color: '#7A8A82', fontStyle: 'italic' }}>// pick a location</span>
          }
        </div>
        <div style={ib.traceMeta}>
          <span style={ib.traceMetaLbl}>tried</span>{' '}
          {patch
            ? <span style={{ color: '#5DBB7E' }}>{patch}</span>
            : <span style={{ color: '#7A8A82', fontStyle: 'italic' }}>// pick what worked</span>
          }
        </div>
        {error && loc && patch && (
          <div style={ib.traceFooter}>
            <span style={{ color: '#E8A93B' }}>status:</span>
            <span style={{ color: '#9ED9B0', marginLeft: 8 }}>ready_to_share</span>
            <span style={ib.traceCursor}>▎</span>
          </div>
        )}
      </div>
    </div>
  );
}

const ib = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  phaseRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    listStyle: 'none',
    padding: 0,
    margin: '0 0 36px',
  },
  phaseChip: {
    width: '100%',
    background: 'var(--paper-100)',
    border: '2px solid var(--paper-200)',
    padding: '14px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    textAlign: 'left',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateRows: 'auto auto',
    columnGap: 12,
    alignItems: 'baseline',
    fontFamily: 'inherit',
  },
  phaseChipActive: {
    background: 'var(--ink-900)',
    borderColor: 'var(--ink-900)',
    color: 'var(--paper-50)',
  },
  phaseN: { fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.7, gridRow: '1 / 3' },
  phaseLabel: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 },
  phaseTime: { fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.7, justifySelf: 'end' },
  phaseSub: { gridColumn: '2 / 4', fontSize: 12, fontStyle: 'italic', opacity: 0.8, marginTop: 2 },

  phaseBody: { animation: 'fadeUp .25s ease-out' },
  phaseIntro: {
    display: 'flex', gap: 14, alignItems: 'center',
    marginBottom: 28,
    padding: '14px 18px',
    background: 'rgba(232, 169, 59, 0.12)',
    border: '1px dashed var(--signal-amber)',
    borderRadius: 4,
  },
  phaseIntroLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
    letterSpacing: '0.18em', color: 'var(--ink-900)',
    background: 'var(--signal-amber)', padding: '4px 8px', borderRadius: 2,
    flexShrink: 0,
  },
  phaseIntroText: { fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.4 },

  fieldset: { border: 'none', padding: 0, margin: '0 0 28px' },
  legend: {
    fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
    color: 'var(--ink-900)', marginBottom: 14, padding: 0,
  },

  errorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  errorCard: {
    width: '100%',
    background: 'var(--paper-100)',
    border: '2px solid var(--paper-200)',
    padding: '14px 14px 16px',
    borderRadius: 5,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    minHeight: 110,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  errorCardActive: {
    background: 'var(--paper-50)',
    boxShadow: 'var(--shadow-paper)',
  },
  errorTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  errorEmoji: { fontSize: 20 },
  errorTag: {
    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
    letterSpacing: '0.1em',
    border: '1px solid', padding: '2px 6px', borderRadius: 2,
    textTransform: 'uppercase',
  },
  errorCode: {
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
    color: 'var(--ink-900)', letterSpacing: '0.05em', marginTop: 4,
  },
  errorName: {
    fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-700)',
    lineHeight: 1.35,
  },

  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  chip: {
    background: 'var(--paper-100)',
    border: '1.5px solid var(--paper-200)',
    color: 'var(--ink-700)',
    padding: '9px 14px',
    borderRadius: 999,
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    cursor: 'pointer',
  },
  chipActive: {
    background: 'var(--ink-900)',
    borderColor: 'var(--ink-900)',
    color: 'var(--paper-50)',
    fontWeight: 600,
  },

  cardLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
    letterSpacing: '0.18em', color: 'var(--ink-500)', marginBottom: 10,
  },

  // The terminal-y trace card
  trace: {
    background: 'var(--terminal-900)',
    borderRadius: 8,
    boxShadow: '0 20px 40px -16px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  traceBar: {
    background: '#1A2520',
    padding: '10px 14px',
    display: 'flex', alignItems: 'center', gap: 6,
    borderBottom: '1px solid #0A0F0C',
  },
  traceBarDot: { width: 11, height: 11, borderRadius: '50%' },
  traceTitle: {
    flex: 1, textAlign: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A8A82',
    marginRight: 30,
  },
  traceBody: {
    padding: '20px 22px 24px',
    fontFamily: 'var(--font-mono)', fontSize: 13, color: '#E4DCC8',
    lineHeight: 1.7,
  },
  traceLine: { marginBottom: 10 },
  tracePrompt: { color: '#5DBB7E', marginRight: 8 },
  traceErr: {
    borderLeft: '3px solid',
    paddingLeft: 12, marginLeft: 4, marginBottom: 10,
    fontSize: 14,
  },
  traceEmoji: { fontSize: 16, marginLeft: 4 },
  traceMeta: { marginLeft: 16, marginBottom: 4 },
  traceMetaLbl: { color: '#7A8A82' },
  traceFooter: {
    marginTop: 14, paddingTop: 12,
    borderTop: '1px dashed #2E5945',
  },
  traceCursor: { color: '#5DBB7E', marginLeft: 6, animation: 'blink 1s steps(2) infinite' },

  next: {
    marginTop: 32,
    display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center',
  },
  nextBtn: {
    background: 'var(--ink-900)',
    color: 'var(--paper-50)',
    border: 'none',
    padding: '14px 22px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13, fontWeight: 600,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    borderRadius: 4,
    boxShadow: '0 3px 0 var(--crimson)',
    marginLeft: 'auto',
  },
  nextBtnDisabled: {
    background: 'var(--paper-200)',
    color: 'var(--ink-300)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--ink-500)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    cursor: 'pointer',
    padding: '8px 0',
  },

  // Phase 2 / 3 step lists
  steps: {
    listStyle: 'none', padding: 0, margin: '0 0 28px',
    display: 'flex', flexDirection: 'column', gap: 14,
  },
  step: {
    display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16,
    background: 'var(--paper-100)',
    border: '1px solid var(--paper-200)',
    padding: '18px 20px', borderRadius: 5,
  },
  stepN: {
    fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700,
    color: 'var(--crimson)', fontStyle: 'italic',
  },
  stepHead: {
    fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600,
    color: 'var(--ink-900)', marginBottom: 4,
  },
  stepBody: { fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.5 },

  scriptBox: {
    background: 'var(--terminal-900)',
    color: '#E4DCC8',
    padding: '20px 22px',
    borderRadius: 5,
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    lineHeight: 1.8,
  },
  scriptLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
    letterSpacing: '0.18em', color: 'var(--signal-amber)', marginBottom: 10,
  },
  scriptBody: { color: '#E4DCC8' },
  scriptYou: { color: 'var(--signal-green)', marginRight: 8 },
  scriptThem: { color: 'var(--signal-blue)', marginRight: 8 },

  handoff: {
    marginTop: 24,
    background: 'var(--ink-900)',
    color: 'var(--paper-100)',
    padding: '22px 26px',
    borderRadius: 6,
  },
  handoffLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 10,
    color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 10,
  },
  handoffBody: {
    fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic',
    lineHeight: 1.4,
  },

  notes: {
    marginTop: 40,
    background: 'var(--paper-100)',
    border: '1px solid var(--paper-200)',
    borderRadius: 5,
    padding: '16px 20px',
  },
  notesSummary: {
    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.05em', color: 'var(--ink-900)',
    cursor: 'pointer', userSelect: 'none',
  },
  notesBody: {
    marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--paper-300)',
    fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-700)',
  },
};

window.SectionIcebreaker = SectionIcebreaker;
