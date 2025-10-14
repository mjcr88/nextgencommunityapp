# Story 1.1 Context: Monorepo & CI/CD Setup

## Project Overview (From Core Docs)
- **Goal:** Establish scalable foundation for Ecovilla platform (multi-tenant community app with Next.js 15 App Router, Supabase, shadcn/ui, mobile-first PWA).
- **Scope:** Turborepo monorepo with pnpm workspaces: apps/web (Next.js app), packages/ui (shadcn components), database (Supabase schema/types), shared (Zod/utils/constants), config (ESLint/TS/Tailwind).
- **Tech Stack (Relevant):** Next.js 15 (App Router, Server Components), TypeScript 5.3, Tailwind 3.4 (custom tokens: forest-canopy primary), Zod 3.22, TanStack Query 5, React Hook Form 7, Vitest 1, Playwright 1.42, Husky 9. Pinned versions per architecture doc.
- **Non-Functional:** <150 lines/file, functional/declarative code, DRY, RORO functions, mobile-first responsive, server-side logic preferred.
- **Structure:** Root: turbo.json (tasks: build outputs .next/**), package.json (workspaces: apps/*, packages/*, scripts: "build": "turbo run build", "dev": "turbo run dev"). apps/web: next.config.js (transpilePackages: ['@repo/ui']), tsconfig.json (paths for shared). No existing code; start from scratch in cwd /Users/mj/Developer/community_app.
- **Deployment:** Vercel (link project, env vars for Supabase/Vercel KV), GitHub Actions CI/CD (.github/workflows/ci.yml: build/test/lint/deploy on push/PR).
- **Testing:** Unit (Vitest for utils), Integration (Supabase local), E2E (Playwright for flows). Lint (ESLint/Prettier), Husky pre-commit.
- **Risks (From Linear QA Comment on NEX-6):** Critical: CI/CD pipeline failure blocking deploy (mitigate: automated rollback, end-to-end tests TC-1.1.3/1.1.6). High: Cross-package imports/CI integrity (TC-1.1.2/1.1.4/1.1.5). Focus: Verify monorepo deps, turbo caching, Vercel preview deploys.
- **Test Design (From Linear QA Comment):** Critical: E2E deployment/rollback (TC-1.1.3,1.1.6). High: Imports/CI (TC-1.1.2,1.1.4,1.1.5). Automation: Jest/Vitest in CI, GitHub Actions for pipeline. Ref: docs/qa/assessments/1.1-monorepo-cicd-setup-technical-story-test-design-20251007.md.

## Linear Integration
- **Project ID:** a30813ed-eb90-4ddd-a177-07b5a575b9ba (Epic 1: Project Foundation & Onboarding Gateway).
- **Story ID:** NEX-6 (Todo, assigned Michael Jedamski, priority 2).
- **Subtasks (All Todo, Core label except noted):**
  - NEX-11: Define Monorepo Structure (pnpm/Turborepo).
  - NEX-12: Link Vercel Project and Configure Deployment.
  - NEX-13: Implement GitHub Actions CI/CD Pipeline.
  - NEX-14: Install and Configure Core Dependencies.
- **Comments:** 2 from Michael Jedamski (Oct 7, 2025): Risk assessment (critical pipeline failure; mitigate rollback/tests), Test design (focus E2E/CI; automate Vitest/GitHub Actions). Ref QA docs for full details.

## Key Tech Docs from Context7
### Turborepo (/vercel/turborepo)
- **Init:** `npx create-turbo@latest` scaffolds root/apps/web/packages/ui/etc.
- **Config:** turbo.json: {"tasks": {"build": {"outputs": [".next/**"]}}}. Root package.json: workspaces ["apps/*", "packages/*"], scripts {"build": "turbo run build"}.
- **Deps:** `pnpm add -w turbo --save-dev`. Internal: "@repo/ui": "workspace:*" in apps/web/package.json.
- **Scripts:** Root: "dev": "turbo run dev", "build": "turbo run build", "lint": "turbo run lint".
- **Next.js Integration:** apps/web/next.config.js: transpilePackages: ['@repo/ui']. Use turbo prune for Docker.
- **CI/CD (GitHub Actions):** .github/workflows/ci.yml: on push/PR, ubuntu-latest, setup-node 20/cache pnpm, pnpm install, turbo run build/test. Cache .turbo: key="${{ runner.os }}-turbo-${{ hashFiles('turbo.json', '**/pnpm-lock.yaml') }}". Env: TURBO_TOKEN/TEAM for remote cache (Vercel secrets).
- **ESLint/TS:** Shared config in packages/config/eslint: extends next/turbo. Add to apps/web devDeps: "@repo/eslint-config": "workspace:*".

### pnpm (Fallback from Turborepo/Next.js Examples)
- **Workspaces:** Root package.json: "workspaces": ["apps/*", "packages/*"]. Install: `pnpm install` (root lockfile pnpm-lock.yaml).
- **Scripts:** Use pnpm for turbo: "build": "turbo run build", "dev": "turbo run dev --parallel".
- **Monorepo Commands:** `pnpm add -w turbo --save-dev` (root), `pnpm add next @repo/ui workspace:*` in apps/web. dlx for create-next-app: `pnpm dlx create-next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir`.

### Next.js 15 (/vercel/next.js)
- **Scaffold:** `pnpm dlx create-next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir`. next.config.js: transpilePackages: ['@repo/ui'], outputFileTracingRoot: path.join(__dirname, '../../').
- **Tailwind:** tailwind.config.js content: ['./apps/web/**/*.{js,ts,jsx,tsx,mdx}', './packages/ui/**/*.{js,ts,jsx,tsx,mdx}'].
- **TS Config:** Root tsconfig.json: "extends": "./tsconfig.json", paths for shared. apps/web/tsconfig.json: "paths": {"@/*": ["./*"]}.
- **Build/Cache:** next.config.js for monorepo tracing. Scripts via turbo.
- **ESLint:** Root config extends next/core-web-vitals; apps/web: extends '@repo/eslint-config/next'.

### Vercel (/vercel/vercel)
- **Link:** `npx vercel link` from root (GitHub repo).
- **Deploy:** `npx vercel` or GitHub integration (auto push/PR). vercel.json root: {"buildCommand": "pnpm turbo build --filter=web"}.
- **CI/CD:** GitHub Actions triggers Vercel; turbo build in workflow.
- **Secrets:** Dashboard for NEXT_PUBLIC_SUPABASE_URL, etc. Access process.env.

### GitHub Actions (Via Turborepo/Vercel Snippets)
- **Workflow Example:** .github/workflows/ci.yml: on push/PR, jobs build/test (pnpm install, turbo build/test/lint). Cache .turbo for speed.
- **Vercel Integration:** Auto-deploy on push; use TURBO_TOKEN for cache.

## Implementation Tips for Story 1.1
- **Order:** Init turbo/root, scaffold dirs, add deps/configs, setup CI/CD, test build/deploy.
- **Validation:** Run pnpm turbo build/lint/test, Vercel preview. Address QA risks: Add rollback in workflow (e.g., if build fails, don't deploy).
- **Best Practices:** Use pnpm for efficient installs; turbo for parallel/cached tasks. Ensure .gitignore ignores node_modules, .turbo.
- **Next Steps:** After setup, commit/push for CI/CD test.
