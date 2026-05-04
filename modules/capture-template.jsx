/* CaptureTemplate — markdown snippet rendered at the bottom of each built
   lesson. Students click "Copy template" and paste into their Obsidian vault.
   Threads the externalize-knowledge habit (Big Idea #4) through every week
   without making note-taking its own week.

   Usage in a lesson HTML:
     const captureTemplate = {
       title: 'Spawn Point capture',
       target: 'Obsidian → Weeks/W01-spawn-point.md',
       intro: 'Drop this into your vault. Fill in as you go — the headings already match the lesson sections.',
       markdown: '---\\n…',
     };

     <window.CaptureTemplate data={captureTemplate} />
*/
(function () {
  function CaptureTemplate(props) {
    const data = props.data;
    if (!data || !data.markdown) return null;

    const [copyState, setCopyState] = React.useState('idle');

    const onCopy = async () => {
      try {
        await navigator.clipboard.writeText(data.markdown);
        setCopyState('copied');
        setTimeout(() => setCopyState('idle'), 2400);
      } catch (e) {
        setCopyState('failed');
        setTimeout(() => setCopyState('idle'), 2400);
      }
    };

    const onDownload = () => {
      const filename = (data.target || 'capture-template')
        .split('/').pop()
        .replace(/[^a-z0-9.-]+/gi, '-');
      const blob = new Blob([data.markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.endsWith('.md') ? filename : filename + '.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    return (
      <aside className="capture-template" aria-labelledby="capture-template-title">
        <div className="capture-template-head">
          <span className="capture-template-badge" aria-hidden="true">Capture · Obsidian</span>
          <span id="capture-template-title" className="capture-template-title">
            {data.title || 'Lesson capture template'}
          </span>
          {data.target && (
            <span className="capture-template-target">→ {data.target}</span>
          )}
        </div>
        {data.intro && <p className="capture-template-intro">{data.intro}</p>}
        <pre className="capture-template-pre" tabIndex={0}>{data.markdown}</pre>
        <div className="capture-template-actions">
          <button type="button" className="capture-template-btn" onClick={onCopy}>
            {copyState === 'copied' ? '✓ Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy template'}
          </button>
          <button type="button" className="capture-template-btn" onClick={onDownload}>
            Download .md
          </button>
          {copyState === 'copied' && (
            <span className="capture-template-status" aria-live="polite">Paste into your Obsidian vault.</span>
          )}
        </div>
      </aside>
    );
  }

  window.CaptureTemplate = CaptureTemplate;
})();
