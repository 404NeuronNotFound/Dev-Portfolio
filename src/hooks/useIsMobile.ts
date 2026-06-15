import { useEffect, useState } from 'react';

const QUERY = '(max-width: 768px)';

/** True when the viewport is at or below the mobile breakpoint (768px). */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}