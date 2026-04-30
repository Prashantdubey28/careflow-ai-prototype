import type { Notification, Appointment } from '../types'

export const notifications: Notification[] = [
  { id: 'N001', patientId: 'P001', message: 'Your prescription from Apr 25 is ready to view', date: '2026-04-25', type: 'prescription' },
  { id: 'N002', patientId: 'P001', message: 'Lab report: HbA1c results are available', date: '2026-04-12', type: 'report' },
  { id: 'N003', patientId: 'P001', message: 'Follow-up appointment scheduled for Apr 29', date: '2026-04-26', type: 'appointment' },
  { id: 'N004', patientId: 'P001', message: 'Reminder: Take Metformin 1000mg after dinner', date: '2026-04-29', type: 'reminder' },
]

export const appointments: Appointment[] = [
  { id: 'A001', patientId: 'P001', date: '2026-04-29', time: '09:15 AM', doctor: 'Dr. Kavitha Menon', status: 'Scheduled' },
  { id: 'A002', patientId: 'P001', date: '2026-04-25', time: '10:00 AM', doctor: 'Dr. Kavitha Menon', status: 'Completed' },
  { id: 'A003', patientId: 'P002', date: '2026-04-22', time: '11:30 AM', doctor: 'Dr. Kavitha Menon', status: 'Completed' },
]
