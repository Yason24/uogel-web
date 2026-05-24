# UOGEL Russia Image Audit

Дата проверки: 2026-05-23.

Проверены локальные изображения:

- `public/images/hero`
- `public/images/pergolas`
- `public/images/options`
- `public/images/gallery`

Код массово не менялся. Изображения не удалялись. Случайные внешние изображения не скачивались. Прямые `uogele.com` URL в production-коде для изображений не используются: сайт ссылается на локальные `/images/...`.

## Основная таблица

| Страница | Блок | Текущий файл | Что изображено | Подходит? | Что нужно вместо |
| -------- | ---- | ------------ | -------------- | --------- | ---------------- |
| `/` | Hero | `/images/hero/hero-main.webp` | Квадратный рендер/фото большой отдельно стоящей перголы с боковыми стеклянными/экранными секциями у бассейна, с логотипом UOGEL в углу | Частично | Широкое качественное hero-фото без логотипа/водяного знака, желательно реальная биоклиматическая пергола в жилом или коммерческом сценарии; можно взять кандидат из Drive: `Bioclimatic-Pergola/aluminium-gazebo-with-louvered-roofa0e27c26-5f85-42f0-b87c-bec44d4dd33c.jpg` или другой чистый lifestyle-кадр |
| `/` | Каталог: карточка 3 x 3 | `/images/pergolas/pergola-3x3-metal-1.jpg` | Отдельно стоящая темная пергола у частного дома, логотип UOGEL | Да, с оговоркой | Подходит по типу, но лучше заменить на чистую версию без логотипа из Drive: `Bioclimatic-Pergola/metal-gazebo-with-louvered-roof74a76cb4-c434-44f4-b801-402d50db99ee.jpg` или похожий 3x3/compact lifestyle |
| `/` | Каталог: карточка 3 x 4 | `/images/pergolas/pergola-3x4-aluminium-1.jpg` | Палитра RAL и образцы цветов | Нет | Фото самой перголы 3 x 4 / семейной террасы. Подходящий кандидат из Drive: `Bioclimatic-Pergola/modern-deck-pergola00d04e30-b492-45cb-9ad6-11d122c835da.jpg` или `Bioclimatic-Pergola/outdoor-patio-with-pergola22add.jpg` |
| `/` | Каталог: карточка 4 x 4 wall-mounted | `/images/pergolas/pergola-4x4-wall-mounted-1.jpg` | Коллаж сертификатов `60+ Patents / Our Certifications` | Нет | Пристенная пергола у фасада/кафе. Искать в Drive среди `Bioclimatic-Pergola/pergola-with-louvered-roof-and-screens...`, `Bioclimatic-Pergola/pergola-with-doors...` или wall-mounted/gazebo кадров |
| `/` | Каталог: карточка 4 x 6 | `/images/pergolas/pergola-4x6-louvered-1.webp` | То же изображение, что hero: большая пергола с боковыми секциями у бассейна | Частично | Для карточки 4 x 6 лучше отдельный широкий коммерческий/ресторанный кадр без логотипа; кандидат: `Bioclimatic-Pergola/louvered-pergola-with-sides01180.jpg` или `Bioclimatic-Pergola/luxury-aluminum-pergola32293.jpg` |
| `/pergolas` | Карточка 3 x 3 | `/images/pergolas/pergola-3x3-metal-1.jpg` | Отдельно стоящая темная пергола у частного дома, логотип UOGEL | Да, с оговоркой | Чистый кадр без логотипа, тот же тип установки |
| `/pergolas` | Карточка 3 x 4 | `/images/pergolas/pergola-3x4-aluminium-1.jpg` | Палитра RAL | Нет | Фото перголы 3 x 4 / террасы, не опция цвета |
| `/pergolas` | Карточка 4 x 4 wall-mounted | `/images/pergolas/pergola-4x4-wall-mounted-1.jpg` | Сертификаты | Нет | Фото пристенной перголы |
| `/pergolas` | Карточка 4 x 6 | `/images/pergolas/pergola-4x6-louvered-1.webp` | Большая пергола с боковыми секциями, дублирует hero | Частично | Отдельное фото 4 x 6, лучше ресторан/отель/просторная терраса |
| `/pergolas/3x3-metal-pergola` | Hero карточки модели | `/images/pergolas/pergola-3x3-metal-1.jpg` | Отдельно стоящая темная пергола у частного дома, логотип UOGEL | Да, с оговоркой | Можно оставить временно; для финала лучше чистый кадр без логотипа |
| `/pergolas/3x3-metal-pergola` | Второе изображение в данных, сейчас не выводится | `/images/pergolas/pergola-3x3-metal-2.jpg` | Коллаж сертификатов | Нет | Удалять не нужно, но не использовать в карточках модели; заменить вручную на деталь/ракурс этой модели |
| `/pergolas/3x4-aluminium-pergola` | Hero карточки модели | `/images/pergolas/pergola-3x4-aluminium-1.jpg` | Палитра RAL | Нет | Основное фото модели/террасы. Палитру перенести в опцию `Цвет профиля`, если нужна |
| `/pergolas/3x4-aluminium-pergola` | Второе изображение в данных, сейчас не выводится | `/images/pergolas/pergola-3x4-aluminium-2.jpg` | Отдельно стоящая пергола у дома, логотип UOGEL | Да, с оговоркой | Лучше сделать его основным для 3 x 4, если не будет более точного кадра |
| `/pergolas/4x4-wall-mounted-gazebo` | Hero карточки модели | `/images/pergolas/pergola-4x4-wall-mounted-1.jpg` | Сертификаты | Нет | Фото пристенной перголы, не сертификаты |
| `/pergolas/4x4-wall-mounted-gazebo` | Второе изображение в данных, сейчас не выводится | `/images/pergolas/pergola-4x4-wall-mounted-2.jpg` | Выставочный стенд/переговоры, люди, стенд UOGEL | Нет | Можно использовать только в будущей странице о компании/поставщике, но не как фото модели |
| `/pergolas/4x6-louvered-pergola` | Hero карточки модели | `/images/pergolas/pergola-4x6-louvered-1.webp` | Большая пергола с боковыми секциями, дублирует hero и галерею | Частично | Крупный 4 x 6 lifestyle-кадр без логотипа и без дубля hero |
| `/pergolas/4x6-louvered-pergola` | Второе изображение в данных, сейчас не выводится | `/images/pergolas/pergola-4x6-louvered-2.jpg` | Высокая инфографика `Pergola Capacity` с сертификатами, дождем, снегом, wind 167 km/h | Нет | Техническую инфографику не использовать в hero/карточке; если нужна, вынести в отдельный технический блок после проверки корректности заявлений |
| `/gallery` | Частные дома | `/images/gallery/gallery-3x3-terrace.jpg` | Инфографика `100% Waterproof System / Hidden Wiring` | Нет | Реальное фото частной террасы с перголой |
| `/gallery` | Террасы и патио | `/images/gallery/gallery-3x4-patio.jpg` | Сертификаты `60+ Patents / Our Certifications` | Нет | Реальное фото патио/террасы с перголой |
| `/gallery` | Рестораны и кафе | `/images/gallery/gallery-4x6-restaurant.webp` | То же фото, что hero и 4x6: пергола у бассейна | Частично | Коммерческий кадр ресторана/кафе или большой террасы; не дублировать hero |
| `/gallery` | Кафе и отели | `/images/gallery/gallery-4x4-cafe.jpg` | Та же инфографика `100% Waterproof System` | Нет | Реальное фото кафе/отеля с перголой |
| `/gallery` | LED-подсветка | `/images/options/option-led.jpg` | Коллаж испытаний/погодных условий с логотипами Intertek/CE/RoHS/SGS; LED почти не является основным объектом | Нет | Ночной/вечерний кадр перголы с включенной LED-подсветкой. Кандидат из Drive: `Aluminum-Shutter/backyard-smart-pergola-with-led-lightsaeac5.jpg` или похожий чистый LED lifestyle |
| `/gallery` | Боковые системы | `/images/options/option-zip-screen.webp` | Маленькое фото перголы с закрытой боковой ZIP-шторой/экраном | Да, с оговоркой | Подходит по смыслу, но нужен более крупный и резкий файл; кандидаты: `Zip-Screen/aluminum-pergola-optional-zip-blindse4b2e.jpg`, `Zip-Screen/windproof-roller-blindseb93b.jpg` |
| `/options` | LED-подсветка | `/images/options/option-led.jpg` | Коллаж испытаний/сертификатов/погоды, не демонстрация LED | Нет | Фото LED-ленты или вечерней подсветки перголы |
| `/options` | Боковые ZIP-шторы | `/images/options/option-zip-screen.webp` | Пергола с боковой ZIP-системой, маленькое разрешение 350 x 293 | Да, с оговоркой | Оставить временно; заменить на более качественный кадр ZIP-системы из Drive |
| `/options` | Стеклянные панели | `/images/options/option-glass-panels.webp` | Белая пергола/павильон с остеклением у моря, маленькое разрешение 350 x 275 | Частично | Нужен кадр стеклянных сдвижных/складных панелей именно для перголы UOGEL; кандидаты: `Optional-Glass-Doors/gazebo-sliding-glass-door9051e.jpg`, `Optional-Glass-Doors/pergola-frameless-sliding-glass-doors47aff.jpg` |
| `/options` | Моторизация и пульт | `/images/options/option-motor.jpg` | Техническая схема перголы с подписями Motorized Roof, Hidden Motor, LED strip | Да, с оговоркой | Подходит как техническая иллюстрация, но для карточки лучше фото мотора/пульта или чистая схема без лишних подписей |
| `/options` | Датчики дождя и ветра | `/images/options/option-rain-sensor.jpg` | Рождественский рекламный баннер `Merry Christmas Sale / Up to 10% off` | Нет | Фото/схема датчика дождя/ветра или кадр автоматического закрытия ламелей; баннер срочно заменить |
| `/options` | Цвет профиля | `/images/options/option-profile-color.jpg` | Красивое фото перголы на закате с логотипом UOGEL | Нет | Сюда лучше подходит текущий файл `pergola-3x4-aluminium-1.jpg` с RAL-палитрой или чистый коллаж цветов профиля |
| `/options` | Водоотвод | `/images/options/option-drainage.jpg` | Коллаж испытаний/дождя/снега с сертификатами | Частично | Лучше использовать техническую инфографику водоотвода, например текущий `gallery-3x3-terrace.jpg` / `gallery-4x4-cafe.jpg`, если очистить от маркетингового вида, или найти в Drive деталь gutter/drainage |
| `/options` | Алюминиевые shutters | `/images/options/option-shutter.webp` | Пергола с боковой алюминиевой панелью/ламелями, маленькое разрешение 350 x 214 | Да, с оговоркой | Подходит по смыслу, но нужен более крупный файл; кандидаты: `Aluminum-Shutter/aluminium-shutter-louver75741cd8-f4ad-4b6f-a6e2-55d8386f8317.jpg`, `Aluminum-Shutter/pergola-folding-aluminum-shutterb8d35148-6bdc-4a42-9119-bc09fdfdae39.jpg` |

## Дешево выглядят

- `pergola-3x3-metal-2.jpg` — сертификаты вместо продукта.
- `pergola-4x4-wall-mounted-1.jpg` — сертификаты вместо продукта.
- `pergola-4x4-wall-mounted-2.jpg` — выставочный стенд/переговоры, выглядит как случайный фотоотчет.
- `pergola-4x6-louvered-2.jpg` — перегруженная рекламная инфографика с логотипами и заявлениями.
- `gallery-3x3-terrace.jpg` и `gallery-4x4-cafe.jpg` — техническая инфографика в галерее вместо фото сценариев.
- `gallery-3x4-patio.jpg` — сертификаты в галерее.
- `option-led.jpg` и `option-drainage.jpg` — рекламно-сертификационные коллажи.
- `option-rain-sensor.jpg` — рождественская распродажа, не относится к датчикам.

## Не соответствуют модели или блоку

- 3 x 4 карточка и detail используют `pergola-3x4-aluminium-1.jpg`, где показана RAL-палитра, а не модель.
- 4 x 4 wall-mounted карточка и detail используют сертификаты вместо пристенной перголы.
- Галерея `Частные дома`, `Террасы и патио`, `Кафе и отели` показывает инфографику/сертификаты вместо реальных сценариев.
- Опция `Датчики дождя и ветра` показывает сезонную скидку.
- Опция `Цвет профиля` показывает lifestyle-фото, хотя есть более логичная RAL-палитра.
- Опция `LED-подсветка` показывает не подсветку, а погодный/сертификационный коллаж.

## Дубли

- `hero-main.webp`, `pergola-4x6-louvered-1.webp`, `gallery-4x6-restaurant.webp` визуально один и тот же файл и имеют одинаковый размер `160760 bytes`.
- `pergola-3x3-metal-2.jpg`, `pergola-4x4-wall-mounted-1.jpg`, `gallery-3x4-patio.jpg` визуально один и тот же коллаж сертификатов.
- `gallery-3x3-terrace.jpg` и `gallery-4x4-cafe.jpg` визуально один и тот же `100% Waterproof System` кадр.
- `option-led.jpg` и `option-drainage.jpg` очень близкие коллажи испытаний/погоды, отличаются компоновкой.

## Hero и карточка используют одно и то же фото

- Главная `/` hero: `/images/hero/hero-main.webp`.
- Карточка и detail 4 x 6: `/images/pergolas/pergola-4x6-louvered-1.webp`.
- Галерея `Рестораны и кафе`: `/images/gallery/gallery-4x6-restaurant.webp`.

Это один и тот же визуальный материал. Для сайта выглядит как нехватка контента и снижает ощущение каталога.

## Где нужна ручная замена из Google Drive

Из `docs/drive-data/products-db.json` видны подходящие группы Google Drive. Не нужно использовать Drive URLs напрямую в production; файлы нужно вручную выбрать, скачать/экспортировать, оптимизировать и положить в `public/images/...`.

- Hero: `UOGEL RUSSIA/02 PRODUCTS/_all_images/Bioclimatic-Pergola/` — искать чистый широкий lifestyle без логотипа и рекламных плашек.
- 3 x 3: `Bioclimatic-Pergola/metal-gazebo-with-louvered-roof...` или компактные outdoor pergola кадры.
- 3 x 4: `Bioclimatic-Pergola/modern-deck-pergola...`, `outdoor-patio-with-pergola...`, `backyard-deck-with-pergola...`.
- 4 x 4 wall-mounted: искать пристенные/фасадные кадры среди `pergola-with-louvered-roof-and-screens...`, `pergola-with-doors...`, `gazebo-with-open-close-roof...`.
- 4 x 6: `louvered-pergola-with-sides...`, `luxury-aluminum-pergola...`, `pergola-with-doors...`, коммерческие/просторные сценарии.
- LED: `Aluminum-Shutter/backyard-smart-pergola-with-led-lightsaeac5.jpg` и похожие вечерние кадры.
- ZIP: `Zip-Screen/aluminum-pergola-optional-zip-blindse4b2e.jpg`, `Zip-Screen/manual-zip-screene7399.jpg`, `Zip-Screen/windproof-roller-blindseb93b.jpg`.
- Glass: `Optional-Glass-Doors/gazebo-sliding-glass-door9051e.jpg`, `Optional-Glass-Doors/pergola-frameless-sliding-glass-doors47aff.jpg`, `Optional-Glass-Doors/narrow-frame-sliding-glass-doorsbf60d.jpg`.
- Shutters: `Aluminum-Shutter/aluminium-shutter-louver75741cd8-f4ad-4b6f-a6e2-55d8386f8317.jpg`, `Aluminum-Shutter/pergola-folding-aluminum-shutterb8d35148-6bdc-4a42-9119-bc09fdfdae39.jpg`.
- Датчики дождя/ветра: в текущем индексе явных хороших фото датчиков не видно; нужен ручной поиск в Drive по `rain sensor`, `wind sensor`, `sensor`, `smart control`.

## Предложенный список замен

1. Срочно заменить основные карточки:
   - `pergola-3x4-aluminium-1.jpg` заменить на фото перголы; текущий RAL-файл можно использовать для `option-profile-color`.
   - `pergola-4x4-wall-mounted-1.jpg` заменить на пристенную перголу.
   - `pergola-4x6-louvered-1.webp` оставить только в одном месте или заменить в hero/карточке, чтобы убрать дубль.

2. Срочно заменить галерею:
   - `gallery-3x3-terrace.jpg`, `gallery-3x4-patio.jpg`, `gallery-4x4-cafe.jpg` заменить на реальные сценарии.
   - `gallery-4x6-restaurant.webp` заменить на коммерческий кадр, если hero остается текущим.

3. Срочно заменить опции:
   - `option-rain-sensor.jpg` заменить полностью.
   - `option-led.jpg` заменить на вечерний LED-кадр.
   - `option-profile-color.jpg` заменить на RAL/цвета профиля.

4. Улучшить качество маленьких файлов:
   - `option-zip-screen.webp` 350 x 293.
   - `option-glass-panels.webp` 350 x 275.
   - `option-shutter.webp` 350 x 214.

## Технические заметки

- Все текущие production-ссылки на изображения локальные.
- `node_modules/next/dist/docs/` в этой установке не найден.
- На момент аудита есть untracked папки `.vscode/` и `docs/drive-data/`; они не изменялись этим отчетом.
