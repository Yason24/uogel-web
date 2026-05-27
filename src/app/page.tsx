import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { availablePergolas } from "@/data/pergolas";
import { FadeUp } from "@/components/motion/FadeUp";
import { TrackableLink } from "@/components/ui/TrackableLink";
import { GOALS, EVENTS } from "@/lib/analytics";

export const metadata: Metadata = {
  title: { absolute: "UOGEL Russia — биоклиматические перголы с поставкой в Россию" },
  description:
    "Алюминиевые биоклиматические системы UOGEL с поворотными ламелями, ZIP-экранами, стеклом, LED и автоматикой. Подбор из каталога 2026, расчёт поставки в Россию.",
  openGraph: {
    title: "UOGEL Russia — биоклиматические перголы",
    description:
      "Алюминиевые системы с поворотными ламелями и интегрированным водоотводом. Подбор из каталога, расчёт поставки в Россию.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Биоклиматическая пергола UOGEL",
      },
    ],
  },
};

const systemPillars = [
  {
    num: "01",
    label: "Серии пергол",
    title: "Ламельные перголы",
    text: "От компактных ручных до флагманских моторизованных систем. Подберём серию под ваш объект, размеры и условия эксплуатации.",
    href: "/pergolas",
    cta: "Смотреть серии",
  },
  {
    num: "02",
    label: "Боковые системы",
    title: "Опции и оснащение",
    text: "Боковые экраны, остекление, климатическое оборудование и автоматика — расширяют систему до всесезонного архитектурного пространства.",
    href: "/options",
    cta: "Смотреть опции",
  },
  {
    num: "03",
    label: "Каталог UOGEL 2026",
    title: "Полный каталог",
    text: "Конфигурации, размеры и совместимость опций из производственной программы UOGEL. Только реальные системы — без импровизаций.",
    href: "/catalog",
    cta: "Открыть каталог",
  },
];

const lifestyleTiles = [
  {
    title: "Частные террасы",
    caption: "Резиденции, коттеджи, загородные дома",
    image: "/images/products/a13.jpg",
  },
  {
    title: "Рестораны и кафе",
    caption: "Открытые веранды, летние пространства",
    image: "/images/products/c10.jpg",
  },
  {
    title: "Отели",
    caption: "Лобби, террасы, зоны отдыха",
    image: "/images/products/c7.jpg",
  },
  {
    title: "Rooftop",
    caption: "Кровельные террасы городских зданий",
    image: "/images/products/c4.jpg",
  },
  {
    title: "Зоны у бассейна",
    caption: "Лаунж и покрытие над водой",
    image: "/images/products/m3.jpg",
  },
];

const engineeringItems = [
  {
    title: "Поворотные ламели",
    text: "Регулируют поток воздуха и освещённость. В закрытом положении — полная защита от дождя.",
  },
  {
    title: "Интегрированный водоотвод",
    text: "Дождевая вода отводится через внутренние каналы стоек. Чистая линия профиля без внешних водостоков.",
  },
  {
    title: "Моторизация",
    text: "Управление пультом, кнопкой или смартфоном. Поддерживается интеграция в системы умного дома.",
  },
  {
    title: "Датчики погоды",
    text: "Датчики ветра и дождя автоматически закрывают ламели при непогоде.",
  },
  {
    title: "LED-подсветка",
    text: "Встроенная в ламели подсветка: RGB 7 цветов на флагманских, Dual LED на средних сериях.",
  },
  {
    title: "ZIP, стекло и ставни",
    text: "Боковые системы закрывают периметр, создавая всесезонное защищённое пространство.",
  },
];

const deliverySteps = [
  {
    num: "01",
    title: "Подбор серии",
    text: "Консультируем по каталогу и помогаем выбрать серию под объект, бюджет и условия эксплуатации.",
  },
  {
    num: "02",
    title: "Техническая спецификация",
    text: "Фиксируем размеры, цвет профиля и опции. Согласовываем технические детали с производством.",
  },
  {
    num: "03",
    title: "Заказ на производстве",
    text: "Размещаем заказ на заводе UOGEL по финальной спецификации.",
  },
  {
    num: "04",
    title: "Доставка и консультация",
    text: "Организуем логистику в ваш город. Предоставляем монтажную документацию и техническую поддержку.",
  },
];

const flagshipSlugs = ["a13", "c10"];
const universalSlugs = ["c7", "c4"];
const compactSlugs = ["m3", "m2-s"];

export default function Home() {
  const flagshipPergolas = availablePergolas.filter((p) => flagshipSlugs.includes(p.slug));
  const universalPergolas = availablePergolas.filter((p) => universalSlugs.includes(p.slug));
  const compactPergolas = availablePergolas.filter((p) => compactSlugs.includes(p.slug));

  return (
    <>
      {/* ───────────────────────────────────────────────────────────
          Hero
      ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-stone-950 lg:items-center">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Биоклиматическая пергола UOGEL"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-stone-950/5" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-44 sm:px-6 sm:pb-32 lg:px-8 lg:py-48">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              <span className="h-px w-8 bg-stone-700" aria-hidden />
              UOGEL Russia
            </p>
            <h1 className="mt-10 text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem] xl:text-7xl">
              Биоклиматические
              <br />
              перголы UOGEL
              <br className="hidden sm:block" />
              <span className="text-stone-300"> для архитектурных</span>
              <br />
              <span className="text-stone-300">outdoor-пространств</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-stone-400 sm:text-lg">
              Алюминиевые системы для террас, ресторанов и частных outdoor-зон —
              с управляемым светом, защитой от дождя и интегрированными опциями.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <TrackableLink
                href="/calculate"
                goalName={GOALS.CTA_CONSULTATION}
                eventParams={{ context: "hero", href: "/calculate" }}
                className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
              >
                Получить консультацию
              </TrackableLink>
              <TrackableLink
                href="/catalog"
                goalName={GOALS.CATALOG_OPEN}
                eventName={EVENTS.CATALOG_OPEN}
                eventParams={{ context: "hero" }}
                className="rounded-full border border-stone-600 px-8 py-3.5 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-400 hover:text-white"
              >
                Смотреть каталог
              </TrackableLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Architectural directions — три направления
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Архитектурные системы
            </p>
            <h2 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
              Три направления
            </h2>
          </FadeUp>

          <div className="mt-14 grid lg:grid-cols-3 lg:gap-px lg:bg-stone-100">
            {systemPillars.map((pillar, i) => (
              <FadeUp
                key={pillar.num}
                delay={i * 90}
                className="group border-t border-stone-100 bg-white py-10 lg:border-none lg:px-10 lg:py-14"
              >
                <span className="block text-8xl font-light leading-none text-stone-100 xl:text-9xl">
                  {pillar.num}
                </span>
                <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  {pillar.label}
                </p>
                <h3 className="mt-3 text-xl font-light text-stone-950">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-500">{pillar.text}</p>
                <Link
                  href={pillar.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-arch"
                >
                  {pillar.cta}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Product Series — серии UOGEL 2026
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  Производственная программа
                </p>
                <h2 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
                  Серии UOGEL 2026
                </h2>
              </div>
              <Link
                href="/pergolas"
                className="shrink-0 self-start text-sm font-medium text-stone-500 transition-colors duration-200 hover:text-stone-950 sm:self-auto"
              >
                Все серии →
              </Link>
            </div>
          </FadeUp>

          {/* Флагманские */}
          <div className="mt-14">
            <FadeUp>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Флагманские — A13 · C10
              </p>
            </FadeUp>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {flagshipPergolas.map((product, i) => (
                <FadeUp key={product.id} delay={i * 90}>
                  <Link
                    href={`/pergolas/${product.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 transition-shadow duration-300 hover:shadow-xl hover:shadow-stone-200/70 hover:ring-stone-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-7">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                        {product.seriesName}
                      </p>
                      <h3 className="mt-2 text-xl font-light text-stone-950">{product.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-stone-500">{product.subtitle}</p>
                      <p className="mt-5 text-xs font-medium text-stone-400 transition-colors duration-200 group-hover:text-arch">
                        Подробнее →
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Универсальные */}
          <div className="mt-12">
            <FadeUp>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Универсальные — C7 · C4/M4
              </p>
            </FadeUp>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {universalPergolas.map((product, i) => (
                <FadeUp key={product.id} delay={i * 80}>
                  <Link
                    href={`/pergolas/${product.slug}`}
                    className="group block overflow-hidden rounded-xl bg-white ring-1 ring-stone-200 transition-shadow duration-300 hover:shadow-lg hover:shadow-stone-200/60 hover:ring-stone-300"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-stone-100">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                        {product.seriesName}
                      </p>
                      <h3 className="mt-2 text-lg font-medium text-stone-950">{product.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-stone-500">{product.subtitle}</p>
                      <p className="mt-4 text-xs font-medium text-stone-400 transition-colors duration-200 group-hover:text-arch">
                        Подробнее →
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Компактные */}
          <div className="mt-12">
            <FadeUp>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Компактные — M3/M3-S · M2-S
              </p>
            </FadeUp>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {compactPergolas.map((product, i) => (
                <FadeUp key={product.id} delay={i * 70}>
                  <Link
                    href={`/pergolas/${product.slug}`}
                    className="group flex gap-5 overflow-hidden rounded-xl bg-white p-5 ring-1 ring-stone-200 transition-shadow duration-300 hover:shadow-md hover:ring-stone-300"
                  >
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="96px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                        {product.seriesName}
                      </p>
                      <h3 className="mt-1 text-base font-medium text-stone-950">{product.title}</h3>
                      <p className="mt-1 text-xs leading-6 text-stone-500">{product.subtitle}</p>
                      <p className="mt-3 text-xs font-medium text-stone-400 transition-colors duration-200 group-hover:text-arch">
                        Подробнее →
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Lifestyle — для любого пространства
          pb-0: photos bleed to the bottom edge for cinematic
          transition into the dark engineering section below.
      ─────────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-white pb-0 pt-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Outdoor living
            </p>
            <h2 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
              Для любого пространства
            </h2>
          </FadeUp>
        </div>

        <FadeUp className="mt-10 grid gap-px bg-stone-200 lg:grid-cols-12">
          {/* Large primary tile */}
          <div className="group relative min-h-[340px] overflow-hidden lg:col-span-7 lg:min-h-[500px]">
            <Image
              src={lifestyleTiles[0].image}
              alt={lifestyleTiles[0].title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10">
              <h3 className="text-xl font-light text-white">{lifestyleTiles[0].title}</h3>
              <p className="mt-2 text-sm text-stone-400">{lifestyleTiles[0].caption}</p>
            </div>
          </div>

          {/* Secondary tall tile */}
          <div className="group relative min-h-[300px] overflow-hidden lg:col-span-5 lg:min-h-[500px]">
            <Image
              src={lifestyleTiles[1].image}
              alt={lifestyleTiles[1].title}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-xl font-light text-white">{lifestyleTiles[1].title}</h3>
              <p className="mt-2 text-sm text-stone-400">{lifestyleTiles[1].caption}</p>
            </div>
          </div>

          {/* Three smaller tiles */}
          {lifestyleTiles.slice(2).map((tile) => (
            <div
              key={tile.title}
              className="group relative min-h-[260px] overflow-hidden lg:col-span-4"
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/15 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-7">
                <h3 className="text-lg font-light text-white">{tile.title}</h3>
                <p className="mt-1.5 text-sm text-stone-400">{tile.caption}</p>
              </div>
            </div>
          ))}
        </FadeUp>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Engineering — editorial two-column statement
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-32 sm:py-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
              Архитектурная интеграция
            </p>
          </FadeUp>

          <div className="mt-10 grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-28 xl:gap-36">
            {/* ── Left: editorial heading — sticky on desktop ── */}
            <FadeUp delay={80} className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-4xl font-light leading-[1.1] text-white sm:text-5xl">
                Архитектура
                <br />
                комфорта
                <br />
                в любую погоду
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-8 text-stone-500">
                Каждый элемент — от ламели до стойки —
                решает конкретную задачу. Форма следует
                за функцией, система живёт в архитектуре.
              </p>
            </FadeUp>

            {/* ── Right: numbered feature list ── */}
            <div className="divide-y divide-stone-800/60">
              {engineeringItems.map((item, i) => (
                <FadeUp key={i} delay={i * 55} className="py-7 first:pt-0">
                  <div className="flex gap-7">
                    <span className="mt-0.5 w-6 shrink-0 text-xs font-medium tabular-nums text-stone-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-stone-200">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-500">{item.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Delivery — open grid, no boxes
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Прозрачный процесс
            </p>
            <h2 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
              Как устроена поставка UOGEL в Россию
            </h2>
          </FadeUp>

          <div className="mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
            {deliverySteps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 70}>
                <span className="text-3xl font-light text-stone-200">{step.num}</span>
                <h3 className="mt-5 text-base font-medium text-stone-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-500">{step.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Trust — clean dividers, no boxes
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Модель поставки
            </p>
            <h2 className="mt-3 text-2xl font-light text-stone-950 sm:text-3xl">
              Почему схема под заказ подходит для проектных систем
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stone-200">
              {[
                "Не ограничиваем клиента складскими остатками — система поставляется под конкретный проект.",
                "Подбираем серию под параметры объекта: размеры, назначение и тип эксплуатации.",
                "Согласуем размеры, опции и цвет профиля до размещения заказа.",
                "Поставка организуется из производственной программы UOGEL под конкретную конфигурацию.",
              ].map((text, i) => (
                <p
                  key={i}
                  className="text-sm leading-7 text-stone-600 lg:px-8 lg:first:pl-0 lg:last:pr-0"
                >
                  {text}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          Final CTA — dark bookend (mirrors hero)
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
              Следующий шаг
            </p>
            <h2 className="mt-5 text-3xl font-light text-white sm:text-4xl">
              Обсудить ваш проект
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-400">
              Подберём серию из каталога, рассчитаем комплектацию и стоимость
              поставки под параметры вашего объекта.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/calculate"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
              >
                Обсудить проект
              </Link>
              <Link
                href="/catalog"
                className="rounded-full border border-stone-700 px-8 py-3.5 text-sm font-medium text-stone-400 transition-colors duration-200 hover:border-stone-500 hover:text-white"
              >
                Открыть каталог
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
