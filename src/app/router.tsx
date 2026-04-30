import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DemoProvider, useDemo } from '../context/DemoContext'
import { Shell } from '../components/layout/Shell'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { DoctorPage } from '../pages/DoctorPage'
import { CompounderPage } from '../pages/CompounderPage'
import { PatientPage } from '../pages/PatientPage'
import { PatientPrescriptionsPage } from '../pages/PatientPrescriptionsPage'
import { PatientLabReportsPage } from '../pages/PatientLabReportsPage'
import { PatientAppointmentsPage } from '../pages/PatientAppointmentsPage'
import { CompounderQueuePage } from '../pages/CompounderQueuePage'
import { CompounderVitalsPage } from '../pages/CompounderVitalsPage'
import { HistoryPage } from '../pages/HistoryPage'
import { AiInsightsPage } from '../pages/AiInsightsPage'
import type { ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useDemo()
  if (!state.role) return <Navigate to="/?entry=1" replace />
  return <>{children}</>
}

function RoleDashboard() {
  const { state } = useDemo()
  switch (state.role?.role) {
    case 'doctor': return <DoctorPage />
    case 'compounder': return <CompounderPage />
    case 'patient': return <PatientPage />
    default: return <Navigate to="/?entry=1" replace />
  }
}

export function App() {
  return (
    <HashRouter>
      <DemoProvider>
        <Shell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app/dashboard" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
            <Route path="/app/ai-insights" element={<ProtectedRoute><AiInsightsPage /></ProtectedRoute>} />
            <Route path="/app/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
            <Route path="/app/queue" element={<ProtectedRoute><CompounderQueuePage /></ProtectedRoute>} />
            <Route path="/app/vitals" element={<ProtectedRoute><CompounderVitalsPage /></ProtectedRoute>} />
            <Route path="/app/prescriptions" element={<ProtectedRoute><PatientPrescriptionsPage /></ProtectedRoute>} />
            <Route path="/app/lab-reports" element={<ProtectedRoute><PatientLabReportsPage /></ProtectedRoute>} />
            <Route path="/app/appointments" element={<ProtectedRoute><PatientAppointmentsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
      </DemoProvider>
    </HashRouter>
  )
}
