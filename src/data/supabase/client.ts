export type DataProvider = 'supabase' | 'mock'

const DEFAULT_PROVIDER: DataProvider = 'supabase'

function trimTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function getDataProvider(): DataProvider {
  const provider = import.meta.env.VITE_DATA_PROVIDER

  if (provider === 'mock') {
    return 'mock'
  }

  return DEFAULT_PROVIDER
}

export function getSupabaseConfig() {
  const url = trimTrailingSlash(import.meta.env.VITE_SUPABASE_URL ?? '')
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

  return {
    url,
    anonKey,
  }
}

export function hasSupabaseConfig(): boolean {
  const { url, anonKey } = getSupabaseConfig()
  return Boolean(url && anonKey)
}

export class SupabaseRequestError extends Error {
  status: number
  code: string

  constructor(message: string, status: number, code: string) {
    super(message)
    this.name = 'SupabaseRequestError'
    this.status = status
    this.code = code
  }
}

function normalizeErrorCode(status: number): string {
  if (status === 400) {
    return 'validation'
  }

  if (status === 401 || status === 403) {
    return 'auth_error'
  }

  if (status === 404) {
    return 'not_found'
  }

  if (status === 429) {
    return 'rate_limited'
  }

  return 'server'
}

async function parseResponseError(response: Response): Promise<SupabaseRequestError> {
  let message = `Supabase request failed with status ${response.status}`

  try {
    const payload = (await response.json()) as Record<string, unknown>

    if (typeof payload.error === 'string') {
      message = payload.error
    } else if (typeof payload.message === 'string') {
      message = payload.message
    }
  } catch {
    // Ignore payload parsing errors and keep fallback message.
  }

  return new SupabaseRequestError(message, response.status, normalizeErrorCode(response.status))
}

export class SupabaseClient {
  private readonly anonKey: string
  private readonly restUrl: string
  private readonly functionUrl: string

  constructor(url: string, anonKey: string) {
    this.anonKey = anonKey
    this.restUrl = `${url}/rest/v1`
    this.functionUrl = `${url}/functions/v1`
  }

  private getHeaders(contentType = true): HeadersInit {
    const headers: HeadersInit = {
      apikey: this.anonKey,
      Authorization: `Bearer ${this.anonKey}`,
    }

    if (contentType) {
      headers['Content-Type'] = 'application/json'
    }

    return headers
  }

  async selectRows<T>(table: string, query: Record<string, string>): Promise<T[]> {
    const search = new URLSearchParams(query)
    const response = await fetch(`${this.restUrl}/${table}?${search.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(false),
    })

    if (!response.ok) {
      throw await parseResponseError(response)
    }

    return (await response.json()) as T[]
  }

  async invokeFunction<TResponse>(name: string, body: Record<string, unknown>): Promise<TResponse> {
    const response = await fetch(`${this.functionUrl}/${name}`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw await parseResponseError(response)
    }

    return (await response.json()) as TResponse
  }
}

export function createSupabaseClient(): SupabaseClient {
  const { url, anonKey } = getSupabaseConfig()
  return new SupabaseClient(url, anonKey)
}
