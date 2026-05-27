# UOGEL Russia — Analytics Guide

Архитектура трекинга: Yandex Metrica + GA4 (env-ready, production-safe).

---

## 1. Переменные окружения

Задать в `.env.local` (не коммитить):

```env
NEXT_PUBLIC_YM_ID=98765432          # числовой ID счётчика Яндекс Метрики
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX     # измерительный ID Google Analytics 4
```

**Без переменных сайт работает нормально** — все tracking-функции молча ничего не делают.  
Ни одна переменная не обязательна.

---

## 2. Архитектура

```
src/lib/analytics.ts              — trackEvent(), trackGoal(), EVENTS, GOALS
src/components/Analytics.tsx      — скрипты инициализации YM + GA4 (уже в layout)
src/components/ui/TrackableLink.tsx   — <Link> с onClick tracking
src/components/ui/PageViewTracker.tsx — page_view на mount (для Server Components)
```

### trackEvent vs trackGoal

| Функция | YM | GA4 | Когда использовать |
|---|---|---|---|
| `trackEvent(name, params)` | — | ✓ gtag event | Информационные события (шаг квиза, ошибка) |
| `trackGoal(name, params)` | ✓ reachGoal | ✓ gtag event | Конверсионные события (CTA click, успешная заявка) |

---

## 3. Список событий

### Конверсионные цели (trackGoal → YM reachGoal + GA4 event)

| Цель | Константа | Где срабатывает |
|---|---|---|
| `cta_consultation_click` | `GOALS.CTA_CONSULTATION` | Кнопки "Получить консультацию", "Обсудить проект" |
| `catalog_open` | `GOALS.CATALOG_OPEN` | Кнопка "Смотреть каталог" (hero, навигация) |
| `quiz_start` | `GOALS.QUIZ_START` | Загрузка страницы /calculate |
| `lead_submit_success` | `GOALS.LEAD_SUBMIT_SUCCESS` | **Главная конверсия** — успешная отправка заявки |

### Информационные события (trackEvent → GA4 only)

| Событие | Константа | Параметры | Где срабатывает |
|---|---|---|---|
| `cta_click` | `EVENTS.CTA_CLICK` | context, href | Клики по вторичным CTA |
| `catalog_open` | `EVENTS.CATALOG_OPEN` | context | Открытие каталога |
| `product_open` | `EVENTS.PRODUCT_OPEN` | slug, series_name, category | /pergolas/[slug] — mount |
| `option_open` | `EVENTS.OPTION_OPEN` | slug, title, category | /options/[slug] — mount |
| `project_open` | `EVENTS.PROJECT_OPEN` | slug, title, category | /projects/[slug] — mount |
| `quiz_step` | `EVENTS.QUIZ_STEP` | step, step_name | Переход между шагами квиза |
| `lead_submit_attempt` | `EVENTS.LEAD_SUBMIT_ATTEMPT` | source_page | Нажатие "Отправить заявку" |
| `lead_submit_success` | `EVENTS.LEAD_SUBMIT_SUCCESS` | source_page, object_type?, series?, options_count, has_messenger | Успешная заявка |
| `lead_submit_error` | `EVENTS.LEAD_SUBMIT_ERROR` | source_page, error_type | Ошибка отправки |
| `product_calculate_click` | `EVENTS.PRODUCT_CALCULATE` | slug, series | Клик "Рассчитать" в карточке серии |

---

## 4. Что считается конверсией

**Главная конверсия:** `lead_submit_success`  
→ Настроить как цель в Яндекс Метрике и как конверсионное событие в GA4.

**Вторичные конверсии:**
- `cta_consultation_click` — вовлечение (клик на CTA)
- `quiz_start` — начало воронки (вход в квиз)

**Воронка:**
```
catalog_open / product_open
  ↓
cta_consultation_click / product_calculate_click
  ↓
quiz_start
  ↓
quiz_step (step 1..8)
  ↓
lead_submit_attempt
  ↓
lead_submit_success  ← КОНВЕРСИЯ
```

---

## 5. Параметры событий — что МОЖНО и что НЕЛЬЗЯ

### ✅ Разрешено отправлять

```
source_page       — /calculate, pergola:a13, /contacts
slug              — a13, c10, zip-screen
series_name       — A13, C10
category          — bioclimatic, screens
object_type       — "Частный дом", "Ресторан / кафе"
series            — product ID из каталога (a13, c10)
options_count     — число (не список опций)
has_messenger     — 0 или 1
step              — номер шага квиза
step_name         — "Тип объекта", "Серия"
error_type        — "api_error", "network_error"
context           — "hero", "cta_section", "pergola_card"
href              — /calculate, /catalog
installation      — тип установки
```

### 🚫 ЗАПРЕЩЕНО отправлять

```
phone     — номер телефона (PII)
name      — имя клиента (PII)
city      — город клиента (PII)
comment   — текст комментария (PII)
email     — (если добавят) (PII)
leadId    — внутренний ID заявки
messenger — значение (Max/WhatsApp/Telegram)
```

---

## 6. Как проверить события

### Dev tools — GA4 Debug View

1. Установить расширение GA4 Debug View в Chrome
2. Открыть сайт в браузере
3. Кликнуть CTA — в консоли увидеть `gtag("event", ...)`

Проверка вручную (console):
```javascript
// Временно переопределить gtag для отладки:
window.gtag = (...args) => console.log("[gtag]", ...args);
// Теперь все события логируются
```

### Yandex Metrica — Webvisor / Real-time

1. Открыть Яндекс Метрику → Цели → Проверка
2. В отдельной вкладке совершить целевое действие
3. Вернуться в Метрику → должна появиться конверсия в real-time

Консольная проверка:
```javascript
// Переопределить ym для отладки:
window.ym = (id, method, goal, params) =>
  console.log("[YM]", method, goal, params);
```

### Проверка без analytics ID

Без `NEXT_PUBLIC_YM_ID` и `NEXT_PUBLIC_GA4_ID`:
- Функции `trackEvent` / `trackGoal` не вызывают ничего
- В console нет ошибок
- Сайт работает нормально

---

## 7. Fail-safe поведение

Сценарии, при которых analytics молча не работает (без ошибок):

| Сценарий | Поведение |
|---|---|
| `window` не определён (SSR) | Ранний `return` — no-op |
| YM_ID не задан | `getYmId()` возвращает `null` — YM-вызов пропускается |
| GA4_ID не задан | `window.gtag` не определён — вызов пропускается |
| AdBlocker заблокировал скрипт | `window.ym` / `window.gtag` = undefined — вызов пропускается |
| Ошибка в analytics (unexpected) | try/catch — ошибка поглощается, сайт не падает |
| Hydration mismatch | PageViewTracker использует `useEffect` — только client-side |

---

## 8. Подключение Яндекс Метрики

1. Создать счётчик на [metrica.yandex.ru](https://metrica.yandex.ru)
2. Скопировать числовой ID счётчика
3. Добавить в `.env.local` на сервере:
   ```
   NEXT_PUBLIC_YM_ID=98765432
   ```
4. Пересобрать контейнер: `docker compose build --no-cache && docker compose up -d`
5. Создать цели в интерфейсе Метрики:
   - Тип: JavaScript-событие
   - Идентификатор цели: `lead_submit_success`
   - (опционально) `cta_consultation_click`, `quiz_start`

---

## 9. Подключение GA4

1. Создать ресурс Google Analytics 4
2. Скопировать Measurement ID (вид G-XXXXXXXXXX)
3. Добавить в `.env.local`:
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```
4. Пересобрать контейнер
5. В GA4 отметить событие `lead_submit_success` как конверсию

---

## 10. Добавление нового события

```typescript
// 1. Добавить константу в src/lib/analytics.ts
export const EVENTS = {
  // ...
  MY_NEW_EVENT: "my_new_event",
} as const;

// 2. Использовать в компоненте
import { trackEvent, EVENTS } from "@/lib/analytics";

trackEvent(EVENTS.MY_NEW_EVENT, { 
  param1: "value",  // только non-PII
});
```

---

*Последнее обновление: Phase 4 Step 3 (Analytics) — Lead Operations + CRM-ready Foundation*
