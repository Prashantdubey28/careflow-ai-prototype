import { useDemo, DEMO_USERS } from '../../context/DemoContext'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Heart, Users, Activity, ArrowRight, Brain, Shield, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import type { ClinicUser } from '../../types'

const roles = [
  {
    key: 'compounder',
    icon: Heart,
    color: 'bg-compounder',
    lightBg: 'bg-compounder-light',
    textColor: 'text-compounder',
    label: 'Compounder',
    desc: 'Ravi Kumar — Senior Compounder',
    summary: 'Manage check-ins, chief complaints, and vitals before the doctor handoff.',
  },
  {
    key: 'doctor',
    icon: Stethoscope,
    color: 'bg-doctor',
    lightBg: 'bg-doctor-light',
    textColor: 'text-doctor',
    label: 'Doctor',
    desc: 'Dr. Kavitha Menon — General Medicine',
    summary: 'Review patient context, use AI-assisted clinical support, and complete prescriptions.',
  },
  {
    key: 'patient',
    icon: Users,
    color: 'bg-patient',
    lightBg: 'bg-patient-light',
    textColor: 'text-patient',
    label: 'Patient',
    desc: 'Ananya Sharma — Patient Portal',
    summary: 'Access prescriptions, lab reports, visit history, and upcoming appointments.',
  },
]

export function DemoEntrySection() {
  const { dispatch } = useDemo()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>('compounder')
  const selectedRole = roles.find((role) => role.key === selected)

  function login(roleKey: string) {
    const user = DEMO_USERS[roleKey] as ClinicUser
    dispatch({ type: 'RESET_DEMO' })
    dispatch({ type: 'SELECT_ROLE', user })
    navigate('/app/dashboard')
  }

  return (
    <section id="demo-entry" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="reveal-up">
          <div className="section-kicker">
            <Activity className="h-3.5 w-3.5 text-doctor" />
            Workspace Access
          </div>

          <h2 className="mt-6 text-4xl font-bold text-text-primary md:text-5xl">
            Choose your workspace
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-text-secondary">
            Open the role you want to use. Each workspace connects to the same patient record and care timeline.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: Activity, title: 'Shared patient context', text: 'Check-in, vitals, consultation notes, prescriptions, and reports remain connected across the clinic.' },
              { icon: Brain, title: 'AI-assisted doctor workflow', text: 'AI helps the doctor summarize context, surface risks, and prepare next steps for review.' },
            ].map((item) => (
              <div key={item.title} className="premium-panel rounded-[1.5rem] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-doctor/10 text-doctor">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.3)]">
            <div className="flex items-center gap-2 text-teal-200">
              <Shield className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Clinical Oversight</p>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <p>AI supports doctors with summaries, context review, and draft suggestions.</p>
              <p>Final diagnoses, consultation notes, and prescriptions remain under physician control.</p>
            </div>
          </div>
        </div>

        <div className="premium-panel reveal-up-delay rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Select Workspace</p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">Open the clinic platform</h2>
              <p className="mt-2 text-sm text-text-secondary">Choose the workspace you want to use right now.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {roles.map((role) => (
              <button
                key={role.key}
                onClick={() => setSelected(role.key)}
                className={`flex w-full items-start gap-4 rounded-[1.5rem] border p-5 text-left transition ${
                  selected === role.key
                    ? `${role.lightBg} border-current ${role.textColor} shadow-[0_18px_40px_rgba(15,23,42,0.08)]`
                    : 'border-border bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className={`rounded-2xl ${role.lightBg} p-3`}>
                  <role.icon className={`h-6 w-6 ${role.textColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary">{role.label}</p>
                  <p className="mt-1 text-sm text-text-secondary">{role.desc}</p>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{role.summary}</p>
                </div>
                {selected === role.key && <div className={`mt-1 h-3 w-3 rounded-full ${role.color}`} />}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-border bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-doctor" />
              <p className="text-sm font-semibold text-text-primary">Current selection</p>
            </div>
            {selectedRole && (
              <div className="mt-3 space-y-3">
                <p className="text-lg font-bold text-text-primary">{selectedRole.label}</p>
                <p className="text-sm leading-6 text-text-secondary">{selectedRole.summary}</p>
                <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-800">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  You can switch roles anytime from the top navigation without leaving the shared care workflow.
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => selected && login(selected)}
            disabled={!selected}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-doctor py-4 text-base font-semibold text-white shadow-lg shadow-doctor/25 transition hover:-translate-y-0.5 hover:bg-teal-700 disabled:opacity-40 disabled:shadow-none"
          >
            Enter Platform <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-4 text-center text-xs text-text-secondary">
            AI-assisted features support doctor review and do not replace clinical judgment.
          </p>
        </div>
      </div>
    </section>
  )
}
