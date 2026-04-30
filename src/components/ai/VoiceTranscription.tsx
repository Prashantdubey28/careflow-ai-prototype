import { useEffect, useRef, useState } from 'react'
import { Brain, Mic } from 'lucide-react'
import type { Patient, Vitals } from '../../types'

interface PatientTranscript {
  lines: string[]
  extracted: { complaint: string; diagnosis: string; notes: string }
  summary: string
}

function buildClinicalSummary(patient: Patient, complaint: string, vitals?: Vitals, labHighlights?: string[]) {
  const parts: string[] = []

  parts.push(`**Patient**: ${patient.name}, ${patient.age}${patient.gender.charAt(0)}.`)

  if (patient.conditions.length > 0) {
    parts.push(`**Known conditions**: ${patient.conditions.join(', ')}.`)
  }

  if (patient.allergies.length > 0) {
    parts.push(`**Allergies**: ${patient.allergies.join(', ')} — flag for prescription safety.`)
  }

  parts.push(`**Presenting complaint**: ${complaint || 'Not recorded'}.`)

  if (vitals) {
    const flags: string[] = []
    const bpParts = vitals.bloodPressure.split('/')

    if (bpParts.length === 2 && Number.parseInt(bpParts[0], 10) >= 130) {
      flags.push(`BP ${vitals.bloodPressure} (elevated)`)
    }

    const sugarValue = Number.parseInt(vitals.sugarLevel, 10)
    if (sugarValue > 126) {
      flags.push(`fasting glucose ${vitals.sugarLevel} (above target)`)
    }

    if (vitals.oxygenSaturation < 95) {
      flags.push(`SpO2 ${vitals.oxygenSaturation}% (low)`)
    }

    if (vitals.pulseRate > 100) {
      flags.push(`pulse ${vitals.pulseRate} bpm (tachycardic)`)
    }

    if (flags.length > 0) {
      parts.push(`**Vitals of concern**: ${flags.join('; ')}.`)
    } else {
      parts.push('**Vitals**: Within acceptable range.')
    }
  }

  if (labHighlights && labHighlights.length > 0) {
    parts.push(`**Lab highlights**: ${labHighlights.join('. ')}.`)
  }

  const riskFactors: string[] = []

  if (patient.conditions.includes('Type 2 Diabetes') && patient.conditions.includes('Hypertension')) {
    riskFactors.push('Combined diabetes + hypertension increases cardiovascular risk — consider statin therapy')
  }

  if (patient.conditions.includes('Type 2 Diabetes') && vitals && Number.parseInt(vitals.sugarLevel, 10) > 150) {
    riskFactors.push('Persistent hyperglycemia despite treatment — medication adjustment may be warranted')
  }

  if (patient.allergies.includes('Penicillin')) {
    riskFactors.push('Penicillin allergy — avoid beta-lactam antibiotics')
  }

  if (riskFactors.length > 0) {
    parts.push(`**Risk considerations**: ${riskFactors.join('. ')}.`)
  }

  parts.push('**Recommendation**: Review medication efficacy, confirm adherence, and schedule follow-up based on the active care plan.')

  return parts.join('\n\n')
}

function buildTranscript(patient: Patient, vitals?: Vitals, queueComplaint?: string, labHighlights?: string[]): PatientTranscript {
  const complaint = queueComplaint || 'Routine follow-up visit'
  let lines: string[]
  let diagnosis: string
  let notes: string

  if (patient.conditions.includes('Type 2 Diabetes') && patient.conditions.includes('Hypertension')) {
    lines = [
      `Doctor: Hi ${patient.name.split(' ')[0]}, good to see you again. You're here for your blood sugar follow-up today?`,
      'Patient: Yes doctor. My sugar readings have still been running high, mostly in the mornings.',
      'Doctor: Have you noticed anything else, like dizziness, headaches, or blurred vision?',
      'Patient: I had mild dizziness on a couple of mornings, but no blurred vision or chest discomfort.',
      'Doctor: Are you taking your metformin regularly and keeping up with the diet changes we discussed?',
      'Patient: Yes, I am taking it twice daily after meals. Diet has been better, but not perfect.',
      `Doctor: Your blood pressure today is ${vitals?.bloodPressure ?? 'above target'} and your fasting sugar is ${vitals?.sugarLevel ?? 'above goal'}, so both are still higher than I want.`,
      'Patient: Okay. Does that mean we need to adjust the medication?',
      'Doctor: Yes, I want to tighten the diabetes control, continue monitoring the blood pressure closely, and repeat the key labs.',
      'Patient: That sounds good. I can come back with a sugar log next week.',
      'Doctor: Great. Please keep a home blood pressure and fasting glucose log, and we will review it at follow-up.',
    ]
    diagnosis = 'Type 2 Diabetes with suboptimal glycemic control and Stage 1 Hypertension'
    notes = 'Follow-up discussion focused on elevated morning sugars and intermittent dizziness. Patient reports adherence to metformin with partial diet compliance. Current vitals remain above target. Plan to intensify diabetic control, continue blood pressure monitoring, repeat relevant labs, and review logs at next follow-up.'
  } else if (patient.conditions.includes('Asthma')) {
    lines = [
      `Doctor: Hi ${patient.name.split(' ')[0]}, tell me what has been bothering you.`,
      'Patient: I get short of breath when I walk fast or climb stairs, and I have been wheezing on and off.',
      'Doctor: Are you using the inhaler regularly?',
      'Patient: The maintenance inhaler, yes. I have needed the rescue inhaler a little more this week.',
      'Doctor: Any fever, chest pain, or nighttime symptoms?',
      'Patient: No fever or chest pain, but I do cough more in the evening.',
      'Doctor: Okay. This sounds like a mild asthma flare, so we should continue the controller inhaler and reinforce rescue use as needed.',
      'Patient: Should I come back sooner if it gets worse?',
      'Doctor: Yes. If the wheeze or shortness of breath increases, come back earlier or seek urgent care.',
    ]
    diagnosis = 'Asthma exacerbation — mild, exercise-triggered'
    notes = 'Patient describes exertional breathlessness with intermittent wheeze and increased rescue inhaler use. No fever or chest pain reported. Impression is mild asthma flare. Continue controller therapy, reinforce rescue inhaler use, and follow up sooner if symptoms escalate.'
  } else {
    lines = [
      `Doctor: Hello ${patient.name.split(' ')[0]}, what brings you in today?`,
      `Patient: ${complaint}.`,
      'Doctor: When did this start, and has it been getting better or worse?',
      'Patient: It started recently and has been bothering me enough that I wanted to get it checked properly.',
      'Doctor: Any fever, breathing trouble, or anything else you are worried about?',
      'Patient: No major warning signs, but I would like to understand what is causing it.',
      'Doctor: Alright. I will review the exam findings and decide whether we need medicines, tests, or simple follow-up.',
      'Patient: Okay doctor, thank you.',
    ]
    diagnosis = queueComplaint ? `Evaluation for ${queueComplaint}` : 'General clinical evaluation'
    notes = `Conversation focused on the patient's current concern: ${complaint}. No major red-flag symptoms were volunteered during the interview. Clinical review and targeted follow-up plan discussed with the patient.`
  }

  return {
    lines,
    extracted: {
      complaint,
      diagnosis,
      notes,
    },
    summary: buildClinicalSummary(patient, complaint, vitals, labHighlights),
  }
}

interface VoiceTranscriptionProps {
  patient: Patient
  vitals?: Vitals
  queueComplaint?: string
  labHighlights?: string[]
  onTranscriptUpdate: (text: string) => void
  onFieldsExtracted: (fields: { complaint: string; diagnosis: string; notes: string }) => void
}

export function VoiceTranscription({ patient, vitals, queueComplaint, labHighlights, onTranscriptUpdate, onFieldsExtracted }: VoiceTranscriptionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [waveform, setWaveform] = useState<number[]>(Array(20).fill(2))
  const [sessionData, setSessionData] = useState<PatientTranscript>(() => buildTranscript(patient, vitals, queueComplaint, labHighlights))
  const [summary, setSummary] = useState<string | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const waveRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const summaryRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function clearIntervals() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (waveRef.current) clearInterval(waveRef.current)
    if (summaryRef.current) clearInterval(summaryRef.current)
  }

  function clearCaptureIntervals() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (waveRef.current) clearInterval(waveRef.current)
  }

  function startSummary(summaryText: string, instant = false) {
    if (summaryRef.current) clearInterval(summaryRef.current)

    if (instant) {
      setIsSummarizing(false)
      setSummary(summaryText)
      return
    }

    setIsSummarizing(true)
    setSummary('')

    let charIdx = 0
    summaryRef.current = setInterval(() => {
      charIdx += 4

      if (charIdx >= summaryText.length) {
        setSummary(summaryText)
        setIsSummarizing(false)
        if (summaryRef.current) clearInterval(summaryRef.current)
        return
      }

      setSummary(summaryText.slice(0, charIdx))
    }, 15)
  }

  function finishRecording(data: PatientTranscript, instant = false) {
    clearIntervals()
    setIsRecording(false)
    setIsPaused(false)

    const fullText = data.lines.join('\n')
    setTranscript(fullText)
    onTranscriptUpdate(fullText)
    onFieldsExtracted(data.extracted)
    startSummary(data.summary, instant)
  }

  function startRecording() {
    const nextSession = buildTranscript(patient, vitals, queueComplaint, labHighlights)
    clearIntervals()
    setSessionData(nextSession)
    setIsRecording(true)
    setIsPaused(false)
    setTranscript('')
    setLineIndex(0)
    setCharIndex(0)
    setSummary(null)
    setIsSummarizing(false)
  }

  function completeRecording() {
    finishRecording(sessionData, true)
  }

  function pauseRecording() {
    clearCaptureIntervals()
    setIsPaused(true)
  }

  function resumeRecording() {
    setIsPaused(false)
  }

  useEffect(() => {
    if (!isRecording || isPaused) return
    const lines = sessionData.lines

    function completeSession() {
      clearCaptureIntervals()

      setIsRecording(false)
      setIsPaused(false)
      const fullText = sessionData.lines.join('\n')
      setTranscript(fullText)
      onTranscriptUpdate(fullText)
      onFieldsExtracted(sessionData.extracted)
      startSummary(sessionData.summary)
    }

    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        let nextCharIndex = prev + 1

        setLineIndex((li) => {
          const currentLine = lines[li]

          if (!currentLine) {
            nextCharIndex = prev
            completeSession()
            return li
          }

          if (prev >= currentLine.length) {
            setTranscript((value) => value + (value ? '\n' : '') + currentLine)
            onTranscriptUpdate(lines.slice(0, li + 1).join('\n'))

            if (li + 1 >= lines.length) {
              nextCharIndex = prev
              completeSession()
              return li
            }

            nextCharIndex = 0
            return li + 1
          }

          return li
        })

        return nextCharIndex
      })
    }, 35)

    waveRef.current = setInterval(() => {
      setWaveform(Array(20).fill(0).map(() => Math.random() * 20 + 2))
    }, 100)

    return () => {
      clearCaptureIntervals()
    }
  }, [isPaused, isRecording, onFieldsExtracted, onTranscriptUpdate, sessionData])

  useEffect(() => () => clearIntervals(), [])

  const currentPartial = isRecording && lineIndex < sessionData.lines.length
    ? sessionData.lines[lineIndex].slice(0, charIndex)
    : ''

  return (
    <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isRecording ? isPaused ? 'bg-amber-500' : 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
          <h3 className="text-sm font-semibold text-indigo-900">Consultation Capture</h3>
          {isRecording && (
            <span className={`text-[10px] font-medium ${isPaused ? 'text-amber-600' : 'text-red-600'}`}>
              {isPaused ? 'PAUSED' : 'RECORDING'}
            </span>
          )}
        </div>
        {!isRecording ? (
          <button onClick={startRecording} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
            <Mic className="h-3.5 w-3.5" /> Start Recording
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={isPaused ? resumeRecording : pauseRecording}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white ${isPaused ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-500 hover:bg-amber-600'}`}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={completeRecording} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
              Complete
            </button>
          </div>
        )}
      </div>

      {isRecording && !isPaused && (
        <div className="mb-3 flex h-8 items-center justify-center gap-[2px]">
          {waveform.map((height, index) => (
            <div key={index} className="w-1 rounded-full bg-indigo-400 transition-all duration-100" style={{ height: `${height}px` }} />
          ))}
        </div>
      )}

      <div className="max-h-56 overflow-y-auto rounded-lg border border-indigo-200 bg-white p-3 min-h-[96px]">
        {transcript || currentPartial ? (
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-text-secondary">
            {transcript}{transcript ? '\n' : ''}<span className="font-medium text-indigo-700">{currentPartial}</span>
            {isRecording && !isPaused && <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-indigo-600" />}
          </p>
        ) : (
          <p className="italic text-xs text-text-secondary/50">Click &quot;Start Recording&quot; to capture a natural doctor-patient conversation...</p>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
        <div className="flex items-center gap-2">
          <Brain className="h-4.5 w-4.5 text-emerald-600" />
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">AI Clinical Summary</h4>
          {isSummarizing && <span className="animate-pulse text-[10px] text-emerald-600">auto-generating...</span>}
        </div>

        <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-4 text-xs leading-relaxed text-text-secondary">
          {summary || isSummarizing ? (
            <>
              {summary?.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-2 last:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-800">$1</strong>'),
                  }}
                />
              ))}
              {isSummarizing && <span className="inline-block h-3 w-0.5 animate-pulse bg-emerald-600 align-middle" />}
            </>
          ) : (
            <p className="text-text-secondary/60">The AI clinical summary will generate automatically as soon as the voice capture completes.</p>
          )}
        </div>

        {!isRecording && transcript && !isSummarizing && summary && (
          <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-700">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Transcript and clinical summary were generated from the same conversation.
          </div>
        )}
      </div>
    </div>
  )
}
