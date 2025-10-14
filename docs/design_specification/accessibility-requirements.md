# Accessibility Requirements

## Compliance Target

**Standard**: WCAG 2.1 Level AA

**Scope**: All user-facing features, including mobile web, progressive web app, and admin interfaces.

**Rationale**: Ecovilla serves a diverse community including residents of varying ages, abilities, and technical comfort levels. Accessibility ensures everyone can participate fully in community life.

---

## Key Requirements

### Visual Accessibility

**Color Contrast**:
- **Normal text (15px+)**: Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 15px bold)**: Minimum 3:1 contrast ratio
- **UI components and graphics**: Minimum 3:1 contrast ratio
- **Never rely on color alone** to convey information (use icons, labels, or patterns)

**Focus Indicators**:
- **Visible focus ring** on all interactive elements
- **2px solid outline** in forest-canopy (#4A7C2C) or sunrise (#D97742)
- **4px offset** from element edge for clarity
- **Never remove focus styles** with `outline: none` without replacement

**Text Sizing**:
- **Base font**: 15px minimum (readable without zoom)
- **Support browser zoom**: 200% without horizontal scroll
- **Responsive text scaling**: Larger sizes at desktop breakpoints
- **No fixed heights** on text containers (allow reflow)

### Interaction Accessibility

**Keyboard Navigation**:
- **All interactive elements** reachable via Tab key
- **Logical tab order** follows visual layout (left-to-right, top-to-bottom)
- **Skip links** to bypass repetitive navigation
- **Keyboard shortcuts** for power users (documented in settings)
- **Escape key** closes modals and cancels actions
- **Arrow keys** navigate lists, calendars, and maps

**Screen Reader Support**:
- **Semantic HTML**: Use proper heading hierarchy (h1 > h2 > h3)
- **ARIA labels**: All icons and icon-only buttons have descriptive labels
- **Live regions**: Announce dynamic content updates (toasts, feed updates)
- **Form labels**: Every input has an associated label element
- **Alt text**: All images have descriptive alt attributes (except decorative)
- **Landmark roles**: header, nav, main, aside, footer for page structure

**Touch Targets**:
- **Minimum size**: 44x44px for all tappable elements
- **Recommended size**: 48x48px for primary actions
- **Spacing**: 8px minimum between adjacent targets
- **No reliance on hover**: All functionality available via tap/click

### Content Accessibility

**Alternative Text**:
- **Informative images**: Concise description of content/purpose
- **Decorative images**: Empty alt attribute (alt="")
- **Complex graphics**: Longer description via aria-describedby
- **Icons**: Accessible label via aria-label or sr-only text

**Heading Structure**:
- **One h1 per page** (page title)
- **Logical hierarchy**: No skipped levels (h1 → h2 → h3)
- **Descriptive headings**: Clearly indicate section content

**Form Accessibility**:
- **Every input** has an associated `<label>` element
- **Error messages** linked to inputs via aria-describedby
- **Required fields** indicated visually and with aria-required
- **Field instructions** provided before input (not just placeholder)
- **Error prevention**: Validate on blur, not just on submit

---

## Testing Strategy

**Automated Testing**:
- **Axe DevTools** browser extension for quick audits
- **Lighthouse** CI checks on every pull request
- **Pa11y** or **axe-core** in automated test suite
- **Target**: Zero critical violations

**Manual Testing**:
- **Keyboard-only navigation** through all flows
- **Screen reader testing**: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- **Color contrast checks** using Stark or Color Oracle
- **Zoom testing**: 200% browser zoom without horizontal scroll
- **Touch target testing**: Physical device testing with different hand sizes

**User Testing**:
- **Recruit diverse participants**: Include users with disabilities
- **Assistive technology users**: Test with screen readers, switch controls, voice control
- **Accessibility audit**: Third-party validation before launch

---

## Accessibility Checklist

When implementing any screen or feature:

- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] All interactive elements have visible focus indicators
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Escape, Arrows)
- [ ] All images have appropriate alt text
- [ ] Form labels are properly associated with inputs
- [ ] Error messages are linked to fields (aria-describedby)
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] ARIA labels on icon buttons and icon-only elements
- [ ] Touch targets are 44x44px minimum
- [ ] No reliance on color alone to convey information
- [ ] Tested with screen reader (VoiceOver, NVDA, or TalkBack)
- [ ] Zoom to 200% without horizontal scroll or content loss

---
