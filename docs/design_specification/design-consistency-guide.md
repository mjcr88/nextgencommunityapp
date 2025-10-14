# Design Consistency Guide

## Navigation Standards

### Bottom Navigation (Primary - Mobile)
- **5 tabs**: Home 🏠, Map 🗺️, Calendar 📅, Exchange 🔄, AI Assistant 🤖
- **Note**: "Messages" tab removed per specification requirements
- **Visibility Rules**:
  - ✅ **Always visible** on resident-facing screens
  - ❌ **Hidden during onboarding wizard** (Flows 0-1)
  - ❌ **Hidden on admin/backoffice screens**
  - ✅ **Visible on modal overlays** (bottom sheet, full-screen modals)

### Top Bar Standards
- **Standard Order** (left to right):
  1. Back arrow (when applicable) - Left edge
  2. Screen title - Center
  3. Notification bell icon - Top right (first icon)
  4. Settings/action icon - Top right (second icon, if needed)
- **Consistency Rule**: Never swap icon positions across screens
- **Context Actions**: Additional icons (search, filter, add) appear left of bell icon

---

## Onboarding Flow Standards

**Step Count**: **6 steps** (standardized across all flows)

1. Password Setup & Activation
2. About You (profile photo, name, language, location)
3. Journey Stage Selection
4. Your Interests (min 3 required)
5. Share Your Skills
6. Set Notifications & Privacy

**Progress Indicator**: Always visible at top, showing current step (e.g., "Step 3 of 6")

**Navigation**:
- "Back" button (top left) - returns to previous step
- "Skip" option (top right) - only on optional steps (Skills, Interests)
- "Next" / "Continue" button (bottom, full width)
- "Cancel" (exits to login) - only on step 1

---

## Modal & Dialog Standards

### Confirmation Modals (Destructive Actions)

**Deactivate Modal:**
- Heading: "Deactivate User?" (22px bold, orange text)
- Icon: Pause icon (orange)
- Description: "This temporarily deactivates the user account. They can be reactivated later."
- Consequences list
- Checkbox: "Notify user of deactivation"
- Buttons: "Cancel" (light gray) / "Deactivate" (orange)

**Delete Modal:**
- Heading: "Delete User?" (22px bold, red text)
- Icon: X in circle (red)
- Description: "This permanently deletes the user and all their data. This action cannot be undone."
- Warning: "⚠️ This is a destructive action"
- Consequences list
- Confirmation input: "Type DELETE to confirm"
- Checkbox: "Notify user before deletion"
- Buttons: "Cancel" (light gray) / "Delete Permanently" (red, disabled until typed)

---
