# Technical Implementation

## High-Fi Prototype

Hosted prototype:

<https://inubashirilix.github.io/xjtlu-cpt208-chang-gate-portfolio/>

The app is deployed as a static Vite build through GitHub Pages. It uses `HashRouter`, so page navigation works on static hosting without server-side route rewrites.

## System Architecture

The system architecture diagram is available in both PlantUML source and PNG format:

- `docs/system-architecture.puml`
- `docs/system-architecture.png`

The diagram shows how the browser-based React app handles routing, shared state, local storage, static heritage data, media assets, the AMap SDK, and the Vite DeepSeek proxy used during local development or preview.

## Data Flow

The data-flow diagram is available in both PlantUML source and PNG format:

- `docs/data-flow.puml`
- `docs/data-flow.png`

It explains how the app restores language and route state, localizes content, calculates distances, renders each major page, exports postcards through Canvas, and builds the Ask page progress payload.

## Frontend Architecture

The application is a React + Vite single-page app.

Main layers:

- `src/App.jsx`: route table for Home, Map, Gallery, Spot Detail, Postcard, and Ask.
- `src/components/AppLayout.jsx`: shared app shell with header and bottom navigation.
- `src/context/AppStateContext.jsx`: global state for selected route, language, current location, localized spots, route stats, and chat messages.
- `src/data/`: local content modules for heritage spots, routes, gallery views, and postcard themes.
- `src/pages/`: feature pages that compose shared components and data.
- `src/styles/global.css`: shared visual system and responsive layout rules.

## Data Handling

Most content is bundled as static local data:

- Heritage spot metadata and coordinates are stored in `src/data/spots.js`.
- Gallery content is stored in `src/data/galleryViews.js`.
- Postcard themes are stored in `src/data/postcardThemes.js`.
- Photos and visual assets are bundled with the Vite build.

`AppStateContext` derives runtime data from these modules:

- localizes spot and route content between English and Chinese
- calculates approximate distance and walking time from the demo/current location
- stores selected route and language in `localStorage`
- provides chat message state to the Ask page

## External Services

### AMap

The map page loads the AMap JS SDK in the browser using:

- `VITE_AMAP_KEY`
- `VITE_AMAP_SECURITY_KEY`

The map page renders markers for each heritage spot and draws route polylines from the route data.

### DeepSeek

The Ask page posts route progress JSON and chat messages to:

```text
/api/deepseek
```

In local development and Vite preview, this endpoint is handled by `deepSeekProxyPlugin` in `vite.config.js`. The proxy reads `API_KEY` or `DEEPSEEK_API_KEY` from `.env`, forwards the request to DeepSeek, and returns the response to the React app.

GitHub Pages is static hosting and does not run the Vite proxy middleware. The hosted prototype should therefore be treated as the high-fi frontend prototype; live Ask API calls require running through Vite preview or adding a separate server/API host.

## Environment Variables

The local `.env` file uses:

```text
VITE_AMAP_KEY=...
VITE_AMAP_SECURITY_KEY=...
API_KEY=...
```

`VITE_*` variables are browser-visible after build. The DeepSeek `API_KEY` is only used by the local Vite proxy.

## Build and Deployment

Local development:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

GitHub Pages deployment is configured in `.github/workflows/deploy.yml`. The workflow installs dependencies, runs `npm run build`, uploads `dist/`, and deploys it through GitHub Pages.

