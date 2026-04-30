import { useDemo } from '../context/DemoContext'
import { formatDate } from '../utils/format'
import { Users, Bell, Calendar, FileText, Pill, Clock, Download } from 'lucide-react'

export function PatientPage() {
  const { state } = useDemo()
  const patientId = 'P001'
  const patient = state.patients.find((p) => p.id === patientId)!
  const patientVisits = state.visits.filter((v) => v.patientId === patientId)
  const patientRx = state.prescriptions.filter((r) => r.patientId === patientId)
  const patientLabs = state.labReports.filter((r) => r.patientId === patientId)
  const patientNotifs = state.notifications.filter((n) => n.patientId === patientId)
  const patientAppts = state.appointments.filter((a) => a.patientId === patientId)
  const latestVitals = state.vitals.find((v) => v.patientId === patientId)
  const latestPrescription = patientRx.reduce((latest, prescription) => {
    if (!latest) return prescription
    return prescription.date > latest.date ? prescription : latest
  }, patientRx[0])

  function printPrescription(rx: typeof patientRx[0]) {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html><head><title>Prescription</title><style>body{font-family:system-ui;padding:40px;max-width:600px;margin:auto}h1{font-size:18px}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}th{background:#f5f5f5}.footer{margin-top:24px;font-size:12px;color:#666}</style></head><body>`)
    w.document.write(`<h1>JeevX — Prescription</h1>`)
    w.document.write(`<p><strong>${patient.name}</strong> (${patient.age}y, ${patient.gender}) — ${patient.id}</p>`)
    w.document.write(`<p>Dr. ${rx.doctorName} — ${formatDate(rx.date)}</p>`)
    w.document.write(`<table><tr><th>Medicine</th><th>Dosage</th><th>Duration</th><th>Instructions</th></tr>`)
    rx.medicines.forEach((m) => w.document.write(`<tr><td>${m.name}</td><td>${m.dosage}</td><td>${m.duration}</td><td>${m.instructions}</td></tr>`))
    w.document.write(`</table>`)
    w.document.write(`<p><strong>Follow-up:</strong> ${rx.followUp}</p>`)
    w.document.write(`<p class="footer">This is a demo prescription from a prototype application.</p>`)
    w.document.write(`</body></html>`)
    w.document.close()
    w.print()
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Users className="h-7 w-7 text-patient" />
        <div>
          <h1 className="text-xl font-bold">My Health Portal</h1>
          <p className="text-sm text-text-secondary">Your medical records and appointments</p>
        </div>
      </div>

      {/* Profile */}
      <div className="mb-5 rounded-xl border border-border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{patient.name}</h2>
            <p className="text-sm text-text-secondary">{patient.age} years, {patient.gender} — {patient.id}</p>
            <p className="text-sm text-text-secondary">{patient.phone}</p>
          </div>
          <div className="text-right">
            {latestVitals && (
              <div className="flex gap-3 text-xs text-text-secondary">
                <span>BP: {latestVitals.bloodPressure}</span>
                <span>Sugar: {latestVitals.sugarLevel}</span>
                <span>SpO2: {latestVitals.oxygenSaturation}%</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {patient.conditions.map((c) => <span key={c} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{c}</span>)}
          {patient.allergies.map((a) => <span key={a} className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">Allergy: {a}</span>)}
        </div>
      </div>

      {/* Notifications & Appointments */}
      <div className="grid gap-5 md:grid-cols-2 mb-5">
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Bell className="h-4 w-4 text-patient" /> Notifications</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {patientNotifs.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg bg-surface p-2.5">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.type === 'reminder' ? 'bg-amber-400' : n.type === 'report' ? 'bg-blue-400' : n.type === 'prescription' ? 'bg-green-400' : 'bg-purple-400'}`} />
                <div>
                  <p className="text-xs">{n.message}</p>
                  <p className="text-[10px] text-text-secondary">{formatDate(n.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Calendar className="h-4 w-4 text-patient" /> Appointments</h3>
          <div className="space-y-2">
            {patientAppts.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                <div>
                  <p className="text-xs font-medium">{a.doctor}</p>
                  <p className="text-[10px] text-text-secondary">{formatDate(a.date)} at {a.time}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${a.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="mb-5 rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Pill className="h-4 w-4 text-patient" /> Prescriptions</h3>
        {latestPrescription ? (
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium">{latestPrescription.doctorName}</p>
                <p className="text-xs text-text-secondary">{formatDate(latestPrescription.date)}</p>
              </div>
              <button onClick={() => printPrescription(latestPrescription)} className="inline-flex items-center gap-1 rounded-lg bg-patient/10 px-3 py-1.5 text-xs font-medium text-patient hover:bg-patient/20">
                <Download className="h-3.5 w-3.5" /> Print
              </button>
            </div>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border text-left text-[10px] text-text-secondary"><th className="pb-1.5">Medicine</th><th className="pb-1.5">Dosage</th><th className="pb-1.5">Duration</th><th className="pb-1.5 hidden sm:table-cell">Instructions</th></tr></thead>
              <tbody>
                {latestPrescription.medicines.map((m) => (
                  <tr key={m.name} className="border-b border-border last:border-0"><td className="py-1.5 font-medium">{m.name}</td><td className="py-1.5">{m.dosage}</td><td className="py-1.5">{m.duration}</td><td className="py-1.5 text-text-secondary hidden sm:table-cell">{m.instructions}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-patient font-medium">Follow-up: {latestPrescription.followUp}</p>
          </div>
        ) : (
          <p className="text-xs text-text-secondary">No prescriptions available yet.</p>
        )}
      </div>

      {/* Lab Reports */}
      <div className="mb-5 rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><FileText className="h-4 w-4 text-patient" /> Lab Reports</h3>
        <div className="space-y-2">
          {patientLabs.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-xs font-medium">{r.title}</p>
                <p className="text-[10px] text-text-secondary">{formatDate(r.date)} — {r.summary}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visit History */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm"><Clock className="h-4 w-4 text-patient" /> Visit History</h3>
        <div className="space-y-3">
          {patientVisits.map((v) => (
            <div key={v.id} className="border-l-2 border-patient pl-3">
              <p className="text-[10px] text-text-secondary">{formatDate(v.date)} — {v.doctor}</p>
              <p className="text-xs font-medium">{v.complaint}</p>
              <p className="text-xs text-text-secondary">{v.diagnosis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
