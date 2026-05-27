import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { LeadForm } from "@/components/LeadForm";
import { getPergolaBySlug, pergolas } from "@/data/pergolas";
import { options } from "@/data/options";
import { formatSystemType, formatDrive } from "@/lib/catalog";
import { TechnicalSection } from "@/components/product/specs/TechnicalSection";
import { TechnicalTable } from "@/components/product/specs/TechnicalTable";
import { ColorSwatches } from "@/components/product/specs/ColorSwatches";
import { SizeConfigurations } from "@/components/product/specs/SizeConfigurations";
import { CompatibilityList } from "@/components/product/specs/CompatibilityList";
import { TechnicalDiagramCard } from "@/components/product/TechnicalDiagramCard";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function generateStaticParams() {
  return pergolas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getPergolaBySlug(slug);
  if (!product) return { title: "Пергола не найдена" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uogel-russia.ru";
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/pergolas/${product.slug}` },
    openGraph: {
      title: `${product.seo.title} | UOGEL Russia`,
      description: product.seo.description,
      url: `/pergolas/${product.slug}`,
      images: [
        {
          url: product.images[0].startsWith("http")
            ? product.images[0]
            : `${siteUrl}${product.images[0]}`,
          width: 1200,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${product.seo.title} | UOGEL Russia`,
      description: product.seo.description,
      images: [
        product.images[0].startsWith("http")
          ? product.images[0]
          : `${siteUrl}${product.images[0]}`,
      ],
    },
  };
}

export default async function PergolaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getPergolaBySlug(slug);
  if (!product) notFound();

  const sourcePage = "pergola:" + product.slug;

  const specRows = [
    { label: "Профиль стойки", value: product.specs.post },
    { label: "Балка / водосток", value: product.specs.beam },
    { label: "Профиль ламели", value: product.specs.blade },
    { label: "Угол поворота ламелей", value: product.specs.rotationAngle },
    { label: "Материал", value: product.specs.material },
    { label: "Водоотвод", value: product.specs.waterDrainage ? "Интегрированный" : "—" },
    { label: "LED подсветка", value: product.specs.led },
    { label: "Привод", value: formatDrive(product.drive) },
    { label: "Степень защиты (IP)", value: product.specs.ipRating },
  ];

  const lifestyleSpecs: Array<[string, string]> = [
    ["Профиль стойки", product.specs.post],
    ["Ламели", product.specs.blade],
    ...(product.specs.beam ? [["Балка", product.specs.beam] as [string, string]] : []),
    ["Водоотвод", product.specs.waterDrainage ? "Интегрированный через стойки" : "—"],
    ...(product.specs.led ? [["LED подсветка", product.specs.led] as [string, string]] : []),
  ];

  const siteUrlForSchema = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uogel-russia.ru";
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.seo.description,
    image: product.images[0].startsWith("http")
      ? product.images[0]
      : `${siteUrlForSchema}${product.images[0]}`,
    brand: { "@type": "Brand", name: "UOGEL" },
    url: `${siteUrlForSchema}/pergolas/${product.slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "RUB",
      seller: { "@type": "Organization", name: "UOGEL Russia" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrlForSchema },
      { "@type": "ListItem", position: 2, name: "Перголы", item: `${siteUrlForSchema}/pergolas` },
      { "@type": "ListItem", position: 3, name: product.seriesName, item: `${siteUrlForSchema}/pergolas/${product.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema]) }}
      />
      {/* ── Hero ── */}
      <section className="relative min-h-[56vh] overflow-hidden bg-stone-950 lg:min-h-[68vh]">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-950/35 to-stone-950/10" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
          <nav className="mb-5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/pergolas" className="transition-colors hover:text-stone-300">
              Перголы
            </Link>
            <span aria-hidden>·</span>
            <span className="text-stone-400">{product.seriesName}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-stone-800/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-stone-300 backdrop-blur-sm">
              {product.seriesName}
            </span>
            <span className="rounded-full border border-stone-700/80 px-3 py-1 text-xs font-medium text-stone-400">
              {formatSystemType(product.systemType)}
            </span>
            <span className="rounded-full border border-stone-700/80 px-3 py-1 text-xs font-medium text-stone-400">
              {product.category === "bioclimatic" ? "Биоклиматическая" : "Ламельная"}
            </span>
            {product.drive === "both" && (
              <span className="rounded-full border border-stone-700/80 px-3 py-1 text-xs font-medium text-stone-400">
                Мотор / ручное управление
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-light text-white sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-3 text-lg text-stone-300">{product.subtitle}</p>
          <p className="mt-2 text-sm text-stone-500">
            Профиль {product.specs.post}
            {product.specs.waterDrainage ? " · Интегрированный водоотвод" : ""}
            {product.specs.led ? ` · LED ${product.specs.led}` : ""}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Подобрать систему
            </Link>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-stone-600 sm:text-lg">{product.description}</p>
            <p className="mt-5 text-sm leading-6 text-stone-400">
              Перед заказом уточняем размеры, опции, цвет профиля и условия поставки.
            </p>
          </div>
        </div>
      </section>

      {/* ── Технические характеристики ── */}
      <TechnicalSection
        eyebrow="Характеристики"
        title="Технические характеристики"
        background="stone"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <TechnicalTable rows={specRows} />
          <div className="grid gap-4 content-start sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
            <ProfileDimCard label="Стойка" value={product.specs.post} />
            {product.specs.beam ? (
              <ProfileDimCard label="Балка" value={product.specs.beam} />
            ) : (
              <ProfileDimCard label="Балка" value={null} />
            )}
            <ProfileDimCard label="Ламель" value={product.specs.blade} />
          </div>
        </div>
      </TechnicalSection>

      {/* ── Базовая комплектация ── */}
      <TechnicalSection eyebrow="Комплектация" title="Базовая комплектация">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {product.baseEquipment.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </TechnicalSection>

      {/* ── Размеры и конфигурации ── */}
      <TechnicalSection
        eyebrow="Размеры"
        title="Размеры и конфигурации"
        background="stone"
      >
        <SizeConfigurations sizeRange={product.sizeRange} />
      </TechnicalSection>

      {/* ── Цвета профиля ── */}
      <TechnicalSection eyebrow="Цвета" title="Цвета профиля">
        <ColorSwatches colors={product.profileColors} />
      </TechnicalSection>

      {/* ── Управление и автоматика ── */}
      <TechnicalSection
        eyebrow="Управление"
        title="Управление и автоматика"
        background="stone"
      >
        {product.drive === "both" ? (
          <DriveVariants hasAutomation={product.compatibleOptions.includes("rain-wind-sensors")} />
        ) : (
          <SingleDrive
            drive={product.drive}
            hasAutomation={product.compatibleOptions.includes("rain-wind-sensors")}
          />
        )}
      </TechnicalSection>

      {/* ── Совместимые опции ── */}
      {product.compatibleOptions.length > 0 && (
        <TechnicalSection
          eyebrow="Опции"
          title="Совместимые опции"
          description="Совместимость уточняется при расчёте конкретной конфигурации."
        >
          <CompatibilityList product={product} allOptions={options} />
        </TechnicalSection>
      )}

      {/* ── Lifestyle + Engineering ── */}
      {product.images.length > 1 ? (
        <section className="overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[340px] sm:min-h-[460px] lg:min-h-[540px]">
              <Image
                src={product.images[1]}
                alt={`${product.title} — пример установки`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center bg-stone-950 px-8 py-14 sm:px-12 sm:py-16 lg:py-20">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Инженерные решения
              </p>
              <h2 className="mt-4 text-2xl font-light text-white sm:text-3xl">
                Архитектура системы
              </h2>
              <dl className="mt-8 divide-y divide-stone-800">
                {lifestyleSpecs.map(([dt, dd]) => (
                  <div key={dt} className="flex items-center justify-between gap-4 py-3.5">
                    <dt className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">{dt}</dt>
                    <dd className="text-sm text-stone-200">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {product.images.length > 2 && (
            <div className="grid gap-px bg-stone-200 sm:grid-cols-2">
              {product.images.slice(2).map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={`${product.title} — фото ${i + 3}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MediaPlaceholder
              label="Дополнительные фото серии будут добавлены"
              className="min-h-[120px]"
            />
          </div>
        </section>
      )}

      {/* ── Чертежи и схемы ── */}
      {product.diagrams && product.diagrams.length > 0 && (
        <TechnicalSection
          eyebrow="Документация"
          title="Чертежи и схемы"
          description="Технические данные из официального каталога UOGEL 2026."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.diagrams.map((diagram) => (
              <TechnicalDiagramCard
                key={diagram.src}
                src={diagram.src}
                caption={diagram.caption}
              />
            ))}
          </div>
        </TechnicalSection>
      )}

      {/* ── Где подходит ── */}
      <TechnicalSection eyebrow="Применение" title="Где подходит">
        <div className="flex flex-wrap gap-3">
          {product.useCases.map((uc) => (
            <span
              key={uc}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700"
            >
              {uc}
            </span>
          ))}
        </div>
      </TechnicalSection>

      {/* ── Доставка и CTA ── */}
      <section className="bg-stone-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-stone-950">Доставка и сроки</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">
            Поставка организуется из Китая в Россию. Сроки производства, отгрузки и
            доставки уточняются после выбора серии, размера и комплектации.
          </p>
          <div className="mt-8">
            <CTA />
          </div>
        </div>
      </section>

      {/* ── Форма заявки ── */}
      <section id="lead" className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LeadForm sourcePage={sourcePage} selectedPergolaId={product.id} />
        </div>
      </section>
    </>
  );
}

// ── Inline helpers ──────────────────────────────────────────────────────────

function ProfileDimCard({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">{label}</p>
      {value ? (
        <p className="mt-2 text-xl font-medium text-stone-950">{value}</p>
      ) : (
        <p className="mt-2 text-sm text-stone-400">Данные уточняются</p>
      )}
    </div>
  );
}

function DriveVariants({ hasAutomation }: { hasAutomation: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
          Серия C4 / C4-S
        </p>
        <p className="mt-3 text-lg font-medium text-stone-950">Моторизованная</p>
        <p className="mt-2 text-sm text-stone-600">
          Электропривод с пультом управления.
          {hasAutomation && " Совместима с датчиками дождя и ветра."}
        </p>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
          Серия M4 / M4-S
        </p>
        <p className="mt-3 text-lg font-medium text-stone-950">Ручное управление</p>
        <p className="mt-2 text-sm text-stone-600">
          Управление ламелями вручную. Надёжное решение без автоматики.
        </p>
      </div>
    </div>
  );
}

function SingleDrive({
  drive,
  hasAutomation,
}: {
  drive: "motorized" | "manual" | "both";
  hasAutomation: boolean;
}) {
  const isMotorized = drive === "motorized";
  return (
    <div className="max-w-xl rounded-2xl border border-stone-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">Привод</p>
      <p className="mt-3 text-lg font-medium text-stone-950">
        {isMotorized ? "Моторизованная" : "Ручное управление"}
      </p>
      <p className="mt-2 text-sm text-stone-600">
        {isMotorized
          ? `Электропривод с пультом управления.${hasAutomation ? " Совместима с датчиками дождя и ветра." : ""}`
          : "Управление ламелями вручную. Надёжное решение без автоматики."}
      </p>
    </div>
  );
}
