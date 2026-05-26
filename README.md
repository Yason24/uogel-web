# UOGEL Russia — Architectural Outdoor Systems

Сайт для подбора и расчёта биоклиматических пергол UOGEL с поставкой в Россию.

**Позиционирование:** архитектурная outdoor-platform. Не лендинг, не ecommerce. Проектный подбор системы из каталога UOGEL 2026.

## Stack

- Next.js 15 (App Router, `output: "standalone"`)
- TypeScript
- Tailwind CSS v3
- Google Fonts: Inter (300/400/500/600)

## Серии каталога

| Серия | Slug | Привод | Размеры |
|---|---|---|---|
| A13 | `a13` | Моторизованный | Конфигурация под проект |
| C10 | `c10` | Моторизованный | Конфигурация под проект |
| C7 | `c7` | Моторизованный | Конфигурация под проект |
| C4 / M4 | `c4` | Мотор / ручное | Стандартные конфигурации |
| M3 / M3-S | `m3` | Ручное | Стандартные конфигурации |
| M2-S | `m2-s` | Ручное | Стандартные конфигурации |

## Routes

```
/                   # главная
/catalog            # обзор каталога
/pergolas           # список серий
/pergolas/[slug]    # карточка серии (a13, c10, c7, c4, m3, m2-s)
/options            # список опций
/options/[slug]     # карточка опции
/calculate          # форма подбора системы (8 шагов)
/contacts
/delivery
/how-to-order
/gallery
```

## Data architecture

Все данные — в data layer, не хардкодить в JSX.

```
src/types/index.ts       # типы: Product, Option, Lead, NavItem, …
src/data/pergolas.ts     # 6 серий + availablePergolas + getPergolaBySlug
src/data/options.ts      # 7 опций
src/data/navigation.ts   # навигация
src/lib/catalog.ts       # форматеры: formatSizeRange, formatDrive, …
```

**Правило:** сначала обновляй `src/data/`, потом UI.

## Design system (Phase 2)

- Шрифт: Inter, `var(--font-inter)`
- Заголовки h1/h2: `font-light`
- Заголовки h3/карточки: `font-medium`
- Eyebrow: `text-xs font-medium uppercase tracking-[0.2em] text-stone-400`
- Accent: `#c9783b` — класс `arch` в Tailwind
- Hover: `hover:text-arch`, `hover:bg-arch`, `group-hover:text-arch`
- Transitions: `transition-colors duration-200`
- Dark sections: `bg-stone-950` (hero) / `bg-stone-900` (CTA)
- Без ярких градиентов, без ecommerce tone

## Development

```bash
cd /projects/web/uogel
npm install
npm run dev
```

Проверки перед commit:

```bash
npm run lint
npm run build
```

## Docker deploy (новый сервер)

> **Важно:** `output: "standalone"` — сборка вне Docker обязательна.

```bash
cd /projects/web/uogel
git pull
npm install
npm run lint
npm run build
docker compose down
docker compose build --no-cache
docker compose up -d
```

Проверка:

```bash
docker ps --filter name=uogel-web
curl -I http://127.0.0.1:3001
curl -I https://rtc.rdk-invest.ru
curl -s http://127.0.0.1:3001 | grep -Ei "UOGEL|пергол|биоклимат"
```

## Инфраструктура

| Параметр | Значение |
|---|---|
| Сервер | `sanda-root-local` (192.168.50.86) |
| Проект | `/projects/web/uogel` |
| Docker | `uogel-web`, host `3001` → container `3000` |
| Proxy | NPM → `rtc.rdk-invest.ru` |
| Preview | `https://rtc.rdk-invest.ru` |
| GitHub | `github-uogel:Yason24/uogel-web.git` |
| Ветка | `main` |

## Leads / Telegram

- Форма → `POST /api/lead`
- Telegram через NAS proxy `192.168.50.190:7890`
- Backup: `data/leads.jsonl` (Docker volume `./data:/app/data`)
- Rate limit: 3 заявки / IP / 10 минут
- `.env`, `.env.local`, `data/leads.jsonl` — **не коммитить**

## Не трогать

`.env*` · `data/*.jsonl` · `.claude/` · NAS · роутер · NPM (кроме rtc.rdk-invest.ru) · Matrix · Nextcloud · Plex · Talk HPB · Docker других проектов · VPS · nftables · sing-box · VLESS · WireGuard

Полная инструкция для агентов: `AGENTS.md`.
