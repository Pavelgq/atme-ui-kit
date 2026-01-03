import type { Theme } from './types';
import { deepMerge } from '../utils';

export function mergeTheme(
  baseTheme: Theme,
  overrides: Partial<Theme>
): Theme {
  return deepMerge(baseTheme, overrides);
}
