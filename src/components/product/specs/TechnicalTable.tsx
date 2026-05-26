export type SpecRow = {
  label: string;
  value?: string | null;
};

interface Props {
  rows: SpecRow[];
}

export function TechnicalTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
      <div className="min-w-[280px] divide-y divide-stone-100">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-baseline justify-between gap-6 px-5 py-3.5 text-sm transition-colors duration-150 hover:bg-stone-50"
          >
            <span className="shrink-0 text-stone-500">{row.label}</span>
            <span
              className={`text-right font-medium ${
                row.value ? "text-stone-800" : "text-stone-400"
              }`}
            >
              {row.value ?? "Данные уточняются"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
