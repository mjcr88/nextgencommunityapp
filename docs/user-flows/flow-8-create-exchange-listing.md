# Flow 8: Create Exchange Listing

**Actor**: Any authenticated user  
**Entry Point**: + button on Exchange tab  
**Goal**: List item or service for lending/sharing  
**Success Criteria**: Listing published and searchable

## Flow Steps

### Screen 1: Listing Creation Form

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

### Screen 2: Preview Listing

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

### Screen 3: Publication Success

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

## Edge Cases & Error Handling

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

## Success Criteria

- ✅ Listing appears in search
- ✅ Photos uploaded successfully
- ✅ Borrowers can request
- ✅ Owner receives notifications
- ✅ Listing editable anytime

---
