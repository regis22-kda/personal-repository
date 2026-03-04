alter table public.portfolio_profile
  add column if not exists bio_paragraph_1 text,
  add column if not exists bio_paragraph_2 text;

update public.portfolio_profile
set
  bio_paragraph_1 = coalesce(nullif(bio_paragraph_1, ''), 'Professional bio paragraph 1. Update this in Supabase.'),
  bio_paragraph_2 = coalesce(nullif(bio_paragraph_2, ''), 'Professional bio paragraph 2. Update this in Supabase.');
