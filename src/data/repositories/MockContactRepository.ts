import type { ContactRepository } from '../../domain/repositories/contactRepository'
import type { ContactFormInput, ContactSubmitResult } from '../../domain/entities/contact'

const SUBMIT_DELAY = 900

export class MockContactRepository implements ContactRepository {
  async submitInquiry(input: ContactFormInput): Promise<ContactSubmitResult> {
    void input

    return new Promise((resolve) => {
      const requestId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now())
      window.setTimeout(() => resolve({ ok: true, requestId }), SUBMIT_DELAY)
    })
  }
}
