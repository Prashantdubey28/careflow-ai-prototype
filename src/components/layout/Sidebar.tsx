import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDemo } from '../../context/DemoContext'
import {
  LayoutDashboard, Users, ClipboardList, Brain, Clock,
  Pill, FileText, Calendar, Heart, Stethoscope, Activity,
} from 'lucide-react'

const doctorLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/ai-insights', label: 'AI Insights', icon: Brain },
  { to: '/app/history', label: 'Patient History', icon: Clock },
]

const compounderLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/queue', label: 'Check-In Queue', icon: ClipboardList },
  { to: '/app/vitals', label: 'Vitals Entry', icon: Activity },
]

const patientLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/prescriptions', label: 'Prescriptions', icon: Pill },
  { to: '/app/lab-reports', label: 'Lab Reports', icon: FileText },
  { to: '/app/history', label: 'Visit History', icon: Clock },
  { to: '/app/appointments', label: 'Appointments', icon: Calendar },
]

const roleConfig = {
  doctor: {
    links: doctorLinks,
    color: 'text-doctor',
    activeBg: 'bg-doctor/10',
    icon: Stethoscope,
    headline: 'Clinical decision support',
    summary: 'Show how one screen combines patient history, AI assistance, and prescription handoff.',
  },
  compounder: {
    links: compounderLinks,
    color: 'text-compounder',
    activeBg: 'bg-compounder/10',
    icon: Heart,
    headline: 'Operational intake workflow',
    summary: 'Lead with queue discipline, faster vitals capture, and a cleaner doctor handoff.',
  },
  patient: {
    links: patientLinks,
    color: 'text-patient',
    activeBg: 'bg-patient/10',
    icon: Users,
    headline: 'Retention and trust layer',
    summary: 'Close the story with patient visibility into prescriptions, reports, and follow-ups.',
  },
}

export function Sidebar() {
  const { state } = useDemo()
  const location = useLocation()
  const role = state.role
  if (!role) return null

  const config = roleConfig[role.role]

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/90 bg-white/85 backdrop-blur-xl lg:block">
      <div className="p-4">
        <div className={`mb-4 rounded-2xl border border-border bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm ${config.color}`}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Demo Lens</p>
          <h2 className="text-sm font-bold text-text-primary">{config.headline}</h2>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary">{config.summary}</p>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-3">Navigation</p>
        <nav className="space-y-1">
          {config.links.map((link) => {
            const active = location.pathname === link.to
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? `${config.activeBg} ${config.color}` : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Patient quick-select for doctor/compounder */}
      {(role.role === 'doctor' || role.role === 'compounder') && (
        <div className="border-t border-border p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-2">Active Patient</p>
          <PatientQuickSelect role={role.role} />
        </div>
      )}
    </aside>
  )
}

function PatientQuickSelect({ role }: { role: 'doctor' | 'compounder' }) {
  const { state, dispatch } = useDemo()
  const navigate = useNavigate()
  const activeQueue = state.queue.filter((q) => q.status !== 'Completed')

  function handleSelect(patientId: string, status: string) {
    dispatch({ type: 'SELECT_PATIENT', patientId })

    if (role === 'compounder') {
      if (status === 'Scheduled') {
        navigate('/app/queue')
        return
      }

      if (status === 'Checked In' || status === 'Vitals Recorded') {
        navigate('/app/vitals')
        return
      }

      navigate('/app/dashboard')
    }
  }

  return (
    <div className="space-y-1">
      {activeQueue.map((q) => (
        <button
          key={q.patientId}
          onClick={() => handleSelect(q.patientId, q.status)}
          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition ${
            state.selectedPatientId === q.patientId
              ? role === 'compounder'
                ? 'bg-compounder/10 text-compounder font-medium'
                : 'bg-doctor/10 text-doctor font-medium'
              : 'text-text-secondary hover:bg-gray-50'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
            q.status === 'With Doctor' ? 'bg-doctor' : q.status === 'Vitals Recorded' ? 'bg-green-500' : q.status === 'Checked In' ? 'bg-amber-500' : 'bg-gray-300'
          }`} />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <span className="truncate">{q.name}</span>
            <span className="shrink-0 text-[10px] font-medium text-text-secondary">{q.checkInTime}</span>
          </div>
        </button>
      ))}
    </div>
  )
}
