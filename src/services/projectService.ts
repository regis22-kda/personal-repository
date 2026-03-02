import { projects } from '../data/projects'
import type { Project } from '../types/project'

export async function getProjects(): Promise<Project[]> {
  return projects
}
