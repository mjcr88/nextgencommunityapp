import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/types/supabase'
import { signUp, signIn, getCurrentUser } from '../../../../apps/web/app/actions/user'
import { InsertUserSchema } from '../../../packages/shared/lib/schemas/user'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}))

const mockSupabase = {
  auth: {
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    getSession: vi.fn(),
  },
  from: vi.fn().mockReturnValue({
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  }),
}

vi.mocked(createClient).mockReturnValue(mockSupabase as any)

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue({ value: '' }),
    set: vi.fn(),
    delete: vi.fn(),
  }),
}))

describe('User Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sign up user and create profile', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }
    mockSupabase.auth.signUp.mockResolvedValue({ data: { user: mockUser }, error: null })
    mockSupabase.from().insert().select().single().mockResolvedValue({ data: { id: 'user-123' }, error: null })

    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('password', 'password123')
    formData.append('full_name', 'Test User')

    const result = await signUp(formData)

    expect(result.success).toBe(true)
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      options: expect.objectContaining({
        data: expect.objectContaining({
          tenant_id: expect.any(String),
          role: 'resident',
        }),
      }),
    })
    expect(mockSupabase.from().insert).toHaveBeenCalledWith(expect.objectContaining({
      id: 'user-123',
      email: 'test@example.com',
      full_name: 'Test User',
    }))
  })

  it('should sign in user and return session', async () => {
    const mockSession = { access_token: 'token', user: { id: 'user-123' } }
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: { session: mockSession }, error: null })

    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('password', 'password123')

    const result = await signIn(formData)

    expect(result.success).toBe(true)
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should get current user with profile', async () => {
    const mockSession = { access_token: 'token', user: { id: 'user-123', user_metadata: { tenant_id: 'tenant-123', role: 'resident' } } }
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession }, error: null })
    mockSupabase.from().select().eq().eq().single().mockResolvedValue({ data: { id: 'user-123', email: 'test@example.com' }, error: null })

    const result = await getCurrentUser()

    expect(result).toBeDefined()
    expect(mockSupabase.auth.getSession).toHaveBeenCalled()
    expect(mockSupabase.from().select).toHaveBeenCalledWith('*')
  })
})
