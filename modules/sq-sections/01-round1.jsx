// Section 01 — Install round 1: terminal + editor (20 min)
// TAs walk. Verification = student runs `echo "hi"` and `pwd` aloud.
// Each item persists per-student in localStorage so they can pick up later.

function SQSectionRound1() {
  const KEY = 'sq:01-round1:checks';
  const [checks, setChecks] = React.useState({});

  React.useEffect(() => {
    try { const v = localStorage.getItem(KEY); if (v) setChecks(JSON.parse(v)); } catch (e) {}
  }, []);

  const toggle = (id) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const items = [
    { id: 'editor', title: 'Install VS Code (or course-specified editor)', detail: 'code.visualstudio.com — pick your OS. Default install is fine.' },
    { id: 'terminal', title: 'Open the terminal — built-in panel inside VS Code is the move', detail: 'View → Terminal. The panel docks at the bottom of the editor window.' },
    { id: 'navigate', title: 'Navigate one folder up, one folder down. Edit a file. Save.', detail: '`cd ..` to go up, `cd folder-name` to go in. `code filename` opens any file from the terminal.' },
    { id: 'echo', title: 'Verify: run `echo "hi"`', detail: 'Output should appear on the next line. If "command not found", check PATH (see troubleshooting handout).' },
    { id: 'pwd', title: 'Verify: run `pwd`', detail: 'Should print your current folder path. If not, terminal is broken — flag a TA.' },
    { id: 'ta', title: 'Verify with a TA · get initials in your Start Log', detail: 'Both commands run aloud at your machine. TA initials your row.' },
  ];

  const done = items.filter(i => checks[i.id]).length;

  return (
    <div style={r1.root}>
      <div style={r1.kicker}>① ROUND 1 · 20 MIN · TAs WALK</div>
      <h1 style={r1.h1}>
        Round 1 — <em style={r1.em}>terminal</em> + <em style={r1.em}>editor</em>.
      </h1>
      <p style={r1.lede}>
        Six steps. Walk them in order. The verification target is the bottom three — if those three
        run, you're done with Round 1.
      </p>

      <div style={r1.progress}>
        <div style={r1.progressBar}>
          <div style={{ ...r1.progressFill, width: `${(done / items.length) * 100}%` }} />
        </div>
        <div style={r1.progressLbl}>{done} of {items.length} verified</div>
      </div>

      <ol style={r1.list}>
        {items.map((it, i) => (
          <li key={it.id} style={{ ...r1.item, ...(checks[it.id] ? r1.itemDone : {}) }}>
            <button
              type="button"
              onClick={() => toggle(it.id)}
              style={r1.checkBtn}
              aria-pressed={!!checks[it.id]}
              aria-label={`Mark step ${i + 1} ${checks[it.id] ? 'incomplete' : 'complete'}`}
            >
              <span style={r1.checkBox}>{checks[it.id] ? '✓' : ''}</span>
            </button>
            <div style={r1.body}>
              <div style={r1.itemHead}>
                <span style={r1.itemN}>{String(i + 1).padStart(2, '0')}</span>
                <span style={r1.itemTitle}>{it.title}</span>
              </div>
              <div style={r1.itemDetail}>{it.detail}</div>
            </div>
          </li>
        ))}
      </ol>

      <div style={r1.watchfor}>
        <div style={r1.watchforLbl}>WATCH FOR</div>
        <strong>PATH issues on Windows.</strong> The install "succeeds" but the terminal still says
        command not found because PATH didn't update. Fix: close + reopen the terminal. If still
        broken, restart the machine. If still broken, the install didn't add to PATH — re-run the
        installer with "Add to PATH" checked.
      </div>
    </div>
  );
}

const r1 = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

  progress: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 },
  progressBar: { flex: 1, height: 8, background: 'var(--paper-200)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--signal-green)', transition: 'width 200ms ease' },
  progressLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', letterSpacing: '0.05em', whiteSpace: 'nowrap' },

  list: { listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 },
  item: { display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '18px 20px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 6, transition: 'background 150ms ease, border-color 150ms ease' },
  itemDone: { background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)' },
  checkBtn: { background: 'transparent', border: 0, padding: 0, cursor: 'pointer', alignSelf: 'start' },
  checkBox: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, border: '2px solid var(--ink-900)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--signal-green-text)', background: '#fff' },
  body: { minWidth: 0 },
  itemHead: { display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8, paddingBottom: 8, borderBottom: '1px dashed var(--paper-300)' },
  itemN: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em', whiteSpace: 'nowrap' },
  itemTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.3 },
  itemDetail: { fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-700)' },

  watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.55, color: 'var(--ink-700)' },
  watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
};

window.SQSectionRound1 = SQSectionRound1;
