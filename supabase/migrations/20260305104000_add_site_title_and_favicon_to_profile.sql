alter table public.portfolio_profile
  add column if not exists site_title text,
  add column if not exists favicon_url text;

update public.portfolio_profile
set
  site_title = coalesce(nullif(site_title, ''), name || ' Portfolio'),
  favicon_url = coalesce(nullif(favicon_url, ''), '/vite.svg');
