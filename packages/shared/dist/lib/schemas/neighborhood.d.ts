import { z } from 'zod';
export declare const NeighborhoodInsertSchema: z.ZodObject<{
    tenant_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    tenant_id: string;
    name: string;
    description?: string | undefined;
    settings?: Record<string, unknown> | undefined;
}, {
    tenant_id: string;
    name: string;
    description?: string | undefined;
    settings?: Record<string, unknown> | undefined;
}>;
export declare const NeighborhoodUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    settings?: Record<string, unknown> | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    settings?: Record<string, unknown> | undefined;
}>;
export type InsertNeighborhood = z.infer<typeof NeighborhoodInsertSchema>;
export type UpdateNeighborhood = z.infer<typeof NeighborhoodUpdateSchema>;
export type Neighborhood = InsertNeighborhood & {
    id: string;
};
//# sourceMappingURL=neighborhood.d.ts.map