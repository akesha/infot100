// Section 1 — Cold Open
// Three students with the same homework "bug" but different self-talk.
// Click each to swap which one is in focus. Sets up the central reframe:
//   the difference between "I'm broken" and "this is debuggable".

function SectionColdOpen() {
  const [pick, setPick] = React.useState(1);

  const students = [
    {
      name: "Alex",
      vibe: "Self-blame",
      color: "var(--signal-red)",
      thought: "I'm just bad at school. Everyone else gets this and I don't. Maybe CS isn't for me.",
      action: "Closes laptop. Doesn't open it again until tomorrow.",
      result: "Same bug, plus shame. Falls a day further behind.",
    },
    {
      name: "Bea",
      vibe: "Avoidance",
      color: "var(--signal-amber)",
      thought: "I'll do it after dinner. After this episode. After I clean my desk. After...",
      action: "Reorganizes Spotify playlists for 90 minutes.",
      result: "Same bug. Now it's 11pm and tired.",
    },
    {
      name: "Casey",
      vibe: "Debugging",
      color: "var(--signal-green)",
      thought: "Okay — what specifically isn't working? Let me write down what I tried and where I got stuck.",
      action: "Opens a notes file. Lists 3 things they don't understand. Goes to office hours with the list.",
      result: "Bug isolated in 20 min. Fixed by Wed.",
    },
  ];

  const s = students[pick];

  return (
    <div style={co.root}>
      <div style={co.kicker}>① COLD OPEN · 5 MIN</div>
      <h1 style={co.h1}>
        Three students. <em style={co.em}>Same bug.</em>
      </h1>
      <p style={co.lede}>
        It's Sunday night. The CS homework is due Wednesday. All three opened it, got stuck on
        the same recursion problem, and closed the tab. Watch what each one tells themselves.
      </p>

      <div style={co.grid}>
        {students.map((st, i) => (
          <button key={i} onClick={() => setPick(i)} style={{
            ...co.tile,
            ...(pick === i ? { ...co.tileActive, borderColor: st.color } : {}),
          }}>
            <div style={{ ...co.avatar, background: st.color }}>{st.name[0]}</div>
            <div style={co.tileName}>{st.name}</div>
            <div style={{ ...co.tileVibe, color: st.color }}>↳ {st.vibe.toUpperCase()}</div>
          </button>
        ))}
      </div>

      <div style={{ ...co.detail, borderColor: s.color }} key={pick}>
        <div style={co.detailRow}>
          <div style={{ ...co.detailLabel, color: s.color }}>WHAT THEY THINK</div>
          <div style={co.detailQuote}>"{s.thought}"</div>
        </div>
        <div style={co.detailRow}>
          <div style={{ ...co.detailLabel, color: s.color }}>WHAT THEY DO</div>
          <div style={co.detailBody}>{s.action}</div>
        </div>
        <div style={co.detailRow}>
          <div style={{ ...co.detailLabel, color: s.color }}>RESULT BY MONDAY</div>
          <div style={co.detailBody}>{s.result}</div>
        </div>
      </div>

      <div style={co.callout}>
        <div style={co.calloutLabel}>◇ THE QUESTION FOR TODAY</div>
        <div style={co.calloutBody}>
          Casey isn't smarter. Casey isn't more disciplined. Casey just <span className="marker">treats their study habits like code</span> — something you can read, test, and fix. That's the whole skill.
        </div>
      </div>
    </div>
  );
}

const co = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 },
  tile: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    padding: '22px 18px', borderRadius: 6, cursor: 'pointer',
    textAlign: 'left', transition: 'all .15s',
    fontFamily: 'inherit',
  },
  tileActive: { background: 'var(--paper-50)', boxShadow: 'var(--shadow-paper)' },
  avatar: {
    width: 38, height: 38, borderRadius: '50%', color: '#fff',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  tileName: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--ink-900)' },
  tileVibe: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginTop: 4 },
  detail: {
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderLeft: '4px solid',
    padding: '24px 28px', borderRadius: 4,
    animation: 'fadeUp .25s ease-out',
  },
  detailRow: { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, padding: '12px 0', borderBottom: '1px dashed var(--paper-200)' },
  detailLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', paddingTop: 4 },
  detailQuote: { fontFamily: 'var(--font-display)', fontSize: 19, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.4 },
  detailBody: { fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.55 },
  callout: {
    marginTop: 32, background: 'var(--ink-900)', color: 'var(--paper-100)',
    padding: '24px 28px', borderRadius: 6,
  },
  calloutLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 10 },
  calloutBody: { fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.4 },
};

window.SectionColdOpen = SectionColdOpen;
