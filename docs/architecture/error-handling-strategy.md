# Error Handling Strategy

This strategy ensures consistent, user-friendly error reporting and robust handling of external API failures.

## 1. Global Error Handling Pattern

**Strategy:** Implement a centralized error handling utility that standardizes error objects across the application.

**Implementation Details:**
- **Custom Error Class:** Define a custom `AppError` class in `packages/shared` that includes `status_code` (HTTP status), `code` (internal error code, e.g., `ERR_RLS_VIOLATION`), and a `message` (safe for client display).
- **Server Action Errors:** All Server Actions must catch exceptions and return a standardized `AppError` object. Sensitive details (stack traces, raw database errors) must be logged server-side and never exposed to the client.
- **Client-Side Display:** The frontend uses TanStack Query's error handling to display user-friendly messages via the Toast component, referencing the design specification's micro-copy guidelines.

## 2. External API Retry Mechanisms

**Strategy:** Implement exponential backoff and retry logic for transient failures when interacting with external services (OpenAI, Telegram).

**Implementation Details:**
- **OpenAI:** Use a dedicated wrapper function that implements a maximum of 3 retries with exponential backoff (e.g., 1s, 2s, 4s delay) for 429 (Rate Limit) and 5xx (Server Error) responses.
- **n8n Workflows:** n8n's built-in retry mechanism will be configured for all external API nodes (Supabase, Telegram, OpenAI) within the daily scheduled workflow. Failed executions will be logged and trigger an alert.

## 3. Database Error Handling

**Strategy:** Supabase errors (PostgREST, RLS violations) must be translated into safe `AppError` objects.

**Implementation Details:**
- **RLS Violations:** Any RLS violation (e.g., unauthorized update) must be caught and returned as a generic "Permission Denied" error to prevent information leakage.
- **Repository Layer:** The repository pattern will handle the translation of raw database errors into standardized `AppError` objects before they reach the Server Action layer.

---
