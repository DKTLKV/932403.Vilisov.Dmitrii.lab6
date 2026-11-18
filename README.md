# Лабораторная работа №6. Введение в Node.js и базовый сервер на Express

**Вариант 6:** «Погода по городу» (mock API)

## Описание

Веб-приложение на Node.js и Express, которое показывает погоду по названию города. Данные фиктивные (захардкожены на сервере для 5 городов). Приложение оформлено как PWA: его можно установить из браузера, а статика кешируется service worker'ом, поэтому страницы открываются и без запущенного сервера.

## Возможности

- сервер на Express, раздача статических файлов (HTML, CSS, JS) из папки `public`;
- маршруты `/`, `/about` и `/api/weather/:city`;
- параметр пути `:city` и query-параметр `?units=`;
- логирование каждого запроса в консоль;
- `manifest.json` с иконками 192×192 и 512×512;
- service worker: кеширование статики и работа офлайн.

## Технологии

Node.js, Express, HTML, CSS, JavaScript, Web App Manifest, Service Worker.

## Запуск

```bash
npm start
```

После запуска в консоли появится сообщение `Server started on port 3000`. Приложение доступно по адресу: <http://localhost:3000>

Порт можно изменить переменной окружения `PORT`.

## Маршруты

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | Главная страница с формой поиска погоды |
| GET | `/about` | Страница «О себе» |
| GET | `/api/weather/:city` | Погода по городу (JSON) |

Любой другой маршрут возвращает `404` и `{ "error": "Not found" }`.

### GET /api/weather/:city

Параметры:

- `:city` — название города (регистр не важен). Доступные города: Москва, Томск, Казань, Сыктывкар, Барнаул;
- `?units=` — единицы измерения температуры:
  - `metric` (по умолчанию) — градусы Цельсия (`C`);
  - `imperial` — градусы Фаренгейта (`F`).

Пример запроса:

```
GET /api/weather/москва?units=metric
```

Пример ответа:

```json
{
  "city": "Москва",
  "temp": 23,
  "units": "C",
  "condition": "ясно"
}
```

Запрос с `?units=imperial` вернёт ту же погоду в градусах Фаренгейта (`"units": "F"`).

Ошибка, если город не найден (статус `404`):

```json
{ "error": "City not found" }
```

Проверка из терминала:

```bash
curl http://localhost:3000/api/weather/москва
curl "http://localhost:3000/api/weather/москва?units=imperial"
curl http://localhost:3000/api/weather/париж
```

## PWA

- **Манифест:** `public/manifest.json`, подключён в `<head>` каждой страницы через `<link rel="manifest" href="/manifest.json">`. Иконки лежат в `public/icons/`.
- **Service worker:** `public/sw.js`, регистрируется в `public/app.js`. При установке кеширует статику (страницы, стили, скрипты, манифест, иконки). Запросы к `/api/` идут через сеть, при отсутствии соединения возвращается JSON с ошибкой `Offline`.

## Структура проекта

```
Lab6/
├── package.json
├── package-lock.json
├── server.js           # сервер Express, маршруты, mock-данные
└── public/             # статические файлы
    ├── index.html      # главная страница
    ├── about.html      # страница «О себе»
    ├── style.css
    ├── app.js          # запросы к API, регистрация service worker
    ├── manifest.json   # манифест PWA
    ├── sw.js           # service worker
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```
