type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  if (source === null || source === undefined) {
    return target;
  }

  if (typeof source !== 'object' || Array.isArray(source)) {
    return source as T;
  }

  if (typeof target !== 'object' || Array.isArray(target)) {
    return source as T;
  }

  const result = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceValue = (source as Record<string, unknown>)[key];
    const targetValue = (target as Record<string, unknown>)[key];

    if (
      sourceValue !== null &&
      sourceValue !== undefined &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue) &&
      targetValue !== null
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(targetValue, sourceValue);
    } else {
      (result as Record<string, unknown>)[key] = sourceValue;
    }
  });

  return result;
}

