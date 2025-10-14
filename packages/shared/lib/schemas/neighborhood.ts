import { z } from 'zod'

export const NeighborhoodInsertSchema = z.object({
  tenant_id: z.string().uuid('Invalid tenant ID'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().nullable().optional(),
  settings: z.record(z.any()).nullable().optional()
})

export const NeighborhoodUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().nullable().optional(),
  settings: z.record(z.any()).nullable().optional()
})

export type InsertNeighborhood = z.infer<typeof NeighborhoodInsertSchema>
export type UpdateNeighborhood = z.infer<typeof NeighborhoodUpdateSchema>

export type NeighborhoodRow = {
  id: string
  tenant_id: string
  name: string
  description: string | null
  settings: any | null
  created_at: string | null
  updated_at: string | null
}

export type Neighborhood = Omit<NeighborhoodRow, 'created_at' | 'updated_at'> & {
  created_at?: string
  updated_at?: string
}
