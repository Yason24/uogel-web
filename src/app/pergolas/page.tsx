import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { PergolaCard } from "@/components/PergolaCard";
import { availablePergolas } from "@/data/pergolas";
import { options } from "@/data/options";

export const metadata: Metadata = {
  title: "Биоклиматические перголы UOGEL — серии для террас и коммерческих объектов",
  description:
    "Каталог алюминиевых пергол UOGEL: пристенные, отдельностоящие, моторизованные и ручные системы для частных и коммерческих проектов. Поставка в Россию.",
  alternates: { canonical: "/pergolas" },
  openGraph: {
    title: "Биоклиматические перголы UOGEL — серии для террас и коммерческих объектов",
    description:
      "Каталог алюминиевых пергол UOGEL для частных и коммерческих проектов. Поставка в Россию.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Биоклиматическая пергола UOGEL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Биоклиматические перголы UOGEL — серии для террас и коммерческих объектов",
    description: "Каталог алюминиевых пергол UOGEL. Поставка в Россию.",
    images: ["/images/og/uogel-og.jpg"],
  },
};

const CATEGORY_DEFS = [
  {
    label: "Пристенные системы",
    description: "Монтаж к стене или фасаду здания без отдельных передних опор",
    test: (p: (typeof availablePergolas)[number]) =>
      p.systemType === "wall-mounted" || p.systemType === "both",
  },
  {
    label: "Отдельностоящие системы",
    description: "Автономная установка на собственных несущих опорах",
    test: (p: (typeof availablePergolas)[number]) =>
      p.systemType === "freestanding" || p.systemType === "both",
  },
  {
    label: "Моторизованные системы",
    description: "Электрический привод, пульт управления, совместимость с датчиками",
    test: (p: (typeof availablePergolas)[number]) => p.drive === "motorized",
  },
  {
    label: "Ручные системы",
    description: "Простое и надёжное управление ламелями без автоматики",
    test: (p: (typeof availablePergolas)[number]) => p.drive === "manual",
  },
  {
    label: "Компактные решения",
    description: "Стандартные конфигурации для небольших террас и балконов",
    test: (p: (typeof availablePergolas)[number]) => !p.sizeRange.customizable,
  },
  {
    label: "Коммерческие конфигурации",
    description: "Крупные пролёты для ресторанов, отелей и общественных пространств",
    test: (p: (typeof availablePergolas)[number]) =>
      p.useCases.some((u) => /ресторан|отел|коммерч/i.test(u)),
  },
];

const COMMERCIAL_USES = [
  { label: "Рестораны и летние веранды", detail: "Защита гостей от солнца и дождя без ущерба атмосфере" },
  { label: "Отели и курортные зоны", detail: "Архитектурные системы для лаундж-террас и зон у бассейна" },
  { label: "Rooftop-пространства", detail: "Лёгкие конструкции с минимальной нагрузкой на кровлю" },
  { label: "Террасы у бассейна", detail: "Алюминий и интегрированный водоотвод — оптимально для влажной среды" },
  { label: "Частные загородные дома", detail: "Индивидуальный подбор серии под архитектуру объекта" },
];

const FEATURED_OPTION_IDS = ["zip-screen", "frameless-glass", "electrical-heater", "rain-wind-sensors", "ceiling-fan"];

export default function PergolasPage() {
  const categories = CATEGORY_DEFS.map((def) => ({
    label: def.label,
    description: def.description,
    series: availablePergolas.filter(def.test).map((p) => p.seriesName),
  }));

  const featuredOptions = FEATURED_OPTION_IDS.flatMap((id) => {
    const opt = options.find((o) => o.id === id);
    return opt ? [opt] : [];
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[56vh] overflow-hidden bg-stone-950 lg:min-h-[64vh]">
        <Image
          src="/images/gallery/install-au-louvers.jpg"
          alt="Биоклиматические перголы UOGEL — установка"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/10" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Системы UOGEL
          </p>
          <h1 className="max-w-3xl text-4xl font-light text-white sm:text-5xl">
            Биоклиматические перголы UOGEL
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-400 sm:text-lg">
            Архитектурные алюминиевые системы для частных террас, ресторанов,
            отелей и коммерческих outdoor-пространств.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/catalog"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      {/* ── System categories ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Типы систем
            </p>
            <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">
              Шесть классов архитектурных решений
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
              Серии UOGEL охватывают весь диапазон задач — от компактной дачной
              террасы до крупного коммерческого объекта.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-2xl border border-stone-200 bg-white p-6"
              >
                <h3 className="text-base font-medium text-stone-950">{cat.label}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">{cat.description}</p>
                {cat.series.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.series.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Series grid ── */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Серии
            </p>
            <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">
              Шесть серий для любого проекта
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
              Подберём подходящую конфигурацию из доступных размеров и рассчитаем
              стоимость по выбранной серии и комплектации.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {availablePergolas.map((product) => (
              <PergolaCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Commercial applications ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Применение
            </p>
            <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">
              Частные и коммерческие объекты
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
              Алюминиевые системы UOGEL устанавливаются на объектах разного масштаба
              и назначения.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMERCIAL_USES.map((use) => (
              <div
                key={use.label}
                className="rounded-2xl border border-stone-200 bg-white p-6"
              >
                <h3 className="text-base font-medium text-stone-950">{use.label}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">{use.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compatible options ── */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Опции
            </p>
            <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">
              Совместимые системы и аксессуары
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
              Большинство серий UOGEL поддерживают боковые ограждения, остекление,
              климатическое оборудование и автоматику.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredOptions.map((opt) => (
              <Link
                key={opt.id}
                href={`/options/${opt.slug}`}
                className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md hover:shadow-stone-200/50"
              >
                <h3 className="text-base font-medium text-stone-950 transition-colors duration-200 group-hover:text-arch">
                  {opt.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">{opt.subtitle}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/options"
              className="text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-arch"
            >
              Все опции и аксессуары →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Процесс подбора
          </p>
          <h2 className="mt-3 text-2xl font-light text-stone-950 sm:text-3xl">
            Серия подбирается под объект, не наоборот
          </h2>
          <div className="mt-10 grid gap-px bg-stone-100 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Анализ объекта",
                text: "Изучаем тип объекта, размеры зоны, климат и нагрузки. Только после этого выбираем серию.",
              },
              {
                title: "Подбор серии",
                text: "Определяем подходящую конфигурацию из производственной программы UOGEL 2026.",
              },
              {
                title: "Согласование опций",
                text: "Уточняем цвет профиля, боковые системы и автоматику до размещения заказа.",
              },
              {
                title: "Консультация по монтажу",
                text: "После поставки предоставляем монтажную документацию и техническую поддержку.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-stone-50 px-6 py-7">
                <h3 className="text-sm font-medium text-stone-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light text-white sm:text-4xl">
              Подобрать систему под проект
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-400">
              Укажите тип объекта, размеры и нужные опции — подготовим
              техническую рекомендацию по подходящей серии UOGEL.
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
