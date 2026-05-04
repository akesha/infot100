// Section 04 — MAP · the 15-week spike map (10 min)
// Click columns to set impact 1-4 for each week of the semester.
// Mirrors the source workbook's "Workflow Graph" tab.

function CTSectionMap() {
  const STORAGE = 'ct-map-spike-v1';
  const labels = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14','W15','Finals','Break'];

  // Pre-seed an example pattern: the typical CSCI semester
  const defaults = [1,1,2,2,3,2,4,3,2,2,3,3,4,3,2,4,1];
  const [vals, setVals] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return Array(17).fill(0);
  });

  React.useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(vals)); } catch (e) {}
  }, [vals]);

  const seed = () => setVals([...defaults]);
  const clear = () => setVals(Array(17).fill(0));

  const setVal = (i, v) => {
    setVals(arr => {
      const next = [...arr];
      next[i] = next[i] === v ? 0 : v;
      return next;
    });
  };

  const cycle = (i) => {
    setVals(arr => {
      const next = [...arr];
      next[i] = (next[i] + 1) % 5; // 0,1,2,3,4
      return next;
    });
  };

  const colorFor = (v) => {
    if (v === 0) return 'var(--paper-200)';
    if (v === 1) return '#A8D5BA';
    if (v === 2) return '#E8C988';
    if (v === 3) return '#E89B5C';
    if (v === 4) return '#C73E2C';
  };

  const totalLoad = vals.reduce((a, b) => a + b, 0);
  const peakWeeks = vals.map((v, i) => ({ v, i })).filter(x => x.v >= 3).map(x => labels[x.i]);

  return (
    <div style={mp.root}>
      <div style={mp.kicker}>④ MAP · 10 MIN · DELIVERABLE 2 of 3</div>
      <h1 style={mp.h1}>
        See the <em style={mp.em}>spikes</em> before they hit.
      </h1>
      <p style={mp.lede}>
        Click each week to cycle its impact level (0 → 1 → 2 → 3 → 4). Account for midterms, projects,
        travel, work crunches. The mountains tell you when to clear the valleys around them.
      </p>

      {/* legend */}
      <div style={mp.legend}>
        {[1,2,3,4].map(v => (
          <div key={v} style={mp.legendItem}>
            <div style={{ ...mp.legendSw, background: colorFor(v) }} />
            <span style={mp.legendLbl}>{v} · {['low','medium','high','very high'][v-1]}</span>
          </div>
        ))}
      </div>

      {/* the bar chart */}
      <div style={mp.chartWrap}>
        <div style={mp.chartGrid}>
          {/* y-axis grid lines */}
          {[4,3,2,1].map(y => (
            <div key={y} style={{ ...mp.gridLine, bottom: `${(y/4)*100}%` }}>
              <span style={mp.gridLbl}>{y}</span>
            </div>
          ))}
          {/* bars */}
          <div style={mp.barsRow}>
            {labels.map((lbl, i) => (
              <button
                key={i}
                onClick={() => cycle(i)}
                aria-label={`${lbl}, current impact ${vals[i]}, click to cycle`}
                style={{
                  ...mp.barBtn,
                  background: lbl === 'Finals' ? 'rgba(217,85,60,0.06)' : lbl === 'Break' ? 'rgba(93,187,126,0.06)' : 'transparent',
                }}
              >
                <div style={{
                  ...mp.bar,
                  height: `${(vals[i]/4)*100}%`,
                  background: colorFor(vals[i]),
                  border: vals[i] > 0 ? '1px solid rgba(0,0,0,0.15)' : 'none',
                }} />
              </button>
            ))}
          </div>
        </div>
        <div style={mp.xAxis}>
          {labels.map((lbl, i) => (
            <div key={i} style={mp.xLbl}>{lbl}</div>
          ))}
        </div>
      </div>

      <div style={mp.actions}>
        <button onClick={seed} style={mp.btnSecondary}>Show typical CSCI semester</button>
        <button onClick={clear} style={mp.btnGhost}>Clear</button>
        <span style={{ flex: 1 }} />
        <span style={mp.persist}>● auto-saves</span>
      </div>

      {/* readout */}
      <div style={mp.readout}>
        <div style={mp.roCol}>
          <div style={mp.roLbl}>TOTAL LOAD</div>
          <div style={mp.roVal}>{totalLoad}<span style={mp.roUnit}> / 68</span></div>
        </div>
        <div style={mp.roCol}>
          <div style={mp.roLbl}>SPIKE WEEKS (≥3)</div>
          <div style={mp.roBody}>{peakWeeks.length ? peakWeeks.join(' · ') : '—'}</div>
        </div>
      </div>

      <div style={mp.callout}>
        <strong>Read the terrain.</strong> The week BEFORE a 4 is gold — it's where you front-load.
        The week AFTER a 4 needs recovery space, not your "I'll catch up" pile. Two 4s back-to-back
        is a structural problem; talk to your instructors NOW, not in week 7.
      </div>

      {/* TEAM MODE — Spike Map Crash */}
      <SpikeMapCrash />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPIKE MAP CRASH — team exercise
   Tables of 4. Build a fictional sophomore's spike map together.
   Then "crash" events drop on weeks 6 + 11; teams have 4 min each
   to redraw. Builds the muscle that schedules get re-budgeted in
   real time, not just at term start.
   ───────────────────────────────────────────────────────────── */
function SpikeMapCrash() {
  const STORAGE_SC = 'ct-spikecrash-v1';
  const labels = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14','W15','Finals','Break'];

  // The fictional sophomore. Real CSCI-shaped semester.
  const persona = {
    name: 'Maya',
    year: 'Sophomore · Informatics + minor in Stats',
    courses: [
      { code: 'INFO-I 211', name: 'Information Infrastructure II', heat: '3 projects · 2 exams' },
      { code: 'CSCI-C 200', name: 'Discrete Math', heat: '12 problem sets · midterm + final' },
      { code: 'STAT-S 301', name: 'Applied Stats', heat: 'weekly quizzes · group project (4 ppl)' },
      { code: 'COLL-X 100', name: 'Career Prep elective', heat: 'attendance + 1 reflection' },
    ],
    commitments: [
      'WIT @ Luddy — board member · 4 hrs/wk',
      'Part-time job · 12 hrs/wk',
      'Family wedding · weekend of W8',
    ],
  };

  const [phase, setPhase] = React.useState('intro'); // intro | build | crash1 | crash2 | debrief
  const [vals, setVals] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_SC) || 'null') || Array(17).fill(0); }
    catch (e) { return Array(17).fill(0); }
  });
  const [history, setHistory] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_SC + '-history') || '[]'); }
    catch (e) { return []; }
  });
  const [secs, setSecs] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_SC, JSON.stringify(vals));
  }, [vals]);
  React.useEffect(() => {
    localStorage.setItem(STORAGE_SC + '-history', JSON.stringify(history));
  }, [history]);

  // timer
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const phaseLimit = phase === 'build' ? 6 * 60 : 4 * 60;

  const cycle = (i) => {
    setVals(arr => {
      const next = [...arr];
      next[i] = (next[i] + 1) % 5;
      return next;
    });
  };
  const colorFor = (v) => {
    if (v === 0) return 'var(--paper-200)';
    if (v === 1) return '#A8D5BA';
    if (v === 2) return '#E8C988';
    if (v === 3) return '#E89B5C';
    if (v === 4) return '#C73E2C';
  };

  const startBuild = () => {
    setPhase('build');
    setVals(Array(17).fill(0));
    setHistory([]);
    setSecs(0);
    setRunning(true);
  };

  const lockSnapshot = (label) => {
    setHistory(h => [...h, { label, vals: [...vals], ts: Date.now() }]);
  };

  const advance = () => {
    if (phase === 'build') {
      lockSnapshot('Initial build');
      setPhase('crash1');
      setSecs(0);
      setRunning(true);
    } else if (phase === 'crash1') {
      lockSnapshot('After flu (W6 −3 days)');
      setPhase('crash2');
      setSecs(0);
      setRunning(true);
    } else if (phase === 'crash2') {
      lockSnapshot('After recruiter (W11)');
      setPhase('debrief');
      setRunning(false);
    }
  };

  const reset = () => {
    setPhase('intro');
    setVals(Array(17).fill(0));
    setHistory([]);
    setSecs(0);
    setRunning(false);
  };

  const totalLoad = vals.reduce((a, b) => a + b, 0);
  const remaining = Math.max(0, phaseLimit - secs);
  const mins = Math.floor(remaining / 60);
  const secsLeft = remaining % 60;

  const crashEvents = {
    crash1: { week: 5, delta: 2, msg: '🤒 Maya catches the flu in WEEK 6. She loses 3 days. Redistribute her workload across W5, W7, W8.' },
    crash2: { week: 10, delta: 2, msg: '📞 In WEEK 11, a recruiter from a top firm reaches out — onsite interview. Two practice rounds + flight + travel. Add the load.' },
  };

  return (
    <div style={sc.root}>
      <div style={sc.head}>
        <div style={sc.tag}>★ TEAM EXERCISE · 14 MIN · TABLES OF 4</div>
        <h2 style={sc.h2}>The <em style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Spike Map Crash</em>.</h2>
        <p style={sc.lede}>
          Solo maps are the planning fantasy. <strong>Real schedules get crashed.</strong> Build a
          shared spike map for one fictional student — then the world drops two events on you and
          you redraw under time. Twice.
        </p>
      </div>

      {phase === 'intro' && (
        <div style={sc.persona}>
          <div style={sc.personaName}>👤 {persona.name}</div>
          <div style={sc.personaYear}>{persona.year}</div>

          <div style={sc.personaSection}>
            <div style={sc.personaLbl}>COURSES THIS TERM</div>
            <ul style={sc.personaList}>
              {persona.courses.map((c, i) => (
                <li key={i}>
                  <strong>{c.code}</strong> — {c.name}
                  <div style={sc.personaHeat}>{c.heat}</div>
                </li>
              ))}
            </ul>
          </div>

          <div style={sc.personaSection}>
            <div style={sc.personaLbl}>OTHER COMMITMENTS</div>
            <ul style={sc.personaList}>
              {persona.commitments.map((c, i) => (<li key={i}>{c}</li>))}
            </ul>
          </div>

          <button onClick={startBuild} style={sc.btnPrimary}>
            ▶ START · 6 MIN BUILD
          </button>
        </div>
      )}

      {(phase === 'build' || phase === 'crash1' || phase === 'crash2') && (
        <div>
          <div style={sc.timerBar}>
            <div style={sc.timerLbl}>
              {phase === 'build' && '① INITIAL BUILD · 6 min'}
              {phase === 'crash1' && '② CRASH 1 · 4 min'}
              {phase === 'crash2' && '③ CRASH 2 · 4 min'}
            </div>
            <div style={{
              ...sc.timer,
              color: remaining < 30 ? 'var(--signal-red)' : 'var(--ink-900)',
            }}>
              {mins}:{secsLeft.toString().padStart(2, '0')}
            </div>
            <button onClick={() => setRunning(r => !r)} style={sc.btnGhost2}>
              {running ? '⏸ PAUSE' : '▶ RESUME'}
            </button>
          </div>

          {(phase === 'crash1' || phase === 'crash2') && (
            <div style={sc.crashBox}>
              <div style={sc.crashLbl}>EVENT INJECTED — REDRAW</div>
              <div style={sc.crashMsg}>{crashEvents[phase].msg}</div>
            </div>
          )}

          {/* The shared chart */}
          <div style={sc.chartWrap}>
            <div style={sc.chartGrid}>
              {[4, 3, 2, 1].map(y => (
                <div key={y} style={{ ...sc.gridLine, bottom: `${(y / 4) * 100}%` }}>
                  <span style={sc.gridLbl}>{y}</span>
                </div>
              ))}
              <div style={sc.barsRow}>
                {labels.map((lbl, i) => (
                  <button
                    key={i}
                    onClick={() => cycle(i)}
                    aria-label={`${lbl}, current impact ${vals[i]}, click to cycle`}
                    style={{
                      ...sc.barBtn,
                      background: lbl === 'Finals' ? 'rgba(217,85,60,0.06)' : lbl === 'Break' ? 'rgba(93,187,126,0.06)' : 'transparent',
                    }}
                  >
                    <div style={{
                      ...sc.bar,
                      height: `${(vals[i] / 4) * 100}%`,
                      background: colorFor(vals[i]),
                      border: vals[i] > 0 ? '1px solid rgba(0,0,0,0.15)' : 'none',
                    }} />
                  </button>
                ))}
              </div>
            </div>
            <div style={sc.xAxis}>
              {labels.map((lbl, i) => (<div key={i} style={sc.xLbl}>{lbl}</div>))}
            </div>
          </div>

          <div style={sc.actionRow}>
            <span style={sc.statLbl}>TOTAL LOAD: <strong>{totalLoad}</strong> / 68</span>
            <span style={{ flex: 1 }} />
            <button onClick={advance} style={sc.btnPrimary}>
              {phase === 'build' && '✓ LOCK BUILD · DROP CRASH 1 →'}
              {phase === 'crash1' && '✓ LOCK · DROP CRASH 2 →'}
              {phase === 'crash2' && '✓ LOCK · DEBRIEF →'}
            </button>
          </div>
        </div>
      )}

      {phase === 'debrief' && (
        <div>
          <div style={sc.debriefHead}>📋 DEBRIEF · COMPARE THE THREE MAPS</div>
          <div style={sc.timeline}>
            {history.map((snap, idx) => {
              const total = snap.vals.reduce((a, b) => a + b, 0);
              return (
                <div key={idx} style={sc.timelineRow}>
                  <div style={sc.timelineLbl}>
                    <div style={sc.timelineN}>STATE {idx + 1}</div>
                    <div style={sc.timelineName}>{snap.label}</div>
                    <div style={sc.timelineLoad}>load: {total}</div>
                  </div>
                  <div style={sc.miniChart}>
                    {snap.vals.map((v, i) => (
                      <div
                        key={i}
                        title={`${labels[i]}: ${v}`}
                        style={{
                          ...sc.miniBar,
                          height: `${(v / 4) * 100}%`,
                          background: colorFor(v),
                          minHeight: 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={sc.debriefQ}>
            <div style={sc.debriefQLbl}>DISCUSS AT YOUR TABLE — 4 MIN</div>
            <ol style={sc.debriefQList}>
              <li>Which week saw the <strong>biggest delta</strong> between state 1 and state 3?</li>
              <li>Did you push the load <strong>earlier</strong> (front-load) or <strong>later</strong> (defer) when the flu hit? Why?</li>
              <li>What was the first thing your team agreed to <strong>cut</strong>? (Not move — cut.)</li>
              <li>If this were YOUR semester: which crash would have actually broken you?</li>
            </ol>
          </div>

          <button onClick={reset} style={sc.btnGhost2}>↻ Run again with a different table</button>
        </div>
      )}

      <div style={sc.protocol}>
        <div style={sc.protLbl}>FACILITATOR PROTOCOL</div>
        <ol style={sc.protList}>
          <li>Tables of 4. One person drives the chart; everyone advises.</li>
          <li><strong>6 min:</strong> build Maya's initial map. Account for her courses + commitments.</li>
          <li><strong>4 min:</strong> the flu hits W6. Redistribute. (W6 stays low; pre/post weeks rise.)</li>
          <li><strong>4 min:</strong> recruiter reaches out W11. Add the load. Decide what gets cut.</li>
          <li><strong>4 min:</strong> open debrief. Ask each table to name their first cut.</li>
          <li>Land it: "Your real semester will get crashed at least twice. You're not behind — you're crashing."</li>
        </ol>
      </div>
    </div>
  );
}

const mp = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 720, margin: '0 0 24px' },

  legend: { display: 'flex', gap: 16, marginBottom: 14, padding: '8px 12px', background: 'var(--paper-100)', borderRadius: 4 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6 },
  legendSw: { width: 14, height: 14, borderRadius: 2, border: '1px solid rgba(0,0,0,0.15)' },
  legendLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-700)' },

  chartWrap: { background: 'var(--paper-100)', border: '2px solid var(--ink-900)', borderRadius: 4, padding: '14px 14px 4px', marginBottom: 14 },
  chartGrid: { position: 'relative', height: 240, paddingLeft: 26 },
  gridLine: { position: 'absolute', left: 0, right: 0, borderTop: '1px dashed var(--paper-300)', height: 0 },
  gridLbl: { position: 'absolute', left: 0, top: -7, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)' },
  barsRow: { position: 'absolute', left: 26, right: 0, top: 0, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: 4, alignItems: 'end' },
  barBtn: { background: 'transparent', border: 'none', cursor: 'pointer', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 0 },
  bar: { width: '100%', borderRadius: '2px 2px 0 0', minHeight: 2, transition: 'height .25s, background .15s' },
  xAxis: { display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: 4, paddingLeft: 26, paddingTop: 4, borderTop: '2px solid var(--ink-900)' },
  xLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 600, color: 'var(--ink-700)', textAlign: 'center', padding: '4px 0' },

  actions: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 },
  btnSecondary: { background: 'var(--paper-200)', color: 'var(--ink-900)', border: '1px solid var(--paper-300)', padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer' },
  btnGhost: { background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)', padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, borderRadius: 3, cursor: 'pointer' },
  persist: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', fontWeight: 600 },

  readout: { display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, marginBottom: 16, padding: '14px 18px', background: 'var(--paper-100)', borderRadius: 6, border: '1px solid var(--paper-200)' },
  roCol: {},
  roLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', marginBottom: 4 },
  roVal: { fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1 },
  roUnit: { fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink-300)', fontWeight: 400 },
  roBody: { fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.4 },

  callout: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '14px 18px', borderRadius: 4, borderLeft: '4px solid var(--signal-red)', fontSize: 14, lineHeight: 1.6 },
};

/* Spike Map Crash styles */
const sc = {
  root: {
    marginTop: 32, padding: '24px 26px',
    background: 'var(--paper-100)',
    border: '2px solid var(--ink-900)',
    borderRadius: 6,
  },
  head: { marginBottom: 18 },
  tag: {
    display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700,
    letterSpacing: '0.18em', color: '#16140F', background: 'var(--signal-amber)',
    padding: '4px 10px', borderRadius: 2, marginBottom: 12,
  },
  h2: { fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, lineHeight: 1.0, margin: '0 0 10px', letterSpacing: '-0.02em' },
  lede: { fontSize: 15, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0, maxWidth: 720 },

  persona: {
    background: 'var(--paper-50)', border: '1.5px solid var(--paper-300)', borderRadius: 4,
    padding: '18px 22px',
  },
  personaName: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.1 },
  personaYear: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)', letterSpacing: '0.05em', marginTop: 2, marginBottom: 16 },
  personaSection: { marginBottom: 14 },
  personaLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', marginBottom: 6 },
  personaList: { fontSize: 13, lineHeight: 1.55, paddingLeft: 20, margin: 0, color: 'var(--ink-900)' },
  personaHeat: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', fontStyle: 'italic', marginTop: 2 },

  btnPrimary: {
    background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none',
    padding: '12px 22px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.12em', borderRadius: 3, cursor: 'pointer', marginTop: 8,
  },
  btnGhost2: {
    background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)',
    padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600,
    letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer',
  },

  timerBar: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '10px 14px', background: 'var(--paper-50)',
    border: '1.5px solid var(--ink-900)', borderRadius: 4, marginBottom: 12,
  },
  timerLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
  timer: { fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, marginLeft: 'auto', lineHeight: 1, fontVariantNumeric: 'tabular-nums' },

  crashBox: {
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    padding: '12px 16px', borderRadius: 4, marginBottom: 12,
    borderLeft: '4px solid var(--signal-red)',
  },
  crashLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 6 },
  crashMsg: { fontSize: 14, lineHeight: 1.5, color: 'var(--paper-100)' },

  chartWrap: { background: 'var(--paper-50)', border: '2px solid var(--ink-900)', borderRadius: 4, padding: '14px 14px 4px', marginBottom: 12 },
  chartGrid: { position: 'relative', height: 200, paddingLeft: 26 },
  gridLine: { position: 'absolute', left: 0, right: 0, borderTop: '1px dashed var(--paper-300)', height: 0 },
  gridLbl: { position: 'absolute', left: 0, top: -7, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)' },
  barsRow: { position: 'absolute', left: 26, right: 0, top: 0, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: 4, alignItems: 'end' },
  barBtn: { background: 'transparent', border: 'none', cursor: 'pointer', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 0 },
  bar: { width: '100%', borderRadius: '2px 2px 0 0', minHeight: 2, transition: 'height .25s, background .15s' },
  xAxis: { display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: 4, paddingLeft: 26, paddingTop: 4, borderTop: '2px solid var(--ink-900)' },
  xLbl: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 600, color: 'var(--ink-700)', textAlign: 'center', padding: '4px 0' },

  actionRow: { display: 'flex', alignItems: 'center', gap: 12 },
  statLbl: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' },

  debriefHead: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--crimson)', marginBottom: 12 },
  timeline: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 },
  timelineRow: {
    display: 'grid', gridTemplateColumns: '180px 1fr', gap: 14,
    background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 4,
    padding: '10px 14px', alignItems: 'center',
  },
  timelineLbl: {},
  timelineN: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em' },
  timelineName: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.2, marginTop: 2 },
  timelineLoad: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-700)', marginTop: 4 },
  miniChart: {
    display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: 2,
    height: 60, alignItems: 'end',
    padding: '0 8px',
    borderBottom: '1.5px solid var(--ink-900)',
  },
  miniBar: { width: '100%', borderRadius: '2px 2px 0 0', border: '1px solid rgba(0,0,0,0.1)' },

  debriefQ: {
    background: 'var(--paper-50)', border: '1.5px solid var(--paper-300)', borderRadius: 4,
    padding: '14px 18px', marginBottom: 14,
  },
  debriefQLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.15em', marginBottom: 8 },
  debriefQList: { fontSize: 14, lineHeight: 1.7, paddingLeft: 22, margin: 0, color: 'var(--ink-900)' },

  protocol: {
    marginTop: 16, padding: '12px 16px',
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    borderRadius: 4, borderLeft: '4px solid var(--signal-amber)',
  },
  protLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
  protList: { fontSize: 12.5, lineHeight: 1.6, paddingLeft: 22, margin: 0, color: 'var(--paper-200)' },
};

window.CTSectionMap = CTSectionMap;
