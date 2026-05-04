// Section 6 — Take-home protocol
// 1-week experiment template. Daily check-in + reflection on whether the fix held.
// Closes the loop — they re-open the issue next class.

function SectionTakeHome() {
  return (
    <div style={th.root}>
      <div style={th.kicker}>⑥ TAKE-HOME · 10 MIN TO SET UP</div>
      <h1 style={th.h1}>
        Run the experiment.<br />
        Report back <em style={th.em}>next week.</em>
      </h1>
      <p style={th.lede}>
        You wrote the patch. Now we test it. For 7 days, log a single line each evening:
        did the fix hold? When it didn't, what tripped you up? Bring the log to next class —
        we'll re-open or close the issue together.
      </p>

      {/* Protocol card */}
      <div style={th.protocol}>
        <div style={th.protocolHead}>
          <div className="stamp" style={{ color: 'var(--crimson)' }}>1-WK PROTOCOL</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', letterSpacing: '0.1em' }}>
            issue #001 · status: in-progress
          </div>
        </div>
        <div style={th.protocolBody}>
          <Step n="1" t="Each evening (90 sec)" body="Open your bug report. Log: did the fix happen today? Y/N + 1 sentence why." />
          <Step n="2" t="If N three days in a row" body="Patch is wrong. Reopen and revise — usually the fix was too big. Halve it." />
          <Step n="3" t="On day 7" body="Write a 3-sentence reflection: What did the fix change? What didn't it? What's the next bug?" />
          <Step n="4" t="Bring to next class" body="We'll close (or reopen) the issue together. New issues welcome." />
        </div>
      </div>

      {/* 7-day log mockup */}
      <h2 style={th.h2}>What the log looks like</h2>
      <div style={th.log}>
        {[
          ['Mon', 'Y', 'Wrote 1 sentence at 6pm. Felt silly. Worked.', 'good'],
          ['Tue', 'Y', "Skipped — but came back at 9 and did 20 min.", 'good'],
          ['Wed', 'N', "Forgot. Discord rabbit hole.", 'bad'],
          ['Thu', 'Y', 'Wrote the sentence; ended up doing 40 min.', 'good'],
          ['Fri', 'Y', 'Friend joined me at the library.', 'good'],
          ['Sat', '—', "Didn't have CS hw. N/A.", 'na'],
          ['Sun', 'Y', "1-sentence trick + a snack. Patch holds.", 'good'],
        ].map(([day, y, note, vibe], i) => (
          <div key={i} style={{
            ...th.logRow,
            borderLeftColor: vibe === 'good' ? 'var(--signal-green)' : vibe === 'bad' ? 'var(--signal-red)' : 'var(--paper-300)',
          }}>
            <div style={th.logDay}>{day}</div>
            <div style={{
              ...th.logBadge,
              background: vibe === 'good' ? 'var(--signal-green)' : vibe === 'bad' ? 'var(--signal-red)' : 'var(--paper-300)',
              color: vibe === 'na' ? 'var(--ink-700)' : '#fff',
            }}>{y}</div>
            <div style={th.logNote}>{note}</div>
          </div>
        ))}
      </div>

      {/* Reflection prompts */}
      <h2 style={th.h2}>Reflection prompts (for next week)</h2>
      <div style={th.refGrid}>
        {[
          ["What part of the fix was easiest?", "Easy ≠ small. The smallest move usually IS the easiest one."],
          ["Where did the fix fail?", "Failures are data. They show what you misunderstood about the bug."],
          ["What's the next bug you noticed?", "Solving one usually surfaces another. That's the loop working."],
          ["Would you keep this fix? Tweak it? Toss it?", "All three are valid. Devs delete code all the time."],
        ].map(([q, why], i) => (
          <div key={i} style={th.refCard}>
            <div style={th.refQ}>"{q}"</div>
            <div style={th.refWhy}>↳ {why}</div>
          </div>
        ))}
      </div>

      {/* Final stamp */}
      <div style={th.finale}>
        <div className="ascii-divider" style={{ color: 'var(--ink-300)', marginBottom: 18 }} aria-hidden="true">
{`+--- the only rule ---+`}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.2, maxWidth: 720, margin: '0 auto' }}>
          when the fix doesn't hold, you don't have a character flaw —
          <br />
          <span style={{ color: 'var(--crimson)' }}>you have a more interesting bug.</span>
        </div>
      </div>
    </div>
  );
}

function Step({ n, t, body }) {
  return (
    <div style={th.step}>
      <div style={th.stepN}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={th.stepTitle}>{t}</div>
        <div style={th.stepBody}>{body}</div>
      </div>
    </div>
  );
}

const th = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  protocol: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, marginBottom: 40, overflow: 'hidden',
  },
  protocolHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 20px', background: 'var(--paper-50)', borderBottom: '1px solid var(--paper-200)',
  },
  protocolBody: { padding: '20px 22px' },
  step: { display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px dashed var(--paper-300)' },
  stepN: {
    width: 32, height: 32, borderRadius: '50%', background: 'var(--ink-900)', color: 'var(--paper-50)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, flexShrink: 0,
  },
  stepTitle: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.05em', marginBottom: 4 },
  stepBody: { fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.55 },

  h2: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 14px' },
  log: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 40 },
  logRow: {
    display: 'grid', gridTemplateColumns: '60px 50px 1fr', alignItems: 'center', gap: 14,
    background: 'var(--paper-50)', borderLeft: '4px solid', padding: '10px 14px', borderRadius: 3,
  },
  logDay: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.05em' },
  logBadge: {
    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    padding: '4px 10px', borderRadius: 3, textAlign: 'center',
  },
  logNote: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-700)' },

  refGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 40 },
  refCard: {
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)',
    padding: '18px 20px', borderRadius: 4,
  },
  refQ: { fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--ink-900)', marginBottom: 8, lineHeight: 1.3 },
  refWhy: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', lineHeight: 1.5 },

  finale: { textAlign: 'center', padding: '40px 0 20px' },
};

window.SectionTakeHome = SectionTakeHome;
