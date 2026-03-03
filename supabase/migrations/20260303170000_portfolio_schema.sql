create extension if not exists pgcrypto;

create table if not exists public.portfolio_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  email text not null,
  phone text not null,
  location text not null,
  image text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.portfolio_profile(id) on delete cascade,
  name text not null,
  url text not null,
  sort_order integer not null default 0
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('app', 'web', 'uiux')),
  technologies text[] not null default '{}',
  image text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  year text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_skill_groups (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  skills text[] not null default '{}',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  ip_hash text not null,
  user_agent text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submit_logs (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_portfolio_projects_sort on public.portfolio_projects (sort_order);
create index if not exists idx_portfolio_experiences_sort on public.portfolio_experiences (sort_order);
create index if not exists idx_portfolio_skill_groups_sort on public.portfolio_skill_groups (sort_order);
create index if not exists idx_portfolio_social_links_sort on public.portfolio_social_links (sort_order);
create index if not exists idx_contact_submit_logs_ip_created_at on public.contact_submit_logs (ip_hash, created_at desc);

alter table public.portfolio_profile enable row level security;
alter table public.portfolio_social_links enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_experiences enable row level security;
alter table public.portfolio_skill_groups enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.contact_submit_logs enable row level security;

drop policy if exists "Public read active profile" on public.portfolio_profile;
create policy "Public read active profile"
  on public.portfolio_profile
  for select
  to anon
  using (is_active = true);

drop policy if exists "Public read profile socials" on public.portfolio_social_links;
create policy "Public read profile socials"
  on public.portfolio_social_links
  for select
  to anon
  using (
    exists (
      select 1
      from public.portfolio_profile p
      where p.id = profile_id and p.is_active = true
    )
  );

drop policy if exists "Public read published projects" on public.portfolio_projects;
create policy "Public read published projects"
  on public.portfolio_projects
  for select
  to anon
  using (is_published = true);

drop policy if exists "Public read published experiences" on public.portfolio_experiences;
create policy "Public read published experiences"
  on public.portfolio_experiences
  for select
  to anon
  using (is_published = true);

drop policy if exists "Public read published skill groups" on public.portfolio_skill_groups;
create policy "Public read published skill groups"
  on public.portfolio_skill_groups
  for select
  to anon
  using (is_published = true);

grant select on public.portfolio_profile to anon;
grant select on public.portfolio_social_links to anon;
grant select on public.portfolio_projects to anon;
grant select on public.portfolio_experiences to anon;
grant select on public.portfolio_skill_groups to anon;

revoke all on public.contact_inquiries from anon, authenticated;
revoke all on public.contact_submit_logs from anon, authenticated;

insert into public.portfolio_profile (id, name, title, email, phone, location, image, is_active)
values (
  '4f1e65b4-819e-4f35-ab2d-2f5f1275a1a0',
  'Rheganandar Bagas',
  'Software Engineer',
  'rheganandar.bi@gmail.com',
  '+62 895-1335-8568',
  'Bandung, Indonesia',
  '/projects/app1.png',
  true
)
on conflict (id) do update
set
  name = excluded.name,
  title = excluded.title,
  email = excluded.email,
  phone = excluded.phone,
  location = excluded.location,
  image = excluded.image,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.portfolio_social_links (id, profile_id, name, url, sort_order)
values
  ('7e1cb247-df2f-46f9-a363-3adcf7db920a', '4f1e65b4-819e-4f35-ab2d-2f5f1275a1a0', 'GitHub', 'https://github.com/', 1),
  ('ff16ea15-f813-4cc6-9531-476938ff2c89', '4f1e65b4-819e-4f35-ab2d-2f5f1275a1a0', 'LinkedIn', 'https://linkedin.com/in/', 2)
on conflict (id) do update
set
  profile_id = excluded.profile_id,
  name = excluded.name,
  url = excluded.url,
  sort_order = excluded.sort_order;

insert into public.portfolio_projects (id, title, description, category, technologies, image, sort_order, is_published)
values
  ('ec16ff43-db87-4e36-b1f5-214317f89e93', 'Task Manager App', 'A simple task tracking application.', 'app', array['React', 'TypeScript'], '/projects/app1.png', 1, true),
  ('1869b8ec-d5eb-4f80-8592-5966397dadf9', 'Company Website', 'A responsive company profile website.', 'web', array['React', 'CSS'], '/projects/app1.png', 2, true),
  ('ce95c4eb-df79-4d84-a0f7-41c1fd88f2fc', 'Finance Dashboard UI', 'A clean dashboard interface concept.', 'uiux', array['Figma', 'Design System'], '/projects/app1.png', 3, true)
on conflict (id) do update
set
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  technologies = excluded.technologies,
  image = excluded.image,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.portfolio_experiences (id, title, description, technologies, year, sort_order, is_published)
values
  ('74f4f467-6cb4-4868-9f9c-8db7080a3894', 'Task Manager App', 'Built a task tracking application with reusable components and typed services.', array['React', 'TypeScript', 'Ant Design'], '2025', 1, true),
  ('188f604a-1cb5-40e5-8892-9fb9333713db', 'Company Website', 'Developed a responsive website for business profile and service showcase.', array['React', 'CSS', 'Vite'], '2024', 2, true)
on conflict (id) do update
set
  title = excluded.title,
  description = excluded.description,
  technologies = excluded.technologies,
  year = excluded.year,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.portfolio_skill_groups (id, group_name, skills, sort_order, is_published)
values
  ('e0e4c6c7-e258-4b91-9fd9-92ee6f2147df', 'Frontend', array['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'], 1, true),
  ('7549af6f-258f-40f9-a4ce-aaf3215a5089', 'Tools', array['Git', 'Vite', 'ESLint', 'Figma'], 2, true)
on conflict (id) do update
set
  group_name = excluded.group_name,
  skills = excluded.skills,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();
