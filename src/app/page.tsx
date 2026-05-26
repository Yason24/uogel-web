import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { availablePergolas } from "@/data/pergolas";

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
    text: "Шесть серий — A13, C10, C7, C4/M4, M3/M3-S, M2-S — на алюминиевом профиле с поворотными ламелями и интегрированным водоотводом. Флагманские и стандартные конфигурации.",
    href: "/pergolas",
    cta: "Смотреть серии",
  },
  {
    num: "02",
    label: "Боковые системы и опции",
    title: "Опции и оснащение",
    text: "ZIP-экраны, безрамное и узкорамное стекло, алюминиевые ставни, LED-подсветка, потолочный вентилятор, обогреватель, датчики ветра и дождя.",
    href: "/options",
    cta: "Смотреть опции",
  },
  {
    num: "03",
    label: "Каталог UOGEL 2026",
    title: "Полный каталог",
    text: "Актуальные технические характеристики, доступные размеры и совместимые опции для каждой серии. Только реальные конфигурации из производственной программы UOGEL.",
    href: "/catalog",
    cta: "Открыть каталог",
  },
];

const applications = [
  {
    title: "Частные террасы",
    text: "Жилые резиденции, коттеджи, загородные дома. A13 и C10 для представительских проектов, M3/M2-S для компактных решений.",
  },
  {
    title: "Рестораны и кафе",
    text: "Летние веранды и открытые обеденные зоны. Системы C10 и C7 с ZIP-экранами и обогревателями обеспечивают комфорт в любую погоду.",
  },
  {
    title: "Отели и гостиницы",
    text: "Открытые лобби, террасы, зоны отдыха. Флагманский профиль A13 с автоматикой и датчиками погоды.",
  },
  {
    title: "Rooftop-пространства",
    text: "Кровельные террасы жилых и коммерческих зданий. Отдельностоящая конструкция без привязки к фасаду.",
  },
  {
    title: "Зоны у бассейна",
    text: "Покрытие над бассейном и лаунж-зоны на открытом воздухе. Алюминий устойчив к влажности, хлору и УФ-излучению.",
  },
];

const engineeringItems = [
  {
    num: "01",
    title: "Поворотные ламели",
    text: "Алюминиевые ламели регулируют поток воздуха и освещённость. В закрытом положении — полная защита от дождя.",
  },
  {
    num: "02",
    title: "Интегрированный водоотвод",
    text: "Дождевая вода отводится через внутренние каналы стоек. Никаких внешних водостоков — чистая линия профиля.",
  },
  {
    num: "03",
    title: "Моторизация",
    text: "Управление пультом, настенной кнопкой или смартфоном. Поддерживается интеграция в системы умного дома.",
  },
  {
    num: "04",
    title: "Датчики погоды",
    text: "Датчики ветра и дождя автоматически закрывают ламели при непогоде. Защита конструкции и пространства под ней.",
  },
  {
    num: "05",
    title: "LED-подсветка",
    text: "Встроенная в ламели подсветка: RGB 7 цветов на флагманских сериях, Dual LED на средних. Управление из того же пульта.",
  },
  {
    num: "06",
    title: "ZIP, стекло и ставни",
    text: "Боковые системы закрывают периметр, превращая открытую террасу в защищённое всесезонное пространство.",
  },
];

const workflowSteps = [
  { num: "01", title: "Проект", text: "Присылаете план, фото или описание объекта." },
  { num: "02", title: "Подбор серии", text: "Выбираем подходящую модель и конфигурацию из каталога UOGEL." },
  { num: "03", title: "Заказ", text: "Фиксируем комплектацию, цвет профиля и опции." },
  { num: "04", title: "Производство", text: "Изготовление на заводе UOGEL по финальной спецификации." },
  { num: "05", title: "Доставка", text: "Расчёт и организация поставки в ваш город." },
  { num: "06", title: "Поддержка", text: "Монтажная документация и техническая консультация." },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-stone-950 lg:items-center">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Биоклиматическая пергола UOGEL"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/10 lg:bg-gradient-to-r" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
              <span className="h-px w-10 bg-stone-600" aria-hidden />
              Биоклиматические системы UOGEL
            </p>
            <h1 className="mt-6 text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              Биоклиматические перголы UOGEL для архитектурных outdoor-пространств
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-300 sm:text-lg">
              Алюминиевые системы с поворотными ламелями, интегрированным водоотводом, ZIP-экранами, стеклом, освещением и автоматикой.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/calculate"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-stone-950 transition hover:bg-stone-100"
              >
                Получить консультацию
              </Link>
              <Link
                href="/catalog"
                className="rounded-full border border-stone-600 px-7 py-3.5 text-sm font-medium text-stone-300 transition hover:border-stone-400 hover:text-white"
              >
                Смотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Architectural Systems ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Архитектурные системы
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-light text-stone-950 sm:text-4xl">
            Три направления для вашего проекта
          </h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {systemPillars.map((pillar) => (
              <div key={pillar.num} className="group border-t border-stone-200 pt-8">
                <span className="text-4xl font-light text-stone-200">{pillar.num}</span>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                  {pillar.label}
                </p>
                <h3 className="mt-2 text-lg font-medium text-stone-950">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-500">{pillar.text}</p>
                <Link
                  href={pillar.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
                >
                  {pillar.cta}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Series ── */}
      <section className="bg-stone-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Серии 2026
              </p>
              <h2 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
                Каталог доступных серий
              </h2>
            </div>
            <Link
              href="/pergolas"
              className="shrink-0 self-start text-sm font-medium text-stone-600 transition hover:text-stone-950 sm:self-auto"
            >
              Все серии →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {availablePergolas.map((product) => (
              <Link
                key={product.id}
                href={`/pergolas/${product.slug}`}
                className="group overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 transition hover:shadow-lg hover:shadow-stone-200/60 hover:ring-stone-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-stone-100">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                    {product.seriesName}
                  </p>
                  <h3 className="mt-1.5 text-lg font-medium text-stone-950">{product.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">{product.subtitle}</p>
                  <p className="mt-5 text-xs font-medium text-stone-400 transition duration-200 group-hover:text-stone-700">
                    Подробнее →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outdoor Applications ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Применение
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-light text-stone-950 sm:text-4xl">
            Для каких объектов
          </h2>
          <div className="mt-12 grid gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app, i) => (
              <div key={i} className="bg-white p-8">
                <h3 className="text-base font-medium text-stone-950">{app.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-500">{app.text}</p>
              </div>
            ))}
            <div className="flex items-end bg-stone-50 p-8">
              <Link
                href="/calculate"
                className="text-sm font-medium text-stone-700 transition hover:text-stone-950"
              >
                Обсудить проект →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering Details (dark) ── */}
      <section className="bg-stone-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Инженерная составляющая
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-light text-white sm:text-4xl">
            Система, а не просто навес
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringItems.map((item) => (
              <div key={item.num} className="border-t border-stone-800 pt-8">
                <span className="text-3xl font-light text-stone-700">{item.num}</span>
                <h3 className="mt-4 text-base font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Как это работает
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-light text-stone-950 sm:text-4xl">
            От проекта до поставки
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <span className="mt-0.5 shrink-0 text-sm font-medium tabular-nums text-stone-300">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base font-medium text-stone-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-500">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-stone-950 px-8 py-14 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-light text-white sm:text-4xl">
                Подобрать систему под проект
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-400">
                Подберём серию и конфигурацию из каталога, рассчитаем совместимые опции и стоимость поставки в Россию.
              </p>
            </div>
            <Link
              href="/calculate"
              className="mt-10 inline-flex shrink-0 rounded-full bg-white px-8 py-4 text-sm font-medium text-stone-950 transition hover:bg-stone-100 lg:mt-0"
            >
              Получить консультацию
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
