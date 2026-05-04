// Section 02 — The Capability Map (anchor, 8 min)
// Reframe: equipment is not a tour. It's a TOOLBOX for the end-of-semester
// design-thinking project. Every tool = a capability (cut, print, sew, press, scan).
// You have 14 weeks. By Week 14, you ship a real thing. The toolbox is what makes that possible.

function SPSectionSpawnKit() {
  const [active, setActive] = React.useState(0);

  const capabilities = [
    {
      n: 1,
      verb: 'CUT',
      mono: 'CUT',
      color: 'var(--signal-red)',
      tools: ['Silhouette Cameo 5', 'ChompSaw Cardboard Cutter'],
      what: 'Take flat material (vinyl, paper, cardstock, cardboard) and cut it into precise shapes from a digital file.',
      whatProjects: 'Stickers · stencils · packaging mockups · die-cut signage · cardboard scale models',
      forThis: 'Likely used by ~40% of final projects. Cheapest, fastest "from-screen-to-real" path.',
    },
    {
      n: 2,
      verb: 'PRINT',
      mono: '3DP',
      color: 'var(--signal-amber)',
      tools: ['Bambu Lab Carbon X1E (FDM)', 'Elegoo Saturn 4 Ultra (resin)'],
      what: 'Build solid plastic objects layer-by-layer from a 3D model. FDM = bigger / cheaper / functional. Resin = smaller / smoother / detailed.',
      whatProjects: 'Custom phone mounts · tactile prototypes · tabletop pieces · replacement parts · jewelry · enclosures',
      forThis: 'The "I designed it in Tinkercad and now it exists" tool. ~30% of final projects use it.',
    },
    {
      n: 3,
      verb: 'STITCH',
      mono: 'SEW',
      color: 'var(--signal-green)',
      tools: ['Bernina B325 Sewing Machine', 'Bernina L450 Serger'],
      what: 'Join fabric. Sewing machine = clean visible seams. Serger = fast finished edges that won\'t fray.',
      whatProjects: 'Soft prototypes · wearables · cushioning · fabric enclosures for electronics · costume + uniform mockups',
      forThis: 'Underrated. Soft goods feel real to users in a way 3D prints don\'t.',
    },
    {
      n: 4,
      verb: 'PRESS',
      mono: 'PRSS',
      color: 'var(--signal-blue)',
      tools: ['HTVRONT Heat Press'],
      what: 'Bond heat-transfer vinyl or sublimation prints onto fabric or hard surfaces with heat + pressure.',
      whatProjects: 'Branded apparel · custom mousepads · signage · team merch for project demos · tote bags',
      forThis: 'Fastest way to make your final project look like a real product (not a prototype).',
    },
    {
      n: 5,
      verb: 'CAST',
      mono: 'RES',
      color: '#7E5CC4',
      tools: ['Elegoo Saturn 4 Ultra (resin printing)', 'Mold-making (manual)'],
      what: 'Highly detailed parts using liquid resin → UV cure. Or use 3D-printed masters to cast molds.',
      whatProjects: 'Detailed figurines · jewelry · medical/dental-style models · tactile inclusive design',
      forThis: 'Pick this if your project lives or dies on visual detail.',
    },
    {
      n: 6,
      verb: 'PROTECT',
      mono: 'LAM',
      color: '#3F7EA8',
      tools: ['Laminator'],
      what: 'Seal printed material between plastic. Looks small. Matters more than you think for demos.',
      whatProjects: 'Field-test cards · signage that survives a backpack · physical UI mockups · game cards',
      forThis: 'Your demo prototype lives or dies based on whether it survives the walk to class.',
    },
    {
      n: 7,
      verb: 'CAPTURE',
      mono: 'CAM',
      color: '#C44C7E',
      tools: ['~40 cameras (Fall 2025)', 'VR/scanning equipment', '3D scanner'],
      what: 'Photo, video, and 3D-capture gear. Document your work, scan real-world objects into 3D models.',
      whatProjects: 'Demo videos · user testing footage · scan-to-print workflows · photogrammetry',
      forThis: 'Every final project needs documentation. Every. Single. One.',
    },
    {
      n: 8,
      verb: 'SOFTWARE',
      mono: 'SW',
      color: 'var(--ink-900)',
      tools: ['Tinkercad (free)', 'Silhouette Studio (free)', 'Adobe Suite (free for IU students)'],
      what: 'The design tools that drive the physical tools. Tinkercad → 3D printers. Silhouette Studio → cutter. Adobe → everything visual.',
      whatProjects: 'Used by 100% of projects. Get accounts today.',
      forThis: 'Today\'s install homework: Tinkercad account + Silhouette Studio + Adobe via IU SSO.',
    },
  ];

  const c = capabilities[active];

  return (
    <div style={sk.root}>
      <div style={sk.kicker}>② CAPABILITY MAP · 8 MIN · ANCHOR</div>
      <h1 style={sk.h1}>
        Don't learn the <em style={sk.em}>tools</em>. Learn the <em style={sk.em}>verbs</em>.
      </h1>
      <p style={sk.lede}>
        In 14 weeks, you'll ship a <strong>design-thinking project</strong> — a real thing that solves
        a real problem. The Creator Commons is your toolbox. But a toolbox doesn't help if you only
        know the names of the tools. You need to know the <strong>verbs</strong>: <em>cut, print,
        stitch, press, cast, protect, capture, design</em>. Pick the verb, then the tool follows.
      </p>

      {/* Verb selector */}
      <div style={sk.pieceRow}>
        {capabilities.map((cap, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              ...sk.piece,
              borderColor: active === i ? cap.color : 'var(--paper-300)',
              background: active === i ? 'var(--paper-50)' : 'var(--paper-100)',
              boxShadow: active === i ? '0 4px 12px rgba(0,0,0,0.10)' : 'none',
            }}
            aria-pressed={active === i}
          >
            <div style={{ ...sk.pieceN, background: cap.color, color: cap.color === 'var(--signal-amber)' ? '#16140F' : '#fff' }}>
              {cap.mono}
            </div>
            <div style={sk.pieceVerb}>{cap.verb}</div>
            <div style={sk.pieceNum}>0{cap.n}</div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div style={{ ...sk.detail, borderColor: c.color }}>
        <div style={sk.detailHead}>
          <span style={{ ...sk.detailMono, background: c.color, color: c.color === 'var(--signal-amber)' ? '#16140F' : '#fff' }}>
            0{c.n} · {c.mono}
          </span>
          <h2 style={sk.detailName}>{c.verb}</h2>
          <div style={sk.toolList}>
            <div style={sk.toolLbl}>TOOLS THAT DO THIS</div>
            <div style={sk.toolNames}>
              {c.tools.map((t, i) => (
                <span key={i} style={sk.toolPill}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={sk.detailGrid}>
          <div style={sk.detailCol}>
            <div style={sk.detailLbl}>WHAT IT DOES</div>
            <p style={sk.detailBody}>{c.what}</p>
          </div>
          <div style={sk.detailCol}>
            <div style={sk.detailLbl}>WHAT YOU'D MAKE</div>
            <p style={sk.detailBody}>{c.whatProjects}</p>
          </div>
          <div style={sk.detailCol}>
            <div style={sk.detailLbl}>FOR YOUR FINAL</div>
            <p style={{ ...sk.detailBody, fontStyle: 'italic', color: 'var(--ink-900)', fontWeight: 500 }}>{c.forThis}</p>
          </div>
        </div>
      </div>

      <div style={sk.callout}>
        <strong>The 14-week arc:</strong> today you'll meet all 8 capabilities (next section), make
        ONE real thing using at least one of them, and seed an idea for your final project that uses
        2–3 of them in combination. You won't be a master — you'll know what's <em>possible</em>.
      </div>
    </div>
  );
}

const sk = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 760, margin: '0 0 22px' },

  pieceRow: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6, marginBottom: 18 },
  piece: {
    border: '2px solid var(--paper-300)', borderRadius: 4,
    padding: '10px 8px', cursor: 'pointer', textAlign: 'left',
    position: 'relative', transition: 'all .15s',
    minHeight: 100,
  },
  pieceN: { display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 2, letterSpacing: '0.06em' },
  pieceVerb: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, fontStyle: 'italic', color: 'var(--ink-900)', lineHeight: 1.05, marginTop: 8 },
  pieceNum: { position: 'absolute', top: 6, right: 8, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-300)' },

  detail: { background: 'var(--paper-50)', border: '2px solid', borderRadius: 6, padding: '20px 24px', marginBottom: 18 },
  detailHead: { display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: 16, alignItems: 'center', marginBottom: 16 },
  detailMono: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, padding: '4px 10px', borderRadius: 2, letterSpacing: '0.12em' },
  detailName: { fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, fontStyle: 'italic', margin: 0, color: 'var(--ink-900)', lineHeight: 1, letterSpacing: '-0.02em' },

  toolList: { display: 'flex', flexDirection: 'column', gap: 4, justifySelf: 'end' },
  toolLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', textAlign: 'right' },
  toolNames: { display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' },
  toolPill: {
    fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 8px',
    background: 'var(--paper-100)', border: '1px solid var(--paper-300)',
    borderRadius: 2, color: 'var(--ink-900)',
  },

  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 },
  detailCol: {},
  detailLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
  detailBody: { fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0 },

  callout: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-green)',
    fontSize: 14, lineHeight: 1.6,
  },
};

window.SPSectionSpawnKit = SPSectionSpawnKit;
