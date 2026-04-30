import { useState } from 'react'
import { Brain, ChevronDown, ChevronUp } from 'lucide-react'

interface AiSummaryPanelProps {
  patientName: string
  age: number
  gender: string
  conditions: string[]
  allergies: string[]
  complaint: string
  vitals?: { bloodPressure: string; sugarLevel: string; pulseRate: number; oxygenSaturation: number }
  labHighlights?: string[]
}

export function AiSummaryPanel({ patientName, age, gender, conditions, allergies, complaint, vitals, labHighlights }: AiSummaryPanelProps) {
  const [expanded, setExpanded] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  function generateSummary() {
    setGenerating(true)
    setSummary(null)

    const parts: string[] = []

    parts.push(`**Patient**: ${patientName}, ${age}${gender.charAt(0)}.`)

    if (conditions.length > 0) {
      parts.push(`**Known conditions**: ${conditions.join(', ')}.`)
    }
    if (allergies.length > 0) {
      parts.push(`**Allergies**: ${allergies.join(', ')} — flag for prescription safety.`)
    }

    parts.push(`**Presenting complaint**: ${complaint || 'Not recorded'}.`)

    if (vitals) {
      const flags: string[] = []
      const bpParts = vitals.bloodPressure.split('/')
      if (bpParts.length === 2 && parseInt(bpParts[0]) >= 130) flags.push(`BP ${vitals.bloodPressure} (elevated)`)
      const sugarNum = parseInt(vitals.sugarLevel)
      if (sugarNum > 126) flags.push(`fasting glucose ${vitals.sugarLevel} (above target)`)
      if (vitals.oxygenSaturation < 95) flags.push(`SpO2 ${vitals.oxygenSaturation}% (low)`)
      if (vitals.pulseRate > 100) flags.push(`pulse ${vitals.pulseRate} bpm (tachycardic)`)

      if (flags.length > 0) {
        parts.push(`**Vitals of concern**: ${flags.join('; ')}.`)
      } else {
        parts.push(`**Vitals**: Within acceptable range.`)
      }
    }

    if (labHighlights && labHighlights.length > 0) {
      parts.push(`**Lab highlights**: ${labHighlights.join('. ')}.`)
    }

    const riskFactors: string[] = []
    if (conditions.includes('Type 2 Diabetes') && conditions.includes('Hypertension')) {
      riskFactors.push('Combined diabetes + hypertension increases cardiovascular risk — consider statin therapy')
    }
    if (conditions.includes('Type 2 Diabetes') && vitals && parseInt(vitals.sugarLevel) > 150) {
      riskFactors.push('Persistent hyperglycemia despite treatment — medication adjustment warranted')
    }
    if (allergies.includes('Penicillin')) {
      riskFactors.push('Penicillin allergy — avoid beta-lactam antibiotics')
    }

    if (riskFactors.length > 0) {
      parts.push(`**Risk considerations**: ${riskFactors.join('. ')}.`)
    }

    parts.push(`**Recommendation**: Review medication efficacy, adjust dosing if targets not met, schedule follow-up within 1-2 weeks to reassess.`)

    // Simulate typing
    const fullSummary = parts.join('\n\n')
    let charIdx = 0
    const interval = setInterval(() => {
      charIdx += 3
      if (charIdx >= fullSummary.length) {
        setSummary(fullSummary)
        setGenerating(false)
        clearInterval(interval)
      } else {
        setSummary(fullSummary.slice(0, charIdx))
      }
    }, 15)
  }

  return (
    <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-emerald-600" />
          <h3 className="text-sm font-semibold text-emerald-900">AI Clinical Summary</h3>
          {generating && <span className="text-[10px] text-emerald-600 animate-pulse">generating...</span>}
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-emerald-600" /> : <ChevronDown className="h-4 w-4 text-emerald-600" />}
      </button>

      {expanded && (
        <div className="mt-3">
          {!summary && !generating && (
            <button onClick={generateSummary} className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-700">
              Generate AI Summary
            </button>
          )}

          {(summary || generating) && (
            <div className="rounded-lg bg-white border border-emerald-200 p-4 text-xs text-text-secondary leading-relaxed whitespace-pre-line">
              {summary?.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-800">$1</strong>')
                }} />
              ))}
              {generating && <span className="inline-block w-0.5 h-3 bg-emerald-600 animate-pulse ml-0.5" />}
            </div>
          )}

          {summary && !generating && (
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[10px] text-emerald-700">AI summary generated from patient data — verify before clinical use</p>
              <button onClick={generateSummary} className="text-[10px] text-emerald-600 hover:underline">Regenerate</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
