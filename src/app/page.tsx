import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { availablePergolas } from "@/data/pergolas";
import { FadeUp } from "@/components/motion/FadeUp";

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
    label: "Серии и конфигурации",
    title: "Ламельные перголы",
    text: "Шесть серий — A13, C10, C7, C4/M4, M3/M3-S, M2-S — на алюминиевом профиле с поворотными ламелями и интегрированным водоотводом.",
    href: "/pergolas",
    cta: "Смотреть серии",
  },
  {
    num: "02",
    label: "Боковые системы и опции",
    title: "Опции и оснащение",
    text: "ZIP-экраны, безрамное стекло, алюминиевые ставни, LED-подсветка, потолочный вентилятор, обогреватель, датчики ветра и дождя.",
    href: "/options",
    cta: "Смотреть опции",
  },
  {
    num: "03",
    label: "Каталог UOGEL 2026",
    title: "Полный каталог",
    text: "Технические характеристики, доступные размеры и совместимые опции для каждой серии. Только реальные конфигурации из производственной программы UOGEL.",
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
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-stone-950 lg:items-center">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Биоклиматическая пергола UOGEL"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/10" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-40 sm:px-6 sm:pb-28 lg:px-8 lg:py-44">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              <span className="h-px w-8 bg-stone-700" aria-hidden />
              UOGEL Russia
            </p>
            <h1 className="mt-8 text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4rem] xl:text-7xl">
              Архитектурные системы
              <br />
              для открытого пространства
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-8 text-stone-400 sm:text-lg">
              Алюминиевые перголы UOGEL с поворотными ламелями — для террас, ресторанов и резиденций.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/calculate"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-stone-950 transition hover:bg-stone-100"
              >
                Получить консультацию
              </Link>
              <Link
                href="/catalog"
                className="rounded-full border border-stone-700 px-8 py-3.5 text-sm font-medium text-stone-400 transition hover:border-stone-500 hover:text-white"
              >
                Смотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── System Pillars ── */}
      <section className="bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Архитектурные системы
            </p>
            <h2 className="mt-3 text-3xl font-light text-stone-950 sm:text-4xl">Три направления</h2>
          </FadeUp>

          <div className="mt-14 grid lg:grid-cols-3 lg:gap-px lg:bg-stone-100">
            {systemPillars.map((pillar, i) => (
              <FadeUp
                key={pillar.num}
                delay={i * 80}
                className="group border-t border-stone-100 bg-white py-10 lg:border-none lg:px-10 lg:py-14"
              >
                <span className="block text-7xl font-light leading-none text-stone-100 xl:text-8xl">
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

      {/* ── Product Series ── */}
      <section className="bg-stone-50 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  Производственная программа
                </p>
                <h2 className="mt-3 text-3xl font-light text-stone-950 sm:text-4xl">
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
                      <p className="mt-1 text-sm text-stone-500">{product.subtitle}</p>
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
          <div className="mt-10">
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
                      <h3 className="mt-1.5 text-lg font-medium text-stone-950">{product.title}</h3>
                      <p className="mt-1 text-sm text-stone-500">{product.subtitle}</p>
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
          <div className="mt-10">
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
                      <p className="mt-1 text-xs text-stone-500">{product.subtitle}</p>
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

      {/* ── Lifestyle Applications ── */}
      <section className="overflow-hidden bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Outdoor living
            </p>
            <h2 className="mt-3 text-3xl font-light text-stone-950 sm:text-4xl">
              Для любого пространства
            </h2>
          </FadeUp>
        </div>

        <FadeUp className="mt-12 grid gap-px bg-stone-200 lg:grid-cols-12">
          <div className="group relative min-h-[340px] overflow-hidden lg:col-span-7 lg:min-h-[480px]">
            <Image
              src={lifestyleTiles[0].image}
              alt={lifestyleTiles[0].title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent transition-opacity duration-500 group-hover:from-stone-950/70" />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10">
              <h3 className="text-xl font-light text-white">{lifestyleTiles[0].title}</h3>
              <p className="mt-1.5 text-sm text-stone-400">{lifestyleTiles[0].caption}</p>
            </div>
          </div>

          <div className="group relative min-h-[300px] overflow-hidden lg:col-span-5 lg:min-h-[480px]">
            <Image
              src={lifestyleTiles[1].image}
              alt={lifestyleTiles[1].title}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent transition-opacity duration-500 group-hover:from-stone-950/70" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-xl font-light text-white">{lifestyleTiles[1].title}</h3>
              <p className="mt-1.5 text-sm text-stone-400">{lifestyleTiles[1].caption}</p>
            </div>
          </div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent transition-opacity duration-500 group-hover:from-stone-950/60" />
              <div className="absolute bottom-0 left-0 p-7">
                <h3 className="text-lg font-light text-white">{tile.title}</h3>
                <p className="mt-1 text-sm text-stone-400">{tile.caption}</p>
              </div>
            </div>
          ))}
        </FadeUp>
      </section>

      {/* ── Engineering (dark) ── */}
      <section className="bg-stone-950 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
              Инженерная составляющая
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-light text-white sm:text-4xl">
              Инженерная outdoor-система
              <br className="hidden sm:block" />
              для современной архитектуры
            </h2>
          </FadeUp>
          <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringItems.map((item, i) => (
              <FadeUp key={i} delay={i * 60} className="border-t border-stone-800 pt-8">
                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-500">{item.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery Process ── */}
      <section className="bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Прозрачный процесс
            </p>
            <h2 className="mt-3 text-3xl font-light text-stone-950 sm:text-4xl">
              Как устроена поставка UOGEL в Россию
            </h2>
          </FadeUp>
          <div className="mt-14 grid gap-px bg-stone-100 sm:grid-cols-2 lg:grid-cols-4">
            {deliverySteps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 70} className="bg-white px-8 py-10">
                <span className="text-3xl font-light text-stone-200">{step.num}</span>
                <h3 className="mt-5 text-base font-medium text-stone-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-500">{step.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
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
          <FadeUp delay={100} className="mt-10 grid gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Не ограничиваем клиента складскими остатками — система поставляется под конкретный проект.",
              "Подбираем серию под параметры объекта: размеры, назначение и тип эксплуатации.",
              "Согласуем размеры, опции и цвет профиля до размещения заказа.",
              "Поставка организуется из производственной программы UOGEL под конкретную конфигурацию.",
            ].map((text, i) => (
              <div key={i} className="bg-white px-6 py-7">
                <p className="text-sm leading-7 text-stone-600">{text}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Следующий шаг
            </p>
            <h2 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
              Обсудить проект с консультантом
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500">
              Подберём серию и конфигурацию из каталога UOGEL 2026, рассчитаем стоимость поставки в Россию.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/calculate"
                className="rounded-full bg-stone-950 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                Получить консультацию
              </Link>
              <Link
                href="/catalog"
                className="rounded-full border border-stone-300 px-8 py-3.5 text-sm font-medium text-stone-600 transition hover:border-stone-400 hover:text-stone-950"
              >
                Смотреть каталог
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
