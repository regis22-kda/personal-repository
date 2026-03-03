import { useCallback, useState } from 'react'
import { useRepositories } from '../core/di/repositoryContext'
import type { ContactFormInput } from '../domain/entities/contact'

export type ContactSubmitStatus = 'idle' | 'success' | 'error'

export function useContactForm() {
  const { contactRepository } = useRepositories()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [status, setStatus] = useState<ContactSubmitStatus>('idle')

  const submit = useCallback(
    async (input: ContactFormInput) => {
      setSubmitting(true)
      setStatus('idle')

      try {
        const result = await contactRepository.submitInquiry(input)
        setStatus(result.ok ? 'success' : 'error')

        return result.ok
      } catch {
        setStatus('error')
        return false
      } finally {
        setSubmitting(false)
      }
    },
    [contactRepository],
  )

  return {
    submit,
    submitting,
    status,
  }
}
