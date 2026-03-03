begin;

-- Replace existing resume experience seed data with the latest provided profile history.
delete from public.portfolio_experiences;

insert into public.portfolio_experiences (
  id,
  title,
  description,
  technologies,
  year,
  sort_order,
  is_published
)
values
  (
    '85f6fb6c-6efe-4426-9fb9-fb54934df3e9',
    'Lead Software Engineer',
    'Template lead-engineering entry for migration scaffolding. Replace with real content directly in Supabase.',
    array['ReactJS', 'Flutter', 'Node.js', 'TypeScript'],
    '2023 — Current',
    1,
    true
  ),
  (
    '0245a595-035c-4c0b-a6b2-b8808ef58f37',
    'Software Engineer',
    'Template software engineering entry for migration scaffolding. Replace with real content directly in Supabase.',
    array['Flutter', 'Node.js', 'TypeScript'],
    '2020 — 2023',
    2,
    true
  ),
  (
    'fc905915-0f39-41b3-a000-a558f1682ccf',
    'Junior Front End Developer',
    'Template junior frontend entry for migration scaffolding. Replace with real content directly in Supabase.',
    array['HTML', 'SCSS', 'JavaScript', '.NET'],
    '2020',
    3,
    true
  ),
  (
    '3f690db5-cfd0-42fa-839d-91965f773c5b',
    'Ruby on Rails Developer',
    'Template backend entry for migration scaffolding. Replace with real content directly in Supabase.',
    array['Ruby on Rails', 'Ruby', 'Web Development'],
    '2019 — 2020',
    4,
    true
  );

commit;
