import type { Theme } from './types';

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function pathToCssVarName(path: string[]): string {
  return `--${path.join('-')}`;
}

function traverseObject(
  obj: unknown,
  path: string[],
  vars: Record<string, string>
): void {
  if (obj === null || obj === undefined) {
    return;
  }

  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    const varName = pathToCssVarName(path);
    vars[varName] = String(obj);
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      traverseObject(item, [...path, String(index)], vars);
    });
    return;
  }

  if (typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      const kebabKey = camelToKebab(key);
      traverseObject(value, [...path, kebabKey], vars);
    });
  }
}

export function themeToCssVars(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};
  traverseObject(theme, [], vars);
  return vars;
}
