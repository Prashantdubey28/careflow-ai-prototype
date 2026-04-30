import type { Patient, Vitals, VisitRecord } from '../types'

export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'Ananya Sharma',
    age: 34,
    gender: 'Female',
    phone: '+91 98765 43210',
    lastVisit: '2026-04-25',
    conditions: ['Type 2 Diabetes', 'Hypertension'],
    allergies: ['Penicillin'],
    riskBadge: 'Chronic Care',
  },
  {
    id: 'P002',
    name: 'Rajesh Patel',
    age: 52,
    gender: 'Male',
    phone: '+91 87654 32109',
    lastVisit: '2026-04-22',
    conditions: ['Asthma'],
    allergies: [],
  },
  {
    id: 'P003',
    name: 'Meera Iyer',
    age: 28,
    gender: 'Female',
    phone: '+91 76543 21098',
    lastVisit: '2026-04-20',
    conditions: [],
    allergies: ['Sulfa drugs'],
  },
  {
    id: 'P004',
    name: 'Vikram Singh',
    age: 45,
    gender: 'Male',
    phone: '+91 65432 10987',
    lastVisit: '2026-04-18',
    conditions: ['Hyperlipidemia'],
    allergies: [],
  },
  {
    id: 'P005',
    name: 'Priya Nair',
    age: 61,
    gender: 'Female',
    phone: '+91 54321 09876',
    lastVisit: '2026-04-15',
    conditions: ['Osteoarthritis', 'Hypertension'],
    allergies: ['Aspirin'],
    riskBadge: 'Elderly Care',
  },
  {
    id: 'P006',
    name: 'Arjun Deshmukh',
    age: 19,
    gender: 'Male',
    phone: '+91 43210 98765',
    lastVisit: '2026-04-28',
    conditions: [],
    allergies: [],
  },
]

export const flagshipPatientId = 'P001'

export const vitalsHistory: Vitals[] = [
  { patientId: 'P001', date: '2026-04-29', bloodPressure: '138/88', sugarLevel: '165 mg/dL', temperature: '98.4°F', pulseRate: 82, weight: 68, oxygenSaturation: 97 },
  { patientId: 'P001', date: '2026-04-25', bloodPressure: '142/90', sugarLevel: '172 mg/dL', temperature: '98.6°F', pulseRate: 78, weight: 68.5, oxygenSaturation: 98 },
  { patientId: 'P001', date: '2026-04-10', bloodPressure: '135/85', sugarLevel: '158 mg/dL', temperature: '98.2°F', pulseRate: 80, weight: 67.8, oxygenSaturation: 97 },
  { patientId: 'P001', date: '2026-03-15', bloodPressure: '140/92', sugarLevel: '180 mg/dL', temperature: '99.1°F', pulseRate: 85, weight: 69, oxygenSaturation: 96 },
  { patientId: 'P002', date: '2026-04-22', bloodPressure: '120/80', sugarLevel: '95 mg/dL', temperature: '98.6°F', pulseRate: 74, weight: 82, oxygenSaturation: 95 },
  { patientId: 'P003', date: '2026-04-20', bloodPressure: '118/76', sugarLevel: '90 mg/dL', temperature: '98.8°F', pulseRate: 72, weight: 58, oxygenSaturation: 99 },
  { patientId: 'P006', date: '2026-04-28', bloodPressure: '122/78', sugarLevel: '88 mg/dL', temperature: '100.2°F', pulseRate: 90, weight: 72, oxygenSaturation: 98 },
]

export const visitRecords: VisitRecord[] = [
  { id: 'V001', patientId: 'P001', date: '2026-04-25', doctor: 'Dr. Kavitha Menon', complaint: 'Elevated blood sugar, mild dizziness', diagnosis: 'Uncontrolled diabetes with hypertension', notes: 'Adjusted metformin dosage. Advised dietary modifications. Follow-up in 1 week.', prescriptionId: 'RX001' },
  { id: 'V002', patientId: 'P001', date: '2026-04-10', doctor: 'Dr. Kavitha Menon', complaint: 'Routine follow-up', diagnosis: 'Diabetes management review', notes: 'Blood sugar trending slightly above target. Continued current medication. Lab work ordered.', prescriptionId: 'RX002' },
  { id: 'V003', patientId: 'P001', date: '2026-03-15', doctor: 'Dr. Kavitha Menon', complaint: 'Persistent headaches, fatigue', diagnosis: 'Hypertension flare-up, possible stress', notes: 'Increased amlodipine dose. Recommended stress management and sleep improvement.', prescriptionId: 'RX003' },
  { id: 'V004', patientId: 'P001', date: '2026-02-01', doctor: 'Dr. Kavitha Menon', complaint: 'Initial assessment', diagnosis: 'Type 2 Diabetes Mellitus, Stage 1 Hypertension', notes: 'New patient intake. Started on metformin 500mg and amlodipine 5mg. Baseline labs ordered.' },
  { id: 'V005', patientId: 'P002', date: '2026-04-22', doctor: 'Dr. Kavitha Menon', complaint: 'Breathing difficulty during exercise', diagnosis: 'Exercise-induced asthma exacerbation', notes: 'Prescribed rescue inhaler. Advised peak flow monitoring.' },
  { id: 'V006', patientId: 'P006', date: '2026-04-28', doctor: 'Dr. Kavitha Menon', complaint: 'Fever and sore throat for 3 days', diagnosis: 'Acute pharyngitis', notes: 'Throat culture sent. Started symptomatic treatment. Return if fever persists beyond 48 hours.' },
]

export const waitingQueue = [
  { patientId: 'P001', name: 'Ananya Sharma', checkInTime: '09:15 AM', status: 'Vitals Recorded' as const, complaint: 'Follow-up: blood sugar review' },
  { patientId: 'P006', name: 'Arjun Deshmukh', checkInTime: '09:30 AM', status: 'Vitals Recorded' as const, complaint: 'Fever and sore throat' },
  { patientId: 'P003', name: 'Meera Iyer', checkInTime: '09:45 AM', status: 'Checked In' as const, complaint: 'Skin rash on forearms' },
  { patientId: 'P004', name: 'Vikram Singh', checkInTime: '10:00 AM', status: 'Checked In' as const, complaint: 'Routine cholesterol check' },
  { patientId: 'P005', name: 'Priya Nair', checkInTime: '10:30 AM', status: 'Scheduled' as const, complaint: 'Joint pain follow-up' },
]
