# Flow 9: Browse & Borrow Exchange Listings

**Actor**: Any authenticated user  
**Entry Point**: Exchange tab  
**Goal**: Find and request to borrow items  
**Success Criteria**: Request sent to owner, tracking active

## Flow Steps

### Screen 1: Exchange Browse View

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

### Screen 2: Listing Detail View

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

### Screen 3: Request to Borrow

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

### Screen 4: Request Management (Owner View)

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

### Screen 5: Active Borrow Tracking

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

## Edge Cases & Error Handling

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

## Success Criteria

- ✅ User finds desired item
- ✅ Request sent successfully
- ✅ Owner notified of request
- ✅ Borrow/return tracked accurately
- ✅ Deposit handled correctly

---
