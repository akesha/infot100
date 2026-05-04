// Section 06 — Take-home (5 min)
// Push to GitHub + log three lines. The commit message is the load-bearing
// thing — it names what shipped specifically.

(function () {
  function PSSectionTakeHome() {
    const COMMIT_KEY = 'ps:06-takehome:commit-msg';
    const [commitMsg, setCommitMsg] = React.useState('');

    React.useEffect(() => {
      try { setCommitMsg(localStorage.getItem(COMMIT_KEY) || ''); } catch (e) {}
    }, []);

    const onChange = (e) => {
      const v = e.target.value;
      setCommitMsg(v);
      try { localStorage.setItem(COMMIT_KEY, v); } catch (e) {}
    };

    return (
      <div style={s.root}>
        <div style={s.kicker}>⑥ TAKE-HOME · 5 MIN · PUSH + LOG</div>
        <h1 style={s.h1}>
          Push it <em style={s.em}>now</em>.
        </h1>

        <ol style={s.list}>
          <li style={s.item}>
            <div style={s.itemHead}>
              <span style={s.itemN}>01</span>
              <span style={s.itemTitle}>Stage + commit + push</span>
            </div>
            <div style={s.itemBody}>
              <pre style={s.code}>git add .{'\n'}git commit -m "[your message]"{'\n'}git push</pre>
              <label htmlFor="ps-commit-msg" style={s.lbl}>YOUR COMMIT MESSAGE · NAME WHAT SHIPPED</label>
              <input
                id="ps-commit-msg"
                type="text"
                style={s.input}
                placeholder='e.g. "v0.1 — landing page only, breaks on mobile"'
                value={commitMsg}
                onChange={onChange}
              />
              <p style={s.hint}>Specific commits become searchable history. Generic ("v0.1", "first commit") become noise.</p>
            </div>
          </li>

          <li style={s.item}>
            <div style={s.itemHead}>
              <span style={s.itemN}>02</span>
              <span style={s.itemTitle}>Three lines in your Start Log</span>
            </div>
            <div style={s.itemBody}>
              <ul style={s.subList}>
                <li>GitHub URL · the commit you just pushed.</li>
                <li>Classmate observation count · should be 2.</li>
                <li>Reckoning path · <code style={s.codeInline}>Reflections/W04-reckoning.md</code></li>
              </ul>
            </div>
          </li>
        </ol>

        <div style={s.bigQ}>
          <div style={s.bigQLbl}>WALK OUT WITH THIS</div>
          <div style={s.bigQTxt}>
            "v0.1 → v1 in W8. Today's commit is the start of the trajectory. Every commit between
            now and W8 is a step of iteration that the final demo measures against."
          </div>
        </div>

        <p style={s.outro}>
          Most freshmen never ship anything in their first year of CS. You just did. v0.1 is not
          v1 — but v1 doesn't exist without v0.1. Welcome to iteration.
        </p>
      </div>
    );
  }

  const s = {
    root: { paddingTop: 24 },
    kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
    h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 22px', lineHeight: 1.0 },
    em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },

    list: { listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 10 },
    item: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '14px 18px' },
    itemHead: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8, paddingBottom: 6, borderBottom: '1px dashed var(--paper-300)' },
    itemN: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
    itemTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.2 },
    itemBody: { fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-700)' },

    code: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '12px 14px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.55, margin: '4px 0 12px', overflowX: 'auto' },
    codeInline: { fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--paper-50)', padding: '1px 5px', borderRadius: 3 },
    subList: { paddingLeft: 22, margin: 0, lineHeight: 1.7 },

    lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginTop: 8, marginBottom: 4 },
    input: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
    hint: { fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.5, margin: '6px 0 0' },

    bigQ: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '16px 20px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', marginBottom: 18 },
    bigQLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
    bigQTxt: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.4, color: 'var(--paper-100)' },

    outro: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-700)', fontStyle: 'italic', maxWidth: 720, margin: 0 },
  };

  window.PSSectionTakeHome = PSSectionTakeHome;
})();
