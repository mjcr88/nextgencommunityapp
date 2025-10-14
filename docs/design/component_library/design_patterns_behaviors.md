# Ecovilla Community Platform - Component Library
## Part 4: Patterns & Behaviors

### Introduction

This section documents interactive patterns, state management, animations, and responsive behaviors that bring components to life. These patterns embody the UX/UI principles of interactivity:

**#1 - Making interactive possibilities immediately apparent through visual design language**  
**#2 - Creating responsive interfaces that communicate system state through immediate visual response**  
**#3 - Creating spatial continuity and professional polish through purposeful motion design**  
**#4 - Creating believable digital experiences through natural movement**  
**#5 - Communicating system status through immediate visual response**

---

## 1. Loading States

### Philosophy
Loading states prevent user anxiety by communicating "the system is working" - never leave users wondering if something broke.

### Skeleton Screens (Preferred)

**Purpose:** Show layout structure while content loads  
**When to use:** Initial page load, feed loading, card lists

**Visual Specs:**
- Background: Cloud (#F8F6F3)
- Animated shimmer: Gradient sweep left-to-right
- Border radius: Matches final content
- Height: Approximate final content height

**Shimmer Animation:**
```
Gradient: linear-gradient(90deg, 
  transparent, 
  rgba(255,255,255,0.5), 
  transparent)
Duration: 1.5s
Easing: ease-in-out
Loop: Infinite
```

**Example - Card Skeleton:**
```
┌─────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ ← Shimmer passes
│ ▓▓▓▓▓▓▓▓▓▓▓▓                   │
│                                 │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      │
└─────────────────────────────────┘
```

**Top 5 Interactivity Opportunities:**
1. **Visual affordance** - Shape indicates what content will appear (#1)
2. **Immediate feedback** - Animation starts instantly on load (#2)
3. **Spatial continuity** - Layout doesn't shift when content loads (#3)
4. **Natural motion** - Shimmer feels organic, not robotic (#4)
5. **System status** - User knows loading is in progress (#5)

**Implementation (Top 2-3):**
- Shimmer animation (smooth, continuous) - **Implemented** ✓
- Match final layout structure - **Implemented** ✓
- Fade transition when content ready - **Implemented** ✓

**Found in Flows:** 3 (Feed loading), 7 (Exchange browsing), 12 (Map loading)

---

### Spinner (Secondary)

**Purpose:** Indeterminate loading for short operations  
**When to use:** Button states, inline loading, quick operations

**Visual Specs:**
- Size: 20px (inline), 32px (standalone)
- Stroke: 2px
- Color: Forest Canopy (#4A7C2C) or context color
- Animation: 360° rotation, 800ms linear, infinite

**Placement:**
- Button loading: Replace button text, centered
- Inline: Next to text ("Loading...")
- Centered: Middle of container (rare)

**Top Interactivity Opportunities:**
1. Button state change (clickable → loading) (#2)
2. Spinner rotation communicates activity (#5)

**Implementation:**
- Replace button content with spinner - **Implemented** ✓

---

### Progress Bar (Determinate)

**Purpose:** Show completion percentage for uploads, multi-step processes  
**When to use:** File uploads, multi-step forms, batch operations

**Visual Specs:**
- Height: 4px
- Background: Sand (#E8E5E0)
- Fill: Forest Canopy (#4A7C2C)
- Border radius: 2px (fully rounded)
- Width: 100% of container

**Animation:**
- Fill expands left-to-right smoothly
- Duration: Matches operation progress
- Easing: linear (represents actual progress)

**Top Interactivity Opportunities:**
1. Visual progress indicator (#1)
2. Real-time updates as upload progresses (#2, #5)

**Implementation:**
- Smooth progress fill animation - **Implemented** ✓

**Found in Flows:** 1 (Photo upload), 7 (Image upload), 15 (Bulk import)

---

## 2. Empty States

### Philosophy
Empty states are **invitations, not dead ends** - guide users toward their first action with warmth and clarity.

### No Content Empty State

**Purpose:** Guide new users when no data exists yet

**Visual Specs:**
```
┌─────────────────────────────────┐
│                                 │
│         [Icon 48px]             │
│                                 │
│    No messages yet              │
│    Start chatting with your     │
│    neighbors!                   │
│                                 │
│    [New Conversation]           │
│                                 │
└─────────────────────────────────┘
```

**Components:**
- Icon: 48px, contextual (message, calendar, etc.)
- Heading: 17px Semibold
- Description: 14px Regular, secondary color
- Action button: Primary or secondary (contextual)
- Center-aligned vertically and horizontally

**Tone:**
- Encouraging, not empty
- Clear next action
- Friendly language

**Top Interactivity Opportunities:**
1. Clear call-to-action button (#1)
2. Obvious path forward for user (#1)

**Implementation:**
- Primary action button prominent - **Implemented** ✓

**Examples by Context:**

**Flow 3 (No actions):**
```
✓ No actions needed right now
You're all caught up!
```

**Flow 9 (No messages):**
```
💬 No conversations yet
Start a conversation with a neighbor!
[New Message]
```

**Flow 7 (No listings):**
```
📦 No listings yet
Share something with your community!
[Create Listing]
```

---

### No Search Results

**Purpose:** Help users refine search when nothing found

```
🔍 No results found

We couldn't find anything matching 
"[search term]"

Try different keywords or browse all
```

**Tone:** Helpful, not blaming user

---

### Error Empty State

**Purpose:** Explain when content failed to load

```
⚠️ Couldn't load content

Check your connection and try again

[Retry]
```

---

## 3. Error States

### Philosophy
Errors are **teaching moments** - explain what happened and how to fix it, never blame the user.

### Form Field Errors

**Visual Specs:**
- Border: 2px solid Clay (#C25B4F)
- Background: White
- Shadow: 0 0 0 3px rgba(194, 91, 79, 0.1) (red glow)
- Helper text: Red, with alert-circle icon

**Error Message Format:**
```
❌ Email is required
❌ Password must be at least 8 characters
❌ This username is already taken
```

**Top Interactivity Opportunities:**
1. Immediate visual feedback (red border) (#2)
2. Clear error message explains issue (#5)
3. Error appears on blur or submit (#2)

**Implementation:**
- Red border + glow on error - **Implemented** ✓
- Error message below field - **Implemented** ✓
- Icon for visual emphasis - **Implemented** ✓

**Found in Flows:** All forms (0, 1, 5, 7, 11)

---

### Network Errors

**Purpose:** Explain connectivity issues

**Banner Style (Top of screen):**
```
┌─────────────────────────────────┐
│ ⚠️ You're offline               │
│ Some features unavailable       │
└─────────────────────────────────┘
```

**Visual Specs:**
- Background: Warning (#E89B3C) at 20% opacity
- Border: 1px solid Warning
- Padding: 12px 16px
- Position: Top of screen (below header)
- Dismissible: X icon right side

**Top Interactivity Opportunities:**
1. Immediate notification of status (#5)
2. Persistent banner until resolved (#2)

**Implementation:**
- Sticky banner at top - **Implemented** ✓

---

### Operation Failed

**Purpose:** Inform when action couldn't complete

**Toast Notification:**
```
┌─────────────────────────────────┐
│ ❌ Failed to send message       │
│ Tap to retry                    │
└─────────────────────────────────┘
```

**Visual Specs:**
- Background: White
- Border-left: 4px solid Urgent (#C25B4F)
- Shadow: --shadow-lg
- Position: Bottom of screen (above nav)
- Duration: 4 seconds or until dismissed
- Tap: Retry action

**Top Interactivity Opportunities:**
1. Tap to retry (#1)
2. Auto-dismiss or manual close (#2)

**Implementation:**
- Toast with retry action - **Implemented** ✓

---

## 4. Animations & Transitions

### Philosophy
Motion should feel **like wind through leaves** - gentle, natural, purposeful. Never animate to impress; animate to guide attention and provide feedback.

### Timing & Easing

**Duration Scale:**
```
--duration-instant: 100ms   /* Immediate feedback */
--duration-fast: 200ms      /* Quick transitions */
--duration-normal: 300ms    /* Standard (default) */
--duration-slow: 500ms      /* Deliberate, important */
```

**Easing Functions:**
```
--ease-out: cubic-bezier(0.4, 0, 0.2, 1)      /* Decelerating */
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1)   /* Smooth both ends */
--spring: cubic-bezier(0.34, 1.56, 0.64, 1)   /* Gentle bounce */
```

**When to use each:**
- Instant (100ms): Button press, checkbox toggle
- Fast (200ms): Hover states, simple transitions
- Normal (300ms): Modal open/close, page transitions
- Slow (500ms): Complex animations, attention-grabbing

---

### Button Press

**Animation:**
1. Press: Scale 0.98 (100ms, ease-out)
2. Release: Scale 1.0 (100ms, spring)

**Top Interactivity Opportunities:**
1. Immediate tactile feedback (#2, #4)
2. Natural spring-back motion (#4)

**Implementation:**
- Scale down on press - **Implemented** ✓
- Subtle spring return - **Implemented** ✓

---

### Modal Entry/Exit

**Entry Animation:**
1. Backdrop: Fade in (200ms)
2. Modal: Scale 0.9 → 1.0 + Fade in (300ms, spring)

**Exit Animation:**
1. Modal: Scale 1.0 → 0.9 + Fade out (200ms, ease-in)
2. Backdrop: Fade out (200ms)

**Top Interactivity Opportunities:**
1. Spatial continuity (scales from center) (#3)
2. Professional polish (coordinated timing) (#3)
3. Natural movement (spring easing) (#4)

**Implementation:**
- Coordinated backdrop + modal animation - **Implemented** ✓
- Scale creates depth perception - **Implemented** ✓

---

### Bottom Sheet Slide

**Entry:**
- Translate Y: 100% → 0% (300ms, ease-out)
- Backdrop fade in simultaneously

**Exit:**
- Translate Y: 0% → 100% (250ms, ease-in)
- Backdrop fade out

**Swipe Gesture:**
- Follow finger precisely (no lag)
- Velocity threshold: Fast swipe dismisses even if <50% down
- Slow: Snap back if <50%, dismiss if >50%

**Top Interactivity Opportunities:**
1. Gesture follows finger (believable physics) (#4)
2. Smooth slide creates continuity (#3)
3. Immediate response to swipe (#2)

**Implementation:**
- Slide from bottom - **Implemented** ✓
- Swipe-to-dismiss - **Implemented** ✓

---

### Page Transition

**Mobile (slide):**
- New page: Slide in from right (300ms)
- Previous page: Slide out to right (300ms)
- Back button: Reverse (slide from left)

**Desktop (fade):**
- Fade out old content (150ms)
- Fade in new content (200ms, 50ms delay)

**Top Interactivity Opportunities:**
1. Spatial continuity (direction indicates hierarchy) (#3)
2. Smooth handoff between screens (#3)

**Implementation:**
- Platform-appropriate transitions - **Implemented** ✓

---

### List Item Appear

**Stagger Effect (new items entering):**
- Each item: Fade in + Slide up 20px
- Delay: 50ms between items (staggered)
- Max 10 items animated (performance)

**Top Interactivity Opportunities:**
1. Draws attention to new content (#3)
2. Natural cascading motion (#4)

**Implementation:**
- Staggered fade-in - **Considered for polish**

---

## 5. Gestural Interactions

### Philosophy
Gestures extend **natural human interactions** into digital space - swipe, pinch, long-press should feel intuitive, not learned.

### Swipe Actions (Cards/List Items)

**Implementation:**
```
[Card at rest]
← Swipe right: Green "Done" reveals
Swipe left →: Red "Dismiss" reveals
```

**Behavior:**
- Threshold: 40% of card width
- <40%: Snap back (200ms, spring)
- >40%: Complete action (300ms, ease-out)
- Velocity: Fast swipe (>200px/s) = instant action

**Visual Feedback:**
- Background color reveals as card slides
- Icon appears in revealed area
- Haptic: Light impact at threshold (iOS)

**Top Interactivity Opportunities:**
1. Revealed actions are immediately apparent (#1)
2. Responsive to touch input (#2)
3. Natural swipe gesture (#4)

**Implementation:**
- Swipe reveals actions - **Implemented** ✓
- Velocity-aware threshold - **Implemented** ✓

**Found in Flows:** 3 (Action cards), 9 (Message threads)

---

### Pull to Refresh

**Behavior:**
1. Pull down >60px: Spinner appears
2. Release: Spinner animates, content refreshes
3. Complete: Spinner fades, new content slides in

**Visual:**
- Spinner: 32px, appears at top
- Pull indicator: Rubber-band effect (stretches, bounces back)

**States:**
- Pulling: Arrow points down, rotates as pull deepens
- Released: Arrow becomes spinner
- Refreshing: Spinner rotates
- Complete: Check icon briefly, then fade

**Top Interactivity Opportunities:**
1. Gesture is discoverable (common pattern) (#1)
2. Visual feedback during pull (#2, #5)
3. Natural rubber-band physics (#4)

**Implementation:**
- Pull gesture triggers refresh - **Implemented** ✓
- Spinner indicates loading - **Implemented** ✓

**Found in Flows:** 3 (Home feed), 12 (Map)

---

### Long Press

**Purpose:** Reveal contextual menu or additional options

**Timing:**
- Duration: 500ms hold
- Feedback: Haptic medium impact at 500ms (iOS)
- Visual: Subtle scale 1.0 → 0.98 during hold

**Menu Appearance:**
- Pop-up menu appears above element
- Background: White, rounded, shadow-lg
- Items: 48px height, icons + labels

**Top Interactivity Opportunities:**
1. Hidden functionality revealed (#1)
2. Immediate haptic feedback (#2)
3. Natural "hold to see more" pattern (#4)

**Implementation:**
- 500ms threshold - **Implemented** ✓
- Contextual menu - **Implemented** ✓

**Found in Flows:** 9 (Message options), 12 (Map pins)

---

### Pinch to Zoom (Map)

**Behavior:**
- Two-finger pinch: Zoom in/out
- Smooth scaling (follows fingers precisely)
- Min zoom: Full community view
- Max zoom: Individual lot detail

**Top Interactivity Opportunities:**
1. Natural touch gesture for maps (#4)
2. Immediate visual response (#2)

**Implementation:**
- Native map gestures - **Implemented** ✓

**Found in Flow:** 12 (Map exploration)

---

## 6. Responsive Behaviors

### Philosophy
Components **adapt gracefully** across devices - mobile-first foundation, progressively enhanced for larger screens.

### Breakpoint Strategy

```
Mobile: 320px - 767px (base design)
Tablet: 768px - 1023px (enhance)
Desktop: 1024px+ (optimize)
```

### Navigation Adaptation

**Mobile (< 768px):**
- Bottom tab bar (5 items)
- Top bar: Back + Title + Action
- Hamburger: Only if overflow needed

**Desktop (1024px+):**
- Left sidebar (persistent)
- Top bar: Breadcrumbs + Actions
- No bottom tabs (sidebar replaces)

**Top Interactivity Opportunities:**
1. Platform-appropriate navigation (#1)
2. Spatial consistency across sizes (#3)

**Implementation:**
- Swap navigation patterns at breakpoint - **Implemented** ✓

---

### Modal Adaptation

**Mobile:**
- Bottom sheet (slide up from bottom)
- Full width
- Max 85vh height

**Desktop:**
- Centered modal
- Max 500px width
- Backdrop dimmed

**Top Interactivity Opportunities:**
1. Device-appropriate presentation (#1, #4)
2. Gesture vs click interaction (#4)

**Implementation:**
- Bottom sheet on mobile, modal on desktop - **Implemented** ✓

---

### Card Grid Layout

**Mobile:**
- Single column
- Full width cards
- 16px gap

**Tablet:**
- 2 columns
- 16px gap

**Desktop:**
- 3 columns (or 4 for simple cards)
- 20px gap
- Max container width: 1200px

**Top Interactivity Opportunities:**
1. Optimal information density per screen size (#1)
2. Layout doesn't break across sizes (#3)

**Implementation:**
- CSS Grid with responsive columns - **Implemented** ✓

---

### Typography Scaling

**Mobile:**
- Base: 15px body
- H1: 28px

**Desktop:**
- Base: 16px body (+1px)
- H1: 32px (+4px)

**Scaling Ratio:**
- Headings scale more than body (maintain hierarchy)
- Line height remains consistent
- Max line length: 70 characters (~600px)

---

## 7. Accessibility Patterns

### Focus Management

**Visible Focus Indicator:**
- Outline: 2px solid Forest Canopy (#4A7C2C)
- Offset: 2px (doesn't overlap element)
- Never: `outline: none` without custom replacement

**Focus Order:**
- Follows visual order (top-left to bottom-right)
- Skip links: "Skip to main content" at top

**Top Interactivity Opportunities:**
1. Keyboard navigation is apparent (#1)
2. Clear focus indication (#2, #5)

**Implementation:**
- All interactive elements have visible focus - **Implemented** ✓

---

### Screen Reader Patterns

**ARIA Labels:**
- Icon buttons: `aria-label="Close modal"`
- Status updates: `aria-live="polite"`
- Errors: `aria-invalid="true"`

**Semantic HTML:**
- `<button>` for actions
- `<a>` for navigation
- `<nav>` for navigation regions
- Proper heading hierarchy (H1 → H2 → H3)

---

### Reduced Motion

**Respect User Preference:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Fallback:**
- Animations disabled
- Instant state changes
- Functionality preserved

---

## Summary: Patterns & Behaviors Complete

This artifact documents interactive patterns implementing the 5 UX/UI principles:

### Top Opportunities Identified & Implemented:

**#1 - Visual Affordances:**
- Empty state CTAs, swipe-revealed actions, focus indicators

**#2 - Immediate Feedback:**
- Button press animations, error states, loading spinners, form validation

**#3 - Spatial Continuity:**
- Modal animations, page transitions, skeleton screens, responsive layouts

**#4 - Natural Movement:**
- Spring easing, gesture physics, swipe-to-dismiss, pull-to-refresh

**#5 - System Status:**
- Loading states, error messages, progress bars, network banners

### Artifacts Completed:
1. **Atoms** (Part 1) - Typography, colors, spacing, icons, buttons, form controls
2. **Molecules** (Part 2) - Input fields, cards, lists, navigation items
3. **Organisms** (Part 3) - Navigation systems, modals, tables, complete cards
4. **Patterns & Behaviors** (Part 4) - Loading, errors, animations, gestures, responsive

**Component Library: 100% Complete**

All components cross-reference flows 0-15, design philosophy, and accessibility requirements.