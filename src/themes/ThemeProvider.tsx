import { createContext, useContext, useMemo, type FC, type ReactNode } from 'react';
import type { Theme } from '../tokens';
import { lightTheme, darkTheme } from '../tokens';
import { themeToCssVars } from '../tokens/generate-css-vars';
import { mergeTheme } from '../tokens/utils';
import styles from './ThemeProvider.module.pcss';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function cssVarsToBlock(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
}

const LIGHT_VARS = cssVarsToBlock(themeToCssVars(lightTheme));
const DARK_VARS = cssVarsToBlock(themeToCssVars(darkTheme));

export interface ThemeProviderProps {
  /** 'light' | 'dark' — встроенные темы, или кастомный объект темы */
  theme?: ThemeMode | Theme | Partial<Theme>;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ theme = 'light', children }) => {
  const { fullTheme, themeName, themeStyles } = useMemo(() => {
    let resolved: Theme;
    let name: 'light' | 'dark' | 'custom';

    if (theme === 'light') {
      resolved = lightTheme;
      name = 'light';
    } else if (theme === 'dark') {
      resolved = darkTheme;
      name = 'dark';
    } else if (
      theme &&
      typeof theme === 'object' &&
      'palette' in theme &&
      theme.palette &&
      'primary' in theme.palette
    ) {
      resolved = theme as Theme;
      name = theme === lightTheme ? 'light' : theme === darkTheme ? 'dark' : 'custom';
    } else {
      resolved = mergeTheme(lightTheme, theme as Partial<Theme>);
      name = 'custom';
    }

    const customBlock =
      name === 'custom'
        ? `[data-color-scheme="custom"]{${cssVarsToBlock(themeToCssVars(resolved))}}`
        : '';

    const styles = `[data-color-scheme="light"]{${LIGHT_VARS}}[data-color-scheme="dark"]{${DARK_VARS}}${customBlock}`;

    return { fullTheme: resolved, themeName: name, themeStyles: styles };
  }, [theme]);

  const contextValue = useMemo(() => ({ theme: fullTheme }), [fullTheme]);

  return (
    <div data-color-scheme={themeName} className={styles.wrapper}>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    </div>
  );
};

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
