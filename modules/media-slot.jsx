/* MediaSlot + ExportWork — modality scaffolds rendered on every interactive
   lesson page.

   MediaSlot:
     - When `type: 'video'` and `src` is set, embeds an iframe (YouTube,
       Vimeo, Panopto, Kaltura, etc. — any URL the platform allows in an
       iframe).
     - When `type: 'placeholder'` or no src is set, shows a "Recording in
       progress" placeholder so the slot reads correctly even before the
       video exists.
     - Always renders a collapsible transcript when `transcript` is provided.
       The transcript IS the async fallback referenced in async-track copy
       ("read the 1-page text version").

   ExportWork:
     - Single button. Walks localStorage for keys matching this lesson and
       writes them as a single .txt file the student downloads. Mirrors the
       "Copy for Canvas" pattern but covers everything (self-checks +
       reflection + any in-page widget data) instead of just the journal.

   Usage in a lesson HTML:
     const media = {
       cold: {
         type: 'placeholder',                      // or 'video'
         caption: 'Cold open · Week 14 student looks back',
         src: 'https://...',                       // required for type:'video'
         transcript: 'Skip ahead 14 weeks. …'      // multi-paragraph string
       },
     };

     <window.MediaSlot data={media[s.id]} sectionId={s.id} lessonKey="spawn-point" />

     <window.ExportWork lessonKey="spawn-point" lessonTitle="Week 1 · Spawn Point" />
*/
(function () {
  function MediaSlot(props) {
    const data = props.data;
    if (!data) return null;
    const lessonKey = props.lessonKey || 'lesson';
    const sectionId = props.sectionId || 'section';
    const transcriptId = 'transcript-' + lessonKey + '-' + sectionId;

    const [open, setOpen] = React.useState(false);

    const isVideo = data.type === 'video' && !!data.src;
    const variant = isVideo ? 'media-slot--video' : 'media-slot--placeholder';

    return (
      <aside className={'media-slot ' + variant} aria-label={data.caption || 'Lesson media'}>
        <div className="media-slot-head">
          <span className="media-slot-badge" aria-hidden="true">
            {isVideo ? 'Watch' : 'Coming soon'}
          </span>
          {data.caption && <span className="media-slot-caption">{data.caption}</span>}
        </div>

        {isVideo ? (
          <div className="media-slot-frame">
            <iframe
              src={data.src}
              title={data.caption || 'Lesson recording'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="media-slot-placeholder">
            <p className="media-slot-placeholder-title">Recording in progress</p>
            <p className="media-slot-placeholder-sub">
              We're producing the {data.label || 'video'} for this section. The full transcript is below — read it now and the recording will land in the same slot when it's ready.
            </p>
          </div>
        )}

        {data.transcript && (
          <React.Fragment>
            <button
              type="button"
              className="media-slot-transcript-toggle"
              aria-expanded={open}
              aria-controls={transcriptId}
              onClick={() => setOpen(v => !v)}
            >
              <span aria-hidden="true">📄</span>
              <span>{open ? 'Hide transcript' : 'Show transcript'}</span>
              <span className="media-slot-transcript-caret" aria-hidden="true">▶</span>
            </button>
            <div
              id={transcriptId}
              className="media-slot-transcript"
              hidden={!open}
            >
              {String(data.transcript).split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </React.Fragment>
        )}
      </aside>
    );
  }

  function ExportWork(props) {
    const lessonKey = props.lessonKey || 'lesson';
    const lessonTitle = props.lessonTitle || lessonKey;

    const [state, setState] = React.useState('idle'); // idle | exported | empty

    const collect = () => {
      const out = {
        selfChecks: {},
        reflection: null,
        other: {},
      };
      try {
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (!k) continue;
          if (k === 'reflection:' + lessonKey) {
            try { out.reflection = JSON.parse(window.localStorage.getItem(k)); } catch (e) {}
          } else if (k.indexOf('self-check:' + lessonKey + ':') === 0) {
            const parts = k.split(':');
            const sid = parts[2];
            const isAnswer = parts[3] === 'answer';
            if (!out.selfChecks[sid]) out.selfChecks[sid] = {};
            if (isAnswer) out.selfChecks[sid].answer = window.localStorage.getItem(k);
            else out.selfChecks[sid].marked = window.localStorage.getItem(k) === '1';
          } else if (k.indexOf(lessonKey) >= 0) {
            out.other[k] = window.localStorage.getItem(k);
          }
        }
      } catch (e) {}
      return out;
    };

    const compose = (data) => {
      const lines = [];
      lines.push('# ' + lessonTitle);
      lines.push('Exported ' + new Date().toLocaleString());
      lines.push('');

      const sectionIds = Object.keys(data.selfChecks);
      if (sectionIds.length) {
        lines.push('## Self-checks');
        lines.push('');
        sectionIds.forEach(sid => {
          const sc = data.selfChecks[sid];
          lines.push('### ' + sid + (sc.marked ? ' ✓' : ''));
          if (sc.answer) {
            lines.push(sc.answer.trim());
          } else {
            lines.push('(no answer recorded)');
          }
          lines.push('');
        });
      }

      if (Array.isArray(data.reflection) && data.reflection.some(s => s && s.trim())) {
        lines.push('## Reflection');
        lines.push('');
        data.reflection.forEach((ans, i) => {
          lines.push('Prompt ' + (i + 1) + ':');
          lines.push((ans || '').trim() || '(no answer)');
          lines.push('');
        });
      }

      const otherKeys = Object.keys(data.other);
      if (otherKeys.length) {
        lines.push('## Other saved work');
        lines.push('');
        otherKeys.forEach(k => {
          lines.push('### ' + k);
          lines.push(data.other[k]);
          lines.push('');
        });
      }

      return lines.join('\n');
    };

    const onExport = () => {
      const data = collect();
      const hasContent = Object.keys(data.selfChecks).length > 0
        || (data.reflection && data.reflection.some(s => s && s.trim()))
        || Object.keys(data.other).length > 0;
      if (!hasContent) {
        setState('empty');
        setTimeout(() => setState('idle'), 2400);
        return;
      }
      const text = compose(data);
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = lessonKey + '-work-' + new Date().toISOString().slice(0, 10) + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setState('exported');
      setTimeout(() => setState('idle'), 2400);
    };

    return (
      <button
        type="button"
        className="self-check-btn self-check-btn--ghost"
        onClick={onExport}
      >
        {state === 'exported' ? '✓ Exported' : state === 'empty' ? 'Nothing to export yet' : 'Export your work (.txt)'}
      </button>
    );
  }

  window.MediaSlot = MediaSlot;
  window.ExportWork = ExportWork;
})();
