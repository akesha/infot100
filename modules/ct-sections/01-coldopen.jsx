// Section 01 — Cold open (5 min)
// Three real-ish archetypes pulled from the source group worksheet:
// "stress + party" Tristan, "flexible-schedule" Max, "ahead-of-time" Aman.
// Each shows their week and a different blind spot.

function CTSectionColdOpen() {
  const [active, setActive] = React.useState('tristan');

  const students = [
    {
      id: 'tristan',
      name: 'Tristan',
      tag: 'THE CRAMMER',
      colorVar: 'var(--signal-red-text)',
      brief: '"I prep meals, write down all my deadlines, and stress out. Then I party.\u201d',
      week: '40 hr work-week + 12 hr party recovery + zero spike planning',
      blindSpot: "Treats every busy week the same. Plans the cram, plans the reward, but doesn't see WHEN spikes are coming until they hit.",
      cost: 'Burns out around midterms every semester.',
    },
    {
      id: 'max',
      name: 'Max',
      tag: 'THE OPTIMIZER',
      colorVar: 'var(--signal-amber-text)',
      brief: '"Make the schedule more flexible. Get sleep. Done."',
      week: 'Calendar = blocks of "flex time". No homework times. No deadlines mapped.',
      blindSpot: "Treats flexibility as a strategy. Without anchors — fixed deadlines, hard times — \u201cflexible\u201d means \u201cnever now.\u201d",
      cost: 'Things that aren\'t urgent stay un-done until they\'re urgent.',
    },
    {
      id: 'aman',
      name: 'Aman',
      tag: 'THE OVER-PREPPER',
      colorVar: 'var(--signal-green-text)',
      brief: '"Get homework done in advance. Don\'t procrastinate.\u201d',
      week: 'Always working. Mostly on the next thing. Rarely on the right thing.',
      blindSpot: "Confuses early with prioritized. Spends Sunday on Tuesday's reading instead of the project due Monday.",
      cost: 'Always busy, occasionally surprised by what\'s actually due.',
    },
  ];

  const cur = students.find(s => s.id === active);

  return (
    <div style={co.root}>
      <div style={co.kicker}>① COLD OPEN · 5 MIN</div>
      <h1 style={co.h1}>
        Three students. Three <em style={co.em}>blind spots</em>.
      </h1>
      <p style={co.lede}>
        These are real, lightly-edited responses from last semester's group worksheet. Each one is
        doing <em>something</em> right — and missing one specific thing. Click between them.
      </p>

      <div style={co.tabs} role="tablist" aria-label="Student archetypes">
        {students.map(s => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === s.id}
            onClick={() => setActive(s.id)}
            style={{
              ...co.tab,
              ...(active === s.id ? { ...co.tabActive, borderBottomColor: s.colorVar, color: 'var(--ink-900)' } : {}),
            }}
          >
            <div style={{ ...co.tabName, color: active === s.id ? s.colorVar : 'var(--ink-500)' }}>{s.name}</div>
            <div style={co.tabTag}>{s.tag}</div>
          </button>
        ))}
      </div>

      <div style={{ ...co.card, borderColor: cur.colorVar }} key={cur.id}>
        <div style={co.cardTop}>
          <div style={{ ...co.cardName, color: cur.colorVar }}>{cur.name}</div>
          <div style={co.cardTag}>{cur.tag}</div>
        </div>
        <div style={co.brief}>{cur.brief}</div>

        <div style={co.row}>
          <div style={co.rowLbl}>WEEK SHAPE</div>
          <div style={co.rowBody}>{cur.week}</div>
        </div>
        <div style={co.row}>
          <div style={{ ...co.rowLbl, color: cur.colorVar }}>BLIND SPOT</div>
          <div style={co.rowBody}><strong>{cur.blindSpot}</strong></div>
        </div>
        <div style={co.row}>
          <div style={co.rowLbl}>WHAT IT COSTS</div>
          <div style={{ ...co.rowBody, fontStyle: 'italic', color: 'var(--ink-500)' }}>{cur.cost}</div>
        </div>
      </div>

      <div style={co.bridge}>
        Three different problems. Three different fixes. The same loop catches all three. <span style={{ color: 'var(--crimson)', fontWeight: 600 }}>That's the next section.</span>
      </div>
    </div>
  );
}

const co = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  tabs: { display: 'flex', gap: 0, borderBottom: '2px solid var(--paper-200)', marginBottom: 24 },
  tab: {
    flex: 1, background: 'transparent', border: 'none', borderBottom: '4px solid transparent',
    padding: '14px 18px', cursor: 'pointer', textAlign: 'left',
    transition: 'all .15s',
  },
  tabActive: { background: 'var(--paper-100)' },
  tabName: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, fontStyle: 'italic', marginBottom: 2 },
  tabTag: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em' },

  card: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    borderRadius: 6, padding: '24px 28px',
    animation: 'fadeUp .25s ease',
  },
  cardTop: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 },
  cardName: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, fontStyle: 'italic' },
  cardTag: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', padding: '3px 8px', border: '1px solid var(--paper-300)', borderRadius: 2 },

  brief: { fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.4, marginBottom: 18, paddingBottom: 16, borderBottom: '1px dashed var(--paper-300)' },

  row: { display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, padding: '8px 0' },
  rowLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', paddingTop: 3 },
  rowBody: { fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.55 },

  bridge: {
    marginTop: 24, fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic',
    color: 'var(--ink-700)', textAlign: 'center',
    padding: '14px 16px', borderTop: '1px dashed var(--paper-300)', borderBottom: '1px dashed var(--paper-300)',
  },
};

window.CTSectionColdOpen = CTSectionColdOpen;
