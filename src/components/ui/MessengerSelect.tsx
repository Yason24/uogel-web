"use client";

// Order: Max / WhatsApp / Telegram (per product spec)
const MESSENGERS = [
  { id: "Max", label: "Max" },
  { id: "WhatsApp", label: "WhatsApp" },
  { id: "Telegram", label: "Telegram" },
] as const;

type MessengerSelectProps = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

export function MessengerSelect({ value, onChange, disabled }: MessengerSelectProps) {
  return (
    <div className="flex gap-2">
      {MESSENGERS.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            type="button"
            disabled={disabled}
            aria-pressed={active}
            onClick={() => onChange(active ? "" : m.id)}
            className={`flex-1 rounded-2xl border py-2.5 text-sm font-medium transition disabled:opacity-50 ${
              active
                ? "border-stone-950 bg-stone-950 text-white"
                : "border-stone-200 text-stone-700 hover:border-stone-400"
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
