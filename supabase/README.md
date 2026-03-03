# Supabase Setup

## Required Environment Variables (Frontend)

Set these in your local `.env` (do not commit the file):

- `VITE_DATA_PROVIDER=supabase`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

## Required Function Secrets (Server-side)

Set these in Supabase secrets for Edge Functions:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never expose function secrets in frontend code or committed files.

## Data Privacy in Migrations

- Keep committed migrations free of personal/private portfolio content.
- Use placeholder seed data in git.
- Enter real profile, experience, and project content directly in Supabase (Dashboard SQL Editor or table editor).

## Deploy Steps

1. Apply SQL migration from `supabase/migrations`.
2. Deploy the Edge Function:
   - `supabase functions deploy contact-submit`
3. Set function secrets:
   - `supabase secrets set SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...`
