import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollSpyResult {
  activeIndex: number;
  lineFill:    number; // 0–100
  setItemRef:  (index: number) => (el: HTMLDivElement | null) => void;
}

export function useScrollSpy(count: number): UseScrollSpyResult {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineFill,    setLineFill]    = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const scrollEl = document.querySelector('main') as HTMLElement | null;
    if (!scrollEl) return;

    const compute = () => {
      const refs = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      if (refs.length === 0) return;

      // Trigger line = 55% down the visible scroll container
      const containerRect = scrollEl.getBoundingClientRect();
      const triggerY = containerRect.top + scrollEl.clientHeight * 0.55;

      // Highest index whose TOP edge has crossed the trigger line
      let best = 0;
      for (let i = 0; i < refs.length; i++) {
        const rect = refs[i].getBoundingClientRect();
        if (rect.top <= triggerY) best = i;
      }
      setActiveIndex(best);

      // Line fill between best and best+1
      if (best < refs.length - 1) {
        const curRect  = refs[best].getBoundingClientRect();
        const nextRect = refs[best + 1].getBoundingClientRect();
        const travel   = nextRect.top - curRect.bottom;
        const covered  = triggerY - curRect.bottom;
        const fill     = travel > 0 ? Math.max(0, Math.min(1, covered / travel)) : 1;
        setLineFill(Math.round(fill * 100));
      } else {
        setLineFill(100);
      }
    };

    scrollEl.addEventListener('scroll', compute, { passive: true });

    // Re-run when accordion opens/closes (content height changes)
    const ro = new ResizeObserver(compute);
    ro.observe(scrollEl);

    // Initial run after layout settles
    const t = setTimeout(compute, 80);

    return () => {
      scrollEl.removeEventListener('scroll', compute);
      ro.disconnect();
      clearTimeout(t);
    };
  }, [count]);

  return { activeIndex, lineFill, setItemRef };
}