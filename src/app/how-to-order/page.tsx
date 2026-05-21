import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Как заказать перголу UOGEL", description: "Этапы заказа: выбор доступного размера, заявка, уточнение объекта, расчет, согласование и поставка." };
const steps = ["Вы выбираете доступный размер.", "Оставляете заявку.", "Мы уточняем объект и комплектацию.", "Готовим расчет.", "Согласуем условия.", "Организуем поставку."];
export default function HowToOrderPage() {
  return <Section eyebrow="Процесс" title="Как заказать" description="Простой сценарий для первого расчета и дальнейшего согласования."><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{steps.map((step, index) => <div key={step} className="rounded-3xl border border-stone-200 bg-white p-6"><span className="text-sm text-stone-500">0{index + 1}</span><h2 className="mt-4 text-xl font-semibold text-stone-950">{step}</h2></div>)}</div><div className="mt-10"><CTA /></div></Section>;
}
