import { useGlobals } from '@storybook/preview-api';

export type ThemeMode = 'light' | 'dark';

export function useThemeMode(): [ThemeMode, (mode: ThemeMode) => void] {
  const [globals, updateGlobals] = useGlobals();
  const themeMode = (globals.theme || 'light') as ThemeMode;

  const setThemeMode = (mode: ThemeMode) => {
    updateGlobals({
      theme: mode,
    });
  };

  return [themeMode, setThemeMode];
}

