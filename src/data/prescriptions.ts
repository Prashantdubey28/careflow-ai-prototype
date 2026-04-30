import type { Prescription } from '../types'

export const prescriptions: Prescription[] = [
  {
    id: 'RX001',
    patientId: 'P001',
    doctorName: 'Dr. Kavitha Menon',
    date: '2026-04-25',
    medicines: [
      { name: 'Metformin', dosage: '1000mg', duration: '30 days', instructions: 'Twice daily after meals' },
      { name: 'Amlodipine', dosage: '5mg', duration: '30 days', instructions: 'Once daily in the morning' },
      { name: 'Vitamin D3', dosage: '60000 IU', duration: '8 weeks', instructions: 'Once weekly after breakfast' },
    ],
    followUp: 'Return in 1 week for blood sugar review',
  },
  {
    id: 'RX002',
    patientId: 'P001',
    doctorName: 'Dr. Kavitha Menon',
    date: '2026-04-10',
    medicines: [
      { name: 'Metformin', dosage: '500mg', duration: '15 days', instructions: 'Twice daily after meals' },
      { name: 'Amlodipine', dosage: '5mg', duration: '15 days', instructions: 'Once daily in the morning' },
    ],
    followUp: 'Follow-up in 2 weeks with fasting blood sugar report',
  },
  {
    id: 'RX003',
    patientId: 'P001',
    doctorName: 'Dr. Kavitha Menon',
    date: '2026-03-15',
    medicines: [
      { name: 'Metformin', dosage: '500mg', duration: '30 days', instructions: 'Twice daily after meals' },
      { name: 'Amlodipine', dosage: '10mg', duration: '30 days', instructions: 'Once daily in the morning' },
      { name: 'Paracetamol', dosage: '500mg', duration: '5 days', instructions: 'As needed for headache, max 3 per day' },
    ],
    followUp: 'Return in 1 month or sooner if headaches persist',
  },
  {
    id: 'RX004',
    patientId: 'P006',
    doctorName: 'Dr. Kavitha Menon',
    date: '2026-04-28',
    medicines: [
      { name: 'Paracetamol', dosage: '650mg', duration: '5 days', instructions: 'Three times daily after meals' },
      { name: 'Cetirizine', dosage: '10mg', duration: '5 days', instructions: 'Once at bedtime' },
      { name: 'Betadine Gargle', dosage: '2% solution', duration: '5 days', instructions: 'Gargle 3 times daily' },
    ],
    followUp: 'Return if fever does not subside in 48 hours',
  },
]
