// Section 06 — Trajectory · what comes after (10 min)
// Three fields: next thing to ship, habit, time-frame.
// Plus a final-export hint that points students at the ExportWork button.

(function () {
  function FDSectionTrajectory() {
    const SHIP_KEY = 'fd:06-trajectory:ship';
    const HABIT_KEY = 'fd:06-trajectory:habit';
    const WHEN_KEY = 'fd:06-trajectory:when';
    const POSTED_KEY = 'fd:06-trajectory:posted';

    const [ship, setShip] = React.useState('');
    const [habit, setHabit] = React.useState('');
    const [when, setWhen] = React.useState('');
    const [posted, setPosted] = React.useState(false);

    React.useEffect(() => {
      try {
        setShip(localStorage.getItem(SHIP_KEY) || '');
        setHabit(localStorage.getItem(HABIT_KEY) || '');
        setWhen(localStorage.getItem(WHEN_KEY) || '');
        setPosted(localStorage.getItem(POSTED_KEY) === '1');
      } catch (e) {}
    }, []);

    const save = (key, setter) => (e) => {
      const v = e.target.value;
      setter(v);
      try { localStorage.setItem(key, v); } catch (e) {}
    };

    const togglePosted = () => {
      const next = !posted;
      setPosted(next);
      try { localStorage.setItem(POSTED_KEY, next ? '1' : '0'); } catch (e) {}
    };

    const ready = ship.trim() && habit.trim() && when.trim();

    return (
      <div style={s.root}>
        <div style={s.kicker}>⑥ TRAJECTORY · 10 MIN · ONE PARAGRAPH</div>
        <h1 style={s.h1}>
          <em style={s.em}>What's next</em>, in your words.
        </h1>
        <p style={s.lede}>
          The course ends. The vault doesn't. The trajectory is what makes the externalization
          habit outlast the syllabus. Three fields below — combine them into one paragraph in your
          vault. Optional: post to the cohort Discord. Public commitment makes it more likely to
          actually happen.
        </p>

        <div style={s.grid}>
          <div style={s.box}>
            <label htmlFor="fd-ship" style={s.lbl}>NEXT THING I'M GOING TO SHIP</label>
            <p style={s.sub}>Specific. Not "build something." Name an artifact.</p>
            <textarea
              id="fd-ship"
              style={s.textarea}
              placeholder='e.g. "A working Pomodoro timer for my own use, deployed somewhere I can actually use it."'
              value={ship}
              onChange={save(SHIP_KEY, setShip)}
            />
          </div>

          <div style={s.box}>
            <label htmlFor="fd-habit" style={s.lbl}>HABIT FROM THIS COURSE THAT WILL GET ME THERE</label>
            <p style={s.sub}>Specific to your vault, your tools, your routines.</p>
            <textarea
              id="fd-habit"
              style={s.textarea}
              placeholder='e.g. "Capturing template into Bugs/ folder every time I get stuck for &gt; 4 minutes."'
              value={habit}
              onChange={save(HABIT_KEY, setHabit)}
            />
          </div>

          <div style={s.box}>
            <label htmlFor="fd-when" style={s.lbl}>BY WHEN</label>
            <p style={s.sub}>A real date. "Spring break" works. "Soon" doesn't.</p>
            <input
              id="fd-when"
              type="text"
              style={s.input}
              placeholder='e.g. "Friday before Spring break."'
              value={when}
              onChange={save(WHEN_KEY, setWhen)}
            />
          </div>
        </div>

        {ready && (
          <div style={s.preview}>
            <div style={s.previewLbl}>YOUR TRAJECTORY · COMPOSED</div>
            <p style={s.previewBody}>
              By <strong>{when}</strong>, I'm going to ship <strong>{ship}</strong>. The habit from this course that will get me there is <strong>{habit}</strong>.
            </p>
            <p style={s.previewSub}>Copy this paragraph. Paste into Reflections/W08-trajectory.md in your vault.</p>
          </div>
        )}

        <div style={s.discordCard}>
          <div style={s.discordHead}>
            <div>
              <div style={s.discordTitle}>Optional · public commitment</div>
              <div style={s.discordSub}>Post your trajectory paragraph to the cohort Discord. Public commitments are 2× more likely to happen.</div>
            </div>
            <button
              type="button"
              onClick={togglePosted}
              aria-pressed={posted}
              style={{ ...s.discordBtn, ...(posted ? s.discordBtnDone : {}) }}
            >
              {posted ? '✓ Posted' : 'Mark posted'}
            </button>
          </div>
        </div>

        <div style={s.exportCard}>
          <div style={s.exportLbl}>FINAL ARTIFACT · TO CANVAS</div>
          <p style={s.exportBody}>
            Scroll to the bottom of this page. Click <strong>"Export your work (.txt)"</strong> on
            the reflection journal. The .txt is the entire course's record of you, externalized —
            self-checks, reflection, trajectory, all in one file. Drop it into Canvas as the closing
            artifact.
          </p>
        </div>

        <div style={s.outro}>
          You started with a seed. You leave with a vault and a v1. Two artifacts. Both yours. Both
          outlast the course.
        </div>
      </div>
    );
  }

  const s = {
    root: { paddingTop: 24 },
    kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
    h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
    em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
    lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

    grid: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 },
    box: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 6, padding: '14px 18px' },
    lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em', marginBottom: 4 },
    sub: { fontSize: 12.5, color: 'var(--ink-500)', margin: '0 0 8px', fontStyle: 'italic', lineHeight: 1.4 },
    textarea: { width: '100%', minHeight: 60, padding: '8px 10px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },
    input: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },

    preview: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '16px 20px', borderRadius: 4, borderLeft: '4px solid var(--signal-green)', marginBottom: 16 },
    previewLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-green)', letterSpacing: '0.18em', marginBottom: 8 },
    previewBody: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.5, color: 'var(--paper-50)', margin: '0 0 8px' },
    previewSub: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--paper-300)', margin: 0 },

    discordCard: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderLeft: '4px solid var(--signal-blue)', borderRadius: 6, padding: '12px 16px', marginBottom: 14 },
    discordHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' },
    discordTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, fontWeight: 600, color: 'var(--ink-900)' },
    discordSub: { fontSize: 13, color: 'var(--ink-500)', marginTop: 2, lineHeight: 1.5 },
    discordBtn: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 14px', background: 'transparent', color: 'var(--ink-900)', border: '1.5px solid var(--ink-900)', borderRadius: 3, cursor: 'pointer' },
    discordBtnDone: { background: 'var(--signal-green)', color: '#fff', borderColor: 'var(--signal-green)' },

    exportCard: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderLeft: '4px solid var(--signal-amber)', borderRadius: 6, padding: '14px 18px', marginBottom: 18 },
    exportLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 8 },
    exportBody: { fontSize: 14, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0 },

    outro: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.45, color: 'var(--ink-500)', margin: 0 },
  };

  window.FDSectionTrajectory = FDSectionTrajectory;
})();
