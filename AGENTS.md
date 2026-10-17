# AGENTS.md

## Project overview

Näppärä is a dependency-free Finnish typing practice game hosted on GitHub Pages. It uses plain HTML, CSS, and JavaScript so it can be deployed as static files.

## Development guidelines

- Keep the project buildless unless a feature clearly requires a build tool.
- Preserve accessibility: keyboard support, visible focus states, semantic controls, and live status updates.
- Keep English translations hidden by default.
- Sentence completion must ignore punctuation, capitalization, and repeated whitespace.
- The timer must start on the user's first keystroke, not on page load.
- Do not add analytics, accounts, or remote storage without explicit approval.
- Test changes on both desktop and narrow mobile layouts.

## Content

- Store Finnish/English sentence pairs in `app.js`.
- Use natural, everyday Finnish and accurate idiomatic translations.
- Keep Finnish characters such as `ä`, `ö`, and `å` intact.

## Deployment

- GitHub Pages deployment is defined in `.github/workflows/deploy.yml`.
- Production deploys come from the `main` branch.
