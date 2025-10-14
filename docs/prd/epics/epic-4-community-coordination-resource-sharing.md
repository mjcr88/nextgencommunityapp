# Epic 4: Community Coordination & Resource Sharing

**Epic Goal:** To provide structured, efficient, and messaging-independent workflows for coordinating events, sharing resources, and managing service requests within the community.

---

## Story 4.1: Shared Calendar & Resident-Led Events

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

## Story 4.2: Community Exchange Listings & Requests

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

## Story 4.3: Service Request Submission & Tracking

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
