// Section 06 — Take-home + closer (4 min)

function SPSectionTakeHome() {
  return (
    <div style={th.root}>
      <div style={th.kicker}>⑥ TAKE-HOME · 4 MIN · BEFORE WEEK 2</div>
      <h1 style={th.h1}>
        Three things by <em style={th.em}>Sunday night</em>.
      </h1>

      <ol style={th.list}>
        <li style={th.item}>
          <div style={th.itemHead}>
            <span style={th.itemN}>01</span>
            <span style={th.itemTitle}>Install the software</span>
          </div>
          <div style={th.itemBody}>
            <ul style={th.subList}>
              <li>Free <strong>Tinkercad</strong> account (tinkercad.com)</li>
              <li>Free <strong>Silhouette Studio</strong> download (silhouetteamerica.com/software)</li>
              <li>Activate <strong>Adobe Suite</strong> with your IU SSO (uits.iu.edu/adobe)</li>
              <li>Bookmark <strong>The Noun Project</strong> for icons (thenounproject.com)</li>
            </ul>
          </div>
        </li>

        <li style={th.item}>
          <div style={th.itemHead}>
            <span style={th.itemN}>02</span>
            <span style={th.itemTitle}>Book one piece of equipment</span>
          </div>
          <div style={th.itemBody}>
            Go to <strong>iub.libcal.com/equipment?lid=8812</strong>. Book a 30-minute slot for ONE
            tool from your "must-have" list — even just to look at it in person. The reservation IS
            the deliverable. Cancel later if you need to.
          </div>
        </li>

        <li style={th.item}>
          <div style={th.itemHead}>
            <span style={th.itemN}>03</span>
            <span style={th.itemTitle}>Photograph your prototype + post the reflection</span>
          </div>
          <div style={th.itemBody}>
            Three lines from §4: what worked, what broke, what's next. Post to the Canvas wall (or
            email if you missed class). Photo of the cardboard included.
          </div>
        </li>
      </ol>

      <div style={th.bigQ}>
        <div style={th.bigQLbl}>WALK OUT WITH THIS QUESTION</div>
        <div style={th.bigQTxt}>
          "Which capability do I need to learn first — and which one am I avoiding because it
          looks scary?"
        </div>
      </div>

      <p style={th.outro}>
        Welcome to Luddy. The toolbox is open. You know what the verbs are. By Friday you'll have
        used at least one. By Week 14, you'll have shipped something nobody else has ever made.
      </p>
    </div>
  );
}

const th = {
  root: { paddingTop: 24 },
  kicker: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--crimson)', letterSpacing: '0.18em', marginBottom: 16 },
  h1: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 22px', lineHeight: 1.0 },
  em: { fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--crimson)' },

  list: { listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 12 },
  item: { background: 'var(--paper-100)', border: '1.5px solid var(--paper-300)', borderRadius: 6, padding: '16px 20px' },
  itemHead: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 },
  itemN: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.15em' },
  itemTitle: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.1 },
  itemBody: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-700)' },
  subList: { paddingLeft: 22, margin: 0, lineHeight: 1.7 },

  bigQ: { background: 'var(--terminal-900)', color: 'var(--paper-100)', padding: '18px 22px', borderRadius: 4, borderLeft: '4px solid var(--signal-amber)', marginBottom: 18 },
  bigQLbl: { fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--signal-amber)', letterSpacing: '0.18em', marginBottom: 8 },
  bigQTxt: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.35, color: 'var(--paper-100)' },

  outro: { fontSize: 15, lineHeight: 1.6, color: 'var(--ink-700)', fontStyle: 'italic', maxWidth: 700, margin: 0 },
};

window.SPSectionTakeHome = SPSectionTakeHome;
