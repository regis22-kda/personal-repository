import { useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { MockProjectRepository } from '../../data/repositories/MockProjectRepository'
import { MockResumeRepository } from '../../data/repositories/MockResumeRepository'
import { MockContactRepository } from '../../data/repositories/MockContactRepository'
import { RepositoryContext } from './repositoryContext'

export function RepositoryProvider({ children }: PropsWithChildren) {
  const value = useMemo(
    () => ({
      projectRepository: new MockProjectRepository(),
      resumeRepository: new MockResumeRepository(),
      contactRepository: new MockContactRepository(),
    }),
    [],
  )

  return <RepositoryContext.Provider value={value}>{children}</RepositoryContext.Provider>
}
