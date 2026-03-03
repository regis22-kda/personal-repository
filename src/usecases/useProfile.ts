import { useEffect, useState } from 'react'
import { useRepositories } from '../core/di/repositoryContext'
import type { Profile } from '../domain/entities/resume'

export function useProfile() {
  const { resumeRepository } = useRepositories()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const result = await resumeRepository.getProfile()
        if (active) {
          setProfile(result)
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
  }, [resumeRepository])

  return {
    profile,
    loading,
  }
}
