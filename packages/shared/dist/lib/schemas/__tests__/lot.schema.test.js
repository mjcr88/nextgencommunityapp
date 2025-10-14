import { describe, it, expect } from 'vitest';
import { LotInsertSchema, LotUpdateSchema } from '../lot';
describe('Lot Schema', () => {
    it('validates complete lot input', () => {
        const input = {
            neighborhood_id: '123e4567-e89b-12d3-a456-426614174000',
            lot_number: 'LOT101',
            status: 'available',
            geo_bounds: { type: 'Polygon', coordinates: [[[0, 0], [1, 1], [0, 1], [0, 0]]] }
        };
        const result = LotInsertSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
    it('defaults status to available when omitted', () => {
        const input = {
            neighborhood_id: '123e4567-e89b-12d3-a456-426614174000',
            lot_number: 'LOT101'
        };
        const result = LotInsertSchema.safeParse(input);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.status).toBe('available');
        }
    });
    it('rejects invalid neighborhood_id format', () => {
        const input = {
            neighborhood_id: 'invalid',
            lot_number: 'LOT101'
        };
        const result = LotInsertSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
    it('rejects empty lot_number', () => {
        const input = {
            neighborhood_id: '123e4567-e89b-12d3-a456-426614174000',
            lot_number: ''
        };
        const result = LotInsertSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
    it('validates geo_bounds structure', () => {
        const input = {
            neighborhood_id: '123e4567-e89b-12d3-a456-426614174000',
            lot_number: 'LOT101',
            geo_bounds: { type: 'Polygon', coordinates: [[[0, 0], [1, 1], [0, 1], [0, 0]]] }
        };
        const result = LotInsertSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
    it('rejects invalid geo_bounds type', () => {
        const input = {
            neighborhood_id: '123e4567-e89b-12d3-a456-426614174000',
            lot_number: 'LOT101',
            geo_bounds: { type: 'Invalid', coordinates: [] }
        };
        const result = LotInsertSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
    it('validates update schema partial', () => {
        const input = { status: 'assigned' };
        const result = LotUpdateSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
});
