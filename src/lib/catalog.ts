import type { Product, Option, SizeRange, SystemType } from "@/types";

export function formatSizeRange(sr: SizeRange): string {
  if (!sr.customizable && sr.standardSizes && sr.standardSizes.length > 0) {
    const sizes = sr.standardSizes
      .map((s) => `${s.width / 1000}×${s.depth / 1000}`)
      .join(", ");
    return `${sizes} м`;
  }
  const minW = sr.minWidth / 1000;
  const maxW = sr.maxWidth / 1000;
  const minD = sr.minDepth / 1000;
  const maxD = sr.maxDepth / 1000;
  return `${minW}–${maxW} × ${minD}–${maxD} м`;
}

export function formatSystemType(systemType: SystemType): string {
  const labels: Record<SystemType, string> = {
    freestanding: "Отдельностоящая",
    "wall-mounted": "Пристенная",
    both: "Пристенная / отдельностоящая",
  };
  return labels[systemType];
}

export function getCompatibleOptions(product: Product, optionsList: Option[]): Option[] {
  return optionsList.filter(
    (o) => o.compatibility.all || o.compatibility.productIds.includes(product.id)
  );
}
