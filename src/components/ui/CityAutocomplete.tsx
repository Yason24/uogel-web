"use client";
import { useState, useRef, useEffect } from "react";

// ─── Local city list ──────────────────────────────────────────────────────────
// Fallback when NEXT_PUBLIC_YANDEX_SUGGEST_API_KEY is not set.
// To enable Yandex Suggest: set NEXT_PUBLIC_YANDEX_SUGGEST_API_KEY in .env.local
// and replace filterCities() with a Yandex API call.

const RUSSIAN_CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Омск",
  "Самара",
  "Ростов-на-Дону",
  "Уфа",
  "Красноярск",
  "Воронеж",
  "Пермь",
  "Волгоград",
  "Краснодар",
  "Саратов",
  "Тюмень",
  "Тольятти",
  "Ижевск",
  "Барнаул",
  "Ульяновск",
  "Иркутск",
  "Хабаровск",
  "Ярославль",
  "Владивосток",
  "Махачкала",
  "Томск",
  "Оренбург",
  "Кемерово",
  "Новокузнецк",
  "Рязань",
  "Астрахань",
  "Набережные Челны",
  "Пенза",
  "Липецк",
  "Тула",
  "Киров",
  "Чебоксары",
  "Калининград",
  "Брянск",
  "Курск",
  "Иваново",
  "Магнитогорск",
  "Тверь",
  "Ставрополь",
  "Белгород",
  "Архангельск",
  "Владимир",
  "Сочи",
  "Симферополь",
  "Севастополь",
  "Нижний Тагил",
  "Сургут",
  "Улан-Удэ",
  "Чита",
  "Якутск",
  "Петрозаводск",
  "Вологда",
  "Смоленск",
  "Мурманск",
  "Псков",
  "Нальчик",
  "Грозный",
  "Владикавказ",
  "Майкоп",
  "Элиста",
  "Саранск",
  "Йошкар-Ола",
  "Саратов",
  "Пятигорск",
  "Анапа",
  "Геленджик",
  "Новороссийск",
  "Таганрог",
  "Шахты",
];

function filterCities(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return RUSSIAN_CITIES.filter((c) => c.toLowerCase().startsWith(q)).slice(0, 7);
}

// ─── Component ────────────────────────────────────────────────────────────────

type CityAutocompleteProps = {
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
  hasError?: boolean;
};

export function CityAutocomplete({ value, onChange, disabled, hasError }: CityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = filterCities(value);
  const showDropdown = open && suggestions.length > 0 && !disabled;

  // Close on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Reset active index when suggestions change
  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions.length]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    setOpen(true);
  }

  function handleSelect(city: string) {
    onChange(city);
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Москва"
        autoComplete="off"
        aria-autocomplete="list"
        className={`w-full rounded-2xl border px-4 py-3 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 disabled:opacity-50 ${
          hasError ? "border-red-400" : "border-stone-200"
        }`}
      />
      {showDropdown && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg"
        >
          {suggestions.map((city, i) => (
            <li key={city} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                // mousedown fires before blur, so the city is selected before input loses focus
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(city);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition ${
                  i === activeIndex
                    ? "bg-stone-100 text-stone-950"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
