// Section 4 — Bug Report Builder
// The deliverable. GitHub-issue-style form across 4 fields. Saves to localStorage.
// Live preview renders below as it would on github.com.

function SectionBugReport() {
  const KEY = 'csciy100_w6_bugreport';
  const [report, setReport] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      return {
        symptom: saved.symptom || '',
        repro: saved.repro || [],
        hypothesis: saved.hypothesis || '',
        fix: saved.fix || '',
        ...saved,
      };
    } catch { return { symptom: '', repro: [], hypothesis: '', fix: '' }; }
  });

  React.useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(report));
  }, [report]);

  const reproOptions = [
    "I open the assignment and feel overwhelmed",
    "I switch to Discord/Insta/YouTube",
    "I tell myself I'll start in 15 minutes",
    "I 'productively' do laundry / clean / replan",
    "I open the file but don't write anything",
    "I work, but at the wrong time of day",
    "I start, hit one error, and quit",
  ];

  const toggleRepro = (s) => {
    setReport(r => ({ ...r, repro: r.repro.includes(s) ? r.repro.filter(x => x !== s) : [...r.repro, s] }));
  };

  const filled = !!(report.symptom && report.repro.length && report.hypothesis && report.fix);

  const [copyState, setCopyState] = React.useState('idle');
  const onCopy = async () => {
    const text = [
      'INFO-T 100 · Bug Report (study-habit issue)',
      '',
      '# Symptom', report.symptom || '(blank)',
      '',
      '# Steps to reproduce',
      ...(report.repro.length ? report.repro.map((r, i) => `  ${i+1}. ${r}`) : ['  (none checked)']),
      '',
      '# Hypothesis', report.hypothesis || '(blank)',
      '',
      '# Fix to try this week', report.fix || '(blank)',
    ].join('\n');
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
    <div style={br.root}>
      <div style={br.kicker}>④ THE EXERCISE · 20 MIN · SUBMIT THIS</div>
      <h1 style={br.h1}>
        Open an issue<br />
        against <em style={br.em}>yourself</em>.
      </h1>
      <p style={br.lede}>
        Pick <strong>one</strong> study-habit bug. Not "I procrastinate" — too vague to debug.
        Something specific. Fill out the four fields like you'd file a real GitHub issue. Your
        answers save automatically.
      </p>

      <div style={br.layout}>
        {/* Form */}
        <div style={br.form}>
          <Field
            n="01" label="# Symptom"
            hint="What keeps happening? Be specific."
            example="e.g. 'I open Canvas, see the assignment, and immediately switch to YouTube.'"
          >
            <textarea
              value={report.symptom}
              onChange={(e) => setReport(r => ({ ...r, symptom: e.target.value }))}
              placeholder="Describe the symptom in one or two sentences..."
              aria-label="Symptom — what keeps happening"
              style={br.textarea}
            />
          </Field>

          <Field
            n="02" label="# Steps to reproduce"
            hint="Check every step you actually do. The pattern IS the bug."
          >
            <div style={br.checkList}>
              {reproOptions.map((s, i) => {
                const on = report.repro.includes(s);
                return (
                  <label key={i} style={{
                    ...br.checkRow,
                    background: on ? 'rgba(232,169,59,0.12)' : 'transparent',
                    borderColor: on ? 'var(--signal-amber)' : 'var(--paper-200)',
                  }}>
                    <input type="checkbox" checked={on} onChange={() => toggleRepro(s)} style={{ accentColor: 'var(--signal-amber)' }} />
                    <span style={br.checkN}>{(i + 1).toString().padStart(2, '0')}.</span>
                    <span style={br.checkLbl}>{s}</span>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field
            n="03" label="# Hypothesis"
            hint="What do you THINK is causing the bug? Specific theory, not self-blame."
            example="e.g. 'The prompt feels vague — I freeze because I don't know what 'good' looks like.'"
          >
            <textarea
              value={report.hypothesis}
              onChange={(e) => setReport(r => ({ ...r, hypothesis: e.target.value }))}
              placeholder="My hypothesis is..."
              aria-label="Hypothesis — what you think is causing the bug"
              style={br.textarea}
            />
          </Field>

          <Field
            n="04" label="# Smallest fix to try (1 week)"
            hint="ONE change. Small. Testable. Like fixing code: change one thing, see what happens."
            example="e.g. 'When I open the assignment, I write 1 sentence about what it's asking — even if I don't start.'"
          >
            <textarea
              value={report.fix}
              onChange={(e) => setReport(r => ({ ...r, fix: e.target.value }))}
              placeholder="This week I will..."
              aria-label="Fix — the smallest change to try this week"
              style={br.textarea}
            />
          </Field>
        </div>

        {/* Live preview as GitHub issue */}
        <aside style={br.preview}>
          <div style={br.previewLabel}>LIVE PREVIEW · how this looks on github</div>
          <div style={br.gh}>
            <div style={br.ghHead}>
              <span style={{ ...br.ghStatus, background: filled ? 'var(--signal-green)' : 'var(--signal-amber)' }}>
                ● {filled ? 'open' : 'draft'}
              </span>
              <div style={br.ghTitle}>
                {report.symptom ? (report.symptom.length > 60 ? report.symptom.slice(0, 60) + '…' : report.symptom) : 'Bug in my study habits'}
              </div>
              <div style={br.ghMeta}>
                #001 · opened by you · just now
              </div>
            </div>
            <div style={br.ghBody}>
              <div style={br.ghLabel}># Symptom</div>
              <p style={br.ghText}>{report.symptom || <span style={br.placeholder}>(fill in field 01)</span>}</p>

              <div style={br.ghLabel}># Steps to reproduce</div>
              {report.repro.length ? (
                <ol style={br.ghOl}>
                  {report.repro.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              ) : <p style={br.placeholder}>(check items in field 02)</p>}

              <div style={br.ghLabel}># Hypothesis</div>
              <p style={br.ghText}>{report.hypothesis || <span style={br.placeholder}>(fill in field 03)</span>}</p>

              <div style={br.ghLabel}># Fix (this week)</div>
              <p style={br.ghText}>{report.fix || <span style={br.placeholder}>(fill in field 04)</span>}</p>

              <div style={br.ghTags}>
                <span style={{ ...br.ghTag, background: 'var(--signal-pink)' }}>self-debug</span>
                <span style={{ ...br.ghTag, background: 'var(--signal-blue)' }}>1-week-experiment</span>
                {filled && <span style={{ ...br.ghTag, background: 'var(--signal-green)' }}>ready-for-pair</span>}
              </div>
            </div>
            <div style={br.ghFoot}>
              <button
                style={{ ...br.ghBtn, opacity: filled ? 1 : 0.4, cursor: filled ? 'pointer' : 'not-allowed' }}
                disabled={!filled}
              >
                {filled ? '✓ Submit issue (Canvas → Week 6)' : 'Fill all 4 fields to submit'}
              </button>
              <button
                onClick={onCopy}
                style={br.ghBtnGhost}
                aria-live="polite"
              >
                {copyState === 'copied' ? '✓ Copied to clipboard' : 'Copy as plain text'}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ n, label, hint, example, children }) {
  return (
    <div style={br.field}>
      <div style={br.fieldHead}>
        <span style={br.fieldNum}>{n}</span>
        <span style={br.fieldLabel}>{label}</span>
      </div>
      <div style={br.fieldHint}>↳ {hint}</div>
      {children}
      {example && <div style={br.example}>{example}</div>}
    </div>
  );
}

const br = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 36px' },

  layout: { display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28 },

  form: { display: 'flex', flexDirection: 'column', gap: 22 },
  field: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '18px 20px',
  },
  fieldHead: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 },
  fieldNum: { fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', fontWeight: 600, color: 'var(--crimson)' },
  fieldLabel: { fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' },
  fieldHint: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', fontStyle: 'italic', marginBottom: 12 },
  textarea: {
    width: '100%', minHeight: 64, padding: '12px 14px',
    fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)',
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)',
    borderRadius: 4, resize: 'vertical', lineHeight: 1.5,
  },
  example: {
    marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 13,
    fontStyle: 'italic', color: 'var(--ink-500)',
  },

  checkList: { display: 'flex', flexDirection: 'column', gap: 5 },
  checkRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '9px 11px', border: '1px solid', borderRadius: 3,
    cursor: 'pointer', transition: 'all .15s',
  },
  checkN: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)' },
  checkLbl: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-900)' },

  preview: { position: 'sticky', top: 80, alignSelf: 'flex-start' },
  previewLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', letterSpacing: '0.18em', marginBottom: 10 },
  gh: {
    background: 'var(--paper-50)', border: '1px solid var(--paper-300)',
    borderRadius: 6, overflow: 'hidden', boxShadow: 'var(--shadow-paper)',
  },
  ghHead: {
    padding: '14px 16px', borderBottom: '1px solid var(--paper-200)',
    background: 'var(--paper-100)',
  },
  ghStatus: {
    display: 'inline-block', color: '#fff',
    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
    padding: '3px 8px', borderRadius: 999, letterSpacing: '0.05em',
    marginBottom: 8,
  },
  ghTitle: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.2 },
  ghMeta: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', marginTop: 4 },
  ghBody: { padding: '16px 18px' },
  ghLabel: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-900)', marginTop: 14, marginBottom: 6 },
  ghText: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-900)', lineHeight: 1.55, margin: 0 },
  ghOl: { margin: '0 0 0 18px', padding: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-900)', lineHeight: 1.7 },
  placeholder: { color: 'var(--ink-300)', fontStyle: 'italic' },
  ghTags: { display: 'flex', gap: 6, marginTop: 18, flexWrap: 'wrap' },
  ghTag: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: '#fff', padding: '3px 7px', borderRadius: 999, letterSpacing: '0.05em' },
  ghFoot: { padding: '12px 16px', background: 'var(--paper-100)', borderTop: '1px solid var(--paper-200)' },
  ghBtn: {
    background: 'var(--signal-green)', color: '#fff', border: 'none',
    fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700,
    padding: '10px 14px', borderRadius: 3, width: '100%',
    letterSpacing: '0.05em',
  },
  ghBtnGhost: {
    background: 'transparent', color: 'var(--ink-700)',
    border: '1px solid var(--paper-300)',
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
    padding: '8px 12px', borderRadius: 3, width: '100%',
    letterSpacing: '0.05em', marginTop: 8, cursor: 'pointer',
  },
};

window.SectionBugReport = SectionBugReport;
