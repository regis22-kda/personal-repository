import type { ContactRepository } from '../../domain/repositories/contactRepository'
import type { ContactFormInput } from '../../domain/entities/contact'

const SUBMIT_DELAY = 900

export class MockContactRepository implements ContactRepository {
  async submitInquiry(input: ContactFormInput): Promise<{ ok: boolean }> {
    void input

    return new Promise((resolve) => {
      window.setTimeout(() => resolve({ ok: true }), SUBMIT_DELAY)
    })
  }
}
