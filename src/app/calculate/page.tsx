import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Подобрать систему UOGEL",
  description: "Расскажите о вашем проекте — подберём подходящую систему UOGEL и подготовим расчёт по выбранной модели и комплектации.",
};

export default function CalculatePage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Проектная заявка
          </p>
          <h1 className="text-3xl font-light text-stone-950 sm:text-4xl">
            Подобрать систему UOGEL
          </h1>
          <p className="mt-5 text-base leading-8 text-stone-500 sm:text-lg">
            Расскажите о вашем проекте. Мы уточним параметры и подберём подходящую систему из доступных конфигураций.
          </p>
        </div>
        <div className="mt-12">
          <Quiz />
        </div>
      </div>
    </section>
  );
}
