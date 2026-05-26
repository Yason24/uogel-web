# UOGEL Russia — Media Coverage & Asset Library

Последнее обновление: 2026-05-26 (Phase 2 Step 14)

---

## Библиотека / _library/

Путь: `public/images/_library/`

Назначение: staging-area для новых premium-assets перед размещением на сайт.
Изображения из библиотеки НЕ подключаются к сайту автоматически.

### Текущее содержимое

| Файл | Категория | Описание | Качество | Статус |
|---|---|---|---|---|
| `lifestyle/lakeside-terrace-louver-view.jpg` | lifestyle | Вид снизу через белые открытые ламели на озеро/реку. Антрацит профиль. Обеденная зона. Весна. | ⭐⭐⭐ | Готов к использованию |
| `evening/enclosed-spa-patio-evening.jpg` | evening | Закрытая стеклянная пергола, spa-зона, гирлянды, закат. Интерьер-вид. | ⭐⭐⭐ | Готов к использованию |

### Предлагаемое использование из библиотеки

| Изображение | Страница | Позиция |
|---|---|---|
| `lifestyle/lakeside-terrace-louver-view.jpg` | `/pergolas/a13` или `/pergolas/c10` | images[2] (engineering close-up slot) |
| `evening/enclosed-spa-patio-evening.jpg` | `/options/frameless-glass` | images[1] — evening use case |

---

## Источник: uogele.com — Итог скрапинга (2026-05-26)

### Вывод: все фото на сайте имеют watermark

Просмотрено 40+ изображений из:
- `/uploads/44532/page/` — case-presentation фото
- `/uploads/44532/products/` — product gallery
- `/uploads/44532/banner/` — главные баннеры
- `/uploads/44532/small/` — thumbnails

**Типы watermark:**
1. Большой полупрозрачный UOGEL логотип по центру изображения (case study photos)
2. Цифровой watermark с логотипом (thumbnails с путём `/small/`)
3. Маркетинговые баннеры с текстом (banner images)

**НЕ подходят:**
- Баннеры: выставки (SPOGA+GAFA), заводские фото, текстовые маркетинговые
- Thumbnails: все с watermark от `/small/`
- Case-presentation: все с полупрозрачным UOGEL по центру
- Сертификаты, патенты, документы (видны в product pages)

**Исключения — без цифрового watermark:**
- `p20251208101326dbcf1.jpg` → `library/lifestyle/lakeside-terrace-louver-view.jpg` ✅
- `p202512081020386c36a.jpg` → `library/evening/enclosed-spa-patio-evening.jpg` ✅

---

## Текущие деплойнутые assets

### Перголы / Product Pages

| Серия | Hero image | Gallery (images[1+]) | Diagrams | Статус |
|---|---|---|---|---|
| A13 | `/images/products/a13.jpg` ✅ | `a13-install-coast.jpg`, `a13-install-evening.jpg` ✅ | `a13-catalog-page.jpg`, `catalog-overview.jpg` ✅ | Полное |
| C10 | `/images/products/c10.jpg` ✅ | `install-au-louvers.jpg`, `install-eu-garden.jpg` ✅ | `c10-catalog-page.jpg` ✅ | Полное |
| C7 | `/images/products/c7.jpg` ✅ | `c7-install-zip.jpg`, `install-eu-led.jpg` ✅ | `c7-catalog-page.jpg` ✅ | Полное |
| C4/M4 | `/images/products/c4.jpg` ✅ | `install-eu-led.jpg` ✅ | `c4-catalog-page.jpg` ✅ | Достаточно |
| M3/M3-S | `/images/products/m3.jpg` ✅ | `install-eu-garden.jpg` ✅ | `m3-m2s-catalog-page.jpg` ✅ | Достаточно |
| M2-S | `/images/products/m2-s.jpg` ✅ | `a13-install-evening.jpg` ✅ | `m3-m2s-catalog-page.jpg` ✅ | Достаточно |

**Примечание:** C4, M3, M2-S имеют по 2 изображения — достаточно для показа lifestyle+engineering секции без MediaPlaceholder. Для premium-quality нужны специализированные фото именно этих серий.

### Опции / Options Pages

| Опция | Hero/Detail image | Diagram | Статус |
|---|---|---|---|
| ZIP-экраны | `/images/options/zip-screen.jpg` ✅ | `zip-screen-catalog-page.jpg` ✅ | Полное |
| Безрамные двери | `/images/options/frameless-glass.jpg` ✅ | `frameless-glass-catalog-page.jpg` ✅ | Полное |
| Узкорамные двери | `/images/options/narrow-frame-glass.jpg` ✅ | `narrow-frame-glass-catalog-page.jpg` ✅ | Полное |
| Алюминиевые ставни | `/images/options/aluminium-shutters.webp` ✅ | `aluminium-shutters-catalog-page.jpg` ✅ | Полное |
| Потолочный вентилятор | `/images/options/ceiling-fan.jpg` ✅ | `catalog-overview.jpg` ✅ | Полное |
| Электрический обогреватель | `/images/options/electrical-heater.jpg` ✅ | `catalog-overview.jpg` ✅ | Полное |
| Датчики дождя и ветра | — ❌ | — ❌ | Нет изображений |

### Проекты / Projects Pages

| Проект | Hero image | Статус |
|---|---|---|
| private-terrace-coast (A13) | `a13-install-coast.jpg` ✅ | OK |
| evening-terrace (A13) | `a13-install-evening.jpg` ✅ | OK |
| garden-patio (M3) | `install-eu-garden.jpg` ✅ | OK |
| restaurant-summer-terrace (C10) | `a13-install-coast.jpg` ✅ | OK |
| cafe-patio-c7 (C7) | `c7-install-zip.jpg` ✅ | OK |
| hotel-lounge (C10) | `install-eu-led.jpg` ✅ | OK |
| rooftop-terrace (C7) | `c7-install-zip.jpg` | Shared с options hero |
| pool-zone (A13) | `install-au-louvers.jpg` | Технический вид, не lifestyle |

### Hero изображения (listing/index pages)

| Страница | Изображение | Статус |
|---|---|---|
| `/` (homepage) | `hero/hero-main.jpg` ✅ | OK |
| `/pergolas` | `gallery/install-au-louvers.jpg` | Технический, приемлемо |
| `/options` | `gallery/c7-install-zip.jpg` ✅ | OK |
| `/projects` | `products/c4.jpg` ✅ | Premium, coastal sunset |
| `/catalog` | нет hero-секции | — |

---

## Качество текущих assets

### Реальные фотографии (⭐⭐⭐)

| Файл | Тип | Описание |
|---|---|---|
| `products/c4.jpg` | Фото | Клифф-терраса на закате, ZIP-экраны, ланьтерны, море |
| `products/m2-s.jpg` | Фото | Компактная система у современного дома, сад |
| `gallery/a13-install-coast.jpg` | Фото | Прибрежный ресторан/резиденция, стеклянные панели |
| `gallery/a13-install-evening.jpg` | Фото | Вечерняя жилая терраса, LED, семья |
| `gallery/c7-install-zip.jpg` | Фото | Жилой дом, ZIP-экраны, антрацит |
| `gallery/install-eu-garden.jpg` | Фото | Садовая установка, тропическая зелень |
| `gallery/install-eu-led.jpg` | Фото | Жилой двор, открытые ламели, летний день |

### AI/CGI рендеры (⭐⭐)

| Файл | Описание |
|---|---|
| `products/a13.jpg` | Закат у бассейна, ставни, синий LED — premium CGI |
| `products/c10.jpg` | Деревянная терраса, горы, секционный диван — CGI |
| `products/c7.jpg` | Вечерняя стеклянная терраса, кинематографично — CGI |
| `products/m3.jpg` | Садовый рендер, ручные верёвки — CGI |

### Технический/Engineering вид (⭐)

| Файл | Описание |
|---|---|
| `gallery/install-au-louvers.jpg` | Вид сверху через ламели, технический |

---

## Что нужно добавить (приоритет)

### 🔴 Высокий приоритет

| Категория | Описание | Целевые страницы |
|---|---|---|
| **Hospitality evening** | Ресторанная терраса ночью с освещением | `/projects/restaurant-summer-terrace`, `/projects/hotel-lounge` |
| **Pool / rooftop lifestyle** | Зона у бассейна или rooftop с живыми людьми | `/projects/pool-zone`, `/projects/rooftop-terrace` |
| **Rain mode** | Закрытые ламели в дождь, стекает вода | `/options/rain-wind-sensors`, `/pergolas/a13` |
| **Датчики дождя/ветра** | Фото смонтированных датчиков | `/options/rain-wind-sensors` |
| **C4 compact residential** | Реальная установка 3×3 или 4×4 м | `/pergolas/c4` |

### 🟡 Средний приоритет

| Категория | Описание | Целевые страницы |
|---|---|---|
| **Engineering louver close-up** | Крупный план ламелей, водоотвод, стык | `/pergolas/a13` images[2], diagrams |
| **ZIP texture close-up** | Ткань/механизм ZIP крупно | `/options/zip-screen` images[1] |
| **Heater evening glow** | Инфракрасный обогреватель в работе, тёплый свет | `/options/electrical-heater` images[1] |
| **Fan integration** | Потолочный вентилятор на установке | `/options/ceiling-fan` images[1] |
| **Frameless glass evening** | Стеклянная терраса вечером | `/options/frameless-glass` images[1] |
| **M3/M2-S compact patio** | Небольшая терраса с ручной системой | `/pergolas/m3`, `/pergolas/m2-s` |

### 🟢 Низкий приоритет

| Категория | Описание | Целевые страницы |
|---|---|---|
| **Commercial scale** | Крупный объект 8×5+ м | `/projects/restaurant-summer-terrace` |
| **Winter use** | Использование зимой/в холод | Новый проект |
| **Outdoor kitchen** | Кухня под перголой | Lifestyle, homepage |

---

## Рекомендуемый mapping: серия → изображения

### A13 (флагман, всесезонность, LED)

**Нужно:**
- Evening restaurant terrace с тёплым светом
- Rain mode / закрытые ламели под дождём  
- LED strip close-up в ламелях
- Luxury rooftop или poolside

**Есть:**
- Прибрежная установка (стекло, белый профиль) ✅
- Вечерняя жилая терраса с LED ✅

### C10 (commercial, large span)

**Нужно:**
- Ресторанная терраса 8×4+ м с гостями
- Rooftop dining с городским видом
- Commercial установка с ZIP-экранами

**Есть:**
- Вид сверху через ламели (технический) ✅
- Садовая установка (жилая) ✅

### C7 (residential dining, ZIP)

**Нужно:**
- Обеденная терраса частного дома, ZIP наполовину опущен
- Вечернее освещение

**Есть:**
- ZIP-экраны, жилой дом, антрацит ✅
- Жилой двор, открытые ламели ✅

### C4/M4 (compact motor/manual)

**Нужно:**
- Терраса 3×3 или 4×4 м реальная установка
- Патио у дома, компактно

**Есть:**
- Клифф-терраса на закате (высокое качество, крупнее чем C4) ✅
- Жилой двор, открытые ламели ✅

### M3/M3-S (small patio, manual)

**Нужно:**
- Садовое патио 3×3 или 3×4 м
- Ручные верёвки управления видны

**Есть:**
- CGI рендер (приемлемо) ✅
- Садовая установка (тропическая зелень) ✅

### M2-S (minimal, compact)

**Нужно:**
- Минималистичная установка 3×3 м  
- Балкон или небольшая лоджия

**Есть:**
- Компактная система у современного дома (фото) ✅
- Вечерняя жилая (переиспользование A13 фото) ⚠️

---

## Рекомендации по следующим acquisitions

### Способы получить чистые изображения

1. **Прямой запрос к поставщику UOGEL** — запросить press kit / media kit без watermark
2. **Google Drive** — уточнить наличие исходных фото без branding
3. **Партнёрские проекты** — фото реальных установок от клиентов после поставки
4. **Stock photography** — Unsplash, Pexels (поиск: bioclimatic pergola, louvered pergola, aluminum pergola) для lifestyle-атмосферы пока нет реальных проектов

### Что делать с uogele.com

- Все изображения имеют цифровые watermark → не использовать напрямую
- Можно использовать как REFERENCE для понимания продуктов и сцен
- При прямом сотрудничестве с производителем — запросить clean versions

---

## Неиспользуемые файлы

| Файл | Размер | Примечание |
|---|---|---|
| `/images/options/option-led.jpg` | 130 KB | Нет опции LED в data layer. Оставить |
| `/images/options/option-zip-screen.webp` | 43 KB | Можно добавить как `images[1]` к zip-screen опции |
| `/images/_incoming/products-hero.jpg` | 84 KB | Pixelated CGI 1920×350, слишком низкое качество, не использовать |
| `/images/_incoming/banner-1.jpg` | 282 KB | Не просмотрен полностью, проверить вручную |

---

## Диаграммы / Technical Diagrams

Все технические диаграммы оснащены `TechnicalDiagramCard` с `ImageLightbox`.

| Серия | Диаграмма | Статус |
|---|---|---|
| A13 | `a13-catalog-page.jpg`, `catalog-overview.jpg` | ✅ |
| C10 | `c10-catalog-page.jpg` | ✅ |
| C7 | `c7-catalog-page.jpg` | ✅ |
| C4/M4 | `c4-catalog-page.jpg` | ✅ |
| M3/M3-S | `m3-m2s-catalog-page.jpg` | ✅ |
| M2-S | `m3-m2s-catalog-page.jpg` (shared) | ✅ |
| ZIP-экраны | `zip-screen-catalog-page.jpg` | ✅ |
| Безрамные двери | `frameless-glass-catalog-page.jpg` | ✅ |
| Узкорамные двери | `narrow-frame-glass-catalog-page.jpg` | ✅ |
| Алюминиевые ставни | `aluminium-shutters-catalog-page.jpg` | ✅ |

---

## Размеры файлов / Performance

Все deployed изображения в пределах нормы.

| Группа | Макс. размер |
|---|---|
| products/ | 298 KB (c10.jpg) |
| gallery/ | 307 KB (install-eu-led.jpg) |
| options/ | 221 KB (electrical-heater.jpg) |
| diagrams/ | 151 KB (c10-catalog-page.jpg) |
| _library/ | 190 KB (lakeside-terrace-louver-view.jpg) |
