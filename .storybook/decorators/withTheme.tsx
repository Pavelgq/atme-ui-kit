import React from 'react';
import { ThemeProvider } from '../../src/themes';
import type { Decorator } from '@storybook/react';

type ThemeMode = 'light' | 'dark';

export const withTheme: Decorator = (Story, context) => {
  const themeMode = (context.globals.theme || 'light') as ThemeMode;

  return (
    <ThemeProvider theme={themeMode}>
      <Story />
    </ThemeProvider>
  );
};
