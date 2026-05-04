// Section 05 — Reckoning · 5 Big Ideas pass-through (15 min)
// Five textareas, one per Big Idea. Each line should reference a vault note
// by name. Plus the W6 trust-dial re-rate inside Big Idea #5.

(function () {
  function FDSectionReckoning() {
    const PREFIX = 'fd:05-reckoning:';
    const TRUST_W6 = 'fd:05-reckoning:trust-w6';
    const TRUST_W8 = 'fd:05-reckoning:trust-w8';
    const TRUST_WHY = 'fd:05-reckoning:trust-why';

    const ideas = [
      { num: 1, statement: 'Making is iteration, not inspiration.', placeholder: 'How did this idea actually land for me? Which vault note proves it?' },
      { num: 2, statement: 'Verbs over tools — capabilities precede equipment.', placeholder: 'Which capability did I grow this term, and which note is the evidence?' },
      { num: 3, statement: 'Time is a system you instrument, not a virtue.', placeholder: 'What about my time changed because of W2 / W7? Vault note?' },
      { num: 4, statement: 'Knowledge worth keeping must be externalized.', placeholder: 'My vault is the proof. Name a specific note that paid me back later.' },
      { num: 5, statement: 'Tools — including AI — are collaborators to interrogate.', placeholder: 'Where did my trust dial move — and which W6 audit caught what?' },
    ];

    const [lines, setLines] = React.useState(() => Array(5).fill(''));
    const [trustW6, setTrustW6] = React.useState('');
    const [trustW8, setTrustW8] = React.useState('');
    const [trustWhy, setTrustWhy] = React.useState('');

    React.useEffect(() => {
      try {
        const next = ideas.map((_, i) => localStorage.getItem(PREFIX + 'idea' + (i + 1)) || '');
        setLines(next);
        setTrustW6(localStorage.getItem(TRUST_W6) || '');
        setTrustW8(localStorage.getItem(TRUST_W8) || '');
        setTrustWhy(localStorage.getItem(TRUST_WHY) || '');
      } catch (e) {}
    }, []);

    const updateLine = (i) => (e) => {
      const v = e.target.value;
      setLines(prev => {
        const next = prev.map((x, idx) => idx === i ? v : x);
        try { localStorage.setItem(PREFIX + 'idea' + (i + 1), v); } catch (e) {}
        return next;
      });
    };

    const updateTrust = (key, setter) => (e) => {
      const v = e.target.value;
      setter(v);
      try { localStorage.setItem(key, v); } catch (e) {}
    };

    const linesDone = lines.filter(l => l.trim()).length;
    const hasVaultRef = (str) => /\[\[/.test(str);
    const refsCount = lines.filter(l => hasVaultRef(l)).length;

    return (
      <div style={s.root}>
        <div style={s.kicker}>⑤ RECKONING · 15 MIN · TO VAULT</div>
        <h1 style={s.h1}>
          Five lines. One per <em style={s.em}>Big Idea</em>.
        </h1>
        <p style={s.lede}>
          The 5 Big Ideas are the spine of the course. The reckoning is where they survive past
          December — or don't. Each line should reference at least one vault note by name (use{' '}
          <code style={s.code}>[[Bugs/W05-bug-report]]</code> Obsidian wikilink syntax). This is
          NOT a Yelp review.
        </p>

        <div style={s.progress}>
          <div style={s.progressItem}>
            <span style={s.progressLbl}>LINES WRITTEN</span>
            <span style={s.progressN}>{linesDone}/5</span>
          </div>
          <div style={s.progressItem}>
            <span style={s.progressLbl}>WITH VAULT REFS</span>
            <span style={{ ...s.progressN, color: refsCount === 5 ? 'var(--signal-green-text)' : 'var(--signal-amber-text)' }}>{refsCount}/5</span>
          </div>
        </div>

        <ol style={s.list}>
          {ideas.map((idea, i) => (
            <li key={idea.num} style={s.item}>
              <div style={s.itemHead}>
                <span style={s.itemN}>#{idea.num}</span>
                <h2 style={s.itemTitle}>{idea.statement}</h2>
                {hasVaultRef(lines[i]) && <span style={s.itemRef}>↳ ref</span>}
              </div>
              <textarea
                style={s.textarea}
                placeholder={idea.placeholder}
                value={lines[i]}
                onChange={updateLine(i)}
                aria-label={`Reckoning for Big Idea ${idea.num}`}
              />
            </li>
          ))}
        </ol>

        <div style={s.trustCard}>
          <div style={s.trustHead}>
            <span style={s.trustLbl}>TRUST DIAL · RE-RATE</span>
            <h2 style={s.trustTitle}>Inside Big Idea #5 · did your trust dial move?</h2>
          </div>
          <div style={s.trustGrid}>
            <div style={s.trustField}>
              <label htmlFor="fd-trust-w6" style={s.trustFieldLbl}>W6 score (0–10)</label>
              <input
                id="fd-trust-w6"
                type="number"
                min="0"
                max="10"
                style={s.trustInput}
                value={trustW6}
                onChange={updateTrust(TRUST_W6, setTrustW6)}
              />
            </div>
            <div style={s.trustField}>
              <label htmlFor="fd-trust-w8" style={s.trustFieldLbl}>W8 score (0–10)</label>
              <input
                id="fd-trust-w8"
                type="number"
                min="0"
                max="10"
                style={s.trustInput}
                value={trustW8}
                onChange={updateTrust(TRUST_W8, setTrustW8)}
              />
            </div>
            <div style={s.trustWhy}>
              <label htmlFor="fd-trust-why" style={s.trustFieldLbl}>Why did the number move? · one sentence</label>
              <textarea
                id="fd-trust-why"
                style={s.trustWhyInput}
                placeholder='e.g. "Down a point because the citation audit caught real fakes." or "Up two because Prompt Lab actually unstuck the Week-7 lab report."'
                value={trustWhy}
                onChange={updateTrust(TRUST_WHY, setTrustWhy)}
              />
            </div>
          </div>
        </div>

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>WATCH FOR</div>
          <strong>"This class was great" reckonings.</strong> That's a Yelp review. The reckoning's
          job is to make today's lessons stick — vague praise doesn't stick to anything. If you can't
          name a vault note, the lesson didn't land in writing — go fix that now while help is in the
          room.
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
    code: { fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--paper-100)', padding: '1px 5px', borderRadius: 3 },

    progress: { display: 'flex', gap: 24, marginBottom: 16, padding: '10px 14px', background: 'var(--paper-100)', borderRadius: 4, flexWrap: 'wrap' },
    progressItem: { display: 'flex', alignItems: 'baseline', gap: 8 },
    progressLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em' },
    progressN: { fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--ink-900)', fontVariantNumeric: 'tabular-nums' },

    list: { listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 },
    item: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderLeft: '4px solid var(--signal-purple)', borderRadius: 4, padding: '14px 18px' },
    itemHead: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, paddingBottom: 6, borderBottom: '1px dashed var(--paper-300)', flexWrap: 'wrap' },
    itemN: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 700, color: 'var(--signal-purple-text)', lineHeight: 1 },
    itemTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: 'var(--ink-900)', margin: 0, lineHeight: 1.2, flex: 1, minWidth: 0 },
    itemRef: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-green-text)', letterSpacing: '0.1em', whiteSpace: 'nowrap' },
    textarea: { width: '100%', minHeight: 60, padding: '8px 10px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },

    trustCard: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '14px 18px', marginBottom: 18 },
    trustHead: { marginBottom: 10 },
    trustLbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.18em', marginBottom: 4 },
    trustTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, fontWeight: 600, color: 'var(--ink-900)', margin: 0, lineHeight: 1.3 },
    trustGrid: { display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: 14, alignItems: 'start' },
    trustField: { display: 'flex', flexDirection: 'column', gap: 4 },
    trustFieldLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.1em' },
    trustInput: { width: 80, padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, textAlign: 'center', boxSizing: 'border-box' },
    trustWhy: { display: 'flex', flexDirection: 'column', gap: 4 },
    trustWhyInput: { width: '100%', minHeight: 40, padding: '6px 10px', font: 'inherit', fontSize: 13, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.FDSectionReckoning = FDSectionReckoning;
})();
