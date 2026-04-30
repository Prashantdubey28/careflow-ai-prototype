import { useState } from 'react'
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'

interface Finding {
  id: string
  label: string
  description: string
  severity: 'critical' | 'moderate' | 'low'
  x: number
  y: number
  w: number
  h: number
}

interface ScanData {
  type: string
  label: string
  description: string
  image: string
  findings: Finding[]
}

const SCANS: ScanData[] = [
  {
    type: 'chest-xray',
    label: 'Chest X-Ray',
    description: 'PA view — AI analysis detected potential areas of interest',
    image: './scans/chest-xray.png',
    findings: [
      { id: 'f1', label: 'Right Upper Lobe Opacity', description: 'Irregular opacity measuring ~2.3cm in the right upper lobe. Recommend CT correlation to rule out pulmonary nodule.', severity: 'critical', x: 32, y: 22, w: 12, h: 10 },
      { id: 'f2', label: 'Cardiomegaly', description: 'Cardiothoracic ratio appears borderline elevated (~0.52). Correlate with clinical history of hypertension.', severity: 'moderate', x: 42, y: 45, w: 18, h: 20 },
      { id: 'f3', label: 'Costophrenic Angles', description: 'Bilateral costophrenic angles are clear. No evidence of pleural effusion.', severity: 'low', x: 28, y: 72, w: 15, h: 8 },
    ],
  },
  {
    type: 'ct-abdomen',
    label: 'CT Abdomen',
    description: 'Axial slice — AI highlighting regions of diagnostic interest',
    image: './scans/ct-abdomen.png',
    findings: [
      { id: 'f4', label: 'Hepatic Lesion', description: 'Hypodense lesion in segment VI of the liver, ~1.8cm. Enhancement pattern suggests possible hemangioma. Follow-up MRI recommended.', severity: 'moderate', x: 55, y: 35, w: 14, h: 12 },
      { id: 'f5', label: 'Renal Cyst', description: 'Simple cortical cyst in the left kidney, ~1.2cm. Bosniak category I — benign, no follow-up needed.', severity: 'low', x: 35, y: 55, w: 10, h: 10 },
    ],
  },
  {
    type: 'mri-brain',
    label: 'MRI Brain',
    description: 'T2-weighted axial — AI analysis for structural abnormalities',
    image: './scans/mri-brain.png',
    findings: [
      { id: 'f6', label: 'White Matter Hyperintensity', description: 'Small periventricular white matter hyperintensities bilaterally. Likely microangiopathic changes consistent with hypertensive history. No acute infarct.', severity: 'moderate', x: 40, y: 30, w: 20, h: 10 },
      { id: 'f7', label: 'Ventricles', description: 'Ventricles are normal in size and configuration. No midline shift.', severity: 'low', x: 43, y: 45, w: 14, h: 14 },
    ],
  },
]

const severityColors = {
  critical: { border: 'border-red-500', bg: 'bg-red-500/20', text: 'text-red-400', badge: 'bg-red-100 text-red-700', glow: 'shadow-red-500/30' },
  moderate: { border: 'border-amber-400', bg: 'bg-amber-400/20', text: 'text-amber-400', badge: 'bg-amber-100 text-amber-700', glow: 'shadow-amber-400/30' },
  low: { border: 'border-green-400', bg: 'bg-green-400/20', text: 'text-green-400', badge: 'bg-green-100 text-green-700', glow: 'shadow-green-400/30' },
}

export function DiagnosticImaging() {
  const [scanIndex, setScanIndex] = useState(0)
  const [selectedFinding, setSelectedFinding] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [showOverlay, setShowOverlay] = useState(true)

  const scan = SCANS[scanIndex]

  return (
    <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">AI Diagnostic Imaging Analysis</h3>
          <p className="text-[10px] text-text-secondary">AI-detected regions of interest highlighted on scan</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setScanIndex(Math.max(0, scanIndex - 1))} disabled={scanIndex === 0} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-xs text-text-secondary">{scanIndex + 1}/{SCANS.length}</span>
          <button onClick={() => setScanIndex(Math.min(SCANS.length - 1, scanIndex + 1))} disabled={scanIndex === SCANS.length - 1} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px]">
        {/* Scan viewer */}
        <div className="relative bg-black p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-400 font-medium">{scan.label}</p>
              <p className="text-[10px] text-gray-500">{scan.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowOverlay(!showOverlay)} className={`rounded px-2 py-1 text-[10px] font-medium ${showOverlay ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                AI Overlay
              </button>
              <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="p-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"><ZoomOut className="h-3.5 w-3.5" /></button>
              <button onClick={() => setZoom(Math.min(2, zoom + 0.25))} className="p-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"><ZoomIn className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-black">
            <div className="relative aspect-square w-full rounded-lg bg-black">
              <div className="absolute inset-0 transition-transform duration-200" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
              <img src={scan.image} alt={scan.label} className="absolute inset-0 w-full h-full object-cover rounded-lg" />

              {/* AI finding overlays */}
              {showOverlay && scan.findings.map((f) => {
                const sev = severityColors[f.severity]
                const isSelected = selectedFinding === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinding(isSelected ? null : f.id)}
                    className={`absolute border-2 rounded-lg transition-all ${sev.border} ${isSelected ? `${sev.bg} shadow-lg ${sev.glow}` : `${sev.bg} hover:shadow-md`}`}
                    style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}%`, height: `${f.h}%` }}
                  >
                    <span className={`absolute -top-5 left-0 text-[9px] font-bold ${sev.text} whitespace-nowrap`}>{f.label}</span>
                    {f.severity === 'critical' && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative h-3 w-3 rounded-full bg-red-500" />
                      </span>
                    )}
                  </button>
                )
              })}

              {/* Corner labels */}
              <span className="absolute top-2 left-2 text-[9px] text-gray-500 font-mono">R</span>
              <span className="absolute top-2 right-2 text-[9px] text-gray-500 font-mono">L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Findings panel */}
        <div className="border-l border-border p-4 bg-surface">
          <h4 className="text-xs font-semibold mb-3">AI Findings ({scan.findings.length})</h4>
          <div className="space-y-2">
            {scan.findings.map((f) => {
              const sev = severityColors[f.severity]
              const isSelected = selectedFinding === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinding(isSelected ? null : f.id)}
                  className={`w-full text-left rounded-lg border p-3 transition ${isSelected ? 'border-indigo-300 bg-indigo-50' : 'border-border bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{f.label}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${sev.badge}`}>
                      {f.severity}
                    </span>
                  </div>
                  {isSelected && <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">{f.description}</p>}
                </button>
              )
            })}
          </div>

          {scan.findings.some((f) => f.severity === 'critical') && (
            <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-2 flex items-start gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-red-700">Critical finding detected — recommend immediate follow-up imaging</p>
            </div>
          )}

          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2">
            <p className="text-[10px] text-amber-700">AI analysis is assistive only. All findings require radiologist confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
