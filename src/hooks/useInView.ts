"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean `inView`.
 * Once the element enters the viewport it stays "in view" — no re-animation on scroll back.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // Capture options on mount — we intentionally run the observer once
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip for users who prefer reduced motion — treat as always visible
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px", ...optionsRef.current },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
