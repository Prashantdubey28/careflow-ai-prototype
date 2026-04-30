import { useDemo } from '../context/DemoContext'
import { formatDate } from '../utils/format'
import { Pill, Download, Search } from 'lucide-react'
import { useState } from 'react'

export function PatientPrescriptionsPage() {
  const { state } = useDemo()
  const [searchTerm, setSearchTerm] = useState('')
  const patientId = 'P001'
  const patient = state.patients.find((p) => p.id === patientId)!
  const allRx = state.prescriptions.filter((r) => r.patientId === patientId)

  const filtered = allRx.filter((rx) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return rx.doctorName.toLowerCase().includes(term) || rx.medicines.some((m) => m.name.toLowerCase().includes(term)) || rx.date.includes(term)
  })

  function printPrescription(rx: typeof allRx[0]) {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html><head><title>Prescription</title><style>body{font-family:system-ui;padding:40px;max-width:600px;margin:auto}h1{font-size:18px}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}th{background:#f5f5f5}.footer{margin-top:24px;font-size:12px;color:#666}</style></head><body>`)
    w.document.write(`<h1>JeevX — Prescription</h1>`)
    w.document.write(`<p><strong>${patient.name}</strong> (${patient.age}y, ${patient.gender}) — ${patient.id}</p>`)
    w.document.write(`<p>${rx.doctorName} — ${formatDate(rx.date)}</p>`)
    w.document.write(`<table><tr><th>Medicine</th><th>Dosage</th><th>Duration</th><th>Instructions</th></tr>`)
    rx.medicines.forEach((m) => w.document.write(`<tr><td>${m.name}</td><td>${m.dosage}</td><td>${m.duration}</td><td>${m.instructions}</td></tr>`))
    w.document.write(`</table><p><strong>Follow-up:</strong> ${rx.followUp}</p>`)
    w.document.write(`<p class="footer">Issued through the JeevX patient portal.</p></body></html>`)
    w.document.close()
    w.print()
  }

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Pill className="h-6 w-6 text-patient" />
          <h1 className="text-xl font-bold">My Prescriptions</h1>
        </div>
        <span className="text-sm text-text-secondary">{allRx.length} total</span>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
        <input className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm" placeholder="Search by doctor, medicine, or date..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="space-y-4">
        {filtered.map((rx) => (
          <div key={rx.id} className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium">{rx.doctorName}</p>
                <p className="text-xs text-text-secondary">{formatDate(rx.date)}</p>
              </div>
              <button onClick={() => printPrescription(rx)} className="inline-flex items-center gap-1 rounded-lg bg-patient/10 px-3 py-1.5 text-xs font-medium text-patient hover:bg-patient/20">
                <Download className="h-3.5 w-3.5" /> Print
              </button>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-left text-xs text-text-secondary"><th className="pb-2">Medicine</th><th className="pb-2">Dosage</th><th className="pb-2">Duration</th><th className="pb-2 hidden sm:table-cell">Instructions</th></tr></thead>
              <tbody>
                {rx.medicines.map((m) => (
                  <tr key={m.name} className="border-b border-border last:border-0"><td className="py-2 font-medium">{m.name}</td><td className="py-2">{m.dosage}</td><td className="py-2">{m.duration}</td><td className="py-2 text-text-secondary hidden sm:table-cell">{m.instructions}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-patient font-medium">Follow-up: {rx.followUp}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-sm text-text-secondary py-8">No prescriptions match your search</p>}
      </div>
    </div>
  )
}
