// Section 07 — Take-home + closer (5 min)
// 5-day Plan-vs-Actual ritual. TILT-formatted brief.

function CTSectionTakeHome() {
  return (
    <div style={th.root}>
      <div style={th.kicker}>⑦ TAKE-HOME · 5 MIN</div>
      <h1 style={th.h1}>
        The <em style={th.em}>Plan-vs-Actual</em> log.
      </h1>
      <p style={th.lede}>
        Run the Compute Loop for 5 days. Each morning, write tomorrow's ABC list. Each evening, mark
        what actually happened. The gap between plan and actual is your homework.
      </p>

      <div style={th.tilt}>
        <div style={th.tiltCol}>
          <div style={th.tiltLbl}>PURPOSE</div>
          <p>Make your time visible — not in the abstract, but as data you can read on Sunday.
          The goal isn't a "perfect" day; it's a discoverable pattern: what you over-promise, what you under-budget,
          where your real flex hours hide.</p>
        </div>
        <div style={th.tiltCol}>
          <div style={th.tiltLbl}>TASK</div>
          <p>For 5 consecutive weekdays:<br/>
          <strong>1.</strong> Each morning, write tomorrow's ABC list (3–10 items, with minute estimates).<br/>
          <strong>2.</strong> Throughout the day, mark each item ✓ done · ½ partial · ✗ skipped — and write
          the actual time it took.<br/>
          <strong>3.</strong> Each evening, write 1–2 sentences: <em>What surprised me?</em></p>
        </div>
        <div style={th.tiltCol}>
          <div style={th.tiltLbl}>CRITERIA</div>
          <ul style={th.ul}>
            <li>5 days of entries (not 5 separate days picked from 3 weeks)</li>
            <li>Each day has plan AND actual columns filled in</li>
            <li>End-of-week reflection: 200+ words, names two patterns you noticed</li>
            <li>Honesty &gt; performance. A messy log of a real week beats a clean log of a fake one.</li>
          </ul>
        </div>
      </div>

      <div style={th.template}>
        <div style={th.templateHead}>
          <span style={th.templateLbl}>TEMPLATE · COPY-PASTE INTO YOUR DOC</span>
        </div>
        <pre style={th.pre}>{`# Compute Time · 5-Day Log · [your name]

## Mon · plan
- A1 [task] — est __ min
- A2 [task] — est __ min
- B1 [task] — est __ min
...

## Mon · actual
- A1 [✓ ½ ✗] — actual __ min — note
- A2 [✓ ½ ✗] — actual __ min — note
...

> What surprised me today: ___

(repeat Tue / Wed / Thu / Fri)

## End-of-week reflection (200+ words)
- Pattern 1 I noticed: ...
- Pattern 2 I noticed: ...
- One change for next week: ...
`}</pre>
      </div>

      <div style={th.policy}>
        <strong>Revise-and-resubmit:</strong> as with every CSCI-Y100 deliverable, you can resubmit
        once for full credit through Friday of week 5. Late ≠ failed; it's data.
      </div>

      <div style={th.closer}>
        <div style={th.closerKick}>NEXT WEEK</div>
        <div style={th.closerBody}>
          We use your audit + spike map + Sunday list to build a <strong>Sunday Reset</strong> ritual:
          a 25-minute weekly setup that locks in the next 7 days. Bring this log; it IS the input.
        </div>
      </div>
    </div>
  );
}

const th = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  tilt: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 },
  tiltCol: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 6, padding: '14px 16px' },
  tiltLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid var(--ink-900)' },
  ul: { margin: '0 0 0 16px', padding: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-700)' },

  template: { background: 'var(--terminal-900)', borderRadius: 4, marginBottom: 18, overflow: 'hidden' },
  templateHead: { padding: '10px 14px', borderBottom: '1px solid var(--terminal-500)' },
  templateLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-green)', letterSpacing: '0.15em' },
  pre: { margin: 0, padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-100)', lineHeight: 1.6, whiteSpace: 'pre-wrap' },

  policy: { padding: '12px 16px', background: 'var(--paper-100)', borderLeft: '4px solid var(--signal-green)', borderRadius: '0 4px 4px 0', fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.55, marginBottom: 22 },

  closer: { textAlign: 'center', padding: '24px 16px', borderTop: '1px dashed var(--paper-300)' },
  closerKick: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.18em', marginBottom: 8 },
  closerBody: { fontFamily: 'var(--font-display)', fontSize: 19, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.45 },
};

window.CTSectionTakeHome = CTSectionTakeHome;
