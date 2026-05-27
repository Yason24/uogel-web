"use client";
import { useInView } from "@/hooks/useInView";

interface FadeUpProps {
  children: React.ReactNode;
  /** Delay in milliseconds before the transition starts */
  delay?: number;
  /** Transition duration in milliseconds (default 540) */
  duration?: number;
  /** Classes applied to the wrapper div */
  className?: string;
}

/**
 * Wraps children in a div that fades up into view when scrolled into the viewport.
 * Respects prefers-reduced-motion — immediately visible if motion is disabled.
 *
 * Usage in server components:
 *   import { FadeUp } from "@/components/motion/FadeUp";
 *   <FadeUp delay={100}>...</FadeUp>
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 540,
  className = "",
}: FadeUpProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(18px)",
        transition: [
          `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ].join(", "),
      }}
    >
      {children}
    </div>
  );
}
