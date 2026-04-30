import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-doctor/10 text-doctor shadow-[0_10px_30px_rgba(13,148,136,0.18)]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-text-primary">JeevX</p>
            <p className="hidden text-xs text-text-secondary sm:block">Investor demo prototype for AI-assisted clinic operations</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-doctor/15 bg-doctor/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-doctor">
            Physician In Loop AI
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-text-secondary">
            Mocked data, guided workflow
          </span>
        </div>

        <Link
          to="/?entry=1"
          className="rounded-xl bg-doctor px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-doctor/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
        >
          Launch Demo
        </Link>
      </div>
    </nav>
  )
}
