import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Section } from "@/components/Section";
import { options } from "@/data/options";
import { formatOptionCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Опции для пергол UOGEL",
  description:
    "ZIP-экраны, стеклянные двери, алюминиевые ставни, потолочный вентилятор, обогреватель, датчики дождя и ветра для пергол UOGEL.",
};

export default function OptionsPage() {
  return (
    <>
      <Section
        eyebrow="Комплектация"
        title="Опции и системы"
        description="Опции рассчитываются по выбранной серии и совместимости. Нажмите на карточку для подробного описания и проверки совместимости."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <Link
              key={option.id}
              href={`/options/${option.slug}`}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white transition hover:border-stone-400 hover:shadow-md"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={option.images[0]}
                  alt={option.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                  {formatOptionCategory(option.category)}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-stone-950 group-hover:text-stone-700">
                  {option.title}
                </h2>
                <p className="mt-1 text-sm text-stone-500">{option.subtitle}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">
                  {option.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-stone-950">
                  Стоимость:{" "}
                  <span className="font-normal text-stone-600">
                    {option.priceType === "included"
                      ? "в базовой системе"
                      : option.priceType === "extra"
                      ? "дополнительно"
                      : "по запросу"}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Готовы посчитать проект?" className="pt-0">
        <CTA />
      </Section>
    </>
  );
}
