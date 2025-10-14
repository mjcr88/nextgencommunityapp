# Ecovilla Community Platform - Complete User Flows

**Version:** 2.0  
**Last Updated:** October 5, 2025  
**Status:** Complete

---

## Overview

This document contains detailed documentation for all 12 primary user flows in the Ecovilla Community Platform. Each flow includes:

- User goal and context
- Entry points
- Step-by-step wireframe descriptions
- Edge cases and error handling
- Success criteria
- Micro-copy and messaging
- API integration notes

**Flow Organization:**

**Onboarding Cluster (Flows 0-2)**
- Flow 0: Admin Creates User
- Flow 1: Account Activation & Onboarding
- Flow 2: Edit Profile & Privacy

**Core Experience (Flow 3)**
- Flow 3: Home Feed (Daily Digest)

**Spatial Features (Flows 4-5)**
- Flow 4: Explore Community Map
- Flow 5: Create Check-In

**Event Management (Flows 6-7)**
- Flow 6: Create Event
- Flow 7: Event Moderation (Admin)

**Exchange System (Flows 8-10)**
- Flow 8: Create Exchange Listing
- Flow 9: Browse & Borrow Exchange Listings
- Flow 10: Exchange Listing Moderation (Admin)

**AI Assistant (Flow 11)**
- Flow 11: AI Chat Assistant

**Administration (Flow 12)**
- Flow 12: User & Community Management (Admin)

---

## Flow 0: Admin Creates User Account

**Actor**: Administrator  
**Entry Point**: Backoffice → User Management → Create User  
**Goal**: Create new resident account and send activation email  
**Success Criteria**: User account created, invitation email sent, lot assigned

### Flow Steps

#### 1. Admin accesses user creation
- From Backoffice Dashboard → "User Management" card
- Or from User Management table → "+ Create User" button
- Navigation: Admin backoffice (no bottom nav visible)

#### 2. Assign Lot Screen
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

#### 3. Lot Conflict Resolution (if lot already assigned)
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

#### 4. Create New Resident Form

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

#### 5. Validation & Error States

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

#### 6. Link Lot to Resident

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

#### 7. Success Confirmation Modal

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

### Edge Cases & Error Handling

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

### Success Criteria

- ✅ User account created in database
- ✅ Lot assigned to user
- ✅ Invitation email sent successfully
- ✅ Admin can view new user in user list
- ✅ User appears with "Pending" status (until activation)

---

## Flow 1: Account Activation & Onboarding

**Actor**: New Resident  
**Entry Point**: Email invitation link from admin  
**Goal**: Activate account and complete profile setup  
**Success Criteria**: Profile 80% complete, ready to use core features

### Flow Steps

#### Screen 1: Password Setup

**Entry Point**: Click activation link in email
- URL format: `https://ecovilla.app/activate?token=[unique-token]`
- Token validation happens server-side
- Invalid/expired token → Error state

**Screen Layout**:
- Clean, centered card (max 480px)
- White background
- Logo at top (Ecovilla branding)
- Progress hidden (this is gateway step)

**Content**:
- Heading: "Welcome to Ecovilla!" (28px bold)
- Subheading: "Create your password to activate your account" (15px regular, gray)
- Welcome name if available: "Hi Sofia!" (from invitation)

**Form Fields**:

1. **Email** (read-only, pre-filled)
   - Shows email from invitation
   - Grayed out, not editable
   - Helper: "This is your login email"

2. **Password** (required)
   - Type: Password with toggle visibility
   - Placeholder: "Create a secure password"
   - Requirements shown below:
     - Minimum 8 characters
     - At least one number
     - At least one uppercase letter
   - Real-time validation with checkmarks
   - Eye icon to toggle visibility

3. **Confirm Password** (required)
   - Type: Password
   - Placeholder: "Re-enter your password"
   - Validation: Must match first password
   - Shows ✓ when matches

**Security Note**:
- Small lock icon + text: "Your password is encrypted and secure"
- 12px gray text

**Actions**:
- "Set Password & Continue" (primary, full width)
- Disabled until both passwords valid and match
- No "Back" button (can't go back before activation)

**States**:
- Loading: Button shows spinner
- Success: Brief checkmark, then advance
- Error: Shake animation + error message

#### Screen 2: About You (Profile Basics)

**Progress**: "Step 1 of 6" (top center)

**Top Bar**:
- "Back" (left) - returns to password screen with warning
- "Profile Setup" (center title)
- "Skip" (right) - grayed out, not available this step

**Content**:

1. **Profile Photo** (optional but encouraged)
   - Large circular upload area (120px)
   - Camera icon overlay
   - "Add Photo" text below
   - Tap: Camera/gallery picker (iOS/Android native)
   - Shows preview once uploaded
   - Delete icon (X) appears on hover/long-press

2. **Display Name** (required, pre-filled from invitation)
   - Text input
   - Label: "How you'd like neighbors to know you"
   - Placeholder: "Sofia Morales"
   - Helper: "You can use your full name or a nickname"

3. **Preferred Language** (required)
   - Dropdown: English | Español | Português
   - Default: Browser language or English
   - Changes UI language immediately

4. **Your Location** (required, pre-filled from lot assignment)
   - Read-only field showing lot/address
   - Helper: "Your lot was assigned by the admin"
   - Map preview thumbnail (optional visual)

**Actions**:
- "Continue" (primary, full width)
- Disabled until required fields complete

#### Screen 3: Journey Stage Selection

**Progress**: "Step 2 of 6"

**Top Bar**:
- "Back" (left)
- "Your Journey" (center)
- "Skip for Now" (right) - not available (required step)

**Content**:
- Heading: "Where are you on your Ecovilla journey?" (20px semibold)
- Subheading: "This helps us personalize your experience" (14px regular, gray)

**Three Cards** (radio selection):

1. **Newcomer** 🌱
   - Icon: Seedling
   - Title: "Just Arrived"
   - Description: "I'm new and still learning my way around"
   - Badge: "Get extra support"
   - Border: 2px, selected = Forest Canopy

2. **Settled Resident** 🏡
   - Icon: House
   - Title: "Getting Comfortable"
   - Description: "I'm familiar with the community and routines"
   - Badge: "Balanced experience"

3. **Community Coordinator** ⭐
   - Icon: Star
   - Title: "Active Organizer"
   - Description: "I help organize events and coordinate activities"
   - Badge: "Power user tools"

**Card Design**:
- White background
- Border: 1px solid gray (default)
- Selected: 2px Forest Canopy border + checkmark
- Padding: 20px
- Border radius: 12px
- Tap anywhere to select
- Only one selectable

**Helper**:
- "You can change this anytime in Settings"
- 12px gray text, centered below cards

**Actions**:
- "Continue" (primary)
- Enabled only when one selected

#### Screen 4: Your Interests

**Progress**: "Step 3 of 6"

**Content**:
- Heading: "What interests you most?" (20px semibold)
- Subheading: "Select at least 3 to personalize your feed" (14px regular)
- Counter: "3 selected" (updates dynamically)

**Interest Categories** (collapsible sections):

**Each category**:
- Category header (clickable to expand/collapse)
- Icon + name (16px semibold)
- Chevron down/up
- Colored badge: Interest count "(5)"

**Categories with chips**:

1. **Sustainability** (Forest Canopy theme)
   - Regenerative Agriculture
   - Permaculture
   - Zero Waste
   - Composting
   - Solar Energy
   - Water Conservation

2. **Community Life** (Sky theme)
   - Potlucks & Social Events
   - Community Meals
   - Group Activities
   - Celebrations
   - Welcome Committees

3. **Skills & Crafts** (Sunrise theme)
   - Woodworking
   - Pottery
   - Textiles
   - Natural Building
   - Mechanics
   - Electronics

4. **Wellness** (River theme)
   - Yoga & Meditation
   - Fitness
   - Massage
   - Herbalism
   - Mental Health

5. **Learning** (Honey theme)
   - Workshops
   - Language Exchange
   - Children's Education
   - Skill Sharing

6. **Food & Growing** (Growth theme)
   - Gardening
   - Cooking
   - Fermentation
   - Harvest Sharing
   - Seed Saving

**Chip Design**:
- Default: Light gray background, dark text
- Selected: Forest Canopy background, white text
- Border radius: 20px (pill shape)
- Padding: 8px 16px
- Tap to toggle
- Smooth color transition (200ms)

**Validation**:
- Minimum 3 selections required
- Counter shows progress: "2 of 3" → "3 selected ✓"
- "Continue" button disabled until 3+ selected

**Helper Actions**:
- "Need ideas?" link
  - Opens modal with suggestions based on journey stage
  - Newcomer: Basic community participation
  - Coordinator: Leadership and organization

**Actions**:
- "Skip for Now" (secondary, top-right)
- "Continue" (primary, full width)

#### Screen 5: Share Your Skills

**Progress**: "Step 4 of 6"

**Content**:
- Heading: "What skills can you share?" (20px semibold)
- Subheading: "Help neighbors find you when they need expertise" (14px regular)
- Helper: "Optional - you can add these later"

**Skill Input**:
- Tag input field (searchable)
- Placeholder: "Start typing... (e.g., carpentry, Spanish, massage)"
- Autocomplete dropdown with suggestions
- Can add custom skills not in list

**Added Skills Display**:
- Pills with X to remove
- Same visual style as interest chips
- Draggable to reorder (advanced)
- Max 15 skills

**Suggested Skills** (based on interests):
- Shows 8-10 relevant suggestions
- "Tap to add" interaction
- Categories match interest categories
- Examples:
  - Carpentry, Plumbing, Electrical
  - Spanish Teacher, English Tutor
  - Massage, Yoga Instruction
  - Garden Planning, Composting
  - Photography, Video Editing

**Actions**:
- "Skip for Now" (secondary, top-right)
- "Continue" (primary, full width)
- Enabled always (skills optional)

#### Screen 6: Notifications & Privacy

**Progress**: "Step 5 of 6"

**Content**:
- Heading: "Stay connected your way" (20px semibold)
- Subheading: "Control how you receive updates" (14px regular)

**Notification Preferences** (toggles):

1. **Push Notifications**
   - Master toggle
   - Helper: "Get alerts on your device"
   - Sub-options (appear when enabled):
     - Event reminders
     - Exchange requests
     - Community announcements

2. **Email Digest**
   - Toggle
   - Frequency dropdown: Daily | Weekly | Never
   - Helper: "Summary of community activity"

3. **Map Visibility**
   - Toggle (ON by default)
   - Label: "Show me on the community map"
   - Helper: "Others can see when you check in"
   - Privacy note: "You control each check-in's visibility"

**Privacy Callout**:
- Light blue background panel
- Lock icon
- "Your privacy matters"
- Brief explanation of data usage
- Link: "Read Privacy Policy"

**Actions**:
- "Back" (secondary)
- "Complete Setup" (primary, full width)

#### Screen 7: Welcome Tour (Optional Overlay)

**Trigger**: After completing Step 6
**Format**: Interactive overlay with spotlight highlights

**Tour Stops** (5 total):

1. **Bottom Navigation**
   - Spotlight: Bottom nav bar
   - Card position: Above nav
   - "Navigate between Home, Map, Calendar, Exchange, and AI Assistant"
   - "Next" button

2. **Home Feed**
   - Navigate to Home tab
   - Spotlight: Feed area
   - "Your personalized community updates appear here"
   - "Next"

3. **Map Tab**
   - Navigate to Map
   - Spotlight: Map area
   - "See where neighbors are checking in"
   - "Next"

4. **Calendar**
   - Navigate to Calendar
   - Spotlight: Calendar grid
   - "Discover and RSVP to community events"
   - "Next"

5. **Profile Menu**
   - Spotlight: Profile icon
   - "Access your profile, settings, and privacy controls here"
   - "Get Started!" (primary, completes tour)

**Tour Controls**:
- Progress dots: 5 dots, current highlighted
- "Skip Tour" link (top-right, always visible)
- "Back" | "Next" buttons
- Last stop: "Get Started!" replaces "Next"

**Dismissal**:
- Tap outside spotlight area: Shows confirmation
  - "Skip the rest of the tour?"
  - "Yes, skip" | "No, continue"
- Completed tour never shows again
- Can re-access from Help menu

### Edge Cases & Error Handling

**Invalid Activation Token**:
- Screen: Centered error card
- Icon: ⚠️
- Message: "This activation link is invalid or expired"
- Actions:
  - "Request New Invitation" (primary)
  - "Contact Admin" (secondary with email link)

**Photo Upload Failure**:
- Toast: "Photo upload failed. Try again?"
- Options: Retry | Skip | Choose different photo
- Can complete onboarding without photo

**Back Button Warning** (if significant progress):
- Modal: "Your progress will be saved. Continue?"
- Options: "Stay" | "Go Back"
- Saves partial profile data

**Session Timeout**:
- Warning at 25 minutes: "Still there? Your session will expire in 5 minutes."
- Option: "Keep working"
- On timeout: Save progress, redirect to login

**Network Disconnection**:
- Auto-save progress locally
- Banner: "Offline - changes will sync when reconnected"
- Continue working in offline mode
- Auto-sync when back online

### Success Criteria

- ✅ Account activated with password
- ✅ Profile photo added (optional)
- ✅ Basic profile info complete
- ✅ Journey stage selected
- ✅ At least 3 interests chosen
- ✅ Notification preferences set
- ✅ User lands on Home dashboard

---

## Flow 2: Edit Profile & Privacy Settings

**Actor**: Any authenticated user  
**Entry Point**: Profile icon → "Edit Profile"  
**Goal**: Update profile information and privacy settings post-onboarding  
**Success Criteria**: Changes saved successfully and reflected immediately

### Flow Steps

#### Screen 1: Profile Overview

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

#### Screen 2: Edit Profile Mode

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

#### Screen 3: Privacy Settings Modal

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

### Edge Cases & Error Handling

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

### Success Criteria

- ✅ All profile changes saved
- ✅ Changes reflected immediately in UI
- ✅ Privacy settings applied across platform
- ✅ Other users see updated information (respecting privacy)
- ✅ No data loss on errors or timeouts

---

## Flow 3: Home Feed (Daily Digest)

**Actor**: Any authenticated user  
**Entry Point**: App launch or Home tab  
**Goal**: Stay informed about community activities without feeling overwhelmed  
**Success Criteria**: User feels caught up, not anxious or FOMO

### Flow Steps

#### Screen 1: Home Dashboard (Active Content)

**Top Bar**:
- Logo or "Today" text (left)
- Date: "Sunday, Oct 5" (center, 14px regular)
- Notification bell (right, first icon)
- Settings gear (right, second icon)
- Badge on bell if unread notifications

**First-Time Personalization Banner** (if not customized):
- Background: Light blue (Dew #E8F2F5)
- Icon: ⚙️ (left)
- Message: "Personalize your feed!"
- Subtext: "Set your interests and notification preferences to see what matters to you."
- Action: "Customize Now" button (small, primary)
- Dismiss: "Remind me later" link (right)
- Shows until dismissed or customized

**Actions Section**:
- Heading: "Actions" (18px semibold) | "See all" link (right)
- Subheading: "Things that need your attention" (13px gray)
- Horizontal scrollable cards (if >3) or vertical stack

**Action Card Types**:

1. **Event RSVP Needed**:
   - Icon: 📅
   - Title: "Community Potluck - Friday"
   - Message: "RSVP by tomorrow"
   - Time: "2 days from now"
   - Actions: "RSVP" (primary, small) | "View" (secondary, small)
   - Swipe right: Mark as done
   - Swipe left: Dismiss

2. **Exchange Request**:
   - Icon: 🔧
   - Title: "Maria requested: Power Drill"
   - Message: "Available for pickup?"
   - Time: "3 hours ago"
   - Actions: "Respond" (primary)
   - Badge: "Urgent" (if >24h old)

3. **Overdue Item Return**:
   - Icon: ⏰
   - Title: "Return: Pruning Shears"
   - Message: "Borrowed 5 days ago from Marcus"
   - Badge: "Overdue" (red)
   - Actions: "Mark as Returned"

**Card Design**:
- White background
- Border: 1px solid light gray
- Border radius: 12px
- Padding: 16px
- Shadow: Subtle (0 1px 3px)
- Swipeable: Right = Done, Left = Dismiss
- Tap: Opens detail

**Empty State** (No actions):
- Icon: ✓ (Forest Canopy)
- Text: "No actions needed right now"
- Subtext: "You're all caught up!"

**Updates Section**:
- Heading: "Updates" (18px semibold)
- Collapsible groups by source
- Badge: New count "(3 new)"

**Update Groups** (collapsible):

1. **Official Communications**:
   - Icon: 📢
   - Title: "From Community Leadership"
   - Count: "2 new"
   - Expand: Shows list of announcements
   - Each item: Title, timestamp, "New" badge
   - Tap item: Opens full announcement

2. **Interest Groups** (personalized):
   - Grouped by interest tags
   - Example: "Sustainability" (🌱)
   - Shows relevant updates from that category
   - Sub-groups: Events, discussions, listings

3. **Calendar Reminders**:
   - Upcoming events you RSVP'd to
   - "Tomorrow: Yoga Session at 7 AM"
   - "Friday: Build Day at 9 AM"

**Group Card Design**:
- Collapsed: Single line with icon, title, count, chevron
- Expanded: List of items beneath
- Smooth animation (300ms)
- Indent: 16px for nested items

**Recent Activity Section**:
- Heading: "Recent Activity" (18px semibold)
- Subheading: "What's happening in the community"
- Shows 10 items initially
- Max 20 items total (hard limit for regenerative design)

**Activity Feed Items**:

1. **Check-In**:
   - Avatar (40px, left)
   - Name + action: "Sofia Morales checked in at Tool Library"
   - Quote (if added): "Picking up drill" (italic, gray)
   - Timestamp: "15 min ago"
   - Tap: Opens map at that location

2. **New Listing**:
   - Icon: 📦 (instead of avatar)
   - Title: "Fresh mangoes available"
   - By: "Carmen Rodriguez"
   - Timestamp: "1 hour ago"
   - Tap: Opens listing detail

3. **Event Update**:
   - Icon: 📅
   - Title: "Build Day Saturday"
   - Info: "18 people are attending"
   - Time: "Tomorrow at 9:00 AM"
   - Tap: Opens event details

**Feed Item Design**:
- White background
- Border: 1px solid light gray
- Border radius: 12px
- Padding: 16px
- Vertical stack
- Gap: 16px between items

**Load More** (if >10 items available):
- Button appears after 10th item
- Secondary style: "Load More"
- Icon: Chevron down (16px, left)
- Center-aligned
- Loads next 10 items (max 20 total)
- Disappears when all items loaded or 20 reached

**"You're All Caught Up" State**:
- Appears after last feed item (or after 20 items)
- Icon: ✓ (48px, Forest Canopy)
- Heading: "You're all caught up!" (20px semibold)
- Message: "That's everything new in the community today. Go enjoy the sunshine!"
- Subtext: "Check back this evening or tomorrow for more updates"
- Center-aligned
- Padding: 40px vertical
- Gentle fade-in animation

**Pull-to-Refresh**:
- Pull down on feed: Shows loading spinner
- Text: "Updating..."
- Refresh all sections (Actions, Updates, Feed)
- Success: "Updated just now" toast
- Failure: "Could not refresh. Try again."

**Bottom Navigation**:
- 5 tabs: Home | Map | Calendar | Exchange | AI
- Home tab active (Forest Canopy)
- Always visible

#### Screen 2: Empty State (First Day / No Content)

**Top Bar**: Same as Screen 1

**Personalization Banner**: Shows prominently (if not set)

**Empty State**:
- Icon: 🌱 (64px)
- Heading: "Welcome to your community home" (20px semibold)
- Message: "Your personalized feed will appear here as you engage with the community. Start by exploring the map, checking in, or browsing upcoming events!"
- Max width: 400px, center-aligned
- Line height: 1.6

**Suggested Actions** (buttons):
1. "Explore Map" (primary, full width)
   - Icon: Map (20px, left)
   - Navigates to Map tab
2. "See Calendar" (secondary, full width)
   - Icon: Calendar (20px, left)
   - Navigates to Calendar tab
- Gap: 12px between buttons
- Max width: 320px

**Entrance Animation**:
- Icon: Fade + scale (400ms)
- Heading: Fade in (300ms, delay 100ms)
- Message: Fade in (300ms, delay 200ms)
- Buttons: Slide up + fade (300ms, delay 300ms)

### Edge Cases & Error Handling

**No New Content** (returning user):
- Actions: "No actions needed right now"
- Updates: Each group shows "No new updates" when expanded
- Recent Activity: Shows "You're all caught up!" immediately

**Reached Content Limit** (20 items):
- "Load More" disappears
- Shows celebration state
- "That's everything new in the community today"
- Encourages offline engagement: "Go enjoy the sunshine!"

**Very Few Items** (<5 total):
- Skip "Load More" entirely
- Show celebration after all items
- "The community is quiet today. Great time for a walk!"

**Failed to Load**:
- Shows error per section
- Icon: ⚠️ (24px)
- Text: "Couldn't load [section]. Tap to retry."
- Tap: Retries that section only

**Offline**:
- Banner: "Offline - Showing cached updates from [timestamp]"
- Gray icon in top bar
- Pull-to-refresh shows: "Connect to refresh"

**First Check-In Celebration**:
- Special card appears in feed after user's first check-in
- "Congrats on your first check-in! 🎉"
- Encouragement message
- Auto-dismisses after viewing

### Success Criteria

- ✅ User sees all relevant updates
- ✅ No infinite scroll (max 20 items)
- ✅ Clear "all caught up" state
- ✅ Actions are actionable and dismissible
- ✅ Feed feels calm, not overwhelming

---

## Flow 4: Explore Community Map

**Actor**: Any authenticated user  
**Entry Point**: Map tab or "Explore Map" from Home  
**Goal**: Discover community spaces, see check-ins, explore facilities  
**Success Criteria**: User finds what they're looking for, learns about community

### Flow Steps

#### Screen 1: Map View with Layers

**Top Bar**:
- Search icon (left)
- "Community Map" title (center)
- Layers icon (right, first)
- My location icon (right, second)

**Map Display**:
- Full screen (minus top bar and bottom nav)
- Map type: Satellite with labels (default)
- Gestures: Pan, pinch-zoom, rotate
- Initial view: Centered on community boundaries
- Zoom level: Shows entire community

**Map Controls** (floating overlay, top-right):
- Background: White
- Border radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.12)
- Padding: 8px
- Vertical stack, gap: 8px

**Control Buttons** (40x40px each):
- My Location: Target icon → Centers on user's GPS location
- Zoom In: Plus icon
- Zoom Out: Minus icon
- Map Type: Layers icon → Opens map type selector
- Compass: Shows orientation, tap to reset north

**Map Layers Panel** (slide from right):

**Trigger**: Tap Layers icon

**Panel Design**:
- Slide in from right (300ms)
- Width: 320px (mobile), 400px (desktop)
- Full height
- White background
- Shadow: -2px 0 8px rgba(0,0,0,0.1)

**Panel Content**:

**Header**:
- "Map Layers" (18px semibold)
- X close button (right)
- Padding: 20px

**Layer Groups** (toggles):

1. **Locations**:
   - Community Lots (ON by default)
     - Shows lot boundaries and numbers
   - Facilities (ON by default)
     - Community spaces, tool library, etc.
   - Check-Ins (ON by default)
     - Active check-ins with avatars

2. **Infrastructure**:
   - Roads & Paths (ON)
   - Water Sources (ON)
   - Electrical Access (OFF)

3. **Natural Features**:
   - Tree Canopy (OFF)
   - Topography Lines (OFF)
   - Wildlife Zones (OFF)

**Toggle Design**:
- Switch component
- Label left, toggle right
- Color: Forest Canopy when ON
- Smooth transition
- Changes apply immediately

**Map Type Selector**:
- Satellite (default)
- Standard (street map)
- Terrain
- Hybrid (satellite + labels)
- Radio buttons
- Preview thumbnails

**Map Pins & Markers**:

1. **Lot Boundaries**:
   - Polygon outlines
   - Color: Forest Canopy at 30% opacity
   - Stroke: 2px Forest Canopy
   - Lot number label (center)
   - Tap: Opens lot detail card

2. **Facilities** (predefined POIs):
   - Icon pins:
     - Tool Library: 🔧
     - Community Center: 🏛️
     - Garden: 🌱
     - Pool: 🏊
     - Playground: 🎠
   - Icon size: 32px
   - Background: White circle
   - Border: 2px category color
   - Shadow: 0 2px 6px rgba(0,0,0,0.2)
   - Tap: Opens facility card

3. **Check-Ins** (active users):
   - Avatar photo (44px circular)
   - Border: 3px white, 2px Forest Canopy
   - Shadow: 0 2px 8px rgba(0,0,0,0.3)
   - Your check-in: Sunrise border instead
   - Tap: Opens check-in detail

**Lot Detail Card** (bottom sheet):

**Trigger**: Tap lot boundary or number

**Card Design**:
- Slides up from bottom
- Rounded top corners (16px)
- White background
- Drag handle (top center)

**Content**:
- Lot number (22px bold)
- Address/identifier (14px regular)
- Status badge: Occupied/Available/Reserved
- Current resident info (if occupied and not private):
  - Avatar (48px)
  - Name (16px semibold)
  - "Hide from map" note if privacy enabled
  - Link: "View Profile" (if public)
- Lot details:
  - Size: "2000 m²"
  - Features: Garden, well, solar
- Map thumbnail (static)
- Action: "Get Directions"

**Privacy Handling**:
- If resident has map visibility OFF:
  - Shows lot as "Occupied"
  - No resident name or photo
  - Message: "Resident has chosen not to appear on map"
  - Respects privacy settings

**Facility Detail Card**:

**Similar bottom sheet design**

**Content**:
- Facility name (20px semibold)
- Icon (large, 48px)
- Description (15px regular)
- Hours/availability (if applicable)
- Photos (scrollable gallery)
- Current activity:
  - "2 people checked in here"
  - List of check-ins
- Actions:
  - "Check In Here" (primary)
  - "Get Directions" (secondary)

**Check-In Detail** (see Flow 5 for full details):
- Bottom sheet with user info
- Name, photo, time
- Optional message
- Location details
- "Say Hi" option (future feature)

#### Screen 2: Search & Filter

**Search Bar** (slides down from top):

**Trigger**: Tap search icon

**Design**:
- Full-width input
- Background: White
- Border radius: 12px (top corners)
- Padding: 12px 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Placeholder: "Search lots, facilities, people..."
- Clear button (X) appears when typing
- Cancel button (right) closes search

**Search Results**:
- Appear below search bar
- Group by type:
  - Lots
  - Facilities
  - People (if checked in)
- Each result: Icon, name, location
- Tap: Centers map on result + opens detail card
- Real-time search (debounced)

**Filter Options**:
- "Show only available lots"
- "Hide private residents"
- "Show only active check-ins"
- Checkboxes, toggles apply immediately

### Edge Cases & Error Handling

**No GPS Permission**:
- "My Location" button disabled
- Toast: "Enable location to use this feature"
- Opens app settings link

**GPS Unavailable**:
- "My Location" shows error icon
- Toast: "Can't determine your location"
- Fallback: Centers on community center

**No Check-Ins**:
- Map shows lots and facilities only
- Message in layers panel: "No active check-ins"

**Offline**:
- Shows cached map tiles
- Banner: "Offline - Map data may be outdated"
- Check-ins not available
- Lot data from cache

**Privacy Mode**:
- User's own lot shows with indicator
- "You're hidden from map" note
- Toggle to change visibility

**Very Zoomed Out**:
- Cluster check-ins: "5 check-ins"
- Cluster lots by area
- Zoom in to see detail

### Success Criteria

- ✅ User can navigate map smoothly
- ✅ All facilities and lots visible
- ✅ Check-ins update in real-time
- ✅ Privacy settings respected
- ✅ Search finds relevant results quickly

---

## Flow 5: Create Check-In

**Actor**: Any authenticated user  
**Entry Point**: + button on Map tab or Home quick actions  
**Goal**: Share current location/activity with community  
**Success Criteria**: Check-in posted to map and feed within 2 seconds

### Flow Steps

#### Screen 1: Check-In Creation

**Entry Points**:
1. Map tab → Floating + button (bottom-right)
2. Home → Quick actions → "Check In"
3. Map → Long-press location → "Check in here"

**Screen Design**:
- Bottom sheet modal
- Rounded top corners (16px)
- White background
- Drag handle (top center)
- Height: 80% screen
- Dismissible: Swipe down or tap outside

**Content**:

**Header**:
- Icon: 📍 (24px, left)
- Title: "Check In" (20px semibold)
- X close button (right)
- Padding: 20px bottom border

**Location Selector**:
- Current location auto-detected (GPS)
- Shows on mini-map (200px height)
- User marker (blue dot pulsing)
- Accuracy circle

**Location Options** (radio buttons):
1. **Current Location** (default)
   - Icon: GPS target
   - Label: "Where I am now"
   - Address: Auto-reverse geocoded
   - Accuracy: "±10 meters"

2. **Nearby Facility**
   - Icon: 🏛️
   - Dropdown: List of community facilities
   - Options: Tool Library, Garden, Pool, etc.
   - Updates map preview

3. **My Lot**
   - Icon: 🏡
   - Label: "Lot #[number]"
   - Quick shortcut

4. **Custom Location**
   - Icon: 📍
   - Label: "Choose on map"
   - Opens full map picker

**Photo** (optional):
- Camera icon button
- "Add Photo" text
- Tap: Opens camera/gallery
- Shows thumbnail preview after upload
- X to remove
- Max 1 photo per check-in

**Message** (optional):
- Textarea: "What are you up to?" placeholder
- Character limit: 280
- Counter appears at 200 chars
- Emoji picker button

**Duration** (required):
- Label: "How long will you be here?"
- Chips (single select):
  - "30 min" (default)
  - "1 hour"
  - "2 hours"
  - "Custom" → Time picker
- Auto-expire after duration

**Visibility** (toggle):
- Default: ON (public to community)
- Label: "Visible on community map"
- Helper: "Others can see this check-in"
- OFF: Only visible to you (private log)

**Action Buttons**:
- "Cancel" (secondary, left)
- "Post Check-In" (primary, right)
- Bottom bar, always visible
- Disabled until location valid

#### Screen 2: Success & Confirmation

**Success Animation**:
- Check-in posted instantly
- Checkmark animation (500ms)
- Toast: "Checked in!" (2s duration)
- Bottom sheet dismisses
- Map updates with new pin

**Immediate Effects**:
1. **Map Tab**:
   - Your check-in appears as pin
   - Pulsing animation (first 5s)
   - Border: Sunrise color (your check-ins)

2. **Home Feed**:
   - Appears in Recent Activity
   - "You checked in at [location]"
   - Your avatar + timestamp

3. **Notifications**:
   - Nearby neighbors get notification (if enabled)
   - "Sofia checked in at Tool Library"
   - Tap: Opens map at location

#### Screen 3: Active Check-In Management

**View Your Check-In**:
- Tap your pin on map
- Bottom sheet opens

**Content**:
- Your avatar (64px)
- Location name (18px semibold)
- Time: "10 minutes ago"
- Message (if added)
- Photo (if added)
- Remaining time: "20 min remaining"

**Actions**:
- "End Check-In Early" (secondary)
- "Edit" (secondary)
- "Delete" (text link, bottom)

**Edit Check-In**:
- Opens same form as creation
- Can change:
  - Message
  - Photo
  - Duration (extend or shorten)
- Cannot change: Location
- Save: Updates immediately

**End Early**:
- Confirmation: "End this check-in?"
- Options: "Yes, end" | "Cancel"
- Removes from map immediately
- Stays in history (profile only)

#### Screen 4: Check-In Notification

**Push Notification**:
- Title: "Marcus checked in nearby 📍"
- Body: "At Community Garden - 'Harvesting tomatoes'"
- Tap: Opens map at that location

**In-App (Home Feed)**:
- Appears in Actions or Recent Activity
- Card design: White background, border
- Content:
  - Icon: 📍
  - Text: "Marcus checked in at Community Garden"
  - Subtext: "2 minutes ago"
  - Quote (if added): "Harvesting tomatoes"
  - Right arrow: Navigate to map

**Map Integration**:
- When navigating from notification:
  - Map centers on check-in location
  - Bottom sheet auto-opens
  - Check-in card highlighted

### Edge Cases & Error Handling

**No GPS Permission**:
- Cannot auto-detect location
- Defaults to "Choose on map"
- Prompt: "Enable location for easier check-ins"

**GPS Inaccurate**:
- Shows accuracy warning: "Location may be off by 50m"
- User can choose "Custom Location" instead
- Allow override

**Network Error**:
- Shows loading state (spinner)
- Timeout after 10s
- Error: "Could not post check-in. Try again?"
- Cached locally, retries automatically

**Offline**:
- Check-in saved locally
- Banner: "Offline - Will post when connected"
- Syncs automatically when online

**Expired Check-In**:
- Auto-removes from map after duration
- Notification: "Your check-in at [location] has ended"
- Stays in your history

**Concurrent Check-In**:
- User can only have 1 active check-in
- If creating new: "You're already checked in at [location]"
- Options: "End current & check in here" | "Cancel"

**Photo Upload Failure**:
- Shows error: "Photo failed to upload"
- Check-in posts without photo
- Offer to retry upload

**Privacy Toggle Changed Mid-Check-In**:
- If user disables map visibility after check-in:
  - Existing check-in stays visible until expiry
  - Warning: "This check-in is still visible. End it?"

### Success Criteria

- ✅ Check-in appears on map within 2s
- ✅ Visible in home feed immediately
- ✅ Nearby users notified (if settings allow)
- ✅ Auto-expires after selected duration
- ✅ Privacy settings respected

---

## Flow 6: Create Event

**Actor**: Any authenticated user (residents can create, official events need approval)  
**Entry Point**: + button on Calendar tab  
**Goal**: Create community event and invite neighbors  
**Success Criteria**: Event published and visible on calendar

### Flow Steps

#### Screen 1: Event Creation Form

**Entry Point**: Calendar tab → Floating + button

**Screen Design**:
- Full screen modal
- White background
- Top bar: "Cancel" (left) | "Create Event" (center) | "Preview" (right)
- Scrollable form

**Event Type Selection** (first choice):
- Two large cards (mutually exclusive):

**1. Official Event**:
- Icon: 🏛️
- Title: "Official Event"
- Description: "Community-wide event (requires admin approval)"
- Badge: "Needs approval"
- Border: River Current when selected

**2. Resident Event**:
- Icon: 🎉
- Title: "Resident Event"
- Description: "Organized by community members (publishes immediately)"
- Badge: "Auto-publish"
- Border: Forest Canopy when selected

**Helper**: "Official events appear in 'Community Calendar'. Resident events in 'Resident Activities'."

**Form Fields**:

**1. Event Title** (required):
- Text input
- Placeholder: "e.g., Community Potluck, Yoga Session, Trail Maintenance"
- Max 100 characters
- Character counter appears at 80

**2. Category** (required):
- Dropdown or chip selection:
  - Social 🎉
  - Governance 🏛️
  - Workshop 🔨
  - Sports ⚽
  - Culture 🎨
  - Wellness 🧘
  - Work Party 💪
  - Other 📌
- Icon + label
- Single select

**3. Description** (required):
- Textarea
- Placeholder: "Share what people can expect, what to bring, or any special instructions"
- Min 20 chars, max 1000 chars
- Rich text: Bold, italic, lists
- Character counter

**4. Date & Time** (required):
- Date picker: Calendar view
- Start time: Time picker (12h or 24h based on locale)
- End time: Time picker
- All-day toggle: Hides time pickers
- Multi-day toggle: Shows end date
- Validation: End must be after start

**5. Location** (required):
- Options (radio):
  1. **Predefined Location**:
     - Dropdown: Community facilities
     - Tool Library, Garden, Pool, etc.
     - Shows on map when selected
  
  2. **Custom Location**:
     - Text input: "e.g., By the swimming hole in the river"
     - Additional details field
     - "Add to map" button → Opens map picker
  
  3. **Virtual/Online**:
     - Text input: Meeting link
     - Icon: 💻

**6. RSVP Settings** (toggle):
- Default: ON
- Label: "Require RSVPs"
- Sub-options (when ON):
  - Max attendees: Number input (optional)
  - RSVP deadline: Date picker (optional)
  - Guest/Plus-one: Allow toggle

**7. Visibility** (required):
- Options (radio):
  1. **Public** (default):
     - "All community members"
  2. **Private**:
     - "Invite specific people"
     - Opens people picker
     - Search and select residents
     - Shows selected (removable chips)
  3. **Interest-based**:
     - "People interested in [category]"
     - Uses event category

**8. Recurrence** (optional):
- Toggle: "Repeat this event"
- When ON:
  - Frequency: Daily/Weekly/Monthly/Custom
  - Repeat until: Date or occurrence count
  - Preview: "Creates 12 recurring events"

**9. Photo/Cover** (optional):
- Upload area
- Aspect ratio: 16:9
- Recommended: 1200x675px
- Tap: Camera/gallery
- Shows preview

**10. Exchange Link** (optional):
- Toggle: "Link to Exchange"
- Search exchange listings
- "Need tools for this event?"
- Select relevant items
- Creates auto-link

**11. Organizer Contact** (auto-filled):
- Your name and avatar
- Email (shown to attendees)
- Optional: Co-organizers
- Add: Opens people picker

**12. Additional Notes** (optional):
- Textarea
- "Anything else attendees should know?"
- Max 500 chars

**Bottom Actions**:
- "Save as Draft" (secondary, left) - future feature
- "Preview Event" (secondary)
- "Publish Event" or "Submit for Approval" (primary, right)

**Draft Auto-Save**:
- Saves progress every 30s
- "Saved" indicator (top-right)
- Can exit and resume later

#### Screen 2: Event Preview

**Trigger**: Tap "Preview" button

**Modal Design**:
- Full screen
- Mimics actual event detail view
- Shows how it will appear to attendees

**Preview Content**:
- Cover photo (if added)
- Event title (28px bold)
- Type badge: Official or Resident
- Category icon + label
- Date & time (large, prominent)
- Location (with map if applicable)
- Description (formatted)
- RSVP button (simulated)
- Organizer info
- All details as they'll appear

**Preview Actions**:
- "Edit" (top-right)
- "Publish" or "Submit" (bottom)
- "Back to editing" (top-left)

#### Screen 3: Publication Confirmation

**If Resident Event** (auto-publish):

**Success Modal**:
- Checkmark animation
- "Event Published!" (22px bold)
- "Your event is now live on the community calendar"
- Preview card of event
- Actions:
  - "View on Calendar" (primary)
  - "Create Another Event" (secondary)
  - "Share Event" (future feature)
- Auto-dismiss: 8s

**If Official Event** (needs approval):

**Submitted Modal**:
- Icon: 📨 (sent)
- "Event Submitted for Approval!" (22px bold)
- "An admin will review your event within 24 hours"
- "You'll be notified when it's approved or if changes are needed"
- Actions:
  - "View My Events" (primary)
  - "Create Another Event" (secondary)

**Notification Sent**:
- To: All admins
- Subject: "New official event pending approval"
- Body: Event title + organizer
- Action: Review

### Edge Cases & Error Handling

**Past Date Selected**:
- Warning modal: "This date is in the past. Is this intentional?"
- Options: "Change Date" | "Continue Anyway"
- Allows historical events (rare)

**Time Conflict with Existing Event**:
- Warning: "Another event exists at this time/location"
- Shows conflicting event card
- Options: "Change Time" | "Continue Anyway"
- Multiple events can overlap (community choice)

**Recurring Event Edge Cases**:
- User sets "Weekly for 1 year" = 52 events
- Confirmation: "This will create 52 recurring events. Confirm?"
- Option to edit all instances or individual later
- Limit: Max 100 recurrences

**Network Error During Publishing**:
- Shows loading spinner
- Timeout: 15s
- Error: "Could not publish event. Try again?"
- Draft saved automatically
- "Retry" | "Cancel"

**Offline**:
- Cannot publish while offline
- Banner: "Offline - Connect to publish"
- Saves as draft automatically
- Auto-publishes when connected

**Exceed Max Attendees**:
- User sets max 20, but 25 already RSVP'd
- Error: "Current RSVPs (25) exceed your limit (20)"
- Options: "Increase limit" | "Keep current"

**Photo Upload Failure**:
- Event publishes without photo
- Toast: "Event published, but photo failed to upload"
- "Retry upload" option in event edit

**Duplicate Event Detection**:
- If similar event exists (same title, close time):
- Warning: "Similar event exists: [Event Title]"
- "View event" | "Continue anyway"

### Success Criteria

- ✅ Event appears on calendar
- ✅ Attendees can RSVP
- ✅ Visible to intended audience
- ✅ Notifications sent (if settings allow)
- ✅ Official events await approval
- ✅ Resident events publish immediately

---

## Flow 7: Event Moderation (Admin)

**Actor**: Administrator or Coordinator with moderation permissions  
**Entry Point**: Admin Backoffice → Event Management  
**Goal**: Review, approve, edit, or flag events  
**Success Criteria**: Event appropriately moderated, organizer notified

### Flow Steps

#### Screen 1: Event Moderation Dashboard

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

#### Screen 2: Event Detail Panel

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

#### Screen 3: Approve Event

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

#### Screen 4: Flag Event for Review

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

#### Screen 5: Message Organizer

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

#### Screen 6: Edit Event (Admin Override)

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

#### Screen 7: Cancel Event

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

#### Screen 8: Delete Event

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

### Edge Cases & Error Handling

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

### Success Criteria

- ✅ All events reviewed within 24h
- ✅ Organizers notified of decisions
- ✅ Conflicts detected and flagged
- ✅ Audit trail complete
- ✅ Community calendar accurate

---

## Flow 8: Create Exchange Listing

**Actor**: Any authenticated user  
**Entry Point**: + button on Exchange tab  
**Goal**: List item or service for lending/sharing  
**Success Criteria**: Listing published and searchable

### Flow Steps

#### Screen 1: Listing Creation Form

**Entry Point**: Exchange tab → Floating + button

**Screen Design**:
- Full screen modal
- White background
- Top bar: "Cancel" (left) | "New Listing" (center)
- Scrollable form

**Form Fields**:

**1. Category** (required, first choice):
- Large chips/cards:
  - 🔧 Tool
  - 🌱 Seed
  - 🥕 Harvest
  - 🤝 Service
  - 📦 Other
- Icon + label
- Selected: Forest Canopy border
- Single select

**2. Photos** (required, at least 1):
- Upload area: 1-5 photos
- First photo = cover
- Drag to reorder
- Tap: Camera/gallery
- Grid preview
- X to remove

**3. Title** (required):
- Text input
- Placeholder: "e.g., Cordless Drill, Tomato Seeds, Fresh Mangoes"
- Max 100 chars
- Character counter at 80

**4. Description** (required):
- Textarea
- Placeholder: "Describe the item, condition, and any important details..."
- Min 20 chars, max 1000 chars
- Rich text: Bold, italic, lists
- Character counter

**5. Condition** (required for physical items):
- Dropdown:
  - New
  - Like New
  - Good
  - Fair
  - For Parts
- Not shown for Services

**6. Availability** (required):
- Date range picker
- Start: Today (default)
- End: Optional (leave open-ended)
- "Available indefinitely" checkbox

**7. Quantity** (required):
- Number input
- Default: 1
- Max: 999
- Helper: "How many available"
- For services: "Sessions/slots"

**8. Lending Preferences**:
- **Pickup/Delivery** (radio):
  - Pickup only
  - Delivery available (within community)
  - Either
- **Duration Limit** (optional):
  - Max days: Number input
  - "Suggest return by" helper
  - Not enforced, guidance only
- **Deposit** (optional):
  - Toggle: "Request deposit"
  - Amount: Currency input
  - Helper: "Refundable when returned"

**9. Location** (required):
- Options:
  1. My lot (default)
  2. Custom location:
     - Text input
     - "Where to pick up"
  3. Map picker:
     - Pin on map

**10. Contact Preferences**:
- Auto-filled from profile
- Email (shown to requesters)
- Phone (optional)
- Preferred method: Dropdown

**11. Tags** (optional):
- Tag input with autocomplete
- Suggestions based on category
- Custom tags allowed
- Max 10 tags
- Examples:
  - "Power tools", "Makita", "Cordless"
  - "Heirloom", "Organic", "Cherry tomatoes"

**12. Special Instructions** (optional):
- Textarea
- "Anything else borrowers should know?"
- Max 500 chars
- Examples:
  - "Please return cleaned"
  - "Batteries not included"

**Bottom Actions**:
- "Save as Draft" (secondary) - future
- "Preview" (secondary)
- "Publish Listing" (primary)

#### Screen 2: Preview Listing

**Trigger**: Tap "Preview"

**Modal Design**:
- Full screen
- Mimics actual listing detail view
- Shows how it appears to browsers

**Preview Content**:
- Photo gallery (swipeable)
- Category badge
- Title (24px bold)
- Condition badge (if applicable)
- Availability dates
- Description (formatted)
- Owner info (your profile)
- "Request to Borrow" button (simulated)
- All details as they'll appear

**Preview Actions**:
- "Edit" (top-right)
- "Publish" (bottom)
- "Back" (top-left)

#### Screen 3: Publication Success

**Success Modal**:
- Checkmark animation
- "Listing Published!" (22px bold)
- "Your item is now available to borrow"
- Preview card of listing
- Actions:
  - "View Listing" (primary)
  - "Share Listing" (secondary)
  - "Create Another" (text link)
- Auto-dismiss: 5s

**Immediate Effects**:
1. **Exchange Tab**:
   - Listing appears in search
   - "New" badge first 24h
   - Your listing section

2. **Home Feed**:
   - "You listed [item] on Exchange"
   - Appears in Recent Activity

3. **Notifications**:
   - Interested users get notification
   - "New [category]: [item]"
   - Based on tags/interests

### Edge Cases & Error Handling

**Photo Upload Failure**:
- Shows error on failed photo
- Red X overlay
- "Tap to retry"
- Can publish without (warning)

**Network Error**:
- Loading state (spinner)
- Timeout: 10s
- Error: "Could not publish. Try again?"
- Saves as draft automatically

**Offline**:
- Cannot publish
- Banner: "Offline - Connect to publish"
- Auto-saves as draft
- Auto-publishes when connected

**Duplicate Detection**:
- If similar listing exists:
- Warning: "You have a similar listing: [Title]"
- "View listing" | "Continue anyway"

**Invalid Data**:
- Missing required fields:
  - Highlights in red
  - Scrolls to first error
  - Clear error message
- Photo format invalid:
  - "This file type is not supported"
  - Accepts: JPG, PNG, HEIC

**Quantity Exceeded**:
- If listing quantity 1, but 2 requests:
- Auto-marks as unavailable
- Notification to lister
- "Mark as available" button

### Success Criteria

- ✅ Listing appears in search
- ✅ Photos uploaded successfully
- ✅ Borrowers can request
- ✅ Owner receives notifications
- ✅ Listing editable anytime

---

## Flow 9: Browse & Borrow Exchange Listings

**Actor**: Any authenticated user  
**Entry Point**: Exchange tab  
**Goal**: Find and request to borrow items  
**Success Criteria**: Request sent to owner, tracking active

### Flow Steps

#### Screen 1: Exchange Browse View

**Top Bar**:
- "Exchange" title (left)
- Search icon (right, first)
- Filter icon (right, second)

**Search Bar** (always visible):
- Placeholder: "Search items, seeds, services..."
- Icon: 🔍 (left)
- Clear button (X) when typing
- Real-time search (debounced)

**Category Chips** (horizontal scroll):
- All (default, shows count)
- 🔧 Tools
- 🌱 Seeds
- 🥕 Harvest
- 🤝 Services
- 📦 Other
- Tap: Filters to category
- Selected: Forest Canopy background

**Filter Panel** (slide from right):

**Filter Options**:
- Category: Multi-select checkboxes
- Availability: Now / This week / This month / Anytime
- Condition: Multi-select
- Distance: Slider (0-2km from my lot)
- Owner: Exclude my listings
- Sort by:
  - Newest first (default)
  - Distance
  - Popularity
  - Name (A-Z)

**Active Filters Display**:
- Shows below category chips
- "3 filters active" badge
- Each filter: Removable chip
- "Clear all" button

**Listing Grid**:
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Gap: 16px
- Responsive masonry layout

**Listing Card**:
- Photo (aspect 1:1, cover)
- "New" badge (if <24h old)
- Category icon (overlay, top-left)
- Availability indicator:
  - Green dot: Available now
  - Orange: Reserved
  - Gray: Unavailable
- Title (16px semibold, 2 lines max)
- Owner avatar (24px, bottom-left)
- Distance: "0.3 km away"
- Tap anywhere: Opens detail

**Empty States**:
- No results: "No items found. Try different filters."
- No listings: "No items available yet. Be the first to list!"
- Search no results: "No results for '[query]'. Clear search?"

**Load More**:
- Shows after 20 listings
- "Load More" button (secondary)
- Infinite scroll option (settings)
- Max: 100 items (pagination beyond)

#### Screen 2: Listing Detail View

**Trigger**: Tap listing card

**Screen Design**:
- Full screen
- White background
- Top bar: Back arrow (left) | "•••" menu (right)

**Photo Gallery**:
- Full width, swipeable
- Dots indicator (current/total)
- Pinch to zoom
- Tap: Fullscreen lightbox

**Content Sections**:

**1. Header**:
- Category badge (small)
- Title (24px bold)
- Condition badge (if applicable)
- Owner info:
  - Avatar (48px)
  - Name (16px semibold)
  - Location: "0.3 km away"
  - "View Profile" link

**2. Availability**:
- Status indicator:
  - ✅ Available (green)
  - ⏳ Reserved (orange)
  - ❌ Unavailable (gray)
- Dates: "Available now - Dec 31"
- Quantity: "1 of 1 available"
- Calendar view (future feature)

**3. Description**:
- Full text
- Formatted (bold, lists, etc.)
- "Read more" expansion if >300 chars

**4. Details**:
- Condition: Badge + description
- Quantity: Number available
- Location: Map thumbnail (tap: Full map)
- Pickup/Delivery: Icons + text
- Duration limit: "Max 7 days" (if set)
- Deposit: Amount (if required)

**5. Tags**:
- Chips (read-only)
- Related: "See similar items" link

**6. Special Instructions**:
- If provided by owner
- Icon: ℹ️
- Text: Owner's notes

**7. Activity** (if applicable):
- "Currently borrowed by [Name]" (if you're owner)
- "You borrowed this on [Date]" (if you're borrower)
- Return due date

**Action Bar** (sticky bottom):

**Primary Action** (changes by status):
- Available: "Request to Borrow" (primary, full width)
- Reserved: "Request to Join Waitlist" (secondary)
- Unavailable: Disabled, gray
- Your listing: "Edit Listing"
- Already borrowed: "Return Item"

**Secondary Actions** (icon buttons):
- Favorite/Bookmark: Heart icon
- Share: Share icon
- Report: Flag icon

#### Screen 3: Request to Borrow

**Trigger**: Tap "Request to Borrow"

**Modal Design**:
- Bottom sheet (mobile)
- Centered dialog (desktop)
- Max width: 480px

**Content**:
- Listing preview card (photo + title)
- Owner name
- "Send request to [Owner Name]"

**Form Fields**:

**1. Borrow Dates** (required):
- Start date: Picker (default: Tomorrow)
- End date: Picker
- Helper: "When do you need this?"
- Validation: Within availability window

**2. Purpose** (optional but encouraged):
- Textarea
- Placeholder: "What will you use this for? (optional)"
- Max 280 chars
- Helper: "Helps owner prioritize requests"

**3. Pickup Preference** (if applicable):
- Radio: Pickup / Delivery / Either
- Based on listing settings

**4. Contact Info**:
- Pre-filled from profile
- Email (read-only)
- Phone (editable)

**5. Deposit Agreement** (if required):
- Checkbox: "I agree to pay $[amount] deposit"
- Helper: "Refunded when returned in good condition"
- Must check to proceed

**Actions**:
- "Cancel" (secondary)
- "Send Request" (primary)

**Success**:
- Checkmark animation
- Toast: "Request sent to [Owner]!"
- "You'll be notified when they respond"
- Returns to listing detail

#### Screen 4: Request Management (Owner View)

**Entry Point**: Notification → "View Request"

**Screen**: Same as listing detail

**New Section**: "Pending Requests"
- Shows all active requests
- Each request card:
  - Requester avatar + name
  - Dates requested
  - Purpose/message
  - Time ago: "2 hours ago"
  - Actions:
    - "Approve" (green)
    - "Decline" (gray)
    - "Message" (icon)

**Approve Action**:
- Confirmation: "Approve request?"
- Shows requester info
- Confirms dates
- Checkbox: "Notify borrower"
- "Approve" button

**Success**:
- Toast: "Request approved!"
- Borrower notified
- Listing status: Reserved
- Calendar event created (both users)
- Other requests: Auto-declined

**Decline Action**:
- Optional reason:
  - Already borrowed
  - Dates not available
  - Other (custom message)
- Checkbox: "Notify borrower"
- "Decline Request"

**Success**:
- Toast: "Request declined"
- Notification sent (if checked)
- Request removed

#### Screen 5: Active Borrow Tracking

**Entry Point**: Notification → "Track Borrowing"

**Screen Design**:
- Full screen or modal
- Shows active borrow status

**Content**:

**Borrower View**:
- Item photo + title
- Owner info
- Pickup: Location + date
- Return due: Date + countdown
- Status: Picked up / Not yet picked up
- Deposit: Amount held
- Actions:
  - "Mark as Picked Up"
  - "Mark as Returned"
  - "Request Extension"
  - "Message Owner"

**Owner View**:
- Item photo + title
- Borrower info
- Borrowed: Date range
- Status: Out / Returned
- Deposit: Held / Released
- Actions:
  - "Mark as Returned"
  - "Report Issue"
  - "Message Borrower"

**Mark as Returned**:
- Confirmation modal
- Checkbox: "Item returned in good condition"
- Checkbox: "Release deposit"
- Photos (optional): Document condition
- "Confirm Return"

**Success**:
- Toast: "Item marked as returned"
- Deposit released (if checked)
- Both users notified
- Listing: Available again
- Request to rate/review (future)

### Edge Cases & Error Handling

**No Listings Available**:
- Empty state with helpful message
- "No items match your search"
- Suggestions:
  - Clear filters
  - Browse all categories
  - Be first to list

**Owner Deletes Listing During Request**:
- Notification to requester
- "This listing is no longer available"
- Request auto-cancelled

**Overdue Return**:
- Notification to borrower (1 day before)
- Reminder: "Return [item] by tomorrow"
- After due date:
  - Notification to owner
  - "Mark as overdue" option
  - Flag in system (not punitive)

**Owner Doesn't Respond**:
- Auto-expire request after 48h
- Notification to requester
- "Owner didn't respond in time"
- Listing stays available

**Concurrent Requests**:
- Multiple requests for 1 item
- Queue system (not first-come)
- Owner sees all, picks best match
- Others auto-declined when one approved

**Network Error**:
- Request cached locally
- "Request saved, will send when online"
- Auto-retry when connected

**Deposit Payment Failure** (future feature):
- "Payment method declined"
- Options: Update payment | Cancel request

### Success Criteria

- ✅ User finds desired item
- ✅ Request sent successfully
- ✅ Owner notified of request
- ✅ Borrow/return tracked accurately
- ✅ Deposit handled correctly

---

## Flow 10: Exchange Listing Moderation (Admin)

**Actor**: Administrator or Coordinator with moderation permissions  
**Entry Point**: Admin Backoffice → Exchange Management  
**Goal**: Review, approve, edit, or remove listings  
**Success Criteria**: Listings appropriately moderated, owners notified

### Flow Steps

#### Screen 1: Exchange Moderation Dashboard

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

#### Screen 2: Listing Detail Panel

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

#### Screen 3: Flag Listing

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

#### Screen 4: Remove Listing

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

#### Screen 5: Delete Listing

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

### Edge Cases & Error Handling

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

### Success Criteria

- ✅ All flagged listings reviewed
- ✅ Owners notified of actions
- ✅ Community guidelines enforced
- ✅ Audit trail complete
- ✅ Exchange remains healthy

---

## Flow 11: AI Chat Assistant

**Actor**: Any authenticated user  
**Entry Point**: AI Assistant tab or quick action  
**Goal**: Get help, ask questions, find information  
**Success Criteria**: User receives helpful, accurate response

### Flow Steps

#### Screen 1: AI Chat Interface

**Entry Point**: Bottom nav → AI Assistant tab

**Top Bar**:
- "AI Assistant" title (left)
- "•••" menu (right):
  - New conversation
  - Conversation history
  - Settings
  - Help & feedback

**Chat Display** (main area):
- White/light background
- Messages stack vertically
- Auto-scroll to latest
- Pull to load more history

**Message Types**:

**1. User Message**:
- Right-aligned
- Background: Forest Canopy
- Text: White
- Border radius: 18px (top-left, top-right, bottom-left)
- Max width: 80%
- Padding: 12px 16px
- Timestamp: Below, right-aligned, gray, 12px
- Your avatar: 32px circle (right side)

**2. AI Response**:
- Left-aligned
- Background: Cloud (#F8F6F3)
- Text: Soil (#1A1A1A)
- Border radius: 18px (all except bottom-left)
- Max width: 80%
- Padding: 12px 16px
- AI avatar: 🤖 (32px circle, left)
- Markdown support: Bold, italic, lists, code blocks
- Timestamp: Below, left-aligned, gray

**3. Typing Indicator**:
- Shows when AI is processing
- Three animated dots
- Background: Cloud
- Left-aligned with AI avatar
- Smooth fade in/out

**4. Suggested Actions** (after AI response):
- Horizontal chips below AI message
- Examples:
  - "Tell me more"
  - "Show on map"
  - "Add to calendar"
  - "Find related events"
- Tap: Sends as new message
- Max 3 suggestions

**Input Area** (bottom, sticky):

**Composition**:
- White background
- Border top: 1px solid Sand
- Padding: 12px 16px
- Safe area inset (bottom)

**Text Input**:
- Multiline textarea
- Placeholder: "Ask me anything about the community..."
- Auto-expand (max 5 lines)
- Character limit: 2000
- Counter shows at 1800

**Input Controls**:
- Voice input button (left):
  - Microphone icon
  - Tap: Start voice recording
  - Hold: Record while held
  - Red pulse when active
- Attachment button (optional, future):
  - Paperclip icon
  - Upload images/files
- Send button (right):
  - Arrow/send icon
  - Disabled when empty
  - Forest Canopy when enabled
  - Tap: Send message

**Voice Input Modal**:

**Trigger**: Tap microphone button

**Design**:
- Full screen overlay
- Semi-transparent dark background
- Centered card

**Content**:
- Large microphone icon (pulsing)
- "Listening..." text
- Waveform visualization
- Live transcription (optional)
- Timer: "0:23"

**Controls**:
- "Cancel" (text link, top)
- Tap outside: Cancel
- Release: Send transcription
- Swipe up: Lock recording

#### Screen 2: Conversation History

**Trigger**: Menu → "Conversation history"

**Design**:
- Full screen
- White background
- List of past conversations

**Top Bar**:
- "Back" arrow (left)
- "Conversations" title (center)
- Search icon (right)

**Conversation List**:

**Each Conversation Card**:
- First message preview
- Timestamp: "2 hours ago"
- Message count: "(8 messages)"
- Tap: Opens conversation
- Swipe left: Delete

**Actions**:
- Tap: Resume conversation
- Long press: Context menu
  - Resume
  - Rename
  - Delete

**Empty State**:
- Icon: 💬
- "No conversation history yet"
- "Start chatting to see your conversations here"

#### Screen 3: Quick Actions

**Entry Point**: Home → AI quick actions

**Quick Action Buttons**:

1. **"What's happening today?"**
   - Pre-fills prompt
   - Auto-sends
   - Shows today's events, check-ins, updates

2. **"Find tools to borrow"**
   - Opens AI chat
   - Pre-fills: "Show me available tools"
   - AI lists exchange items

3. **"When is the next event?"**
   - Quick query
   - AI responds with next 3 events
   - Add to calendar buttons

4. **"Who can help with [skill]?"**
   - Input: Skill name
   - AI searches user profiles
   - Shows list with contact info

**Quick Action Design**:
- Horizontal scroll (Home screen)
- Card style
- Icon + label
- Tap: Executes action
- Max 6 actions visible

#### Screen 4: AI Response Types

**Text Response**:
- Standard message bubble
- Markdown formatted
- Links: Underlined, River Current
- Tap link: Opens in-app or browser

**List Response**:
- Structured data
- Numbered or bulleted
- Each item clickable
- Actions: Tap to expand

**Card Response** (rich content):
- Event card: Photo, title, date, RSVP button
- Listing card: Photo, title, owner, "Request" button
- User card: Avatar, name, skills, "View profile"
- Location card: Map preview, address, "Get directions"

**Multiple Choice**:
- Question from AI
- Chip buttons for options
- Tap: Selects and sends

**Error Response**:
- Icon: ⚠️
- Message: "I couldn't process that"
- Suggestions: Rephrase or try again
- "Report issue" link

### Edge Cases & Error Handling

**No Internet Connection**:
- Banner: "Offline - AI Assistant unavailable"
- Previous messages cached (read-only)
- Cannot send new messages
- Auto-reconnect when online

**AI Service Down**:
- Error message: "Assistant temporarily unavailable"
- Suggestion: "Try again in a few minutes"
- Fallback: Link to help docs

**Inappropriate Content**:
- AI detects harmful request
- Response: "I can't help with that"
- Explanation: Community guidelines
- Link to appropriate resource

**Ambiguous Query**:
- AI asks clarifying questions
- Multiple choice options
- "Did you mean..." suggestions

**Very Long Response**:
- Truncate after 500 words
- "Read more" button
- Expands in-place

**Voice Input Fails**:
- Error: "Could not transcribe"
- Options: Try again | Type instead
- Shows what was captured (if partial)

**Rate Limiting**:
- User exceeds message limit
- Message: "You've sent many messages recently"
- Cooldown: "Try again in 5 minutes"
- Shows countdown timer

**Context Lost**:
- Long conversation (>50 messages)
- AI suggests: "Start new conversation?"
- Option to continue or start fresh

### Success Criteria

- ✅ User gets helpful response within 3 seconds
- ✅ AI understands natural language queries
- ✅ Responses are accurate and actionable
- ✅ Links work and navigate correctly
- ✅ Voice input transcribes accurately

---

## Flow 12: User & Community Management (Admin)

**Actor**: Super Admin or Community Manager  
**Entry Point**: Admin Backoffice → User Management  
**Goal**: Manage users, permissions, communities, and platform settings  
**Success Criteria**: User/community changes applied, system updated

### Flow Steps

#### Screen 1: User Directory

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

#### Screen 2: User Detail Panel

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

#### Tab 1: Profile Info

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

#### Tab 2: Activity History

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

#### Tab 3: Permissions & Roles

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

#### Tab 4: Family Accounts

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

#### Screen 3: Edit User Mode

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

#### Screen 4: Send Notification

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

#### Screen 5: Deactivate User

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

#### Screen 6: Delete User

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

#### Screen 7: Bulk User Import

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

### Edge Cases & Error Handling

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

### Success Criteria

- ✅ All users manageable from one interface
- ✅ Permissions accurate and enforced
- ✅ Audit trail complete for all admin actions
- ✅ Bulk operations work correctly
- ✅ User data protected and privacy respected

---

## Conclusion

All 12 primary user flows are now comprehensively documented, covering:

- Complete onboarding journey (Flows 0-2)
- Core user experiences (Flows 3-6)
- Administrative workflows (Flows 7, 10, 12)
- Exchange system (Flows 8-9)
- AI assistance (Flow 11)

These flows provide detailed specifications for development and design, including edge cases, error handling, and success criteria for each user interaction.