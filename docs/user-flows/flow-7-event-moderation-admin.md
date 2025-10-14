# Flow 7: Event Moderation (Admin)

**Actor**: Administrator or Coordinator with moderation permissions  
**Entry Point**: Admin Backoffice → Event Management  
**Goal**: Review, approve, edit, or flag events  
**Success Criteria**: Event appropriately moderated, organizer notified

## Flow Steps

### Screen 1: Event Moderation Dashboard

**Entry Point**: Backoffice → "Event Management" card

**Top Bar**:
- "Back" arrow (left)
- "Event Management" title (center)
- Filter icon (right)
- Search icon (right)

**Stats Cards** (horizontal scroll, top):

1. **Total Events**:
   - Number: "124"
   - Label: "Total Events"
   - Icon: 📅
   - Trend: "+8 this month"

2. **Pending Approval**:
   - Number: "5"
   - Label: "Awaiting Review"
   - Icon: ⏳
   - Badge: "Action needed" (if >0)

3. **This Week**:
   - Number: "12"
   - Label: "Events This Week"
   - Icon: 🗓️

4. **Flagged**:
   - Number: "2"
   - Label: "Flagged Events"
   - Icon: 🚩
   - Badge: Warning color

**Tab Navigation**:
- All Events
- Pending Approval (badge if >0)
- Published
- Drafts
- Flagged (badge if >0)
- Past Events

**Table View** (main content):

**Columns**:
1. **Checkbox** (bulk select)
2. **Title** (sortable, clickable)
3. **Type** (Official/Resident badge)
4. **Category** (icon + label)
5. **Organizer** (avatar + name, clickable)
6. **Date & Time** (sortable)
7. **Location** (truncated)
8. **RSVPs** (count, clickable)
9. **Status** (Published/Draft/Cancelled/Flagged)
10. **Actions** (dropdown menu)

**Row Design**:
- Height: 64px
- Border: 1px bottom
- Hover: Background highlight
- Click row: Opens detail panel

**Bulk Actions** (when rows selected):
- "Approve Selected" (green)
- "Flag Selected" (orange)
- "Delete Selected" (red)
- Shows count: "3 events selected"

**Actions Dropdown**:
- View Details
- Edit Event
- Approve (if pending)
- Publish Now
- Flag for Review
- Message Organizer
- Cancel Event
- Delete Event

**Filters Panel** (slide from right):

**Filter Options**:
- Date range: Custom picker
- Event type: Official/Resident/All
- Category: Multi-select
- Status: Pending/Published/etc.
- Organizer: Search users
- Location: Dropdown
- RSVP count: Min/max
- Flagged: Yes/No/All

**Apply/Clear Buttons**:
- "Apply Filters" (primary)
- "Clear All" (text link)
- Shows active count: "3 filters active"

### Screen 2: Event Detail Panel

**Trigger**: Click event row or "View Details"

**Panel Design**:
- Slides from right (desktop)
- Full screen modal (mobile)
- Width: 560px (desktop)
- White background
- Shadow: -4px 0 16px rgba(0,0,0,0.1)

**Header**:
- "Event Details" title
- X close button
- Type badge: Official/Resident

**Content Sections** (scrollable):

**1. Event Info**:
- Cover photo (if present)
- Title (24px bold)
- Category (icon + label)
- Date & time (large, prominent)
- Location (with map thumbnail)
- Description (full text)

**2. Organizer Info**:
- Avatar (48px)
- Name (clickable to profile)
- Contact email
- Co-organizers (if any)
- "Message Organizer" button

**3. RSVP Details**:
- Current count: "24 / 50"
- Progress bar
- "View Attendees" button
- RSVP settings (deadline, max, etc.)

**4. Status & History**:
- Current status badge
- Created: Timestamp + creator
- Last modified: Timestamp
- Approval history:
  - "Approved by Admin Maria - Oct 3 at 2:15 PM"
  - "Flagged by Marcus - Oct 2 at 9:00 AM"

**5. Conflict Warnings** (if applicable):
- Background: Warning color at 10%
- Border left: 4px solid warning
- Icon: ⚠️
- List of conflicts:
  - "Overlaps with 'Build Day' (2-4 PM)"
  - "Same location as 'Yoga Session'"
  - "Short notice: < 24h before event"

**6. Flagged Details** (if flagged):
- Background: Clay at 10%
- Border: 4px left, Clay
- Icon: 🚩
- Flagged by: Name + timestamp
- Reason: Dropdown value
- Notes: Admin comments

**7. Activity Log** (collapsible):
- Timeline of changes
- Each entry:
  - Timestamp
  - Action: "Created", "Edited", "Approved", "Flagged"
  - Actor: Name + role
  - Changes: Diff if edited

**Action Bar** (sticky bottom):

**Primary Actions**:
- "Approve" (green, if pending)
- "Edit Event" (secondary)
- "Message Organizer" (secondary)
- "Flag for Review" (warning)
- "Cancel Event" (secondary)
- "Delete" (text link, red, destructive)

**Quick Actions** (icons):
- Calendar: Add to personal calendar
- Share: Copy link
- Duplicate: Create similar event

### Screen 3: Approve Event

**Trigger**: Click "Approve" button

**Confirmation Modal**:
- Heading: "Approve Event?"
- Event title preview
- Organizer name
- "This event will be published immediately and visible to [audience]"
- Checkbox: "Notify organizer"
- Checkbox: "Notify interested community members"

**Actions**:
- "Cancel" (secondary)
- "Approve & Publish" (primary, green)

**Success**:
- Checkmark animation
- Toast: "Event approved and published!"
- Notification sent to organizer
- Event moves to "Published" tab
- Panel updates status

### Screen 4: Flag Event for Review

**Trigger**: Click "Flag for Review"

**Modal Design**:
- Centered dialog
- Max width: 480px

**Content**:
- Heading: "Flag Event for Review"
- Event title (read-only)
- Reason dropdown (required):
  - Content violation
  - Spam or duplicate
  - Incorrect information
  - Scheduling conflict
  - Inappropriate for audience
  - Other
- Notes textarea (optional):
  - "Add details for the review team..."
  - Max 500 chars
- Checkbox: "Unpublish event immediately"
  - Helper: "Event will be hidden until resolved"
- Checkbox: "Notify organizer"

**Actions**:
- "Cancel"
- "Flag Event" (warning color)

**Success**:
- Toast: "Event flagged for review"
- Event moves to "Flagged" tab
- Notification sent to organizer (if checked)
- Other admins notified

### Screen 5: Message Organizer

**Trigger**: Click "Message Organizer"

**Modal Design**:
- Centered dialog
- Max width: 560px

**Content**:
- Heading: "Message [Organizer Name]"
- Event context card (read-only):
  - Event title
  - Date & time
  - Location
- Subject line (pre-filled):
  - "About your event: [Event Title]"
  - Editable
- Message textarea:
  - Placeholder: "Write your message..."
  - Max 1000 chars
  - Rich text: Bold, italic, lists
- Template dropdown (optional):
  - "Request Changes"
  - "Approval Feedback"
  - "Cancellation Notice"
  - "General Inquiry"
  - Fills textarea with template

**Actions**:
- "Cancel"
- "Send Message" (primary)

**Success**:
- Toast: "Message sent to [name]"
- Email sent to organizer
- Copy saved in admin log

### Screen 6: Edit Event (Admin Override)

**Trigger**: Click "Edit Event"

**Screen**: Same form as event creation (Flow 6)

**Differences**:
- Top bar: "Edit Event (Admin)"
- Banner: "You're editing another user's event"
- All fields editable
- Additional field: "Reason for changes" (required)
  - Textarea, max 500 chars
  - Shown to organizer in notification
- "Save Changes" button
- Checkbox: "Notify organizer of changes"

**Save Actions**:
- "Cancel" (discards)
- "Save Changes" (primary)

**Success**:
- Toast: "Event updated"
- Notification sent to organizer
- Activity log updated
- Changes highlighted in history

### Screen 7: Cancel Event

**Trigger**: Click "Cancel Event"

**Confirmation Modal**:
- Icon: ⚠️
- Heading: "Cancel Event?"
- Event title + date
- Warning: "This will notify all [X] attendees"
- Reason textarea (required):
  - "Explain why this event is being cancelled..."
  - Max 500 chars
  - Shown to attendees
- Checkbox: "Allow organizer to reschedule"

**Actions**:
- "Back" (secondary)
- "Cancel Event" (warning color)

**Success**:
- Event status: Cancelled
- Email sent to all RSVPs
- Organizer notified
- Removed from public calendar
- Stays in history (admin view)

### Screen 8: Delete Event

**Trigger**: Click "Delete" link

**Destructive Confirmation Modal**:
- Icon: ⚠️ (red)
- Heading: "Delete Event?"
- Warning: "This is permanent and cannot be undone"
- Event will be:
  - Removed from calendar
  - All RSVPs deleted
  - History removed
  - Cannot be recovered
- Confirmation input: "Type DELETE to confirm"
- Reason textarea (required for audit):
  - "Why is this event being deleted?"

**Actions**:
- "Cancel" (secondary)
- "Delete Permanently" (red, disabled until typed)

**Success**:
- Toast: "Event deleted"
- Removed from all views
- Organizer notified (email)
- Logged in admin audit trail

## Edge Cases & Error Handling

**Concurrent Edits**:
- Two admins editing same event
- Detect conflict on save
- Modal: "Another admin updated this event"
- Show diff of changes
- Options: "Reload" | "Override"

**Event Already Started**:
- Warning: "This event already started 2 hours ago"
- Actions limited:
  - Cannot delete
  - Can cancel (with notice)
  - Can edit notes only

**Event in Past**:
- Banner: "Past event"
- Actions:
  - View only
  - Cannot approve/edit
  - Can delete (admin only)

**Organizer Account Deleted**:
- Event shows: "Organizer: [Deleted User]"
- Warning: "Original organizer no longer exists"
- Admin becomes default organizer
- Can reassign to another user

**Network Error**:
- Shows error toast
- "Could not [action]. Try again?"
- Changes cached locally
- Auto-retry

**Bulk Action Failure**:
- Modal: "Some events could not be processed"
- List of failed events
- Reason for each failure
- Options: "Retry Failed" | "Close"

## Success Criteria

- ✅ All events reviewed within 24h
- ✅ Organizers notified of decisions
- ✅ Conflicts detected and flagged
- ✅ Audit trail complete
- ✅ Community calendar accurate

---
