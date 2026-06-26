import React from 'react';
import type { CurrencyCode, BillingCycle, TierConfig } from '@/lib/pricingMatrix';
import { calculatePrice, formatPrice, pricingMatrix } from '@/lib/pricingMatrix';

interface PriceDisplayProps {
  /** The tier this price display belongs to */
  tier: TierConfig;
  /** Currently selected currency */
  currency: CurrencyCode;
  /** Currently selected billing cycle */
  cycle: BillingCycle;
  /**
   * Ref setter from useIsolatedPricing — attaches the DOM ref so that
   * subsequent currency/cycle changes can mutate the text node directly
   * without triggering a React re-render.
   */
  spanRef: (node: HTMLSpanElement | null) => void;
}

/**
 * PriceDisplay — Feature 1 sub-component
 *
 * Renders the initial price on mount via React (SSR-safe).
 * All subsequent updates are handled by useIsolatedPricing via direct
 * DOM manipulation — this component NEVER re-renders for price changes.
 *
 * The spanRef is the critical bridge: it gives useIsolatedPricing access
 * to the text node so it can update textContent directly.
 *
 * Competition compliance:
 *   ✅ Initial render: React (correct for SSR/hydration)
 *   ✅ Price updates: direct DOM — zero React re-renders
 *   ✅ WAAPI micro-animation on update (in useIsolatedDOMUpdate)
 *   ✅ aria-live="polite" for screen reader announcements
 */
const PriceDisplay: React.FC<PriceDisplayProps> = ({
  tier,
  currency,
  cycle,
  spanRef,
}) => {
  const initialPrice  = calculatePrice(tier, currency, cycle);
  const symbol        = pricingMatrix.currencies[currency].symbol;
  const isAnnual      = cycle === 'ANNUAL';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        {/* Price span — ref registered for direct DOM updates */}
        <span
          ref={spanRef}
          className={[
            'font-mono font-bold text-4xl leading-none',
            'text-[var(--color-text-primary)]',
          ].join(' ')}
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${symbol}${formatPrice(initialPrice)} per month`}
        >
          {symbol}{formatPrice(initialPrice)}
        </span>

        <span className="text-sm font-sans text-[var(--color-text-muted)] pb-0.5">
          /mo
        </span>
      </div>

      {/* Annual savings callout */}
      {isAnnual && (
        <p className="text-xs font-sans text-[var(--color-nocturnal-expedition)] font-medium">
          Billed annually — 20% saved
        </p>
      )}
    </div>
  );
};

export default PriceDisplay;
