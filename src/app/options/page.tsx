import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { pergolaOptions } from "@/data/options";

export const metadata: Metadata = { title: "Опции для пергол UOGEL", description: "LED-подсветка, ZIP-шторы, стеклянные панели, моторизация, датчики, цвет профиля и водоотвод для пергол UOGEL." };
export default function OptionsPage() {
  return <Section eyebrow="Комплектация" title="Опции и комплектующие" description="Опции рассчитываются по выбранной модели и совместимости систем."><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{pergolaOptions.map((option) => <article key={option.id} className="rounded-3xl border border-stone-200 bg-white p-6"><div className="relative h-52 w-full overflow-hidden rounded-2xl"><Image src={option.images[0]} alt={option.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" /></div><p className="mt-5 text-sm uppercase tracking-[0.16em] text-stone-500">{option.category}</p><h2 className="mt-2 text-2xl font-semibold text-stone-950">{option.title}</h2><p className="mt-3 leading-7 text-stone-600">{option.description}</p><p className="mt-4 text-sm font-semibold text-stone-950">Стоимость: {option.priceType === "included" ? "в базовой системе" : option.priceType === "extra" ? "дополнительно" : "по запросу"}</p></article>)}</div></Section>;
}
