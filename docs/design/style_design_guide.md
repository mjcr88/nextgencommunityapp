# Ecovilla Community Platform
## Style & Design Guide

---

## 1. Design Philosophy

### Our Vision
**"Technology in service of connection, not distraction."**

The Ecovilla platform transforms communication chaos into clarity, coordination friction into spontaneity, and information overload into mindful awareness. We create digital experiences that foster genuine human connection while honoring our relationship with nature and each other.

### Core Design Principles

#### 🌱 Regenerative by Design
- Every interaction should leave users feeling **energized, not depleted**
- Design reduces overwhelm rather than creating it
- Platform adapts to users' rhythms, not the other way around
- Success = users spend **less** time on platform while achieving **more** connection

#### 🤝 Belonging Through Inclusivity
- Design for **all personas simultaneously**: newcomers, organizers, established residents
- Multiple entry points for different needs and comfort levels
- Celebrate diversity through inclusive imagery and language
- No user left behind - accessibility is foundational, not optional

#### 🌍 Nature as North Star
- Visual language rooted in organic forms and earth elements
- Calming palette derived from Costa Rican landscapes
- Imagery grounds users in physical community and natural world
- Design breathes - generous whitespace like forest clearings

#### ⚡ Efficiency with Warmth
- Streamlined flows without coldness
- Human-centered copy that guides without condescending
- Strategic moments of delight, never decoration for its own sake
- Quick to learn, faster to master

#### 🔮 Mindful Transparency
- Honest information delivery (no dark patterns)
- Clear privacy controls and data use
- Users always know what's happening and why
- Trust built through consistent, predictable experiences

---

## 2. Color System

### Philosophy
Our palette draws from the **Costa Rican cloud forest at dawn** - when morning light filters through canopy, mist rises from earth, and community awakens. Colors are **calming yet alive**, earthy yet vibrant, grounded yet hopeful.

### Primary Palette

**Forest Canopy (Primary Brand)**
- `#2D5016` - Deep Forest
- `#4A7C2C` - Living Canopy
- `#6B9B47` - Fresh Growth
- Usage: Primary actions, navigation, key UI elements
- Psychology: Growth, regeneration, grounding

**Earth & Clay (Neutrals)**
- `#1A1A1A` - Rich Soil (primary text)
- `#4A4A4A` - Weathered Stone (secondary text)
- `#8C8C8C` - Morning Mist (disabled states)
- `#E8E5E0` - Sand (light backgrounds)
- `#F8F6F3` - Cloud (canvas)
- `#FFFFFF` - Sunlight (cards, modals)

**Sky & Water (Supporting)**
- `#5B8FA3` - River Current (links, info)
- `#7BA5B8` - Clear Sky (hover states)
- `#E8F2F5` - Morning Dew (subtle backgrounds)

### Semantic Palette

**Sunrise (Accent & Energy)**
- `#D97742` - Sunrise Orange
- Usage: **Strategic only** - CTAs, notifications, celebration moments
- Psychology: Warmth, energy, community gathering
- Rule: Like Airbnb's magenta - reserved for moments that matter

**Life Signals**
- `#6B9B47` - Growth (success, confirmations)
- `#D4A574` - Honey (warnings, important notices)
- `#C25B4F` - Clay (errors, urgent)
- `#7BA5B8` - Stream (information, tips)

### Color Usage Rules

1. **80/15/5 Rule**: 80% neutrals, 15% primary greens, 5% accent orange
2. **Sunrise Moments Only**: Orange reserved for:
   - Primary CTAs (Join event, Send message, Create check-in)
   - New community activity notifications
   - Celebration states (milestone achievements)
3. **Nature Never Screams**: Avoid pure black (#000), pure white on colored backgrounds, or neon variants
4. **Contrast First**: All text meets WCAG AA (4.5:1 minimum)

---

## 3. Typography

### Philosophy
Typography should feel **handwritten note meets field guide** - approachable yet authoritative, warm yet clear. We prioritize readability in outdoor lighting conditions and extended reading sessions.

### Type Families

**Display & Headers: Inter**
- Modern, highly legible, excellent at small sizes
- Slightly rounded terminals suggest approachability
- Variable font for performance optimization
- Weights: 600 (Semibold), 700 (Bold)

**Body & Interface: Inter**
- Same family for cohesion and performance
- Optimized for screen reading
- Weights: 400 (Regular), 500 (Medium)

**Data & Code: JetBrains Mono**
- Monospace for timestamps, data, technical details
- Weight: 400 (Regular)

### Type Scale (Mobile-First)

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 (Page Title) | 28px | 700 | 1.2 | -0.5px |
| H2 (Section) | 22px | 700 | 1.3 | -0.25px |
| H3 (Subsection) | 18px | 600 | 1.4 | 0 |
| Body Large | 17px | 400 | 1.5 | 0 |
| Body | 15px | 400 | 1.6 | 0 |
| Body Small | 13px | 400 | 1.5 | 0 |
| Caption | 12px | 500 | 1.4 | 0.25px |
| Button | 16px | 600 | 1 | 0.5px |
| Label | 13px | 600 | 1.2 | 0.5px |

### Desktop Scale
Increase by 2-4px for tablet/desktop (e.g., H1: 32px, Body: 16px)

### Typography Rules

1. **Maximum Line Length**: 65-75 characters for readability
2. **Hierarchy Through Weight**: Don't rely on size alone
3. **Generous Leading**: Extra line-height for calm, breathable text
4. **Sentence Case Preferred**: Feels conversational, less shouty
5. **Dynamic Type Support**: Respect user's system font size settings

---

## 4. Spacing & Layout

### Philosophy
Space is **intentional silence** - moments to breathe, process, and transition. Like forest trails with clearings, our layouts guide users through experiences without crowding.

### Spacing Scale (8pt Grid System)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight groupings, icon-to-text |
| `space-2` | 8px | Related elements, compact lists |
| `space-3` | 12px | Form field spacing, card padding (compact) |
| `space-4` | 16px | **Base unit** - default element spacing |
| `space-5` | 24px | Section spacing, card padding (default) |
| `space-6` | 32px | Section separation, page margins |
| `space-8` | 48px | Major section breaks |
| `space-10` | 64px | Page-level separation |

### Layout Principles

**Mobile-First Grid**
- 16px edge padding (gutters)
- 12px internal spacing
- Single column default
- Cards full-width with 16px margins

**Tablet (768px+)**
- 24px edge padding
- 2-column grid for cards/lists
- Sidebars emerge for navigation

**Desktop (1024px+)**
- Max content width: 1200px
- Centered with generous margins
- 3-column grid where appropriate
- Persistent navigation sidebar

**Breathing Room Rules**
1. **Never Cramped**: Minimum 12px between interactive elements
2. **Touch Targets**: 44x44px minimum (iOS standard)
3. **Whitespace Ratio**: 40% of screen should be empty space
4. **Progressive Disclosure**: Show less, reveal more on demand

---

## 5. Iconography

### Philosophy
Icons are **trail markers** - simple, recognizable, guiding users confidently through their journey. Inspired by wayfinding symbols and nature's own visual language.

### Icon System

**Primary Library: Lucide Icons**
- Open source, consistent stroke width (2px)
- Rounded corners match our aesthetic
- Extensive coverage, actively maintained
- Sizes: 16px, 20px, 24px, 32px

**Custom Icons When Needed**
- 24x24px artboard
- 2px stroke weight
- Rounded line caps and joins
- Organic, hand-drawn feel (slight imperfection acceptable)
- Examples: Community-specific locations, local flora/fauna

### Icon Usage

**Navigation**: Outlined style, 24px, Forest Canopy color
**Actions**: Outlined, 20px, context-appropriate color
**Status**: Filled or outlined, 16px, semantic colors
**Decorative**: 32px+, low opacity (20-30%), supportive only

**Accessibility**: Every icon paired with text label or aria-label

---

## 6. Components

### Philosophy
Components are **modular dwelling units** - self-contained, reusable, adaptable to context while maintaining consistent DNA.

### Core Components

#### Buttons

**Primary (Call to Action)**
```
Background: Sunrise (#D97742)
Text: White
Padding: 12px 24px
Border Radius: 12px
Shadow: 0 2px 8px rgba(217, 119, 66, 0.2)
Hover: Lighten 10%, lift 2px
Active: Darken 5%, press 1px
```

**Secondary (Supporting Actions)**
```
Background: Transparent
Border: 2px solid Forest Canopy (#4A7C2C)
Text: Forest Canopy
Padding: 10px 22px (accounts for border)
Border Radius: 12px
Hover: Light green background (#F0F5EC)
```

**Tertiary (Subtle Actions)**
```
Background: Transparent
Text: River Current (#5B8FA3)
Padding: 8px 16px
Border Radius: 8px
Hover: Underline, light blue background
```

#### Cards

**Standard Content Card**
```
Background: White
Border: 1px solid rgba(0,0,0,0.08)
Border Radius: 16px
Padding: 20px
Shadow: 0 1px 3px rgba(0,0,0,0.06)
Hover: Shadow deepens, slight lift (2px)
```

**Interactive Card (Check-ins, Events)**
```
Background: White
Border: 2px solid transparent
Border Radius: 16px
Padding: 16px
Transition: All 200ms ease
Hover: Border = River Current, Shadow medium
Active: Border = Forest Canopy, Scale 0.98
```

#### Input Fields

**Text Input**
```
Background: Cloud (#F8F6F3)
Border: 2px solid transparent
Border Radius: 12px
Padding: 12px 16px
Font: 16px Regular (prevent iOS zoom)
Focus: Border = Forest Canopy, Background = White
Error: Border = Clay (#C25B4F), helper text below
```

**Search Input**
```
Background: White
Border: 2px solid Sand (#E8E5E0)
Border Radius: 24px (pill)
Padding: 10px 16px 10px 44px (room for icon)
Icon: 20px magnifying glass, left-aligned
Placeholder: Contemplative ("What are you looking for?")
```

#### Navigation

**Bottom Tab Bar (Mobile)**
```
Background: White
Height: 64px (includes safe area)
Icons: 24px, Outlined default, Filled active
Labels: 11px, below icons
Active Color: Forest Canopy
Inactive Color: Morning Mist
Divider: 1px top border, subtle
```

**Top Navigation**
```
Background: White
Height: 56px
Shadow: 0 1px 3px rgba(0,0,0,0.1) on scroll
Title: 18px Semibold, centered
Actions: 24px icons, left/right
```

### Component States

All interactive components must define:
- **Default**: Resting state
- **Hover**: Desktop pointer over (color shift, subtle lift)
- **Active**: Touch down or click (slight press, color deepen)
- **Focus**: Keyboard navigation (2px outline, high contrast)
- **Disabled**: 40% opacity, no pointer events
- **Loading**: Subtle pulse animation or skeleton state

---

## 7. Animation & Motion

### Philosophy
Motion should feel **like wind through leaves** - gentle, natural, purposeful. We animate to guide attention and provide feedback, never to impress or distract.

### Motion Principles

**1. Subtle & Supportive**
- Animations serve user understanding, not spectacle
- Prefer fade and slide over aggressive scaling/rotation
- Duration inversely proportional to frequency (frequent = faster)

**2. Natural Easing**
- Default: `cubic-bezier(0.4, 0.0, 0.2, 1)` - Material "standard"
- Entrances: `cubic-bezier(0.0, 0.0, 0.2, 1)` - "deceleration"
- Exits: `cubic-bezier(0.4, 0.0, 1, 1)` - "acceleration"
- Elastic (rare): `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - celebrations only

**3. Appropriate Duration**
- Micro (hover, ripple): 100-150ms
- Transitions (page changes): 200-300ms
- Modals/sheets: 250-350ms
- Complex (multi-step): 400-500ms (rare)
- Never exceed 500ms for user-initiated actions

### Key Animations

**Page Transitions**
```
Duration: 250ms
Enter: Fade in + Slide up 8px
Exit: Fade out + Slide down 4px
Easing: Standard
```

**Modal/Sheet**
```
Duration: 300ms
Enter: Scale from 0.95 → 1.0 + Fade in
Exit: Fade out (no scale to avoid motion sickness)
Backdrop: Fade to rgba(0,0,0,0.5) over 200ms
```

**Button Press**
```
Duration: 100ms
Active: Scale to 0.96, brightness 95%
Release: Spring back to 1.0 over 150ms
```

**Card Interactions**
```
Hover: Lift 2px over 200ms, shadow deepens
Exit: Settle over 150ms
```

**Loading States**
```
Skeleton: Subtle pulse 1.5s infinite
Spinner: Rotate 800ms linear infinite
Color: Morning Mist (#8C8C8C) at 20% opacity
```

### Animation Accessibility

- **Respect `prefers-reduced-motion`**: Disable all non-essential animations
- Essential animations (loading, state changes) reduce to instant or simple fade
- Never auto-play video or parallax
- Provide pause controls for any animation >5 seconds

---

## 8. Voice & Content

### Philosophy
Our voice is **a wise friend on the trail** - warm, knowledgeable, encouraging but never condescending. We write like we speak, with intention and authenticity.

### Voice Attributes

**Warm but Not Cutesy**
- ✅ "Welcome home, Sofia"
- ❌ "Hiiii! Welcome to your new besties! 🎉"

**Informative but Not Clinical**
- ✅ "Let neighbors know where you'll be this afternoon"
- ❌ "Update location status to enable visibility for community network nodes"

**Encouraging but Not Pushy**
- ✅ "Ready to join the morning yoga circle?"
- ❌ "Don't miss out! Everyone's going - you should too!"

**Contemplative but Not Cryptic**
- ✅ "What matters most to you today?"
- ❌ "When the moon whispers to the river, what does your soul respond?"

### Content Guidelines

**Headers & Titles**
- Sentence case (not Title Case)
- Action-oriented when possible
- Max 6 words for mobile readability

**Body Copy**
- Short sentences (12-20 words average)
- Active voice preferred
- Second person ("you") over third person
- Avoid jargon unless community-specific and necessary

**Microcopy (Placeholders, Helpers, Errors)**
- Specific, actionable guidance
- Friendly without being flip
- Examples:
  - Input placeholder: "Describe what you'll be doing..." (not "Enter description")
  - Error: "We need an email address to send you updates" (not "Invalid input")
  - Empty state: "No check-ins yet today. Be the first to share where you are!" (not "No data")

**Notifications**
- Lead with the essential information
- Action-oriented when response needed
- Examples:
  - "Marcus is hosting a build day tomorrow at 9 AM. Interested?" (not "New event available")
  - "Sofia sent you a message" (not "You have 1 new notification")

### Tone for Different Personas

**For Sofia (Newcomer - High Anxiety)**
- Extra reassurance: "It's okay to explore at your own pace"
- Explicit guidance: "Tap here to see who's online now"
- Validation: "Your profile is looking great!"

**For Marcus (Organizer - Time-Pressed)**
- Efficiency first: "3 RSVPs. 12 people notified."
- Respect expertise: "You might want to..." (not "You should...")
- Minimal fluff: Direct, actionable, concise

**For Elena (Established - Overwhelm-Averse)**
- Calm and filtered: "Here's what matters to you today"
- Empowerment: "You're all caught up"
- Permission to disengage: "Take a break - we've got you covered"

---

## 9. Imagery & Photography

### Philosophy
Images should **ground users in the physical community** - real people, real places, real moments. Aspirational yet authentic, diverse yet cohesive.

### Image Types

**Community Photography (Primary)**
- Real residents in real situations (not stock photos)
- Candid over posed
- Diverse representation (age, ethnicity, family structure, ability)
- Natural lighting preferred
- Settings: gardens, shared spaces, activities, nature

**Nature & Place**
- Costa Rican landscapes: cloud forests, rivers, trails, gardens
- Macro shots: leaves, water, soil, flora
- Purpose: backgrounds, empty states, onboarding

**Illustrative Elements (Sparingly)**
- Simple line drawings for education (how-to guides)
- Iconographic illustrations for empty states
- Never replace photography in primary UI

### Image Treatment

**Aspect Ratios**
- Cards: 16:9 or 4:3
- Profile photos: 1:1 (circle masked)
- Hero images: 21:9 (panoramic)

**Overlays & Text**
- Dark gradient overlay (bottom to top, 40-60% opacity) when text present
- Text always white on dark overlay, never dark text on light areas
- Ensure 4.5:1 contrast ratio

**Filters & Processing**
- Slight warmth boost (+5-10%)
- Gentle saturation increase (+10-15%)
- Avoid heavy filters, vintage effects, or over-processing
- Consistent color grading across related images

---

## 10. Accessibility Standards

### Commitment
**WCAG 2.1 AA Compliance** is our minimum, AAA our aspiration. Accessible design benefits everyone - it's not a separate consideration.

### Key Requirements

**Color & Contrast**
- Text: 4.5:1 minimum (AA), 7:1 goal (AAA)
- Large text (18px+): 3:1 minimum
- UI components: 3:1 against background
- Never rely on color alone for information

**Touch & Interaction**
- Minimum touch target: 44x44px (iOS standard)
- Spacing between targets: 8px minimum
- Focus indicators: 2px outline, high contrast
- Keyboard navigation: All features accessible without mouse

**Content & Structure**
- Semantic HTML: Proper heading hierarchy (H1 → H2 → H3)
- Alt text: Descriptive for meaningful images, empty for decorative
- Form labels: Always visible (not placeholder-only)
- ARIA labels: For icon buttons, complex widgets

**Motion & Timing**
- Respect `prefers-reduced-motion`
- No auto-playing media without controls
- Allow pausing of any animation >5 seconds
- No time limits on interactions (or generous, extendable limits)

**Screen Reader Support**
- Logical reading order (matches visual order)
- Skip links for navigation
- Live regions for dynamic content updates
- Status messages announced clearly

### Testing Checklist
- [ ] Keyboard-only navigation test
- [ ] Screen reader test (VoiceOver/NVDA)
- [ ] Color contrast audit (axe DevTools)
- [ ] Zoom to 200% test (content remains usable)
- [ ] Reduced motion test
- [ ] Touch target size verification

---

## 11. Responsive Design Strategy

### Mobile-First Philosophy
We design for **small screens first**, enhancing progressively for larger devices. This ensures core functionality is never compromised and performance is optimized.

### Breakpoints

```css
/* Mobile (default) */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### Adaptive Patterns

**Navigation**
- Mobile: Bottom tab bar (5 items max) + hamburger for overflow
- Tablet: Side drawer + bottom tabs
- Desktop: Persistent sidebar + top bar

**Content Layout**
- Mobile: Single column, full-width cards
- Tablet: 2-column grid for lists/cards, single for detail views
- Desktop: 3-column grid, 2-column for detail (content + sidebar)

**Typography**
- Mobile: Base scale (15px body)
- Tablet: +1px scale (16px body)
- Desktop: +2px scale (17px body)

**Imagery**
- Mobile: 1x optimized images, lazy load aggressively
- Tablet/Desktop: 2x images for retina, srcset for optimization

### Performance Targets
- First Contentful Paint: <2 seconds (3G)
- Time to Interactive: <3 seconds (3G)
- Lighthouse Score: 90+ (Mobile), 95+ (Desktop)

---

## 12. Implementation Guidelines

### For Designers

**Creating New Screens**
1. Start with mobile (375px width typical)
2. Use design tokens (refer to spacing scale, colors by name)
3. Design all states: default, hover, active, focus, disabled, loading, empty, error
4. Include keyboard focus indicators
5. Annotate for accessibility (alt text, ARIA needs, heading hierarchy)
6. Provide redlines for spacing and sizing

**Handoff Checklist**
- [ ] All component states documented
- [ ] Spacing values marked (use tokens)
- [ ] Typography specs complete (size, weight, line-height)
- [ ] Color values by token name (not hex)
- [ ] Interactive element behaviors noted
- [ ] Accessibility requirements listed
- [ ] Responsive behavior described (if not obvious)

### For Developers

**Code Standards**
- Use CSS variables for all design tokens
- Mobile-first media queries
- Semantic HTML (button, nav, main, article, etc.)
- Component-based architecture (React recommended)
- BEM or similar CSS methodology for clarity

**Accessibility Implementation**
```html
<!-- Button with icon -->
<button aria-label="Send message">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Form input -->
<label for="email">Email address</label>
<input 
  id="email" 
  type="email" 
  required 
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email</span>

<!-- Loading state -->
<div role="status" aria-live="polite">
  Loading community updates...
</div>
```

**Performance Best Practices**
- Lazy load images below fold
- Use WebP with JPEG fallback
- Implement skeleton screens for loading states
- Defer non-critical JavaScript
- Minimize CSS, eliminate unused rules

### For Product & Content

**Using the Design System**
- Prioritize existing components over custom builds
- Request new components only when clear pattern emerges (3+ use cases)
- Write content first, design second (content shapes layout)
- Test copy in-context (real component, real constraints)

**Content Creation Workflow**
1. Draft copy in actual character limits
2. Review with voice guidelines
3. Test with different persona mindsets (Sofia/Marcus/Elena)
4. Provide variations for different user states when needed

---

## 13. Brand Touchpoints

### Logo Usage
(Pending final logo design)
- Minimum size: 24px height (digital), 0.5" (print)
- Clear space: Equal to logo height on all sides
- Light version for dark backgrounds
- Dark version for light backgrounds
- Never distort, rotate, or apply effects

### App Icon
- 1024x1024px master
- Simplified logo or symbolic mark
- High contrast for readability at small sizes
- Tests at 40px, 80px, 120px, 180px

### Splash Screen
- White background, centered logo
- Minimal animation (fade in) <1 second
- Immediately transitions to app content

---

## 14. Distinctive Elements

### What Makes Ecovilla Design Unique

**The Forest Moment**
Like Airbnb's "magenta moment," our **Sunrise Orange (#D97742)** is strategic:
- Reserved for community gathering moments
- New check-ins, event invitations, connection prompts
- Creates dopamine hits around **real human connection**, not endless scrolling
- Never used for ads, promotions, or artificial engagement

**Rounded Everything**
- 12px border radius standard (16px for cards)
- Creates approachability and organic feel
- Consistent with regenerative, nature-first values
- Avoids harsh, corporate edges

**Contemplative Microcopy**
- Inspired by TIDE's poetic placeholders
- Examples:
  - Search: "What are you looking for today?"
  - Check-in: "Where will your path lead this afternoon?"
  - Empty state: "The garden is quiet right now. Plant the first seed."
- Balances whimsy with clarity

**Generous Breathing Room**
- 40% whitespace ratio (higher than most social apps)
- Like Airbnb's spatial generosity + TIDE's calm
- Reduces anxiety, supports mindful consumption
- Premium feel through restraint

**Nature-First Imagery**
- Real community + Costa Rican landscapes
- Photography over illustration (authentic over abstract)
- Grounds digital experience in physical place
- Reinforces belonging to place, not just platform

---

## 15. Anti-Patterns (What We Don't Do)

### Design Anti-Patterns
❌ **Dark Patterns**: No manipulative UI (hidden unsubscribe, fake urgency, deceptive defaults)
❌ **Infinite Scroll**: All content paginated or "load more" to prevent time sink
❌ **Notification Spam**: Batched, intelligent, user-controlled
❌ **FOMO Engineering**: No "X people are active now" or artificial scarcity
❌ **Gamification for Engagement**: No streaks, badges, or leaderboards for participation
❌ **Cluttered Layouts**: If it's not essential, it's gone
❌ **Auto-Play Video/Audio**: Respectful of attention and data

### Content Anti-Patterns
❌ **Clickbait**: "You won't believe..." "One weird trick..."
❌ **Guilt Trips**: "Everyone else has..." "Don't be the only one..."
❌ **Passive Aggression**: "Are you sure you want to leave?"
❌ **Corporate Speak**: "Leverage synergies" "Circle back" "Move the needle"
❌ **Overly Casual**: "Yo!" "Lit!" (unless age-appropriate for teen features)

---

## Conclusion

This design system is a **living document** - it will evolve as our community grows and as we learn what serves our users best. 

The goal is not pixel perfection, but **human connection**. Every design decision should ask:

> "Does this bring our community closer together while respecting their time, attention, and wellbeing?"

If yes, ship it. If no, rethink it.

**Design with regeneration in mind.** 🌱