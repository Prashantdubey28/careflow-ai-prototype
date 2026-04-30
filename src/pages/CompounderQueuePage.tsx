import { useDemo } from '../context/DemoContext'
import { ClipboardList, Search, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

export function CompounderQueuePage() {
  const { state, dispatch } = useDemo()
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const filtered = state.queue.filter((q) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return q.name.toLowerCase().includes(term) || q.patientId.toLowerCase().includes(term) || q.complaint.toLowerCase().includes(term)
  })

  function checkIn(patientId: string) {
    dispatch({ type: 'CHECK_IN_PATIENT', patientId })
    setToast('Patient checked in successfully')
    setTimeout(() => setToast(null), 3000)
  }

  const byStatus = {
    scheduled: state.queue.filter((q) => q.status === 'Scheduled').length,
    checkedIn: state.queue.filter((q) => q.status === 'Checked In').length,
    vitalsRecorded: state.queue.filter((q) => q.status === 'Vitals Recorded').length,
    withDoctor: state.queue.filter((q) => q.status === 'With Doctor').length,
    completed: state.queue.filter((q) => q.status === 'Completed').length,
  }

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-compounder" />
          <h1 className="text-xl font-bold">Check-In Queue</h1>
        </div>
        <span className="text-sm text-text-secondary">{state.queue.length} patients today</span>
      </div>

      {toast && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> {toast}
        </div>
      )}

      {/* Status summary */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {[
          { label: 'Scheduled', value: byStatus.scheduled, color: 'bg-gray-100 text-gray-700' },
          { label: 'Checked In', value: byStatus.checkedIn, color: 'bg-amber-100 text-amber-700' },
          { label: 'Vitals Done', value: byStatus.vitalsRecorded, color: 'bg-green-100 text-green-700' },
          { label: 'With Doctor', value: byStatus.withDoctor, color: 'bg-blue-100 text-blue-700' },
          { label: 'Completed', value: byStatus.completed, color: 'bg-gray-50 text-gray-500' },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg ${s.color} p-3 text-center`}>
            <p className="text-lg font-bold">{s.value}</p>
            <p className="text-[10px] font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
        <input className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm" placeholder="Search by name, ID, or complaint..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* Queue list */}
      <div className="rounded-xl border border-border bg-white shadow-sm">
        <div className="divide-y divide-border">
          {filtered.map((q) => (
            <div key={q.patientId} className="flex items-center gap-4 p-4">
              <div className={`h-3 w-3 rounded-full shrink-0 ${
                q.status === 'Completed' ? 'bg-gray-300' : q.status === 'With Doctor' ? 'bg-blue-500' : q.status === 'Vitals Recorded' ? 'bg-green-500' : q.status === 'Checked In' ? 'bg-amber-500' : 'bg-gray-400'
              }`} />
              <div className="flex-1">
                <p className="font-medium">{q.name} <span className="text-xs text-text-secondary">({q.patientId})</span></p>
                <p className="text-sm text-text-secondary">{q.complaint}</p>
                <p className="text-xs text-text-secondary flex items-center gap-1"><Clock className="h-3 w-3" /> {q.checkInTime}</p>
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
                <button onClick={() => checkIn(q.patientId)} className="rounded-lg bg-compounder px-4 py-2 text-xs font-medium text-white hover:bg-amber-600">
                  Check In
                </button>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p className="p-8 text-center text-sm text-text-secondary">No patients match your search</p>}
        </div>
      </div>
    </div>
  )
}
