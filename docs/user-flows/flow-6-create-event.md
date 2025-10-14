# Flow 6: Create Event

**Actor**: Any authenticated user (residents can create, official events need approval)  
**Entry Point**: + button on Calendar tab  
**Goal**: Create community event and invite neighbors  
**Success Criteria**: Event published and visible on calendar

## Flow Steps

### Screen 1: Event Creation Form

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

### Screen 2: Event Preview

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

### Screen 3: Publication Confirmation

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

## Edge Cases & Error Handling

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

## Success Criteria

- ✅ Event appears on calendar
- ✅ Attendees can RSVP
- ✅ Visible to intended audience
- ✅ Notifications sent (if settings allow)
- ✅ Official events await approval
- ✅ Resident events publish immediately

---
