// Section 04 — Prompt Lab (25 min) — THE DELIVERABLE
// Students engineer 3 progressively better prompts on a real assignment from
// another class. Below: a "credit ledger" — what they own vs. what AI owes.
// Saves to localStorage.

function AISectionLab() {
  const KEY = 'csciy100_w6_promptlab';
  const [data, setData] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      return {
        course: saved.course || '',
        task: saved.task || '',
        v1: saved.v1 || '',
        v2: saved.v2 || '',
        v3: saved.v3 || '',
        ledger: saved.ledger || {},
      };
    } catch { return { course: '', task: '', v1: '', v2: '', v3: '', ledger: {} }; }
  });

  React.useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const setOwner = (item, who) => setData(d => ({ ...d, ledger: { ...d.ledger, [item]: who } }));

  const ledgerItems = [
    "Reading the prompt carefully",
    "Deciding the goal of the work",
    "Drafting a first attempt myself",
    "Catching factual errors in the answer",
    "Re-typing code (vs. copy-paste)",
    "Citing AI use in the submission",
    "Getting unblocked on syntax",
    "Generating ideas to choose between",
    "Translating jargon I don't know",
    "Summarizing a long article I read",
  ];

  const filledPrompts = !!(data.course && data.task && data.v1 && data.v2 && data.v3);
  const ledgerCount = Object.keys(data.ledger).length;
  const filled = filledPrompts && ledgerCount >= 8;

  const [copyState, setCopyState] = React.useState('idle');
  const onCopy = async () => {
    const lines = [
      'INFO-T 100 · Prompt Lab',
      '',
      `Course: ${data.course || '(blank)'}`,
      `Task:   ${data.task || '(blank)'}`,
      '',
      'V1 — Vague:', `  ${(data.v1 || '(blank)').replace(/\n/g, '\n  ')}`, '',
      'V2 — Better (FRAME):', `  ${(data.v2 || '(blank)').replace(/\n/g, '\n  ')}`, '',
      'V3 — Co-pilot (FRAME + PROBE + VERIFY):', `  ${(data.v3 || '(blank)').replace(/\n/g, '\n  ')}`, '',
      'CREDIT LEDGER',
    ];
    ledgerItems.forEach((item, i) => {
      const cur = data.ledger[item] || '—';
      lines.push(`  ${(i+1).toString().padStart(2,'0')} ${item}: ${cur}`);
    });
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
    <div style={pl.root}>
      <div style={pl.kicker}>④ PROMPT LAB · 25 MIN · SUBMIT THIS</div>
      <h1 style={pl.h1}>
        Engineer your own<br />
        <em style={pl.em}>co-pilot prompt.</em>
      </h1>
      <p style={pl.lede}>
        Open a real assignment from another class — anything you have due in the next two weeks.
        You'll write the same prompt <strong>three times</strong>, each one better than the last.
        Then sign the credit ledger. <span style={{ color: 'var(--ink-500)' }}>Saves automatically.</span>
      </p>

      <div style={pl.setup}>
        <div style={pl.setupRow}>
          <label style={pl.setupLabel}>① WHAT CLASS?</label>
          <input
            type="text"
            value={data.course}
            onChange={(e) => update('course', e.target.value)}
            placeholder="e.g. ENG-W131, MATH-M211, CSCI-A201..."
            style={pl.input}
            aria-label="Course code"
          />
        </div>
        <div style={pl.setupRow}>
          <label style={pl.setupLabel}>② WHAT TASK?</label>
          <input
            type="text"
            value={data.task}
            onChange={(e) => update('task', e.target.value)}
            placeholder="e.g. Write a 3-page essay analyzing the rhetoric of..."
            style={pl.input}
            aria-label="Task description"
          />
        </div>
      </div>

      <div style={pl.versions}>
        <PromptVersion
          n="V1" color="var(--signal-red)" label="Vague" sub="The lazy ask"
          hint="Write your prompt the way you would have BEFORE this class."
          example="e.g. 'help me write my english essay'"
          value={data.v1}
          onChange={(v) => update('v1', v)}
        />
        <PromptVersion
          n="V2" color="var(--signal-amber)" label="Better" sub="With FRAME"
          hint="Add: course level + what you've tried + what 'good' looks like."
          example="e.g. 'I'm in W131. The prompt is X. My thesis draft is Y. What's weak about it?'"
          value={data.v2}
          onChange={(v) => update('v2', v)}
        />
        <PromptVersion
          n="V3" color="var(--signal-green)" label="Co-pilot" sub="FRAME + PROBE + VERIFY"
          hint="Add: a follow-up question, a verification step, AND a constraint that keeps you in the loop."
          example="e.g. 'Critique my thesis. Then ask me 2 questions before suggesting changes. Don't rewrite — point at what's weak so I can fix it myself.'"
          value={data.v3}
          onChange={(v) => update('v3', v)}
        />
      </div>

      <div style={pl.ledgerWrap}>
        <div style={pl.ledgerHead}>
          <div style={pl.ledgerTitle}>THE CREDIT LEDGER</div>
          <div style={pl.ledgerSub}>For each task — who owns it? <em>You</em>, <em>AI</em>, or <em>shared</em>?</div>
        </div>
        <div style={pl.ledger}>
          {ledgerItems.map((item, i) => {
            const cur = data.ledger[item];
            return (
              <div key={i} style={pl.ledgerRow}>
                <span style={pl.ledgerN}>{(i+1).toString().padStart(2, '0')}</span>
                <span style={pl.ledgerLbl}>{item}</span>
                <div style={pl.ownerBtns} role="radiogroup" aria-label={item}>
                  {[
                    { id: 'me', label: 'ME', color: 'var(--crimson)', textColor: '#fff' },
                    { id: 'shared', label: 'SHARED', color: 'var(--signal-amber)', textColor: 'var(--ink-900)' },
                    { id: 'ai', label: 'AI', color: 'var(--signal-blue)', textColor: '#fff' },
                  ].map(o => (
                    <button
                      key={o.id}
                      role="radio"
                      aria-checked={cur === o.id}
                      onClick={() => setOwner(item, o.id)}
                      style={{
                        ...pl.ownerBtn,
                        ...(cur === o.id ? { background: o.color, color: o.textColor, borderColor: o.color } : {}),
                      }}
                    >{o.label}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={pl.submit}>
        <div style={pl.submitMeta}>
          <span style={pl.submitChip}>Prompts: {[data.v1, data.v2, data.v3].filter(Boolean).length}/3</span>
          <span style={pl.submitChip}>Ledger: {ledgerCount}/{ledgerItems.length}</span>
          <button onClick={onCopy} style={pl.submitChipBtn} aria-live="polite">
            {copyState === 'copied' ? '✓ Copied' : 'Copy as text'}
          </button>
        </div>
        <button
          style={{ ...pl.submitBtn, opacity: filled ? 1 : 0.4, cursor: filled ? 'pointer' : 'not-allowed' }}
          disabled={!filled}
        >
          {filled ? '✓ Submit on Canvas → Week 6 Prompt Lab' : 'Fill all 3 prompts + at least 8 ledger rows to submit'}
        </button>
      </div>
    </div>
  );
}

function PromptVersion({ n, color, label, sub, hint, example, value, onChange }) {
  return (
    <div style={{ ...pl.version, borderTopColor: color }}>
      <div style={pl.vTop}>
        <span style={{ ...pl.vBadge, background: color }}>{n}</span>
        <div>
          <div style={pl.vLabel}>{label}</div>
          <div style={pl.vSub}>{sub}</div>
        </div>
      </div>
      <div style={pl.vHint}>↳ {hint}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={example}
        style={pl.vTextarea}
        aria-label={`Prompt version ${n}: ${label}`}
      />
    </div>
  );
}

const pl = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 20px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 32px' },

  setup: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '18px 20px', marginBottom: 22,
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  setupRow: { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 14, alignItems: 'center' },
  setupLabel: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.1em' },
  input: {
    width: '100%', padding: '10px 12px',
    fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)',
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)',
    borderRadius: 4,
  },

  versions: { display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 },
  version: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderTop: '4px solid', borderRadius: 6, padding: '16px 20px',
  },
  vTop: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 },
  vBadge: {
    color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
    padding: '5px 11px', borderRadius: 3, letterSpacing: '0.05em',
  },
  vLabel: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1, fontStyle: 'italic' },
  vSub: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', letterSpacing: '0.05em' },
  vHint: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', fontStyle: 'italic', margin: '8px 0 10px' },
  vTextarea: {
    width: '100%', minHeight: 80, padding: '12px 14px',
    fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)',
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)',
    borderRadius: 4, resize: 'vertical', lineHeight: 1.5,
  },

  ledgerWrap: {
    background: 'var(--paper-50)', border: '2px solid var(--ink-900)',
    borderRadius: 6, padding: 0, marginBottom: 24, overflow: 'hidden',
  },
  ledgerHead: { background: 'var(--ink-900)', color: 'var(--paper-100)', padding: '14px 20px' },
  ledgerTitle: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--paper-50)' },
  ledgerSub: { fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--paper-300)', marginTop: 4 },
  ledger: { display: 'flex', flexDirection: 'column' },
  ledgerRow: {
    display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'center',
    padding: '10px 20px', borderBottom: '1px dashed var(--paper-200)',
  },
  ledgerN: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)' },
  ledgerLbl: { fontSize: 13.5, color: 'var(--ink-900)' },
  ownerBtns: { display: 'flex', gap: 4 },
  ownerBtn: {
    background: 'var(--paper-50)', border: '1.5px solid var(--paper-300)',
    color: 'var(--ink-700)', fontFamily: 'var(--font-mono)', fontSize: 9.5,
    fontWeight: 700, padding: '5px 10px', borderRadius: 2, cursor: 'pointer',
    letterSpacing: '0.05em', transition: 'all .12s',
  },

  submit: {
    background: 'var(--paper-100)', border: '1px solid var(--paper-200)',
    borderRadius: 6, padding: '16px 20px',
    display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center',
  },
  submitMeta: { display: 'flex', gap: 10 },
  submitChip: {
    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-700)',
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)',
    padding: '5px 10px', borderRadius: 3,
  },
  submitChipBtn: {
    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-900)',
    background: 'var(--paper-50)', border: '1px solid var(--ink-900)',
    padding: '5px 10px', borderRadius: 3, cursor: 'pointer', fontWeight: 700,
  },
  submitBtn: {
    background: 'var(--signal-green)', color: '#fff', border: 'none',
    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    padding: '11px 18px', borderRadius: 3, letterSpacing: '0.05em',
  },
};

window.AISectionLab = AISectionLab;
