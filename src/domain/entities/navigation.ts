import type { ComponentType } from 'react'

export type RoutePath = '/' | '/about' | '/resume' | '/portfolio' | '/contact'

export interface NavItem {
  key: RoutePath
  label: string
  icon: ComponentType
}
