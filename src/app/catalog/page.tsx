import Link from "next/link";
import type { Metadata } from "next";
import type { Product, Option } from "@/types";
import { Section } from "@/components/Section";
import { products } from "@/data/pergolas";
import { options } from "@/data/options";
import { formatSystemType, formatDrive, formatSizeRange, formatOptionCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог систем UOGEL Russia",
  description:
    "Полный каталог биоклиматических систем UOGEL: 6 серий пергол, опции и аксессуары. Подбираем систему под объект, рассчитываем поставку в Россию.",
  openGraph: {
    title: "Каталог систем UOGEL Russia",
    description:
      "6 серий пергол и 7 опций из каталога UOGEL 2026. Расчёт поставки в Россию.",
    images: [
      {
        url: "/images/og/uogel-og.webp",
        width: 1200,
        height: 630,
        alt: "Каталог систем UOGEL",
      },
    ],
  },
};

const comingSoon = [
  {
    key: "pavilion",
    name: "Беседки",
    nameEn: "Pavilion",
    description: "Закрытые и полузакрытые отдельностоящие конструкции для длительного пребывания",
  },
  {
    key: "carport",
    name: "Навесы",
    nameEn: "Carport",
    description: "Алюминиевые навесы для автомобилей, техники и входных зон",
  },
  {
    key: "sunroom",
    name: "Зимние сады",
    nameEn: "Sunroom",
    description: "Остеклённые пространства для круглогодичного использования",
  },
  {
    key: "commercial",
    name: "Коммерческие системы",
    nameEn: "Commercial Systems",
    description: "Масштабируемые решения для HoReCa, торговых и общественных объектов",
  },
];

export default function CatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">UOGEL Russia</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-stone-950 sm:text-5xl">
            Каталог систем
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
            Биоклиматические системы UOGEL из каталога 2026: серии пергол, опции и аксессуары. Поставка в Россию, расчёт по запросу.
          </p>
        </div>
      </section>

      {/* Pergola series */}
      <Section
        eyebrow="Перголы"
        title="Биоклиматические серии"
        description="6 серий из каталога UOGEL 2026 — от компактной ручной M3 до флагманской биоклиматической A13."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductMiniCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/pergolas"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:border-stone-950"
          >
            Все серии →
          </Link>
        </div>
      </Section>

      {/* Options */}
      <Section
        eyebrow="Опции и оснащение"
        title="Системы и аксессуары"
        description="ZIP-экраны, остекление, ставни, климатические системы и автоматика. Совместимость рассчитывается по выбранной серии."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <OptionMiniCard key={option.id} option={option} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/options"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:border-stone-950"
          >
            Все опции →
          </Link>
        </div>
      </Section>

      {/* Coming soon */}
      <Section
        eyebrow="Скоро в каталоге"
        title="Расширение ассортимента"
        description="Прорабатываем поставку дополнительных категорий систем UOGEL."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comingSoon.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                {item.nameEn}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-stone-600">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">{item.description}</p>
              <span className="mt-4 inline-block rounded-full bg-stone-200 px-3 py-1 text-xs font-semibold text-stone-500">
                Скоро
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link
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
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
        <span>{formatSystemType(product.systemType)}</span>
        <span aria-hidden>·</span>
        <span>{formatDrive(product.drive)}</span>
        <span aria-hidden>·</span>
        <span>{formatSizeRange(product.sizeRange)}</span>
      </div>
      <p className="mt-3 text-xs font-medium text-stone-400">
        Стойка {product.specs.post} · ламель {product.specs.blade.split(",")[0]}
      </p>
    </Link>
  );
}

function OptionMiniCard({ option }: { option: Option }) {
  return (
    <Link
      href={`/options/${option.slug}`}
      className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-400 hover:shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
        {formatOptionCategory(option.category)}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-stone-950 group-hover:text-stone-700">
        {option.title}
      </h3>
      <p className="mt-1 text-sm text-stone-500">{option.subtitle}</p>
      <p className="mt-3 text-xs font-medium text-stone-400">
        {option.priceType === "included" ? "В базовой системе" : option.priceType === "extra" ? "Дополнительно" : "По запросу"}
      </p>
    </Link>
  );
}
