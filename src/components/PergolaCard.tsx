import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { options } from "@/data/options";
import { formatSizeRange, formatSystemType, getCompatibleOptions } from "@/lib/catalog";

export function PergolaCard({ product }: { product: Product }) {
  const detailHref = "/pergolas/" + product.slug;
  const calculateHref = "/calculate?pergola=" + product.slug;
  const compatOpts = getCompatibleOptions(product, options).slice(0, 4);

  return (
    <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200">
      <Link href={detailHref} className="relative block aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-stone-500">{formatSystemType(product.systemType)}</span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            {formatSizeRange(product.sizeRange)}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-stone-950">
          <Link href={detailHref}>{product.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-stone-600">{product.subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {compatOpts.map((option) => (
            <span key={option.id} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700">
              {option.title}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-stone-950">Цена по запросу</span>
          <Link
            href={calculateHref}
            className="rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Рассчитать стоимость
          </Link>
        </div>
      </div>
    </article>
  );
}
