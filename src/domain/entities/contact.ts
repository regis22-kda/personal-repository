export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface ContactFormInput {
  fullName: string
  email: string
  subject: string
  message: string
  website?: string
}

export type ContactSubmitErrorCode = 'validation' | 'rate_limited' | 'server'

export type ContactSubmitResult =
  | {
      ok: true
      requestId: string
    }
  | {
      ok: false
      code: ContactSubmitErrorCode
      error: string
    }
