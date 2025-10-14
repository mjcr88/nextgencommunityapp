# Epics & User Stories

## Epic 1: Project Foundation & Onboarding Gateway

**Epic Goal:** To establish the core technical infrastructure, security foundation, and initial user authentication required to support all subsequent feature development.

---

### Story 1.1: Monorepo & CI/CD Setup (Technical Story)

As a **system architect**,
I want to **implement the Next.js/Supabase monorepo structure and automated deployment pipeline**,
so that I can **ensure a scalable, type-safe, and continuously deployable foundation for the platform**.

**Acceptance Criteria:**
1.  The monorepo structure (`apps/web`, `packages/ui`, `packages/database`, `packages/shared`) shall be defined using pnpm and Turborepo.
2.  The Vercel project shall be linked and configured for deployment.
3.  GitHub Actions CI/CD pipeline shall be running (Build/Test/Deploy).
4.  All core dependencies (TypeScript, Tailwind, Zod, etc.) shall be installed and configured per the Architecture Document.

---

### Story 1.2: Multi-Tenant & Auth Foundation (Technical Story)

As a **system architect**,
I want to **implement the core Supabase schema, RLS policies, and authentication service**,
so that I can **securely isolate tenant data and enable user login**.

**Acceptance Criteria:**
1.  The `tenants` and `users` tables shall be created with initial RLS policies for multi-tenancy.
2.  Supabase Auth shall be configured for email/password login and JWT generation.
3.  Initial seed data for the first tenant and a super admin user shall be created.
4.  The Supabase client shall be configured for use in Server Actions.

---

### Story 1.3: Admin User Creation (Flow 0)

As an **administrator**,
I want to **use the Backoffice interface to create new users and assign lots**,
so that I can **onboard new residents and send them activation emails**.

**Acceptance Criteria:**
1.  The Admin Backoffice shall provide a "Create User" interface (Flow 0).
2.  Admin can assign a lot number to the new user.
3.  The system shall send a unique activation email to the new resident.
4.  The new user shall appear with a "Pending" status in the User Management list.

---

### Story 1.4: Account Activation & Password Setup (Flow 1 Gateway)

As a **new resident**,
I want to **activate my account via an email link and set a secure password**,
so that I can **gain access to the platform and begin the onboarding wizard**.

**Acceptance Criteria:**
1.  The activation link shall validate the user token and redirect to the password setup screen (Flow 1, Screen 1).
2.  The user must be able to set a password that meets security requirements (min 8 chars, number, uppercase).
3.  Upon successful password setup, the user shall be redirected to the first step of the 6-step onboarding wizard (Flow 1, Screen 2).

---

### Story 1.5: External Service Credentialing (Technical Story)

As a **system architect**,
I want to **securely store and validate API keys for OpenAI and Telegram/n8n integration**,
so that I can **enable the AI Assistant and content ingestion features**.

**Acceptance Criteria:**
1.  Vercel secrets shall be configured for OpenAI API keys and the Telegram Bot Token.
2.  The n8n webhook secret shall be generated and validated by the Next.js API route.
3.  Server-side components shall successfully access and utilize these credentials for initial connection tests.

---

## Epic 2: Information & Awareness Hub

**Epic Goal:** To provide residents with a personalized, calm, and actionable interface for staying informed about community activities, replacing information overload with relevant, timely awareness. This epic focuses on the AI Assistant and the Personalized Home Feed as the primary information delivery mechanisms.

---

### Story 2.1: Personalized Home Feed

As a **resident (Elena)**,
I want to **see a personalized home feed that prioritizes important actions and relevant updates**,
so that I can **quickly understand what needs my attention and catch up on community life without feeling overwhelmed**.

**Acceptance Criteria:**
1.  The home screen shall display a dynamic feed organized into sections like "Actions," "Updates," and "Recent Activity."
2.  The "Actions" section shall display high-priority items requiring user interaction (e.g., event RSVPs, overdue item reminders).
3.  The "Updates" section shall aggregate announcements and activities from around the community, personalized based on the user's selected interests and journey stage.
4.  The feed must not be infinite-scroll; it should have a clear end and a "Load More" option to promote mindful engagement.
5.  Users must be able to customize their feed by reordering sections and adjusting notification preferences for different categories of content in a dedicated "Feed & Notifications" settings screen.
6.  A first-time user shall be presented with a welcoming empty state that guides them toward initial actions like exploring the map or calendar.

---

### Story 2.2: AI-Powered Assistant for Community Knowledge

As a **resident (Sofia)**,
I want to **ask questions in natural language to an AI assistant via chat or voice**,
so that I can **get immediate answers and find information without needing to know where or how it's stored**.

**Acceptance Criteria:**
1.  The platform shall provide an AI assistant accessible from the main navigation.
2.  The assistant must be able to process natural language queries in both English and Spanish.
3.  The AI shall be the primary interface for accessing the community's knowledge, retrieving information from a variety of integrated sources (e.g., documents, websites, and ingested content from the External Messaging API).
4.  When providing answers, the AI must cite the original source of the information (e.g., a link to the document or website).
5.  The assistant shall provide a welcome screen with suggested questions to guide new users.
6.  The interface must support both text input and voice input for queries.

---

### Story 2.3: Admin Content Management for AI

As an **administrator**,
I want to **manage the documents and data sources that the AI assistant uses to answer questions**,
so that I can **ensure the information provided to residents is accurate, up-to-date, and comprehensive**.

**Acceptance Criteria:**
1.  The admin backoffice shall provide a "Content Management" interface for the AI knowledge base.
2.  Admins shall be able to upload, update, and remove documents (e.g., PDFs, DOCX files).
3.  Admins shall be able to add, edit, and remove web links for the AI to index.
4.  The system shall provide a mechanism to trigger a re-indexing of the knowledge sources after content has been updated.
5.  The interface should show the status of each knowledge source (e.g., Indexed, Pending, Error).

---

## Epic 3: Spatial Awareness & Connection

**Epic Goal:** To connect residents to their physical environment and to each other by providing tools for spatial awareness and facilitating spontaneous, location-based interactions.

---

### Story 3.1: Interactive Community Map

As a **resident**,
I want to **explore an interactive map of the community**,
so that I can **orient myself, find facilities, and see where other residents are (with their consent)**.

**Acceptance Criteria:**
1.  The platform shall display a GPS-based map showing property boundaries, key facilities (e.g., Community Center), and the user's current location.
2.  Users who have opted-in to share their location shall be visible on the map to other residents. This setting must be off by default.
3.  Tapping on a facility pin shall open a detail view with information like hours, amenities, and who is currently checked-in there.
4.  The map interface must provide controls for layers (e.g., toggle lot boundaries, facilities), zoom, and recentering.
5.  The map must be searchable by resident name, lot number, and facility name.

---

### Story 3.2: Location-Based Check-ins

As a **resident**,
I want to **"check in" at a location with a brief description of my activity**,
so that I can **share what I'm doing and create opportunities for spontaneous connection with others nearby**.

**Acceptance Criteria:**
1.  Users must be able to initiate a check-in from the map or home screen. The system should auto-detect their location but allow manual selection.
2.  A check-in must include an activity description, a duration (e.g., 1 hour, 4 hours), and visibility controls (e.g., Everyone, Nearby Only).
3.  Active check-ins shall be displayed on the community map and in the home feed of relevant users.
4.  Check-ins must automatically expire and disappear from active views after the selected duration.
5.  Users shall receive distance-based notifications for new check-ins from others, respecting their notification preferences.
6.  Other users shall be able to give a quick emoji response to a check-in (e.g., "On my way!").

---

## Epic 4: Community Coordination & Resource Sharing

**Epic Goal:** To provide structured, efficient, and messaging-independent workflows for coordinating events, sharing resources, and managing service requests within the community.

---

### Story 4.1: Shared Calendar & Resident-Led Events

As a **resident (Marcus)**,
I want to **create a community event that gets published automatically to the shared calendar**,
so that I can **organize a gathering without waiting for admin approval and see all community activities in one place**.

**Acceptance Criteria:**
1.  All users shall be able to view a unified community calendar showing all public events.
2.  Any resident can initiate a multi-step "Create Event" flow from the calendar.
3.  The flow must allow the user to specify event title, category, date/time, location (from a list of community spots or a custom entry), and RSVP settings.
4.  Resident-created events shall be published to the calendar immediately upon completion of the flow.
5.  Admins will be notified of the new event for post-publication review (as per Story 5.1).
6.  Users can RSVP to events, and the event creator can see the attendee list.

---

### Story 4.2: Community Exchange Listings & Requests

As a **resident (Carmen)**,
I want to **create listings for resources I want to share and manage requests through a structured workflow**,
so that I can **contribute to the sharing economy without the chaos of back-and-forth messaging**.

**Acceptance Criteria:**
1.  Users shall be able to create listings for different categories (e.g., Tools, Food, Services).
2.  Users browsing the exchange can request an item via a "Request Item" modal.
3.  The request modal shall prompt for a preferred pickup time and an optional short message (max 250 characters). Direct messaging is not required.
4.  The listing owner receives a notification and can "Accept" or "Decline" the request. Contact information is only shared after a request is accepted.
5.  The platform must track the status of the borrow/lend transaction (e.g., Active, Due Soon, Overdue) with visual indicators.
6.  The system shall send automated reminders to the borrower when an item is due, and the borrower can "Mark as Returned" to notify the owner. The owner must then "Confirm Return" to complete the cycle.

---

### Story 4.3: Service Request Submission & Tracking

As a **resident**,
I want to **submit a service request for a community issue through a simple form and track its status**,
so that I can **report problems efficiently and stay informed on their resolution**.

**Acceptance Criteria:**
1.  The platform shall provide a "Service Request" form accessible to all residents.
2.  The form must allow the user to select a request category, provide a description, attach photos, and specify the location of the issue.
3.  Upon submission, the user shall receive a confirmation and be able to view the request in a "My Requests" list.
4.  The user must be able to track the status of their request as it changes (e.g., Submitted, In Review, In Progress, Resolved).
5.  The user shall receive a notification when the status of their request is updated by an administrator.

---

## Epic 5: Platform Administration & Technical Foundation

**Epic Goal:** To empower administrators with the tools for gentle stewardship and to establish the core technical architecture required for scalability, integration, and the future SaaS model.

---

### Story 5.1: Admin Event Moderation

As an **administrator (Marcus)**,
I want to **review resident-created events after they are published and be alerted to potential conflicts**,
so that I can **ensure community safety and coordination without being a bottleneck**.

**Acceptance Criteria:**
1.  The admin backoffice shall feature an "Event Management" dashboard listing all community events, with a filter for "Unreviewed."
2.  Admins shall be able to mark an event as "Reviewed."
3.  The system shall automatically flag potential conflicts for the admin (e.g., two events at the same location and time).
4.  If an issue is found, the admin must be able to use a "Notify Organizer" feature to send a templated, one-way notification (e.g., "Request Changes," "Conflict Notification"). This system is for notifications, not conversations.

---

### Story 5.2: Admin Exchange Moderation

As a **resource coordinator (Carmen)**,
I want to **review listings in the exchange and flag or remove inappropriate content**,
so that I can **maintain a safe and high-quality resource-sharing environment**.

**Acceptance Criteria:**
1.  The admin backoffice shall provide an "Exchange Moderation" dashboard.
2.  Admins shall be able to view all active listings and filter them by category, owner, or status.
3.  Admins must have the ability to "Request Changes" from the owner, "Flag" a listing for further review, or "Remove" a listing that violates community guidelines.
4.  Removing a listing must require a reason and trigger a notification to the listing owner.

---

### Story 5.3: External Messaging API (Technical Story)

As a **system architect**,
I want to **design and build a robust API for integrating with external messaging platforms (like Telegram and WhatsApp)**,
so that the **platform can send critical notifications and ingest data to power features like the AI assistant**.

**Acceptance Criteria:**
1.  The system shall expose a secure, well-documented API for sending and receiving messages.
2.  The API must be designed to be extensible, allowing for the future addition of new messaging providers.
3.  The initial implementation must support sending notifications and ingesting message content from at least one target platform (e.g., Telegram).
4.  The API must handle rate limiting, authentication, and error handling gracefully.
5.  This API will serve as the backbone for FR10 and TA1.

---

### Story 5.4: Multi-Tenant Architecture (Technical Story)

As a **system architect**,
I want to **implement a multi-tenant architecture from the project's inception**,
so that the **platform is prepared for the long-term vision of a scalable SaaS offering**.

**Acceptance Criteria:**
1.  The database schema and application logic must support data isolation between tenants (i.e., different communities).
2.  Each tenant must have the ability to manage its own set of users, content, and configurations.
3.  The architecture must be designed to scale horizontally to accommodate a growing number of tenants without performance degradation.
4.  A clear process for provisioning a new tenant must be established.
5.  This architecture will serve as the foundation for TA2.
