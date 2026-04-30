import { useDemo } from '../context/DemoContext'
import { Activity, CheckCircle, Thermometer } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { DraftVitals } from '../types'

export function CompounderVitalsPage() {
  const { state, dispatch } = useDemo()
  const [toast, setToast] = useState<string | null>(null)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(state.selectedPatientId ?? null)

  const eligiblePatients = state.queue.filter((q) => q.status === 'Checked In' || q.status === 'Vitals Recorded')
  const selectedPatient = selectedPatientId ? state.queue.find((q) => q.patientId === selectedPatientId) : null
  const draft = state.vitalsDraft && state.vitalsDraft.patientId === selectedPatientId ? state.vitalsDraft : null

  function startVitals(patientId: string) {
    const existing = state.vitals.find((v) => v.patientId === patientId)
    const queueItem = state.queue.find((q) => q.patientId === patientId)
    dispatch({
      type: 'UPDATE_VITALS_DRAFT',
      draft: {
        patientId,
        bloodPressure: existing?.bloodPressure || '',
        sugarLevel: existing?.sugarLevel || '',
        temperature: existing?.temperature || '',
        pulseRate: existing ? String(existing.pulseRate) : '',
        weight: existing ? String(existing.weight) : '',
        oxygenSaturation: existing ? String(existing.oxygenSaturation) : '',
        notes: queueItem?.complaint || '',
      },
    })
    setSelectedPatientId(patientId)
  }

  function updateDraft(field: keyof DraftVitals, value: string) {
    if (!draft) return
    dispatch({ type: 'UPDATE_VITALS_DRAFT', draft: { ...draft, [field]: value } })
  }

  function saveVitals() {
    if (!selectedPatientId || !draft) return
    if (draft.notes !== state.queue.find((q) => q.patientId === selectedPatientId)?.complaint) {
      dispatch({ type: 'UPDATE_COMPLAINT', patientId: selectedPatientId, complaint: draft.notes })
    }
    dispatch({ type: 'SAVE_VITALS', patientId: selectedPatientId })
    setToast('Vitals saved — patient marked ready for doctor')
    setTimeout(() => setToast(null), 3000)
    setSelectedPatientId(null)
  }

  useEffect(() => {
    const selectedPatientInQueue = state.queue.find((q) => q.patientId === state.selectedPatientId)
    if (!selectedPatientInQueue) return

    if (selectedPatientInQueue.status === 'Checked In' || selectedPatientInQueue.status === 'Vitals Recorded') {
      startVitals(state.selectedPatientId)
    }
  }, [state.selectedPatientId])

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center gap-3">
        <Activity className="h-6 w-6 text-compounder" />
        <h1 className="text-xl font-bold">Vitals Entry</h1>
      </div>

      {toast && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> {toast}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        {/* Patient list */}
        <div className="rounded-xl border border-border bg-white shadow-sm">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Select Patient</h2>
            <p className="text-[10px] text-text-secondary">Patients checked in and awaiting vitals</p>
          </div>
          <div className="divide-y divide-border">
            {eligiblePatients.map((q) => (
              <button key={q.patientId} onClick={() => startVitals(q.patientId)} className={`w-full text-left p-3 transition hover:bg-gray-50 ${selectedPatientId === q.patientId ? 'bg-compounder-light' : ''}`}>
                <p className="text-sm font-medium">{q.name}</p>
                <p className="text-xs text-text-secondary">{q.complaint}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${q.status === 'Vitals Recorded' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{q.status}</span>
              </button>
            ))}
            {eligiblePatients.length === 0 && (
              <p className="p-4 text-xs text-text-secondary text-center">No patients awaiting vitals — check in patients from the queue first</p>
            )}
          </div>
        </div>

        {/* Vitals form */}
        {selectedPatientId && selectedPatient && draft ? (
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-semibold">{selectedPatient.name}</h3>
              <p className="text-xs text-text-secondary">{selectedPatient.patientId} — {selectedPatient.complaint}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Blood Pressure', field: 'bloodPressure' as const, placeholder: '120/80', unit: 'mmHg' },
                { label: 'Blood Sugar', field: 'sugarLevel' as const, placeholder: '100 mg/dL', unit: '' },
                { label: 'Temperature', field: 'temperature' as const, placeholder: '98.6°F', unit: '' },
                { label: 'Pulse Rate', field: 'pulseRate' as const, placeholder: '72', unit: 'bpm' },
                { label: 'Weight', field: 'weight' as const, placeholder: '70', unit: 'kg' },
                { label: 'SpO2', field: 'oxygenSaturation' as const, placeholder: '98', unit: '%' },
              ].map((v) => (
                <div key={v.field}>
                  <label className="text-xs font-medium text-text-secondary">{v.label}</label>
                  <div className="flex items-baseline gap-1 mt-1">
                    <input className="w-full rounded-lg border border-border px-3 py-2 text-sm" placeholder={v.placeholder} value={draft[v.field]} onChange={(e) => updateDraft(v.field, e.target.value)} />
                    {v.unit && <span className="text-xs text-text-secondary shrink-0">{v.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-text-secondary">Chief Complaint / Intake Notes</label>
              <textarea className="mt-1 w-full rounded-lg border border-border p-3 text-sm" rows={3} value={draft.notes} onChange={(e) => updateDraft('notes', e.target.value)} />
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={saveVitals} className="rounded-lg bg-compounder px-6 py-2.5 text-sm font-semibold text-white">Save & Mark Ready</button>
              <button onClick={() => setSelectedPatientId(null)} className="rounded-lg border border-border px-4 py-2.5 text-sm text-text-secondary">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-border bg-white p-16">
            <div className="text-center">
              <Thermometer className="mx-auto mb-3 h-8 w-8 text-text-secondary/30" />
              <p className="text-sm text-text-secondary">Select a patient to record vitals</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
