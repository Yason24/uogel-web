import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия использования",
  description: "Условия использования сайта UOGEL Russia — ограничения ответственности, характер информации, порядок взаимодействия.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "Характер информации",
    body: "Материалы сайта носят информационный характер. Технические характеристики, конфигурации и параметры серий UOGEL приведены по каталогу 2026 и могут быть изменены производителем. Актуальные параметры уточняются при оформлении заявки.",
  },
  {
    title: "Цены и сроки",
    body: "Сайт не содержит фиксированных цен. Стоимость поставки зависит от выбранной серии, конфигурации, опций и логистики — рассчитывается индивидуально после консультации. Сроки производства и доставки указываются ориентировочно и уточняются при оформлении заказа.",
  },
  {
    title: "Ограничение ответственности",
    body: "UOGEL Russia не несёт ответственности за ущерб, возникший в результате использования или невозможности использования информации сайта. Мы прилагаем усилия для точности данных, однако не гарантируем их полную актуальность в любой момент.",
  },
  {
    title: "Интеллектуальная собственность",
    body: "Все материалы сайта — тексты, изображения, структура — являются собственностью UOGEL Russia или используются на основании соглашений с правообладателями. Копирование без письменного разрешения не допускается.",
  },
  {
    title: "Ссылки",
    body: "Сайт может содержать ссылки на ресурсы третьих лиц. UOGEL Russia не контролирует содержание внешних сайтов и не несёт ответственности за их работу.",
  },
  {
    title: "Применимое право",
    body: "Использование сайта регулируется законодательством Российской Федерации. Все споры рассматриваются в порядке, предусмотренном действующим законодательством.",
  },
];

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Правовая информация</p>
          <h1 className="mt-4 text-3xl font-light text-stone-950 sm:text-4xl">
            Условия использования
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-500">
            Используя сайт UOGEL Russia, вы принимаете изложенные ниже условия.
            Если вы не согласны с ними, пожалуйста, не используйте сайт.
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

          <div className="mt-8 flex flex-wrap gap-5">
            <Link
              href="/privacy"
              className="text-sm font-medium text-stone-700 transition-colors duration-200 hover:text-arch"
            >
              Политика конфиденциальности →
            </Link>
            <Link
              href="/contacts"
              className="text-sm font-medium text-stone-700 transition-colors duration-200 hover:text-arch"
            >
              Контакты →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
