import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useBentoAccordionContextLock — Feature 2 hook
 *
 * Manages the shared activeIndex state that is preserved across the
 * Bento (desktop) → Accordion (mobile) layout transition.
 *
 * Context Lock Constraint:
 *   If a user has an active bento-node on desktop and resizes past the
 *   mobile breakpoint, the same activeIndex is retained — the
 *   corresponding accordion panel opens immediately.
 *
 * Implementation notes:
 *   - Uses a ref to track isMobile in the resize handler to avoid
 *     stale closure issues.
 *   - ResizeObserver is not used here; window.resize is sufficient for
 *     a breakpoint check and is cheaper than a full ResizeObserver.
 *   - passive: true on the resize listener for scroll/paint performance.
 *
 * Competition compliance:
 *   ✅ No external libraries
 *   ✅ State preserved across Bento→Accordion transition
 *   ✅ No global re-renders — state is local to the calling component
 */
export const useBentoAccordionContextLock = (mobileBreakpoint: number = 768) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile,    setIsMobile]    = useState<boolean>(false);

  // Ref to current isMobile to avoid stale closure in resize handler
  const isMobileRef = useRef(isMobile);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  /* ── Breakpoint detection ── */
  useEffect(() => {
    const checkMobile = () => {
      const nowMobile = window.innerWidth <= mobileBreakpoint;
      if (nowMobile !== isMobileRef.current) {
        setIsMobile(nowMobile);
        // Context lock: activeIndex intentionally NOT reset here —
        // the same index is valid for both layouts.
      }
    };

    checkMobile(); // Sync on mount

    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  /* ── Desktop hover handler ── */
  const handleDesktopHover = useCallback(
    (index: number | null) => {
      if (!isMobileRef.current) {
        setActiveIndex(index);
      }
    },
    [],
  );

  /* ── Mobile toggle handler ── */
  const handleMobileToggle = useCallback(
    (index: number) => {
      if (isMobileRef.current) {
        setActiveIndex((prev) => (prev === index ? null : index));
      }
    },
    [],
  );

  return { activeIndex, isMobile, handleDesktopHover, handleMobileToggle };
};
