# Требования к архитектуре UI-библиотеки React

## Общее описание проекта

Создай современную, масштабируемую React UI-библиотеку с TypeScript, которая использует трехуровневую систему дизайн-токенов и структуру компонентов по специализации. Библиотека должна быть production-ready, поддерживать SPA, SSR и SSG окружения, иметь полную типизацию, тестирование и автоматическое версионирование.

## Технический стек

### Обязательные технологии

- **React 18+** с TypeScript
- **Vite** для сборки библиотеки
- **PostCSS** с CSS Modules (`.module.css`)
- **Storybook** для разработки и документации компонентов
- **Vitest** для unit-тестов
- **pnpm** как менеджер пакетов
- **Changesets** или **Conventional Commits** для автоматического версионирования и changelog

### Дополнительные инструменты

- ESLint + TypeScript ESLint
- Prettier для форматирования
- Stylelint для CSS
- TypeScript strict mode

## Архитектура компонентов

### Структура папок (по специализации)

```
src/
├── components/
│   ├── primitives/     # Базовые компоненты (Button, Icon, Badge, Text)
│   ├── form/           # Формы (Input, Select, Checkbox, Radio)
│   ├── feedback/       # Обратная связь (Alert, Toast, Modal, Tooltip)
│   ├── layout/         # Раскладка (Card, Container, Stack, Grid)
│   ├── navigation/     # Навигация (Tabs, Menu, Breadcrumb)
│   └── index.ts        # Root export (named exports)
├── tokens/             # Дизайн-токены
├── themes/             # Система тем
├── utils/              # Утилиты
└── hooks/             # Кастомные хуки
```

**Принцип организации**: Компоненты группируются по их функциональной специализации, а не по уровню сложности. Это упрощает навигацию и поиск нужных компонентов.

### Правила именования компонентов

1. **Компоненты**: PascalCase (`Button.tsx`, `FormField.tsx`)
2. **Файлы стилей**: `{ComponentName}.module.css`
3. **Stories**: `{ComponentName}.stories.tsx`
4. **Индексы**: `index.ts` в каждой папке компонента
5. **Экспорты**: Named exports только (не default exports)

### Структура компонента

Каждый компонент должен иметь следующую структуру:

```
ComponentName/
├── components/                # Если нужны какие-то дополнительные компоненты
├── ComponentName.tsx          # Основной компонент
├── ComponentName.module.css   # Стили (CSS Modules)
├── ComponentName.stories.tsx  # Storybook истории
├── ComponentName.test.tsx     # Тесты
└── index.ts                   # Экспорт
```

**Пример экспорта в index.ts**:

```tsx
// ✅ Именованные экспорты
export { Button } from './Button';
export type { ButtonProps } from './Button';

// ❌ Не используй default export
// export default Button;
```

**Экспорт в корневом index.ts**:

```tsx
// src/components/index.ts
export { Button } from './primitives/Button';
export type { ButtonProps } from './primitives/Button';

export { Input } from './form/Input';
export type { InputProps } from './form/Input';
// ... и т.д.
```

### Требования к компонентам

1. **TypeScript**: Строгая типизация всех пропсов
2. **Пропсы**: Расширяют нативные HTML атрибуты через `React.ComponentPropsWithoutRef`
3. **ForwardRef**: Все компоненты должны поддерживать ref
4. **Accessibility**: Полная поддержка ARIA атрибутов, keyboard navigation
5. **Состояния**: Все интерактивные компоненты должны поддерживать: default, hover, active, disabled, focus, loading
6. **Вариативность**: Компоненты должны иметь варианты (variant, size)
7. **Композиция**: Использовать compound components pattern где уместно

### Пример структуры компонента

```tsx
import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Реализация
  }
);

Button.displayName = 'Button';
```

## Система дизайн-токенов

### Упрощенная плоская структура (как в MUI)

Система токенов использует захардкоженные значения в TypeScript с плоской структурой. Это упрощает разработку и использование библиотеки.

### Структура токенов

**Расположение**: `src/tokens/`

**Файлы**:

- `theme.ts` - дефолтная светлая тема
- `darkTheme.ts` - темная тема
- `types.ts` - TypeScript типы
- `generate-css-vars.ts` - скрипт генерации CSS переменных

**Категории токенов**:

- `palette` - цвета (primary, secondary, error, warning, success, text, background)
- `spacing` - отступы (числа или строки)
- `typography` - типографика (fontFamily, fontSize, fontWeight, lineHeight)
- `shadows` - тени
- `borderRadius` - радиусы скругления
- `transitions` - переходы (duration, easing)
- `zIndex` - z-index значения

### Дефолтная тема

**Пример структуры** (`src/tokens/theme.ts`):

```tsx
export const defaultTheme = {
  palette: {
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#9333ea',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
    },
    text: {
      primary: '#171717',
      secondary: '#525252',
      disabled: '#a3a3a3',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    border: {
      default: '#d4d4d4',
      subtle: '#e5e5e5',
      strong: '#a3a3a3',
    },
  },
  spacing: {
    unit: 4, // базовый unit (4px)
    0: 0,
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    none: 'none',
  },
  borderRadius: {
    none: 0,
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type Theme = typeof defaultTheme;
```

### Темная тема

**Пример** (`src/tokens/darkTheme.ts`):

```tsx
import { defaultTheme } from './theme';

export const darkTheme: Theme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    text: {
      primary: '#fafafa',
      secondary: '#a3a3a3',
      disabled: '#525252',
    },
    background: {
      default: '#171717',
      paper: '#262626',
    },
    border: {
      default: '#404040',
      subtle: '#262626',
      strong: '#525252',
    },
  },
};
```

### Генерация CSS переменных

**Скрипт**: `scripts/generate-css-vars.ts` (простой, без сложной логики)

Генерирует CSS переменные из токенов:

```css
:root,
[data-color-scheme='light'] {
  --palette-primary-main: #0ea5e9;
  --palette-primary-light: #38bdf8;
  --palette-primary-dark: #0284c7;
  --palette-primary-contrastText: #ffffff;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --typography-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --typography-font-size-base: 1rem;
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --border-radius-md: 0.375rem;
  /* ... */
}

[data-color-scheme='dark'] {
  --palette-text-primary: #fafafa;
  --palette-background-default: #171717;
  --palette-background-paper: #262626;
  /* ... */
}
```

**Формат CSS переменных**: `--{category}-{key}-{subkey}` (например, `--palette-primary-main`)

### Использование токенов в компонентах

Все компоненты должны использовать CSS переменные из темы. Токены доступны через CSS переменные, которые генерируются из `theme.ts`.

**Пример использования в CSS модуле**:

```css
/* Button.module.css */
.button {
  /* Цвета */
  background: var(--palette-primary-main);
  color: var(--palette-primary-contrastText);
  border: 1px solid var(--palette-border-default);

  /* Отступы */
  padding: var(--spacing-2) var(--spacing-4);

  /* Типографика */
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-base);
  font-weight: var(--typography-font-weight-medium);

  /* Радиусы */
  border-radius: var(--border-radius-md);

  /* Тени */
  box-shadow: var(--shadows-base);

  /* Переходы */
  transition: all var(--transitions-duration-base) var(--transitions-easing-easeInOut);
}

.button:hover:not(:disabled) {
  background: var(--palette-primary-dark);
}

.button:disabled {
  background: var(--palette-text-disabled);
  color: var(--palette-text-disabled);
  cursor: not-allowed;
}
```

**Важно**:

- Всегда используй CSS переменные, не хардкодь значения
- Если нужен новый токен, добавь его в `src/tokens/theme.ts` и обнови генерацию CSS переменных
- Токены автоматически поддерживают светлую и темную тему через `data-color-scheme`

### Преимущества упрощенного подхода

1. ✅ **Простота** - нет JSON файлов, валидации, сложной генерации
2. ✅ **TypeScript из коробки** - полная типизация без генерации
3. ✅ **Легко переопределять** - пользователь передает объект с частичными значениями
4. ✅ **Понятная структура** - как в MUI, знакомо многим разработчикам
5. ✅ **Меньше кода** - нет скриптов валидации/генерации
6. ✅ **Быстрее разработка** - изменения сразу видны, не нужно генерировать

## Система тем

### Переключение цветовых схем

Библиотека должна предоставлять механизм выбора между светлой и темной темой для пользователя.

**Способы переключения**:

1. **Через атрибут `data-color-scheme`**:

   ```tsx
   <div data-color-scheme="light">
     <Button>Кнопка</Button>
   </div>

   <div data-color-scheme="dark">
     <Button>Кнопка</Button>
   </div>
   ```

2. **Через `ColorSchemeProvider`** (React компонент):

   ```tsx
   import { ColorSchemeProvider, Button } from 'ui-kit';

   <ColorSchemeProvider colorScheme="light">
     <Button>Кнопка</Button>
   </ColorSchemeProvider>;
   ```

3. **Через хук `useColorScheme`**:
   ```tsx
   const { colorScheme, setColorScheme } = useColorScheme();
   ```

### Кастомные дизайн-токены

**Критическое требование**: Пользователь должен иметь возможность передать свои дизайн-токены снаружи и глобально изменить любые значения библиотеки (цвета, отступы, размеры и т.д.).

### ThemeProvider

**Расположение**: `src/themes/`

**Компоненты**:

- `ThemeProvider.tsx` - провайдер темы с поддержкой кастомных токенов
- `types.ts` - типы тем (полная типизация всех уровней)
- `useTheme.ts` - хук для доступа к теме
- `useColorScheme.ts` - хук для управления цветовой схемой

**Требования**:

- Полная типизация всех токенов (palette, spacing, typography и т.д.)
- Поддержка частичного переопределения токенов (глубокий merge с дефолтными)
- Применение кастомных токенов через CSS переменные
- Fallback на дефолтные токены для непереопределенных значений
- Поддержка `data-color-scheme` атрибута
- Возможность переопределить любые токены: цвета, отступы, размеры, типографику, тени и т.д.

**API**:

```tsx
import type { Theme } from './tokens/theme';

interface ThemeProviderProps {
  /**
   * Кастомные дизайн-токены
   * Можно переопределить любые токены: palette, spacing, typography и т.д.
   * Непереопределенные значения берутся из дефолтных токенов
   */
  theme?: Partial<Theme>;

  /**
   * Цветовая схема (светлая/темная)
   * @default 'light'
   */
  colorScheme?: 'light' | 'dark' | 'auto';

  children: React.ReactNode;
}

function useTheme(): Theme;
function useColorScheme(): {
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark') => void;
};
```

**Пример использования кастомных токенов**:

```tsx
import { ThemeProvider, Button } from 'ui-kit';

const customTheme = {
  palette: {
    primary: {
      main: '#ff0000', // Переопределяем основной цвет
      light: '#ff3333',
      dark: '#cc0000',
      contrastText: '#ffffff',
    },
  },
  spacing: {
    4: '2rem', // Переопределяем отступ
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Переопределяем шрифт
  },
};

<ThemeProvider theme={customTheme} colorScheme="light">
  <Button>Кнопка с кастомными цветами</Button>
</ThemeProvider>;
```

**Реализация**:

1. При передаче `theme` в `ThemeProvider`, происходит глубокий merge с дефолтными токенами
2. Кастомные токены применяются через CSS переменные на уровне `:root` или через inline стили
3. Все компоненты автоматически используют переопределенные значения через CSS переменные
4. Поддержка частичного переопределения - можно изменить только нужные токены (например, только `palette.primary.main`)

### ColorSchemeProvider

Упрощенная обертка над ThemeProvider для управления только цветовой схемой:

```tsx
interface ColorSchemeProviderProps {
  colorScheme: 'light' | 'dark';
  children: React.ReactNode;
}
```

## Стилизация

### CSS Modules с PostCSS

**Формат**: `.module.css`

**Важно**: Используется `.css` расширение для лучшей совместимости с различными инструментами и IDE. PostCSS обрабатывает файлы автоматически.

**Правила**:

- Использовать только CSS переменные из токенов
- НЕ использовать примитивы напрямую (только через семантику или компонентные токены)
- BEM-подобная структура классов: `component--variant--modifier`
- Все состояния через модификаторы: `--hover`, `--active`, `--disabled`, `--focus`

**Пример**:

```pcss
.button {
  background: var(--color-component-button-primary-bg-default);
  color: var(--color-component-button-primary-text-default);
}

.button--hover:not(:disabled) {
  background: var(--color-component-button-primary-bg-hover);
}
```

### Глобальные стили

**Расположение**: `src/styles/global.css`

**Содержимое**:

- CSS reset или normalize
- Базовые стили для body, html
- Утилитарные классы (опционально)

## Сборка и экспорты

### Структура экспортов

**Entry points**:

- `src/index.ts` - основные экспорты (компоненты, хуки, типы)
- `src/global.ts` - глобальные стили
- `src/tokens/build/tokens.js` - токены

**Package.json exports**:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    },
    "./global": {
      "types": "./dist/global.d.ts",
      "import": "./dist/global.esm.js",
      "require": "./dist/global.js"
    },
    "./tokens": {
      "types": "./dist/tokens/build/tokens.d.ts",
      "import": "./dist/tokens/build/tokens.js"
    }
  }
}
```

### Требования к сборке

1. **Tree-shaking**: Все экспорты должны поддерживать tree-shaking
2. **Code splitting**: Опционально, по компонентам
3. **CSS**: CSS модули должны собираться в отдельные файлы или объединяться
4. **Source maps**: Обязательны для production
5. **TypeScript**: Полная генерация .d.ts файлов

### SSR/SSG поддержка

**Критическое требование**: Библиотека должна работать в SPA, SSR и SSG окружениях.

**Требования**:

- CSS модули должны работать в SSR окружениях
- Нет зависимостей от браузерных API в компонентах (кроме явно необходимых)
- Поддержка Next.js (App Router и Pages Router)
- Поддержка Remix, SvelteKit и других SSR фреймворков
- Поддержка SSG (Static Site Generation) в Next.js, Gatsby и т.д.
- Изоморфный код - один и тот же код работает на сервере и клиенте

**Особенности реализации**:

1. **CSS Modules**: Должны корректно обрабатываться в SSR
2. **Hydration**: Компоненты должны корректно гидратироваться
3. **Темы**: Переключение тем должно работать в SSR (через `data-color-scheme`)
4. **Импорты**: Все импорты должны быть tree-shakeable

## Тестирование

### Обязательные тесты

1. **Unit-тесты компонентов**:
   - Рендеринг с разными пропсами
   - Обработка событий
   - Состояния (disabled, loading, etc.)
   - Accessibility (ARIA атрибуты)

2. **Тесты токенов**:
   - Валидация структуры
   - Проверка алиасов
   - Консистентность тем

3. **Тесты утилит**:
   - Все вспомогательные функции

### Инструменты

- **Vitest** для unit-тестов
- **@testing-library/react** для тестирования компонентов
- **@testing-library/jest-dom** для матчеров
- **@testing-library/user-event** для симуляции событий

### Покрытие

- Минимальное покрытие: 80%
- Критические компоненты: 100%

## Документация

### Storybook

**Требования**:

- История для каждого варианта компонента
- Документация пропсов (автогенерация из TypeScript)
- Примеры использования
- Accessibility документация

**Addons**:

- `@storybook/addon-essentials`
- `@storybook/addon-a11y` (accessibility)
- `@storybook/addon-docs`

### README

**Обязательные разделы**:

- Установка
- Быстрый старт
- Использование компонентов
- Система токенов
- Темы (включая кастомные токены)
- SSR/SSG поддержка
- Разработка
- Версионирование
- Лицензия

## Лицензия

**Требование**: Библиотека должна иметь лицензию, которая требует указания авторства при использовании.

### Рекомендуемые лицензии

1. **CC-BY-4.0** (Creative Commons Attribution 4.0):
   - Разрешает использование, изменение, распространение
   - Требует указания авторства
   - Подходит для UI-библиотек

2. **MIT с требованием авторства**:
   - Классическая MIT лицензия
   - Можно добавить требование указания авторства в README

### Требования к лицензированию

1. **Файл LICENSE**: Должен быть в корне проекта
2. **package.json**: Поле `license` должно быть заполнено
3. **README**: Раздел с информацией о лицензии и авторстве
4. **Заголовки файлов**: Опционально, но рекомендуется добавлять copyright notice в критичные файлы

**Пример LICENSE файла**:

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

ATTRIBUTION REQUIREMENT:
When using this library, you must include attribution to the original author
in your application's credits, about page, or documentation.
```

**Пример в README**:

```markdown
## Лицензия

Этот проект лицензирован под [MIT License](LICENSE) с требованием указания авторства.

При использовании библиотеки, пожалуйста, укажите авторство в вашем проекте.
```

## Версионирование и Changelog

### Автоматическое версионирование

Библиотека должна автоматически управлять версиями и генерировать CHANGELOG на основе коммитов.

### Вариант 1: Conventional Commits (рекомендуется)

**Процесс**:

1. **Коммиты с префиксами**: Все коммиты должны следовать [Conventional Commits](https://www.conventionalcommits.org/):

   ```
   feat: добавил компонент Button
   fix: исправил баг в Input
   docs: обновил README
   refactor: рефакторинг системы токенов
   ```

2. **Pre-commit hook**: Перед коммитом требовать описание изменений:
   - Либо через commit message с префиксом
   - Либо через интерактивный prompt (commitizen)

3. **Автоматическая генерация версии**:
   - `feat:` → minor версия (1.0.0 → 1.1.0)
   - `fix:` → patch версия (1.0.0 → 1.0.1)
   - `BREAKING CHANGE:` → major версия (1.0.0 → 2.0.0)

4. **Автоматический CHANGELOG**:
   - При создании версии автоматически собирать все коммиты с момента последнего релиза
   - Группировать по типам (Features, Bug Fixes, Documentation, etc.)
   - Создавать git tag с версией: `v1.1.0`

**Инструменты**:

- `standard-version` или `semantic-release` для автоматизации
- `commitizen` для интерактивных коммитов
- `husky` для pre-commit hooks

### Вариант 2: Changesets (альтернатива)

**Процесс**:

1. Изменения в коде
2. Создание changeset: `pnpm changeset` (описание изменений)
3. Автоматическое обновление версии и CHANGELOG при мердже в main
4. Автоматическая публикация в npm

**Типы изменений**:

- `major` - breaking changes
- `minor` - новые функции
- `patch` - исправления

### Требования к релизному процессу

1. **Автоматический CHANGELOG**: Все коммиты попадающие в версию должны быть в CHANGELOG
2. **Git tags**: Каждая версия должна иметь соответствующий git tag
3. **Релизные заметки**: Автоматическая генерация release notes для GitHub/GitLab
4. **Публикация**: Автоматическая публикация в npm registry

### Пример workflow

```bash
# Разработка
git commit -m "feat: добавил компонент Button"
git commit -m "fix: исправил стили в Input"

# Создание релиза
npm run release  # или pnpm release

# Автоматически:
# 1. Анализирует коммиты
# 2. Определяет версию (minor в данном случае)
# 3. Обновляет package.json
# 4. Генерирует CHANGELOG.md
# 5. Создает git tag v1.1.0
# 6. Публикует в npm
```

## Валидация и качество кода

### Pre-commit hooks

**Обязательные проверки**:

- ESLint
- TypeScript type check
- Тесты (опционально)

### CI/CD

**Проверки**:

- Линтинг
- Типы
- Тесты
- Сборка

## Правила разработки

### Добавление нового компонента

1. **Определить категорию**: Выбрать правильную категорию компонента:
   - `primitives/` - базовые компоненты (Button, Icon, Badge, Text)
   - `form/` - формы (Input, Select, Checkbox, Radio)
   - `feedback/` - обратная связь (Alert, Toast, Modal, Tooltip)
   - `layout/` - раскладка (Card, Container, Stack, Grid)
   - `navigation/` - навигация (Tabs, Menu, Breadcrumb)

2. **Создать компонент**: `src/components/{category}/{ComponentName}/`

   ```
   ComponentName/
   ├── ComponentName.tsx          # TypeScript компонент
   ├── ComponentName.module.css    # CSS модуль
   ├── ComponentName.stories.tsx   # Storybook истории
   ├── ComponentName.test.tsx      # Тесты
   └── index.ts                    # Экспорт (named exports)
   ```

3. **Экспорт**: Добавить в `src/components/index.ts`:

   ```tsx
   export { ComponentName } from './{category}/ComponentName';
   export type { ComponentNameProps } from './{category}/ComponentName';
   ```

4. **Использовать токены в стилях**: В CSS модуле использовать CSS переменные из темы:

   ```css
   .button {
     background: var(--palette-primary-main);
     color: var(--palette-primary-contrastText);
     padding: var(--spacing-2) var(--spacing-4);
   }
   ```

5. **Экспорт**: Добавить в `src/components/index.ts`:

   ```tsx
   export { ComponentName } from './{category}/ComponentName';
   export type { ComponentNameProps } from './{category}/ComponentName';
   ```

6. **Тестирование**:
   - Запустить тесты: `pnpm test`
   - Проверить Storybook: `pnpm storybook`
   - Проверить TypeScript: `pnpm type-check`

### Правила кода

1. **TypeScript**: Strict mode, никаких `any`
2. **Именование**:
   - Компоненты: PascalCase
   - Функции/переменные: camelCase
   - Константы: UPPER_SNAKE_CASE
   - Типы/интерфейсы: PascalCase
3. **Экспорты**: Только named exports
4. **Комментарии**: JSDoc для публичных API
5. **Accessibility**: Все интерактивные элементы должны быть доступны с клавиатуры

## Метрики качества

### Обязательные метрики

- **Покрытие тестами**: ≥80%
- **TypeScript ошибки**: 0
- **ESLint ошибки**: 0
- **Размер bundle**: <100KB gzipped (без учета peer dependencies)
- **Время сборки**: <30s
- **Accessibility**: WCAG 2.1 AA compliance

## Интеграция с Figma (опционально)

### Tokens Studio

Если используется Figma для дизайна, можно экспортировать токены и вручную перенести их в `src/tokens/theme.ts`.

**Workflow**:

1. Обновление токенов в Figma через Tokens Studio
2. Экспорт значений (цвета, отступы и т.д.)
3. Вручную обновить значения в `src/tokens/theme.ts` или `src/tokens/darkTheme.ts`
4. Запустить генерацию CSS переменных: `pnpm generate:css-vars` (если используется)

**Примечание**: В упрощенной системе токены захардкожены в TypeScript, поэтому интеграция с Figma не обязательна. Можно просто обновлять значения напрямую в коде.

## Запрещенные практики

1. ❌ Default exports
2. ❌ Inline стили (кроме динамических значений)
3. ❌ Хардкод цветов/размеров в компонентах (используй CSS переменные из темы)
4. ❌ Компоненты без TypeScript типов
5. ❌ Компоненты без тестов
6. ❌ Breaking changes без major версии
7. ❌ Зависимости от браузерных API в компонентах
8. ❌ Прямое использование значений из `theme.ts` в компонентах (используй CSS переменные)

## Примеры правильной реализации

### Правильный компонент

```tsx
// src/components/primitives/Button/Button.tsx
import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, children, className, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={[
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${size}`],
          loading && styles['button--loading'],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
```

```css
/* src/components/primitives/Button/Button.module.css */
.button {
  font-family: var(--typography-font-family);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  transition: all var(--transitions-duration-base) var(--transitions-easing-easeInOut);
  /* ... */
}

.button--primary {
  background: var(--palette-primary-main);
  color: var(--palette-primary-contrastText);
}

.button--primary:hover:not(:disabled) {
  background: var(--palette-primary-dark);
}

.button--primary:active:not(:disabled) {
  background: var(--palette-primary-dark);
}

.button--primary:disabled {
  background: var(--palette-text-disabled);
  color: var(--palette-text-disabled);
  cursor: not-allowed;
}
```

```tsx
// src/components/primitives/Button/index.ts
// ✅ Именованные экспорты
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

```tsx
// src/components/index.ts
// Root export для всех компонентов
export { Button } from './primitives/Button';
export type { ButtonProps } from './primitives/Button';

export { Input } from './form/Input';
export type { InputProps } from './form/Input';

// ... и т.д.
```

### Правильное использование токенов

```tsx
// src/tokens/theme.ts - дефолтная тема
export const defaultTheme = {
  palette: {
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    // ... остальные цвета
  },
  spacing: {
    2: '8px',
    4: '16px',
    // ...
  },
  // ... остальные токены
} as const;
```

```css
/* Использование в компонентах через CSS переменные */
.button {
  background: var(--palette-primary-main);
  color: var(--palette-primary-contrastText);
  padding: var(--spacing-2) var(--spacing-4);
}
```

## Заключение

Эта библиотека должна быть:

- **Масштабируемой**: Легко добавлять новые компоненты по категориям специализации
- **Типобезопасной**: Полная поддержка TypeScript strict mode
- **Доступной**: WCAG 2.1 AA compliance, полная поддержка accessibility
- **Документированной**: Storybook + README с инструкцией для пользователей и контрибьютеров
- **Тестируемой**: Высокое покрытие тестами (≥80%)
- **Производительной**: Оптимизированная сборка с tree-shaking
- **Универсальной**: Работает в SPA, SSR и SSG окружениях
- **Кастомизируемой**: Возможность переопределить любые дизайн-токены
- **Темизируемой**: Поддержка светлой/темной темы и кастомных палитр
- **Версионируемой**: Автоматическое управление версиями и CHANGELOG
- **Лицензированной**: С требованием указания авторства

### Ключевые особенности

1. **Структура по специализации**: Компоненты организованы по функциональным категориям (primitives, form, feedback, layout, navigation)
2. **Полная кастомизация**: Возможность переопределить любые токены через ThemeProvider
3. **Автоматическое версионирование**: CHANGELOG и версии на основе коммитов
4. **Tree-shaking**: Оптимизированные импорты для минимального bundle size
5. **SSR/SSG ready**: Работает во всех современных React окружениях
