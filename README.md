# Skad Market - Next.js Migration

Этот проект представляет собой миграцию с Vite.js на Next.js с поддержкой SSR (Server-Side Rendering).

## 🚀 Основные изменения

### Архитектура
- **Vite.js** → **Next.js 14** с App Router
- **React Router DOM** → **Next.js встроенная маршрутизация**
- **SPA** → **SSR/SSG** поддержка

### Структура проекта
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── not-found.tsx      # 404 страница
│   ├── error.tsx          # Страница ошибок
│   ├── providers.tsx      # Провайдеры для клиентских компонентов
│   ├── globals.css        # Глобальные стили
│   ├── rims/              # Страницы дисков
│   ├── tyres/             # Страницы шин
│   ├── cart/              # Страницы корзины
│   ├── order/             # Страницы заказов
│   ├── buyer/             # Кабинет покупателя
│   ├── manager/           # Кабинет менеджера
│   └── ...
├── pages/                 # Компоненты страниц
├── widgets/               # Виджеты
├── features/              # Бизнес-логика
├── entities/              # Сущности
├── shared/                # Общие компоненты и утилиты
└── layouts/               # Layout компоненты
```

### Ключевые улучшения

#### 1. SSR/SSG поддержка
- Статические страницы генерируются на сервере
- Динамические маршруты с поддержкой ISR
- Оптимизированная загрузка

#### 2. Оптимизация изображений
- Использование `next/image` вместо обычных `<img>`
- Автоматическая оптимизация и ленивая загрузка
- Поддержка WebP и AVIF форматов

#### 3. Улучшенная маршрутизация
- Файловая система маршрутизации Next.js
- Динамические маршруты: `[id].tsx`
- Вложенные маршруты с layout

#### 4. Компоненты
- Замена `react-router-dom` на Next.js компоненты
- `NavLink` → `NextLink` с `usePathname`
- `useNavigate` → `useRouter`
- `useParams` → props из страниц

## 🛠️ Установка и запуск

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка
npm run build

# Продакшн
npm start

# Линтинг
npm run lint

# Проверка типов
npm run type-check
```

## 📁 Структура маршрутов

### Основные страницы
- `/` - Главная страница
- `/rims` - Каталог дисков
- `/rims/[wheelCode]` - Страница диска
- `/tyres` - Каталог шин
- `/cart` - Корзина
- `/order/[id]` - Оформление заказа
- `/sign-in` - Вход для покупателей

### Кабинет покупателя
- `/buyer` - Главная страница кабинета
- `/buyer/orders` - Заказы покупателя
- `/buyer/orders/[orderId]` - Детали заказа
- `/buyer/profile` - Профиль
- `/buyer/favorites` - Избранное
- `/buyer/notifications` - Уведомления

### Кабинет менеджера
- `/manager` - Главная страница менеджера
- `/manager/orders` - Заказы
- `/manager/orders/[orderId]` - Детали заказа
- `/manager/goods` - Товары
- `/manager/reports` - Отчеты
- `/manager/settings` - Настройки
- `/manager/sign-in` - Вход для менеджеров

## 🔧 Конфигурация

### Переменные окружения
Создайте файл `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ROUTING_BASE_PATH=
```

### Next.js конфигурация
- Поддержка SCSS модулей
- Алиасы путей
- Оптимизация изображений
- TypeScript конфигурация

## 📦 Основные зависимости

- **Next.js 14** - React фреймворк
- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **Ant Design** - UI компоненты
- **MobX** - Управление состоянием
- **SCSS** - Стилизация

## 🚀 Производительность

### SSR преимущества
- Лучший SEO
- Быстрая первоначальная загрузка
- Улучшенный Core Web Vitals
- Оптимизация для поисковых систем

### Оптимизации
- Автоматическое разделение кода
- Ленивая загрузка компонентов
- Оптимизация изображений
- Кэширование статических страниц

## 🔄 Миграция компонентов

### Навигация
```typescript
// Было (React Router)
import { useNavigate, useParams, NavLink } from 'react-router-dom'

// Стало (Next.js)
import { useRouter, usePathname } from 'next/navigation'
import NextLink from 'next/link'
```

### Изображения
```typescript
// Было
<img src="/image.jpg" alt="Image" />

// Стало
import Image from 'next/image'
<Image src="/image.jpg" alt="Image" width={300} height={200} />
```

### Маршрутизация
```typescript
// Было
const navigate = useNavigate()
navigate('/path')

// Стало
const router = useRouter()
router.push('/path')
```

## 📝 Примечания

1. Все клиентские компоненты должны иметь директиву `'use client'`
2. Серверные компоненты используются по умолчанию
3. Динамические маршруты используют файловую систему Next.js
4. Метаданные страниц настраиваются через `metadata` экспорт

## 🐛 Известные проблемы

- Некоторые компоненты могут требовать дополнительной адаптации для SSR
- MobX stores должны быть инициализированы на клиенте
- Некоторые браузерные API недоступны на сервере

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера
2. Проверьте логи сервера разработки
3. Убедитесь, что все зависимости установлены
4. Проверьте конфигурацию TypeScript