import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Рассчитать перголу UOGEL", description: "Квиз для расчета биоклиматической перголы UOGEL по доступному размеру, типу установки, опциям и городу поставки." };
export default function CalculatePage() {
  return <Section eyebrow="Расчет" title="Подобрать модель и комплектацию" description="Ответьте на несколько вопросов. Мы рассчитаем стоимость по выбранной модели и доступному размеру."><Quiz /></Section>;
}
