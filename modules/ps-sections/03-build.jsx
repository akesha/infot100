// Section 03 — Build (35 min)
// Working timer + a "what I'm working on right now" textarea (auto-saves).
// The timer is the most useful in-class tool — visible, audible-able, resetable.

(function () {
  function PSSectionBuild() {
    const NOTES_KEY = 'ps:03-build:notes';
    const ELAPSED_KEY = 'ps:03-build:elapsed';

    const TARGET_SECONDS = 35 * 60;
    const [notes, setNotes] = React.useState('');
    const [running, setRunning] = React.useState(false);
    const [elapsed, setElapsed] = React.useState(0);

    const intervalRef = React.useRef(null);

    React.useEffect(() => {
      try {
        setNotes(localStorage.getItem(NOTES_KEY) || '');
        const stored = parseInt(localStorage.getItem(ELAPSED_KEY) || '0', 10);
        if (!isNaN(stored) && stored > 0) setElapsed(stored);
      } catch (e) {}
    }, []);

    React.useEffect(() => {
      if (running) {
        intervalRef.current = setInterval(() => {
          setElapsed(prev => {
            const next = prev + 1;
            try { localStorage.setItem(ELAPSED_KEY, String(next)); } catch (e) {}
            return next;
          });
        }, 1000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [running]);

    const onNotes = (e) => {
      const v = e.target.value;
      setNotes(v);
      try { localStorage.setItem(NOTES_KEY, v); } catch (e) {}
    };

    const start = () => setRunning(true);
    const pause = () => setRunning(false);
    const reset = () => {
      if (!window.confirm('Reset the build timer to 35:00? Your notes are kept.')) return;
      setRunning(false);
      setElapsed(0);
      try { localStorage.setItem(ELAPSED_KEY, '0'); } catch (e) {}
    };

    const remaining = Math.max(0, TARGET_SECONDS - elapsed);
    const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
    const ss = String(remaining % 60).padStart(2, '0');
    const overtime = elapsed > TARGET_SECONDS;
    const fivePct = remaining <= 5 * 60 && remaining > 0;
    const twoPct = remaining <= 2 * 60 && remaining > 0;

    return (
      <div style={s.root}>
        <div style={s.kicker}>③ BUILD · 35 MIN · STUDIO MODE</div>
        <h1 style={s.h1}>
          <em style={s.em}>Make</em> a thing.
        </h1>
        <p style={s.lede}>
          The single most-load-bearing block in this lesson. Music on. TAs floating. No lecture
          interruption. Stuck for &gt; 4 min? Raise a hand. <strong>It's OK if it doesn't work — that's data.</strong>
        </p>

        <div style={{ ...s.timer, ...(overtime ? s.timerOver : twoPct ? s.timerWarn : fivePct ? s.timerNotice : {}) }}>
          <div style={s.timerLbl}>{overtime ? 'OVER' : 'REMAINING'}</div>
          <div style={s.timerDigits} aria-live="polite">{overtime ? '+' : ''}{mm}:{ss}</div>
          <div style={s.timerActions}>
            {!running ? (
              <button type="button" style={s.btnGo} onClick={start}>{elapsed === 0 ? 'Start build · 35 min' : 'Resume'}</button>
            ) : (
              <button type="button" style={s.btnGhost} onClick={pause}>Pause</button>
            )}
            <button type="button" style={s.btnGhost} onClick={reset}>Reset</button>
          </div>
        </div>

        <div style={s.box}>
          <label htmlFor="ps-build-notes" style={s.lbl}>WHAT I'M WORKING ON RIGHT NOW · 1 SENTENCE</label>
          <p style={s.sub}>Update this every few minutes. Auto-saves. The point is: when you scroll back to this in W5 Debugging Mindset, you'll know what you were trying to do here today.</p>
          <textarea
            id="ps-build-notes"
            style={s.textarea}
            placeholder="Right now I'm trying to ___ and I'm stuck on ___."
            value={notes}
            onChange={onNotes}
          />
        </div>

        <div style={s.watchfor}>
          <div style={s.watchforLbl}>FOR YOU, NOT FOR THE FACILITATOR</div>
          <strong>If you've been reading docs for &gt; 25 minutes without writing a thing,</strong>
          {' '}you're avoiding shipping. Time-box: 5 more minutes of reading, then put something
          on screen even if it's wrong. Reading without shipping is a form of avoidance.
        </div>
      </div>
    );
  }

  const s = {
    root: { paddingTop: 24 },
    kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
    h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.0 },
    em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },
    lede: { fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', maxWidth: 740, margin: '0 0 22px' },

    timer: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '20px 28px', borderRadius: 6, marginBottom: 22, display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 24, transition: 'background 200ms ease' },
    timerNotice: { background: 'var(--terminal-700)' },
    timerWarn: { background: '#3b2a1a', borderLeft: '4px solid var(--signal-amber)' },
    timerOver: { background: '#3b1d18', borderLeft: '4px solid var(--signal-red)' },
    timerLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em' },
    timerDigits: { fontFamily: 'var(--font-mono)', fontSize: 64, fontWeight: 700, color: 'var(--paper-50)', textAlign: 'center', letterSpacing: '0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' },
    timerActions: { display: 'flex', gap: 8 },
    btnGo: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 16px', background: 'var(--signal-amber)', color: 'var(--ink-900)', border: 0, borderRadius: 3, cursor: 'pointer' },
    btnGhost: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 12px', background: 'transparent', color: 'var(--paper-200)', border: '1px solid var(--paper-300)', borderRadius: 3, cursor: 'pointer' },

    box: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '14px 18px', marginBottom: 18 },
    lbl: { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.15em', marginBottom: 6 },
    sub: { fontSize: 12.5, color: 'var(--ink-500)', margin: '0 0 8px', lineHeight: 1.5 },
    textarea: { width: '100%', minHeight: 70, padding: '10px 12px', font: 'inherit', fontSize: 14, lineHeight: 1.55, color: 'var(--ink-900)', background: 'var(--paper-50)', border: '1px solid var(--paper-300)', borderRadius: 3, resize: 'vertical', boxSizing: 'border-box' },

    watchfor: { background: 'var(--paper-100)', borderTop: '3px solid var(--signal-amber)', padding: '12px 16px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' },
    watchforLbl: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--signal-amber-text)', letterSpacing: '0.18em', marginBottom: 6 },
  };

  window.PSSectionBuild = PSSectionBuild;
})();
