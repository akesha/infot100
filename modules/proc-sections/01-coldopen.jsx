// Section 01 — Cold open (5 min)
// Three students. Three different reasons they aren't working. Same outcome: zero progress.
// Click a card to swap the focus story. Sets up that "procrastination" is not one thing.

function ProcSectionColdOpen() {
  const [active, setActive] = React.useState(0);

  const stories = [
    {
      name: "Maya",
      tag: "the perfectionist",
      color: "var(--signal-amber-text)",
      bg: "rgba(232, 169, 59, 0.10)",
      avoiding: "an opinion essay",
      visible: "Reorganizes desk. Re-watches a YouTube video about thesis statements. Opens the Google Doc 9 times.",
      under: "She doesn't have a thesis yet — and she thinks she's supposed to. Starting feels like committing to something wrong.",
      trigger: "AMBIGUITY",
    },
    {
      name: "Devon",
      tag: "the dread freezer",
      color: "var(--signal-red-text)",
      bg: "rgba(216, 85, 60, 0.08)",
      avoiding: "a problem set due in 6 hours",
      visible: "Knows about it. Has known for a week. Plays Fortnite instead. Promises 'tonight.' Then it's tonight.",
      under: "He suspects he's behind, and opening the PDF will confirm it. Avoidance keeps the bad news theoretical.",
      trigger: "FEAR",
    },
    {
      name: "Priya",
      tag: "the bored dropout",
      color: "var(--signal-blue-text)",
      bg: "rgba(74, 122, 165, 0.08)",
      avoiding: "75 pages of intro-econ reading",
      visible: "Reads two pages, scrolls TikTok 'for a sec,' wakes up an hour later. Repeats.",
      under: "The reading is dry, repetitive, and disconnected from anything she cares about. Her brain is voting with its attention.",
      trigger: "BOREDOM",
    },
  ];

  const s = stories[active];

  return (
    <div style={co.root}>
      <div style={co.kicker}>① COLD OPEN · 5 MIN</div>
      <h1 style={co.h1}>
        Same outcome. <em style={co.em}>Three different reasons.</em>
      </h1>
      <p style={co.lede}>
        All three of these students did zero work last night. If you call all of them "lazy,"
        you'll prescribe the wrong fix to two of them.
      </p>

      <div style={co.tabs} role="tablist" aria-label="Three procrastination stories">
        {stories.map((st, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              ...co.tab,
              ...(active === i ? { ...co.tabActive, color: st.color, borderColor: st.color } : {}),
            }}
          >
            <span style={co.tabName}>{st.name}</span>
            <span style={co.tabTag}>{st.tag}</span>
          </button>
        ))}
      </div>

      <div style={{ ...co.card, background: s.bg, borderColor: s.color }} role="tabpanel">
        <div style={co.cardHead}>
          <span style={{ ...co.cardName, color: s.color }}>{s.name}</span>
          <span style={co.cardAvoid}>avoiding: <strong>{s.avoiding}</strong></span>
        </div>

        <div style={co.row}>
          <div style={co.rowLbl}>WHAT YOU'D SEE</div>
          <div style={co.rowBody}>{s.visible}</div>
        </div>
        <div style={co.row}>
          <div style={co.rowLbl}>WHAT'S UNDERNEATH</div>
          <div style={{ ...co.rowBody, fontStyle: 'italic' }}>{s.under}</div>
        </div>
        <div style={co.row}>
          <div style={co.rowLbl}>TRIGGER</div>
          <div style={{ ...co.rowBody, fontFamily: 'var(--font-mono)', fontWeight: 700, color: s.color, letterSpacing: '0.08em' }}>{s.trigger}</div>
        </div>
      </div>

      <div style={co.handoff}>
        Same surface behavior. Different fuel.<br />
        <span style={co.handoffStrong}>The fix has to match the fuel.</span>
      </div>
    </div>
  );
}

const co = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  tabs: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18 },
  tab: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    padding: '12px 14px', borderRadius: 4, cursor: 'pointer', textAlign: 'left',
    display: 'flex', flexDirection: 'column', gap: 2,
    color: 'var(--ink-700)',
  },
  tabActive: { background: 'var(--paper-50)' },
  tabName: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, fontStyle: 'italic', lineHeight: 1.1 },
  tabTag: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', letterSpacing: '0.05em' },

  card: { border: '2px solid', borderRadius: 6, padding: '22px 24px', marginBottom: 28, animation: 'fadeUp .25s ease-out' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed var(--paper-300)' },
  cardName: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, fontStyle: 'italic' },
  cardAvoid: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' },
  row: { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'baseline', padding: '10px 0' },
  rowLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  rowBody: { fontSize: 14.5, color: 'var(--ink-900)', lineHeight: 1.55 },

  handoff: {
    fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic',
    color: 'var(--ink-700)', lineHeight: 1.4, paddingTop: 16, borderTop: '1px dashed var(--paper-300)',
  },
  handoffStrong: { color: 'var(--crimson)', fontWeight: 600 },
};

window.ProcSectionColdOpen = ProcSectionColdOpen;
