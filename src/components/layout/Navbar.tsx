import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { OpenPlatformButton } from '../ui/OpenPlatformButton'

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
            <p className="hidden text-xs text-text-secondary sm:block">Connected clinic workflow for intake, consultation, and follow-up</p>
          </div>
        </Link>
        <OpenPlatformButton className="rounded-xl bg-doctor px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-doctor/20 transition hover:-translate-y-0.5 hover:bg-teal-700">
          Open Platform
        </OpenPlatformButton>
      </div>
    </nav>
  )
}
