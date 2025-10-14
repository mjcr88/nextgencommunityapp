import { z } from 'zod';
export declare const LotInsertSchema: z.ZodObject<{
    neighborhood_id: z.ZodString;
    lot_number: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["available", "assigned"]>>;
    geo_bounds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    neighborhood_id: string;
    lot_number: string;
    status: "available" | "assigned";
    geo_bounds?: Record<string, unknown> | undefined;
}, {
    neighborhood_id: string;
    lot_number: string;
    status?: "available" | "assigned" | undefined;
    geo_bounds?: Record<string, unknown> | undefined;
}>;
export declare const LotUpdateSchema: z.ZodObject<{
    lot_number: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["available", "assigned"]>>;
    geo_bounds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    lot_number?: string | undefined;
    status?: "available" | "assigned" | undefined;
    geo_bounds?: Record<string, unknown> | undefined;
}, {
    lot_number?: string | undefined;
    status?: "available" | "assigned" | undefined;
    geo_bounds?: Record<string, unknown> | undefined;
}>;
export type InsertLot = z.infer<typeof LotInsertSchema>;
export type UpdateLot = z.infer<typeof LotUpdateSchema>;
export type Lot = InsertLot & {
    id: string;
};
//# sourceMappingURL=lot.d.ts.map