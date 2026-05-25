import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/LeadForm";
import { getPergolaBySlug, pergolas } from "@/data/pergolas";
import { options } from "@/data/options";
import { formatSizeRange, formatSystemType, getCompatibleOptions } from "@/lib/catalog";

export function generateStaticParams() {
  return pergolas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getPergolaBySlug(slug);
  if (!product) return { title: "Пергола не найдена" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/pergolas/${product.slug}` },
    openGraph: {
      title: `${product.seo.title} | UOGEL Russia`,
      description: product.seo.description,
      url: `/pergolas/${product.slug}`,
      images: [{ url: product.images[0], alt: product.title }],
    },
  };
}

export default async function PergolaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getPergolaBySlug(slug);
  if (!product) notFound();

  const compatibleOptions = getCompatibleOptions(product, options);
  const sourcePage = "pergola:" + product.slug;

  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-stone-100 sm:min-h-[420px]">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              {product.seriesName}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl">{product.title}</h1>
            <p className="mt-2 text-xl text-stone-500">{product.subtitle}</p>
            <p className="mt-4 text-stone-500">
              {formatSystemType(product.systemType)} · {formatSizeRange(product.sizeRange)}
            </p>
            <p className="mt-6 text-lg leading-8 text-stone-600">{product.description}</p>
            <a
              href="#lead"
              className="mt-8 inline-flex w-fit rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Рассчитать эту серию
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <Info title="Где подходит" items={product.useCases} />
          <Info title="Базовая комплектация" items={product.baseEquipment} />
          <Info
            title="Доступные опции"
            items={compatibleOptions.length > 0 ? compatibleOptions.map((o) => o.title) : ["Уточняется по конфигурации"]}
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-stone-950">Доставка и сроки</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            Поставка организуется из Китая в Россию. Сроки производства, отгрузки, доставки и упаковка
            уточняются после выбора серии, размера и комплектации. Отдельно считаются доставка,
            монтажные работы и дополнительные опции.
          </p>
          <div className="mt-10">
            <CTA />
          </div>
        </div>
      </section>

      <section id="lead" className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LeadForm sourcePage={sourcePage} selectedPergolaId={product.id} />
        </div>
      </section>
    </>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-stone-950">{title}</h2>
      <ul className="mt-5 grid gap-3 text-stone-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
