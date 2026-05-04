// Section 01 — Cold open: The Final Project, Three Versions (6 min)
// Three students arrive Week 1. By Week 14, all three submit final projects.
// What separates them isn't talent — it's how soon they understood what the toolbox could DO.

function SPSectionColdOpen() {
  const [active, setActive] = React.useState(0);

  const students = [
    {
      name: 'Marcus',
      tag: 'Final demo · Week 14',
      vibe: 'red',
      project: 'A "habit tracker app"',
      whatHeShipped: 'A Figma mockup. On a laptop screen. He clicked through it.',
      reaction: 'It was fine. Nobody touched it.',
      whyMissed: 'Marcus never set foot in the Creator Commons. He didn\'t know he could 3D-print, vinyl-cut, or laminate. So his project lived where he lived: on a screen.',
      moral: 'Marcus had ideas. He didn\'t have verbs.',
    },
    {
      name: 'Priya',
      tag: 'Final demo · Week 14',
      vibe: 'green',
      project: 'A tactile night-light for kids with low vision',
      whatHeShipped: '3D-printed enclosure (Bambu Lab) · sewn fabric diffuser (Bernina) · laminated user-test card (kids could take it home).',
      reaction: 'Three judges asked if she\'d patent it.',
      whyMissed: null,
      moral: 'Priya didn\'t learn every tool. She learned 3 verbs and combined them.',
    },
    {
      name: 'Jordan',
      tag: 'Final demo · Week 14',
      vibe: 'amber',
      project: 'A board game about supply-chain ethics',
      whatHeShipped: 'Cameo-cut chipboard tiles · heat-pressed tote bag for the components · a 90-second demo video shot with a checked-out camera.',
      reaction: 'Two students asked to play it after class.',
      whyMissed: null,
      moral: 'Jordan didn\'t even use 3D printing. Knowing what NOT to use is the same skill.',
    },
  ];

  const s = students[active];

  return (
    <div style={co.root}>
      <div style={co.kicker}>① COLD OPEN · 6 MIN · WEEK 14, NOT WEEK 1</div>
      <h1 style={co.h1}>
        Three students. Same Week&nbsp;1. Three very different <em style={co.em}>Week&nbsp;14s</em>.
      </h1>
      <p style={co.lede}>
        Skip ahead 14 weeks. All three of these students just gave their final design-thinking demo.
        What separated them wasn't talent or hours. <strong>It was how soon they figured out what the toolbox could actually DO.</strong>
      </p>

      <div style={co.tabs}>
        {students.map((st, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              ...co.tab,
              background: active === i ? 'var(--ink-900)' : 'var(--paper-100)',
              color: active === i ? 'var(--paper-50)' : 'var(--ink-900)',
            }}
            aria-pressed={active === i}
          >
            <span style={co.tabName}>{st.name}</span>
            <span style={co.tabTag}>{st.tag}</span>
          </button>
        ))}
      </div>

      <div style={co.card}>
        <div style={co.cardHead}>
          <div style={co.bagIcon} aria-hidden="true">🛠️</div>
          <div>
            <div style={co.cardName}>{s.name} · "{s.project}"</div>
            <div style={co.cardSub}>{s.tag}</div>
          </div>
        </div>

        <div style={co.row}>
          <div style={co.rowLbl}>WHAT THEY SHIPPED</div>
          <div style={co.rowBody}>{s.whatHeShipped}</div>
        </div>
        <div style={co.row}>
          <div style={co.rowLbl}>HOW IT LANDED</div>
          <div style={co.rowBody}>{s.reaction}</div>
        </div>
        {s.whyMissed && (
          <div style={co.row}>
            <div style={co.rowLbl}>WHAT WAS MISSING</div>
            <div style={co.rowBody}>{s.whyMissed}</div>
          </div>
        )}

        <div style={co.moral}>{s.moral}</div>
      </div>

      <div style={co.punch}>
        <strong>The decision today:</strong> by the end of class, you'll know what 8 capabilities live
        in the Creator Commons, you'll have used at least one to make something real, and you'll have
        a rough seed for your Week-14 project. Marcus's path is the default. Priya's and Jordan's
        require Week 1 to be different — starting now.
      </div>
    </div>
  );
}

const co = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

  tabs: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 },
  tab: {
    border: '1.5px solid var(--ink-900)', borderRadius: 4,
    padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
    transition: 'background .15s, color .15s',
  },
  tabName: { display: 'block', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, lineHeight: 1.1 },
  tabTag: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.7, marginTop: 2, letterSpacing: '0.05em' },

  card: {
    background: 'var(--paper-100)', border: '2px solid var(--ink-900)', borderRadius: 6,
    padding: '20px 24px', marginBottom: 18, boxShadow: 'var(--shadow-card)',
  },
  cardHead: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 },
  bagIcon: { fontSize: 36, lineHeight: 1 },
  cardName: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, lineHeight: 1.1, color: 'var(--ink-900)' },
  cardSub: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', letterSpacing: '0.05em', marginTop: 2 },

  row: {
    display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, alignItems: 'baseline',
    paddingBottom: 10, marginBottom: 10, borderBottom: '1px dashed var(--paper-300)',
  },
  rowLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em' },
  rowBody: { fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)' },

  moral: {
    paddingTop: 12,
    fontFamily: 'var(--font-display)', fontSize: 19, fontStyle: 'italic',
    color: 'var(--ink-900)', lineHeight: 1.4,
  },

  punch: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)',
    fontSize: 14, lineHeight: 1.6,
  },
};

window.SPSectionColdOpen = SPSectionColdOpen;
