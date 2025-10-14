import { z } from 'zod';
export const TenantInsertSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    settings: z.record(z.unknown()).optional()
});
export const TenantUpdateSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    settings: z.record(z.unknown()).optional()
});
