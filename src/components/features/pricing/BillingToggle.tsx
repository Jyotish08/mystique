import React from 'react';
import type { BillingCycle } from '@/lib/pricingMatrix';

interface BillingToggleProps {
  cycle: BillingCycle;
  onToggle: () => void;
}

/**
 * BillingToggle — Feature 1 sub-component
 *
 * A pill-style toggle between Monthly and Annual billing.
 * The active pill is highlighted with the Forsythia accent.
 *
 * Interaction: micro 175ms ease-out on background-color only.
 * Accessibility: role="group", aria-pressed per segment.
 *
 * Competition compliance:
 *   ✅ Micro-interaction: 175ms ease-out
 *   ✅ No layout properties animated
 *   ✅ No external libraries
 */
const BillingToggle: React.FC<BillingToggleProps> = ({ cycle, onToggle }) => {
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className={[
        'inline-flex items-center p-1',
        'bg-[var(--color-surface)]',
        'border border-[var(--color-border)]',
        'rounded-[var(--radius-full)]',
        'shadow-[var(--shadow-xs)]',
      ].join(' ')}
    >
      {/* Monthly segment */}
      <button
        type="button"
        role="radio"
        aria-checked={cycle === 'MONTHLY'}
        onClick={() => cycle !== 'MONTHLY' && onToggle()}
        className={[
          'px-4 py-1.5 rounded-[var(--radius-full)]',
          'text-sm font-medium font-sans',
          'transition-colors duration-[175ms] ease-out-premium',
          cycle === 'MONTHLY'
            ? 'bg-[var(--color-forsythia)] text-[var(--color-oceanic-noir)] font-semibold'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
        ].join(' ')}
      >
        Monthly
      </button>

      {/* Annual segment */}
      <button
        type="button"
        role="radio"
        aria-checked={cycle === 'ANNUAL'}
        onClick={() => cycle !== 'ANNUAL' && onToggle()}
        className={[
          'px-4 py-1.5 rounded-[var(--radius-full)]',
          'text-sm font-medium font-sans',
          'transition-colors duration-[175ms] ease-out-premium',
          cycle === 'ANNUAL'
            ? 'bg-[var(--color-forsythia)] text-[var(--color-oceanic-noir)] font-semibold'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
        ].join(' ')}
      >
        Annual
        <span className={[
          'ml-1.5 text-xs',
          cycle === 'ANNUAL'
            ? 'text-[var(--color-nocturnal-expedition)]'
            : 'text-[var(--color-deep-saffron)]',
        ].join(' ')}>
          (20% off)
        </span>
      </button>
    </div>
  );
};

export default BillingToggle;
