// Section 02 — Install round 2: runtime + git (15 min)
// Verification = a real commit pushed to GitHub. Goal-shaped, not just install-shaped.

function SQSectionRound2() {
  const KEY = 'sq:02-round2:checks';
  const REPO_KEY = 'sq:02-round2:repo-url';

  const [checks, setChecks] = React.useState({});
  const [repoUrl, setRepoUrl] = React.useState('');

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY); if (v) setChecks(JSON.parse(v));
      const r = localStorage.getItem(REPO_KEY); if (r) setRepoUrl(r);
    } catch (e) {}
  }, []);

  const toggle = (id) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const onRepo = (e) => {
    const v = e.target.value;
    setRepoUrl(v);
    try { localStorage.setItem(REPO_KEY, v); } catch (e) {}
  };

  const items = [
    { id: 'runtime', title: 'Install Python (or course-specified runtime)', detail: 'python.org → grab the current stable release. macOS: prefer python3 from python.org over the system one.' },
    { id: 'version', title: 'Verify: `python --version` returns a version', detail: 'Should print something like Python 3.12.x. If not found: PATH issue — close + reopen the terminal.' },
    { id: 'script', title: 'Run a one-line `print("hi")` script', detail: 'Save as hello.py. Run with `python hello.py`. Output appears.' },
    { id: 'git', title: '`git init` a folder + commit one README', detail: '`git init` → write a README.md → `git add README.md` → `git commit -m "first"`. The commit is the move.' },
    { id: 'github', title: 'Push to a new GitHub repo (empty is fine)', detail: 'Create the repo on github.com. `git remote add origin <url>` → `git push -u origin main`. Auth: SSH key or PAT, NOT password.' },
    { id: 'ta', title: 'Verify with a TA · log the URL below', detail: 'Get TA initials in your Start Log. Copy the GitHub repo URL into the field on this page.' },
  ];

  const done = items.filter(i => checks[i.id]).length;

  return (
    <div style={r2.root}>
      <div style={r2.kicker}>② ROUND 2 · 15 MIN · COMMIT IS THE GOAL</div>
      <h1 style={r2.h1}>
        Round 2 — <em style={r2.em}>runtime</em> + <em style={r2.em}>git</em>.
      </h1>
      <p style={r2.lede}>
        A repo with one commit is a repo. A repo with zero commits is a folder. We're making a repo
        today.
      </p>

      <div style={r2.progress}>
        <div style={r2.progressBar}>
          <div style={{ ...r2.progressFill, width: `${(done / items.length) * 100}%` }} />
        </div>
        <div style={r2.progressLbl}>{done} of {items.length} verified</div>
      </div>

      <ol style={r2.list}>
        {items.map((it, i) => (
          <li key={it.id} style={{ ...r2.item, ...(checks[it.id] ? r2.itemDone : {}) }}>
            <button
              type="button"
              onClick={() => toggle(it.id)}
              style={r2.checkBtn}
              aria-pressed={!!checks[it.id]}
              aria-label={`Mark step ${i + 1} ${checks[it.id] ? 'incomplete' : 'complete'}`}
            >
              <span style={r2.checkBox}>{checks[it.id] ? '✓' : ''}</span>
            </button>
            <div style={r2.body}>
              <div style={r2.itemHead}>
                <span style={r2.itemN}>{String(i + 1).padStart(2, '0')}</span>
                <span style={r2.itemTitle}>{it.title}</span>
              </div>
              <div style={r2.itemDetail}>{it.detail}</div>
            </div>
          </li>
        ))}
      </ol>

      <div style={r2.repoBox}>
        <label htmlFor="sq-repo-url" style={r2.repoLbl}>YOUR GITHUB REPO URL</label>
        <input
          id="sq-repo-url"
          type="url"
          style={r2.repoInput}
          placeholder="https://github.com/your-username/info-t-100"
          value={repoUrl}
          onChange={onRepo}
        />
        <div style={r2.repoSub}>Saves to your browser. You'll log this in your Start Log.</div>
      </div>

      <div style={r2.watchfor}>
        <div style={r2.watchforLbl}>WATCH FOR</div>
        <strong>Git authentication.</strong> GitHub no longer accepts password auth for HTTPS — you
        need a personal access token or an SSH key. SSH is faster. The handout has both paths;
        most students should pick SSH and never look back.
      </div>
    </div>
  );
}

const r2 = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

  progress: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 },
  progressBar: { flex: 1, height: 8, background: 'var(--paper-200)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--signal-green)', transition: 'width 200ms ease' },
  progressLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', letterSpacing: '0.05em', whiteSpace: 'nowrap' },

  list: { listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 12 },
  item: { display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '18px 20px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 6, transition: 'background 150ms ease, border-color 150ms ease' },
  itemDone: { background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)' },
  checkBtn: { background: 'transparent', border: 0, padding: 0, cursor: 'pointer', alignSelf: 'start' },
  checkBox: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, border: '2px solid var(--ink-900)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--signal-green-text)', background: '#fff' },
  body: { minWidth: 0 },
  itemHead: { display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8, paddingBottom: 8, borderBottom: '1px dashed var(--paper-300)' },
  itemN: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em', whiteSpace: 'nowrap' },
  itemTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.3 },
  itemDetail: { fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-700)' },

  repoBox: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 4, padding: '12px 16px', marginBottom: 18 },
  repoLbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
  repoInput: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
  repoSub: { fontSize: 12, color: 'var(--ink-500)', marginTop: 6 },

  watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.55, color: 'var(--ink-700)' },
  watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
};

window.SQSectionRound2 = SQSectionRound2;
