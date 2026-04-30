import { useDemo } from '../context/DemoContext'
import { Brain, AlertTriangle, Shield, Pill, Stethoscope, FlaskConical, ClipboardList } from 'lucide-react'

export function AiInsightsPage() {
  const { state } = useDemo()
  const ai = state.aiSuggestions[0]
  if (!ai) return <div className="p-6 text-text-secondary">No AI insights available.</div>

  const patient = state.patients.find((p) => p.id === ai.patientId)

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
          <Brain className="h-4 w-4" /> AI-Assisted Clinical Insights
        </div>
        <h1 className="text-xl font-bold mb-2">How AI Supports the Doctor</h1>
        <p className="text-sm text-text-secondary max-w-2xl">The platform uses AI to organize patient information, surface patterns, and suggest next steps. All outputs are advisory — the doctor reviews and makes final decisions.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-4 mb-8">
        {[
          { icon: ClipboardList, title: 'Summarize', desc: 'Organizes visit context into a clinical summary.' },
          { icon: Stethoscope, title: 'Suggest', desc: 'Proposes probable conditions from symptoms and history.' },
          { icon: FlaskConical, title: 'Recommend', desc: 'Suggests lab tests to confirm or rule out diagnoses.' },
          { icon: AlertTriangle, title: 'Alert', desc: 'Flags allergies, interactions, and escalating trends.' },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
            <item.icon className="mx-auto mb-2 h-5 w-5 text-purple-600" />
            <h3 className="text-xs font-semibold mb-0.5">{item.title}</h3>
            <p className="text-[10px] text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-bold mb-3">Sample Output — {patient?.name || 'Patient'}</h2>

      <div className="mb-5 rounded-xl border border-purple-200 bg-purple-50 p-5">
        <h3 className="flex items-center gap-2 text-xs font-semibold text-purple-800 mb-2"><ClipboardList className="h-4 w-4" /> Summary</h3>
        <p className="text-xs text-text-secondary leading-relaxed">{ai.consultationSummary}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 mb-5">
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-xs font-semibold mb-2"><Stethoscope className="h-4 w-4 text-purple-600" /> Extracted Symptoms</h3>
          <ul className="space-y-1">
            {ai.extractedSymptoms.map((s) => <li key={s} className="flex items-start gap-2 text-xs text-text-secondary"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" /> {s}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-xs font-semibold mb-2"><Brain className="h-4 w-4 text-purple-600" /> Probable Conditions</h3>
          <div className="space-y-2">
            {ai.probableConditions.map((c) => (
              <div key={c.condition} className="flex items-center justify-between rounded-lg bg-surface p-2.5">
                <span className="text-xs font-medium">{c.condition}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${c.confidence === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{c.confidence}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-xs font-semibold mb-2"><FlaskConical className="h-4 w-4 text-purple-600" /> Suggested Tests</h3>
          <ul className="space-y-1">
            {ai.suggestedTests.map((t) => <li key={t} className="text-xs text-text-secondary">• {t}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="flex items-center gap-2 text-xs font-semibold text-red-800 mb-2"><AlertTriangle className="h-4 w-4" /> Risk Alerts</h3>
          <ul className="space-y-1">
            {ai.riskAlerts.map((r) => <li key={r} className="flex items-start gap-1 text-xs text-red-700"><AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" /> {r}</li>)}
          </ul>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-xs font-semibold mb-2"><Pill className="h-4 w-4 text-purple-600" /> Draft Prescription</h3>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border text-left text-[10px] text-text-secondary"><th className="pb-1.5">Medicine</th><th className="pb-1.5">Dosage</th><th className="pb-1.5">Duration</th></tr></thead>
          <tbody>
            {ai.draftPrescription.map((m) => (
              <tr key={m.name} className="border-b border-border last:border-0"><td className="py-1.5 font-medium">{m.name}</td><td className="py-1.5">{m.dosage}</td><td className="py-1.5">{m.duration}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center">
        <Shield className="mx-auto mb-1.5 h-5 w-5 text-amber-600" />
        <p className="text-xs font-medium text-amber-800 mb-0.5">AI outputs are assistive</p>
        <p className="text-[10px] text-amber-700">All suggestions require physician review before clinical action. Outputs shown are sample data.</p>
      </div>
    </div>
  )
}
