/* LessonSkeleton — renders a planned-but-not-yet-built lesson page.
   Used by the unbuilt weeks (W3 Setup Quest, W4 Project Seed v0.1, W8 Final
   Demo + Reckoning). The shape is the lesson plan; content slots are the
   "what to build next" handoff for the build team.

   Usage in a skeleton HTML:
     const data = {
       anchorQuestion: 'Can I run code AND keep my own notes?',
       intro: 'Optional 1–2 sentence framing.',
       bigIdeas: [
         { num: 4, statement: 'Knowledge worth keeping must be externalized', how: '…' },
       ],
       engagesFrom: [
         { week: 'WK 02', what: '168-hour audit', why: 'You budgeted hours for "Setup". Today you spend them.' },
       ],
       setsUpFor: [
         { week: 'WK 04', what: 'Project Seed v0.1 needs a working repo', why: 'Without git + runtime, Week 4 stalls.' },
       ],
       plannedSections: [
         { num: '00', label: 'Cold open · why a second brain', time: '8 min', intent: '…' },
       ],
       plannedDeliverables: [
         'Working dev environment …',
       ],
       authorNotes: [
         'Decide between PARA, Zettelkasten-lite, or custom Obsidian structure.',
       ],
     };

     <window.LessonSkeleton data={data} />
*/
(function () {
  function LessonSkeleton(props) {
    const data = props.data || {};

    return (
      <div>
        <aside className="skeleton-banner" aria-label="Lesson skeleton notice">
          <div className="skeleton-banner-head">
            <span className="skeleton-banner-badge" aria-hidden="true">Skeleton</span>
            <span className="skeleton-banner-title">Planned, not yet built</span>
          </div>
          <p className="skeleton-banner-body">
            <strong>This page is the lesson plan, not the lesson itself.</strong>
            {' '}The shape below — Big Ideas hit, what it engages, what it sets up, the section flow, deliverables — is locked. The interactive content (sections, slides, facilitator guide, rubric) is the next build.
          </p>
        </aside>

        {data.anchorQuestion && (
          <div className="skeleton-anchor">
            <p className="skeleton-anchor-label">Anchor question</p>
            <p className="skeleton-anchor-question">{data.anchorQuestion}</p>
          </div>
        )}

        {Array.isArray(data.bigIdeas) && data.bigIdeas.length > 0 && (
          <section className="skeleton-section">
            <div className="skeleton-section-head">
              <span className="skeleton-section-num">01</span>
              <span className="skeleton-section-title">Big Ideas this lesson advances</span>
            </div>
            {data.bigIdeas.map(b => (
              <div className="skeleton-bigidea" key={b.num}>
                <div className="skeleton-bigidea-num" aria-hidden="true">#{b.num}</div>
                <div>
                  <p className="skeleton-bigidea-statement">{b.statement}</p>
                  <p className="skeleton-bigidea-how">{b.how}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {(Array.isArray(data.engagesFrom) || Array.isArray(data.setsUpFor)) && (
          <section className="skeleton-section">
            <div className="skeleton-section-head">
              <span className="skeleton-section-num">02</span>
              <span className="skeleton-section-title">Connective tissue</span>
            </div>
            <div className="skeleton-bridge">
              {Array.isArray(data.engagesFrom) && (
                <div className="skeleton-bridge-col skeleton-bridge-col--up">
                  <p className="skeleton-bridge-head">← Engages from earlier weeks</p>
                  <ul className="skeleton-bridge-list">
                    {data.engagesFrom.map((e, i) => (
                      <li className="skeleton-bridge-item" key={i}>
                        <span className="skeleton-bridge-week">{e.week}</span>
                        <span className="skeleton-bridge-what">{e.what}</span>
                        <span className="skeleton-bridge-why">{e.why}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(data.setsUpFor) && (
                <div className="skeleton-bridge-col skeleton-bridge-col--down">
                  <p className="skeleton-bridge-head">→ Sets up for later weeks</p>
                  <ul className="skeleton-bridge-list">
                    {data.setsUpFor.map((s, i) => (
                      <li className="skeleton-bridge-item" key={i}>
                        <span className="skeleton-bridge-week">{s.week}</span>
                        <span className="skeleton-bridge-what">{s.what}</span>
                        <span className="skeleton-bridge-why">{s.why}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {Array.isArray(data.plannedSections) && data.plannedSections.length > 0 && (
          <section className="skeleton-section">
            <div className="skeleton-section-head">
              <span className="skeleton-section-num">03</span>
              <span className="skeleton-section-title">Planned section flow</span>
            </div>
            <ol className="skeleton-flow">
              {data.plannedSections.map((s, i) => (
                <li className="skeleton-flow-item" key={i}>
                  <span className="skeleton-flow-num">{s.num}</span>
                  <span className="skeleton-flow-body">
                    <span className="skeleton-flow-label">{s.label}</span>
                    <span className="skeleton-flow-intent">{s.intent}</span>
                  </span>
                  <span className="skeleton-flow-time">{s.time}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {Array.isArray(data.plannedDeliverables) && data.plannedDeliverables.length > 0 && (
          <section className="skeleton-section">
            <div className="skeleton-section-head">
              <span className="skeleton-section-num">04</span>
              <span className="skeleton-section-title">Planned deliverables</span>
            </div>
            <ul className="skeleton-list">
              {data.plannedDeliverables.map((d, i) => (
                <li className="skeleton-list-item" key={i}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        {Array.isArray(data.authorNotes) && data.authorNotes.length > 0 && (
          <aside className="skeleton-author-notes" aria-label="Build-team notes">
            <p className="skeleton-author-notes-head">Build notes · open decisions</p>
            <ul className="skeleton-author-notes-list">
              {data.authorNotes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    );
  }

  window.LessonSkeleton = LessonSkeleton;
})();
