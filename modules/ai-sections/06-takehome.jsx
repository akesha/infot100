// Section 06 — Take-home (10 min)
// 5-day Prompt Journal. TILT-formatted summary card.

function AISectionHome() {
  return (
    <div style={th.root}>
      <div style={th.kicker}>⑥ TAKE-HOME · 10 MIN TO BRIEF · 5 DAYS TO RUN</div>
      <h1 style={th.h1}>
        The 5-day<br />
        <em style={th.em}>Prompt Journal.</em>
      </h1>
      <p style={th.lede}>
        For one week, you log <strong>every</strong> AI ask — for any class, any topic. 30 seconds
        per entry. The point isn't to use AI less. The point is to <span className="marker">see your own pattern</span>.
      </p>

      <div style={th.tilt}>
        <div style={{ ...th.tiltSec, borderColor: 'var(--signal-blue)' }}>
          <div style={{ ...th.tiltTag, background: 'var(--signal-blue)' }}>① PURPOSE</div>
          <div style={th.tiltBody}>
            You'll never know if you're a co-pilot or a passenger until you log the flights.
            By Friday, your journal will tell you which student you really are — Devon, Sage,
            or Robin. <strong>No judgment. Just data.</strong>
          </div>
        </div>

        <div style={{ ...th.tiltSec, borderColor: 'var(--signal-amber)' }}>
          <div style={{ ...th.tiltTag, background: 'var(--signal-amber)', color: 'var(--ink-900)' }}>② TASK</div>
          <div style={th.tiltBody}>
            Each AI ask gets one row. Five fields, ~30 seconds:
            <ul style={th.taskList}>
              <li><strong>When</strong> — day &amp; rough time.</li>
              <li><strong>Class &amp; ask</strong> — one sentence.</li>
              <li><strong>Loop hit?</strong> — F / P / V / O — circle which Loop steps you ran.</li>
              <li><strong>Owner</strong> — ME / SHARED / AI (who actually did the thinking).</li>
              <li><strong>One-line reflection</strong> — only if something surprised you.</li>
            </ul>
            <strong>Friday:</strong> 4-sentence reflection. What's your pattern? What surprised you?
            Where did the Loop fall apart? What's one fix for next week?
          </div>
        </div>

        <div style={{ ...th.tiltSec, borderColor: 'var(--signal-green)' }}>
          <div style={{ ...th.tiltTag, background: 'var(--signal-green)' }}>③ CRITERIA</div>
          <div style={th.tiltBody}>
            <strong>50 pts. Honest engagement beats polish.</strong> A messy journal with real
            patterns beats a sparkling one with no learning.
            <ul style={th.taskList}>
              <li><strong>Coverage (15 pts)</strong> — at least 5 entries across at least 3 days. Zero-AI days log a zero.</li>
              <li><strong>Loop awareness (15 pts)</strong> — F/P/V/O marked honestly. At least one entry shows a Loop you skipped.</li>
              <li><strong>Reflection (15 pts)</strong> — names a pattern, not a personality trait.</li>
              <li><strong>Next move (5 pts)</strong> — one specific change for next week.</li>
            </ul>
            <strong>Revise &amp; resubmit:</strong> anyone under 33 gets one free revision week, no penalty.
          </div>
        </div>
      </div>

      <div style={th.template}>
        <div style={th.templateLabel}>JOURNAL TEMPLATE — copy this header into a Doc / Markdown</div>
        <pre style={th.pre}>{`# Prompt Journal — Week of __/__

| When | Class · Ask | Loop (F/P/V/O) | Owner (ME/SHARED/AI) | One-line surprise |
|------|-------------|----------------|----------------------|-------------------|
| Mon AM | CSCI-Y100 · "explain recursion" | F P _ _ | shared | gave up too early on PROBE |
| Mon PM | ENG-W131 · "fix my thesis" | F P V O | ME | the V step caught a misquote |
|        |             |                |                      |                   |

## Friday reflection (4 sentences)
1. My pattern was: ___
2. What surprised me: ___
3. Where the Loop fell apart: ___
4. Next week I will change: ___`}</pre>
      </div>

      <div style={th.closer}>
        <div style={th.closerStamp}>TURN IT IN</div>
        <div style={th.closerBody}>
          One file (Doc / Markdown / PDF) on Canvas → Week 6 → "Prompt Journal" by next class.
          Bring a copy — first 10 min of week 7 we'll group up and look for patterns across the room.
        </div>
      </div>
    </div>
  );
}

const th = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 32px' },

  tilt: { display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 },
  tiltSec: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderLeft: '5px solid',
    padding: '20px 24px', borderRadius: 4,
  },
  tiltTag: {
    display: 'inline-block', color: '#fff', fontFamily: 'var(--font-mono)',
    fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', padding: '4px 10px',
    borderRadius: 2, marginBottom: 10,
  },
  tiltBody: { fontSize: 14.5, color: 'var(--ink-700)', lineHeight: 1.6 },
  taskList: { paddingLeft: 20, marginTop: 8, marginBottom: 8 },

  template: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    border: '1px solid var(--terminal-500)', borderRadius: 6,
    padding: '18px 20px', marginBottom: 24,
  },
  templateLabel: {
    fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-amber)',
    letterSpacing: '0.18em', marginBottom: 12,
  },
  pre: {
    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-100)',
    margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.55,
  },

  closer: {
    background: 'var(--ink-900)', color: 'var(--paper-100)',
    padding: '20px 24px', borderRadius: 6,
  },
  closerStamp: {
    display: 'inline-block', border: '2px solid var(--signal-amber)',
    color: 'var(--signal-amber)', fontFamily: 'var(--font-mono)', fontSize: 11,
    fontWeight: 700, letterSpacing: '0.18em', padding: '4px 10px',
    borderRadius: 2, marginBottom: 12, transform: 'rotate(-1.5deg)',
  },
  closerBody: { fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--paper-100)', lineHeight: 1.55 },
};

window.AISectionHome = AISectionHome;
