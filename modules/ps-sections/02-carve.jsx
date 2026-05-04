// Section 02 — Carve v0.1 (15 min)
// Three load-bearing fields: WHO, WHAT, HOW SOMEONE TESTS IT.
// Constraint: testable by another human in under 5 minutes.

(function () {
  function PSSectionCarve() {
    const WHO_KEY = 'ps:02-carve:who';
    const WHAT_KEY = 'ps:02-carve:what';
    const HOW_KEY = 'ps:02-carve:how';

    const [who, setWho] = React.useState('');
    const [what, setWhat] = React.useState('');
    const [how, setHow] = React.useState('');

    React.useEffect(() => {
      try {
        setWho(localStorage.getItem(WHO_KEY) || '');
        setWhat(localStorage.getItem(WHAT_KEY) || '');
        setHow(localStorage.getItem(HOW_KEY) || '');
      } catch (e) {}
    }, []);

    const save = (key, setter) => (e) => {
      const v = e.target.value;
      setter(v);
      try { localStorage.setItem(key, v); } catch (e) {}
    };

    const ready = who.trim() && what.trim() && how.trim();
    const wordCount = (s) => s.trim().split(/\s+/).filter(Boolean).length;
    const whoWords = wordCount(who);
    const whatWords = wordCount(what);

    return (
      <div style={s.root}>
        <div style={s.kicker}>② CARVE · 15 MIN · CONSTRAINT IS THE TOOL</div>
        <h1 style={s.h1}>
          Carve <em style={s.em}>v0.1</em>.
        </h1>
        <p style={s.lede}>
          v0.1 is not "small for now, big later." v0.1 is the smallest, ugliest version that ships.
          Three boxes, three sentences. The constraint is the tool — every "and also it could…"
          makes v0.1 too big to finish in 35 minutes.
        </p>

        <div style={s.grid}>
          <div style={s.box}>
            <div style={s.boxHead}>
              <span style={s.boxN}>01</span>
              <h2 style={s.boxTitle}>WHO</h2>
              <span style={whoWords > 0 && whoWords < 8 ? s.flagOk : whoWords >= 8 ? s.flagWarn : s.flagEmpty}>
                {whoWords === 0 ? '—' : whoWords < 8 ? '✓' : '⚠ wordy'}
              </span>
            </div>
            <p style={s.boxLede}>One specific person. Not "users." Not "students."</p>
            <textarea
              style={s.textarea}
              placeholder='e.g. "Freshmen in Briscoe with one shared bathroom on the floor"'
              value={who}
              onChange={save(WHO_KEY, setWho)}
              aria-label="Who is v0.1 for"
            />
            <p style={s.hint}>If you used the word "users" or "students," delete it and write a sharper version.</p>
          </div>

          <div style={s.box}>
            <div style={s.boxHead}>
              <span style={s.boxN}>02</span>
              <h2 style={s.boxTitle}>WHAT</h2>
              <span style={whatWords > 0 && whatWords < 14 ? s.flagOk : whatWords >= 14 ? s.flagWarn : s.flagEmpty}>
                {whatWords === 0 ? '—' : whatWords < 14 ? '✓' : '⚠ wordy'}
              </span>
            </div>
            <p style={s.boxLede}>One verb, one outcome.</p>
            <textarea
              style={s.textarea}
              placeholder='e.g. "Lets them log a bathroom occupancy in 2 taps"'
              value={what}
              onChange={save(WHAT_KEY, setWhat)}
              aria-label="What does v0.1 do"
            />
            <p style={s.hint}>If you used the word "and" twice or more, delete one of them. v0.1 does ONE thing.</p>
          </div>

          <div style={s.box}>
            <div style={s.boxHead}>
              <span style={s.boxN}>03</span>
              <h2 style={s.boxTitle}>HOW SOMEONE TESTS</h2>
              <span style={how.trim() ? s.flagOk : s.flagEmpty}>{how.trim() ? '✓' : '—'}</span>
            </div>
            <p style={s.boxLede}>Another human, under 5 minutes.</p>
            <textarea
              style={s.textarea}
              placeholder="e.g. Hand them my phone. They open the app, tap one button, see the count update."
              value={how}
              onChange={save(HOW_KEY, setHow)}
              aria-label="How someone tests v0.1"
            />
            <p style={s.hint}>If the test takes longer than 5 minutes, your v0.1 is too big.</p>
          </div>
        </div>

        {ready && (
          <div style={s.success}>
            <strong>✓ v0.1 carved.</strong> Take a screenshot of these three boxes — you'll come back
            to them in the reckoning.
          </div>
        )}

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>THE TRAP</div>
          <strong>"And also it could…"</strong> Every "also" makes v0.1 too big. Cut it. The carved
          version is ugly on purpose — that's how you ship something in 35 minutes.
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

    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 18 },
    box: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 6, padding: '16px 18px' },
    boxHead: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' },
    boxN: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
    boxTitle: { fontFamily: 'var(--font-mono)', fontStyle: 'normal', fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', margin: 0, letterSpacing: '0.12em', flex: 1 },
    boxLede: { fontSize: 13, color: 'var(--ink-500)', margin: '0 0 10px', fontStyle: 'italic', lineHeight: 1.4 },
    textarea: { width: '100%', minHeight: 70, padding: '10px 12px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },
    hint: { fontSize: 11.5, color: 'var(--ink-500)', lineHeight: 1.4, margin: '8px 0 0' },

    flagOk: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-green-text)', letterSpacing: '0.05em' },
    flagWarn: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.05em' },
    flagEmpty: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-300)' },

    success: { background: 'rgba(93, 187, 126, 0.1)', border: '1px solid var(--signal-green)', borderRadius: 4, padding: '12px 16px', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', marginBottom: 18 },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.PSSectionCarve = PSSectionCarve;
})();
