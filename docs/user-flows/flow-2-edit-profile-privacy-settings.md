# Flow 2: Edit Profile & Privacy Settings

**Actor**: Any authenticated user  
**Entry Point**: Profile icon → "Edit Profile"  
**Goal**: Update profile information and privacy settings post-onboarding  
**Success Criteria**: Changes saved successfully and reflected immediately

## Flow Steps

### Screen 1: Profile Overview

**Top Bar**:
- "Back" arrow (left)
- "My Profile" (center)
- "Edit" (right, switches to edit mode)

**Profile Display** (Read-Only Mode):

1. **Header Section**:
   - Cover photo area (optional, future feature)
   - Profile photo (120px circular)
   - Name (24px bold)
   - Journey stage badge (Newcomer/Settled/Coordinator)
   - Lot/location info (14px regular, gray)

2. **About Section**:
   - Bio/description (if added)
   - Member since date
   - Last active timestamp

3. **Interests** (chips, read-only):
   - Scrollable horizontal list
   - All selected interests visible
   - Categories color-coded

4. **Skills** (chips, read-only):
   - Same visual style as interests
   - "Available to help with:" prefix

5. **Privacy Settings** (quick view):
   - Map visibility toggle
   - Icon: Globe (visible) or Lock (private)
   - Tap: Opens privacy modal

**Actions**:
- "Edit Profile" (primary, full width, bottom)

### Screen 2: Edit Profile Mode

**Top Bar**:
- "Cancel" (left)
- "Edit Profile" (center)
- "Save" (right, primary color, enabled when changes made)

**Editable Sections**:

1. **Profile Photo**:
   - Current photo with edit icon overlay
   - Tap: Opens camera/gallery
   - "Change Photo" | "Remove Photo" options
   - Shows preview before saving

2. **Basic Info**:
   - Display Name (text input)
   - Bio (textarea, 280 characters)
   - Preferred Language (dropdown)
   - Character counter for bio

3. **Journey Stage**:
   - Same three cards as onboarding
   - Current selection highlighted
   - Can change anytime

4. **Interests**:
   - "Manage Interests" button
   - Opens same interest selection screen
   - Shows current count: "12 interests"
   - Can add/remove

5. **Skills**:
   - "Manage Skills" button
   - Opens skill tag input
   - Current skills shown as removable chips

6. **Contact Info** (collapsible):
   - Phone number (editable)
   - Email (read-only, shows "Contact admin to change")
   - Helper: "Used for account recovery"

7. **Family Members** (if applicable):
   - List of linked household members
   - "Add Family Member" button
   - Each member: Name, photo, "Edit" | "Remove"

**Auto-save**:
- Changes auto-save as you type (debounced)
- "Saved" indicator appears briefly
- No need to tap "Save" for most fields
- "Save" button: Confirms all changes and exits edit mode

**Validation**:
- Display name: 2-50 characters
- Bio: Max 280 characters
- Phone: Valid format for selected country

### Screen 3: Privacy Settings Modal

**Trigger**: Tap "Privacy" from profile or settings

**Modal Design**:
- Bottom sheet on mobile
- Centered dialog on desktop
- White background, rounded top corners

**Content**:
- Heading: "Privacy Settings" (20px semibold)
- Subheading: "Control what others can see"

**Privacy Controls**:

1. **Map Visibility** (toggle)
   - Label: "Show me on community map"
   - Default: ON
   - Helper: "When enabled, others can see your check-ins on the map"
   - Sub-text: "You control visibility for each individual check-in"

2. **Profile Visibility** (future feature):
   - Public / Community Only / Private
   - Helper: "Who can see your full profile"

3. **Contact Info** (future feature):
   - Show email / Hide email
   - Show phone / Hide phone

**Preview Section**:
- "How others see you" preview card
- Shows profile as it appears to others
- Updates in real-time as toggles change

**Actions**:
- "Close" or X (top-right)
- Changes apply immediately (no save button needed)

## Edge Cases & Error Handling

**Photo Upload Failure**:
- Shows error toast
- "Photo upload failed. Try again?"
- Reverts to previous photo
- Options: Retry | Cancel

**Network Error While Saving**:
- Auto-retry 3 times
- If fails: "Could not save changes. Check connection."
- Changes cached locally
- "Retry" button
- Auto-sync when reconnected

**Validation Errors**:
- Display name too short: "Name must be at least 2 characters"
- Bio too long: Character counter turns red at 280
- Invalid phone: "Please enter a valid phone number"

**Concurrent Edits** (if admin changes profile):
- Detect conflict on save
- Modal: "This profile was updated by an admin"
- Show diff of changes
- Options: "Keep admin changes" | "Override with mine"

**Session Timeout**:
- Warning at 25 minutes
- Auto-save before expiring
- Redirect to login
- Restored to edit mode after re-login

## Success Criteria

- ✅ All profile changes saved
- ✅ Changes reflected immediately in UI
- ✅ Privacy settings applied across platform
- ✅ Other users see updated information (respecting privacy)
- ✅ No data loss on errors or timeouts

---
