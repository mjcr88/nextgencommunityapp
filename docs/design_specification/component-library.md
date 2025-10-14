# Component Library

## Overview

The Ecovilla platform uses **Atomic Design methodology** with components organized in four layers:

- **Atoms**: Foundational elements (buttons, inputs, icons, typography)
- **Molecules**: Simple combinations (form fields, cards, search bars)
- **Organisms**: Complex assemblies (navigation, modals, tables, feeds)
- **Patterns & Behaviors**: Interaction states and animations

---

## Implementation Stack

**Core Foundation:**
- **Base Components**: [shadcn/ui](https://ui.shadcn.com/docs/components) - Accessible, customizable React components built on Radix UI
- **Icon Library**: [Lucide](https://lucide.dev/icons/) - Beautiful, consistent icon set (600+ icons)
- **Styling**: Tailwind CSS with custom Ecovilla theme
- **Primitives**: Radix UI for accessible, unstyled component foundations
- **Accessibility**: WCAG AA compliance built-in via Radix UI

**Extended Component Registries:**

These premium component libraries extend shadcn/ui with advanced, pre-built components featuring sophisticated animations and interactions. All are copy-paste, Tailwind-based, and fully customizable.

1. **[ReactBits.dev](https://reactbits.dev/)**
   - Premium React components with smooth animations
   - Advanced form controls, data displays, and interactions
   - Perfect for: Complex forms, data visualization, interactive elements
   - Key components: Multi-step forms, advanced selects, timeline components

2. **[Skiper UI](https://skiper-ui.com/components)**
   - Beautiful, modern component collection
   - Focus on sleek aesthetics and micro-interactions
   - Perfect for: Cards, navigation, modals, overlays
   - Key components: Animated cards, drawer panels, floating menus

3. **[Cult UI](https://www.cult-ui.com/)**
   - Trendy, cutting-edge components with bold design
   - Modern aesthetics with refined animations
   - Perfect for: Hero sections, feature showcases, CTAs
   - Key components: Animated backgrounds, gradient effects, modern layouts

4. **[Magic UI](https://magicui.design/)**
   - Exceptional animation and motion components
   - Pre-built animated UI elements and effects
   - Perfect for: Transitions, loading states, celebrations, onboarding flows
   - Key components: Animated text, particle effects, morphing shapes, scroll animations
   - **Critical for**: Our Animation & Micro-interactions implementation

**Why This Stack:**
- ✅ All components share the same foundation (React + Tailwind)
- ✅ Copy-paste approach = Full code ownership and customization
- ✅ No package lock-in or version conflicts
- ✅ Pre-built animations save 100+ hours of development
- ✅ Maintains shadcn/ui philosophy while accelerating development
- ✅ All respect accessibility standards (WCAG AA)

---

## Design Philosophy Alignment

**Regenerative by Design**: Components create calm, spacious interfaces with thoughtful animations that energize rather than deplete.

**Nature as North Star**: Organic shapes, earth-tone colors, generous spacing - all customizable via Tailwind theme.

**Efficiency with Warmth**: Streamlined interactions without coldness, using smooth animations from Magic UI and ReactBits.

**Mindful Transparency**: Clear states, honest feedback, no dark patterns - all registries support proper loading, error, and success states.

**Performance-First**: Despite rich animations, all components are optimized for mobile-first performance with proper code-splitting.

---

## Design Tokens

### Color Tokens (Tailwind CSS custom theme)

```css
:root {
  /* Primary - Forest Canopy */
  --forest-deep: #2D5016;
  --forest-canopy: #4A7C2C;
  --forest-fresh: #6B9B47;
  
  /* Neutrals - Earth & Clay */
  --soil: #1A1A1A;
  --stone: #4A4A4A;
  --mist: #8C8C8C;
  --sand: #E8E5E0;
  --cloud: #F8F6F3;
  --sunlight: #FFFFFF;
  
  /* Supporting - Sky & Water */
  --river: #5B8FA3;
  --sky: #7BA5B8;
  --dew: #E8F2F5;
  
  /* Semantic - Sunrise Accent */
  --sunrise: #D97742;
  --growth: #6B9B47;
  --honey: #D4A574;
  --clay: #C25B4F;
  --stream: #7BA5B8;
}
```

### Typography Tokens

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-xs: 12px;   /* Labels, captions */
--text-sm: 13px;   /* Secondary text */
--text-base: 15px; /* Body text */
--text-lg: 17px;   /* Emphasized text */
--text-xl: 18px;   /* Small headings */
--text-2xl: 22px;  /* Section headings */
--text-3xl: 28px;  /* Page headings */
```

### Spacing Tokens (8px base grid)

```css
--space-1: 4px;   /* XXS - Icon padding */
--space-2: 8px;   /* XS - Tight spacing */
--space-4: 16px;  /* S - Default spacing */
--space-6: 24px;  /* M - Section spacing */
--space-8: 32px;  /* L - Large gaps */
--space-12: 48px; /* XL - Major sections */
--space-16: 64px; /* XXL - Page sections */
```

### Border Radius

```css
--radius-sm: 8px;    /* Small elements: chips, badges */
--radius-md: 12px;   /* Standard: buttons, inputs, cards */
--radius-lg: 16px;   /* Large elements: modals, panels */
--radius-full: 9999px; /* Pills, toggles */
```

---

## Component Reference

**Complete component specifications are documented in four detailed artifacts:**

1. **Atoms** - Typography, colors, spacing, buttons, inputs, icons, badges
2. **Molecules** - Form fields, cards, search bars, navigation items, chips, avatars
3. **Organisms** - Navigation systems, modals, tables, feeds, forms
4. **Patterns & Behaviors** - Loading states, animations, gestures, responsive patterns

**Key Components Summary:**

| Category | Components | States Documented |
|----------|-----------|-------------------|
| Buttons | Primary, Secondary, Ghost, Icon | Default, Hover, Active, Focus, Disabled |
| Inputs | Text, Textarea, Select, Checkbox, Radio, Toggle | Default, Focus, Filled, Error, Disabled |
| Cards | Feed Card, Listing Card, Event Card, Profile Card | Default, Hover, Loading, Empty |
| Navigation | Bottom Tabs, Top Bar, Profile Menu | Active, Inactive, Badge notifications |
| Modals | Dialog, Bottom Sheet, Confirmation | Entering, Open, Closing |
| Feedback | Toast, Alert, Banner, Empty State | Success, Warning, Error, Info |

---

## Design System Checklist

When implementing any component:

- [ ] Uses shadcn/ui base component (if available)
- [ ] Applies Ecovilla color tokens (Forest Canopy, Cloud, etc.)
- [ ] Uses Lucide icons (correct size and color)
- [ ] Implements all states (default, hover, active, focus, disabled, error)
- [ ] Meets 44x44px touch target minimum
- [ ] Has visible focus indicator
- [ ] Includes proper ARIA labels
- [ ] Responsive (mobile-first, breakpoint adaptations)
- [ ] Follows 8px spacing grid
- [ ] Uses 12px border radius (buttons, cards, inputs)
- [ ] Smooth transitions (200-300ms)
- [ ] Tested with keyboard navigation
- [ ] Tested with screen reader

---
