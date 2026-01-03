# @atme/ui-kit

Библиотека компонентов для личных проектов

## Установка

```bash
pnpm add @atme/ui-kit
# или
npm install @atme/ui-kit
# или
yarn add @atme/ui-kit
```

## Быстрый старт

```tsx
import { ThemeProvider, lightTheme, Button, Typography } from "@atme/ui-kit";
// Импортируйте глобальные стили в корне вашего приложения
import "@atme/ui-kit/global";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">Hello World</Typography>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

**Важно**: Глобальные стили (`@atme/ui-kit/global`) нужно импортировать один раз в корне вашего приложения (например, в `main.tsx` или `App.tsx`). Они содержат CSS reset и базовые стили для элементов.

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
import { ThemeProvider, lightTheme } from "@atme/ui-kit";

<ThemeProvider theme={lightTheme}>{/* Ваши компоненты */}</ThemeProvider>;
```

### Темная тема

```tsx
import { ThemeProvider, darkTheme } from "@atme/ui-kit";

<ThemeProvider theme={darkTheme}>{/* Ваши компоненты */}</ThemeProvider>;
```

### Кастомная тема

```tsx
import { ThemeProvider, lightTheme, mergeTheme } from "@atme/ui-kit";

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

### Создание релиза

Для создания релиза используйте:

```bash
# Автоматическое определение версии на основе коммитов
pnpm release

# Принудительный minor релиз
pnpm release:minor

# Принудительный major релиз
pnpm release:major
```

Команда `pnpm release` автоматически:

1. Анализирует коммиты с момента последнего релиза
2. Определяет версию (patch/minor/major) на основе типов коммитов
3. Обновляет `package.json` с новой версией
4. Генерирует/обновляет `CHANGELOG.md`
5. Создает git tag (например, `v1.1.0`)
6. Создает коммит с изменениями

После создания релиза:

```bash
# Отправка изменений и тегов
git push --follow-tags

# Публикация в npm (если нужно)
npm publish
```

### Workflow

1. **Разработка**: Создавайте коммиты с правильным форматом (используйте `pnpm commit` для упрощения)
2. **Релиз**: Запустите `pnpm release` когда готовы создать релиз
3. **Публикация**: Отправьте изменения и теги, затем опубликуйте в npm (если нужно)

## Лицензия

MIT
