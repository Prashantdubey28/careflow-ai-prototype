import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type OpenPlatformButtonProps = {
  children: ReactNode
  className: string
}

function scrollToDemoEntry() {
  window.requestAnimationFrame(() => {
    document.getElementById('demo-entry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function OpenPlatformButton({ children, className }: OpenPlatformButtonProps) {
  const location = useLocation()
  const navigate = useNavigate()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (location.pathname !== '/') return

    event.preventDefault()

    if (location.search !== '?entry=1') {
      navigate('/?entry=1', { replace: true })
    }

    scrollToDemoEntry()
  }

  return (
    <Link to="/?entry=1" onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
