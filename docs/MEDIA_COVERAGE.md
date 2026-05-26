# UOGEL Russia — Media Coverage Audit

Последнее обновление: 2026-05-26 (Phase 2 Step 12)

---

## Перголы / Product Pages

| Серия | Hero image | Gallery (images[1+]) | Diagrams | Статус |
|---|---|---|---|---|
| A13 | `/images/products/a13.jpg` ✅ | `a13-install-coast.jpg`, `a13-install-evening.jpg` ✅ | `a13-catalog-page.jpg`, `catalog-overview.jpg` ✅ | Полное |
| C10 | `/images/products/c10.jpg` ✅ | `install-au-louvers.jpg`, `install-eu-garden.jpg` ✅ | `c10-catalog-page.jpg` ✅ | Полное |
| C7 | `/images/products/c7.jpg` ✅ | `c7-install-zip.jpg`, `install-eu-led.jpg` ✅ | `c7-catalog-page.jpg` ✅ | Полное |
| C4/M4 | `/images/products/c4.jpg` ✅ | — ❌ | `c4-catalog-page.jpg` ✅ | Нет галереи |
| M3/M3-S | `/images/products/m3.jpg` ✅ | — ❌ | `m3-m2s-catalog-page.jpg` ✅ | Нет галереи |
| M2-S | `/images/products/m2-s.jpg` ✅ | — ❌ | `m3-m2s-catalog-page.jpg` ✅ | Нет галереи |

**Отсутствующие assets:**
- C4/M4: нужны 1–2 фото реальных конфигураций 3×3, 3×4, 4×4, 6×3 м
- M3/M3-S: нужны 1–2 фото компактных террасных конфигураций 3×3, 3×4 м
- M2-S: нужны 1–2 фото компактных террасных конфигураций 3×3, 3×4 м

**Текущее поведение:** для C4, M3, M2-S на `/pergolas/[slug]` lifestyle+engineering секция заменяется `MediaPlaceholder` ("Дополнительные фото серии будут добавлены").

---

## Опции / Options Pages

| Опция | Hero/Detail image | Diagram | Статус |
|---|---|---|---|
| ZIP-экраны | `/images/options/zip-screen.jpg` ✅ | `zip-screen-catalog-page.jpg` ✅ | Полное |
| Безрамные двери | `/images/options/frameless-glass.jpg` ✅ | `frameless-glass-catalog-page.jpg` ✅ | Полное |
| Узкорамные двери | `/images/options/narrow-frame-glass.jpg` ✅ | `narrow-frame-glass-catalog-page.jpg` ✅ | Полное |
| Алюминиевые ставни | `/images/options/aluminium-shutters.webp` ✅ | `aluminium-shutters-catalog-page.jpg` ✅ | Полное |
| Потолочный вентилятор | `/images/options/ceiling-fan.jpg` ✅ | `catalog-overview.jpg` ✅ | Полное |
| Электрический обогреватель | `/images/options/electrical-heater.jpg` ✅ | `catalog-overview.jpg` ✅ | Полное |
| Датчики дождя и ветра | — ❌ | — ❌ | Нет изображений |

**Отсутствующие assets:**
- rain-wind-sensors: нужно фото датчиков на установленной системе

**Текущее поведение:** hero для `rain-wind-sensors` показывается без фонового изображения (solid dark bg). Корректно.

---

## Проекты / Projects Pages

| Проект | Hero image | Extra images (images[1+]) | Статус |
|---|---|---|---|
| private-terrace-coast (A13) | `a13-install-coast.jpg` ✅ | `gallery-3x3-terrace.jpg` ✅ | Полное |
| evening-terrace (A13) | `a13-install-evening.jpg` ✅ | `gallery-3x4-patio.jpg` ✅ | Полное |
| garden-patio (M3) | `install-eu-garden.jpg` ✅ | — ❌ | Нет extra |
| restaurant-summer-terrace (C10) | `gallery-4x6-restaurant.webp` ✅ | — ❌ | Нет extra |
| cafe-patio-c7 (C7) | `gallery-4x4-cafe.jpg` ✅ | — ❌ | Нет extra |
| hotel-lounge (C10) | `install-eu-led.jpg` ✅ | — ❌ | Нет extra |
| rooftop-terrace (C7) | `c7-install-zip.jpg` ✅ | — ❌ | Нет extra |
| pool-zone (A13) | `install-au-louvers.jpg` ✅ | — ❌ | Нет extra |

**Текущее поведение:** для проектов без extra images показывается `MediaPlaceholder` ("Дополнительные фото конфигурации будут добавлены").

---

## Неиспользуемые файлы

| Файл | Размер | Примечание |
|---|---|---|
| `/images/options/option-led.jpg` | 130 KB | Нет опции LED в data layer. Оставить для будущего `led-lighting` entry |
| `/images/options/option-zip-screen.webp` | 43 KB | Thumbnail/preview ZIP. Можно добавить как `images[1]` к zip-screen опции |

---

## Hero изображения (listing/index pages)

| Страница | Изображение | Статус |
|---|---|---|
| `/pergolas` | `install-au-louvers.jpg` ✅ | Установка пергол, подходит |
| `/options` | `c7-install-zip.jpg` ✅ | ZIP-экраны на C7, подходит |
| `/projects` | `gallery-4x6-restaurant.webp` ✅ | Коммерческое применение, подходит |
| `/` (homepage) | `hero-main.jpg` ✅ | Основной hero |

---

## Диаграммы / Technical Diagrams

Все технические диаграммы оснащены `TechnicalDiagramCard` с `ImageLightbox`:
- Клик → fullscreen overlay ✅
- ESC → close ✅
- Backdrop click → close ✅
- Mobile pinch-zoom → нативный touchAction="pinch-zoom" ✅

---

## Размеры файлов

Все изображения в пределах нормы (< 310 KB). Оптимизация не требуется.

| Группа | Макс. размер |
|---|---|
| products/ | 298 KB (c10.jpg) |
| gallery/ | 307 KB (install-eu-led.jpg) |
| options/ | 221 KB (electrical-heater.jpg) |
| diagrams/ | 151 KB (c10-catalog-page.jpg) |

---

## Что нужно добавить (приоритет)

1. **Высокий:** Фото реальных установок C4/M4 (3×3, 4×4 м), M3/M3-S (3×3, 3×4 м), M2-S (3×3 м)
2. **Средний:** Extra images для 6 проектов (по 1–2 дополнительных ракурса)
3. **Низкий:** Фото датчиков rain-wind-sensors
4. **По желанию:** Использовать `option-zip-screen.webp` как `images[1]` для zip-screen опции
