alter table public.portfolio_projects
  add column if not exists involvement text;

update public.portfolio_projects
set involvement = coalesce(nullif(involvement, ''), 'Project Delivery Team');
