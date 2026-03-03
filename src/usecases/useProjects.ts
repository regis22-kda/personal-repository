import { useEffect, useMemo, useState } from 'react'
import { useRepositories } from '../core/di/repositoryContext'
import type { Project, ProjectCategory } from '../domain/entities/project'

export type ProjectFilter = 'all' | ProjectCategory

export function useProjects(selectedCategory: ProjectFilter) {
  const { projectRepository } = useRepositories()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const result = await projectRepository.getAll()
        if (active) {
          setProjects(result)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [projectRepository])

  const visibleProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects
    }

    return projects.filter((project) => project.category === selectedCategory)
  }, [projects, selectedCategory])

  return {
    projects,
    visibleProjects,
    loading,
  }
}
