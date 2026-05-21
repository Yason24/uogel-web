# UOGEL Russia Website MVP

MVP сайта-витрины для подбора и расчета биоклиматических пергол производства UOGEL с поставкой в Россию.

## Цель MVP

Показать ограниченный каталог релевантных моделей, собрать заявки на расчет и подготовить основу для дальнейшего каталога, CRM и интеграций.

## Важное бизнес-ограничение

Сайт продает только перголы доступных размеров. В текстах используется логика подбора из каталога: подбор подходящей перголы из доступных размеров, расчет по выбранной модели и комплектации, помощь с выбором размера под объект.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Structure

- src/app — страницы сайта
- src/components — общие компоненты интерфейса
- src/data — стартовые данные каталога и опций
- src/types — типы Pergola, PergolaOption, Lead
- public/images — будущие локальные изображения

## Development

`ash
npm install
npm run dev
`

## Production build

`ash
npm run build
npm run start
`

## Test domain

Тестовый домен: 
tc.rdk-invest.ru

## Nginx example

`
ginx
server {
    listen 80;
    server_name rtc.rdk-invest.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host System.Management.Automation.Internal.Host.InternalHost;
        proxy_set_header X-Real-IP ;
        proxy_set_header X-Forwarded-For ;

        proxy_set_header Upgrade ;
        proxy_set_header Connection "upgrade";
    }
}
`

## Data notes

Initial MVP data is derived from the structured UOGEL catalog files: master-catalog.json, products-db.json, and keyword-mentions.json. The first release intentionally includes only relevant bioclimatic pergola models and associated options.
