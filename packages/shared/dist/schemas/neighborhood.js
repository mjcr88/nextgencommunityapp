import { z } from 'zod';
export const NeighborhoodInsertSchema = z.object({
    tenant_id: z.string().uuid('Invalid tenant ID'),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    settings: z.record(z.unknown()).optional()
});
export const NeighborhoodUpdateSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().optional(),
    settings: z.record(z.unknown()).optional()
});
