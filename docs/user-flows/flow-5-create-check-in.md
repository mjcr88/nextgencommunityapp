# Flow 5: Create Check-In

**Actor**: Any authenticated user  
**Entry Point**: + button on Map tab or Home quick actions  
**Goal**: Share current location/activity with community  
**Success Criteria**: Check-in posted to map and feed within 2 seconds

## Flow Steps

### Screen 1: Check-In Creation

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

### Screen 2: Success & Confirmation

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

### Screen 3: Active Check-In Management

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

### Screen 4: Check-In Notification

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

## Edge Cases & Error Handling

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

## Success Criteria

- ✅ Check-in appears on map within 2s
- ✅ Visible in home feed immediately
- ✅ Nearby users notified (if settings allow)
- ✅ Auto-expires after selected duration
- ✅ Privacy settings respected

---
