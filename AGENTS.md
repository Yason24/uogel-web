# UOGEL Russia — Agent Guide

Главный операционный гайд для Codex, Claude, Copilot и других агентов, работающих над UOGEL Russia Website.

## 1. Обзор проекта

```
Проект:      UOGEL Russia Website
GitHub:      github-uogel:Yason24/uogel-web.git
Ветка:       main
Путь:        /projects/web/uogel  (единственный рабочий путь)
Preview:     https://rtc.rdk-invest.ru/
Docker:      uogel-web  (sanda-root-local, 192.168.50.86)
Порт:        host 3001 → container 3000
```

**Позиционирование:** архитектурная outdoor-systems platform. Не MVP, не лендинг, не ecommerce. Проектный подбор системы из каталога UOGEL 2026, расчёт комплектации, поставка в Россию.

Stack: Next.js 15 (App Router, `output: "standalone"`), TypeScript, Tailwind CSS v3, Google Fonts Inter.

## 2. Бизнес-логика

Сайт помогает **подобрать систему из каталога UOGEL 2026** под конкретный объект.

**Разрешённые формулировки:**
- подобрать серию из каталога под проект
- рассчитать комплектацию по выбранной серии
- выбрать конфигурацию из доступных вариантов
- custom sizing для флагманских серий (A13, C10, C7, C7)
- стандартные конфигурации для C4/M4, M3/M3-S, M2-S

**Не писать:**
- любой размер под заказ
- изготовим любую конфигурацию
- официальный дилер / официальный представитель / эксклюзивный дистрибьютор (если нет подтверждённого договора)

## 3. Продуктовый каталог

### Серии пергол (6 штук)

| Серия | Slug | Профиль | Привод | Тип размеров |
|---|---|---|---|---|
| A13 | `a13` | 150×150 мм | Моторизованный | Конфигурация под проект |
| C10 | `c10` | 150×150 мм | Моторизованный | Конфигурация под проект |
| C7 | `c7` | 150×150 мм | Моторизованный | Конфигурация под проект |
| C4 / M4 | `c4` | 120×120 мм | Мотор / ручное | Стандартные конфигурации |
| M3 / M3-S | `m3` | 120×120 мм | Ручное | Стандартные конфигурации |
| M2-S | `m2-s` | 100×100 мм | Ручное | Стандартные конфигурации |

**Критично:**
- C4 и M4 — одна группа, единый slug `c4`
- M2-S — отдельная серия (профиль 100×100 мм, не путать с M3)
- Изображения: `/public/images/products/[slug].jpg`

### Опции (7 позиций)

`zip-screen` · `frameless-glass` · `narrow-frame-glass` · `aluminium-shutters` · `ceiling-fan` · `electrical-heater` · `rain-wind-sensors`

## 4. Data architecture

**Правило: не хардкодить product data в JSX. Сначала обновлять data layer, потом UI.**

```
src/types/index.ts       — типы: Product, Option, Lead, NavItem, …
src/data/pergolas.ts     — products[], availablePergolas, getPergolaBySlug()
src/data/options.ts      — options[]
src/data/navigation.ts   — navItems[]
src/lib/catalog.ts       — форматеры: formatSizeRange, formatDrive, formatSystemType, …
```

## 5. Routes

```
/                   главная
/catalog            обзор каталога
/pergolas           список серий
/pergolas/[slug]    карточка серии  (a13, c10, c7, c4, m3, m2-s)
/options            список опций
/options/[slug]     карточка опции
/calculate          форма подбора (8 шагов)
/contacts
/delivery
/how-to-order
/gallery
/api/lead           POST — не трогать без задачи
```

## 6. Design system (Phase 2)

```
Шрифт:         Inter (next/font/google), latin + cyrillic
Веса:          300 / 400 / 500 / 600

H1 / H2:       font-light
H3 / карточки: font-medium
Eyebrow:       text-xs font-medium uppercase tracking-[0.2em] text-stone-400
Body:          text-stone-500/600, leading-7/8

Accent:        #c9783b  →  Tailwind класс: arch
Hover links:   hover:text-arch + transition-colors duration-200
Hover buttons: hover:bg-arch
Cards hover:   group-hover:text-arch
Transitions:   transition-colors duration-200/300

Dark sections:
  Hero:        bg-stone-950
  CTA blocks:  bg-stone-900

НЕ использовать:
  — яркие градиенты
  — ecommerce tone
  — aggressive animations
  — neon / glow effects
```

## 7. Рабочие директории

Работать **только** в:

```bash
/projects/web/uogel
```

Не работать в:
- `/workspace`
- `/volume1/Web/uogel` (NAS — устарело)
- `/volume1/Web/uogel-next-tmp`
- временных папках Next.js

## 8. Git workflow

Перед изменениями:

```bash
cd /projects/web/uogel
git status
git rev-parse HEAD
```

После изменений:

```bash
git status
git add src/ tailwind.config.ts  # (конкретные файлы)
git commit -m "Понятное описание изменений"
git push
```

Никогда: `git reset --hard` и force push без явного разрешения.

## 9. Development workflow

Перед написанием кода прочитай Next.js docs в `node_modules/next/dist/docs/` если они есть.

```bash
npm install
npm run dev
```

Обязательно перед commit:

```bash
npm run lint
npm run build
```

## 10. Docker deploy (новый сервер)

> **Критично:** `output: "standalone"` — без `npm run build` Docker build упадёт с ошибкой `"/.next/standalone": not found`.

Полная последовательность:

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
docker logs --tail=100 uogel-web
curl -I http://127.0.0.1:3001
curl -s http://127.0.0.1:3001 | grep -Ei "UOGEL|пергол|Рассчитать|стоимость|биоклимат" | head -10
```

Критерии успеха:
- HTML содержит `UOGEL`, `пергол`, `Рассчитать`, `стоимость` или `биоклимат`
- HTML **не** содержит `To get started`, `Deploy Now`, `Next.js logo`
- `https://rtc.rdk-invest.ru` открывается в браузере

## 11. VPS HTTP preview

VPS preview: `http://81.85.49.193/`

- Хост: `uzbek-vps`
- Путь: `/opt/uogel`
- Контейнер: `uogel-web`
- Port 443 занят `sing-box` / VLESS — не использовать для сайта
- `nftables` включён, политика forward: drop — Docker bridge требует явных allow-правил
- UOGEL Docker forward rules в `/etc/nftables.conf` не трогать

**Не трогать** VPS runtime, Docker, nftables, sing-box, VLESS, WireGuard, домен, HTTPS без явной задачи.

## 12. Proxy / сеть

Новый сервер имеет прямой доступ к интернету — проксирование не требуется.

Проверка:

```bash
curl https://ifconfig.me/ip
curl -I https://github.com
curl -I https://api.github.com
```

## 13. Leads / Telegram

```
Маршрут:     POST /api/lead  (src/app/api/lead/route.ts)
Telegram:    через NAS proxy 192.168.50.190:7890
Backup:      data/leads.jsonl  (Docker volume ./data:/app/data)
Rate limit:  3 заявки / IP / 10 минут (in-memory)
```

- Telegram не работает напрямую из контейнера в России
- Локальный backup обязателен
- Не коммитить `.env`, `.env.local`, `data/leads.jsonl`

## 14. Запреты

```
НЕ трогать:
  .env*  ·  data/*.jsonl  ·  .claude/
  NAS (192.168.50.181, /volume1/Web/)
  Роутер (80/443 port forwarding)
  NPM (кроме настройки rtc.rdk-invest.ru)
  Matrix / MSChat  ·  Nextcloud  ·  Plex  ·  Talk HPB
  Docker других проектов на sanda-root-local
  VPS  ·  nftables  ·  sing-box  ·  VLESS  ·  WireGuard
  code-server (порт 8888 — только LAN, не публиковать)

НЕ делать:
  git push --force
  git reset --hard  (без явного разрешения)
  force push в main
  docker compose down для других проектов
  удалять папки без backup и явного разрешения
```

## 15. Валидационный чеклист перед сдачей

```
□  pwd = /projects/web/uogel
□  git status — нет лишних изменений
□  npm run lint — чисто
□  npm run build — успешно
□  Документация-only задачи не меняют код, Docker, proxy
□  Если контейнер пересобирался — критерии п.10 выполнены
□  curl -I https://rtc.rdk-invest.ru → 200 OK
```

## 16. Известные решённые проблемы

**Port 3000 conflict (2026-05-25):** NPM занимал порт 3000. Исправлено: `docker-compose.yml` маппинг `3001:3000`, backend NPM = порт 3001.

**NAS preview (legacy):** NAS ранее показывал default Next.js страницу — решено пересборкой контейнера. NAS preview не используется.

## 17. Чаты проекта

Документация чатов: `docs/chat-prompts.md`

```
00 HUB / Главный чат
01 Сайт / Архитектура
02 Сайт / Разработка
03 Сайт / Дизайн
04 Сайт / Контент
05 Сайт / Ошибки и ревью
10 Бизнес / План
11 Китай / UOGEL / Поставщики
20 Instagram
21 Telegram
22 Реклама
30 Brainstorm / Идеи
40 Документы
41 База знаний
```

## 18. Что читать перед стартом

1. `AGENTS.md` (этот файл)
2. `PROJECT_NOTES.md`
3. `README.md`
4. `docs/chat-prompts.md`
5. `node_modules/next/dist/docs/` — перед framework-specific изменениями
