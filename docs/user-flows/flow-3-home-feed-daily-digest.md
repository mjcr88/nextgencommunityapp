# Flow 3: Home Feed (Daily Digest)

**Actor**: Any authenticated user  
**Entry Point**: App launch or Home tab  
**Goal**: Stay informed about community activities without feeling overwhelmed  
**Success Criteria**: User feels caught up, not anxious or FOMO

## Flow Steps

### Screen 1: Home Dashboard (Active Content)

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

### Screen 2: Empty State (First Day / No Content)

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

## Edge Cases & Error Handling

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

## Success Criteria

- ✅ User sees all relevant updates
- ✅ No infinite scroll (max 20 items)
- ✅ Clear "all caught up" state
- ✅ Actions are actionable and dismissible
- ✅ Feed feels calm, not overwhelming

---
