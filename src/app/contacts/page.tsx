import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Контакты UOGEL Russia",
  description: "Свяжитесь с нами для расчета поставки перголы UOGEL в Россию. Ответим в течение рабочего дня.",
  openGraph: {
    title: "Контакты UOGEL Russia",
    description: "Форма для расчета и вопросов по поставке пергол UOGEL в Россию.",
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

export default function ContactsPage() {
  return (
    <Section
      eyebrow="Контакты"
      title="Связаться по расчету"
      description="Напишите в удобный мессенджер или оставьте заявку — свяжемся в течение рабочего дня."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <p className="text-lg font-semibold text-stone-950">Контакты</p>
          <div className="mt-5 grid gap-4 text-stone-600">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Telegram</p>
              <p className="mt-1">@uogel_russia</p>
            </div>
          </div>
        </div>
        <LeadForm sourcePage="contacts" />
      </div>
    </Section>
  );
}
