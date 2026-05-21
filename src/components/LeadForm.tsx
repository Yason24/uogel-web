"use client";
import { FormEvent, useState } from "react";

type LeadFormProps = { sourcePage: string; selectedPergolaId?: string };
export function LeadForm({ sourcePage, selectedPergolaId }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) { setStatus("error"); return; }
    const lead = { name, phone, messenger: form.get("messenger"), city: form.get("city"), comment: form.get("comment"), selectedPergolaId, sourcePage, createdAt: new Date().toISOString() };
    console.info("TODO send lead to API / Telegram / CRM", lead);
    setStatus("success");
    event.currentTarget.reset();
  }
  return <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium text-stone-700">Имя<input name="name" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500" placeholder="Артем" /></label><label className="grid gap-2 text-sm font-medium text-stone-700">Телефон<input name="phone" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500" placeholder="+7" /></label></div><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium text-stone-700">Telegram / WhatsApp<input name="messenger" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500" placeholder="куда удобнее написать" /></label><label className="grid gap-2 text-sm font-medium text-stone-700">Город<input name="city" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500" placeholder="Москва" /></label></div><label className="grid gap-2 text-sm font-medium text-stone-700">Комментарий<textarea name="comment" rows={4} className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500" placeholder="Размер, объект, нужные опции" /></label><button className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800" type="submit">Отправить заявку</button>{status === "error" ? <p className="text-sm text-red-600">Проверьте имя и телефон.</p> : null}{status === "success" ? <p className="text-sm text-emerald-700">Спасибо. Заявка сохранена на стороне интерфейса, следующий шаг — подключить отправку в CRM.</p> : null}</form>;
}
