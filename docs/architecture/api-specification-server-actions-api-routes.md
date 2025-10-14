# API Specification (Server Actions & API Routes)

This section defines the core Server Actions (SA) and API Routes (API) required to implement the functional requirements, organized by data domain. All Server Actions are implemented within the Next.js application layer and utilize the Supabase client with RLS for authorization.

## Domain 1: Tenant & User Management

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `updateProfile` | SA | Updates user profile details (name, bio, interests, etc.). | `full_name`, `bio`, `interests`, `skills`, `privacy_settings`, `preferred_language` | `User` object | User must be authenticated (`auth.uid()`). RLS policy on `users` table. |
| `getUserProfile` | SA | Retrieves a specific user's profile (respecting privacy settings). | `user_id` | `User` object (filtered) | RLS policy on `users` table. |
| `searchUsers` | SA | Searches for users within the tenant. | `query` (text), `limit` (int) | Array of `User` objects (filtered) | RLS policy on `users` table. |
| `sendConnectionRequest` | SA | Creates a new connection request. | `target_user_id` | `UserConnection` object | User must be authenticated. |
| `respondToConnectionRequest` | SA | Accepts or declines a connection request. | `request_id`, `status` ('accepted' or 'declined') | `UserConnection` object | User must be the recipient. |
| `getTenantSettings` | SA | Retrieves tenant-specific settings and features. | None | `Tenant` object | RLS policy on `tenants` table. |

## Domain 2: Location & Community

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `createCheckIn` | SA | Posts a new check-in for the user. | `location_id`, `activity_description`, `duration_minutes`, `visibility`, `latitude`, `longitude` | `CheckIn` object | User must be authenticated and active in the tenant. |
| `endCheckIn` | SA | Manually ends an active check-in. | `check_in_id` | `CheckIn` object | User must be the owner of the check-in. |
| `getCheckIns` | SA | Retrieves active check-ins visible to the user (for map/feed). | Optional filters: `location_id`, `user_id` | Array of `CheckIn` objects | RLS policy on `check_ins` table handles visibility. |
| `respondToCheckIn` | SA | Allows a user to send an emoji response. | `check_in_id`, `response` ('on_my_way', etc.) | `CheckIn` object | User must be authenticated. |
| `getLocations` | SA | Retrieves all community locations for the map. | None | Array of `Location` objects | RLS policy on `locations` table. |
| `createLocation` | SA | Admin action to add a new community location. | `name`, `type`, `description`, `latitude`, `longitude`, etc. | `Location` object | User must have `role: 'admin'` or `role: 'coordinator'`. |

## Domain 3: Events

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `createEvent` | SA | Creates a new resident-led event (auto-published). | `title`, `description`, `category`, `start_time`, `end_time`, `location_id`, etc. | `Event` object | User must be authenticated. |
| `getEvents` | SA | Retrieves events for the calendar view. | Optional filters: `start_date`, `end_date`, `category` | Array of `Event` objects | RLS policy on `events` table (only published events). |
| `rsvpToEvent` | SA | Creates or updates an RSVP for an event. | `event_id`, `status` ('going', 'maybe', 'not_going'), `guest_count` | `RSVP` object | User must be authenticated. |
| `getEventRSVPs` | SA | Retrieves the list of RSVPs for a specific event. | `event_id` | Array of `RSVP` objects | User must be the event organizer or an admin/coordinator. |
| `moderateEvent` | SA | Admin action to review/flag an event post-publication. | `event_id`, `moderation_status`, `admin_notes` | `Event` object | User must have `role: 'admin'` or `role: 'coordinator'`. |

## Domain 4: Exchange

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `createListing` | SA | Creates a new item/service listing. | `title`, `description`, `type`, `category`, `quantity`, `pickup_location`, etc. | `Listing` object | User must be authenticated. |
| `getListings` | SA | Retrieves listings for the exchange browse view. | Optional filters: `type`, `category`, `status`, `query` | Array of `Listing` objects | RLS policy on `listings` table (only published/available). |
| `requestListing` | SA | Submits a structured request to borrow/use a listing. | `listing_id`, `preferred_start_date`, `preferred_end_date`, `message` | `ListingRequest` object | User must be authenticated. |
| `respondToListingRequest` | SA | Owner accepts or declines a request. | `request_id`, `status` ('approved' or 'declined') | `ListingRequest` object | User must be the listing owner. |
| `confirmTransaction` | SA | Borrower/Owner confirms pickup/return status. | `transaction_id`, `action` ('pickup', 'return', 'confirm_return') | `ListingTransaction` object | User must be the relevant party (borrower/owner). |
| `moderateListing` | SA | Admin action to flag or remove a listing. | `listing_id`, `moderation_status`, `reason` | `Listing` object | User must have `role: 'admin'` or `role: 'coordinator'`. |

## Domain 5: Service Requests

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `submitServiceRequest` | SA | Submits a new service request. | `category`, `title`, `description`, `location_latitude`, `location_longitude`, `priority`, `photos` | `ServiceRequest` object | User must be authenticated. |
| `getServiceRequests` | SA | Retrieves service requests (filtered by user or admin view). | Optional filters: `status`, `category`, `submitted_by` | Array of `ServiceRequest` objects | RLS policy (user sees own, admin sees all). |
| `updateServiceRequestStatus` | SA | Admin action to update status or assign request. | `request_id`, `status`, `assigned_to`, `admin_notes` | `ServiceRequest` object | User must have `role: 'admin'` or `role: 'coordinator'`. |

## Domain 6: Content & Summaries (n8n Output)

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `getContentSummaries` | SA | Retrieves summaries for the personalized home feed. | `interest_area` (optional), `timeframe` | Array of `ContentSummary` objects | RLS policy on `content_summaries` table. |

## Domain 7: AI & System

| Action | Type | Purpose | Input (Zod Schema) | Output | Auth/RLS Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `startAIChatSession` | SA | Creates a new chat session. | None | `AIChatSession` object | User must be authenticated. |
| `sendAIChatMessage` | SA | Sends a message to the AI assistant (triggers RAG/LLM). | `session_id`, `content` | `AIChatMessage` object (assistant response) | User must be authenticated and own the session. |
| `getAIChatHistory` | SA | Retrieves messages for a specific session. | `session_id` | Array of `AIChatMessage` objects | User must be authenticated and own the session. |
| `getOptionSet` | SA | Retrieves options for a specific dropdown/category. | `set_name` | `OptionSet` object | RLS policy on `option_sets` table. |
| `getNotifications` | SA | Retrieves the user's personalized notifications. | Optional filters: `status` ('read', 'unread') | Array of `Notification` objects | RLS policy on `notifications` table. |
| `markNotificationRead` | SA | Marks a notification as read. | `notification_id` | `Notification` object | User must be the recipient. |
| `getFeedItems` | SA | Retrieves the personalized activity feed. | Optional filters: `category` | Array of `ActivityFeedItem` objects | RLS policy on `activity_feed_items` table. |

---
