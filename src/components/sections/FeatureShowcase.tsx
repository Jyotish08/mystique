'use client';

import React, { useEffect, useRef } from 'react';
import BentoAccordionWrapper from '@/components/features/bento/BentoAccordionWrapper';
import type { FeatureItem } from '@/components/features/bento/BentoAccordionWrapper';

/*
 * TODO: Replace all [TODO] placeholder values with the actual provided
 * feature headings, copy, and icon assignments once available.
 *
 * Icon names must map to a key in src/components/ui/Icon.tsx.
 * Valid names from the supplied asset pack:
 *   'chart-pie' | 'arrow-trending-up' | 'cog-8-tooth' | 'link' |
 *   'arrow-path' | 'cube-16-solid' | 'search' | 'link-solid' | etc.
 */
const SECTION_HEADING = '[TODO: Features Section Heading]';
const SECTION_COPY    = '[TODO: Features Section Sub-heading / Copy]';

const features: FeatureItem[] = [
  {
    id: 'f1',
    icon: 'chart-pie',         // [TODO: Confirm icon assignment]
    title: '[TODO: Feature 1 Title]',
    copy:  '[TODO: Feature 1 Description Copy]',
  },
  {
    id: 'f2',
    icon: 'arrow-trending-up', // [TODO: Confirm icon assignment]
    title: '[TODO: Feature 2 Title]',
    copy:  '[TODO: Feature 2 Description Copy]',
  },
  {
    id: 'f3',
    icon: 'cog-8-tooth',       // [TODO: Confirm icon assignment]
    title: '[TODO: Feature 3 Title]',
    copy:  '[TODO: Feature 3 Description Copy]',
  },
  {
    id: 'f4',
    icon: 'link',              // [TODO: Confirm icon assignment]
    title: '[TODO: Feature 4 Title]',
    copy:  '[TODO: Feature 4 Description Copy]',
  },
];

/**
 * FeatureShowcase — Feature 2 orchestrating section
 *
 * Delegates all Bento/Accordion rendering and context-lock logic
 * to BentoAccordionWrapper, keeping this component a clean layout
 * shell focused only on section structure.
 *
 * Scroll-reveal:
 *   Uses IntersectionObserver to apply .sr-visible when the section
 *   enters the viewport. Content remains fully visible without JS
 *   (no .sr-hidden is applied unless JS runs).
 */
const FeatureShowcase: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const heading = headingRef.current;
    if (!heading) return;

    /* Apply hidden state right before observer starts watching */
    heading.classList.add('sr-hidden');

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

    observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-heading"
      className={[
        'py-24 md:py-32',
        'bg-[var(--color-arctic-powder)]',
      ].join(' ')}
    >
      <div className="section-container">

        {/* ── Section header ── */}
        <div
          ref={headingRef}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <h2
            id="features-heading"
            className="font-mono font-bold text-[var(--color-text-primary)] mb-4"
          >
            {SECTION_HEADING}
          </h2>
          <p className="font-sans text-base text-[var(--color-text-secondary)] leading-relaxed">
            {SECTION_COPY}
          </p>
        </div>

        {/*
         * BentoAccordionWrapper handles:
         *   - Desktop: BentoGrid → BentoNode cards
         *   - Mobile:  AccordionList → AccordionItem panels
         *   - Context lock: activeIndex preserved across breakpoint transition
         */}
        <BentoAccordionWrapper features={features} columns={3} />

      </div>
    </section>
  );
};

export default FeatureShowcase;
