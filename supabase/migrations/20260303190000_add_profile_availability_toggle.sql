alter table public.portfolio_profile
  add column if not exists is_available boolean not null default true;

update public.portfolio_profile
set is_available = true
where is_available is null;
