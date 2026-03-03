begin;

-- Replace existing projects with CV-aligned portfolio entries.
delete from public.portfolio_projects;

insert into public.portfolio_projects (
  id,
  title,
  description,
  category,
  technologies,
  image,
  sort_order,
  is_published
)
values
  (
    '98f61d39-ae84-4a8a-a6ba-0a1112b7362a',
    'Sample Fintech Platform',
    'Template project entry for portfolio scaffolding. Replace with real project details in Supabase.',
    'app',
    array['ReactJS', 'Flutter', 'Node.js', 'TypeScript', 'Kotlin'],
    '/projects/app1.png',
    1,
    true
  ),
  (
    '8a4ca8b8-0b1f-4143-8d89-90f7aee055f9',
    'Sample Micro-Frontend Workspace',
    'Template project entry for portfolio scaffolding. Replace with real project details in Supabase.',
    'web',
    array['ReactJS', 'Micro-Frontend', 'TypeScript', 'Kotlin'],
    '/projects/app1.png',
    2,
    true
  ),
  (
    'a1f5af4d-2a77-4d7f-8f8a-2030e74a4d7d',
    'Sample Cross-Platform Suite',
    'Template project entry for portfolio scaffolding. Replace with real project details in Supabase.',
    'app',
    array['Flutter', 'Dart', 'Node.js', 'TypeScript'],
    '/projects/app1.png',
    3,
    true
  ),
  (
    '5f115284-98de-4bd3-b44b-e3ff630f7d65',
    'Sample Enterprise Web UI',
    'Template project entry for portfolio scaffolding. Replace with real project details in Supabase.',
    'web',
    array['HTML', 'SCSS', 'JavaScript', '.NET'],
    '/projects/app1.png',
    4,
    true
  ),
  (
    '43f4b229-7441-4c46-aa8b-2854d60cdad7',
    'Sample Rails Feature Delivery',
    'Template project entry for portfolio scaffolding. Replace with real project details in Supabase.',
    'web',
    array['Ruby on Rails', 'Ruby', 'PostgreSQL'],
    '/projects/app1.png',
    5,
    true
  );

commit;
