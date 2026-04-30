# Static GitHub Prototype Master Plan

## Document Purpose
This document is the single source of truth for building a static, shareable GitHub-hosted prototype of the AI healthcare product idea described in the source materials. It is written so another agent or developer can execute the work without needing to re-interpret the business docs.

This is not a production architecture document.

This is not an MVP build spec for a real medical product.

This is a prototype plan for a polished static website that communicates the product vision through a clickable demo.

## Source Inputs Used
- `tech-stack.md`
- `AI.docx`
- `All in one full description.docx`
- `project points for each.docx`
- `AI_Healthcare_Business_Plan.pdf` was provided, but the main planning inputs were already fully represented in the other extracted files

## Working Summary
The idea is an AI-assisted healthcare workflow platform for clinics. The product centers on three main user roles:

- Doctor
- Compounder or nurse
- Patient

The long-term product vision includes:

- A centralized patient profile
- Medical history and visit tracking
- Vitals capture
- Lab report visibility
- Prescription generation
- AI-assisted diagnosis suggestions
- Speech-to-text and consultation intelligence
- Role-based access

For this prototype, we will not build the real system. We will build a static website that convincingly demonstrates how the system would work. The website should feel investor-ready, pitch-ready, and easy to click through during meetings or demos.

## Core Objective
Create a static GitHub Pages website prototype that:

- Explains the product clearly
- Shows the end-to-end clinic workflow
- Demonstrates separate experiences for doctor, compounder, and patient
- Presents AI features as demo content, not real medical output
- Uses polished mock data and believable UI states
- Works fully without any backend, database, login service, or API

## Prototype Positioning
The prototype should be presented as a product vision and workflow demo, not as a live medical application.

The tone should communicate:

- Modern healthcare operations
- Trust and clarity
- Simplicity for busy clinics
- AI as assistance, not replacement
- Strong support for Indian clinic workflows

## Mandatory Constraints
These are non-negotiable constraints for the build:

- Hosting target is GitHub Pages
- Site must be fully static
- No backend
- No real authentication
- No real OTP
- No real database
- No real file uploads
- No real AI calls
- No live APIs
- No secrets or environment-dependent runtime behavior required to view the demo
- All data must be mocked locally
- All "AI" outputs must be clearly labeled as sample suggestions or prototype content
- Routing must work on GitHub Pages without server-side rewrite rules

## Recommended Technical Direction
Follow the technical direction already captured in `tech-stack.md`.

### Stack
- Vite
- React
- TypeScript
- Tailwind CSS
- `react-router-dom` with `HashRouter`
- `lucide-react` for icons

### Why This Stack
- Vite gives a fast setup and simple static build output
- React makes it easy to create reusable screens and prototype flows
- TypeScript helps structure the mock data and role-specific UI
- Tailwind helps produce a polished interface quickly
- Hash-based routing avoids GitHub Pages refresh and route issues

## Product Story the Site Must Communicate
The prototype should make the following story obvious within the first few minutes:

1. Clinics often operate with fragmented patient data and manual workflows.
2. Compounders or nurses gather intake details and vitals.
3. Doctors need full patient context quickly before consultation.
4. Patients need access to their history, prescriptions, and reports.
5. AI can help summarize, suggest, and organize information, but the doctor remains in control.
6. A unified platform can improve efficiency, continuity, and quality of care.

## Audience
The primary audience for the prototype is likely:

- Founder discussions
- Early technical execution
- Investor or advisor demos
- Pilot clinic conversations
- Design and product alignment

The prototype should therefore optimize for clarity and credibility over feature count.

## Success Criteria
The prototype is successful if:

- A viewer can understand the product in under 2 minutes
- A viewer can click through doctor, compounder, and patient journeys without confusion
- The AI-enabled value proposition feels concrete
- The site looks polished enough to share publicly
- The site works on mobile and desktop
- Another agent can implement the prototype from this document without needing a new planning round

## Non-Goals
The following are explicitly out of scope for this prototype:

- Real medical decision support
- Actual speech-to-text
- Real consultation recording
- Real report parsing
- Real lab integrations
- Real appointment booking engine
- Secure patient data storage
- HIPAA-grade implementation
- Real compliance workflows
- Billing or subscription engine
- Production-ready architecture
- Mobile apps

## Product Scope for Prototype V1
Prototype V1 should include:

- A landing page
- A product overview section
- A role-based clickable demo
- A doctor dashboard demo
- A compounder dashboard demo
- A patient dashboard demo
- A consultation flow demo
- A patient profile and history demo
- A vitals and check-in demo
- A prescriptions and reports demo
- A section showing AI-generated sample insights
- A workflow overview section
- A deployment setup for GitHub Pages

Prototype V1 may optionally include:

- A mock login or role selection screen
- A timeline or roadmap section
- A market or pricing section
- A "how it works" animation or stepper

## Product Narrative
The site should guide the user through this sequence:

### Narrative Step 1: Problem
Show that current clinic workflows are fragmented, time-constrained, and dependent on scattered data.

### Narrative Step 2: Platform
Introduce the platform as a centralized digital health record and clinical workflow layer.

### Narrative Step 3: Roles
Show that the system serves three connected stakeholders:

- Compounder captures intake and vitals
- Doctor reviews history and finalizes treatment
- Patient sees prescriptions and records

### Narrative Step 4: AI Assist
Show how AI adds value:

- Suggesting likely diagnoses
- Surfacing risk flags
- Drafting prescriptions
- Summarizing consultation context

All of this must be shown as assistive and reviewable by the doctor.

### Narrative Step 5: Future Potential
Show the broader vision:

- Clinic operating system
- Better continuity of care
- Scalable workflows
- Better patient record access

## Information Architecture
The site should be organized into the following routes or screens.

## Route Map
Use `HashRouter` and treat the following as the canonical route map:

| Route | Purpose |
| --- | --- |
| `#/` | Marketing landing page and entry into role demos |
| `#/overview` | Optional deeper explanation of product, workflow, and value proposition |
| `#/roles` | Optional role selection hub |
| `#/doctor` | Doctor dashboard and doctor workflow demo |
| `#/compounder` | Compounder dashboard and intake workflow demo |
| `#/patient` | Patient dashboard and self-service records demo |
| `#/consultation` | End-to-end consultation and AI assistance demo |
| `#/history` | Patient history and longitudinal records demo |
| `#/ai-insights` | Dedicated AI sample outputs and explanation page |
| `#/workflow` | Step-by-step clinic workflow summary |

Not every route must exist as a separate page if the implementation is cleaner with shared layouts, but all of these experiences must exist.

## Detailed Page Requirements

## 1. Landing Page (`#/`)
The landing page is the most important page. It should immediately explain what the platform is and why it matters.

### Landing Page Goals
- Establish trust
- Explain the product in one screen
- Show the three user roles
- Introduce AI assistance carefully
- Drive the user into the clickable demo

### Landing Page Sections
- Hero section
- Problem statement
- Solution overview
- Three-role system section
- AI assistance section
- End-to-end clinic workflow section
- Screens preview section
- Call-to-action section linking into demo pages

### Hero Content Requirements
The hero should include:

- Product name placeholder or working title
- One clear headline
- One supporting subheadline
- One sentence that emphasizes doctor control over AI outputs
- Primary CTA: "View Demo"
- Secondary CTA: "Explore Workflows"

### Suggested Messaging Direction
Headline example direction:
"One connected clinic workflow for doctors, staff, and patients."

Supporting message direction:
"A digital health record and AI-assisted consultation platform designed to help clinics capture vitals, review history, and create faster, more informed care workflows."

### Visual Requirements
- Use a premium but clean healthcare design language
- Avoid generic template styling
- Use dashboard previews, role cards, and workflow visuals
- Use subtle background depth, gradients, and structured spacing

## 2. Product Overview (`#/overview`)
This page or section explains the broader product logic in more detail.

### Must Explain
- Fragmented records problem
- Role-based coordination
- Centralized patient profile
- AI-assisted consultation support
- Report and prescription continuity

### Recommended Blocks
- Problem cards
- Solution pillars
- Why clinics benefit
- Why patients benefit
- Why doctors benefit

## 3. Role Hub (`#/roles`)
This page should help the viewer choose a role-based experience.

### Role Cards
Create one card each for:

- Doctor
- Compounder
- Patient

Each card should contain:

- One icon
- One short summary
- One list of key actions
- A "View Demo" CTA

## 4. Doctor Experience (`#/doctor`)
This is the richest and most important role page.

### Doctor Story
The doctor sees the patient queue, reviews history, reads vitals, writes notes, reviews AI suggestions, and finalizes the prescription.

### Doctor Page Must Include
- Dashboard summary header
- Today's patient queue
- Search patient control
- Recent consultations area
- Patient profile preview
- Vitals section
- Medical history panel
- Lab report panel
- Consultation notes panel
- AI suggestion panel
- Draft prescription panel
- Final prescription state

### Doctor Dashboard Widgets
- Total patients today
- Waiting for consultation
- Follow-ups due
- Recent lab reports
- AI review ready

### Patient Profile Card Must Show
- Name
- Age
- Gender
- Phone number
- Unique patient ID
- Last visit date
- Risk badge or condition tag if useful

### History Area Must Show
- Previous visits
- Past prescriptions
- Existing conditions
- Recent lab uploads
- Allergies if included in mock data

### AI Assist Area Must Show
- Suggested symptoms extracted
- Probable condition suggestions
- Suggested tests
- Risk alerts
- Draft prescription recommendation

### Safety Note Requirement
The page must explicitly state:
"AI-generated suggestions are sample prototype outputs for demonstration. Final diagnosis and prescription remain under doctor review."

## 5. Compounder Experience (`#/compounder`)
This page should feel faster, more operational, and task-oriented.

### Compounder Story
The compounder checks in patients, searches or adds a patient, records vitals, updates basic details, and marks the patient ready for the doctor.

### Compounder Page Must Include
- Dashboard header
- Check-in queue
- Search/add patient module
- Vitals entry card
- Basic symptom or intake note field
- Ready-for-doctor status state
- Queue progression view

### Vitals to Include
- Blood pressure
- Sugar level
- Temperature
- Pulse rate
- Weight is optional but useful
- Oxygen saturation is optional but useful

### Access Limitation Messaging
This page should visually reinforce that the compounder cannot:

- Finalize diagnosis
- Issue prescription
- Override doctor decisions

### UI Tone
- Fast
- Simple
- Operational
- Minimal distractions

## 6. Patient Experience (`#/patient`)
This page should feel calm, clear, and easy to understand.

### Patient Story
The patient logs in, views profile details, sees visit history, opens prescriptions, and reviews lab reports and appointment reminders.

### Patient Page Must Include
- Profile summary
- Medical history timeline
- Prescriptions list
- Lab reports list
- Appointment or reminder card
- Notifications or alerts area

### Prescription View
Show:

- Doctor name
- Date
- Medicines
- Dosage instructions
- Follow-up recommendation
- Download button visual

### Lab Reports View
Show:

- Report title
- Date
- Status
- Preview or thumbnail
- Download or view action visual

### Patient UX Requirements
- Non-technical language
- Highly legible typography
- Clear section labels
- Trust-building presentation

## 7. Consultation Flow (`#/consultation`)
This page is where the product story becomes concrete.

### Purpose
Show the end-to-end clinic flow in one guided experience.

### Required Step Sequence
1. Patient arrives or is selected
2. Compounder checks in patient
3. Vitals are recorded
4. Doctor opens patient history
5. Consultation notes are added
6. AI sample suggestions appear
7. Doctor edits or approves final prescription
8. Patient record updates
9. Patient can later view the prescription

### Recommended Interaction Pattern
- Use a stepper or side-by-side multi-panel guided flow
- Allow moving step-by-step with buttons or clickable progress indicators
- Keep the flow deterministic

## 8. History View (`#/history`)
This page should focus on longitudinal record continuity.

### Must Include
- Visit timeline
- Chronic condition markers
- Prescription history
- Recent vitals trend cards
- Report archive

### Purpose
This page reinforces one of the strongest product claims:
the doctor no longer works with fragmented information.

## 9. AI Insights (`#/ai-insights`)
This page exists to explain AI clearly and responsibly.

### Must Include
- A short explanation of what the AI is intended to do
- Sample consultation summary
- Sample extracted symptoms
- Sample diagnosis suggestions
- Sample risk flags
- Sample prescription draft
- Clear disclaimer that outputs are mock examples

### Positioning Requirements
The messaging should say that AI:

- Speeds up review
- Organizes signals
- Suggests likely next steps
- Does not replace clinical judgment

## 10. Workflow Summary (`#/workflow`)
This page should communicate the operational loop in a clean visual format.

### Workflow Stages
- Register or login
- Patient arrives
- Compounder checks in patient
- Vitals added
- Doctor reviews full history
- AI sample support appears
- Doctor finalizes prescription
- Patient accesses records later

### Best Presentation Options
- Horizontal process timeline on desktop
- Vertical step stack on mobile
- Optional simple animation

## Mock Data Requirements
The prototype should feel believable. Data quality matters.

### General Rules
- Use realistic but obviously fictional names
- Avoid any real patient data
- Keep dates coherent across flows
- Ensure every route references the same patient dataset
- Maintain continuity between compounder, doctor, patient, and consultation screens

### Required Mock Entities
Define frontend-only types and mock data for:

- `Patient`
- `PatientProfile`
- `VisitRecord`
- `Vitals`
- `Prescription`
- `LabReport`
- `Notification`
- `Appointment`
- `AiSuggestion`
- `ClinicUser`
- `ConsultationStep`

### Minimum Dataset Expectations
- 5 to 8 patients
- 3 to 5 prior visits for at least one primary demo patient
- 2 to 4 prescriptions
- 2 to 3 lab reports
- 1 fully connected demo consultation journey
- 1 queue of waiting patients

### Primary Demo Patient
Choose one flagship patient whose full story appears across the entire demo.

That patient should have:

- Basic demographic data
- Past visit history
- Current vitals
- One active complaint
- One or two lab reports
- One AI suggestion set
- One final prescription

## Content Design Requirements
This prototype is part product presentation and part interface demo. Copy needs to be deliberate.

### Copy Tone
- Professional
- Clear
- Trustworthy
- Modern
- Not overly technical
- Not overclaiming AI

### Avoid
- Hype-heavy AI language
- Claims that imply autonomous diagnosis
- Vague enterprise jargon
- Overcrowded text blocks

### Use
- Clear action verbs
- Concrete workflow language
- Clinical-assistant framing
- Concise UI labels

## Visual and UX Direction
The UI should feel intentional and premium, not like a default dashboard starter kit.

### Design Principles
- Calm and trustworthy
- Structured and information-rich
- Clear hierarchy
- Fast to scan
- Friendly to both desktop and mobile

### Recommended Style Direction
- Light theme by default
- Soft neutral background with a strong accent color
- Clean card-based layouts
- Good spacing rhythm
- Distinct role color cues

### Suggested Role Color System
- Doctor: deep blue or teal
- Compounder: amber or orange
- Patient: green or cyan

### Typography Direction
- Avoid generic-looking defaults if possible
- Use one strong heading font and one readable body font
- Keep medical information highly legible

### Motion
Use subtle motion only where it supports understanding:

- Hero entrance
- Workflow progression
- Card reveal
- Route transition polish

Do not overanimate.

## Accessibility Requirements
Even for a prototype, basic accessibility should be respected.

### Must Have
- Good color contrast
- Keyboard-accessible navigation
- Visible focus styles
- Semantic headings
- Buttons and links labeled clearly
- Responsive layout

## Technical Architecture

## Application Structure
Use a simple React SPA with route-based pages and shared UI components.

### Suggested File Structure
```text
/
  docs/
    plans/
  public/
  src/
    app/
      router.tsx
    components/
      layout/
      navigation/
      cards/
      charts/
      demo/
      ui/
    data/
      patients.ts
      consultations.ts
      reports.ts
      prescriptions.ts
      ai.ts
      dashboard.ts
    pages/
      LandingPage.tsx
      OverviewPage.tsx
      RolesPage.tsx
      DoctorPage.tsx
      CompounderPage.tsx
      PatientPage.tsx
      ConsultationPage.tsx
      HistoryPage.tsx
      AiInsightsPage.tsx
      WorkflowPage.tsx
    styles/
      globals.css
    types/
      index.ts
    utils/
      format.ts
  .github/
    workflows/
      deploy.yml
```

### Routing
Use `HashRouter`.

Do not use browser history routing unless GitHub Pages rewrite handling is intentionally added later.

### State Management
Use simple local state only.

Good options:

- Static imported mock data
- Minimal `useState` for stepper interactions
- No Redux or heavy client state library

### Data Flow
- Pages read from central mock data modules
- Shared demo components render consistent patient data
- Any UI interaction updates view state only
- No persistence is required

## Reusable Components to Build
The implementation should prefer reusable components over one-off duplicated markup.

### Core Layout Components
- Site shell
- Top navigation
- Sidebar navigation for dashboard pages
- Mobile menu
- Section container
- Page header

### Shared UI Components
- Metric card
- Role card
- Timeline card
- Vitals card
- Patient summary card
- Prescription card
- Report card
- AI insight card
- Queue list
- Badge
- Stepper
- Demo disclaimer banner

### Optional Data Visualization Components
- Mini vitals trend line
- Timeline
- Status chip group
- Funnel or process diagram

Charts should remain static or very light.

## Implementation Guidelines

## General Build Guidelines
- Start from a clean Vite React TypeScript app
- Configure Tailwind properly
- Establish design tokens early
- Build shared layout and data models first
- Implement landing page before dashboards
- Reuse the same demo patient across screens
- Keep interactions deterministic

## GitHub Pages Guidelines
- Ensure the project builds to `dist`
- Verify asset paths work when hosted from a repository path
- Prefer relative-safe asset use via Vite
- Use `HashRouter`
- Add GitHub Actions deploy workflow

### Deployment Expectation
The site should be deployable from the default branch to GitHub Pages automatically after build.

## Implementation Phases

## Phase 1: Project Setup
Deliverables:

- Vite React TypeScript app initialized
- Tailwind configured
- Base layout structure in place
- Hash routing configured
- Initial theme tokens established
- GitHub Actions deploy workflow added

Definition of done:

- `npm install` works
- `npm run dev` works
- `npm run build` works

## Phase 2: Data and Domain Layer
Deliverables:

- Shared TypeScript types
- Mock data modules
- One coherent flagship patient journey
- Role-specific dashboard data

Definition of done:

- All pages can render from shared mock data without placeholder gaps

## Phase 3: Landing and Overview
Deliverables:

- Landing page complete
- Product overview section complete
- Role hub complete
- Navigation between story and demo screens complete

Definition of done:

- A new viewer can understand the concept and reach demo routes quickly

## Phase 4: Role-Based Dashboards
Deliverables:

- Doctor page complete
- Compounder page complete
- Patient page complete

Definition of done:

- Each role page feels distinct
- Each role page matches the documented workflow

## Phase 5: Guided Demo Flow
Deliverables:

- Consultation page complete
- History page complete
- AI insights page complete
- Workflow page complete

Definition of done:

- The complete clinic story can be shown in sequence

## Phase 6: Polish and Release Readiness
Deliverables:

- Responsive refinements
- Accessibility improvements
- Copy cleanup
- Final visual polish
- Final deploy validation

Definition of done:

- Site is publicly shareable
- No obvious broken states remain

## Page-by-Page Acceptance Criteria

## Landing Page Acceptance Criteria
- Clearly communicates the product in one scroll
- Shows doctor, compounder, and patient roles
- Has at least two clear navigation actions into the demo
- Looks polished on mobile and desktop

## Doctor Page Acceptance Criteria
- Shows patient queue and patient history
- Shows current vitals
- Shows AI sample suggestions
- Shows final prescription output
- Includes doctor-control disclaimer

## Compounder Page Acceptance Criteria
- Shows patient search or add flow
- Shows vitals entry
- Shows ready-for-doctor state
- Makes permission limitations clear

## Patient Page Acceptance Criteria
- Shows profile, prescriptions, and reports
- Feels simple and understandable
- Includes a timeline or list of medical history

## Consultation Page Acceptance Criteria
- Clearly shows the sequence from check-in to prescription
- Allows easy step-by-step demoing
- Maintains continuity with shared data

## AI Insights Page Acceptance Criteria
- Clearly labels all AI content as sample prototype output
- Shows at least symptoms, suggestions, tests, and prescription draft
- Avoids misleading clinical certainty

## Quality Bar
The prototype should feel:

- More polished than a wireframe
- More credible than a student project
- Less complex than a real SaaS product
- Smooth enough for founder demos

## Content Risks to Avoid
- Screens that imply real diagnosis accuracy
- Empty dashboard cards with meaningless filler
- Too many features that break narrative focus
- Inconsistent patient details between pages
- Generic stock-dashboard design
- Overly dark or visually heavy UI for a healthcare product

## Known Product Assumptions
These assumptions were made from the provided documents and should guide implementation unless the user overrides them later.

- The immediate goal is a web prototype, not native mobile
- The immediate deliverable is static and shareable, not functional end-to-end software
- The three user roles are core and must all appear
- AI value should be visible but carefully framed
- Phone-based login can be shown visually, but should not be implemented
- Compounder accounts are created by doctors in the real product concept, but the prototype only needs to demonstrate that relationship
- Patient appointment handling is optional and lower priority than history, reports, and prescription access
- Indian clinic workflow relevance should influence copy and flow design, but the UI should still feel broadly professional and internationally understandable

## Suggested Demo Script
This helps another agent or presenter understand how the prototype should be experienced.

1. Open landing page.
2. Explain the fragmented clinic workflow problem.
3. Show the three connected roles.
4. Enter the compounder view and show check-in plus vitals.
5. Enter the doctor view and show full history plus AI sample assistance.
6. Open consultation flow and show prescription finalization.
7. Enter patient view and show prescriptions and reports.
8. End on workflow or AI insights page to reinforce the product vision.

## Stretch Goals
Only add these if core execution is already strong.

- Animated patient journey walkthrough
- Before-and-after clinic workflow comparison
- Market or pricing page
- Founder pitch footer section
- Demo mode toggle or role switcher
- Simulated voice transcript card on the AI page

## Final Delivery Checklist for the Implementation Agent
- Build a React + TypeScript + Tailwind static prototype
- Use `HashRouter`
- Keep all data local and mocked
- Create landing, role, and workflow demo pages
- Include doctor, compounder, and patient experiences
- Include AI sample output with disclaimers
- Ensure the prototype is polished and responsive
- Add GitHub Pages deployment workflow
- Keep code organized and easy to extend

## Explicit Do Not Build List
- Backend services
- Real auth
- Real OTP verification
- Real data persistence
- Real medical AI
- Real uploads
- Real PDF generation
- Real appointment engine
- Real analytics dashboards
- Overengineered state management

## Handoff Instruction
If another agent is given this file, that agent should treat it as the authoritative plan for the prototype and execute in this order:

1. Project setup and deployment foundation
2. Shared types, data, and layout system
3. Landing and overview pages
4. Role dashboards
5. Guided consultation and AI pages
6. Responsive polish and final QA

## Naming Suggestion for the Plan
When referring to this work internally, use:

`Static AI Healthcare Prototype for GitHub Pages`

## Branch Naming Reminder
If implementation starts in git, branch names should begin with:

`vivswanshah/`

## Final Summary
Build a static, polished React-based GitHub Pages prototype that demonstrates an AI-assisted healthcare workflow platform for doctors, compounders, and patients. The site should be story-first, demo-friendly, visually credible, and fully powered by mock data. It should communicate the product vision clearly while avoiding any implication that real medical AI or real patient operations are already implemented.
