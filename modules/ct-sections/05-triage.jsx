// Section 05 — TRIAGE · the Eisenhower drag-and-drop matrix (20 min) ★ THE deliverable
// Drag 12 real student tasks (from the source workbook) into 4 boxes.
// Box 1: Urgent + Important · Box 2: Important + Not Urgent
// Box 3: Not Urgent + Not Important · Box 4: Urgent + Not Important
// Star/asterisk mechanic for "It depends" tasks.

function CTSectionTriage() {
  const STORAGE = 'ct-triage-v1';

  // Tasks from the source workbook + a few real student examples
  const initialTasks = [
    { id: 't1', text: 'Final paper draft due Friday', hint: '40% of grade · 4 days out' },
    { id: 't2', text: 'Reply to group member\'s presentation question', hint: 'they need it by tomorrow' },
    { id: 't3', text: 'Help your friend with their homework', hint: 'they texted 20 min ago' },
    { id: 't4', text: 'Send reminder emails for org meeting', hint: 'meeting next Tuesday' },
    { id: 't5', text: 'Get oil changed on your car', hint: 'overdue by 2,000 miles' },
    { id: 't6', text: 'Attend favorite workout class', hint: 'helps you sleep, not graded' },
    { id: 't7', text: 'Make Insta posts for sorority', hint: 'someone else could do this' },
    { id: 't8', text: 'Call grandparents', hint: 'haven\'t talked in 3 weeks' },
    { id: 't9', text: 'Book a doctor\'s appointment', hint: 'meds running low this week' },
    { id: 't10', text: 'Sleep 8 hours tonight', hint: 'you slept 5 last night' },
    { id: 't11', text: 'Eat actual dinner', hint: 'it\'s 9pm. you skipped lunch' },
    { id: 't12', text: 'Hang out with friends Saturday', hint: 'plans were already made' },
  ];

  const [placement, setPlacement] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  });
  const [stars, setStars] = React.useState({});
  const [dragId, setDragId] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(null);

  React.useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(placement)); } catch (e) {}
  }, [placement]);

  const boxes = [
    { id: 'b1', n: 1, lbl: 'DO NOW',     sub: 'urgent + important',         color: '#C73E2C', text: '#fff',
      desc: 'Time-sensitive AND consequential. Drop everything; finish these first.' },
    { id: 'b2', n: 2, lbl: 'SCHEDULE',   sub: 'important · not urgent',     color: '#3F8A56', text: '#fff',
      desc: 'Real long-term value. Easy to skip because nothing is screaming. Block time NOW.' },
    { id: 'b4', n: 4, lbl: 'BATCH/DELEGATE', sub: 'urgent · not important', color: '#E8A93B', text: '#16140F',
      desc: 'Loud, but low-value. Can someone else do it? Can you batch them into 30 min later?' },
    { id: 'b3', n: 3, lbl: 'DROP / LATER', sub: 'not urgent · not important', color: '#7E776A', text: '#fff',
      desc: 'Distractions in disguise. Drop them, or save for genuine downtime — never \u201cwhile studying.\u201d' },
  ];

  const placedIn = (boxId) => initialTasks.filter(t => placement[t.id] === boxId);
  const unplaced = initialTasks.filter(t => !placement[t.id]);

  const onDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };
  const onDragEnd = () => { setDragId(null); setDragOver(null); };
  const onDragOver = (e, boxId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOver !== boxId) setDragOver(boxId);
  };
  const onDrop = (e, boxId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || dragId;
    if (id) setPlacement(p => ({ ...p, [id]: boxId }));
    setDragOver(null);
    setDragId(null);
  };
  const onDropPool = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || dragId;
    if (id) setPlacement(p => { const n = { ...p }; delete n[id]; return n; });
    setDragOver(null);
    setDragId(null);
  };

  const toggleStar = (id) => setStars(s => ({ ...s, [id]: !s[id] }));
  const reset = () => { setPlacement({}); setStars({}); };

  // Keyboard / non-drag alternative to drag-and-drop.
  const moveTo = (id, boxId) => {
    setPlacement(p => {
      const next = { ...p };
      if (boxId) next[id] = boxId;
      else delete next[id];
      return next;
    });
  };

  const [copyState, setCopyState] = React.useState('idle');
  const onCopy = async () => {
    const lines = ['CSCI-Y100 · Triage matrix'];
    boxes.forEach(b => {
      const items = placedIn(b.id);
      lines.push('');
      lines.push(`BOX ${b.n} · ${b.lbl} (${b.sub})`);
      if (!items.length) lines.push('  (none)');
      else items.forEach(t => lines.push(`  - ${stars[t.id] ? '★ ' : ''}${t.text} — ${t.hint}`));
    });
    if (unplaced.length) {
      lines.push('', 'UNSORTED');
      unplaced.forEach(t => lines.push(`  - ${t.text} — ${t.hint}`));
    }
    const text = lines.join('\n');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'absolute'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (e) {}
  };

  const placedCount = Object.keys(placement).length;
  const starCount = Object.values(stars).filter(Boolean).length;

  return (
    <div style={tr.root}>
      <div style={tr.kicker}>⑤ TRIAGE · 20 MIN · DELIVERABLE 3 of 3 ★ MAIN DELIVERABLE</div>
      <h1 style={tr.h1}>
        <em style={tr.em}>Urgent</em> ≠ <em style={tr.em}>important</em>.
      </h1>
      <p style={tr.lede}>
        Most students do urgent things and call it productivity. Eisenhower's matrix splits the
        confusion in two: <strong>urgency</strong> (when) vs. <strong>importance</strong> (so what).
        Drag each task into the right box (or use the dropdown on each card). <strong>Click ★ on any you're unsure about</strong> — those are the
        most interesting ones to discuss.
      </p>

      {/* unplaced pool */}
      <div
        style={{ ...tr.pool, ...(dragOver === '__pool' ? tr.poolHover : {}) }}
        onDragOver={(e) => { e.preventDefault(); setDragOver('__pool'); }}
        onDragLeave={() => setDragOver(null)}
        onDrop={onDropPool}
      >
        <div style={tr.poolHead}>
          <span style={tr.poolLbl}>UNSORTED · {unplaced.length}</span>
          <span style={tr.poolHint}>drag any task into a box →</span>
        </div>
        <div style={tr.poolList}>
          {unplaced.length === 0 && (
            <div style={tr.poolEmpty}>★ all sorted — review your placement, then debate the starred ones</div>
          )}
          {unplaced.map(t => (
            <Task key={t.id} t={t} dragId={dragId} starred={!!stars[t.id]} onStar={toggleStar} onDragStart={onDragStart} onDragEnd={onDragEnd} currentBox={null} onMove={moveTo} />
          ))}
        </div>
      </div>

      {/* axis labels */}
      <div style={tr.axisRow}>
        <div />
        <div style={tr.axisLbl}>← URGENT &nbsp;&nbsp;&nbsp;&nbsp; NOT URGENT →</div>
      </div>

      {/* the matrix */}
      <div style={tr.matrix}>
        <div style={tr.yAxis}>
          <span style={{ ...tr.yLbl, top: '0%' }}>↑ IMPORTANT</span>
          <span style={{ ...tr.yLbl, bottom: '0%' }}>↓ NOT IMPORTANT</span>
        </div>
        <div style={tr.boxes}>
          {boxes.map(b => {
            const items = placedIn(b.id);
            const isOver = dragOver === b.id;
            return (
              <div
                key={b.id}
                onDragOver={(e) => onDragOver(e, b.id)}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => onDrop(e, b.id)}
                style={{
                  ...tr.box,
                  borderColor: isOver ? b.color : 'var(--paper-300)',
                  background: isOver ? `color-mix(in oklch, ${b.color}, var(--paper-50) 88%)` : 'var(--paper-50)',
                  boxShadow: isOver ? `inset 0 0 0 3px ${b.color}` : 'none',
                }}
              >
                <div style={tr.boxHead}>
                  <span style={{ ...tr.boxN, background: b.color, color: b.text }}>BOX {b.n}</span>
                  <span style={tr.boxLbl}>{b.lbl}</span>
                </div>
                <div style={tr.boxSub}>{b.sub}</div>
                <div style={tr.boxDesc}>{b.desc}</div>
                <div style={tr.boxItems}>
                  {items.length === 0 ? <div style={tr.boxEmpty}>drop tasks here</div> :
                    items.map(t => (
                      <Task key={t.id} t={t} dragId={dragId} starred={!!stars[t.id]} onStar={toggleStar} onDragStart={onDragStart} onDragEnd={onDragEnd} placed currentBox={b.id} onMove={moveTo} />
                    ))
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={tr.statusBar}>
        <span><strong>{placedCount}</strong> / {initialTasks.length} sorted</span>
        <span><strong>{starCount}</strong> starred ("it depends")</span>
        <button onClick={reset} style={tr.btnGhost}>Reset all</button>
        <button onClick={onCopy} style={tr.btnGhost} aria-live="polite">
          {copyState === 'copied' ? '✓ Copied' : 'Copy summary'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={tr.persist}>● auto-saves · drag OR use the per-task dropdowns</span>
      </div>

      {/* the punchline */}
      <details style={tr.discuss}>
        <summary style={tr.discussSum}>The trick most students miss →</summary>
        <div style={tr.discussBody}>
          <p style={{ marginTop: 0 }}><strong>Box 2 is the one that matters most.</strong> Sleep, doctor's appointment,
          long-term project work, calling people you love. Nothing in Box 2 is screaming — and that's
          exactly why it's neglected. The whole game of time management is moving life into Box 2 BEFORE
          it migrates into Box 1 (where it costs more) or out of your week entirely.</p>
          <p><strong>The "It depends" tasks (★) are where the real conversation is.</strong> Helping a
          friend with homework: Box 3 if it's distracting you from Box 1; Box 2 if it's how you build the
          relationships that get you through the semester. <em>You</em> decide.</p>
        </div>
      </details>

      {/* TEAM MODE — Triage Court */}
      <TriageCourt />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRIAGE COURT — team exercise
   Tables of 3–4. One student presents; table votes; 30-sec defense.
   In-page scaffold runs the timing, tracks rounds, captures verdicts.
   ───────────────────────────────────────────────────────────── */
function TriageCourt() {
  const STORAGE_TC = 'ct-triagecourt-v1';
  const [phase, setPhase] = React.useState('idle'); // idle | present | vote | defend | verdict
  const [secs, setSecs] = React.useState(0);
  const [round, setRound] = React.useState(1);
  const [defendant, setDefendant] = React.useState('');
  const [task, setTask] = React.useState('');
  const [studentBox, setStudentBox] = React.useState(null);
  const [tableBox, setTableBox] = React.useState(null);
  const [log, setLog] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_TC) || '[]'); } catch (e) { return []; }
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_TC, JSON.stringify(log));
  }, [log]);

  // timer
  React.useEffect(() => {
    if (phase === 'idle' || phase === 'verdict') return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // phase durations
  const limits = { present: 5, vote: 10, defend: 30 };

  React.useEffect(() => {
    if (phase in limits && secs >= limits[phase]) {
      // auto-advance present → vote, defend → verdict; vote needs manual click
      if (phase === 'present') { setPhase('vote'); setSecs(0); }
      else if (phase === 'defend') { setPhase('verdict'); }
    }
  }, [secs, phase]);

  const start = () => {
    if (!defendant || !task) return;
    setPhase('present');
    setSecs(0);
    setStudentBox(null);
    setTableBox(null);
  };

  const recordVote = (boxNum) => {
    setTableBox(boxNum);
    if (studentBox && studentBox === boxNum) {
      setPhase('verdict');
    } else if (studentBox) {
      setPhase('defend');
      setSecs(0);
    }
  };

  const finalVerdict = (winner) => {
    const entry = {
      round, name: defendant, task,
      studentBox, tableBox,
      defended: studentBox !== tableBox,
      winner, // 'student' | 'table' | 'agreed'
      ts: Date.now(),
    };
    setLog(l => [...l, entry]);
    setRound(r => r + 1);
    // reset
    setPhase('idle');
    setSecs(0);
    setDefendant('');
    setTask('');
    setStudentBox(null);
    setTableBox(null);
  };

  const reset = () => { setLog([]); setRound(1); };

  const boxLabels = { 1: 'DO NOW', 2: 'SCHEDULE', 3: 'DROP / LATER', 4: 'BATCH' };
  const boxColors = { 1: '#C73E2C', 2: '#3F8A56', 3: '#7E776A', 4: '#E8A93B' };

  return (
    <div style={tc.root}>
      <div style={tc.head}>
        <div style={tc.tag}>★ TEAM EXERCISE · 10 MIN · TABLES OF 3–4</div>
        <h2 style={tc.h2}>The <em style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Triage Court</em>.</h2>
        <p style={tc.lede}>
          Solo placement is the warm-up. <strong>Now defend it.</strong> One student presents one task in 5
          seconds. Table votes a box. If the table disagrees, you have <strong>30 seconds</strong> to
          defend or the table's verdict stands. Brutal, fast, weirdly fun.
        </p>
      </div>

      {phase === 'idle' && (
        <div style={tc.setup}>
          <div style={tc.row}>
            <label style={tc.lbl}>
              <span style={tc.lblTxt}>DEFENDANT (round {round})</span>
              <input
                style={tc.input}
                placeholder="who's up?"
                value={defendant}
                onChange={(e) => setDefendant(e.target.value)}
              />
            </label>
            <label style={tc.lbl}>
              <span style={tc.lblTxt}>TASK ON TRIAL</span>
              <input
                style={tc.input}
                placeholder='e.g. "Reorganize my notes app"'
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </label>
          </div>
          <button onClick={start} disabled={!defendant || !task} style={tc.btnPrimary}>
            ▶ START ROUND {round}
          </button>
          {log.length > 0 && (
            <button onClick={reset} style={tc.btnGhost2}>Clear court log</button>
          )}
        </div>
      )}

      {phase === 'present' && (
        <div style={tc.stage}>
          <div style={tc.stageLbl}>① PRESENT — 5s</div>
          <div style={tc.timer}>{Math.max(0, limits.present - secs)}s</div>
          <p style={tc.stageMsg}><strong>{defendant}</strong>, read the task aloud. No context. No story.</p>
          <p style={tc.stageTask}>"{task}"</p>
        </div>
      )}

      {phase === 'vote' && (
        <div style={tc.stage}>
          <div style={tc.stageLbl}>② TABLE VOTES — hands up</div>
          <p style={tc.stageMsg}>
            <strong>{defendant}</strong>, declare YOUR box first. Then the table votes. (If they match — done.
            If not — 30-second defense.)
          </p>
          <div style={tc.voteGrid}>
            {[1, 2, 4, 3].map(n => (
              <button
                key={n}
                onClick={() => {
                  if (!studentBox) setStudentBox(n);
                  else recordVote(n);
                }}
                style={{
                  ...tc.voteBtn,
                  background: boxColors[n],
                  color: n === 4 ? '#16140F' : '#fff',
                  outline: studentBox === n ? '4px solid #16140F' : 'none',
                  outlineOffset: studentBox === n ? 2 : 0,
                }}
              >
                <div style={tc.voteN}>BOX {n}</div>
                <div style={tc.voteLbl}>{boxLabels[n]}</div>
                {studentBox === n && <div style={tc.voteFlag}>← {defendant}'s pick</div>}
                {!studentBox && <div style={tc.voteHint}>{defendant} clicks first</div>}
                {studentBox && studentBox !== n && <div style={tc.voteHint}>table → click here</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'defend' && (
        <div style={{ ...tc.stage, background: 'var(--terminal-900)', color: 'var(--paper-100)' }}>
          <div style={{ ...tc.stageLbl, color: 'var(--signal-amber)' }}>③ DEFEND — 30s</div>
          <div style={{ ...tc.timer, color: secs > 20 ? 'var(--signal-red)' : 'var(--signal-amber)' }}>
            {Math.max(0, limits.defend - secs)}s
          </div>
          <p style={{ ...tc.stageMsg, color: 'var(--paper-100)' }}>
            <strong>{defendant}</strong> said <strong style={{ color: boxColors[studentBox] }}>BOX {studentBox} · {boxLabels[studentBox]}</strong>.
            &nbsp;The table said <strong style={{ color: boxColors[tableBox] }}>BOX {tableBox} · {boxLabels[tableBox]}</strong>.
          </p>
          <p style={{ ...tc.stageTask, color: 'var(--paper-100)' }}>Defend "{task}" — go.</p>
          <div style={tc.defendActions}>
            <button onClick={() => finalVerdict('student')} style={tc.btnWin}>
              ✓ DEFENDED — student wins
            </button>
            <button onClick={() => finalVerdict('table')} style={tc.btnLose}>
              ✗ TIME UP — table verdict stands
            </button>
          </div>
        </div>
      )}

      {phase === 'verdict' && studentBox === tableBox && (
        <div style={tc.stage}>
          <div style={{ ...tc.stageLbl, color: 'var(--signal-green-text)' }}>✓ AGREED — BOX {studentBox} · {boxLabels[studentBox]}</div>
          <p style={tc.stageMsg}>No defense needed. Logging round and rotating defendant.</p>
          <button onClick={() => finalVerdict('agreed')} style={tc.btnPrimary}>
            ▶ LOG &amp; NEXT DEFENDANT
          </button>
        </div>
      )}

      {/* COURT LOG */}
      {log.length > 0 && (
        <div style={tc.logWrap}>
          <div style={tc.logHead}>
            <span style={tc.logLbl}>COURT LOG · {log.length} {log.length === 1 ? 'verdict' : 'verdicts'}</span>
            <span style={tc.logHint}>review at end of round</span>
          </div>
          <ol style={tc.logList}>
            {log.map((e, i) => (
              <li key={i} style={tc.logItem}>
                <span style={tc.logRound}>R{e.round}</span>
                <span style={tc.logName}>{e.name}</span>
                <span style={tc.logTask}>"{e.task}"</span>
                <span style={tc.logBoxes}>
                  <span style={{ ...tc.logBox, background: boxColors[e.studentBox], color: e.studentBox === 4 ? '#16140F' : '#fff' }}>
                    student · B{e.studentBox}
                  </span>
                  <span style={tc.logVs}>vs.</span>
                  <span style={{ ...tc.logBox, background: boxColors[e.tableBox], color: e.tableBox === 4 ? '#16140F' : '#fff' }}>
                    table · B{e.tableBox}
                  </span>
                </span>
                <span style={{
                  ...tc.logVerdict,
                  color: e.winner === 'agreed' ? 'var(--signal-green-text)' : e.winner === 'student' ? 'var(--signal-blue-text)' : 'var(--crimson)',
                }}>
                  {e.winner === 'agreed' ? '= agreed' : e.winner === 'student' ? '✓ defended' : '✗ overruled'}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div style={tc.protocol}>
        <div style={tc.protLbl}>FACILITATOR PROTOCOL</div>
        <ol style={tc.protList}>
          <li>Tables of 3–4. Pick a defendant order.</li>
          <li>Defendant picks ONE task off their list. 5 seconds to read it. NO context.</li>
          <li>Defendant declares their box first (click). Then table votes (click).</li>
          <li>Match? Logged. Next defendant. <strong>Mismatch?</strong> 30 seconds to defend.</li>
          <li>Defense convinces the table → student wins. Defense fails → table's box stands.</li>
          <li>Rotate. Aim for <strong>2–3 rounds per student</strong>.</li>
          <li>End with: "How many of your verdicts changed your mind?"</li>
        </ol>
      </div>
    </div>
  );
}

function Task({ t, dragId, starred, onStar, onDragStart, onDragEnd, placed, currentBox, onMove }) {
  const dragging = dragId === t.id;
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, t.id)}
      onDragEnd={onDragEnd}
      className="ct-grab"
      style={{
        ...taskSt.card,
        ...(placed ? taskSt.cardPlaced : {}),
        opacity: dragging ? 0.4 : 1,
        borderColor: starred ? 'var(--signal-amber)' : 'var(--paper-300)',
        boxShadow: starred ? '0 0 0 2px rgba(232,169,59,0.3)' : 'var(--shadow-card)',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onStar(t.id); }}
        aria-label={starred ? 'remove "it depends" star' : 'mark as "it depends"'}
        style={{ ...taskSt.star, color: starred ? 'var(--signal-amber-text)' : 'var(--ink-300)' }}
      >★</button>
      <div style={taskSt.body}>
        <div style={taskSt.text}>{t.text}</div>
        <div style={taskSt.hint}>{t.hint}</div>
        {onMove && (
          <label style={taskSt.moveLbl}>
            <span className="sr-only">Move "{t.text}" to box</span>
            <select
              value={currentBox || ''}
              onChange={(e) => onMove(t.id, e.target.value || null)}
              style={taskSt.moveSel}
              aria-label={`Place "${t.text}" in a box (keyboard alternative to drag)`}
            >
              <option value="">Unsorted</option>
              <option value="b1">Box 1 · Do now</option>
              <option value="b2">Box 2 · Schedule</option>
              <option value="b4">Box 4 · Batch / delegate</option>
              <option value="b3">Box 3 · Drop / later</option>
            </select>
          </label>
        )}
      </div>
      <div style={taskSt.grip} aria-hidden="true">⋮⋮</div>
    </div>
  );
}

const tr = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 18px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
  lede: { fontSize: 17, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 760, margin: '0 0 24px' },

  pool: { background: 'var(--paper-100)', border: '2px dashed var(--paper-300)', borderRadius: 6, padding: '12px 14px', marginBottom: 18, transition: 'all .15s' },
  poolHover: { borderColor: 'var(--ink-900)', background: 'var(--paper-50)' },
  poolHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  poolLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  poolHint: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', fontStyle: 'italic' },
  poolList: { display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 60 },
  poolEmpty: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--ink-500)', padding: 16, textAlign: 'center', width: '100%' },

  axisRow: { display: 'grid', gridTemplateColumns: '20px 1fr', gap: 4, marginBottom: 4 },
  axisLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', textAlign: 'center' },

  matrix: { display: 'grid', gridTemplateColumns: '20px 1fr', gap: 4, marginBottom: 14 },
  yAxis: { position: 'relative' },
  yLbl: { position: 'absolute', left: 0, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em', writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap' },
  boxes: { display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8 },
  box: { border: '2px solid var(--paper-300)', borderRadius: 6, padding: '14px 16px', minHeight: 220, transition: 'all .15s' },
  boxHead: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 },
  boxN: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 2, letterSpacing: '0.1em' },
  boxLbl: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, fontStyle: 'italic', color: 'var(--ink-900)' },
  boxSub: { fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-500)', letterSpacing: '0.1em', marginBottom: 8 },
  boxDesc: { fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.5, marginBottom: 12, paddingBottom: 10, borderBottom: '1px dashed var(--paper-300)' },
  boxItems: { display: 'flex', flexDirection: 'column', gap: 5 },
  boxEmpty: { fontFamily: 'var(--font-mono)', fontSize: 11, fontStyle: 'italic', color: 'var(--ink-300)', textAlign: 'center', padding: 10 },

  statusBar: { display: 'flex', alignItems: 'center', gap: 16, padding: '10px 14px', background: 'var(--paper-100)', border: '1px solid var(--paper-200)', borderRadius: 4, marginBottom: 14, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-700)' },
  btnGhost: { background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)', padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, borderRadius: 3, cursor: 'pointer' },
  persist: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--signal-green-text)', fontWeight: 600 },

  discuss: { background: 'var(--terminal-900)', color: 'var(--paper-100)', borderRadius: 4, borderLeft: '4px solid var(--signal-blue)' },
  discussSum: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, padding: '14px 18px', cursor: 'pointer', listStyle: 'none', color: 'var(--paper-100)' },
  discussBody: { padding: '0 18px 16px', fontSize: 14, lineHeight: 1.65 },
};

const taskSt = {
  card: {
    display: 'grid', gridTemplateColumns: '20px 1fr 14px', gap: 8, alignItems: 'start',
    background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 4,
    padding: '8px 10px', maxWidth: 280,
    fontSize: 12.5, lineHeight: 1.35, color: 'var(--ink-900)',
  },
  cardPlaced: { background: 'var(--paper-100)' },
  star: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1, marginTop: 1 },
  body: { minWidth: 0 },
  text: { fontWeight: 600, marginBottom: 2 },
  hint: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', fontStyle: 'italic' },
  grip: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)', userSelect: 'none' },
  moveLbl: { display: 'block', marginTop: 4 },
  moveSel: {
    width: '100%', fontFamily: 'var(--font-mono)', fontSize: 10.5,
    padding: '3px 4px', border: '1px solid var(--paper-300)',
    background: 'var(--paper-50)', color: 'var(--ink-700)', borderRadius: 2,
  },
};

/* Triage Court styles */
const tc = {
  root: {
    marginTop: 32, padding: '24px 26px',
    background: 'var(--paper-100)',
    border: '2px solid var(--ink-900)',
    borderRadius: 6,
    position: 'relative',
  },
  head: { marginBottom: 18 },
  tag: {
    display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700,
    letterSpacing: '0.18em', color: '#16140F', background: 'var(--signal-amber)',
    padding: '4px 10px', borderRadius: 2, marginBottom: 12,
  },
  h2: { fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, lineHeight: 1.0, margin: '0 0 10px', letterSpacing: '-0.02em' },
  lede: { fontSize: 15, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0, maxWidth: 720 },

  setup: { display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' },
  row: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14, width: '100%' },
  lbl: { display: 'flex', flexDirection: 'column', gap: 4 },
  lblTxt: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.12em' },
  input: {
    fontFamily: 'var(--font-body)', fontSize: 15, padding: '8px 12px',
    border: '1.5px solid var(--paper-300)', borderRadius: 3,
    background: 'var(--paper-50)', color: 'var(--ink-900)',
  },

  btnPrimary: {
    background: 'var(--ink-900)', color: 'var(--paper-50)', border: 'none',
    padding: '12px 22px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.12em', borderRadius: 3, cursor: 'pointer',
  },
  btnGhost2: {
    background: 'transparent', color: 'var(--ink-500)', border: '1px solid var(--paper-300)',
    padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600,
    letterSpacing: '0.08em', borderRadius: 3, cursor: 'pointer',
  },

  stage: {
    background: 'var(--paper-50)', border: '2px solid var(--ink-900)', borderRadius: 4,
    padding: '20px 24px', marginBottom: 14, position: 'relative',
  },
  stageLbl: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--crimson)', marginBottom: 12 },
  timer: {
    position: 'absolute', top: 18, right: 22, fontFamily: 'var(--font-mono)',
    fontSize: 36, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1,
  },
  stageMsg: { fontSize: 14, lineHeight: 1.5, color: 'var(--ink-700)', margin: '0 0 8px' },
  stageTask: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 600,
    color: 'var(--ink-900)', margin: '8px 0 0', lineHeight: 1.3,
    paddingTop: 10, borderTop: '1px dashed var(--paper-300)',
  },

  voteGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 },
  voteBtn: {
    border: 'none', borderRadius: 4, padding: '14px 16px',
    cursor: 'pointer', textAlign: 'left',
    transition: 'transform .12s, outline .12s',
    minHeight: 84,
  },
  voteN: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.8 },
  voteLbl: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 700, marginTop: 2, lineHeight: 1 },
  voteFlag: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', marginTop: 6, opacity: 0.9 },
  voteHint: { fontFamily: 'var(--font-mono)', fontSize: 10, fontStyle: 'italic', marginTop: 6, opacity: 0.7 },

  defendActions: { display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' },
  btnWin: {
    background: 'var(--signal-green)', color: '#16140F', border: 'none',
    padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700,
    letterSpacing: '0.1em', borderRadius: 3, cursor: 'pointer',
  },
  btnLose: {
    background: 'var(--signal-red)', color: '#fff', border: 'none',
    padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700,
    letterSpacing: '0.1em', borderRadius: 3, cursor: 'pointer',
  },

  logWrap: {
    background: 'var(--paper-50)', border: '1px solid var(--paper-200)', borderRadius: 4,
    padding: '12px 16px', marginTop: 14,
  },
  logHead: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  logLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '0.12em' },
  logHint: { fontFamily: 'var(--font-mono)', fontSize: 10, fontStyle: 'italic', color: 'var(--ink-500)' },
  logList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 },
  logItem: {
    display: 'grid', gridTemplateColumns: '32px 1fr 2fr auto auto', gap: 10, alignItems: 'center',
    padding: '6px 8px', background: 'var(--paper-100)', borderRadius: 3, fontSize: 12,
  },
  logRound: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-500)' },
  logName: { fontWeight: 700, color: 'var(--ink-900)' },
  logTask: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--ink-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  logBoxes: { display: 'flex', alignItems: 'center', gap: 6 },
  logBox: { fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.05em' },
  logVs: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-500)', fontStyle: 'italic' },
  logVerdict: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' },

  protocol: {
    marginTop: 16, padding: '12px 16px',
    background: 'var(--terminal-900)', color: 'var(--paper-100)',
    borderRadius: 4, borderLeft: '4px solid var(--signal-amber)',
  },
  protLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
  protList: { fontSize: 12.5, lineHeight: 1.6, paddingLeft: 22, margin: 0, color: 'var(--paper-200)' },
};

window.CTSectionTriage = CTSectionTriage;
