import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "Контакты UOGEL Russia", description: "Контакты для расчета поставки пергол UOGEL в Россию." };
export default function ContactsPage() {
  return <Section eyebrow="Контакты" title="Связаться по расчету" description="Реквизиты будут добавлены позже. Сейчас форма работает как интерфейсная заготовка без backend."><div className="grid gap-8 lg:grid-cols-2"><div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-lg font-semibold text-stone-950">Контакты</p><div className="mt-5 grid gap-3 text-stone-600"><span>Телефон: +7 (___) ___-__-__</span><span>Telegram: @uogel_russia</span><span>WhatsApp: +7 (___) ___-__-__</span><span>Email: sales@example.ru</span><span>Реквизиты: позже</span></div></div><LeadForm sourcePage="contacts" /></div></Section>;
}
