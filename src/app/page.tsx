import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PergolaCard } from "@/components/PergolaCard";
import { Section } from "@/components/Section";
import { availablePergolas } from "@/data/pergolas";

export const metadata: Metadata = {
  title: "UOGEL Russia — биоклиматические перголы с поставкой в Россию",
  description:
    "Подбираем биоклиматическую перголу UOGEL из доступных серий, рассчитываем комплектацию с LED, ZIP-экранами, стеклом и автоматикой.",
  openGraph: {
    title: "UOGEL Russia — биоклиматические перголы",
    description:
      "Подбираем модель из доступных серий, рассчитываем комплектацию, уточняем поставку в ваш город.",
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

const trustItems = ["6 серий в каталоге", "Поставка по России", "Расчет бесплатно"];

const steps: [string, string, string][] = [
  ["01", "Подбор серии", "Изучаем объект, выбираем подходящую серию и конфигурацию из каталога UOGEL."],
  ["02", "Комплектация", "Добавляем боковые системы, свет, автоматику, цвет профиля и другие совместимые опции."],
  ["03", "Расчет поставки", "Фиксируем город, условия логистики, монтажные вводные и готовим итоговый расчет."],
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-50">
        <div
          className="pointer-events-none absolute -right-64 -top-64 h-[700px] w-[700px] rounded-full bg-stone-200/50 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center rounded-full bg-stone-200 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-stone-600">
              UOGEL Russia
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.15] text-stone-950 sm:text-5xl lg:text-6xl">
              Биоклиматические перголы UOGEL в России
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
              Подбираем подходящую серию из каталога UOGEL. Рассчитываем комплектацию: LED, ZIP-экраны, стекло и автоматика.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/calculate"
                className="rounded-full bg-stone-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition hover:bg-stone-800"
              >
                Получить консультацию
              </Link>
              <Link
                href="/pergolas"
                className="rounded-full border border-stone-300 px-7 py-3.5 text-sm font-semibold text-stone-950 transition hover:border-stone-950"
              >
                Смотреть каталог
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-500">
              {trustItems.map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-stone-200 shadow-2xl shadow-stone-300 ring-1 ring-stone-900/5 lg:min-h-[540px]">
            <Image
              src="/images/hero/hero-main.jpg"
              alt="Биоклиматическая пергола UOGEL"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <Section
        eyebrow="Каталог"
        title="Доступные серии для расчета"
        description="Только реальные серии UOGEL из каталога 2026. Каждая модель — конкретная система с базовой комплектацией и набором опций."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {availablePergolas.map((product) => (
            <PergolaCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Как работает</p>
          <h2 className="max-w-2xl text-3xl font-semibold text-stone-950 sm:text-4xl">Три шага до готового расчета</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <article
                key={number}
                className="rounded-3xl border border-stone-200 p-8 transition hover:border-stone-300 hover:shadow-sm"
              >
                <span className="text-3xl font-semibold text-stone-200">{number}</span>
                <h3 className="mt-4 text-xl font-semibold text-stone-950">{title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section title="Готовы посчитать проект?" className="pt-0">
        <CTA />
      </Section>
    </>
  );
}
