# CSCI-Y100 · Course Redesign

Static site containing all course-redesign artifacts for CSCI-Y100 (Luddy Study Skills): lesson modules, slide decks, facilitator guides, TILT rubrics, and meta-design documents (Big Ideas, Personas, Pacing Guide, Learner Roles map).

## What's in here

### The 8-week course map

| Week | Module | Anchor question | Status |
|---|---|---|---|
| 01 | **Spawn Point** | What can the toolbox actually *do*? | built |
| 02 | **Compute Time** | Where do my hours actually go? | built |
| 03 | **Setup Quest · Second Brain** | Can I run code AND keep my own notes? | built |
| 04 | **Project Seed v0.1** | Can I ship — and document — a real thing? | built |
| 05 | **The Debugging Mindset** | Are bugs information or verdicts? | built |
| 06 | **AI Co-Pilot Camp** | Is AI an oracle or a collaborator? | built |
| 07 | **The Honest Start** | What's underneath my avoidance? | built |
| 08 | **Final Demo + Reckoning** | Did I ship — and what does my vault show? | built |

All eight lessons ship as four artifacts: a student-facing **lesson page**, an in-class **slide deck**, a **facilitator guide**, and a **TILT rubric**.

### One-page homework hub

`modules/homework.html` lists every deliverable across all 8 weeks on a single page:

- **Set your course start date** at the top — every due date recomputes
- **Click checkboxes** to mark items done (saves to localStorage, per browser)
- **Print task list** generates a clean printable summary
- **Download .ics calendar** drops every deadline into Google Cal / Apple Cal / Outlook with **native 1-day-before and 2-hour reminders** that fire from your OS — no need to keep this tab open

Linked from the Course Arc strip (📋 button in the upper-right of every lesson page).

### Threads that run through every week

- **Async Track** — every lesson has an asynchronous mirror of its in-class flow.
- **Engagement scaffolds** — self-checks per section + a per-lesson reflection journal that auto-saves to localStorage.
- **Modality** — collapsible transcripts (always on), embedded video slots (when recordings are ready), `Print worksheet` button, `Export your work (.txt)` button.
- **Course Arc** — a connective-tissue strip on every lesson page showing the 8-week sweep, marking the current week, and linking to siblings.
- **Capture Template** — an Obsidian-ready markdown snippet at the bottom of each built lesson. Threads Big Idea #4 (externalize) through the whole course without making note-taking its own week.
- **IU library thread** — installed as part of W3 Setup Quest, audited in W6 (citation-check self-check), required source in W4 + W8.

### Course-level redesign artifacts
- `modules/csci-y100-big-ideas-and-personas.html` — 5 Big Ideas + 3 personas (aspirational / median / D-F-W)
- `modules/spawn-point-pacing-guide.html` — Weeks 1–4 pacing guide
- `modules/spawn-point-learner-roles.html` — Serafini learner-roles map for Unit 1

### Index / explorations
- `index.html` — pannable design canvas with all artifacts laid out as cards
- `artboards/` — JSX components powering the index (pitch board, quest map, built-modules grid, etc.)

## Deploying to GitHub Pages

1. **Create a repo** on GitHub (public or private — Pages works on both with a paid plan; public is free).
2. **Push this folder** to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — CSCI-Y100 redesign"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   git push -u origin main
   ```
3. **In the repo on GitHub:** Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, Folder: `/ (root)` → Save.
4. Wait ~60 seconds. GitHub will give you a URL like `https://YOUR-USERNAME.github.io/REPO-NAME/`.

That URL is your live site. The `index.html` is the homepage; everything else is reachable from it or by direct path (e.g. `…/modules/spawn-point.html`).

### Why `.nojekyll` is in here
GitHub Pages runs Jekyll by default and ignores files/folders starting with `_`. The empty `.nojekyll` file disables that, so all files serve as-is. Don't delete it.

## Linking from Canvas

For each lesson, add an **External URL** module item in Canvas pointing at the GitHub Pages URL for that lesson. Example:

- Module: "Week 1 — Spawn Point"
- Item type: External URL
- URL: `https://YOUR-USERNAME.github.io/REPO-NAME/modules/spawn-point.html`
- Load in new tab: yes (recommended — Canvas's iframe sandbox can break interactive prototypes)

For static handouts (rubrics, pacing guide, etc.), use the **Print / Save PDF** button at the top of each page to generate a PDF, then upload to Canvas Files and embed in Pages normally.

## Local preview

Open any `.html` file directly in a browser — most pages work over `file://`. The index canvas needs a local server because of CORS:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000

# Or with Node
npx serve .
```

## Async Track pattern

Every interactive lesson page renders an **Async Track** panel at the top of `<main>`. It's a collapsible mirror of the in-class flow with solo time estimates, deliverable destinations in Canvas, and async peer-feedback paths — the implementation of the "async parity for every sync event" Big Idea.

### How it's wired

Three things per lesson page:

1. **Load the component** (after the section JSX scripts):
   ```html
   <script type="text/babel" src="async-track.jsx"></script>
   ```
2. **Author an `asyncTrack` array** alongside the existing `sections` array, with one object per in-class section:
   ```js
   const asyncTrack = [
     { refId: 'rollcall', label: 'Roll call', soloTime: '8 min',
       activity: 'Post a one-line intro in the Week 1 Discussion thread…',
       deliverable: 'Canvas → Week 1 → "Roll call" Discussion',
       peerLoop: 'Reply within 48 h of your post.',
       recording: 'Linked at top of Canvas → Week 1.' /* optional */ },
     // …
   ];
   ```
3. **Render the panel** at the top of `<main>` (above the `sections.map`):
   ```jsx
   <window.AsyncTrack
     data={asyncTrack}
     lessonKey="spawn-point"            /* unique → localStorage key */
     totalTime="~95 min"
     canvasHub="Canvas → Week 1 module"
     intro={<><strong>Heads up:</strong> async mirror of Week 1…</>}
   />
   ```

### Data shape

| Field | Required | Notes |
|---|---|---|
| `refId` | yes | Match the `id` of the in-class section it mirrors. |
| `label` | yes | Display name. Often matches in-class label. |
| `soloTime` | recommended | Estimated solo time — usually shorter than in-class. |
| `activity` | yes | What the student does instead of being in class. |
| `deliverable` | recommended | Canvas destination, or "Private — no posting required." |
| `peerLoop` | optional | How peer feedback closes. Omit if the step is private. |
| `recording` | optional | Pointer to a recorded clip if one exists. |

### Behavior

- **Collapsed by default**, persists open/closed per lesson via `localStorage` (`async-track:<lessonKey>:open`).
- **Always in the DOM** (uses the `[hidden]` attribute, not conditional rendering), so screen readers can find it and `@media print` can override `[hidden]` to expand it on print.
- **Keyboard-accessible**: toggle is a real `<button>` with `aria-expanded` and `aria-controls`; focus-visible outlines are inherited from `tokens.css`.
- **Mobile**: step cards collapse to single-column under 700 px.

### Adding async track to a new lesson

1. Open the lesson HTML.
2. Add `<script type="text/babel" src="async-track.jsx"></script>` after the section JSX scripts.
3. Inside the inline `<script type="text/babel">`, add an `asyncTrack` array using the data shape above.
4. Render `<window.AsyncTrack … />` at the top of `<main id="main-content">`, before the `sections.map(…)`.

Styles live in `tokens.css` under `/* ───── Async Track ───── */` and require no per-lesson tweaks.

### Authoring guidelines

- **Solo time ≠ in-class time.** Without facilitator pacing, async usually runs 10–25 % longer per step.
- **Pick one Canvas surface per lesson** (`canvasHub`) so students always know where to land.
- **Pair activities become Wed→Sun async threads.** Facilitator pairs students Thursday; reply due Sunday. Match that cadence in the `peerLoop` copy.
- **Private steps** (cold opens, autopsies) say so explicitly — students shouldn't post reflections that aren't supposed to be posted.

## Engagement scaffolds

Every interactive lesson page renders **two engagement primitives** alongside the in-class flow:

1. **Self-check** — a single retrieval question after each in-class section. Question, optional hint, optional model answer. Has an "I've got this" toggle (turns the badge green) and a private textarea for the student's working answer.
2. **Reflection journal** — a single per-lesson set of 2–3 prompts at the bottom of `<main>`. Auto-saves to `localStorage` on every keystroke. "Copy for Canvas" button serializes the prompts + answers to plain text.

Both components live in `modules/engagement.jsx` and exposed on `window` as `SelfCheck` and `ReflectionJournal`.

### How it's wired

Three things per lesson page:

1. **Load the component** (after the section JSX scripts):
   ```html
   <script type="text/babel" src="engagement.jsx"></script>
   ```
2. **Author an `engagement` object** alongside `sections` and `asyncTrack`:
   ```js
   const engagement = {
     selfChecks: {
       rollcall: {
         question: 'Name two capabilities you want to grow this semester…',
         hint: 'Look at the Capability Map and pick what feels useful in 14 weeks.',
         answer: 'No single right answer. Strong responses pair…' /* optional */
       },
       // … one entry per section id; omit a section to skip its self-check
     },
     reflection: {
       title: 'Spawn Point reflection' /* optional, default 'Lesson reflection' */,
       intro: 'Three short prompts. Auto-saves as you type…',
       prompts: [
         'What was the single most useful thing from this lesson?',
         'Where did you get stuck, and what would unstick you?',
         'What\'s one capability you want to be visibly better at by Week 4?',
       ],
     },
   };
   ```
3. **Modify the `sections.map()` render loop** so each section renders its component AND a `<SelfCheck>` after the content, then render `<ReflectionJournal>` once between the last section and the footer:
   ```jsx
   {sections.map((s) => {
     const C = s.Cmp;
     const sc = engagement.selfChecks[s.id];
     return (
       <section id={s.id} key={s.id} data-screen-label={`${s.label}`} style={main.section}>
         {C ? <C /> : <div>Missing: {s.id}</div>}
         {sc && window.SelfCheck && (
           <window.SelfCheck data={sc} lessonKey="spawn-point" sectionId={s.id} />
         )}
       </section>
     );
   })}

   {window.ReflectionJournal && (
     <window.ReflectionJournal data={engagement.reflection} lessonKey="spawn-point" />
   )}
   ```

### Self-check data shape

| Field | Required | Notes |
|---|---|---|
| `question` | yes | Italic display text. Aim for retrieval-style: "in your own words…", "name two…". |
| `hint` | optional | Shown in a dashed-border box under the question. |
| `answer` | optional | Model answer. Only revealed when the student clicks "Show model answer". For prompts that have no right answer (take-home, personal), omit. |

### Reflection prompts data shape

| Field | Required | Notes |
|---|---|---|
| `prompts` | yes | Array of strings. 2–4 prompts is the sweet spot. |
| `title` | optional | Defaults to "Lesson reflection". |
| `intro` | optional | Short guidance shown above the first prompt. |

### Behavior

- **Self-check persistence**: each section's "answered" toggle and textarea contents save to `self-check:<lessonKey>:<sectionId>` and `…:answer`.
- **Reflection persistence**: array of answers saves to `reflection:<lessonKey>` as JSON. "saved HH:MM" timestamp updates after every change.
- **Copy for Canvas** uses the Clipboard API; if it fails (Safari iframe, etc.), the button shows "Copy failed" so students know to copy manually.
- **Print**: action buttons (`I've got this`, `Show model answer`, `Copy for Canvas`, `Clear journal`) hide on print so handouts stay clean.
- **Keyboard / SR**: every button is a real `<button>` with `aria-pressed` or `aria-expanded`; textareas have `<label>` (visually hidden via `.sr-only` for self-checks, visible for reflection).

### Authoring guidelines

- **Retrieval > recognition.** "What does AUDIT do?" beats "Which of these is AUDIT?"
- **One question per section.** The cadence is the point. Don't pile multiple checks on one section.
- **Take-home / personal sections** should have a question without a model answer — there's no "right" plan.
- **Reflection prompts should change behavior.** Aim for "what will you do differently" over "how did you feel."

## Modality

Two layers ride on top of every interactive lesson:

- **MediaSlot** — embeddable video + collapsible transcript at the top of any section that has a "watch the recording" reference (cold opens on every lesson, plus the side-by-side demo on Debugging Mindset). When no recording is wired up yet, a "Recording in progress" placeholder shows and the transcript is the primary source. The transcript is also the async fallback referenced in async-track copy.
- **Print worksheet** + **Export your work** — two end-of-page modalities that turn the lesson into a portable artifact. Print uses the existing `@media print` rules (which auto-expand the async track, transcript, and self-checks); Export walks the lesson's localStorage and writes a single `.txt` file.

Components live in `modules/media-slot.jsx` (`window.MediaSlot`, `window.ExportWork`).

### How it's wired

Four things per lesson page:

1. **Load the component** (after engagement.jsx):
   ```html
   <script type="text/babel" src="media-slot.jsx"></script>
   ```
2. **Author a `media` object** alongside `sections`, `asyncTrack`, and `engagement`. Keys are section ids — only sections with a recording need an entry:
   ```js
   const media = {
     cold: {
       type: 'placeholder',                            // or 'video' when ready
       label: 'cold-open clip',
       caption: 'Cold open · 168 hours and the tradeoff…',
       src: '',                                        // YouTube/Vimeo/Panopto embed URL
       transcript: 'You have 168 hours this week. …\n\nSecond para. …'
     },
   };
   ```
3. **Add the print button** to the existing `topBar.right`:
   ```jsx
   <button type="button" className="lesson-print-btn" onClick={() => window.print()}>
     Print worksheet
   </button>
   ```
4. **Modify the render loop** so each section optionally renders `<MediaSlot>` before its content, and wrap `<ExportWork>` as a child of `<ReflectionJournal>`:
   ```jsx
   {sections.map((s) => {
     const m = media[s.id];
     return (
       <section id={s.id} key={s.id} …>
         {m && window.MediaSlot && (
           <window.MediaSlot data={m} lessonKey="spawn-point" sectionId={s.id} />
         )}
         {/* … existing section + self-check … */}
       </section>
     );
   })}

   <window.ReflectionJournal data={engagement.reflection} lessonKey="spawn-point">
     <window.ExportWork lessonKey="spawn-point" lessonTitle="Week 1 · Spawn Point" />
   </window.ReflectionJournal>
   ```

### MediaSlot data shape

| Field | Required | Notes |
|---|---|---|
| `type` | yes | `'video'` for embedded iframe, `'placeholder'` for "Recording in progress" state. |
| `src` | when `type === 'video'` | Embed URL (YouTube `https://www.youtube.com/embed/…`, Vimeo `https://player.vimeo.com/video/…`, Panopto, Kaltura, etc.). |
| `caption` | recommended | Short header line shown above the video / placeholder. |
| `label` | optional | Short noun phrase used in the placeholder copy ("…producing the cold-open clip…"). |
| `transcript` | recommended | Multi-paragraph string. Paragraphs are split on blank lines (`\n\n`) and rendered as `<p>`. Always renders as a collapsible block with a Show/Hide toggle. |

### Activating a real recording

When a video is ready, **only two things change**:

```js
// before
{ type: 'placeholder', src: '', transcript: '…' }

// after
{ type: 'video', src: 'https://www.youtube.com/embed/abc123', transcript: '…' }
```

The transcript stays — it's the accessibility surface (deaf/HoH students, low-bandwidth contexts, async readers) and the print artifact.

### ExportWork output

`Export your work` walks every `localStorage` key namespaced to the lesson — self-check answers + marked status, reflection prompts + answers, and any other widget that uses the same lesson key — and emits a `.txt`:

```
# Week 1 · Spawn Point
Exported 5/3/2026, 6:13:03 AM

## Self-checks

### rollcall ✓
Two capabilities: ship a Python script someone else can run; ask for help on Day 3 not Day 30.

## Reflection

Prompt 1:
The capability map clicked for me — verbs, not nouns.

…
```

Filename: `<lessonKey>-work-YYYY-MM-DD.txt`. Falls back to "Nothing to export yet" if the lesson's localStorage is empty.

### Authoring guidelines

- **Transcripts are first-class.** Many students will read instead of watch (mobile, transit, captions broken, attention budget). Write the transcript as if it's the primary source, not a fallback.
- **Don't author transcripts by transcribing the video.** Author the transcript first; the video is the performance of the transcript. Keeps the two in sync forever.
- **Placeholder is fine for v1.** The component renders cleanly with no `src` — no need to fake a video URL.
- **Print-quality matters.** The lesson should print as a usable handout. Stick to the existing engagement / async-track / media-slot CSS — those have `@media print` rules that handle expansion + page-break-avoidance.

## Course Arc (connective tissue)

Every lesson page renders an **8-week strip** at the top of `<main>` — current week is highlighted, skeleton weeks have a dashed border + "skeleton" stamp. Each cell is a link.

The course map is the single source of truth in `modules/course-arc.jsx`. To add or rename a lesson, edit `COURSE_MAP` once.

```jsx
<window.CourseArc currentKey="spawn-point" />
```

The component reads `currentKey` to highlight the right week and label the "You are here" bar.

## Lesson Skeletons

Three lessons (`setup-quest.html`, `project-seed-v01.html`, `final-demo.html`) are built as **lesson plans, not yet interactive lessons**. Each renders the standard shell (header, course arc, footer) plus a `<LessonSkeleton>` block that surfaces the planned shape:

- Anchor question
- **Big Ideas advanced** — which of the 5 Big Ideas this lesson hits, and *how* it lands them
- **Connective tissue** — what it engages from earlier weeks, what it sets up for later weeks
- **Planned section flow** — numbered list with timing + intent per section
- **Planned deliverables** — what students leave with
- **Build notes** — open decisions and blockers for the build team (terminal-styled `// note` block)

Skeletons mark themselves clearly: amber border on the header, "Skeleton" chip in the chip area, prominent `SKELETON · Planned, not yet built` banner at the top. The component is in `modules/skeleton.jsx`; data lives inline in each skeleton HTML.

To convert a skeleton into a real lesson: keep the data object as your build spec, then replace the `<LessonSkeleton>` render with the standard sections-array + render-loop pattern used in built lessons.

## Capture Template (Obsidian thread)

Every built lesson ends with a **Capture Template** — a markdown snippet pre-filled with the lesson's headings, frontmatter, and reflection prompts. Students click `Copy template` (or `Download .md`) and paste into their Obsidian vault.

```jsx
const captureTemplate = {
  title: 'Spawn Point · Obsidian capture',
  target: 'Weeks/W01-spawn-point.md',
  intro: 'Drop this template into your vault…',
  markdown: `---
type: lesson
week: 01
…
`,
};

<window.CaptureTemplate data={captureTemplate} />
```

### Why templates instead of an Obsidian week

Note-taking is a **habit**, not an event. A single Obsidian week gets bypassed; a template per week gets used. The install moment lives in W3 Setup Quest (one focused location), then every other lesson ships a template that drops into the vault without ceremony.

### Authoring guidelines

- **Match section IDs.** Headings in the template should mirror the in-class section flow so a student can fill it in as they go.
- **Frontmatter is part of the work.** YAML keys (`week`, `lesson`, `date`, `status`, lesson-specific fields like `trust_dial_today` or `trigger`) make the vault searchable later.
- **Wikilinks where they help.** `[[Project/seed]]` and `[[Bugs/...]]` connect notes across the vault as it grows.
- **Don't over-author.** The template is scaffolding, not a worksheet. Empty fields are the assignment.

## Tech notes

- **No build step.** All HTML/CSS/JS is hand-authored or transpiled at runtime (Babel standalone for the React-based pages).
- **Fonts:** Fraunces, JetBrains Mono, Inter (loaded from Google Fonts).
- **Design tokens** live in `tokens.css` and are imported by every page.
- **Slide decks** use the `<deck-stage>` web component (`modules/deck-stage.js`) — handles auto-scaling and print-to-PDF.

## Accessibility baseline

Every lesson page is built against this checklist (lifted from `tokens.css` and the lesson-page templates):

- **Skip link** to `#main-content` as the first focusable element.
- **Semantic landmarks**: `<header>`, `<nav aria-label="Module sections">`, `<main id="main-content">`, `<footer>`.
- **Focus-visible outlines** (3 px amber, 2 px offset) on every interactive element, including `[role="button"]`, `[role="tab"]`, etc.
- **`aria-current="location"`** on the active section nav button; **`aria-expanded` + `aria-controls`** on collapsibles.
- **`prefers-reduced-motion`** kills animations + smooth-scroll globally.
- **WCAG AA contrast** — `--ink-300` was bumped to `#6E624A` (≥ 4.5:1 on `--paper-50`).
- **Responsive** — fixed left rail collapses to a stacked nav under 900 px; async-track step cards collapse to a single column under 700 px.

When adding new components, reuse the `.async-catchup`, `.async-track-*`, and `.sr-only` utilities in `tokens.css` rather than rolling your own.

## License / use

Internal Indiana University course-redesign material. Not for redistribution outside the redesign team without permission.
