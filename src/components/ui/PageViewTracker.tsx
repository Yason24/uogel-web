"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsParams } from "@/lib/analytics";

type Props = {
  /** Event name (from EVENTS constant in analytics.ts) */
  event: string;
  /** Non-PII event parameters */
  params?: AnalyticsParams;
};

/**
 * Fires a single analytics event on component mount (client-side only).
 * Place inside Server Component page returns to track page views with
 * entity-specific params (slug, category, etc.) without making the whole
 * page a client component.
 *
 * Renders nothing — purely a side-effect component.
 */
export function PageViewTracker({ event, params }: Props) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
