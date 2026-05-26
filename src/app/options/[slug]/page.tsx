import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { options } from "@/data/options";
import { products } from "@/data/pergolas";
import { formatSystemType, formatDrive } from "@/lib/catalog";
import { TechnicalDiagramCard } from "@/components/product/TechnicalDiagramCard";

const CATEGORY_LABELS: Record<string, string> = {
  screens: "Защита от солнца и ветра",
  shutters: "Ставни и боковые ограждения",
  glass: "Остекление",
  climate: "Климат",
  automation: "Автоматизация и датчики",
  lighting: "Освещение",
};

export function generateStaticParams() {
  return options.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const option = options.find((o) => o.slug === slug);
  if (!option) return { title: "Опция не найдена" };

  return {
    title: option.seo.title,
    description: option.seo.description,
    alternates: { canonical: `/options/${option.slug}` },
    openGraph: {
      title: `${option.seo.title} | UOGEL Russia`,
      description: option.seo.description,
      url: `/options/${option.slug}`,
    },
  };
}

export default async function OptionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const option = options.find((o) => o.slug === slug);
  if (!option) notFound();

  const compatibleProducts = option.compatibility.all
    ? products
    : products.filter((p) => option.compatibility.productIds.includes(p.id));

  const useCaseSet = new Set(compatibleProducts.flatMap((p) => p.useCases));
  const useCases = Array.from(useCaseSet).slice(0, 6);

  const categoryLabel = CATEGORY_LABELS[option.category] ?? option.category;

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-stone-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            {categoryLabel}
          </p>
          <h1 className="max-w-3xl text-4xl font-light text-white sm:text-5xl">
            {option.title}
          </h1>
          <p className="mt-4 text-lg text-stone-400">{option.subtitle}</p>
          <div className="mt-6 inline-flex items-center rounded-full border border-stone-800 px-4 py-1.5 text-sm text-stone-400">
            Стоимость:{" "}
            <span className="ml-1.5 font-medium text-stone-200">
              {option.priceType === "included"
                ? "в базовой системе"
                : option.priceType === "extra"
                ? "дополнительно"
                : "по запросу"}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/options"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Смотреть опции
            </Link>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-stone-500">
            Совместимость опции зависит от серии и конфигурации. Перед заказом проверяем применимость по проекту.
          </p>
        </div>
      </section>

      {/* ── Image gallery ── */}
      {option.images.length > 0 && (
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {option.images.length === 1 ? (
              <div className="relative aspect-[16/7] overflow-hidden rounded-3xl bg-stone-100">
                <Image
                  src={option.images[0]}
                  alt={option.title}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {option.images.map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100">
                    <Image
                      src={src}
                      alt={`${option.title} — фото ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Description ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Описание
            </p>
            <h2 className="text-2xl font-medium text-stone-950 sm:text-3xl">О системе</h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">{option.description}</p>
          </div>
        </div>
      </section>

      {/* ── Features + Variants ── */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-medium text-stone-950">Возможности</h2>
              <ul className="mt-5 space-y-3">
                {option.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-stone-500">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-medium text-stone-950">
                {option.variants ? "Варианты исполнения" : "Где используется"}
              </h2>
              {option.variants ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {option.variants.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              ) : useCases.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {useCases.map((uc) => (
                    <li key={uc} className="flex items-start gap-3 text-stone-500">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" aria-hidden />
                      {uc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-stone-500">
                  {option.compatibility.all
                    ? "Совместима со всеми сериями UOGEL."
                    : `Совместима с ${compatibleProducts.length} сериями UOGEL.`}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Техническая схема ── */}
      {option.diagrams && option.diagrams.length > 0 && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Документация
              </p>
              <h2 className="text-2xl font-medium text-stone-950 sm:text-3xl">
                Техническая схема
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-500">
                Конфигурации и параметры из официального каталога UOGEL 2026.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {option.diagrams.map((diagram) => (
                <TechnicalDiagramCard
                  key={diagram.src}
                  src={diagram.src}
                  caption={diagram.caption}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Compatible series ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Совместимость
            </p>
            <h2 className="text-2xl font-medium text-stone-950 sm:text-3xl">
              {option.compatibility.all ? "Совместима со всеми сериями" : "Совместимые серии"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-500">
              Совместимость уточняется при расчёте конкретной конфигурации.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compatibleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/pergolas/${product.slug}`}
                className="group rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:border-stone-300 hover:shadow-md hover:shadow-stone-100/80"
              >
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                  {product.seriesName}
                </p>
                <h3 className="mt-2 text-base font-medium text-stone-950 transition-colors duration-200 group-hover:text-arch">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500">{product.subtitle}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
                  <span>{formatSystemType(product.systemType)}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDrive(product.drive)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light text-white sm:text-4xl">
              Рассчитать с этой опцией
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-400">
              Укажите серию, размеры и конфигурацию — подготовим расчёт с учётом
              выбранных опций.
            </p>
            <div className="mt-8">
              <Link
                href="/calculate"
                className="inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
              >
                Получить консультацию
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
