import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { Section } from "@/components/Section";
import { options } from "@/data/options";
import { products } from "@/data/pergolas";
import { formatOptionCategory, formatSystemType, formatDrive, formatSizeRange } from "@/lib/catalog";

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

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
            {formatOptionCategory(option.category)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl">
            {option.title}
          </h1>
          <p className="mt-3 text-xl text-stone-500">{option.subtitle}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">{option.description}</p>
          <div className="mt-6 inline-flex items-center rounded-full border border-stone-200 px-4 py-1.5 text-sm text-stone-600">
            Стоимость:{" "}
            <span className="ml-1.5 font-semibold text-stone-950">
              {option.priceType === "included"
                ? "в базовой системе"
                : option.priceType === "extra"
                ? "дополнительно"
                : "по запросу"}
            </span>
          </div>
        </div>
      </section>

      {/* Features + Variants */}
      <section className="bg-stone-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Features */}
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-stone-950">Особенности</h2>
              <ul className="mt-5 grid gap-3">
                {option.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-stone-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Variants */}
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-stone-950">
                {option.variants ? "Варианты исполнения" : "Применение"}
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
              ) : (
                <p className="mt-5 text-stone-600">
                  {option.compatibility.all
                    ? "Доступна для всех серий UOGEL."
                    : `Совместима с ${compatibleProducts.length} ${
                        compatibleProducts.length === 1 ? "серией" : "сериями"
                      } UOGEL.`}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Compatible products */}
      <Section
        eyebrow="Совместимость"
        title={option.compatibility.all ? "Совместима со всеми сериями" : "Совместимые серии"}
        description="Совместимость уточняется при расчёте конкретной конфигурации."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {compatibleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/pergolas/${product.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 hover:shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                {product.seriesName}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-stone-950 group-hover:text-stone-700">
                {product.title}
              </h3>
              <p className="mt-1 text-sm text-stone-500">{product.subtitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
                <span>{formatSystemType(product.systemType)}</span>
                <span aria-hidden>·</span>
                <span>{formatDrive(product.drive)}</span>
                <span aria-hidden>·</span>
                <span>{formatSizeRange(product.sizeRange)}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section title="Рассчитать с этой опцией" className="pt-0">
        <CTA />
      </Section>
    </>
  );
}
