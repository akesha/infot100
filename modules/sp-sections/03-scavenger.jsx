// Section 03 — Equipment Scavenger Hunt (20 min · DELIVERABLE 1)
// For each of the 8 real Creator Commons tools: pick what YOU'd make with it
// for your final project. Persistent. Forces concrete thinking, not browsing.

function SPSectionScavenger() {
  const STORAGE = 'sp-scavenger-v1';

  const tools = [
    {
      id: 'bambu', name: 'Bambu Lab Carbon X1E', verb: 'PRINT', mono: 'FDM',
      what: 'Fast, large-format 3D printer. Prints in PLA, PETG, even carbon-fiber composites.',
      buildVol: '256 × 256 × 256 mm · ~10 hr typical part',
      starterIdea: 'Phone stand · custom desk organizer · figurine · mount/bracket',
      seedQ: 'What\'s a physical object you wish existed but doesn\'t?',
    },
    {
      id: 'saturn', name: 'Elegoo Saturn 4 Ultra', verb: 'PRINT', mono: 'RES',
      what: 'High-detail resin printer. Smaller parts, smoother finish, harder to use.',
      buildVol: '~219 × 123 × 260 mm · ~6 hr typical part',
      starterIdea: 'Tabletop minis · jewelry · dental/medical-style models · super-detailed prototypes',
      seedQ: 'What needs detail too fine for a regular printer?',
    },
    {
      id: 'cameo', name: 'Silhouette Cameo 5', verb: 'CUT', mono: 'VIN',
      what: 'Cuts vinyl, paper, cardstock, fabric. Drives from Silhouette Studio.',
      buildVol: 'Up to 12" wide × any length',
      starterIdea: 'Stickers · stencils · die-cut signage · iron-on shapes for shirts',
      seedQ: 'What flat thing would you mass-produce 50 copies of?',
    },
    {
      id: 'chompsaw', name: 'ChompSaw Cardboard Cutter', verb: 'CUT', mono: 'CARD',
      what: 'Safe powered cutter for cardboard. No exposed blade. Curves and complex shapes.',
      buildVol: 'Up to ~24" cardboard sheets',
      starterIdea: 'Scale mockups · packaging prototypes · life-size frame for testing',
      seedQ: 'What would you build at full scale if material were free?',
    },
    {
      id: 'bernina325', name: 'Bernina B325 Sewing Machine', verb: 'STITCH', mono: 'SEW',
      what: 'Beginner-friendly sewing machine. Straight + zigzag, basic embroidery.',
      buildVol: 'Any soft material',
      starterIdea: 'Tote bag · pillow case for an electronics project · costume mockup',
      seedQ: 'What soft thing does your project need a body or surface for?',
    },
    {
      id: 'serger', name: 'Bernina L450 Serger', verb: 'STITCH', mono: 'OVR',
      what: 'Professional finished edges in seconds. No fraying.',
      buildVol: 'Any soft material',
      starterIdea: 'Apparel that looks store-bought · bag straps · finished cushion edges',
      seedQ: 'What part of your project should look bought, not made?',
    },
    {
      id: 'press', name: 'HTVRONT Heat Press', verb: 'PRESS', mono: 'HEAT',
      what: 'Bonds heat-transfer vinyl or sublimation prints to fabric or hard surfaces.',
      buildVol: 'Up to 15" × 15" press area',
      starterIdea: 'Custom T-shirt for project demo · branded tote · mousepad · sublimated mug',
      seedQ: 'What would you put your project\'s logo on for demo day?',
    },
    {
      id: 'lam', name: 'Laminator', verb: 'PROTECT', mono: 'LAM',
      what: 'Seals printed material between thermal plastic. Underrated.',
      buildVol: 'Letter / legal',
      starterIdea: 'Field-test cards · physical UI mockups · game cards · backpack-proof signage',
      seedQ: 'What printed thing in your project needs to survive 14 weeks of handling?',
    },
  ];

  const [picks, setPicks] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); }
    catch (e) { return {}; }
  });
  const [open, setOpen] = React.useState(tools[0].id);

  React.useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(picks));
  }, [picks]);

  const setIdea = (id, val) => setPicks(p => ({ ...p, [id]: { ...p[id], idea: val } }));
  const setRating = (id, val) => setPicks(p => ({ ...p, [id]: { ...p[id], rating: val } }));

  const ratings = [
    { v: 'must', label: 'I will use this for my final', color: 'var(--signal-green)', text: '#fff' },
    { v: 'maybe', label: 'Maybe — depends on project', color: 'var(--signal-amber)', text: '#16140F' },
    { v: 'no', label: 'Not for my project', color: 'var(--paper-300)', text: 'var(--ink-900)' },
  ];

  const totalIdeas = Object.values(picks).filter(p => p?.idea?.trim()).length;
  const musts = Object.entries(picks).filter(([, p]) => p?.rating === 'must').length;
  const maybes = Object.entries(picks).filter(([, p]) => p?.rating === 'maybe').length;

  const reset = () => setPicks({});

  return (
    <div style={sv.root}>
      <div style={sv.kicker}>③ EQUIPMENT SCAVENGER · 20 MIN · DELIVERABLE 1 of 3</div>
      <h1 style={sv.h1}>
        Eight tools. Eight <em style={sv.em}>concrete</em> ideas.
      </h1>
      <p style={sv.lede}>
        For each piece of equipment in the Creator Commons, write down what <em>you'd</em> make with it
        for your final project. <strong>Specific.</strong> Not "something cool" — name a real object,
        for a real user, solving a real problem. Then rate it: would you actually use this in 14
        weeks?
      </p>

      <div style={sv.statBar}>
        <span><strong>{totalIdeas}</strong> / 8 ideas captured</span>
        <span style={sv.statSep}>·</span>
        <span><strong style={{ color: 'var(--signal-green-text)' }}>{musts}</strong> must-haves</span>
        <span style={sv.statSep}>·</span>
        <span><strong style={{ color: 'var(--signal-amber-text)' }}>{maybes}</strong> maybes</span>
        <span style={{ flex: 1 }} />
        <button onClick={reset} style={sv.btnGhost}>reset</button>
        <span style={sv.persist}>● auto-saves</span>
      </div>

      <div style={sv.list}>
        {tools.map((t) => {
          const isOpen = open === t.id;
          const pick = picks[t.id] || {};
          return (
            <div key={t.id} style={{ ...sv.card, borderColor: pick.rating ? ratingColor(pick.rating) : 'var(--paper-300)' }}>
              <button
                onClick={() => setOpen(isOpen ? null : t.id)}
                style={sv.cardHead}
                aria-expanded={isOpen}
              >
                <span style={sv.mono}>{t.mono}</span>
                <span style={sv.verbTag}>{t.verb}</span>
                <span style={sv.toolName}>{t.name}</span>
                {pick.idea?.trim() && <span style={sv.checkDot}>✓</span>}
                <span style={sv.expand}>{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div style={sv.body}>
                  <div style={sv.factRow}>
                    <div style={sv.fact}>
                      <div style={sv.factLbl}>WHAT IT IS</div>
                      <div style={sv.factVal}>{t.what}</div>
                    </div>
                    <div style={sv.fact}>
                      <div style={sv.factLbl}>BUILD VOLUME</div>
                      <div style={sv.factVal}>{t.buildVol}</div>
                    </div>
                  </div>

                  <div style={sv.starter}>
                    <span style={sv.starterLbl}>STARTER IDEAS:</span>{' '}
                    <span style={sv.starterTxt}>{t.starterIdea}</span>
                  </div>

                  <label style={sv.qLabel}>
                    <span style={sv.qLbl}>{t.seedQ}</span>
                    <textarea
                      style={sv.textarea}
                      placeholder="Be specific. Real object, real user, real problem."
                      rows={2}
                      value={pick.idea || ''}
                      onChange={(e) => setIdea(t.id, e.target.value)}
                    />
                  </label>

                  <div style={sv.rateRow}>
                    {ratings.map(r => (
                      <button
                        key={r.v}
                        onClick={() => setRating(t.id, r.v)}
                        style={{
                          ...sv.rateBtn,
                          background: pick.rating === r.v ? r.color : 'var(--paper-100)',
                          color: pick.rating === r.v ? r.text : 'var(--ink-700)',
                          borderColor: pick.rating === r.v ? r.color : 'var(--paper-300)',
                        }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={sv.callout}>
        <strong>What you just did:</strong> built a personal capability map. The two or three "must-haves"
        you just rated are the spine of your final project. Carry this list with you. Every time you
        walk into the Creator Commons, you should know which tool you came for.
      </div>
    </div>
  );

  function ratingColor(r) {
    return r === 'must' ? 'var(--signal-green)' : r === 'maybe' ? 'var(--signal-amber)' : 'var(--paper-300)';
  }
}

const sv = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 760, margin: '0 0 22px' },

  statBar: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 14px', background: 'var(--paper-100)',
    border: '1.5px solid var(--paper-200)', borderRadius: 4, marginBottom: 12,
    fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-700)',
  },
  statSep: { color: 'var(--ink-300)' },
  btnGhost: { background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)', padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, borderRadius: 3, cursor: 'pointer' },
  persist: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', fontWeight: 600 },

  list: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  card: { background: 'var(--paper-50)', border: '2px solid var(--paper-300)', borderRadius: 4, transition: 'border-color .15s' },
  cardHead: {
    display: 'grid', gridTemplateColumns: '46px 64px 1fr auto auto', gap: 12, alignItems: 'center',
    width: '100%', textAlign: 'left',
    background: 'transparent', border: 'none', padding: '12px 16px', cursor: 'pointer',
  },
  mono: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, padding: '3px 7px', background: 'var(--ink-900)', color: 'var(--paper-50)', borderRadius: 2, letterSpacing: '0.08em', textAlign: 'center' },
  verbTag: { fontFamily: 'var(--font-display)', fontSize: 13, fontStyle: 'italic', fontWeight: 700, color: 'var(--crimson)' },
  toolName: { fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' },
  checkDot: { fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--signal-green-text)' },
  expand: { fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ink-500)', lineHeight: 1, width: 16, textAlign: 'center' },

  body: { padding: '4px 16px 16px' },
  factRow: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 10, paddingTop: 10, borderTop: '1px dashed var(--paper-300)' },
  fact: {},
  factLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', marginBottom: 3 },
  factVal: { fontSize: 13, lineHeight: 1.5, color: 'var(--ink-900)' },

  starter: { fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-700)', marginBottom: 10, padding: '8px 10px', background: 'var(--paper-100)', borderRadius: 3 },
  starterLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  starterTxt: { fontStyle: 'italic' },

  qLabel: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
  qLbl: { fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', fontWeight: 600, color: 'var(--ink-900)' },
  textarea: { fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 12px', border: '1.5px solid var(--paper-300)', borderRadius: 3, background: '#fff', resize: 'vertical', lineHeight: 1.5 },

  rateRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 },
  rateBtn: { padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', borderRadius: 3, border: '1.5px solid', cursor: 'pointer', transition: 'all .12s' },

  callout: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-green)', fontSize: 14, lineHeight: 1.6 },
};

window.SPSectionScavenger = SPSectionScavenger;
