## Как запустить ( 3 способа )

### 1. Запуск через локальную среду

Склонируйте репозиторий

```cmd
git clone https://github.com/urodstvo/avito-trainee-task.git
cd avito-trainee-task
```

Установите зависимости и запустите client

```bash
cd client && pnpm install
pnpm dev
```

Установите зависимости и запустите server

```bash
cd ../server && pnpm install
pnpm start
```

### 2. Запуск в Docker (сборка образов)

Склонируйте репозиторий

```cmd
git clone https://github.com/urodstvo/avito-trainee-task.git
cd avito-trainee-task
```

Запустите Docker Compose

```bash
npm run docker:build
```

или

```bash
docker-compose up -d
```

### 3. Запуск в Docker (готовые образы)

Склонируйте репозиторий

```cmd
git clone https://github.com/urodstvo/avito-trainee-task.git
cd avito-trainee-task
```

Запустите Docker Compose с готовыми образами

```bash
npm run docker:pull
```

или

```bash
docker-compose -f docker-compose.prod.yaml up -d
```

Backend: `http://localhost:8000`

Frontend: `http://localhost:3000`

---

### Используемые технологии:

- React 19.0
- React Router Dom
- React Context API
- Tailwind 4.0
- ShadcnUI
- React Query
- React Hook Form
- Zod

- Typescript
- ESlint
- Prettier
- Vite

- Docker

### Обоснование выбора

- Tailwind 4.0 и ShadcnUI

Tailwind генерирует минимальное количество CSS-кода благодаря JIT, сокращая размер бандла. При этом, в отличие от CSS modules, с помощью утилитарных классов позваоляет ускорить процесс верстки.

Больших проблем с чтением компонентов не должно возникать, т. к. сами компоненты в приложении не сложные.

Tailwind идеально интегрируется с ShadcnUI, что позволяет легко кастомизировать UI без необходимости переписывать базовые стили.

- React Query

Приложение работает с объявлениями, что подразумевает:

- Частые запросы к API
- Кеширование
- Инвалидацию кеша
- Автоматическое обновление данных
- Обработку состояний загрузки, ошибок и повторных запросов

Это все может из коробки обеспечить @tanstack/react-query

React Query поддерживает отмену запросов (важно при переходе между страницами)

- React-Hook-Form и Zod

React Hook Form использует неконтролируемые компоненты, что даёт меньше ререндеров и поддержку нативных форм.

Zod прост в составлении схем. Как мне показалось позволяет проше работать с объединением схем по определеному типу объявлению ( форма на странице /form ).

Также, хорошо работают в связке shadcnui form + react hook form.

- React Context API

В этом проекте React Context API лучше, чем сторонние стейт-менеджеры, потому что нет сложного состояния или тяжелого props drilling. Вообщем, просто, быстро, встроено в React, без лишнего кода и зависимостей.

---

### Почему проект не покрыт тестами?

В идеале, код должен быть покрыт юнит-тестами ( Vitest ), однако тестирование не было реализовано.

Увы, неделя оказалась загруженной, и основное внимание пришлось уделить разработке функционала, чтобы соответствовать требованиям задания.

В процессе разработки проводилось ручное тестирование, но автоматические тесты не были написаны.

---

# [Задание](/Task.md)
