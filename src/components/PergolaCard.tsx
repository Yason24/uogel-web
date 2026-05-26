import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { options } from "@/data/options";
import { formatSizeRange, formatSystemType, formatDrive, getCompatibleOptions } from "@/lib/catalog";

export function PergolaCard({ product }: { product: Product }) {
  const detailHref = "/pergolas/" + product.slug;
  const calculateHref = "/calculate?pergola=" + product.slug;
  const compatOpts = getCompatibleOptions(product, options).slice(0, 3);

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-200/60">
      <Link href={detailHref} className="relative block aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
              {product.seriesName}
            </p>
            <h3 className="mt-1.5 text-lg font-medium text-stone-950">
              <Link href={detailHref}>{product.title}</Link>
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
            {formatSizeRange(product.sizeRange)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-stone-500">{product.subtitle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
          <span>{formatSystemType(product.systemType)}</span>
          <span aria-hidden>·</span>
          <span>{formatDrive(product.drive)}</span>
          <span aria-hidden>·</span>
          <span>стойка {product.specs.post}</span>
        </div>
        {compatOpts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {compatOpts.map((opt) => (
              <span key={opt.id} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                {opt.title}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5">
          <Link
            href={calculateHref}
            className="inline-flex rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-arch"
          >
            Рассчитать
          </Link>
        </div>
      </div>
    </article>
  );
}
