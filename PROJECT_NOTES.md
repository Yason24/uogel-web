# UOGEL Russia — Project Notes

Обновлено: 2026-05-26

Технические заметки для Артёма и агентов. Описывает текущее состояние проекта после Phase 1 и Phase 2.

---

## 1. Текущее состояние проекта

**Phase 1** — синхронизация каталога с UOGEL 2026: 6 серий, опции, технические таблицы, detail-страницы для каждой серии и опции.

**Phase 2** — редизайн главной страницы + design system: premium architectural platform, Inter, accent color, hover system, обновлённая типографика.

Сайт позиционируется как **architectural outdoor-systems platform**, не как лендинг или витрина с фиксированными ценами. Логика: проектный подбор системы из каталога UOGEL 2026, расчёт комплектации, поставка в Россию.

---

## 2. Сервер и инфраструктура

```
Сервер:    sanda-root-local  (192.168.50.86)
Проект:    /projects/web/uogel
Docker:    uogel-web  →  host 3001 : container 3000
Proxy:     NPM (Nginx Proxy Manager)  →  rtc.rdk-invest.ru (SSL)
Preview:   https://rtc.rdk-invest.ru
GitHub:    github-uogel:Yason24/uogel-web.git
Ветка:     main
```

Начинай каждую сессию с:

```bash
ssh sanda-root-local
cd /projects/web/uogel
git status
git rev-parse HEAD
```

---

## 3. Продуктовый каталог (6 серий)

| Серия | ID / Slug | Профиль стойки | Привод | Размеры |
|---|---|---|---|---|
| A13 | `a13` | 150×150 мм | Моторизованный | Конфигурация под проект |
| C10 | `c10` | 150×150 мм | Моторизованный | Конфигурация под проект |
| C7 | `c7` | 150×150 мм | Моторизованный | Конфигурация под проект |
| C4 / M4 | `c4` | 120×120 мм | Мотор / ручное | Стандартные конфигурации |
| M3 / M3-S | `m3` | 120×120 мм | Ручное | Стандартные конфигурации |
| M2-S | `m2-s` | 100×100 мм | Ручное | Стандартные конфигурации |

**Важные детали:**
- C4 и M4 — одна группа в каталоге, slug `c4`; не путать M4 с M2-S
- M2-S — отдельная серия с профилем 100×100 мм (у M3/M3-S профиль 120×120 мм)
- Изображения серий: `/public/images/products/[slug].jpg`

### Опции (7 позиций)

`zip-screen` · `frameless-glass` · `narrow-frame-glass` · `aluminium-shutters` · `ceiling-fan` · `electrical-heater` · `rain-wind-sensors`

---

## 4. Data architecture

Все данные о продуктах — только в data layer. Нельзя хардкодить в JSX.

```
src/types/index.ts       — типы: Product, Option, Lead, NavItem, SizeRange, …
src/data/pergolas.ts     — products[], availablePergolas, getPergolaBySlug()
src/data/options.ts      — options[]
src/data/navigation.ts   — navItems[]
src/lib/catalog.ts       — форматеры: formatSizeRange, formatDrive, formatSystemType, …
```

**Правило:** при добавлении/изменении серии или опции — сначала `src/data/`, потом страницы.

---

## 5. Design system (Phase 2)

```
Шрифт:         Inter (next/font/google), subsets: latin + cyrillic
Веса:          300 / 400 / 500 / 600
CSS var:       --font-inter

H1 / H2:       font-light  (крупные заголовки, hero, section titles)
H3 / карточки: font-medium
Eyebrow:       text-xs font-medium uppercase tracking-[0.2em] text-stone-400

Accent:        #c9783b  →  Tailwind: arch / arch-dark / arch-light / arch-muted
Hover links:   hover:text-arch / transition-colors duration-200
Hover buttons: hover:bg-arch
Cards hover:   group-hover:text-arch + hover:shadow-md

Dark sections:
  Hero:        bg-stone-950
  CTA blocks:  bg-stone-900

Запрещено:
  — яркие градиенты
  — ecommerce tone
  — orange как основной акцент
  — aggressive animations
```

---

## 6. Routes

```
/                   главная (Phase 2 redesign)
/catalog            обзор каталога
/pergolas           список серий
/pergolas/a13       серия A13
/pergolas/c10       серия C10
/pergolas/c7        серия C7
/pergolas/c4        серия C4 / M4
/pergolas/m3        серия M3 / M3-S
/pergolas/m2-s      серия M2-S
/options            список опций
/options/[slug]     карточка опции
/calculate          форма подбора (8 шагов, Quiz компонент)
/contacts
/delivery
/how-to-order
/gallery
/api/lead           POST — приём заявок (не трогать)
```

---

## 7. Leads / Telegram

```
Маршрут:     POST /api/lead  (src/app/api/lead/route.ts)
Telegram:    через NAS proxy 192.168.50.190:7890
Backup:      data/leads.jsonl  (Docker volume ./data:/app/data)
Rate limit:  3 заявки / IP / 10 минут (in-memory)
```

**Не трогать** `src/app/api/lead/route.ts`, `.env`, `.env.local`, `data/leads.jsonl` без отдельной задачи.

---

## 8. Docker workflow (обязательная последовательность)

`output: "standalone"` — `.next/standalone` создаётся только `npm run build`. Docker копирует этот каталог. **Без предварительного build контейнер не соберётся.**

```bash
cd /projects/web/uogel
git status
npm run lint
npm run build
docker compose down
docker compose build --no-cache
docker compose up -d
```

Проверка:

```bash
docker ps --filter name=uogel-web
docker logs --tail=50 uogel-web
curl -I http://127.0.0.1:3001
curl -s http://127.0.0.1:3001 | grep -Ei "UOGEL|пергол|биоклимат" | head -5
curl -I https://rtc.rdk-invest.ru
```

Критерии успеха:
- HTML содержит `UOGEL`, `пергол`, `биоклимат`
- HTML **не** содержит `To get started`, `Deploy Now`, `Next.js logo`
- `https://rtc.rdk-invest.ru` возвращает 200

---

## 9. Известные решённые проблемы

**Port 3000 conflict (2026-05-25):** NPM занимал порт 3000 на `0.0.0.0`. Исправлено маппингом `3001:3000` в `docker-compose.yml`. Backend в NPM для `rtc.rdk-invest.ru` — порт 3001.

**NAS (legacy):** ранее превью работало на NAS (`/volume1/Web/uogel`, `192.168.50.181:3000`). Сейчас не используется. Весь деплой — только на новом сервере `sanda-root-local`.

---

## 10. VPS (только для справки)

VPS `uzbek-vps` (81.85.49.193) — резервный preview. **Не трогать** без явной задачи. Docker bridge, nftables, sing-box настроены. Port 443 занят VLESS. Детали — git history.

---

## 11. Запреты

```
НЕ трогать:
  .env*  ·  data/*.jsonl  ·  .claude/
  NAS (192.168.50.181)  ·  роутер (80/443)
  NPM (кроме rtc.rdk-invest.ru backend)
  Matrix / MSChat  ·  Nextcloud  ·  Plex  ·  Talk HPB
  Docker других проектов на сервере
  VPS  ·  nftables  ·  sing-box  ·  VLESS  ·  WireGuard

НЕ делать:
  git push --force
  git reset --hard  (без явного разрешения)
  docker compose down для других проектов
  удалять папки без backup и явного разрешения
```

---

## 12. Документация

| Файл | Назначение |
|---|---|
| `AGENTS.md` | главный гайд для агентов |
| `README.md` | краткий обзор проекта |
| `PROJECT_NOTES.md` | технические заметки (этот файл) |
| `docs/chat-prompts.md` | промпты для чатов |
| `docs/uogel-catalog/` | PDF каталог UOGEL 2026 |
