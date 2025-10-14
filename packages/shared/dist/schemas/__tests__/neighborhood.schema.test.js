import { describe, it, expect } from 'vitest';
import { NeighborhoodInsertSchema, NeighborhoodUpdateSchema } from '../neighborhood';
describe('Neighborhood Schema', () => {
    it('validates complete neighborhood input', () => {
        const input = {
            tenant_id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Test Neighborhood',
            description: 'Description',
            settings: { key: 'value' }
        };
        const result = NeighborhoodInsertSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
    it('validates minimal required fields', () => {
        const input = {
            tenant_id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Test'
        };
        const result = NeighborhoodInsertSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
    it('rejects invalid tenant_id format', () => {
        const input = {
            tenant_id: 'invalid',
            name: 'Test'
        };
        const result = NeighborhoodInsertSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
    it('validates complex nested settings', () => {
        const input = {
            tenant_id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Test',
            settings: { nested: { array: [1, { obj: true }] } }
        };
        const result = NeighborhoodInsertSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
    it('validates update schema partial', () => {
        const input = { name: 'Updated' };
        const result = NeighborhoodUpdateSchema.safeParse(input);
        expect(result.success).toBe(true);
    });
});
