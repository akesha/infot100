// Section 03 — Race the AIs (12 min, live demo)
// Three prompts to the same AI, same question. Vague vs Better vs Co-pilot.
// Click any prompt to see the response side-by-side. Highlights the cost of
// laziness and the payoff of the Loop in real time.

function AISectionRace() {
  const [active, setActive] = React.useState(2);

  const question = "How do I make my Python script run faster?";

  const tries = [
    {
      level: "Vague",
      color: "var(--signal-red)",
      promptLabel: "What most students type",
      prompt: "make my python script faster",
      response: `There are many ways to make Python scripts faster:

1. Use list comprehensions
2. Avoid global variables
3. Use built-in functions
4. Try numpy
5. Consider PyPy
6. Profile your code
7. Use multiprocessing

Hope this helps!`,
      verdict: "Generic listicle. Doesn't know your code, your bottleneck, or your goal.",
      cost: "You'll try numpy on a script that doesn't need it. 30 min wasted.",
    },
    {
      level: "Better",
      color: "var(--signal-amber)",
      promptLabel: "After one upgrade",
      prompt: "I have a python script that processes a 10MB CSV. It takes 45 seconds. how do I make it faster",
      response: `For CSV processing, the main wins are usually:

• Use pandas with read_csv() — it's much faster than the csv module for large files.
• Process in chunks (chunksize parameter).
• Avoid row-by-row iteration; use vectorized operations.

Could you share the script or describe what it does to each row?`,
      verdict: "Better. AI now has a real target. Even asks a follow-up — that's a green flag.",
      cost: "You're 60% there. But you still don't know if pandas is YOUR bottleneck.",
    },
    {
      level: "Co-pilot",
      color: "var(--signal-green)",
      promptLabel: "Running the FRAME → PROBE → VERIFY loop",
      prompt: `I'm in CSCI-Y211. My script reads a 10MB CSV and counts unique values per column. It takes 45s on my machine.

I already tried: removing the print statements (saved 1s).

Here's the inner loop:
\`\`\`
for row in reader:
    for col in row:
        seen[col].add(row[col])
\`\`\`

Goal: under 10s, but I want to UNDERSTAND why my version is slow before I copy a fix.`,
      response: `Good framing. Three things, in order of impact:

1. Your nested loop is O(rows × cols). For 10MB that's likely the bottleneck — not I/O.

2. seen[col].add(row[col]) — if seen is a defaultdict(set), set.add is O(1) but you're doing it for every cell. Most of your time is in Python interpreter overhead, not the algorithm.

3. The pandas equivalent — df.nunique() — drops to C-level loops and will be ~10× faster.

Before you swap, I'd suggest: time just the file-read vs. just the loop. If the loop is >40s, my analysis is right. If it's even, the bottleneck is elsewhere — don't fix what isn't broken.

Want me to walk through profiling first?`,
      verdict: "AI is now a teaching assistant. Diagnoses, explains, and suggests verification BEFORE the fix.",
      cost: "You'll learn what 'O(n×m)' means on YOUR code. Patch will hold next time.",
    },
  ];

  const t = tries[active];

  return (
    <div style={ra.root}>
      <div style={ra.kicker}>③ RACE THE AIS · 12 MIN · LIVE DEMO</div>
      <h1 style={ra.h1}>
        Same question. <em style={ra.em}>Three prompts.</em><br />
        Watch the answer change.
      </h1>
      <p style={ra.lede}>
        We'll demo this on the projector. The question is identical in all three. The only thing
        that changes is <strong>how you ask</strong>. Click each level to see the difference.
      </p>

      <div style={ra.questionStrip} role="figure" aria-label="The original question">
        <span style={ra.qLabel}>QUESTION:</span>
        <span style={ra.qBody}>{question}</span>
      </div>

      <div style={ra.tabs} role="tablist">
        {tries.map((tr, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              ...ra.tab,
              ...(active === i ? { ...ra.tabActive, borderColor: tr.color, color: '#fff', background: tr.color } : {}),
            }}
          >
            <span style={ra.tabN}>0{i+1}</span>
            <span style={ra.tabL}>{tr.level}</span>
            <span style={ra.tabSub}>{tr.promptLabel}</span>
          </button>
        ))}
      </div>

      <div style={ra.split} key={active}>
        {/* User prompt */}
        <div style={ra.col}>
          <div style={ra.colLabel}>YOU TYPE:</div>
          <div style={{ ...ra.bubble, background: 'var(--paper-100)', borderLeft: `4px solid ${t.color}` }}>
            <pre style={ra.pre}>{t.prompt}</pre>
          </div>
        </div>

        {/* AI response */}
        <div style={ra.col}>
          <div style={ra.colLabel}>AI REPLIES:</div>
          <div style={{ ...ra.bubble, background: 'var(--terminal-900)', color: 'var(--paper-100)' }}>
            <pre style={{ ...ra.pre, color: 'var(--paper-100)' }}>{t.response}</pre>
          </div>
        </div>
      </div>

      <div style={{ ...ra.verdict, borderColor: t.color }}>
        <div style={{ ...ra.vLabel, color: t.color }}>↳ VERDICT</div>
        <div style={ra.vBody}>{t.verdict}</div>
        <div style={ra.vCost}><strong>Real-world cost:</strong> {t.cost}</div>
      </div>

    </div>
  );
}

const ra = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  questionStrip: {
    background: 'var(--ink-900)', color: 'var(--paper-100)',
    padding: '14px 20px', borderRadius: 4, marginBottom: 22,
    display: 'flex', gap: 16, alignItems: 'center',
  },
  qLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-amber)', letterSpacing: '0.18em' },
  qBody: { fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic' },

  tabs: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18 },
  tab: {
    background: 'var(--paper-100)', border: '2px solid var(--paper-200)',
    padding: '14px 16px', borderRadius: 4, cursor: 'pointer',
    textAlign: 'left', fontFamily: 'inherit', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px',
    alignItems: 'baseline', transition: 'all .15s',
  },
  tabActive: {},
  tabN: { fontFamily: 'var(--font-mono)', fontSize: 11, gridRow: 'span 2', color: 'inherit', opacity: 0.7 },
  tabL: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'inherit' },
  tabSub: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'inherit', opacity: 0.85, gridColumn: 2, fontStyle: 'italic' },

  split: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, marginBottom: 16, animation: 'fadeUp .25s ease-out' },
  col: { display: 'flex', flexDirection: 'column', gap: 8 },
  colLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', letterSpacing: '0.18em' },
  bubble: { borderRadius: 6, padding: '14px 16px', boxShadow: 'var(--shadow-paper)' },
  pre: {
    fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-900)',
    lineHeight: 1.55, whiteSpace: 'pre-wrap', margin: 0, fontStyle: 'normal',
  },

  verdict: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderLeft: '4px solid',
    padding: '16px 20px', borderRadius: 4, marginBottom: 24,
  },
  vLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 6 },
  vBody: { fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.4, marginBottom: 8 },
  vCost: { fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.5 },

  notes: {
    background: 'var(--paper-50)', border: '1px dashed var(--paper-300)',
    borderRadius: 4, padding: '12px 16px',
  },
  notesSum: { cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-700)', letterSpacing: '0.05em' },
  notesList: { fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.7, paddingLeft: 20, marginTop: 10 },
};

window.AISectionRace = AISectionRace;
