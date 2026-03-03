import type { ContactFormInput, ContactSubmitResult } from '../entities/contact'

export interface ContactRepository {
  submitInquiry(input: ContactFormInput): Promise<ContactSubmitResult>
}
