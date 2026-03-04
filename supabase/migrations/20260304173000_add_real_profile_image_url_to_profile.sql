alter table public.portfolio_profile
  add column if not exists real_profile_image_url text;

update public.portfolio_profile
set real_profile_image_url = coalesce(nullif(real_profile_image_url, ''), image)
where image is not null;
