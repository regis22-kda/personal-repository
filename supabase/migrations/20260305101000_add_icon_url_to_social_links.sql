alter table public.portfolio_social_links
  add column if not exists icon_url text;

update public.portfolio_social_links
set icon_url = case
  when lower(name) like '%github%' then '/assets/social-github.svg'
  when lower(name) like '%linkedin%' then '/assets/social-linkedin.svg'
  else coalesce(icon_url, '')
end;
