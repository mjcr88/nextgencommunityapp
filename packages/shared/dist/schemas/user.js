import { z } from 'zod';
const JsonZod = z.lazy(() => z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.record(JsonZod),
    z.array(JsonZod)
]));
// Tenant schema
export const TenantSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(50),
    domain: z.string().optional(),
    status: z.enum(['active', 'suspended', 'trial']).default('active'),
    settings: JsonZod,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
// User schema
export const UserSchema = z.object({
    id: z.string().uuid(),
    tenant_id: z.string().uuid(),
    email: z.string().email(),
    full_name: z.string().min(1).max(100),
    display_name: z.string().optional(),
    avatar_url: z.string().url().optional(),
    phone: z.string().optional(),
    preferred_language: z.enum(['en', 'es']).default('en'),
    journey_stage: z.enum(['newcomer', 'settled_resident', 'coordinator']).default('newcomer'),
    role: z.enum(['resident', 'coordinator', 'admin', 'super_admin']).default('resident'),
    lot_assignment: z.string().optional(),
    bio: z.string().max(280).optional(),
    interests: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    privacy_settings: JsonZod,
    notification_preferences: JsonZod,
    status: z.enum(['active', 'pending', 'inactive']).default('active'),
    last_active_at: z.string().datetime().optional(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
// Validation for insert (exclude id/created_at, optional id for DB gen)
export const InsertUserSchema = UserSchema.omit({ id: true, created_at: true, updated_at: true }).extend({ id: z.string().optional() });
// Validation for update (exclude id/tenant_id/created_at/updated_at)
export const UpdateUserSchema = UserSchema.omit({ id: true, tenant_id: true, created_at: true, updated_at: true }).partial();
