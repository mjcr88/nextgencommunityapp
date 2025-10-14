# Story 1.2.6: Backoffice UI for Tenant, Neighborhood, and Lot Management

**Status:** Draft

As an **administrator**,
I want to **use intuitive Backoffice interfaces to create and manage tenants, neighborhoods, and lots**,
so that I can **efficiently set up community structure with mobile-first usability and role-based access**.

This story implements the frontend UI for the backend from 1.2.5, aligning with PRD FR6 (Backoffice tools) and NFR1 (mobile-first). It integrates 1.2.5 actions/repos for CRUD, focusing on UX (cascading selects, responsive forms) without backend changes.

**Acceptance Criteria:**
1. Backoffice UI shall include /admin/tenants/page.tsx for listing tenants and sub-form to add neighborhoods (shadcn Table/Form, mobile-responsive).
2. /admin/neighborhoods/page.tsx shall allow create/list neighborhoods under selected tenant (dropdown from 1.2.5 listTenants action, shadcn Form).
3. /admin/lots/page.tsx shall filter by neighborhood (dropdown from 1.2.5 listByTenant), create/assign lots (Form with validation, integrate createLot action).
4. All pages shall enforce RBAC (admin-only via 1.2 getCurrentUser; redirect non-admins).
5. UI shall be mobile-first (Tailwind responsive, touch-optimized NFR1), with loading states and error toasts.
6. E2E tests (Playwright/Cypress) shall cover flows (create tenant>neigh>lot, RBAC denial).
7. No direct messaging; use notifications for success/errors (e.g., "Lot created").

---

## Tasks / Subtasks
- [ ] UI Tenants: Add apps/web/app/admin/tenants/page.tsx (shadcn DataTable for list, Form for create tenant via 1.2.5 action; sub-section Form for add neighborhood).
  - [ ] Integrate RBAC guard (use 1.2 getCurrentUser).
  - [ ] AC1: Responsive layout (Tailwind grid, mobile stack).
- [ ] UI Neighborhoods: Add apps/web/app/admin/neighborhoods/page.tsx (Select tenant dropdown fetch listTenants, Form create via createNeighborhood action).
  - [ ] AC2: List under tenant (fetch listByTenant), error handling (toast).
- [ ] UI Lots: Add apps/web/app/admin/lots/page.tsx (Select neighborhood dropdown fetch listByTenant, dynamic Form for create/assign lot via createLot action).
  - [ ] AC3: Filter available (getAvailableByNeighborhood), assign button (update status).
  - [ ] AC5: Mobile-first (touch targets 44px, scrollable lists).
- [ ] Shared: Add admin layout if needed (shared/header with RBAC, navigation to tenants/neigh/lots).
  - [ ] AC4: Consistent styling (shadcn theme, NFR1 responsive).
- [ ] Tests: Add e2e tests (e.g., playwright tests/admin-ui.spec.ts: login admin, create tenant/neigh/lot flow, non-admin redirect).
  - [ ] AC6: Cover RBAC (mock user role), form validation (invalid input).
- [ ] Polish: Add loading spinners (Suspense), success toasts (useSonar), accessibility (ARIA labels).

(ACs: All; post-1.2.5, pre-1.3; dependencies: 1.2.5 actions/repos)

---

## Dev Notes
Pulled from PRD (FR6 Backoffice, NFR1 mobile-first, NFR5 security RBAC), Story 1.2 (auth getCurrentUser), 1.2.5 (actions/repos for fetch/create, hierarchy Tenant>Neigh>Lot).

- **Source Tree Relevance**: 
  - New: app/admin/tenants/page.tsx, neighborhoods/page.tsx, lots/page.tsx (shadcn components: DataTable, Form, Select, Button; import from ui).
  - Extend: app/layout.tsx if shared admin layout needed (RBAC wrapper).
  - Tests: e2e/admin-ui.spec.ts (Playwright, mock actions).
- **Previous Notes Relevance (from 1.2/1.2.5)**: Use getCurrentUser for RBAC (role 'super_admin' or tenant admin), actions (createTenant etc. from 1.2.5), functional components (no classes). Responsive Tailwind (mobile-first: sm: grid, flex-col on small).
- **Technical Context**: Next.js App Router RSC for pages (server fetch lists via actions), shadcn/ui (Form with zodResolver for validation), react-hook-form for forms. RBAC: Middleware or page guard (redirect if !admin). Testing: Playwright (npx playwright test), mock Supabase/auth. No geo UI (defer FR2). SaaS: Super admin sees all tenants, tenant admins own.

**Testing Standards** (from architecture, 1.2 patterns):
- Location: e2e/ (Playwright specs).
- Frameworks: Playwright (e2e flows), Vitest for component unit if needed.
- Patterns: test.describe('Admin UI', () => { test('create tenant', async ({ page }) => { await loginAdmin(page); await fillForm(page); expect(successToast).toBeVisible(); }); }).
- Specific: RBAC (non-admin 403/redirect), cascading (neigh dropdown populates lots), mobile viewport (test on iPhone).

---

## Change Log
| Date       | Version | Description                          | Author    |
|------------|---------|--------------------------------------|-----------|
| 2025-10-12 | 1.0     | Initial UI story split from 1.2.5.   | Sarah (PO)|

---

## Dev Agent Record
*(To be populated during implementation)*

**Agent Model Used:** TBD

**Debug Log References:** .ai/debug-log.md

**Completion Notes List:** 
- TBD

**File List:** 
- TBD

---

## QA Results
*(To be populated post-implementation)*
