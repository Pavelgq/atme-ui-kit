
export default function spacing(multiplier: number): string {
  return `calc(var(--spacing-unit) * ${multiplier} * 1px)`;
}
