# @atme-lab/ui-kit

Библиотека компонентов для личных проектов

## Установка

```bash
pnpm add @atme-lab/ui-kit
# или
npm install @atme-lab/ui-kit
# или
yarn add @atme-lab/ui-kit
```

## Быстрый старт

```tsx
import {
  ThemeProvider,
  lightTheme,
  Button,
  Typography,
} from "@atme-lab/ui-kit";
// Обязательно: глобальные стили и стили компонентов. Импортируйте один раз в корне (layout.tsx, app/layout.tsx)
import "@atme-lab/ui-kit/styles.css";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">Hello World</Typography>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

**Стили** нужно подключать явно: `import "@atme-lab/ui-kit/styles.css"` (в layout.tsx или app/layout.tsx). Содержит глобальные стили, @font-face для Martian Grotesk и стили всех компонентов.

## Документация компонентов

Детальная документация по всем компонентам, их пропсам и примерам использования доступна в **Storybook**.

Для локального просмотра документации:

```bash
pnpm storybook
```

Или используйте онлайн-документацию (если доступна).

## Использование тем

Библиотека предоставляет две готовые темы: `lightTheme` и `darkTheme`. Вы можете использовать любую из них или создать свою кастомную тему.

### Светлая тема

```tsx
import { ThemeProvider, lightTheme } from "@atme-lab/ui-kit";

<ThemeProvider theme={lightTheme}>{/* Ваши компоненты */}</ThemeProvider>;
```

### Темная тема

```tsx
import { ThemeProvider, darkTheme } from "@atme-lab/ui-kit";

<ThemeProvider theme={darkTheme}>{/* Ваши компоненты */}</ThemeProvider>;
```

### Кастомная тема

```tsx
import { ThemeProvider, lightTheme, mergeTheme } from "@atme-lab/ui-kit";

const customTheme = mergeTheme(lightTheme, {
  palette: {
    primary: {
      main: "#ff0000",
    },
  },
});

<ThemeProvider theme={customTheme}>{/* Ваши компоненты */}</ThemeProvider>;
```

## Доступные компоненты

Библиотека включает следующие категории компонентов:

- **Primitives**: Button, Typography, Tag и другие базовые компоненты
- **Form**: Input, Select, Checkbox, Radio и другие компоненты форм
- **Feedback**: Alert, Toast, Modal, Tooltip и другие компоненты обратной связи
- **Layout**: Card, Container, Stack, Grid и другие компоненты раскладки
- **Navigation**: Tabs, Menu, Breadcrumb и другие навигационные компоненты

Полный список компонентов и примеры использования смотрите в Storybook документации.

## Разработка

```bash
# Установка зависимостей
pnpm install

# Запуск Storybook
pnpm storybook

# Запуск тестов
pnpm test

# Сборка
pnpm build

# Линтинг
pnpm lint
```

## Версионирование

Проект использует [Conventional Commits](https://www.conventionalcommits.org/) для автоматического версионирования и генерации CHANGELOG.

### Формат коммитов

Все коммиты должны следовать формату Conventional Commits:

```
<type>: <subject>

[optional body]

[optional footer]
```

**Breaking changes:**
Для major версии добавьте `BREAKING CHANGE:` в footer коммита или используйте `!` после типа: `feat!: breaking change`

### Создание коммитов

**Рекомендуемый способ** (интерактивный):

```bash
pnpm commit
```

Или используйте обычный git commit с правильным форматом:

```bash
git commit -m "feat: добавил компонент Button"
git commit -m "fix: исправил стили в Input"
```

### Создание релиза и публикация в npm

**1. Создать релиз** (поднять версию, обновить CHANGELOG, создать тег и коммит):

```bash
# Авто-версия по коммитам (patch/minor/major)
pnpm release

# Или явно: minor
pnpm release:minor

# Или явно: major
pnpm release:major
```

**2. Отправить изменения и теги в репозиторий:**

```bash
git push --follow-tags
```

**3. Опубликовать пакет в npm:**

```bash
pnpm publish
```

Перед публикацией автоматически выполняется `prepublishOnly` → `npm run build`: собирается `dist`, в npm уходит только собранная версия (поле `files` в package.json). Дополнительно ничего запускать не нужно.

## Лицензия

MIT

