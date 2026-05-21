"use client";
import { FormEvent, useState } from "react";
const groups = [
  { name: "objectType", title: "Где планируется установка?", values: ["Частный дом", "Терраса", "Ресторан / кафе", "Отель", "Коммерческий объект", "Другое"] },
  { name: "selectedSize", title: "Выберите доступный размер перголы", values: ["3 x 3 м", "3 x 4 м", "4 x 4 м", "4 x 6 м", "Другой доступный вариант из каталога", "Пока не знаю, нужна консультация"] },
  { name: "installationType", title: "Тип установки", values: ["Пристенная", "Отдельно стоящая", "Пока не знаю"] },
  { name: "options", title: "Какие опции нужны?", values: ["LED-подсветка", "ZIP-шторы", "Стеклянные панели", "Датчики дождя/ветра", "Пульт/автоматика", "Пока не знаю"], multi: true },
  { name: "timeline", title: "Когда планируете покупку?", values: ["В ближайший месяц", "1–3 месяца", "3–6 месяцев", "Изучаю варианты"] },
];
export function Quiz() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) { setStatus("error"); return; }
    console.info("TODO send quiz lead to API / Telegram / CRM", Object.fromEntries(form.entries()));
    setStatus("success");
    event.currentTarget.reset();
  }
  return <form onSubmit={submit} className="grid gap-8">{groups.map((group) => <fieldset key={group.name} className="rounded-3xl border border-stone-200 bg-white p-6"><legend className="px-2 text-lg font-semibold text-stone-950">{group.title}</legend><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{group.values.map((value) => <label key={value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-stone-200 px-4 py-3 text-sm text-stone-700 hover:border-stone-400"><input type={group.multi ? "checkbox" : "radio"} name={group.name} value={value} />{value}</label>)}</div></fieldset>)}<div className="rounded-3xl border border-stone-200 bg-white p-6"><h2 className="text-lg font-semibold text-stone-950">Контакты</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><input name="city" className="rounded-2xl border border-stone-200 px-4 py-3" placeholder="Город установки" /><input name="name" className="rounded-2xl border border-stone-200 px-4 py-3" placeholder="Имя" /><input name="phone" className="rounded-2xl border border-stone-200 px-4 py-3" placeholder="Телефон" /><input name="messenger" className="rounded-2xl border border-stone-200 px-4 py-3" placeholder="Telegram / WhatsApp" /></div><textarea name="comment" rows={4} className="mt-4 w-full rounded-2xl border border-stone-200 px-4 py-3" placeholder="Комментарий" /><button type="submit" className="mt-5 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white">Получить расчет</button>{status === "error" ? <p className="mt-3 text-sm text-red-600">Укажите имя и корректный телефон.</p> : null}{status === "success" ? <p className="mt-3 text-sm text-emerald-700">Спасибо. Мы подготовим расчет по выбранной модели и комплектации.</p> : null}</div></form>;
}
