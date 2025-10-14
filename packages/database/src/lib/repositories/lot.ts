import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import { 
  LotInsertSchema,
  InsertLot, 
  UpdateLot, 
} from '../../../../shared/dist/lib/schemas/lot.js'
import { AppError } from '../../../../shared/dist/lib/errors.js'
import { getNeighborhoodById } from './neighborhood'
import { getUserById, updateUser } from './user'
import { UpdateUserSchema } from '../../../../shared/dist/lib/schemas/user.js'

type LotRow = Database['public']['Tables']['lots']['Row']

export function checkDuplicateLotNumber(lotNumber: string, existingLots: Pick<LotRow, 'lot_number'>[]): boolean {
  return existingLots.some(lot => lot.lot_number === lotNumber)
}

export function canTransitionStatus(fromStatus: string, toStatus: string): boolean {
  return (fromStatus === 'available' && toStatus === 'assigned') ||
         (fromStatus === 'assigned' && toStatus === 'available')
}

export function validateLotNeighborhoodOwnership(lot: LotRow, neighborhoodId: string): void {
  if (lot.neighborhood_id !== neighborhoodId) {
    throw new AppError('Lot does not belong to the specified neighborhood', 'VALIDATION_ERROR')
  }
}

export function validateGeoBounds(bounds: any): void {
  if (bounds && typeof bounds !== 'object') {
    throw new AppError('Geo bounds must be an object', 'VALIDATION_ERROR')
  }
}

export async function createLot(supabase: SupabaseClient<Database>, input: InsertLot): Promise<LotRow> {
  LotInsertSchema.parse(input)

  const neighborhood = await getNeighborhoodById(supabase, input.neighborhood_id)
  if (!neighborhood) {
    throw new AppError('Neighborhood not found', 'NEIGHBORHOOD_NOT_FOUND')
  }

  const existingLots = await supabase
    .from('lots')
    .select('lot_number')
    .eq('neighborhood_id', input.neighborhood_id)

  if (existingLots.error) {
    throw new AppError(existingLots.error.message, 'DATABASE_ERROR')
  }

  if (checkDuplicateLotNumber(input.lot_number, existingLots.data)) {
    throw new AppError('Lot number already exists in this neighborhood', 'DUPLICATE_LOT_NUMBER')
  }

  const { data, error } = await supabase
    .from('lots')
    .insert(input as any)
    .select()
    .single()

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data
}

export async function getLotById(supabase: SupabaseClient<Database>, id: string): Promise<LotRow | null> {
  const { data, error } = await supabase
    .from('lots')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data || null
}

export async function getAvailableLotsByNeighborhood(supabase: SupabaseClient<Database>, neighborhoodId: string): Promise<LotRow[]> {
  const { data, error } = await supabase
    .from('lots')
    .select('*')
    .eq('neighborhood_id', neighborhoodId)
    .eq('status', 'available')

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data || []
}

export async function updateLot(supabase: SupabaseClient<Database>, id: string, input: UpdateLot): Promise<LotRow> {
  if (input.status && !canTransitionStatus((await getLotById(supabase, id))?.status || 'available', input.status)) {
    throw new AppError('Invalid status transition', 'VALIDATION_ERROR')
  }

  const { data, error } = await supabase
    .from('lots')
    .update(input as any)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data
}

export async function assignLotToUser(supabase: SupabaseClient<Database>, tenantId: string, lotId: string, userId: string): Promise<LotRow> {
  const lot = await getLotById(supabase, lotId)
  if (!lot) {
    throw new AppError('Lot not found', 'LOT_NOT_FOUND')
  }

  if (lot.status !== 'available') {
    throw new AppError('Lot is not available for assignment', 'LOT_NOT_AVAILABLE')
  }

  const user = await getUserById(supabase, tenantId, userId)
  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND')
  }

  const updatedLot = await updateLot(supabase, lotId, { status: 'assigned' })

  const userUpdate = UpdateUserSchema.parse({ lot_id: lotId })
  await updateUser(supabase, tenantId, userId, userUpdate)

  return updatedLot
}