# Responsiveness Strategy

## Breakpoints

| Breakpoint | Min Width | Max Width | Target Devices | Layout Changes |
|-----------|-----------|-----------|----------------|----------------|
| **Mobile** | 0px | 639px | Phones | Single column, bottom nav, full-width cards |
| **Tablet** | 640px | 1023px | Tablets, large phones | 2 columns possible, hybrid nav |
| **Desktop** | 1024px | 1279px | Laptops, desktops | Sidebar nav, 2-3 columns, hover states |
| **Wide** | 1280px+ | - | Large monitors | Max 1280px content width, centered |

**Mobile-First Approach**: All styles default to mobile, with breakpoints adding enhancements.

---

## Component Adaptations

| Component | Mobile (<640px) | Desktop (≥1024px) |
|-----------|-----------------|-------------------|
| Bottom Nav | Visible, 5 tabs | Hidden (use sidebar) |
| Top Bar | Visible, icons only | Visible, can include text labels |
| Modals | Bottom sheet (Drawer) | Centered dialog |
| Cards | Stack vertically, full width | Grid (2-3 columns) |
| Forms | Single column | Can use 2 columns for short fields |
| Tables | Horizontal scroll or card view | Full table display |
| Images | Full width | Constrained width with aspect ratio |

---

## Responsive Patterns

**Navigation**:
```tsx
// Mobile: Bottom tabs
<BottomNavigation className="md:hidden" />

// Desktop: Sidebar
<Sidebar className="hidden md:block" />
```

**Layout Flexibility**:
```tsx
// Mobile: Stack, Desktop: Grid
<div className="flex flex-col md:grid md:grid-cols-2 gap-4">
  <Card />
  <Card />
</div>
```

**Typography Scaling**:
```tsx
// Responsive heading
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Welcome to Ecovilla
</h1>
```

---
