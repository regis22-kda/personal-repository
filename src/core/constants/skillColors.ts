export const SKILL_GROUP_COLORS: Record<string, string> = {
  'Frontend & Mobile': 'cyan',
  'Backend & Data': 'geekblue',
  'Testing & Quality': 'magenta',
  'Tools & Delivery': 'gold',
  Frontend: 'cyan',
  Tools: 'gold',
}

export function getSkillTagColor(groupName: string): string {
  return SKILL_GROUP_COLORS[groupName] ?? 'processing'
}

export const TECHNOLOGY_COLORS: Record<string, string> = {
  Dart: 'cyan',
  Flutter: 'cyan',
  ReactJS: 'blue',
  React: 'blue',
  'Node.js': 'green',
  TypeScript: 'geekblue',
  Kotlin: 'purple',
  Firebase: 'gold',
  MongoDB: 'green',
  Cypress: 'lime',
  Git: 'volcano',
  Harness: 'orange',
  'Ruby on Rails': 'magenta',
  Ruby: 'magenta',
  JavaScript: 'gold',
  HTML: 'orange',
  SCSS: 'purple',
  '.NET': 'geekblue',
}

export function getTechnologyTagColor(technology: string): string {
  return TECHNOLOGY_COLORS[technology] ?? 'processing'
}
