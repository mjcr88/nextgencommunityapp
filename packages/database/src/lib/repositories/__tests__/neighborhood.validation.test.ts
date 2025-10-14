import { describe, it, expect } from 'vitest'
import { validateNeighborhoodInput } from '../neighborhood'
import { ZodError } from 'zod'

describe('Neighborhood Validation', () => {
  it('throws ZodError for invalid tenant_id format', () => {
    expect(() => validateNeighborhoodInput({ tenant_id: 'invalid', name: 'Test' })).toThrow(ZodError)
  })

  it('accepts valid UUID tenant_id', () => {
    expect(() => validateNeighborhoodInput({ 
      tenant_id: '123e4567-e89b-12d3-a456-426614174000', 
      name: 'Test' 
    })).not.toThrow()
  })

  it('throws for empty name', () => {
    expect(() => validateNeighborhoodInput({ 
      tenant_id: '123e4567-e89b-12d3-a456-426614174000', 
      name: '' 
    })).toThrow(ZodError)
  })

  it('throws for missing required fields', () => {
    expect(() => validateNeighborhoodInput({})).toThrow(ZodError)
  })

  it('accepts optional description and settings', () => {
    expect(() => validateNeighborhoodInput({ 
      tenant_id: '123e4567-e89b-12d3-a456-426614174000', 
      name: 'Test',
      description: 'A test neighborhood',
      settings: { key: 'value' }
    })).not.toThrow()
  })
})