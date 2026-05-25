"use client";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const groups = [
  {
    name: "objectType",
    title: "Где планируется установка?",
    values: ["Частный дом", "Терраса", "Ресторан / кафе", "Отель", "Коммерческий объект", "Другое"],
  },
  {
    name: "selectedSize",
    title: "Выберите доступный размер перголы",
    values: [
      "3 x 3 м",
      "3 x 4 м",
      "4 x 4 м",
      "4 x 6 м",
      "Другой доступный вариант из каталога",
      "Пока не знаю, нужна консультация",
    ],
  },
  {
    name: "installationType",
    title: "Тип установки",
    values: ["Пристенная", "Отдельно стоящая", "Пока не знаю"],
  },
  {
    name: "options",
    title: "Какие опции нужны?",
    values: ["LED-подсветка", "ZIP-шторы", "Стеклянные панели", "Датчики дождя/ветра", "Пульт/автоматика", "Пока не знаю"],
    multi: true,
  },
  {
    name: "timeline",
    title: "Когда планируете покупку?",
    values: ["В ближайший месяц", "1–3 месяца", "3–6 месяцев", "Изучаю варианты"],
  },
];

export function Quiz() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Укажите имя (не менее 2 символов) и корректный номер телефона.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          city: String(form.get("city") || "").trim() || undefined,
          messenger: String(form.get("messenger") || "").trim() || undefined,
          comment: String(form.get("comment") || "").trim() || undefined,
          objectType: String(form.get("objectType") || "").trim() || undefined,
          selectedSize: String(form.get("selectedSize") || "").trim() || undefined,
          installationType: String(form.get("installationType") || "").trim() || undefined,
          options: form.getAll("options").join(", ") || undefined,
          timeline: String(form.get("timeline") || "").trim() || undefined,
          sourcePage: "calculate",
        }),
      });

      const data: { ok: boolean; error?: string } = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.");
        setStatus("error");
        return;
      }

      formEl.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Ошибка соединения. Проверьте интернет и попробуйте ещё раз.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <p className="text-2xl font-semibold text-stone-950">Заявка принята</p>
        <p className="mt-4 text-lg text-stone-600">
          Получили ваши ответы. Свяжемся с вами в течение рабочего дня — подберём подходящую модель и подготовим расчет по выбранной комплектации.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
        >
          Заполнить заново
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={submit} className="grid gap-8">
      {groups.map((group) => (
        <fieldset key={group.name} className="rounded-3xl border border-stone-200 bg-white p-6">
          <legend className="px-2 text-lg font-semibold text-stone-950">{group.title}</legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.values.map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-stone-200 px-4 py-3 text-sm text-stone-700 hover:border-stone-400"
              >
                <input
                  type={group.multi ? "checkbox" : "radio"}
                  name={group.name}
                  value={value}
                  disabled={submitting}
                />
                {value}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="rounded-3xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-950">Контактные данные</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Город установки
            <input
              name="city"
              disabled={submitting}
              className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
              placeholder="Москва"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Имя
            <input
              name="name"
              disabled={submitting}
              className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
              placeholder="Артём"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Телефон
            <input
              name="phone"
              type="tel"
              disabled={submitting}
              className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
              placeholder="+7"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Telegram / WhatsApp
            <input
              name="messenger"
              disabled={submitting}
              className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
              placeholder="куда удобнее написать"
            />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm font-medium text-stone-700">
          Комментарий
          <textarea
            name="comment"
            rows={4}
            disabled={submitting}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
            placeholder="Дополнительный комментарий"
          />
        </label>
        {status === "error" && errorMessage && (
          <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Отправляем..." : "Получить расчет"}
        </button>
      </div>
    </form>
  );
}
