import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/LeadForm";
import { getPergolaBySlug, pergolas } from "@/data/pergolas";

export function generateStaticParams() { return pergolas.map((pergola) => ({ slug: pergola.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const pergola = getPergolaBySlug(slug); return { title: pergola?.seoTitle ?? "Пергола UOGEL", description: pergola?.seoDescription ?? "Расчет биоклиматической перголы UOGEL." }; }

export default async function PergolaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pergola = getPergolaBySlug(slug);
  if (!pergola) notFound();
  const sourcePage = "pergola:" + pergola.slug;
  return (
    <>
      <section className="bg-white py-12 sm:py-16"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-stone-100"><Image src={pergola.images[0]} alt={pergola.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div><div className="flex flex-col justify-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{pergola.type === "wall-mounted" ? "Пристенная" : "Отдельно стоящая"}</p><h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl">{pergola.title}</h1><p className="mt-5 text-xl text-stone-600">Размер: {pergola.size}</p><p className="mt-6 text-lg leading-8 text-stone-600">{pergola.description}</p><a href="#lead" className="mt-8 inline-flex w-fit rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white">Рассчитать эту модель</a></div></div></section>
      <section className="py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8"><Info title="Где подходит" items={pergola.useCases} /><Info title="Базовая комплектация" items={pergola.baseEquipment} /><Info title="Доступные опции" items={pergola.availableOptions} /></div></section>
      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-semibold text-stone-950">Доставка и сроки</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Поставка организуется из Китая в Россию. Сроки производства, отгрузки, доставки и упаковка уточняются после выбора модели, размера и комплектации. Отдельно считаются доставка, монтажные работы и дополнительные опции.</p><div className="mt-10"><CTA /></div></div></section>
      <section id="lead" className="py-16"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><LeadForm sourcePage={sourcePage} selectedPergolaId={pergola.id} /></div></section>
    </>
  );
}
function Info({ title, items }: { title: string; items: string[] }) { return <div className="rounded-3xl border border-stone-200 bg-white p-6"><h2 className="text-xl font-semibold text-stone-950">{title}</h2><ul className="mt-5 grid gap-3 text-stone-600">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>; }
