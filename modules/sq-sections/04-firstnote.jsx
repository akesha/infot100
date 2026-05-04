// Section 04 — First note · first source (15 min)
// Note-taking strategies + recording etiquette FIRST, then two paired forms:
// a vault note and a credible source from an IU database. The constraint is
// the lesson — the source must NOT be a Google result.

function SQSectionFirstNote() {
  const NOTE_KEY = 'sq:04-firstnote:note';
  const SRC_TITLE = 'sq:04-firstnote:src-title';
  const SRC_LINK = 'sq:04-firstnote:src-link';
  const SRC_WHY = 'sq:04-firstnote:src-why';
  const SRC_DB = 'sq:04-firstnote:src-db';
  const METHOD_KEY = 'sq:04-firstnote:method';

  const [note, setNote] = React.useState('');
  const [srcTitle, setSrcTitle] = React.useState('');
  const [srcLink, setSrcLink] = React.useState('');
  const [srcWhy, setSrcWhy] = React.useState('');
  const [srcDb, setSrcDb] = React.useState('');
  const [method, setMethod] = React.useState('');

  React.useEffect(() => {
    try {
      setNote(localStorage.getItem(NOTE_KEY) || '');
      setSrcTitle(localStorage.getItem(SRC_TITLE) || '');
      setSrcLink(localStorage.getItem(SRC_LINK) || '');
      setSrcWhy(localStorage.getItem(SRC_WHY) || '');
      setSrcDb(localStorage.getItem(SRC_DB) || '');
      setMethod(localStorage.getItem(METHOD_KEY) || '');
    } catch (e) {}
  }, []);

  const save = (key, setter) => (e) => {
    const v = e.target.value;
    setter(v);
    try { localStorage.setItem(key, v); } catch (e) {}
  };

  const pickMethod = (id) => {
    const next = method === id ? '' : id;
    setMethod(next);
    try { localStorage.setItem(METHOD_KEY, next); } catch (e) {}
  };

  const noteReady = note.trim().length > 0;
  const sourceReady = srcTitle.trim() && srcLink.trim() && srcWhy.trim() && srcDb.trim();

  const methods = [
    {
      id: 'cornell',
      name: 'Cornell',
      bestFor: 'Lectures with structured ideas',
      shape: 'Page split: notes (right) · cues/questions (left) · summary (bottom).',
      why: 'The cues column forces retrieval practice when you review — that\'s where the learning sticks.',
    },
    {
      id: 'outline',
      name: 'Outline',
      bestFor: 'Hierarchical material (CS, math, philosophy)',
      shape: 'Bullets nested by indent. Concept · sub-concept · example.',
      why: 'Mirrors the structure of the material itself. Easy to convert to flashcards or a study guide later.',
    },
    {
      id: 'sketch',
      name: 'Sketch / map',
      bestFor: 'Conceptual material, systems, relationships',
      shape: 'Boxes, arrows, branches. Words secondary; structure primary.',
      why: 'Spatial layout encodes relationships your brain wouldn\'t catch in linear text.',
    },
    {
      id: 'verbatim',
      name: 'Verbatim + paraphrase',
      bestFor: 'Definitions, formulas, anything you need exactly',
      shape: 'Capture key terms verbatim (in quotes). Paraphrase the rest in your own words.',
      why: 'Verbatim is fast, paraphrase is processing. Mixing both keeps you from transcribing without thinking.',
    },
  ];

  return (
    <div style={s.root}>
      <div style={s.kicker}>④ FIRST NOTE · 15 MIN · USE WHAT YOU INSTALLED</div>
      <h1 style={s.h1}>
        First <em style={s.em}>note</em>. First <em style={s.em}>source</em>.
      </h1>
      <p style={s.lede}>
        Installing tools is not a capability. Using them is. Before you write your first note, two
        quick pieces of context — how to take notes you'll actually use, and how to ask permission
        to record when you can't be there.
      </p>

      <div style={s.preface}>
        <div style={s.prefaceHead}>
          <span style={s.prefaceBadge}>Before you write</span>
          <h2 style={s.prefaceH2}>Pick a note-taking shape that fits the lecture</h2>
        </div>
        <p style={s.prefaceLede}>
          Four common methods. None is "the right one" — pick by lecture type, not by personality.
          Tap the one you'll try first; saves to your browser. (You can change it any week.)
        </p>
        <div style={s.methodGrid}>
          {methods.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => pickMethod(m.id)}
              aria-pressed={method === m.id}
              style={{ ...s.methodCard, ...(method === m.id ? s.methodCardActive : {}) }}
            >
              <div style={s.methodHead}>
                <span style={s.methodName}>{m.name}</span>
                {method === m.id && <span style={s.methodTick} aria-hidden="true">✓</span>}
              </div>
              <div style={s.methodBest}><strong>Best for:</strong> {m.bestFor}</div>
              <div style={s.methodShape}><strong>Shape:</strong> {m.shape}</div>
              <div style={s.methodWhy}>{m.why}</div>
            </button>
          ))}
        </div>
        <p style={s.prefaceTip}>
          <strong>Active beats passive.</strong> Paraphrasing forces processing; transcription
          doesn't. If you find yourself typing every word the professor says, you're using a
          recorder — not taking notes.
        </p>
      </div>

      <div style={s.preface}>
        <div style={s.prefaceHead}>
          <span style={{ ...s.prefaceBadge, background: 'var(--signal-amber)', color: 'var(--ink-900)' }}>Recording etiquette</span>
          <h2 style={s.prefaceH2}>If you can't attend — or want to review later</h2>
        </div>
        <p style={s.prefaceLede}>
          Some lectures are already recorded by the institution (Canvas, Panopto, Kaltura). Many
          aren't. Here's how to ask for permission when no recording exists.
        </p>
        <ol style={s.ruleList}>
          <li style={s.rule}>
            <span style={s.ruleN}>01</span>
            <div>
              <strong style={s.ruleHead}>Check first whether one already exists.</strong>
              <span style={s.ruleBody}>Canvas → course → Panopto / Recordings tab. If a recording is published, you don't need to ask — it's already yours to use.</span>
            </div>
          </li>
          <li style={s.rule}>
            <span style={s.ruleN}>02</span>
            <div>
              <strong style={s.ruleHead}>Ask in writing, before class.</strong>
              <span style={s.ruleBody}>Email the professor or post in the course Discord. State the purpose ("for my own review", "for an accommodation"), confirm what you'll do with the file (keep on your machine, delete at semester end, not share). Most faculty say yes when asked respectfully.</span>
            </div>
          </li>
          <li style={s.rule}>
            <span style={s.ruleN}>03</span>
            <div>
              <strong style={s.ruleHead}>If it's an accommodation, go through Disability Services.</strong>
              <span style={s.ruleBody}>IU Disability Services Online (DSO) can authorize recording as part of an accommodation letter. The letter handles the permission-asking for you and protects both sides legally.</span>
            </div>
          </li>
          <li style={s.rule}>
            <span style={s.ruleN}>04</span>
            <div>
              <strong style={s.ruleHead}>A recording is for review, not replacement.</strong>
              <span style={s.ruleBody}>Take notes during the lecture anyway. The act of note-taking is half the learning; replaying audio while your brain is asleep is the other half of nothing.</span>
            </div>
          </li>
        </ol>
        <p style={s.prefaceTip}>
          <strong>Don't record without permission.</strong> Some U.S. states are two-party consent.
          Indiana is one-party, but the social contract still matters more than the legal floor —
          ask before you press record.
        </p>
      </div>

      <div style={s.divider}>
        <span style={s.dividerLine} aria-hidden="true"></span>
        <span style={s.dividerLbl}>Now, your first note</span>
        <span style={s.dividerLine} aria-hidden="true"></span>
      </div>

      <div style={s.grid}>
        <div style={s.col}>
          <div style={s.colHead}>
            <span style={s.colNum}>01</span>
            <h2 style={s.colTitle}>First vault note</h2>
            {noteReady && <span style={s.badge}>✓ ready</span>}
          </div>
          <p style={s.path}>Save to: <code>Weeks/W03-setup-quest.md</code></p>
          <label htmlFor="sq-firstnote" style={s.lbl}>One sentence on what you installed</label>
          <textarea
            id="sq-firstnote"
            style={s.textarea}
            placeholder="Today I installed VS Code, Python 3.12, git, and Obsidian on my laptop. The only one I'd used before was…"
            value={note}
            onChange={save(NOTE_KEY, setNote)}
          />
          <p style={s.hint}>One specific sentence beats five generic ones. The hint of "what's only true for you" makes the note useful in W12.</p>
        </div>

        <div style={s.col}>
          <div style={s.colHead}>
            <span style={s.colNum}>02</span>
            <h2 style={s.colTitle}>First credible source</h2>
            {sourceReady && <span style={s.badge}>✓ ready</span>}
          </div>
          <p style={s.path}>Save to: <code>Sources/[your topic].md</code></p>

          <p style={s.constraint}>
            <strong>CONSTRAINT:</strong> the source must come from an IU library database. Not Google.
            Not Wikipedia. Not Google Scholar. Use the database list you bookmarked in Round 3.
          </p>

          <label htmlFor="sq-src-title" style={s.lbl}>Source title</label>
          <input
            id="sq-src-title"
            type="text"
            style={s.input}
            placeholder='e.g. "The Science of Note-Taking" — Smith, 2023'
            value={srcTitle}
            onChange={save(SRC_TITLE, setSrcTitle)}
          />

          <label htmlFor="sq-src-link" style={s.lbl}>Source link (IU proxy or DB URL)</label>
          <input
            id="sq-src-link"
            type="url"
            style={s.input}
            placeholder="https://onlinelibrary-wiley-com.proxyiub.uits.iu.edu/..."
            value={srcLink}
            onChange={save(SRC_LINK, setSrcLink)}
          />

          <label htmlFor="sq-src-db" style={s.lbl}>Which database</label>
          <select
            id="sq-src-db"
            style={s.input}
            value={srcDb}
            onChange={save(SRC_DB, setSrcDb)}
          >
            <option value="">— pick one —</option>
            <option>JSTOR</option>
            <option>ACM Digital Library</option>
            <option>IEEE Xplore</option>
            <option>Web of Science</option>
            <option>Scopus</option>
            <option>ProQuest</option>
            <option>EBSCO</option>
            <option>Other (write in "Why I trust this")</option>
          </select>

          <label htmlFor="sq-src-why" style={s.lbl}>Why I trust this · one sentence</label>
          <textarea
            id="sq-src-why"
            style={s.textareaSmall}
            placeholder="Peer-reviewed in [journal name]. Authors at [institution]. Methodology section is replicable."
            value={srcWhy}
            onChange={save(SRC_WHY, setSrcWhy)}
          />
          <p style={s.hint}>"Looks legit" is not a reason. Name a credibility marker — peer review, institutional author, replicable methodology, primary source.</p>
        </div>
      </div>

      <div style={s.punch}>
        <strong>By W6 AI Co-Pilot Camp</strong>, you'll use this same database surface to verify
        AI-generated citations. Today's source is the practice run — that's why "from a database, not
        Google" is the lesson, not the inconvenience.
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

  preface: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 6, padding: '20px 24px', marginBottom: 20 },
  prefaceHead: { display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 8 },
  prefaceBadge: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--signal-purple)', color: '#fff', padding: '4px 10px', borderRadius: 3 },
  prefaceH2: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, fontWeight: 600, color: 'var(--ink-900)', margin: 0, lineHeight: 1.2 },
  prefaceLede: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-700)', margin: '0 0 14px' },
  prefaceTip: { fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-700)', margin: '14px 0 0', padding: '10px 14px', background: 'var(--paper-50)', borderLeft: '3px solid var(--signal-amber)', borderRadius: 3 },

  methodGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 4 },
  methodCard: { textAlign: 'left', font: 'inherit', cursor: 'pointer', background: 'var(--paper-50)', border: '1.5px solid var(--paper-300)', borderRadius: 5, padding: '14px 16px', transition: 'background 150ms ease, border-color 150ms ease' },
  methodCardActive: { background: '#fff', borderColor: 'var(--ink-900)', boxShadow: '0 2px 0 var(--paper-300)' },
  methodHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  methodName: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, fontWeight: 700, color: 'var(--ink-900)' },
  methodTick: { fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--signal-green-text)', fontSize: 16 },
  methodBest: { fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-700)', marginBottom: 4 },
  methodShape: { fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-700)', marginBottom: 6 },
  methodWhy: { fontSize: 12, lineHeight: 1.5, color: 'var(--ink-500)', fontStyle: 'italic' },

  ruleList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 },
  rule: { display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, padding: '12px 14px', background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 4 },
  ruleN: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em', alignSelf: 'start' },
  ruleHead: { display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, fontWeight: 600, color: 'var(--ink-900)', marginBottom: 4, lineHeight: 1.3 },
  ruleBody: { display: 'block', fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-700)' },

  divider: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16, margin: '24px 0 18px' },
  dividerLine: { display: 'block', height: 1, background: 'var(--paper-300)' },
  dividerLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.18em', textTransform: 'uppercase' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 18 },
  col: { background: 'var(--paper-50)', border: '1.5px solid var(--paper-200)', borderRadius: 6, padding: '16px 18px' },
  colHead: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' },
  colNum: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
  colTitle: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 600, color: 'var(--ink-900)', margin: 0, lineHeight: 1.2, flex: 1 },
  badge: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: '#fff', background: 'var(--signal-green)', padding: '3px 8px', borderRadius: 3, letterSpacing: '0.12em', textTransform: 'uppercase' },

  path: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)', margin: '0 0 12px' },

  constraint: { background: 'var(--paper-100)', border: '1px dashed var(--paper-300)', padding: '10px 12px', borderRadius: 4, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-700)', marginBottom: 12 },

  lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', marginTop: 10, marginBottom: 4 },
  input: { width: '100%', padding: '8px 10px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, boxSizing: 'border-box' },
  textarea: { width: '100%', minHeight: 80, padding: '10px 12px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },
  textareaSmall: { width: '100%', minHeight: 60, padding: '8px 10px', font: 'inherit', fontSize: 13, lineHeight: 1.5, color: 'var(--ink-900)', background: '#fff', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },
  hint: { fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.45, margin: '6px 0 0' },

  punch: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', fontSize: 14, lineHeight: 1.6 },
};

window.SQSectionFirstNote = SQSectionFirstNote;
