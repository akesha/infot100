// Section 03 — AUDIT · the 168-hour grid (15 min)
// Click cells to color-code an actual week. Sum totals per category live.
// Categories from the source workbook: Fixed / Sleep+Eat / Personal / Academic / Social / Flex

function CTSectionAudit() {
  const cats = [
    { id: 'fixed',    lbl: 'Fixed',    full: 'Fixed (class, work, standing meetings)',  color: '#3A5FA8',  text: '#fff' },
    { id: 'sleep',    lbl: 'Sleep',    full: 'Sleep + meals + hygiene',                color: '#7156A8',  text: '#fff' },
    { id: 'academic', lbl: 'Academic', full: 'Homework / studying / labs',             color: '#B83A22',  text: '#fff' },
    { id: 'work',     lbl: 'Work',     full: 'Job, internship, paid hours',            color: '#3F8A56',  text: '#fff' },
    { id: 'social',   lbl: 'Social',   full: 'Friends, family, fun, hobbies',          color: '#E58FB5',  text: '#16140F' },
    { id: 'flex',     lbl: 'FLEX',     full: 'Open / unspoken-for / could go anywhere', color: '#E8A93B', text: '#16140F' },
  ];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6am to 11pm = 18 hrs/day visible

  const STORAGE = 'ct-audit-grid-v1';
  const [grid, setGrid] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  });
  const [active, setActive] = React.useState('fixed');
  const [painting, setPainting] = React.useState(null); // 'paint' or 'erase'
  const [seeded, setSeeded] = React.useState(false);

  React.useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(grid)); } catch (e) {}
  }, [grid]);

  const cellKey = (d, h) => `${d}-${h}`;

  const apply = (d, h, mode) => {
    setGrid(g => {
      const k = cellKey(d, h);
      const next = { ...g };
      if (mode === 'erase' || (mode === undefined && next[k] === active)) {
        delete next[k];
      } else {
        next[k] = active;
      }
      return next;
    });
  };

  const onMouseDown = (d, h, e) => {
    e.preventDefault();
    const k = cellKey(d, h);
    const mode = grid[k] === active ? 'erase' : 'paint';
    setPainting(mode);
    apply(d, h, mode);
  };
  const onMouseEnter = (d, h) => {
    if (painting) apply(d, h, painting);
  };

  // Keyboard support: focusable cells, Enter/Space to toggle the active
  // category, Backspace/Delete to erase. Arrow keys move focus.
  const onCellKeyDown = (e, di, h) => {
    const key = e.key;
    if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
      e.preventDefault();
      apply(di, h);
      return;
    }
    if (key === 'Backspace' || key === 'Delete') {
      e.preventDefault();
      apply(di, h, 'erase');
      return;
    }
    const arrow = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[key];
    if (arrow) {
      e.preventDefault();
      const nd = Math.max(0, Math.min(days.length - 1, di + arrow[0]));
      const nh = Math.max(hours[0], Math.min(hours[hours.length - 1], h + arrow[1]));
      const next = document.querySelector(`[data-cell="${nd}-${nh}"]`);
      if (next) next.focus();
    }
  };

  React.useEffect(() => {
    const up = () => setPainting(null);
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  // tallies
  const tallies = React.useMemo(() => {
    const t = Object.fromEntries(cats.map(c => [c.id, 0]));
    Object.values(grid).forEach(c => { if (t[c] != null) t[c] += 1; });
    return t;
  }, [grid]);

  const totalPainted = Object.values(tallies).reduce((a, b) => a + b, 0);
  const visibleHours = 18 * 7; // 126 visible cells (out of 168)
  const offGrid = 6 * 7; // 42 hrs off-grid (assumed sleep midnight-6am)

  const seed = () => {
    // Pre-fill an example week (sleep 11pm-6am off-grid; fixed = class M/W/F 10-11, lab T 1-3pm; etc.)
    const ex = {};
    days.forEach((d, di) => {
      // light morning anchor
      ex[`${di}-7`] = 'sleep';   // breakfast
    });
    // class M/W/F 10-12
    [0, 2, 4].forEach(di => { ex[`${di}-10`] = 'fixed'; ex[`${di}-11`] = 'fixed'; });
    // lab Tue 1-4pm
    ex[`1-13`] = 'fixed'; ex[`1-14`] = 'fixed'; ex[`1-15`] = 'fixed';
    // job Sat 10-3
    [10,11,12,13,14].forEach(h => { ex[`5-${h}`] = 'work'; });
    setGrid(ex);
    setSeeded(true);
  };

  const clear = () => { setGrid({}); setSeeded(false); };

  const [copyState, setCopyState] = React.useState('idle'); // idle | copied
  const buildExportText = React.useCallback(() => {
    // Plain-text summary the student can paste into a doc, email, or LMS.
    const lines = [
      'CSCI-Y100 · 168-hour audit · Compute Time',
      '',
      'WHERE YOUR WEEK GOES',
    ];
    cats.forEach(c => {
      const hrs = tallies[c.id] + (c.id === 'sleep' ? offGrid : 0);
      const pct = Math.round((hrs / 168) * 100);
      lines.push(`  ${c.lbl.padEnd(10)} ${String(hrs).padStart(3)} hr  (${pct}%)`);
    });
    if (flexBlocks.length) {
      lines.push('', 'LARGEST FLEX BLOCKS');
      flexBlocks.forEach(b => lines.push(`  ${b.day} ${fmt(b.start)}-${fmt(b.end)} (${b.end - b.start} hr)`));
    }
    lines.push('', 'GRID (rows: 6a-11p · cols: M T W T F S S · "·" = empty)');
    hours.forEach(h => {
      const row = days.map((_, di) => {
        const v = grid[`${di}-${h}`];
        return v ? v[0].toUpperCase() : '·';
      }).join(' ');
      lines.push(`  ${fmt(h).padStart(3)}  ${row}`);
    });
    return lines.join('\n');
  }, [grid, tallies, flexBlocks]);

  const onCopy = async () => {
    const text = buildExportText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: a textarea-based copy works without clipboard API.
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'absolute'; ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (e) {
      // Last-resort: open a new window with the text so the student can copy it manually.
      const w = window.open('', '_blank');
      if (w) { w.document.write('<pre>' + text.replace(/[<&]/g, c => c === '<' ? '&lt;' : '&amp;') + '</pre>'); w.document.title = 'Audit export'; }
    }
  };
  const onPrint = () => window.print();

  const flexBlocks = React.useMemo(() => {
    // detect contiguous runs of FLEX or empty cells per day; report blocks ≥ 2hr
    const blocks = [];
    days.forEach((d, di) => {
      let runStart = null;
      const flush = (end) => {
        if (runStart != null && end - runStart >= 2) {
          blocks.push({ day: d, start: runStart, end });
        }
        runStart = null;
      };
      hours.forEach(h => {
        const v = grid[`${di}-${h}`];
        const isFlex = v === 'flex' || (!v);
        if (isFlex) {
          if (runStart === null) runStart = h;
        } else {
          flush(h);
        }
      });
      flush(24);
    });
    return blocks.sort((a,b) => (b.end - b.start) - (a.end - a.start)).slice(0, 4);
  }, [grid]);

  const fmt = (h) => h === 12 ? '12p' : h > 12 ? `${h-12}p` : `${h}a`;

  return (
    <div style={au.root}>
      <div style={au.kicker}>③ AUDIT · 15 MIN · DELIVERABLE 1 of 3</div>
      <h1 style={au.h1}>
        Color one <em style={au.em}>real</em> week.
      </h1>
      <p style={au.lede}>
        Pick a category. Click and drag across cells to paint. The point isn't to plan — it's to
        SEE. Where does your week actually go? <strong>Where is the flex?</strong>
      </p>

      {/* category palette */}
      <div style={au.palette} role="toolbar" aria-label="Category palette">
        {cats.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            aria-pressed={active === c.id}
            style={{
              ...au.swatch,
              background: c.color, color: c.text,
              outline: active === c.id ? '3px solid var(--ink-900)' : 'none',
              outlineOffset: active === c.id ? 2 : 0,
            }}
          >
            <span style={au.swatchLbl}>{c.lbl}</span>
            <span style={au.swatchHrs}>{tallies[c.id]} hr</span>
          </button>
        ))}
      </div>

      <div style={au.activeNote}>
        <span style={au.activeLbl}>PAINTING</span>
        <span style={au.activeBody}>{cats.find(c => c.id === active).full}</span>
        <span style={au.activeHint}>· click a painted cell to erase · click & drag to paint multiple · keyboard: Tab into the grid, arrow keys to move, Enter to paint, Backspace to erase</span>
      </div>

      {/* the grid */}
      <div style={au.gridWrap}>
        <div style={au.headerRow}>
          <div /> {/* corner */}
          {days.map(d => <div key={d} style={au.dayHead}>{d}</div>)}
        </div>
        <div style={au.body} onMouseLeave={() => setPainting(null)}>
          {hours.map(h => (
            <div key={h} style={au.hourRow}>
              <div style={au.hourLbl}>{fmt(h)}</div>
              {days.map((d, di) => {
                const v = grid[`${di}-${h}`];
                const cat = cats.find(c => c.id === v);
                return (
                  <div
                    key={`${di}-${h}`}
                    role="gridcell"
                    tabIndex={0}
                    data-cell={`${di}-${h}`}
                    aria-label={`${d} ${fmt(h)}${v ? ': ' + cats.find(c => c.id === v).lbl : ', empty'}. Press Enter to paint as ${cats.find(c => c.id === active).lbl}, Backspace to erase, arrow keys to move.`}
                    onMouseDown={(e) => onMouseDown(di, h, e)}
                    onMouseEnter={() => onMouseEnter(di, h)}
                    onKeyDown={(e) => onCellKeyDown(e, di, h)}
                    style={{
                      ...au.cell,
                      background: cat ? cat.color : 'var(--paper-50)',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div style={au.gridFootnote}>
          <span>● 12am – 6am assumed sleep ({offGrid} hr) ·</span>
          <span style={{ fontWeight: 700, color: 'var(--ink-900)' }}> {totalPainted} of {visibleHours} visible cells filled</span>
        </div>
      </div>

      {/* actions */}
      <div style={au.actions}>
        <button onClick={seed} style={au.btnSecondary}>{seeded ? 'Reseed example' : 'Show me an example'}</button>
        <button onClick={clear} style={au.btnGhost}>Clear all</button>
        <button onClick={onCopy} style={au.btnSecondary} aria-live="polite">
          {copyState === 'copied' ? '✓ Copied' : 'Copy summary'}
        </button>
        <button onClick={onPrint} style={au.btnGhost}>Print</button>
        <span style={{ flex: 1 }} />
        <span style={au.persist}>● auto-saves to this device · use Copy summary to back up</span>
      </div>

      {/* tally panel */}
      <div style={au.summary}>
        <div style={au.summaryHead}>WHERE YOUR WEEK GOES</div>
        <div style={au.tallies}>
          {cats.map(c => {
            const hrs = tallies[c.id] + (c.id === 'sleep' ? offGrid : 0);
            const pct = Math.round((hrs / 168) * 100);
            return (
              <div key={c.id} style={au.tallyRow}>
                <div style={{ ...au.tallySw, background: c.color }} />
                <div style={au.tallyLbl}>{c.lbl}</div>
                <div style={au.tallyBar}>
                  <div style={{ ...au.tallyFill, width: `${pct}%`, background: c.color }} />
                </div>
                <div style={au.tallyHrs}>{hrs} hr</div>
                <div style={au.tallyPct}>{pct}%</div>
              </div>
            );
          })}
        </div>
        {flexBlocks.length > 0 && (
          <div style={au.flexCallout}>
            <div style={au.flexLbl}>YOUR LARGEST FLEX BLOCKS</div>
            <div style={au.flexList}>
              {flexBlocks.map((b, i) => (
                <span key={i} style={au.flexChip}>
                  {b.day} {fmt(b.start)}–{fmt(b.end)} <span style={au.flexHrs}>({b.end - b.start} hr)</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={au.note}>
        <strong>The trick:</strong> the <em>FLEX</em> total is your real homework budget. If it's
        less than 2× your in-class hours, something has to move — that's what TRIAGE solves later.
      </div>
    </div>
  );
}

const au = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 24px' },

  palette: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 10 },
  swatch: {
    border: 'none', borderRadius: 4, padding: '10px 12px', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
    transition: 'transform .12s',
  },
  swatchLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' },
  swatchHrs: { fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.85 },

  activeNote: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 14,
    background: 'var(--paper-100)', border: '1px dashed var(--paper-300)', borderRadius: 4,
  },
  activeLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em' },
  activeBody: { fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' },
  activeHint: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', fontStyle: 'italic' },

  gridWrap: { background: 'var(--paper-100)', border: '2px solid var(--ink-900)', borderRadius: 4, padding: 8, marginBottom: 14, userSelect: 'none' },
  headerRow: { display: 'grid', gridTemplateColumns: '48px repeat(7, 1fr)', gap: 2 },
  dayHead: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-700)', letterSpacing: '0.1em', textAlign: 'center', padding: '4px 0' },
  body: { display: 'flex', flexDirection: 'column', gap: 2 },
  hourRow: { display: 'grid', gridTemplateColumns: '48px repeat(7, 1fr)', gap: 2 },
  hourLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-500)', textAlign: 'right', padding: '0 6px', alignSelf: 'center' },
  cell: {
    height: 18, borderRadius: 1, cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.08)',
    transition: 'background 0.08s',
  },
  gridFootnote: { display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', padding: '8px 4px 2px' },

  actions: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 },
  btnSecondary: {
    background: 'var(--paper-200)', color: 'var(--ink-900)', border: '1px solid var(--paper-300)',
    padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer',
  },
  btnGhost: {
    background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)',
    padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
    borderRadius: 3, cursor: 'pointer',
  },
  persist: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', fontWeight: 600 },

  summary: { background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 6, padding: '18px 20px', marginBottom: 16 },
  summaryHead: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.15em', marginBottom: 14, paddingBottom: 8, borderBottom: '2px solid var(--ink-900)' },
  tallies: { display: 'flex', flexDirection: 'column', gap: 6 },
  tallyRow: { display: 'grid', gridTemplateColumns: '14px 80px 1fr 60px 40px', gap: 10, alignItems: 'center' },
  tallySw: { width: 14, height: 14, borderRadius: 2, border: '1px solid rgba(0,0,0,0.15)' },
  tallyLbl: { fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600, color: 'var(--ink-900)' },
  tallyBar: { height: 12, background: 'var(--paper-200)', borderRadius: 2, overflow: 'hidden' },
  tallyFill: { height: '100%', transition: 'width .25s' },
  tallyHrs: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-900)', textAlign: 'right' },
  tallyPct: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', textAlign: 'right' },

  flexCallout: { marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--paper-300)' },
  flexLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.12em', marginBottom: 8 },
  flexList: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  flexChip: { fontFamily: 'var(--font-mono)', fontSize: 12, padding: '5px 10px', background: 'rgba(232,169,59,0.18)', border: '1px solid var(--signal-amber)', borderRadius: 3, color: 'var(--ink-900)', fontWeight: 600 },
  flexHrs: { color: 'var(--ink-500)', fontWeight: 400 },

  note: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '14px 18px', borderRadius: 4,
    borderLeft: '4px solid var(--signal-amber)',
    fontSize: 14, lineHeight: 1.6,
  },
};

window.CTSectionAudit = CTSectionAudit;
