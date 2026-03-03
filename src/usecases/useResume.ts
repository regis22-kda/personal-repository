import { useEffect, useState } from 'react'
import { useRepositories } from '../core/di/repositoryContext'
import type { Experience, Profile, SkillGroup } from '../domain/entities/resume'

interface ResumeState {
  profile: Profile | null
  experiences: Experience[]
  skillGroups: SkillGroup[]
  loading: boolean
}

export function useResume(): ResumeState {
  const { resumeRepository } = useRepositories()
  const [state, setState] = useState<ResumeState>({
    profile: null,
    experiences: [],
    skillGroups: [],
    loading: true,
  })

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const [profile, experiences, skillGroups] = await Promise.all([
          resumeRepository.getProfile(),
          resumeRepository.getExperiences(),
          resumeRepository.getSkillGroups(),
        ])

        if (active) {
          setState({ profile, experiences, skillGroups, loading: false })
        }
      } catch {
        if (active) {
          setState((previous) => ({ ...previous, loading: false }))
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [resumeRepository])

  return state
}
