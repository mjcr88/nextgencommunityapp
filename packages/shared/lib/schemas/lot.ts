import { z } from 'zod'

const statusEnum = z.enum(['available', 'assigned'])

export const LotInsertSchema = z.object({
  neighborhood_id: z.string().uuid('Invalid neighborhood ID'),
  lot_number: z.string().min(1, 'Lot number is required'),
  status: statusEnum.default('available'),
  geo_bounds: z.record(z.any()).nullable().optional()
})

export const LotUpdateSchema = z.object({
  lot_number: z.string().min(1, 'Lot number is required').optional(),
  status: statusEnum.optional(),
  geo_bounds: z.record(z.any()).nullable().optional()
})

export type InsertLot = z.infer<typeof LotInsertSchema>
export type UpdateLot = z.infer<typeof LotUpdateSchema>

export type LotRow = {
  id: string
  neighborhood_id: string
  lot_number: string
  status: string | null
  geo_bounds: any | null
  created_at: string | null
  updated_at: string | null
}

export type Lot = Omit<LotRow, 'created_at' | 'updated_at'> & {
  created_at?: string
  updated_at?: string
  status: 'available' | 'assigned'
}
