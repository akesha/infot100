/* Async Track — collapsible panel that mirrors an in-class lesson flow for
   students working asynchronously (work conflicts, illness, accommodations,
   missed sessions). Authored once per lesson page; rendered here.

   Usage in a lesson HTML:
     const asyncTrack = [
       { refId: 'rollcall', label: 'Roll call', soloTime: '8 min',
         activity: '...', deliverable: '...', peerLoop: '...', recording: '...' },
       ...
     ];
     <AsyncTrack
       data={asyncTrack}
       lessonKey="spawn-point"
       totalTime="~95 min solo across the week"
       canvasHub="Canvas → Week 1 module"
       intro="Optional opener line of context."
     />

   Open/closed state persists per-lesson in localStorage. The panel is always
   in the DOM (using the [hidden] attribute) so screen readers can find it
   and print stylesheets can show it expanded.
*/
(function () {
  function AsyncTrack(props) {
    const data = props.data || [];
    const lessonKey = props.lessonKey || 'lesson';
    const totalTime = props.totalTime;
    const canvasHub = props.canvasHub;
    const intro = props.intro;

    const storageKey = 'async-track:' + lessonKey + ':open';
    const [open, setOpen] = React.useState(false);
    const panelId = 'async-track-panel-' + lessonKey;

    React.useEffect(() => {
      try {
        const v = window.localStorage.getItem(storageKey);
        if (v === '1') setOpen(true);
      } catch (e) {}
    }, [storageKey]);

    const toggle = () => {
      setOpen(prev => {
        const next = !prev;
        try { window.localStorage.setItem(storageKey, next ? '1' : '0'); } catch (e) {}
        return next;
      });
    };

    return (
      <aside className="async-track" aria-labelledby={'async-track-title-' + lessonKey}>
        <button
          type="button"
          className="async-track-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
        >
          <span className="async-track-badge" aria-hidden="true">Async</span>
          <span>
            <span id={'async-track-title-' + lessonKey} className="async-track-title">
              Working async this week?
            </span>
            <span className="async-track-subtitle">
              {totalTime ? totalTime + ' solo · ' : ''}
              mirror of the in-class flow with peer-feedback paths in Canvas
            </span>
          </span>
          <span className="async-track-caret" aria-hidden="true">▶</span>
        </button>

        <div className="async-track-panel" id={panelId} hidden={!open}>
          {intro && <p className="async-track-intro">{intro}</p>}

          <ol className="async-track-list">
            {data.map((step, i) => (
              <li className="async-track-step" key={step.refId || i}>
                <span className="async-track-step-num" aria-hidden="true">
                  {String(i).padStart(2, '0')}
                </span>
                <div>
                  <div className="async-track-step-head">
                    <span className="async-track-step-label">{step.label}</span>
                    {step.soloTime && (
                      <span className="async-track-step-time">{step.soloTime}</span>
                    )}
                  </div>
                  <div className="async-track-step-body">{step.activity}</div>
                  {(step.deliverable || step.peerLoop || step.recording) && (
                    <dl className="async-track-step-meta">
                      {step.deliverable && (
                        <React.Fragment>
                          <dt>Deliverable</dt>
                          <dd>{step.deliverable}</dd>
                        </React.Fragment>
                      )}
                      {step.peerLoop && (
                        <React.Fragment>
                          <dt>Peer loop</dt>
                          <dd>{step.peerLoop}</dd>
                        </React.Fragment>
                      )}
                      {step.recording && (
                        <React.Fragment>
                          <dt>Recording</dt>
                          <dd>{step.recording}</dd>
                        </React.Fragment>
                      )}
                    </dl>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {canvasHub && (
            <p className="async-track-foot">
              <strong>Most posts land in:</strong> {canvasHub}.
              {' '}If a synchronous deadline doesn't fit your week, message the
              facilitator before the module opens — accommodations are routine,
              not exceptional.
            </p>
          )}
        </div>
      </aside>
    );
  }

  window.AsyncTrack = AsyncTrack;
})();
