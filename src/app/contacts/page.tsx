import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Контакты UOGEL Russia",
  description: "Свяжитесь с нами для расчёта поставки перголы UOGEL в Россию. Ответим в течение рабочего дня.",
  openGraph: {
    title: "Контакты UOGEL Russia",
    description: "Форма для расчёта и вопросов по поставке пергол UOGEL в Россию.",
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

export default function ContactsPage() {
  return (
    <main>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Контакты</p>
          <h1 className="mt-4 max-w-xl text-3xl font-light text-stone-950 sm:text-4xl">
            Обсудим ваш проект
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-stone-500">
            Напишите в удобный мессенджер или оставьте заявку — ответим в течение рабочего дня.
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  Telegram
                </p>
                <a
                  href="https://t.me/uogel_russia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-lg font-medium text-stone-950 transition-colors duration-200 hover:text-arch"
                >
                  @uogel_russia
                </a>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Быстрый ответ, удобно отправить фото объекта и обсудить детали.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  Чем можем помочь
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                  {[
                    "Подобрать серию под объект и бюджет",
                    "Рассчитать комплектацию и стоимость",
                    "Ответить на технические вопросы",
                    "Уточнить сроки и условия поставки",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-arch">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <LeadForm sourcePage="contacts" />
          </div>
        </div>
      </section>
    </main>
  );
}
