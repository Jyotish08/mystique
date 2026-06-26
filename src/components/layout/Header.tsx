'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// TODO: Replace [TODO_BRAND] with the actual brand name once provided
const BRAND_NAME = '[TODO_BRAND]';

// TODO: Replace nav link labels and hrefs with actual values once provided
const NAV_LINKS = [
  { label: '[TODO: Nav Link 1]', href: '#features' },
  { label: '[TODO: Nav Link 2]', href: '#pricing' },
  { label: '[TODO: Nav Link 3]', href: '#social-proof' },
];

// TODO: Replace CTA text once provided
const CTA_TEXT = '[TODO: CTA Text]';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* ── Scroll-aware border + backdrop ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      role="banner"
      className={[
        'fixed top-0 inset-x-0 z-50',
        'animate-fade-down',
        /* Transition border + backdrop on scroll */
        'transition-all duration-structural ease-in-out-premium',
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-[var(--shadow-xs)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
      aria-label="Site header"
    >
      <div className="section-container">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* ── Brand ── */}
          <Link
            href="/"
            className={[
              'font-mono font-bold text-lg tracking-tight',
              'text-[var(--color-text-primary)]',
              'transition-opacity duration-micro ease-out-premium',
              'hover:opacity-70',
            ].join(' ')}
            aria-label={`${BRAND_NAME} — home`}
          >
            {BRAND_NAME}
          </Link>

          {/* ── Nav links (desktop) ── */}
          <ul
            className="hidden md:flex items-center gap-8 list-none"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[
                    'font-sans text-sm font-medium',
                    'text-[var(--color-text-secondary)]',
                    'relative inline-block',
                    'transition-colors duration-micro ease-out-premium',
                    'hover:text-[var(--color-text-primary)]',
                    /* Underline slide on hover via pseudo */
                    'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px',
                    'after:bg-[var(--color-accent)]',
                    'after:scale-x-0 after:origin-left',
                    'after:transition-transform after:duration-micro after:ease-out-premium',
                    'hover:after:scale-x-100',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA Button ── */}
          <a
            href="#pricing"
            className="btn btn-primary hidden md:inline-flex"
          >
            {CTA_TEXT}
          </a>

          {/* ── Mobile menu placeholder ── */}
          {/* TODO: Implement mobile drawer when nav content is provided */}
          <button
            className={[
              'md:hidden p-2 rounded-md',
              'text-[var(--color-text-secondary)]',
              'transition-colors duration-micro ease-out-premium',
              'hover:text-[var(--color-text-primary)]',
              'hover:bg-[var(--color-mystic-mint)]',
            ].join(' ')}
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            {/* Hamburger icon — inline SVG to avoid adding new assets */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <rect x="2" y="5"  width="16" height="1.5" rx="0.75" fill="currentColor" />
              <rect x="2" y="9"  width="16" height="1.5" rx="0.75" fill="currentColor" />
              <rect x="2" y="13" width="16" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
