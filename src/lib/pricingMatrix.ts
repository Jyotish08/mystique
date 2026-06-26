/**
 * Pricing Matrix — Feature 1
 *
 * This is the single source of truth for all pricing data.
 *
 * The final displayed price is computed dynamically by calculatePrice():
 *   finalPrice = round( (baseRate + regionalTariff) × annualMultiplier )
 *
 * ⚠️  [TODO] Replace every [TODO] placeholder value with the actual
 *     provided figures before submission. All values are intentionally
 *     non-hardcoded in the rendering layer — this matrix drives the engine.
 *
 * Competition compliance:
 *   ✅ Multi-dimensional config matrix
 *   ✅ Flat 20% annual discount multiplier (0.8)
 *   ✅ Regional tariff variables per currency
 *   ✅ No hardcoded final values in the rendering layer
 */

import { ANNUAL_DISCOUNT_MULTIPLIER } from './constants';

export type CurrencyCode = 'INR' | 'USD' | 'EUR';
export type BillingCycle = 'MONTHLY' | 'ANNUAL';

export interface TierConfig {
  /** Unique identifier used as DOM ref key — do not change */
  id: string;
  /** Display name for this tier */
  name: string;
  /**
   * Base rate in the tier's native pricing unit.
   * [TODO] Replace 0 with the actual provided base rates.
   */
  baseRate: number;
  /** Whether to show a "Most Popular" badge */
  featured?: boolean;
  /**
   * Short list of features included in this tier.
   * [TODO] Replace with actual provided feature copy.
   */
  features: string[];
  /** CTA label for this tier */
  ctaLabel: string;
}

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  /**
   * Regional tariff added on top of baseRate before applying the
   * annual multiplier.
   * [TODO] Replace 0 with the actual provided tariff values.
   */
  regionalTariff: number;
}

export const pricingMatrix = {
  /**
   * Tier definitions.
   * [TODO] Replace tier names, baseRates, features, and ctaLabels
   *        with the actual provided values.
   */
  tiers: [
    {
      id: 'tier_1',
      name: '[TODO: Tier 1 Name]',
      baseRate: 0, // [TODO: Replace with actual base rate]
      featured: false,
      features: [
        '[TODO: Tier 1 Feature A]',
        '[TODO: Tier 1 Feature B]',
        '[TODO: Tier 1 Feature C]',
      ],
      ctaLabel: '[TODO: Tier 1 CTA]',
    },
    {
      id: 'tier_2',
      name: '[TODO: Tier 2 Name]',
      baseRate: 0, // [TODO: Replace with actual base rate]
      featured: true, // Mark the middle tier as featured
      features: [
        '[TODO: Tier 2 Feature A]',
        '[TODO: Tier 2 Feature B]',
        '[TODO: Tier 2 Feature C]',
        '[TODO: Tier 2 Feature D]',
      ],
      ctaLabel: '[TODO: Tier 2 CTA]',
    },
    {
      id: 'tier_3',
      name: '[TODO: Tier 3 Name]',
      baseRate: 0, // [TODO: Replace with actual base rate]
      featured: false,
      features: [
        '[TODO: Tier 3 Feature A]',
        '[TODO: Tier 3 Feature B]',
        '[TODO: Tier 3 Feature C]',
        '[TODO: Tier 3 Feature D]',
      ],
      ctaLabel: '[TODO: Tier 3 CTA]',
    },
  ] as TierConfig[],

  /**
   * Currency configurations.
   * [TODO] Replace regionalTariff values with the actual provided figures.
   */
  currencies: {
    INR: { code: 'INR', symbol: '₹', regionalTariff: 0 }, // [TODO: INR tariff]
    USD: { code: 'USD', symbol: '$', regionalTariff: 0 }, // [TODO: USD tariff]
    EUR: { code: 'EUR', symbol: '€', regionalTariff: 0 }, // [TODO: EUR tariff]
  } as Record<CurrencyCode, CurrencyConfig>,

  /** Flat 20% annual discount — competition required value */
  annualDiscountMultiplier: ANNUAL_DISCOUNT_MULTIPLIER,
};

/**
 * Compute the display price for a given tier, currency, and billing cycle.
 *
 * Formula:
 *   monthly = round(baseRate + regionalTariff)
 *   annual  = round((baseRate + regionalTariff) × 0.8)
 */
export function calculatePrice(
  tier: TierConfig,
  currency: CurrencyCode,
  cycle: BillingCycle,
): number {
  const currencyConfig = pricingMatrix.currencies[currency];
  const basePrice = tier.baseRate + currencyConfig.regionalTariff;

  if (cycle === 'ANNUAL') {
    return Math.round(basePrice * pricingMatrix.annualDiscountMultiplier);
  }

  return Math.round(basePrice);
}

/**
 * Format a computed price for display (e.g. "1,299").
 * Uses locale-aware formatting for large numbers (INR).
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
