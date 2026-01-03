import React, { useEffect } from 'react';
import { ThemeProvider } from '../../src/themes';
import { lightTheme, darkTheme } from '../../src/tokens';
import type { Decorator } from '@storybook/react';

type ThemeMode = 'light' | 'dark';

const ThemeWrapper: React.FC<{ themeMode: ThemeMode; children: React.ReactNode }> = ({
  themeMode,
  children,
}) => {
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;
  const backgroundColor = themeMode === 'dark' ? darkTheme.palette.background.default : lightTheme.palette.background.default;

  useEffect(() => {
    // Обновляем background документа при смене темы
    const root = document.documentElement;
    root.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const withTheme: Decorator = (Story, context) => {
  const themeMode = (context.globals.theme || 'light') as ThemeMode;

  return (
    <ThemeWrapper themeMode={themeMode}>
      <Story />
    </ThemeWrapper>
  );
};
