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

  const extraImages = product.images.slice(1);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-stone-100 sm:min-h-[480px]">
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
                {product.seriesName}
              </span>
              {product.drive === "both" && (
                <span className="rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold text-stone-500">
                  Мотор / ручное управление
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-2 text-xl text-stone-500">{product.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700">
                {formatSystemType(product.systemType)}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700">
                {product.category === "bioclimatic" ? "Биоклиматическая" : "Ламельная"}
              </span>
            </div>
            <p className="mt-6 text-lg leading-8 text-stone-600">{product.description}</p>
            <Link
              href="/calculate"
              className="mt-8 inline-flex w-fit rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Подобрать систему
            </Link>
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

      {/* ── Галерея ── */}
      <TechnicalSection eyebrow="Галерея" title="Фотографии" background="stone">
        {extraImages.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extraImages.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100"
              >
                <Image
                  src={src}
                  alt={`${product.title} — фото ${i + 2}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-3xl border border-dashed border-stone-200 bg-white">
            <p className="text-sm text-stone-400">Фото будет добавлено</p>
          </div>
        )}
      </TechnicalSection>

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
          <h2 className="text-2xl font-semibold text-stone-950">Доставка и сроки</h2>
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
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">{label}</p>
      {value ? (
        <p className="mt-2 text-xl font-semibold text-stone-950">{value}</p>
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
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          Серия C4 / C4-S
        </p>
        <p className="mt-3 text-lg font-semibold text-stone-950">Моторизованная</p>
        <p className="mt-2 text-sm text-stone-600">
          Электропривод с пультом управления.
          {hasAutomation && " Совместима с датчиками дождя и ветра."}
        </p>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          Серия M4 / M4-S
        </p>
        <p className="mt-3 text-lg font-semibold text-stone-950">Ручное управление</p>
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
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Привод</p>
      <p className="mt-3 text-lg font-semibold text-stone-950">
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
