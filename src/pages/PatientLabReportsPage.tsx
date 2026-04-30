import { useDemo } from '../context/DemoContext'
import { formatDate } from '../utils/format'
import { Building2, CalendarDays, ChevronDown, FileText, FlaskConical, Search, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'

type ResultFlag = 'normal' | 'high' | 'low' | 'borderline'

interface LabResultMetric {
  label: string
  value: string
  reference: string
  flag: ResultFlag
}

interface LabReportDisplay {
  category: string
  specimen: string
  facility: string
  orderedBy: string
  reviewedBy: string
  reviewedAt: string
  turnaround: string
  impression: string
  patientMessage: string
  results: LabResultMetric[]
}

const reportDetails: Record<string, LabReportDisplay> = {
  LR001: {
    category: 'Diabetes Monitoring',
    specimen: 'Whole blood (EDTA)',
    facility: 'JeevX Diagnostics, Ahmedabad',
    orderedBy: 'Dr. Kavitha Menon',
    reviewedBy: 'Dr. Kavitha Menon',
    reviewedAt: '12 Apr 2026, 10:40 AM',
    turnaround: 'Reported in 6 hours',
    impression: 'HbA1c remains above the usual target for a diabetes follow-up visit, suggesting the current regimen may need closer adjustment.',
    patientMessage: 'This result reflects average blood sugar control over the last 2-3 months and should be reviewed alongside home glucose readings.',
    results: [
      { label: 'HbA1c', value: '7.8%', reference: 'Target < 7.0%', flag: 'high' },
      { label: 'Estimated Avg Glucose', value: '177 mg/dL', reference: 'Target 80-154 mg/dL', flag: 'high' },
      { label: 'Processing Status', value: 'Verified', reference: 'Clinical lab review complete', flag: 'normal' },
    ],
  },
  LR002: {
    category: 'Hematology',
    specimen: 'Venous blood (EDTA)',
    facility: 'JeevX Central Lab, Ahmedabad',
    orderedBy: 'Dr. Kavitha Menon',
    reviewedBy: 'Dr. Kavitha Menon',
    reviewedAt: '12 Apr 2026, 11:15 AM',
    turnaround: 'Reported in 4 hours',
    impression: 'CBC is reassuring overall with no evidence of anemia, leukocytosis, or platelet abnormality on this sample.',
    patientMessage: 'This report checks red cells, white cells, and platelets. No urgent abnormalities are visible in the current sample.',
    results: [
      { label: 'Hemoglobin', value: '12.8 g/dL', reference: '12.0-15.0 g/dL', flag: 'normal' },
      { label: 'WBC', value: '7,200 /uL', reference: '4,000-11,000 /uL', flag: 'normal' },
      { label: 'Platelets', value: '2.65 lakh /uL', reference: '1.5-4.5 lakh /uL', flag: 'normal' },
    ],
  },
  LR003: {
    category: 'Cardiometabolic Risk',
    specimen: 'Serum (fasting)',
    facility: 'JeevX Preventive Lab, Ahmedabad',
    orderedBy: 'Dr. Kavitha Menon',
    reviewedBy: 'Dr. Kavitha Menon',
    reviewedAt: '5 Feb 2026, 9:10 AM',
    turnaround: 'Same-day reporting',
    impression: 'LDL and triglycerides remain above ideal range for a patient with diabetes and hypertension, which supports ongoing lipid-lowering counseling.',
    patientMessage: 'This panel helps estimate cholesterol-related heart risk. A few values are mildly elevated and worth monitoring at follow-up.',
    results: [
      { label: 'Total Cholesterol', value: '210 mg/dL', reference: 'Desirable < 200 mg/dL', flag: 'borderline' },
      { label: 'LDL', value: '138 mg/dL', reference: 'Goal < 100 mg/dL', flag: 'high' },
      { label: 'Triglycerides', value: '160 mg/dL', reference: 'Normal < 150 mg/dL', flag: 'borderline' },
      { label: 'HDL', value: '48 mg/dL', reference: 'Protective > 40 mg/dL', flag: 'normal' },
    ],
  },
}

function getReportDetails(report: { id: string; title: string; summary: string }): LabReportDisplay {
  return reportDetails[report.id] ?? {
    category: 'Routine Laboratory Report',
    specimen: 'Lab specimen',
    facility: 'JeevX Diagnostics',
    orderedBy: 'Assigned clinician',
    reviewedBy: 'Assigned clinician',
    reviewedAt: 'Reviewed today',
    turnaround: 'Standard turnaround',
    impression: report.summary,
    patientMessage: 'This report has been added to the patient record and is ready for clinician review.',
    results: [
      { label: 'Status', value: 'Available', reference: 'Detailed parameters on file', flag: 'normal' },
    ],
  }
}

function getResultTone(flag: ResultFlag) {
  switch (flag) {
    case 'high':
      return {
        badge: 'High',
        chipClass: 'border-rose-200 bg-rose-50 text-rose-700',
        valueClass: 'text-rose-700',
      }
    case 'low':
      return {
        badge: 'Low',
        chipClass: 'border-amber-200 bg-amber-50 text-amber-700',
        valueClass: 'text-amber-700',
      }
    case 'borderline':
      return {
        badge: 'Borderline',
        chipClass: 'border-amber-200 bg-amber-50 text-amber-700',
        valueClass: 'text-amber-700',
      }
    default:
      return {
        badge: 'Normal',
        chipClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        valueClass: 'text-emerald-700',
      }
  }
}

function getReportPriority(results: LabResultMetric[]) {
  if (results.some((result) => result.flag === 'high' || result.flag === 'low')) {
    return {
      label: 'Needs Follow-Up',
      className: 'border-rose-200 bg-rose-50 text-rose-700',
      panelClass: 'border-rose-100 bg-rose-50/60',
    }
  }

  if (results.some((result) => result.flag === 'borderline')) {
    return {
      label: 'Monitor Trend',
      className: 'border-amber-200 bg-amber-50 text-amber-700',
      panelClass: 'border-amber-100 bg-amber-50/60',
    }
  }

  return {
    label: 'Within Range',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    panelClass: 'border-emerald-100 bg-emerald-50/60',
  }
}

export function PatientLabReportsPage() {
  const { state } = useDemo()
  const patientId = 'P001'
  const allLabs = state.labReports.filter((r) => r.patientId === patientId)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(allLabs[0]?.id ?? null)

  const latestReport = allLabs.reduce((latest, report) => {
    if (!latest) return report
    return report.date > latest.date ? report : latest
  }, allLabs[0])

  const reportsNeedingFollowUp = allLabs.filter((report) => {
    const details = getReportDetails(report)
    return getReportPriority(details.results).label === 'Needs Follow-Up'
  }).length

  const filtered = allLabs.filter((r) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    const details = getReportDetails(r)
    const searchIndex = [
      r.title,
      r.summary,
      r.date,
      details.category,
      details.specimen,
      details.facility,
      details.orderedBy,
      details.reviewedBy,
      details.impression,
      details.patientMessage,
      ...details.results.map((result) => `${result.label} ${result.value} ${result.reference}`),
    ].join(' ').toLowerCase()

    return searchIndex.includes(term)
  })

  return (
    <div className="p-6">
      <section className="premium-panel reveal-up relative overflow-hidden rounded-[28px] p-6">
        <div className="ambient-orb -left-10 top-10 h-28 w-28 bg-patient/15" />
        <div className="ambient-orb right-6 top-0 h-24 w-24 bg-sky-200/40" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker mb-3">
              <FileText className="h-3.5 w-3.5 text-patient" />
              Patient Records
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Lab Reports</h1>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Structured pathology reports with clinician review details, key biomarkers, and patient-friendly interpretation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Total Reports</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{allLabs.length}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Latest Review</p>
              <p className="mt-2 text-sm font-semibold text-text-primary">{latestReport ? formatDate(latestReport.date) : 'N/A'}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Needs Follow-Up</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{reportsNeedingFollowUp}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mt-5">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-text-secondary" />
        <input
          className="w-full rounded-2xl border border-border bg-white/90 py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-patient focus:ring-4 focus:ring-patient/10"
          placeholder="Search by test name, clinician, lab, or result..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-5 space-y-4">
        {filtered.map((report) => {
          const details = getReportDetails(report)
          const priority = getReportPriority(details.results)
          const isExpanded = expandedId === report.id

          return (
            <article
              key={report.id}
              className={`premium-panel overflow-hidden rounded-[24px] border p-5 transition duration-200 ${isExpanded ? 'border-patient/40 shadow-[0_24px_60px_rgba(15,23,42,0.12)]' : 'border-border/80'}`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-patient/15 bg-patient/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-patient">
                      {details.category}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${report.status === 'Reviewed' ? 'bg-emerald-100 text-emerald-700' : report.status === 'Completed' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                      {report.status}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${priority.className}`}>
                      {priority.label}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-2xl font-semibold text-text-primary">{report.title}</h2>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4 text-patient" />
                          Collected {formatDate(report.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-4 w-4 text-patient" />
                          {details.facility}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : report.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-text-primary shadow-sm transition hover:border-patient/40 hover:bg-patient/5"
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                      <ChevronDown className={`h-4 w-4 transition ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr,0.95fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-patient" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Key Results</p>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {details.results.map((result) => {
                      const tone = getResultTone(result.flag)

                      return (
                        <div key={`${report.id}-${result.label}`} className={`rounded-2xl border p-3 ${tone.chipClass}`}>
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-medium">{result.label}</p>
                            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold">{tone.badge}</span>
                          </div>
                          <p className={`mt-2 text-lg font-semibold ${tone.valueClass}`}>{result.value}</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">{result.reference}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 ${priority.panelClass}`}>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-patient" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Clinical Impression</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-primary">{details.impression}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/70 bg-white/80 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">Ordered By</p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-text-primary">
                        <UserRound className="h-4 w-4 text-patient" />
                        {details.orderedBy}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/70 bg-white/80 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">Specimen</p>
                      <p className="mt-1 text-sm text-text-primary">{details.specimen}</p>
                    </div>
                    <div className="rounded-xl border border-white/70 bg-white/80 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">Reviewed By</p>
                      <p className="mt-1 text-sm text-text-primary">{details.reviewedBy}</p>
                    </div>
                    <div className="rounded-xl border border-white/70 bg-white/80 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">Turnaround</p>
                      <p className="mt-1 text-sm text-text-primary">{details.turnaround}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Report Summary</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-primary">{report.summary}</p>
                    <p className="mt-3 text-xs text-text-secondary">Verified on {details.reviewedAt}</p>
                  </div>
                  <div className="rounded-2xl border border-patient/15 bg-patient/5 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-patient">Patient-Friendly Note</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-primary">{details.patientMessage}</p>
                  </div>
                </div>
              )}
            </article>
          )
        })}

        {filtered.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-border bg-white/70 px-6 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-text-primary">No reports match your search</p>
            <p className="mt-1 text-sm text-text-secondary">Try a test name like &quot;HbA1c&quot;, &quot;CBC&quot;, or a clinician name.</p>
          </div>
        )}
      </div>
    </div>
  )
}
