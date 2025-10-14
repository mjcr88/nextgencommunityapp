# Tech Stack

**DEFINITIVE Technology Selection**

This table is the **single source of truth** for all technology choices. Every version is pinned specifically. All development must use these exact versions.

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.3.x | Type-safe development | Prevents runtime errors, excellent IDE support, required for shadcn/ui |
| **Frontend Framework** | Next.js | 14.2.x | React framework with App Router | Server Components, streaming SSR, optimized performance, Vercel integration |
| **React** | React | 18.3.x | UI library | Required by Next.js, Server Components support |
| **UI Component Library** | shadcn/ui | Latest | Accessible component primitives | Matches design spec, Radix UI foundation, copy-paste philosophy |
| **UI Primitives** | Radix UI | 1.x | Headless accessible components | Foundation for shadcn/ui, WCAG AA compliant |
| **Extended Components** | ReactBits, Skiper UI, Cult UI, Magic UI | Latest | Advanced UI patterns | Per design spec for animations, forms, interactions |
| **Icons** | Lucide React | 0.263.x | Icon system | Per design spec, 1000+ icons, tree-shakeable |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first CSS | Core to shadcn/ui, design spec foundation |
| **State Management** | Zustand | 4.5.x | Client-side state | Lightweight, simple API, no boilerplate |
| **Server State** | TanStack Query | 5.x | Async state management | Caching, refetching, optimistic updates for Supabase data |
| **Forms** | React Hook Form | 7.51.x | Form management | Performance, DX, integrates with Zod |
| **Validation** | Zod | 3.22.x | Schema validation | Type-safe validation, shared frontend/backend |
| **Date Handling** | date-fns | 3.x | Date utilities | Lightweight, tree-shakeable |
| **Animation** | Framer Motion | 11.x | UI animations | Declarative animations, spring physics, per design spec |
| **Charts/Viz** | Recharts | 2.12.x | Data visualization | React-first, for admin analytics if needed |
| **Backend Language** | TypeScript | 5.3.x | Type-safe APIs | Consistent with frontend |
| **API Framework** | Next.js API Routes + Server Actions | 14.2.x | Backend logic | Integrated with Next.js, serverless-ready |
| **Database** | PostgreSQL | 15.x | Primary database | Via Supabase, ACID compliance, mature ecosystem |
| **Database Client** | Supabase JS Client | 2.x | Database access | Auto-generated types, RLS support, realtime |
| **ORM/Query Builder** | Supabase (PostgREST) | Latest | API layer | Auto-generated REST API from PostgreSQL schema |
| **Database Migrations** | Supabase CLI | 1.x | Schema management | Version-controlled migrations |
| **Vector Database** | pgvector | 0.5.x | AI embeddings | PostgreSQL extension via Supabase, for RAG |
| **Cache** | Vercel KV (Redis) | Latest | In-memory cache | Session data, rate limiting, temporary data |
| **File Storage** | Supabase Storage | Latest | User-uploaded files | S3-compatible, RLS-protected, CDN integration |
| **Authentication** | Supabase Auth | Latest | User authentication | Email/password, magic links, OAuth, JWT tokens |
| **Authorization** | PostgreSQL RLS | 15.x | Row-level security | Multi-tenant data isolation, policy-based access |
| **Real-time** | Supabase Realtime | Latest | Live updates | WebSocket, PostgreSQL change subscriptions |
| **AI/LLM** | OpenAI API | Latest | AI assistant | GPT-4 for chat, text-embedding-3-large for RAG |
| **Vector Search** | pgvector | 0.5.x | Semantic search | Cosine similarity for RAG knowledge retrieval |
| **Workflow Automation** | n8n | Latest (self-hosted) | Integration workflows | **MVP Core**: Telegram ingestion, message classification, summarization, embeddings, future Google Sheets/WhatsApp |
| **External Messaging** | Telegram Bot API | Latest | Message ingestion | **MVP Core**: Real-time message capture from interest-based groups |
| **Frontend Testing** | Vitest | 1.x | Unit/component tests | Fast, Vite-native, Jest-compatible API |
| **React Testing** | Testing Library | 14.x | Component testing | User-centric testing, accessibility focus |
| **E2E Testing** | Playwright | 1.42.x | End-to-end tests | Multi-browser, reliable, great DX |
| **Code Quality** | ESLint | 8.x | Linting | Code quality, Next.js config |
| **Code Formatting** | Prettier | 3.x | Code formatting | Consistent style |
| **Git Hooks** | Husky | 9.x | Pre-commit checks | Enforce linting, tests before commit |
| **Commit Linting** | Commitlint | 18.x | Commit message format | Conventional commits |
| **Package Manager** | pnpm | 8.x | Dependency management | Fast, efficient, monorepo support |
| **Monorepo Tool** | Turborepo | 1.12.x | Build orchestration | Caching, parallel execution |
| **Deployment** | Vercel | Latest | Hosting platform | Zero-config Next.js, edge functions, analytics |
| **CI/CD** | GitHub Actions | Latest | Continuous integration | Automated testing, deployments |
| **IaC** | OpenTofu | 1.6.x | Infrastructure as code | Open-source Terraform alternative, minimal usage |
| **Monitoring** | Vercel Analytics | Latest | Performance monitoring | Real User Monitoring, Web Vitals |
| **Error Tracking** | Vercel built-in | Latest | Error monitoring | Basic error tracking for MVP |
| **Logging** | Vercel Logs + Supabase Logs | Latest | Application logging | Centralized logging |
| **API Documentation** | TypeDoc | 0.25.x | Code documentation | Auto-generated from TypeScript |
| **PWA** | next-pwa | 5.6.x | Progressive Web App | Service worker, offline, installable |
| **Push Notifications** | Web Push API | Native | Mobile notifications | Browser-native push (PWA) |
| **Image Optimization** | Next.js Image | 14.2.x | Image optimization | Automatic WebP, lazy loading, responsive |
| **SEO** | Next.js Metadata API | 14.2.x | SEO optimization | Dynamic meta tags, OG images |

---
