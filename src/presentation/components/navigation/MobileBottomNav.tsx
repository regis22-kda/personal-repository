import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../../../core/constants/navigation'
import { cn } from '../../../core/utils/cn'
import type { RoutePath } from '../../../domain/entities/navigation'

interface MobileBottomNavProps {
  activeRoute: RoutePath
}

export function MobileBottomNav({ activeRoute }: MobileBottomNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile Navigation">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon

        return (
          <Link key={item.key} to={item.key} className={cn('mobile-link', item.key === activeRoute && 'active')}>
            <Icon />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
