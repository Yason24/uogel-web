import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея пергол UOGEL",
  description: "Фото пергол UOGEL: частные дома, террасы, рестораны, подсветка и боковые системы.",
  openGraph: {
    title: "Галерея пергол UOGEL",
    description: "Фото биоклиматических пергол UOGEL в разных сценариях использования.",
    images: [
      {
        url: "/images/og/uogel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Биоклиматическая пергола UOGEL",
      },
    ],
  },
};

const items: { title: string; caption: string; src: string }[] = [
  {
    title: "Частные дома",
    caption: "Жилые террасы",
    src: "/images/gallery/gallery-3x3-terrace.jpg",
  },
  {
    title: "Террасы и патио",
    caption: "Открытые зоны отдыха",
    src: "/images/gallery/gallery-3x4-patio.jpg",
  },
  {
    title: "Рестораны",
    caption: "Коммерческие объекты",
    src: "/images/gallery/gallery-4x6-restaurant.webp",
  },
  {
    title: "Кафе и отели",
    caption: "Общественные пространства",
    src: "/images/gallery/gallery-4x4-cafe.jpg",
  },
  {
    title: "LED-подсветка",
    caption: "Интегрированная подсветка",
    src: "/images/options/option-led.jpg",
  },
  {
    title: "Боковые экраны",
    caption: "Zip-screen защита",
    src: "/images/options/option-zip-screen.webp",
  },
];

export default function GalleryPage() {
  return (
    <main>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Галерея</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-light text-stone-950 sm:text-4xl">
            Перголы UOGEL в разных сценариях
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-stone-500">
            Примеры из продуктового каталога UOGEL: жилые объекты, коммерческие пространства, дополнительные опции.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <figure
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
                    {item.caption}
                  </p>
                  <p className="mt-1 text-base font-medium text-stone-950 transition-colors duration-200 group-hover:text-arch">
                    {item.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            Подобрать систему
          </p>
          <h2 className="mt-4 text-2xl font-light text-white sm:text-3xl">
            Рассчитайте проект для вашего объекта
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-stone-400">
            Подберём серию и конфигурацию из каталога UOGEL 2026 под ваши требования.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calculate"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition-colors duration-200 hover:bg-stone-100"
            >
              Рассчитать комплектацию
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
    </main>
  );
}
