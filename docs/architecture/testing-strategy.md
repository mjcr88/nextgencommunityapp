# Testing Strategy

This section defines the architectural approach to testing the Ecovilla platform, ensuring correctness, security, and reliability across all layers of the stack. The strategy is designed to validate the complex multi-tenant, real-time, and AI-integrated architecture.

## 1. Unit Testing (Vitest)

**Scope:** Individual functions, utility classes, Zod schemas, and UI components (isolated).
**Focus:** Logic correctness, type safety, and accessibility of atomic components.
**Tools:** Vitest for backend/frontend unit tests, React Testing Library for component tests.
**Strategy:**
- All shared utilities in `packages/shared` must have 100% unit test coverage.
- Zod schemas are tested to ensure validation and sanitization work as expected.
- UI components are tested in isolation using mocks for external dependencies.
- Accessibility tests are integrated for all interactive components.

## 2. Integration Testing (Vitest + Supabase Mocking)

**Scope:** Server Actions, Repository functions, and RLS policies.
**Focus:** Testing the contract between the application layer and the database.
**Strategy:**
- Use Supabase's local development tools or a dedicated test database to simulate RLS checks.
- Test multi-tenant data isolation by running the same tests with different `tenant_id` contexts.
- Validate that Server Actions correctly enforce authorization and return appropriate errors.
- Mock external API calls (OpenAI, Telegram) to focus on business logic.

## 3. End-to-End (E2E) Testing (Playwright)

**Scope:** Critical user journeys (Onboarding, Check-in, Exchange Request, AI Query).
**Focus:** Validating the entire stack from browser to database.
**Strategy:**
- Test all user roles: `resident`, `coordinator`, `admin` to ensure correct permissions and views.
- Validate real-time features (check-ins appearing on map, notifications).
- Test PWA functionality (offline behavior, push notifications).
- Cross-browser testing on Chrome, Safari, and Firefox.
- Mobile viewport testing to ensure responsive design works.

## 4. Workflow Testing (n8n)

**Scope:** The n8n workflows for Telegram ingestion, classification, and summarization.
**Focus:** Testing the data transformation and orchestration logic.
**Strategy:**
- Set up a dedicated n8n test environment that can simulate Telegram webhooks.
- Validate that messages are correctly parsed, classified by interest, and stored in PostgreSQL.
- Test the AI summarization workflow with sample message sets to ensure quality summaries.
- Verify that embeddings are correctly generated and stored for RAG search.
- Monitor for data integrity issues and error handling within the workflows.

---
