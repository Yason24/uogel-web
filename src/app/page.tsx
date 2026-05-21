import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { PergolaCard } from "@/components/PergolaCard";
import { Section } from "@/components/Section";
import { availablePergolas } from "@/data/pergolas";

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              UOGEL Russia
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-stone-950 sm:text-6xl">
              Биоклиматические перголы UOGEL доступных размеров
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              Подберем модель из каталога, посчитаем комплектацию с LED,
              ZIP-шторами, стеклом и автоматикой, уточним поставку в ваш город.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/calculate"
                className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Получить расчет
              </Link>
              <Link
                href="/pergolas"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:border-stone-950"
              >
                Смотреть каталог
              </Link>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-stone-100 shadow-2xl shadow-stone-200 lg:min-h-[520px]">
            <Image
              src="https://www.uogele.com/uploads/44532/aluminium-gazebo-with-louvered-roofaff93.jpg"
              alt="Биоклиматическая пергола UOGEL"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Каталог"
        title="Модели для первого расчета"
        description="В MVP показываем только доступные типовые размеры, чтобы расчет был привязан к реальной модели и комплектации."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {availablePergolas.map((pergola) => (
            <PergolaCard key={pergola.id} pergola={pergola} />
          ))}
        </div>
      </Section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["01", "Подбор размера", "Сравниваем объект с доступными размерами UOGEL и выбираем подходящую модель."],
            ["02", "Комплектация", "Добавляем боковые системы, свет, автоматику, цвет профиля и другие совместимые опции."],
            ["03", "Расчет поставки", "Фиксируем город, условия логистики, монтажные вводные и готовим итоговый расчет."],
          ].map(([number, title, text]) => (
            <article key={number} className="rounded-3xl border border-stone-200 p-6">
              <span className="text-sm font-semibold text-stone-500">{number}</span>
              <h2 className="mt-4 text-2xl font-semibold text-stone-950">{title}</h2>
              <p className="mt-3 leading-7 text-stone-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <Section title="Готовы посчитать проект?" className="pt-0">
        <CTA />
      </Section>
    </>
  );
}
