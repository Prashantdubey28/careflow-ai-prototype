import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { DemoState, DemoAction, ClinicUser, Vitals, QueueItem, Notification, VisitRecord, Prescription, ActivityEvent, DraftConsultation } from '../types'
import { patients, vitalsHistory, visitRecords, waitingQueue } from '../data/patients'
import { prescriptions } from '../data/prescriptions'
import { labReports } from '../data/reports'
import { aiSuggestions } from '../data/ai'
import { notifications, appointments } from '../data/dashboard'

const STORAGE_KEY = 'careflow-demo:v1'

const DEMO_USERS: Record<string, ClinicUser> = {
  doctor: { id: 'U001', name: 'Dr. Kavitha Menon', role: 'doctor', title: 'General Medicine' },
  compounder: { id: 'U002', name: 'Ravi Kumar', role: 'compounder', title: 'Senior Compounder' },
  patient: { id: 'U003', name: 'Ananya Sharma', role: 'patient', title: 'Patient' },
}

function seedState(): DemoState {
  const queue: QueueItem[] = waitingQueue.map((q) => ({ ...q, status: q.status as QueueItem['status'] }))
  return {
    role: null,
    selectedPatientId: 'P001',
    patients: [...patients],
    queue,
    vitals: [...vitalsHistory],
    vitalsDraft: null,
    visits: [...visitRecords],
    prescriptions: [...prescriptions],
    prescriptionDraft: null,
    labReports: [...labReports],
    aiSuggestions: [...aiSuggestions],
    consultation: null,
    notifications: [...notifications],
    appointments: [...appointments],
    activityLog: [],
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function today() {
  return new Date().toISOString().split('T')[0]
}

function now() {
  return new Date().toISOString()
}

function addActivity(_state: DemoState, role: ActivityEvent['role'], action: string, patientId?: string): ActivityEvent {
  return { id: makeId(), timestamp: now(), role, action, patientId }
}

function reducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'SEED_DEMO':
      return seedState()

    case 'LOAD_DEMO':
      return action.state

    case 'SELECT_ROLE':
      return { ...state, role: action.user }

    case 'SELECT_PATIENT':
      return { ...state, selectedPatientId: action.patientId, vitalsDraft: null, consultation: null, prescriptionDraft: null }

    case 'CHECK_IN_PATIENT': {
      const q = state.queue.map((item) =>
        item.patientId === action.patientId && item.status === 'Scheduled'
          ? { ...item, status: 'Checked In' as const }
          : item
      )
      const evt = addActivity(state, 'compounder', `Checked in patient`, action.patientId)
      return { ...state, queue: q, activityLog: [...state.activityLog, evt] }
    }

    case 'UPDATE_COMPLAINT': {
      const q = state.queue.map((item) =>
        item.patientId === action.patientId ? { ...item, complaint: action.complaint } : item
      )
      return { ...state, queue: q }
    }

    case 'UPDATE_VITALS_DRAFT':
      return { ...state, vitalsDraft: action.draft }

    case 'SAVE_VITALS': {
      const draft = state.vitalsDraft
      if (!draft || draft.patientId !== action.patientId) return state
      const newVitals: Vitals = {
        patientId: action.patientId,
        date: today(),
        bloodPressure: draft.bloodPressure,
        sugarLevel: draft.sugarLevel,
        temperature: draft.temperature,
        pulseRate: Number(draft.pulseRate) || 0,
        weight: Number(draft.weight) || 0,
        oxygenSaturation: Number(draft.oxygenSaturation) || 0,
      }
      const q = state.queue.map((item) =>
        item.patientId === action.patientId && (item.status === 'Checked In' || item.status === 'Vitals Recorded')
          ? { ...item, status: 'Vitals Recorded' as const }
          : item
      )
      const evt = addActivity(state, 'compounder', `Recorded vitals`, action.patientId)
      const notif: Notification = { id: makeId(), patientId: action.patientId, message: 'Vitals have been recorded for your visit today', date: today(), type: 'reminder' }
      return { ...state, vitals: [newVitals, ...state.vitals], queue: q, vitalsDraft: null, activityLog: [...state.activityLog, evt], notifications: [notif, ...state.notifications] }
    }

    case 'START_CONSULTATION': {
      const q = state.queue.map((item) =>
        item.patientId === action.patientId ? { ...item, status: 'With Doctor' as const } : item
      )
      const queueItem = state.queue.find((item) => item.patientId === action.patientId)
      const consultation: DraftConsultation = {
        patientId: action.patientId,
        complaint: queueItem?.complaint || '',
        notes: '',
        diagnosis: '',
        acceptedSuggestions: [],
        dismissedSuggestions: [],
      }
      const evt = addActivity(state, 'doctor', `Started consultation`, action.patientId)
      return { ...state, queue: q, consultation, selectedPatientId: action.patientId, activityLog: [...state.activityLog, evt] }
    }

    case 'EDIT_COMPLETED_VISIT': {
      const visit = state.visits.find((item) => item.patientId === action.patientId)
      if (!visit) return state

      const consultation: DraftConsultation = {
        patientId: action.patientId,
        visitId: visit.id,
        complaint: visit.complaint,
        notes: visit.notes,
        diagnosis: visit.diagnosis,
        acceptedSuggestions: [],
        dismissedSuggestions: [],
      }

      const evt = addActivity(state, 'doctor', `Reopened completed visit`, action.patientId)
      return {
        ...state,
        consultation,
        selectedPatientId: action.patientId,
        prescriptionDraft: null,
        activityLog: [...state.activityLog, evt],
      }
    }

    case 'UPDATE_CONSULTATION':
      return { ...state, consultation: action.consultation }

    case 'APPLY_AI_SUGGESTION': {
      if (!state.consultation) return state
      return { ...state, consultation: { ...state.consultation, acceptedSuggestions: [...state.consultation.acceptedSuggestions, action.value] } }
    }

    case 'DISMISS_AI_SUGGESTION': {
      if (!state.consultation) return state
      return { ...state, consultation: { ...state.consultation, dismissedSuggestions: [...state.consultation.dismissedSuggestions, action.value] } }
    }

    case 'UPDATE_PRESCRIPTION_DRAFT':
      return { ...state, prescriptionDraft: action.draft }

    case 'FINALIZE_PRESCRIPTION': {
      const draft = state.prescriptionDraft
      if (!draft) return state
      const rxId = `RX-${makeId()}`
      const rx: Prescription = {
        id: rxId,
        patientId: action.patientId,
        doctorName: 'Dr. Kavitha Menon',
        date: today(),
        medicines: draft.medicines,
        followUp: draft.followUp,
      }
      const evt = addActivity(state, 'doctor', `Finalized prescription`, action.patientId)
      const notif: Notification = { id: makeId(), patientId: action.patientId, message: `New prescription from Dr. Kavitha Menon is ready`, date: today(), type: 'prescription' }
      return { ...state, prescriptions: [rx, ...state.prescriptions], prescriptionDraft: null, activityLog: [...state.activityLog, evt], notifications: [notif, ...state.notifications] }
    }

    case 'COMPLETE_VISIT': {
      const consultation = state.consultation
      if (!consultation) return state
      const existingVisit = consultation.visitId ? state.visits.find((visit) => visit.id === consultation.visitId) : null
      const visitId = consultation.visitId ?? `V-${makeId()}`
      const visit: VisitRecord = {
        id: visitId,
        patientId: action.patientId,
        date: today(),
        doctor: 'Dr. Kavitha Menon',
        complaint: consultation.complaint,
        diagnosis: consultation.diagnosis,
        notes: consultation.notes,
        prescriptionId: existingVisit?.prescriptionId,
      }
      const q = state.queue.map((item) =>
        item.patientId === action.patientId ? { ...item, status: 'Completed' as const } : item
      )
      const nextVisits = consultation.visitId
        ? state.visits.map((item) => (item.id === consultation.visitId ? visit : item))
        : [visit, ...state.visits]
      const evt = addActivity(state, 'doctor', consultation.visitId ? `Updated completed visit` : `Completed visit`, action.patientId)
      const notif: Notification = { id: makeId(), patientId: action.patientId, message: `Visit completed — view your updated records`, date: today(), type: 'appointment' }
      return {
        ...state,
        visits: nextVisits,
        queue: q,
        consultation: null,
        prescriptionDraft: null,
        activityLog: [...state.activityLog, evt],
        notifications: consultation.visitId ? state.notifications : [notif, ...state.notifications],
      }
    }

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.notification, ...state.notifications] }

    case 'RESET_DEMO': {
      const nextState = seedState()
      return { ...nextState, role: action.preserveRole ?? null }
    }

    default:
      return state
  }
}

interface DemoContextValue {
  state: DemoState
  dispatch: React.Dispatch<DemoAction>
  users: typeof DEMO_USERS
}

const DemoCtx = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as DemoState
        if (parsed.patients && parsed.queue) return parsed
      }
    } catch { /* ignore */ }
    return seedState()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return <DemoCtx.Provider value={{ state, dispatch, users: DEMO_USERS }}>{children}</DemoCtx.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoCtx)
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider')
  return ctx
}

export { DEMO_USERS }
