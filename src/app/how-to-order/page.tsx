import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как заказать перголу UOGEL в России — 7 этапов работы",
  description: "Семь этапов от первой консультации до монтажа: подбор серии из каталога UOGEL 2026, согласование конфигурации, производство и поставка в Россию.",
  alternates: { canonical: "/how-to-order" },
  openGraph: {
    title: "Как заказать перголу UOGEL в России — 7 этапов работы",
    description: "От первой консультации до монтажа: подбор серии, производство, поставка.",
    images: [{ url: "/images/og/uogel-og.jpg", width: 1200, height: 630, alt: "Заказ перголы UOGEL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Как заказать перголу UOGEL в России",
    description: "Семь этапов от консультации до монтажа перголы UOGEL.",
    images: ["/images/og/uogel-og.jpg"],
  },
};

const steps = [
  {
    title: "Консультация",
    body: "Уточняем тип объекта, сценарий использования и основные требования к системе: площадь, степень автоматизации, климатические условия.",
  },
  {
    title: "Подбор серии",
    body: "Выбираем подходящую серию из каталога UOGEL 2026 по параметрам объекта. Сравниваем профиль стойки, привод и стандартные конфигурации.",
  },
  {
    title: "Техническое согласование",
    body: "Определяем конкретную конфигурацию: ширину, длину, вылет, опции — боковое остекление, экраны, вентиляция, датчики.",
  },
  {
    title: "Заказ и оплата",
    body: "Согласуем условия, подтверждаем комплектацию и договариваемся о порядке оплаты. Предоплата фиксирует заказ на производстве.",
  },
  {
    title: "Производство",
    body: "Завод UOGEL изготавливает систему. Ориентировочный срок производства — 15–25 рабочих дней; точный срок уточняется при заказе.",
  },
  {
    title: "Доставка",
    body: "Логистика из Китая до объекта. Маршрут и финальный срок зависят от города и партии. Сопровождаем партию на всём пути.",
  },
  {
    title: "Монтаж и поддержка",
    body: "Предоставляем техническую документацию для монтажной бригады. При необходимости — консультируем по нюансам установки.",
  },
];

export default function HowToOrderPage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Процесс</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-light text-stone-950 sm:text-4xl">
            Как проходит работа
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-stone-500">
            Семь этапов — от первого обращения до готовой системы на объекте.
          </p>

          <div className="mt-14 divide-y divide-stone-100">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="grid gap-4 py-8 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-10"
              >
                <span className="text-3xl font-light tabular-nums text-stone-200 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-lg font-medium text-stone-950">{step.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-500">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Начать проект
          </p>
          <h2 className="mt-4 text-2xl font-light text-white sm:text-3xl">
            Обсудите подходящую систему
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-stone-400">
            Расскажите об объекте — подберём серию и конфигурацию из каталога UOGEL 2026.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/contacts"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
