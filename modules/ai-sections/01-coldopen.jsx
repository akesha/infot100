// Section 01 — Cold open
// Three students. Same homework. Different relationships with AI.
// Mirrors the Debugging Mindset cold open structure for visual continuity.

function AISectionColdOpen() {
  const [pick, setPick] = React.useState(2);

  const students = [
    {
      name: "Devon",
      vibe: "Dependent",
      color: "var(--signal-red)",
      thought: "I can't write a single line of code without AI. If ChatGPT goes down, I'm cooked. I haven't read my own code in three weeks.",
      action: "Pastes the prompt verbatim, copies the answer verbatim, doesn't read it. Ships.",
      result: "B+ this week. Quiz week 8 — alone with paper — they freeze. Also: their code has a bug they can't even see.",
    },
    {
      name: "Sage",
      vibe: "Forbidden",
      color: "var(--signal-amber)",
      thought: "Real CS students don't use AI. I have to do this myself or I'm cheating. Even looking at it feels like a moral failure.",
      action: "Spends 4 hours stuck on a syntax error a chatbot would have caught in 8 seconds. Doesn't ask anyone.",
      result: "Submits late. Burned out. Still doesn't understand the concept they got stuck on.",
    },
    {
      name: "Robin",
      vibe: "Co-pilot",
      color: "var(--signal-green)",
      thought: "I'm the pilot. AI is my co-pilot. I'll let it suggest a route — but I read every word, I check the map, and I still own the landing.",
      action: "Drafts pseudocode first. Asks AI to critique it. Argues back. Pastes one error message at a time, not the whole assignment.",
      result: "Done in 90 min. Can explain every line. Caught the bug AI missed.",
    },
  ];

  const s = students[pick];

  return (
    <div style={co.root}>
      <div style={co.kicker}>① COLD OPEN · 5 MIN</div>
      <h1 style={co.h1}>
        Three students. <em style={co.em}>Same assignment.</em>
      </h1>
      <p style={co.lede}>
        It's a CS-200 lab — implement a function, write a short explanation. All three have ChatGPT
        open in another tab. Watch how they use it.
      </p>

      <div style={co.grid}>
        {students.map((st, i) => (
          <button key={i} onClick={() => setPick(i)} aria-pressed={pick === i} style={{
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
          <div style={{ ...co.detailLabel, color: s.color }}>RESULT BY MIDTERM</div>
          <div style={co.detailBody}>{s.result}</div>
        </div>
      </div>

      <div style={co.callout}>
        <div style={co.calloutLabel}>◇ THE QUESTION FOR TODAY</div>
        <div style={co.calloutBody}>
          Devon outsources their thinking. Sage refuses help. <span className="marker">Robin uses AI like a senior dev uses code review</span> — fast, critical, and never the final word. That's what we'll practice.
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

window.AISectionColdOpen = AISectionColdOpen;
