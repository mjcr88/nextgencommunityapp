# Story 1.2.5: Admin Tenant & Lot Management (Technical Story)

**Status:** In Progress

As an **administrator/system architect**,
I want to **use the Backoffice to create and manage tenants (neighborhoods/communities) and lots (property assignments)**,
so that I can **set up the initial community structure, enabling secure multi-tenancy and user lot assignment in subsequent flows**.

This story addresses a prerequisite gap for Story 1.3 (user creation with lot assignment) and aligns with PRD TA2 (multi-tenant architecture) and FR6 (Backoffice for management). It extends Story 1.2's tenants/users foundation without introducing geo features (defer to Epic 3 FR2).

**Acceptance Criteria:**
1. Database schema shall include a `neighborhoods` table (id, tenant_id FK, name string, description? text, settings jsonb optional) and `lots` table (id, neighborhood_id FK, lot_number string unique per neighborhood, status enum: available/assigned, geo_bounds jsonb optional for future map) with RLS policies (tenant-scoped for neighborhoods/lots; admins full CRUD, users read own tenant's).
2. Zod schemas in packages/shared/lib/schemas/ shall define TenantSchema (extend 1.2), NeighborhoodSchema, and LotSchema (insert/update, validate uniqueness per neighborhood).
3. Repository functions in packages/database/src/lib/repositories/ shall include tenant CRUD (createTenant etc.), neighborhood CRUD (createNeighborhood, listByTenant, getById), lot CRUD (createLot scoped to neighborhood, assignLotToUser, getAvailableLotsByNeighborhood), using Supabase/Zod/AppError.
4. Server actions in apps/web/app/actions/admin.ts shall provide createTenant, createNeighborhood (under tenant), createLot (under neighborhood), with admin auth (1.2 getCurrentUser).
5. Integration/unit tests (Vitest) cover hierarchy (create tenant>neighborhood>lot, assign, RLS isolation, no cross-tenant), mock Supabase per 1.2.
6. Seed: Initial Ecovilla tenant with neighborhoods (e.g., "Almendro", "Bamboo") each with sample lots (e.g., lot_101 available).
7. No direct messaging; notifications for errors (e.g., lot taken, invalid neighborhood).

---

## Tasks / Subtasks
- [x] DB Migration: Add 002_add_neighborhoods_lots_tables.sql to packages/database/schema/ (neighborhoods table with tenant_id FK/RLS, lots with neighborhood_id FK/RLS; indexes on FKs).
  - [x] Update supabase.ts types generation (run supabase gen types).
- [x] Schemas: Add packages/shared/lib/schemas/neighborhood.ts (Zod insert/update, jsonb settings), extend tenant.ts if needed; add lot.ts (Zod, unique lot_number per neighborhood_id, JsonZod geo_bounds).
  - [x] Validate: Neighborhood under tenant, lot under neighborhood (FK checks).
- [ ] Repositories: Add tenant.ts (CRUD if missing), neighborhood.ts (create/listByTenant/getById, tenant-scoped), lot.ts (create/getAvailableByNeighborhood/assign, neighborhood-scoped).
  - [ ] Extend user.ts for future lot assign (prep FK users.lot_id).
  - [ ] Patterns: 1.2 Supabase.from('neighborhoods').insert({...}).select(), Zod parse, AppError (e.g., invalid tenant_id).
- [ ] Actions: Create/extend apps/web/app/actions/admin.ts: createTenantAction, createNeighborhoodAction (input tenant_id), createLotAction (input neighborhood_id).
  - [ ] Auth: 1.2 getCurrentUser.role 'super_admin' or tenant admin.
- [ ] Tests: Add packages/database/test/integration/admin.integration.test.ts (mock auth, full hierarchy CRUD: tenant>neigh>lot, RLS isolation).
  - [ ] Unit: repositories/neighborhood.test.ts, lot.test.ts (validation, FK errors).
- [ ] Seed: Insert initial tenant, neighborhoods ("Almendro", "Bamboo" etc.), sample lots per neighborhood (available status).
- [ ] Docs: Update architecture/source-tree.md (add neighborhoods/lots paths).

(ACs: All; post-1.2, pre-1.2.6; backend-only, UI in 1.2.6)

---

## Dev Notes
Pulled from PRD (TA2 multi-tenancy, FR6 Backoffice) and Story 1.2 build notes (tenants table exists with RLS; extend schema.sql; use user repo patterns for lots; Supabase client in lib/supabase.ts; Zod in shared/lib/schemas/user.ts for FK; actions in app/actions/user.ts as model; tests mock Supabase per integration.test.ts).

- **Source Tree Relevance**: 
  - New: packages/database/schema/002_add_neighborhoods_lots_tables.sql, shared/lib/schemas/neighborhood.ts + lot.ts, database/src/lib/repositories/neighborhood.ts + lot.ts (tenant.ts if missing).
  - Extend: shared/lib/schemas/tenant.ts (settings jsonb), app/actions/admin.ts (hierarchy actions).
  - Tests: database/test/integration/admin.integration.test.ts (hierarchy mocks), repositories/neighborhood.test.ts + lot.test.ts.
- **Previous Notes Relevance (from 1.2)**: Reuse RLS (FK filters: tenant_id > neighborhood_id > lot_id), JsonZod (settings/geo_bounds), AppError (hierarchy validation), defaults (neighborhood status='active', lot 'available'). Admin role 'super_admin' or tenant admin. Functional TS, no classes.
- **Technical Context**: Supabase (migrations CLI, types gen), Vitest mocks (chained inserts). Actions exposed for 1.2.6 UI (e.g., listTenants, createNeighborhood). SaaS: Super admin creates tenants, tenant admins neighborhoods/lots. Scalability: Composite indexes (tenant_id + neighborhood_id). Defer geo (FR2). UI integration in 1.2.6.

**Testing Standards** (from architecture/coding-standards.md, 1.2 patterns):
- Location: packages/database/test/ (unit/integration).
- Frameworks: Vitest (unit), Supabase mocks (integration); P0 security (RLS, auth), data validation (Zod), flows (CRUD).
- Patterns: describe/it, expect.assertions, mock.supabase.from('lots').insert().returns({data: [...]}) per 1.2.
- Specific: Test lot assignment (update users.lot_id FK), non-admin access denied (empty select), dupe lot error.

---

## Change Log
| Date       | Version | Description                          | Author    |
|------------|---------|--------------------------------------|-----------|
| 2025-10-12 | 1.0     | Initial draft for tenant/lot gap.    | Sarah (PO)|
| 2025-10-12 | 1.1     | Package 1: DB migration/schemas/types/RLS complete. | Cline |

---

## Dev Agent Record
*(To be populated during implementation)*

**Agent Model Used:** Cline (Claude 3.5 Sonnet)

**Debug Log References:** .ai/debug-log.md

**Completion Notes List:** 
- Package 1 complete: Migration 002 applied via MCP, types regenerated, schemas created (neighborhood/lot Zod with JsonZod reuse), user.ts extended (lot_id optional), RLS verified (tables/columns/FKs match, policies tenant-scoped/super_admin). No errors; ready for repos.

**File List:** 
- packages/database/schema/002_add_neighborhoods_lots_tables.sql (new: tables/RLS/indexes)
- packages/database/src/types/supabase.ts (modified: regenerated with neighborhoods/lots relations)
- packages/shared/lib/schemas/neighborhood.ts (new: Zod schemas)
- packages/shared/lib/schemas/lot.ts (new: Zod schemas)
- packages/shared/lib/schemas/user.ts (modified: lot_id optional, JsonZod exported)

---

## QA Results

**Post-Split Update (2025-10-12 - Quinn):**

Split from original 1.2.5 to backend-only (this file) and UI (1.2.6). Impacts: Reduced UI risks (deferred frontend validation/mobile to 1.2.6); added low TECH-002 risk for API contracts (mitigated by integration tests). Risk score improved to 65/100 (total risks: 7). Test design revised: 15 scenarios (down from 20, removed UI E2E/unit); elevated P1 integration for stable outputs to 1.2.6.

**Updated Risk Profile:** docs/qa/assessments/1.2.5-admin-tenant-lot-management-technical-story-risk-20251012.md

**Updated Test Design:** docs/qa/assessments/1.2.5-admin-tenant-lot-management-technical-story-test-design-20251012.md

**Gate YAML Blocks (for inclusion in gate file):**

Risk Summary:
```yaml
risk_summary:
  totals:
    critical: 1  # score 9
    high: 1      # score 6
    medium: 1    # score 4
    low: 4       # score 2-3
  highest:
    id: SEC-001
    score: 9
    title: 'RLS Policy Misconfiguration'
  recommendations:
    must_fix:
      - 'Define explicit RLS policies in migration.'
      - 'Validate tenant scoping in all repo functions.'
    monitor:
      - 'Supabase logs for unauthorized queries.'
      - 'API call success rates for 1.2.6 integrations.'
```

Test Design:
```yaml
test_design:
  scenarios_total: 15
  by_level:
    unit: 5
    integration: 8
    e2e: 2  # Reduced; UI deferred
  by_priority:
    p0: 8
    p1: 4
    p2: 3
  coverage_gaps: []  # All backend ACs covered
```

**Trace Reference:** Updated designs reflect backend focus; cross-story E2E recommended in 1.2.6 for full flows.
