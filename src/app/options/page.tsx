import Image from "next/image";
import type { Metadata } from "next";
import type { OptionCategory } from "@/types";
import { CTA } from "@/components/CTA";
import { Section } from "@/components/Section";
import { options } from "@/data/options";

export const metadata: Metadata = {
  title: "Опции для пергол UOGEL",
  description:
    "ZIP-экраны, стеклянные двери, алюминиевые ставни, потолочный вентилятор, обогреватель, датчики дождя и ветра для пергол UOGEL.",
};

const categoryLabel: Record<OptionCategory, string> = {
  screens: "Экраны",
  glass: "Стекло",
  shutters: "Ставни",
  lighting: "Освещение",
  climate: "Климат",
  automation: "Автоматика",
};

export default function OptionsPage() {
  return (
    <>
      <Section
        eyebrow="Комплектация"
        title="Опции и системы"
        description="Опции рассчитываются по выбранной серии и совместимости систем. Совместимость указана для каждой позиции."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <article key={option.id} className="rounded-3xl border border-stone-200 bg-white p-6">
              <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                <Image
                  src={option.images[0]}
                  alt={option.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-sm uppercase tracking-[0.16em] text-stone-500">
                {categoryLabel[option.category]}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-950">{option.title}</h2>
              <p className="mt-1 text-sm text-stone-500">{option.subtitle}</p>
              <p className="mt-3 leading-7 text-stone-600">{option.description}</p>
              <p className="mt-4 text-sm font-semibold text-stone-950">
                Стоимость:{" "}
                {option.priceType === "included"
                  ? "в базовой системе"
                  : option.priceType === "extra"
                  ? "дополнительно"
                  : "по запросу"}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Готовы посчитать проект?" className="pt-0">
        <CTA />
      </Section>
    </>
  );
}
