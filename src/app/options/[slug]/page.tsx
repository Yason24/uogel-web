import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { options } from "@/data/options";
import { products } from "@/data/pergolas";
import { formatSystemType, formatDrive } from "@/lib/catalog";

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

  // Collect unique use-cases from compatible products
  const useCaseSet = new Set(compatibleProducts.flatMap((p) => p.useCases));
  const useCases = Array.from(useCaseSet).slice(0, 6);

  const categoryLabel = CATEGORY_LABELS[option.category] ?? option.category;

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-stone-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
            {categoryLabel}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
            {option.title}
          </h1>
          <p className="mt-4 text-xl text-stone-300">{option.subtitle}</p>
          <div className="mt-6 inline-flex items-center rounded-full border border-stone-700 px-4 py-1.5 text-sm text-stone-400">
            Стоимость:{" "}
            <span className="ml-1.5 font-semibold text-white">
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
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/options"
              className="rounded-full border border-stone-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-stone-400"
            >
              Все опции
            </Link>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              Описание
            </p>
            <h2 className="text-2xl font-semibold text-stone-950 sm:text-3xl">
              Что делает эта опция
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">{option.description}</p>
          </div>
        </div>
      </section>

      {/* ── Features + Variants ── */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Features */}
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-stone-950">Возможности</h2>
              <ul className="mt-5 space-y-3">
                {option.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-stone-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Variants or Where used */}
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-stone-950">
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
                    <li key={uc} className="flex items-start gap-3 text-stone-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" aria-hidden />
                      {uc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-stone-600">
                  {option.compatibility.all
                    ? "Совместима со всеми сериями UOGEL."
                    : `Совместима с ${compatibleProducts.length} сериями UOGEL.`}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Compatible series ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              Совместимость
            </p>
            <h2 className="text-2xl font-semibold text-stone-950 sm:text-3xl">
              {option.compatibility.all
                ? "Совместима со всеми сериями"
                : "Совместимые серии"}
            </h2>
            <p className="mt-3 text-stone-600">
              Совместимость уточняется при расчёте конкретной конфигурации.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compatibleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/pergolas/${product.slug}`}
                className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  {product.seriesName}
                </p>
                <h3 className="mt-2 text-base font-semibold text-stone-950 group-hover:text-stone-700">
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
      <section className="bg-stone-950 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Рассчитать с этой опцией
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              Укажите серию, размеры и конфигурацию — подготовим расчёт с учётом
              выбранных опций.
            </p>
            <div className="mt-8">
              <Link
                href="/calculate"
                className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
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
