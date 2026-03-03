import { Outlet } from 'react-router-dom'
import { DesktopSidebar } from '../components/navigation/DesktopSidebar'
import { MobileBottomNav } from '../components/navigation/MobileBottomNav'
import { useActiveRoute } from '../../usecases/useActiveRoute'
import { useProfile } from '../../usecases/useProfile'
import { useState } from 'react'

export function AppShell() {
  const activeRoute = useActiveRoute()
  const { profile } = useProfile()
  const [collapsed, setCollapsed] = useState<boolean>(true)

  return (
    <div className="app-shell">
      <DesktopSidebar
        collapsed={collapsed}
        activeRoute={activeRoute}
        onToggle={() => setCollapsed((value) => !value)}
        profile={profile}
      />

      <main className="app-stage" aria-live="polite">
        <div className="stage-scroll">
          <Outlet />
        </div>
      </main>

      <MobileBottomNav activeRoute={activeRoute} />
    </div>
  )
}
