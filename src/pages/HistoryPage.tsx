import { useDemo } from '../context/DemoContext'
import { formatDate } from '../utils/format'
import { Clock, Activity, Pill, FileText, AlertTriangle } from 'lucide-react'

export function HistoryPage() {
  const { state } = useDemo()
  const patientId = state.selectedPatientId || 'P001'
  const patient = state.patients.find((p) => p.id === patientId)
  const visits = state.visits.filter((v) => v.patientId === patientId)
  const vitals = state.vitals.filter((v) => v.patientId === patientId)
  const rxs = state.prescriptions.filter((r) => r.patientId === patientId)
  const labs = state.labReports.filter((r) => r.patientId === patientId)

  if (!patient) return <div className="p-6 text-text-secondary">Select a patient to view history.</div>

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold mb-1">{patient.name} — History</h1>
        <p className="text-sm text-text-secondary">{patient.age}y, {patient.gender} — {patient.id}</p>
      </div>

      {patient.conditions.length > 0 && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-2"><AlertTriangle className="h-4 w-4" /> Chronic Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((c) => <span key={c} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">{c}</span>)}
            {patient.allergies.map((a) => <span key={a} className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">Allergy: {a}</span>)}
          </div>
        </div>
      )}

      {vitals.length > 0 && (
        <div className="mb-5 rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Activity className="h-4 w-4 text-doctor" /> Vitals Trend</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border text-left text-[10px] text-text-secondary"><th className="pb-1.5">Date</th><th className="pb-1.5">BP</th><th className="pb-1.5">Sugar</th><th className="pb-1.5">Temp</th><th className="pb-1.5">Pulse</th><th className="pb-1.5">Weight</th><th className="pb-1.5">SpO2</th></tr></thead>
              <tbody>
                {vitals.map((v, i) => (
                  <tr key={i} className="border-b border-border"><td className="py-1.5">{formatDate(v.date)}</td><td className="py-1.5">{v.bloodPressure}</td><td className="py-1.5">{v.sugarLevel}</td><td className="py-1.5">{v.temperature}</td><td className="py-1.5">{v.pulseRate} bpm</td><td className="py-1.5">{v.weight} kg</td><td className="py-1.5">{v.oxygenSaturation}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mb-5 rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Clock className="h-4 w-4 text-doctor" /> Visit Timeline</h3>
        <div className="space-y-4">
          {visits.map((v) => (
            <div key={v.id} className="border-l-2 border-doctor pl-3 relative">
              <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-doctor" />
              <p className="text-[10px] text-text-secondary">{formatDate(v.date)} — {v.doctor}</p>
              <p className="text-xs font-medium">{v.complaint}</p>
              <p className="text-xs text-text-secondary">{v.diagnosis}</p>
              <p className="text-[10px] text-text-secondary mt-0.5">{v.notes}</p>
            </div>
          ))}
          {visits.length === 0 && <p className="text-xs text-text-secondary">No visits recorded.</p>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Pill className="h-4 w-4 text-doctor" /> Prescriptions</h3>
          <div className="space-y-3">
            {rxs.map((rx) => (
              <div key={rx.id} className="rounded-lg border border-border p-3">
                <p className="text-xs font-medium">{rx.doctorName} — {formatDate(rx.date)}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {rx.medicines.map((m) => <span key={m.name} className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">{m.name} {m.dosage}</span>)}
                </div>
              </div>
            ))}
            {rxs.length === 0 && <p className="text-xs text-text-secondary">No prescriptions.</p>}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><FileText className="h-4 w-4 text-doctor" /> Reports</h3>
          <div className="space-y-2">
            {labs.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                <div>
                  <p className="text-xs font-medium">{r.title}</p>
                  <p className="text-[10px] text-text-secondary">{formatDate(r.date)}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
              </div>
            ))}
            {labs.length === 0 && <p className="text-xs text-text-secondary">No reports.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
