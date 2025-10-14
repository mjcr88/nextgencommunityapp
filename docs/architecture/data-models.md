# Data Models

## Overview

The Ecovilla platform data model is organized into **7 core domains**:

1. **Tenant & User Domain** - Multi-tenancy, user management, profiles, connections
2. **Location & Community Domain** - Physical locations, check-ins, spatial features
3. **Events Domain** - Community events, RSVPs, calendar
4. **Exchange Domain** - Listings, requests, transactions, resource sharing
5. **Service Requests Domain** - Community service requests and management
6. **Telegram Integration Domain** - Message ingestion, classification, knowledge extraction
7. **AI & System Domain** - AI chat sessions, knowledge base, system entities

All entities include **multi-tenant isolation** via `tenant_id` and are protected by PostgreSQL Row Level Security (RLS) policies.

---

## Domain 1: Tenant & User Management

### 1.1 Tenant

**Purpose:** Represents a community instance (Ecovilla San Mateo, future communities). Foundation for SaaS multi-tenancy.

**Key Attributes:**

```typescript
interface Tenant {
  id: string;                    // uuid, primary key
  name: string;                  // Community name
  slug: string;                  // URL-safe identifier (unique)
  domain?: string;               // Custom domain (optional)
  status: 'active' | 'suspended' | 'trial';
  settings: {
    timezone: string;            // e.g., "America/Costa_Rica"
    locale: string;              // e.g., "en-US", "es-CR"
    features: {
      ai_assistant: boolean;
      telegram_integration: boolean;
      exchange: boolean;
      events: boolean;
      service_requests: boolean;
    };
    branding?: {
      logo_url: string;
      primary_color: string;
      accent_color: string;
    };
  };
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  domain text UNIQUE,
  status text NOT NULL DEFAULT 'active',
  settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 1.2 User

**Purpose:** Represents a community resident or admin. Foundation for authentication and authorization.

**Key Attributes:**

```typescript
interface User {
  id: string;                    // uuid, matches Supabase auth.users.id
  tenant_id: string;             // Foreign key to tenants
  email: string;                 // Primary email (unique within tenant)
  full_name: string;
  display_name?: string;         // Nickname if different from full_name
  avatar_url?: string;
  phone?: string;
  preferred_language: 'en' | 'es';
  journey_stage: 'newcomer' | 'settled_resident' | 'coordinator';
  role: 'resident' | 'coordinator' | 'admin' | 'super_admin';
  lot_assignment?: string;       // Lot number or identifier
  bio?: string;                  // Max 280 characters
  interests: string[];           // Array of interest IDs
  skills: string[];              // Array of skill tags
  privacy_settings: {
    map_visibility: boolean;     // Show on community map
    profile_visibility: 'public' | 'community_only' | 'private';
    show_email: boolean;
    show_phone: boolean;
  };
  notification_preferences: {
    push_enabled: boolean;
    email_digest: 'daily' | 'weekly' | 'never';
    event_reminders: boolean;
    exchange_requests: boolean;
    check_in_nearby: boolean;
  };
  status: 'active' | 'pending' | 'inactive';
  last_active_at?: string;
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  email text NOT NULL,
  full_name text NOT NULL,
  display_name text,
  avatar_url text,
  phone text,
  preferred_language text DEFAULT 'en',
  journey_stage text DEFAULT 'newcomer',
  role text DEFAULT 'resident',
  lot_assignment text,
  bio text,
  interests text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  privacy_settings jsonb NOT NULL DEFAULT '{}',
  notification_preferences jsonb NOT NULL DEFAULT '{}',
  status text DEFAULT 'active',
  last_active_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, email)
);
```

**RLS Policies:**

```sql
-- Users can view other users in their tenant
CREATE POLICY "Tenant members view users"
ON users FOR SELECT
USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Users can only update their own profile
CREATE POLICY "Users update own profile"
ON users FOR UPDATE
USING (id = auth.uid());
```

### 1.3 UserConnection (NEW)

**Purpose:** Represents connections between residents, enabling private invites to events and check-ins.

**Key Attributes:**

```typescript
interface UserConnection {
  id: string;
  tenant_id: string;
  user_id: string;               // Requester
  connected_user_id: string;     // Recipient
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),
  connected_user_id uuid NOT NULL REFERENCES users(id),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, connected_user_id),
  CHECK (user_id != connected_user_id)
);
```

**Relationships:**
- Belongs to a Tenant
- Belongs to two Users (bidirectional)
- Used for filtering visibility (check-ins, private events)

---

## Domain 2: Location & Community

### 2.1 Location

**Purpose:** Represents physical locations within the community for map pins and check-ins.

**Key Attributes:**

```typescript
interface Location {
  id: string;
  tenant_id: string;
  name: string;                  // e.g., "Community Center", "Tool Library"
  type: string;                  // Option set ID (defined in option_sets table)
  description: string;
  latitude: number;
  longitude: number;
  address?: string;              // OPTIONAL - not used in Costa Rica
  photo_url?: string;
  amenities: string[];           // e.g., ["wifi", "restrooms", "parking"]
  hours?: {
    [day: string]: { open: string; close: string } | 'closed';
  };
  capacity?: number;
  status: 'accessible' | 'temporarily_unavailable' | 'under_construction';
  created_by: string;
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  name text NOT NULL,
  type text NOT NULL,            -- References option_sets
  description text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  address text,                  -- Optional
  photo_url text,
  amenities text[] DEFAULT '{}',
  hours jsonb,
  capacity integer,
  status text NOT NULL DEFAULT 'accessible',
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Relationships:**
- Belongs to a Tenant
- Has many CheckIns
- Has many Events

**Option Set (location_type):**
- To be defined in option_sets table
- Examples: facility, gathering_spot, service_area, outdoor_space, custom

### 2.2 CheckIn

**Purpose:** User checking in at a location to share presence with community.

**Key Attributes:**

```typescript
interface CheckIn {
  id: string;
  tenant_id: string;
  user_id: string;
  location_id: string;
  activity_description: string;  // Max 280 chars
  visibility: 'everyone' | 'connections' | 'specific_neighborhood' | 'selected_users';
  selected_user_ids?: string[];  // If visibility = 'selected_users'
  duration_minutes: number;
  expires_at: string;            // Auto-calculated from duration
  is_expired: boolean;           // Computed field for queries
  latitude: number;              // Actual GPS (may differ from location)
  longitude: number;
  responses: CheckInResponse[];  // Auto-responses from other users
  created_at: string;
}

interface CheckInResponse {
  user_id: string;
  response: 'on_my_way' | 'be_in_touch' | 'have_fun';
  created_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),
  location_id uuid NOT NULL REFERENCES locations(id),
  activity_description text NOT NULL,
  visibility text NOT NULL DEFAULT 'everyone',
  selected_user_ids uuid[],
  duration_minutes integer NOT NULL,
  expires_at timestamptz NOT NULL,
  is_expired boolean GENERATED ALWAYS AS (expires_at < now()) STORED,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  responses jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_check_ins_active ON check_ins (tenant_id, is_expired)
WHERE is_expired = false;
```

**Relationships:**
- Belongs to a User
- Belongs to a Location
- Belongs to a Tenant

**RLS Policy:**

```sql
-- Users see check-ins based on visibility rules
CREATE POLICY "Users see check-ins based on visibility"
ON check_ins FOR SELECT
USING (
  tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid())
  AND is_expired = false
  AND (
    visibility = 'everyone'
    OR (visibility = 'connections' AND EXISTS (
      SELECT 1 FROM user_connections 
      WHERE (user_id = auth.uid() AND connected_user_id = check_ins.user_id)
         OR (connected_user_id = auth.uid() AND user_id = check_ins.user_id)
      AND status = 'accepted'
    ))
    OR (visibility = 'selected_users' AND auth.uid() = ANY(selected_user_ids))
    OR user_id = auth.uid()
  )
);
```

**Note:** Expired check-ins are kept for metrics/insights (not deleted).

---

## Domain 3: Events

### 3.1 Event

**Purpose:** Community events (official and resident-created).

**Key Attributes:**

```typescript
interface Event {
  id: string;
  tenant_id: string;
  title: string;
  description: string;           // Markdown supported
  category: string;              // Option set ID
  event_type: 'official_community_wide' | 'official_neighborhood' | 'resident_event';
  start_time: string;
  end_time: string;
  is_all_day: boolean;
  location_id?: string;
  custom_location?: string;      // If not using location_id
  photo_url?: string;
  created_by: string;            // Organizer
  rsvp_enabled: boolean;
  max_attendees?: number;
  rsvp_deadline?: string;
  allow_guests: boolean;
  status: 'draft' | 'published' | 'cancelled';
  moderation_status: 'published' | 'flagged' | 'under_review';
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,        -- References option_sets
  event_type text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  is_all_day boolean DEFAULT false,
  location_id uuid REFERENCES locations(id),
  custom_location text,
  photo_url text,
  created_by uuid NOT NULL REFERENCES users(id),
  rsvp_enabled boolean DEFAULT true,
  max_attendees integer,
  rsvp_deadline timestamptz,
  allow_guests boolean DEFAULT false,
  status text DEFAULT 'published',
  moderation_status text DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a User (creator/organizer)
- Optionally belongs to a Location
- Has many RSVPs

**Auto-Publication Rule:**
- All events (including resident-created) are auto-published (status = 'published')
- Admins review post-publication if needed

**Option Set (event_category):**
- To be defined in option_sets table
- Examples: social, governance, workshop, sports, culture, wellness, work_party, other

### 3.2 RSVP

**Purpose:** Event attendance tracking.

**Key Attributes:**

```typescript
interface RSVP {
  id: string;
  event_id: string;
  user_id: string;
  tenant_id: string;
  status: 'going' | 'maybe' | 'not_going';
  guest_count: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id),
  user_id uuid NOT NULL REFERENCES users(id),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  status text NOT NULL DEFAULT 'going',
  guest_count integer DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);
```

**Relationships:**
- Belongs to an Event
- Belongs to a User
- Unique constraint: one RSVP per user per event

---

## Domain 4: Exchange

### 4.1 Listing

**Purpose:** Items, services, produce, products, rides available in community exchange.

**Key Attributes:**

```typescript
interface Listing {
  id: string;
  tenant_id: string;
  title: string;
  description: string;
  type: 'tool' | 'produce' | 'service' | 'product' | 'ride' | 'other';
  category: string;              // Option set ID (depends on type)
  owner_id: string;
  photos: string[];
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'for_parts'; // Only for physical items
  
  // CONDITIONAL FIELDS (only for borrowable items like tools)
  availability_start?: string;   // Only for tools/borrowable items
  availability_end?: string;     // Only for tools/borrowable items
  max_borrow_days?: number;      // Only for tools/borrowable items
  deposit_required?: boolean;    // Only for tools/borrowable items
  deposit_amount?: number;       // Only for tools/borrowable items
  
  quantity: number;
  pickup_location: string;
  delivery_available: boolean;
  
  // PRICING
  is_free: boolean;              // Toggle
  price?: number;                // If not free
  
  status: 'available' | 'reserved' | 'borrowed' | 'unavailable';
  moderation_status: 'published' | 'flagged' | 'under_review' | 'unlisted';
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  category text NOT NULL,        -- References option_sets
  owner_id uuid NOT NULL REFERENCES users(id),
  photos text[] DEFAULT '{}',
  condition text,
  
  -- Conditional fields
  availability_start date,
  availability_end date,
  max_borrow_days integer,
  deposit_required boolean,
  deposit_amount numeric,
  
  quantity integer NOT NULL DEFAULT 1,
  pickup_location text NOT NULL,
  delivery_available boolean DEFAULT false,
  
  -- Pricing
  is_free boolean DEFAULT true,
  price numeric,
  
  status text DEFAULT 'available',
  moderation_status text DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a User (owner)
- Has many ListingRequests

**Option Sets by Type:**
- **tool**: power_tools, hand_tools, garden_tools, etc.
- **produce**: fruit, vegetables, baked_goods, eggs, dairy, etc.
- **service**: tutoring, massage, cleaning, gardening, etc.
- **product**: clothing, furniture, electronics, books, etc.
- **ride**: rideshare, carpool, airport_ride, etc.
- **other**: miscellaneous

**Field Logic:**
- `condition`, `availability_start`, `availability_end`, `max_borrow_days`, `deposit_required`, `deposit_amount` only shown for `type = 'tool'` or other borrowable items
- `price` only shown if `is_free = false`

### 4.2 ListingRequest

**Purpose:** Request to borrow/use a listing (structured workflow).

**Key Attributes:**

```typescript
interface ListingRequest {
  id: string;
  listing_id: string;
  requester_id: string;
  tenant_id: string;
  preferred_start_date: string;
  preferred_end_date: string;
  message?: string;              // Max 250 chars
  status: 'pending' | 'approved' | 'declined' | 'cancelled';
  owner_response?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE listing_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES listings(id),
  requester_id uuid NOT NULL REFERENCES users(id),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  preferred_start_date date NOT NULL,
  preferred_end_date date NOT NULL,
  message text,
  status text DEFAULT 'pending',
  owner_response text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Relationships:**
- Belongs to a Listing
- Belongs to a User (requester)
- Can become a ListingTransaction (when approved)

### 4.3 ListingTransaction

**Purpose:** Tracks borrow/lend cycle after request approval.

**Key Attributes:**

```typescript
interface ListingTransaction {
  id: string;
  listing_request_id: string;
  listing_id: string;
  owner_id: string;
  borrower_id: string;
  tenant_id: string;
  start_date: string;
  due_date: string;
  returned_date?: string;
  deposit_held: number;
  deposit_released: boolean;
  borrower_confirmed_pickup: boolean;
  borrower_confirmed_return: boolean;
  owner_confirmed_return: boolean;
  condition_on_return?: 'good' | 'damaged' | 'lost';
  notes?: string;
  status: 'active' | 'completed' | 'overdue' | 'disputed';
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE listing_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_request_id uuid NOT NULL REFERENCES listing_requests(id),
  listing_id uuid NOT NULL REFERENCES listings(id),
  owner_id uuid NOT NULL REFERENCES users(id),
  borrower_id uuid NOT NULL REFERENCES users(id),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  start_date date NOT NULL,
  due_date date NOT NULL,
  returned_date date,
  deposit_held numeric DEFAULT 0,
  deposit_released boolean DEFAULT false,
  borrower_confirmed_pickup boolean DEFAULT false,
  borrower_confirmed_return boolean DEFAULT false,
  owner_confirmed_return boolean DEFAULT false,
  condition_on_return text,
  notes text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Auto-update status to overdue
CREATE OR REPLACE FUNCTION update_overdue_transactions()
RETURNS void AS $
BEGIN
  UPDATE listing_transactions
  SET status = 'overdue'
  WHERE status = 'active'
    AND due_date < CURRENT_DATE
    AND returned_date IS NULL;
END;
$ LANGUAGE plpgsql;
```

**Relationships:**
- Belongs to a ListingRequest
- Belongs to a Listing
- Belongs to User (owner and borrower)

---

## Domain 5: Service Requests

### 5.1 ServiceRequest

**Purpose:** Residents submit requests for community services (maintenance, infrastructure, etc.).

**Key Attributes:**

```typescript
interface ServiceRequest {
  id: string;
  tenant_id: string;
  submitted_by: string;
  category: string;              // Option set ID (triggers n8n workflows)
  title: string;
  description: string;
  location_id?: string;          // Location from map
  location_latitude?: number;    // Or pin on map
  location_longitude?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  photos: string[];
  status: 'submitted' | 'in_review' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: string;          // Auto-mapped based on category
  admin_notes?: string;          // Internal only
  resolution_notes?: string;     // Visible to requester
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  submitted_by uuid NOT NULL REFERENCES users(id),
  category text NOT NULL,        -- References option_sets
  title text NOT NULL,
  description text NOT NULL,
  location_id uuid REFERENCES locations(id),
  location_latitude numeric,
  location_longitude numeric,
  priority text DEFAULT 'medium',
  photos text[] DEFAULT '{}',
  status text DEFAULT 'submitted',
  assigned_to uuid REFERENCES users(id),
  admin_notes text,
  resolution_notes text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a User (submitter)
- Optionally belongs to a Location
- Optionally assigned to a User (admin/coordinator)

**Option Set (service_request_category):**
- To be defined based on community processes
- Each category can trigger specific n8n workflows
- Examples: maintenance, infrastructure, landscaping, security, administrative

**Auto-Assignment Logic:**
- Category → assigned_to mapping (configurable in option_sets)
- Can trigger n8n workflows for external tool integration (Google Sheets, etc.)

---

## Domain 6: Content & Summaries (n8n Integration Output)

### 6.1 ContentSummary

**Purpose:** Stores n8n-generated summaries from Telegram groups for home feed display and AI Assistant context.

**Key Attributes:**

```typescript
interface ContentSummary {
  id: string;
  tenant_id: string;
  interest_area: string;         // Option set ID (user interests)
  timeframe: 'daily' | 'weekly' | 'monthly';
  summary_date: string;          // Date/period covered
  summary_text: string;          // n8n/GPT-4 generated summary
  key_topics: string[];          // Extracted topics
  contributors: Contributor[];   // Users who participated
  links: ExternalLink[];         // Referenced URLs (PDFs, docs, Telegram links)
  source_group_name: string;     // Original Telegram group
  message_count: number;         // Number of messages summarized
  created_at: string;
  updated_at: string;
}

interface Contributor {
  username: string;              // Telegram @username
  display_name: string;
  message_count: number;
}

interface ExternalLink {
  url: string;
  title?: string;
  type: 'pdf' | 'document' | 'telegram_message' | 'website' | 'other';
  description?: string;
}
```

**Database Schema:**

```sql
CREATE TABLE content_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  interest_area text NOT NULL,
  timeframe text NOT NULL,
  summary_date date NOT NULL,
  summary_text text NOT NULL,
  key_topics text[] DEFAULT '{}',
  contributors jsonb NOT NULL DEFAULT '[]',
  links jsonb NOT NULL DEFAULT '[]',
  source_group_name text NOT NULL,
  message_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, interest_area, timeframe, summary_date)
);

CREATE INDEX idx_content_summaries_interest 
ON content_summaries (tenant_id, interest_area, summary_date DESC);
```

**Relationships:**
- Belongs to a Tenant
- Referenced by ActivityFeedItems
- Referenced by ContentEmbeddings for AI search

**RLS Policy:**

```sql
-- All tenant members can view summaries
CREATE POLICY "Tenant members view summaries"
ON content_summaries FOR SELECT
USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));
```

**Option Set (interest_area):**
- Matches user interest preferences
- Examples: sustainability, wellness, food_growing, community_life, skills_sharing, governance

**n8n Integration Notes:**
- n8n creates/updates these records daily/weekly/monthly
- Summary text includes: key conversations, decisions made, questions asked
- Contributors array tracks participation for gamification/recognition
- Links array enables click-through to original sources

### 6.2 ContentEmbedding

**Purpose:** Vector embeddings for AI Assistant semantic search (RAG).

**Key Attributes:**

```typescript
interface ContentEmbedding {
  id: string;
  tenant_id: string;
  content_summary_id: string;    // Links to content_summaries
  embedding: number[];           // 1536-dimensional vector (text-embedding-3-large)
  created_at: string;
}
```

**Database Schema:**

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE content_embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  content_summary_id uuid NOT NULL REFERENCES content_summaries(id) ON DELETE CASCADE,
  embedding vector(1536) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(content_summary_id)
);

-- Create index for fast cosine similarity search
CREATE INDEX idx_content_embeddings_vector 
ON content_embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a ContentSummary (one-to-one)
- Used by AI Assistant for semantic search

**RLS Policy:**

```sql
-- All tenant members can search embeddings
CREATE POLICY "Tenant members search embeddings"
ON content_embeddings FOR SELECT
USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));
```

**AI Assistant Integration:**
- When user asks a question, generate query embedding
- Perform cosine similarity search in content_embeddings
- Return top 5 most relevant content_summaries
- GPT-4 uses summaries as context for response
- Citations include: summary date, interest area, source group, and links to original sources

---

## Domain 7: AI & System

### 7.1 AIChatSession

**Purpose:** Tracks AI assistant chat sessions for conversation history and context.

**Key Attributes:**

```typescript
interface AIChatSession {
  id: string;
  tenant_id: string;
  user_id: string;
  title?: string;                // Auto-generated from first message
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE ai_chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),
  title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_chat_sessions_user 
ON ai_chat_sessions (user_id, created_at DESC);
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a User
- Has many AIChatMessages

**RLS Policy:**

```sql
-- Users can only see their own chat sessions
CREATE POLICY "Users view own chat sessions"
ON ai_chat_sessions FOR SELECT
USING (user_id = auth.uid());

-- Users can only create their own chat sessions
CREATE POLICY "Users create own chat sessions"
ON ai_chat_sessions FOR INSERT
WITH CHECK (user_id = auth.uid());
```

### 7.2 AIChatMessage

**Purpose:** Stores messages in AI chat sessions with RAG citations.

**Key Attributes:**

```typescript
interface AIChatMessage {
  id: string;
  session_id: string;
  tenant_id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: RAGSource[];         // For assistant messages with citations
  created_at: string;
}

interface RAGSource {
  type: 'content_summary';       // Links to content_summaries
  summary_id: string;
  interest_area: string;
  summary_date: string;
  excerpt: string;               // Relevant portion of summary
  links?: string[];              // URLs from summary.links
}
```

**Database Schema:**

```sql
CREATE TABLE ai_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  role text NOT NULL,
  content text NOT NULL,
  sources jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_chat_messages_session 
ON ai_chat_messages (session_id, created_at ASC);
```

**Relationships:**
- Belongs to an AIChatSession
- Belongs to a Tenant
- References ContentSummary via sources (for citations)

**RLS Policy:**

```sql
-- Users can only see messages from their own sessions
CREATE POLICY "Users view own chat messages"
ON ai_chat_messages FOR SELECT
USING (
  session_id IN (
    SELECT id FROM ai_chat_sessions WHERE user_id = auth.uid()
  )
);

-- Users can only create messages in their own sessions
CREATE POLICY "Users create own chat messages"
ON ai_chat_messages FOR INSERT
WITH CHECK (
  session_id IN (
    SELECT id FROM ai_chat_sessions WHERE user_id = auth.uid()
  )
);
```

**AI RAG Integration:**
- User query → generate embedding
- Search content_embeddings for similar vectors
- Retrieve top 5 content_summaries
- GPT-4 uses summaries as context
- Response includes sources with citations to original Telegram content

### 7.3 OptionSet

**Purpose:** Centralized option set definitions for dropdowns, categories, and configurable lists.

**Key Attributes:**

```typescript
interface OptionSet {
  id: string;
  tenant_id?: string;            // null = global option set
  set_name: string;              // e.g., "location_type", "event_category"
  options: OptionSetItem[];
  created_at: string;
  updated_at: string;
}

interface OptionSetItem {
  id: string;
  label: string;
  value: string;
  metadata?: Record<string, any>;
}
```

**Database Schema:**

```sql
CREATE TABLE option_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  set_name text NOT NULL,
  options jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, set_name)
);

CREATE INDEX idx_option_sets_tenant 
ON option_sets (tenant_id, set_name);
```

**Relationships:**
- Optionally belongs to a Tenant (global if tenant_id is null)
- Referenced by: Location.type, Event.category, Listing.type, Listing.category, ServiceRequest.category, User.interests, ContentSummary.interest_area

**RLS Policy:**

```sql
-- All tenant members can view option sets
CREATE POLICY "Tenant members view option sets"
ON option_sets FOR SELECT
USING (
  tenant_id IS NULL -- Global option sets
  OR tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid())
);

-- Only admins can modify option sets
CREATE POLICY "Admins manage option sets"
ON option_sets FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);
```

**Example Option Sets:**

```json
// location_type
{
  "set_name": "location_type",
  "options": [
    { "id": "facility", "label": "Facility", "value": "facility" },
    { "id": "gathering_spot", "label": "Gathering Spot", "value": "gathering_spot" },
    { "id": "service_area", "label": "Service Area", "value": "service_area" },
    { "id": "outdoor_space", "label": "Outdoor Space", "value": "outdoor_space" },
    { "id": "custom", "label": "Custom", "value": "custom" }
  ]
}

// event_category
{
  "set_name": "event_category",
  "options": [
    { "id": "social", "label": "Social", "value": "social" },
    { "id": "governance", "label": "Governance", "value": "governance" },
    { "id": "workshop", "label": "Workshop", "value": "workshop" },
    { "id": "sports", "label": "Sports", "value": "sports" },
    { "id": "culture", "label": "Culture", "value": "culture" },
    { "id": "wellness", "label": "Wellness", "value": "wellness" },
    { "id": "work_party", "label": "Work Party", "value": "work_party" },
    { "id": "other", "label": "Other", "value": "other" }
  ]
}

// listing_type
{
  "set_name": "listing_type",
  "options": [
    { "id": "tool", "label": "Tool", "value": "tool" },
    { "id": "produce", "label": "Produce", "value": "produce" },
    { "id": "service", "label": "Service", "value": "service" },
    { "id": "product", "label": "Product", "value": "product" },
    { "id": "ride", "label": "Ride", "value": "ride" },
    { "id": "other", "label": "Other", "value": "other" }
  ]
}

// listing_category_produce (depends on type=produce)
{
  "set_name": "listing_category_produce",
  "options": [
    { "id": "fruit", "label": "Fruit", "value": "fruit" },
    { "id": "vegetables", "label": "Vegetables", "value": "vegetables" },
    { "id": "baked_goods", "label": "Baked Goods", "value": "baked_goods" },
    { "id": "eggs", "label": "Eggs", "value": "eggs" },
    { "id": "dairy", "label": "Dairy", "value": "dairy" },
    { "id": "other", "label": "Other", "value": "other" }
  ]
}

// interest_area (used by users and content_summaries)
{
  "set_name": "interest_area",
  "options": [
    { "id": "sustainability", "label": "Sustainability", "value": "sustainability" },
    { "id": "wellness", "label": "Wellness", "value": "wellness" },
    { "id": "food_growing", "label": "Food & Growing", "value": "food_growing" },
    { "id": "community_life", "label": "Community Life", "value": "community_life" },
    { "id": "skills_sharing", "label": "Skills Sharing", "value": "skills_sharing" },
    { "id": "governance", "label": "Governance", "value": "governance" },
    { "id": "events", "label": "Events", "value": "events" }
  ]
}
```

### 7.4 Notification

**Purpose:** Tracks all notifications sent to users (push, in-app, email).

**Key Attributes:**

```typescript
interface Notification {
  id: string;
  tenant_id: string;
  user_id: string;
  type: 'event_reminder' | 'exchange_request' | 'check_in_nearby' | 
        'rsvp_confirmation' | 'item_overdue' | 'service_request_update' |
        'system_announcement' | 'connection_request' | 'connection_accepted';
  title: string;
  body: string;
  related_entity_type?: 'event' | 'listing' | 'check_in' | 'service_request' | 'user_connection';
  related_entity_id?: string;
  action_url?: string;           // Deep link
  delivery_method: 'push' | 'in_app' | 'email' | 'all';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  sent_at?: string;
  read_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),
  type text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  related_entity_type text,
  related_entity_id uuid,
  action_url text,
  delivery_method text NOT NULL DEFAULT 'all',
  status text NOT NULL DEFAULT 'pending',
  sent_at timestamptz,
  read_at timestamptz,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_notifications_user_unread 
ON notifications (user_id, status) 
WHERE status IN ('sent', 'delivered');

CREATE INDEX idx_notifications_pending 
ON notifications (status, created_at) 
WHERE status = 'pending';
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a User
- Optionally relates to Event, Listing, CheckIn, ServiceRequest, UserConnection

**RLS Policy:**

```sql
-- Users can only see their own notifications
CREATE POLICY "Users view own notifications"
ON notifications FOR SELECT
USING (user_id = auth.uid());

-- Users can mark their own notifications as read
CREATE POLICY "Users update own notifications"
ON notifications FOR UPDATE
USING (user_id = auth.uid());
```

### 7.5 ActivityFeedItem

**Purpose:** Personalized home feed aggregation (Actions, Updates, Recent Activity).

**Key Attributes:**

```typescript
interface ActivityFeedItem {
  id: string;
  tenant_id: string;
  user_id: string;              // Target user for personalization
  category: 'action' | 'update' | 'activity';
  priority: number;             // For sorting (higher = more important)
  
  // Action items (things requiring user attention)
  action_type?: 'event_rsvp' | 'item_overdue' | 'request_pending' | 'connection_request';
  
  // Update items (announcements, summaries)
  update_type?: 'announcement' | 'interest_summary' | 'system_update';
  
  // Activity items (community happenings)
  activity_type?: 'check_in' | 'new_listing' | 'new_event' | 'rsvp';
  
  source_entity_type: 'event' | 'listing' | 'check_in' | 'interest_summary' | 'announcement';
  source_entity_id: string;
  
  title: string;
  description: string;
  action_url?: string;
  
  display_from: string;         // When to start showing
  display_until?: string;       // When to stop showing (optional)
  
  is_read: boolean;
  is_dismissed: boolean;
  
  relevance_score: number;      // AI-calculated personalization score
  metadata?: Record<string, any>;
  
  created_at: string;
  updated_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE activity_feed_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),
  category text NOT NULL,
  priority integer NOT NULL DEFAULT 0,
  
  action_type text,
  update_type text,
  activity_type text,
  
  source_entity_type text NOT NULL,
  source_entity_id uuid NOT NULL,
  
  title text NOT NULL,
  description text NOT NULL,
  action_url text,
  
  display_from timestamptz NOT NULL DEFAULT now(),
  display_until timestamptz,
  
  is_read boolean DEFAULT false,
  is_dismissed boolean DEFAULT false,
  
  relevance_score numeric DEFAULT 0,
  metadata jsonb,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Fast queries for home feed
CREATE INDEX idx_feed_user_active 
ON activity_feed_items (user_id, priority DESC, created_at DESC) 
WHERE is_dismissed = false 
  AND display_from <= now() 
  AND (display_until IS NULL OR display_until > now());

-- Cleanup old dismissed items
CREATE INDEX idx_feed_cleanup 
ON activity_feed_items (created_at) 
WHERE is_dismissed = true;
```

**Relationships:**
- Belongs to a Tenant
- Belongs to a User (personalized)
- References any source entity (Event, Listing, CheckIn, InterestSummary, etc.)

**RLS Policy:**

```sql
-- Users can only see their own feed items
CREATE POLICY "Users view own feed items"
ON activity_feed_items FOR SELECT
USING (
  user_id = auth.uid()
  AND display_from <= now()
  AND (display_until IS NULL OR display_until > now())
  AND is_dismissed = false
);

-- Users can update their own feed items (mark read/dismissed)
CREATE POLICY "Users update own feed items"
ON activity_feed_items FOR UPDATE
USING (user_id = auth.uid());
```

**Feed Generation Logic:**

```typescript
// Actions Section - High Priority
// - Event RSVPs due soon
// - Overdue borrowed items
// - Pending exchange requests (if owner)
// - Connection requests

// Updates Section - Medium Priority  
// - Interest summaries (from Telegram)
// - System announcements
// - Official community updates

// Recent Activity Section - Low Priority
// - Nearby check-ins
// - New listings in user's interests
// - Upcoming events in user's interests
// - Recent RSVPs from connections
```

**Auto-Cleanup:**
- Dismissed items older than 30 days: Deleted
- Read items with display_until passed: Deleted
- Activity items older than 7 days: Deleted (except if is_read=false)

### 7.6 AdminMetric

**Purpose:** Tracks key platform metrics for admin dashboard.

**Key Attributes:**

```typescript
interface AdminMetric {
  id: string;
  tenant_id: string;
  metric_type: string;           // e.g., "active_users", "check_ins", "events"
  metric_date: string;           // Date of metric
  value: number;
  metadata?: Record<string, any>;
  created_at: string;
}
```

**Database Schema:**

```sql
CREATE TABLE admin_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  metric_type text NOT NULL,
  metric_date date NOT NULL,
  value numeric NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, metric_type, metric_date)
);
```

**Metrics to Track:**
- Daily/Weekly Active Users (DAU/WAU)
- Check-in count
- Event creation/attendance
- Exchange listing activity
- Service request volume
- AI assistant usage
- Telegram message volume
- Interest engagement levels

---
