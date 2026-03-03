import { useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { MockProjectRepository } from '../../data/repositories/MockProjectRepository'
import { MockResumeRepository } from '../../data/repositories/MockResumeRepository'
import { MockContactRepository } from '../../data/repositories/MockContactRepository'
import { SupabaseProjectRepository } from '../../data/repositories/SupabaseProjectRepository'
import { SupabaseResumeRepository } from '../../data/repositories/SupabaseResumeRepository'
import { SupabaseContactRepository } from '../../data/repositories/SupabaseContactRepository'
import { createSupabaseClient, getDataProvider, hasSupabaseConfig } from '../../data/supabase/client'
import { RepositoryContext } from './repositoryContext'

export function RepositoryProvider({ children }: PropsWithChildren) {
  const value = useMemo(
    () => {
      const provider = getDataProvider()
      const canUseSupabase = provider === 'supabase' && hasSupabaseConfig()

      if (canUseSupabase) {
        const client = createSupabaseClient()

        return {
          projectRepository: new SupabaseProjectRepository(client),
          resumeRepository: new SupabaseResumeRepository(client),
          contactRepository: new SupabaseContactRepository(client),
        }
      }

      if (provider === 'supabase') {
        console.warn('Supabase config is missing. Falling back to mock repositories.')
      }

      return {
        projectRepository: new MockProjectRepository(),
        resumeRepository: new MockResumeRepository(),
        contactRepository: new MockContactRepository(),
      }
    },
    [],
  )

  return <RepositoryContext.Provider value={value}>{children}</RepositoryContext.Provider>
}
