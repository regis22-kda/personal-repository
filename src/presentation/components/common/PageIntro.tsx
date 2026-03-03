import type { ReactNode } from 'react'

interface PageIntroProps {
  title: string
  subtitle: string
  badge?: string
  actions?: ReactNode
}

export function PageIntro({ title, subtitle, badge, actions }: PageIntroProps) {
  return (
    <header className="page-heading">
      {badge ? <span className="cyber-label">{badge}</span> : null}
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {actions ? <div style={{ marginTop: 16 }}>{actions}</div> : null}
    </header>
  )
}
