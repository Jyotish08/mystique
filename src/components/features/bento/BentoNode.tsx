import React from 'react';
import Icon from '@/components/ui/Icon';

type IconName = React.ComponentProps<typeof Icon>['name'];

interface BentoNodeProps {
  /** Feature index — used for context-lock state matching */
  index: number;
  /** Icon name from the supplied asset pack */
  icon: IconName;
  /** Feature title */
  title: string;
  /** Feature description */
  copy: string;
  /** Whether this node is currently the active/expanded one */
  isActive: boolean;
  /** Called when the node receives hover focus (desktop) */
  onActivate: (index: number) => void;
  /** Called when the node loses hover focus (desktop) */
  onDeactivate: () => void;
}

/**
 * BentoNode
 *
 * An individual card inside the BentoGrid.
 *
 * Active state:
 *   When isActive, the card spans 2 grid columns via CSS grid-column.
 *   This is a discrete layout change on state toggle — NOT a CSS
 *   transition on grid-template-columns, so there is no layout thrashing.
 *   Composite-safe transitions (opacity, transform) animate the
 *   content within the card.
 *
 * Hover elevation:
 *   translateY(-2px) + shadow deepens — transform/opacity only.
 */
const BentoNode: React.FC<BentoNodeProps> = ({
  index,
  icon,
  title,
  copy,
  isActive,
  onActivate,
  onDeactivate,
}) => {
  return (
    <li
      role="listitem"
      style={{
        gridColumn: isActive ? 'span 2' : 'span 1',
      }}
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={() => onDeactivate()}
      onFocus={() => onActivate(index)}
      onBlur={() => onDeactivate()}
      tabIndex={0}
      aria-label={title}
      className={[
        /* Base card styles */
        'card cursor-pointer select-none',
        'flex flex-col gap-4',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        /* Active state — border brightens */
        isActive
          ? 'border-[var(--color-border-hover)] shadow-[var(--shadow-lg)] -translate-y-0.5'
          : '',
      ].join(' ')}
    >
      {/* Icon */}
      <div className="icon-wrap">
        <Icon name={icon} className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold font-mono leading-snug">
        {title}
      </h3>

      {/* Copy — fades in fully when active, slightly muted when inactive */}
      <p
        className={[
          'text-sm leading-relaxed font-sans',
          'transition-opacity duration-[175ms] ease-out-premium',
          isActive
            ? 'text-[var(--color-text-primary)] opacity-100'
            : 'text-[var(--color-text-muted)] opacity-80',
        ].join(' ')}
      >
        {copy}
      </p>
    </li>
  );
};

export default BentoNode;
