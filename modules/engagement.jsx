/* Engagement scaffolds — two components used across every interactive lesson:
   1. SelfCheck: one retrieval question per in-class section, with optional
      hint, optional model answer, and "I've got this" persistence.
   2. ReflectionJournal: a single per-lesson set of prompts that auto-save
      to localStorage and copy to clipboard for Canvas submission.

   Usage in a lesson HTML:
     const engagement = {
       selfChecks: {
         rollcall: {
           question: 'Name two capabilities you want to grow this semester.',
           hint: 'Think about what you can\'t do today that a Week-14 you should be able to.',
           answer: 'Any two from the Capability Map count — there\'s no single right answer.'
         },
         // ... one entry per in-class section id
       },
       reflection: {
         intro: 'Three short prompts. Auto-saves as you type. Copy to Canvas when done.',
         prompts: [
           'What was the single most useful thing from this lesson?',
           'Where did you get stuck, and what would unstick you?',
           'What will you do differently next week?',
         ],
       },
     };

     <window.SelfCheck
       data={engagement.selfChecks[s.id]}
       lessonKey="spawn-point"
       sectionId={s.id}
     />
     <window.ReflectionJournal
       data={engagement.reflection}
       lessonKey="spawn-point"
     />
*/
(function () {
  function SelfCheck(props) {
    const data = props.data;
    if (!data || !data.question) return null;

    const lessonKey = props.lessonKey || 'lesson';
    const sectionId = props.sectionId || 'section';
    const storageKey = 'self-check:' + lessonKey + ':' + sectionId;
    const answerKey = storageKey + ':answer';

    const [answer, setAnswer] = React.useState('');
    const [revealed, setRevealed] = React.useState(false);
    const [marked, setMarked] = React.useState(false);

    React.useEffect(() => {
      try {
        const saved = window.localStorage.getItem(answerKey);
        if (saved) setAnswer(saved);
        const m = window.localStorage.getItem(storageKey);
        if (m === '1') setMarked(true);
      } catch (e) {}
    }, [answerKey, storageKey]);

    const onChange = (e) => {
      const v = e.target.value;
      setAnswer(v);
      try { window.localStorage.setItem(answerKey, v); } catch (e) {}
    };

    const toggleMarked = () => {
      const next = !marked;
      setMarked(next);
      try { window.localStorage.setItem(storageKey, next ? '1' : '0'); } catch (e) {}
    };

    return (
      <aside className="self-check" data-answered={marked}>
        <div className="self-check-head">
          <span className="self-check-badge" aria-hidden="true">
            {marked ? '✓ Got it' : 'Self-check'}
          </span>
          <span className="self-check-prompt-label">Before you move on</span>
        </div>
        <p className="self-check-question">{data.question}</p>
        {data.hint && (
          <div className="self-check-hint">
            <strong>Hint:</strong> {data.hint}
          </div>
        )}
        <label className="sr-only" htmlFor={'sc-' + lessonKey + '-' + sectionId}>
          Your answer
        </label>
        <textarea
          id={'sc-' + lessonKey + '-' + sectionId}
          className="self-check-input"
          placeholder="Type your answer (private — saves to your browser)"
          value={answer}
          onChange={onChange}
        />
        <div className="self-check-actions">
          <button
            type="button"
            className="self-check-btn"
            onClick={toggleMarked}
            aria-pressed={marked}
          >
            {marked ? 'Unmark' : 'I’ve got this'}
          </button>
          {data.answer && (
            <button
              type="button"
              className="self-check-btn self-check-btn--ghost"
              onClick={() => setRevealed(v => !v)}
              aria-expanded={revealed}
            >
              {revealed ? 'Hide model answer' : 'Show model answer'}
            </button>
          )}
        </div>
        {revealed && data.answer && (
          <div className="self-check-answer">
            <strong>Model answer:</strong> {data.answer}
          </div>
        )}
      </aside>
    );
  }

  function ReflectionJournal(props) {
    const data = props.data;
    if (!data || !Array.isArray(data.prompts) || !data.prompts.length) return null;

    const lessonKey = props.lessonKey || 'lesson';
    const storageKey = 'reflection:' + lessonKey;

    const [answers, setAnswers] = React.useState(() => data.prompts.map(() => ''));
    const [savedAt, setSavedAt] = React.useState(null);
    const [copyState, setCopyState] = React.useState('idle');

    React.useEffect(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setAnswers(data.prompts.map((_, i) => parsed[i] || ''));
          }
        }
      } catch (e) {}
    }, [storageKey]);

    const onChange = (i) => (e) => {
      const v = e.target.value;
      setAnswers(prev => {
        const next = prev.slice();
        next[i] = v;
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
          setSavedAt(new Date());
        } catch (e) {}
        return next;
      });
    };

    const composeText = () => {
      return data.prompts
        .map((p, i) => p + '\n' + (answers[i] || '').trim())
        .join('\n\n');
    };

    const onCopy = async () => {
      const text = composeText();
      try {
        await navigator.clipboard.writeText(text);
        setCopyState('copied');
        setTimeout(() => setCopyState('idle'), 2200);
      } catch (e) {
        setCopyState('failed');
        setTimeout(() => setCopyState('idle'), 2200);
      }
    };

    const onClear = () => {
      if (!window.confirm('Clear your reflection journal for this lesson? This cannot be undone.')) return;
      setAnswers(data.prompts.map(() => ''));
      try { window.localStorage.removeItem(storageKey); } catch (e) {}
      setSavedAt(null);
    };

    const fmt = (d) => {
      if (!d) return '';
      const hh = d.getHours();
      const mm = String(d.getMinutes()).padStart(2, '0');
      return 'saved ' + hh + ':' + mm;
    };

    return (
      <section className="reflection-journal" aria-labelledby={'reflection-title-' + lessonKey}>
        <div className="reflection-journal-head">
          <span className="reflection-journal-badge" aria-hidden="true">Reflect</span>
          <h2 id={'reflection-title-' + lessonKey} className="reflection-journal-title" style={{ margin: 0 }}>
            {data.title || 'Lesson reflection'}
          </h2>
          {savedAt && (
            <span className="reflection-journal-saveinfo" aria-live="polite">{fmt(savedAt)}</span>
          )}
        </div>
        {data.intro && <p className="reflection-journal-intro">{data.intro}</p>}

        {data.prompts.map((prompt, i) => (
          <div className="reflection-journal-prompt" key={i}>
            <label className="reflection-journal-prompt-label" htmlFor={'reflection-' + lessonKey + '-' + i}>
              {prompt}
            </label>
            <textarea
              id={'reflection-' + lessonKey + '-' + i}
              className="reflection-journal-input"
              value={answers[i]}
              onChange={onChange(i)}
              placeholder="Type here — auto-saves to your browser."
            />
          </div>
        ))}

        <div className="reflection-journal-actions">
          <button type="button" className="self-check-btn" onClick={onCopy}>
            {copyState === 'copied' ? '✓ Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy for Canvas'}
          </button>
          <button type="button" className="self-check-btn self-check-btn--ghost" onClick={onClear}>
            Clear journal
          </button>
          {props.children}
          {copyState === 'copied' && (
            <span className="reflection-journal-status" aria-live="polite">Paste it into the Canvas reflection assignment.</span>
          )}
        </div>
      </section>
    );
  }

  window.SelfCheck = SelfCheck;
  window.ReflectionJournal = ReflectionJournal;
})();
