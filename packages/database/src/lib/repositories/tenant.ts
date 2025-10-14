import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import { 
  InsertTenant, 
  UpdateTenant, 
} from '../../../../shared/dist/lib/schemas/tenant.js'
import { AppError } from '../../../../shared/dist/lib/errors.js'

type TenantRow = Database['public']['Tables']['tenants']['Row']

export async function createTenant(supabase: SupabaseClient<Database>, input: InsertTenant): Promise<TenantRow> {
  const { data, error } = await supabase
    .from('tenants')
    .insert(input as any)
    .select()
    .single()

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data
}

export async function getTenantById(supabase: SupabaseClient<Database>, id: string): Promise<TenantRow | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data || null
}

export async function listTenants(supabase: SupabaseClient<Database>): Promise<TenantRow[]> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data || []
}

export async function updateTenant(supabase: SupabaseClient<Database>, id: string, input: UpdateTenant): Promise<TenantRow> {
  const { data, error } = await supabase
    .from('tenants')
    .update(input as any)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new AppError(error.message, 'DATABASE_ERROR')
  }

  return data
}