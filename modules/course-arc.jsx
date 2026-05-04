/* CourseArc — connective tissue. Renders on every lesson page. Shows the
   8-week sweep, marks current week, links to siblings (built or skeleton).

   The course map is defined here (single source of truth). Per-lesson, the
   only prop required is `currentKey`.

   Usage:
     <window.CourseArc currentKey="spawn-point" />
*/
(function () {
  const COURSE_MAP = [
    { num: 1, key: 'spawn-point',       title: 'Spawn Point',          subtitle: 'Toolbox + prototype',         status: 'built',    file: 'spawn-point.html' },
    { num: 2, key: 'compute-time',      title: 'Compute Time',         subtitle: 'Audit + re-budget',           status: 'built',    file: 'compute-time.html' },
    { num: 3, key: 'setup-quest',       title: 'Setup Quest',          subtitle: 'Second brain + dev env',      status: 'built',    file: 'setup-quest.html' },
    { num: 4, key: 'project-seed-v01',  title: 'Project Seed v0.1',    subtitle: 'First real ship',             status: 'built',    file: 'project-seed-v01.html' },
    { num: 5, key: 'debugging-mindset', title: 'Debugging Mindset',    subtitle: 'Bugs as information',         status: 'built',    file: 'debugging-mindset.html' },
    { num: 6, key: 'ai-copilot-camp',   title: 'AI Co-Pilot Camp',     subtitle: 'Interrogate the tool',        status: 'built',    file: 'ai-copilot-camp.html' },
    { num: 7, key: 'honest-start',      title: 'The Honest Start',     subtitle: 'Avoidance → motion',          status: 'built',    file: 'honest-start.html' },
    { num: 8, key: 'final-demo',        title: 'Final Demo + Reckoning', subtitle: 'Ship + look back',          status: 'built',    file: 'final-demo.html' },
  ];

  function CourseArc(props) {
    const currentKey = props.currentKey || '';
    const current = COURSE_MAP.find(w => w.key === currentKey);
    const currentLabel = current
      ? 'You are here · WK ' + String(current.num).padStart(2, '0') + ' · ' + current.title
      : '';

    return (
      <aside className="course-arc" aria-label="8-week course arc">
        <div className="course-arc-head">
          <span className="course-arc-badge" aria-hidden="true">8-WEEK ARC</span>
          <span className="course-arc-title">INFO-T 100 · Luddy Study Skills</span>
          <a href="homework.html" className="course-arc-homework">📋 Homework + calendar</a>
          {currentLabel && <span className="course-arc-here">{currentLabel}</span>}
        </div>
        <nav className="course-arc-strip" aria-label="Jump to another week">
          {COURSE_MAP.map(w => {
            const isCurrent = w.key === currentKey;
            const cls = 'course-arc-week'
              + (isCurrent ? ' course-arc-week--current' : '')
              + (w.status === 'skeleton' ? ' course-arc-week--skeleton' : '');
            return (
              <a
                key={w.key}
                href={w.file}
                className={cls}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={
                  'Week ' + w.num + ': ' + w.title
                  + (w.status === 'skeleton' ? ' (skeleton)' : '')
                  + (isCurrent ? ' — current page' : '')
                }
              >
                <span className="course-arc-week-num">W{String(w.num).padStart(2, '0')}</span>
                <span className="course-arc-week-title">{w.title}</span>
                <span className="course-arc-week-sub">{w.subtitle}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    );
  }

  window.CourseArc = CourseArc;
  window.COURSE_MAP = COURSE_MAP;
})();
