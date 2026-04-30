import type { ConsultationStep } from '../types'

export const consultationSteps: ConsultationStep[] = [
  { step: 1, title: 'Patient Arrives', description: 'Ananya Sharma arrives at the clinic for her scheduled follow-up appointment regarding blood sugar management.', role: 'patient' },
  { step: 2, title: 'Compounder Check-In', description: 'The compounder locates Ananya in the system using her patient ID (P001) and marks her as checked in.', role: 'compounder' },
  { step: 3, title: 'Vitals Recorded', description: 'Blood pressure (138/88), fasting sugar (165 mg/dL), temperature (98.4°F), pulse (82 bpm), weight (68 kg), and SpO2 (97%) are captured.', role: 'compounder' },
  { step: 4, title: 'Doctor Reviews History', description: 'Dr. Kavitha Menon opens Ananya\'s profile and reviews her 4 prior visits, existing conditions (Type 2 Diabetes, Hypertension), allergies, and recent lab reports including HbA1c at 7.8%.', role: 'doctor' },
  { step: 5, title: 'Consultation Notes', description: 'The doctor records today\'s complaint: "Follow-up for blood sugar management. Patient reports occasional dizziness in the mornings." Notes are added to the visit record.', role: 'doctor' },
  { step: 6, title: 'AI Suggestions Generated', description: 'The system surfaces sample AI-assisted insights: probable uncontrolled diabetes, risk alerts for cardiovascular complications, suggested tests, and a draft prescription recommendation.', role: 'system' },
  { step: 7, title: 'Doctor Reviews & Finalizes', description: 'Dr. Menon reviews the AI suggestions, adjusts the metformin dosage to 1000mg, adds atorvastatin for lipid management, and finalizes the prescription with a 1-week follow-up.', role: 'doctor' },
  { step: 8, title: 'Record Updated', description: 'The visit record, prescription, and patient timeline are updated. The compounder is notified that the consultation is complete.', role: 'system' },
  { step: 9, title: 'Patient Views Prescription', description: 'Ananya can now view her updated prescription, visit notes, and follow-up date through her patient portal.', role: 'patient' },
]
