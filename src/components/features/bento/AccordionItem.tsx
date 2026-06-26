import React from 'react';
import Icon from '@/components/ui/Icon';

type IconName = React.ComponentProps<typeof Icon>['name'];

interface AccordionItemProps {
  /** Feature index — matched against activeIndex for context-lock */
  index: number;
  /** Icon from the supplied SVG pack */
  icon: IconName;
  /** Feature title — used as the button label */
  title: string;
  /** Feature description shown when expanded */
  copy: string;
  /** Whether this item is currently expanded */
  isExpanded: boolean;
  /** Called when the user toggles this item */
  onToggle: (index: number) => void;
}

/**
 * AccordionItem
 *
 * Mobile accordion panel.
 *
 * Expand / collapse animation:
 *   Uses CSS grid-rows [0fr → 1fr] trick.
 *   This only changes grid-template-rows, which does NOT trigger
 *   a full layout recalculation — the browser uses the already-known
 *   intrinsic size of the child. It is composite-friendly and avoids
 *   the cost of animating height or max-height.
 *
 * Accessibility:
 *   - button with aria-expanded
 *   - aria-controls pointing to the panel id
 *   - panel with role="region" and aria-labelledby
 */
const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  icon,
  title,
  copy,
  isExpanded,
  onToggle,
}) => {
  const panelId  = `accordion-panel-${index}`;
  const buttonId = `accordion-btn-${index}`;

  return (
    <li role="listitem">
      {/* ── Trigger ── */}
      <button
        id={buttonId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
        className={[
          'w-full flex items-center justify-between gap-4',
          'px-5 py-4 text-left',
          'transition-colors duration-[175ms] ease-out-premium',
          isExpanded
            ? 'bg-[var(--color-mystic-mint)]'
            : 'bg-[var(--color-surface)] hover:bg-[var(--color-arctic-powder)]',
        ].join(' ')}
      >
        {/* Left: icon + title */}
        <div className="flex items-center gap-3">
          <div className="icon-wrap flex-shrink-0">
            <Icon name={icon} className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="font-mono font-semibold text-sm text-[var(--color-text-primary)]">
            {title}
          </span>
        </div>

        {/* Right: animated chevron */}
        <span
          className={[
            'flex-shrink-0',
            'text-[var(--color-text-secondary)]',
            'transition-transform duration-[175ms] ease-out-premium',
            isExpanded ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon name="chevron-down" className="w-4 h-4" />
        </span>
      </button>

      {/* ── Expandable panel ── */}
      {/*
        grid-rows trick:
        - [0fr] collapses the inner div to 0 height (overflow hidden)
        - [1fr] expands to the div's natural height
        Transitioning grid-template-rows does NOT trigger full layout
        recalculation in modern browsers when used this way.
      */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          'grid overflow-hidden',
          'transition-[grid-template-rows] duration-[350ms] ease-in-out-premium',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <p className={[
            'px-5 pb-5 pt-2',
            'font-sans text-sm leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'transition-opacity duration-[350ms] ease-out-premium',
            isExpanded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}>
            {copy}
          </p>
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
