// Section 04 — Procrastination Autopsy (25 min) — DELIVERABLE #1
// Students forensically dissect ONE recent moment they avoided something.
// 5 questions. Identifies trigger, prescribes fix, commits to a tiny next step.
// Persists to localStorage. Single-page printable artifact.

function ProcSectionAutopsy() {
  const KEY = 'proc-autopsy-v1';
  const blank = { task: '', when: '', visible: '', under: '', trigger: '', fix: '', tinyStep: '' };
  const [a, setA] = React.useState(() => {
    try { return { ...blank, ...(JSON.parse(localStorage.getItem(KEY) || '{}')) }; }
    catch { return blank; }
  });
  React.useEffect(() => { localStorage.setItem(KEY, JSON.stringify(a)); }, [a]);
  const set = (k, v) => setA(s => ({ ...s, [k]: v }));

  const triggers = [
    { id: 'AMBIGUITY',  color: 'var(--signal-amber-text)' },
    { id: 'FEAR',       color: 'var(--signal-red-text)' },
    { id: 'BOREDOM',    color: 'var(--signal-blue-text)' },
    { id: 'EXHAUSTION', color: 'var(--signal-green-text)' },
  ];

  const filled = ['task','when','visible','under','trigger','fix','tinyStep'].filter(k => (a[k] || '').trim()).length;

  const [copyState, setCopyState] = React.useState('idle');
  const onCopy = async () => {
    const text = [
      'CSCI-Y100 · Procrastination Autopsy',
      '',
      `01 THE TASK: ${a.task || '(blank)'}`,
      `02 WHEN, EXACTLY: ${a.when || '(blank)'}`,
      `03 WHAT YOU DID INSTEAD:\n  ${(a.visible || '(blank)').replace(/\n/g, '\n  ')}`,
      `04 WHAT WAS UNDERNEATH:\n  ${(a.under || '(blank)').replace(/\n/g, '\n  ')}`,
      `05 TRIGGER: ${a.trigger || '(unset)'}`,
      `06 PRESCRIBED FIX:\n  ${(a.fix || '(blank)').replace(/\n/g, '\n  ')}`,
      `07 ONE TINY STEP — DUE TONIGHT: ${a.tinyStep || '(blank)'}`,
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
    <div style={ap.root}>
      <div style={ap.kicker}>④ DELIVERABLE · PROCRASTINATION AUTOPSY · 25 MIN</div>
      <h1 style={ap.h1}>
        One specific moment. <em style={ap.em}>Pull it apart.</em>
      </h1>
      <p style={ap.lede}>
        Pick one time in the last 7 days you avoided something. Don't generalize ("I always procrastinate").
        We want the <strong>actual moment</strong> — Tuesday 9:47pm, on the couch, paper open in tab 3.
      </p>

      <div style={ap.progress} aria-live="polite">
        <span style={ap.progressLbl}>AUTOPSY · {filled}/7 fields complete</span>
        <span style={{ ...ap.progressBar }} aria-hidden="true">
          <span style={{ ...ap.progressFill, width: `${(filled/7)*100}%` }} />
        </span>
      </div>

      <div style={ap.form}>
        <Field n="01" label="THE TASK" hint="Be specific. Not 'homework' — 'the Y395 reflection paper.'" >
          <input style={ap.input} value={a.task} onChange={e => set('task', e.target.value)} placeholder="e.g. the Y395 reflection paper" />
        </Field>

        <Field n="02" label="WHEN, EXACTLY" hint="Day, time, where you were, what was on your screen." >
          <input style={ap.input} value={a.when} onChange={e => set('when', e.target.value)} placeholder="e.g. Tuesday 9:47pm, on the couch, Doc + 7 tabs open" />
        </Field>

        <Field n="03" label="WHAT YOU DID INSTEAD" hint="What an outside observer would have seen — without judgment." >
          <textarea style={ap.textarea} rows={3} value={a.visible} onChange={e => set('visible', e.target.value)} placeholder="e.g. Re-read the prompt 4 times. Reorganized my Notion. Made tea. Watched 'How to write a thesis' (12 min)." />
        </Field>

        <Field n="04" label="WHAT WAS UNDERNEATH" hint="The honest version. Nobody's reading this but you." >
          <textarea style={ap.textarea} rows={3} value={a.under} onChange={e => set('under', e.target.value)} placeholder="e.g. I don't actually have an opinion yet. Starting feels like committing to a take I'll regret." />
        </Field>

        <Field n="05" label="THE TRIGGER" hint="Pick the closest fit. If two apply, pick the bigger one.">
          <div style={ap.trigGrid} role="radiogroup" aria-label="Pick the trigger">
            {triggers.map(t => (
              <button
                key={t.id}
                role="radio"
                aria-checked={a.trigger === t.id}
                onClick={() => set('trigger', t.id)}
                style={{
                  ...ap.trigBtn,
                  ...(a.trigger === t.id ? { background: t.color, color: '#fff', borderColor: t.color } : { color: t.color, borderColor: t.color }),
                }}
              >{t.id}</button>
            ))}
          </div>
        </Field>

        <Field n="06" label="THE PRESCRIBED FIX" hint="What does this trigger call for? (See section 02 if stuck.)" >
          <textarea style={ap.textarea} rows={2} value={a.fix} onChange={e => set('fix', e.target.value)} placeholder="e.g. Make 'done' tiny: write a 3-sentence draft thesis. Don't aim for good." />
        </Field>

        <Field n="07" label="ONE TINY STEP — DUE TONIGHT" hint="Smaller than you think. 'Open the doc' counts. 'Email the TA' counts." >
          <input style={ap.input} value={a.tinyStep} onChange={e => set('tinyStep', e.target.value)} placeholder="e.g. By 10pm: write the worst-possible 3-sentence thesis." />
        </Field>
      </div>

      {filled === 7 && (
        <div style={ap.done}>
          <div style={ap.doneLbl}>◇ AUTOPSY COMPLETE</div>
          <div style={ap.doneBody}>
            You just turned a vague feeling into a <strong>specific diagnosis with a prescription</strong>.
            That's the work. Print this page or copy it — bring it to your accountability partner this week.
          </div>
        </div>
      )}

      <div style={ap.exportBar}>
        <button onClick={onCopy} style={ap.btnExport} aria-live="polite">
          {copyState === 'copied' ? '✓ Copied to clipboard' : 'Copy autopsy as text'}
        </button>
        <button onClick={() => window.print()} style={ap.btnExportGhost}>Print this page</button>
        <span style={ap.exportNote}>● auto-saves to this device · use Copy to back up</span>
      </div>
    </div>
  );
}

function Field({ n, label, hint, children }) {
  return (
    <div style={ap.field}>
      <div style={ap.fieldHead}>
        <span style={ap.fieldN}>{n}</span>
        <span style={ap.fieldLbl}>{label}</span>
      </div>
      <div style={ap.fieldHint}>{hint}</div>
      {children}
    </div>
  );
}

const ap = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 28px' },

  progress: { display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14, alignItems: 'center', marginBottom: 18 },
  progressLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  progressBar: { height: 8, background: 'var(--paper-200)', borderRadius: 2, position: 'relative', overflow: 'hidden' },
  progressFill: { position: 'absolute', left: 0, top: 0, bottom: 0, background: 'var(--crimson)', transition: 'width .25s' },

  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  field: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 4, padding: '14px 18px' },
  fieldHead: { display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 },
  fieldN: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', fontWeight: 700, letterSpacing: '0.12em' },
  fieldLbl: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.08em' },
  fieldHint: { fontSize: 12.5, color: 'var(--ink-500)', fontStyle: 'italic', marginBottom: 10, lineHeight: 1.4 },
  input: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: 14, border: '1.5px solid var(--paper-300)', borderRadius: 3, background: 'var(--paper-50)' },
  textarea: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, border: '1.5px solid var(--paper-300)', borderRadius: 3, background: 'var(--paper-50)', resize: 'vertical' },

  trigGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 },
  trigBtn: { background: 'var(--paper-50)', border: '1.5px solid', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700, padding: '12px 8px', borderRadius: 3, cursor: 'pointer', letterSpacing: '0.05em' },

  done: { marginTop: 20, background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderLeft: '4px solid var(--signal-green-text)', padding: '18px 22px', borderRadius: 4, animation: 'fadeUp .3s ease-out' },
  doneLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', letterSpacing: '0.18em', marginBottom: 8 },
  doneBody: { fontSize: 14.5, color: 'var(--ink-900)', lineHeight: 1.55 },

  exportBar: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, flexWrap: 'wrap' },
  btnExport: { background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none', padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer' },
  btnExportGhost: { background: 'transparent', color: 'var(--ink-700)', border: '1px solid var(--paper-300)', padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.05em', borderRadius: 3, cursor: 'pointer' },
  exportNote: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', fontWeight: 600 },
};

window.ProcSectionAutopsy = ProcSectionAutopsy;
