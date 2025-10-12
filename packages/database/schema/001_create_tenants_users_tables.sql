-- Migration: Create tenants and users tables for multi-tenant auth foundation

-- Enable UUID extension if not already
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tenants table
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  domain text UNIQUE,
  status text NOT NULL DEFAULT 'active',
  settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on tenants
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies for tenants (refine later)
CREATE POLICY "Public read tenants" ON public.tenants FOR SELECT USING (true);

CREATE POLICY "Admins manage tenants" ON public.tenants FOR ALL USING (
  auth.jwt() ->> 'role' = 'super_admin'
);

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  display_name text,
  avatar_url text,
  phone text,
  preferred_language text DEFAULT 'en',
  journey_stage text DEFAULT 'newcomer',
  role text DEFAULT 'resident',
  lot_assignment text,
  bio text,
  interests text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  privacy_settings jsonb NOT NULL DEFAULT '{}',
  notification_preferences jsonb NOT NULL DEFAULT '{}',
  status text DEFAULT 'active',
  last_active_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, email)
);

-- Enable RLS on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies for users
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Tenant members view users" ON public.users FOR SELECT USING (
  tenant_id = (auth.jwt() ->> 'tenant_id')
);

-- Note: uuid_generate_v4() assumes uuid-ossp extension; adjust if using gen_random_uuid()
