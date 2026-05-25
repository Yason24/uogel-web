import type { Metadata } from "next";
import { PergolaCard } from "@/components/PergolaCard";
import { Section } from "@/components/Section";
import { availablePergolas } from "@/data/pergolas";

export const metadata: Metadata = {
  title: "Каталог пергол UOGEL в России",
  description:
    "Серии биоклиматических пергол UOGEL: A13, C10, C7, C4, M4, M3. Ламельная крыша, LED, ZIP-экраны и автоматика. Расчёт по выбранной серии и комплектации.",
  openGraph: {
    title: "Каталог пергол UOGEL",
    description:
      "Серии биоклиматических пергол UOGEL для расчёта поставки в Россию.",
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
      title="Серии пергол UOGEL"
      description="Показываем только серии, доступные для расчёта. Поможем выбрать подходящую конфигурацию — цена формируется по серии, комплектации и условиям поставки."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {availablePergolas.map((product) => (
          <PergolaCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
