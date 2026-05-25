import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Подобрать систему UOGEL", description: "Расскажите о вашем проекте — подберём подходящую систему UOGEL и подготовим расчёт по выбранной модели и комплектации." };
export default function CalculatePage() {
  return <Section eyebrow="Проектная заявка" title="Подобрать систему UOGEL" description="Расскажите о вашем проекте. Мы уточним параметры и подберём подходящую систему из доступных конфигураций."><Quiz /></Section>;
}
