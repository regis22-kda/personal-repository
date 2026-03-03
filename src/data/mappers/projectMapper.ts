import type { Project, ProjectCategory } from '../../domain/entities/project'

export interface ProjectRow {
  id: string
  title: string
  description: string
  category: ProjectCategory
  technologies: string[] | null
  image: string
  sort_order: number
  is_published: boolean
}

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    technologies: row.technologies ?? [],
    image: row.image,
  }
}
