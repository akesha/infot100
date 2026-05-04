// Section 06 — Take-home (5 min)
// Three lines in Start Log. No prose. Spot-checked at 1:1s.

function SQSectionTakeHome() {
  return (
    <div style={th.root}>
      <div style={th.kicker}>⑥ TAKE-HOME · 5 MIN · BEFORE WEEK 4</div>
      <h1 style={th.h1}>
        Three lines in your <em style={th.em}>Start Log</em>.
      </h1>

      <ol style={th.list}>
        <li style={th.item}>
          <div style={th.itemHead}>
            <span style={th.itemN}>01</span>
            <span style={th.itemTitle}>GitHub repo URL</span>
          </div>
          <div style={th.itemBody}>
            From Round 2. Even an empty repo counts — the existence is the artifact.
          </div>
        </li>

        <li style={th.item}>
          <div style={th.itemHead}>
            <span style={th.itemN}>02</span>
            <span style={th.itemTitle}>Obsidian vault path</span>
          </div>
          <div style={th.itemBody}>
            From Round 3. Path on disk, like <code style={th.code}>~/Documents/csci-y100</code>.
            That's where every other lesson's Capture Template will land.
          </div>
        </li>

        <li style={th.item}>
          <div style={th.itemHead}>
            <span style={th.itemN}>03</span>
            <span style={th.itemTitle}>First source citation</span>
          </div>
          <div style={th.itemBody}>
            From Section 4. Title + IU database name. The line is short on purpose; the work is in
            having gone through the database, not in writing about it.
          </div>
        </li>
      </ol>

      <div style={th.bigQ}>
        <div style={th.bigQLbl}>WALK OUT WITH THIS</div>
        <div style={th.bigQTxt}>
          "If anything is broken by W4 Monday, drop into office hours. The cost compounds — fixing
          it now is an hour, fixing it in W6 is a week."
        </div>
      </div>

      <p style={th.outro}>
        Round 1 made the toolbox yours. Round 2 made git history yours. Round 3 made the second
        brain yours. Section 4 used all three. By W4 Monday, the next lesson assumes everything
        installed today still works — that's why the take-home is a check, not a new task.
      </p>
    </div>
  );
}

const th = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 22px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },

  list: { listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 10 },
  item: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '14px 18px' },
  itemHead: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 },
  itemN: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
  itemTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.1 },
  itemBody: { fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)' },
  code: { fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--paper-50)', padding: '1px 5px', borderRadius: 3 },

  bigQ: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '16px 20px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', marginBottom: 18 },
  bigQLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
  bigQTxt: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.4, color: 'var(--paper-100)' },

  outro: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-700)', fontStyle: 'italic', maxWidth: 720, margin: 0 },
};

window.SQSectionTakeHome = SQSectionTakeHome;
