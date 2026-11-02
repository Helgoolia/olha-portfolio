import { useEffect, useRef, useState, RefObject } from "react";

/**
 * True once the element has entered the viewport (used for fade-in).
 *
 * Safety nets so content never stays invisible:
 * - checks the element's position right after mount (already on screen →
 *   visible at once, even if the observer misses the first frame);
 * - falls back to visible after a short delay if no observer fired
 *   (old browsers, background tabs, restored scroll positions);
 * - also re-checks on scroll in case the observer never fires.
 */
export function useInView(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setInView(true);

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    obs.observe(el);

    const raf = requestAnimationFrame(() => {
      if (onScreen()) {
        show();
        obs.disconnect();
      }
    });
    const timer = window.setTimeout(() => {
      if (onScreen()) show();
    }, 1200);
    const onScroll = () => {
      if (onScreen()) {
        show();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [threshold]);

  return [ref, inView];
}
