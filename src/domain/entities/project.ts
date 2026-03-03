export type ProjectCategory = 'app' | 'web' | 'uiux'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  technologies: string[]
  image: string
}
