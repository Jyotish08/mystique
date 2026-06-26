/**
 * Application-wide constants.
 *
 * All [TODO] values must be replaced with the actual provided data
 * before submission.
 */

/** Mobile breakpoint in pixels — must match the value in useBentoAccordionContextLock */
export const MOBILE_BREAKPOINT = 768;

/** Annual billing discount multiplier (20% off → 0.8) */
export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8;

/** Supported currency codes */
export const CURRENCY_CODES = ['INR', 'USD', 'EUR'] as const;

/** Supported billing cycles */
export const BILLING_CYCLES = ['MONTHLY', 'ANNUAL'] as const;

/** Section IDs for smooth-scroll nav */
export const SECTION_IDS = {
  hero:        'hero',
  features:    'features',
  pricing:     'pricing',
  socialProof: 'social-proof',
} as const;
