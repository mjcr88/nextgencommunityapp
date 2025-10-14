# Ecovilla Community Platform - Component Library
## Part 2: Composite Components (Molecules)

### Introduction

Molecules combine atoms (typography, colors, buttons, spacing) into functional units that accomplish specific tasks. These components are still relatively simple but more purpose-built than foundational atoms.

**Design Philosophy:** Each molecule should do one thing well - like a well-designed tool in a community workshop.

**Reference Atoms:** Typography, colors, spacing, buttons, and icons from Part 1

---

## 1. Form Input Fields

### Text Input with Label

**Purpose:** Standard text entry with clear labeling and validation  
**Found in Flows:** 0, 1, 5, 7, 11 (all forms)

#### Structure
```
┌─────────────────────────┐
│ Label Text *            │ ← Required indicator
├─────────────────────────┤
│ [Input field]           │ ← Placeholder text
├─────────────────────────┤
│ Helper text or error    │ ← Optional guidance
└─────────────────────────┘
```

#### Visual Specs

**Label:**
- Typography: 13px Medium (--font-size-label, --font-weight-medium)
- Color: Primary text (#2C2C2C)
- Margin bottom: 8px
- Required indicator: Red asterisk (*) if field required

**Input Field:**
- Background: Cloud (#F8F6F3)
- Border: 2px solid transparent
- Border radius: 12px (--radius-md)
- Padding: 12px 16px
- Font: 16px Regular (prevents iOS zoom)
- Min height: 44px
- Placeholder color: Tertiary text (#999999)

**Helper Text:**
- Typography: 13px Regular (--font-size-body-sm)
- Color: Secondary text (#6B6B6B)
- Margin top: 4px
- Purpose: Guidance, character counts, examples

**Error Text:**
- Typography: 13px Regular
- Color: Urgent (#C25B4F)
- Icon: alert-circle (16px) left of text
- Margin top: 4px

#### States

**Default:**
- Background: Cloud (#F8F6F3)
- Border: Transparent
- Cursor: text

**Focus:**
- Background: White (#FFFFFF)
- Border: Forest Canopy (#4A7C2C)
- Box shadow: 0 0 0 3px rgba(74, 124, 44, 0.1) (subtle glow)
- Outline: None (using border + shadow instead)

**Filled (has value):**
- Background: White
- Border: Sand (#E8E5E0)

**Error:**
- Background: White
- Border: Clay (#C25B4F)
- Box shadow: 0 0 0 3px rgba(194, 91, 79, 0.1)
- Error message appears below

**Disabled:**
- Background: Cloud (#F8F6F3)
- Border: Transparent
- Text: 40% opacity
- Cursor: not-allowed

#### Platform Variations

**Mobile:**
- Input type triggers appropriate keyboard:
  - `type="email"` → email keyboard
  - `type="tel"` → numeric keyboard
  - `type="url"` → URL keyboard
- Font size: 16px minimum (prevent zoom)

**Desktop:**
- Hover state: Border becomes visible (Sand #E8E5E0)
- Wider max-width (400px vs 100% on mobile)

#### Accessibility
- Label uses `<label for="input-id">` (proper association)
- Required fields: `aria-required="true"`
- Error state: `aria-invalid="true"` + `aria-describedby="error-id"`
- Placeholder never replaces label

#### Examples from Flows

Flow 0 (Admin creates user):
```
Full Name *
[Sofia Morales                    ]
The resident's legal name
```

Flow 1 (Onboarding):
```
Email Address *
[sofia@example.com                ]
You'll use this to sign in
```

Flow 11 (Edit profile):
```
Bio
[Share a bit about yourself...    ]
Maximum 200 characters (47/200)
```

---

### Textarea with Label

**Purpose:** Multi-line text entry for longer content  
**Found in Flows:** 5, 7, 8, 11 (descriptions, messages, feedback)

#### Differences from Text Input
- Min height: 120px (default, 3-4 lines visible)
- Resize: Vertical only (user can expand)
- Line height: 1.5 (better readability for paragraphs)
- Character counter: Often present for max length fields

#### Example from Flow 7 (Exchange listing)
```
Description *
┌─────────────────────────────────┐
│ Electric drill in excellent     │
│ condition. 20V battery included.│
│ Great for home projects...      │
│                                 │
└─────────────────────────────────┘
Maximum 300 characters (87/300)
```

---

### Dropdown/Select with Label

**Purpose:** Choose from predefined options  
**Found in Flows:** 0, 5, 7, 8, 11 (categories, types, filters)

#### Visual Specs
- Inherits text input styling
- Chevron icon (down) right side (20px, cannot be removed by user)
- Padding right: 44px (space for chevron)
- Native `<select>` on mobile (iOS/Android picker UI)
- Custom dropdown on desktop (better styling control)

#### States
- Same as text input
- Active: Dropdown opens below (or above if space constrained)
- Selected value appears as input text

#### Example from Flow 5 (Event creation)
```
Event Category *
[Workshop/Learning            ▼]
```

#### Platform Variations
**Mobile:** Native select picker (better UX, respects OS preferences)
**Desktop:** Custom styled dropdown with search (if many options)

---

### Toggle Switch with Label

**Purpose:** Binary on/off choice  
**Found in Flows:** 1, 4, 7, 11 (preferences, settings, feature toggles)

#### Structure
```
┌─────────────────────────────────┐
│ Setting Label          ○──────  │ ← OFF state
│ Helper text explains what this  │
│ toggle controls                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Setting Label          ──────●  │ ← ON state (green)
│ Helper text explains what this  │
│ toggle controls                 │
└─────────────────────────────────┘
```

#### Visual Specs

**Track (background bar):**
- Width: 48px
- Height: 28px
- Border radius: 9999px (fully rounded)
- OFF: Light gray (#E8E5E0)
- ON: Forest Canopy (#4A7C2C)
- Transition: 200ms ease

**Thumb (sliding circle):**
- Size: 24px diameter
- Background: White
- Shadow: 0 1px 3px rgba(0,0,0,0.2)
- Position: 2px from track edge
- Transition: 200ms ease

**Label:**
- Typography: 15px Medium
- Color: Primary text (#2C2C2C)
- Position: Left of toggle (desktop) or above (mobile)

**Helper Text:**
- Typography: 13px Regular
- Color: Secondary text (#6B6B6B)
- Below label/toggle

#### States
- Hover (desktop): Track slightly darker
- Focus: 2px outline around entire toggle
- Disabled: 40% opacity, no interaction

#### Accessibility
- Role: `switch`
- `aria-checked="true/false"`
- `aria-labelledby` references label
- Keyboard: Space toggles, Enter submits form (if in form)

#### Example from Flow 11 (Privacy settings)
```
Show my profile details on the map          ──────●
When ON, neighbors see your full profile. 
When OFF, only your name is visible.
```

---

### Checkbox with Label

**Purpose:** Multiple selection or single confirmation  
**Found in Flows:** 1, 4, 5, 8 (interests, terms agreement, multi-select)

#### Visual Specs

**Checkbox (unchecked):**
- Size: 20x20px
- Border: 2px solid Sand (#E8E5E0)
- Border radius: 4px (subtle rounding)
- Background: White

**Checkbox (checked):**
- Border: Forest Canopy (#4A7C2C)
- Background: Forest Canopy (#4A7C2C)
- Checkmark: White, 14px icon
- Transition: 150ms ease

**Label:**
- Typography: 15px Regular
- Color: Primary text (#2C2C2C)
- Margin left: 12px (gap from checkbox)
- Clickable (clicking label toggles checkbox)

#### States
- Hover: Border darkens
- Focus: 2px outline
- Disabled: 40% opacity

#### Example from Flow 1 (Terms agreement)
```
☑ I agree to the terms and privacy policy
```

#### Group Pattern (Multiple Checkboxes)
```
Select your interests:
☑ Gardening
☐ Yoga
☑ Community Events
☐ Sustainability
```

---

### Radio Button Group with Label

**Purpose:** Single selection from multiple options  
**Found in Flows:** 5, 7, 11 (event visibility, listing types, settings)

#### Visual Specs

**Radio (unselected):**
- Size: 20x20px (circular)
- Border: 2px solid Sand (#E8E5E0)
- Background: White

**Radio (selected):**
- Border: Forest Canopy (#4A7C2C)
- Inner dot: 10px circle, Forest Canopy
- Transition: 150ms ease

**Group Structure:**
```
Group Label
○ Option 1 label
● Option 2 label (selected)
○ Option 3 label
```

**Spacing:**
- Between options: 16px vertical
- Label to first option: 12px

#### Example from Flow 5 (Event visibility)
```
Event Visibility *
● Public - All community members
○ Invite Specific People
○ Invite Groups
○ Private
```

---

### Date Picker with Label

**Purpose:** Select date or date/time  
**Found in Flows:** 5, 7, 8 (events, availability, deadlines)

#### Visual Specs
- Inherits text input styling
- Calendar icon right side (20px)
- Value format: "Friday, Oct 14, 2025" (full date, readable)
- Click opens native date picker (mobile) or custom calendar (desktop)

#### Native vs Custom
**Mobile:** Use `<input type="date">` (native OS picker, better UX)
**Desktop:** Custom calendar overlay (better visual integration)

#### Example from Flow 5 (Event creation)
```
Start Date *
[Friday, Oct 14, 2025          📅]
```

---

## 2. Search Components

### Search Bar

**Purpose:** Filter or find content  
**Found in Flows:** 12, 13, 14, 15 (map search, user search, listing search)

#### Visual Specs
```
┌─────────────────────────────────┐
│ 🔍 Search residents...          │
└─────────────────────────────────┘
```

**Container:**
- Background: White
- Border: 2px solid Sand (#E8E5E0)
- Border radius: 24px (pill shape - distinctive)
- Padding: 10px 16px 10px 44px (left padding for icon)
- Min height: 44px

**Search Icon:**
- Position: Absolute left (16px from edge)
- Size: 20px
- Color: Secondary text (#6B6B6B)

**Input:**
- No visible border (integrated in container)
- Font: 15px Regular
- Placeholder: Contextual ("Search residents...", "Search events...")

**Clear Button (when text entered):**
- X icon, 16px
- Position: Absolute right (12px from edge)
- Tap clears input and refocuses

#### States
- Focus: Border becomes Forest Canopy (#4A7C2C)
- Active (typing): Show clear button
- Loading: Spinner replaces search icon

#### Platform Variations
**Mobile:** Full width, prominent placement
**Desktop:** Fixed width (400px), or expandable (starts 200px, expands to 400px on focus)

#### Example from Flow 12 (Map search)
```
🔍 Search by name, lot number, or facility
```

---

### Search with Autocomplete

**Purpose:** Search with suggested results as you type  
**Found in Flows:** 9, 12 (messaging, map)

#### Additional Elements

**Dropdown Results:**
- Appears below search bar
- Background: White
- Border radius: 12px (not pill)
- Shadow: --shadow-md
- Max height: 300px (scrollable)

**Result Items:**
- Each: 48px height, 12px padding
- Hover: Light background (#F8F6F3)
- Avatar/icon left, name right
- Metadata below name (lot number, role, etc.)

#### Example from Flow 9 (New message)
```
🔍 Search residents...
┌─────────────────────────────────┐
│ 👤 Sofia Morales                │
│    Lot 23 · Resident            │
├─────────────────────────────────┤
│ 👤 Marcus Chen                  │
│    Lot 15 · Organizer           │
└─────────────────────────────────┘
```

---

## 3. Card Components (Basic Structure)

### Standard Content Card

**Purpose:** Container for related information  
**Found in Flows:** All flows (actions, updates, listings, events)

#### Visual Specs
```
┌───────────────────────────────┐
│ [Card Header]                 │
├───────────────────────────────┤
│ [Card Body]                   │
│ Content goes here...          │
├───────────────────────────────┤
│ [Card Footer - Optional]      │
└───────────────────────────────┘
```

**Container:**
- Background: White (#FFFFFF)
- Border: 1px solid rgba(0,0,0,0.08) (--color-border-light)
- Border radius: 16px (--radius-lg)
- Padding: 20px (desktop), 16px (mobile)
- Shadow: --shadow-sm (default)

**Header (optional):**
- Typography: 17px Semibold
- Color: Primary text (#2C2C2C)
- Margin bottom: 12px

**Body:**
- Typography: 15px Regular
- Color: Primary text (#2C2C2C)
- Line height: 1.6

**Footer (optional):**
- Border top: 1px solid Sand (#E8E5E0)
- Padding top: 12px
- Margin top: 12px
- Typography: 13px Regular (metadata, timestamps)

#### States
- Default: Subtle shadow
- Hover (interactive cards): Shadow deepens (--shadow-md), lift 2px
- Active (tap): Scale 0.98

#### Variants

**Non-interactive (info display):**
- No hover effect
- Cursor: default

**Interactive (clickable/tappable):**
- Hover: Shadow + lift
- Cursor: pointer
- Tap feedback: Brief scale

---

### Card with Priority Border

**Purpose:** Visual hierarchy for urgent/important content  
**Found in Flow:** 3 (Daily Digest updates)

#### Additional Specs
- Border-left: 4px solid [priority color]
- Border radius adjusted: 12px (to accommodate thick left border)

**Priority Colors:**
- Urgent: Clay (#C25B4F) - red
- Important: Warning (#E89B3C) - orange  
- Relevant: (#E8C547) - yellow
- FYI: Sand (#E8E5E0) - gray

#### Example from Flow 3
```
┃ Water outage in Sector B
┃ Today 2-4 PM
┃ 
┃ Official Communication · 2 hours ago
```
(Red left border indicates urgent)

---

### Card with Image

**Purpose:** Visual content with text overlay or below  
**Found in Flows:** 7, 12 (exchange listings, community cards)

#### Layout Pattern 1 (Image Top)
```
┌───────────────────────────────┐
│ [Photo/Image fills width]     │
│                               │
├───────────────────────────────┤
│ Title                         │
│ Description text...           │
│ Metadata                      │
└───────────────────────────────┘
```

**Image:**
- Width: 100% (fills card)
- Aspect ratio: 1:1 (square) or 4:3
- Border radius: 16px 16px 0 0 (top corners only)
- Object fit: cover

**Content Below:**
- Padding: 16px
- Title: 17px Semibold
- Description: 15px Regular, 2 line clamp
- Metadata: 13px Regular, secondary color

#### Layout Pattern 2 (Image Left)
```
┌─────────┬─────────────────────┐
│ [Image] │ Title               │
│         │ Description...      │
│         │ Metadata            │
└─────────┴─────────────────────┘
```

**Image:**
- Size: 80x80px (fixed)
- Border radius: 12px
- Margin right: 12px

---

## 4. List Items

### Basic List Item

**Purpose:** Row in a list with consistent formatting  
**Found in Flows:** 9, 10, 13, 14, 15 (messages, groups, admin tables)

#### Structure
```
┌───────────────────────────────┐
│ 👤 [Icon] Primary Text      → │
│           Secondary Text       │
└───────────────────────────────┘
```

**Container:**
- Min height: 56px (comfortable tap target)
- Padding: 12px 16px
- Border bottom: 1px solid Sand (#E8E5E0)
- Last item: No border

**Icon/Avatar:**
- Position: Left
- Size: 40px
- Margin right: 12px

**Text Stack:**
- Primary: 15px Medium (#2C2C2C)
- Secondary: 13px Regular (#6B6B6B)
- Gap: 4px

**Action Indicator:**
- Chevron right (16px) or badge
- Position: Absolute right
- Color: Secondary text

#### States
- Default: White background
- Hover: Light background (#F8F6F3)
- Active: Slightly darker (#F0F5EC)

---

### List Item with Badge

**Purpose:** Unread count or status indicator  
**Found in Flows:** 3, 9, 10 (notifications, messages, groups)

#### Badge Specs
- Size: 20px height minimum (auto width)
- Padding: 4px 8px
- Border radius: 10px (pill)
- Background: Urgent (#C25B4F) for counts, Forest Canopy for status
- Typography: 11px Bold, White
- Position: Right side, vertically centered

#### Example from Flow 10 (Group list)
```
┌───────────────────────────────┐
│ 👥 Yoga Practitioners      (3)│
│    5 new messages today        │
└───────────────────────────────┘
```

---

## 5. Navigation Items

### Bottom Tab Item

**Purpose:** Primary navigation on mobile  
**Found in:** All flows (persistent navigation)

#### Structure (per tab)
```
  [Icon]
  Label
```

**Icon:**
- Size: 24px (--icon-lg)
- Inactive: Outlined style
- Active: Filled style
- Color inactive: #999999
- Color active: Forest Canopy (#4A7C2C)

**Label:**
- Typography: 11px Medium
- Color inactive: #999999
- Color active: Forest Canopy (#4A7C2C)
- Margin top: 4px

**Container (entire tab bar):**
- Height: 64px (includes safe area)
- Background: White
- Border top: 1px solid Sand (#E8E5E0)
- Shadow: 0 -1px 3px rgba(0,0,0,0.06) (inverted)
- Position: Fixed bottom

**Spacing:**
- 5 tabs: Equal width distribution
- Icon centered above label

#### States
- Active: Icon filled, color green, font slightly bolder
- Inactive: Icon outlined, color gray
- Tap: Brief scale 0.95, then activate

#### Accessibility
- `role="tablist"` on container
- Each tab: `role="tab"`, `aria-selected="true/false"`
- Labels always visible (no icon-only)

---

### Top Navigation Bar

**Purpose:** Screen title and actions  
**Found in:** All screens (context-specific)

#### Structure
```
┌───────────────────────────────┐
│ ← Screen Title            ⚙️ │
└───────────────────────────────┘
```

**Container:**
- Height: 56px
- Background: White
- Border bottom: 1px solid Sand (appears on scroll)
- Padding: 0 16px

**Back Button:**
- Icon: chevron-left or arrow-left, 24px
- Position: Left (16px from edge)
- Hit area: 44x44px

**Title:**
- Typography: 18px Semibold
- Color: Primary text (#2C2C2C)
- Position: Centered (if no left action) or left-aligned (if back button present)

**Action Buttons:**
- Icons: 24px
- Position: Right (up to 2 actions)
- Gap: 16px between multiple actions
- Hit area: 44x44px each

#### Platform Variations
**Mobile:** 56px height, centered or left title
**Desktop:** 64px height, always left title, can have breadcrumbs

---

## 6. Chips & Tags

### Interest Chip

**Purpose:** Selected interest or category  
**Found in Flows:** 1, 4, 11 (interests selection, profile display)

#### Visual Specs
```
 Gardening  ×
```

**Container:**
- Height: 32px
- Padding: 6px 12px
- Border radius: 8px (--radius-sm)
- Background: Forest Canopy (#4A7C2C) at 10% opacity
- Border: 1px solid Forest Canopy (#4A7C2C) at 30% opacity

**Text:**
- Typography: 13px Medium
- Color: Forest Canopy (#4A7C2C)

**Remove Icon (optional):**
- Size: 14px
- Color: Forest Canopy
- Margin left: 6px
- Clickable area: 24x24px (extends beyond icon)

#### States
- Default: Light green tint
- Hover (if removable): Background darkens slightly
- Focus: 2px outline

#### Non-removable Variant (Display only)
- No X icon
- Slightly smaller padding (6px 10px)
- Used in: Profile display, read-only contexts

---

### Status Badge

**Purpose:** Indicate status or category  
**Found in Flows:** 5, 7, 13, 14 (event types, listing status, admin tables)

#### Visual Specs
```
 Official  
```

**Container:**
- Height: 24px
- Padding: 4px 8px
- Border radius: 12px (fully rounded)
- Background: Varies by status

**Status Colors:**
- Official (blue): #5B8FA3 background, white text
- Active (green): #4A7C2C background, white text
- Pending (yellow): #E89B3C background, white text
- Error (red): #C25B4F background, white text
- Neutral (gray): #E8E5E0 background, #2C2C2C text

**Typography:**
- 11px Bold
- Color: White or dark (based on background contrast)

---

## 7. Avatars

### User Avatar

**Purpose:** Visual identification of people  
**Found in:** All flows (profiles, messages, check-ins, lists)

#### Sizes
```
--avatar-sm: 32px   /* Inline mentions, small lists */
--avatar-md: 40px   /* Standard lists, message threads */
--avatar-lg: 56px   /* Profile headers */
--avatar-xl: 80px   /* Profile pages, detailed views */
```

**Default (with photo):**
- Border radius: 50% (circular)
- Object fit: cover
- Border: 2px solid white (when over colored backgrounds)

**Fallback (no photo):**
- Background: Forest Canopy (#4A7C2C) at 20% opacity
- Initials: 1-2 letters, centered
- Typography: 14px Medium (md size), scales with avatar
- Color: Forest Canopy (#4A7C2C)

#### Status Indicator (optional)
- Size: 12px circle
- Position: Bottom-right corner (overlapping avatar)
- Border: 2px white (separates from avatar)
- Colors:
  - Online: Forest Canopy (#4A7C2C)
  - Away: Warning (#E89B3C)
  - Offline: None (no indicator)

#### Example
```
   ●
  👤  Sofia Morales
      Active now
```

---

## 8. File Upload Component

**Purpose:** Attach photos or documents  
**Found in Flows:** 1, 6, 7, 8 (profile photos, check-in photos, listing images)

#### Visual Specs (Default State)
```
┌─────────────────────────────────┐
│         📷                       │
│    Click to upload               │
│    or drag and drop              │
│                                  │
│    PNG, JPG or GIF (max 10MB)   │
└─────────────────────────────────┘
```

**Container:**
- Min height: 160px
- Border: 2px dashed Sand (#E8E5E0)
- Border radius: 12px
- Background: Cloud (#F8F6F3)
- Padding: 24px
- Text align: Center

**Icon:**
- Size: 32px (--icon-xl)
- Color: Secondary text (#6B6B6B)

**Text:**
- Primary: 15px Medium
- Secondary: 13px Regular, #6B6B6B

#### States

**Hover:**
- Border: Dashed Forest Canopy (#4A7C2C)
- Background: Forest Canopy at 5% opacity

**Dragging Over:**
- Border: Solid Forest Canopy
- Background: Forest Canopy at 10% opacity

**Uploading:**
- Progress bar appears
- Percentage shown

**Success (file attached):**
- Thumbnail preview (images)
- File name + size (documents)
- Remove button (X icon)

#### Mobile Pattern
- Tap opens: Camera or Gallery choice
- Native file picker for documents

---

## Summary: Molecules Complete

This artifact documents 8 categories of composite components:

1. **Form Input Fields** (7 types)
2. **Search Components** (2 types)
3. **Card Components** (3 variants)
4. **List Items** (2 types)
5. **Navigation Items** (2 types)
6. **Chips & Tags** (2 types)
7. **Avatars** (1 type with variants)
8. **File Upload** (1 type)

**Next:** Organisms artifact will cover complex assembled components (navigation systems, modals, tables, complete cards, etc.)

**Flows Referenced:** 0-15 analyzed for molecule usage  
**Atoms Referenced:** Part 1 (Typography, Colors, Spacing, Buttons, Icons)