// Section 06 — Take-home + closer (10 min)
// Pair-up for accountability + 7-day Start Log structure.

function ProcSectionTakeHome() {
  return (
    <div style={th.root}>
      <div style={th.kicker}>⑥ TAKE-HOME · 10 MIN</div>
      <h1 style={th.h1}>
        Two artifacts. <em style={th.em}>One partner.</em> Seven days.
      </h1>
      <p style={th.lede}>
        Print or screenshot the two pages you just built. Pair with someone in this room.
        Trade a phone number. Run the protocol below for one week — then bring the log to next class.
      </p>

      <div style={th.cardGrid}>
        <div style={th.card}>
          <div style={th.cardN}>01</div>
          <div style={th.cardH}>The Pair-Up</div>
          <ul style={th.cardList}>
            <li>Find one person — preferably <strong>not</strong> in your major.</li>
            <li>Each share your <em>tiny step due tonight</em> from the Autopsy.</li>
            <li>Text "DONE" when you do it. No essay. No excuse.</li>
            <li>If you don't text by tomorrow noon, partner pings <em>you</em>.</li>
          </ul>
        </div>

        <div style={th.card}>
          <div style={th.cardN}>02</div>
          <div style={th.cardH}>The Start Log</div>
          <ul style={th.cardList}>
            <li>Every day for 7 days, log <strong>one</strong> "start moment."</li>
            <li>What were you avoiding? Which trigger? What was the bad-first-attempt?</li>
            <li>Did your ritual run? Y/N. If N — which lever was missing?</li>
            <li>End-of-week: which trigger came up most? That's your work.</li>
          </ul>
        </div>
      </div>

      <div style={th.template}>
        <div style={th.templateHead}>START LOG · COPY-PASTE TEMPLATE</div>
        <pre style={th.pre}>
{`# Start Log · Week of __ / __

## Day 1 — [date]
- Avoiding: ____________________________________________
- Trigger:  [ ] AMBIGUITY  [ ] FEAR  [ ] BOREDOM  [ ] EXHAUSTION
- Bad-first-attempt I made: __________________________
- Ritual ran today? [ ] Y  [ ] N
- If N, missing lever: [ ] AUTONOMY [ ] MASTERY [ ] PURPOSE
- One sentence on how it went: _______________________

## Day 2 — [date]
   ( same fields )

… repeat through Day 7

## End-of-week patch notes
- Most-frequent trigger: ____________________________
- Best moment of the week: __________________________
- One thing I'll change next week: __________________`}
        </pre>
      </div>

      <div style={th.policy}>
        <div style={th.policyLbl}>◇ POLICY · REVISE & RESUBMIT</div>
        <div style={th.policyBody}>
          Either artifact (Autopsy or Stack) can be revised and resubmitted up to 2× during the semester.
          Growth here matters more than getting it right the first try.
        </div>
      </div>
    </div>
  );
}

const th = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  cardGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 },
  card: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 6, padding: '18px 20px' },
  cardN: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', fontWeight: 700, letterSpacing: '0.18em', marginBottom: 4 },
  cardH: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.1 },
  cardList: { margin: 0, paddingLeft: 20, fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.7 },

  template: { background: 'var(--terminal-900)', borderRadius: 6, padding: '18px 22px', marginBottom: 22 },
  templateHead: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 12 },
  pre: { margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-100)', lineHeight: 1.6, whiteSpace: 'pre-wrap' },

  policy: { background: 'var(--paper-50)', border: '1px dashed var(--paper-300)', borderRadius: 4, padding: '14px 18px' },
  policyLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 6 },
  policyBody: { fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.55 },
};

window.ProcSectionTakeHome = ProcSectionTakeHome;
