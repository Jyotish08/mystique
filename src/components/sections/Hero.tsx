'use client';

import React, { useEffect, useRef } from 'react';

/*
 * TODO: Replace all [TODO] placeholders with actual provided copy
 * once it is available.
 */

// Badge text above the heading
const HERO_BADGE        = '[TODO: Badge / Pill Text]';
// Main H1
const HERO_HEADING      = '[TODO: Hero Heading]';
// Subheading paragraph
const HERO_SUBHEADING   = '[TODO: Hero Sub-heading / Copy]';
// Primary CTA
const HERO_CTA_PRIMARY  = '[TODO: Primary CTA Text]';
// Secondary CTA
const HERO_CTA_SECONDARY = '[TODO: Secondary CTA Text]';

/**
 * Hero Section
 *
 * Entry animation sequence (total < 500ms, all hardware-accelerated):
 *   0ms   — section visible
 *   50ms  — badge fades up
 *   130ms — h1 fades up
 *   210ms — subheading fades up
 *   290ms — CTA row fades up
 *
 * All delays applied via inline style animation-delay to avoid
 * generating Tailwind JIT purge-unsafe arbitrary values.
 *
 * Content is FULLY visible in CSS before JS runs — graceful degradation.
 */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * Apply will-change only after mount to avoid promoting the layer
   * during initial paint (would waste GPU memory).
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('.hero-animate');
    items.forEach((el) => {
      el.style.willChange = 'transform, opacity';
    });

    // Clean up will-change after animations complete
    const timer = setTimeout(() => {
      items.forEach((el) => { el.style.willChange = 'auto'; });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={[
        'relative w-full overflow-hidden',
        /* Top padding accounts for fixed header (~64px) */
        'pt-32 pb-24 md:pt-40 md:pb-32',
        'bg-[var(--color-oceanic-noir)]',
      ].join(' ')}
    >
      {/*
       * Subtle radial gradient accent — CSS only, no images.
       * aria-hidden so it doesn't pollute the accessibility tree.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '60vw',
            maxWidth: '900px',
            maxHeight: '700px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(255,200,1,0.08) 0%, rgba(17,76,90,0.04) 50%, transparent 70%)',
          }}
        />
      </div>

      <div ref={containerRef} className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

          {/* ── Badge ── */}
          <div
            className="hero-animate badge badge-accent animate-fade-up"
            style={{ animationDelay: '50ms' }}
          >
            {HERO_BADGE}
          </div>

          {/* ── H1 ── */}
          <h1
            id="hero-heading"
            className={[
              'hero-animate animate-fade-up',
              'font-mono font-bold',
              'text-[var(--color-arctic-powder)]',
            ].join(' ')}
            style={{ animationDelay: '130ms' }}
          >
            {HERO_HEADING}
          </h1>

          {/* ── Subheading ── */}
          <p
            className={[
              'hero-animate animate-fade-up',
              'font-sans text-base md:text-lg leading-relaxed',
              'text-[var(--color-mystic-mint)]',
              'max-w-xl',
            ].join(' ')}
            style={{ animationDelay: '210ms' }}
          >
            {HERO_SUBHEADING}
          </p>

          {/* ── CTA Row ── */}
          <div
            className={[
              'hero-animate animate-fade-up',
              'flex flex-col sm:flex-row items-center gap-3 mt-2',
            ].join(' ')}
            style={{ animationDelay: '290ms' }}
          >
            <a
              href="#pricing"
              className="btn btn-accent"
            >
              {HERO_CTA_PRIMARY}
            </a>
            <a
              href="#features"
              className="btn btn-outline"
              style={{
                color: 'var(--color-arctic-powder)',
                borderColor: 'rgba(241,246,244,0.25)',
              }}
            >
              {HERO_CTA_SECONDARY}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
