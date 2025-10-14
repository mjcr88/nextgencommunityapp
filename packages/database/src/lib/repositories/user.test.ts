import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase'
import { getUserById, createUser, updateUser } from './user'
import { InsertUserSchema, UpdateUserSchema } from '../../../../shared/dist/lib/schemas/user.js'
import { AppError } from '../../../../shared/dist/lib/errors.js'

import { z } from 'zod'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}))

// Create a proper chainable mock
const mockChain = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  single: vi.fn(),
}

const mockSupabase = {
  from: vi.fn(() => mockChain),
  auth: {},
}

vi.mocked(createClient).mockReturnValue(mockSupabase as any)

describe('User Repository', () => {
  // Use valid UUIDs for test data
  const mockTenantId = '550e8400-e29b-41d4-a716-446655440000'
  const mockUserId = '650e8400-e29b-41d4-a716-446655440001'
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
    status: 'active',
    preferred_language: 'en',
    journey_stage: 'newcomer',
    role: 'resident',
    privacy_settings: {},
    notification_preferences: {},
    interests: [],
    skills: [],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
    // Reset the chain to return itself
    mockChain.select.mockReturnThis()
    mockChain.eq.mockReturnThis()
    mockChain.insert.mockReturnThis()
    mockChain.update.mockReturnThis()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserById', () => {
    it('should return user profile when found', async () => {
      mockChain.single.mockResolvedValueOnce({ data: mockUserProfile, error: null })

      const result = await getUserById(mockSupabase as any, mockTenantId, mockUserId)

      expect(result).toEqual(mockUserProfile)
      expect(mockSupabase.from).toHaveBeenCalledWith('users')
      expect(mockChain.select).toHaveBeenCalledWith('*')
      expect(mockChain.eq).toHaveBeenCalledWith('tenant_id', mockTenantId)
      expect(mockChain.eq).toHaveBeenCalledWith('id', mockUserId)
      expect(mockChain.single).toHaveBeenCalled()
    })

    it('should throw AppError on supabase error', async () => {
      const mockError = { message: 'DB error' }
      mockChain.single.mockResolvedValue({ data: null, error: mockError })

      await expect(getUserById(mockSupabase as any, mockTenantId, mockUserId)).rejects.toThrow(AppError)
      await expect(getUserById(mockSupabase as any, mockTenantId, mockUserId)).rejects.toThrow('Failed to fetch user')
    })
  })

  describe('createUser', () => {
    it('should create and return user', async () => {
      mockChain.single.mockResolvedValueOnce({ data: mockUserProfile, error: null })

      const result = await createUser(mockSupabase as any, mockUserData)

      expect(result).toEqual(mockUserProfile)
      expect(mockSupabase.from).toHaveBeenCalledWith('users')
      expect(mockChain.insert).toHaveBeenCalled()
      expect(mockChain.select).toHaveBeenCalled()
      expect(mockChain.single).toHaveBeenCalled()
    })

    it('should throw AppError on validation error', async () => {
      const invalidData = { email: 'invalid' } as any

      await expect(createUser(mockSupabase as any, invalidData)).rejects.toThrow()
    })

    it('should throw AppError on supabase error', async () => {
      const mockError = { message: 'Insert error' }
      mockChain.single.mockResolvedValue({ data: null, error: mockError })

      await expect(createUser(mockSupabase as any, mockUserData)).rejects.toThrow(AppError)
      await expect(createUser(mockSupabase as any, mockUserData)).rejects.toThrow('Failed to create user')
    })
  })

  describe('updateUser', () => {
    const mockUpdates = { full_name: 'Updated Name' } as z.infer<typeof UpdateUserSchema>

    it('should update and return user', async () => {
      mockChain.single.mockResolvedValueOnce({ data: mockUserProfile, error: null })

      const result = await updateUser(mockSupabase as any, mockTenantId, mockUserId, mockUpdates)

      expect(result).toEqual(mockUserProfile)
      expect(mockSupabase.from).toHaveBeenCalledWith('users')
      expect(mockChain.update).toHaveBeenCalled()
      expect(mockChain.eq).toHaveBeenCalledWith('tenant_id', mockTenantId)
      expect(mockChain.eq).toHaveBeenCalledWith('id', mockUserId)
      expect(mockChain.select).toHaveBeenCalled()
      expect(mockChain.single).toHaveBeenCalled()
    })

    it('should throw AppError on supabase error', async () => {
      const mockError = { message: 'Update error' }
      mockChain.single.mockResolvedValue({ data: null, error: mockError })

      await expect(updateUser(mockSupabase as any, mockTenantId, mockUserId, mockUpdates)).rejects.toThrow(AppError)
      await expect(updateUser(mockSupabase as any, mockTenantId, mockUserId, mockUpdates)).rejects.toThrow('Failed to update user')
    })
  })
})