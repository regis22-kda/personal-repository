import { LeftOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../../../core/constants/navigation'
import { cn } from '../../../core/utils/cn'
import type { RoutePath } from '../../../domain/entities/navigation'
import type { Profile } from '../../../domain/entities/resume'

interface DesktopSidebarProps {
  collapsed: boolean
  activeRoute: RoutePath
  profile: Profile | null
  onToggle: () => void
}

export function DesktopSidebar({ collapsed, activeRoute, profile, onToggle }: DesktopSidebarProps) {
  const isAvailable = profile?.isAvailable ?? false

  return (
    <aside className={cn('app-sidebar', !collapsed && 'expanded')} aria-label="Main Navigation">
      <div className="sidebar-head">
        <div className="brand">
        </div>
        <button type="button" className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? <MenuUnfoldOutlined /> : <LeftOutlined />}
        </button>
      </div>

      <div className="sidebar-profile">
        <img src={profile?.image ?? '/projects/app1.png'} alt={profile?.name ?? 'Profile'} />
        <div>
          <strong>{profile?.name ?? 'Profile'}</strong>
          <span>{profile?.title ?? 'Professional'}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon

          return (
            <Link key={item.key} to={item.key} className={cn('nav-link', activeRoute === item.key && 'active')}>
              <Icon />
              <span className="nav-label">{item.label}</span>
              {!collapsed ? null : null}
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-footer">

        <div className="availability-chip">
          <span className="cyber-label">Availability</span>
          <div className="availability-toggle">
            <Switch checked={isAvailable} disabled />
            <span>{isAvailable ? 'Open for new projects' : 'Currently unavailable'}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
