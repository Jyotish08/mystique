import { useRef, useCallback } from 'react';
import { 
  calculatePrice, 
  pricingMatrix, 
  TierConfig, 
  CurrencyCode, 
  BillingCycle 
} from '@/lib/pricingMatrix';

export const useIsolatedPricing = () => {
  // Map of tier ID to DOM text node ref
  const priceNodeRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const setRef = useCallback((tierId: string) => (node: HTMLSpanElement | null) => {
    priceNodeRefs.current[tierId] = node;
  }, []);

  const updatePrices = useCallback((currency: CurrencyCode, cycle: BillingCycle) => {
    pricingMatrix.tiers.forEach((tier: TierConfig) => {
      const node = priceNodeRefs.current[tier.id];
      if (node) {
        const price = calculatePrice(tier, currency, cycle);
        const symbol = pricingMatrix.currencies[currency].symbol;
        
        // Direct DOM manipulation - zero React re-renders
        node.textContent = `${symbol}${price.toLocaleString()}`;
        
        // Native WAAPI micro-interaction for price change
        if (node.animate) {
          node.animate([
            { opacity: 0.5, transform: 'translateY(-2px)' },
            { opacity: 1, transform: 'translateY(0px)' }
          ], {
            duration: 175,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards'
          });
        }
      }
    });
  }, []);

  return { setRef, updatePrices };
};
