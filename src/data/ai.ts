import type { AiSuggestion } from '../types'

export const aiSuggestions: AiSuggestion[] = [
  {
    patientId: 'P001',
    extractedSymptoms: [
      'Elevated fasting blood sugar (165 mg/dL)',
      'Blood pressure above target (138/88)',
      'Mild dizziness reported in last visit',
      'HbA1c at 7.8% — above 7% target',
      'Borderline cholesterol levels',
    ],
    probableConditions: [
      { condition: 'Uncontrolled Type 2 Diabetes Mellitus', confidence: 'High' },
      { condition: 'Stage 1 Hypertension — inadequately controlled', confidence: 'High' },
      { condition: 'Dyslipidemia risk', confidence: 'Moderate' },
    ],
    suggestedTests: [
      'Fasting blood glucose',
      'Post-prandial blood glucose',
      'Renal function panel (eGFR, creatinine)',
      'Urine microalbumin',
      'Updated lipid panel',
    ],
    riskAlerts: [
      'HbA1c trending upward over 3 months — consider medication adjustment',
      'Combined diabetes and hypertension increases cardiovascular risk',
      'Penicillin allergy noted — avoid beta-lactam antibiotics',
    ],
    draftPrescription: [
      { name: 'Metformin', dosage: '1000mg twice daily', duration: '30 days' },
      { name: 'Amlodipine', dosage: '5mg once daily', duration: '30 days' },
      { name: 'Atorvastatin', dosage: '10mg once daily', duration: '30 days' },
    ],
    consultationSummary: 'Ananya Sharma, 34F, presents for follow-up of Type 2 Diabetes and Hypertension. Current vitals show BP 138/88 and fasting sugar 165 mg/dL. HbA1c (7.8%) is above the 7% target and has increased from the previous reading. Current metformin dosage may need upward adjustment. Blood pressure remains in Stage 1 range despite amlodipine 5mg. Lipid profile from February showed borderline total cholesterol and elevated LDL, suggesting statin therapy may be beneficial. Patient has a known penicillin allergy. Recommend addressing glycemic control as the primary concern, with cardiovascular risk mitigation as a secondary priority.',
  },
]
