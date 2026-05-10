# Chang Gate Heritage

A mobile-first React + Vite heritage exploration prototype for the Human-Centric Computing coursework project:

- Module: Human-Centric Computing
- Topic: A1 - Suzhou Grand Canal - Chang Gate (阊门)
- Audience: Visitors and residents
- Context: Onsite exploration

The prototype is designed as a polished frontend-only web app that supports playful storytelling, location-flavoured discovery, collectible memory stamps, and a simulated Ask postcard souvenir flow.

## Highlights

- **Curated Heritage Route** — Walk through 5 real Suzhou canal-side spots (Shantang Street, Wharf Steps Corner, Waterside Alley Walk, Chang Gate, Market Lane Crossing), each with a story snippet, observation prompts, and a playful mission.
- **Interactive AMap Integration** — Browse heritage spots on an interactive Gaode (AMap) map with markers, route polylines, info windows, and one-click navigation to spot detail pages.
- **Quick Quiz at Each Stop** — Test your knowledge with a built-in multiple-choice quiz per spot, with instant feedback and retry support.
- **Custom Postcard Souvenir** — A canvas-based postcard generator that composites your uploaded photo (with zoom/crop/brightness/contrast/saturation controls), a mood theme palette, a favorite spot memory line, and a custom message into a downloadable PNG keepsake.
- **Route-Aware Ask Assistant** — Chat with DeepSeek via a built-in interface that sends your route progress, selected spots, and current location as context, so answers are grounded in the actual walk.
- **Field Gallery** — A curated photo collection of Chang Gate and its surroundings, annotated with observational lenses to connect each image to the route experience.
- **Bilingual (EN/ZH)** — Full Chinese/English toggle persisted across sessions, covering UI labels, spot content, quizzes, gallery notes, and postcard themes.
- **Mobile-First Design** — Touch-optimized bottom navigation, large tap targets, and content chunked for outdoor reading with a custom CSS design system.
- **Local-First Progress** — All user state (language, route selection) persisted to localStorage, no accounts or backend required.

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
