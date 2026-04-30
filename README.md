# JeevX — Static Prototype

A polished, static React prototype demonstrating an AI-assisted healthcare workflow platform for clinics. Built for demos, investor conversations, and product alignment — not as production software.

## What It Shows

- **Doctor Dashboard** — Patient queue, full medical history, vitals, lab reports, AI-assisted diagnosis suggestions, and prescription management
- **Compounder Dashboard** — Patient check-in, vitals recording, intake notes, and queue management with clear access limitations
- **Patient Portal** — Profile, prescriptions, lab reports, visit history, appointments, and notifications
- **Consultation Flow** — Interactive 9-step walkthrough from patient arrival to prescription delivery
- **AI Insights** — Sample AI outputs (symptom extraction, condition suggestions, risk alerts, draft prescriptions) with clear disclaimers
- **Workflow Overview** — Visual end-to-end clinic process diagram

All data is mocked. No backend, no real authentication, no real AI. Every AI output is clearly labeled as sample prototype content.

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Vite
- HashRouter (GitHub Pages compatible)
- Lucide React icons
- Bun package manager

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the prototype.

## Build & Deploy

```bash
bun run build
```

Static output goes to `dist/`. GitHub Pages deployment is configured via `.github/workflows/deploy.yml` — pushes to `main` auto-deploy.

## Project Structure

```
src/
  app/         Router configuration
  components/  Layout (shell, navbar)
  data/        Mock patients, prescriptions, reports, AI suggestions
  pages/       All 10 page components
  types/       TypeScript interfaces
  utils/       Formatting helpers
  styles/      Tailwind entry point
```

## Pages

| Route              | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `#/`               | Landing page                                 |
| `#/overview`       | Product overview and value proposition       |
| `#/roles`          | Role selection hub                           |
| `#/doctor`         | Doctor dashboard and clinical workflow        |
| `#/compounder`     | Compounder intake and vitals workflow         |
| `#/patient`        | Patient portal with records access            |
| `#/consultation`   | Interactive end-to-end consultation demo      |
| `#/history`        | Patient history and longitudinal records      |
| `#/ai-insights`    | AI sample outputs with disclaimers            |
| `#/workflow`       | Clinic workflow process diagram               |

## Disclaimer

This is a product vision prototype. All medical data, AI outputs, and patient information shown are fictional and for demonstration purposes only. This is not a medical device or clinical decision support system.
