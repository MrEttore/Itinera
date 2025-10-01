# Itinera – Map‑based Travel Log

Track where you’ve been. Click the map, reverse‑geocode the spot, add notes & a date. A compact React app that showcases real product thinking, clean state management and an engaging geospatial UI.

## ✨ Why this project matters

Itinera isn’t a toy “todo list” – it demonstrates how you’d structure a small but realistic product: marketing pages + protected area, map integration, async flows, derived lists, and thoughtful UX states.

## 🚀 Core Features

Single, focused experience:

1. Public marketing pages (Home, Product, Pricing)
2. Fake auth gate → protected app layout
3. Interactive map (Leaflet / OpenStreetMap) with clickable coordinates
4. Reverse geocoding to prefill city + country and emoji flag
5. Add trip metadata: date (datepicker) + freeform notes
6. City & Country aggregate lists with active highlighting
7. City detail page with contextual info & delete
8. Loading, empty and error states baked in

## 🧱 Architecture at a glance

| Layer             | Responsibility                                   |
| ----------------- | ------------------------------------------------ |
| Pages / Layouts   | Route structure & protected shell                |
| Context + Reducer | Auth (demo) + Cities domain state                |
| Services          | API adapter (mock serverless + optimistic layer) |
| Hooks             | Geolocation, URL coordinate extraction           |
| Components        | Presentation + small state (form, map, lists)    |
| Utils             | Formatting, emoji conversion                     |

### Data Flow

Map click → form prefilled → create city (optimistic) → context reducer updates lists → map & lists react instantly.

## 🛠 Tech Highlights

- React 18 + Vite (fast DX)
- React Router v6 (nested + protected routes)
- Context API + `useReducer` (predictable domain updates)
- React‑Leaflet + Leaflet (tile + marker layers)
- Browser geolocation + reverse geocoding API
- CSS Modules (scoped styling)
- ESLint + Prettier + import sorting

## 🧪 Mock Backend Strategy

The app intentionally runs **stateless**: a Netlify Function (or local mock) returns an empty city list; all “writes” are optimistic echoes stored in memory/localStorage (currently cleared per reload). This shows how the UI can be architected for real persistence later without rewriting everything.

Swap in a real backend later by replacing `src/services/apiClient.js`.

## 🗂 Data Model (city)

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

## 🏁 Quick Start

```bash
npm install
npm run dev:netlify   # Full experience (API function + app)
# or
npm run dev           # Pure front-end dev
```

Open the printed URL, log in with any placeholder email/password (demo auth), click the map, add a city.

## 🧭 Using the App

1. Log in (demo auth only)
2. Pan / zoom map, click a location
3. Form appears with city + country inferred
4. Pick date & add notes → Save
5. Explore lists (Cities / Countries) & open details

## 📂 Project Structure (excerpt)

```text
src/
  components/    # UI building blocks
  context/       # Auth & Cities providers
  hooks/         # useGeolocation, useUrlPosition
  pages/         # Route screens
  services/      # apiClient (mock adapter)
  utils/         # Formatting helpers
```

## ✅ What This Demonstrates

- Product-style separation (marketing vs. app)
- Clean domain reducer with minimal actions
- Map + geolocation integration patterns
- Optimistic mindset & decoupled data adapter
- Strong UX affordances (loading / empty / error)
- Readable, modular component structure

## 🔮 Possible Enhancements

- Real auth (JWT / OAuth) + multi-user data
- Persistent database & real create/update flows
- Edit & drag markers, photo attachments
- Marker clustering & search
- Offline-first / PWA support
- Automated tests (Vitest + RTL + Playwright)

## 📜 License

Portfolio / learning project. Feel free to explore or fork.
