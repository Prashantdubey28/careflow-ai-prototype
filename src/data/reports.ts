import type { LabReport } from '../types'

export const labReports: LabReport[] = [
  {
    id: 'LR001',
    patientId: 'P001',
    title: 'HbA1c Test',
    date: '2026-04-12',
    status: 'Reviewed',
    summary: 'HbA1c: 7.8%. Above target range (< 7%). Indicates need for tighter glycemic control.',
  },
  {
    id: 'LR002',
    patientId: 'P001',
    title: 'Complete Blood Count (CBC)',
    date: '2026-04-12',
    status: 'Reviewed',
    summary: 'All parameters within normal limits. Hemoglobin 12.8 g/dL. WBC 7,200/μL.',
  },
  {
    id: 'LR003',
    patientId: 'P001',
    title: 'Fasting Lipid Profile',
    date: '2026-02-05',
    status: 'Reviewed',
    summary: 'Total cholesterol 210 mg/dL (borderline). LDL 138 mg/dL (above optimal). HDL 48 mg/dL. Triglycerides 160 mg/dL.',
  },
  {
    id: 'LR004',
    patientId: 'P002',
    title: 'Pulmonary Function Test',
    date: '2026-04-20',
    status: 'Completed',
    summary: 'FEV1: 78% predicted. Mild obstruction consistent with known asthma. Reversibility test positive.',
  },
]
