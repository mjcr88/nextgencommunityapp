# Story 1.3a: Admin User Creation UI

**Status:** Ready for Implementation

As an **administrator**,
I want to **use the Backoffice interface to create new users and assign them to lots**,
so that I can **onboard new residents efficiently with proper community structure**.

This story implements the user creation UI layer, allowing admins to create pending users and assign them to specific lots within neighborhoods. It builds on 1.2.6 (admin layout, cascading selects, form patterns) and establishes the foundation for 1.3b (email integration). All interfaces follow the Ecovilla design philosophy: warm, efficient, accessible, and grounded in nature.

---

## Acceptance Criteria

1. **User Creation Form**: `/admin/users/create/page.tsx` provides a form to create new users with cascading selects (tenant → neighborhood → lot). Form uses shadcn Form component with extended Zod validation (UserInsertSchema with lot_id FK).

2. **Cascading Lot Selection**: Admin selects tenant (shadcn Select, fetches via 1.2.5 listTenants), then neighborhood (cascading Select, fetches via 1.2.5 listByTenant), then available lot (cascading Select, fetches via 1.2.5 getAvailableByNeighborhood). Lot selection is required.

3. **User Data Capture**: Form captures email (required, unique), full_name (required), and optional metadata (interests, skills as JSON). Lot assignment automatically derives neighborhood_id from lot.neighborhood_id.

4. **Pending User Status**: User is created with status='pending' (not 'active'). Pending users appear in a separate list on the page with "Resend Email" action (prepared for 1.3b).

5. **RBAC Enforcement**: User creation is admin-only (via 1.2 getCurrentUser; redirect non-admins). RBAC guard from 1.2.6 wraps the page.

6. **Mobile-First Responsive Design**: Form is mobile-first (Tailwind responsive utilities). Touch targets minimum 44x44px. Cascading selects stack vertically on mobile. Form is scrollable on mobile.

7. **Loading States & Error Handling**: Form shows loading spinner during submission. Errors display as toast notifications (shadcn Toast) with user-friendly messages. Success shows toast "User created successfully" and form resets.

8. **Design System Alignment**: All UI uses Ecovilla design tokens (Forest Canopy, Earth Neutrals, Sky Blues, Sunrise Orange for primary CTAs). Typography uses Inter. Spacing follows 8px grid. Border radius 12px for buttons/inputs, 16px for cards. All components are accessible (WCAG AA: 4.5:1 contrast, semantic HTML, keyboard navigation).

9. **Unit Tests**: Vitest tests cover schema validation (lot_id FK, email uniqueness, required fields), action error handling (invalid lot, missing neighborhood), and user creation with derived neighborhood_id.

10. **E2E Tests**: Playwright tests cover user creation flow (select tenant → neighborhood → lot, fill form, submit, assert pending status), form validation (invalid email, missing lot), and mobile viewport testing (iPhone 12).

---

## Tasks / Subtasks

### Task 1: Extend User Schema with Lot Assignment
- [ ] Update `packages/shared/lib/schemas/user.ts`
  - [ ] Extend `UserInsertSchema` to include `lot_id` (uuid, FK to lots.id)
  - [ ] Add validation: lot_id is required for user creation via admin
  - [ ] Add validation: lot_id must exist and be available (status='available')
  - [ ] Zod schema: `lot_id: z.string().uuid('Invalid lot ID')`
  - [ ] Create `UserInsertWithLotSchema` variant for admin user creation
- [ ] Update `packages/database/src/lib/repositories/user.ts`
  - [ ] Extend `createUser` function to accept `lot_id` parameter
  - [ ] Derive `neighborhood_id` from lot: `SELECT neighborhood_id FROM lots WHERE id = lot_id`
  - [ ] Insert user with `lot_id` and derived `neighborhood_id`
  - [ ] Return user with lot and neighborhood context

### Task 2: Create User Creation Server Action
- [ ] Create `apps/web/app/actions/admin/create-user.ts`
  - [ ] `createUserAction(input: unknown)` — Server action for user creation
  - [ ] Zod validation: Parse input via `UserInsertWithLotSchema`
  - [ ] Auth check: `getCurrentUser()` must be admin (super_admin or admin)
  - [ ] Lot validation: Fetch lot via 1.2.5 repo, verify available status
  - [ ] Neighborhood validation: Verify lot's neighborhood belongs to user's tenant (RBAC)
  - [ ] Call `createUser` from 1.2.5 repo with lot_id
  - [ ] Return `ActionResult<User>` with success/error
  - [ ] Error handling: AppError for invalid lot, unauthorized tenant, duplicate email

### Task 3: User Creation Form Page
- [ ] Create `apps/web/src/app/(admin)/users/create/page.tsx`
  - [ ] **Cascading Selects**:
    - [ ] Tenant Select (shadcn Select) — fetches via 1.2.5 `listTenants`
    - [ ] Neighborhood Select (shadcn Select) — fetches via 1.2.5 `listByTenant` (filtered by selected tenant)
    - [ ] Lot Select (shadcn Select) — fetches via 1.2.5 `getAvailableByNeighborhood` (filtered by selected neighborhood)
    - [ ] All three required before form submission
  - [ ] **User Form**:
    - [ ] Fields: email (required, text input), full_name (required, text input), interests (optional, textarea), skills (optional, textarea)
    - [ ] Zod validation via `UserInsertWithLotSchema` from 1.2.5
    - [ ] Submit button: "Create User" (Sunrise Orange primary button)
    - [ ] Loading state: Spinner on button during submission
    - [ ] Success: Toast notification "User created successfully", form resets, show pending user in list below
    - [ ] Error: Toast notification with error message
  - [ ] **Pending Users List**:
    - [ ] Display pending users created in this session (or all pending users)
    - [ ] Columns: Email, Full Name, Lot, Neighborhood, Created Date, Actions (Resend Email [disabled until 1.3b], Delete)
    - [ ] shadcn DataTable with sorting/pagination
  - [ ] **Responsive**: Selects and form stack vertically on mobile, DataTable scrolls
  - [ ] **Design**: Card containers with 16px border radius, 8px spacing, Forest Canopy accents, warm microcopy ("Ready to welcome a new resident?")

### Task 4: Extend Admin Layout for User Creation
- [ ] Update `apps/web/src/app/(admin)/layout.tsx` (from 1.2.6)
  - [ ] Add navigation link to `/admin/users/create` in admin menu
  - [ ] Label: "Create User" or "Onboard Resident"

### Task 5: Unit Tests for User Creation
- [ ] Create `packages/database/src/lib/repositories/user.test.ts` (extend from 1.2)
  - [ ] **Test: Create user with lot_id**
    - [ ] Mock lot exists with status='available'
    - [ ] Assert user created with lot_id and derived neighborhood_id
    - [ ] Assert user status='pending'
  - [ ] **Test: Create user with invalid lot_id**
    - [ ] Mock lot does not exist
    - [ ] Assert AppError thrown with code 'LOT_NOT_FOUND'
  - [ ] **Test: Create user with unavailable lot**
    - [ ] Mock lot exists with status='assigned'
    - [ ] Assert AppError thrown with code 'LOT_NOT_AVAILABLE'
  - [ ] **Test: Duplicate email**
    - [ ] Mock user already exists with email
    - [ ] Assert AppError thrown with code 'EMAIL_ALREADY_EXISTS'
- [ ] Create `apps/web/app/actions/__tests__/create-user.test.ts`
  - [ ] **Test: Valid user creation**
    - [ ] Mock getCurrentUser returns admin
    - [ ] Mock createUser returns user with pending status
    - [ ] Assert action returns success with user data
  - [ ] **Test: Non-admin cannot create user**
    - [ ] Mock getCurrentUser returns resident (role='resident')
    - [ ] Assert action returns error 'Unauthorized'
  - [ ] **Test: Invalid lot for tenant**
    - [ ] Mock getCurrentUser returns admin for tenant A
    - [ ] Mock lot belongs to tenant B
    - [ ] Assert action returns error 'Unauthorized for this tenant'

### Task 6: E2E Tests
- [ ] Create `apps/web/e2e/admin-user-creation.spec.ts` — Playwright tests
  - [ ] **Test 1: Create User Flow**
    - [ ] Login as admin
    - [ ] Navigate to /admin/users/create
    - [ ] Select tenant "Ecovilla"
    - [ ] Select neighborhood "Almendro"
    - [ ] Select lot "LOT-101"
    - [ ] Fill email "sofia@example.com"
    - [ ] Fill full_name "Sofia García"
    - [ ] Submit form
    - [ ] Assert success toast "User created successfully"
    - [ ] Assert pending user appears in list below
    - [ ] Assert user status is "pending"
  - [ ] **Test 2: Form Validation**
    - [ ] Navigate to /admin/users/create
    - [ ] Submit form with empty email
    - [ ] Assert error message "Email is required"
    - [ ] Submit form with invalid email format
    - [ ] Assert error message "Invalid email format"
    - [ ] Submit form without selecting lot
    - [ ] Assert error message "Lot is required"
  - [ ] **Test 3: RBAC Denial**
    - [ ] Login as non-admin user
    - [ ] Try to navigate to /admin/users/create
    - [ ] Assert redirect to home or 403 error
  - [ ] **Test 4: Mobile Viewport**
    - [ ] Set viewport to iPhone 12 (390x844)
    - [ ] Repeat Test 1 flow
    - [ ] Assert touch targets are 44px minimum
    - [ ] Assert selects and form stack vertically
    - [ ] Assert form is scrollable

### Task 7: Documentation
- [ ] Update `docs/design_specification/admin-ui-patterns.md` (created in 1.2.6)
  - [ ] Add **User Creation Pattern** section
  - [ ] Document cascading select pattern (tenant → neighborhood → lot)
  - [ ] Document form with derived fields (neighborhood_id from lot)
  - [ ] Document pending status workflow
  - [ ] Add code examples for cascading selects
  - [ ] Add code examples for form with lot assignment

---

## Dev Notes

**Architecture & Dependencies:**
- **Frontend**: Next.js App Router, React Server Components (RSC) for data fetching
- **Forms**: react-hook-form + Zod (via extended UserInsertSchema)
- **UI Components**: shadcn/ui (Form, Select, DataTable, Dialog, Toast, Button, Input, Card, Skeleton)
- **Styling**: Tailwind CSS with Ecovilla design tokens
- **State**: TanStack Query for server state (fetch tenants, neighborhoods, lots)
- **Auth**: 1.2 getCurrentUser for RBAC
- **Actions**: 1.2.5 server actions (listTenants, listByTenant, getAvailableByNeighborhood) + new createUserAction
- **Repos**: 1.2.5 user repo (extended with lot_id support)

**Design System Alignment:**
- **Regenerative by Design**: Form celebrates completion ("User created!"), pending status is transparent, no pressure
- **Belonging Through Inclusivity**: Warm microcopy ("Ready to welcome a new resident?"), accessible (44px touch targets, 4.5:1 contrast)
- **Nature as North Star**: Forest Canopy header, Earth Neutral backgrounds, Sky Blue accents, Sunrise Orange CTAs
- **Efficiency with Warmth**: Cascading selects reduce friction, form is streamlined, contemplative microcopy
- **Mindful Transparency**: Clear error messages, no dark patterns, RBAC enforced transparently, pending status is obvious

**Testing Standards** (from architecture, 1.2 patterns):
- **Location**: packages/database/src/lib/repositories/ (unit), apps/web/app/actions/__tests__/ (action unit), apps/web/e2e/ (E2E)
- **Frameworks**: Vitest for unit, Playwright for E2E
- **Patterns**: test.describe('User Creation', () => { test('creates user with lot_id', async () => { ... }); })
- **Specific**: RBAC (non-admin 403), lot validation (available status), email uniqueness, cascading selects, mobile viewport

**Mobile-First Approach:**
- Base styles for mobile (single column, full width)
- Breakpoints: sm: 640px, md: 768px, lg: 1024px
- Touch targets: 44x44px minimum
- Selects: Stack vertically on mobile, side-by-side on desktop
- Form: Full width on mobile, constrained on desktop

**Previous Notes Relevance** (from 1.2/1.2.5/1.2.6):
- Use getCurrentUser for RBAC (role 'super_admin' or 'admin')
- Actions from 1.2.5 (listTenants, listByTenant, getAvailableByNeighborhood)
- Functional components (no classes), TypeScript for type safety
- Responsive Tailwind (mobile-first)
- Error handling: AppError, user-friendly messages via Toast
- Zod validation at boundary (server actions)
- Reuse components from 1.2.6 (DataTableWrapper, FormSection, CascadingSelect)

**Schema Extension Notes:**
- `UserInsertSchema` from 1.2 does NOT include lot_id (resident-facing)
- `UserInsertWithLotSchema` is admin-only variant with lot_id requirement
- Neighborhood_id is derived from lot, not provided by admin
- User status defaults to 'pending' (not 'active') until email confirmed in 1.3b

---

## Change Log

| Date       | Version | Description                          | Author    |
|------------|---------|--------------------------------------|-----------|
| 2025-10-27 | 1.0     | Initial story split from 1.3; focused on user creation UI without email. | Sarah (PO)|

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
