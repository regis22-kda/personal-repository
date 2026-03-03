import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'
import { corsHeaders } from '../_shared/cors.ts'

const MAX_SUBMITS_PER_HOUR = 5

interface ContactPayload {
  fullName: string
  email: string
  subject: string
  message: string
  website?: string
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function sanitize(value: string): string {
  return value.trim()
}

function validatePayload(payload: unknown): { ok: true; value: ContactPayload } | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Invalid request payload.' }
  }

  const data = payload as Record<string, unknown>

  const fullName = sanitize(String(data.fullName ?? ''))
  const email = sanitize(String(data.email ?? ''))
  const subject = sanitize(String(data.subject ?? ''))
  const message = sanitize(String(data.message ?? ''))
  const website = sanitize(String(data.website ?? ''))

  if (!fullName || fullName.length > 120) {
    return { ok: false, error: 'Full name is required and must be less than 120 characters.' }
  }

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: 'A valid email address is required.' }
  }

  if (!subject || subject.length > 160) {
    return { ok: false, error: 'Subject is required and must be less than 160 characters.' }
  }

  if (!message || message.length > 3000) {
    return { ok: false, error: 'Message is required and must be less than 3000 characters.' }
  }

  if (website.length > 0) {
    return { ok: false, error: 'Spam protection triggered.' }
  }

  return {
    ok: true,
    value: {
      fullName,
      email,
      subject,
      message,
      website,
    },
  }
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const cloudflareIp = request.headers.get('cf-connecting-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (cloudflareIp) {
    return cloudflareIp.trim()
  }

  return 'unknown'
}

async function hashIp(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, code: 'validation', error: 'Method not allowed.' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ ok: false, code: 'server', error: 'Server configuration is incomplete.' }, 500)
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ ok: false, code: 'validation', error: 'Request body must be valid JSON.' }, 400)
  }

  const validation = validatePayload(payload)
  if (!validation.ok) {
    return jsonResponse({ ok: false, code: 'validation', error: validation.error }, 400)
  }

  const ipAddress = getClientIp(request)
  const ipHash = await hashIp(ipAddress)
  const userAgent = request.headers.get('user-agent')?.slice(0, 500) ?? null
  const oneHourAgoIso = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const { count, error: countError } = await supabase
    .from('contact_submit_logs')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', oneHourAgoIso)

  if (countError) {
    return jsonResponse({ ok: false, code: 'server', error: 'Unable to process request.' }, 500)
  }

  if ((count ?? 0) >= MAX_SUBMITS_PER_HOUR) {
    return jsonResponse(
      { ok: false, code: 'rate_limited', error: 'Too many messages sent. Please try again later.' },
      429,
    )
  }

  const { data: inquiryRow, error: insertInquiryError } = await supabase
    .from('contact_inquiries')
    .insert({
      full_name: validation.value.fullName,
      email: validation.value.email,
      subject: validation.value.subject,
      message: validation.value.message,
      ip_hash: ipHash,
      user_agent: userAgent,
    })
    .select('id')
    .single()

  if (insertInquiryError || !inquiryRow) {
    return jsonResponse({ ok: false, code: 'server', error: 'Unable to save your message.' }, 500)
  }

  const { error: logError } = await supabase.from('contact_submit_logs').insert({ ip_hash: ipHash })

  if (logError) {
    return jsonResponse({ ok: false, code: 'server', error: 'Unable to process request.' }, 500)
  }

  return jsonResponse({ ok: true, requestId: inquiryRow.id }, 200)
})
