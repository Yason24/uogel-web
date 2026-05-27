"use client";
import { useRef } from "react";

// ─── Formatting utils (also exported for validation) ─────────────────────────

/**
 * Format 0-10 significant digits into +7 (XXX) XXX-XX-XX display string.
 * Returns empty string for 0 digits.
 */
export function formatPhone(d: string): string {
  const s = d.slice(0, 10);
  if (s.length === 0) return "";
  if (s.length <= 3) return `+7 (${s}`;
  if (s.length <= 6) return `+7 (${s.slice(0, 3)}) ${s.slice(3)}`;
  if (s.length <= 8) return `+7 (${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`;
  return `+7 (${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6, 8)}-${s.slice(8)}`;
}

/**
 * Extract 0-10 significant digits from any phone string.
 * Handles: +7XXXXXXXXXX, 7XXXXXXXXXX, 8XXXXXXXXXX, 9XXXXXXXXX, partial strings.
 */
export function extractPhoneDigits(value: string): string {
  const raw = value.replace(/\D/g, "");
  if (raw.length === 0) return "";
  // 11-digit full number starting with 7 (country code)
  if (raw[0] === "7") return raw.slice(1, 11);
  // 11-digit full number starting with 8 (old-style Russian)
  if (raw[0] === "8" && raw.length >= 11) return raw.slice(1, 11);
  return raw.slice(0, 10);
}

// ─── Component ────────────────────────────────────────────────────────────────

type PhoneInputProps = {
  value: string;
  onChange: (formatted: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
};

export function PhoneInput({ value, onChange, disabled, hasError, className }: PhoneInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  function process(raw: string): string {
    return formatPhone(extractPhoneDigits(raw));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const prev = e.target.value;
    const formatted = process(prev);

    // Preserve cursor position: track how many significant chars moved
    const selStart = e.target.selectionStart ?? formatted.length;
    onChange(formatted);

    // Restore cursor after React re-renders the value
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const delta = formatted.length - prev.length;
      const newPos = Math.max(0, Math.min(selStart + delta, formatted.length));
      ref.current.setSelectionRange(newPos, newPos);
    });
  }

  /** Handle paste separately: clipboard may contain any format */
  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const raw = text.replace(/\D/g, "");

    let digits: string;
    if ((raw[0] === "7" || raw[0] === "8") && raw.length >= 11) {
      digits = raw.slice(1, 11);
    } else {
      digits = raw.slice(0, 10);
    }

    const formatted = formatPhone(digits);
    onChange(formatted);

    // Place cursor at end
    requestAnimationFrame(() => {
      ref.current?.setSelectionRange(formatted.length, formatted.length);
    });
  }

  const inputClass =
    className ??
    `w-full rounded-2xl border px-4 py-3 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 disabled:opacity-50 ${
      hasError ? "border-red-400" : "border-stone-200"
    }`;

  return (
    <input
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      disabled={disabled}
      placeholder="+7 (___) ___-__-__"
      className={inputClass}
    />
  );
}
