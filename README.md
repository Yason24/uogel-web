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

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Docker

```bash
docker compose up --build -d
```

Приложение будет доступно на `http://localhost:3000`.

## Development and NAS production workflow

Основная разработка ведется только в `/projects/web/uogel`. Перед началом работы проверьте:

```bash
cd /projects/web/uogel
pwd
git status
git rev-parse HEAD
```

Production/preview запускается на NAS через Docker из `/volume1/Web/uogel`; контейнер `uogel-web`, порт `3000`, проверочный URL `http://192.168.50.181:3000/`.

После изменений в Ubuntu Dev выполняются `npm run lint`, `npm run build`, commit и push. После push production обновляется на NAS через `ssh root-asustor`, `git pull --ff-only`, `docker compose down`, `docker compose build --no-cache`, `docker compose up -d`.

Полная схема путей, ограничения и команды проверки зафиксированы в `PROJECT_NOTES.md`. Перед работой с проектом Codex должен читать `AGENTS.md`, `PROJECT_NOTES.md` и этот `README.md`.

## Test domain

Тестовый домен: 
tc.rdk-invest.ru

## Nginx example

```nginx
server {
    listen 80;
    server_name tc.rdk-invest.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Data notes

Initial MVP data is derived from the structured UOGEL catalog files: master-catalog.json, products-db.json, and keyword-mentions.json. The first release intentionally includes only relevant bioclimatic pergola models and associated options.
