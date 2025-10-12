import { describe, it, expect, vi, afterEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@repo/database/types/supabase'
import { getUserById, createUser, updateUser } from './user'
import { InsertUserSchema, UpdateUserSchema } from '@repo/shared/lib/schemas/user'
import { AppError } from '@repo/shared/lib/errors'

import { z } from 'zod'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}))

const mockSupabase = {
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    single: vi.fn(),
  }),
}

vi.mocked(createClient).mockReturnValue(mockSupabase as any)

describe('User Repository', () => {
  const mockTenantId = 'tenant-123'
  const mockUserId = 'user-123'
const mockUserData: z.infer<typeof InsertUserSchema> = {
  id: mockUserId,
  email: 'test@example.com',
  full_name: 'Test User',
  tenant_id: mockTenantId,
  status: 'active',
  preferred_language: 'en',
  journey_stage: 'newcomer',
  role: 'resident',
  privacy_settings: {},
  notification_preferences: {},
  interests: [],
  skills: [],
}

  const mockUserProfile = {
    id: mockUserId,
    email: 'test@example.com',
    full_name: 'Test User',
    tenant_id: mockTenantId,
    role: 'member',
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserById', () => {
    it('should return user profile when found', async () => {
      mockSupabase.from().select().eq().eq().single().mockResolvedValue({ data: mockUserProfile, error: null })

      const result = await getUserById(mockSupabase as any, mockTenantId, mockUserId)

      expect(result).toEqual(mockUserProfile)
      expect(mockSupabase.from).toHaveBeenCalledWith('users')
      expect(mockSupabase.from().select).toHaveBeenCalledWith('*')
      expect(mockSupabase.from().eq).toHaveBeenNthCalledWith(1, 'tenant_id', mockTenantId)
      expect(mockSupabase.from().eq).toHaveBeenNthCalledWith(2, 'id', mockUserId)
      expect(mockSupabase.from().single).toHaveBeenCalled()
    })

    it('should throw AppError on supabase error', async () => {
      const mockError = { message: 'DB error' }
      mockSupabase.from().select().eq().eq().single().mockResolvedValue({ data: null, error: mockError })

      await expect(getUserById(mockSupabase as any, mockTenantId, mockUserId)).rejects.toThrow(AppError)
      expect(mockSupabase.from().single).toHaveBeenCalled()
    })
  })

  describe('createUser', () => {
    it('should create and return user', async () => {
      mockSupabase.from().insert().select().single().mockResolvedValue({ data: mockUserProfile, error: null })

      const result = await createUser(mockSupabase as any, mockUserData)

      expect(result).toEqual(mockUserProfile)
      expect(InsertUserSchema.parse).toHaveBeenCalledWith(mockUserData)
      expect(mockSupabase.from).toHaveBeenCalledWith('users')
      expect(mockSupabase.from().insert).toHaveBeenCalledWith(mockUserData)
      expect(mockSupabase.from().select).toHaveBeenCalledWith()
      expect(mockSupabase.from().single).toHaveBeenCalled()
    })

    it('should throw AppError on validation error', async () => {
      const invalidData = { ...mockUserData, email: 'invalid' }
      vi.spyOn(InsertUserSchema, 'parse').mockImplementation(() => { throw new Error('Validation failed') })

      await expect(createUser(mockSupabase as any, invalidData as any)).rejects.toThrow(AppError)
    })

    it('should throw AppError on supabase error', async () => {
      const mockError = { message: 'Insert error' }
      mockSupabase.from().insert().select().single().mockResolvedValue({ data: null, error: mockError })

      await expect(createUser(mockSupabase as any, mockUserData)).rejects.toThrow(AppError)
    })
  })

  describe('updateUser', () => {
    const mockUpdates = { full_name: 'Updated Name' } as z.infer<typeof UpdateUserSchema>

    it('should update and return user', async () => {
      mockSupabase.from().update().eq().eq().select().single().mockResolvedValue({ data: mockUserProfile, error: null })

      const result = await updateUser(mockSupabase as any, mockTenantId, mockUserId, mockUpdates)

      expect(result).toEqual(mockUserProfile)
      expect(UpdateUserSchema.parse).toHaveBeenCalledWith(mockUpdates)
      expect(mockSupabase.from).toHaveBeenCalledWith('users')
      expect(mockSupabase.from().update).toHaveBeenCalledWith(mockUpdates)
      expect(mockSupabase.from().eq).toHaveBeenNthCalledWith(1, 'tenant_id', mockTenantId)
      expect(mockSupabase.from().eq).toHaveBeenNthCalledWith(2, 'id', mockUserId)
      expect(mockSupabase.from().select).toHaveBeenCalledWith()
      expect(mockSupabase.from().single).toHaveBeenCalled()
    })

    it('should throw AppError on supabase error', async () => {
      const mockError = { message: 'Update error' }
      mockSupabase.from().update().eq().eq().select().single().mockResolvedValue({ data: null, error: mockError })

      await expect(updateUser(mockSupabase as any, mockTenantId, mockUserId, mockUpdates)).rejects.toThrow(AppError)
    })
  })
})
