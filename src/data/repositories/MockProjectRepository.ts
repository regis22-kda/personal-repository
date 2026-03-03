import { projectMocks } from '../mocks/projects'
import type { ProjectRepository } from '../../domain/repositories/projectRepository'

export class MockProjectRepository implements ProjectRepository {
  async getAll() {
    return [...projectMocks]
  }
}
