# Näppärä

A lightweight, single-player Finnish typing game inspired by TypeRacer. Practice everyday Finnish sentences, listen to browser-based Finnish pronunciation, and reveal English translations only when needed.

## Features

- Default easy typing bank with 54 short-to-longer examples; the full bank remains available
- 18-unit action-based bridge toward B1: model, build, change, role-play, independent response, mission, and delayed review
- Four-skill starting check, target-pair selection, daily time goals, and explained practice suggestions
- Local course drafts, progress export/reset, and migration from the original six-unit course
- Timer begins on the first keystroke
- Live WPM, accuracy, elapsed time, and streak statistics
- Punctuation and capitalization are ignored when checking completion
- Finnish text-to-speech through the browser's Web Speech API
- English translations hidden behind a toggle
- Optional plain-English help for YKI prompts, hidden until requested
- Responsive, keyboard-friendly interface
- Best WPM saved locally in the browser
- 1,000 B1–B2 sentences across the official YKI topic areas and practical interactions
- Adaptive review for sentences marked **Needs practice**
- Listening-only dictation and response-pattern modes
- Clickable vocabulary cards, saved words, and mistake tracking
- Topic filters, a configurable daily goal, and seven-day progress history
- Active-recall YKI writing scenarios with communicative checklists and model responses
- Due-date-based spaced repetition that reacts to learner confidence and help usage
- Curated phrase training for requests, opinions, reasons, contrast, and solutions
- Browser-local speaking recording/download, explicit preparation timers, sample exports, and received tutor feedback
- 20 reading/listening sources with purpose, detail, and action questions plus explanations
- Three held-out four-skill checkpoint sets with optional timing and exposure tracking
- Separate evidence counts per skill; self-checks and typing never establish B1 proficiency
- Installable web-app metadata with favicon, Apple touch icon, and mobile home-screen icons
- Automatic deployment to GitHub Pages

## Run locally

No build step or dependencies are required. Open `index.html` directly, or serve the folder with any static server:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Tests

The learning and scoring logic has dependency-free unit tests using Node's built-in test runner:

```powershell
npm test
```

The suite validates the 900-sentence expansion, difficulty filtering, course structure, held-out content, evidence and delayed-review rules, legacy migration, and adaptive-queue scalability at 1,000 and 10,000 items. The full typing bank now has 1,054 sentences, including the 54 starter examples. Only the active sentence is rendered, and its word elements are reused while typing, so enlarging the sentence bank does not enlarge the live DOM or add linear work to each keystroke.

Optional browser regression checks use Python Playwright and an installed Microsoft Edge browser:

```powershell
python -m pip install playwright
python tests/browser-course-check.py
```

These are development-only tools; the website remains dependency-free. The browser script checks 1440px, 375px, and 320px layouts and exercises the starting check, course, persistence, failed audio, mic denial, checkpoint exposure, and honest writing feedback.

## Course scope and next steps

The course is a practice companion, not a validated complete B1 curriculum or a pass prediction. Unit completion is self-assessed. [ADR 0001](docs/adr/0001-action-based-b1-citizenship-course.md) records the implementation and outstanding native-speaker recordings, qualified teacher validation, and learner pilot. Synthetic audio is labelled; a learner may select a local recording of a source without uploading it. Recordings made in the browser must be downloaded before leaving the activity; they are not persisted with drafts.

Counts distinguish encounters, support, independent attempts, objective/tutor-checked delayed successes, and externally reviewed samples. Without support does not mean correct. Older typing and YKI history remains in its existing storage and is not converted into checked language evidence. Course reset clears the new course records only.

## Contributing practice content

The original Finnish/English typing pairs live in `app.js`. Keep translations hidden by default, preserve Finnish characters, and use natural everyday Finnish rather than translating English word for word. The generated expansion lives in `sentence-bank.js`.

Course units, Finnish/English pairs, named comprehension sources, and held-out checkpoint sets live in `app.js`. Unit and source IDs must stay stable when content is reordered; use a new ID for a different task. Keep checkpoint prompts out of instructional content. Correct-answer explanations must point to supporting text. Course rendering lives in `bridge-course.js`, versioned local persistence and recording in `learning-store.js`, and reusable evidence/review rules in `game-core.js`.

The earlier practice areas in `yki-practice.js` contain:

- `writingTasks`: add a stable `w-...` ID, topic, register, suggested minutes, Finnish prompt, three concrete instructions, and a natural model answer. Keyword scoring is no longer used.
- `phraseTasks`: add a stable `p-...` ID, sentence frame, correct answer, three plausible options, and a short explanation.
- `speakingTasks`: add a stable `s-...` ID, topic, preparation time, response time, Finnish prompt, and four self-assessment checks.

IDs are stored in browser progress and must never be reused for a different task. Keep task instructions specific enough to assess communicative success, make distractors plausible but unambiguous, and avoid claiming that heuristic or self-assessment results are official YKI scores. Listening sources are spoken with the browser's Finnish voice, so write numbers and abbreviations as they should be pronounced.

After changing learning logic or content, run:

```powershell
npm test
```

Also open every changed practice mode at desktop and narrow mobile widths. Check keyboard focus, screen-reader status messages, Finnish audio, microphone permission and denial, hidden English translations, and persistence after a page reload.

## Deploy

Pushes to `main` trigger the workflow in `.github/workflows/deploy.yml`. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not already selected.

The deployed site will be available at:

`https://tinyspice123.github.io/finnish_typing_game/`

## Notes

Speech quality and Finnish voice availability depend on the operating system and browser. Chromium-based browsers generally provide the smoothest experience.
