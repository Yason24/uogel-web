import type { Metadata } from "next";
import { PergolaCard } from "@/components/PergolaCard";
import { Section } from "@/components/Section";
import { availablePergolas } from "@/data/pergolas";

export const metadata: Metadata = {
  title: "Каталог пергол UOGEL в России",
  description: "Доступные модели биоклиматических пергол UOGEL: 3 x 3 м, 3 x 4 м, 4 x 4 м, 4 x 6 м. Расчет по выбранной модели и комплектации.",
};

export default function PergolasPage() {
  return (
    <Section eyebrow="Каталог" title="Доступные модели пергол" description="Показываем только модели, доступные для расчета. Цена формируется по выбранной модели, комплектации и условиям поставки.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {availablePergolas.map((pergola) => <PergolaCard key={pergola.id} pergola={pergola} />)}
      </div>
    </Section>
  );
}
