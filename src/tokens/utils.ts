import type { Theme } from './types';
import { deepMerge } from '../utils';

export function mergeTheme(
  baseTheme: Theme,
  overrides: Partial<Theme>
): Theme {
  return deepMerge(baseTheme, overrides);
}

export function getSpacingVar(
  spacing: number | string | undefined
): string | undefined {
  if (spacing === undefined) return undefined;

  if (typeof spacing === 'number') {
    return `${spacing * 4}px`;
  }

  return spacing;
}
