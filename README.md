# Näppärä

A lightweight, single-player Finnish typing game inspired by TypeRacer. Practice everyday Finnish sentences, listen to browser-based Finnish pronunciation, and reveal English translations only when needed.

## Features

- Timer begins on the first keystroke
- Live WPM, accuracy, elapsed time, and streak statistics
- Punctuation and capitalization are ignored when checking completion
- Finnish text-to-speech through the browser's Web Speech API
- English translations hidden behind a toggle
- Responsive, keyboard-friendly interface
- Best WPM saved locally in the browser
- 1,000 B1–B2 sentences across the official YKI topic areas and practical interactions
- Adaptive review for sentences marked **Needs practice**
- Listening-only dictation and response-pattern modes
- Clickable vocabulary cards, saved words, and mistake tracking
- Topic filters, a configurable daily goal, and seven-day progress history
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

## Deploy

Pushes to `main` trigger the workflow in `.github/workflows/deploy.yml`. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not already selected.

The deployed site will be available at:

`https://tinyspice123.github.io/finnish_typing_game/`

## Notes

Speech quality and Finnish voice availability depend on the operating system and browser. Chromium-based browsers generally provide the smoothest experience.
