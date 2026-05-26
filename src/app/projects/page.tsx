import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  projects,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  type Project,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Проекты и применения UOGEL — примеры конфигураций",
  description:
    "Примеры конфигураций outdoor-систем UOGEL для частных террас, ресторанов, отелей, rooftop-пространств и зон у бассейна.",
  openGraph: {
    title: "Проекты и применения UOGEL",
    description:
      "Примеры конфигураций систем UOGEL для частной и коммерческой архитектуры.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Проекты UOGEL",
      },
    ],
  },
};

export default function ProjectsPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    label: CATEGORY_LABELS[cat],
    items: projects.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] overflow-hidden bg-stone-950 lg:min-h-[62vh]">
        <Image
          src="/images/gallery/gallery-4x6-restaurant.webp"
          alt="Проекты UOGEL — применения outdoor-систем"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/10" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Проекты
          </p>
          <h1 className="max-w-3xl text-4xl font-light text-white sm:text-5xl">
            Проекты и применения UOGEL
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-400 sm:text-lg">
            Outdoor-системы для частной и коммерческой архитектуры: частные террасы,
            рестораны, отели, rooftop-пространства и зоны у бассейна.
          </p>
          <p className="mt-4 text-sm text-stone-600">
            Все представленные конфигурации обозначены как «Пример применения» —
            реальные объекты будут добавляться по мере реализации проектов в России.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Получить консультацию
            </Link>
            <Link
              href="/pergolas"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
            >
              Каталог серий
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category sections ── */}
      {grouped.map(({ cat, label, items }, idx) => (
        <section
          key={cat}
          id={cat}
          className={idx % 2 === 0 ? "bg-white py-20 sm:py-28" : "bg-stone-50 py-20 sm:py-28"}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-light text-stone-950 sm:text-3xl">{label}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Bottom CTA ── */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light text-white sm:text-4xl">
              Подобрать систему под ваш объект
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-400">
              Подберём серию и конфигурацию из каталога UOGEL 2026, рассчитаем совместимые опции и стоимость поставки.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/calculate"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
              >
                Получить консультацию
              </Link>
              <Link
                href="/catalog"
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
              >
                Смотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 transition-shadow duration-300 hover:shadow-xl hover:shadow-stone-200/60 hover:ring-stone-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-stone-400">Фото будет добавлено</span>
          </div>
        )}
        {project.isConceptReference && (
          <span className="absolute left-3 top-3 rounded-full bg-stone-950/65 px-2.5 py-1 text-xs font-medium text-stone-300 backdrop-blur-sm">
            Пример применения
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            {project.series}
          </p>
          <p className="shrink-0 text-xs text-stone-400">{project.type}</p>
        </div>
        <h3 className="mt-2 text-lg font-light text-stone-950">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
          {project.description}
        </p>
        {project.optionLabels.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.optionLabels.map((opt) => (
              <span
                key={opt}
                className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500"
              >
                {opt}
              </span>
            ))}
          </div>
        )}
        <p className="mt-5 text-xs font-medium text-stone-400 transition-colors duration-200 group-hover:text-arch">
          Подробнее →
        </p>
      </div>
    </Link>
  );
}
