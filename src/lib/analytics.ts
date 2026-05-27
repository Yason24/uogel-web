/**
 * Analytics helper — Yandex Metrica + GA4
 *
 * Design rules:
 * ✓ SSR-safe   — all functions are no-ops when `window` is undefined
 * ✓ Fail-safe  — silently ignores errors (ad-blockers, script not loaded)
 * ✓ No PII     — never pass phone, name, city, comment to analytics
 * ✓ No logging — never console.error on failure
 *
 * Activation (set in .env.local, never commit):
 *   NEXT_PUBLIC_YM_ID   — Yandex Metrica counter ID  (number, e.g. 98765432)
 *   NEXT_PUBLIC_GA4_ID  — GA4 measurement ID          (string, e.g. G-XXXXXXXXXX)
 *
 * Without these variables the helpers are silent no-ops.
 *
 * See docs/ANALYTICS.md for the full event taxonomy and integration guide.
 */

// Extend Window for type-safe access to analytics globals
declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/** Yandex Metrica counter ID, or null when env var absent / invalid */
function getYmId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YM_ID;
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Send a named event to GA4 (gtag `event`).
 * No-op in SSR. No-op if gtag not loaded or blocked.
 */
export function trackEvent(name: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;
  try { window.gtag?.("event", name, params ?? {}); } catch { /* noop */ }
}

/**
 * Fire a conversion goal:
 * → Yandex Metrica: `ym(id, "reachGoal", goalName, params)`
 * → GA4: `gtag("event", goalName, params)`
 *
 * No-op in SSR. No-op if neither service is loaded / blocked.
 */
export function trackGoal(goalName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;
  const ymId = getYmId();
  try { if (ymId !== null) window.ym?.(ymId, "reachGoal", goalName, params); } catch { /* noop */ }
  try { window.gtag?.("event", goalName, params ?? {}); } catch { /* noop */ }
}

// ─── Event name constants ─────────────────────────────────────────────────────
// Use these instead of raw strings to prevent typos.

export const GOALS = {
  CTA_CONSULTATION:    "cta_consultation_click",
  CATALOG_OPEN:        "catalog_open",
  QUIZ_START:          "quiz_start",
  LEAD_SUBMIT_SUCCESS: "lead_submit_success",
} as const;

export const EVENTS = {
  CTA_CLICK:           "cta_click",
  CATALOG_OPEN:        "catalog_open",
  PRODUCT_OPEN:        "product_open",
  OPTION_OPEN:         "option_open",
  PROJECT_OPEN:        "project_open",
  QUIZ_START:          "quiz_start",
  QUIZ_STEP:           "quiz_step",
  LEAD_SUBMIT_ATTEMPT: "lead_submit_attempt",
  LEAD_SUBMIT_SUCCESS: "lead_submit_success",
  LEAD_SUBMIT_ERROR:   "lead_submit_error",
  PRODUCT_CALCULATE:   "product_calculate_click",
} as const;
