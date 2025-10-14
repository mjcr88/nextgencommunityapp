import { z } from 'zod';
const statusEnum = z.enum(['available', 'assigned']);
export const LotInsertSchema = z.object({
    neighborhood_id: z.string().uuid('Invalid neighborhood ID'),
    lot_number: z.string().min(1, 'Lot number is required'),
    status: statusEnum.default('available'),
    geo_bounds: z.record(z.unknown()).optional()
});
export const LotUpdateSchema = z.object({
    lot_number: z.string().min(1, 'Lot number is required').optional(),
    status: statusEnum.optional(),
    geo_bounds: z.record(z.unknown()).optional()
});
