'use client';

import React, { useState } from 'react';
import { useIsolatedPricing } from '@/hooks/useIsolatedDOMUpdate';
import { pricingMatrix, CurrencyCode, BillingCycle } from '@/lib/pricingMatrix';
import Icon from '@/components/ui/Icon';

const PricingMatrix: React.FC = () => {
  const { setRef, updatePrices } = useIsolatedPricing();
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [cycle, setCycle] = useState<BillingCycle>('MONTHLY');

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as CurrencyCode;
    setCurrency(newCurrency);
    updatePrices(newCurrency, cycle);
  };

  const toggleCycle = () => {
    const newCycle = cycle === 'MONTHLY' ? 'ANNUAL' : 'MONTHLY';
    setCycle(newCycle);
    updatePrices(currency, newCycle);
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-6 py-24">
        <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center">
          TODO_PRICING_HEADING
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          {/* Billing Cycle Toggle */}
          <button 
            onClick={toggleCycle}
            className="flex items-center gap-2 p-2 border border-black/10 rounded-full bg-white"
            aria-pressed={cycle === 'ANNUAL'}
          >
            <span className={`px-4 py-1 rounded-full transition-colors duration-[175ms] ease-out ${cycle === 'MONTHLY' ? 'bg-[var(--color-forsythia)]' : ''}`}>
              Monthly
            </span>
            <span className={`px-4 py-1 rounded-full transition-colors duration-[175ms] ease-out ${cycle === 'ANNUAL' ? 'bg-[var(--color-forsythia)]' : ''}`}>
              Annual (20% Off)
            </span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <select 
              value={currency} 
              onChange={handleCurrencyChange}
              className="appearance-none bg-white border border-black/10 rounded-full pl-4 pr-10 py-2 cursor-pointer"
              aria-label="Select Currency"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="chevron-down" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingMatrix.tiers.map((tier) => (
            <div key={tier.id} className="border border-black/10 rounded-2xl p-8 bg-white flex flex-col">
              <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
              <div className="mb-6">
                <span 
                  ref={setRef(tier.id)} 
                  className="text-4xl font-bold"
                  aria-live="polite"
                >
                  {/* Initial render calculated on mount, subsequent updates via direct DOM ref */}
                  {pricingMatrix.currencies[currency].symbol}
                  {tier.baseRate + pricingMatrix.currencies[currency].regionalTariff}
                </span>
                <span className="text-gray-500">/mo</span>
              </div>
              {/* TODO: Add tier features list when provided */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingMatrix;
