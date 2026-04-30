import { Shield } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-[11px] text-amber-800">
      <Shield className="h-3.5 w-3.5 shrink-0" />
      AI-assisted features support clinical review. Final diagnoses and prescriptions remain under physician control.
    </div>
  )
}
