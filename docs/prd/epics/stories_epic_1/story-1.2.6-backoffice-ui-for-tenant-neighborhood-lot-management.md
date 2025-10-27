# Story 1.2.6: Backoffice UI for Tenant, Neighborhood, and Lot Management

**Status:** Ready for Implementation

As an **administrator**,
I want to **use intuitive Backoffice interfaces to create and manage tenants, neighborhoods, and lots**,
so that I can **efficiently set up community structure with mobile-first usability and role-based access**.

This story implements the frontend UI for the backend from 1.2.5, aligning with PRD FR6 (Backoffice tools) and NFR1 (mobile-first). It integrates 1.2.5 actions/repos for CRUD, focusing on UX (cascading selects, responsive forms) without backend changes. All interfaces follow the Ecovilla design philosophy: warm, efficient, accessible, and grounded in nature.

---

## Acceptance Criteria

1. **Backoffice UI Structure**: `/admin/tenants/page.tsx` provides a list of tenants (shadcn DataTable with sorting/pagination) and an inline form to create new tenants. Form uses shadcn Form component with Zod validation from 1.2.5 schemas.

2. **Neighborhoods Management**: `/admin/neighborhoods/page.tsx` allows admins to select a tenant (shadcn Select dropdown, fetches via 1.2.5 listTenants action) and list/create neighborhoods under that tenant. Neighborhoods form includes name, description, and optional metadata fields.

3. **Lots Management**: `/admin/lots/page.tsx` allows admins to select a neighborhood (cascading Select, fetches via 1.2.5 listByTenant), list available lots, and create new lots with lot_number and status. Lot creation form validates lot_number uniqueness within neighborhood.

4. **RBAC Enforcement**: All admin pages enforce role-based access control (admin-only via 1.2 getCurrentUser; redirect non-admins to home or show 403 error). RBAC guard component wraps all admin pages.

5. **Mobile-First Responsive Design**: All pages are mobile-first (Tailwind responsive utilities: sm:, md:, lg: breakpoints). Touch targets minimum 44x44px. Forms stack vertically on mobile, side-by-side on desktop. DataTable is scrollable on mobile.

6. **Loading States & Error Handling**: All async operations show loading spinners (shadcn Skeleton or custom spinner). Errors display as toast notifications (shadcn Toast) with user-friendly messages. Success actions also show toast feedback (e.g., "Tenant created successfully").

7. **Design System Alignment**: All UI uses Ecovilla design tokens (Forest Canopy, Earth Neutrals, Sky Blues, Sunrise Orange for primary CTAs). Typography uses Inter. Spacing follows 8px grid. Border radius 12px for buttons/inputs, 16px for cards. All components are accessible (WCAG AA: 4.5:1 contrast, semantic HTML, keyboard navigation).

8. **E2E Tests**: Playwright tests cover critical flows: (1) Admin login → create tenant → create neighborhood → create lot, (2) RBAC denial (non-admin redirect), (3) Form validation (invalid input shows error), (4) Mobile viewport testing (iPhone 12 resolution).

---

## Tasks / Subtasks

### Task 1: Admin Layout & RBAC Guard
- [ ] Create `apps/web/src/app/(admin)/layout.tsx` — Shared admin layout with header, navigation, RBAC guard
  - [ ] RBAC guard component: Check `getCurrentUser().role` is 'super_admin' or 'admin'; redirect non-admins to home
  - [ ] Admin header: Logo, breadcrumbs, user menu (logout)
  - [ ] Navigation: Links to /admin/tenants, /admin/neighborhoods, /admin/lots
  - [ ] Responsive: Mobile hamburger menu, desktop sidebar
  - [ ] Design: Forest Canopy header, Earth Neutral background, generous spacing (8px grid)
- [ ] Create `apps/web/src/lib/components/admin-rbac-guard.tsx` — Reusable RBAC guard component
  - [ ] Accepts children, checks auth, redirects or renders
  - [ ] Handles loading state (show spinner while checking auth)

### Task 2: Tenants Management Page
- [ ] Create `apps/web/src/app/(admin)/tenants/page.tsx`
  - [ ] **List Section**: shadcn DataTable displaying all tenants (id, name, created_at, actions)
    - [ ] Columns: Name, Created Date, Actions (Edit, Delete)
    - [ ] Sorting by name/date
    - [ ] Pagination (10 items per page)
    - [ ] Delete action shows confirmation dialog (shadcn Dialog)
  - [ ] **Create Section**: shadcn Form for creating new tenant
    - [ ] Fields: name (required, string), slug (optional, auto-generated from name)
    - [ ] Zod validation via TenantInsertSchema from 1.2.5
    - [ ] Submit button: "Create Tenant" (Sunrise Orange primary button)
    - [ ] Loading state: Spinner on button during submission
    - [ ] Success: Toast notification "Tenant created successfully", form resets, table refreshes
    - [ ] Error: Toast notification with error message
  - [ ] **Responsive**: Form stacks vertically on mobile, DataTable scrolls horizontally on mobile
  - [ ] **Design**: Card containers with 16px border radius, 8px spacing, Forest Canopy accents

### Task 3: Neighborhoods Management Page
- [ ] Create `apps/web/src/app/(admin)/neighborhoods/page.tsx`
  - [ ] **Tenant Select**: shadcn Select dropdown to filter neighborhoods by tenant
    - [ ] Fetches tenants via 1.2.5 `listTenants` action
    - [ ] Default: "Select a tenant"
    - [ ] On change: Fetch neighborhoods for selected tenant via 1.2.5 `listByTenant` action
  - [ ] **List Section**: shadcn DataTable displaying neighborhoods for selected tenant
    - [ ] Columns: Name, Description, Created Date, Actions (Edit, Delete)
    - [ ] Sorting, pagination (10 items per page)
    - [ ] Delete action shows confirmation dialog
  - [ ] **Create Section**: shadcn Form for creating new neighborhood
    - [ ] Fields: name (required), description (optional, textarea), tenant_id (hidden, from select)
    - [ ] Zod validation via NeighborhoodInsertSchema from 1.2.5
    - [ ] Submit button: "Create Neighborhood" (Sunrise Orange)
    - [ ] Loading, success, error handling (same as Task 2)
  - [ ] **Responsive**: Select and form stack on mobile, DataTable scrolls
  - [ ] **Design**: Consistent with tenants page

### Task 4: Lots Management Page
- [ ] Create `apps/web/src/app/(admin)/lots/page.tsx`
  - [ ] **Cascading Selects**: 
    - [ ] Tenant Select (shadcn Select) — fetches via 1.2.5 `listTenants`
    - [ ] Neighborhood Select (shadcn Select) — fetches via 1.2.5 `listByTenant` (filtered by selected tenant)
    - [ ] Both required before showing lots list
  - [ ] **List Section**: shadcn DataTable displaying lots for selected neighborhood
    - [ ] Columns: Lot Number, Status (available/assigned/reserved), Created Date, Actions (Edit, Delete)
    - [ ] Sorting, pagination (10 items per page)
    - [ ] Status badge: Green for available, Yellow for assigned, Gray for reserved
  - [ ] **Create Section**: shadcn Form for creating new lot
    - [ ] Fields: lot_number (required, string, uppercase), status (required, select: available/assigned/reserved), neighborhood_id (hidden)
    - [ ] Zod validation via LotInsertSchema from 1.2.5
    - [ ] Submit button: "Create Lot" (Sunrise Orange)
    - [ ] Loading, success, error handling
  - [ ] **Responsive**: Selects and form stack on mobile, DataTable scrolls
  - [ ] **Design**: Consistent with previous pages

### Task 5: Shared Admin Components
- [ ] Create `apps/web/src/components/admin/data-table-wrapper.tsx` — Reusable DataTable wrapper
  - [ ] Accepts columns, data, loading state
  - [ ] Shows skeleton loader during loading
  - [ ] Shows empty state if no data
  - [ ] Responsive: Horizontal scroll on mobile
- [ ] Create `apps/web/src/components/admin/form-section.tsx` — Reusable form container
  - [ ] Accepts title, children (form fields)
  - [ ] Consistent styling (Card, padding, spacing)
  - [ ] Responsive: Full width on mobile, constrained on desktop
- [ ] Create `apps/web/src/components/admin/cascading-select.tsx` — Reusable cascading select component
  - [ ] Accepts parent select options, child fetch function, onChange handlers
  - [ ] Disables child select until parent is selected
  - [ ] Shows loading state while fetching child options

### Task 6: E2E Tests
- [ ] Create `apps/web/e2e/admin-ui.spec.ts` — Playwright tests
  - [ ] **Test 1: Create Tenant → Neighborhood → Lot Flow**
    - [ ] Login as admin
    - [ ] Navigate to /admin/tenants
    - [ ] Create tenant "Test Community"
    - [ ] Navigate to /admin/neighborhoods
    - [ ] Select "Test Community" tenant
    - [ ] Create neighborhood "Test Neighborhood"
    - [ ] Navigate to /admin/lots
    - [ ] Select "Test Community" → "Test Neighborhood"
    - [ ] Create lot "LOT-001" with status "available"
    - [ ] Assert success toasts appear
  - [ ] **Test 2: RBAC Denial**
    - [ ] Login as non-admin user
    - [ ] Try to navigate to /admin/tenants
    - [ ] Assert redirect to home or 403 error
  - [ ] **Test 3: Form Validation**
    - [ ] Navigate to /admin/tenants
    - [ ] Submit form with empty name field
    - [ ] Assert error message appears
  - [ ] **Test 4: Mobile Viewport**
    - [ ] Set viewport to iPhone 12 (390x844)
    - [ ] Repeat Test 1 flow
    - [ ] Assert touch targets are 44px minimum
    - [ ] Assert forms stack vertically
    - [ ] Assert DataTable is scrollable

### Task 7: Documentation
- [ ] Create `docs/design_specification/admin-ui-patterns.md`
  - [ ] **Admin UI Philosophy**: Marcus-focused design (speed + warmth)
  - [ ] **Component Usage**: How shadcn components are used in admin context
  - [ ] **Patterns**: CRUD workflows, cascading selects, bulk operations (future)
  - [ ] **Accessibility**: Keyboard navigation, focus management, screen reader support
  - [ ] **Mobile Considerations**: Touch targets, responsive layouts
  - [ ] **Code Examples**: Copy-paste snippets for common patterns
  - [ ] **Design Checklist**: Regenerative, Belonging, Nature, Efficiency, Transparency

---

## Dev Notes

**Architecture & Dependencies:**
- **Frontend**: Next.js App Router, React Server Components (RSC) for data fetching
- **Forms**: react-hook-form + Zod (via 1.2.5 schemas)
- **UI Components**: shadcn/ui (Form, DataTable, Select, Dialog, Toast, Button, Input, Card, Skeleton)
- **Styling**: Tailwind CSS with Ecovilla design tokens
- **State**: TanStack Query for server state (fetch tenants, neighborhoods, lots)
- **Auth**: 1.2 getCurrentUser for RBAC
- **Actions**: 1.2.5 server actions (createTenant, createNeighborhood, createLot, listTenants, listByTenant, etc.)

**Design System Alignment:**
- **Regenerative by Design**: Forms celebrate completion ("Tenant created!"), no infinite scrolling, finite data
- **Belonging Through Inclusivity**: Warm microcopy ("Ready to onboard a new neighborhood?"), accessible (44px touch targets, 4.5:1 contrast)
- **Nature as North Star**: Forest Canopy header, Earth Neutral backgrounds, Sky Blue accents, Sunrise Orange CTAs
- **Efficiency with Warmth**: Streamlined forms, cascading selects reduce friction, contemplative microcopy
- **Mindful Transparency**: Clear error messages, no dark patterns, RBAC enforced transparently

**Testing Standards** (from architecture, 1.2 patterns):
- **Location**: apps/web/e2e/ (Playwright specs)
- **Frameworks**: Playwright for E2E flows
- **Patterns**: test.describe('Admin UI', () => { test('create tenant flow', async ({ page }) => { ... }); })
- **Specific**: RBAC (non-admin 403/redirect), cascading (neighborhood dropdown populates lots), mobile viewport (iPhone 12)

**Mobile-First Approach:**
- Base styles for mobile (single column, full width)
- Breakpoints: sm: 640px, md: 768px, lg: 1024px
- Touch targets: 44x44px minimum
- Forms: Stack vertically on mobile, side-by-side on desktop
- DataTable: Horizontal scroll on mobile, full width on desktop

**Previous Notes Relevance** (from 1.2/1.2.5):
- Use getCurrentUser for RBAC (role 'super_admin' or 'admin')
- Actions from 1.2.5 (createTenant, createNeighborhood, createLot, listTenants, listByTenant)
- Functional components (no classes), TypeScript for type safety
- Responsive Tailwind (mobile-first: sm: grid, flex-col on small)
- Error handling: AppError, user-friendly messages via Toast
- Zod validation at boundary (server actions)

---

## Change Log

| Date       | Version | Description                          | Author    |
|------------|---------|--------------------------------------|-----------|
| 2025-10-27 | 2.0     | Refined for implementation; aligned with design philosophy; removed keyboard shortcuts (keep simple). | Sarah (PO)|
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
