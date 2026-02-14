const DEFAULT_UNIT = 4;

export default function spacing(multiplier: number | string): string {
  const value = typeof multiplier === 'string' ? parseFloat(multiplier) : multiplier;
  return `calc(var(--spacing-unit, ${DEFAULT_UNIT}) * ${value} * 1px)`;
}
