import type { SizeRange } from "@/types";

interface Props {
  sizeRange: SizeRange;
}

export function SizeConfigurations({ sizeRange }: Props) {
  if (!sizeRange.customizable && sizeRange.standardSizes && sizeRange.standardSizes.length > 0) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
          Стандартные конфигурации
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {sizeRange.standardSizes.map((size) => (
            <span
              key={`${size.width}x${size.depth}`}
              className="rounded-2xl border border-stone-200 px-5 py-3 text-base font-semibold text-stone-950"
            >
              {size.width / 1000} × {size.depth / 1000} м
            </span>
          ))}
        </div>
        <p className="mt-5 text-sm text-stone-500">
          Серия выпускается в фиксированных стандартных размерах.
        </p>
      </div>
    );
  }

  const minW = sizeRange.minWidth / 1000;
  const maxW = sizeRange.maxWidth / 1000;
  const minD = sizeRange.minDepth / 1000;
  const maxD = sizeRange.maxDepth / 1000;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
        Индивидуальная конфигурация
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-stone-400">Ширина</p>
          <p className="mt-1 text-2xl font-semibold text-stone-950">
            {minW}–{maxW} м
          </p>
        </div>
        <div>
          <p className="text-xs text-stone-400">Глубина</p>
          <p className="mt-1 text-2xl font-semibold text-stone-950">
            {minD}–{maxD} м
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm text-stone-500">
        Размер подбирается под проект из реальной сетки конфигураций UOGEL.
        Ширина и глубина уточняются при расчёте.
      </p>
    </div>
  );
}
