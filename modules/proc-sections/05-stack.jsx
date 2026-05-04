// Section 05 — Build Your Motivation Stack (20 min) — DELIVERABLE #2
// Students map their personal autonomy / mastery / purpose levers,
// then design ONE study ritual that uses all three.
// Self-Determination Theory, but practical and personal.

function ProcSectionStack() {
  const KEY = 'proc-stack-v1';
  const blank = {
    autonomy: ['', '', ''],
    mastery: ['', '', ''],
    purpose: ['', '', ''],
    ritualWhen: '',
    ritualWhere: '',
    ritualWhat: '',
    ritualA: '', ritualM: '', ritualP: '',
  };
  const [s, setS] = React.useState(() => {
    try { return { ...blank, ...(JSON.parse(localStorage.getItem(KEY) || '{}')) }; }
    catch { return blank; }
  });
  React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(s)); }, [s]);
  const setLever = (kind, i, v) => setS(st => ({ ...st, [kind]: st[kind].map((x, j) => j === i ? v : x) }));
  const set = (k, v) => setS(st => ({ ...st, [k]: v }));

  const levers = [
    {
      key: 'autonomy', label: 'AUTONOMY', color: 'var(--signal-blue-text)',
      sub: 'Where do I get to choose?',
      hint: 'When/how/with whom you work. What you read first. Which problem you tackle. Even small choices count.',
      seeds: ['"I pick the order I do problems in."', '"I choose to study at the library, not my dorm."', '"I get to write about a topic I picked."'],
    },
    {
      key: 'mastery', label: 'MASTERY', color: 'var(--signal-amber-text)',
      sub: 'Where am I getting better?',
      hint: 'What skill is this work building? Visible progress is fuel. Track something concrete.',
      seeds: ['"My code now runs without 6 syntax errors."', '"I can read a stats paper without panicking."', '"My drafts are 30% shorter and clearer."'],
    },
    {
      key: 'purpose', label: 'PURPOSE', color: 'var(--signal-red-text)',
      sub: 'Why does this matter to anyone?',
      hint: 'Connect to a person, a future you, or a question you genuinely care about. "It\u2019s on the syllabus" doesn\u2019t count.',
      seeds: ['"My grandma immigrated and learned this language."', '"This is the class I told my advisor I\u2019d ace."', '"Future-me applying to grad school needs this on the transcript."'],
    },
  ];

  const filled = (k) => s[k].filter(x => x.trim()).length;
  const ritualReady = s.ritualWhen && s.ritualWhere && s.ritualWhat && s.ritualA && s.ritualM && s.ritualP;

  const [copyState, setCopyState] = React.useState('idle');
  const onCopy = async () => {
    const lines = [
      'CSCI-Y100 · Motivation Stack',
      '',
      'AUTONOMY levers:',
      ...s.autonomy.map((l, i) => `  ${i+1}. ${l || '(blank)'}`),
      '',
      'MASTERY levers:',
      ...s.mastery.map((l, i) => `  ${i+1}. ${l || '(blank)'}`),
      '',
      'PURPOSE levers:',
      ...s.purpose.map((l, i) => `  ${i+1}. ${l || '(blank)'}`),
      '',
      'RITUAL',
      `  When:  ${s.ritualWhen || '(blank)'}`,
      `  Where: ${s.ritualWhere || '(blank)'}`,
      `  What:  ${s.ritualWhat || '(blank)'}`,
      `  Autonomy hit: ${s.ritualA || '(blank)'}`,
      `  Mastery hit:  ${s.ritualM || '(blank)'}`,
      `  Purpose hit:  ${s.ritualP || '(blank)'}`,
    ];
    const text = lines.join('\n');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'absolute'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (e) {}
  };

  return (
    <div style={st.root}>
      <div style={st.kicker}>⑤ DELIVERABLE · MOTIVATION STACK · 20 MIN</div>
      <h1 style={st.h1}>
        Find your <em style={st.em}>levers</em>. Build one ritual that uses all three.
      </h1>
      <p style={st.lede}>
        Decades of motivation research keep returning the same three switches:
        <strong> autonomy, mastery, purpose.</strong> Generic advice ignores them. We won't.
        Map yours, then design <em>one</em> study ritual that flips all three.
      </p>

      <div style={st.leverGrid}>
        {levers.map(lv => (
          <div key={lv.key} style={{ ...st.leverCard, borderTopColor: lv.color }}>
            <div style={{ ...st.leverHead, color: lv.color }}>{lv.label}</div>
            <div style={st.leverSub}>{lv.sub}</div>
            <div style={st.leverHint}>{lv.hint}</div>
            <div style={st.leverSeeds}>
              <span style={st.leverSeedsLbl}>EXAMPLES</span>
              <ul style={st.leverSeedsList}>
                {lv.seeds.map((sd, i) => <li key={i}>{sd}</li>)}
              </ul>
            </div>
            <div style={st.leverInputs}>
              {[0,1,2].map(i => (
                <input
                  key={i}
                  value={s[lv.key][i]}
                  onChange={e => setLever(lv.key, i, e.target.value)}
                  placeholder={`Your ${lv.label.toLowerCase()} lever ${i+1}`}
                  style={st.leverInput}
                  aria-label={`${lv.label} lever ${i+1}`}
                />
              ))}
            </div>
            <div style={st.leverCount}>{filled(lv.key)}/3 filled</div>
          </div>
        ))}
      </div>

      <div style={st.ritualSection}>
        <div style={st.ritualKicker}>NOW STACK THEM · ONE RITUAL · ALL THREE LEVERS</div>
        <h2 style={st.ritualH2}>Design a 25-minute study ritual you'll actually run.</h2>

        <div style={st.ritualGrid}>
          <div style={st.ritualField}>
            <label style={st.ritualLbl} htmlFor="r-when">WHEN</label>
            <input id="r-when" style={st.ritualInput} value={s.ritualWhen} onChange={e => set('ritualWhen', e.target.value)} placeholder="e.g. weekday mornings, 8:30–8:55am" />
          </div>
          <div style={st.ritualField}>
            <label style={st.ritualLbl} htmlFor="r-where">WHERE</label>
            <input id="r-where" style={st.ritualInput} value={s.ritualWhere} onChange={e => set('ritualWhere', e.target.value)} placeholder="e.g. Wells library, 3rd floor, by the window" />
          </div>
          <div style={{ ...st.ritualField, gridColumn: '1 / -1' }}>
            <label style={st.ritualLbl} htmlFor="r-what">WHAT (the actual move)</label>
            <input id="r-what" style={st.ritualInput} value={s.ritualWhat} onChange={e => set('ritualWhat', e.target.value)} placeholder="e.g. 25 min of one problem set, no phone, with timer + tea" />
          </div>
        </div>

        <div style={st.stackHead}>
          <span style={st.stackHeadLbl}>HOW DOES THIS RITUAL HIT EACH LEVER?</span>
          <span style={st.stackHeadHint}>One sentence each. If you can't fill all three, the ritual won't stick.</span>
        </div>

        <div style={st.stackGrid}>
          <StackHit color="var(--signal-blue-text)" lbl="AUTONOMY" v={s.ritualA} on={v => set('ritualA', v)} ph="e.g. I pick which problem to start with" />
          <StackHit color="var(--signal-amber-text)" lbl="MASTERY" v={s.ritualM} on={v => set('ritualM', v)} ph="e.g. tracking minutes-to-first-attempt — getting faster" />
          <StackHit color="var(--signal-red-text)" lbl="PURPOSE" v={s.ritualP} on={v => set('ritualP', v)} ph="e.g. this is the class my future-self needs" />
        </div>

        {ritualReady && (
          <div style={st.ritualDone}>
            <div style={st.ritualDoneLbl}>◇ RITUAL DESIGNED</div>
            <div style={st.ritualDoneBody}>
              <strong>Run it tomorrow.</strong> Not perfectly. Once. Then again. The ritual is the strategy —
              your motivation is what shows up <em>because</em> the ritual ran, not before it.
            </div>
          </div>
        )}

        <div style={st.exportBar}>
          <button onClick={onCopy} style={st.btnExport} aria-live="polite">
            {copyState === 'copied' ? '✓ Copied to clipboard' : 'Copy stack as text'}
          </button>
          <button onClick={() => window.print()} style={st.btnExportGhost}>Print this page</button>
        </div>
      </div>
    </div>
  );
}

function StackHit({ color, lbl, v, on, ph }) {
  return (
    <div style={{ ...st.hit, borderLeftColor: color }}>
      <div style={{ ...st.hitLbl, color }}>{lbl}</div>
      <textarea
        value={v}
        onChange={e => on(e.target.value)}
        placeholder={ph}
        rows={2}
        style={st.hitArea}
        aria-label={`How the ritual hits ${lbl}`}
      />
    </div>
  );
}

const st = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.05 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 32px' },

  leverGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 },
  leverCard: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderTop: '4px solid', borderRadius: '6px 6px 4px 4px', padding: '16px 18px', display: 'flex', flexDirection: 'column' },
  leverHead: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 4 },
  leverSub: { fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--ink-700)', marginBottom: 10 },
  leverHint: { fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.5, marginBottom: 12, paddingBottom: 12, borderBottom: '1px dashed var(--paper-300)' },
  leverSeeds: { marginBottom: 12 },
  leverSeedsLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.1em' },
  leverSeedsList: { margin: '6px 0 0 0', paddingLeft: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', lineHeight: 1.55, fontStyle: 'italic' },
  leverInputs: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 },
  leverInput: { padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 13, border: '1.5px solid var(--paper-300)', borderRadius: 3, background: 'var(--paper-50)' },
  leverCount: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', textAlign: 'right' },

  ritualSection: { background: 'var(--paper-100)', border: '2px solid var(--ink-900)', borderRadius: 6, padding: '24px 26px' },
  ritualKicker: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.18em', marginBottom: 8 },
  ritualH2: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, fontStyle: 'italic', margin: '0 0 18px', lineHeight: 1.1 },

  ritualGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 },
  ritualField: { display: 'flex', flexDirection: 'column', gap: 6 },
  ritualLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  ritualInput: { padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: 14, border: '1.5px solid var(--paper-300)', borderRadius: 3, background: 'var(--paper-50)' },

  stackHead: { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10, paddingBottom: 8, borderBottom: '1px dashed var(--paper-300)' },
  stackHeadLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  stackHeadHint: { fontSize: 12, color: 'var(--ink-500)', fontStyle: 'italic' },

  stackGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
  hit: { background: 'var(--paper-50)', borderLeft: '4px solid', padding: '10px 12px' },
  hitLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 6 },
  hitArea: { width: '100%', boxSizing: 'border-box', padding: '6px 8px', fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, border: '1.5px solid var(--paper-300)', borderRadius: 3, background: '#fff', resize: 'vertical' },

  ritualDone: { marginTop: 18, background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderLeft: '4px solid var(--signal-green-text)', padding: '14px 18px', borderRadius: 3, animation: 'fadeUp .3s ease-out' },
  ritualDoneLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', letterSpacing: '0.18em', marginBottom: 6 },
  ritualDoneBody: { fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.55 },

  exportBar: { display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' },
  btnExport: { background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none', padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer' },
  btnExportGhost: { background: 'transparent', color: 'var(--ink-700)', border: '1px solid var(--paper-300)', padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.05em', borderRadius: 3, cursor: 'pointer' },
};

window.ProcSectionStack = ProcSectionStack;
