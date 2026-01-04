import { useCallback } from "react";
import { openExternalLink } from "@utils/navigation";

export interface UseExternalLinkOptions {
  onNavigate?: (url: string) => void;
}

export interface UseExternalLinkReturn {
  openLink: (url: string) => void;
  shouldUseButton: (isOuterLink?: boolean) => boolean;
}

/**
 * Хук для работы с внешними ссылками.
 * Определяет, нужно ли использовать button вместо ссылки,
 * и предоставляет функцию для открытия ссылок.
 *
 * @param options - Опции для настройки работы с ссылками
 * @returns Утилиты для работы с внешними ссылками
 */
export function useExternalLink({
  onNavigate,
}: UseExternalLinkOptions = {}): UseExternalLinkReturn {
  const openLink = useCallback(
    (url: string) => {
      if (onNavigate) {
        onNavigate(url);
      } else {
        openExternalLink(url);
      }
    },
    [onNavigate]
  );

  const shouldUseButton = useCallback((isOuterLink?: boolean): boolean => {
    // Используем button если isOuterLink === false (внутренняя ссылка)
    // или если isOuterLink не указан, но есть onItemClick (будет обработан)
    return isOuterLink === false;
  }, []);

  return {
    openLink,
    shouldUseButton,
  };
}

