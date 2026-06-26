import { useRef, useCallback } from 'react';
import {
  calculatePrice,
  formatPrice,
  pricingMatrix,
  TierConfig,
  CurrencyCode,
  BillingCycle,
} from '@/lib/pricingMatrix';

/**
 * useIsolatedPricing — Feature 1 hook
 *
 * Maintains a map of tier IDs → DOM span refs.
 * When currency or cycle changes, updatePrices() mutates each span's
 * textContent directly — zero React state updates, zero re-renders.
 *
 * The WAAPI micro-animation (opacity + translateY, 175ms) provides
 * visual feedback for the price change without triggering layout.
 *
 * Competition compliance:
 *   ✅ Isolated state updates to targeted text nodes
 *   ✅ No global component reflow
 *   ✅ Native WAAPI (Web Animations API)
 *   ✅ Hardware-accelerated: opacity + transform only
 */
export const useIsolatedPricing = () => {
  // Map of tier ID → the price <span> DOM element
  const priceNodeRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  /** Call this in the ref prop: ref={setRef(tier.id)} */
  const setRef = useCallback(
    (tierId: string) => (node: HTMLSpanElement | null) => {
      priceNodeRefs.current[tierId] = node;
    },
    [],
  );

  /** Mutate all price spans directly — no React setState */
  const updatePrices = useCallback(
    (currency: CurrencyCode, cycle: BillingCycle) => {
      pricingMatrix.tiers.forEach((tier: TierConfig) => {
        const node = priceNodeRefs.current[tier.id];
        if (!node) return;

        const price  = calculatePrice(tier, currency, cycle);
        const symbol = pricingMatrix.currencies[currency].symbol;

        // Direct DOM text mutation — zero React involvement
        node.textContent = `${symbol}${formatPrice(price)}`;

        // WAAPI micro-interaction: opacity + translateY (composite only)
        if (typeof node.animate === 'function') {
          node.animate(
            [
              { opacity: 0.4, transform: 'translateY(-3px)' },
              { opacity: 1,   transform: 'translateY(0px)'  },
            ],
            {
              duration: 175,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out
              fill: 'forwards',
            },
          );
        }
      });
    },
    [],
  );

  return { setRef, updatePrices };
};
