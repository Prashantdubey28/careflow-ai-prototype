import { useDemo } from '../context/DemoContext'
import { formatDate } from '../utils/format'
import { Users, Clock, AlertTriangle, Brain, Stethoscope, Search, ChevronRight, Shield, CheckCircle, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { VoiceTranscription } from '../components/ai/VoiceTranscription'
import { DiagnosticImaging } from '../components/ai/DiagnosticImaging'

export function DoctorPage() {
  const { state, dispatch } = useDemo()
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [showRxForm, setShowRxForm] = useState(false)

  const patient = state.patients.find((p) => p.id === state.selectedPatientId)
  const patientVitals = state.vitals.filter((v) => v.patientId === state.selectedPatientId)
  const patientVisits = state.visits.filter((v) => v.patientId === state.selectedPatientId)
  const patientRx = state.prescriptions.filter((r) => r.patientId === state.selectedPatientId)
  const patientLabs = state.labReports.filter((r) => r.patientId === state.selectedPatientId)
  const aiData = state.aiSuggestions.find((a) => a.patientId === state.selectedPatientId)
  const queueItem = state.queue.find((q) => q.patientId === state.selectedPatientId)
  const consultation = state.consultation

  const isConsulting = consultation?.patientId === state.selectedPatientId
  const showCompletedReview = queueItem?.status === 'Completed'
  const canInteractWithAiSuggestions = isConsulting && !!consultation

  const filteredQueue = state.queue.filter((q) => {
    if (!searchTerm) return true
    return q.name.toLowerCase().includes(searchTerm.toLowerCase()) || q.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  })

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function startConsultation() {
    dispatch({ type: 'START_CONSULTATION', patientId: state.selectedPatientId })
    showToast('Consultation started')
  }

  function completeVisit() {
    dispatch({ type: 'COMPLETE_VISIT', patientId: state.selectedPatientId })
    setShowRxForm(false)
    showToast(queueItem?.status === 'Completed' ? 'Visit updates saved' : 'Visit completed — patient record updated')
  }

  function editCompletedVisit() {
    dispatch({ type: 'EDIT_COMPLETED_VISIT', patientId: state.selectedPatientId })
    setShowRxForm(false)
    showToast('Completed visit reopened for editing')
  }

  function initPrescription() {
    const ai = aiData
    dispatch({
      type: 'UPDATE_PRESCRIPTION_DRAFT',
      draft: {
        patientId: state.selectedPatientId,
        medicines: ai ? ai.draftPrescription.map((m) => ({ ...m, instructions: '' })) : [{ name: '', dosage: '', duration: '', instructions: '' }],
        followUp: '',
      },
    })
    setShowRxForm(true)
  }

  function finalizePrescription() {
    dispatch({ type: 'FINALIZE_PRESCRIPTION', patientId: state.selectedPatientId })
    setShowRxForm(false)
    showToast('Prescription finalized')
  }

  const metrics = [
    { icon: Users, label: 'Total', value: state.queue.length, color: 'text-doctor' },
    { icon: Clock, label: 'Waiting', value: state.queue.filter((q) => q.status === 'Vitals Recorded').length, color: 'text-amber-500' },
    { icon: Stethoscope, label: 'With Doctor', value: state.queue.filter((q) => q.status === 'With Doctor').length, color: 'text-blue-500' },
    { icon: CheckCircle, label: 'Completed', value: state.queue.filter((q) => q.status === 'Completed').length, color: 'text-green-500' },
  ]

  return (
    <div className="p-6">
      {toast && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> {toast}
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-white p-4">
            <m.icon className={`mb-2 h-5 w-5 ${m.color}`} />
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-text-secondary">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Queue */}
        <div className="rounded-xl border border-border bg-white shadow-sm">
          <div className="border-b border-border p-3">
            <h2 className="font-semibold text-sm mb-2">Patient Queue</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-text-secondary" />
              <input className="w-full rounded-lg border border-border bg-surface py-1.5 pl-8 pr-3 text-xs" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="divide-y divide-border max-h-[60vh] overflow-y-auto">
            {filteredQueue.map((q) => (
              <button key={q.patientId} onClick={() => dispatch({ type: 'SELECT_PATIENT', patientId: q.patientId })} className={`flex w-full items-center gap-2 p-3 text-left transition hover:bg-gray-50 ${state.selectedPatientId === q.patientId ? 'bg-doctor-light' : ''}`}>
                <span className={`h-2 w-2 rounded-full shrink-0 ${
                  q.status === 'With Doctor' ? 'bg-blue-500' : q.status === 'Vitals Recorded' ? 'bg-green-500' : q.status === 'Checked In' ? 'bg-amber-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{q.name}</p>
                  <p className="text-xs text-text-secondary truncate">{q.complaint}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-text-secondary shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        {patient ? (
          <div className="space-y-5">
            {/* Patient header + actions */}
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold">{patient.name}</h2>
                    {patient.riskBadge && <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">{patient.riskBadge}</span>}
                    {queueItem && <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      queueItem.status === 'With Doctor' ? 'bg-blue-100 text-blue-700' : queueItem.status === 'Vitals Recorded' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>{queueItem.status}</span>}
                  </div>
                  <p className="text-sm text-text-secondary">{patient.age}y, {patient.gender} — {patient.id} — {patient.phone}</p>
                </div>
                <div className="flex gap-2">
                  {(queueItem?.status === 'Vitals Recorded' || (queueItem?.status === 'With Doctor' && !isConsulting)) && (
                    <button onClick={startConsultation} className="rounded-lg bg-doctor px-4 py-2 text-sm font-medium text-white">
                      {queueItem?.status === 'With Doctor' ? 'Resume Consultation' : 'Start Consultation'}
                    </button>
                  )}
                  {queueItem?.status === 'Completed' && !isConsulting && (
                    <button onClick={editCompletedVisit} className="rounded-lg border border-doctor/30 bg-doctor/8 px-4 py-2 text-sm font-medium text-doctor">
                      Edit Visit
                    </button>
                  )}
                  {isConsulting && (
                    <button onClick={completeVisit} className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                      {queueItem?.status === 'Completed' ? 'Save Updates' : 'Complete Visit'}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {patient.conditions.map((c) => <span key={c} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{c}</span>)}
                {patient.allergies.map((a) => <span key={a} className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">Allergy: {a}</span>)}
              </div>
            </div>

            {/* Vitals */}
            {patientVitals.length > 0 && (
              <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm">Current Vitals</h3>
                <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
                  {[
                    { label: 'BP', value: patientVitals[0].bloodPressure },
                    { label: 'Sugar', value: patientVitals[0].sugarLevel },
                    { label: 'Temp', value: patientVitals[0].temperature },
                    { label: 'Pulse', value: `${patientVitals[0].pulseRate} bpm` },
                    { label: 'Weight', value: `${patientVitals[0].weight} kg` },
                    { label: 'SpO2', value: `${patientVitals[0].oxygenSaturation}%` },
                  ].map((v) => (
                    <div key={v.label} className="rounded-lg bg-surface p-2.5 text-center">
                      <p className="text-base font-bold text-doctor">{v.value}</p>
                      <p className="text-[10px] text-text-secondary">{v.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Insights for completed visits */}
            {aiData && showCompletedReview && (
              <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900 text-sm">AI-Assisted Insights</h3>
                </div>
                <div className="mb-3 rounded-lg bg-white/80 p-3 text-xs text-text-secondary">{aiData.consultationSummary}</div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Symptoms</h4>
                    <ul className="space-y-1">{aiData.extractedSymptoms.map((s) => {
                      const accepted = consultation?.acceptedSuggestions.includes(s)
                      const dismissed = consultation?.dismissedSuggestions.includes(s)
                      return (
                        <li key={s} className={`flex items-center gap-1 text-xs ${dismissed ? 'line-through opacity-50' : ''}`}>
                          <span className="text-text-secondary">• {s}</span>
                          {canInteractWithAiSuggestions && !accepted && !dismissed && (
                            <button onClick={() => dispatch({ type: 'APPLY_AI_SUGGESTION', suggestionType: 'symptom', value: s })} className="ml-auto text-[10px] text-purple-600 hover:underline">accept</button>
                          )}
                          {canInteractWithAiSuggestions && accepted && <CheckCircle className="ml-auto h-3 w-3 text-green-500" />}
                        </li>
                      )
                    })}</ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Probable Conditions</h4>
                    <ul className="space-y-1">{aiData.probableConditions.map((c) => (
                      <li key={c.condition} className="flex justify-between text-xs"><span>{c.condition}</span><span className="text-purple-600">{c.confidence}</span></li>
                    ))}</ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Suggested Tests</h4>
                    <ul className="space-y-1">{aiData.suggestedTests.map((t) => <li key={t} className="text-xs text-text-secondary">• {t}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Risk Alerts</h4>
                    <ul className="space-y-1">{aiData.riskAlerts.map((r) => (
                      <li key={r} className="flex items-start gap-1 text-xs text-red-600"><AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />{r}</li>
                    ))}</ul>
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2 text-[10px] text-amber-800">
                  <Shield className="inline h-3 w-3 mr-1" /> AI suggestions are assistive — final decisions remain under physician review.
                </div>
              </div>
            )}

            {/* Voice Transcription */}
            {isConsulting && consultation && patient && (
              <VoiceTranscription
                key={state.selectedPatientId}
                patient={patient}
                vitals={patientVitals[0]}
                queueComplaint={queueItem?.complaint}
                labHighlights={patientLabs.slice(0, 2).map((report) => report.summary.split('.')[0])}
                onTranscriptUpdate={() => {}}
                onFieldsExtracted={(fields) => {
                  dispatch({ type: 'UPDATE_CONSULTATION', consultation: { ...consultation, complaint: fields.complaint, diagnosis: fields.diagnosis, notes: fields.notes } })
                }}
              />
            )}

            {/* Diagnostic Imaging */}
            {isConsulting && <DiagnosticImaging />}

            {/* History & Labs side by side */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm">Visit History</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {patientVisits.map((v) => (
                    <div key={v.id} className="border-l-2 border-doctor pl-3">
                      <p className="text-[10px] text-text-secondary">{formatDate(v.date)} — {v.doctor}</p>
                      <p className="text-xs font-medium">{v.diagnosis || v.complaint}</p>
                      <p className="text-[10px] text-text-secondary">{v.notes}</p>
                    </div>
                  ))}
                  {patientVisits.length === 0 && <p className="text-xs text-text-secondary">No prior visits</p>}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm">Lab Reports</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {patientLabs.map((r) => (
                    <div key={r.id} className="rounded-lg border border-border p-2.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-medium">{r.title}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
                      </div>
                      <p className="text-[10px] text-text-secondary">{formatDate(r.date)} — {r.summary}</p>
                    </div>
                  ))}
                  {patientLabs.length === 0 && <p className="text-xs text-text-secondary">No lab reports</p>}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {aiData && isConsulting && !showCompletedReview && (
              <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900 text-sm">AI-Assisted Insights</h3>
                </div>
                <div className="mb-3 rounded-lg bg-white/80 p-3 text-xs text-text-secondary">{aiData.consultationSummary}</div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Symptoms</h4>
                    <ul className="space-y-1">{aiData.extractedSymptoms.map((s) => {
                      const accepted = consultation?.acceptedSuggestions.includes(s)
                      const dismissed = consultation?.dismissedSuggestions.includes(s)
                      return (
                        <li key={s} className={`flex items-center gap-1 text-xs ${dismissed ? 'line-through opacity-50' : ''}`}>
                          <span className="text-text-secondary">• {s}</span>
                          {canInteractWithAiSuggestions && !accepted && !dismissed && (
                            <button onClick={() => dispatch({ type: 'APPLY_AI_SUGGESTION', suggestionType: 'symptom', value: s })} className="ml-auto text-[10px] text-purple-600 hover:underline">accept</button>
                          )}
                          {canInteractWithAiSuggestions && accepted && <CheckCircle className="ml-auto h-3 w-3 text-green-500" />}
                        </li>
                      )
                    })}</ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Probable Conditions</h4>
                    <ul className="space-y-1">{aiData.probableConditions.map((c) => (
                      <li key={c.condition} className="flex justify-between text-xs"><span>{c.condition}</span><span className="text-purple-600">{c.confidence}</span></li>
                    ))}</ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Suggested Tests</h4>
                    <ul className="space-y-1">{aiData.suggestedTests.map((t) => <li key={t} className="text-xs text-text-secondary">• {t}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase text-purple-700 mb-1.5">Risk Alerts</h4>
                    <ul className="space-y-1">{aiData.riskAlerts.map((r) => (
                      <li key={r} className="flex items-start gap-1 text-xs text-red-600"><AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />{r}</li>
                    ))}</ul>
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2 text-[10px] text-amber-800">
                  <Shield className="inline h-3 w-3 mr-1" /> AI suggestions are assistive — final decisions remain under physician review.
                </div>
              </div>
            )}

            {/* Prescription form */}
            {showRxForm && state.prescriptionDraft && (
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-green-900 text-sm">Prescription</h3>
                <div className="space-y-2">
                  {state.prescriptionDraft.medicines.map((med, i) => (
                    <div key={i} className="grid grid-cols-[1fr_100px_100px_1fr_auto] gap-2 items-end">
                      <div>
                        {i === 0 && <label className="text-[10px] text-text-secondary">Medicine</label>}
                        <input className="w-full rounded border border-green-200 bg-white px-2 py-1.5 text-xs" value={med.name} onChange={(e) => {
                          const meds = [...state.prescriptionDraft!.medicines]
                          meds[i] = { ...meds[i], name: e.target.value }
                          dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, medicines: meds } })
                        }} />
                      </div>
                      <div>
                        {i === 0 && <label className="text-[10px] text-text-secondary">Dosage</label>}
                        <input className="w-full rounded border border-green-200 bg-white px-2 py-1.5 text-xs" value={med.dosage} onChange={(e) => {
                          const meds = [...state.prescriptionDraft!.medicines]
                          meds[i] = { ...meds[i], dosage: e.target.value }
                          dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, medicines: meds } })
                        }} />
                      </div>
                      <div>
                        {i === 0 && <label className="text-[10px] text-text-secondary">Duration</label>}
                        <input className="w-full rounded border border-green-200 bg-white px-2 py-1.5 text-xs" value={med.duration} onChange={(e) => {
                          const meds = [...state.prescriptionDraft!.medicines]
                          meds[i] = { ...meds[i], duration: e.target.value }
                          dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, medicines: meds } })
                        }} />
                      </div>
                      <div>
                        {i === 0 && <label className="text-[10px] text-text-secondary">Instructions</label>}
                        <input className="w-full rounded border border-green-200 bg-white px-2 py-1.5 text-xs" value={med.instructions} placeholder="e.g. Twice daily after meals" onChange={(e) => {
                          const meds = [...state.prescriptionDraft!.medicines]
                          meds[i] = { ...meds[i], instructions: e.target.value }
                          dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, medicines: meds } })
                        }} />
                      </div>
                      <button onClick={() => {
                        const meds = state.prescriptionDraft!.medicines.filter((_, j) => j !== i)
                        dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, medicines: meds } })
                      }} className="p-1.5 text-red-400 hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => {
                  const meds = [...state.prescriptionDraft!.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
                  dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, medicines: meds } })
                }} className="mt-2 flex items-center gap-1 text-xs text-green-700 hover:underline">
                  <Plus className="h-3 w-3" /> Add medicine
                </button>
                <div className="mt-3">
                  <label className="text-[10px] text-text-secondary">Follow-up</label>
                  <input className="mt-1 w-full rounded border border-green-200 bg-white px-2 py-1.5 text-xs" placeholder="e.g. Return in 1 week" value={state.prescriptionDraft.followUp} onChange={(e) => dispatch({ type: 'UPDATE_PRESCRIPTION_DRAFT', draft: { ...state.prescriptionDraft!, followUp: e.target.value } })} />
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={finalizePrescription} className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white">
                    Finalize Prescription
                  </button>
                  <button onClick={() => setShowRxForm(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-text-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Existing prescriptions */}
            {!showRxForm && (
              <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">Latest Prescription</h3>
                  {isConsulting && (
                    <button onClick={initPrescription} className="rounded-lg bg-doctor px-4 py-2 text-sm font-medium text-white">
                      Write Prescription
                    </button>
                  )}
                </div>

                {patientRx.length > 0 ? (
                  <>
                    <p className="mb-2 text-xs text-text-secondary">{patientRx[0].doctorName} — {formatDate(patientRx[0].date)}</p>
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-border text-left text-[10px] text-text-secondary"><th className="pb-1.5">Medicine</th><th className="pb-1.5">Dosage</th><th className="pb-1.5">Duration</th><th className="pb-1.5">Instructions</th></tr></thead>
                      <tbody>
                        {patientRx[0].medicines.map((m) => (
                          <tr key={m.name} className="border-b border-border"><td className="py-1.5 font-medium">{m.name}</td><td className="py-1.5">{m.dosage}</td><td className="py-1.5">{m.duration}</td><td className="py-1.5 text-text-secondary">{m.instructions}</td></tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-2 text-xs font-medium text-doctor">Follow-up: {patientRx[0].followUp}</p>
                  </>
                ) : (
                  <p className="text-xs text-text-secondary">No prescription has been issued for this patient yet.</p>
                )}
              </div>
            )}

            {/* Consultation notes */}
            {isConsulting && consultation && (
              <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-blue-900">Consultation Notes</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-blue-800">Chief Complaint</label>
                    <input className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm" value={consultation.complaint} onChange={(e) => dispatch({ type: 'UPDATE_CONSULTATION', consultation: { ...consultation, complaint: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-blue-800">Diagnosis</label>
                    <input className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm" value={consultation.diagnosis} placeholder="Enter diagnosis..." onChange={(e) => dispatch({ type: 'UPDATE_CONSULTATION', consultation: { ...consultation, diagnosis: e.target.value } })} />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-blue-800">Clinical Notes</label>
                  <textarea className="mt-1 w-full rounded-lg border border-blue-200 bg-white p-3 text-sm" rows={3} value={consultation.notes} placeholder="Examination findings, observations, plan..." onChange={(e) => dispatch({ type: 'UPDATE_CONSULTATION', consultation: { ...consultation, notes: e.target.value } })} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-border bg-white p-16">
            <p className="text-sm text-text-secondary">Select a patient from the queue</p>
          </div>
        )}
      </div>
    </div>
  )
}
