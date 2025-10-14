# Epic 2: Information & Awareness Hub

**Epic Goal:** To provide residents with a personalized, calm, and actionable interface for staying informed about community activities, replacing information overload with relevant, timely awareness. This epic focuses on the AI Assistant and the Personalized Home Feed as the primary information delivery mechanisms.

---

## Story 2.1: Personalized Home Feed

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

## Story 2.2: AI-Powered Assistant for Community Knowledge

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

## Story 2.3: Admin Content Management for AI

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
