# Foundation Infrastructure Layer

This layer establishes the core cloud environments and foundational services for the Ecovilla platform.

## 1. Cloud Provider Setup

*   **Vercel Account Configuration:**
    *   Create/verify Vercel team account for Ecovilla.
    *   Configure billing and team members with appropriate roles.
    *   Set up custom domain (if applicable) and DNS management within Vercel.
*   **Supabase Project Setup:**
    *   Create Supabase project in `us-east-1` region.
    *   Configure project settings, including database password and region.
    *   Set up Supabase Auth (email/password, magic links, OAuth providers).
    *   Enable Supabase Storage and configure bucket policies.
    *   Enable Supabase Realtime for WebSocket connections.
*   **n8n Hosting Environment:**
    *   Provision VPS or container service for self-hosted n8n instance.
    *   Configure domain, SSL certificate, and firewall rules for n8n.
    *   Set up n8n environment variables (database connection, API keys).

## 2. Network Foundation

*   **Vercel Edge Network:**
    *   Leverage Vercel's global edge network for low-latency content delivery.
    *   Configure Vercel middleware for routing, security headers, and redirects.
*   **Supabase VPC:**
    *   Utilize Supabase's managed VPC in AWS `us-east-1`.
    *   Configure database connection pooling and network security groups.
*   **n8n Networking:**
    *   Configure public endpoint for n8n webhooks (Telegram Bot API integration).
    *   Implement IP whitelisting or API key authentication for webhook security.
    *   Set up internal networking for n8n to access Supabase and external APIs.

## 3. Security Foundation

*   **Identity and Access Management (IAM):**
    *   Vercel: Configure team members and roles (Owner, Developer, Viewer).
    *   Supabase: Define database roles and RLS policies for multi-tenancy.
    *   n8n: Set up user accounts and permissions for workflow management.
*   **Authentication & Authorization:**
    *   Supabase Auth: Configure JWT settings, email templates, and OAuth providers.
    *   API Keys: Generate and securely store API keys for n8n workflows (Telegram, OpenAI).
*   **Data Security:**
    *   Enable encryption at rest for Supabase PostgreSQL and Storage.
    *   Enforce HTTPS for all services (Vercel, Supabase, n8n).
    *   Regularly rotate API keys and database passwords.

## 4. Core Services

*   **DNS Configuration:**
    *   Manage DNS records within Vercel for the main application domain.
    *   Configure subdomains for n8n (e.g., `n8n.ecovilla.app`).
*   **Certificate Management:**
    *   Leverage Vercel's automatic SSL certificate management.
    *   Configure custom SSL certificates for n8n if required.
*   **Logging Infrastructure:**
    *   Utilize Vercel's built-in logs for application monitoring.
    *   Configure Supabase logging for database queries and errors.
    *   Set up centralized logging for n8n (file system or external service).
*   **Monitoring Foundation:**
    *   Enable Vercel Analytics for performance and usage metrics.
    *   Configure Supabase monitoring for database performance.
    *   Set up basic health checks for the n8n instance.

## 5. Developer Experience (DX) Considerations

To ensure a positive and productive developer experience with the chosen stack, the following considerations and practices are integrated into the foundation:

*   **Local Development Environment:**
    *   **Vercel CLI:** Utilize `vercel dev` for local development to closely mimic the production Vercel Edge environment, including environment variables and routing.
    *   **Supabase CLI:** Use the Supabase CLI to run a local Supabase stack (database, auth, storage) for development and testing, ensuring parity with the cloud instance.
    *   **n8n Local Development:** Run n8n locally during workflow development and testing before deploying to the self-hosted instance.

*   **Onboarding & Documentation:**
    *   **Comprehensive Developer Guide:** A dedicated guide covering project setup, Vercel/Supabase/n8n basics, and common development tasks.
    *   **Example Patterns:** Provide documented examples for common Supabase RLS policies, n8n workflow structures, and Vercel configuration patterns.
    *   **Quick Start Script:** Automate initial environment setup (installing CLIs, linking projects, environment variables) where possible.

*   **Tooling & Workflow:**
    *   **Integrated Development Tools:** Leverage IDE extensions for Vercel, Supabase, and n8n to enhance productivity (syntax highlighting, auto-completion, deployment helpers).
    *   **Supabase Type Generation:** Integrate `supabase gen types` into the development workflow to automatically generate TypeScript types from the database schema, ensuring type safety.
    *   **Version Control Practices:** Establish clear guidelines for managing n8n workflows in version control (exporting JSON) and handling environment-specific configurations.

*   **Monitoring & Debugging:**
    *   **Enhanced Error Tracking:** Integrate a dedicated error tracking service (e.g., Sentry) for frontend JavaScript errors and API route exceptions to provide more detailed debugging information than Vercel's built-in logs alone.
    *   **Structured Logging:** Encourage the use of structured logging practices in application code (Vercel functions) for easier searching and analysis.
    *   **Runbooks for Common Issues:** Create runbooks that guide developers through debugging common issues that span the Vercel/Supabase/n8n stack.

*   **Feedback Loops:**
    *   **Preview Deployments:** Leverage Vercel's automatic preview deployments for every pull request to facilitate early feedback and testing.
    *   **Developer Surveys:** Periodically gather feedback from developers on pain points and areas for improvement in the development environment and tooling.
