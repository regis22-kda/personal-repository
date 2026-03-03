import type { ContactFormInput, ContactSubmitResult } from '../../domain/entities/contact'
import type { ContactRepository } from '../../domain/repositories/contactRepository'
import { SupabaseRequestError, type SupabaseClient } from '../supabase/client'

interface ContactSubmitResponse {
  ok: boolean
  requestId?: string
  code?: string
  error?: string
}

function mapErrorCode(code: string): 'validation' | 'rate_limited' | 'server' {
  if (code === 'validation') {
    return 'validation'
  }

  if (code === 'rate_limited') {
    return 'rate_limited'
  }

  return 'server'
}

export class SupabaseContactRepository implements ContactRepository {
  private readonly client: SupabaseClient

  constructor(client: SupabaseClient) {
    this.client = client
  }

  async submitInquiry(input: ContactFormInput): Promise<ContactSubmitResult> {
    try {
      const payload = {
        fullName: input.fullName,
        email: input.email,
        subject: input.subject,
        message: input.message,
        website: input.website ?? '',
      }

      const response = await this.client.invokeFunction<ContactSubmitResponse>('contact-submit', payload)

      if (!response.ok || !response.requestId) {
        return {
          ok: false,
          code: mapErrorCode(response.code ?? 'server'),
          error: response.error ?? 'Unable to submit inquiry.',
        }
      }

      return {
        ok: true,
        requestId: response.requestId,
      }
    } catch (error) {
      if (error instanceof SupabaseRequestError) {
        return {
          ok: false,
          code: mapErrorCode(error.code),
          error: error.message,
        }
      }

      return {
        ok: false,
        code: 'server',
        error: 'Unable to submit inquiry.',
      }
    }
  }
}
