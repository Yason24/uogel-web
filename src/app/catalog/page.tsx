import Link from "next/link";
import type { Metadata } from "next";
import type { Product, Option } from "@/types";
import { Section } from "@/components/Section";
import { products } from "@/data/pergolas";
import { options } from "@/data/options";
import { formatSystemType, formatDrive, formatOptionCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог систем UOGEL",
  description:
    "Каталог алюминиевых outdoor-систем UOGEL: 6 серий пергол, совместимые опции и аксессуары. Конфигурация подбирается под объект — расчёт поставки в Россию.",
  openGraph: {
    title: "Каталог систем UOGEL",
    description:
      "6 серий пергол и 7 опциональных систем из каталога UOGEL 2026. Конфигурации для жилых, гостиничных и коммерческих объектов.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
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
    nameEn: "Pavilion",
    nameRu: "Беседки",
    description: "Закрытые и полузакрытые отдельностоящие конструкции для длительного пребывания на открытом воздухе.",
  },
  {
    key: "carport",
    nameEn: "Carport",
    nameRu: "Навесы",
    description: "Алюминиевые навесы для автомобилей, техники и входных зон.",
  },
  {
    key: "sunroom",
    nameEn: "Sunroom",
    nameRu: "Зимние сады",
    description: "Остеклённые конструкции для круглогодичного использования.",
  },
  {
    key: "commercial",
    nameEn: "Commercial Systems",
    nameRu: "Коммерческие системы",
    description: "Масштабируемые инженерные решения для HoReCa, торговых и общественных объектов.",
  },
];

export default function CatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stone-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            UOGEL Russia · 2026
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-light text-stone-950 sm:text-5xl">
            Каталог систем UOGEL
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-500 sm:text-lg">
            Инженерные outdoor-системы: биоклиматические серии пергол, совместимые опции и аксессуары. Конфигурация подбирается под объект — выполняем расчёт поставки в Россию.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculate"
              className="rounded-full bg-stone-950 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-arch"
            >
              Получить консультацию
            </Link>
            <Link
              href="/pergolas"
              className="rounded-full border border-stone-300 px-7 py-3.5 text-sm font-medium text-stone-700 transition-colors duration-200 hover:border-arch hover:text-arch"
            >
              Смотреть системы пергол
            </Link>
          </div>
        </div>
      </section>

      {/* Pergola Systems */}
      <Section
        eyebrow="Системы пергол"
        title="6 серий · Каталог 2026"
        description="Биоклиматические и жалюзийные серии UOGEL — от компактной ручной системы до флагманского биоклиматического профиля. Конфигурации подбираются под объект, совместимые опции рассчитываются по серии."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductMiniCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/pergolas"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-arch"
          >
            Все серии →
          </Link>
        </div>
      </Section>

      {/* Options & Accessories */}
      <Section
        eyebrow="Опции и аксессуары"
        title="Совместимые системы"
        description="ZIP-экраны, остекление, ставни, климатические системы и автоматика. Совместимость рассчитывается по выбранной серии и конфигурации."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <OptionMiniCard key={option.id} option={option} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/options"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-arch"
          >
            Все опции →
          </Link>
        </div>
      </Section>

      {/* Trust */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Как работает подбор
          </p>
          <h2 className="mt-3 text-2xl font-light text-stone-950 sm:text-3xl">
            Поставка под проект, не со склада
          </h2>
          <div className="mt-10 grid gap-px bg-stone-100 sm:grid-cols-3">
            {[
              {
                title: "Технический подбор серии",
                text: "Консультируем по каталогу и помогаем выбрать серию, исходя из объекта, бюджета и условий эксплуатации.",
              },
              {
                title: "Спецификация до заказа",
                text: "Фиксируем размеры, цвет профиля и опции заранее. Никаких изменений после запуска производства.",
              },
              {
                title: "Прозрачные этапы поставки",
                text: "Заказ на заводе UOGEL → производство → логистика в Россию → монтажная документация и консультация.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-stone-50 px-7 py-8">
                <h3 className="text-sm font-medium text-stone-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <Section
        eyebrow="Скоро"
        title="Расширение каталога"
        description="Прорабатываем поставку дополнительных категорий систем UOGEL для жилых и коммерческих объектов."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comingSoon.map((item) => (
            <div
              key={item.key}
              id={item.key}
              className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-5"
            >
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                {item.nameEn}
              </p>
              <h3 className="mt-2 text-lg font-medium text-stone-500">{item.nameRu}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">{item.description}</p>
              <span className="mt-4 inline-block rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-500">
                Скоро
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="border-t border-stone-100 bg-stone-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Консультация по проекту
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-light text-white sm:text-4xl">
            Подберём систему под ваш объект
          </h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-stone-400">
            Изучим проект, выберем серию и конфигурацию из каталога, рассчитаем совместимые опции и стоимость поставки.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/contacts"
              className="rounded-full border border-stone-700 px-7 py-3.5 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductMiniCard({ product }: { product: Product }) {
  const sizingLabel = product.sizeRange.customizable ? "Конфигурация под проект" : "Стандартные конфигурации";

  return (
    <Link
      href={`/pergolas/${product.slug}`}
      className="group rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:border-stone-300 hover:shadow-md hover:shadow-stone-100/80"
    >
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
        {product.seriesName}
      </p>
      <h3 className="mt-2 text-lg font-medium text-stone-950 transition-colors duration-200 group-hover:text-arch">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-stone-500">{product.subtitle}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
        <span>{formatSystemType(product.systemType)}</span>
        <span aria-hidden>·</span>
        <span>{formatDrive(product.drive)}</span>
        <span aria-hidden>·</span>
        <span>{sizingLabel}</span>
      </div>
      <p className="mt-3 text-xs text-stone-400">
        Стойка {product.specs.post} · ламель {product.specs.blade.split(",")[0]}
      </p>
    </Link>
  );
}

function OptionMiniCard({ option }: { option: Option }) {
  return (
    <Link
      href={`/options/${option.slug}`}
      className="group rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:border-stone-300 hover:shadow-md hover:shadow-stone-100/80"
    >
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
        {formatOptionCategory(option.category)}
      </p>
      <h3 className="mt-2 text-lg font-medium text-stone-950 transition-colors duration-200 group-hover:text-arch">
        {option.title}
      </h3>
      <p className="mt-1 text-sm text-stone-500">{option.subtitle}</p>
      <p className="mt-3 text-xs text-stone-400">
        {option.priceType === "included"
          ? "В базовой системе"
          : option.priceType === "extra"
            ? "Дополнительно"
            : "По запросу"}
      </p>
    </Link>
  );
}
