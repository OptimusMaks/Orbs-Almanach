# App2

React Native приложение с использованием Expo Router и TypeScript.

## Стек технологий

- **React Native** - Основной фреймворк
- **TypeScript** - Типизированный JavaScript
- **Expo v51** - Платформа разработки
- **Expo Router** - Файловая маршрутизация
- **AsyncStorage** - Локальное хранение данных

## Структура проекта

```
app2/
├── app/                    # Экраны приложения (Expo Router)
│   ├── _layout.tsx        # Корневой layout
│   └── index.tsx          # Главная страница
├── components/            # Переиспользуемые компоненты
├── constants/             # Константы (цвета, стили, и т.д.)
├── services/              # Сервисы (API, хранилище, и т.д.)
├── types/                 # TypeScript типы
├── assets/                # Статические ресурсы
├── app.config.js          # Конфигурация Expo
├── babel.config.js        # Конфигурация Babel
├── tsconfig.json          # Конфигурация TypeScript
└── package.json           # Зависимости проекта
```

## Установка и запуск

1. Установите зависимости:
   ```bash
   npm install
   # или
   yarn install
   ```

2. Запустите проект:
   ```bash
   npm start
   # или
   yarn start
   ```

3. Используйте Expo Go приложение для тестирования на устройстве или запустите симулятор.

## Основные команды

- `npm start` - Запуск Metro bundler
- `npm run android` - Запуск на Android
- `npm run ios` - Запуск на iOS
- `npm run web` - Запуск веб-версии
- `npm run type-check` - Проверка типов TypeScript
- `npm run lint` - Линтинг кода

## Возможности

- ✅ TypeScript поддержка
- ✅ Expo Router для навигации
- ✅ AsyncStorage для локального хранения
- ✅ Готовая структура проекта
- ✅ Базовые сервисы и типы
- ✅ Настроенные алиасы путей

## Разработка

Приложение использует Expo Router для навигации на основе файловой структуры. Добавляйте новые экраны в папку `app/`, и они автоматически станут доступными для навигации.

Для работы с локальными данными используйте `StorageService` из папки `services/`.
