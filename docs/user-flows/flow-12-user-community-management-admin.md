# Flow 12: User & Community Management (Admin)

**Actor**: Super Admin or Community Manager  
**Entry Point**: Admin Backoffice → User Management  
**Goal**: Manage users, permissions, communities, and platform settings  
**Success Criteria**: User/community changes applied, system updated

## Flow Steps

### Screen 1: User Directory

**Entry Point**: Backoffice → "User Management"

**Top Bar**:
- "Back" arrow (left)
- "User Management" title (center)
- Badge: Total user count
- Filter icon (right, first)
- Import button: "Import Users" (right, second)
- Create button: "+ Create User" (right, third)

**Stats Cards** (horizontal scroll):

1. **Total Users**:
   - Number: "247"
   - Label: "Total Users"
   - Icon: 👥
   - Trend: "+12 this month"

2. **Active**:
   - Number: "232"
   - Label: "Active Users"
   - Icon: ✅

3. **Pending**:
   - Number: "8"
   - Label: "Pending Activation"
   - Icon: ⏳
   - Badge: "Action needed"

4. **Admins**:
   - Number: "15"
   - Label: "Administrators"
   - Icon: 👑

**Search & Filter Bar**:
- Search input: "Search by name, email, lot..."
- Real-time search (debounced)
- Clear button (X)
- Filter dropdown: Quick filters
  - All users
  - Active only
  - Pending only
  - Admins only
  - By community (multi-community)

**Bulk Actions Bar** (appears when rows selected):
- Background: Forest Canopy at 10%
- Text: "X users selected"
- Actions:
  - "Send Notification" (primary)
  - "Export Selected" (secondary)
  - "Deactivate Selected" (warning)
  - "Delete Selected" (red)
- "Deselect All" link (right)

**Table View**:

**Columns**:
1. **Checkbox** (select all header)
2. **Avatar & Name** (sortable)
   - Avatar: 40px circle
   - Name: 15px medium
   - Email: 13px gray (below)
   - Verified badge if email confirmed
3. **Lot/Location** (sortable)
   - Lot number or "No lot assigned"
   - Community name (multi-community)
4. **Role** (sortable)
   - Badge: Resident/Coordinator/Admin/Super Admin
   - Color-coded
5. **Status** (sortable)
   - Active (green)
   - Pending (orange)
   - Inactive (gray)
6. **Last Active** (sortable, default sort)
   - "2 hours ago" or "Never"
   - Tooltip: Full timestamp
7. **Created** (sortable)
   - "Oct 3, 2025" format
8. **Actions** (dropdown)
   - Three dots menu

**Row States**:
- Default: White background
- Hover: Cloud background
- Selected: Sunrise at 5%
- Inactive user: 70% opacity
- Pending user: Cloud background, yellow left border (4px)

**Actions Dropdown**:
- View Profile
- Edit User
- Send Notification
- Manage Permissions
- View Activity
- Impersonate (Super Admin only)
- Deactivate User
- Delete User

**Pagination**:
- Bottom bar
- "Showing 1-50 of 247 users"
- Users per page: Dropdown (25/50/100/200)
- Navigation: First/Prev/1/2/3.../Next/Last
- Active page: Forest Canopy background

**Empty States**:
- No users: "No users yet. Create your first user."
- Search no results: "No users found for '[query]'"
- Filtered no results: "No users match these filters"

### Screen 2: User Detail Panel

**Trigger**: Click user row or "View Profile"

**Panel Design**:
- Slides from right (desktop)
- Full screen (mobile)
- Width: 640px
- White background
- Shadow: -4px 0 16px rgba(0,0,0,0.15)

**Top Bar**:
- "User Details" title (left)
- "Edit" button (top-right)
- X close button (far right)

**Tab Navigation**:
- Profile Info
- Activity History
- Permissions & Roles
- Family Accounts

**Content (scrollable)**:

### Tab 1: Profile Info

**Header Section**:
- Cover photo (optional)
- Avatar (120px circular, center)
- Name (24px bold)
- Email (15px regular)
- Status badge (Active/Pending/Inactive)
- Last active: Timestamp

**Quick Actions** (buttons):
- "Send Notification"
- "View on Map"
- "Impersonate" (Super Admin only)

**Basic Information**:
- Full Name: Editable
- Email: Read-only (with "Change" link)
- Phone: Editable
- Preferred Language: Dropdown
- Journey Stage: Badge (Newcomer/Settled/Coordinator)

**Community Assignment**:
- Primary Community: Dropdown
- Lot: Dropdown or "Not assigned"
- Move In Date: Date picker
- Admin Notes: Textarea (internal only)

**Interests & Skills**:
- Interests: Chips (read-only, link to edit)
- Skills: Chips (read-only)
- "Manage Interests" button

**Privacy Settings**:
- Map Visibility: Toggle
- Profile Visibility: Dropdown
- Contact Sharing: Checkboxes

**Account Status**:
- Created: Timestamp + creator
- Activated: Timestamp or "Pending"
- Email Verified: Yes/No + badge
- Last Login: Timestamp
- Total Logins: Count

**Admin Actions** (bottom):
- "Save Changes" (primary)
- "Deactivate Account" (warning)
- "Delete User" (red, text link)

### Tab 2: Activity History

**Timeline View**:
- Chronological list
- Filter: All / Events / Check-ins / Exchange / Calendar

**Activity Items**:

**Each Item**:
- Icon (activity type)
- Action: "Created event 'Community Potluck'"
- Timestamp: "Oct 3 at 2:30 PM"
- Details link: "View details"
- Location (if applicable)

**Activity Types**:
- 📅 Events created/RSVP'd
- 📍 Check-ins
- 📦 Exchange listings/requests
- ✏️ Profile edits
- 💬 Messages sent (future)
- 🔧 Admin actions (if admin)

**Pagination**:
- "Load More" button
- Shows 20 items initially
- Max 100 total

**Export**:
- "Export Activity" button
- Downloads CSV
- Date range selector

### Tab 3: Permissions & Roles

**Role Assignment**:
- Current Role: Badge (large)
- Change Role: Dropdown
  - Resident (default)
  - Coordinator (can moderate)
  - Admin (full access)
  - Super Admin (platform-wide)
- Change requires confirmation
- Audit trail of role changes

**Permissions Matrix**:
- Table format
- Rows: Permission types
- Columns: Current / Allowed

**Permissions**:
- Create Events: Yes/No
- Moderate Events: Yes/No
- Create Exchange Listings: Yes/No
- Moderate Exchange: Yes/No
- Manage Users: Yes/No
- View Admin Dashboard: Yes/No
- Access Reports: Yes/No
- Manage Communities: Yes/No (Super Admin only)

**Custom Permissions** (advanced):
- Checkboxes for granular control
- Override defaults
- Expiration date (optional)

**Permission History**:
- Timeline of changes
- Who made change
- When
- Reason (if provided)

**Actions**:
- "Save Permission Changes"
- "Reset to Role Defaults"
- Confirmation required for role changes

### Tab 4: Family Accounts

**Purpose**: Link household members to primary account

**Primary Account Holder**:
- Shows if this is primary or linked
- Badge: "Primary Account"

**Linked Family Members**:
- List of connected users
- Each member:
  - Avatar + name
  - Relationship: Dropdown (Spouse/Partner/Child/Parent/Sibling/Other)
  - Age (if child): Number
  - "View Profile" link
  - "Unlink" button

**Add Family Member**:
- "+ Add Family Member" button
- Opens modal:
  - Search existing users OR
  - Create new user
  - Select relationship
  - Set permissions (if child account)

**Household Settings**:
- Shared calendar: Toggle
- Shared exchange listings: Toggle
- Joint billing: Toggle (future)
- Emergency contact: Checkbox

**Actions**:
- "Save Household Changes"

### Screen 3: Edit User Mode

**Trigger**: Click "Edit" button

**Changes**:
- Top bar: "Cancel" (left) | "Editing User" (center) | "Save" (right)
- All fields become editable
- Changes highlighted in yellow
- "Reason for changes" field appears (required for admin changes)

**Editable Fields**:
- All profile information
- Community assignment
- Lot assignment
- Role (with confirmation)
- Status (Active/Inactive)
- Privacy settings (admin override)

**Validation**:
- Email format
- Phone format
- Required fields highlighted
- Real-time validation

**Actions**:
- "Cancel" (discards changes, confirmation if >3 changes)
- "Save Changes" (saves all, requires reason)

**Success**:
- Toast: "User updated successfully"
- Notification sent to user (optional checkbox)
- Activity log updated
- Returns to view mode

### Screen 4: Send Notification

**Trigger**: "Send Notification" button

**Modal Design**:
- Centered dialog
- Max width: 560px

**Content**:
- Heading: "Send Notification to [User Name]"
- Recipient: User name + email (read-only)

**Form**:
- Subject: Text input (required, max 100 chars)
- Message: Textarea (required, max 500 chars)
- Character counter
- Preview: Shows how it will appear

**Delivery Method**:
- Email: Checkbox (default ON)
- Push Notification: Checkbox (if user has enabled)
- In-App: Checkbox (always ON)

**Template Dropdown** (optional):
- Welcome Message
- Account Activation Reminder
- Event Invitation
- Policy Update
- General Announcement
- Pre-fills subject + message

**Actions**:
- "Cancel"
- "Send Notification" (primary)

**Success**:
- Toast: "Notification sent"
- Delivery status shown
- Logged in admin activity

### Screen 5: Deactivate User

**Trigger**: "Deactivate Account" button

**Confirmation Modal**:
- Icon: Pause icon (orange)
- Heading: "Deactivate User?" (22px bold, orange)
- User name + email

**Description**:
"This temporarily deactivates the user account. They can be reactivated later."

**Consequences** (list):
- User cannot log in
- Active listings hidden
- Calendar events preserved
- Data retained
- Can be reactivated

**Form**:
- Reason: Dropdown (required)
  - User requested
  - Violation of rules
  - Non-payment (future)
  - Temporary absence
  - Other
- Additional notes: Textarea (optional)
- Notify user: Checkbox (default ON)
- Deactivation message: Textarea (shown to user if notify ON)

**Actions**:
- "Cancel" (light gray)
- "Deactivate" (orange)

**Success**:
- Toast: "User deactivated"
- User status: Inactive
- Notification sent (if checked)
- Logged in audit trail
- "Reactivate" button appears

### Screen 6: Delete User

**Trigger**: "Delete User" link

**Destructive Confirmation Modal**:
- Icon: X in circle (red)
- Heading: "Delete User?" (22px bold, red)
- Warning: "⚠️ This is a destructive action"

**Description**:
"This permanently deletes the user and all their data. This action cannot be undone."

**Consequences** (list):
- User account deleted
- All listings removed
- Events transferred to admin
- Check-ins removed
- Cannot be recovered

**Confirmation Steps**:
1. Reason: Dropdown (required)
   - User requested deletion
   - Duplicate account
   - Data privacy request
   - Violation of terms
   - Other

2. Additional notes: Textarea (required for audit)
   - Min 20 characters

3. Type "DELETE" to confirm:
   - Text input
   - Case-sensitive
   - Button disabled until typed correctly

4. Notify user before deletion: Checkbox

**Actions**:
- "Cancel" (light gray)
- "Delete Permanently" (red, disabled until "DELETE" typed)

**Success**:
- Toast: "User deleted"
- Returns to user list
- User removed from all views
- Notification sent (if checked)
- Permanent audit log entry

### Screen 7: Bulk User Import

**Trigger**: "Import Users" button

**Screen Design**:
- Full screen or large modal
- Multi-step wizard

**Step 1: Choose File**:
- Heading: "Import Users from CSV"
- File upload area (drag & drop)
- "Download CSV Template" link
- Template includes:
  - Full Name (required)
  - Email (required)
  - Phone (optional)
  - Lot Number (optional)
  - Role (optional, defaults to Resident)
  - Community (required if multi-community)

**Step 2: Map Fields**:
- Shows CSV preview (first 5 rows)
- Column mapping:
  - CSV Column → System Field
  - Dropdowns for each column
  - Auto-detect if headers match
- Validation warnings shown

**Step 3: Review & Confirm**:
- Shows all rows to import
- Validation errors highlighted:
  - Duplicate emails
  - Invalid formats
  - Missing required fields
- Options:
  - Fix and re-upload
  - Skip invalid rows
  - Stop import
- Summary: "X valid, Y invalid"

**Step 4: Import Progress**:
- Progress bar
- "Importing user 15 of 42..."
- Real-time updates
- Can cancel (stops after current)

**Step 5: Import Complete**:
- Success summary
- "Successfully imported 40 users"
- "Skipped 2 users (errors)"
- Download error log (if any)
- "Send welcome emails to new users" checkbox
- Actions:
  - "View Imported Users"
  - "Import More Users"
  - "Done"

## Edge Cases & Error Handling

**Concurrent Admin Edits**:
- Two admins editing same user
- Conflict detection on save
- Modal: "Another admin updated this user"
- Show diff of changes
- Options: Reload | Override | Merge

**User Deletes Own Account**:
- Self-service deletion (resident-initiated)
- Requires confirmation
- Admin notified
- Grace period: 7 days to undo
- After grace: Permanent deletion

**Bulk Import Failures**:
- Some users fail to import
- Detailed error log provided
- Specific row numbers and reasons
- Options: Fix CSV and retry | Skip errors

**Permission Escalation**:
- User tries to make themselves admin
- Blocked by system
- Requires another admin's approval
- Logged as security event

**Deactivated User Logs In**:
- Shows: "Your account is deactivated"
- Reason (if provided)
- Contact: Admin email
- Cannot access platform

**Email Change Request**:
- Requires email verification
- Old email: Confirmation link
- New email: Verification link
- Both must confirm
- Old email revoked after new confirmed

## Success Criteria

- ✅ All users manageable from one interface
- ✅ Permissions accurate and enforced
- ✅ Audit trail complete for all admin actions
- ✅ Bulk operations work correctly
- ✅ User data protected and privacy respected

---
