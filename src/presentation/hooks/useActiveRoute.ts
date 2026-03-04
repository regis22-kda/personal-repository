import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { RoutePath } from '../../domain/entities/navigation'

const ROUTES: RoutePath[] = ['/', '/about', '/resume', '/portfolio', '/contact']

export function useActiveRoute(): RoutePath {
  const { pathname } = useLocation()

  return useMemo(() => {
    if (pathname === '/') {
      return '/'
    }

    const matched = ROUTES.find((route) => route !== '/' && pathname.startsWith(route))
    return matched ?? '/'
  }, [pathname])
}
