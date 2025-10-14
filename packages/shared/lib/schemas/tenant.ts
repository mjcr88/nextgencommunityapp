import { z } from 'zod'

export const TenantInsertSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  settings: z.record(z.any()).nullable().optional()
})

export const TenantUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  settings: z.record(z.any()).nullable().optional()
})

export type InsertTenant = z.infer<typeof TenantInsertSchema>
export type UpdateTenant = z.infer<typeof TenantUpdateSchema>

export type TenantRow = {
  id: string
  name: string
  slug: string
  settings: any | null
  domain: string | null
  status: string
  created_at: string | null
  updated_at: string | null
}

export type Tenant = Omit<TenantRow, 'created_at' | 'updated_at' | 'domain' | 'status'> & {
  created_at?: string
  updated_at?: string
  domain?: string
  status?: string
}
