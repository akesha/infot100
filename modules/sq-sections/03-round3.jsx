// Section 03 — Install round 3: Obsidian + IU library (15 min)
// Visual folder builder so the vault structure is concrete, not abstract.

function SQSectionRound3() {
  const KEY = 'sq:03-round3:checks';
  const VAULT_KEY = 'sq:03-round3:vault-path';

  const [checks, setChecks] = React.useState({});
  const [vaultPath, setVaultPath] = React.useState('');

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY); if (v) setChecks(JSON.parse(v));
      const p = localStorage.getItem(VAULT_KEY); if (p) setVaultPath(p);
    } catch (e) {}
  }, []);

  const toggle = (id) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const onVault = (e) => {
    const v = e.target.value;
    setVaultPath(v);
    try { localStorage.setItem(VAULT_KEY, v); } catch (e) {}
  };

  const folders = [
    { id: 'weeks', name: 'Weeks/', purpose: 'one note per lesson' },
    { id: 'project', name: 'Project/', purpose: 'seed → v0.1 → v1' },
    { id: 'bugs', name: 'Bugs/', purpose: 'structured bug reports (W5)' },
    { id: 'reflections', name: 'Reflections/', purpose: 'lesson reckonings + autopsies' },
    { id: 'sources', name: 'Sources/', purpose: 'credible sources from IU databases' },
  ];

  const bookmarks = [
    { id: 'libraries', label: 'IU Libraries home', url: 'libraries.indiana.edu' },
    { id: 'databases', label: 'Database list (the surface AI doesn\'t have)', url: 'libraries.indiana.edu/databases' },
    { id: 'librarian', label: 'Chat with a librarian', url: 'libraries.indiana.edu/help' },
  ];

  const allFoldersDone = folders.every(f => checks[f.id]);
  const allBookmarksDone = bookmarks.every(b => checks[b.id]);

  return (
    <div style={r3.root}>
      <div style={r3.kicker}>③ ROUND 3 · 15 MIN · SECOND BRAIN</div>
      <h1 style={r3.h1}>
        Round 3 — <em style={r3.em}>Obsidian</em> + <em style={r3.em}>library</em>.
      </h1>
      <p style={r3.lede}>
        Two surfaces. Obsidian holds your notes; the IU library holds the credible sources AI
        doesn't have. Both get bookmarked today.
      </p>

      <div style={r3.section}>
        <h2 style={r3.h2}>Step 1 · Install Obsidian + create a vault</h2>
        <ol style={r3.steps}>
          <li style={{ ...r3.step, ...(checks.install ? r3.stepDone : {}) }}>
            <button onClick={() => toggle('install')} style={r3.checkBtn} aria-pressed={!!checks.install}>
              <span style={r3.checkBox}>{checks.install ? '✓' : ''}</span>
            </button>
            <div>
              <strong>Install Obsidian.</strong> obsidian.md → grab your OS. Free for personal use.
            </div>
          </li>
          <li style={{ ...r3.step, ...(checks.vault ? r3.stepDone : {}) }}>
            <button onClick={() => toggle('vault')} style={r3.checkBtn} aria-pressed={!!checks.vault}>
              <span style={r3.checkBox}>{checks.vault ? '✓' : ''}</span>
            </button>
            <div>
              <strong>Create a vault.</strong> "Create new vault" → name it <code style={r3.code}>info-t-100</code>.
            </div>
          </li>
        </ol>
      </div>

      <div style={r3.section}>
        <h2 style={r3.h2}>Step 2 · Build the folder structure</h2>
        <p style={r3.sub}>Right-click in the file pane → "New folder." Five folders, exactly these names:</p>
        <div style={r3.folderGrid}>
          {folders.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => toggle(f.id)}
              style={{ ...r3.folder, ...(checks[f.id] ? r3.folderDone : {}) }}
              aria-pressed={!!checks[f.id]}
            >
              <span style={r3.folderIcon} aria-hidden="true">{checks[f.id] ? '📂' : '📁'}</span>
              <span style={r3.folderName}>{f.name}</span>
              <span style={r3.folderPurpose}>{f.purpose}</span>
            </button>
          ))}
        </div>
        {allFoldersDone && <div style={r3.success}>✓ Vault structure complete. Five folders ready.</div>}
      </div>

      <div style={r3.section}>
        <h2 style={r3.h2}>Step 3 · Bookmark the IU library surfaces</h2>
        <p style={r3.sub}>Three bookmarks in your browser. The database list is the load-bearing one — that's where AI hallucinations get caught.</p>
        <ol style={r3.bookmarks}>
          {bookmarks.map(b => (
            <li key={b.id} style={{ ...r3.bookmark, ...(checks[b.id] ? r3.bookmarkDone : {}) }}>
              <button onClick={() => toggle(b.id)} style={r3.checkBtn} aria-pressed={!!checks[b.id]}>
                <span style={r3.checkBox}>{checks[b.id] ? '✓' : ''}</span>
              </button>
              <div>
                <div style={r3.bookmarkLbl}>{b.label}</div>
                <code style={r3.bookmarkUrl}>{b.url}</code>
              </div>
            </li>
          ))}
        </ol>
        {allBookmarksDone && <div style={r3.success}>✓ Library bookmarks set. Citation audit (W6) starts here.</div>}
      </div>

      <div style={r3.vaultBox}>
        <label htmlFor="sq-vault-path" style={r3.vaultLbl}>YOUR VAULT PATH ON DISK</label>
        <input
          id="sq-vault-path"
          type="text"
          style={r3.vaultInput}
          placeholder="~/Documents/info-t-100  or  C:\Users\you\Documents\info-t-100"
          value={vaultPath}
          onChange={onVault}
        />
        <div style={r3.vaultSub}>Saves to your browser. Logs in your Start Log.</div>
      </div>
    </div>
  );
}

const r3 = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

  section: { marginBottom: 22 },
  h2: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 600, color: 'var(--ink-900)', margin: '0 0 8px', borderBottom: '1px dashed var(--paper-300)', paddingBottom: 4 },
  sub: { fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 12px' },

  steps: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 },
  step: { display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, alignItems: 'start', padding: '16px 20px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 6, fontSize: 14.5, lineHeight: 1.65 },
  stepDone: { background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)' },
  code: { fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--paper-100)', padding: '1px 5px', borderRadius: 3 },

  folderGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 },
  folder: { display: 'grid', gridTemplateColumns: '28px 1fr', gridTemplateRows: 'auto auto', gridTemplateAreas: '"icon name" "icon purpose"', columnGap: 10, rowGap: 2, padding: '12px 14px', background: 'var(--paper-50)', border: '1.5px dashed var(--paper-300)', borderRadius: 4, cursor: 'pointer', textAlign: 'left', font: 'inherit', transition: 'background 150ms ease, border-color 150ms ease' },
  folderDone: { background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)', borderStyle: 'solid' },
  folderIcon: { gridArea: 'icon', fontSize: 22, lineHeight: 1, alignSelf: 'center' },
  folderName: { gridArea: 'name', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' },
  folderPurpose: { gridArea: 'purpose', fontSize: 11.5, color: 'var(--ink-500)', lineHeight: 1.3 },

  bookmarks: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 },
  bookmark: { display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, alignItems: 'start', padding: '16px 20px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 6, transition: 'background 150ms ease' },
  bookmarkDone: { background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)' },
  bookmarkLbl: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.3 },
  bookmarkUrl: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)' },

  checkBtn: { background: 'transparent', border: 0, padding: 0, cursor: 'pointer', alignSelf: 'start' },
  checkBox: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, border: '2px solid var(--ink-900)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--signal-green-text)', background: '#fff' },

  success: { fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--signal-green-text)', marginTop: 8, fontWeight: 600 },

  vaultBox: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 4, padding: '12px 16px' },
  vaultLbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
  vaultInput: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
  vaultSub: { fontSize: 12, color: 'var(--ink-500)', marginTop: 6 },
};

window.SQSectionRound3 = SQSectionRound3;
