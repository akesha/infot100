// Section 05 — Reckon (10 min)
// Three textareas. What shipped. What didn't. What next week needs.
// Under 60 words total. Word count visible.

(function () {
  function PSSectionReckon() {
    const SHIPPED_KEY = 'ps:05-reckon:shipped';
    const NOT_KEY = 'ps:05-reckon:not';
    const NEXT_KEY = 'ps:05-reckon:next';

    const [shipped, setShipped] = React.useState('');
    const [notDone, setNotDone] = React.useState('');
    const [nextWeek, setNextWeek] = React.useState('');

    React.useEffect(() => {
      try {
        setShipped(localStorage.getItem(SHIPPED_KEY) || '');
        setNotDone(localStorage.getItem(NOT_KEY) || '');
        setNextWeek(localStorage.getItem(NEXT_KEY) || '');
      } catch (e) {}
    }, []);

    const save = (key, setter) => (e) => {
      const v = e.target.value;
      setter(v);
      try { localStorage.setItem(key, v); } catch (e) {}
    };

    const wc = (str) => str.trim().split(/\s+/).filter(Boolean).length;
    const total = wc(shipped) + wc(notDone) + wc(nextWeek);
    const good = total > 0 && total <= 60;
    const tooLong = total > 60;

    return (
      <div style={s.root}>
        <div style={s.kicker}>⑤ RECKON · 10 MIN · UNDER 60 WORDS</div>
        <h1 style={s.h1}>
          Three <em style={s.em}>sentences</em>.
        </h1>
        <p style={s.lede}>
          The reckoning IS the lesson. Most students discover that "shipping" looked smaller than
          they thought it would. Sit with that. Then write three load-bearing sentences. Under 60
          words total. Bullet points OK; padding not OK.
        </p>

        <div style={s.counter}>
          <span style={s.counterLbl}>WORD COUNT</span>
          <span style={{ ...s.counterN, ...(tooLong ? s.counterOver : good ? s.counterOk : {}) }}>{total}</span>
          <span style={s.counterMax}>/ 60 cap</span>
        </div>

        <div style={s.grid}>
          <div style={s.box}>
            <label htmlFor="ps-reckon-shipped" style={s.lbl}>WHAT SHIPPED</label>
            <p style={s.sub}>Specific. Not "v0.1." Name the artifact + a quality attribute.</p>
            <textarea
              id="ps-reckon-shipped"
              style={s.textarea}
              placeholder='e.g. "Landing page renders in Chrome but breaks on Safari Safari mobile."'
              value={shipped}
              onChange={save(SHIPPED_KEY, setShipped)}
            />
            <span style={s.wcMini}>{wc(shipped)} words</span>
          </div>

          <div style={s.box}>
            <label htmlFor="ps-reckon-not" style={s.lbl}>WHAT DIDN'T</label>
            <p style={s.sub}>Honest gap + reason. "I didn't get to ___ because ___."</p>
            <textarea
              id="ps-reckon-not"
              style={s.textarea}
              placeholder={`e.g. "Save button doesn't persist — I didn't know how to set up localStorage and I didn't push through."`}
              value={notDone}
              onChange={save(NOT_KEY, setNotDone)}
            />
            <span style={s.wcMini}>{wc(notDone)} words</span>
          </div>

          <div style={s.box}>
            <label htmlFor="ps-reckon-next" style={s.lbl}>WHAT NEXT WEEK NEEDS</label>
            <p style={s.sub}>One concrete next move with a target by W5.</p>
            <textarea
              id="ps-reckon-next"
              style={s.textarea}
              placeholder='e.g. "Read 30 min of localStorage docs Wednesday."'
              value={nextWeek}
              onChange={save(NEXT_KEY, setNextWeek)}
            />
            <span style={s.wcMini}>{wc(nextWeek)} words</span>
          </div>
        </div>

        {tooLong && (
          <div style={s.flag}>
            <strong>You're over 60 words.</strong> The constraint matters — it forces specificity.
            Cut the part that adds the least signal.
          </div>
        )}

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>"Yelp-review reckonings."</strong> "I learned a lot today" is not a reckoning.
          Specific &gt; vague. The reckoning's job is to make today's lesson stick — generic praise
          doesn't stick to anything.
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

    counter: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, padding: '10px 14px', background: 'var(--paper-100)', borderRadius: 4 },
    counterLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em' },
    counterN: { fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--ink-900)' },
    counterOk: { color: 'var(--signal-green-text)' },
    counterOver: { color: 'var(--signal-red-text)' },
    counterMax: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' },

    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 14 },
    box: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 6, padding: '14px 16px', position: 'relative' },
    lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em', marginBottom: 4 },
    sub: { fontSize: 12, color: 'var(--ink-500)', margin: '0 0 8px', fontStyle: 'italic', lineHeight: 1.4 },
    textarea: { width: '100%', minHeight: 70, padding: '8px 10px', font: 'inherit', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },
    wcMini: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', marginTop: 6, textAlign: 'right' },

    flag: { background: 'rgba(216, 85, 60, 0.08)', borderLeft: '3px solid var(--signal-red)', padding: '10px 14px', borderRadius: 3, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-700)', marginBottom: 14 },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.PSSectionReckon = PSSectionReckon;
})();
