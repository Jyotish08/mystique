'use client';

import React, { useEffect, useRef } from 'react';

/*
 * TODO: Replace all [TODO] placeholder values with the actual provided
 * social proof copy, stats, and metrics once available.
 */
const SECTION_HEADING = '[TODO: Social Proof Section Heading]';
const SECTION_COPY    = '[TODO: Social Proof Section Sub-heading]';

interface StatItem {
  id: string;
  /** Raw numeric value used for the WAAPI counter animation */
  value: number;
  /** Suffix appended after the animated number */
  suffix: string;
  /** Label below the number */
  label: string;
}

// TODO: Replace with actual provided metrics
const STATS: StatItem[] = [
  { id: 's1', value: 0, suffix: '+', label: '[TODO: Stat 1 Label]' },
  { id: 's2', value: 0, suffix: '%', label: '[TODO: Stat 2 Label]' },
  { id: 's3', value: 0, suffix: 'ms', label: '[TODO: Stat 3 Label]' },
  { id: 's4', value: 0, suffix: '%', label: '[TODO: Stat 4 Label]' },
];

/**
 * Animate a number from 0 to `target` using WAAPI.
 * Short duration (~600ms) to stay responsive.
 * Cleans up automatically — no setInterval leak.
 */
function animateCounter(
  el: HTMLElement,
  target: number,
  suffix: string,
): void {
  if (!el.animate || target === 0) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const start     = performance.now();
  const duration  = 600;

  const update = (now: number) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out quad
    const eased    = 1 - (1 - progress) ** 2;
    const current  = Math.round(eased * target);
    el.textContent = `${current.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}

/**
 * SocialProof
 *
 * Stats grid with WAAPI counter animation triggered by IntersectionObserver.
 * Content remains fully visible without JS — .sr-hidden is only applied
 * after JS initialises the observer.
 */
const SocialProof: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Header scroll-reveal ── */
    const header = headerRef.current;
    if (header) {
      if (!prefersReduced) header.classList.add('sr-hidden');

      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('sr-hidden');
              entry.target.classList.add('sr-visible');
              headerObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );
      headerObserver.observe(header);
    }

    /* ── Stats counter animation ── */
    const statsContainer = statsRef.current;
    if (!statsContainer) return;

    const counterEls = statsContainer.querySelectorAll<HTMLElement>('[data-counter]');

    // Apply scroll-reveal hidden state to individual stat cards
    const cards = statsContainer.querySelectorAll<HTMLElement>('[data-stat-card]');
    if (!prefersReduced) {
      cards.forEach((card) => card.classList.add('sr-hidden'));
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal all cards with stagger
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove('sr-hidden');
                card.classList.add('sr-visible');
              }, i * 60);
            });

            // Fire counter animations
            if (!prefersReduced) {
              counterEls.forEach((el) => {
                const target = Number(el.dataset.target ?? 0);
                const suffix = el.dataset.suffix ?? '';
                animateCounter(el, target, suffix);
              });
            }

            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );

    statsObserver.observe(statsContainer);

    return () => {
      statsObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      aria-labelledby="social-proof-heading"
      className={[
        'py-24 md:py-32',
        'bg-[var(--color-oceanic-noir)]',
      ].join(' ')}
    >
      <div className="section-container">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <h2
            id="social-proof-heading"
            className="font-mono font-bold text-[var(--color-arctic-powder)] mb-4"
          >
            {SECTION_HEADING}
          </h2>
          <p className="font-sans text-base text-[var(--color-mystic-mint)] leading-relaxed">
            {SECTION_COPY}
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div
          ref={statsRef}
          role="list"
          aria-label="Platform statistics"
          className={[
            'grid grid-cols-2 md:grid-cols-4 gap-6',
          ].join(' ')}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              role="listitem"
              data-stat-card
              className={[
                'flex flex-col items-center text-center',
                'p-6 rounded-[var(--radius-xl)]',
                'bg-[var(--color-nocturnal-expedition)]',
                'border border-[rgba(217,232,226,0.08)]',
                'transition-[transform,box-shadow] duration-[175ms] ease-out-premium',
                'hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]',
              ].join(' ')}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Counter number */}
              <span
                data-counter
                data-target={stat.value}
                data-suffix={stat.suffix}
                className="font-mono font-bold text-3xl text-[var(--color-forsythia)] tabular-nums"
                aria-label={`${stat.value}${stat.suffix}`}
              >
                {/* Initial render — replaced by counter on scroll */}
                {stat.value}{stat.suffix}
              </span>

              {/* Label */}
              <span className="mt-2 font-sans text-sm text-[var(--color-mystic-mint)] leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
