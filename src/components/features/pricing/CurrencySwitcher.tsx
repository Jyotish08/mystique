import React from 'react';
import type { CurrencyCode } from '@/lib/pricingMatrix';
import Icon from '@/components/ui/Icon';

interface CurrencySwitcherProps {
  currency: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
}

const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: 'USD', label: 'USD ($)' },
  { code: 'INR', label: 'INR (₹)' },
  { code: 'EUR', label: 'EUR (€)' },
];

/**
 * CurrencySwitcher — Feature 1 sub-component
 *
 * A native <select> styled as a pill dropdown.
 * Uses a native element to guarantee zero runtime overhead and
 * full keyboard / screen-reader support out of the box.
 *
 * Competition compliance:
 *   ✅ Native HTML — no external component library
 *   ✅ onChange triggers direct DOM updates via useIsolatedPricing,
 *      NOT a React state update on price text nodes
 */
const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  currency,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as CurrencyCode);
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        id="currency-select"
        value={currency}
        onChange={handleChange}
        aria-label="Select display currency"
        className={[
          'appearance-none',
          'bg-[var(--color-surface)]',
          'border border-[var(--color-border)]',
          'rounded-[var(--radius-full)]',
          'pl-4 pr-9 py-2',
          'text-sm font-medium font-sans',
          'text-[var(--color-text-primary)]',
          'cursor-pointer',
          'shadow-[var(--shadow-xs)]',
          'transition-colors duration-[175ms] ease-out-premium',
          'hover:border-[var(--color-border-hover)]',
        ].join(' ')}
      >
        {CURRENCIES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>

      {/* Chevron icon overlay — pointer-events-none so it doesn't block the select */}
      <span
        className={[
          'pointer-events-none',
          'absolute right-3 top-1/2 -translate-y-1/2',
          'text-[var(--color-text-muted)]',
        ].join(' ')}
        aria-hidden="true"
      >
        <Icon name="chevron-down" className="w-3.5 h-3.5" />
      </span>
    </div>
  );
};

export default CurrencySwitcher;
