import type { ContactFormInput } from '../entities/contact'

export interface ContactRepository {
  submitInquiry(input: ContactFormInput): Promise<{ ok: boolean }>
}
