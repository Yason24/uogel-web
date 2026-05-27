"use client";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { trackEvent, trackGoal } from "@/lib/analytics";
import type { AnalyticsParams } from "@/lib/analytics";

type TrackableLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  /**
   * Fires both a Yandex Metrica reachGoal and a GA4 event.
   * Use for conversion-critical CTAs.
   */
  goalName?: string;
  /**
   * Fires a GA4 event only (non-goal tracking).
   * Can be combined with goalName to fire both.
   */
  eventName?: string;
  /** Non-PII params attached to the goal / event */
  eventParams?: AnalyticsParams;
};

/**
 * Drop-in replacement for Next.js `<Link>` with analytics tracking on click.
 * Accepts all Next.js Link props plus goalName / eventName / eventParams.
 * Tracking is fail-safe — never throws, never blocks navigation.
 */
export function TrackableLink({
  goalName,
  eventName,
  eventParams,
  onClick,
  children,
  ...linkProps
}: TrackableLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (goalName) trackGoal(goalName, eventParams);
    if (eventName) trackEvent(eventName, eventParams);
    onClick?.(e);
  }

  return (
    <Link {...linkProps} onClick={handleClick}>
      {children}
    </Link>
  );
}
