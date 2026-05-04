// Built-modules section: link cards for the two fully-built reimagined modules.
// Compact "you can actually click into these" pointers from the canvas.

function BuiltModulesArtboard() {
  const modules = [
    {
      id: 'spawn',
      week: 'WEEK 01',
      title: 'Spawn Point',
      tagline: 'You already make things. Now meet the toolbox.',
      bullets: [
        '90-min hi-fi prototype · 7 sections',
        'Roll-call wall: things you\'ve already made',
        'Cold open: 3 students, same Week 1, different Week 14s',
        'Deliverables: Capability map · 90-min prototype · Project seed',
      ],
      href: 'modules/spawn-point.html',
      extras: [
        { label: 'Slide deck', href: 'modules/spawn-point-slides.html' },
        { label: 'TILT rubric', href: 'modules/spawn-point-tilt-rubric.html' },
        { label: 'Pacing guide', href: 'modules/spawn-point-pacing-guide.html' },
        { label: 'Learner roles', href: 'modules/spawn-point-learner-roles.html' },
      ],
      accent: 'var(--signal-purple-text)',
    },
    {
      id: 'compute',
      week: 'WEEK 03',
      title: 'Compute Time',
      tagline: 'You can’t make more time. You can see it and spend it.',
      bullets: [
        '90-min hi-fi prototype · 8 sections',
        'Sticker shock: estimate your 168 hr',
        'The Compute Loop: AUDIT → MAP → TRIAGE → RE-BUDGET',
        'Deliverables: 168 grid + 15-week spike map + Eisenhower triage',
      ],
      href: 'modules/compute-time.html',
      extras: [
        { label: 'Slide deck', href: 'modules/compute-time-slides.html' },
        { label: 'TILT rubric', href: 'modules/compute-time-tilt-rubric.html' },
      ],
      accent: 'var(--signal-green-text)',
    },
    {
      id: 'ai',
      week: 'WEEK 06',
      title: 'AI Co-Pilot Camp',
      tagline: 'Use AI without using yourself up.',
      bullets: [
        '90-min hi-fi prototype · 7 sections',
        'Trust Fall icebreaker · live AI vote',
        'Co-pilot Loop: FRAME → PROBE → VERIFY → OWN',
        'Deliverable: Prompt Lab + Credit Ledger',
      ],
      href: 'modules/ai-copilot-camp.html',
      extras: [
        { label: 'Slide deck', href: 'modules/ai-copilot-camp-slides.html' },
        { label: 'TILT rubric', href: 'modules/ai-copilot-camp-tilt-rubric.html' },
      ],
      accent: 'var(--signal-blue-text)',
    },
    {
      id: 'proc',
      week: 'WEEK 07',
      title: 'The Honest Start',
      tagline: 'Motivation comes after the first sentence — not before.',
      bullets: [
        '90-min hi-fi prototype · 7 sections',
        'Avoidance Wall: live anonymous tally',
        '4 Triggers: ambiguity / fear / boredom / exhaustion',
        'Deliverables: Procrastination Autopsy + Motivation Stack',
      ],
      href: 'modules/honest-start.html',
      extras: [
        { label: 'Slide deck', href: 'modules/honest-start-slides.html' },
        { label: 'TILT rubric', href: 'modules/honest-start-tilt-rubric.html' },
      ],
      accent: 'var(--crimson)',
    },
  ];

  return (
    <div style={bm.root}>
      <div style={bm.header}>
        <div style={bm.kicker}>◇ FULLY BUILT MODULES · CLICK TO ENTER</div>
        <h2 style={bm.h2}>Four of the fourteen weeks, prototyped end-to-end.</h2>
        <p style={bm.lede}>
          Each is an interactive 90-minute classroom experience — not slides about a course,
          the course itself. Open either to walk through the live module the way a student would.
        </p>
      </div>

      <div style={bm.grid}>
        {modules.map(m => (
          <div key={m.id} style={{ ...bm.card, borderTopColor: m.accent }}>
            <div style={{ ...bm.cardWeek, color: m.accent }}>{m.week}</div>
            <h3 style={bm.cardTitle}>{m.title}</h3>
            <div style={bm.cardTag}>{m.tagline}</div>

            <ul style={bm.cardBullets}>
              {m.bullets.map((b, i) => (
                <li key={i}><span style={{ ...bm.bulletDot, background: m.accent }} aria-hidden="true" />{b}</li>
              ))}
            </ul>

            <a href={m.href} style={{ ...bm.cardCta, background: m.accent }}>
              Enter the module ↗
            </a>

            {m.extras.length > 0 && (
              <div style={bm.extras}>
                <div style={bm.extrasLbl}>COMPANION ARTIFACTS</div>
                <div style={bm.extrasList}>
                  {m.extras.map((e, i) => (
                    <a key={i} href={e.href} style={bm.extrasLink}>{e.label} ↗</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={bm.foot}>
        The other ten weeks (Quest Map shows the full arc) are scaffolded but not yet prototyped.
        Each one builds the same way: anchor concept → live activity → deliverable → take-home.
      </div>
    </div>
  );
}

const bm = {
  root: { padding: '40px 56px', background: 'var(--paper-50)', minHeight: '100%', fontFamily: 'var(--font-body)', color: 'var(--ink-900)' },
  header: { maxWidth: 820, marginBottom: 36 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 14 },
  h2: { fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.05 },
  lede: { fontSize: 17, color: 'var(--ink-700)', lineHeight: 1.55, margin: 0 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  card: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderTop: '5px solid', borderRadius: '6px 6px 4px 4px',
    padding: '20px 22px',
    display: 'flex', flexDirection: 'column',
    boxShadow: 'var(--shadow-paper)',
  },
  cardWeek: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 6 },
  cardTitle: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, fontStyle: 'italic', letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1 },
  cardTag: { fontFamily: 'var(--font-display)', fontSize: 14.5, fontStyle: 'italic', color: 'var(--ink-700)', marginBottom: 16, paddingBottom: 14, borderBottom: '1px dashed var(--paper-300)' },

  cardBullets: { listStyle: 'none', padding: 0, margin: '0 0 22px 0', display: 'flex', flexDirection: 'column', gap: 9 },
  bulletDot: { display: 'inline-block', width: 7, height: 7, borderRadius: 1, marginRight: 10, verticalAlign: 'middle' },
  cardCta: {
    display: 'block', textAlign: 'center', textDecoration: 'none',
    color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
    padding: '14px', borderRadius: 4, letterSpacing: '0.12em',
    marginBottom: 16,
  },
  extras: { paddingTop: 14, borderTop: '1px dashed var(--paper-300)' },
  extrasLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 8 },
  extrasList: { display: 'flex', flexWrap: 'wrap', gap: 14 },
  extrasLink: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', textDecoration: 'none', borderBottom: '1px dotted var(--ink-500)' },

  foot: { marginTop: 30, fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--ink-500)', maxWidth: 820, lineHeight: 1.5 },
};

window.BuiltModulesArtboard = BuiltModulesArtboard;
