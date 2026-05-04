// Section 02 — The 4 Triggers (8 min)
// Anchor concept of the module. Each trigger has a different first-move fix.
// Mirrors the "Co-pilot Loop" 4-card layout from the AI module for visual continuity.

function ProcSectionTriggers() {
  const [hover, setHover] = React.useState(null);

  const triggers = [
    {
      n: 1, verb: "AMBIGUITY",
      color: "var(--signal-amber-text)",
      one: "I don't know what 'done' looks like.",
      detail: "You're not lazy — you literally don't know the next move. The brain protects itself by stalling. Symptom: re-reading the prompt, reorganizing your desk, opening 9 tabs.",
      sounds: "\u201cI'll start once I figure out the angle.\u201d",
      fix: "Make it tiny and concrete. Write the worst-possible first paragraph. Define 'done' for the next 25 minutes only.",
    },
    {
      n: 2, verb: "FEAR",
      color: "var(--signal-red-text)",
      one: "Starting will confirm something I'm scared of.",
      detail: "You suspect you're behind, can't do it, or will be judged. Avoiding keeps the bad news theoretical. The longer you wait, the more it costs — but the more it costs to start.",
      sounds: "\u201cI work better under pressure.\u201d (You don't. Nobody does.)",
      fix: "Lower the stakes of step one. Open the doc; don't write. Read the rubric; don't draft. Talk to one person who's done it.",
    },
    {
      n: 3, verb: "BOREDOM",
      color: "var(--signal-blue-text)",
      one: "My brain refuses to engage with this.",
      detail: "The work is repetitive, dry, or feels disconnected from anything you care about. Attention is a vote — and your brain is voting with its scrolling thumb.",
      sounds: "\u201cI'll just check my phone for a sec.\u201d (40 min later…)",
      fix: "Add structure or stakes. Pomodoro. Body-double with a friend. Connect the task to something you actually care about (or admit you don't, and grind it).",
    },
    {
      n: 4, verb: "EXHAUSTION",
      color: "var(--signal-green-text)",
      one: "I'm running on fumes and pretending I'm not.",
      detail: "Sleep debt, food debt, social debt. The work is fine — your operator is offline. Pushing harder produces 90 minutes of unusable garbage.",
      sounds: "\u201cI'll just power through.\u201d",
      fix: "Stop. Eat, hydrate, walk, nap. THEN one tiny start. This is the fix that feels least productive and is most productive.",
    },
  ];

  return (
    <div style={tg.root}>
      <div style={tg.kicker}>② THE 4 TRIGGERS · 8 MIN</div>
      <h1 style={tg.h1}>
        Procrastination is <em style={tg.em}>data</em>.
      </h1>
      <p style={tg.lede}>
        It tells you something specific. Hover any card — the trigger named on the front determines
        what you should actually <strong>do next</strong>. The fix is different every time.
      </p>

      <div style={tg.grid} role="list" aria-label="The four triggers of procrastination">
        {triggers.map((t, i) => (
          <div
            key={t.n}
            role="listitem"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            tabIndex={0}
            style={{
              ...tg.card,
              borderColor: hover === i ? t.color : 'var(--paper-200)',
              transform: hover === i ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            <div style={{ ...tg.num, color: t.color }}>0{t.n}</div>
            <div style={{ ...tg.verb, color: t.color }}>{t.verb}</div>
            <div style={tg.one}>{t.one}</div>
            <div style={tg.detail}>{t.detail}</div>

            <div style={tg.sounds}>
              <span style={tg.soundsLbl}>SOUNDS LIKE</span>
              <span style={tg.soundsBody}>{t.sounds}</span>
            </div>

            <div style={tg.fix}>
              <span style={{ ...tg.fixLbl, background: t.color }}>FIX</span>
              <span style={tg.fixBody}>{t.fix}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={tg.tape}>
        <div style={tg.tapeArrow} aria-hidden="true">◇</div>
        <div style={tg.tapeBody}>
          One task can have <strong>two triggers stacked</strong>: the paper is ambiguous AND you're tired.
          Diagnose both. Fix the bigger one first.
        </div>
      </div>
    </div>
  );
}

const tg = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 },
  card: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    borderRadius: 6, padding: '20px 22px', transition: 'all .2s',
    cursor: 'default',
  },
  num: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 },
  verb: { fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em', marginBottom: 8, lineHeight: 1 },
  one: { fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--ink-900)', marginBottom: 10, lineHeight: 1.3 },
  detail: { fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 14 },

  sounds: { display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, paddingTop: 10, borderTop: '1px dashed var(--paper-300)', marginBottom: 10 },
  soundsLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.08em' },
  soundsBody: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-700)', fontStyle: 'italic', lineHeight: 1.45 },

  fix: { display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, alignItems: 'start' },
  fixLbl: { color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, padding: '4px 6px', borderRadius: 2, letterSpacing: '0.08em', textAlign: 'center', alignSelf: 'start' },
  fixBody: { fontSize: 12.5, color: 'var(--ink-900)', lineHeight: 1.5, fontWeight: 500 },

  tape: {
    background: 'var(--paper-50)', border: '1px dashed var(--ink-300)',
    borderRadius: 4, padding: '14px 20px',
    display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14, alignItems: 'center',
  },
  tapeArrow: { fontSize: 22, color: 'var(--crimson)', textAlign: 'center', lineHeight: 1 },
  tapeBody: { fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--ink-700)', lineHeight: 1.45, fontStyle: 'italic' },
};

window.ProcSectionTriggers = ProcSectionTriggers;
