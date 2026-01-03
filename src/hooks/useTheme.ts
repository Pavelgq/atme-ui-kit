import type { Theme } from '../tokens';
import { useThemeContext } from '../themes/ThemeProvider';

export function useTheme(): Theme {
  const { theme } = useThemeContext();
  return theme;
}

