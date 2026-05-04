// Section 05 — Project Seed (10 min · DELIVERABLE 3)
// Combine 2-3 capabilities into a rough idea for the end-of-semester project.
// This is the bridge from "I learned the toolbox" to "I have a project."

function SPSectionProjectSeed() {
  const STORAGE = 'sp-seed-v1';
  const SCAV_STORAGE = 'sp-scavenger-v1';

  const [data, setData] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); }
    catch (e) { return {}; }
  });

  // Pull "must-have" capabilities from scavenger answers
  const musts = React.useMemo(() => {
    try {
      const picks = JSON.parse(localStorage.getItem(SCAV_STORAGE) || '{}');
      return Object.entries(picks)
        .filter(([, p]) => p?.rating === 'must')
        .map(([id, p]) => ({ id, idea: p.idea }));
    } catch (e) { return []; }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(data));
  }, [data]);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <div style={ps.root}>
      <div style={ps.kicker}>⑤ PROJECT SEED · 10 MIN · DELIVERABLE 3 of 3</div>
      <h1 style={ps.h1}>
        14 weeks from now: <em style={ps.em}>what ships?</em>
      </h1>
      <p style={ps.lede}>
        You have a capability map. You have a working hand. Now: <strong>seed a project</strong>. Not
        a final answer — a hypothesis. A real user, a real problem, 2–3 capabilities that combine to
        solve it. You'll iterate this for 14 weeks. But the seed has to start today.
      </p>

      {musts.length > 0 && (
        <div style={ps.recap}>
          <div style={ps.recapLbl}>YOUR MUST-HAVE CAPABILITIES (from §3)</div>
          <div style={ps.recapList}>
            {musts.map((m, i) => (
              <div key={i} style={ps.recapItem}>
                <span style={ps.recapMono}>{m.id}</span>
                <span style={ps.recapTxt}>{m.idea}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={ps.formGrid}>
        <label style={ps.qLabel}>
          <span style={ps.qLbl}>① WHO is it for?</span>
          <span style={ps.qHint}>One specific person or group. Not "students" — "freshmen in Briscoe with a single shared bathroom."</span>
          <textarea style={ps.textarea} rows={2} value={data.who || ''} onChange={(e) => set('who', e.target.value)} placeholder="A specific user…" />
        </label>

        <label style={ps.qLabel}>
          <span style={ps.qLbl}>② WHAT's their problem?</span>
          <span style={ps.qHint}>The thing that annoys them, breaks for them, or wastes their time. Not the solution — the pain.</span>
          <textarea style={ps.textarea} rows={2} value={data.problem || ''} onChange={(e) => set('problem', e.target.value)} placeholder="They struggle to…" />
        </label>

        <label style={ps.qLabel}>
          <span style={ps.qLbl}>③ WHAT will you make for them?</span>
          <span style={ps.qHint}>A physical thing. Be concrete: a stand, a card deck, a wearable, an enclosure, a kit.</span>
          <textarea style={ps.textarea} rows={2} value={data.thing || ''} onChange={(e) => set('thing', e.target.value)} placeholder="A ___ that ___…" />
        </label>

        <label style={ps.qLabel}>
          <span style={ps.qLbl}>④ Which 2–3 capabilities will you combine?</span>
          <span style={ps.qHint}>From the eight verbs: cut, print, stitch, press, cast, protect, capture, design.</span>
          <textarea style={ps.textarea} rows={2} value={data.caps || ''} onChange={(e) => set('caps', e.target.value)} placeholder="e.g. PRINT (Bambu) + STITCH (Bernina) + LAMINATE…" />
        </label>

        <label style={ps.qLabel}>
          <span style={ps.qLbl}>⑤ The smallest version you could ship by Week 4?</span>
          <span style={ps.qHint}>An ugly, working v0.1. Real users could touch it. Real feedback could be collected. Don't aim for finished — aim for testable.</span>
          <textarea style={ps.textarea} rows={2} value={data.v01 || ''} onChange={(e) => set('v01', e.target.value)} placeholder="A v0.1 that just…" />
        </label>
      </div>

      <div style={ps.callout}>
        <strong>This will change.</strong> By Week 4 you'll have learned things that reshape the seed.
        That's the design-thinking loop. The seed isn't a contract — it's the first <em>shape</em> your
        project takes, so you have something concrete to argue with.
      </div>
    </div>
  );
}

const ps = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 22px' },

  recap: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 4, padding: '12px 16px', marginBottom: 18 },
  recapLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 8 },
  recapList: { display: 'flex', flexDirection: 'column', gap: 6 },
  recapItem: { display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10, alignItems: 'baseline', fontSize: 13 },
  recapMono: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, padding: '2px 6px', background: 'var(--signal-green)', color: '#fff', borderRadius: 2, letterSpacing: '0.05em', textAlign: 'center' },
  recapTxt: { fontStyle: 'italic', color: 'var(--ink-900)' },

  formGrid: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 },
  qLabel: { display: 'flex', flexDirection: 'column', gap: 4 },
  qLbl: { fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: 'var(--ink-900)' },
  qHint: { fontSize: 13, color: 'var(--ink-500)', fontStyle: 'italic', lineHeight: 1.4, marginBottom: 4 },
  textarea: { fontFamily: 'var(--font-body)', fontSize: 14.5, padding: '10px 12px', border: '1.5px solid var(--paper-300)', borderRadius: 3, background: '#fff', resize: 'vertical', lineHeight: 1.5 },

  callout: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-blue)', fontSize: 14, lineHeight: 1.6 },
};

window.SPSectionProjectSeed = SPSectionProjectSeed;
