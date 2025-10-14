# Flow 11: AI Chat Assistant

**Actor**: Any authenticated user  
**Entry Point**: AI Assistant tab or quick action  
**Goal**: Get help, ask questions, find information  
**Success Criteria**: User receives helpful, accurate response

## Flow Steps

### Screen 1: AI Chat Interface

**Entry Point**: Bottom nav → AI Assistant tab

**Top Bar**:
- "AI Assistant" title (left)
- "•••" menu (right):
  - New conversation
  - Conversation history
  - Settings
  - Help & feedback

**Chat Display** (main area):
- White/light background
- Messages stack vertically
- Auto-scroll to latest
- Pull to load more history

**Message Types**:

**1. User Message**:
- Right-aligned
- Background: Forest Canopy
- Text: White
- Border radius: 18px (top-left, top-right, bottom-left)
- Max width: 80%
- Padding: 12px 16px
- Timestamp: Below, right-aligned, gray, 12px
- Your avatar: 32px circle (right side)

**2. AI Response**:
- Left-aligned
- Background: Cloud (#F8F6F3)
- Text: Soil (#1A1A1A)
- Border radius: 18px (all except bottom-left)
- Max width: 80%
- Padding: 12px 16px
- AI avatar: 🤖 (32px circle, left)
- Markdown support: Bold, italic, lists, code blocks
- Timestamp: Below, left-aligned, gray

**3. Typing Indicator**:
- Shows when AI is processing
- Three animated dots
- Background: Cloud
- Left-aligned with AI avatar
- Smooth fade in/out

**4. Suggested Actions** (after AI response):
- Horizontal chips below AI message
- Examples:
  - "Tell me more"
  - "Show on map"
  - "Add to calendar"
  - "Find related events"
- Tap: Sends as new message
- Max 3 suggestions

**Input Area** (bottom, sticky):

**Composition**:
- White background
- Border top: 1px solid Sand
- Padding: 12px 16px
- Safe area inset (bottom)

**Text Input**:
- Multiline textarea
- Placeholder: "Ask me anything about the community..."
- Auto-expand (max 5 lines)
- Character limit: 2000
- Counter shows at 1800

**Input Controls**:
- Voice input button (left):
  - Microphone icon
  - Tap: Start voice recording
  - Hold: Record while held
  - Red pulse when active
- Attachment button (optional, future):
  - Paperclip icon
  - Upload images/files
- Send button (right):
  - Arrow/send icon
  - Disabled when empty
  - Forest Canopy when enabled
  - Tap: Send message

**Voice Input Modal**:

**Trigger**: Tap microphone button

**Design**:
- Full screen overlay
- Semi-transparent dark background
- Centered card

**Content**:
- Large microphone icon (pulsing)
- "Listening..." text
- Waveform visualization
- Live transcription (optional)
- Timer: "0:23"

**Controls**:
- "Cancel" (text link, top)
- Tap outside: Cancel
- Release: Send transcription
- Swipe up: Lock recording

### Screen 2: Conversation History

**Trigger**: Menu → "Conversation history"

**Design**:
- Full screen
- White background
- List of past conversations

**Top Bar**:
- "Back" arrow (left)
- "Conversations" title (center)
- Search icon (right)

**Conversation List**:

**Each Conversation Card**:
- First message preview
- Timestamp: "2 hours ago"
- Message count: "(8 messages)"
- Tap: Opens conversation
- Swipe left: Delete

**Actions**:
- Tap: Resume conversation
- Long press: Context menu
  - Resume
  - Rename
  - Delete

**Empty State**:
- Icon: 💬
- "No conversation history yet"
- "Start chatting to see your conversations here"

### Screen 3: Quick Actions

**Entry Point**: Home → AI quick actions

**Quick Action Buttons**:

1. **"What's happening today?"**
   - Pre-fills prompt
   - Auto-sends
   - Shows today's events, check-ins, updates

2. **"Find tools to borrow"**
   - Opens AI chat
   - Pre-fills: "Show me available tools"
   - AI lists exchange items

3. **"When is the next event?"**
   - Quick query
   - AI responds with next 3 events
   - Add to calendar buttons

4. **"Who can help with [skill]?"**
   - Input: Skill name
   - AI searches user profiles
   - Shows list with contact info

**Quick Action Design**:
- Horizontal scroll (Home screen)
- Card style
- Icon + label
- Tap: Executes action
- Max 6 actions visible

### Screen 4: AI Response Types

**Text Response**:
- Standard message bubble
- Markdown formatted
- Links: Underlined, River Current
- Tap link: Opens in-app or browser

**List Response**:
- Structured data
- Numbered or bulleted
- Each item clickable
- Actions: Tap to expand

**Card Response** (rich content):
- Event card: Photo, title, date, RSVP button
- Listing card: Photo, title, owner, "Request" button
- User card: Avatar, name, skills, "View profile"
- Location card: Map preview, address, "Get directions"

**Multiple Choice**:
- Question from AI
- Chip buttons for options
- Tap: Selects and sends

**Error Response**:
- Icon: ⚠️
- Message: "I couldn't process that"
- Suggestions: Rephrase or try again
- "Report issue" link

## Edge Cases & Error Handling

**No Internet Connection**:
- Banner: "Offline - AI Assistant unavailable"
- Previous messages cached (read-only)
- Cannot send new messages
- Auto-reconnect when online

**AI Service Down**:
- Error message: "Assistant temporarily unavailable"
- Suggestion: "Try again in a few minutes"
- Fallback: Link to help docs

**Inappropriate Content**:
- AI detects harmful request
- Response: "I can't help with that"
- Explanation: Community guidelines
- Link to appropriate resource

**Ambiguous Query**:
- AI asks clarifying questions
- Multiple choice options
- "Did you mean..." suggestions

**Very Long Response**:
- Truncate after 500 words
- "Read more" button
- Expands in-place

**Voice Input Fails**:
- Error: "Could not transcribe"
- Options: Try again | Type instead
- Shows what was captured (if partial)

**Rate Limiting**:
- User exceeds message limit
- Message: "You've sent many messages recently"
- Cooldown: "Try again in 5 minutes"
- Shows countdown timer

**Context Lost**:
- Long conversation (>50 messages)
- AI suggests: "Start new conversation?"
- Option to continue or start fresh

## Success Criteria

- ✅ User gets helpful response within 3 seconds
- ✅ AI understands natural language queries
- ✅ Responses are accurate and actionable
- ✅ Links work and navigate correctly
- ✅ Voice input transcribes accurately

---
