# Animation & Micro-interactions

## Overview

**Philosophy**: Every animation serves a purpose - to guide attention, create continuity, communicate state, or spark joy. Motion makes the digital feel alive and believable. We treat the UI not as static screens, but as a connected, flowing experience - like a movie where each scene transitions seamlessly into the next.

**Emotional Design Approach**: Inspired by Duolingo's beloved owl mascot, we use character-driven design to create emotional connection, celebrate progress, provide encouragement, and make the app feel alive and personal.

---

## Motion Design Principles

### The Five Pillars of Ecovilla Motion

**1. Making Interactive Possibilities Immediately Apparent**

Visual language that signals "this is interactive" before any touch:

- **Buttons breathe**: Subtle scale pulse (1.0 → 1.02 → 1.0) on a 3-second loop when idle
- **Swipeable cards show depth**: Shadow increases on drag, revealing the action beneath
- **Draggable elements lift**: Gentle elevation increase on press (z-index + shadow)
- **Links have personality**: Underline slides in from left on hover (100ms)
- **Floating Action Buttons pulse**: Soft glow pulse to draw attention to primary actions

**Implementation** (using Magic UI + custom CSS):
```tsx
// Breathing button
<Button className="animate-pulse-subtle">
  Create Event
</Button>

// CSS
@keyframes pulse-subtle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}
```

**2. Creating Responsive Interfaces with Immediate Visual Response**

Every interaction gets instant feedback (0-50ms response time):

- **Button press**: Immediate scale down to 0.95, then spring back (150ms total)
- **Input focus**: Border color + subtle glow transition in 150ms
- **Toggle switches**: Smooth 200ms slide + background color fade
- **Icon state changes**: Micro-bounce effect on state change (checkmarks, favorites)
- **Touch ripple**: Expanding circle from touch point (Material Design inspired)

**Timing Standards**:
- **Immediate response**: 0-50ms (must feel instant)
- **Micro-interactions**: 150-300ms (button press, toggle, checkbox)
- **Transitions**: 300-500ms (screen change, modal, drawer)
- **Animations**: 500-1000ms (celebrations, illustrations)
- **Ambient motion**: 2-5s loops (breathing, floating, gentle sway)

**Easing Functions**:
```css
/* Enter screen - Smooth deceleration */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Exit screen - Quick acceleration */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);

/* Spring bounce - Playful energy */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Standard - Material Design default */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
```

**3. Creating Spatial Continuity Through Purposeful Motion**

Elements move in ways that show relationships and maintain orientation:

- **Screen transitions**: Elements slide from navigation direction (left = back, right = forward)
- **Modal appearance**: Expands from tap location to full size (shared element transition)
- **Deleted items**: Collapse height → slide out → gap closes (300ms total)
- **Card to detail**: Card morphs and expands into detail view (500ms)
- **Tab switching**: Content slides left/right based on tab order

**Example - Card to Detail Transition**:
```tsx
// Using Magic UI's MorphingCard
<MorphingCard
  from="list"
  to="detail"
  duration={400}
  easing="ease-out"
>
  {/* Card content */}
</MorphingCard>
```

**4. Creating Believable Digital Experiences Through Natural Movement**

Motion follows physics, not mathematics:

- **Use spring physics over linear**: React Spring or Framer Motion for natural feel
- **Heavier elements have inertia**: Modals, drawers move slower than small elements
- **Follow-through and overlap**: Title animates, then content (staggered by 50-100ms)
- **Subtle parallax on scroll**: Background moves slower (0.5x speed) than foreground
- **Momentum and drag**: Swipe gestures have natural deceleration curves

**5. Communicating System Status Through Immediate Visual Response**

The app always tells you what it's doing:

- **Loading**: Skeleton screens morph into real content (Magic UI `<Skeleton>`)
- **Processing**: Progress indicators with estimated time
- **Success**: Green checkmark with subtle celebration (200ms)
- **Error**: Red shake animation + icon change (300ms)
- **Typing indicator**: Pulsing dots that feel "alive" (AI chat)
- **Uploading**: Progress bar with percentage and file preview

**State Transition Examples**:
```tsx
// Loading → Content
<FadeIn delay={200}>
  {isLoading ? (
    <Skeleton className="h-20 w-full" />
  ) : (
    <EventCard data={event} />
  )}
</FadeIn>

// Success celebration
<AnimatedCheckmark
  size={64}
  color="forest-canopy"
  duration={500}
  onComplete={() => navigate('/home')}
/>
```

---

## Character System: Emotional Design Through Avatars

### The Hummingbird Guide - App Mascot

**Personality**: Energetic, helpful, encouraging, always ready to assist. The hummingbird is your companion throughout the Ecovilla journey - never intrusive, but always there when needed.

**Visual Design**:
- **Style**: Friendly, slightly stylized illustration (not cartoon, not photorealistic)
- **Colors**: Vibrant plumage using Ecovilla palette (Forest Canopy greens, Sunrise accents)
- **Expressions**: 5-7 emotional states (happy, thoughtful, excited, encouraging, celebrating)
- **Size**: Scales from 32px (small appearances) to 200px (major moments)

**Where the Hummingbird Appears**:

1. **Onboarding**:
   - Welcomes new residents on password setup screen
   - Flies in from right, hovers center (2s loop animation)
   - Speech bubble: "Welcome to Ecovilla! Let's get you set up."
   - Celebrates completion: Does a little loop-de-loop

2. **Empty States**:
   - No events: Hummingbird sitting on branch, looking peaceful
   - No check-ins: Hummingbird looking at map curiously
   - Search no results: Hummingbird looking through magnifying glass
   - Message: Conversational, not apologetic

3. **Tutorials & Tips**:
   - First check-in: "Great spot! Others nearby can see you're here."
   - First event created: "Your event is live! I'll remind attendees."
   - Weekly digest: Small hummingbird icon next to "Your week ahead"

4. **Achievements** (future feature):
   - First month celebration
   - 10 check-ins milestone
   - Community helper badge
   - Hummingbird does celebratory flight pattern

5. **AI Assistant Avatar**:
   - Hummingbird face as AI chat avatar
   - Animated when "typing" (gentle head tilt, eye blink)
   - Different expressions based on response type

6. **Loading States**:
   - Hummingbird flies across screen trailing sparkles
   - Alternative: Hummingbird hovers with gentle wing flutter
   - Use sparingly - skeleton screens preferred for most loading

**Animation States**:
```tsx
// Hummingbird component with states
<Hummingbird
  state="celebrating" // happy, thoughtful, excited, encouraging, celebrating
  size={128}
  loop={true}
  onAnimationComplete={() => {}}
/>
```

### Personal Animal Avatars - User Identity

**Purpose**: Give each resident a unique, playful identity that appears throughout their experience. Like Duolingo's owl, these animals create emotional connection and personality.

**12 Costa Rican Animals**:

1. **Resplendent Quetzal** 🦜 - Elegant, rare, spiritual
2. **Three-Toed Sloth** 🦥 - Slow living, calm, regenerative
3. **Red-Eyed Tree Frog** 🐸 - Vibrant, playful, adaptable
4. **Scarlet Macaw** 🦜 - Social, colorful, loud (in a good way)
5. **Howler Monkey** 🐵 - Community-minded, vocal, protective
6. **Jaguar** 🐆 - Strong, independent, mysterious
7. **Toucan** 🦜 - Cheerful, distinctive, friendly
8. **Morpho Butterfly** 🦋 - Transformative, beautiful, gentle
9. **Green Sea Turtle** 🐢 - Ancient wisdom, steady, patient
10. **White-Faced Capuchin** 🐵 - Clever, curious, mischievous
11. **Strawberry Poison Dart Frog** 🐸 - Bold, tiny but mighty, colorful
12. **Collared Peccary** 🐗 - Community-focused, loyal, resourceful

**Visual Design**:
- **Style**: Consistent with hummingbird - friendly, slightly stylized
- **Expressions**: Each animal has 3-5 expressions (happy, neutral, excited, surprised, sleepy)
- **Color variations**: Users can choose color variant (maintains species traits)
- **Poses**: Sitting, waving, jumping, celebrating, sleeping

**Selection During Onboarding** (Flow 1, Step 2.5):

**Screen: "Choose Your Animal Companion"**
- Appears after "About You" step
- Grid of 12 animals (3x4 on mobile, 4x3 on desktop)
- Each card: Animated preview on hover/tap
- Animal name + personality trait below
- Tap to select, border highlights in Forest Canopy
- "You can change this anytime" helper text
- Preview: "This is how you'll appear in the community!"

**Where Personal Animals Appear**:

1. **Profile & Identity**:
   - Profile icon (instead of photo, or alongside)
   - Bottom nav avatar (if using avatar icon)
   - Map check-in pins (small version, 32px)
   - Chat/comment avatars (if messaging enabled in future)

2. **Check-In Cards**:
   - User's animal appears next to check-in location
   - Example: Sofia's sloth hanging from "Tool Library" sign
   - Animated: Gentle idle animation (breathing, blinking)

3. **Celebrations & Milestones**:
   - First check-in: Animal does happy dance
   - Event RSVP confirmed: Animal gives thumbs up
   - Item borrowed: Animal carries mini version of item
   - Returned item: Animal waves goodbye to item

4. **Empty States (Personal)**:
   - "No events yet": Your animal looking at empty calendar
   - "No check-ins": Your animal on map looking around
   - Conversational message in first person: "I haven't checked in yet"

5. **Notifications**:
   - Your animal appears in notification with relevant expression
   - Reminder: Animal gently tapping shoulder
   - Approval: Animal celebrating
   - Request: Animal presenting item

6. **Feed Items**:
   - When user posts check-in: Their animal + action
   - "Sofia's sloth checked in at Garden 🦥"
   - Small animated version flies/jumps in when card appears

**Animation Behaviors**:

```tsx
// Animal component with contextual animations
<AnimalAvatar
  animal="sloth"
  size={48}
  expression="happy"
  action="waving" // idle, waving, celebrating, sleeping, carrying-item
  loop={true}
/>

// In feed card
<FeedCard>
  <AnimalAvatar animal={user.animal} action="checking-in" />
  <Text>{user.name} checked in at Tool Library</Text>
</FeedCard>

// In celebration
<Celebration>
  <AnimalAvatar 
    animal={user.animal} 
    action="celebrating"
    confetti={true}
  />
  <Text>First check-in! 🎉</Text>
</Celebration>
```

**Personality Traits by Animal** (shown during selection):
- Sloth: "Embracing slow living and mindful moments"
- Quetzal: "Seeking beauty and deeper meaning"
- Frog: "Adaptable and full of energy"
- Macaw: "Social butterfly who loves community"
- Jaguar: "Independent spirit with strong presence"
- Toucan: "Bringing joy and color everywhere"
- Butterfly: "Embracing transformation and growth"
- Turtle: "Patient wisdom and steady progress"
- Monkey: "Curious explorer of new ideas"
- Dart Frog: "Small but mighty, bold in action"
- Peccary: "Loyal community member"

---

## Transition Choreography: Screens as Connected Scenes

**Philosophy**: Instead of discrete screens that pop in/out, create flowing transitions that maintain spatial continuity and user orientation.

### Onboarding Flow - Single Stage, Morphing Content

**Problem**: Traditional approach = 6 separate screens feel disconnected  
**Solution**: One "stage" where content morphs and transitions

**Implementation**:
```tsx
// Onboarding container maintains context
<OnboardingStage>
  {/* Step indicator always visible */}
  <ProgressBar current={step} total={6} />
  
  {/* Content area morphs between steps */}
  <AnimatePresence mode="wait">
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {renderCurrentStep()}
    </motion.div>
  </AnimatePresence>
  
  {/* Navigation buttons stay in place */}
  <NavigationButtons />
</OnboardingStage>
```

**Step Transitions**:
- Current step fades + slides left (-20px)
- New step fades + slides in from right (+20px)
- Progress bar smoothly fills (500ms, ease-out)
- Button labels morph (Next → Continue → Complete Setup)
- No screen "flash" - continuous experience

**Special Moments**:
- **Step 2 (Choose Animal)**: Grid of animals fades in staggered (50ms delay each)
- **Step 4 (Interests)**: Selected chips smoothly rearrange to top
- **Completion**: All content fades up, hummingbird flies in with celebration

### Home Feed - Living, Breathing Content

**Feed Items Entrance**:
```tsx
// Staggered fade + slide for feed items
<FadeIn delay={index * 50} direction="up" distance={20}>
  <FeedCard />
</FadeIn>
```

**Pull-to-Refresh**:
1. Pull down: Hummingbird slides into view, pulling indicator
2. Release threshold: Hummingbird does a little flip
3. Loading: Hummingbird hovers with wing flutter
4. Content loads: Items cascade in (50ms stagger)
5. Hummingbird flies away

**"All Caught Up" State**:
- Last feed item fades out bottom
- "All caught up" section fades in from center
- Hummingbird lands on branch, settles into idle pose
- Soft glow pulse around checkmark
- Message fades in: "That's everything new today!"

### Modal & Overlay Transitions

**Bottom Sheet (Mobile)**:
```tsx
<AnimatedBottomSheet
  from="bottom"
  snapPoints={[0.5, 0.9]}
  dragHandle={true}
  springConfig={{ tension: 300, friction: 30 }}
>
  {/* Content */}
</AnimatedBottomSheet>
```

- Slides up with spring physics (feels natural, not robotic)
- Drag handle shows it's interactive
- Background dimming synchronized with slide (opacity matches position)
- Dismiss: Flick down, smooth deceleration

**Dialog (Desktop)**:
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {/* Content fades in 100ms after container */}
  </DialogContent>
</Dialog>
```

- Expands from center (scale 0.9 → 1.0)
- Background blurs behind (backdrop-filter)
- Content staggers in (50ms after container)

### Navigation Transitions

**Tab Switching (Bottom Nav)**:
```tsx
<TabContent
  direction={newTab > oldTab ? 'left' : 'right'}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
  {/* Tab content */}
</TabContent>
```

- Content slides in direction of navigation
- Previous content slides out opposite direction
- Tab indicator smoothly slides to new position
- Icon scales up slightly when selected (1.0 → 1.1)

**Screen-to-Screen (Stack Navigation)**:
- Forward: New screen slides from right, old screen slides left (parallax)
- Back: Reverse animation
- Previous screen visible behind (depth perception)
- 300ms duration, ease-out curve

---

## Component-Level Animations

### Buttons

**States & Transitions**:
```tsx
<Button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15, ease: 'easeInOut' }}
>
  Click Me
</Button>
```

- **Idle**: Subtle breathe (optional, for primary CTAs)
- **Hover**: Scale 1.05, shadow deepens (desktop only)
- **Press**: Scale 0.95 instantly, spring back
- **Loading**: Spinner fades in, text fades out
- **Success**: Checkmark replaces text (500ms)

### Form Inputs

**Focus Animation**:
```tsx
<Input
  onFocus={() => setBorderColor('forest-canopy')}
  transition={{ duration: 0.15 }}
/>
```

- Border color change: 150ms
- Label slides up (if floating label)
- Subtle glow appears
- Helper text fades in below

**Validation**:
- ✅ **Success**: Green border, checkmark fades in right
- ❌ **Error**: Red border, shake animation (300ms), error text fades in

**Shake Animation**:
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}
```

### Cards

**Hover State (Desktop)**:
```tsx
<Card
  whileHover={{
    y: -4,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</Card>
```

**Tap Feedback (Mobile)**:
- Scale down to 0.98 on press
- Quick spring back on release

**Loading State**:
- Skeleton version with pulsing gradient
- Morphs into real content (crossfade 300ms)

### Lists & Feeds

**Item Entrance**:
```tsx
{items.map((item, i) => (
  <FadeIn key={item.id} delay={i * 50} direction="up">
    <ListItem data={item} />
  </FadeIn>
))}
```

- Each item delayed by 50ms (stagger effect)
- Fade + slide from below (20px)
- Max stagger: 300ms (after 6 items, no additional delay)

**Item Removal**:
1. Swipe gesture initiates
2. Item slides out direction of swipe
3. Opacity fades to 0
4. Height collapses to 0 (150ms)
5. Gap closes, items below slide up

### Toggles & Switches

```tsx
<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  <SwitchThumb />
</Switch>
```

- Thumb slides across track (200ms)
- Background color fades (200ms, synchronized)
- Haptic feedback on mobile (if supported)
- Slight bounce at end position (spring)

---

## Emotional Design Moments

### Onboarding Completion

**"Gentle + Joyful" Celebration**:

1. **Final step completes** (privacy settings saved)
2. **Screen fades up**, hummingbird flies in from right
3. **Tree planting animation**:
   - Small sapling sprouts from bottom center (1s)
   - Leaves unfold gently
   - Your chosen animal appears beside tree
   - Soft particle effects (falling leaves, not aggressive confetti)
4. **Text fades in**: "Welcome to the Ecovilla community, Sofia!"
5. **Secondary text**: "Your journey begins now 🌱"
6. **Hummingbird and animal do synchronized happy gesture** (wing flutter + animal celebration)
7. **Button appears**: "Explore Your Community" (gentle scale in)
8. **Total duration**: 3-4 seconds
9. **Auto-advance**: After 5s if no interaction

**Implementation**:
```tsx
<OnboardingComplete>
  {/* Tree grows */}
  <AnimatedTree duration={1000} />
  
  {/* Animals appear */}
  <Hummingbird state="celebrating" delay={800} />
  <AnimalAvatar animal={user.animal} action="celebrating" delay={900} />
  
  {/* Particles */}
  <FloatingLeaves count={12} duration={2000} />
  
  {/* Text */}
  <FadeIn delay={1200}>
    <Heading>Welcome to Ecovilla, {user.name}!</Heading>
  </FadeIn>
  
  <FadeIn delay={1400}>
    <Button onClick={navigateToHome}>Explore Your Community</Button>
  </FadeIn>
</OnboardingComplete>
```

### First Check-In Success

1. **Check-in posts successfully**
2. **Map pin appears with bounce** (spring animation)
3. **Your animal slides into view on the pin**
4. **Small sparkle effect** around pin (subtle)
5. **Toast notification**: "You're on the map! 📍"
6. **Hummingbird flies by briefly** (if this is truly first check-in)
7. **Encouraging message**: "Others nearby can see you're here"

### Event RSVP Confirmation

1. **"RSVP" button pressed**
2. **Button morphs**:
   - Text fades to "Confirming..."
   - Spinner appears
   - (200ms)
3. **Success**:
   - Spinner becomes checkmark
   - Background turns Forest Canopy green
   - Text: "You're going!"
   - Slight scale pulse (1.0 → 1.1 → 1.0)
4. **Your animal appears briefly**, gives thumbs up
5. **Micro-confetti** from button (8-12 particles, subtle)
6. **Button state persists**: "You're attending ✓"

### Exchange Request Sent

1. **"Send Request" pressed**
2. **Your animal picks up a tiny envelope**
3. **Animal runs/flies across screen** (1s journey)
4. **Envelope delivered to owner's avatar**
5. **Success toast**: "Request sent to Marcus!"
6. **Your animal returns, waves**

### Weekly "All Caught Up" Moment

When user reaches end of feed on Sunday evening:

1. **Last feed item**
2. **"All caught up" section fades in**
3. **Your animal sitting peacefully** (idle animation)
4. **Hummingbird lands on nearby branch**
5. **Text**: "That's everything new this week, Sofia!"
6. **Secondary**: "Great week in the community 💚"
7. **Optional stat**: "You checked in 5 times, attended 2 events"
8. **Both animals do small celebration** (if stats are notable)
9. **Gentle glow pulse** around checkmark
10. **CTA**: "See you tomorrow!" with sun/moon icon

---

## Accessibility & Performance Considerations

### Reduced Motion Support

**Respect user preferences**:
```tsx
const prefersReducedMotion = useReducedMotion()

<motion.div
  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
>
  {content}
</motion.div>
```

**When reduced motion enabled**:
- Transitions become instant crossfades
- Movement animations disabled
- Scale/rotation animations disabled
- Position changes become instant
- Maintain state changes (still show success/error)

### Battery & Performance

**Conditional Animations**:
- Disable ambient animations (breathing buttons) on low battery
- Reduce particle effects on older devices
- Skip non-essential decorative animations
- Maintain functional animations (loading, state changes)

**Optimization**:
- Use CSS transforms (not position properties)
- GPU-accelerated animations (transform, opacity)
- RequestAnimationFrame for JavaScript animations
- Lazy load animation libraries
- Preload character illustrations

---

## Implementation Checklist

When implementing any animation:

- [ ] Duration follows standards (150-500ms for most)
- [ ] Easing curve appropriate for direction
- [ ] Respects reduced motion preference
- [ ] Works on low-end devices
- [ ] Provides functional value (not just decoration)
- [ ] Tested on real mobile devices
- [ ] Doesn't block user interaction
- [ ] Enhances understanding (communicates state/relationship)
- [ ] Feels natural and believable
- [ ] Delights without annoying

---

## Magic UI Component Usage Map

**Recommended Magic UI components for Ecovilla flows**:

| Use Case | Magic UI Component | Customization |
|----------|-------------------|---------------|
| Onboarding text | `<AnimatedText>` | Fade-in, gentle timing |
| Welcome celebration | `<Confetti>` (subtle) | Green/earth tones, fewer particles |
| Loading states | `<Skeleton>` | Cloud background, Forest border |
| Success checkmark | `<AnimatedCheckmark>` | Forest Canopy color |
| Card entrance | `<FadeIn>` | Stagger by 50ms |
| Screen transition | `<SlideIn>` | Direction-based |
| Pull-to-refresh | `<Spinner>` (custom) | Hummingbird version |
| Progress indicator | `<ProgressBar>` | Smooth fill animation |
| Character float | `<FloatingElement>` | Gentle hover motion |
| Feed item reveal | `<ScrollReveal>` | Fade + slide up |
| Modal overlay | `<FadeIn>` | Background blur |
| Empty state | Custom illustration | Your animal + hummingbird |

---

**Next Section**: Content & Micro-copy Guidelines (voice, tone, messaging throughout the app)

---
