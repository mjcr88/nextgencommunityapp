# Ecovilla Community Platform - Component Library
## Part 1: Foundational Elements (Atoms)

### Design Philosophy Alignment

These foundational components embody Ecovilla's core values:
- **Regenerative Living:** Organic shapes (rounded corners), natural color palette
- **Community Resilience:** Accessible by default, clear communication over cleverness
- **Sustainable Practices:** Efficient, reusable, adaptable components
- **Calm Connection:** Gentle motion, soft colors, breathing room

**Reference:** Ecovilla Community Platform - Style & Design Guide  
**Mobile-First:** All components designed for 375px screens first, enhanced for larger viewports

---

## 1. Typography System

### Philosophy
Typography should feel **grounded and approachable** - like handwritten signs at a farmers market, not corporate memos. Readability and accessibility take precedence over aesthetic novelty.

### Font Families

**Primary (UI Text):**
- Family: System font stack (optimized for each platform)
- Mobile: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Purpose: Interface elements, buttons, labels, body text
- Rationale: Native feel, optimal rendering, no font loading delay

**Secondary (Headings & Emphasis):**
- Family: Same system stack with weight variations
- Purpose: H1-H6, emphasized content
- Rationale: Consistency, performance

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height | Usage |
|---------|---------------|----------------|--------|-------------|-------|
| **H1** | 28px | 32px | 700 (Bold) | 1.2 | Page titles, major headings |
| **H2** | 24px | 28px | 600 (Semibold) | 1.3 | Section headings |
| **H3** | 20px | 22px | 600 (Semibold) | 1.4 | Subsection headings |
| **Body Large** | 17px | 18px | 400 (Regular) | 1.5 | Emphasized body text |
| **Body** | 15px | 16px | 400 (Regular) | 1.6 | Default paragraph text |
| **Body Small** | 13px | 14px | 400 (Regular) | 1.5 | Secondary info, captions |
| **Label** | 13px | 13px | 500 (Medium) | 1.4 | Form labels, UI labels |
| **Caption** | 11px | 12px | 400 (Regular) | 1.3 | Timestamps, metadata |
| **Button** | 16px | 16px | 600 (Semibold) | 1 | Button text |

### Typography Tokens

```
--font-size-h1: 28px;
--font-size-h2: 24px;
--font-size-h3: 20px;
--font-size-body-lg: 17px;
--font-size-body: 15px;
--font-size-body-sm: 13px;
--font-size-label: 13px;
--font-size-caption: 11px;

--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.6;
```

### Accessibility Requirements
- Minimum body text: 15px (prevents iOS zoom on input focus)
- Line height: 1.5+ for body text (readability)
- Max line length: 70 characters (~600px container)
- Headings: Semantic HTML hierarchy (H1 → H2 → H3, never skip levels)
- Contrast: All text meets WCAG AA (4.5:1 for small, 3:1 for large 18px+)

### Platform Considerations
- **Mobile:** Base sizes (15px body prevents zoom)
- **Desktop:** +1-2px scale for comfortable reading distance
- **Dynamic Type (iOS):** Components should respect user's system text size preferences

---

## 2. Color Palette

### Philosophy
Colors evoke **natural, organic environments** - forest greens, earthy terracotta, river blues. The palette conveys trust, calm, and growth while maintaining vibrant energy for key actions.

### Brand Colors

**Primary Green (Community/Growth):**
- Name: `Forest Canopy`
- Hex: `#4A7C2C`
- RGB: `74, 124, 44`
- Usage: Primary actions, active states, success, community elements
- Accessibility: Passes AA on white (4.7:1)

**Accent Orange (Energy/Action):**
- Name: `Sunrise`
- Hex: `#D97742`
- RGB: `217, 119, 66`
- Usage: Call-to-action buttons, highlights, important notices
- Accessibility: Passes AA for large text on white (3.8:1)

**Secondary Blue (Information/Connection):**
- Name: `River Current`
- Hex: `#5B8FA3`
- RGB: `91, 143, 163`
- Usage: Links, informational elements, secondary actions
- Accessibility: Passes AA on white (4.2:1)

### Semantic Colors

**Urgent/Error:**
- Name: `Clay`
- Hex: `#C25B4F`
- RGB: `194, 91, 79`
- Usage: Error states, urgent notifications, destructive actions
- Border: 2px on white backgrounds

**Warning/Important:**
- Hex: `#E89B3C`
- Usage: Warning states, important (non-urgent) alerts
- Often paired with icon for clarity (not color-alone)

**Success/Confirmation:**
- Hex: `#4A7C2C` (Forest Canopy - reuse primary)
- Usage: Success messages, confirmations, completed states

**Info/FYI:**
- Hex: `#5B8FA3` (River Current - reuse secondary)
- Usage: Informational messages, tips, neutral notices

### Neutral Colors

**Text:**
- Primary: `#2C2C2C` (near-black, softer than pure black)
- Secondary: `#6B6B6B` (medium gray for metadata)
- Tertiary: `#999999` (light gray for placeholders)
- Inverse: `#FFFFFF` (white on dark backgrounds)

**Backgrounds:**
- Primary: `#FFFFFF` (white)
- Secondary: `#F8F6F3` (Cloud - off-white, warm)
- Tertiary: `#F0F5EC` (light green tint for subtle emphasis)
- Overlay: `rgba(0, 0, 0, 0.5)` (modal backdrop)

**Borders & Dividers:**
- Default: `#E8E5E0` (Sand - warm gray)
- Light: `rgba(0, 0, 0, 0.08)` (subtle card borders)
- Focus: `#4A7C2C` (Forest Canopy - keyboard navigation)

### Priority Indicator Colors

**Used in Flow 3 (Daily Digest) and throughout:**
- Urgent: `#C25B4F` (Clay) - red border-left on cards
- Important: `#E89B3C` (orange) - orange border-left
- Relevant: `#E8C547` (yellow) - yellow border-left
- FYI: `#E8E5E0` (Sand) - gray border-left

### Color Tokens

```
/* Brand */
--color-primary: #4A7C2C;
--color-accent: #D97742;
--color-secondary: #5B8FA3;

/* Semantic */
--color-urgent: #C25B4F;
--color-warning: #E89B3C;
--color-success: #4A7C2C;
--color-info: #5B8FA3;

/* Neutral */
--color-text-primary: #2C2C2C;
--color-text-secondary: #6B6B6B;
--color-text-tertiary: #999999;
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F8F6F3;
--color-bg-tertiary: #F0F5EC;
--color-border: #E8E5E0;
--color-border-light: rgba(0, 0, 0, 0.08);
```

### Dark Mode Considerations
(Not MVP, but design system should support future dark mode)
- Invert lightness, maintain hue
- Reduce saturation slightly (less vibrant in dark)
- Ensure 4.5:1 contrast on dark backgrounds

---

## 3. Spacing & Layout System

### Philosophy
Spacing creates **breathing room** - like paths through a garden. Consistent rhythm makes interfaces scannable and calm, never cramped or overwhelming.

### 8px Base Grid

All spacing uses multiples of 8px for visual rhythm and alignment:

```
--space-0: 0px;
--space-1: 4px;    /* Minimal (icon-text gap, tight elements) */
--space-2: 8px;    /* Small (between related items) */
--space-3: 12px;   /* Medium-small (button padding, card internal) */
--space-4: 16px;   /* Standard (default gap, input padding) */
--space-5: 20px;   /* Medium-large (card padding) */
--space-6: 24px;   /* Large (section spacing, screen edges) */
--space-8: 32px;   /* Extra large (major section breaks) */
--space-10: 40px;  /* XXL (screen top/bottom) */
--space-12: 48px;  /* XXXL (hero spacing) */
--space-16: 64px;  /* Dramatic separation (rare) */
```

### Layout Containers

**Mobile (375px - 767px):**
- Edge padding: 16px (--space-4)
- Content max-width: 100% (full screen minus padding)
- Safe areas respected (iOS notch, home indicator)

**Tablet (768px - 1023px):**
- Edge padding: 24px (--space-6)
- Content max-width: 720px (centered)

**Desktop (1024px+):**
- Edge padding: 40px (--space-10)
- Content max-width: 800px (centered for readability)
- Exception: Admin tables can expand to 1200px

### Common Spacing Patterns

**Stacked Elements (Vertical):**
- Between paragraphs: 16px
- Between form fields: 20px
- Between sections: 32px
- Screen top margin: 24px (below header)
- Screen bottom margin: 40px (above nav)

**Inline Elements (Horizontal):**
- Icon + text: 8px
- Button group gap: 12px
- Chip/tag gap: 8px
- Table cell padding: 12px

**Card Internal Spacing:**
- Padding: 20px (desktop), 16px (mobile)
- Element gaps: 12px
- Title to content: 8px

### Accessibility
- Touch targets: Minimum 44x44px (iOS standard)
- Spacing between targets: 8px minimum (prevent mis-taps)
- Generous whitespace aids screen reader navigation

---

## 4. Border Radius System

### Philosophy
Rounded corners feel **organic and approachable** - like smooth river stones. Sharp corners are avoided except for data tables where precision matters.

### Radius Scale

```
--radius-none: 0px;      /* Tables, data grids only */
--radius-sm: 8px;        /* Small pills, tags, chips */
--radius-md: 12px;       /* Buttons, inputs, small cards */
--radius-lg: 16px;       /* Standard cards, modals */
--radius-xl: 20px;       /* Large cards, panels */
--radius-full: 9999px;   /* Circular (avatars, pills) */
```

### Usage Guidelines

| Element | Radius | Rationale |
|---------|--------|-----------|
| Buttons | 12px | Approachable, not pill-like |
| Input fields | 12px | Matches buttons, cohesive |
| Cards | 16px | Generous, soft |
| Modals | 16px-20px | Prominent, welcoming |
| Avatars | 9999px | Circular (human focus) |
| Chips/tags | 8px | Subtle, compact |
| Bottom sheets (mobile) | 16px top corners | Natural swipe-up feel |
| Admin tables | 0px | Precision, data density |

---

## 5. Elevation & Shadows

### Philosophy
Shadows suggest **layers in nature** - like dappled light through leaves. Subtle elevation guides attention without harsh contrasts.

### Shadow Scale

```
--shadow-none: none;
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);    /* Subtle (cards) */
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.12);    /* Standard (dropdowns) */
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);   /* Prominent (modals) */
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.20);   /* Dramatic (rare) */
```

### Usage Guidelines

| Element | Shadow | Notes |
|---------|--------|-------|
| Cards (default) | sm | Gentle separation from background |
| Cards (hover) | md | Lift slightly on interaction |
| Floating buttons | md | Always visible, clear affordance |
| Dropdowns | md | Overlay context |
| Modals | lg | Clear hierarchy above content |
| Toasts | lg | Attention-grabbing but not harsh |
| Bottom nav | sm inverted | `0 -1px 3px` (shadow above) |

### Performance Note
- Use shadows sparingly (GPU intensive on low-end devices)
- Prefer border-based elevation for static elements when possible

---

## 6. Iconography

### Philosophy
Icons are **universal wayfinders** - transcending language barriers. They must be clear at small sizes and culturally appropriate for diverse communities.

### Icon System

**Library:** Lucide Icons (open source, community-focused aesthetic)
- Style: Outlined (not filled) for most icons
- Stroke width: 2px (balanced, clear at small sizes)
- Sizes: 16px, 20px, 24px (scale to context)

**Icon Sizes:**
```
--icon-sm: 16px;    /* Inline with text, small buttons */
--icon-md: 20px;    /* Standard buttons, navigation */
--icon-lg: 24px;    /* Prominent actions, headers */
--icon-xl: 32px;    /* Feature icons, empty states */
```

### Common Icons (by context)

**Navigation:**
- Home: `home` (house outline)
- Map: `map` or `map-pin`
- Calendar: `calendar`
- Messages: `message-circle`
- Exchange: `repeat` or `package`
- More: `more-horizontal` (three dots)
- Profile: `user-circle`

**Actions:**
- Add/Create: `plus` or `plus-circle`
- Edit: `edit-2` or `pencil`
- Delete: `trash-2`
- Search: `search`
- Filter: `filter` or `sliders`
- Settings: `settings` (gear)
- Close: `x`
- Back: `arrow-left` or `chevron-left`
- Forward: `arrow-right` or `chevron-right`

**Status:**
- Success: `check-circle` (green)
- Error: `alert-circle` (red)
- Warning: `alert-triangle` (orange)
- Info: `info` (blue circle with i)

**Communication:**
- Send: `send` (paper plane)
- Attach: `paperclip`
- Photo: `camera` or `image`
- Location: `map-pin`

**Features (Flow-specific):**
- Check-in: `map-pin` + activity emoji
- Event: `calendar-plus`
- Exchange: `package` or `repeat`
- AI Chat: `message-square` or `bot`
- Notification: `bell`

### Accessibility
- All icons have descriptive `aria-label` (never decorative only)
- Icons paired with text when possible (especially primary actions)
- Icon-only buttons: 44x44px minimum target, clear label

### Color Usage
- Default: Inherit text color (adaptive)
- Active state: Primary green (#4A7C2C)
- Inactive/disabled: Light gray (#999999, 40% opacity)
- Semantic: Match color to meaning (error = red, success = green)

---

## 7. Buttons

### Philosophy
Buttons are **invitations to act** - clear, accessible, thumb-friendly. Hierarchy communicates importance without relying on color alone.

### Button Variants

#### Primary Button (Call to Action)

**Purpose:** Main action on screen (one per view)  
**Usage:** "Create Event", "Publish Listing", "Send Message"

**Visual Specs:**
```
Background: Sunrise (#D97742)
Text: White (#FFFFFF)
Padding: 12px 24px (vertical horizontal)
Border Radius: 12px (--radius-md)
Font: 16px Semibold (--font-size-button, --font-weight-semibold)
Min Height: 44px (accessibility)
Shadow: 0 2px 8px rgba(217, 119, 66, 0.2)
```

**States:**
- Default: Sunrise background, white text
- Hover (desktop): Lighten 10%, lift 2px (shadow-md)
- Active: Darken 5%, scale 0.98 (press effect)
- Focus: 2px outline, Forest Canopy (#4A7C2C)
- Disabled: 40% opacity, no pointer events
- Loading: Spinner replaces text, disabled state

**Platform Notes:**
- Mobile: No hover state (direct tap)
- Desktop: Subtle lift on hover

**Found in Flows:** 1, 5, 7, 9, 11 (all form submissions)

---

#### Secondary Button (Supporting Actions)

**Purpose:** Secondary action, less emphasis than primary  
**Usage:** "Cancel", "Save as Draft", "Skip for now"

**Visual Specs:**
```
Background: Transparent
Border: 2px solid Forest Canopy (#4A7C2C)
Text: Forest Canopy (#4A7C2C)
Padding: 10px 22px (accounts for border thickness)
Border Radius: 12px
Font: 16px Semibold
Min Height: 44px
Shadow: None
```

**States:**
- Default: Outlined, transparent background
- Hover: Light green background (#F0F5EC)
- Active: Border thickens slightly, scale 0.98
- Focus: 2px outline (duplicate border effect)
- Disabled: 40% opacity

**Found in Flows:** 1, 5, 7, 8, 11 (paired with primary)

---

#### Tertiary/Text Button (Subtle Actions)

**Purpose:** Low-emphasis actions, navigation  
**Usage:** "Learn More", "View Details", "Edit"

**Visual Specs:**
```
Background: Transparent
Border: None
Text: River Current (#5B8FA3)
Padding: 8px 16px
Border Radius: 8px
Font: 15px Medium (slightly lighter than button)
Min Height: 40px (slightly smaller target OK for tertiary)
```

**States:**
- Default: Blue text, no background
- Hover: Underline, light blue background
- Active: Darken text
- Focus: 2px outline
- Disabled: 40% opacity

**Found in Flows:** Throughout (view profile, learn more links)

---

#### Icon Button (Icon-only)

**Purpose:** Actions where icon alone is clear  
**Usage:** Back, Close, Settings, More menu

**Visual Specs:**
```
Background: Transparent (or subtle tint)
Size: 40x40px minimum (44x44px preferred)
Icon: 20px or 24px (--icon-md or --icon-lg)
Border Radius: 50% (circular) or 8px (square)
```

**States:**
- Default: Icon in primary text color
- Hover: Light background circle appears
- Active: Scale 0.95
- Focus: 2px outline
- Disabled: Icon 40% opacity

**Accessibility Critical:**
- Always has `aria-label` (describes action)
- Never icon-only for primary actions (pair with text)

**Found in Flows:** All flows (navigation, modal close)

---

#### Floating Action Button (FAB)

**Purpose:** Primary action, always accessible  
**Usage:** "+ Create", "Check In", "New Message"

**Visual Specs:**
```
Background: Sunrise (#D97742)
Size: 56x56px (large touch target)
Icon: 24px white
Border Radius: 50% (circular)
Shadow: 0 4px 12px rgba(217, 119, 66, 0.3) (--shadow-md)
Position: Fixed bottom-right (16px from edges)
```

**States:**
- Default: Vibrant, prominent
- Hover: Lift 4px (stronger shadow)
- Active: Scale 0.95, deeper shadow
- Focus: 2px outline

**Platform Notes:**
- Mobile: Bottom-right corner
- Desktop: Can be inline in layouts (not always floating)

**Found in Flows:** 5 (Create Event), 6 (Check In), 7 (Add Listing), 9 (New Message)

---

### Button with Icon Variant

**Purpose:** Enhance clarity with visual cue  
**Pattern:** Icon + Text in same button

**Layout:**
- Icon left: `[Icon] Create Event`
- Icon right: `View Profile [Icon]`
- Gap: 8px between icon and text

**Usage:**
- Primary/Secondary buttons can include icon
- Icon inherits button color
- Icon size: 20px (--icon-md)

**Found in Flows:** 5 (Calendar icon + "Create Event"), 6 (Map pin + "Check In")

---

### Button Group (Multiple Buttons)

**Horizontal Group:**
```
Gap: 12px between buttons
Order: Primary (right), Secondary (left) on mobile
Order: Primary (right), Secondary (left) on desktop too
```

**Vertical Stack (mobile):**
```
Gap: 12px between stacked buttons
Full width: Buttons stretch to container width
Order: Primary on top, Secondary below
```

**Found in Flows:** 1 (Activate + Cancel), 8 (Approve + Deny)

---

### Accessibility Requirements
- Minimum 44x44px touch target (all variants)
- Focus indicators: 2px outline, high contrast
- Keyboard navigation: Enter/Space activates
- Disabled state: `aria-disabled="true"` + visual cue
- Loading state: `aria-busy="true"`, descriptive text

---

## 8. Form Controls

### Philosophy
Forms should feel like **natural conversations** - one question at a time, with helpful guidance. Inputs are large, forgiving, and clearly indicate their purpose.

(Continued in Part 2: Molecules artifact...)

---

**Next:** The Molecules artifact will cover composite components (form fields with labels, search bars, card structures, etc.) built from these atoms.

**Flows Referenced:** 0-15 analyzed for component usage  
**Design System:** Ecovilla Style Guide + Philosophy integrated