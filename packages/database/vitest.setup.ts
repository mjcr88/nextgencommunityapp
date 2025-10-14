import { beforeAll } from 'vitest'

beforeAll(() => {
  // Set mock environment variables for Supabase client initialization
  // These are required when repository files create clients at module level
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://mock-project.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'mock-anon-key-for-testing-purposes'
})