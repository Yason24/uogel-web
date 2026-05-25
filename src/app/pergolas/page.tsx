import type { Metadata } from "next";
import { PergolaCard } from "@/components/PergolaCard";
import { Section } from "@/components/Section";
import { availablePergolas } from "@/data/pergolas";

export const metadata: Metadata = {
  title: "Каталог пергол UOGEL в России",
  description:
    "Доступные модели биоклиматических пергол UOGEL: 3×3, 3×4, 4×4, 4×6 м. Ламельная крыша, LED, ZIP-шторы и автоматика. Расчет по выбранной модели и комплектации.",
  openGraph: {
    title: "Каталог пергол UOGEL",
    description:
      "Доступные размеры биоклиматических пергол UOGEL для расчета поставки в Россию.",
    images: [
      {
        url: "/images/og/uogel-og.webp",
        width: 1200,
        height: 630,
        alt: "Биоклиматическая пергола UOGEL",
      },
    ],
  },
};

export default function PergolasPage() {
  return (
    <Section
      eyebrow="Каталог"
      title="Доступные модели пергол"
      description="Показываем только модели, которые доступны для расчета. Поможем выбрать подходящий размер из каталога — цена формируется по модели, комплектации и условиям поставки."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {availablePergolas.map((pergola) => (
          <PergolaCard key={pergola.id} pergola={pergola} />
        ))}
      </div>
    </Section>
  );
}
