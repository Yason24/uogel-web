"use client";
import { useState } from "react";
import { products } from "@/data/pergolas";
import { options as allOptions } from "@/data/options";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  objectType: string;
  systemType: string;
  seriesId: string;
  width: string;
  depth: string;
  height: string;
  selectedOptions: string[];
  mounting: string;
  city: string;
  name: string;
  phone: string;
  comment: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  objectType: "",
  systemType: "",
  seriesId: "",
  width: "",
  depth: "",
  height: "",
  selectedOptions: [],
  mounting: "",
  city: "",
  name: "",
  phone: "",
  comment: "",
};

const OBJECT_TYPES = [
  "Частный дом",
  "Ресторан / кафе",
  "Отель / курорт",
  "Rooftop",
  "Терраса",
  "Другое",
];

const SYSTEM_TYPES = [
  "Пристенная пергола",
  "Отдельностоящая пергола",
  "Pavilion",
  "Sunroom",
  "Carport",
  "Нужна консультация",
];

const SERIES_OPTIONS = [
  ...products.map((p) => ({ id: p.id, label: p.seriesName, sub: p.subtitle })),
  { id: "unknown", label: "Не знаю", sub: "Нужна рекомендация по серии" },
];

const MOUNTING_OPTIONS = [
  { id: "needed", label: "Нужен монтаж" },
  { id: "not-needed", label: "Не нужен" },
  { id: "consult", label: "Нужна консультация" },
];

const TOTAL_STEPS = 8;

const STEP_TITLES: Record<number, string> = {
  1: "Тип объекта",
  2: "Система",
  3: "Серия",
  4: "Размеры",
  5: "Опции",
  6: "Монтаж",
  7: "Город",
  8: "Контактные данные",
};

export function Quiz() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function toggleOption(id: string) {
    setForm((prev) => {
      const exists = prev.selectedOptions.includes(id);
      return {
        ...prev,
        selectedOptions: exists
          ? prev.selectedOptions.filter((o) => o !== id)
          : [...prev.selectedOptions, id],
      };
    });
  }

  function validateCurrent(): boolean {
    if (step === 7) {
      if (!form.city.trim()) {
        setFieldErrors({ city: "Укажите город" });
        return false;
      }
    }
    if (step === 8) {
      const errors: FieldErrors = {};
      if (form.name.trim().length < 2) errors.name = "Укажите имя (не менее 2 символов)";
      if (form.phone.replace(/\D/g, "").length < 10) errors.phone = "Укажите корректный номер телефона";
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return false;
      }
    }
    return true;
  }

  function next() {
    if (!validateCurrent()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
    setFieldErrors({});
  }

  async function submit() {
    if (!validateCurrent()) return;

    setStatus("submitting");
    setErrorMsg("");

    const optionsStr = form.selectedOptions
      .map((id) => allOptions.find((o) => o.id === id)?.title ?? id)
      .join(", ");

    const dimensionParts = [
      form.width && `Ш ${form.width} мм`,
      form.depth && `В ${form.depth} мм`,
      form.height && `Высота ${form.height} мм`,
    ].filter(Boolean);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          city: form.city.trim() || undefined,
          comment: form.comment.trim() || undefined,
          objectType: form.objectType || undefined,
          installationType: form.systemType || undefined,
          selectedPergolaId:
            form.seriesId && form.seriesId !== "unknown" ? form.seriesId : undefined,
          selectedSize: dimensionParts.length ? dimensionParts.join(", ") : undefined,
          options: optionsStr || undefined,
          timeline: form.mounting || undefined,
          sourcePage: "calculate",
        }),
      });

      const data: { ok: boolean; error?: string } = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(
          data.error ?? "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <p className="text-2xl font-semibold text-stone-950">Заявка отправлена</p>
        <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
          Мы свяжемся с вами, уточним параметры проекта и подберём подходящую систему UOGEL.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setStep(1);
            setForm(EMPTY_FORM);
            setFieldErrors({});
          }}
          className="mt-8 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
        >
          Новая заявка
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="grid gap-6">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <span className="shrink-0 text-sm text-stone-500">
          Шаг {step} из {TOTAL_STEPS} — {STEP_TITLES[step]}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-stone-950 transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
        {step === 1 && (
          <RadioStep
            title="Где планируется установка?"
            options={OBJECT_TYPES.map((v) => ({ id: v, label: v }))}
            value={form.objectType}
            onChange={(v) => setField("objectType", v)}
            disabled={isSubmitting}
          />
        )}
        {step === 2 && (
          <RadioStep
            title="Тип системы"
            options={SYSTEM_TYPES.map((v) => ({ id: v, label: v }))}
            value={form.systemType}
            onChange={(v) => setField("systemType", v)}
            disabled={isSubmitting}
          />
        )}
        {step === 3 && (
          <RadioStep
            title="Серия UOGEL"
            options={SERIES_OPTIONS}
            value={form.seriesId}
            onChange={(v) => setField("seriesId", v)}
            disabled={isSubmitting}
          />
        )}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold text-stone-950">Примерные размеры</h3>
            <p className="mt-2 text-sm text-stone-500">
              Укажите, если известны. Можно пропустить — уточним при консультации.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <DimensionInput
                label="Ширина, мм"
                value={form.width}
                onChange={(v) => setField("width", v)}
                placeholder="например 4000"
                disabled={isSubmitting}
              />
              <DimensionInput
                label="Вынос, мм"
                value={form.depth}
                onChange={(v) => setField("depth", v)}
                placeholder="например 3000"
                disabled={isSubmitting}
              />
              <DimensionInput
                label="Высота, мм"
                value={form.height}
                onChange={(v) => setField("height", v)}
                placeholder="например 2500"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-semibold text-stone-950">Дополнительные опции</h3>
            <p className="mt-2 text-sm text-stone-500">
              Выберите нужные опции или пропустите — подберём при консультации.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {allOptions.map((opt) => {
                const selected = form.selectedOptions.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => toggleOption(opt.id)}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition disabled:opacity-50 ${
                      selected
                        ? "border-stone-950 bg-stone-50 text-stone-950"
                        : "border-stone-200 text-stone-700 hover:border-stone-400"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        selected ? "border-stone-950 bg-stone-950" : "border-stone-300"
                      }`}
                    >
                      {selected && (
                        <svg viewBox="0 0 10 8" className="h-2.5 w-2.5">
                          <path
                            d="M1 4l3 3 5-6"
                            stroke="white"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span>
                      <span className="font-medium">{opt.title}</span>
                      <span className="mt-0.5 block text-xs text-stone-500">{opt.subtitle}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {step === 6 && (
          <RadioStep
            title="Нужен монтаж?"
            options={MOUNTING_OPTIONS}
            value={form.mounting}
            onChange={(v) => setField("mounting", v)}
            disabled={isSubmitting}
          />
        )}
        {step === 7 && (
          <div>
            <h3 className="text-lg font-semibold text-stone-950">Город установки</h3>
            <p className="mt-2 text-sm text-stone-500">
              Нужно для оценки логистики и сроков поставки.
            </p>
            <div className="mt-6">
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Город <span className="text-red-500">*</span>
                <input
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  disabled={isSubmitting}
                  className={`rounded-2xl border px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50 ${
                    fieldErrors.city ? "border-red-400" : "border-stone-200"
                  }`}
                  placeholder="Москва"
                />
                {fieldErrors.city && (
                  <span className="text-xs text-red-600">{fieldErrors.city}</span>
                )}
              </label>
            </div>
          </div>
        )}
        {step === 8 && (
          <div>
            <h3 className="text-lg font-semibold text-stone-950">Контактные данные</h3>
            <p className="mt-2 text-sm text-stone-500">
              Свяжемся с вами для уточнения параметров проекта.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Имя <span className="text-red-500">*</span>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  disabled={isSubmitting}
                  className={`rounded-2xl border px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50 ${
                    fieldErrors.name ? "border-red-400" : "border-stone-200"
                  }`}
                  placeholder="Артём"
                />
                {fieldErrors.name && (
                  <span className="text-xs text-red-600">{fieldErrors.name}</span>
                )}
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Телефон <span className="text-red-500">*</span>
                <input
                  value={form.phone}
                  type="tel"
                  onChange={(e) => setField("phone", e.target.value)}
                  disabled={isSubmitting}
                  className={`rounded-2xl border px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50 ${
                    fieldErrors.phone ? "border-red-400" : "border-stone-200"
                  }`}
                  placeholder="+7"
                />
                {fieldErrors.phone && (
                  <span className="text-xs text-red-600">{fieldErrors.phone}</span>
                )}
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-medium text-stone-700">
              Комментарий
              <textarea
                value={form.comment}
                onChange={(e) => setField("comment", e.target.value)}
                rows={4}
                disabled={isSubmitting}
                className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
                placeholder="Дополнительные пожелания или вопросы"
              />
            </label>
            {status === "error" && errorMsg && (
              <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            disabled={isSubmitting}
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950 disabled:opacity-50"
          >
            ← Назад
          </button>
        ) : (
          <div />
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            disabled={isSubmitting}
            className="rounded-full bg-stone-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
          >
            Далее →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="rounded-full bg-stone-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
          </button>
        )}
      </div>
    </div>
  );
}

type RadioOption = { id: string; label: string; sub?: string };

function RadioStep({
  title,
  options,
  value,
  onChange,
  disabled,
}: {
  title: string;
  options: RadioOption[];
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(value === opt.id ? "" : opt.id)}
            className={`flex flex-col rounded-2xl border px-4 py-3 text-left text-sm transition disabled:opacity-50 ${
              value === opt.id
                ? "border-stone-950 bg-stone-50 text-stone-950"
                : "border-stone-200 text-stone-700 hover:border-stone-400"
            }`}
          >
            <span className="font-medium">{opt.label}</span>
            {opt.sub && <span className="mt-0.5 text-xs text-stone-500">{opt.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function DimensionInput({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-stone-700">
      {label}
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-500 disabled:opacity-50"
        placeholder={placeholder}
      />
    </label>
  );
}
