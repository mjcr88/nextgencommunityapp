# Epic 1: Project Foundation & Onboarding Gateway

**Epic Goal:** To establish the core technical infrastructure, security foundation, and initial user authentication required to support all subsequent feature development.

---

## Story 1.1: Monorepo & CI/CD Setup (Technical Story)

As a **system architect**,
I want to **implement the Next.js/Supabase monorepo structure and automated deployment pipeline**,
so that I can **ensure a scalable, type-safe, and continuously deployable foundation for the platform**.

**Acceptance Criteria:**
1.  The monorepo structure (`apps/web`, `packages/ui`, `packages/database`, `packages/shared`) shall be defined using pnpm and Turborepo.
2.  The Vercel project shall be linked and configured for deployment.
3.  GitHub Actions CI/CD pipeline shall be running (Build/Test/Deploy).
4.  All core dependencies (TypeScript, Tailwind, Zod, etc.) shall be installed and configured per the Architecture Document.

---

## Story 1.2: Multi-Tenant & Auth Foundation (Technical Story)

As a **system architect**,
I want to **implement the core Supabase schema, RLS policies, and authentication service**,
so that I can **securely isolate tenant data and enable user login**.

**Acceptance Criteria:**
1.  The `tenants` and `users` tables shall be created with initial RLS policies for multi-tenancy.
2.  Supabase Auth shall be configured for email/password login and JWT generation.
3.  Initial seed data for the first tenant and a super admin user shall be created.
4.  The Supabase client shall be configured for use in Server Actions.

---

## Story 1.3: Admin User Creation (Flow 0)

As an **administrator**,
I want to **use the Backoffice interface to create new users and assign lots**,
so that I can **onboard new residents and send them activation emails**.

**Acceptance Criteria:**
1.  The Admin Backoffice shall provide a "Create User" interface (Flow 0).
2.  Admin can assign a lot number to the new user.
3.  The system shall send a unique activation email to the new resident.
4.  The new user shall appear with a "Pending" status in the User Management list.

---

## Story 1.4: Account Activation & Password Setup (Flow 1 Gateway)

As a **new resident**,
I want to **activate my account via an email link and set a secure password**,
so that I can **gain access to the platform and begin the onboarding wizard**.

**Acceptance Criteria:**
1.  The activation link shall validate the user token and redirect to the password setup screen (Flow 1, Screen 1).
2.  The user must be able to set a password that meets security requirements (min 8 chars, number, uppercase).
3.  Upon successful password setup, the user shall be redirected to the first step of the 6-step onboarding wizard (Flow 1, Screen 2).

---

## Story 1.5: External Service Credentialing (Technical Story)

As a **system architect**,
I want to **securely store and validate API keys for OpenAI and Telegram/n8n integration**,
so that I can **enable the AI Assistant and content ingestion features**.

**Acceptance Criteria:**
1.  Vercel secrets shall be configured for OpenAI API keys and the Telegram Bot Token.
2.  The n8n webhook secret shall be generated and validated by the Next.js API route.
3.  Server-side components shall successfully access and utilize these credentials for initial connection tests.

---
