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
- Automatic deployment to GitHub Pages

## Run locally

No build step or dependencies are required. Open `index.html` directly, or serve the folder with any static server:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

Pushes to `main` trigger the workflow in `.github/workflows/deploy.yml`. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not already selected.

The deployed site will be available at:

`https://tinyspice123.github.io/finnish_typing_game/`

## Notes

Speech quality and Finnish voice availability depend on the operating system and browser. Chromium-based browsers generally provide the smoothest experience.
