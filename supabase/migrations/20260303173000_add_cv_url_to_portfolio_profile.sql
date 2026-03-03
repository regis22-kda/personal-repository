alter table public.portfolio_profile
  add column if not exists cv_url text;

update public.portfolio_profile
set cv_url = '/assets/regis-cv.txt'
where cv_url is null or cv_url = '';
