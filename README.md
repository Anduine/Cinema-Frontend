# Cinema Platform - Frontend Service

Клієнтська частина платформи для потокового відтворення відео (Video On Demand). Побудована на базі Next.js (App Router) з використанням кастомного HLS-плеєра.

## 🚀 Технологічний стек

- **Фреймворк:** Next.js (React)
- **State Management:** Zustand
- **Відеоплеєр:** Нативний HTML5 `<video>` + [hls.js](https://github.com/video-dev/hls.js/)
- **Стилізація:** CSS Modules
- **Взаємодія з API:** Axios

## ✨ Основні функції

- Інтерактивний відеоплеєр з підтримкою адаптивного HLS-стрімінгу.
- Безшовне перемикання сезонів, серій та студій озвучення.
- Автоматичне збереження та синхронізація прогресу перегляду.
- Адмін-панель для управління медіа-каталогом та завантаження відео у сховище.

## 🛠 Локальний запуск

### Вимоги

- Node.js 18+
- Запущений бекенд (`cinema-media-catalog`) та інфраструктура (MinIO, Postgres).

### Встановлення

1. Клонуйте репозиторій:

```bash
 git clone [https://github.com/***/cinema-frontend.git](https://github.com/***/cinema-frontend.git)
 cd cinema-frontend
```

2. Встановіть залежності:

```bash
 npm install
```

3. Створіть файл .env.local у корені проекту та додайте необхідні змінні:

```
 NEXT_PUBLIC_API_URL=http://localhost:8080/api
 NEXT_PUBLIC_STORAGE_URL=http://localhost:8000
```

4. Запустіть сервер розробки:

```bash
 npm run dev
```

Додаток буде доступний за адресою http://localhost:3000.
