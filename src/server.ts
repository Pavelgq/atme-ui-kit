import type { Theme } from './tokens/types';
import type { DeepPartial } from './tokens/utils';
import { darkTheme, lightTheme } from './tokens/themes';
import { themeToCssVars } from './tokens/generate-css-vars';
import { mergeTheme } from './tokens/utils';

export { darkTheme, lightTheme, baseTheme } from './tokens/themes';
export { themeToCssVars } from './tokens/generate-css-vars';
export { mergeTheme, type DeepPartial } from './tokens/utils';
export type { Theme } from './tokens/types';

export type ThemeMode = 'light' | 'dark';

function cssVarsToBlock(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
}

/**
 * Возвращает критический CSS в формате data-theme для SSR.
 * Вставьте результат в <style> и добавьте data-theme="light"|"dark" на корневой элемент.
 *
 * @param mode — 'light' | 'dark'
 */
export function getCriticalThemeCss(mode: ThemeMode): string;

/**
 * @param theme — объект темы (legacy). Определяется light/dark/custom по содержимому.
 */
export function getCriticalThemeCss(theme?: Theme | DeepPartial<Theme>): string;

export function getCriticalThemeCss(
  modeOrTheme?: ThemeMode | Theme | DeepPartial<Theme>
): string {
  const lightVars = cssVarsToBlock(themeToCssVars(lightTheme));
  const darkVars = cssVarsToBlock(themeToCssVars(darkTheme));

  if (modeOrTheme === 'light' || modeOrTheme === 'dark') {
    return `[data-theme="light"]{${lightVars}}[data-theme="dark"]{${darkVars}}`;
  }

  const resolvedTheme: Theme = modeOrTheme
    ? modeOrTheme &&
      typeof modeOrTheme === 'object' &&
      'palette' in modeOrTheme &&
      modeOrTheme.palette &&
      'primary' in modeOrTheme.palette
      ? (modeOrTheme as Theme)
      : mergeTheme(darkTheme, modeOrTheme as DeepPartial<Theme>)
    : darkTheme;

  const themeName =
    resolvedTheme === lightTheme ? 'light' : resolvedTheme === darkTheme ? 'dark' : 'custom';
  const customBlock =
    themeName === 'custom'
      ? `[data-theme="custom"]{${cssVarsToBlock(themeToCssVars(resolvedTheme))}}`
      : '';

  return `[data-theme="light"]{${lightVars}}[data-theme="dark"]{${darkVars}}${customBlock}`;
}
