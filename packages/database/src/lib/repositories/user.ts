import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase'
import { InsertUserSchema, UpdateUserSchema } from '../../../../shared/lib/schemas/user'
import { AppError } from '../../../../shared/lib/errors'

import { z } from 'zod'

type SupabaseClient = ReturnType<typeof createClient<Database>>

export async function getUserById(
  supabase: SupabaseClient,
  tenantId: string,
  userId: string
): Promise<Database['public']['Tables']['users']['Row'] | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('id', userId)
    .single()

  if (error) {
    throw new AppError('Failed to fetch user', { code: 'FETCH_ERROR', cause: error })
  }

  return data
}

export async function createUser(
  supabase: SupabaseClient,
  userData: z.infer<typeof InsertUserSchema>
): Promise<Database['public']['Tables']['users']['Row']> {
  const validatedData = InsertUserSchema.parse(userData)
  const { data, error } = await supabase
    .from('users')
    .insert(validatedData as any)
    .select()
    .single()

  if (error) {
    throw new AppError('Failed to create user', { code: 'CREATE_ERROR', cause: error })
  }

  return data
}

export async function updateUser(
  supabase: SupabaseClient,
  tenantId: string,
  userId: string,
  updates: z.infer<typeof UpdateUserSchema>
): Promise<Database['public']['Tables']['users']['Row'] | null> {
  const validatedUpdates = UpdateUserSchema.parse(updates)
  const { data, error } = await supabase
    .from('users')
    .update(validatedUpdates as any)
    .eq('tenant_id', tenantId)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new AppError('Failed to update user', { code: 'UPDATE_ERROR', cause: error })
  }

  return data
}
