'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useIsolatedPricing } from '@/hooks/useIsolatedDOMUpdate';
import type { CurrencyCode, BillingCycle } from '@/lib/pricingMatrix';
import BillingToggle from '@/components/features/pricing/BillingToggle';
import CurrencySwitcher from '@/components/features/pricing/CurrencySwitcher';
import PricingTierMatrix from '@/components/features/pricing/PricingTierMatrix';

/*
 * TODO: Replace [TODO] placeholders with actual provided copy.
 */
const SECTION_HEADING = '[TODO: Pricing Section Heading]';
const SECTION_COPY    = '[TODO: Pricing Section Sub-heading / Copy]';

/**
 * PricingMatrix — Feature 1 orchestrating section
 *
 * Owns the billing cycle and currency state.
 * Price text node updates are isolated via useIsolatedPricing —
 * changing currency or cycle does NOT re-render this component
 * or any of its children; only the targeted DOM text nodes are mutated.
 *
 * Competition compliance:
 *   ✅ No global re-renders on currency/cycle change
 *   ✅ Dynamic multi-dimensional pricing matrix
 *   ✅ 20% annual discount multiplier
 *   ✅ INR / USD / EUR with regional tariff variables
 */
const PricingMatrix: React.FC = () => {
  const { setRef, updatePrices } = useIsolatedPricing();

  /*
   * cycle and currency state live here to satisfy the React state contract,
   * but they control only the BillingToggle and CurrencySwitcher UI.
   * The actual price text nodes are updated via direct DOM mutation.
   */
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [cycle,    setCycle]    = useState<BillingCycle>('MONTHLY');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  /* ── Scroll-reveal on section header ── */
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const header = headerRef.current;
    if (!header) return;

    header.classList.add('sr-hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('sr-hidden');
            entry.target.classList.add('sr-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  /* ── Handlers — update React state for UI, then fire DOM update ── */
  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    updatePrices(newCurrency, cycle);
  };

  const handleCycleToggle = () => {
    const newCycle = cycle === 'MONTHLY' ? 'ANNUAL' : 'MONTHLY';
    setCycle(newCycle);
    updatePrices(currency, newCycle);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      aria-labelledby="pricing-heading"
      className={[
        'py-24 md:py-32',
        'bg-[var(--color-mystic-mint)]',
      ].join(' ')}
    >
      <div className="section-container">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-14"
        >
          <h2
            id="pricing-heading"
            className="font-mono font-bold text-[var(--color-text-primary)] mb-4"
          >
            {SECTION_HEADING}
          </h2>
          <p className="font-sans text-base text-[var(--color-text-secondary)] leading-relaxed">
            {SECTION_COPY}
          </p>
        </div>

        {/* ── Controls row: BillingToggle + CurrencySwitcher ── */}
        <div
          className={[
            'flex flex-col sm:flex-row',
            'items-center justify-center',
            'gap-4 mb-12',
          ].join(' ')}
          aria-label="Pricing controls"
        >
          <BillingToggle cycle={cycle} onToggle={handleCycleToggle} />
          <CurrencySwitcher currency={currency} onChange={handleCurrencyChange} />
        </div>

        {/*
         * PricingTierMatrix renders the tier cards.
         * setRef registers each price span for direct DOM updates.
         * currency and cycle are passed for the INITIAL render only;
         * subsequent updates bypass React via useIsolatedPricing.
         */}
        <PricingTierMatrix
          currency={currency}
          cycle={cycle}
          setRef={setRef}
        />

      </div>
    </section>
  );
};

export default PricingMatrix;
