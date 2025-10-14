# Flow 10: Exchange Listing Moderation (Admin)

**Actor**: Administrator or Coordinator with moderation permissions  
**Entry Point**: Admin Backoffice → Exchange Management  
**Goal**: Review, approve, edit, or remove listings  
**Success Criteria**: Listings appropriately moderated, owners notified

## Flow Steps

### Screen 1: Exchange Moderation Dashboard

**Entry Point**: Backoffice → "Exchange Management" card

**Top Bar**:
- "Back" arrow (left)
- "Exchange Moderation" title (center)
- Filter icon (right)
- Search icon (right)

**Stats Cards**:

1. **Total Listings**:
   - Number: "247"
   - Label: "Total Listings"
   - Icon: 📦
   - Trend: "+15 this week"

2. **Active**:
   - Number: "189"
   - Label: "Currently Available"
   - Icon: ✅

3. **Flagged**:
   - Number: "3"
   - Label: "Needs Review"
   - Icon: 🚩
   - Badge: Warning

4. **Borrowed**:
   - Number: "42"
   - Label: "Currently Out"
   - Icon: 🔄

**Tab Navigation**:
- All Listings
- Active
- Reserved
- Flagged (badge if >0)
- Removed
- Reported

**Table View**:

**Columns**:
1. Checkbox (bulk select)
2. Photo (64x64px thumbnail)
3. Title (sortable, clickable)
4. Type (category badge)
5. Owner (avatar + name, clickable)
6. Status (Active/Reserved/Flagged/Removed)
7. Created (sortable)
8. Last Updated
9. Actions (dropdown)

**Row Design**:
- Height: 64px
- Border: 1px bottom
- Hover: Background highlight
- Click: Opens detail panel

**Bulk Actions**:
- "Approve Selected" (green)
- "Flag Selected" (orange)
- "Remove Selected" (red)
- Shows count: "5 selected"

**Actions Dropdown**:
- View Details
- Edit Listing
- Approve (if flagged)
- Flag for Review
- Message Owner
- Remove Listing
- Delete Permanently

**Filters Panel**:

**Options**:
- Date range
- Category: Multi-select
- Status: All/Active/Reserved/etc.
- Owner: Search users
- Condition: Multi-select
- Flagged: Yes/No/All
- Location: Within community

**Apply/Clear**:
- "Apply Filters" (primary)
- "Clear All" (link)
- Shows: "4 filters active"

### Screen 2: Listing Detail Panel

**Trigger**: Click listing row

**Panel Design**:
- Slides from right (desktop)
- Full screen (mobile)
- Width: 560px
- White background

**Header**:
- "Listing Details" title
- X close button
- Category badge

**Content Sections**:

**1. Photos**:
- Gallery (swipeable)
- All uploaded photos
- Zoom on click

**2. Listing Info**:
- Title (20px bold)
- Category + condition badges
- Description (full)
- Availability dates
- Quantity
- Location (map thumbnail)

**3. Owner Info**:
- Avatar (48px)
- Name (clickable)
- Contact info
- "Message Owner" button
- Listing count: "12 active listings"

**4. Activity**:
- Current status
- Times borrowed: Count
- Current borrower (if out)
- Request history

**5. Flagged Details** (if applicable):
- Background: Clay at 10%
- Flagged by: Name + timestamp
- Reason: Dropdown value
- Reporter notes
- Admin notes (editable)

**6. Activity Log**:
- Timeline
- Created, edited, flagged, etc.
- Each: Timestamp + actor

**Action Bar** (sticky bottom):

**Primary**:
- "Approve" (if flagged)
- "Edit Listing" (secondary)
- "Message Owner" (secondary)
- "Flag" (warning)
- "Remove" (secondary)
- "Delete" (red, text link)

### Screen 3: Flag Listing

**Trigger**: Click "Flag for Review"

**Modal**:
- Centered dialog
- Max width: 480px

**Content**:
- Heading: "Flag Listing"
- Listing title (read-only)
- Reason dropdown:
  - Inappropriate content
  - Spam or duplicate
  - Incorrect category
  - Prohibited item
  - Violates community rules
  - Other
- Notes textarea:
  - "Details for review team..."
  - Max 500 chars
- Checkbox: "Hide listing immediately"
- Checkbox: "Notify owner"

**Actions**:
- "Cancel"
- "Flag Listing" (warning)

**Success**:
- Toast: "Listing flagged"
- Moves to Flagged tab
- Owner notified (if checked)

### Screen 4: Remove Listing

**Trigger**: Click "Remove Listing"

**Confirmation Modal**:
- Icon: ⚠️
- Heading: "Remove Listing?"
- Listing title + owner
- "This will make the listing unavailable"
- Effects:
  - Hidden from search
  - Active borrows unaffected
  - Can be restored later
- Reason textarea (required)
- Checkbox: "Notify owner"

**Actions**:
- "Cancel"
- "Remove Listing" (warning)

**Success**:
- Toast: "Listing removed"
- Status: Removed
- Owner notified
- Can restore from Removed tab

### Screen 5: Delete Listing

**Trigger**: Click "Delete" link

**Destructive Modal**:
- Icon: ⚠️ (red)
- Heading: "Delete Listing Permanently?"
- Warning: "This cannot be undone"
- Effects:
  - Listing deleted
  - All data removed
  - Cannot be recovered
- Confirmation: Type "DELETE"
- Reason (audit log)

**Actions**:
- "Cancel"
- "Delete Permanently" (red, disabled until typed)

**Success**:
- Toast: "Listing deleted"
- Removed from all views
- Owner notified
- Logged in audit trail

## Edge Cases & Error Handling

**Listing Currently Borrowed**:
- Warning: "This item is currently out"
- Borrower: Name + return date
- Options:
  - Flag but don't hide
  - Message owner + borrower
  - Wait for return

**Owner Account Deleted**:
- Listing shows: "[Deleted User]"
- Warning in detail panel
- Options:
  - Assign to admin
  - Reassign to another user
  - Delete listing

**Concurrent Moderation**:
- Two admins moderating same listing
- Conflict on save
- Shows diff
- Options: Reload | Override

**Network Error**:
- Error toast
- "Could not [action]. Try again?"
- Auto-retry

**Bulk Action Partial Failure**:
- Modal: "Some listings failed"
- List of failures + reasons
- "Retry Failed" | "Close"

## Success Criteria

- ✅ All flagged listings reviewed
- ✅ Owners notified of actions
- ✅ Community guidelines enforced
- ✅ Audit trail complete
- ✅ Exchange remains healthy

---
