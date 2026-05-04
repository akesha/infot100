// Section 00 — Roll Call icebreaker (12 min)
// "What did you make with your hands before age 12?"
// Anonymous wall. Reframes "I'm not a maker" — every student is.
// Mirrors the Avoidance Wall pattern from Honest Start.

function SPSectionRollCall() {
  const STORAGE = 'sp-rollcall-v1';

  // Pre-seeded examples (real-sounding, drawn from things people actually said)
  const seeded = [
    "Lego star destroyer (instructions melted away)",
    "A rubber-band-powered car for a cub-scout race",
    "A friendship bracelet that fell apart",
    "Slime, like 40 batches",
    "Outfits for my dolls — then for me",
    "A treehouse that was really a fort that was really a milk crate",
    "Origami crane I still can't fold from memory",
    "Cardboard sword. Then a cardboard shield. Then a cardboard knight.",
    "A volcano for the science fair",
    "Mystery chemical solutions in the kitchen sink",
    "Sock puppets — full theater",
    "A drawing of every Pokémon (gen 1)",
    "Bird feeder from a 2-liter bottle",
    "A whole book — stapled, illustrated, illegible",
    "Jewelry box for my mom — uneven, hideous",
    "Stop-motion movie with action figures",
    "Modded my Game Boy with a sharpie",
    "A bow & arrow from PVC pipe",
    "A robot, sort of, that was a cardboard box with eyes",
    "A perler-bead Pikachu",
    "Helped my dad rebuild a deck",
    "Bedazzled a phone case",
    "Coded a Scratch game where the cat ate cake",
  ];

  const [entries, setEntries] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return seeded.slice(0, 8); // start with a few examples on the wall
  });
  const [draft, setDraft] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(entries));
  }, [entries]);

  const post = () => {
    const t = draft.trim();
    if (!t) return;
    setEntries(e => [...e, t]);
    setDraft('');
  };

  const seedAll = () => setEntries(seeded);
  const clear = () => setEntries([]);

  // Stable random tilts/colors per entry (use index as seed)
  const tilt = (i) => ((i * 17) % 11) - 5; // -5 to 5 deg
  const colors = ['#FFE9A8', '#FFD9B0', '#FFC8C8', '#D8F0D8', '#D5E8FF', '#F0D8FF', '#FFF0E0'];
  const colorFor = (i) => colors[i % colors.length];

  return (
    <div style={rc.root}>
      <div style={rc.kicker}>⓪ ROLL CALL · 12 MIN · ICEBREAKER</div>
      <h1 style={rc.h1}>
        What did you <em style={rc.em}>make</em> with your hands{' '}
        <span style={rc.subline}>before age 12?</span>
      </h1>
      <p style={rc.lede}>
        Not "build" in the resume sense. Make. Cardboard, glue, perler beads, Lego instructions you
        ignored, slime that ruined the carpet. <strong>Anonymous.</strong> Add yours and watch the wall
        fill up. Halfway through the room you'll realize: <em>everyone here has already made something</em>.
        That's the spawn point.
      </p>

      {/* Input */}
      <div style={rc.inputWrap}>
        <input
          style={rc.input}
          placeholder="e.g. doll clothes, kitchen chemistry, a stapled-together book…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') post(); }}
          aria-label="What did you make"
        />
        <button onClick={post} style={rc.btnPost} disabled={!draft.trim()}>
          POST →
        </button>
      </div>

      {/* The wall */}
      <div style={rc.wallWrap}>
        <div style={rc.wallHead}>
          <span style={rc.wallLbl}>THE MAKER WALL · {entries.length} {entries.length === 1 ? 'thing' : 'things'}</span>
          <div style={rc.wallActions}>
            {entries.length > 12 && !showAll && (
              <button onClick={() => setShowAll(true)} style={rc.btnGhost}>show all</button>
            )}
            {showAll && (
              <button onClick={() => setShowAll(false)} style={rc.btnGhost}>show less</button>
            )}
            <button onClick={seedAll} style={rc.btnGhost}>+ examples</button>
            <button onClick={clear} style={rc.btnGhost}>clear</button>
          </div>
        </div>
        <div style={rc.wall}>
          {entries.length === 0 && (
            <div style={rc.empty}>The wall is empty. Add the first thing.</div>
          )}
          {(showAll ? entries : entries.slice(-12)).map((e, i) => (
            <div
              key={i}
              style={{
                ...rc.note,
                background: colorFor(i),
                transform: `rotate(${tilt(i)}deg)`,
              }}
            >
              {e}
            </div>
          ))}
        </div>
      </div>

      <div style={rc.callout}>
        <strong>The point:</strong> if you made anything before you were 12, you've already done the
        thing this week is asking. CS isn't where making starts — it's where the toolkit gets
        sharper. The cardboard prototype later today is the same impulse, with better glue.
      </div>
    </div>
  );
}

const rc = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  subline: { display: 'block', fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--ink-500)', fontWeight: 400, marginTop: 4 },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 760, margin: '0 0 24px' },

  inputWrap: { display: 'flex', gap: 8, marginBottom: 18 },
  input: {
    flex: 1, fontFamily: 'var(--font-body)', fontSize: 16, padding: '10px 14px',
    border: '1.5px solid var(--paper-300)', borderRadius: 4,
    background: 'var(--paper-50)', color: 'var(--ink-900)',
  },
  btnPost: {
    background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none',
    padding: '10px 18px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700,
    letterSpacing: '0.12em', borderRadius: 4, cursor: 'pointer',
  },

  wallWrap: { marginBottom: 16 },
  wallHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  wallLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.15em' },
  wallActions: { display: 'flex', gap: 6 },
  btnGhost: {
    background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)',
    padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, borderRadius: 3, cursor: 'pointer',
  },
  wall: {
    background: 'var(--paper-100)', border: '2px dashed var(--paper-300)', borderRadius: 6,
    padding: '20px 16px', minHeight: 200,
    display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-start',
  },
  empty: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--ink-500)', padding: 32, width: '100%', textAlign: 'center' },
  note: {
    padding: '10px 14px', borderRadius: 2,
    fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic',
    color: '#16140F', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
    maxWidth: 220, lineHeight: 1.35,
    border: '1px solid rgba(0,0,0,0.05)',
  },

  callout: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-green)',
    fontSize: 14, lineHeight: 1.6,
  },
};

window.SPSectionRollCall = SPSectionRollCall;
