# Flow 1: Account Activation & Onboarding

**Actor**: New Resident  
**Entry Point**: Email invitation link from admin  
**Goal**: Activate account and complete profile setup  
**Success Criteria**: Profile 80% complete, ready to use core features

## Flow Steps

### Screen 1: Password Setup

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

### Screen 2: About You (Profile Basics)

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

### Screen 3: Journey Stage Selection

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

### Screen 4: Your Interests

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

### Screen 5: Share Your Skills

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

### Screen 6: Notifications & Privacy

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

### Screen 7: Welcome Tour (Optional Overlay)

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

## Edge Cases & Error Handling

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

## Success Criteria

- ✅ Account activated with password
- ✅ Profile photo added (optional)
- ✅ Basic profile info complete
- ✅ Journey stage selected
- ✅ At least 3 interests chosen
- ✅ Notification preferences set
- ✅ User lands on Home dashboard

---
