import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  /** Total number of grid columns — feature cards fill these */
  columns?: number;
}

/**
 * BentoGrid
 *
 * Desktop wrapper that lays out BentoNode children in a CSS grid.
 * Layout expansion of the active node is handled by the node itself
 * via a CSS class that adjusts grid-column span, which avoids
 * animating grid-template-columns (no layout thrashing).
 *
 * Accessibility: role="list" so screen readers announce item count.
 */
const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  columns = 3,
}) => {
  return (
    <ul
      role="list"
      aria-label="Feature grid"
      className="list-none"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: '1rem',
      }}
    >
      {children}
    </ul>
  );
};

export default BentoGrid;
