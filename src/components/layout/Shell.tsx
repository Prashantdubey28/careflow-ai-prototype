import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useDemo } from '../../context/DemoContext'
import { Navbar } from './Navbar'
import { AppBar } from './AppBar'
import { Sidebar } from './Sidebar'

const publicPaths = ['/', '/login']

export function Shell({ children }: { children: ReactNode }) {
  const { state } = useDemo()
  const location = useLocation()
  const isPublic = publicPaths.includes(location.pathname)
  const isLoggedIn = !!state.role

  if (isPublic || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-surface">
        {isPublic && <Navbar />}
        <main>{children}</main>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-surface">
      <AppBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
