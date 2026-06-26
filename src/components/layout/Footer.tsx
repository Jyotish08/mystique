import React from 'react';

// TODO: Replace [TODO] values with actual brand/copy once provided
const BRAND_NAME  = '[TODO_BRAND]';
const FOOTER_COPY = '[TODO: Footer copyright line, e.g. © 2025 BrandName. All rights reserved.]';

const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      className={[
        'border-t border-[var(--color-border)]',
        'bg-[var(--color-oceanic-noir)]',
      ].join(' ')}
      aria-label="Site footer"
    >
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* ── Brand mark ── */}
          <span
            className="font-mono font-bold text-sm text-[var(--color-mystic-mint)]"
            aria-label={BRAND_NAME}
          >
            {BRAND_NAME}
          </span>

          {/* ── Copyright copy ── */}
          <p className="text-sm text-[var(--color-text-muted)] text-center sm:text-right">
            {FOOTER_COPY}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
