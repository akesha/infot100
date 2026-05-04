// Artboard 2: 8-Week Quest Map
// The course as a path. Each week = a "stage" with a CS-flavored boss/skill.
// Honest about the work involved; visualizes the existing structure.

function QuestMapArtboard() {
  const weeks = [
    {
      n: 1, title: "Spawn Point", subtitle: "Welcome + Design Thinking",
      where: "Makerspace, Wells Library",
      skill: "MAP THE TERRITORY",
      activity: "Tour the Makerspace. Build a 30-minute prototype with cardboard + Tinkercad.",
      deliv: "Tinkercad account · Silhouette Studio installed",
      kept: true,
      vibe: 'red',
    },
    {
      n: 2, title: "Recon", subtitle: "Time Mgmt + Setup",
      where: "Online — async",
      skill: "INSTALL YOUR LOADOUT",
      activity: "Pick a study book. Time-audit your week. Open a terminal for the first time.",
      deliv: "Bullet journal started · Time spreadsheet",
      kept: 'extended',
      vibe: 'amber',
    },
    {
      n: 3, title: "Setup Quest", subtitle: "Git + GitHub Tutorial",
      where: "Lab",
      skill: "VERSION CONTROL",
      activity: "The GitHub tutorial you just designed. Make a repo, commit, push, pull, branch, merge.",
      deliv: "Public 'cs-survival-kit' repo on your GitHub",
      kept: 'new',
      vibe: 'green',
    },
    {
      n: 4, title: "Reading the Code", subtitle: "Critical Thinking, CS-flavored",
      where: "Classroom",
      skill: "READ LIKE A DEV",
      activity: "Read README files, error messages, and Stack Overflow threads as primary texts. Spot the bias, the hype, the AI hallucination.",
      deliv: "Annotated docs of your favorite library",
      kept: 'remixed',
      vibe: 'blue',
    },
    {
      n: 5, title: "AI Co-Pilot Camp", subtitle: "AI as Study Partner",
      where: "Classroom",
      skill: "PROMPT WITH PURPOSE",
      activity: "Build prompts that teach you, not cheat for you. Run a side-by-side test of 3 AI tools on the same homework problem.",
      deliv: "Personal 'AI rules of engagement' document",
      kept: 'remixed',
      vibe: 'purple',
    },
    {
      n: 6, title: "The Debugging Mindset", subtitle: "Procrastination + Metacognition",
      where: "Classroom",
      skill: "DEBUG YOURSELF",
      activity: "Apply rubber-duck debugging to your own habits. When you're stuck on homework — is it the code or the chair?",
      deliv: "A 'bug report' on your worst study habit + a fix",
      kept: 'new',
      vibe: 'pink',
    },
    {
      n: 7, title: "Second Brain", subtitle: "Notes + Knowledge Mgmt",
      where: "Lab",
      skill: "BUILD A VAULT",
      activity: "Set up Obsidian. Import your messy CS notes. Build links between concepts. Rediscover something you forgot you learned.",
      deliv: "An Obsidian vault with 20+ notes & links",
      kept: 'remixed',
      vibe: 'amber',
    },
    {
      n: 8, title: "BOSS LEVEL", subtitle: "Makerspace Design Challenge",
      where: "Makerspace, Wells Library",
      skill: "SHIP SOMETHING",
      activity: "Pair up. Design + prototype a tool that helps you study on campus. 60-second demo. Snacks.",
      deliv: "A real, photographable artifact + reflection",
      kept: true,
      vibe: 'red',
    },
  ];

  const vibeColors = {
    red: { dot: 'var(--crimson)', tint: 'rgba(184, 58, 58, 0.08)' },
    amber: { dot: 'var(--signal-amber)', tint: 'rgba(232, 169, 59, 0.10)' },
    green: { dot: 'var(--signal-green)', tint: 'rgba(93, 187, 126, 0.10)' },
    blue: { dot: 'var(--signal-blue)', tint: 'rgba(77, 124, 199, 0.10)' },
    purple: { dot: 'var(--signal-purple)', tint: 'rgba(113, 86, 168, 0.10)' },
    pink: { dot: 'var(--signal-pink)', tint: 'rgba(229, 143, 181, 0.12)' },
  };

  const keptBadge = (kept) => {
    if (kept === true) return { label: 'KEPT', color: 'var(--ink-500)' };
    if (kept === 'extended') return { label: 'EXTENDED', color: 'var(--signal-amber)' };
    if (kept === 'remixed') return { label: 'REMIXED', color: 'var(--signal-blue)' };
    if (kept === 'new') return { label: 'NEW', color: 'var(--signal-green)' };
    return null;
  };

  return (
    <div style={qm.root} className="dotgrid" role="region" aria-label="8-week course quest map">
      {/* Header */}
      <header style={qm.header}>
        <div>
          <div style={qm.kicker}>INFO-T 100 · v2.0 · spring rev.</div>
          <h1 style={qm.h1}>The 8-Week Quest.</h1>
          <p style={qm.lede}>
            Your existing course, retold as a path. Same bookends — Makerspace at start
            and finish — with CS-specific skills layered into the middle.
          </p>
        </div>
        <aside style={qm.legend} aria-label="Legend">
          <div style={qm.legendTitle} aria-hidden="true">LEGEND</div>
          {[
            ['KEPT', 'var(--ink-500)', 'unchanged from current syllabus'],
            ['EXTENDED', 'var(--signal-amber)', 'same week, more CS-relevant content'],
            ['REMIXED', 'var(--signal-blue)', 'reframed for CS students'],
            ['NEW', 'var(--signal-green)', 'proposed addition'],
          ].map(([l, c, d]) => (
            <div key={l} style={qm.legendRow}>
              <span style={{ ...qm.badge, color: c, borderColor: c }}>{l}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-500)', fontFamily: 'var(--font-body)' }}>{d}</span>
            </div>
          ))}
        </aside>
      </header>

      {/* The path */}
      <ol style={qm.pathWrap} aria-label="Course weeks in order">
        {/* Vertical dashed spine */}
        <svg style={qm.spine} viewBox="0 0 100 1500" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="0" x2="50" y2="1500"
            stroke="var(--ink-300)" strokeWidth="2" strokeDasharray="2 6" />
        </svg>

        {weeks.map((w, i) => {
          const left = i % 2 === 0;
          const c = vibeColors[w.vibe];
          const badge = keptBadge(w.kept);
          return (
            <li key={w.n} style={{
              ...qm.weekRow,
              gridTemplateColumns: '1fr 88px 1fr',
              listStyle: 'none',
            }}>
              {/* Left card */}
              <div style={{ gridColumn: 1 }}>
                {left && <WeekCard w={w} c={c} badge={badge} side="left" />}
              </div>

              {/* Center node */}
              <div style={qm.nodeCol} aria-hidden="true">
                <div style={{ ...qm.node, background: c.dot }}>
                  <span style={qm.nodeNum}>{w.n}</span>
                </div>
                {i < weeks.length - 1 && (
                  <div style={qm.nodeArrow}>↓</div>
                )}
              </div>

              {/* Right card */}
              <div style={{ gridColumn: 3 }}>
                {!left && <WeekCard w={w} c={c} badge={badge} side="right" />}
              </div>
            </li>
          );
        })}

        {/* End marker */}
        <li style={{ ...qm.endMark, listStyle: 'none' }}>
          <div style={qm.endStamp} role="img" aria-label="You did it">YOU DID IT</div>
          <div style={qm.endSub}>
            <div className="ascii-divider" style={{ color: 'var(--ink-300)', textAlign: 'center' }} aria-hidden="true">
{`+ + + + + + + + + +`}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--ink-500)', marginTop: 8 }}>
              now go forth &amp; survive CS 200.
            </p>
          </div>
        </li>
      </ol>

      {/* Footer summary */}
      <dl style={qm.footer} aria-label="Redesign at a glance">
        <div style={qm.footStat}>
          <dd style={qm.footNum}>3</dd>
          <dt style={qm.footLbl}>NEW MODULES</dt>
          <dd style={qm.footDesc}>GitHub · Debugging Mindset · The intro reframe</dd>
        </div>
        <div style={qm.footStat}>
          <dd style={qm.footNum}>~50%</dd>
          <dt style={qm.footLbl}>FEWER ASSIGNMENTS</dt>
          <dd style={qm.footDesc}>1 deliverable per week, not 4</dd>
        </div>
        <div style={qm.footStat}>
          <dd style={qm.footNum}>1</dd>
          <dt style={qm.footLbl}>PORTFOLIO ARTIFACT</dt>
          <dd style={qm.footDesc}>Public GitHub repo by week 3, evolved through wk 8</dd>
        </div>
      </dl>
    </div>
  );
}

function WeekCard({ w, c, badge, side }) {
  return (
    <article style={{
      ...qm.card,
      background: c.tint,
      borderLeft: side === 'right' ? `3px solid ${c.dot}` : 'none',
      borderRight: side === 'left' ? `3px solid ${c.dot}` : 'none',
      textAlign: side === 'left' ? 'right' : 'left',
    }} aria-labelledby={`week-${w.n}-title`}>
      <div style={{ display: 'flex', justifyContent: side === 'left' ? 'flex-end' : 'flex-start', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', letterSpacing: '0.1em' }}>
          WEEK {w.n.toString().padStart(2, '0')}
        </span>
        {badge && (
          <span style={{ ...qm.badge, color: badge.color, borderColor: badge.color }}>
            {badge.label}
          </span>
        )}
      </div>
      <h3 id={`week-${w.n}-title`} style={qm.cardTitle}>{w.title}</h3>
      <div style={qm.cardSub}>{w.subtitle}</div>
      <div style={qm.skillTag}><span aria-hidden="true">↳ </span>{w.skill}</div>
      <p style={qm.cardBody}>{w.activity}</p>
      <div style={qm.cardMeta}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)' }}>
          <span aria-hidden="true">📍 </span><span className="sr-only">Location: </span>{w.where}
        </span>
      </div>
      <div style={qm.deliv}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.dot, letterSpacing: '0.1em' }}>DELIVERABLE</span>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-700)', marginTop: 4 }}>
          {w.deliv}
        </div>
      </div>
    </article>
  );
}

const qm = {
  root: {
    width: 1280,
    minHeight: 2200,
    padding: '60px 56px 80px',
    background: 'var(--paper-50)',
    fontFamily: 'var(--font-body)',
    color: 'var(--ink-900)',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 48,
    marginBottom: 64,
    alignItems: 'flex-start',
  },
  kicker: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--crimson)',
    letterSpacing: '0.18em',
    marginBottom: 14,
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 64,
    fontWeight: 600,
    letterSpacing: '-0.025em',
    margin: '0 0 18px',
    lineHeight: 1,
  },
  lede: {
    fontSize: 16,
    lineHeight: 1.55,
    color: 'var(--ink-700)',
    maxWidth: 480,
    margin: 0,
  },
  legend: {
    background: 'var(--paper-100)',
    border: '1px solid var(--paper-200)',
    padding: '20px 22px',
    borderRadius: 6,
  },
  legendTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--ink-500)',
    letterSpacing: '0.18em',
    marginBottom: 14,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  badge: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.12em',
    border: '1px solid',
    padding: '2px 6px',
    borderRadius: 2,
    display: 'inline-block',
  },
  pathWrap: {
    position: 'relative',
    paddingBottom: 80,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  spine: {
    position: 'absolute',
    left: 'calc(50% - 50px)',
    top: 30,
    bottom: 0,
    width: 100,
    height: 'calc(100% - 60px)',
    pointerEvents: 'none',
  },
  weekRow: {
    display: 'grid',
    gap: 24,
    alignItems: 'center',
    marginBottom: 36,
    position: 'relative',
  },
  nodeCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gridColumn: 2,
  },
  node: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 0 rgba(0,0,0,0.15), 0 0 0 3px var(--paper-50), 0 0 0 4px var(--ink-900)',
    zIndex: 1,
  },
  nodeNum: {
    fontFamily: 'var(--font-display)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 22,
    fontStyle: 'italic',
  },
  nodeArrow: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-300)',
    fontSize: 18,
    marginTop: 12,
  },
  card: {
    padding: '22px 24px 22px',
    border: '1px solid var(--paper-200)',
    borderRadius: 4,
    boxShadow: 'var(--shadow-paper)',
    position: 'relative',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    margin: '0 0 4px',
    lineHeight: 1.05,
  },
  cardSub: {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: 'var(--ink-500)',
    marginBottom: 14,
    fontStyle: 'italic',
  },
  skillTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--ink-900)',
    letterSpacing: '0.1em',
    fontWeight: 700,
    marginBottom: 12,
  },
  cardBody: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: 'var(--ink-700)',
    margin: '0 0 14px',
  },
  cardMeta: { marginBottom: 12 },
  deliv: {
    paddingTop: 12,
    borderTop: '1px dashed var(--paper-300)',
  },
  endMark: {
    textAlign: 'center',
    marginTop: 36,
  },
  endStamp: {
    display: 'inline-block',
    fontFamily: 'var(--font-mono)',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: 'var(--crimson)',
    border: '3px solid var(--crimson)',
    padding: '10px 18px',
    transform: 'rotate(-3deg)',
    background: 'var(--paper-50)',
  },
  endSub: { marginTop: 28 },
  footer: {
    marginTop: 60,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    paddingTop: 40,
    borderTop: '2px solid var(--ink-900)',
    margin: '60px 0 0',
  },
  footStat: {},
  footNum: {
    fontFamily: 'var(--font-display)',
    fontSize: 56,
    fontWeight: 600,
    letterSpacing: '-0.03em',
    color: 'var(--crimson)',
    lineHeight: 1,
    marginBottom: 8,
  },
  footLbl: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.18em',
    color: 'var(--ink-900)',
    fontWeight: 700,
    marginBottom: 6,
  },
  footDesc: {
    fontSize: 13,
    color: 'var(--ink-500)',
    lineHeight: 1.5,
  },
};

window.QuestMapArtboard = QuestMapArtboard;
