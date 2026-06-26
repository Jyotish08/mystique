import { useState, useEffect, useCallback } from 'react';

export const useBentoAccordionContextLock = (mobileBreakpoint: number = 768) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const currentlyMobile = window.innerWidth <= mobileBreakpoint;
      if (currentlyMobile !== isMobile) {
        setIsMobile(currentlyMobile);
      }
    };
    
    window.addEventListener('resize', checkMobile);
    checkMobile(); // Initial sync
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, mobileBreakpoint]);

  const handleDesktopHover = useCallback((index: number | null) => {
    if (!isMobile) {
      setActiveIndex(index);
    }
  }, [isMobile]);

  const handleMobileToggle = useCallback((index: number) => {
    if (isMobile) {
      setActiveIndex((prev) => (prev === index ? null : index));
    }
  }, [isMobile]);

  return { activeIndex, isMobile, handleDesktopHover, handleMobileToggle };
};
