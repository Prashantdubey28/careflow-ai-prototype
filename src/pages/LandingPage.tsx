import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, ArrowRight, Stethoscope, Heart, Users, Brain, Shield, ClipboardList, CheckCircle, Clock, FileText } from 'lucide-react'
import { DemoEntrySection } from '../components/ui/DemoEntrySection'

const storyStats = [
  { value: '3', label: 'roles united in one workflow', note: 'Doctor, compounder, and patient views stay connected.' },
  { value: '1', label: 'flagship longitudinal record', note: 'Ananya Sharma anchors the full demo narrative.' },
  { value: '<3 min', label: 'guided investor walkthrough', note: 'The product story lands quickly without setup overhead.' },
  { value: 'AI + human', label: 'assistive decision model', note: 'Every AI surface stays under clinician review.' },
]

const proofBlocks = [
  {
    icon: ClipboardList,
    color: 'text-compounder',
    title: 'Reduce handoff friction',
    body: 'Intake notes, vitals, and chief complaint move forward in one shared record instead of being re-entered across roles.',
  },
  {
    icon: Brain,
    color: 'text-doctor',
    title: 'Give doctors richer context',
    body: 'Historical trends, recent vitals, lab summaries, and AI-assisted suggestions appear together at consultation time.',
  },
  {
    icon: FileText,
    color: 'text-patient',
    title: 'Extend the visit after discharge',
    body: 'Patients can view prescriptions, lab results, and follow-up steps, turning the encounter into a retention loop.',
  },
]

const roleCards = [
  {
    icon: Stethoscope,
    color: 'text-doctor',
    title: 'For Doctors',
    points: ['Longitudinal patient context at a glance', 'Assistive AI suggestions with clear oversight', 'Faster prescription finalization and visit closure'],
  },
  {
    icon: Heart,
    color: 'text-compounder',
    title: 'For Compounders',
    points: ['Queue visibility with intake status tracking', 'Vitals capture that rolls forward to the doctor', 'Clear permission boundaries for safer workflow design'],
  },
  {
    icon: Users,
    color: 'text-patient',
    title: 'For Patients',
    points: ['Digital access to prescriptions and lab reports', 'A transparent visit history tied to the same care episode', 'Follow-up reminders that support repeat engagement'],
  },
]

const investorSignals = [
  {
    icon: Activity,
    title: 'System Of Record Wedge',
    body: 'The strongest investor angle here is not “an AI chatbot for clinics,” but a workflow product that becomes the operating surface for every visit.',
  },
  {
    icon: Brain,
    title: 'Assistive AI, Not Autonomous Care',
    body: 'The prototype shows AI in the right place: summarizing context and suggesting next steps while keeping physicians in control of every decision.',
  },
  {
    icon: Shield,
    title: 'Trust And Compliance Posture',
    body: 'Every AI output is disclosed, role boundaries are explicit, and the patient view reinforces transparency instead of replacing clinicians.',
  },
]

const visitFlow = [
  { step: '01', title: 'Compounder Intake', desc: 'Queue, chief complaint capture, and vitals recording create the first structured touchpoint.', icon: ClipboardList, tone: 'bg-compounder/12 text-compounder' },
  { step: '02', title: 'Doctor Review', desc: 'History, labs, AI assistance, and prescription drafting come together in one consultation surface.', icon: Stethoscope, tone: 'bg-doctor/12 text-doctor' },
  { step: '03', title: 'Patient Follow-Through', desc: 'The visit closes with prescription access, lab visibility, and next-step reminders in the portal.', icon: Users, tone: 'bg-patient/12 text-patient' },
]

export function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (new URLSearchParams(location.search).get('entry') !== '1') return

    window.requestAnimationFrame(() => {
      document.getElementById('demo-entry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.search])

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden px-4 pb-12 pt-12 md:pt-20">
        <div className="ambient-orb -left-16 top-8 h-40 w-40 bg-doctor/25" />
        <div className="ambient-orb right-0 top-28 h-48 w-48 bg-compounder/18" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-up">
            <div className="section-kicker mb-6">
              <Activity className="h-3.5 w-3.5 text-doctor" />
              Investor Demo Prototype
            </div>

            <h1 className="max-w-3xl text-4xl font-bold text-text-primary md:text-6xl">
              The operating system for outpatient clinics, with AI where it earns trust
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              JeevX connects intake, consultation, and patient follow-through in one continuous workflow so clinics can move faster without losing clinical control.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Start with front-desk intake, then show the doctor workflow, then close in the patient portal.',
                'Use Ananya Sharma as the continuity thread so investors can feel the longitudinal value immediately.',
                'Keep the AI story assistive and physician-led, which makes the product feel credible instead of speculative.',
                'Frame the wedge as workflow infrastructure, not just another charting interface.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-doctor" />
                  <p className="text-sm leading-6 text-text-secondary">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/?entry=1" className="inline-flex items-center gap-2 rounded-2xl bg-doctor px-7 py-4 text-base font-semibold text-white shadow-lg shadow-doctor/20 transition hover:-translate-y-0.5 hover:bg-teal-700">
                Launch Live Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="rounded-full border border-border bg-white px-4 py-2 text-sm text-text-secondary shadow-sm">
                Recommended order: Compounder → Doctor → Patient
              </div>
            </div>
          </div>

          <div className="premium-panel reveal-up-delay relative rounded-[2rem] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Live Storyboard</p>
                <h2 className="mt-2 text-2xl font-bold text-text-primary">One patient, one workflow, three role moments</h2>
              </div>
              <div className="rounded-2xl bg-doctor/10 px-3 py-2 text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-doctor">Flagship Case</p>
                <p className="text-sm font-semibold text-text-primary">Ananya Sharma</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {storyStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/80 bg-white px-4 py-4 shadow-sm">
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">{stat.label}</p>
                  <p className="mt-2 text-xs leading-5 text-text-secondary">{stat.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.32)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Demo Arc</p>
                  <p className="mt-1 text-lg font-semibold">A clear narrative investors can follow in real time</p>
                </div>
                <Clock className="h-5 w-5 text-teal-300" />
              </div>

              <div className="mt-5 space-y-4">
                {visitFlow.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.step}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-slate-300">
                AI assists the doctor with summaries, risks, and draft next steps. Final diagnoses and prescriptions remain under physician control.
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoEntrySection />

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {proofBlocks.map((block) => (
            <div key={block.title} className="premium-panel rounded-[1.75rem] p-6">
              <block.icon className={`mb-4 h-8 w-8 ${block.color}`} />
              <h3 className="text-lg font-bold text-text-primary">{block.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-18">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.24)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Investor Lens</p>
            <h2 className="mt-4 text-3xl font-bold">What makes this more compelling than a generic health-tech UI</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The product story gets stronger when it is framed as workflow infrastructure. The AI surfaces matter because they sit inside a sticky operating loop, not because they exist on their own.
            </p>

            <div className="mt-8 space-y-4">
              {investorSignals.map((signal) => (
                <div key={signal.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <signal.icon className="h-5 w-5 text-teal-300" />
                    <h3 className="font-semibold text-white">{signal.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{signal.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="premium-panel rounded-[2rem] p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Role Value</p>
              <h2 className="mt-4 text-3xl font-bold text-text-primary">Each persona proves a different part of the moat</h2>
              <div className="mt-8 grid gap-5">
                {roleCards.map((block) => (
                  <div key={block.title} className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <block.icon className={`h-7 w-7 ${block.color}`} />
                      <h3 className="text-lg font-bold text-text-primary">{block.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm leading-6 text-text-secondary">
                          <CheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${block.color}`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-gradient-to-r from-doctor to-teal-700 p-8 text-white shadow-[0_22px_60px_rgba(13,148,136,0.22)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-100">Care Episode Flow</p>
              <h2 className="mt-3 text-2xl font-bold">How the live demo should feel</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {visitFlow.map((step) => (
                  <div key={step.step} className="rounded-2xl border border-white/15 bg-white/8 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">{step.step}</p>
                    <p className="mt-2 text-base font-semibold">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-teal-50">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-doctor p-8 text-white shadow-[0_32px_90px_rgba(15,23,42,0.28)] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-100">Ready To Present</p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">Show the full clinic journey as a connected, investor-legible product story</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
                Open the demo, start with intake, move to the doctor command center, then close in the patient portal. The product will feel more like a durable platform and less like a collection of screens.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-teal-200" />
                <p className="text-sm font-semibold">Important framing for the room</p>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <p>All data is fictional and every AI output is clearly marked as assistive.</p>
                <p>The value proposition is workflow continuity, operational leverage, and stronger patient follow-through.</p>
                <p>This prototype is strongest when presented as a wedge into clinic operations with expansion paths into documentation, engagement, and decision support.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/?entry=1" className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-50">
            Launch Live Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
