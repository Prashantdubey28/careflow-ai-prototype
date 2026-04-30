# Static GitHub Prototype — Tech Stack

## Summary
A static clickable demo site built with **Bun + Vite + React + TypeScript + Tailwind CSS v4**, deployed to **GitHub Pages** via **GitHub Actions**. Everything is frontend-only with mocked data — no backend, no auth, no APIs.

## Stack

| Layer | Choice |
| --- | --- |
| Package manager | Bun |
| Build tool | Vite 8 |
| Framework | React 19 + TypeScript 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Routing | `react-router-dom` v7 with `HashRouter` |
| Icons | `lucide-react` |
| Hosting | GitHub Pages (static `dist/` output) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |

## Commands
```bash
bun install          # install dependencies
bun run dev          # start dev server (localhost:5173)
bun run build        # production build to dist/
bun run lint         # eslint
```

## Architecture
- **React SPA** with `HashRouter` — no server rewrites needed for GitHub Pages
- **Tailwind v4** configured via Vite plugin (no `tailwind.config.js` — uses CSS `@theme` directives in `src/styles/globals.css`)
- **Static mock data** in `src/data/*.ts` — imported directly by page components
- **Simple local state** only (`useState` for UI interactions) — no Redux or state management libraries
- **No runtime dependencies** on backends, databases, APIs, secrets, or environment variables

## Project Structure
```
src/
  app/router.tsx              HashRouter with all routes
  components/layout/          Shell, Navbar
  data/                       Mock data modules (patients, prescriptions, reports, AI, consultations, dashboard)
  pages/                      10 page components
  types/index.ts              Shared TypeScript interfaces
  utils/format.ts             Date formatting
  styles/globals.css          Tailwind entry + custom theme tokens
.github/workflows/deploy.yml  GitHub Pages auto-deploy on push to main
```

## Routes

| Route | Page |
| --- | --- |
| `#/` | Landing page |
| `#/overview` | Product overview |
| `#/roles` | Role selection hub |
| `#/doctor` | Doctor dashboard |
| `#/compounder` | Compounder dashboard |
| `#/patient` | Patient portal |
| `#/consultation` | Interactive consultation stepper |
| `#/history` | Patient history & records |
| `#/ai-insights` | AI sample outputs |
| `#/workflow` | Clinic workflow diagram |

## Types
Defined in `src/types/index.ts`:
- `Patient`, `Vitals`, `VisitRecord`, `Prescription`, `LabReport`
- `AiSuggestion`, `Notification`, `Appointment`
- `ConsultationStep`, `ClinicUser`, `DashboardMetric`

## Theme
Custom design tokens defined via Tailwind `@theme` in `globals.css`:
- Role colors: Doctor (teal), Compounder (amber), Patient (green)
- Surface, card, text, and border tokens for consistent light theme

## Deploy
GitHub Pages auto-deploys on push to `main`. The workflow installs with `bun install --frozen-lockfile`, builds, and publishes `dist/`.

## Constraints
- Fully static — no server-side rendering or API calls
- All AI outputs labeled as sample/prototype content
- All patient data is fictional mock data
- Hash-based routing only (GitHub Pages compatible)
- No secrets or environment variables required to build or view
