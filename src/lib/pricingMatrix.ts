export type CurrencyCode = 'INR' | 'USD' | 'EUR';
export type BillingCycle = 'MONTHLY' | 'ANNUAL';

export interface TierConfig {
  id: string;
  name: string;
  baseRate: number; // TODO: Populate with actual base rates when provided
}

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  regionalTariff: number; // TODO: Populate with actual tariff variables
}

export const pricingMatrix = {
  tiers: [
    { id: 'tier_1', name: 'TODO_TIER_1', baseRate: 0 }, 
    { id: 'tier_2', name: 'TODO_TIER_2', baseRate: 0 },
    { id: 'tier_3', name: 'TODO_TIER_3', baseRate: 0 },
  ] as TierConfig[],
  currencies: {
    INR: { code: 'INR', symbol: '₹', regionalTariff: 0 },
    USD: { code: 'USD', symbol: '$', regionalTariff: 0 },
    EUR: { code: 'EUR', symbol: '€', regionalTariff: 0 },
  } as Record<CurrencyCode, CurrencyConfig>,
  annualDiscountMultiplier: 0.8, // Flat 20% annual discount
};

export function calculatePrice(
  tier: TierConfig,
  currency: CurrencyCode,
  cycle: BillingCycle
): number {
  const currencyConfig = pricingMatrix.currencies[currency];
  const basePrice = tier.baseRate + currencyConfig.regionalTariff;
  
  if (cycle === 'ANNUAL') {
    return Math.round(basePrice * pricingMatrix.annualDiscountMultiplier);
  }
  
  return Math.round(basePrice);
}
