import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import { 
  NeighborhoodInsertSchema,
  InsertNeighborhood, 
  UpdateNeighborhood, 
} from '../../../../shared/dist/lib/schemas/neighborhood.js'
import { AppError } from '../../../../shared/dist/lib/errors.js'
import { getTenantById } from './tenant'

type NeighborhoodRow = Database['public']['Tables']['neighborhoods']['Row']

export function validateNeighborhoodInput(input: unknown): void {
  NeighborhoodInsertSchema.parse(input)
}

export async function createNeighborhood(supabase: SupabaseClient<Database>, input: InsertNeighborhood): Promise<NeighborhoodRow> {
  validateNeighborhoodInput(input)

  const tenant = await getTenantById(supabase, input.tenant_id)
  if (!tenant) {
    throw new AppError('Tenant not found', 'TENANT_NOT_FOUND')
  }

  const { data, error } = await supabase
    .from('neighborhoods')
    .insert(input as any)
    .select()
    .single()

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data
}

export async function getNeighborhoodById(supabase: SupabaseClient<Database>, id: string): Promise<NeighborhoodRow | null> {
  const { data, error } = await supabase
    .from('neighborhoods')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data || null
}

export async function listNeighborhoodsByTenant(supabase: SupabaseClient<Database>, tenantId: string): Promise<NeighborhoodRow[]> {
  const { data, error } = await supabase
    .from('neighborhoods')
    .select('*')
    .eq('tenant_id', tenantId)

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data || []
}

export async function updateNeighborhood(supabase: SupabaseClient<Database>, id: string, input: UpdateNeighborhood): Promise<NeighborhoodRow> {
  const { data, error } = await supabase
    .from('neighborhoods')
    .update(input as any)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data
}

export async function deleteNeighborhood(supabase: SupabaseClient<Database>, id: string): Promise<void> {
  const { error } = await supabase
    .from('neighborhoods')
    .delete()
    .eq('id', id)

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }
}