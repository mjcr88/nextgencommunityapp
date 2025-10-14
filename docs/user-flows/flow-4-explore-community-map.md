# Flow 4: Explore Community Map

**Actor**: Any authenticated user  
**Entry Point**: Map tab or "Explore Map" from Home  
**Goal**: Discover community spaces, see check-ins, explore facilities  
**Success Criteria**: User finds what they're looking for, learns about community

## Flow Steps

### Screen 1: Map View with Layers

**Top Bar**:
- Search icon (left)
- "Community Map" title (center)
- Layers icon (right, first)
- My location icon (right, second)

**Map Display**:
- Full screen (minus top bar and bottom nav)
- Map type: Satellite with labels (default)
- Gestures: Pan, pinch-zoom, rotate
- Initial view: Centered on community boundaries
- Zoom level: Shows entire community

**Map Controls** (floating overlay, top-right):
- Background: White
- Border radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.12)
- Padding: 8px
- Vertical stack, gap: 8px

**Control Buttons** (40x40px each):
- My Location: Target icon → Centers on user's GPS location
- Zoom In: Plus icon
- Zoom Out: Minus icon
- Map Type: Layers icon → Opens map type selector
- Compass: Shows orientation, tap to reset north

**Map Layers Panel** (slide from right):

**Trigger**: Tap Layers icon

**Panel Design**:
- Slide in from right (300ms)
- Width: 320px (mobile), 400px (desktop)
- Full height
- White background
- Shadow: -2px 0 8px rgba(0,0,0,0.1)

**Panel Content**:

**Header**:
- "Map Layers" (18px semibold)
- X close button (right)
- Padding: 20px

**Layer Groups** (toggles):

1. **Locations**:
   - Community Lots (ON by default)
     - Shows lot boundaries and numbers
   - Facilities (ON by default)
     - Community spaces, tool library, etc.
   - Check-Ins (ON by default)
     - Active check-ins with avatars

2. **Infrastructure**:
   - Roads & Paths (ON)
   - Water Sources (ON)
   - Electrical Access (OFF)

3. **Natural Features**:
   - Tree Canopy (OFF)
   - Topography Lines (OFF)
   - Wildlife Zones (OFF)

**Toggle Design**:
- Switch component
- Label left, toggle right
- Color: Forest Canopy when ON
- Smooth transition
- Changes apply immediately

**Map Type Selector**:
- Satellite (default)
- Standard (street map)
- Terrain
- Hybrid (satellite + labels)
- Radio buttons
- Preview thumbnails

**Map Pins & Markers**:

1. **Lot Boundaries**:
   - Polygon outlines
   - Color: Forest Canopy at 30% opacity
   - Stroke: 2px Forest Canopy
   - Lot number label (center)
   - Tap: Opens lot detail card

2. **Facilities** (predefined POIs):
   - Icon pins:
     - Tool Library: 🔧
     - Community Center: 🏛️
     - Garden: 🌱
     - Pool: 🏊
     - Playground: 🎠
   - Icon size: 32px
   - Background: White circle
   - Border: 2px category color
   - Shadow: 0 2px 6px rgba(0,0,0,0.2)
   - Tap: Opens facility card

3. **Check-Ins** (active users):
   - Avatar photo (44px circular)
   - Border: 3px white, 2px Forest Canopy
   - Shadow: 0 2px 8px rgba(0,0,0,0.3)
   - Your check-in: Sunrise border instead
   - Tap: Opens check-in detail

**Lot Detail Card** (bottom sheet):

**Trigger**: Tap lot boundary or number

**Card Design**:
- Slides up from bottom
- Rounded top corners (16px)
- White background
- Drag handle (top center)

**Content**:
- Lot number (22px bold)
- Address/identifier (14px regular)
- Status badge: Occupied/Available/Reserved
- Current resident info (if occupied and not private):
  - Avatar (48px)
  - Name (16px semibold)
  - "Hide from map" note if privacy enabled
  - Link: "View Profile" (if public)
- Lot details:
  - Size: "2000 m²"
  - Features: Garden, well, solar
- Map thumbnail (static)
- Action: "Get Directions"

**Privacy Handling**:
- If resident has map visibility OFF:
  - Shows lot as "Occupied"
  - No resident name or photo
  - Message: "Resident has chosen not to appear on map"
  - Respects privacy settings

**Facility Detail Card**:

**Similar bottom sheet design**

**Content**:
- Facility name (20px semibold)
- Icon (large, 48px)
- Description (15px regular)
- Hours/availability (if applicable)
- Photos (scrollable gallery)
- Current activity:
  - "2 people checked in here"
  - List of check-ins
- Actions:
  - "Check In Here" (primary)
  - "Get Directions" (secondary)

**Check-In Detail** (see Flow 5 for full details):
- Bottom sheet with user info
- Name, photo, time
- Optional message
- Location details
- "Say Hi" option (future feature)

### Screen 2: Search & Filter

**Search Bar** (slides down from top):

**Trigger**: Tap search icon

**Design**:
- Full-width input
- Background: White
- Border radius: 12px (top corners)
- Padding: 12px 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Placeholder: "Search lots, facilities, people..."
- Clear button (X) appears when typing
- Cancel button (right) closes search

**Search Results**:
- Appear below search bar
- Group by type:
  - Lots
  - Facilities
  - People (if checked in)
- Each result: Icon, name, location
- Tap: Centers map on result + opens detail card
- Real-time search (debounced)

**Filter Options**:
- "Show only available lots"
- "Hide private residents"
- "Show only active check-ins"
- Checkboxes, toggles apply immediately

## Edge Cases & Error Handling

**No GPS Permission**:
- "My Location" button disabled
- Toast: "Enable location to use this feature"
- Opens app settings link

**GPS Unavailable**:
- "My Location" shows error icon
- Toast: "Can't determine your location"
- Fallback: Centers on community center

**No Check-Ins**:
- Map shows lots and facilities only
- Message in layers panel: "No active check-ins"

**Offline**:
- Shows cached map tiles
- Banner: "Offline - Map data may be outdated"
- Check-ins not available
- Lot data from cache

**Privacy Mode**:
- User's own lot shows with indicator
- "You're hidden from map" note
- Toggle to change visibility

**Very Zoomed Out**:
- Cluster check-ins: "5 check-ins"
- Cluster lots by area
- Zoom in to see detail

## Success Criteria

- ✅ User can navigate map smoothly
- ✅ All facilities and lots visible
- ✅ Check-ins update in real-time
- ✅ Privacy settings respected
- ✅ Search finds relevant results quickly

---
