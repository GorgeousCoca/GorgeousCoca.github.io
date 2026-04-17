# Kvartsevyy Aglomerat

Корпоративный сайт на `Next.js` для демонстрации каталога изделий из искусственного камня.

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Деплой на GitHub Pages

1. Запушить проект в GitHub (ветка `main`).
2. В репозитории открыть `Settings -> Pages`.
3. В поле **Source** выбрать **GitHub Actions**.
4. После пуша в `main` выполнится workflow `.github/workflows/deploy-pages.yml`.
5. Сайт будет доступен по адресу:
   - `https://<owner>.github.io/<repo>/` для обычного репозитория
   - `https://<owner>.github.io/` если репозиторий называется `<owner>.github.io`

## Ограничения Pages-версии

- GitHub Pages публикует только статический сайт.
- Админка и API-роуты в Pages-сборке отключаются автоматически.
- Формы в Pages работают в демо-режиме (без отправки в CRM/БД).
