# Implementation Architecture

This final section defines the high-level implementation details necessary to ensure a cohesive system, enabling the development teams to proceed with detailed implementation.

## 1. External API Integration Contracts

### OpenAI API Integration

**Purpose:** Power the AI Assistant chat and n8n message summarization/classification workflows.

**Integration Points:**
- **AI Assistant (GPT-4):**
  - **Endpoint:** `POST /chat/completions`
  - **Model:** `gpt-4-turbo` (for reasoning) or `gpt-4o` (for speed)
  - **Context:** Supabase `content_embeddings` (RAG) + `ai_chat_messages` history
  - **Response:** Streaming JSON with `sources` array for citations
- **Message Classification (GPT-3.5-turbo):**
  - **Endpoint:** `POST /chat/completions`
  - **Model:** `gpt-3.5-turbo`
  - **Context:** Raw Telegram message text
  - **Response:** JSON with `interest_area` classification
- **Embedding Generation (text-embedding-3-large):**
  - **Endpoint:** `POST /embeddings`
  - **Model:** `text-embedding-3-large`
  - **Context:** `content_summary.summary_text`
  - **Response:** 1536-dimensional vector

**Data Flow:**
1.  **AI Chat:** User message → Generate embedding → Search `content_embeddings` → RAG context + chat history → GPT-4 → Stream response with citations.
2.  **n8n Summarization:** Daily batch of Telegram messages → GPT-4 summary → `text-embedding-3-large` → Store in `content_summaries` and `content_embeddings`.

### Telegram Bot API Integration

**Purpose:** Ingest messages from community interest groups for n8n processing.

**Integration Points:**
- **Webhook Endpoint:** `POST /api/ingest/telegram` (n8n webhook)
- **Bot Configuration:** Set via `@BotFather` with the public URL of the n8n webhook.
- **Message Format:** JSON payload containing `message_id`, `from` (user info), `chat` (group info), `text`, `date`.

**Data Flow:**
1.  Telegram Bot API receives message in group.
2.  Telegram sends POST request to n8n webhook URL.
3.  n8n workflow processes message (store, classify, summarize).
4.  Results stored in Supabase (`content_summaries`, `content_embeddings`).

## 2. Frontend Architecture

### Component Architecture & State Management

**Purpose:** Define how the detailed design specification (shadcn/ui, Magic UI, etc.) translates into a maintainable Next.js 14 codebase.

**Key Decisions:**
- **Server Component/Client Component Split:**
  - **Server Components:** All data fetching, complex logic, and initial renders (e.g., `app/home/page.tsx`, `app/map/page.tsx`).
  - **Client Components:** Interactive elements requiring state/hooks (e.g., `components/map/MapClient.tsx`, `components/chat/AIChatClient.tsx`).
- **State Management:**
  - **Global State:** Zustand for lightweight, UI-focused state (e.g., theme, sidebar open/closed, mobile view flags).
  - **Server State:** TanStack Query for all data from Supabase (caching, refetching, optimistic updates).
  - **Form State:** React Hook Form for all forms, integrated with Zod for validation.
- **Component Structure (packages/ui):**
  - **Primitives:** Direct copy-paste from shadcn/ui (Button, Input, Card, etc.).
  - **Molecules:** Combinations of primitives (e.g., `UserAvatar`, `EventCard`, `CheckInForm`).
  - **Organisms:** Complex sections from the design spec (e.g., `HomeFeed`, `CommunityMap`, `ExchangeBrowser`).
  - **Templates:** Page-level layouts (e.g., `MainLayout`, `AuthLayout`).

### Routing & Data Fetching

- **App Router:** All routes defined in `apps/web/app/` with nested layouts.
- **Loading States:** Skeleton screens for all data-fetching pages.
- **Error Boundaries:** Per-page error boundaries with user-friendly messages.
- **Streaming SSR:** Use `loading.tsx` and Suspense boundaries for progressive enhancement.

## 3. Unified Project Structure

**Purpose:** Finalize the monorepo structure to ensure clear separation of concerns and easy navigation.

```
ecovilla-platform/
├── apps/
│   ├── web/                           # Next.js 14 application
│   │   ├── app/                       # App Router pages, layouts, routes
│   │   ├── components/                # App-specific components (layouts, pages)
│   │   └── lib/                       # App-specific utilities, hooks
│   └── docs/                          # Documentation site (future)
├── packages/
│   ├── ui/                            # shadcn/ui + custom design system components
│   │   ├── components/                # atoms, molecules, organisms
│   │   └── lib/                       # UI-specific utilities
│   ├── database/                      # Supabase schema, migrations, generated types
│   │   ├── schema/                    # SQL DDL files
│   │   ├── migrations/                # Supabase CLI migrations
│   │   └── types/                     # Generated TypeScript types
│   ├── shared/                        # Shared utilities, Zod schemas, constants
│   │   ├── lib/                       # Validation, error handling, utils
│   │   └── types/                     # Shared TypeScript types
│   └── config/                        # Shared tooling configs (ESLint, TypeScript, Tailwind)
├── infrastructure/
│   └── n8n/
│       ├── workflows/                 # Version-controlled n8n workflows (.json)
│       └── credentials/               # n8n credential templates (not actual secrets)
└── scripts/                           # Build and deployment scripts
```

**Key File Locations:**
- **Zod Schemas:** `packages/shared/lib/schemas/` (e.g., `user.schema.ts`, `checkin.schema.ts`)
- **Repository Functions:** `packages/database/lib/repositories/` (e.g., `user.repository.ts`)
- **Server Actions:** `apps/web/app/actions/` (e.g., `user.actions.ts`, `checkin.actions.ts`)
- **API Routes:** `apps/web/app/api/` (e.g., `/api/ingest/telegram/route.ts`)
- **n8n Workflows:** `infrastructure/n8n/workflows/telegram-ingestion.json`

---
