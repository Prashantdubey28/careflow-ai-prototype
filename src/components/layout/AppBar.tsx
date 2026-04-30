import { useDemo } from '../../context/DemoContext'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, RotateCcw, Stethoscope, Heart, Users } from 'lucide-react'
import type { ClinicUser } from '../../types'

const roleIcons = { doctor: Stethoscope, compounder: Heart, patient: Users }
const roleColors = { doctor: 'bg-doctor', compounder: 'bg-compounder', patient: 'bg-patient' }
const roleOrder: ClinicUser['role'][] = ['compounder', 'doctor', 'patient']
const roleScenes = {
  doctor: 'Consultation command center',
  compounder: 'Front-desk intake and handoff',
  patient: 'Retention and engagement portal',
}

export function AppBar() {
  const { state, dispatch, users } = useDemo()
  const navigate = useNavigate()
  const role = state.role
  const selectedPatient = state.patients.find((patient) => patient.id === state.selectedPatientId)

  function switchRole(key: string) {
    dispatch({ type: 'SELECT_ROLE', user: users[key] as ClinicUser })
    navigate('/app/dashboard')
  }

  function resetDemo() {
    dispatch({ type: 'RESET_DEMO', preserveRole: role })
  }

  if (!role) return null

  const Icon = roleIcons[role.role]

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/84 px-4 py-3 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="group flex items-center gap-3 rounded-2xl transition hover:opacity-90" aria-label="Go to home">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-doctor/10 text-doctor shadow-[0_10px_24px_rgba(13,148,136,0.14)]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text-primary group-hover:text-doctor">JeevX</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Investor Demo
              </span>
            </div>
            <p className="text-[11px] text-text-secondary group-hover:text-text-primary">{roleScenes[role.role]}</p>
          </div>
        </Link>

        <div className="hidden xl:flex">
          {selectedPatient && (
            <div className="rounded-full border border-doctor/15 bg-doctor/8 px-4 py-2 text-xs">
              <span className="font-semibold text-doctor">Flagship Case:</span>{' '}
              <span className="text-text-primary">{selectedPatient.name}</span>
              <span className="text-text-secondary"> • {selectedPatient.id}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-border bg-slate-50 p-1 sm:flex">
            {roleOrder.map((roleKey) => {
              const user = users[roleKey]
              const RIcon = roleIcons[user.role]
              const active = role.role === user.role
              return (
                <button
                  key={roleKey}
                  onClick={() => switchRole(roleKey)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    active ? `${roleColors[user.role]} text-white shadow-sm` : 'text-text-secondary hover:bg-white hover:text-text-primary'
                  }`}
                  title={user.name}
                >
                  <RIcon className="h-3.5 w-3.5" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </button>
              )
            })}
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-2 rounded-full border border-border bg-white px-2.5 py-1.5 shadow-sm">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${roleColors[role.role]}`}>
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium leading-tight">{role.name}</p>
              <p className="text-[10px] leading-tight text-text-secondary">{role.title}</p>
            </div>
          </div>

          <button onClick={resetDemo} className="rounded-full border border-border bg-white p-2 text-text-secondary shadow-sm transition hover:bg-slate-50" title="Reset Demo">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
