import { experiences, profile, skillGroups } from '../data/resume'
import type { Experience, Profile, SkillGroup } from '../types/resume'

export interface ResumeData {
  profile: Profile
  experiences: Experience[]
  skillGroups: SkillGroup[]
}

export async function getResume(): Promise<ResumeData> {
  return {
    profile,
    experiences,
    skillGroups,
  }
}
