import { useDemo } from '../context/DemoContext'
import { formatDate } from '../utils/format'
import { Calendar, Clock, MapPin } from 'lucide-react'

export function PatientAppointmentsPage() {
  const { state } = useDemo()
  const patientId = 'P001'
  const appts = state.appointments.filter((a) => a.patientId === patientId)
  const upcoming = appts.filter((a) => a.status === 'Scheduled')
  const past = appts.filter((a) => a.status !== 'Scheduled')

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center gap-3">
        <Calendar className="h-6 w-6 text-patient" />
        <h1 className="text-xl font-bold">Appointments</h1>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 text-patient">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((a) => (
              <div key={a.id} className="rounded-xl border-2 border-patient/30 bg-patient-light p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg">{a.doctor}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(a.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {a.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> HealthFirst Clinic, Room 3</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-patient px-3 py-1 text-xs font-medium text-white">{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold mb-3 text-text-secondary">Past Appointments</h2>
        <div className="space-y-2">
          {past.map((a) => (
            <div key={a.id} className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{a.doctor}</p>
                  <p className="text-xs text-text-secondary">{formatDate(a.date)} at {a.time}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${a.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
              </div>
            </div>
          ))}
          {past.length === 0 && <p className="text-sm text-text-secondary">No past appointments</p>}
        </div>
      </div>
    </div>
  )
}
