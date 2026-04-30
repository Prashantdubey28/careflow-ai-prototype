export interface Patient {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  phone: string
  lastVisit: string
  conditions: string[]
  allergies: string[]
  riskBadge?: string
}

export interface Vitals {
  patientId: string
  date: string
  bloodPressure: string
  sugarLevel: string
  temperature: string
  pulseRate: number
  weight: number
  oxygenSaturation: number
}

export interface VisitRecord {
  id: string
  patientId: string
  date: string
  doctor: string
  complaint: string
  diagnosis: string
  notes: string
  prescriptionId?: string
}

export interface Prescription {
  id: string
  patientId: string
  doctorName: string
  date: string
  medicines: { name: string; dosage: string; duration: string; instructions: string }[]
  followUp: string
}

export interface LabReport {
  id: string
  patientId: string
  title: string
  date: string
  status: 'Completed' | 'Pending' | 'Reviewed'
  summary: string
}

export interface AiSuggestion {
  patientId: string
  extractedSymptoms: string[]
  probableConditions: { condition: string; confidence: string }[]
  suggestedTests: string[]
  riskAlerts: string[]
  draftPrescription: { name: string; dosage: string; duration: string }[]
  consultationSummary: string
}

export interface Notification {
  id: string
  patientId: string
  message: string
  date: string
  type: 'appointment' | 'report' | 'prescription' | 'reminder'
}

export interface Appointment {
  id: string
  patientId: string
  date: string
  time: string
  doctor: string
  status: 'Scheduled' | 'Completed' | 'Cancelled'
}

export interface ConsultationStep {
  step: number
  title: string
  description: string
  role: 'compounder' | 'doctor' | 'patient' | 'system'
}

export interface ClinicUser {
  id: string
  name: string
  role: 'doctor' | 'compounder' | 'patient'
  title: string
}

export interface DashboardMetric {
  label: string
  value: string | number
  icon: string
  change?: string
}

// --- Demo State Types ---

export interface QueueItem {
  patientId: string
  name: string
  checkInTime: string
  status: 'Scheduled' | 'Checked In' | 'Vitals Recorded' | 'With Doctor' | 'Completed'
  complaint: string
}

export interface DraftVitals {
  patientId: string
  bloodPressure: string
  sugarLevel: string
  temperature: string
  pulseRate: string
  weight: string
  oxygenSaturation: string
  notes: string
}

export interface DraftConsultation {
  patientId: string
  visitId?: string
  complaint: string
  notes: string
  diagnosis: string
  acceptedSuggestions: string[]
  dismissedSuggestions: string[]
}

export interface PrescriptionDraft {
  patientId: string
  medicines: { name: string; dosage: string; duration: string; instructions: string }[]
  followUp: string
}

export interface ActivityEvent {
  id: string
  timestamp: string
  role: 'doctor' | 'compounder' | 'patient' | 'system'
  action: string
  patientId?: string
}

export interface DemoState {
  role: ClinicUser | null
  selectedPatientId: string
  patients: Patient[]
  queue: QueueItem[]
  vitals: Vitals[]
  vitalsDraft: DraftVitals | null
  visits: VisitRecord[]
  prescriptions: Prescription[]
  prescriptionDraft: PrescriptionDraft | null
  labReports: LabReport[]
  aiSuggestions: AiSuggestion[]
  consultation: DraftConsultation | null
  notifications: Notification[]
  appointments: Appointment[]
  activityLog: ActivityEvent[]
}

export type DemoAction =
  | { type: 'SEED_DEMO' }
  | { type: 'LOAD_DEMO'; state: DemoState }
  | { type: 'SELECT_ROLE'; user: ClinicUser }
  | { type: 'SELECT_PATIENT'; patientId: string }
  | { type: 'CHECK_IN_PATIENT'; patientId: string }
  | { type: 'UPDATE_COMPLAINT'; patientId: string; complaint: string }
  | { type: 'UPDATE_VITALS_DRAFT'; draft: DraftVitals }
  | { type: 'SAVE_VITALS'; patientId: string }
  | { type: 'START_CONSULTATION'; patientId: string }
  | { type: 'EDIT_COMPLETED_VISIT'; patientId: string }
  | { type: 'UPDATE_CONSULTATION'; consultation: DraftConsultation }
  | { type: 'APPLY_AI_SUGGESTION'; suggestionType: string; value: string }
  | { type: 'DISMISS_AI_SUGGESTION'; suggestionType: string; value: string }
  | { type: 'UPDATE_PRESCRIPTION_DRAFT'; draft: PrescriptionDraft }
  | { type: 'FINALIZE_PRESCRIPTION'; patientId: string }
  | { type: 'COMPLETE_VISIT'; patientId: string }
  | { type: 'ADD_NOTIFICATION'; notification: Notification }
  | { type: 'RESET_DEMO'; preserveRole?: ClinicUser | null }
