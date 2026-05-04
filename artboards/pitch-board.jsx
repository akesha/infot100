// Artboard 4: Module Idea Pitch Board
// 9 cards on a corkboard. For brainstorming with colleagues.
// Each card has a problem-it-solves, a 1-class activity, a deliverable.

function PitchBoardArtboard() {
  const ideas = [
    {
      tag: "WK 03 · NEW",
      tagColor: 'var(--signal-green)',
      title: "Setup Quest",
      hook: "The dev environment as RPG inventory.",
      problem: "Students arrive without terminal/git/IDE skills and feel behind from day one.",
      activity: "Live install party. By end of class everyone has: GitHub account, VS Code, working Git, a public repo, and one commit.",
      deliv: "Public 'cs-survival-kit' repo + a README about themselves.",
      solves: ["CS-specific", "Hands-on"],
      rotate: -2,
      pin: 'var(--signal-red)',
    },
    {
      tag: "WK 05 · REMIX",
      tagColor: 'var(--signal-blue)',
      title: "AI Co-Pilot Camp",
      hook: "Make AI your TA, not your ghostwriter.",
      problem: "Students either over-trust AI or refuse to use it. Both hurt them.",
      activity: "Race 3 AI tools on the same homework problem. Score outputs for: correctness, citation, hallucination. Build personal 'rules of engagement'.",
      deliv: "Personal AI-use policy doc, signed.",
      solves: ["Modern CS skill", "Ethics"],
      rotate: 1,
      pin: 'var(--signal-amber)',
    },
    {
      tag: "WK 06 · NEW",
      tagColor: 'var(--signal-green)',
      title: "The Debugging Mindset",
      hook: "Debug your habits like you debug code.",
      problem: "Procrastination & overwhelm get framed as moral failures, not solvable problems.",
      activity: "Write a 'bug report' on your worst study habit. Pair-debug with a partner. Ship one fix.",
      deliv: "GitHub-issue-style bug report + 1-week fix test.",
      solves: ["Metacognition", "Pair work"],
      rotate: -1,
      pin: 'var(--signal-pink)',
    },
    {
      tag: "WK 04 · REMIX",
      tagColor: 'var(--signal-blue)',
      title: "Reading the Code",
      hook: "Critical literacy, but for README files.",
      problem: "'Critical thinking' lessons feel disconnected from CS work.",
      activity: "Read a real open-source README, an error message, and a Stack Overflow thread. Annotate for: bias, hype, hallucination, gatekeeping.",
      deliv: "Annotated docs of a library you'll actually use.",
      solves: ["CS-flavored", "Transferable"],
      rotate: 2,
      pin: 'var(--signal-blue)',
    },
    {
      tag: "WK 07 · REMIX",
      tagColor: 'var(--signal-blue)',
      title: "Second Brain",
      hook: "Obsidian as your CS exoskeleton.",
      problem: "Students take notes in 6 places and can't find any of them by midterms.",
      activity: "Set up Obsidian. Import 1 messy CS note. Build links between concepts. Find the connection you didn't know was there.",
      deliv: "20+ linked notes in a vault you'll keep using.",
      solves: ["PKM", "Long-term value"],
      rotate: -1.5,
      pin: 'var(--signal-green)',
    },
    {
      tag: "ANY WK · NEW",
      tagColor: 'var(--signal-green)',
      title: "Office Hours: Demystified",
      hook: "Why nobody goes, and how to actually use them.",
      problem: "Students who most need office hours never go. Many think it's only for 'dumb questions'.",
      activity: "In-class role-play: practice asking a question at office hours. Senior CS student does a live OH demo. Field trip to one real OH together.",
      deliv: "Receipt photo of you at one office hour.",
      solves: ["Community", "Social skills"],
      rotate: 1.5,
      pin: 'var(--crimson)',
    },
    {
      tag: "WK 02 · EXTEND",
      tagColor: 'var(--signal-amber)',
      title: "Compute Time",
      hook: "Your week as a CPU schedule.",
      problem: "Time management is taught generically. CS students respond to CS metaphors.",
      activity: "Schedule your week using a Gantt chart. Identify 'process starvation' (which assignments never get CPU time?). Apply round-robin scheduling to your study blocks.",
      deliv: "Your week, visualized as a process schedule.",
      solves: ["CS-flavored", "Visual"],
      rotate: -2,
      pin: 'var(--signal-purple)',
    },
    {
      tag: "WK 08 · KEEP",
      tagColor: 'var(--ink-500)',
      title: "Makerspace Boss Level",
      hook: "Already great. Tighten the prompt.",
      problem: "Final design challenge is loved but the brief can drift.",
      activity: "Same as before: build a tool that helps you study on campus. Add: must use ≥1 thing learned this semester (Git, Obsidian, AI workflow, etc.).",
      deliv: "An artifact + a 60-sec demo + a README.",
      solves: ["Hands-on", "Synthesis"],
      rotate: 1,
      pin: 'var(--crimson)',
    },
    {
      tag: "ONGOING · NEW",
      tagColor: 'var(--signal-green)',
      title: "Cohort Channel",
      hook: "Everyone in 1 Discord/Slack from week 1.",
      problem: "'Community' is hoped for, not designed in.",
      activity: "Open the channel day 1. Weekly low-stakes prompt ('share one thing that broke this week'). Optional study sessions self-organize there.",
      deliv: "Just attendance — but they leave with 5+ contacts in their major.",
      solves: ["Community", "Retention"],
      rotate: -1,
      pin: 'var(--signal-amber)',
    },
  ];

  return (
    <div style={pb.root} role="region" aria-label="Module idea pitch board">
      {/* Cork texture base */}
      <div style={pb.cork} role="presentation">
        {/* Header */}
        <header style={pb.header}>
          <div>
            <div style={pb.kicker}>BRAINSTORM · TO DISCUSS WITH COLLEAGUES</div>
            <h1 style={pb.h1}>9 module ideas, on the wall.</h1>
            <p style={pb.lede}>
              Each card: the problem it solves, the 1-class activity, and the single
              deliverable. Sticky-note the ones you want to keep, scribble on the rest.
            </p>
          </div>
          <dl style={pb.legend} aria-label="Tag legend">
            <div style={pb.legendItem}><dt style={{ display: 'inline' }}><span style={{ ...pb.tag, background: 'var(--signal-green)' }}>NEW</span></dt> <dd style={{ display: 'inline', margin: 0 }}>proposed addition</dd></div>
            <div style={pb.legendItem}><dt style={{ display: 'inline' }}><span style={{ ...pb.tag, background: 'var(--signal-blue)' }}>REMIX</span></dt> <dd style={{ display: 'inline', margin: 0 }}>existing week, reframed</dd></div>
            <div style={pb.legendItem}><dt style={{ display: 'inline' }}><span style={{ ...pb.tag, background: 'var(--signal-amber)' }}>EXTEND</span></dt> <dd style={{ display: 'inline', margin: 0 }}>add to existing week</dd></div>
            <div style={pb.legendItem}><dt style={{ display: 'inline' }}><span style={{ ...pb.tag, background: 'var(--ink-500)' }}>KEEP</span></dt> <dd style={{ display: 'inline', margin: 0 }}>already works</dd></div>
          </dl>
        </header>

        {/* Grid of cards */}
        <ul style={pb.grid} aria-label="Module ideas">
          {ideas.map((idea, i) => (
            <li key={i} style={{ ...pb.card, transform: `rotate(${idea.rotate}deg)`, listStyle: 'none' }}>
              <article aria-labelledby={`idea-${i}-title`} style={{ display: 'contents' }}>
              {/* Pushpin */}
              <div style={{ ...pb.pin, background: idea.pin }} aria-hidden="true">
                <div style={pb.pinShine}></div>
              </div>

              <div style={{ ...pb.tag, background: idea.tagColor, marginBottom: 14 }}>
                {idea.tag}
              </div>

              <h3 id={`idea-${i}-title`} style={pb.cardTitle}>{idea.title}</h3>
              <p style={pb.cardHook}>"{idea.hook}"</p>

              <div style={pb.section}>
                <div style={pb.sectionLabel}>PROBLEM</div>
                <div style={pb.sectionBody}>{idea.problem}</div>
              </div>

              <div style={pb.section}>
                <div style={pb.sectionLabel}>1-CLASS ACTIVITY</div>
                <div style={pb.sectionBody}>{idea.activity}</div>
              </div>

              <div style={pb.delivBox}>
                <div style={pb.sectionLabel}><span aria-hidden="true">↳ </span>DELIVERABLE</div>
                <div style={{ ...pb.sectionBody, color: 'var(--ink-900)', fontWeight: 500 }}>{idea.deliv}</div>
              </div>

              <ul style={pb.tagsRow} aria-label="Tags">
                {idea.solves.map((s, j) => (
                  <li key={j} style={pb.solveTag}><span aria-hidden="true">· </span>{s}</li>
                ))}
              </ul>
              </article>
            </li>
          ))}
        </ul>

        {/* Hand-written sticky at the end */}
        <aside style={pb.endNote} aria-label="Closing note">
          <div className="ascii-divider" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: 16 }} aria-hidden="true">
{`-- pick 2-3 to pilot in fall --`}
          </div>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: 28, color: 'var(--ink-900)', lineHeight: 1.2, margin: 0 }}>
            no need to do all of these. <br />
            even one would be a meaningful upgrade.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', letterSpacing: '0.15em', marginTop: 14 }}>
            — DRAFT v0.1
          </div>
        </aside>
      </div>
    </div>
  );
}

const pb = {
  root: {
    width: 1280,
    minHeight: 1900,
    background: 'var(--paper-50)',
    fontFamily: 'var(--font-body)',
  },
  cork: {
    minHeight: 1900,
    padding: '60px 56px 80px',
    background: `
      radial-gradient(circle at 20% 30%, rgba(139, 90, 43, 0.06), transparent 40%),
      radial-gradient(circle at 80% 60%, rgba(139, 90, 43, 0.05), transparent 40%),
      repeating-radial-gradient(circle at 0 0, rgba(139, 90, 43, 0.04) 0, rgba(139, 90, 43, 0.04) 1px, transparent 1px, transparent 4px),
      #E8DCC4
    `,
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 48,
    marginBottom: 56,
    alignItems: 'flex-start',
    background: 'var(--paper-50)',
    padding: '24px 28px',
    borderRadius: 6,
    boxShadow: 'var(--shadow-paper)',
  },
  kicker: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--crimson)',
    letterSpacing: '0.18em',
    marginBottom: 12,
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 52,
    fontWeight: 600,
    letterSpacing: '-0.025em',
    margin: '0 0 14px',
    lineHeight: 1.0,
  },
  lede: {
    fontSize: 15,
    lineHeight: 1.55,
    color: 'var(--ink-700)',
    maxWidth: 480,
    margin: 0,
  },
  legend: {
    fontSize: 12,
    color: 'var(--ink-700)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
    fontFamily: 'var(--font-body)',
  },
  tag: {
    display: 'inline-block',
    color: '#fff',
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.12em',
    padding: '3px 7px',
    borderRadius: 2,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 36,
    paddingTop: 16,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  card: {
    position: 'relative',
    background: 'var(--paper-50)',
    padding: '36px 24px 22px',
    borderRadius: 3,
    boxShadow: '0 12px 24px -8px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.06)',
    minHeight: 440,
    display: 'flex',
    flexDirection: 'column',
  },
  pin: {
    position: 'absolute',
    top: -6,
    left: '50%',
    marginLeft: -8,
    width: 16,
    height: 16,
    borderRadius: '50%',
    boxShadow: '0 4px 6px -2px rgba(0,0,0,0.4), inset 0 -2px 3px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  pinShine: {
    position: 'absolute',
    top: 2,
    left: 3,
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.7)',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: '-0.015em',
    margin: '0 0 8px',
    lineHeight: 1.05,
  },
  cardHook: {
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontStyle: 'italic',
    color: 'var(--crimson)',
    marginBottom: 18,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    fontWeight: 700,
    color: 'var(--ink-500)',
    letterSpacing: '0.15em',
    marginBottom: 4,
  },
  sectionBody: {
    fontFamily: 'var(--font-body)',
    fontSize: 12.5,
    lineHeight: 1.5,
    color: 'var(--ink-700)',
  },
  delivBox: {
    background: 'rgba(232, 169, 59, 0.14)',
    border: '1px dashed var(--signal-amber)',
    padding: '10px 12px',
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 14,
  },
  tagsRow: {
    marginTop: 'auto',
    paddingTop: 10,
    borderTop: '1px dashed var(--paper-300)',
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
  },
  solveTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    color: 'var(--ink-500)',
    letterSpacing: '0.05em',
  },
  endNote: {
    marginTop: 56,
    background: '#FFE789',
    padding: '28px 32px',
    maxWidth: 480,
    transform: 'rotate(-1.5deg)',
    boxShadow: '0 12px 24px -8px rgba(0,0,0,0.25)',
    margin: '56px auto 0',
    textAlign: 'center',
  },
};

window.PitchBoardArtboard = PitchBoardArtboard;
