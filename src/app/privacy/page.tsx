import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности сайта UOGEL Russia — порядок сбора, хранения и использования персональных данных.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "Какие данные мы собираем",
    body: "При заполнении формы заявки мы запрашиваем имя, номер телефона и по желанию — мессенджер, город и комментарий к проекту. Эти данные используются исключительно для связи с вами по поводу вашего запроса.",
  },
  {
    title: "Как используются данные",
    body: "Данные используются только для обработки вашей заявки: чтобы связаться с вами, уточнить параметры проекта и подготовить техническую рекомендацию. Мы не продаём, не передаём и не публикуем ваши персональные данные.",
  },
  {
    title: "Хранение данных",
    body: "Заявки сохраняются в защищённой базе данных на сервере в России. Данные хранятся в течение срока, необходимого для обработки запроса и исполнения возможных договорных обязательств.",
  },
  {
    title: "Cookies и аналитика",
    body: "Сайт может использовать технические cookies, необходимые для его корректной работы. При наличии аналитических инструментов (Яндекс Метрика, Google Analytics) данные о посещаемости собираются в обезличенном виде для улучшения работы сайта.",
  },
  {
    title: "Ваши права",
    body: "Вы вправе запросить доступ, исправление или удаление ваших персональных данных. Для этого напишите нам в Telegram: @uogel_russia или оставьте заявку через форму на странице контактов.",
  },
  {
    title: "Изменения в политике",
    body: "Мы можем обновлять настоящую политику. Актуальная версия всегда доступна на этой странице. Дата последнего обновления указана внизу страницы.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Правовая информация</p>
          <h1 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
            Политика конфиденциальности
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-500">
            Настоящая политика описывает, как UOGEL Russia обрабатывает персональные данные,
            собираемые через сайт при оформлении заявки на подбор и поставку пергол.
          </p>

          <div className="mt-12 divide-y divide-stone-100">
            {sections.map((s) => (
              <div key={s.title} className="py-8">
                <h2 className="text-base font-medium text-stone-950">{s.title}</h2>
                <p className="mt-3 text-sm leading-7 text-stone-500">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-stone-400">
            Последнее обновление: май 2026
          </p>

          <div className="mt-8">
            <Link
              href="/contacts"
              className="text-sm font-medium text-stone-700 transition-colors duration-200 hover:text-arch"
            >
              ← Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
