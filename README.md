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
// Import global styles at the root of your application
import "@atme-lab/ui-kit/global";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="h1">Hello World</Typography>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

**Important**: Global styles (`@atme-lab/ui-kit/global`) should be imported once at the root of your application (e.g., in `main.tsx` or `App.tsx`). They contain CSS reset and base styles for elements.

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

### Creating a Release

To create a release, use:

```bash
# Automatic version detection based on commits
pnpm release

# Force minor release
pnpm release:minor

# Force major release
pnpm release:major
```

The `pnpm release` command automatically:

1. Analyzes commits since the last release
2. Determines the version (patch/minor/major) based on commit types
3. Updates `package.json` with the new version
4. Generates/updates `CHANGELOG.md`
5. Creates a git tag (e.g., `v1.1.0`)
6. Creates a commit with the changes

After creating a release:

```bash
# Push changes and tags
git push --follow-tags

# Publish to npm (if needed)
npm publish
```

### Workflow

1. **Development**: Create commits with the correct format (use `pnpm commit` for convenience)
2. **Release**: Run `pnpm release` when ready to create a release
3. **Publishing**: Push changes and tags, then publish to npm (if needed)

## License

MIT
