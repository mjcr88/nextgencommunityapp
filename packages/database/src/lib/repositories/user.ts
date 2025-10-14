import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase'
import { InsertUserSchema, UpdateUserSchema } from '../../../../shared/dist/lib/schemas/user.js'
import { AppError } from '../../../../shared/dist/lib/errors.js'
import { z } from 'zod'

type SupabaseClient = ReturnType<typeof createClient<Database>>
type UserRow = Database['public']['Tables']['users']['Row']

export async function getUserById(
  supabase: SupabaseClient,
  tenantId: string,
  userId: string
): Promise<UserRow | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('id', userId)
    .single()

  if (error) {
    throw new AppError('Failed to fetch user', 'FETCH_ERROR')
  }

  return data
}

export async function createUser(
  supabase: SupabaseClient,
  userData: z.infer<typeof InsertUserSchema>
): Promise<UserRow> {
  const validatedData = InsertUserSchema.parse(userData)
  const { data, error } = await supabase
    .from('users')
    .insert(validatedData as any)
    .select()
    .single()

  if (error) {
    throw new AppError('Failed to create user', 'CREATE_ERROR')
  }

  return data
}

export async function updateUser(
  supabase: SupabaseClient,
  tenantId: string,
  userId: string,
  updates: z.infer<typeof UpdateUserSchema>
): Promise<UserRow | null> {
  const validatedUpdates = UpdateUserSchema.parse(updates)
  const { data, error } = await supabase
    .from('users')
    .update(validatedUpdates as any)
    .eq('tenant_id', tenantId)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new AppError('Failed to update user', 'UPDATE_ERROR')
  }

  return data
}