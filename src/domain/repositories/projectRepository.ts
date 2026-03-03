import type { Project } from '../entities/project'

export interface ProjectRepository {
  getAll(): Promise<Project[]>
}
