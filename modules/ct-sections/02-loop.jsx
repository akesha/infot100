// Section 02 — The Compute Loop (8 min)
// Anchor concept of the module. Four steps that loop. Same shape as the AI Co-Pilot Loop
// and the 4 Triggers, so students recognize the rhythm.

function CTSectionLoop() {
  const [hover, setHover] = React.useState(null);

  const steps = [
    {
      n: 1, verb: 'AUDIT',
      colorVar: 'var(--signal-amber-text)',
      one: 'Where is your time ACTUALLY going?',
      detail: "Color-code one real week, hour by hour. Fixed (class, work) vs. flexible. Most students discover they have 30+ hours of flex time they thought didn't exist.",
      bad: "\u201cI think I have like... a few hours free a day?\u201d",
      good: "\u201cTuesday 4-7pm and Sunday 1-6pm are my biggest flex blocks.\u201d",
    },
    {
      n: 2, verb: 'MAP',
      colorVar: 'var(--signal-red-text)',
      one: 'Where are the SPIKES this semester?',
      detail: "Plot all 15 weeks on a 1-4 impact scale. Midterms, projects, finals, work crunches. Spikes you see in week 3 are manageable. Spikes you discover in week 8 are crises.",
      bad: "\u201cI'll figure out midterms when midterms come.\u201d",
      good: "\u201cWeek 7 is a 4. I'm clearing weekend 6 to absorb it.\u201d",
    },
    {
      n: 3, verb: 'TRIAGE',
      colorVar: 'var(--signal-blue-text)',
      one: 'Urgent vs. important — they\u2019re NOT the same.',
      detail: "Sort tasks into 4 boxes (Eisenhower). Urgent+Important = do now. Important+Not urgent = schedule. Urgent+Not important = delegate or batch. Neither = drop.",
      bad: "\u201cWhatever's loudest, I do first.\u201d",
      good: "\u201cThe loud thing is Box 4 \u2014 it can wait. The quiet thing is Box 2.\u201d",
    },
    {
      n: 4, verb: 'RE-BUDGET',
      colorVar: 'var(--signal-green-text)',
      one: 'Build TOMORROW\u2019s task list, in priority order.',
      detail: "ABC method: A = must today, B = should today, C = could wait. Number inside each (A1, A2, B1...). The list IS the budget — you spend hours top to bottom.",
      bad: "\u201cI'll just... see what I feel like working on.\u201d",
      good: "\u201cA1: lab due 11:59. A2: 1-page draft. B1: read ch 4.\u201d",
    },
  ];

  return (
    <div style={lp.root}>
      <div style={lp.kicker}>② THE COMPUTE LOOP · 8 MIN</div>
      <h1 style={lp.h1}>
        Time isn't a feeling. It's <em style={lp.em}>data</em>.
      </h1>
      <p style={lp.lede}>
        Every time-management failure is a missing step in this loop. Hover any card to see what it
        catches. The whole module is one pass through these four. <strong>Then it repeats every Sunday.</strong>
      </p>

      <div style={lp.grid} role="list" aria-label="The four steps of the Compute Loop">
        {steps.map((s, i) => (
          <div
            key={s.n}
            role="listitem"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            tabIndex={0}
            style={{
              ...lp.card,
              borderColor: hover === i ? s.colorVar : 'var(--paper-200)',
              transform: hover === i ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            <div style={{ ...lp.num, color: s.colorVar }}>0{s.n}</div>
            <div style={{ ...lp.verb, color: s.colorVar }}>{s.verb}</div>
            <div style={lp.one}>{s.one}</div>
            <div style={lp.detail}>{s.detail}</div>

            <div style={lp.compare}>
              <div style={lp.bad}>
                <span style={lp.badLbl}>NOT</span>
                <span style={lp.badBody}>{s.bad}</span>
              </div>
              <div style={lp.good}>
                <span style={{ ...lp.goodLbl, background: s.colorVar }}>YES</span>
                <span style={lp.goodBody}>{s.good}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={lp.loopArrow} aria-hidden="true">
        <span style={lp.loopArrowText}>↻ AUDIT → MAP → TRIAGE → RE-BUDGET → AUDIT...</span>
      </div>
    </div>
  );
}

const lp = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 32px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 },
  card: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    borderRadius: 6, padding: '20px 22px', transition: 'all .2s', cursor: 'default',
  },
  num: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 },
  verb: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em', marginBottom: 8, lineHeight: 1 },
  one: { fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--ink-900)', marginBottom: 10, lineHeight: 1.3 },
  detail: { fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 14 },

  compare: { display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 10, borderTop: '1px dashed var(--paper-300)' },
  bad: { display: 'grid', gridTemplateColumns: '46px 1fr', gap: 10, alignItems: 'start' },
  badLbl: { color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, padding: '3px 0', borderRadius: 2, letterSpacing: '0.12em', textAlign: 'center', alignSelf: 'start', border: '1px solid var(--paper-300)' },
  badBody: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', fontStyle: 'italic', lineHeight: 1.45, textDecoration: 'line-through' },
  good: { display: 'grid', gridTemplateColumns: '46px 1fr', gap: 10, alignItems: 'start' },
  goodLbl: { color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, padding: '3px 0', borderRadius: 2, letterSpacing: '0.12em', textAlign: 'center', alignSelf: 'start' },
  goodBody: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-900)', lineHeight: 1.45, fontWeight: 500 },

  loopArrow: { textAlign: 'center', padding: '14px', background: 'var(--paper-50)', border: '1px dashed var(--ink-300)', borderRadius: 4 },
  loopArrowText: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.08em' },
};

window.CTSectionLoop = CTSectionLoop;
