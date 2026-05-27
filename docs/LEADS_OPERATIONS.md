# UOGEL — Leads Operations Guide

Инструкция по работе с заявками: хранение, восстановление, диагностика, тестирование.

---

## 1. Где лежат заявки

### Основной backup (всегда)

```
/app/data/leads.jsonl           — внутри Docker-контейнера
./data/leads.jsonl              — на хосте (Docker volume ./data:/app/data)
```

> **Критично:** `./data/leads.jsonl` монтируется как volume — файл сохраняется даже после `docker compose down`.  
> Не коммитить этот файл в git (он в `.gitignore`).

### Telegram

Заявки отправляются в группу через бота.  
Если `telegramStatus: "failed"` — заявка в Telegram не попала, но в `leads.jsonl` есть.

---

## 2. Структура записи (leads.jsonl)

Каждая строка — отдельный JSON-объект:

```json
{
  "name": "Иван Иванов",
  "phone": "+7 999 123-45-67",
  "messenger": "@ivan",
  "city": "Москва",
  "objectType": "Частный дом",
  "installationType": "Пристенная пергола",
  "selectedPergolaId": "a13",
  "selectedSize": "Ширина 5000 мм, Вынос 4000 мм",
  "options": "ZIP-экраны, Электрообогреватель",
  "timeline": "Нужен монтаж",
  "comment": "Терраса на второй этаж",
  "sourcePage": "/calculate",
  "leadId": "UOGEL-20260527-001",
  "createdAt": "2026-05-27T11:35:42.000Z",
  "telegramStatus": "sent",
  "ipHash": "a3f1c92d4e7b",
  "userAgent": "Mozilla/5.0 ..."
}
```

### Поля

| Поле | Описание |
|---|---|
| `leadId` | Уникальный ID: `UOGEL-YYYYMMDD-NNN` |
| `createdAt` | ISO 8601 UTC timestamp |
| `sourcePage` | Страница, с которой пришла заявка |
| `telegramStatus` | `"sent"` или `"failed"` |
| `ipHash` | SHA-256(ip + salt), первые 12 символов — для аналитики дублей без хранения IP |
| `userAgent` | User-Agent браузера (до 300 символов) |

---

## 3. Как посмотреть последние заявки

### На хосте (Docker volume)

```bash
# Последние 10 заявок
tail -10 /projects/web/uogel/data/leads.jsonl | jq .

# Только сегодняшние
grep "$(date +%Y-%m-%d)" /projects/web/uogel/data/leads.jsonl | jq .

# Только нужные поля
tail -20 /projects/web/uogel/data/leads.jsonl | jq '{leadId, name, phone, createdAt, telegramStatus}'
```

### Внутри контейнера

```bash
docker exec uogel-web sh -c "tail -10 /app/data/leads.jsonl | cat"
```

### Все заявки с именем

```bash
grep -i "иван" /projects/web/uogel/data/leads.jsonl | jq '{leadId, name, phone, createdAt}'
```

---

## 4. Как найти заявки с failed Telegram

```bash
# Все failed
grep '"telegramStatus":"failed"' /projects/web/uogel/data/leads.jsonl | jq '{leadId, name, phone, createdAt}'

# Количество failed
grep -c '"telegramStatus":"failed"' /projects/web/uogel/data/leads.jsonl

# За последние 24 часа (примерно)
grep "$(date +%Y-%m-%d)" /projects/web/uogel/data/leads.jsonl | grep '"telegramStatus":"failed"' | jq .
```

---

## 5. Как восстановить заявку (отправить повторно в Telegram)

Если `telegramStatus: "failed"` — заявка сохранена, но в Telegram не попала.

### Ручной способ

1. Найти заявку:
   ```bash
   grep "UOGEL-20260527-001" /projects/web/uogel/data/leads.jsonl | jq .
   ```

2. Скопировать данные из JSON и отправить вручную в Telegram-группу.

### Почему Telegram мог упасть

- `HTTPS_PROXY` не работает (проверить: `docker logs --tail=50 uogel-web | grep "\[lead\]"`)
- Бот заблокирован / удалён из группы
- Telegram API временно недоступен

### Проверить логи

```bash
docker logs --tail=100 uogel-web | grep "\[lead\]"
```

Примеры нормальных логов:
```
[lead] saved UOGEL-20260527-001 telegramStatus=sent
[lead] saved UOGEL-20260527-002 telegramStatus=failed
[lead] UOGEL-20260527-002 — Telegram network error: connect ECONNREFUSED
```

---

## 6. Как проверить rate limit

Rate limit: 3 заявки / IP / 10 минут (in-memory, сбрасывается при перезапуске контейнера).

При превышении API возвращает:
```json
HTTP 429
{ "success": false, "message": "Слишком много заявок. Попробуйте позже." }
```

Проверить в логах:
```bash
docker logs --tail=200 uogel-web | grep "429\|rate"
```

---

## 7. Как тестировать /api/lead

### Минимальная заявка (curl)

```bash
curl -s -X POST http://127.0.0.1:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79990000000","sourcePage":"/test"}' | jq .
```

Ожидаемый ответ:
```json
{ "ok": true, "leadId": "UOGEL-20260527-001" }
```

### Полная заявка (все поля)

```bash
curl -s -X POST http://127.0.0.1:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Артём Тест",
    "phone": "+79991234567",
    "messenger": "@artem_test",
    "city": "Москва",
    "objectType": "Частный дом",
    "installationType": "Пристенная пергола",
    "selectedPergolaId": "a13",
    "selectedSize": "Ширина 5000 мм, Вынос 4000 мм",
    "options": "ZIP-экраны, Электрообогреватель",
    "timeline": "Нужен монтаж",
    "comment": "Тестовая заявка — можно игнорировать",
    "sourcePage": "/test-full"
  }' | jq .
```

### Проверка результата

```bash
# leadId появился в файле
tail -1 /projects/web/uogel/data/leads.jsonl | jq '{leadId, name, telegramStatus}'

# Telegram message получен в группе
```

### Тест rate limit

```bash
for i in 1 2 3 4; do
  curl -s -X POST http://127.0.0.1:3001/api/lead \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Тест $i\",\"phone\":\"+7999000000$i\",\"sourcePage\":\"/rate-test\"}" | jq .status
done
# 4-й запрос должен вернуть 429
```

### Тест валидации

```bash
# Слишком короткое имя
curl -s -X POST http://127.0.0.1:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"А","phone":"+79990000000","sourcePage":"/test"}' | jq .

# Некорректный телефон
curl -s -X POST http://127.0.0.1:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"123","sourcePage":"/test"}' | jq .
```

---

## 8. CRM интеграция (будущее)

Структура `CrmPayload` уже подготовлена в `src/app/api/lead/route.ts`.

### Bitrix24

```typescript
// POST /rest/{userId}/{webhookToken}/crm.lead.add.json
const bitrix = {
  fields: {
    TITLE: `UOGEL ${payload.leadId}`,
    NAME: payload.contact.name,
    PHONE: [{ VALUE: payload.contact.phone, VALUE_TYPE: "WORK" }],
    CITY: payload.contact.city,
    SOURCE_ID: "WEB",
    COMMENTS: `Серия: ${payload.project.series}\nРазмер: ${payload.project.size}`,
  }
};
```

### amoCRM

```typescript
// POST /api/v4/leads
const amo = [{
  name: `UOGEL ${payload.leadId} — ${payload.contact.name}`,
  custom_fields_values: [...],
  _embedded: { contacts: [{ name: payload.contact.name }] }
}];
```

### Google Sheets

Использовать `spreadsheets.values.append` с диапазоном листа.  
Поля: leadId, createdAt, name, phone, city, series, size, options, sourcePage.

### Airtable

```typescript
// POST https://api.airtable.com/v0/{baseId}/{tableName}
const airtable = {
  fields: {
    "Lead ID": payload.leadId,
    "Имя": payload.contact.name,
    "Телефон": payload.contact.phone,
    "Серия": payload.project.series,
    ...
  }
};
```

---

## 9. Переменные окружения

```
TELEGRAM_BOT_TOKEN   — токен бота (обязательно)
TELEGRAM_CHAT_ID     — ID группы (обязательно, обычно отрицательное число)
HTTPS_PROXY          — прокси для Telegram (http://192.168.50.190:7890)
HTTP_PROXY           — fallback прокси
```

Проверить что переменные установлены:

```bash
docker exec uogel-web sh -c 'echo "BOT: ${TELEGRAM_BOT_TOKEN:0:10}... CHAT: $TELEGRAM_CHAT_ID"'
```

---

## 10. Важные ограничения безопасности

- **Не логировать полный IP** — хранится только `ipHash` (12 символов SHA-256)
- **Не коммитить `data/leads.jsonl`** — в `.gitignore`
- **Не коммитить `.env*`** — токены только в окружении сервера
- **Не логировать токены** — только первые символы для диагностики
- **UserAgent** — обрезается до 300 символов

---

*Последнее обновление: Phase 4 Step 2 — Lead Operations + CRM-ready Foundation*
