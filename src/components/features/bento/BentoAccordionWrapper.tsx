'use client';

import React from 'react';
import { useBentoAccordionContextLock } from '@/hooks/useContextLock';
import { MOBILE_BREAKPOINT } from '@/lib/constants';
import BentoGrid from './BentoGrid';
import BentoNode from './BentoNode';
import AccordionList from './AccordionList';
import AccordionItem from './AccordionItem';
import Icon from '@/components/ui/Icon';

type IconName = React.ComponentProps<typeof Icon>['name'];

export interface FeatureItem {
  id: string;
  icon: IconName;
  title: string;
  copy: string;
}

interface BentoAccordionWrapperProps {
  features: FeatureItem[];
  /** Number of bento grid columns on desktop — default 3 */
  columns?: number;
}

/**
 * BentoAccordionWrapper — Feature 2
 *
 * Renders a BentoGrid on desktop and an AccordionList on mobile.
 * Uses useBentoAccordionContextLock to preserve the activeIndex across
 * the layout transition — satisfying the Context Lock Constraint.
 *
 * Competition compliance:
 *   ✅ No external UI libraries
 *   ✅ Native CSS transitions / WAAPI only
 *   ✅ State preserved across Bento→Accordion transition
 *   ✅ No global re-renders — state is local to this wrapper
 */
const BentoAccordionWrapper: React.FC<BentoAccordionWrapperProps> = ({
  features,
  columns = 3,
}) => {
  const {
    activeIndex,
    isMobile,
    handleDesktopHover,
    handleMobileToggle,
  } = useBentoAccordionContextLock(MOBILE_BREAKPOINT);

  if (isMobile) {
    /* ── Mobile: Accordion ── */
    return (
      <AccordionList>
        {features.map((feature, index) => (
          <AccordionItem
            key={feature.id}
            index={index}
            icon={feature.icon}
            title={feature.title}
            copy={feature.copy}
            isExpanded={activeIndex === index}
            onToggle={handleMobileToggle}
          />
        ))}
      </AccordionList>
    );
  }

  /* ── Desktop: Bento Grid ── */
  return (
    <BentoGrid columns={columns}>
      {features.map((feature, index) => (
        <BentoNode
          key={feature.id}
          index={index}
          icon={feature.icon}
          title={feature.title}
          copy={feature.copy}
          isActive={activeIndex === index}
          onActivate={handleDesktopHover}
          onDeactivate={() => handleDesktopHover(null)}
        />
      ))}
    </BentoGrid>
  );
};

export default BentoAccordionWrapper;
