# Руководство по дальнейшей миграции

## ✅ Выполненные задачи

### 1. Базовая настройка Next.js
- [x] Установка Next.js 14
- [x] Настройка TypeScript
- [x] Конфигурация ESLint
- [x] Создание базовой структуры app/

### 2. Основные страницы
- [x] Главная страница (/)
- [x] Каталог дисков (/rims)
- [x] Страница диска (/rims/[wheelCode])
- [x] Корзина (/cart)
- [x] Оформление заказа (/order/[id])
- [x] Вход (/sign-in)

### 3. Кабинет покупателя
- [x] Главная страница (/buyer)
- [x] Заказы (/buyer/orders)
- [x] Детали заказа (/buyer/orders/[orderId])

### 4. Кабинет менеджера
- [x] Главная страница (/manager)
- [x] Заказы (/manager/orders)
- [x] Детали заказа (/manager/orders/[orderId])
- [x] Настройки (/manager/settings)

### 5. Компоненты
- [x] Замена react-router-dom на Next.js
- [x] Создание Link и NavLink компонентов
- [x] Обновление ImageLoader для next/image
- [x] Добавление 'use client' директивы

## 🔄 Следующие шаги

### 1. Остальные страницы
- [ ] Страницы шин (/tyres)
- [ ] Страница шины (/tyres/[tireCode])
- [ ] Профиль покупателя (/buyer/profile)
- [ ] Избранное (/buyer/favorites)
- [ ] Уведомления (/buyer/notifications)
- [ ] Товары менеджера (/manager/goods)
- [ ] Отчеты менеджера (/manager/reports)
- [ ] Сотрудники (/manager/settings/employees)
- [ ] Продавцы (/manager/settings/merchants)
- [ ] Уведомления менеджера (/manager/settings/notifications)

### 2. Компоненты для обновления
- [ ] SearchCarModal
- [ ] ChooseMobileCatalogModal
- [ ] BuyerAuthorizationContent
- [ ] Tooltip компоненты
- [ ] Все остальные компоненты с react-router-dom

### 3. Оптимизация
- [ ] Добавление метаданных для SEO
- [ ] Настройка generateStaticParams для SSG
- [ ] Оптимизация изображений
- [ ] Настройка кэширования

### 4. Тестирование
- [ ] Проверка всех маршрутов
- [ ] Тестирование SSR
- [ ] Проверка производительности
- [ ] Тестирование на мобильных устройствах

## 🛠️ Команды для выполнения

### Поиск оставшихся react-router-dom импортов
```bash
grep -r "react-router-dom" src/ --include="*.tsx" --include="*.ts"
```

### Поиск компонентов без 'use client'
```bash
grep -r "useRouter\|usePathname\|useSearchParams" src/ --include="*.tsx" | grep -v "'use client'"
```

### Проверка TypeScript ошибок
```bash
npm run type-check
```

### Линтинг
```bash
npm run lint
```

## 📝 Шаблоны для миграции

### Компонент с навигацией
```typescript
'use client'

import { useRouter } from 'next/navigation'

export const Component = () => {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/path')
  }
  
  return <button onClick={handleClick}>Navigate</button>
}
```

### Компонент с параметрами
```typescript
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export const Component = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  return <div>Current path: {pathname}</div>
}
```

### Динамический маршрут
```typescript
interface PageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: PageProps) {
  return <div>ID: {params.id}</div>
}

// Для SSG
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ]
}
```

## 🚨 Важные замечания

1. **Все клиентские компоненты** должны иметь `'use client'` директиву
2. **Серверные компоненты** не могут использовать браузерные API
3. **MobX stores** должны инициализироваться на клиенте
4. **Изображения** должны использовать `next/image`
5. **Маршрутизация** использует файловую систему Next.js

## 🔍 Отладка

### Проблемы с SSR
- Проверьте, что браузерные API не используются в серверных компонентах
- Убедитесь, что MobX stores инициализируются правильно
- Проверьте консоль сервера на ошибки

### Проблемы с маршрутизацией
- Проверьте структуру папок в app/
- Убедитесь, что файлы называются правильно (page.tsx)
- Проверьте, что динамические маршруты используют [param] синтаксис

### Проблемы с производительностью
- Используйте React DevTools Profiler
- Проверьте Network tab в DevTools
- Анализируйте Core Web Vitals

## 📚 Полезные ссылки

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)