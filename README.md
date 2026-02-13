# @atme-lab/ui-kit

Component library for personal projects

> [Read in Russian](docs/README.ru.md)

## Installation

```bash
pnpm add @atme-lab/ui-kit
# or
npm install @atme-lab/ui-kit
# or
yarn add @atme-lab/ui-kit
```

## Quick Start

```tsx
import {
  ThemeProvider,
  lightTheme,
  Button,
  Typography,
} from "@atme-lab/ui-kit";
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

```tsx
import "@atme-lab/ui-kit/styles.css";
```

## Component Documentation

Detailed documentation for all components, their props, and usage examples is available in **Storybook**.

To view documentation locally:

```bash
pnpm storybook
```

Or use the online documentation (if available).

## Using Themes

The library provides two ready-made themes: `lightTheme` and `darkTheme`. You can use either of them or create your own custom theme.

### Light Theme

```tsx
import { ThemeProvider, lightTheme } from "@atme-lab/ui-kit";

<ThemeProvider theme={lightTheme}>{/* Your components */}</ThemeProvider>;
```

### Dark Theme

```tsx
import { ThemeProvider, darkTheme } from "@atme-lab/ui-kit";

<ThemeProvider theme={darkTheme}>{/* Your components */}</ThemeProvider>;
```

### Custom Theme

```tsx
import { ThemeProvider, lightTheme, mergeTheme } from "@atme-lab/ui-kit";

const customTheme = mergeTheme(lightTheme, {
  palette: {
    primary: {
      main: "#ff0000",
    },
  },
});

<ThemeProvider theme={customTheme}>{/* Your components */}</ThemeProvider>;
```

## Available Components

The library includes the following component categories:

- **Primitives**: Button, Typography, Tag, and other base components
- **Form**: Input, Select, Checkbox, Radio, and other form components
- **Feedback**: Alert, Toast, Modal, Tooltip, and other feedback components
- **Layout**: Card, Container, Stack, Grid, and other layout components
- **Navigation**: Tabs, Menu, Breadcrumb, and other navigation components

See the Storybook documentation for a complete list of components and usage examples.

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm storybook

# Run tests
pnpm test

# Build
pnpm build

# Linting
pnpm lint
```

## Versioning

The project uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning and CHANGELOG generation.

### Commit Format

All commits should follow the Conventional Commits format:

```
<type>: <subject>

[optional body]

[optional footer]
```

**Breaking changes:**
For major version, add `BREAKING CHANGE:` in the commit footer or use `!` after the type: `feat!: breaking change`

### Creating Commits

**Recommended way** (interactive):

```bash
pnpm commit
```

Or use regular git commit with the correct format:

```bash
git commit -m "feat: add Button component"
git commit -m "fix: correct Input styles"
```

### Creating a Release and Publishing to npm

**1. Create a release** (bump version, update CHANGELOG, create tag and commit):

```bash
# Auto version from commits (patch/minor/major)
pnpm release

# Or explicitly: minor
pnpm release:minor

# Or explicitly: major
pnpm release:major
```

**2. Push changes and tags to the repository:**

```bash
git push --follow-tags
```

**3. Publish the package to npm:**

```bash
pnpm publish
```

Before publishing, `prepublishOnly` runs → `npm run build`: the `dist` folder is built and only the built output is published (see the `files` field in package.json). No need to run build manually.

## License

MIT
