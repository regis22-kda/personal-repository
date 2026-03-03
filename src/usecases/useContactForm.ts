import { useCallback, useState } from 'react'
import { useRepositories } from '../core/di/repositoryContext'
import type { ContactFormInput, ContactSubmitErrorCode } from '../domain/entities/contact'

export type ContactSubmitStatus = 'idle' | 'success' | 'error'

export function useContactForm() {
  const { contactRepository } = useRepositories()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [status, setStatus] = useState<ContactSubmitStatus>('idle')
  const [errorCode, setErrorCode] = useState<ContactSubmitErrorCode | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [requestId, setRequestId] = useState<string | null>(null)

  const submit = useCallback(
    async (input: ContactFormInput) => {
      setSubmitting(true)
      setStatus('idle')
      setErrorCode(null)
      setErrorMessage(null)
      setRequestId(null)

      try {
        const result = await contactRepository.submitInquiry(input)
        if (result.ok) {
          setStatus('success')
          setRequestId(result.requestId)
          return true
        }

        setStatus('error')
        setErrorCode(result.code)
        setErrorMessage(result.error)
        return false
      } catch {
        setStatus('error')
        setErrorCode('server')
        setErrorMessage('Unexpected server error. Please try again.')
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
    errorCode,
    errorMessage,
    requestId,
  }
}
