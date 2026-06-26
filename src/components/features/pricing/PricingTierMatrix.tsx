import React from 'react';
import { pricingMatrix } from '@/lib/pricingMatrix';
import type { CurrencyCode, BillingCycle } from '@/lib/pricingMatrix';
import PriceDisplay from './PriceDisplay';

interface PricingTierMatrixProps {
  currency: CurrencyCode;
  cycle: BillingCycle;
  /**
   * setRef from useIsolatedPricing — returns a ref setter for a given tier ID.
   * Registering the ref here gives the isolated DOM updater direct access
   * to each price span without re-rendering this component.
   */
  setRef: (tierId: string) => (node: HTMLSpanElement | null) => void;
}

/**
 * PricingTierMatrix — Feature 1 sub-component
 *
 * Renders the three pricing tier cards.
 * Price text nodes are connected to the isolated DOM updater via spanRef.
 * The card grid NEVER re-renders on currency or cycle changes.
 *
 * Competition compliance:
 *   ✅ Dynamic multi-dimensional matrix — no hardcoded final values
 *   ✅ Price updates isolated to targeted DOM text nodes
 *   ✅ No global component reflow
 */
const PricingTierMatrix: React.FC<PricingTierMatrixProps> = ({
  currency,
  cycle,
  setRef,
}) => {
  return (
    <div
      role="list"
      aria-label="Pricing tiers"
      className={[
        'grid grid-cols-1 md:grid-cols-3 gap-6',
      ].join(' ')}
    >
      {pricingMatrix.tiers.map((tier) => (
        <article
          key={tier.id}
          role="listitem"
          aria-label={`${tier.name} pricing tier`}
          className={[
            'card flex flex-col gap-6',
            'transition-[transform,box-shadow,border-color] duration-[175ms] ease-out-premium',
            /* Featured / most-popular tier gets accent border */
            tier.featured
              ? [
                  'border-[var(--color-nocturnal-expedition)]',
                  'shadow-[var(--shadow-lg)]',
                  'relative',
                ].join(' ')
              : '',
          ].join(' ')}
        >
          {/* ── Most Popular badge (featured tier only) ── */}
          {tier.featured && (
            <div className="absolute -top-3.5 inset-x-0 flex justify-center">
              <span className="badge badge-accent text-xs">
                Most Popular
              </span>
            </div>
          )}

          {/* ── Tier name ── */}
          <h3 className="font-mono font-bold text-lg text-[var(--color-text-primary)]">
            {tier.name}
          </h3>

          {/* ── Price ── */}
          <PriceDisplay
            tier={tier}
            currency={currency}
            cycle={cycle}
            spanRef={setRef(tier.id)}
          />

          {/* ── Feature list ── */}
          <ul
            role="list"
            aria-label={`${tier.name} features`}
            className="flex flex-col gap-2.5 flex-1"
          >
            {tier.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5"
              >
                {/* Checkmark — inline SVG, no new asset */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5"
                >
                  <circle cx="8" cy="8" r="7" fill="var(--color-forsythia)" />
                  <path
                    d="M4.5 8L7 10.5L11.5 5.5"
                    stroke="var(--color-oceanic-noir)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-sans text-[var(--color-text-secondary)] leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* ── CTA Button ── */}
          <a
            href="#"
            className={[
              'btn w-full justify-center mt-2',
              tier.featured ? 'btn-primary' : 'btn-outline',
            ].join(' ')}
            aria-label={`${tier.ctaLabel} — ${tier.name} plan`}
          >
            {tier.ctaLabel}
          </a>
        </article>
      ))}
    </div>
  );
};

export default PricingTierMatrix;
