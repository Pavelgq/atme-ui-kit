import { createContext, useContext, useMemo, useEffect, type FC, type ReactNode } from 'react';
import type { Theme } from '../tokens';
import { lightTheme } from '../tokens';
import { themeToCssVars } from '../tokens/generate-css-vars';
import { mergeTheme } from '../tokens/utils';

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  theme?: Theme | Partial<Theme>;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ theme = lightTheme, children }) => {
  const fullTheme = useMemo(() => {
    if ('palette' in theme && theme.palette && 'primary' in theme.palette) {
      return theme as Theme;
    }
    return mergeTheme(lightTheme, theme);
  }, [theme]);

  const cssVars = useMemo(() => themeToCssVars(fullTheme), [fullTheme]);


  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(cssVars).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [cssVars]);

  const contextValue = useMemo(
    () => ({
      theme: fullTheme,
    }),
    [fullTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
