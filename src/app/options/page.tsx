import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { options } from "@/data/options";
import { products } from "@/data/pergolas";

export const metadata: Metadata = {
  title: "Опции и аксессуары UOGEL — ZIP-экраны, стекло, LED и автоматика",
  description:
    "Дополнительные системы для пергол UOGEL: ZIP-экраны, стеклянные панели, LED-подсветка, датчики, обогрев и автоматизация.",
  openGraph: {
    title: "Опции и аксессуары UOGEL",
    description:
      "ZIP-экраны, стеклянные системы, климат и автоматизация для пергол UOGEL.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Опции для пергол UOGEL",
      },
    ],
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  screens: "Защита от солнца и ветра",
  shutters: "Ставни и боковые ограждения",
  glass: "Остекление",
  climate: "Климат",
  automation: "Автоматизация и датчики",
  lighting: "Освещение",
};

const CATEGORY_ORDER = ["screens", "shutters", "glass", "climate", "automation", "lighting"];

function compatLabel(option: (typeof options)[number]): string {
  if (option.compatibility.all) return "Совместимо со всеми сериями";
  const n = option.compatibility.productIds.length;
  return `${n} ${n === 1 ? "серия" : n < 5 ? "серии" : "серий"}`;
}

export default function OptionsPage() {
  const grouped = CATEGORY_ORDER.flatMap((cat) => {
    const items = options.filter((o) => o.category === cat);
    return items.length > 0 ? [{ cat, label: CATEGORY_LABELS[cat] ?? cat, items }] : [];
  });

  const seriesList = products.map((p) => ({ id: p.id, name: p.seriesName, slug: p.slug }));

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-stone-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Аксессуары
          </p>
          <h1 className="max-w-3xl text-4xl font-light text-white sm:text-5xl">
            Опции и аксессуары UOGEL
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-400 sm:text-lg">
            Системы остекления, ZIP-экраны, освещение, климатические и автоматические
            решения для пергол UOGEL.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/pergolas"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Смотреть системы пергол
            </Link>
          </div>
        </div>
      </section>

      {/* ── Options by category ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Каталог опций
            </p>
            <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">
              Расширьте возможности системы
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
              Большинство опций рассчитываются по выбранной серии и совместимой
              конфигурации. Цена — по запросу.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {grouped.map(({ cat, label, items }) => (
              <div key={cat}>
                <h3 className="mb-8 text-xl font-medium text-stone-950">{label}</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((option) => (
                    <article
                      key={option.id}
                      className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-200/50"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                        {option.images[0] ? (
                          <Image
                            src={option.images[0]}
                            alt={option.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-sm text-stone-400">Фото будет добавлено</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                          {label}
                        </p>
                        <h4 className="mt-2 text-lg font-medium text-stone-950 transition-colors duration-200 group-hover:text-arch">
                          {option.title}
                        </h4>
                        <p className="mt-1 text-sm text-stone-500">{option.subtitle}</p>
                        <ul className="mt-3 space-y-1.5">
                          {option.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-stone-500">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" aria-hidden />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex items-center justify-between gap-3">
                          <span className="text-xs text-stone-400">{compatLabel(option)}</span>
                          <Link
                            href={`/options/${option.slug}`}
                            className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-arch"
                          >
                            Подробнее
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compatibility matrix ── */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Совместимость
            </p>
            <h2 className="text-3xl font-light text-stone-950 sm:text-4xl">
              Опции и серии
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
              Совместимость опций уточняется при расчёте конкретной конфигурации.
              Таблица — ориентировочная.
            </p>
          </div>
          <div className="mt-12 space-y-3">
            {options.map((opt) => {
              const compatIds = opt.compatibility.all
                ? seriesList.map((s) => s.id)
                : opt.compatibility.productIds;
              return (
                <div
                  key={opt.id}
                  className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 transition-colors duration-150 hover:bg-stone-50/50 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-stone-950">{opt.title}</p>
                    <p className="mt-0.5 text-xs text-stone-400">
                      {CATEGORY_LABELS[opt.category] ?? opt.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {seriesList.map((series) => {
                      const compatible = compatIds.includes(series.id);
                      return (
                        <span
                          key={series.id}
                          className={
                            "rounded-full px-3 py-1 text-xs font-medium " +
                            (compatible
                              ? "bg-stone-900 text-white"
                              : "bg-stone-100 text-stone-300")
                          }
                        >
                          {series.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light text-white sm:text-4xl">
              Рассчитать комплектацию
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-400">
              Укажите серию, размеры и нужные опции — подготовим техническую
              рекомендацию и расчёт стоимости.
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
