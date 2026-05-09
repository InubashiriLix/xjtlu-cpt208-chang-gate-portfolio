# Chang Gate Heritage

A mobile-first React + Vite heritage exploration prototype for the Human-Centric Computing coursework project:

- Module: Human-Centric Computing
- Topic: A1 - Suzhou Grand Canal - Chang Gate (阊门)
- Audience: Visitors and residents
- Context: Onsite exploration

The prototype is designed as a polished frontend-only web app that supports playful storytelling, location-flavoured discovery, collectible memory stamps, and a simulated Ask postcard souvenir flow.

## Highlights

- Mobile-first multi-route app built with React and Vite
- Bright warm visual system tailored to Chang Gate heritage exploration
- Story Hunt flow with nearby spots, short story snippets, and playful missions
- Stamp collection booklet with visible progress and unlock milestones
- Simulated Ask postcard generator with loading and preview states
- Static-hosting-safe routing via `HashRouter`
- GitHub Pages deployment workflow included

## Routes

- `/` Home
- `/explore` Explore / map
- `/spots/:slug` Heritage spot detail
- `/stamps` Stamp collection
- `/postcard` Postcard generator
- `/about` Project info

## Tech Stack

- React
- Vite
- React Router
- Plain modular component structure with a custom CSS design system

## Project Structure

```text
src/
  assets/
  components/
  context/
  data/
  pages/
  styles/
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app uses `HashRouter` and `base: './'` in Vite so it works safely on GitHub Pages static hosting without server-side route rewrites.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Ensure the default branch is `main`.
3. In GitHub repository settings, enable GitHub Pages with GitHub Actions as the source.
4. Push to `main` and the included workflow at `.github/workflows/deploy.yml` will build and publish the `dist/` output.

## Prototype Notes

- All content is mock local data for frontend prototyping.
- Stamp progress is persisted in `localStorage`.
- Nearby distance, GPS feel, XR preview, and Ask postcard generation are simulated in the UI only.
- The structure is intentionally ready for future location, XR, or Ask integrations.
