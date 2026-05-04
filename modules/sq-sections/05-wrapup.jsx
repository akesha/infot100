// Section 05 — Wrap-up + 1:1 troubleshoot (12 min)
// Reads back the student's progress from earlier sections so they can see
// at a glance what's done and what still needs a TA.

function SQSectionWrapup() {
  const [snapshot, setSnapshot] = React.useState(null);

  React.useEffect(() => {
    const read = () => {
      try {
        const r1 = JSON.parse(localStorage.getItem('sq:01-round1:checks') || '{}');
        const r2 = JSON.parse(localStorage.getItem('sq:02-round2:checks') || '{}');
        const r3 = JSON.parse(localStorage.getItem('sq:03-round3:checks') || '{}');
        const repoUrl = localStorage.getItem('sq:02-round2:repo-url') || '';
        const vaultPath = localStorage.getItem('sq:03-round3:vault-path') || '';
        const note = localStorage.getItem('sq:04-firstnote:note') || '';
        const srcTitle = localStorage.getItem('sq:04-firstnote:src-title') || '';
        return { r1, r2, r3, repoUrl, vaultPath, note, srcTitle };
      } catch (e) {
        return null;
      }
    };
    setSnapshot(read());
    const onStorage = () => setSnapshot(read());
    window.addEventListener('storage', onStorage);
    // Same-tab updates don't fire 'storage'; poll lightly so the snapshot
    // stays fresh as the student progresses through the lesson.
    const t = setInterval(() => setSnapshot(read()), 1500);
    return () => { window.removeEventListener('storage', onStorage); clearInterval(t); };
  }, []);

  if (!snapshot) return null;

  const r1Items = ['editor', 'terminal', 'navigate', 'echo', 'pwd', 'ta'];
  const r2Items = ['runtime', 'version', 'script', 'git', 'github', 'ta'];
  const r3Items = ['install', 'vault', 'weeks', 'project', 'bugs', 'reflections', 'sources', 'libraries', 'databases', 'librarian'];

  const count = (obj, keys) => keys.reduce((n, k) => n + (obj[k] ? 1 : 0), 0);

  const r1Done = count(snapshot.r1, r1Items);
  const r2Done = count(snapshot.r2, r2Items);
  const r3Done = count(snapshot.r3, r3Items);

  const r1Total = r1Items.length;
  const r2Total = r2Items.length;
  const r3Total = r3Items.length;

  const allRoundsDone = r1Done === r1Total && r2Done === r2Total && r3Done === r3Total;
  const artifactsLogged = !!(snapshot.repoUrl && snapshot.vaultPath);
  const noteAndSource = !!(snapshot.note && snapshot.srcTitle);
  const fullyDone = allRoundsDone && artifactsLogged && noteAndSource;

  return (
    <div style={w.root}>
      <div style={w.kicker}>⑤ WRAP-UP · 12 MIN · NO STUDENT LEAVES BROKEN</div>
      <h1 style={w.h1}>
        Where you <em style={w.em}>actually are</em>.
      </h1>
      <p style={w.lede}>
        Snapshot of everything you've checked off so far in this lesson. Reading from your browser —
        no submission, no surveillance. If something below is red, that's where the TA goes next.
      </p>

      <div style={w.bigStatus}>
        {fullyDone ? (
          <>
            <div style={w.bigIcon} aria-hidden="true">✓</div>
            <div>
              <div style={w.bigTitle}>You're set.</div>
              <div style={w.bigSub}>Working stack + externalized v0. Move to take-home.</div>
            </div>
          </>
        ) : (
          <>
            <div style={{ ...w.bigIcon, color: 'var(--signal-amber-text)' }} aria-hidden="true">!</div>
            <div>
              <div style={w.bigTitle}>Almost there.</div>
              <div style={w.bigSub}>The cards below show what's still open. Walk it with a TA.</div>
            </div>
          </>
        )}
      </div>

      <div style={w.grid}>
        <RoundCard title="Round 1 · terminal + editor" done={r1Done} total={r1Total} />
        <RoundCard title="Round 2 · runtime + git" done={r2Done} total={r2Total} />
        <RoundCard title="Round 3 · Obsidian + library" done={r3Done} total={r3Total} />
      </div>

      <div style={w.artifacts}>
        <h3 style={w.artHead}>Artifacts logged</h3>
        <ul style={w.artList}>
          <ArtifactRow label="GitHub repo URL" value={snapshot.repoUrl} placeholder="not yet logged in Round 2" />
          <ArtifactRow label="Obsidian vault path" value={snapshot.vaultPath} placeholder="not yet logged in Round 3" />
          <ArtifactRow label="First vault note" value={snapshot.note ? snapshot.note.slice(0, 60) + (snapshot.note.length > 60 ? '…' : '') : ''} placeholder="empty (Section 4)" />
          <ArtifactRow label="First credible source" value={snapshot.srcTitle} placeholder="empty (Section 4)" />
        </ul>
      </div>

      <div style={w.punch}>
        <strong>If anything is broken:</strong> raise a hand. A TA comes over. If your stack is
        genuinely broken (corrupt install, hardware), schedule a 1:1 office-hours slot before W4 —
        don't pretend it's fixed.
      </div>
    </div>
  );
}

function RoundCard({ title, done, total }) {
  const pct = total === 0 ? 0 : (done / total) * 100;
  const complete = done === total;
  return (
    <div style={{ ...w.card, ...(complete ? w.cardDone : {}) }}>
      <div style={w.cardTitle}>{title}</div>
      <div style={w.cardBar}>
        <div style={{ ...w.cardFill, width: `${pct}%`, background: complete ? 'var(--signal-green)' : 'var(--signal-amber)' }} />
      </div>
      <div style={w.cardCount}>{done} / {total}</div>
    </div>
  );
}

function ArtifactRow({ label, value, placeholder }) {
  return (
    <li style={w.artRow}>
      <div style={w.artLbl}>{label}</div>
      <div style={value ? w.artVal : w.artEmpty}>{value || placeholder}</div>
    </li>
  );
}

const w = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

  bigStatus: { display: 'grid', gridTemplateColumns: '60px 1fr', gap: 18, alignItems: 'center', background: 'var(--paper-100)', border: '2px solid var(--ink-900)', borderRadius: 6, padding: '18px 22px', marginBottom: 22 },
  bigIcon: { fontFamily: 'var(--font-display)', fontSize: 56, fontStyle: 'italic', fontWeight: 700, color: 'var(--signal-green-text)', textAlign: 'center', lineHeight: 1 },
  bigTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.1 },
  bigSub: { fontSize: 14, color: 'var(--ink-700)', marginTop: 4 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 18 },
  card: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 4, padding: '12px 14px' },
  cardDone: { background: 'rgba(93, 187, 126, 0.08)', borderColor: 'var(--signal-green)' },
  cardTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)', marginBottom: 8, lineHeight: 1.3 },
  cardBar: { height: 8, background: 'var(--paper-200)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  cardFill: { height: '100%', transition: 'width 200ms ease' },
  cardCount: { fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', letterSpacing: '0.05em' },

  artifacts: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 4, padding: '14px 18px', marginBottom: 18 },
  artHead: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: 'var(--ink-900)', margin: '0 0 10px' },
  artList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
  artRow: { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 14, paddingBottom: 6, borderBottom: '1px dashed var(--paper-300)' },
  artLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.1em' },
  artVal: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-900)', wordBreak: 'break-all' },
  artEmpty: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--signal-red-text)', fontStyle: 'italic' },

  punch: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
};

window.SQSectionWrapup = SQSectionWrapup;
