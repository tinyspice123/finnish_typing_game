# Näppärä

A lightweight, single-player Finnish typing game inspired by TypeRacer. Practice everyday Finnish sentences, listen to browser-based Finnish pronunciation, and reveal English translations only when needed.

## Features

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
- Browser-local speaking recording with timed prompts and self-assessment
- Reading and listening comprehension tasks focused on meaning
- Four-skill mock checkpoints and a descriptive practice profile after enough evidence
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

The suite validates the exact 1,000-sentence total and includes adaptive-queue scalability checks at 1,000 and 10,000 items. Only the active sentence is rendered, and its word elements are reused while typing, so enlarging the sentence bank does not enlarge the live DOM or add linear work to each keystroke.

## Contributing practice content

The original Finnish/English typing pairs live in `app.js`. Keep translations hidden by default, preserve Finnish characters, and use natural everyday Finnish rather than translating English word for word. The generated expansion lives in `sentence-bank.js`.

Curated YKI tasks live near the top of `yki-practice.js` in four arrays:

- `writingTasks`: add a stable `w-...` ID, topic, register, suggested minutes, Finnish prompt, three concrete instructions, keyword stems, and one natural model answer.
- `phraseTasks`: add a stable `p-...` ID, sentence frame, correct answer, three plausible options, and a short explanation.
- `speakingTasks`: add a stable `s-...` ID, topic, preparation time, response time, Finnish prompt, and four self-assessment checks.
- `comprehensionTasks`: use a stable `r-...` or `l-...` ID, the matching `reading` or `listening` skill, a short Finnish source, one question, three options, the zero-based correct option index, and an explanation.

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
