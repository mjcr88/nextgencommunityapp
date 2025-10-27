# Story 1.3b: Email Integration & Pending User Workflow

**Status:** Ready for Implementation

As an **administrator**,
I want to **send activation emails to pending users and manage their onboarding status**,
so that I can **complete the user creation workflow and enable residents to activate their accounts**.

This story implements email integration for pending users created in 1.3a, enabling admins to send activation emails and track user onboarding status. It integrates Resend for email delivery and establishes the pending user workflow that bridges to 1.4 (account activation). All interfaces follow the Ecovilla design philosophy: warm, efficient, accessible, and grounded in nature.

---

## Acceptance Criteria

1. **Email Service Integration**: Resend API is configured with RESEND_API_KEY environment variable. Email templates are created for activation emails with personalized content (resident name, community name, activation link).

2. **Send Activation Email Action**: `sendActivationEmailAction(userId: string)` server action sends activation email to pending user. Email includes unique activation token (JWT or similar), activation link to 1.4 flow, and community context (neighborhood, community name).

3. **Pending User Management**: `/admin/users/pending/page.tsx` displays all pending users (status='pending') with columns: Email, Full Name, Lot, Neighborhood, Created Date, Actions (Send Email, Resend Email, Delete). "Send Email" button triggers email dispatch and updates user status to 'email_sent'.

4. **Email Retry Logic**: If email fails, error is logged and user can retry via "Resend Email" button. Failed attempts are tracked (attempt_count, last_error). Max 3 retry attempts before manual intervention required.

5. **Email Status Tracking**: User table includes email_sent_at (timestamp) and email_status (pending/sent/failed/bounced). Pending users list shows email status with visual indicators (pending=gray, sent=green, failed=red).

6. **RBAC Enforcement**: Pending user management is admin-only (via 1.2 getCurrentUser; redirect non-admins). RBAC guard from 1.2.6 wraps the page.

7. **Mobile-First Responsive Design**: Pending users list is mobile-first (Tailwind responsive utilities). Touch targets minimum 44x44px. DataTable is scrollable on mobile. Action buttons are accessible on mobile.

8. **Loading States & Error Handling**: Email send shows loading spinner. Errors display as toast notifications (shadcn Toast) with user-friendly messages. Success shows toast "Activation email sent to [email]". Failed emails show retry option.

9. **Design System Alignment**: All UI uses Ecovilla design tokens (Forest Canopy, Earth Neutrals, Sky Blues, Sunrise Orange for primary CTAs). Typography uses Inter. Spacing follows 8px grid. Border radius 12px for buttons/inputs, 16px for cards. All components are accessible (WCAG AA: 4.5:1 contrast, semantic HTML, keyboard navigation).

10. **Integration Tests**: Vitest tests cover email sending (Resend API mock), token generation, retry logic, and status updates. Tests verify email content includes activation link and community context.

11. **E2E Tests**: Playwright tests cover pending user list display, send email flow (click button, assert email sent, status updated), retry logic (failed email, resend), and mobile viewport testing (iPhone 12).

---

## Tasks / Subtasks

### Task 1: Extend User Schema for Email Tracking
- [ ] Update `packages/database/schema/001_create_tenants_users_tables.sql`
  - [ ] Add columns to users table:
    - [ ] `email_sent_at` (timestamp, nullable) — when activation email was sent
    - [ ] `email_status` (enum: pending/sent/failed/bounced, default 'pending') — email delivery status
    - [ ] `email_attempt_count` (integer, default 0) — number of send attempts
    - [ ] `last_email_error` (text, nullable) — error message from last failed attempt
- [ ] Update `packages/database/src/types/supabase.ts` — regenerate types with new columns
- [ ] Update `packages/shared/lib/schemas/user.ts`
  - [ ] Extend `UserSchema` to include email_sent_at, email_status, email_attempt_count, last_email_error
  - [ ] Create `UserEmailStatusSchema` for email status updates

### Task 2: Create Activation Token Generation
- [ ] Create `packages/shared/lib/utils/activation-token.ts`
  - [ ] `generateActivationToken(userId: string, email: string)` — generates JWT token
  - [ ] Token includes: userId, email, exp (24 hours), iat
  - [ ] Token is signed with JWT_SECRET environment variable
  - [ ] `verifyActivationToken(token: string)` — verifies and decodes token
  - [ ] Returns decoded payload or throws error if invalid/expired

### Task 3: Create Email Template
- [ ] Create `apps/web/src/lib/email/activation-email.tsx` — React email template
  - [ ] Template accepts: userName, communityName, neighborhoodName, activationLink
  - [ ] Content: Warm welcome message, community context, activation CTA button, activation link
  - [ ] Design: Uses Ecovilla colors (Forest Canopy, Sunrise Orange), professional layout
  - [ ] Fallback: Plain text version for email clients without HTML support
  - [ ] Example: "Welcome Sofia to Ecovilla! Your lot in Almendro is ready. Activate your account to get started."

### Task 4: Create Send Activation Email Action
- [ ] Create `apps/web/app/actions/admin/send-activation-email.ts`
  - [ ] `sendActivationEmailAction(userId: string)` — Server action to send activation email
  - [ ] Auth check: `getCurrentUser()` must be admin
  - [ ] Fetch user via 1.2.5 repo (verify status='pending')
  - [ ] Generate activation token via activation-token utility
  - [ ] Build activation link: `${NEXT_PUBLIC_APP_URL}/auth/activate?token=${token}`
  - [ ] Fetch user's neighborhood and community context
  - [ ] Render email template with context
  - [ ] Send email via Resend API:
    - [ ] `resend.emails.send({ from: 'noreply@ecovilla.com', to: user.email, subject: 'Activate Your Ecovilla Account', html: renderedTemplate })`
  - [ ] On success: Update user email_sent_at, email_status='sent', email_attempt_count++
  - [ ] On failure: Update user email_status='failed', last_email_error, email_attempt_count++
  - [ ] Return `ActionResult<{ success: boolean, message: string, error?: string }>`
  - [ ] Error handling: AppError for invalid user, max retries exceeded, Resend API errors

### Task 5: Create Pending Users Management Page
- [ ] Create `apps/web/src/app/(admin)/users/pending/page.tsx`
  - [ ] **Pending Users List**: shadcn DataTable displaying all pending users (status='pending')
    - [ ] Columns: Email, Full Name, Lot, Neighborhood, Created Date, Email Status, Actions
    - [ ] Email Status badge: Gray (pending), Green (sent), Red (failed)
    - [ ] Sorting by created_at (newest first), email_status
    - [ ] Pagination (10 items per page)
  - [ ] **Actions Column**:
    - [ ] "Send Email" button (enabled if email_status='pending' or email_attempt_count < 3)
    - [ ] "Resend Email" button (enabled if email_status='failed' and email_attempt_count < 3)
    - [ ] "Delete" button (shows confirmation dialog)
    - [ ] Buttons disabled if email_attempt_count >= 3 (show tooltip "Max retries exceeded")
  - [ ] **Send Email Flow**:
    - [ ] Click "Send Email" button
    - [ ] Show loading spinner on button
    - [ ] Call `sendActivationEmailAction(userId)`
    - [ ] On success: Toast "Activation email sent to [email]", refresh table, status updates to "sent"
    - [ ] On failure: Toast "Failed to send email: [error]", status updates to "failed", show retry button
  - [ ] **Responsive**: DataTable scrolls horizontally on mobile, action buttons stack on mobile
  - [ ] **Design**: Card containers with 16px border radius, 8px spacing, Forest Canopy accents, warm microcopy ("Activation emails sent, residents can now activate their accounts")

### Task 6: Extend Admin Layout for Pending Users
- [ ] Update `apps/web/src/app/(admin)/layout.tsx` (from 1.2.6)
  - [ ] Add navigation link to `/admin/users/pending` in admin menu
  - [ ] Label: "Pending Users" or "Onboarding Status"
  - [ ] Show badge with count of pending users (email_status='pending')

### Task 7: Update User Repository for Email Status
- [ ] Update `packages/database/src/lib/repositories/user.ts`
  - [ ] Add `updateUserEmailStatus(userId: string, emailStatus: string, emailSentAt?: Date, lastError?: string)` function
  - [ ] Updates email_sent_at, email_status, email_attempt_count, last_email_error
  - [ ] Add `getPendingUsers()` function — fetches all users with status='pending'
  - [ ] Add `getPendingUsersByTenant(tenantId: string)` function — fetches pending users for tenant

### Task 8: Integration Tests for Email
- [ ] Create `apps/web/app/actions/__tests__/send-activation-email.test.ts`
  - [ ] **Test: Send activation email successfully**
    - [ ] Mock getCurrentUser returns admin
    - [ ] Mock user exists with status='pending'
    - [ ] Mock Resend API sends email successfully
    - [ ] Assert action returns success
    - [ ] Assert user email_status updated to 'sent'
    - [ ] Assert email_sent_at is set
  - [ ] **Test: Send email to non-pending user**
    - [ ] Mock user exists with status='active'
    - [ ] Assert action returns error 'User is not pending'
  - [ ] **Test: Resend API failure**
    - [ ] Mock Resend API throws error
    - [ ] Assert action returns error with Resend error message
    - [ ] Assert user email_status updated to 'failed'
    - [ ] Assert last_email_error is set
  - [ ] **Test: Max retries exceeded**
    - [ ] Mock user with email_attempt_count=3
    - [ ] Assert action returns error 'Max retries exceeded'
  - [ ] **Test: Email content includes activation link**
    - [ ] Mock Resend API
    - [ ] Call sendActivationEmailAction
    - [ ] Assert email HTML includes activation link with token
    - [ ] Assert email includes community context (neighborhood, community name)

### Task 9: E2E Tests
- [ ] Create `apps/web/e2e/admin-pending-users.spec.ts` — Playwright tests
  - [ ] **Test 1: Send Activation Email Flow**
    - [ ] Login as admin
    - [ ] Navigate to /admin/users/pending
    - [ ] Assert pending user from 1.3a appears in list
    - [ ] Click "Send Email" button for user
    - [ ] Assert loading spinner appears
    - [ ] Assert success toast "Activation email sent to [email]"
    - [ ] Assert user email_status updates to "sent" (green badge)
    - [ ] Assert "Send Email" button is now disabled
  - [ ] **Test 2: Resend Email After Failure**
    - [ ] Mock email send failure
    - [ ] Click "Send Email" button
    - [ ] Assert error toast "Failed to send email"
    - [ ] Assert user email_status updates to "failed" (red badge)
    - [ ] Assert "Resend Email" button appears
    - [ ] Click "Resend Email" button
    - [ ] Assert success toast "Activation email sent"
    - [ ] Assert status updates to "sent"
  - [ ] **Test 3: Max Retries Exceeded**
    - [ ] Create user with email_attempt_count=3
    - [ ] Navigate to /admin/users/pending
    - [ ] Assert "Send Email" and "Resend Email" buttons are disabled
    - [ ] Assert tooltip "Max retries exceeded"
  - [ ] **Test 4: Delete Pending User**
    - [ ] Navigate to /admin/users/pending
    - [ ] Click "Delete" button for user
    - [ ] Assert confirmation dialog appears
    - [ ] Click "Confirm Delete"
    - [ ] Assert success toast "User deleted"
    - [ ] Assert user removed from list
  - [ ] **Test 5: Mobile Viewport**
    - [ ] Set viewport to iPhone 12 (390x844)
    - [ ] Navigate to /admin/users/pending
    - [ ] Assert DataTable is scrollable
    - [ ] Assert action buttons are accessible (44px minimum)
    - [ ] Repeat Test 1 flow on mobile

### Task 10: Documentation
- [ ] Update `docs/design_specification/admin-ui-patterns.md` (created in 1.2.6)
  - [ ] Add **Email Integration Pattern** section
  - [ ] Document activation token generation and verification
  - [ ] Document email template structure
  - [ ] Document pending user workflow (pending → sent → activated)
  - [ ] Document retry logic and error handling
  - [ ] Add code examples for email sending
  - [ ] Add code examples for email status tracking

---

## Dev Notes

**Architecture & Dependencies:**
- **Frontend**: Next.js App Router, React Server Components (RSC) for data fetching
- **Email**: Resend API (npm install resend), React Email for templates
- **Auth**: JWT for activation tokens (jsonwebtoken or jose)
- **UI Components**: shadcn/ui (DataTable, Dialog, Toast, Button, Badge, Card, Skeleton)
- **Styling**: Tailwind CSS with Ecovilla design tokens
- **State**: TanStack Query for server state (fetch pending users)
- **Auth**: 1.2 getCurrentUser for RBAC
- **Actions**: New sendActivationEmailAction + 1.2.5 user repo (extended)
- **Repos**: 1.2.5 user repo (extended with email status functions)

**Environment Variables:**
- `RESEND_API_KEY` — Resend API key for email sending
- `JWT_SECRET` — Secret for signing activation tokens
- `NEXT_PUBLIC_APP_URL` — Public app URL for activation links (e.g., https://ecovilla.com)

**Design System Alignment:**
- **Regenerative by Design**: Email workflow celebrates completion ("Email sent!"), pending status is transparent, no pressure
- **Belonging Through Inclusivity**: Warm email template, accessible UI (44px touch targets, 4.5:1 contrast)
- **Nature as North Star**: Forest Canopy header, Earth Neutral backgrounds, Sky Blue accents, Sunrise Orange CTAs
- **Efficiency with Warmth**: Streamlined email sending, retry logic is transparent, contemplative microcopy
- **Mindful Transparency**: Clear email status indicators, error messages are helpful, no dark patterns

**Testing Standards** (from architecture, 1.2 patterns):
- **Location**: apps/web/app/actions/__tests__/ (action unit), apps/web/e2e/ (E2E)
- **Frameworks**: Vitest for unit (mock Resend), Playwright for E2E
- **Patterns**: test.describe('Email Integration', () => { test('sends activation email', async () => { ... }); })
- **Specific**: RBAC (non-admin 403), email delivery (Resend mock), retry logic (max 3 attempts), token generation/verification

**Mobile-First Approach:**
- Base styles for mobile (single column, full width)
- Breakpoints: sm: 640px, md: 768px, lg: 1024px
- Touch targets: 44x44px minimum
- DataTable: Horizontal scroll on mobile, full width on desktop
- Action buttons: Stack vertically on mobile, inline on desktop

**Previous Notes Relevance** (from 1.2/1.2.5/1.2.6/1.3a):
- Use getCurrentUser for RBAC (role 'super_admin' or 'admin')
- Functional components (no classes), TypeScript for type safety
- Responsive Tailwind (mobile-first)
- Error handling: AppError, user-friendly messages via Toast
- Zod validation at boundary (server actions)
- Reuse components from 1.2.6 (DataTableWrapper, FormSection)

**Email Template Notes:**
- Template is React component (react-email), rendered to HTML string
- Includes activation link with JWT token
- Includes community context (neighborhood, community name)
- Warm, welcoming tone aligned with Ecovilla values
- Fallback plain text version for email clients

**Pending User Workflow:**
- 1.3a: User created with status='pending', email_status='pending'
- 1.3b: Admin sends activation email, email_status='sent', email_sent_at set
- 1.4: User clicks activation link, verifies token, activates account (status='active')
- Retry: If email fails, admin can resend (max 3 attempts)

---

## Change Log

| Date       | Version | Description                          | Author    |
|------------|---------|--------------------------------------|-----------|
| 2025-10-27 | 1.0     | Initial story split from 1.3; focused on email integration and pending workflow. | Sarah (PO)|

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
