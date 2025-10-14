import { z } from 'zod';
export declare const TenantInsertSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    settings?: Record<string, unknown> | undefined;
}, {
    name: string;
    slug: string;
    settings?: Record<string, unknown> | undefined;
}>;
export declare const TenantUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    settings?: Record<string, unknown> | undefined;
}, {
    name?: string | undefined;
    settings?: Record<string, unknown> | undefined;
}>;
export type InsertTenant = z.infer<typeof TenantInsertSchema>;
export type UpdateTenant = z.infer<typeof TenantUpdateSchema>;
export type Tenant = InsertTenant & {
    id: string;
};
//# sourceMappingURL=tenant.d.ts.map