# Story 1.3: Admin User Creation (Flow 0)

**Status:** Draft

As an **administrator**,
I want to **use the Backoffice interface to create new users and assign lots**,
so that I can **onboard new residents and send them activation emails**.

**Acceptance Criteria:**
1.  The Admin Backoffice shall provide a "Create User" interface (Flow 0).
2.  Admin can select a neighborhood and assign an available lot from it (cascading dropdown).
3.  The system shall send a unique activation email to the new resident.
4.  The new user shall appear with a "Pending" status in the User Management list (deriving neighborhood from assigned lot).

---

## Tasks / Subtasks
- [ ] UI: Add apps/web/app/admin/users/create/page.tsx (shadcn Form: email/full_name, integrate Select from 1.2.6 neighborhoods page for neighborhood, dynamic Select lots from 1.2.6 lots page actions; use shared Backoffice layout from 1.2.6; mobile-first NFR1).
  - [ ] RBAC: Admin-only (1.2 getCurrentUser.role 'super_admin' or tenant admin, via 1.2.6 guard).
  - [ ] AC1: Cascading submission triggers create-user action.
- [ ] Schema: Extend packages/shared/lib/schemas/user.ts InsertUserSchema with lot_id uuid (FK to lots.id from 1.2.5; derive neighborhood_id from lot.neighborhood_id in repo/action).
  - [ ] Zod: Validate lot available/under tenant's neighborhoods.
- [ ] Action: Add apps/web/app/actions/admin/create-user.ts (Zod input incl. neighborhood_id/lot_id, auth check, query 1.2.5 to validate hierarchy, call createPendingUser with lot_id, set status='pending', send email).
  - [ ] AC2/AC3: Assign lot (1.2.5 assignLotToUser, update status='assigned'), email token to 1.4 (Resend env).
- [ ] Repo: Extend user.ts with createPendingUser (insert user with lot_id, derive neighborhood_id = (select neighborhood_id from lots where id=lot_id), pending status).
  - [ ] AC4: Query users with status='pending' for list (join lots/neighborhoods for display).
- [ ] Email: sendActivationEmail (template/link to 1.4, RESEND_API_KEY; include neighborhood context?).
  - [ ] Errors: AppError/retry.
- [ ] Tests: Extend integration.test.ts (mock hierarchy: tenant>neigh>lot, assert derive neighborhood_id, pending/assigned status).
  - [ ] Unit: Action (invalid neigh/lot error), repo (FK insert/derive).
- [ ] Seed: Test with 1.2.5 sample (create user assign lot_101 in "Almendro").

(ACs: All; post-1.2.5, pre-1.4; hierarchy: Derive user.neighborhood_id from lot)

---

## Dev Notes
Pulled from PRD (FR6 Backoffice user mgmt, TA2 multi-tenancy, NFR5 security), Story 1.2 build notes (users table/RLS/repo/actions/Zod/tests), and 1.2.5 (lots table/repo, tenant CRUD).

- **Source Tree Relevance**: 
  - Extend: shared/lib/schemas/user.ts (lot_id uuid FK, optional neighborhood_id derived), database/src/lib/repositories/user.ts (createPendingUser: insert + derive neigh from lot), app/actions/admin/create-user.ts (Zod for neigh/lot, validate via 1.2.5 repos).
  - UI: app/admin/users/create/page.tsx (shadcn Form/Select from 1.2.6 UI patterns: neighborhood fetch via 1.2.6 tenants/neighborhoods actions, lot dynamic via 1.2.6 lots; shared Backoffice layout/RBAC from 1.2.6).
  - Tests: database/test/integration/user.integration.test.ts (extend: mock 1.2.5/1.2.6 hierarchy, assert derive neigh_id, pending query join).
- **Previous Notes Relevance (from 1.2/1.2.5)**: RLS (filter tenant_id via lot.neigh.tenant_id), Zod (validate lot under selected neigh), AppError (mismatch error), defaults (status='pending', role='resident', derive neigh_id). Auth: getCurrentUser tenant admin. Functional TS. Cascade: 1.2.5 getAvailableLotsByNeighborhood.
- **Technical Context**: Supabase (join query for derive: users join lots join neighborhoods), Next.js RSC (useForm with onChange for dynamic lot options), Resend email (include neigh context in template?). SaaS: Tenant admins see own neigh/lots. Index: users.lot_id + neigh_id (NFR2). Defer geo (FR2).

**Testing Standards** (from architecture/coding-standards.md, 1.2 patterns):
- Location: packages/database/test/ (unit/integration).
- Frameworks: Vitest (unit), Supabase mocks (integration); P0 security (admin-only, RLS no cross-tenant), data (Zod lot validation), flows (create/email/send).
- Patterns: describe/it, mock.supabase.auth.getUser() for admin, .from('users').insert().returns({data: user}), expect(emailSent).toBe(true).
- Specific: Test pending status query, lot assignment (update lots.status), email failure (retry/log), non-admin 403.

---

## QA Results

**Test Design Summary (2025-10-12 - Quinn):**

Comprehensive test scenarios designed for full AC coverage: 12 scenarios (4 unit, 5 integration, 3 E2E). P0 focus on security/data (e.g., auth guards, lot uniqueness, email integration). Aligned with risk profile (mitigates SEC-001, DATA-001, TECH-001). No gaps; recommended execution order prioritizes critical paths.

**Test Design Document:** docs/qa/assessments/1.3-test-design-20251012.md

**Gate YAML Block (for inclusion in gate file):**

```yaml
test_design:
  scenarios_total: 12
  by_level:
    unit: 4
    integration: 5
    e2e: 3
  by_priority:
    p0: 5
    p1: 4
    p2: 3
  coverage_gaps: []  # All ACs covered
```

**Trace Reference:** Test design matrix: docs/qa/assessments/1.3-test-design-20251012.md  
P0 tests identified: 5

---

## Change Log
| Date       | Version | Description                          | Author    |
|------------|---------|--------------------------------------|-----------|
| 2025-10-12 | 1.1     | Added Tasks/Dev Notes post-1.2.5; fixed gaps. | Sarah (PO)|

---

## Dev Agent Record
*(To be populated during implementation)*

**Agent Model Used:** TBD

**Debug Log References:** .ai/debug-log.md

**Completion Notes List:** 
- TBD

**File List:** 
- TBD
