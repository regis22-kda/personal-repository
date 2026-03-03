begin;

-- Replace existing skill groups with the latest grouped skillset.
delete from public.portfolio_skill_groups;

insert into public.portfolio_skill_groups (
  id,
  group_name,
  skills,
  sort_order,
  is_published
)
values
  (
    '3d4f9c6f-156f-4a0e-9ac8-bf2f3e218d6e',
    'Frontend & Mobile',
    array['Dart', 'Flutter', 'ReactJS'],
    1,
    true
  ),
  (
    '7701ee1f-94c7-4d25-b4c0-7feea56d63f8',
    'Backend & Data',
    array['Kotlin Sprint Boot', 'Firebase', 'MongoDB'],
    2,
    true
  ),
  (
    '48abbf04-e3d2-42f8-9900-b79bf2fdb25a',
    'Testing & Quality',
    array['Automation Testing', 'Cypress'],
    3,
    true
  ),
  (
    '51ff0a9d-2f6e-4afb-8c90-aee72b8dc882',
    'Tools & Delivery',
    array['Git', 'Agile Methodology', 'Harness'],
    4,
    true
  );

commit;
