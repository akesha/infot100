// Artboard 1: Course Landing Page
// "Why take this course?" — for incoming Luddy students browsing the catalog.
// Tone: honest, warm, low-pressure. Says the quiet part out loud:
//   "this is for you if your study skills aren't where you want them yet."

function LandingArtboard() {
  return (
    <div style={landing.root} role="region" aria-label="Course landing page mockup">
      {/* Top bar — IU style, restrained */}
      <header style={landing.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={landing.iuMark} role="img" aria-label="Indiana University">IU</div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', letterSpacing: '0.1em' }}>
            LUDDY · INFORMATICS, COMPUTING &amp; ENGINEERING
          </span>
        </div>
        <nav aria-label="Primary" style={{ display: 'flex', gap: 22, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-700)' }}>
          <a href="#catalog" style={landing.navLink}>Catalog</a>
          <a href="#advising" style={landing.navLink}>Advising</a>
          <a href="#register" style={{ ...landing.navLink, color: 'var(--crimson)', fontWeight: 600 }}>Register <span aria-hidden="true">→</span></a>
        </nav>
      </header>

      {/* HERO */}
      <section style={landing.hero} aria-labelledby="hero-heading">
        <div style={landing.heroLeft}>
          <div style={landing.courseCode}>
            <span style={{ color: 'var(--signal-green)' }}>$</span> CSCI-Y 100
            <span style={landing.creditChip}>1 credit · 8 weeks</span>
          </div>
          <h1 id="hero-heading" style={landing.h1}>
            How to <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' }}>actually</em>
            <br />
            survive your<br />
            first year in CS.
          </h1>
          <p style={landing.lede}>
            A study-skills course built for Luddy students who picked CS because it sounded
            cool — and now have <span className="marker">six tabs open</span>, two assignments
            late, and a vague feeling that everyone else has it figured out.
          </p>
          <p style={landing.lede}>
            Spoiler: <span style={{ fontWeight: 600 }}>they don't.</span> We'll teach you the
            workflows real CS students use. You'll leave with a system, a portfolio, and a
            cohort that has your back.
          </p>

          <div style={landing.ctaRow}>
            <button type="button" style={landing.ctaPrimary}>Enroll for Fall <span aria-hidden="true">→</span></button>
            <button type="button" style={landing.ctaSecondary}>Skim the syllabus</button>
          </div>

          <div style={landing.trustRow}>
            <div style={landing.avatarStack} role="img" aria-label="Past students">
              <div style={{ ...landing.avatar, background: '#E58FB5' }} aria-hidden="true">K</div>
              <div style={{ ...landing.avatar, background: '#5DBB7E' }} aria-hidden="true">D</div>
              <div style={{ ...landing.avatar, background: '#4D7CC7' }} aria-hidden="true">R</div>
              <div style={{ ...landing.avatar, background: 'var(--paper-200)', color: 'var(--ink-700)' }} aria-hidden="true">+</div>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--ink-900)' }}>312 students</strong> took it last year.<br />
              94% said they'd recommend it to a friend.
            </div>
          </div>
        </div>

        {/* Hero RIGHT — terminal "demo" */}
        <div style={landing.heroRight}>
          <div style={landing.terminal} role="img" aria-label="Decorative terminal showing: course start, installs git workflow, terminal literacy, AI as study partner, debugging mindset, second brain, four friends in major. Warning: imposter syndrome may decrease.">
            <div style={landing.terminalBar} aria-hidden="true">
              <span style={{ ...landing.dot, background: '#E8553C' }}></span>
              <span style={{ ...landing.dot, background: '#E8A93B' }}></span>
              <span style={{ ...landing.dot, background: '#5DBB7E' }}></span>
              <span style={landing.terminalTitle}>~/luddy/study-skills</span>
            </div>
            <div style={landing.terminalBody} aria-hidden="true">
              <div><span style={landing.prompt}>$</span> <span style={{ color: '#9ED9B0' }}>./course --start</span></div>
              <div style={{ color: '#C9B998', marginTop: 8 }}>{`> initializing your survival kit…`}</div>
              <div style={{ marginTop: 14, color: '#9ED9B0' }}>installed:</div>
              <div style={landing.tInstalled}>✓ <span>git &amp; github workflow</span></div>
              <div style={landing.tInstalled}>✓ <span>terminal literacy</span></div>
              <div style={landing.tInstalled}>✓ <span>AI as a study partner (not crutch)</span></div>
              <div style={landing.tInstalled}>✓ <span>a debugging mindset</span></div>
              <div style={landing.tInstalled}>✓ <span>a second brain (Obsidian)</span></div>
              <div style={landing.tInstalled}>✓ <span>4 friends in your major</span></div>
              <div style={{ marginTop: 14, color: '#E8A93B' }}>warning:</div>
              <div style={{ color: '#C9B998', marginLeft: 16 }}>imposter syndrome may decrease.</div>
              <div style={{ marginTop: 14 }}>
                <span style={landing.prompt}>$</span> <span style={{ color: '#9ED9B0' }}>_</span>
                <span style={landing.cursor}>▎</span>
              </div>
            </div>
          </div>

          {/* Sticky note on top of terminal */}
          <figure style={landing.stickyNote}>
            <blockquote style={{ fontFamily: 'var(--font-hand)', fontSize: 22, color: 'var(--ink-900)', lineHeight: 1.1, margin: 0 }}>
              "Wish I'd taken this <u>before</u> CS 200."
            </blockquote>
            <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-500)', marginTop: 8, letterSpacing: '0.1em' }}>
              — MAYA, SOPHOMORE
            </figcaption>
          </figure>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={landing.section} aria-labelledby="who-heading">
        <div style={landing.sectionHeader}>
          <span style={landing.sectionNum} aria-hidden="true">01</span>
          <h2 id="who-heading" style={landing.h2}>Take this course if…</h2>
        </div>
        <ul style={landing.checklistGrid}>
          {[
            ["You opened a terminal once and immediately closed it.", "🖥️"],
            ["You've used GitHub but… aren't really sure what a 'commit' is.", "🌳"],
            ["You start strong, then disappear by week 4.", "📉"],
            ["You feel behind even though you're not.", "🌀"],
            ["You'd rather build something than read about it.", "🔧"],
            ["You wish someone would just SHOW you how CS students actually work.", "👀"],
          ].map(([txt, icon], i) => (
            <li key={i} style={landing.checkItem}>
              <span style={landing.checkBox} aria-hidden="true">✓</span>
              <span style={{ fontSize: 18, marginRight: 4 }} aria-hidden="true">{icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.4 }}>{txt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* WHAT YOU'LL DO — three big tiles */}
      <section style={{ ...landing.section, background: 'var(--terminal-900)', color: '#E4DCC8' }} aria-labelledby="do-heading">
        <div style={{ ...landing.sectionHeader, color: '#E4DCC8' }}>
          <span style={{ ...landing.sectionNum, color: 'var(--signal-green)' }} aria-hidden="true">02</span>
          <h2 id="do-heading" style={{ ...landing.h2, color: '#E4DCC8' }}>What you'll actually <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--signal-amber)' }}>do</em>.</h2>
        </div>

        <ol style={landing.doGrid}>
          <li style={landing.doTile}>
            <div style={landing.doIcon} aria-hidden="true">{`{ }`}</div>
            <div style={landing.doKicker}>WEEKS 1–3</div>
            <h3 style={landing.doH3}>Build your dev setup.</h3>
            <p style={landing.doBody}>
              Terminal, VS Code, Git, GitHub, your first .dotfile. By week 3 your laptop
              will look like an upperclassman's.
            </p>
            <div style={landing.doDeliverable}><span aria-hidden="true">↳ </span>Personal dev environment, on a public repo.</div>
          </li>

          <li style={landing.doTile}>
            <div style={landing.doIcon} aria-hidden="true">🧠</div>
            <div style={landing.doKicker}>WEEKS 4–6</div>
            <h3 style={landing.doH3}>Learn how to learn CS.</h3>
            <p style={landing.doBody}>
              Read code like prose. Use AI without losing the plot. Build a "second brain"
              in Obsidian. Debug your study habits like you'd debug code.
            </p>
            <div style={landing.doDeliverable}><span aria-hidden="true">↳ </span>A note vault you'll use for years.</div>
          </li>

          <li style={landing.doTile}>
            <div style={landing.doIcon} aria-hidden="true">🛠️</div>
            <div style={landing.doKicker}>WEEKS 7–8</div>
            <h3 style={landing.doH3}>Make something at the Makerspace.</h3>
            <p style={landing.doBody}>
              Pair up. Design and prototype a tool that helps you (or your cohort) study
              on campus. Laser cutter. 3D printer. Snacks.
            </p>
            <div style={landing.doDeliverable}><span aria-hidden="true">↳ </span>A real artifact + a 60-second demo.</div>
          </li>
        </ol>
      </section>

      {/* GRADE BREAKDOWN — small, honest */}
      <section style={landing.section} aria-labelledby="honest-heading">
        <div style={landing.sectionHeader}>
          <span style={landing.sectionNum} aria-hidden="true">03</span>
          <h2 id="honest-heading" style={landing.h2}>The honest stuff.</h2>
        </div>
        <dl style={landing.honestGrid}>
          <div style={landing.honestCard}>
            <dt style={landing.honestKicker}>WORKLOAD</dt>
            <dd style={{ ...landing.honestBig, margin: 0 }}>~3 hrs/wk</dd>
            <p style={landing.honestBody}>
              One 75-min class. ~90 min of homework. We won't drown you in busywork —
              we cut the assignment count in half this year.
            </p>
          </div>
          <div style={landing.honestCard}>
            <dt style={landing.honestKicker}>GRADING</dt>
            <dd style={{ ...landing.honestBig, margin: 0 }}>Pass / High Pass</dd>
            <p style={landing.honestBody}>
              No letter grade pressure. Show up, ship the work, reflect honestly.
              Designed to <span className="marker">help</span> your GPA, not threaten it.
            </p>
          </div>
          <div style={landing.honestCard}>
            <dt style={landing.honestKicker}>WHO TEACHES</dt>
            <dd style={{ ...landing.honestBig, margin: 0 }}>Real CS folks</dd>
            <p style={landing.honestBody}>
              Luddy faculty + senior CS students who remember exactly what week 4 felt
              like. Office hours actually have people in them.
            </p>
          </div>
        </dl>
      </section>

      {/* FOOTER CTA */}
      <section style={landing.footerCta} aria-labelledby="footer-cta-heading">
        <div style={{ maxWidth: 700 }}>
          <div className="ascii-divider" style={{ color: 'var(--paper-300)', marginBottom: 22 }} aria-hidden="true">
{`+----------------------------------------------------+
|  ENROLLMENT OPENS:  APRIL 7  ·  CRN 8621           |
+----------------------------------------------------+`}
          </div>
          <p className="sr-only">Enrollment opens April 7. CRN 8621.</p>
          <h2 id="footer-cta-heading" style={{ ...landing.h2, fontSize: 36, marginBottom: 16 }}>
            You don't have to figure this out alone.
          </h2>
          <p style={{ ...landing.lede, fontSize: 17 }}>
            Show up week 1. Bring a laptop and an open mind. We'll handle the rest.
          </p>
          <div style={{ ...landing.ctaRow, marginTop: 28 }}>
            <button type="button" style={landing.ctaPrimary}>Add CSCI-Y 100 <span aria-hidden="true">→</span></button>
            <button type="button" style={landing.ctaSecondary}>Email Prof. Horton</button>
          </div>
        </div>
      </section>

      {/* Foot */}
      <footer style={landing.foot}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-300)', letterSpacing: '0.15em' }}>
          INDIANA UNIVERSITY · LUDDY SCHOOL · BLOOMINGTON
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-300)', letterSpacing: '0.15em' }}>
          CSCI-Y100 · v2.0 · 2026
        </span>
      </footer>
    </div>
  );
}

const landing = {
  root: {
    width: 1280,
    minHeight: 1900,
    background: 'var(--paper-50)',
    color: 'var(--ink-900)',
    fontFamily: 'var(--font-body)',
    overflow: 'hidden',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 56px',
    borderBottom: '1px solid var(--paper-200)',
    background: 'var(--paper-50)',
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  iuMark: {
    width: 28,
    height: 28,
    background: 'var(--crimson)',
    color: '#fff',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: 48,
    padding: '80px 56px 100px',
    position: 'relative',
  },
  heroLeft: {
    paddingTop: 24,
  },
  courseCode: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    color: 'var(--ink-500)',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  creditChip: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--ink-700)',
    border: '1px solid var(--paper-300)',
    padding: '3px 8px',
    borderRadius: 999,
    background: 'var(--paper-100)',
    letterSpacing: '0.05em',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 76,
    lineHeight: 0.96,
    letterSpacing: '-0.025em',
    margin: '0 0 28px',
  },
  lede: {
    fontFamily: 'var(--font-body)',
    fontSize: 17,
    lineHeight: 1.55,
    color: 'var(--ink-700)',
    maxWidth: 520,
    margin: '0 0 14px',
  },
  ctaRow: {
    display: 'flex',
    gap: 12,
    marginTop: 32,
  },
  ctaPrimary: {
    background: 'var(--ink-900)',
    color: 'var(--paper-50)',
    border: 'none',
    padding: '16px 24px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    borderRadius: 4,
    boxShadow: '0 3px 0 var(--crimson)',
  },
  ctaSecondary: {
    background: 'transparent',
    color: 'var(--ink-900)',
    border: '1px solid var(--ink-900)',
    padding: '16px 24px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    borderRadius: 4,
  },
  trustRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginTop: 36,
  },
  avatarStack: {
    display: 'flex',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: '2px solid var(--paper-50)',
    marginLeft: -8,
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRight: {
    position: 'relative',
    paddingTop: 12,
  },
  terminal: {
    background: 'var(--terminal-900)',
    borderRadius: 10,
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    transform: 'rotate(1.5deg)',
  },
  terminalBar: {
    background: '#1A2520',
    padding: '11px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    borderBottom: '1px solid #0A0F0C',
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: '50%',
    display: 'inline-block',
  },
  terminalTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: '#7A8A82',
    marginRight: 30,
  },
  terminalBody: {
    padding: '20px 22px 28px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    color: '#E4DCC8',
    lineHeight: 1.7,
  },
  prompt: { color: '#5DBB7E', marginRight: 8 },
  cursor: { color: '#5DBB7E', animation: 'blink 1s steps(2) infinite' },
  tInstalled: {
    color: '#5DBB7E',
    display: 'flex',
    gap: 10,
  },
  stickyNote: {
    position: 'absolute',
    bottom: -28,
    left: -38,
    width: 220,
    padding: '20px 18px 16px',
    background: '#FFE789',
    transform: 'rotate(-5deg)',
    boxShadow: '0 12px 24px -8px rgba(0,0,0,0.25)',
  },

  section: {
    padding: '90px 56px',
    borderTop: '1px solid var(--paper-200)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 24,
    marginBottom: 56,
  },
  sectionNum: {
    fontFamily: 'var(--font-mono)',
    fontSize: 14,
    color: 'var(--crimson)',
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 48,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    margin: 0,
    lineHeight: 1.05,
  },
  checklistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px 40px',
    maxWidth: 1000,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  checkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    padding: '14px 16px',
    background: 'var(--paper-100)',
    border: '1px solid var(--paper-200)',
    borderRadius: 6,
  },
  checkBox: {
    width: 22,
    height: 22,
    background: 'var(--signal-green)',
    color: '#fff',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    flexShrink: 0,
    marginTop: 1,
  },
  doGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    counterReset: 'do',
  },
  doTile: {
    background: '#152019',
    border: '1px solid #2E5945',
    borderRadius: 8,
    padding: '32px 28px',
    position: 'relative',
  },
  doIcon: {
    fontSize: 32,
    marginBottom: 22,
    fontFamily: 'var(--font-mono)',
    color: 'var(--signal-amber)',
  },
  doKicker: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.18em',
    color: 'var(--signal-green)',
    marginBottom: 12,
  },
  doH3: {
    fontFamily: 'var(--font-display)',
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    margin: '0 0 14px',
    color: '#F4ECDD',
  },
  doBody: {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    lineHeight: 1.55,
    color: '#C9B998',
    margin: '0 0 22px',
  },
  doDeliverable: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--signal-amber)',
    paddingTop: 14,
    borderTop: '1px dashed #2E5945',
    lineHeight: 1.5,
  },
  honestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
    margin: 0,
  },
  honestCard: {
    padding: '28px 0 0',
    borderTop: '3px solid var(--ink-900)',
  },
  honestKicker: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.18em',
    color: 'var(--ink-500)',
    marginBottom: 14,
  },
  honestBig: {
    fontFamily: 'var(--font-display)',
    fontSize: 36,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: 16,
  },
  honestBody: {
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    lineHeight: 1.55,
    color: 'var(--ink-700)',
    margin: 0,
  },
  footerCta: {
    padding: '110px 56px',
    borderTop: '1px solid var(--paper-200)',
    background: 'linear-gradient(180deg, var(--paper-50) 0%, var(--paper-100) 100%)',
    textAlign: 'left',
  },
  foot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 56px',
    borderTop: '1px solid var(--paper-200)',
    background: 'var(--paper-100)',
  },
};

window.LandingArtboard = LandingArtboard;
