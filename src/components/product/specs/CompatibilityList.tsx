import Link from "next/link";
import type { Option, Product } from "@/types";
import { formatOptionCategory } from "@/lib/catalog";

interface Props {
  product: Product;
  allOptions: Option[];
}

export function CompatibilityList({ product, allOptions }: Props) {
  const compatible = allOptions.filter(
    (o) => o.compatibility.all || o.compatibility.productIds.includes(product.id)
  );

  if (compatible.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {compatible.map((option) => (
        <Link
          key={option.id}
          href={`/options/${option.slug}`}
          className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            {formatOptionCategory(option.category)}
          </p>
          <h3 className="mt-2 text-base font-semibold text-stone-950 group-hover:text-stone-700">
            {option.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{option.subtitle}</p>
        </Link>
      ))}
    </div>
  );
}
