import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, CATEGORY_LABELS } from "@/data/projects";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { PageViewTracker } from "@/components/ui/PageViewTracker";
import { EVENTS } from "@/lib/analytics";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Проект не найден" };

  return {
    title: `${project.title} — Проекты UOGEL Russia`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | UOGEL Russia`,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: project.images[0]
        ? [{ url: project.images[0], alt: project.title }]
        : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const extraImages = project.images.slice(1);

  return (
    <>
      <PageViewTracker
        event={EVENTS.PROJECT_OPEN}
        params={{ slug: project.slug, title: project.title, category: project.category }}
      />
      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] overflow-hidden bg-stone-950 lg:min-h-[62vh]">
        {project.images[0] && (
          <>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/10" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-32">
          <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/projects" className="transition-colors hover:text-stone-300">
              Проекты
            </Link>
            <span aria-hidden>·</span>
            <span className="text-stone-400">{CATEGORY_LABELS[project.category]}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-stone-800 px-3 py-1 text-xs font-medium text-stone-300">
              {project.type}
            </span>
            {project.isConceptReference && (
              <span className="rounded-full border border-stone-700 px-3 py-1 text-xs font-medium text-stone-500">
                Пример применения
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-light text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-sm text-stone-400">{project.specs}</p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Description */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Описание
              </p>
              <p className="mt-4 text-base leading-8 text-stone-600 sm:text-lg">
                {project.description}
              </p>
              {project.isConceptReference && (
                <p className="mt-5 text-sm leading-6 text-stone-400">
                  Конфигурация является примером применения. Реальные размеры, опции и параметры согласовываются индивидуально под объект.
                </p>
              )}
            </div>

            {/* Series + options */}
            <div className="space-y-6">
              {/* Series card */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  Серия
                </p>
                <Link
                  href={`/pergolas/${project.seriesSlug}`}
                  className="group mt-3 flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-5 py-4 transition-colors hover:border-stone-300 hover:bg-white"
                >
                  <div>
                    <p className="text-sm font-medium text-stone-950">
                      UOGEL {project.series}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Смотреть технические характеристики
                    </p>
                  </div>
                  <span className="text-stone-400 transition-colors group-hover:text-arch">
                    →
                  </span>
                </Link>
              </div>

              {/* Options */}
              {project.optionLabels.length > 0 && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                    Опции в конфигурации
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.optionLabels.map((opt) => (
                      <span
                        key={opt}
                        className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                  Параметры
                </p>
                <p className="mt-3 text-sm text-stone-600">{project.specs}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Extra images ── */}
      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {extraImages.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {extraImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — фото ${i + 2}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <MediaPlaceholder label="Дополнительные фото конфигурации будут добавлены" />
          )}
        </div>
      </section>

      {/* ── Related projects ── */}
      {relatedProjects.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Похожие конфигурации
            </p>
            <h2 className="mt-3 text-2xl font-light text-stone-950">
              {CATEGORY_LABELS[project.category]}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="group overflow-hidden rounded-xl ring-1 ring-stone-200 transition-shadow hover:shadow-lg hover:ring-stone-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    {rel.images[0] ? (
                      <Image
                        src={rel.images[0]}
                        alt={rel.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="bg-white p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                      {rel.series}
                    </p>
                    <h3 className="mt-1.5 text-base font-light text-stone-950">{rel.title}</h3>
                    <p className="mt-3 text-xs font-medium text-stone-400 transition-colors group-hover:text-arch">
                      Подробнее →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light text-white sm:text-4xl">
              Обсудить похожий проект
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-400">
              Подберём серию и конфигурацию под ваш объект. Уточним размеры, опции и условия поставки.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/calculate"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
              >
                Получить консультацию
              </Link>
              <Link
                href={`/pergolas/${project.seriesSlug}`}
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 transition-colors duration-200 hover:border-stone-500 hover:text-white"
              >
                Серия {project.series}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
