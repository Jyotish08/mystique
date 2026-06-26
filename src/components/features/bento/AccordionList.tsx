import React from 'react';

interface AccordionListProps {
  children: React.ReactNode;
}

/**
 * AccordionList
 *
 * Mobile wrapper for the accordion layout.
 * Uses role="list" so screen readers announce item count,
 * consistent with BentoGrid's accessibility contract.
 */
const AccordionList: React.FC<AccordionListProps> = ({ children }) => {
  return (
    <ul
      role="list"
      aria-label="Feature accordion"
      className={[
        'list-none',
        'flex flex-col',
        'divide-y divide-[var(--color-border)]',
        'border border-[var(--color-border)]',
        'rounded-[var(--radius-xl)]',
        'overflow-hidden',
        'bg-[var(--color-surface)]',
        'shadow-[var(--shadow-sm)]',
      ].join(' ')}
    >
      {children}
    </ul>
  );
};

export default AccordionList;
