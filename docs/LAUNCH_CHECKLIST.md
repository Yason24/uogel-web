# UOGEL Russia — Launch Checklist

Документ для проверки перед запуском трафика. Не удалять после запуска — обновлять статусы.

---

## 1. DNS + SSL

- [ ] A-запись / CNAME направлена на правильный IP/хост
- [ ] SSL-сертификат выпущен и активен (Let's Encrypt или аналог)
- [ ] HTTPS → редирект настроен (HTTP 301)
- [ ] WWW → non-www редирект настроен (или наоборот — единообразно)
- [ ] `curl -I https://uogel-russia.ru` — ответ 200 OK
- [ ] Сертификат действует > 30 дней

---

## 2. SEO baseline

- [ ] `<title>` уникален на каждой странице
- [ ] `<meta description>` заполнен на каждой странице
- [ ] `canonical` прописан на каждой странице
- [ ] `og:title`, `og:description`, `og:image` — на всех страницах
- [ ] `og:image` — `/images/og/uogel-og.jpg` существует, размер 1200×630
- [ ] Twitter card — `summary_large_image` — проверить через [cards-dev.twitter.com](https://cards-dev.twitter.com/validator) или Cards Validator
- [ ] `/sitemap.xml` открывается и содержит все страницы (`/`, `/pergolas/a13`, `/options/zip-screen`, `/projects/...`, `/privacy`, `/terms`)
- [ ] `/robots.txt` — `Allow: /`, ссылка на sitemap
- [ ] `noindex` нигде не стоит случайно (кроме `/privacy`, `/terms` — там допустимо)

---

## 3. Favicon + App icons

- [ ] Favicon виден на вкладке браузера (SVG / ICO)
- [ ] Apple touch icon — проверить на iOS Safari (Add to Home Screen)
- [ ] `theme-color` виден в Chrome для Android (тёмный, `#1c1917`)

---

## 4. Structured data

- [ ] Organization schema в `<head>` главной страницы
- [ ] WebSite schema в `<head>` главной страницы
- [ ] Product schema на страницах `/pergolas/[slug]`
- [ ] BreadcrumbList на страницах серий
- [ ] Проверить через [schema.org/validator](https://validator.schema.org/) или Rich Results Test

---

## 5. Analytics

- [ ] Яндекс Метрика: получить счётчик ID → добавить `NEXT_PUBLIC_YM_ID=XXXXXXXX` в `.env.local`
- [ ] Google Analytics 4 (опционально): получить G-ID → `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX`
- [ ] Проверить: счётчик фиксирует просмотр после деплоя
- [ ] Цели: настроить конверсию на `/api/lead` (отправка заявки)

---

## 6. Формы и лиды

- [ ] Форма `/calculate` (Quiz) — отправить тестовую заявку
- [ ] Форма `/contacts` (LeadForm) — отправить тестовую заявку
- [ ] `data/leads.jsonl` — тестовые записи появились
- [ ] Telegram `@uogel_russia` — уведомление пришло (если прокси работает)
- [ ] Проверить `telegramStatus: "sent"` в leads.jsonl
- [ ] Rate-limit: 3 заявки / IP / 10 минут — не блокирует нормальный трафик

---

## 7. Контакты

- [ ] Telegram `@uogel_russia` — аккаунт существует и активен
- [ ] Footer: ссылка на Telegram кликабельна (`https://t.me/uogel_russia`)
- [ ] `/contacts` — форма отправки работает
- [ ] Нет placeholder-контактов (example@, +70000000000 и т.п.)

---

## 8. Мобильная адаптация

Проверить визуально на реальных устройствах или DevTools:

- [ ] 390px (iPhone 14) — header, hero, cards, forms
- [ ] 430px (iPhone 14 Plus) — то же
- [ ] 768px (tablet) — grid, sidebar
- [ ] 1440px (desktop) — полная ширина

Критичные элементы:
- [ ] Header — мобильное меню открывается/закрывается
- [ ] Quiz на `/calculate` — все шаги видны, кнопки доступны
- [ ] Footer — не ломается на 390px
- [ ] Карточки пергол — текст не обрезается

---

## 9. Производительность (Lighthouse)

Ориентиры (не жёсткие требования):

- [ ] Performance > 80 (mobile), > 90 (desktop)
- [ ] LCP < 3.5s на mobile
- [ ] CLS < 0.1
- [ ] Нет console errors в dev tools
- [ ] Нет hydration warnings

Проверить: `https://pagespeed.web.dev/` для главной и `/pergolas/a13`

---

## 10. Legal

- [ ] `/privacy` — страница существует и открывается
- [ ] `/terms` — страница существует и открывается
- [ ] Footer — ссылки на обе страницы работают
- [ ] Контактная информация в Privacy Policy актуальна

---

## 11. Production build + Docker

```bash
npm run lint       # чисто
npm run build      # 0 ошибок
docker compose down
docker compose build --no-cache
docker compose up -d
docker ps --filter name=uogel-web
curl -I http://127.0.0.1:3001
curl -I https://rtc.rdk-invest.ru
```

Критерии:
- HTML содержит `UOGEL`, `пергол`, `биоклимат`
- HTML НЕ содержит `To get started`, `Deploy Now`, `Next.js logo`

---

## 12. Git + deploy

- [ ] Все изменения закоммичены в `main`
- [ ] `git push` — успешно
- [ ] Нет незакоммиченных изменений (`git status`)
- [ ] `.env*` и `data/leads.jsonl` не закоммичены

---

## 13. Pre-traffic checklist (за час до запуска)

- [ ] Ещё раз: `curl -I https://uogel-russia.ru` → 200 OK
- [ ] Открыть главную в инкогнито-браузере
- [ ] Отправить тестовую заявку через `/calculate`
- [ ] Проверить Telegram / leads.jsonl
- [ ] Открыть `/sitemap.xml` — всё на месте
- [ ] Google Search Console — добавить сайт, отправить sitemap

---

_Последнее обновление: май 2026_
