import { describe, it, expect } from 'vitest'
import { 
  checkDuplicateLotNumber, 
  canTransitionStatus, 
  validateLotNeighborhoodOwnership, 
  validateGeoBounds 
} from '../lot'
import { AppError } from '../../../../../shared/dist/lib/errors.js'
import { Database } from '../../../types/supabase'

type LotRow = Database['public']['Tables']['lots']['Row']

describe('Lot Validation', () => {
  it('checkDuplicateLotNumber identifies duplicate', () => {
    const existingLots: Pick<LotRow, 'lot_number'>[] = [{ 
      lot_number: 'LOT101',
    }]
    expect(checkDuplicateLotNumber('LOT101', existingLots)).toBe(true)
  })

  it('checkDuplicateLotNumber allows unique lot_number', () => {
    const existingLots: Pick<LotRow, 'lot_number'>[] = [{ 
      lot_number: 'LOT101',
    }]
    expect(checkDuplicateLotNumber('LOT102', existingLots)).toBe(false)
  })

  it('checkDuplicateLotNumber handles empty list', () => {
    const existingLots: Pick<LotRow, 'lot_number'>[] = []
    expect(checkDuplicateLotNumber('LOT101', existingLots)).toBe(false)
  })

  it('canTransitionStatus allows available → assigned', () => {
    expect(canTransitionStatus('available', 'assigned')).toBe(true)
  })

  it('canTransitionStatus allows assigned → available', () => {
    expect(canTransitionStatus('assigned', 'available')).toBe(true)
  })

  it('canTransitionStatus prevents invalid transitions', () => {
    expect(canTransitionStatus('available', 'invalid')).toBe(false)
  })

  it('validateLotNeighborhoodOwnership validates ownership', () => {
    const lot: LotRow = { 
      id: '123e4567-e89b-12d3-a456-426614174000',
      neighborhood_id: '123e4567-e89b-12d3-a456-426614174001',
      lot_number: 'LOT101',
      status: 'available',
      geo_bounds: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
    expect(() => validateLotNeighborhoodOwnership(lot, '123e4567-e89b-12d3-a456-426614174001')).not.toThrow()
  })

  it('validateLotNeighborhoodOwnership throws on mismatch', () => {
    const lot: LotRow = { 
      id: '123e4567-e89b-12d3-a456-426614174000',
      neighborhood_id: '123e4567-e89b-12d3-a456-426614174001',
      lot_number: 'LOT101',
      status: 'available',
      geo_bounds: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
    expect(() => validateLotNeighborhoodOwnership(lot, '456e7890-e89b-12d3-a456-426614174002')).toThrow(AppError)
  })

  it('validateGeoBounds accepts valid object', () => {
    const bounds = { type: 'Polygon', coordinates: [[[0,0]]] }
    expect(() => validateGeoBounds(bounds)).not.toThrow()
  })

  it('validateGeoBounds accepts null', () => {
    expect(() => validateGeoBounds(null)).not.toThrow()
  })

  it('validateGeoBounds throws for invalid structure', () => {
    expect(() => validateGeoBounds('string')).toThrow(AppError)
  })
})