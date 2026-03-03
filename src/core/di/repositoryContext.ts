import { createContext, useContext } from 'react'
import type { ProjectRepository } from '../../domain/repositories/projectRepository'
import type { ResumeRepository } from '../../domain/repositories/resumeRepository'
import type { ContactRepository } from '../../domain/repositories/contactRepository'

export interface RepositoryContextValue {
  projectRepository: ProjectRepository
  resumeRepository: ResumeRepository
  contactRepository: ContactRepository
}

export const RepositoryContext = createContext<RepositoryContextValue | null>(null)

export function useRepositories(): RepositoryContextValue {
  const context = useContext(RepositoryContext)

  if (!context) {
    throw new Error('useRepositories must be used inside RepositoryProvider')
  }

  return context
}
