# Deployment Architecture

This section defines the deployment strategy for the Next.js application, the Supabase database, and the self-hosted n8n workflow engine.

## 1. CI/CD Pipeline (GitHub Actions)

The entire deployment process will be automated via GitHub Actions, triggered on pushes to the `main` branch.

| Stage | Component | Tooling | Rationale |
| :--- | :--- | :--- | :--- |
| **1. Build & Test** | Next.js App | Turborepo, Vitest, ESLint | Fast, cached build and comprehensive testing before deployment. |
| **2. Database Migration** | Supabase Schema | Supabase CLI, GitHub Actions | **Critical Step:** Ensures the database schema is updated before the application is deployed. |
| **3. Web App Deployment** | Next.js App | Vercel CLI, GitHub Actions | Zero-downtime deployment to Vercel Edge Network. |
| **4. n8n Workflow Sync** | n8n Workflows | n8n CLI, GitHub Actions | Automates the upload of new/updated n8n workflows to the self-hosted instance. |

**Database Migration Pipeline (Critical Path):**
1.  **Pre-Deployment Check:** GitHub Action runs `pnpm db:migrate:check` (Supabase CLI) to ensure no pending migrations exist.
2.  **Migration Execution:** If migrations are pending, the action runs `pnpm db:migrate:up` against the staging/production Supabase instance.
3.  **Type Generation:** After migration, `pnpm db:types` runs to generate updated TypeScript types for the application.
4.  **Deployment Gate:** The Vercel deployment only proceeds if the migration and type generation steps succeed.

## 2. n8n Hosting Strategy (Self-Hosted, Scheduled)

Since the MVP will use a **daily scheduled process** for Telegram ingestion (not real-time webhooks), the n8n deployment is significantly simplified.

**Recommended Setup:**
- **Environment:** A single, reliable Virtual Private Server (VPS) or a managed container service (e.g., AWS ECS, DigitalOcean App Platform).
- **Containerization:** Deploy n8n using the official Docker image for easy updates and management.
- **Database:** Use a dedicated PostgreSQL instance (separate from Supabase) or a managed Redis instance for n8n's internal data persistence. **Do NOT use SQLite for production.**
- **Scheduling:** Configure n8n's internal scheduler or a system cron job to trigger the Telegram ingestion workflow once per day.
- **Security:** Since no public webhook is required, the n8n instance can be behind a firewall, accessible only for management via SSH or a secure admin panel.

**n8n Workflow Sync:**
- Workflows will be version-controlled in the monorepo (`infrastructure/n8n/workflows/`).
- The CI/CD pipeline will use the n8n CLI to connect to the self-hosted instance and push the latest workflow definitions, ensuring the deployed workflows match the committed code.

## 3. Environment Management

| Component | Secrets Storage | Access Level |
| :--- | :--- | :--- |
| **Next.js App** | Vercel Secrets | Server Actions/API Routes only |
| **Supabase** | Supabase Dashboard | Accessed by Next.js (Service Role Key for admin tasks, Anon Key for client) |
| **n8n Instance** | n8n Environment Variables | Accessed by n8n workflows |
| **External Keys** (OpenAI, Telegram) | Vercel Secrets & n8n Environment Variables | Duplicated where necessary, never exposed client-side. |

---
