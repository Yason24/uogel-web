import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия поставки пергол UOGEL в Россию",
  description: "Поставка биоклиматических пергол UOGEL из Китая в Россию. Маршрут, сроки производства, логистика, упаковка и состав комплектации.",
  alternates: { canonical: "/delivery" },
  openGraph: {
    title: "Условия поставки пергол UOGEL в Россию",
    description: "Маршрут, сроки, логистика и комплектация при поставке пергол UOGEL из Китая в Россию.",
    images: [{ url: "/images/og/uogel-og.jpg", width: 1200, height: 630, alt: "Поставка UOGEL в Россию" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Условия поставки пергол UOGEL в Россию",
    description: "Маршрут, сроки и логистика поставки пергол UOGEL из Китая.",
    images: ["/images/og/uogel-og.jpg"],
  },
};

const details = [
  {
    label: "Маршрут",
    body: "Системы поставляются с завода UOGEL в Китае. Маршрут и логистический оператор подбираются под конкретную партию и город получения.",
  },
  {
    label: "Сроки",
    body: "Срок производства — ориентировочно 15–25 рабочих дней. Финальный срок доставки зависит от города, загрузки маршрута и объёма партии. Точные сроки фиксируются при оформлении заказа.",
  },
  {
    label: "Упаковка",
    body: "Конструкции поставляются в заводской транспортной упаковке. Требования к разгрузке и хранению передаются вместе с технической документацией.",
  },
  {
    label: "Оплата",
    body: "Условия согласуются после выбора серии, конфигурации и расчёта стоимости. Как правило — предоплата для фиксации заказа на производстве.",
  },
];

const included = [
  "Базовая конструкция выбранной серии",
  "Профили, кровля, механизм управления",
  "Комплектация, согласованная в расчёте",
  "Крепёжные элементы по стандарту UOGEL",
];

const excluded = [
  "Доставка от таможни до объекта",
  "Монтажные работы",
  "Дополнительные опции (если не включены в заказ)",
  "Подготовительные работы на объекте",
  "Нестандартная логистика",
];

export default function DeliveryPage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Логистика</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-light text-stone-950 sm:text-4xl">
            Условия поставки
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-stone-500">
            Честное описание: финальные сроки и стоимость зависят от выбранной серии и маршрута.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-stone-100">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid gap-3 py-8 sm:grid-cols-[200px_1fr] sm:gap-10 sm:py-10"
              >
                <p className="text-sm font-medium text-stone-950">{item.label}</p>
                <p className="text-sm leading-7 text-stone-500">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Входит в стоимость
              </p>
              <ul className="mt-5 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-stone-100 text-center text-[10px] leading-4 text-stone-500">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Рассчитывается отдельно
              </p>
              <ul className="mt-5 space-y-3">
                {excluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone-500">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-stone-100 text-center text-[10px] leading-4 text-stone-400">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Следующий шаг
          </p>
          <h2 className="mt-4 text-2xl font-light text-white sm:text-3xl">
            Обсудить поставку для вашего объекта
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-stone-400">
            Подберём серию, конфигурацию и подготовим расчёт с учётом комплектации и логистики.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/how-to-order"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Как проходит работа
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
