import type { Experience, Profile, SkillGroup } from '../entities/resume'

export interface ResumeRepository {
  getProfile(): Promise<Profile>
  getExperiences(): Promise<Experience[]>
  getSkillGroups(): Promise<SkillGroup[]>
}
