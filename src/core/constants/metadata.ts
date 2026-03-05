import type { RoutePath } from '../../domain/entities/navigation'

export interface PageMetadata {
  title: string
  description: string
}

export const APP_NAME = 'Rheganandar Portfolio'

export const PAGE_METADATA: Record<RoutePath | 'not-found', PageMetadata> = {
  '/': {
    title: 'Home',
    description: 'Personal portfolio home.',
  },
  '/about': {
    title: 'About',
    description: 'About my professional background and focus areas.',
  },
  '/resume': {
    title: 'Resume',
    description: 'Experience timeline, skills, and professional highlights.',
  },
  '/portfolio': {
    title: 'Portfolio',
    description: 'Selected projects and technology stacks.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Get in touch for projects and collaborations.',
  },
  'not-found': {
    title: 'Not Found',
    description: 'The requested page does not exist.',
  },
}

export function buildTitle(pageTitle: string, appName = APP_NAME): string {
  return `${pageTitle} | ${appName}`
}
