# Flow 0: Admin Creates User Account

**Actor**: Administrator  
**Entry Point**: Backoffice → User Management → Create User  
**Goal**: Create new resident account and send activation email  
**Success Criteria**: User account created, invitation email sent, lot assigned

## Flow Steps

### 1. Admin accesses user creation
- From Backoffice Dashboard → "User Management" card
- Or from User Management table → "+ Create User" button
- Navigation: Admin backoffice (no bottom nav visible)

### 2. Assign Lot Screen
**Purpose**: Select which lot the new resident will occupy

**Screen Elements**:
- Top bar: Back arrow (left) | "Create User" title (center) | Settings icon (right)
- Search bar: "Search communities..." (if multi-community setup)
- Community dropdown: Shows current community or allows selection
- Lot grid/list view toggle

**Lot Card Structure**:
- Photo (160px height, rounded corners)
- Lot number badge (overlay top-left)
- Address/name (16px semibold)
- Status badge (Available/Reserved/Occupied)
- Occupant info (if occupied)
- Tap to select

**Floating Action Button**:
- Position: Bottom-right
- Icon: Plus (+)
- Color: Forest Canopy (#4A7C2C)
- Label: "Create New Resident"
- Shadow: 0 4px 12px rgba(0,0,0,0.3)

**States**:
- Empty state: "No lots available. Create lots first."
- Loading: Skeleton cards
- Error: "Could not load lots. Tap to retry."

### 3. Lot Conflict Resolution (if lot already assigned)
**Trigger**: Admin selects occupied lot

**Modal Content**:
- Heading: "This lot is already assigned" (20px semibold)
- Current occupant card:
  - Avatar (64px)
  - Name (18px semibold)
  - Email (14px regular, gray)
  - "Current resident" label
- Candidate resident card:
  - Same structure
  - "New resident" label
- Warning icon: ⚠️ between cards

**Action Options** (radio buttons):
1. **Assign anyway** - "Override current assignment"
2. **Link as household member** - "Add to existing household"
3. **Choose different lot** - "Go back and select another"
4. **Message owner** - "Contact current resident first"

**Buttons**:
- "Cancel" (secondary)
- "Continue" (primary, enabled only when option selected)

### 4. Create New Resident Form

**Form Fields**:

1. **Profile Photo** (optional)
   - Circular upload area (120px)
   - "+" icon overlay
   - Helper text: "Optional - resident can add later"
   - Tap: Opens camera/gallery picker
   - Preview uploaded image

2. **Full Name** (required)
   - Text input
   - Placeholder: "e.g., Sofia Morales"
   - Validation: 2-50 characters
   - Error: "Name is required"

3. **Email Address** (required)
   - Email input
   - Placeholder: "resident@example.com"
   - Validation: Valid email format
   - Error: "Please enter a valid email"
   - Duplicate check on blur

4. **Phone Number** (optional)
   - Phone input with country code
   - Placeholder: "+506 1234-5678"
   - Auto-format based on locale

5. **Role** (dropdown)
   - Options: Resident (default), Coordinator, Admin
   - Helper: "Coordinators can moderate content"

**Bottom Actions**:
- "Cancel" (secondary, full width)
- "Create Resident" (primary, full width)
- Buttons stack vertically on mobile
- 16px gap between buttons

### 5. Validation & Error States

**Email Already Registered**:
- Shows error banner at top
- Icon: ⚠️
- Message: "This email is already registered"
- Action: "Try Again" button
- Email field highlighted in red

**Invalid Community**:
- Inline error below dropdown
- Text: "Please select a valid community"
- Dropdown border: red

**Network Error**:
- Toast notification
- "Could not create user. Check connection and try again."
- Auto-dismisses after 5s

### 6. Link Lot to Resident

**Screen Layout**:
- Top bar: Back | "Assign Lot" | Settings
- Lot preview card:
  - Photo (full width, 200px height)
  - Lot number overlay
  - Address/name (20px semibold)
  - Status: Available/Reserved/Occupied
- Resident preview card:
  - Avatar (80px circular)
  - Name (18px semibold)
  - Email (14px regular)
  - Role badge

**Assignment Options**:
- **Admin note** (textarea)
  - Placeholder: "Internal notes about this assignment..."
  - 500 character limit
  - Only visible to admins

- **Reserve until** (toggle + date picker)
  - Default: OFF (permanent assignment)
  - ON: Shows date picker
  - Helper: "Lot returns to available after this date"

**Confirmation Text**:
"This will assign [Lot #] to [Resident Name] and send them an invitation email to activate their account."

**Actions**:
- "Cancel" (secondary)
- "Assign Lot" (primary)

### 7. Success Confirmation Modal

**Modal Design**:
- Center overlay
- White background
- Border radius: 16px
- Padding: 32px
- Max width: 400px
- Shadow: 0 8px 24px rgba(0,0,0,0.15)

**Content**:
- Icon: ✓ in circle (64px, green)
- Heading: "User Created Successfully!" (22px bold)
- Confirmation text: "An invitation email has been sent to [email@example.com]"
- Timestamp: "Sent 2 minutes ago"

**Actions**:
- "View All Users" (primary, green, full width)
- "Create Another User" (secondary, light green, full width)
- X close button (top-right corner)

**Auto-dismiss**: After 10 seconds if no interaction

## Edge Cases & Error Handling

**Duplicate Email During Creation**:
- Real-time check on blur
- Shows error immediately: "Email already exists"
- Offers: "View existing user" button

**Lot Becomes Occupied During Process**:
- Shows warning when trying to assign
- "This lot was just assigned to another user"
- Options: Choose different lot | Assign anyway

**Email Send Failure**:
- User created successfully but email fails
- Shows partial success state
- "User created, but invitation email failed to send"
- Action: "Resend Invitation" button

**Network Timeout**:
- Shows loading spinner for max 30 seconds
- After timeout: "This is taking longer than expected"
- Options: "Keep waiting" | "Cancel"

## Success Criteria

- ✅ User account created in database
- ✅ Lot assigned to user
- ✅ Invitation email sent successfully
- ✅ Admin can view new user in user list
- ✅ User appears with "Pending" status (until activation)

---
