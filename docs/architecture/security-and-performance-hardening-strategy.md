# Security and Performance (Hardening Strategy)

This section defines the implementation details for security and performance hardening to protect the application and its users.

## 1. Input Validation (Zod)

**Strategy:** Strict schema validation will be enforced at the boundary of every Server Action and API Route using Zod. This prevents malformed data, injection attacks, and ensures data integrity before interacting with the database.

**Implementation Details:**
- **Schema Definition:** All input objects (e.g., `createCheckInSchema`, `updateProfileSchema`) will be defined in the `packages/shared/` monorepo package for reuse across frontend and backend.
- **Sanitization:** Zod's refinement and transformation capabilities will be used to sanitize inputs (e.g., trimming strings, ensuring numeric ranges, validating UUID formats).
- **Error Handling:** Validation failures will immediately return a 400 Bad Request response with specific, non-verbose error messages to the client.

## 2. CSRF Protection (Server Actions)

**Strategy:** Next.js Server Actions provide built-in protection against CSRF attacks by verifying the origin and ensuring the request is not cross-site.

**Implementation Details:**
- **Default Protection:** Rely on Next.js's native CSRF protection for all Server Actions.
- **API Route Hardening:** For the two external API Routes (`ingestTelegramMessage`, `updateContentSummary`), standard CSRF protection is not applicable as they are webhooks. Protection will rely on API Key/Secret validation (see below).
- **Client-Side Forms:** All forms utilizing Server Actions will use the native `action` prop, ensuring the framework's protection mechanisms are engaged.

## 3. API Key Management (External Services)

**Strategy:** All sensitive keys (OpenAI, Telegram Bot Token, n8n webhook secrets) will be stored securely as environment variables and accessed only by the necessary server-side components.

**Implementation Details:**
- **Storage:** Keys will be stored as encrypted secrets in Vercel's environment configuration and accessed via `process.env`.
- **Access Control:** Keys will **never** be exposed to the client-side. They will only be used within Server Actions or API Routes.
- **n8n Webhook Secrets:** The `ingestTelegramMessage` and `updateContentSummary` API Routes will require a unique, long-lived secret token passed in the request header or URL query parameter, which must be validated against a stored environment variable. This acts as the primary authentication for the n8n service.

## 4. Rate Limiting (Vercel KV/Redis)

**Strategy:** Implement a global and per-user rate limiting mechanism to prevent denial-of-service (DoS) attacks and abuse, particularly on expensive operations like AI queries and mutations.

**Implementation Details:**
- **Tooling:** Use Vercel KV (Redis) for fast, distributed counter storage.
- **Global Limit:** Apply a global limit (e.g., 100 requests/second) to all unauthenticated API Routes (e.g., login attempts).
- **Per-User Limit:** Apply a stricter per-user limit (e.g., 10 mutations/minute, 5 AI queries/minute) to all authenticated Server Actions.
- **Webhook Exemption:** The n8n webhook API Routes will be exempt from general rate limiting but will be monitored for excessive traffic from the n8n source IP.

---
