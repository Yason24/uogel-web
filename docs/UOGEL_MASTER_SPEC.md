# UOGEL Russia Master Technical Specification

Обновлено: 2026-05-26

Этот документ является главным source of truth для продукта, архитектуры и инженерных правил сайта UOGEL Russia. Это не README, не маркетинговое описание и не список задач. Документ фиксирует уже принятые решения проекта и правила, которым должны следовать разработка, дизайн, контент и агентские сессии.

## 1. Project Identity

```
Проект:      UOGEL Russia Website
GitHub:      github-uogel:Yason24/uogel-web.git
Ветка:       main
Путь:        /projects/web/uogel
Preview:     https://rtc.rdk-invest.ru/
Docker:      uogel-web
Порт:        host 3001 -> container 3000
Stack:       Next.js 15, TypeScript, Tailwind CSS v3, Inter
```

UOGEL Russia - это architectural outdoor systems platform для проектного подбора систем UOGEL 2026 и расчета комплектации с поставкой в Россию.

Проект не является ecommerce-магазином навесов, витриной случайных товаров, агрессивным sales landing или каталогом фиксированных размеров.

## 2. Product Philosophy

Базовая логика продукта:

- systems;
- configurations;
- compatibility;
- project consultation;
- engineering presentation.

Сайт должен помогать пользователю выбрать подходящую архитектурную outdoor-систему под объект, а не просто купить абстрактный навес из карточки товара.

Разрешенная продуктовая рамка:

- подобрать серию из каталога UOGEL 2026 под проект;
- рассчитать комплектацию по выбранной серии;
- выбрать конфигурацию из доступных вариантов;
- показать совместимость систем и ecosystem layer;
- передать заявку на консультацию и инженерный подбор.

Запрещенная продуктовая рамка:

- "любой размер под заказ";
- "изготовим любую конфигурацию";
- "официальный дилер", "официальный представитель", "эксклюзивный дистрибьютор" без подтвержденного договора;
- fake discounts, остатки, "успейте купить";
- ecommerce-tone с корзиной, SKU-логикой и случайными товарами.

## 3. Catalog Philosophy

Каталог строится вокруг серий, а не вокруг сетки "3x3 / 4x4".

Правильная модель: series-based architecture.

Размерная логика бывает двух типов:

- standard configurations - заранее доступные конфигурации серии;
- custom sizing - подбор конфигурации под проект в пределах реальной сетки UOGEL.

PDF-каталог UOGEL 2026 является source/reference only. Его нельзя вставлять в интерфейс как основной UI. Данные из PDF должны быть структурированы в data layer и представлены через reusable UI: технические таблицы, цветовые swatches, конфигурации, compatibility blocks и mobile-safe specs.

## 4. Product Model

В проекте зафиксированы 6 групп пергол:

| Серия | Slug | Профиль | Привод | Размерная логика |
|---|---|---|---|---|
| A13 | `a13` | 150x150 мм | Моторизованный | Конфигурация под проект |
| C10 | `c10` | 150x150 мм | Моторизованный | Конфигурация под проект |
| C7 | `c7` | 150x150 мм | Моторизованный | Конфигурация под проект |
| C4 / M4 | `c4` | 120x120 мм | Мотор / ручное | Стандартные конфигурации |
| M3 / M3-S | `m3` | 120x120 мм | Ручное | Стандартные конфигурации |
| M2-S | `m2-s` | 100x100 мм | Ручное | Стандартные конфигурации |

Обязательные правила:

- C4 и M4 - одна продуктовая группа с единым slug `c4`;
- M4 должен вести на `/pergolas/c4`, отдельный публичный slug `/pergolas/m4` не является основной карточкой;
- M2-S - отдельная compact manual system, ее нельзя объединять с M3/M3-S;
- M2-S использует профиль 100x100 мм, M3/M3-S - 120x120 мм;
- изображения серий должны строго соответствовать серии;
- основной путь изображений серий: `/public/images/products/[slug].jpg`.

## 5. Options Model

Опции являются ecosystem layer, а не "допами". Они расширяют систему: закрывают проемы, добавляют климат, автоматику и сценарии использования.

Зафиксированные опции:

| Option | Slug | Роль |
|---|---|---|
| ZIP-экраны | `zip-screen` | Боковая защита от солнца, ветра и взглядов |
| Безрамное стекло | `frameless-glass` | Прозрачное закрытие проемов |
| Узкорамное стекло | `narrow-frame-glass` | Стеклянная система с тонким профилем |
| Алюминиевые ставни | `aluminium-shutters` | Приватность и боковая защита |
| Потолочный вентилятор | `ceiling-fan` | Циркуляция воздуха |
| Электрический обогреватель | `electrical-heater` | Продление сезона |
| Датчики дождя и ветра | `rain-wind-sensors` | Автоматическая защита |

Совместимость опций должна рассчитываться через data layer, а не через хардкод в JSX.

## 6. Form Philosophy

`/calculate` - это project intake form.

Это не price calculator и не мгновенный калькулятор стоимости. Основная цель формы:

- qualification;
- сбор параметров объекта;
- определение подходящей серии;
- первичный подбор совместимых опций;
- передача заявки на консультацию;
- подготовка расчета комплектации.

Интерфейс формы не должен обещать точную цену без проектной проверки. Формулировки должны оставаться инженерными: "рассчитать комплектацию", "подобрать систему", "получить консультацию", "уточнить конфигурацию".

## 7. Application Architecture

```
src/app                 App Router routes, pages, metadata, API route
src/components          Reusable UI and feature components
src/data                Product, option and navigation data
src/types               Shared TypeScript domain types
src/lib                 Formatters and catalog helpers
public/images           Product, option and UI images
docs                    Project documentation and source references
```

Главное архитектурное правило: data-first architecture.

Product data, option data, compatibility, images, technical specs and SEO metadata must live in structured data files first. JSX renders data; it must not become the source of product truth.

Data layer:

```
src/types/index.ts       Product, Option, Lead, NavItem, SizeRange, ProfileColor
src/data/pergolas.ts     products[], pergolas, availablePergolas, getPergolaBySlug()
src/data/options.ts      options[], pergolaOptions
src/data/navigation.ts   navItems[]
src/lib/catalog.ts       formatSizeRange(), formatDrive(), formatSystemType(), getCompatibleOptions()
```

When changing product/catalog behavior:

1. Update types if the domain model changes.
2. Update `src/data/`.
3. Update helpers in `src/lib/` if formatting or compatibility rules change.
4. Update UI routes/components.
5. Verify lint and production build.

## 8. Routes

Public route map:

```
/                   главная
/catalog            обзор каталога
/pergolas           список серий
/pergolas/[slug]    карточка серии: a13, c10, c7, c4, m3, m2-s
/options            список опций
/options/[slug]     карточка опции
/calculate          project intake form
/contacts           контакты
/delivery           доставка
/how-to-order       как заказать
/gallery            галерея
```

API route:

```
/api/lead           POST, прием заявок
```

Dynamic routing conventions:

- `/pergolas/[slug]` получает серию через `getPergolaBySlug()`;
- неизвестный slug должен вести к корректному not-found flow;
- `/options/[slug]` работает от массива `options`;
- route metadata должна использовать SEO-поля из data layer;
- не создавать отдельные динамические страницы для алиасов, если основной slug уже зафиксирован.

## 9. Data Model

Core domain types:

```ts
type ProductCategory = "bioclimatic" | "louvered";
type DriveType = "motorized" | "manual" | "both";
type SystemType = "freestanding" | "wall-mounted" | "both";
type ProductStatus = "available" | "coming-soon" | "archived";
type OptionCategory = "screens" | "glass" | "shutters" | "lighting" | "climate" | "automation";
type PriceType = "included" | "extra" | "on-request";
```

Product must include:

- stable `id` and public `slug`;
- `seriesName`, `title`, `subtitle`, `description`;
- category, drive, system type and status;
- `sizeRange` with standard sizes or customizable range;
- `specs` for technical presentation;
- base equipment;
- compatible option ids;
- profile colors;
- use cases;
- image paths;
- SEO metadata.

Option must include:

- stable `id` and public `slug`;
- title, subtitle and category;
- description, features and optional variants;
- image paths;
- compatibility object;
- price type;
- SEO metadata.

Lead must remain a project intake object, not an order/cart object.

## 10. Technical Specs System

Technical presentation must be reusable and structured.

Required UI patterns:

- reusable technical tables for profile, blades, beams, drive and drainage;
- color swatches for RAL/custom colors;
- standard configuration blocks for fixed-size systems;
- custom sizing range blocks for flagship systems;
- compatibility blocks for options;
- base equipment lists;
- mobile-safe layouts for specs and tables.

Rules:

- technical values come from data objects;
- table labels and formatters should be shared where possible;
- avoid one-off JSX for the same type of product spec;
- PDF remains a source/reference, not the UI;
- mobile screens must not require horizontal scrolling for core specs.

## 11. Design Philosophy

Direction: premium architectural engineering.

The visual system should feel calm, technical and architectural. It should support considered project decisions, not impulse buying.

Core design conventions:

- Inter via `next/font/google`;
- font weights 300, 400, 500, 600;
- H1/H2 use `font-light`;
- H3 and card titles use `font-medium`;
- eyebrow text: `text-xs font-medium uppercase tracking-[0.2em] text-stone-400`;
- graphite / stone / zinc palette;
- accent color `#c9783b` exposed as Tailwind `arch`;
- subtle hover states: `hover:text-arch`, `hover:bg-arch`, `group-hover:text-arch`;
- transitions: `transition-colors duration-200/300`;
- dark hero sections: `bg-stone-950`;
- CTA blocks: `bg-stone-900`;
- large product imagery;
- clean spacing and readable rhythm.

Forbidden:

- bright gradients;
- neon or glow effects;
- fake discounts;
- ecommerce urgency;
- AliExpress-like tone;
- random stock photos;
- aggressive motion;
- decorative UI that competes with product information.

## 12. Images And Media

Product images are part of product truth. A page must not show a visually mismatched system for a series.

Conventions:

```
/public/images/products/a13.jpg
/public/images/products/c10.jpg
/public/images/products/c7.jpg
/public/images/products/c4.jpg
/public/images/products/m3.jpg
/public/images/products/m2-s.jpg
/public/images/options/[slug].jpg
```

Rules:

- use real product/system imagery where possible;
- do not use generic patio stock photography as a substitute for product identification;
- avoid dark, cropped or purely atmospheric imagery when the user needs to understand the system;
- image paths should live in `src/data/`.

## 13. Leads And API

Lead route:

```
POST /api/lead
File: src/app/api/lead/route.ts
Backup: data/leads.jsonl
Rate limit: 3 заявки / IP / 10 минут
Telegram: through NAS proxy 192.168.50.190:7890
```

Rules:

- do not edit `/api/lead` without a dedicated task;
- local backup is required;
- never commit `.env`, `.env.local` or `data/leads.jsonl`;
- the form must remain a consultation/project intake flow.

## 14. Engineering Workflow

All work must happen in:

```bash
cd /projects/web/uogel
```

Before changes:

```bash
git status
git rev-parse HEAD
```

Development:

```bash
npm install
npm run dev
```

Before commit:

```bash
npm run lint
npm run build
```

Commit rules:

- use focused commits;
- add only files related to the task;
- do not revert unrelated user changes;
- do not commit environment files or runtime data;
- never use `git push --force`.

## 15. Build And Deploy

Next.js uses:

```js
output: "standalone"
```

Because of standalone output, Docker build depends on a successful production build. `.next/standalone` must exist before Docker image build.

Standard Docker deploy sequence:

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

Deploy verification:

```bash
docker ps --filter name=uogel-web
docker logs --tail=100 uogel-web
curl -I http://127.0.0.1:3001
curl -s http://127.0.0.1:3001 | grep -Ei "UOGEL|пергол|Рассчитать|стоимость|биоклимат" | head -10
curl -I https://rtc.rdk-invest.ru
```

Success criteria:

- `uogel-web` container is running;
- local preview on port 3001 responds;
- public preview returns HTTP 200;
- HTML contains UOGEL/product content;
- HTML does not contain default Next.js starter content such as `To get started`, `Deploy Now` or `Next.js logo`.

## 16. Safety Rules

Do not touch without explicit task:

```
.env*
data/*.jsonl
.claude/
NAS 192.168.50.181
/volume1/Web/
router port forwarding
Docker networks
Docker containers of other projects
Matrix / MSChat
Nextcloud
Plex
Talk HPB
VPS
nftables
sing-box
VLESS
WireGuard
code-server publishing
```

Forbidden:

```bash
git push --force
git reset --hard
docker compose down  # for unrelated projects
```

Deleting folders or runtime data requires explicit approval and a backup plan.

## 17. Current Phase

```
PHASE 1 - completed
PHASE 2 - in progress
```

Phase 1 completed:

- catalog synchronized with UOGEL 2026 product model;
- 6 pergola groups;
- 7 option entries;
- dynamic detail pages for series and options;
- structured product and option data layer;
- technical specs and compatibility presentation.

Phase 2 in progress:

- homepage redesign;
- premium architectural design system;
- Inter typography;
- arch accent color;
- calmer hover and transition system;
- stronger product imagery and engineering presentation.

## 18. Source Priority

When sources conflict, use this priority:

1. `docs/UOGEL_MASTER_SPEC.md` - product, architecture and engineering source of truth.
2. `AGENTS.md` - operational rules for agents and environment safety.
3. `src/types/`, `src/data/`, `src/lib/` - executable domain model.
4. `PROJECT_NOTES.md` - current implementation notes.
5. `README.md` - short public project overview.
6. `docs/uogel-catalog/` - PDF/source references, not UI architecture.

If implementation and specification diverge, update the data model and UI intentionally, then update this document in the same change set.
