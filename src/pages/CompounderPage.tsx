import { useDemo } from '../context/DemoContext'
import { Heart, Search, CheckCircle, Clock, ShieldAlert, Thermometer } from 'lucide-react'
import { useState } from 'react'
import type { DraftVitals } from '../types'

export function CompounderPage() {
  const { state, dispatch } = useDemo()
  const [searchTerm, setSearchTerm] = useState('')
  const [vitalsPatientId, setVitalsPatientId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const filteredQueue = state.queue.filter((q) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return q.name.toLowerCase().includes(term) || q.patientId.toLowerCase().includes(term) || q.complaint.toLowerCase().includes(term)
  })

  const vitalsPatient = vitalsPatientId ? state.queue.find((q) => q.patientId === vitalsPatientId) : null
  const draft = state.vitalsDraft && state.vitalsDraft.patientId === vitalsPatientId ? state.vitalsDraft : null

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
    setVitalsPatientId(patientId)
  }

  function updateDraft(field: keyof DraftVitals, value: string) {
    if (!draft) return
    dispatch({ type: 'UPDATE_VITALS_DRAFT', draft: { ...draft, [field]: value } })
  }

  function saveVitals() {
    if (!vitalsPatientId || !draft) return
    if (draft.notes !== state.queue.find((q) => q.patientId === vitalsPatientId)?.complaint) {
      dispatch({ type: 'UPDATE_COMPLAINT', patientId: vitalsPatientId, complaint: draft.notes })
    }
    dispatch({ type: 'SAVE_VITALS', patientId: vitalsPatientId })
    setToast('Vitals saved — patient marked ready for doctor')
    setTimeout(() => setToast(null), 3000)
    setVitalsPatientId(null)
  }

  function checkIn(patientId: string) {
    dispatch({ type: 'CHECK_IN_PATIENT', patientId })
    setToast('Patient checked in')
    setTimeout(() => setToast(null), 3000)
  }

  const waiting = state.queue.filter((q) => q.status === 'Checked In').length
  const vitalsRecorded = state.queue.filter((q) => q.status === 'Vitals Recorded').length
  const scheduled = state.queue.filter((q) => q.status === 'Scheduled').length

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Heart className="h-7 w-7 text-compounder" />
        <div>
          <h1 className="text-xl font-bold">Intake & Vitals</h1>
          <p className="text-sm text-text-secondary">Manage patient check-in and record vitals</p>
        </div>
      </div>

      {toast && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> {toast}
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-white p-4">
          <Clock className="mb-2 h-5 w-5 text-amber-500" />
          <p className="text-2xl font-bold">{waiting}</p>
          <p className="text-xs text-text-secondary">Waiting</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <CheckCircle className="mb-2 h-5 w-5 text-green-500" />
          <p className="text-2xl font-bold">{vitalsRecorded}</p>
          <p className="text-xs text-text-secondary">Vitals Done</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <Thermometer className="mb-2 h-5 w-5 text-blue-500" />
          <p className="text-2xl font-bold">{scheduled}</p>
          <p className="text-xs text-text-secondary">Scheduled</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
          <input
            className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm shadow-sm"
            placeholder="Search patient by name, ID, or complaint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Queue */}
        <div className="rounded-xl border border-border bg-white shadow-sm">
          <div className="border-b border-border px-4 py-3">
            <h2 className="font-semibold">Today's Queue</h2>
          </div>
          <div className="divide-y divide-border">
            {filteredQueue.map((q) => (
              <div key={q.patientId} className={`flex items-center gap-4 p-4 ${vitalsPatientId === q.patientId ? 'bg-compounder-light' : ''}`}>
                <div className="flex-1">
                  <p className="font-medium">{q.name} <span className="text-xs text-text-secondary">({q.patientId})</span></p>
                  <p className="text-sm text-text-secondary">{q.complaint}</p>
                  <p className="text-xs text-text-secondary">Check-in: {q.checkInTime}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  q.status === 'Vitals Recorded' ? 'bg-green-100 text-green-700' :
                  q.status === 'Checked In' ? 'bg-amber-100 text-amber-700' :
                  q.status === 'With Doctor' ? 'bg-blue-100 text-blue-700' :
                  q.status === 'Completed' ? 'bg-gray-100 text-gray-500' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {q.status}
                </span>
                {q.status === 'Scheduled' && (
                  <button onClick={() => checkIn(q.patientId)} className="rounded-lg bg-compounder/10 px-3 py-1.5 text-xs font-medium text-compounder hover:bg-compounder/20">
                    Check In
                  </button>
                )}
                {q.status === 'Checked In' && (
                  <button onClick={() => startVitals(q.patientId)} className="rounded-lg bg-compounder px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600">
                    Record Vitals
                  </button>
                )}
                {q.status === 'Vitals Recorded' && (
                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <CheckCircle className="h-3.5 w-3.5" /> Ready
                  </span>
                )}
              </div>
            ))}
            {filteredQueue.length === 0 && (
              <div className="p-8 text-center text-sm text-text-secondary">No patients match your search</div>
            )}
          </div>
        </div>

        {/* Vitals Entry */}
        {vitalsPatientId && vitalsPatient && draft ? (
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-1">Record Vitals</h3>
            <p className="text-sm text-text-secondary mb-4">{vitalsPatient.name} — {vitalsPatient.patientId}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Blood Pressure', field: 'bloodPressure' as const, placeholder: '120/80', unit: 'mmHg' },
                { label: 'Blood Sugar', field: 'sugarLevel' as const, placeholder: '100 mg/dL', unit: '' },
                { label: 'Temperature', field: 'temperature' as const, placeholder: '98.6°F', unit: '' },
                { label: 'Pulse Rate', field: 'pulseRate' as const, placeholder: '72', unit: 'bpm' },
                { label: 'Weight', field: 'weight' as const, placeholder: '70', unit: 'kg' },
                { label: 'SpO2', field: 'oxygenSaturation' as const, placeholder: '98', unit: '%' },
              ].map((v) => (
                <div key={v.field}>
                  <label className="text-xs text-text-secondary">{v.label}</label>
                  <div className="flex items-baseline gap-1 mt-1">
                    <input
                      className="w-full rounded border border-border px-2 py-1.5 text-sm"
                      placeholder={v.placeholder}
                      value={draft[v.field]}
                      onChange={(e) => updateDraft(v.field, e.target.value)}
                    />
                    {v.unit && <span className="text-xs text-text-secondary shrink-0">{v.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <label className="text-xs text-text-secondary">Chief Complaint / Notes</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-border p-3 text-sm"
                rows={3}
                value={draft.notes}
                onChange={(e) => updateDraft('notes', e.target.value)}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={saveVitals} className="rounded-lg bg-compounder px-6 py-2.5 text-sm font-semibold text-white">
                Save & Mark Ready
              </button>
              <button onClick={() => setVitalsPatientId(null)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Thermometer className="mb-3 h-8 w-8 text-text-secondary/30" />
              <p className="text-sm text-text-secondary">Select a patient from the queue to record vitals</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Access Scope</p>
            <p className="text-xs text-amber-700 mt-1">Compounders can record vitals and intake notes, but cannot finalize diagnoses, issue prescriptions, or override doctor decisions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
