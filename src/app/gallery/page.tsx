import Image from "next/image";
import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Галерея пергол UOGEL",
  description: "Фото пергол UOGEL: частные дома, террасы, рестораны, подсветка и боковые системы.",
  openGraph: {
    title: "Галерея пергол UOGEL",
    description: "Фото биоклиматических пергол UOGEL в разных сценариях использования.",
  },
};

const items: [string, string][] = [
  ["Частные дома", "/images/gallery/gallery-3x3-terrace.jpg"],
  ["Террасы и патио", "/images/gallery/gallery-3x4-patio.jpg"],
  ["Рестораны и кафе", "/images/gallery/gallery-4x6-restaurant.webp"],
  ["Кафе и отели", "/images/gallery/gallery-4x4-cafe.jpg"],
  ["LED-подсветка", "/images/options/option-led.jpg"],
  ["Боковые системы", "/images/options/option-zip-screen.webp"],
];

export default function GalleryPage() {
  return (
    <Section
      eyebrow="Галерея"
      title="Перголы UOGEL в разных сценариях"
      description="Примеры установки из продуктового каталога UOGEL: частные дома, коммерческие объекты, дополнительные опции."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([title, image]) => (
          <figure key={title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative h-80 w-full">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-5 text-lg font-semibold text-stone-950">{title}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
