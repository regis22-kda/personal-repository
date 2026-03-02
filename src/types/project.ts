export interface Project {
  id: string
  title: string
  description: string
  category: 'app' | 'web' | 'uiux'
  technologies: string[]
  image: string
}
