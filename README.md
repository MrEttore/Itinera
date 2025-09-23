<p align="center">
  <img src="./public/logo.svg" width="100"/>
</p>

# Itinera — Map‑based Travel Log

Log the cities you’ve visited, when you were there, and notes—all on an interactive map.

## Overview

Itinera is a small but realistic front‑end product that demonstrates building a modern React app with routing, protected areas, shared state, and a map experience. It’s designed to look and feel like a plausible MVP you could ship internally or as a side product.

Why I built it:

- Practice clean component architecture, Context + Reducer state management, and custom hooks.
- Work with a map SDK (Leaflet via React‑Leaflet) and real‑world concerns like geolocation, reverse geocoding, and markers.
- Simulate a client–server app with a JSON API, async loading, and error/empty states.

## Features

- Authenticated app area (fake auth for demo) and public marketing pages
    - Login with email/password to access the app
    - Protected routes with redirect
- Interactive map
    - See all saved cities as markers (OpenStreetMap tiles via Leaflet)
    - Click anywhere on the map to start adding a city at that location
    - Optional: use your current geolocation to center the map
- Add a city
    - Reverse‑geocode the clicked location to prefill city and country
    - Pick the visit date with a datepicker
    - Add personal notes
- City details
    - Dedicated page with date formatting and quick link to Wikipedia
    - Delete a city from the list
- Lists and navigation
    - Cities list with active item highlighting and inline delete
    - Countries list aggregated from all saved cities
- Robust UX states
    - Loading spinners for network calls
    - Friendly empty & error messages

## Tech stack

- React 18 + Vite
- React Router v6 (routing, protected routes, nested layouts)
- Context API + useReducer (auth + cities data)
- React‑Leaflet + Leaflet (map, markers)
- OpenStreetMap tiles (TileLayer)
- react‑datepicker (date input UX)
- JSON Server (mock REST API)
- CSS Modules (component‑scoped styles)
- ESLint + Prettier (with sorted imports plugin)

## Architecture notes

- Routing
    - Public pages: `Homepage`, `Product`, `Pricing`, `Login`
    - App area: `AppLayout` (protected) → `cities`, `countries`, `form`, and city details
    - Lazy‑loaded routes via `React.lazy` + `Suspense` for faster initial load
- State management
    - Auth: `AuthContext` with a demo user and `login/logout`
    - Cities: `CitiesContext` with reducer actions for load/create/delete
    - Caching: city detail short‑circuit to avoid refetching if already selected
- Data fetching
    - `JSON Server` serves `/cities` and `/cities/:id` on `http://localhost:9000`
    - Reverse geocoding via BigDataCloud to prefill city and country
- Custom hooks
    - `useGeolocation` — a thin wrapper over the browser Geolocation API
    - `useUrlPosition` — read `lat`/`lng` from URL search params
- UI/UX
    - CSS Modules for local scoping
    - Spinners, empty messaging, and error fallbacks

## Data model

Each city saved by the app follows this shape:

```json
{
    "id": 98443197,
    "cityName": "Berlin",
    "country": "Germany",
    "emoji": "🇩🇪",
    "date": "2027-02-12T09:24:11.863Z",
    "notes": "Amazing 😃",
    "position": { "lat": 52.5359, "lng": 13.3769 }
}
```

Backed by `JSON Server`, which provides standard REST endpoints:

- GET `/cities` — list all cities
- GET `/cities/:id` — fetch a single city
- POST `/cities` — create a new city
- DELETE `/cities/:id` — remove a city

## Getting started

Prerequisites

- Node.js 18+ recommended

Install dependencies

```bash
npm install
```

Start the mock API (JSON Server)

```bash
npm run server
# Serves http://localhost:9000 from data/cities.json (with a slight delay to simulate network)
```

Start the front‑end dev server

```bash
npm run dev
# Vite will print the local URL (typically http://localhost:5173)
```

Login credentials (demo)

```text
Email: John.Doe@example.com
Password: qwerty
```

## How to use the app

1. Visit the homepage and click “Log in”. Use the demo credentials above.
2. Enter the app area. You’ll see a sidebar with Cities and Countries.
3. Click anywhere on the map to open the “Add city” form prefilled via reverse geocoding.
4. Pick the date you visited and add notes. Submit to save.
5. Click a city in the list to view details. Use the × icon to delete a city.

## Project structure (excerpt)

```text
src/
  components/         # Reusable UI components (CityList, Map, Form, etc.)
  context/            # Auth and Cities providers (Context + Reducer)
  hooks/              # Custom hooks (geolocation, URL position)
  pages/              # Route screens (public + protected)
  utils/              # Small utilities (emoji, date formatting)
```

## What this demonstrates

- Product mindset: a coherent, plausible MVP with marketing pages and an app area
- Modern React patterns: lazy‑loading, protected routes, context reducers, custom hooks
- Async UX: loading, errors, empty states, and optimistic-ish flows
- Third‑party integration: maps, geolocation, reverse geocoding
- Code quality: ESLint, Prettier, import sorting, modular CSS

## Roadmap / Next steps

- Real authentication and user accounts
- Persistent backend (e.g., Node/Express + DB) and per‑user data
- Marker clustering and better mobile map gestures
- Edit city entries; drag markers to adjust position
- Offline support and PWA (cache tiles and city list)
- Unit tests (Vitest + React Testing Library) and E2E (Playwright)

## License

This project is for learning and portfolio purposes.
