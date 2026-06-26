'use client';

import React from 'react';
import { useBentoAccordionContextLock } from '@/hooks/useContextLock';
import Icon from '@/components/ui/Icon';

// TODO: Replace with actual feature mapping when provided
const features = [
  { id: 'f1', icon: 'chart-pie' as const, title: 'TODO_FEATURE_1', copy: 'TODO_COPY_1' },
  { id: 'f2', icon: 'arrow-trending-up' as const, title: 'TODO_FEATURE_2', copy: 'TODO_COPY_2' },
  { id: 'f3', icon: 'cog-6-tooth' as const, title: 'TODO_FEATURE_3', copy: 'TODO_COPY_3' },
  { id: 'f4', icon: 'link' as const, title: 'TODO_FEATURE_4', copy: 'TODO_COPY_4' },
];

const FeatureShowcase: React.FC = () => {
  const { activeIndex, isMobile, handleDesktopHover, handleMobileToggle } = 
    useBentoAccordionContextLock(768);

  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-6 py-24">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-12">
          TODO_FEATURES_HEADING
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`border border-black/10 rounded-xl p-6 bg-white cursor-pointer 
                transition-all duration-[350ms] ease-in-out
                ${activeIndex === index ? 'md:col-span-2 shadow-lg' : 'hover:shadow-md'}`}
              onMouseEnter={() => !isMobile && handleDesktopHover(index)}
              onMouseLeave={() => !isMobile && handleDesktopHover(null)}
              onClick={() => isMobile && handleMobileToggle(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-forsythia)] rounded-full">
                  <Icon name={feature.icon} className="w-5 h-5" />
                </div>
                {isMobile && (
                  <Icon 
                    name={activeIndex === index ? 'chevron-up' : 'chevron-down'} 
                    className="w-5 h-5 transition-transform duration-[175ms] ease-out"
                  />
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              
              {/* Fluid height transition for mobile accordion */}
              <div 
                className={`grid transition-all duration-[350ms] ease-in-out
                  ${isMobile 
                    ? activeIndex === index 
                      ? 'grid-rows-[1fr] opacity-100' 
                      : 'grid-rows-[0fr] opacity-0'
                    : 'grid-rows-[1fr] opacity-100'
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600">{feature.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
