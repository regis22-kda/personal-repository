import { experienceMocks, profileMock, skillGroupMocks } from '../mocks/resume'
import type { ResumeRepository } from '../../domain/repositories/resumeRepository'

export class MockResumeRepository implements ResumeRepository {
  async getProfile() {
    return { ...profileMock }
  }

  async getExperiences() {
    return [...experienceMocks]
  }

  async getSkillGroups() {
    return [...skillGroupMocks]
  }
}
