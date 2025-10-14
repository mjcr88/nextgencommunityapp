# Story 1.2: Multi-Tenant & Auth Foundation (Technical Story)

As a **system architect**,
I want to **implement the core Supabase schema, RLS policies, and authentication service**,
so that I can **securely isolate tenant data and enable user login**.

**Acceptance Criteria:**
1.  The `tenants` and `users` tables shall be created with initial RLS policies for multi-tenancy.
2.  Supabase Auth shall be configured for email/password login and JWT generation.
3.  Initial seed data for the first tenant and a super admin user shall be created.
4.  The Supabase client shall be configured for use in Server Actions.

---

# Dev Agent Record

## Tasks
- [x] Create tables and RLS policies
- [x] Configure Supabase Auth for email/password
- [x] Create seed data
- [x] Configure client for Server Actions

## Completion Notes
- Schema and RLS implemented with basic policies for isolation.
- Auth actions (signUp, signIn, getCurrentUser) added with Zod validation, metadata for tenant/role.
- Seed verified: Default tenant and super admin present.
- Client configured in server actions with session handling.

## Change Log
- 2025-10-11: Implemented schema, RLS, auth actions, repo CRUD, tests. Fixed TS errors. Verified seed. Mitigated risks with integration tests.

Status: Ready for Review

Agent Model Used: Cline (default)

Debug Log References: None

File List
- packages/database/schema/001_create_tenants_users_tables.sql
- packages/database/src/lib/repositories/user.ts
- packages/database/src/lib/repositories/user.test.ts
- packages/shared/lib/schemas/user.ts
- apps/web/src/lib/supabase.ts
- apps/web/app/actions/user.ts

---

# QA Results

## Traceability Matrix

| AC | Description | GWT Scenario | Coverage | Risk Level | Status |
|----|-------------|--------------|----------|------------|--------|
| 1 | `tenants` and `users` tables created with initial RLS policies for multi-tenancy | Given Supabase schema with `tenants` and `users` tables, When inserting data for Tenant A and User1 (Tenant A), Then RLS enforces isolation: User1 can only SELECT/INSERT own tenant data; cross-tenant access denied (403/empty results). For policy failure: Given no RLS, When querying, Then expect full data leak (fail test). | Full | High | Planned - Schema/RLS testable via Supabase queries; recommend integration tests with mocked clients. |
| 2 | Supabase Auth configured for email/password login and JWT generation | Given email/password creds for new user, When calling Supabase Auth.signUp/signInWithPassword, Then expect successful JWT token with claims (user_id, tenant_id); token validates on subsequent requests. For invalid creds: When signing in, Then expect auth error (401), no token issued. | Full | High | Planned - Auth flows verifiable via Supabase client tests; include JWT parsing assertions. |
| 3 | Initial seed data for first tenant and super admin user created | Given empty DB, When running seed script, Then verify: `tenants` has entry (id, name='Default Tenant'), `users` has super admin (email, role='super', tenant_id linked); no duplicates/orphans. For seed failure: Given invalid data, Then script errors gracefully, rolls back. | Full | Medium | Planned - Seed testable via DB assertions post-run; use transactions for atomicity. |
| 4 | Supabase client configured for use in Server Actions | Given Server Action with Supabase client init (from env vars), When executing action (e.g., query users), Then client connects successfully, queries respect RLS/JWT; no config errors (e.g., missing URL/key). For misconfig: When env vars absent, Then action fails with clear error (no DB exposure). | Full | Medium | Planned - Client testable in Next.js actions; mock Supabase for unit tests. |

## Overall Assessment
- **Traceability**: 100% - All ACs mapped to GWT scenarios focusing on security isolation (RLS/multi-tenancy) and auth reliability. Pre-implementation, so scenarios guide dev/testing.
- **Risks & NFRs**: High for AC1/2 (data leaks/auth bypass could impact security); medium for others. Emphasize NFRs: RLS 100% enforcement, auth response <500ms, seed idempotent. Observability via Supabase logs/queries.
- **Testability**: Medium-High - Controllable via Supabase CLI/scripts; observable with query assertions and error simulations. Debug via local Supabase instance. Gaps: Need RLS policy tests (use supabase-js for integration).
- **Gate Decision**: **PASS** (Traceability) - Strong blueprint for secure foundation; proceed to implementation with security review. Waive for pre-work, but flag auth risks for early testing.
- **Recommendations**: 
  - Use Supabase local for RLS/auth tests (docker run supabase/postgres).
  - Add integration suite (Vitest + @supabase/supabase-js) for AC1-4.
  - Seed via migration (not raw SQL) for reproducibility.
  - Post-implementation: Run auth penetration tests (e.g., JWT tampering).

Date: 2025-10-08
Reviewer: Quinn (Test Architect)
