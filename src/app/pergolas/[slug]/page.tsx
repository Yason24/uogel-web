import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/LeadForm";
import { getPergolaBySlug, pergolas } from "@/data/pergolas";
import { options } from "@/data/options";
import {
  formatSizeRange,
  formatSystemType,
  formatDrive,
  formatOptionCategory,
  getCompatibleOptions,
} from "@/lib/catalog";

export function generateStaticParams() {
  return pergolas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getPergolaBySlug(slug);
  if (!product) return { title: "Пергола не найдена" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/pergolas/${product.slug}` },
    openGraph: {
      title: `${product.seo.title} | UOGEL Russia`,
      description: product.seo.description,
      url: `/pergolas/${product.slug}`,
      images: [{ url: product.images[0], alt: product.title }],
    },
  };
}

export default async function PergolaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getPergolaBySlug(slug);
  if (!product) notFound();

  const compatibleOptions = getCompatibleOptions(product, options);
  const sourcePage = "pergola:" + product.slug;

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-stone-100 sm:min-h-[420px]">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              {product.seriesName}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-2 text-xl text-stone-500">{product.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700">
                {formatSystemType(product.systemType)}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700">
                {formatDrive(product.drive)}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700">
                {formatSizeRange(product.sizeRange)}
              </span>
            </div>
            <p className="mt-6 text-lg leading-8 text-stone-600">{product.description}</p>
            <Link
              href="/calculate"
              className="mt-8 inline-flex w-fit rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Подобрать систему
            </Link>
          </div>
        </div>
      </section>

      {/* Specs + Colors + Equipment */}
      <section className="bg-stone-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-950">Характеристики</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Key specs */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                Профиль
              </p>
              <dl className="mt-4 grid gap-3">
                <SpecRow label="Стойка" value={product.specs.post} />
                <SpecRow label="Ламель" value={product.specs.blade} />
                <SpecRow label="Привод" value={formatDrive(product.drive)} />
                <SpecRow label="Материал" value={product.specs.material} />
                <SpecRow
                  label="Водоотвод"
                  value={product.specs.waterDrainage ? "Интегрированный" : "—"}
                />
              </dl>
            </div>

            {/* Profile colors */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                Цвета профиля
              </p>
              <ul className="mt-4 grid gap-3">
                {product.profileColors.map((color) => (
                  <li key={color.id} className="flex items-center gap-3 text-sm">
                    {color.swatch ? (
                      <Image
                        src={color.swatch}
                        alt={color.ral}
                        width={40}
                        height={26}
                        className="h-6 w-10 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <span className="h-6 w-10 shrink-0 rounded border border-stone-200 bg-white" />
                    )}
                    <span className="font-medium text-stone-700">{color.ral}</span>
                    <span className="text-stone-500">{color.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Base equipment */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                Базовая комплектация
              </p>
              <ul className="mt-4 grid gap-3">
                {product.baseEquipment.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Size range */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-950">Размеры</h2>
          {product.sizeRange.customizable ? (
            <div className="mt-6 max-w-2xl rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                Индивидуальная конфигурация
              </p>
              <p className="mt-3 text-2xl font-semibold text-stone-950">
                {formatSizeRange(product.sizeRange)}
              </p>
              <p className="mt-3 text-stone-600">
                Размер подбирается под проект из реальной сетки конфигураций UOGEL. Ширина и
                глубина уточняются при расчёте.
              </p>
            </div>
          ) : (
            <div className="mt-6 max-w-2xl rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                Стандартные конфигурации
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizeRange.standardSizes?.map((size) => (
                  <span
                    key={`${size.width}x${size.depth}`}
                    className="rounded-2xl border border-stone-200 px-5 py-3 text-lg font-semibold text-stone-950"
                  >
                    {size.width / 1000} × {size.depth / 1000} м
                  </span>
                ))}
              </div>
              <p className="mt-4 text-stone-600">
                Серия выпускается в фиксированных стандартных размерах.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Compatible options */}
      {compatibleOptions.length > 0 && (
        <section className="bg-stone-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-stone-950">Доступные опции</h2>
            <p className="mt-2 text-stone-600">
              Опции рассчитываются по выбранной конфигурации. Совместимость уточняется при расчёте.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {compatibleOptions.map((option) => (
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
          </div>
        </section>
      )}

      {/* Use cases */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-950">Где подходит</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {product.useCases.map((uc) => (
              <span
                key={uc}
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700"
              >
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-950">Доставка и сроки</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">
            Поставка организуется из Китая в Россию. Сроки производства, отгрузки и доставки
            уточняются после выбора серии, размера и комплектации.
          </p>
          <div className="mt-8">
            <CTA />
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="lead" className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LeadForm sourcePage={sourcePage} selectedPergolaId={product.id} />
        </div>
      </section>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <dt className="text-stone-500">{label}</dt>
      <dd className="text-right font-medium text-stone-950">{value}</dd>
    </div>
  );
}
