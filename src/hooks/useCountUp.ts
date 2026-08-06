import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 up to `end` once the element scrolls into view.
 * Returns a ref to attach and the current display value.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  end: number,
  duration = 1800
) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(easeOut(p) * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, value };
}
