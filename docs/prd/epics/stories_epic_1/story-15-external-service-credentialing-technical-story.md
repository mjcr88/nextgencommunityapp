# Story 1.5: External Service Credentialing (Technical Story)

As a **system architect**,
I want to **securely store and validate API keys for OpenAI and Telegram/n8n integration**,
so that I can **enable the AI Assistant and content ingestion features**.

**Acceptance Criteria:**
1.  Vercel secrets shall be configured for OpenAI API keys and the Telegram Bot Token.
2.  The n8n webhook secret shall be generated and validated by the Next.js API route.
3.  Server-side components shall successfully access and utilize these credentials for initial connection tests.

---
