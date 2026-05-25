"use client";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type LeadFormProps = { sourcePage: string; selectedPergolaId?: string };

export function LeadForm({ sourcePage, selectedPergolaId }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
          messenger: String(form.get("messenger") || "").trim() || undefined,
          city: String(form.get("city") || "").trim() || undefined,
          comment: String(form.get("comment") || "").trim() || undefined,
          selectedPergolaId: selectedPergolaId || undefined,
          sourcePage,
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
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-xl font-semibold text-stone-950">Заявка принята</p>
        <p className="mt-3 text-stone-600">
          Свяжемся с вами в течение рабочего дня, чтобы уточнить детали и подготовить расчет.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
        >
          Новая заявка
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Telegram / WhatsApp
          <input
            name="messenger"
            disabled={submitting}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
            placeholder="куда удобнее написать"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Город
          <input
            name="city"
            disabled={submitting}
            className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
            placeholder="Москва"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-stone-700">
        Комментарий
        <textarea
          name="comment"
          rows={4}
          disabled={submitting}
          className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
          placeholder="Размер, объект, нужные опции"
        />
      </label>
      {status === "error" && errorMessage && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Отправляем..." : "Отправить заявку"}
      </button>
    </form>
  );
}
