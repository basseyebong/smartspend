import { describe, it, expect } from 'vitest'
import { formatCurrency, getCurrencyByCode, getDefaultCurrency } from '../currencies'

describe('Currency utilities', () => {
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,235')
    })

    it('formats NGN correctly', () => {
      expect(formatCurrency(1234.56, 'NGN')).toBe('₦1,235')
    })

    it('formats EUR correctly (symbol after)', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('1,235 €')
    })

    it('handles null/undefined amounts', () => {
      expect(formatCurrency(null as any, 'USD')).toBe('$0')
      expect(formatCurrency(undefined as any, 'USD')).toBe('$0')
      expect(formatCurrency(NaN, 'USD')).toBe('$0')
    })

    it('handles unknown currency codes', () => {
      expect(formatCurrency(1234, 'UNKNOWN')).toBe('1,234')
    })
  })

  describe('getCurrencyByCode', () => {
    it('returns correct currency for valid code', () => {
      const usd = getCurrencyByCode('USD')
      expect(usd).toEqual({
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        flag: '🇺🇸'
      })
    })

    it('returns undefined for invalid code', () => {
      expect(getCurrencyByCode('INVALID')).toBeUndefined()
    })
  })

  describe('getDefaultCurrency', () => {
    it('returns NGN as default currency', () => {
      const defaultCurrency = getDefaultCurrency()
      expect(defaultCurrency.code).toBe('NGN')
    })
  })
})