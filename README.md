# Personal Portfolio

A React + TypeScript portfolio application with a dark design, clean-architecture layering, and route-based pages for Home, About, Resume, Portfolio, and Contact.

## Tech Stack

- React 19
- TypeScript (strict)
- Vite
- Ant Design
- React Router
- ESLint

## Features

- Hybrid left navigation sidebar:
  - Collapsed icon rail by default on desktop
  - Expandable full sidebar with profile and CTA
  - Mobile bottom navigation
- Full-page application shell with internal stage scrolling
- Dark-only design tokens and global CSS variables
- Route-based pages:
  - `/` Home
  - `/about`
  - `/resume`
  - `/portfolio`
  - `/contact`
  - `*` Not Found
- Portfolio project filtering by category
- Resume timeline + skills section
- Contact form with TypeScript-typed validation and mock async submit
- IntersectionObserver-powered reveal animations
- SEO metadata updates per route via local SEO component
- Repository DI pattern to keep UI decoupled from data source implementations
- Supabase-backed repositories (with optional mock fallback)
- Dynamic Home page stats (Experience years, Project count)
- Project detail support for "Involvement" (the role/context of the contribution)
- Supabase Edge Function endpoint for contact form submission

## Architecture

The project follows a clean-architecture style split:

- `src/core/`
  - `constants/`: app metadata and navigation config
  - `di/`: repository provider and context
  - `theme/`: AntD theme config, global design tokens/styles
  - `utils/`: shared helpers (`downloadFile`, class name merge)
- `src/domain/`
  - `entities/`: domain models (`Project`, `Profile`, `Experience`, etc.)
  - `repositories/`: repository contracts/interfaces
- `src/data/`
  - `mocks/`: mock source data
  - `mappers/`: Supabase row to domain entity mapping
  - `repositories/`: mock + Supabase repository implementations
  - `supabase/`: Supabase client and provider utilities
- `src/application/`
  - `hooks/`: UI-facing domain hooks (`useProjects`, `useResume`, `useProfile`, `useContactForm`)
- `src/presentation/`
  - `layout/`: `AppShell`
  - `routes/`: route table
  - `pages/`: Home, About, Resume, Portfolio, Contact, NotFound
  - `components/`: navigation, motion, shared UI
  - `hooks/`: presentation-specific hooks (`useActiveRoute`, `useInView`)
  - `styles/`: application-level CSS

## Data Flow

1. Presentation pages consume usecase hooks only.
2. Usecase hooks call repository interfaces through DI context.
3. DI provider selects Supabase repositories by default when env vars are configured.
4. If Supabase vars are missing, provider safely falls back to mock repositories.
5. Contact submissions use the `contact-submit` Edge Function endpoint.

This allows swapping mock repositories with API-backed repositories without changing page components.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Configure Environment

Copy `.env.example` to `.env` and fill values:

```bash
cp .env.example .env
```

Required client variables:

- `VITE_DATA_PROVIDER` (`supabase` or `mock`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Run Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Secret Scan

```bash
npm run secrets:scan
```

### Install Pre-commit Hook

```bash
npm run hooks:install
```

## Assets

- Portfolio and planning assets: `public/projects/*`
- Downloadable CV placeholder used by CTA buttons: `public/assets/regis-cv.txt`

## Notes

- `react-helmet-async` is not currently wired; route metadata is updated through `src/presentation/components/SEO.tsx` using DOM meta updates.
- Framer Motion is not used in runtime UI behavior; motion is CSS + IntersectionObserver.
- Do not commit `.env` files or any real credentials.
- CI includes secret scanning at `.github/workflows/secret-scan.yml`.

## Supabase Endpoint and Security

- Read data tables:
  - `portfolio_projects`: includes `id`, `title`, `description`, `involvement`, `category`, `technologies`, `image`, etc.
  - `portfolio_profile`
  - `portfolio_social_links`
  - `portfolio_experiences`
  - `portfolio_skill_groups`
- Contact endpoint:
  - `POST /functions/v1/contact-submit`
- Edge Function includes:
  - payload validation
  - honeypot (`website` field)
  - IP hash based rate limiting

Server-only secrets such as `SUPABASE_SERVICE_ROLE_KEY` must only be configured in Supabase function secrets and never in frontend code.
