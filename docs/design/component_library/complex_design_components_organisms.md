# Ecovilla Community Platform - Component Library
## Part 3: Complex Components (Organisms)

### Introduction

Organisms are complex, assembled components that combine molecules and atoms into functional sections of an interface. These are often the largest reusable components before reaching full page templates.

**Design Philosophy:** Organisms should be self-contained and purposeful - like a complete workshop station with all tools within reach.

**Reference:** Atoms (Part 1) and Molecules (Part 2)

---

## 1. Navigation Systems

### Bottom Tab Navigation (Mobile Primary)

**Purpose:** Primary navigation on mobile devices  
**Found in:** All resident-facing screens

#### Complete Structure
```
┌─────────────────────────────────┐
│ Home    Map   Calendar  Messages More │
│  🏠      🗺️      📅       💬     ⋯  │
└─────────────────────────────────┘
```

**Container:**
- Height: 64px (includes 20px safe area for iOS home indicator)
- Background: White (#FFFFFF)
- Border top: 1px solid Sand (#E8E5E0)
- Shadow: 0 -1px 3px rgba(0,0,0,0.06) (subtle upward shadow)
- Position: Fixed bottom
- Z-index: 100

**Tab Items (5 tabs):**
1. Home - house icon
2. Map - map icon
3. Calendar - calendar icon
4. Messages - message-circle icon
5. More - more-horizontal icon (three dots)

**Each Tab:**
- Width: 20% (equal distribution)
- Flex direction: Column (icon above label)
- Align: Center
- Gap: 4px (icon to label)

**Active State (e.g., Home selected):**
- Icon: Filled variant, Forest Canopy (#4A7C2C)
- Label: Forest Canopy, 11px Bold
- Visual indicator: 2px line above icon (optional)

**Inactive State:**
- Icon: Outlined variant, #999999
- Label: #999999, 11px Medium

**Badge (for notifications):**
- Position: Top-right of icon
- Size: 16px circle
- Background: Urgent (#C25B4F)
- Text: White, 9px Bold
- Shows count (1-99, "99+" if more)

#### Interaction
- Tap: Navigate to screen, update active state
- Haptic feedback: Light impact on tap (iOS)
- Animation: Icon scales 0.9 → 1.0 on tap (150ms)

#### Accessibility
- Role: navigation
- Each tab: aria-label describes destination
- aria-current="page" on active tab
- Keyboard: Left/Right arrows navigate, Enter activates

#### Platform Notes
- iOS: 20px bottom padding for home indicator
- Android: 16px bottom padding (or system gesture area)
- Never hide on scroll (always accessible)

**Found in Flows:** All resident flows (0-12)

---

### Top Navigation Bar with Actions

**Purpose:** Screen title and contextual actions  
**Found in:** All screens

#### Pattern 1: Back + Title + Action
```
┌─────────────────────────────────┐
│ ←  Screen Title              ⚙️ │
└─────────────────────────────────┘
```

**Container:**
- Height: 56px
- Background: White
- Border bottom: 1px solid Sand (appears on scroll)
- Padding: 0 16px
- Z-index: 90 (below modals, above content)

**Back Button:**
- Position: Absolute left (16px)
- Icon: chevron-left, 24px
- Color: Primary text (#2C2C2C)
- Hit area: 44x44px

**Title:**
- Typography: 18px Semibold
- Color: Primary text
- Position: Centered (if space allows) or left-aligned (16px from back button)
- Max width: 60% (truncate with ellipsis if too long)

**Action Button(s):**
- Position: Absolute right (16px)
- Icon: 24px
- Color: Primary text
- Hit area: 44x44px each
- If multiple: 12px gap between them

#### Pattern 2: Title + Search
```
┌─────────────────────────────────┐
│ Title                        🔍 │
└─────────────────────────────────┘
```

Search icon tap: Expands to full-width search bar, title slides out

#### Pattern 3: Large Title (iOS style)
```
┌─────────────────────────────────┐
│ ←                            ⚙️ │
│ Large Screen Title               │
└─────────────────────────────────┘
```

**Large Title:**
- Height: 96px total (56px nav + 40px title)
- Title: 28px Bold, left-aligned
- Collapses to Pattern 1 on scroll

#### States
- Default: No border
- Scrolled: Border bottom appears (smooth fade-in)
- Elevated: Shadow appears if content scrolls beneath

**Found in Flows:** All flows (contextual variations)

---

### Desktop Sidebar Navigation

**Purpose:** Persistent navigation on desktop/tablet  
**Found in:** Desktop views (1024px+)

#### Structure
```
┌──────────────────┐
│ 🏠 Home          │
│ 🗺️  Map          │
│ 📅 Calendar      │
│ 💬 Messages   (3)│
│ 💱 Exchange      │
│ 👤 Profile       │
│ ⚙️  Settings     │
│                  │
│ [AI Chat Button] │
└──────────────────┘
```

**Container:**
- Width: 240px (collapsed: 64px icon-only)
- Height: 100vh
- Background: White
- Border right: 1px solid Sand (#E8E5E0)
- Position: Fixed left

**Nav Items:**
- Height: 48px
- Padding: 12px 16px
- Gap: 4px between items

**Each Item:**
- Icon: 24px, left-aligned
- Label: 15px Medium, 12px left of icon
- Hover: Light background (#F8F6F3)
- Active: Forest Canopy background at 10%, bold label

**Collapse/Expand:**
- Toggle button: Top of sidebar
- Collapsed: Icon only (64px width)
- Expanded: Icon + label (240px width)
- Animation: 200ms ease

**Found in Flows:** Admin backoffice (13-15), desktop resident view

---

## 2. Modal & Panel Patterns

### Standard Modal (Centered)

**Purpose:** Focused task or confirmation requiring user attention  
**Found in Flows:** 5, 7, 8, 11 (confirmations, forms, detail views)

#### Structure
```
┌─────────────────────────────────┐
│ Modal Title               ✕     │
├─────────────────────────────────┤
│                                 │
│ Modal content goes here...      │
│ Can include forms, text, etc.   │
│                                 │
├─────────────────────────────────┤
│          [Cancel] [Confirm]     │
└─────────────────────────────────┘
```

**Backdrop:**
- Position: Fixed, full screen
- Background: rgba(0, 0, 0, 0.5)
- Z-index: 1000
- Tap: Dismisses modal (if not critical action)

**Modal Container:**
- Max width: 500px (desktop), 90vw (mobile)
- Max height: 90vh
- Background: White
- Border radius: 16px (--radius-lg)
- Shadow: --shadow-xl
- Padding: 24px
- Position: Centered (vertical & horizontal)

**Header:**
- Typography: 20px Semibold
- Color: Primary text
- Padding bottom: 16px
- Border bottom: 1px solid Sand
- Close button: Absolute top-right

**Body:**
- Padding: 24px 0
- Overflow: Auto (if content exceeds max-height)
- Can contain any content: forms, text, images, lists

**Footer:**
- Padding top: 16px
- Border top: 1px solid Sand
- Buttons: Right-aligned
- Primary button right, secondary left
- Gap: 12px between buttons

#### Animation
- Entrance: Fade backdrop + scale modal (0.9 → 1.0), 200ms
- Exit: Reverse, 150ms

#### Accessibility
- Role: dialog
- aria-modal: true
- aria-labelledby: Title ID
- Focus trap: Tab cycles within modal
- Escape: Closes modal
- Focus returns to trigger on close

**Example from Flow 8 (Borrow confirmation):**
```
┌─────────────────────────────────┐
│ Confirm Borrow              ✕   │
├─────────────────────────────────┤
│ Did you return Chainsaw to      │
│ Marcus Chen?                    │
│                                 │
│ ○ Yes, I returned it            │
│ ○ Not yet                       │
├─────────────────────────────────┤
│          [Cancel] [Confirm]     │
└─────────────────────────────────┘
```

---

### Bottom Sheet (Mobile)

**Purpose:** Modal that slides up from bottom on mobile  
**Found in Flows:** 6, 7, 12 (check-in details, listing details, map info)

#### Structure
```
       Screen Content
─────────────────────────────────
┌─────────────────────────────────┐
│ ━━━━━━━                         │ ← Handle
│                                 │
│ Sheet Title                     │
│                                 │
│ Content scrollable here...      │
│                                 │
└─────────────────────────────────┘
```

**Handle:**
- Width: 40px
- Height: 4px
- Background: #CCCCCC
- Border radius: 2px
- Position: Centered top, 12px from edge
- Purpose: Visual affordance for swipe-to-dismiss

**Container:**
- Background: White
- Border radius: 16px 16px 0 0 (top corners only)
- Shadow: 0 -4px 16px rgba(0,0,0,0.15)
- Max height: 85vh
- Position: Fixed bottom
- Z-index: 1000

**Sizes:**
- Small: 40vh (quick info)
- Medium: 60vh (default)
- Large: 85vh (detailed content)
- Full: 100vh (immersive, rare)

**Backdrop:**
- Dims screen content
- Tap: Dismisses sheet

#### Interaction
- Swipe down on handle: Dismisses
- Swipe up: Expands to next size (if applicable)
- Tap backdrop: Dismisses
- Content scrolls independently

#### Animation
- Entrance: Slide up from bottom, 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Exit: Slide down, 250ms

**Platform:**
- Mobile only (< 768px)
- Desktop: Use centered modal instead

**Example from Flow 12 (Lot info on map):**
```
┌─────────────────────────────────┐
│ ━━━━━━━                         │
│ Elena Rodriguez                 │
│ Lot 23 · Resident since 2021    │
│                                 │
│ Interests: Yoga, Gardening...   │
│                                 │
│ [View Full Profile] [Message]   │
└─────────────────────────────────┘
```

---

### Side Panel (Desktop)

**Purpose:** Detail view without leaving context  
**Found in Flows:** 13, 14, 15 (admin review panels)

#### Structure
```
Main Content      │ ┌──────────────┐
(Table or list)   │ │ Panel Title  │
                  │ ├──────────────┤
                  │ │ Detail info  │
                  │ │ and actions  │
                  │ │              │
                  │ └──────────────┘
```

**Panel:**
- Width: 400px (desktop), full screen (mobile)
- Height: 100vh
- Background: White
- Border left: 1px solid Sand
- Shadow: --shadow-lg
- Position: Fixed right
- Z-index: 90

**Animation:**
- Entrance: Slide from right, 250ms
- Exit: Slide to right, 200ms

**Found in Flows:** 13 (Exchange moderation), 14 (Event review), 15 (User detail)

---

## 3. Data Tables (Admin Backoffice)

### Responsive Table

**Purpose:** Display and manage data in rows/columns  
**Found in Flows:** 13, 14, 15 (admin interfaces)

#### Desktop View (1024px+)
```
┌──────────────────────────────────────────────┐
│ ☐ Name      Email        Status    Actions  │
├──────────────────────────────────────────────┤
│ ☐ Sofia     sofia@...    Active    ⋮        │
│ ☐ Marcus    marcus@...   Active    ⋮        │
│ ☐ Elena     elena@...    Active    ⋮        │
└──────────────────────────────────────────────┘
```

**Container:**
- Background: White
- Border: 1px solid Sand (#E8E5E0)
- Border radius: 0px (tables are precise, not organic)
- Overflow: Auto (horizontal scroll if needed)

**Header Row:**
- Background: Cloud (#F8F6F3)
- Typography: 13px Semibold
- Color: Secondary text (#6B6B6B)
- Padding: 12px
- Border bottom: 2px solid Sand
- Sticky: Top (when scrolling table body)

**Body Rows:**
- Height: 56px (comfortable)
- Padding: 12px
- Border bottom: 1px solid Sand (light)
- Hover: Light background (#F8F6F3)
- Selected: Forest Canopy background at 5%

**Cells:**
- Typography: 14px Regular
- Color: Primary text
- Vertical align: Middle
- Text overflow: Ellipsis (with tooltip on hover)

**Checkbox Column:**
- Width: 48px
- Checkbox: 20px, centered
- Header checkbox: Select all

**Actions Column:**
- Width: 64px
- Icon button: More vertical (⋮), 24px
- Opens dropdown menu

#### Mobile View (< 768px)

Tables convert to card list:
```
┌─────────────────────────────────┐
│ Sofia Morales                   │
│ sofia@example.com               │
│ Status: Active                  │
│              [Actions ▼]        │
├─────────────────────────────────┤
│ Marcus Chen                     │
│ ...                             │
└─────────────────────────────────┘
```

Each row becomes a card with key fields displayed.

#### Features
- Sortable columns (click header)
- Filterable (search bar above table)
- Pagination (25, 50, 100 per page)
- Bulk actions (when rows selected)
- Export (CSV download)

**Found in Flows:** 13 (Exchange listings), 14 (Events), 15 (Users, Communities)

---

## 4. Complete Card Types

### Action Card (Flow 3 - Daily Digest)

**Purpose:** Time-sensitive item requiring user response

#### Structure
```
┌─────────────────────────────────┐
│ 🔴 Marcus invited you to coffee │
│    10 min ago                   │
│                                 │
│                          [View] │
└─────────────────────────────────┘
```

**Container:**
- Inherits standard card (white, rounded, shadow)
- Padding: 16px
- Min height: 80px

**Priority Indicator:**
- Icon: Circle filled with priority color
- Size: 16px
- Position: Left of title

**Title:**
- Typography: 15px Semibold
- Color: Primary text
- Max lines: 2 (ellipsis after)

**Timestamp:**
- Typography: 13px Regular
- Color: Secondary text
- Margin top: 4px

**Action Button:**
- Small secondary button
- Position: Bottom-right
- Text: Context-specific ("View", "RSVP", "Respond")

#### Swipe Actions (Mobile)
- Swipe right: Mark as done (green background reveals)
- Swipe left: Dismiss (red background reveals)

**Found in Flow:** 3 (Home screen actions)

---

### Update Card (Flow 3 - Daily Digest)

**Purpose:** Informational update from various sources

#### Structure
```
┃ Water outage in Sector B
┃ Today 2-4 PM - Plan accordingly
┃ 
┃ Official Communication · 2 hours ago
```

**Priority Border:**
- Border-left: 4px solid [priority color]
- Padding-left: 16px (additional, inside border)

**Title:**
- Typography: 15px Semibold
- Color: Primary text

**Description:**
- Typography: 14px Regular
- Color: Primary text
- Line height: 1.5
- Margin top: 4px

**Source Badge:**
- Typography: 12px Medium
- Pill-shaped badge
- Background: Light variant of priority color
- Shows: Source + timestamp

**Tap Action:**
- Navigates to source (Event, Message, Telegram link)

**Found in Flow:** 3 (Community Updates, Announcements)

---

### Event Card (Flow 5 - Calendar)

**Purpose:** Display event information in calendar or list

#### Structure
```
┌─────────────────────────────────┐
│ Community Potluck        Official│
│ Friday, Oct 14 · 6:00 PM        │
│ Community Kitchen               │
│                                 │
│ 👤👤👤 +15 attending              │
└─────────────────────────────────┘
```

**Badge (if Official):**
- Position: Top-right
- Blue badge (#5B8FA3)

**Title:**
- Typography: 17px Semibold
- Color: Primary text

**Date/Time:**
- Typography: 14px Regular
- Color: Secondary text
- Icon: calendar, 16px left

**Location:**
- Typography: 14px Regular
- Color: River Current (link color)
- Icon: map-pin, 16px left

**Attendees:**
- Avatar stack: Overlapping circles
- Typography: 13px Regular
- Shows: First 3 avatars + count

**States:**
- Default: Standard card
- Hover: Lift slightly
- Past event: Reduced opacity (60%)

**Found in Flows:** 5 (Event creation preview), Calendar views

---

### Exchange Listing Card (Flow 7)

**Purpose:** Display shareable item/service

#### Structure
```
┌─────────────────────────────────┐
│ [Photo]                         │
├─────────────────────────────────┤
│ Electric Drill                  │
│ Excellent condition             │
│                                 │
│ 📍 Lot 15 · Available now       │
│ Carmen Garcia                   │
└─────────────────────────────────┘
```

**Photo:**
- Aspect ratio: 1:1 (square)
- Border radius: 16px 16px 0 0
- Object fit: Cover
- Fallback: Icon if no photo

**Title:**
- Typography: 17px Semibold
- Padding: 16px (below photo)

**Condition/Description:**
- Typography: 14px Regular
- Color: Secondary text
- Max lines: 2

**Metadata Row:**
- Icons + text (location, availability)
- Typography: 13px Regular

**Owner:**
- Small avatar (24px)
- Name, 13px Medium
- Margin top: 8px

**Action (on tap):**
- Opens detail view
- Shows: Full description, borrow button, terms

**Found in Flows:** 7 (Exchange browsing), Carmen's listings

---

### Profile Card (Flow 11, 12)

**Purpose:** Display user profile summary

#### Full Profile View
```
┌─────────────────────────────────┐
│         [Avatar 80px]           │
│                                 │
│      Sofia Morales              │
│      Resident since 2021        │
│      Lot 23 · Harmony Village   │
│                                 │
│ ─────────────────────────────── │
│ Interests: Gardening, Yoga...   │
│ Skills: Permaculture, Writing   │
│                                 │
│ [Message] [View Full Profile]   │
└─────────────────────────────────┘
```

**Compact Profile (Map/List)**
```
┌───┬─────────────────────────────┐
│ 👤│ Sofia Morales               │
│   │ Lot 23                      │
└───┴─────────────────────────────┘
```

**Privacy-Hidden Variant:**
```
┌───┬─────────────────────────────┐
│ 👤│ Sofia Morales               │
│   │ Lot 23                      │
│   │ 🔒 Profile details hidden   │
└───┴─────────────────────────────┘
```

**Found in Flows:** 11 (Profile edit), 12 (Map lot view)

---

## 5. Form Containers

### Multi-Step Form

**Purpose:** Break complex forms into manageable steps  
**Found in Flows:** 1 (Onboarding), 5 (Event creation)

#### Structure
```
┌─────────────────────────────────┐
│ Step 2 of 3: Interests          │
│ ●●○                             │ ← Progress dots
├─────────────────────────────────┤
│                                 │
│ [Form fields for this step]     │
│                                 │
├─────────────────────────────────┤
│ [Back]              [Continue]  │
└─────────────────────────────────┘
```

**Header:**
- Step indicator: "Step X of Y: Title"
- Typography: 15px Medium
- Progress dots: Visual indicator
  - Filled: Forest Canopy
  - Empty: Sand (#E8E5E0)
  - Size: 8px circles, 8px gap

**Body:**
- Contains form fields for current step
- Auto-saves progress (resumable)

**Footer:**
- Back: Secondary button (left)
- Continue/Next: Primary button (right)
- Last step: "Complete" or "Submit"

**Found in Flows:** 1 (Profile creation), 5 (Event wizard)

---

### Inline Form (Single Page)

**Purpose:** All fields visible, standard form submission  
**Found in Flows:** 7 (Create listing), 11 (Edit profile)

#### Structure
```
┌─────────────────────────────────┐
│ Form Title                      │
├─────────────────────────────────┤
│ [Field 1]                       │
│ [Field 2]                       │
│ [Field 3]                       │
│ ...                             │
├─────────────────────────────────┤
│              [Cancel] [Save]    │
└─────────────────────────────────┘
```

**Section Grouping:**
- Related fields grouped with heading
- Spacing: 24px between sections
- Divider line: Optional

**Validation:**
- Real-time (on blur)
- Error messages below fields
- Submit disabled until valid

**Found in Flows:** Throughout (most creation/edit screens)

---

## 6. Feed Item Types

### Check-In Feed Item (Flow 6)

**Purpose:** Display check-in in news feed

```
┌─────────────────────────────────┐
│ 👤 Marcus Chen · 30 min ago     │
│ Checked in at Tool Library      │
│ Organizing workshop tools 🔨    │
│                                 │
│ [Photo if attached]             │
│                                 │
│ 💬 3 replies                    │
└─────────────────────────────────┘
```

**Components:**
- Avatar (40px)
- Name + timestamp
- Location (bold)
- Activity description
- Optional photo
- Reply count (if any)

**Actions:**
- Tap: View check-in details
- Quick reply buttons (in detail view)

---

### Exchange Feed Item

**Purpose:** New listing announcement

```
┌─────────────────────────────────┐
│ 📦 New listing                  │
│ Fresh Mangoes - Free Pickup     │
│ Carmen Garcia                   │
│ Available Friday 4-6 PM         │
└─────────────────────────────────┘
```

**Components:**
- Icon (package)
- "New listing" label
- Item title
- Owner name
- Availability

---

## Summary: Organisms Complete

This artifact documents complex assembled components:

1. **Navigation Systems** - Bottom tabs, top bar, desktop sidebar
2. **Modal & Panel Patterns** - Centered modal, bottom sheet, side panel
3. **Data Tables** - Responsive admin tables
4. **Complete Card Types** - Action, update, event, exchange, profile cards
5. **Form Containers** - Multi-step, inline forms
6. **Feed Item Types** - Check-in, exchange feed items

**Next:** Patterns & Behaviors artifact will cover loading states, animations, error states, and gestural interactions.

**Flows Referenced:** All flows 0-15  
**Built From:** Atoms (Part 1) + Molecules (Part 2)