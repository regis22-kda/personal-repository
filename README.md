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
  - `repositories/`: concrete mock repository implementations
- `src/usecases/`
  - UI-facing hooks (`useProjects`, `useResume`, `useContactForm`, `useInView`, etc.)
- `src/presentation/`
  - `layout/`: `AppShell`
  - `routes/`: route table
  - `pages/`: Home, About, Resume, Portfolio, Contact, NotFound
  - `components/`: navigation, motion, shared UI
  - `styles/`: application-level styling

## Data Flow

1. Presentation pages consume usecase hooks only.
2. Usecase hooks call repository interfaces through DI context.
3. DI provider supplies mock repository implementations.
4. Repositories resolve data from `src/data/mocks`.

This allows swapping mock repositories with API-backed repositories without changing page components.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

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

## Assets

- Portfolio and planning assets: `public/projects/*`
- Downloadable CV placeholder used by CTA buttons: `public/assets/regis-cv.txt`

## Notes

- `react-helmet-async` is not currently wired; route metadata is updated through `src/presentation/components/SEO.tsx` using DOM meta updates.
- Framer Motion is not used in runtime UI behavior; motion is CSS + IntersectionObserver.
