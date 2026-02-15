const MONTHS_RU_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
] as const;

export function formatDateRu(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${day} ${MONTHS_RU_GENITIVE[month]} ${year}`;
}
