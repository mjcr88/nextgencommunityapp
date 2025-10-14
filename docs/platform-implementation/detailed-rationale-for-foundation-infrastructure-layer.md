# Detailed Rationale for Foundation Infrastructure Layer

*   **Trade-offs and Choices Made:**
    *   **Hybrid Cloud Choice:** We chose a hybrid approach (Vercel + Supabase/AWS + Self-hosted n8n) over a fully managed or fully self-hosted solution. This balances developer velocity (Vercel/Supabase) with workflow flexibility (n8n). Fully managed reduces operational overhead but limits customization; fully self-hosted increases control but requires more DevOps effort. The chosen approach leverages managed services for the core application while allowing customization for workflow automation.
    *   **Supabase over Vanilla PostgreSQL:** Supabase provides a comprehensive backend-as-a-service with built-in Auth, RLS, Realtime, and Storage, significantly accelerating development compared to setting up these services individually with vanilla PostgreSQL. The trade-off is vendor lock-in and less granular control over individual components.
    *   **Self-hosted n8n:** n8n is self-hosted to allow for custom workflow development and integration with internal systems. This requires more setup and maintenance compared to fully managed workflow services but provides maximum flexibility for the Telegram ingestion and AI processing workflows.
    *   **Vercel Edge Network:** Chosen for its global distribution and performance benefits, directly addressing the NFR1 (Mobile-First Design with <3s load times) and NFR2 (Scalability) requirements. The trade-off is less control over the underlying infrastructure compared to self-hosting on a specific cloud provider's VMs.

*   **Key Assumptions Made During Drafting:**
    *   The existing Vercel and Supabase accounts can be used or new ones can be provisioned with the necessary permissions.
    *   The user has or can provision a suitable hosting environment for n8n (VPS, container service, etc.).
    *   DNS management will primarily be handled within Vercel, with potential subdomain delegation for n8n.
    *   API keys for external services (Telegram Bot Token, OpenAI) are available or will be generated.
    *   The n8n instance will have outbound internet access to communicate with Telegram, Supabase, and OpenAI.

*   **Interesting or Questionable Decisions That Need User Attention:**
    *   **n8n Self-hosting:** The requirement for a public webhook endpoint for Telegram integration is a key security consideration. The user needs to confirm the hosting environment and security measures (firewall, authentication) for the n8n instance.
    *   **Supabase Region:** The architecture specifies `us-east-1`. If the primary user base is elsewhere, this might introduce latency. However, Vercel's edge network mitigates frontend latency.
    *   **Monitoring Depth:** The current draft includes basic monitoring. The user might want to consider integrating a dedicated monitoring solution (e.g., Datadog, Sentry) for more comprehensive observability across all services.

*   **Areas That Might Need Validation:**
    *   Confirm the specific Vercel and Supabase plan tiers required for the expected usage (300 families, thousands of content items, 100+ daily check-ins, 1,000+ daily messages).
    *   Validate the n8n hosting requirements (CPU, memory, disk space) based on the expected daily Telegram message volume.
    *   Ensure the security posture of the n8n instance meets the community's standards, especially regarding the public webhook endpoint.
