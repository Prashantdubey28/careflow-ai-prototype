import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, ArrowRight, Brain, CheckCircle, FileText, Shield, Users, Workflow } from 'lucide-react'
import { DemoEntrySection } from '../components/ui/DemoEntrySection'

const featureBlocks = [
  {
    icon: Brain,
    color: 'text-doctor',
    title: 'AI supports the doctor',
    body: 'AI helps the doctor review context, summarize findings, and prepare next steps without replacing clinical judgment.',
  },
  {
    icon: FileText,
    color: 'text-patient',
    title: 'Patients can access live reports',
    body: 'Lab reports, prescriptions, visit history, and follow-up information stay available to patients in the portal.',
  },
  {
    icon: Users,
    color: 'text-compounder',
    title: 'All three roles in one platform',
    body: 'Compounder, doctor, and patient work inside the same connected system instead of passing information across separate tools.',
  },
  {
    icon: Workflow,
    color: 'text-doctor',
    title: 'Unified workflow and continuity',
    body: 'JeevX keeps the care journey systematic, removes fragmented data, and preserves continuity from intake to follow-up.',
  },
]

const workspaceBlocks = [
  {
    title: 'Front desk and intake',
    body: 'Manage the queue, capture complaints, and record vitals in the same patient record the doctor will continue using.',
  },
  {
    title: 'Doctor workspace',
    body: 'Review patient history, current vitals, AI-assisted insights, consultation notes, and prescriptions without losing context.',
  },
  {
    title: 'Patient portal',
    body: 'Give patients ongoing access to live reports, prescriptions, visit history, and appointments after each visit.',
  },
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
              Connected Clinic Platform
            </div>

            <h1 className="max-w-3xl text-4xl font-bold text-text-primary md:text-6xl">
              One connected platform for compounders, doctors, and patients
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              JeevX gives clinics a unified workflow from intake to consultation to follow-up, reducing fragmented data and maintaining care continuity.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'AI helps the doctor with context, summaries, and next-step suggestions without replacing the doctor.',
                'Patients can access live reports, prescriptions, and visit updates directly in the portal.',
                'Compounder, doctor, and patient all work in one unified platform with connected handoffs.',
                'A systematic workflow removes fragmented data and preserves continuity across the full care journey.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-doctor" />
                  <p className="text-sm leading-6 text-text-secondary">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/?entry=1" className="inline-flex items-center gap-2 rounded-2xl bg-doctor px-7 py-4 text-base font-semibold text-white shadow-lg shadow-doctor/20 transition hover:-translate-y-0.5 hover:bg-teal-700">
                Open Platform <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="rounded-full border border-doctor/15 bg-white px-4 py-2 text-sm text-text-secondary shadow-sm">
                AI supports doctors with summaries and guidance while clinical decisions stay with the physician.
              </div>
            </div>
          </div>

          <div className="premium-panel reveal-up-delay relative rounded-[2rem] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Unified Workspace</p>
                <h2 className="mt-2 text-2xl font-bold text-text-primary">Everything needed for a clinic visit in one system</h2>
              </div>
            </div>

            <div className="grid gap-3">
              {workspaceBlocks.map((block) => (
                <div key={block.title} className="rounded-2xl border border-border/80 bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm font-semibold text-text-primary">{block.title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{block.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.32)]">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-teal-300" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">AI-Assisted Care</p>
                  <p className="mt-1 text-lg font-semibold">AI helps the doctor and does not replace the doctor</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-300">
                JeevX uses AI to summarize context, surface risks, and prepare draft next steps for review. Final diagnoses, notes, and prescriptions remain under physician control.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureBlocks.map((block) => (
            <div key={block.title} className="premium-panel rounded-[1.75rem] p-6">
              <block.icon className={`mb-4 h-8 w-8 ${block.color}`} />
              <h3 className="text-lg font-bold text-text-primary">{block.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoEntrySection />
    </div>
  )
}
