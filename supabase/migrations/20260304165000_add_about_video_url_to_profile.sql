alter table public.portfolio_profile
  add column if not exists about_video_url text;

update public.portfolio_profile
set about_video_url = coalesce(nullif(about_video_url, ''), '/assets/about-profile.mp4');
