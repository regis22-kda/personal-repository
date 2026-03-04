alter table public.portfolio_experiences
  add column if not exists subtitle text;

update public.portfolio_experiences
set subtitle = coalesce(nullif(subtitle, ''), 'Software Engineer');
